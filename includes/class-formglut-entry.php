<?php
/**
 * FormGlut Entry CRUD Helpers.
 *
 * Provides helper methods for reading, creating, updating, and deleting entries.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Entry class.
 */
class FormGlut_Entry {

	/**
	 * Get a single entry by ID.
	 *
	 * @param int $id Entry ID.
	 * @return object|null
	 */
	public static function get( $id ) {
		global $wpdb;

		return $wpdb->get_row( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"SELECT * FROM {$wpdb->formglut_entries} WHERE id = %d",
				absint( $id )
			)
		);
	}

	/**
	 * Get entries with optional filtering and pagination.
	 *
	 * @param array $args Query arguments.
	 * @return array Array with 'entries' and 'total' keys.
	 */
	public static function get_entries( $args = array() ) {
		global $wpdb;

		$defaults = array(
			'form_id'  => 0,
			'status'   => '',
			'starred'  => null,
			'search'   => '',
			'date_from' => '',
			'date_to'   => '',
			'per_page' => 20,
			'offset'   => 0,
			'orderby'  => 'created_at',
			'order'    => 'DESC',
		);

		$args = wp_parse_args( $args, $defaults );

		$allowed_orderby = array( 'id', 'form_id', 'status', 'starred', 'created_at' );
		$orderby = in_array( $args['orderby'], $allowed_orderby, true ) ? $args['orderby'] : 'created_at';
		$order   = 'ASC' === strtoupper( $args['order'] ) ? 'ASC' : 'DESC';

		$where = array();

		if ( absint( $args['form_id'] ) ) {
			$where[] = $wpdb->prepare( 'form_id = %d', absint( $args['form_id'] ) );
		}

		if ( $args['status'] ) {
			$where[] = $wpdb->prepare( 'status = %s', sanitize_text_field( $args['status'] ) );
		}

		if ( null !== $args['starred'] && '' !== $args['starred'] ) {
			$where[] = $wpdb->prepare( 'starred = %d', absint( $args['starred'] ) );
		}

		if ( $args['search'] ) {
			$like    = '%' . $wpdb->esc_like( sanitize_text_field( $args['search'] ) ) . '%';
			$where[] = $wpdb->prepare( 'fields_data LIKE %s', $like );
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

		$total = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_entries}{$where_sql}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

		$sql   = "SELECT * FROM {$wpdb->formglut_entries}{$where_sql} ORDER BY {$orderby} {$order}";
		$limit  = absint( $args['per_page'] );
		$offset = absint( $args['offset'] );

		if ( $limit > 0 ) {
			$sql .= $wpdb->prepare( ' LIMIT %d OFFSET %d', $limit, $offset );
		}

		$entries = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.NotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

		if ( $entries ) {
			foreach ( $entries as &$entry ) {
				$entry->fields_data = json_decode( $entry->fields_data, true );
			}
		}

		return array(
			'entries' => $entries ? $entries : array(),
			'total'   => $total,
		);
	}

	/**
	 * Create a new entry.
	 *
	 * @param array $data Entry data.
	 * @return int|false Inserted ID or false on failure.
	 */
	public static function create( $data ) {
		global $wpdb;

		$inserted = $wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
			$wpdb->formglut_entries,
			array(
				'form_id'     => absint( $data['form_id'] ),
				'fields_data' => wp_json_encode( $data['fields_data'] ),
				'status'      => sanitize_text_field( $data['status'] ?? 'unread' ),
				'starred'     => absint( $data['starred'] ?? 0 ),
				'ip_address'  => sanitize_text_field( $data['ip_address'] ?? '' ),
				'browser'     => sanitize_text_field( $data['browser'] ?? '' ),
				'source_url'  => esc_url_raw( $data['source_url'] ?? '' ),
				'country'     => sanitize_text_field( $data['country'] ?? '' ),
				'created_at'  => ( isset( $data['created_at'] ) && preg_match( '/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $data['created_at'] ) ) ? $data['created_at'] : current_time( 'mysql' ),
			),
			array( '%d', '%s', '%s', '%d', '%s', '%s', '%s', '%s', '%s' )
		);

		return $inserted ? $wpdb->insert_id : false;
	}

	/**
	 * Delete an entry.
	 *
	 * @param int $id Entry ID.
	 * @return bool
	 */
	public static function delete( $id ) {
		global $wpdb;

		return false !== $wpdb->delete( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->formglut_entries,
			array( 'id' => absint( $id ) ),
			array( '%d' )
		);
	}

	/**
	 * Update entry status.
	 *
	 * @param int    $id     Entry ID.
	 * @param string $status New status.
	 * @return bool
	 */
	public static function update_status( $id, $status ) {
		global $wpdb;

		return false !== $wpdb->update( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->formglut_entries,
			array( 'status' => sanitize_text_field( $status ) ),
			array( 'id' => absint( $id ) ),
			array( '%s' ),
			array( '%d' )
		);
	}

	/**
	 * Toggle the starred state of an entry.
	 *
	 * @param int $id Entry ID.
	 * @return int New starred value (0 or 1).
	 */
	public static function toggle_star( $id ) {
		global $wpdb;

		$entry = self::get( $id );
		if ( ! $entry ) {
			return 0;
		}

		$new_starred = $entry->starred ? 0 : 1;

		$wpdb->update( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->formglut_entries,
			array( 'starred' => $new_starred ),
			array( 'id' => absint( $id ) ),
			array( '%d' ),
			array( '%d' )
		);

		return $new_starred;
	}

	/**
	 * Delete all entries for a given form.
	 *
	 * @param int $form_id Form ID.
	 * @return bool
	 */
	public static function delete_by_form( $form_id ) {
		global $wpdb;

		return false !== $wpdb->delete( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->formglut_entries,
			array( 'form_id' => absint( $form_id ) ),
			array( '%d' )
		);
	}
}
