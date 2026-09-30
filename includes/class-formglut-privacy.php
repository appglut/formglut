<?php
/**
 * FormGlut privacy tools: WordPress personal-data export / erase and suggested policy text.
 *
 * Entries are matched by the email address typed in any Email field of the form.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Privacy class.
 */
class FormGlut_Privacy {

	/**
	 * Entries handled per request page.
	 */
	const PER_PAGE = 50;

	/**
	 * Hook into WordPress privacy tools.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'wp_privacy_personal_data_exporters', array( __CLASS__, 'register_exporter' ) );
		add_filter( 'wp_privacy_personal_data_erasers', array( __CLASS__, 'register_eraser' ) );
		add_action( 'admin_init', array( __CLASS__, 'policy_text' ) );
	}

	/**
	 * Register the exporter.
	 *
	 * @param array $exporters Exporters.
	 * @return array
	 */
	public static function register_exporter( $exporters ) {
		$exporters['formglut'] = array( 'exporter_friendly_name' => __( 'FormGlut form entries', 'formglut' ), 'callback' => array( __CLASS__, 'export' ) );
		return $exporters;
	}

	/**
	 * Register the eraser.
	 *
	 * @param array $erasers Erasers.
	 * @return array
	 */
	public static function register_eraser( $erasers ) {
		$erasers['formglut'] = array( 'eraser_friendly_name' => __( 'FormGlut form entries', 'formglut' ), 'callback' => array( __CLASS__, 'erase' ) );
		return $erasers;
	}

	/**
	 * Entries that contain the email address in one of their Email fields.
	 *
	 * @param string $email Email address.
	 * @param int    $page  Page (1-based).
	 * @return array Entry rows with decoded fields_data.
	 */
	private static function find( $email, $page ) {
		global $wpdb;
		$like = '%' . $wpdb->esc_like( wp_json_encode( strtolower( $email ) ) ) . '%';
		$rows = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->formglut_entries} WHERE LOWER(fields_data) LIKE %s ORDER BY id ASC LIMIT %d OFFSET %d", $like, self::PER_PAGE, ( max( 1, $page ) - 1 ) * self::PER_PAGE ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$out  = array();
		$form_cache = array();
		foreach ( (array) $rows as $row ) {
			$data = json_decode( $row->fields_data, true );
			if ( ! is_array( $data ) ) {
				continue;
			}
			if ( ! isset( $form_cache[ $row->form_id ] ) ) {
				$form_cache[ $row->form_id ] = FormGlut_Form::get( $row->form_id );
			}
			$form = $form_cache[ $row->form_id ];
			// Confirm the address is in an Email field, not just somewhere in the text.
			foreach ( $form ? FormGlut_Form::flatten_fields( $form->fields ) : array() as $field ) {
				if ( 'email' === ( $field['type'] ?? '' ) && isset( $data[ $field['id'] ] ) && strtolower( (string) $data[ $field['id'] ] ) === strtolower( $email ) ) {
					$row->fields_data = $data;
					$row->form        = $form;
					$out[]            = $row;
					break;
				}
			}
		}
		return array( 'items' => $out, 'more' => count( (array) $rows ) === self::PER_PAGE );
	}

	/**
	 * Export entries for an email address.
	 *
	 * @param string $email Email address.
	 * @param int    $page  Page.
	 * @return array
	 */
	public static function export( $email, $page = 1 ) {
		$found = self::find( $email, $page );
		$items = array();
		foreach ( $found['items'] as $row ) {
			$data = array(
				array( 'name' => __( 'Form', 'formglut' ), 'value' => $row->form->title ),
				array( 'name' => __( 'Submitted', 'formglut' ), 'value' => $row->created_at ),
			);
			foreach ( FormGlut_Form::flatten_fields( $row->form->fields ) as $field ) {
				$id = $field['id'] ?? '';
				if ( '' !== $id && isset( $row->fields_data[ $id ] ) && '' !== $row->fields_data[ $id ] ) {
					$data[] = array( 'name' => ! empty( $field['label'] ) ? $field['label'] : $id, 'value' => FormGlut_Form::display_value( $field, $row->fields_data[ $id ] ) );
				}
			}
			if ( ! empty( $row->ip_address ) ) {
				$data[] = array( 'name' => __( 'IP address', 'formglut' ), 'value' => $row->ip_address );
			}
			$items[] = array(
				'group_id'    => 'formglut-entries',
				'group_label' => __( 'Form entries', 'formglut' ),
				'item_id'     => 'formglut-entry-' . $row->id,
				'data'        => $data,
			);
		}
		return array( 'data' => $items, 'done' => ! $found['more'] );
	}

	/**
	 * Delete entries (and their uploaded files) for an email address.
	 *
	 * @param string $email Email address.
	 * @param int    $page  Page.
	 * @return array
	 */
	public static function erase( $email, $page = 1 ) {
		// Always read page 1: erased rows no longer match.
		$found   = self::find( $email, 1 );
		$removed = 0;
		foreach ( $found['items'] as $row ) {
			foreach ( $row->fields_data as $value ) {
				foreach ( (array) $value as $maybe_url ) {
					$path = is_string( $maybe_url ) ? FormGlut_Uploads::path_from_url( $maybe_url ) : '';
					if ( $path ) {
						wp_delete_file( $path );
					}
				}
			}
			if ( FormGlut_Entry::delete( $row->id ) ) {
				++$removed;
			}
		}
		return array( 'items_removed' => $removed, 'items_retained' => false, 'messages' => array(), 'done' => ! $found['more'] );
	}

	/**
	 * Suggested text for the site's privacy policy.
	 *
	 * @return void
	 */
	public static function policy_text() {
		if ( ! function_exists( 'wp_add_privacy_policy_content' ) ) {
			return;
		}
		wp_add_privacy_policy_content(
			'FormGlut',
			'<p>' . esc_html__( 'When you submit a form on this site, we store the information you enter so we can respond to you. Depending on the form, we may also store your IP address and browser details to help prevent spam. Files you upload are stored on this site. You can ask us to export or delete this information at any time.', 'formglut' ) . '</p>'
		);
	}
}
