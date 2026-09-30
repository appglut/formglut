<?php
/**
 * FormGlut Form CRUD Helpers.
 *
 * Provides helper methods for reading, creating, updating, and deleting forms.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Form class.
 */
class FormGlut_Form {

	/**
	 * Get a single form by ID.
	 *
	 * @param int $id Form ID.
	 * @return object|null
	 */
	public static function get( $id ) {
		global $wpdb;

		$form = $wpdb->get_row( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"SELECT * FROM {$wpdb->formglut_forms} WHERE id = %d",
				absint( $id )
			)
		);

		if ( $form ) {
			self::normalize_fields( $form );
		}

		return $form;
	}

	/**
	 * Normalize raw form_fields JSON into flat fields array + submit_btn.
	 *
	 * @param object $form Row from database (will be mutated).
	 */
	private static function normalize_fields( &$form ) {
		$raw     = json_decode( $form->form_fields, true );
		$raw_btn = json_decode( $form->submit_btn, true );

		// Old format: {fields:[], submitButton:{settings:{...}}}.
		if ( is_array( $raw ) && isset( $raw['fields'] ) && is_array( $raw['fields'] ) && ! isset( $raw['id'] ) ) {
			$form->fields = $raw['fields'];
			$btn_settings  = $raw['submitButton']['settings'] ?? array();
			$form->submit_btn = array(
				'text'       => $btn_settings['button_ui']['text'] ?? __( 'Submit', 'formglut' ),
				'bg_color'   => $btn_settings['background_color'] ?? '',
				'text_color' => $btn_settings['color'] ?? '',
				'alignment'  => $btn_settings['align'] ?? 'left',
				'size'       => $btn_settings['button_size'] ?? 'md',
			);
		} else {
			$form->fields    = is_array( $raw ) ? $raw : array();
			$form->submit_btn = is_array( $raw_btn ) ? $raw_btn : array();
		}

		// Per-form settings (defaults filled in, always sanitized).
		$form->settings = FormGlut_Form_Settings::from_stored( isset( $form->settings ) ? $form->settings : '' );
	}

	/**
	 * Whether a field is a column container (column_1 … column_6).
	 *
	 * @param mixed $field Field definition.
	 * @return bool
	 */
	public static function is_container( $field ) {
		return is_array( $field ) && isset( $field['type'], $field['columns'] )
			&& preg_match( '/^column_\d+$/', (string) $field['type'] ) && is_array( $field['columns'] );
	}

	/**
	 * Flatten a field tree: column containers are removed and their children inlined.
	 *
	 * @param array $fields Field definitions.
	 * @return array
	 */
	public static function flatten_fields( $fields ) {
		$out = array();
		foreach ( (array) $fields as $field ) {
			if ( self::is_container( $field ) ) {
				foreach ( $field['columns'] as $column ) {
					$children = isset( $column['fields'] ) ? $column['fields'] : array();
					$out      = array_merge( $out, self::flatten_fields( $children ) );
				}
			} elseif ( is_array( $field ) ) {
				$out[] = $field;
			}
		}
		return $out;
	}

	/**
	 * Get all forms with optional search, filtering, and pagination.
	 *
	 * @param array $args Query arguments.
	 * @return array Array with 'forms' and 'total' keys.
	 */
	public static function get_all( $args = array() ) {
		global $wpdb;

		$defaults = array(
			'orderby'  => 'created_at',
			'order'    => 'DESC',
			'status'   => '',
			'search'   => '',
			'date_from' => '',
			'date_to'   => '',
			'per_page' => 20,
			'offset'   => 0,
		);

		$args = wp_parse_args( $args, $defaults );

		$allowed_orderby = array( 'id', 'title', 'status', 'created_at', 'updated_at' );
		$orderby = in_array( $args['orderby'], $allowed_orderby, true ) ? $args['orderby'] : 'created_at';
		$order   = 'ASC' === strtoupper( $args['order'] ) ? 'ASC' : 'DESC';

		$where = array();

		if ( $args['status'] ) {
			$status_val = sanitize_text_field( $args['status'] );
			if ( 'active' === $status_val ) {
				$where[] = "(status = 'active' OR status = 'published')";
			} else {
				$where[] = $wpdb->prepare( 'status = %s', $status_val );
			}
		}

		if ( $args['search'] ) {
			$like    = '%' . $wpdb->esc_like( sanitize_text_field( $args['search'] ) ) . '%';
			$where[] = $wpdb->prepare( 'title LIKE %s', $like );
		}

		if ( $args['date_from'] && preg_match( '/^\d{4}-\d{2}-\d{2}$/', $args['date_from'] ) ) {
			$where[] = $wpdb->prepare( 'created_at >= %s', $args['date_from'] . ' 00:00:00' );
		}

		if ( $args['date_to'] && preg_match( '/^\d{4}-\d{2}-\d{2}$/', $args['date_to'] ) ) {
			$where[] = $wpdb->prepare( 'created_at <= %s', $args['date_to'] . ' 23:59:59' );
		}

		$where_sql = '';
		if ( $where ) {
			$where_sql = ' WHERE ' . implode( ' AND ', $where );
		}

		$total = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_forms}{$where_sql}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

		$sql   = "SELECT * FROM {$wpdb->formglut_forms}{$where_sql} ORDER BY {$orderby} {$order}";
		$limit = absint( $args['per_page'] );
		$offset = absint( $args['offset'] );

		if ( $limit > 0 ) {
			$sql .= $wpdb->prepare( ' LIMIT %d OFFSET %d', $limit, $offset );
		}

		$forms = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.NotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

		if ( $forms ) {
			foreach ( $forms as &$form ) {
				self::normalize_fields( $form );
				$form->entry_count = self::get_entry_count( $form->id );
			}
		}

		return array(
			'forms' => $forms ? $forms : array(),
			'total' => $total,
		);
	}

	/**
	 * Create a new form.
	 *
	 * @param array $data Form data.
	 * @return int|false Inserted ID or false on failure.
	 */
	public static function create( $data ) {
		global $wpdb;

		$inserted = $wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
			$wpdb->formglut_forms,
			array(
				'title'       => sanitize_text_field( $data['title'] ),
				'form_fields' => wp_json_encode( $data['fields'] ?? array() ),
				'submit_btn'  => wp_json_encode( $data['submit_btn'] ?? array() ),
				'status'      => sanitize_text_field( $data['status'] ?? 'draft' ),
				'settings'    => wp_json_encode( FormGlut_Form_Settings::sanitize( $data['settings'] ?? array() ) ),
				'created_by'  => get_current_user_id(),
			),
			array( '%s', '%s', '%s', '%s', '%s', '%d' )
		);

		return $inserted ? $wpdb->insert_id : false;
	}

	/**
	 * Update an existing form.
	 *
	 * @param int   $id   Form ID.
	 * @param array $data Form data to update.
	 * @return bool
	 */
	public static function update( $id, $data ) {
		global $wpdb;

		$fields = array();
		$format = array();

		if ( isset( $data['title'] ) ) {
			$fields['title'] = sanitize_text_field( $data['title'] );
			$format[]        = '%s';
		}

		if ( isset( $data['fields'] ) ) {
			$fields['form_fields'] = wp_json_encode( $data['fields'] );
			$format[]              = '%s';
		}

		if ( isset( $data['submit_btn'] ) ) {
			$fields['submit_btn'] = wp_json_encode( $data['submit_btn'] );
			$format[]             = '%s';
		}

		if ( isset( $data['status'] ) ) {
			$fields['status'] = sanitize_text_field( $data['status'] );
			$format[]         = '%s';
		}

		if ( isset( $data['settings'] ) ) {
			$fields['settings'] = wp_json_encode( FormGlut_Form_Settings::sanitize( $data['settings'] ) );
			$format[]           = '%s';
		}

		$fields['updated_at'] = current_time( 'mysql' );
		$format[]             = '%s';

		return false !== $wpdb->update( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->formglut_forms,
			$fields,
			array( 'id' => absint( $id ) ),
			$format,
			array( '%d' )
		);
	}

	/**
	 * Delete a form and all its entries.
	 *
	 * @param int $id Form ID.
	 * @return bool
	 */
	public static function delete( $id ) {
		global $wpdb;

		FormGlut_Entry::delete_by_form( $id );

		return false !== $wpdb->delete( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->formglut_forms,
			array( 'id' => absint( $id ) ),
			array( '%d' )
		);
	}

	/**
	 * Duplicate a form.
	 *
	 * @param int $id Form ID to duplicate.
	 * @return int|false New form ID or false on failure.
	 */
	public static function duplicate( $id ) {
		$form = self::get( $id );

		if ( ! $form ) {
			return false;
		}

		return self::create( array(
			'title'      => $form->title . ' (copy)',
			'fields'     => $form->fields,
			'submit_btn' => $form->submit_btn,
			'settings'   => $form->settings,
			'status'     => 'draft',
		) );
	}

	/**
	 * Increment the view count for a form.
	 *
	 * @param int $id Form ID.
	 * @return bool
	 */
	public static function increment_views( $id ) {
		global $wpdb;

		return false !== $wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"UPDATE {$wpdb->formglut_forms} SET views = views + 1 WHERE id = %d",
				absint( $id )
			)
		);
	}

	/**
	 * Get the entry count for a form.
	 *
	 * @param int $form_id Form ID.
	 * @return int
	 */
	public static function get_entry_count( $form_id ) {
		global $wpdb;

		return (int) $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"SELECT COUNT(*) FROM {$wpdb->formglut_entries} WHERE form_id = %d",
				absint( $form_id )
			)
		);
	}
}
