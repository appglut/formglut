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
	 * Whether the current visitor should see (and submit) a field.
	 *
	 * @param array $field Field config.
	 * @return bool
	 */
	public static function field_visible( $field ) {
		switch ( isset( $field['visibility'] ) ? $field['visibility'] : '' ) {
			case 'logged_in':
				return is_user_logged_in();
			case 'logged_out':
				return ! is_user_logged_in();
			case 'admins':
				return current_user_can( 'manage_options' );
			default:
				return true;
		}
	}

	/**
	 * Value to start a field with, from the URL, the logged-in user, a cookie or post meta.
	 *
	 * @param array $field Field config.
	 * @return string|null Null when there is nothing to fill in.
	 */
	public static function prefill_value( $field ) {
		$source = isset( $field['prefill_source'] ) ? $field['prefill_source'] : '';
		$key    = isset( $field['prefill_key'] ) ? trim( (string) $field['prefill_key'] ) : '';
		// Older hidden fields used "param_populate" for the URL parameter.
		if ( '' === $source && ! empty( $field['param_populate'] ) ) {
			$source = 'url';
			$key    = $field['param_populate'];
		}
		if ( '' === $source || '' === $key ) {
			return null;
		}
		$value = null;
		switch ( $source ) {
			case 'url':
				$param = sanitize_key( $key );
				$value = isset( $_GET[ $param ] ) ? wp_unslash( $_GET[ $param ] ) : null; // phpcs:ignore WordPress.Security.NonceVerification.Recommended, WordPress.Security.ValidatedSanitizedInput -- read-only prefill, sanitized below.
				break;
			case 'user':
				$user = wp_get_current_user();
				if ( $user && $user->exists() ) {
					$builtin = array( 'user_email', 'user_login', 'display_name', 'user_url', 'first_name', 'last_name', 'nickname', 'description' );
					$value   = in_array( $key, $builtin, true ) ? $user->get( $key ) : get_user_meta( $user->ID, sanitize_key( $key ), true );
				}
				break;
			case 'cookie':
				$value = isset( $_COOKIE[ $key ] ) ? wp_unslash( $_COOKIE[ $key ] ) : null; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- sanitized below.
				break;
			case 'post_meta':
				$post_id = get_the_ID();
				$value   = $post_id ? get_post_meta( $post_id, sanitize_key( $key ), true ) : null;
				break;
		}
		return is_scalar( $value ) && '' !== (string) $value ? sanitize_text_field( (string) $value ) : null;
	}

	/**
	 * A submitted value formatted for people (emails, CSV): number separators and decimals.
	 *
	 * @param array $field Field config.
	 * @param mixed $value Stored value.
	 * @return string
	 */
	public static function display_value( $field, $value ) {
		if ( is_array( $value ) ) {
			return implode( ', ', array_map( 'strval', $value ) );
		}
		$value = (string) $value;
		$type  = isset( $field['type'] ) ? $field['type'] : '';
		if ( in_array( $type, array( 'number', 'currency', 'percentage', 'spinner' ), true ) && is_numeric( $value )
			&& ( ( isset( $field['thousand_separator'] ) && '' !== $field['thousand_separator'] ) || ( isset( $field['decimals'] ) && '' !== $field['decimals'] ) ) ) {
			$sep      = isset( $field['thousand_separator'] ) ? (string) $field['thousand_separator'] : '';
			$decimals = isset( $field['decimals'] ) && '' !== $field['decimals'] ? absint( $field['decimals'] ) : ( false !== strpos( $value, '.' ) ? strlen( substr( strrchr( $value, '.' ), 1 ) ) : 0 );
			return number_format( (float) $value, $decimals, ',' === $sep ? '.' : ( '.' === $sep ? ',' : '.' ), $sep );
		}
		return $value;
	}

	/**
	 * Dialling codes keyed by ISO country code.
	 *
	 * @return array
	 */
	public static function dial_codes() {
		static $codes = null;
		if ( null === $codes ) {
			$codes = include FORMGLUT_PLUGIN_DIR . 'includes/data/dial-codes.php';
		}
		return $codes;
	}

	/**
	 * A signed math question for the Math Captcha field.
	 *
	 * @param array $field   Field config.
	 * @param int   $form_id Form ID.
	 * @return array { text: string, token: string }
	 */
	public static function math_question( $field, $form_id ) {
		$op = isset( $field['operation'] ) ? $field['operation'] : 'add';
		if ( 'mixed' === $op ) {
			$op = array( 'add', 'subtract', 'multiply' )[ wp_rand( 0, 2 ) ];
		}
		$a = wp_rand( 1, 9 );
		$b = wp_rand( 1, 9 );
		if ( 'subtract' === $op && $b > $a ) {
			list( $a, $b ) = array( $b, $a );
		}
		$answer = 'add' === $op ? $a + $b : ( 'subtract' === $op ? $a - $b : $a * $b );
		$sign   = 'add' === $op ? '+' : ( 'subtract' === $op ? '−' : '×' );
		$time   = time();
		$fid    = isset( $field['id'] ) ? (string) $field['id'] : '';
		return array(
			'text'  => $a . ' ' . $sign . ' ' . $b,
			'token' => $time . '.' . wp_hash( $answer . '|' . $time . '|' . absint( $form_id ) . '|' . $fid ),
		);
	}

	/**
	 * Check a Math Captcha answer against its signed token (valid for 24 hours).
	 *
	 * @param array  $field   Field config.
	 * @param int    $form_id Form ID.
	 * @param string $answer  Posted answer.
	 * @param string $token   Posted token.
	 * @return bool
	 */
	public static function math_answer_ok( $field, $form_id, $answer, $token ) {
		$parts = explode( '.', (string) $token, 2 );
		if ( 2 !== count( $parts ) || ! ctype_digit( $parts[0] ) || ( time() - (int) $parts[0] ) > DAY_IN_SECONDS ) {
			return false;
		}
		$answer = trim( (string) $answer );
		if ( ! preg_match( '/^-?\d{1,3}$/', $answer ) ) {
			return false;
		}
		$fid = isset( $field['id'] ) ? (string) $field['id'] : '';
		return hash_equals( wp_hash( (int) $answer . '|' . $parts[0] . '|' . absint( $form_id ) . '|' . $fid ), $parts[1] );
	}

	/**
	 * Next value for a Unique ID field (sequential numbers are stored per form and field).
	 *
	 * @param array $field   Field config.
	 * @param int   $form_id Form ID.
	 * @return string
	 */
	public static function next_unique_id( $field, $form_id ) {
		$type   = isset( $field['id_type'] ) ? $field['id_type'] : 'sequential';
		$prefix = isset( $field['id_prefix'] ) ? (string) $field['id_prefix'] : '';
		$suffix = isset( $field['id_suffix'] ) ? (string) $field['id_suffix'] : '';
		if ( 'random' === $type ) {
			return $prefix . strtoupper( wp_generate_password( 8, false ) ) . $suffix;
		}
		$key = 'formglut_uid_' . absint( $form_id ) . '_' . sanitize_key( isset( $field['id'] ) ? $field['id'] : '' ) . ( 'date' === $type ? '_' . wp_date( 'Ymd' ) : '' );
		$start = 'date' === $type ? 1 : max( 1, absint( isset( $field['start_number'] ) ? $field['start_number'] : 1 ) );
		$next  = max( $start, (int) get_option( $key, $start - 1 ) + 1 );
		update_option( $key, $next, false );
		$pad   = 'date' === $type ? 3 : max( 1, min( 12, absint( isset( $field['number_length'] ) ? $field['number_length'] : 1 ) ) );
		$num   = str_pad( (string) $next, $pad, '0', STR_PAD_LEFT );
		return $prefix . ( 'date' === $type ? wp_date( 'Ymd' ) . '-' : '' ) . $num . $suffix;
	}

	/**
	 * Custom validation rule of a field (presets or a custom regular expression).
	 *
	 * @param array $field Field config.
	 * @return array|null { js: string (HTML pattern attribute), php: string (preg pattern), message: string }
	 */
	public static function field_pattern( $field ) {
		$presets = array(
			'letters'  => '[\p{L} .\'\\-]+',
			'alnum'    => '[\p{L}0-9 ]+',
			'digits'   => '[0-9]+',
			'postcode' => '[A-Za-z0-9 \\-]{2,12}',
		);
		$type = isset( $field['validation_pattern'] ) ? (string) $field['validation_pattern'] : '';
		if ( isset( $presets[ $type ] ) ) {
			$body = $presets[ $type ];
		} elseif ( 'custom' === $type && ! empty( $field['validation_regex'] ) ) {
			$body = trim( (string) $field['validation_regex'] );
			$body = preg_replace( '/^\^|\$$/', '', $body ); // Anchors are implied (HTML pattern matches the whole value).
		} else {
			return null;
		}
		$php = '/^(?:' . str_replace( '/', '\/', $body ) . ')$/u';
		if ( false === @preg_match( $php, '' ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors -- invalid user pattern is simply ignored.
			return null;
		}
		return array(
			'js'      => $body,
			'php'     => $php,
			'message' => ! empty( $field['pattern_message'] ) ? (string) $field['pattern_message'] : __( 'Please use the requested format.', 'formglut' ),
		);
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
				'settings'    => wp_json_encode( FormGlut_Form_Settings::sanitize( $data['settings'] ?? array(), true ) ),
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
			$raw = is_array( $data['settings'] ) ? $data['settings'] : array();
			$old = self::get( $id );
			$raw['_stored_custom_js'] = $old ? $old->settings['style']['custom_js'] : '';
			$fields['settings'] = wp_json_encode( FormGlut_Form_Settings::sanitize( $raw, true ) );
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
