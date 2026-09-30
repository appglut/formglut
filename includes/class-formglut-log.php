<?php
/**
 * FormGlut Logs: an activity log (what happened in the plugin) and an API log (requests FormGlut
 * sent to other services). Both live in one table and are shown on Tools › Activity Log / API Log.
 *
 * Personal data is not stored: activity entries name the action and the object, and API entries
 * keep only the service, URL (secrets removed), status and timing unless request bodies are turned on.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Log class.
 */
class FormGlut_Log {

	const OPTION = 'formglut_log_settings';

	/**
	 * Log settings with defaults.
	 *
	 * @return array
	 */
	public static function settings() {
		$saved = get_option( self::OPTION, array() );
		return wp_parse_args( is_array( $saved ) ? $saved : array(), array(
			'activity'   => true,
			'api'        => true,
			'api_wait'   => false, // Wait for the service to answer so the status code can be logged.
			'api_bodies' => false, // Also keep request / response bodies (may contain personal data).
			'keep_days'  => 30,
		) );
	}

	/**
	 * Sanitize and save settings.
	 *
	 * @param array $raw Raw settings.
	 * @return array Saved settings.
	 */
	public static function save_settings( $raw ) {
		$raw   = is_array( $raw ) ? array_merge( self::settings(), $raw ) : self::settings();
		$clean = array(
			'activity'   => ! empty( $raw['activity'] ),
			'api'        => ! empty( $raw['api'] ),
			'api_wait'   => ! empty( $raw['api_wait'] ),
			'api_bodies' => ! empty( $raw['api_bodies'] ),
			'keep_days'  => max( 1, min( 365, absint( isset( $raw['keep_days'] ) ? $raw['keep_days'] : 30 ) ) ),
		);
		update_option( self::OPTION, $clean, false );
		return $clean;
	}

	/**
	 * Table name.
	 *
	 * @return string
	 */
	public static function table() {
		global $wpdb;
		return $wpdb->prefix . 'formglut_logs';
	}

	/**
	 * Record something that happened in the plugin.
	 *
	 * @param string $event       Event key, e.g. form.created.
	 * @param string $summary     Human sentence.
	 * @param string $object_type form | entry | settings | tools.
	 * @param int    $object_id   Object ID (0 when not applicable).
	 * @param array  $context     Extra details (no personal data).
	 * @param string $status      ok | warning | error.
	 * @return void
	 */
	public static function activity( $event, $summary, $object_type = '', $object_id = 0, $context = array(), $status = 'ok' ) {
		if ( ! self::settings()['activity'] ) {
			return;
		}
		self::insert( 'activity', $event, $summary, $object_type, $object_id, $status, 0, $context );
	}

	/**
	 * Record a request FormGlut made to another service.
	 *
	 * @param string $service     Slack, Mailchimp, HubSpot, Stripe, Webhook …
	 * @param string $method      HTTP method.
	 * @param string $url         Request URL (will be redacted).
	 * @param string $status      ok | error | sent.
	 * @param int    $code        HTTP status code (0 when unknown).
	 * @param int    $duration_ms Time taken.
	 * @param array  $context     form_id, error, sizes, optional bodies.
	 * @return void
	 */
	public static function api( $service, $method, $url, $status, $code, $duration_ms, $context = array() ) {
		if ( ! self::settings()['api'] ) {
			return;
		}
		$context['url']    = self::redact_url( $url );
		$context['method'] = strtoupper( $method );
		$context['code']   = (int) $code;
		self::insert( 'api', $service, strtoupper( $method ) . ' ' . $context['url'], 'form', isset( $context['form_id'] ) ? (int) $context['form_id'] : 0, $status, $duration_ms, $context );
	}

	/**
	 * Keep the host and the start of the path, hide anything that could be a secret.
	 *
	 * @param string $url URL.
	 * @return string
	 */
	public static function redact_url( $url ) {
		$p = wp_parse_url( (string) $url );
		if ( empty( $p['host'] ) ) {
			return '';
		}
		$path  = isset( $p['path'] ) ? trim( $p['path'], '/' ) : '';
		$parts = '' === $path ? array() : explode( '/', $path );
		// Stripe / Mailchimp / HubSpot paths hold no secrets; webhook URLs often do, so keep only the first segment.
		$open  = preg_match( '/(stripe|mailchimp|hubapi)\./i', $p['host'] );
		$shown = $open ? $parts : array_slice( $parts, 0, 1 );
		$tail  = ( ! $open && count( $parts ) > 1 ) ? '/…' : '';
		return $p['host'] . ( $shown ? '/' . implode( '/', $shown ) : '' ) . $tail;
	}

	/**
	 * Insert one row; never throws.
	 */
	private static function insert( $type, $event, $summary, $object_type, $object_id, $status, $duration, $context ) {
		global $wpdb;
		$user = is_user_logged_in() ? get_current_user_id() : 0;
		$wpdb->insert( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
			self::table(),
			array(
				'type'        => $type,
				'event'       => substr( (string) $event, 0, 64 ),
				'object_type' => substr( (string) $object_type, 0, 32 ),
				'object_id'   => (int) $object_id,
				'user_id'     => $user,
				'summary'     => substr( wp_strip_all_tags( (string) $summary ), 0, 250 ),
				'context'     => $context ? wp_json_encode( $context ) : null,
				'status'      => substr( (string) $status, 0, 16 ),
				'duration_ms' => (int) $duration,
				'created_at'  => current_time( 'mysql' ),
			),
			array( '%s', '%s', '%s', '%d', '%d', '%s', '%s', '%s', '%d', '%s' )
		);
	}

	/**
	 * Read log rows.
	 *
	 * @param array $args type, search, status, event, date_from, date_to, page, per_page.
	 * @return array { items, total }
	 */
	public static function query( $args ) {
		global $wpdb;
		$a     = wp_parse_args( $args, array( 'type' => 'activity', 'search' => '', 'status' => '', 'event' => '', 'date_from' => '', 'date_to' => '', 'page' => 1, 'per_page' => 25 ) );
		$where = array( $wpdb->prepare( 'type = %s', 'api' === $a['type'] ? 'api' : 'activity' ) );
		if ( '' !== $a['status'] ) {
			$where[] = $wpdb->prepare( 'status = %s', $a['status'] );
		}
		if ( '' !== $a['event'] ) {
			$where[] = $wpdb->prepare( 'event = %s', $a['event'] );
		}
		if ( '' !== $a['search'] ) {
			$like    = '%' . $wpdb->esc_like( $a['search'] ) . '%';
			$where[] = $wpdb->prepare( '(summary LIKE %s OR event LIKE %s)', $like, $like );
		}
		if ( preg_match( '/^\d{4}-\d{2}-\d{2}$/', (string) $a['date_from'] ) ) {
			$where[] = $wpdb->prepare( 'created_at >= %s', $a['date_from'] . ' 00:00:00' );
		}
		if ( preg_match( '/^\d{4}-\d{2}-\d{2}$/', (string) $a['date_to'] ) ) {
			$where[] = $wpdb->prepare( 'created_at <= %s', $a['date_to'] . ' 23:59:59' );
		}
		$sql   = implode( ' AND ', $where );
		$table = self::table();
		$per   = max( 1, min( 100, absint( $a['per_page'] ) ) );
		$total = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$table} WHERE {$sql}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		$rows  = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$table} WHERE {$sql} ORDER BY id DESC LIMIT %d OFFSET %d", $per, ( max( 1, absint( $a['page'] ) ) - 1 ) * $per ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		$names = array();
		foreach ( (array) $rows as $r ) {
			$r->context = $r->context ? json_decode( $r->context, true ) : array();
			if ( $r->user_id && ! isset( $names[ $r->user_id ] ) ) {
				$u                    = get_userdata( $r->user_id );
				$names[ $r->user_id ] = $u ? $u->display_name : '#' . $r->user_id;
			}
			$r->user = $r->user_id ? $names[ $r->user_id ] : __( 'Visitor / system', 'formglut' );
		}
		return array( 'items' => $rows ? $rows : array(), 'total' => $total );
	}

	/**
	 * Distinct events in a log type (for the filter dropdown).
	 *
	 * @param string $type activity | api.
	 * @return string[]
	 */
	public static function events( $type ) {
		global $wpdb;
		$table = self::table();
		return $wpdb->get_col( $wpdb->prepare( "SELECT DISTINCT event FROM {$table} WHERE type = %s ORDER BY event", 'api' === $type ? 'api' : 'activity' ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	/**
	 * Delete all rows of one type.
	 *
	 * @param string $type activity | api | all.
	 * @return int Rows deleted.
	 */
	public static function clear( $type ) {
		global $wpdb;
		$table = self::table();
		if ( 'all' === $type ) {
			return (int) $wpdb->query( "DELETE FROM {$table}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		}
		return (int) $wpdb->query( $wpdb->prepare( "DELETE FROM {$table} WHERE type = %s", 'api' === $type ? 'api' : 'activity' ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	/**
	 * Delete rows older than the retention period.
	 *
	 * @return int Rows deleted.
	 */
	public static function prune() {
		global $wpdb;
		$table = self::table();
		$days  = (int) self::settings()['keep_days'];
		return (int) $wpdb->query( $wpdb->prepare( "DELETE FROM {$table} WHERE created_at < %s", gmdate( 'Y-m-d H:i:s', strtotime( current_time( 'mysql' ) ) - $days * DAY_IN_SECONDS ) ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}
}
