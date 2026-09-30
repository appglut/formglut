<?php
/**
 * FormGlut Tools: export / import with options, logs, system status and maintenance.
 * Backs the Tools page (FormGlut → Tools).
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Tools class.
 */
class FormGlut_Tools {

	const PRUNE_HOOK = 'formglut_log_prune';

	/**
	 * Register AJAX actions and the daily log clean-up.
	 *
	 * @return void
	 */
	public static function init() {
		foreach ( array( 'export', 'import_preview', 'import', 'logs', 'log_events', 'clear_logs', 'log_settings', 'status', 'maintenance' ) as $action ) {
			add_action( "wp_ajax_formglut_tools_{$action}", array( __CLASS__, $action ) );
		}
		add_action( self::PRUNE_HOOK, array( 'FormGlut_Log', 'prune' ) );
		if ( ! wp_next_scheduled( self::PRUNE_HOOK ) ) {
			wp_schedule_event( time() + HOUR_IN_SECONDS, 'daily', self::PRUNE_HOOK );
		}
	}

	/**
	 * Nonce + capability check for every Tools request.
	 *
	 * @return void
	 */
	private static function guard() {
		check_ajax_referer( 'formglut_nonce', 'nonce' );
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Unauthorized.', 'formglut' ) ), 403 );
		}
	}

	/* ── Export ───────────────────────────────────────────────────────── */

	/**
	 * Download forms (and optionally their entries) as one JSON file.
	 *
	 * @return void
	 */
	public static function export() {
		self::guard();
		global $wpdb;

		$raw  = isset( $_GET['ids'] ) ? sanitize_text_field( wp_unslash( $_GET['ids'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$ids  = 'all' === $raw ? array_map( 'absint', $wpdb->get_col( "SELECT id FROM {$wpdb->formglut_forms} ORDER BY id" ) ) : array_filter( array_map( 'absint', explode( ',', $raw ) ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$with = ! empty( $_GET['entries'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		$forms = array();
		foreach ( $ids as $id ) {
			$form = FormGlut_Form::get( $id );
			if ( ! $form ) {
				continue;
			}
			$item = array(
				'source_id'  => (int) $form->id,
				'title'      => $form->title,
				'status'     => $form->status,
				'fields'     => $form->fields,
				'submit_btn' => $form->submit_btn,
				'settings'   => $form->settings,
			);
			if ( $with ) {
				$item['entries'] = array();
				$rows            = FormGlut_Entry::get_entries( array( 'form_id' => $form->id, 'per_page' => 5000, 'orderby' => 'id', 'order' => 'ASC' ) )['entries'];
				foreach ( $rows as $e ) {
					$item['entries'][] = array(
						'fields_data' => $e->fields_data,
						'status'      => $e->status,
						'starred'     => (int) $e->starred,
						'created_at'  => $e->created_at,
						'notes'       => isset( $e->notes ) && $e->notes ? json_decode( $e->notes, true ) : array(),
					);
				}
			}
			$forms[] = $item;
		}
		if ( empty( $forms ) ) {
			wp_die( esc_html__( 'No forms to export.', 'formglut' ) );
		}

		FormGlut_Log::activity( 'tools.export', sprintf( /* translators: 1: number of forms, 2: yes / no */ __( 'Exported %1$d form(s) (entries included: %2$s)', 'formglut' ), count( $forms ), $with ? __( 'yes', 'formglut' ) : __( 'no', 'formglut' ) ), 'tools', 0, array( 'ids' => wp_list_pluck( $forms, 'source_id' ) ) );

		nocache_headers();
		header( 'Content-Type: application/json; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename="' . ( 1 === count( $forms ) ? sanitize_title( $forms[0]['title'] ) : 'formglut-forms' ) . '-' . gmdate( 'Y-m-d' ) . '.json"' );
		echo wp_json_encode( array( 'plugin' => 'formglut', 'version' => FORMGLUT_VERSION, 'exported' => gmdate( 'c' ), 'site' => home_url(), 'forms' => $forms ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- JSON download.
		exit;
	}

	/* ── Import ───────────────────────────────────────────────────────── */

	/**
	 * Decode an uploaded export file.
	 *
	 * @return array|WP_Error Forms list.
	 */
	private static function read_file() {
		$json = isset( $_POST['data'] ) ? wp_unslash( $_POST['data'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput
		$data = json_decode( $json, true );
		if ( ! is_array( $data ) || empty( $data['forms'] ) || ! is_array( $data['forms'] ) || ( isset( $data['plugin'] ) && 'formglut' !== $data['plugin'] ) ) {
			return new WP_Error( 'bad_file', __( 'This is not a FormGlut export file.', 'formglut' ) );
		}
		return array_slice( $data['forms'], 0, 200 );
	}

	/**
	 * Summarise what an export file contains, before importing it.
	 *
	 * @return void
	 */
	public static function import_preview() {
		self::guard();
		global $wpdb;
		$forms = self::read_file();
		if ( is_wp_error( $forms ) ) {
			wp_send_json_error( array( 'message' => $forms->get_error_message() ) );
		}
		$out = array();
		foreach ( $forms as $i => $f ) {
			if ( ! is_array( $f ) || empty( $f['title'] ) ) {
				continue;
			}
			$count = 0;
			$walk  = static function ( $list ) use ( &$walk, &$count ) {
				foreach ( (array) $list as $x ) {
					if ( ! empty( $x['columns'] ) ) {
						foreach ( $x['columns'] as $c ) {
							$walk( $c['fields'] ?? array() );
						}
					} else {
						++$count;
					}
				}
			};
			$walk( $f['fields'] ?? array() );
			$out[] = array(
				'index'   => $i,
				'title'   => (string) $f['title'],
				'fields'  => $count,
				'entries' => isset( $f['entries'] ) && is_array( $f['entries'] ) ? count( $f['entries'] ) : 0,
				'exists'  => (bool) $wpdb->get_var( $wpdb->prepare( "SELECT id FROM {$wpdb->formglut_forms} WHERE title = %s LIMIT 1", $f['title'] ) ), // phpcs:ignore WordPress.DB.DirectDatabaseQuery
			);
		}
		wp_send_json_success( array( 'forms' => $out ) );
	}

	/**
	 * Import the chosen forms.
	 *
	 * @return void
	 */
	public static function import() {
		self::guard();
		global $wpdb;
		$forms = self::read_file();
		if ( is_wp_error( $forms ) ) {
			wp_send_json_error( array( 'message' => $forms->get_error_message() ) );
		}
		$pick    = isset( $_POST['pick'] ) ? array_map( 'absint', (array) json_decode( wp_unslash( $_POST['pick'] ), true ) ) : array_keys( $forms ); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput
		$status  = isset( $_POST['status'] ) ? sanitize_key( wp_unslash( $_POST['status'] ) ) : 'draft'; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$status  = in_array( $status, array( 'draft', 'keep', 'active' ), true ) ? $status : 'draft';
		$entries = ! empty( $_POST['entries'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$ajax    = FormGlut_Ajax::get_instance();
		$sanitize_fields = new ReflectionMethod( 'FormGlut_Ajax', 'sanitize_form_fields' );
		$sanitize_fields->setAccessible( true );
		$sanitize_btn = new ReflectionMethod( 'FormGlut_Ajax', 'sanitize_submit_btn' );
		$sanitize_btn->setAccessible( true );

		$created = array();
		$n_entries = 0;
		foreach ( $pick as $i ) {
			$f = isset( $forms[ $i ] ) && is_array( $forms[ $i ] ) ? $forms[ $i ] : null;
			if ( ! $f || empty( $f['title'] ) || ! isset( $f['fields'] ) || ! is_array( $f['fields'] ) ) {
				continue;
			}
			$new_status = 'draft' === $status ? 'draft' : ( 'active' === $status ? 'active' : ( in_array( $f['status'] ?? '', array( 'active', 'draft', 'closed', 'published' ), true ) ? $f['status'] : 'draft' ) );
			$form_id    = FormGlut_Form::create( array(
				'title'      => sanitize_text_field( $f['title'] ),
				'fields'     => $sanitize_fields->invoke( $ajax, $f['fields'] ),
				'submit_btn' => $sanitize_btn->invoke( $ajax, isset( $f['submit_btn'] ) && is_array( $f['submit_btn'] ) ? $f['submit_btn'] : array() ),
				'settings'   => isset( $f['settings'] ) && is_array( $f['settings'] ) ? $f['settings'] : array(),
				'status'     => $new_status,
			) );
			if ( ! $form_id ) {
				continue;
			}
			$created[] = $form_id;
			if ( $entries && ! empty( $f['entries'] ) && is_array( $f['entries'] ) ) {
				foreach ( array_slice( $f['entries'], 0, 5000 ) as $e ) {
					if ( ! is_array( $e ) || empty( $e['fields_data'] ) || ! is_array( $e['fields_data'] ) ) {
						continue;
					}
					$entry_id = FormGlut_Entry::create( array(
						'form_id'     => $form_id,
						'fields_data' => $e['fields_data'],
						'status'      => in_array( $e['status'] ?? '', array( 'unread', 'read', 'spam', 'trash' ), true ) ? $e['status'] : 'read',
						'starred'     => ! empty( $e['starred'] ) ? 1 : 0,
					) );
					if ( $entry_id ) {
						++$n_entries;
						$fix = array();
						if ( ! empty( $e['created_at'] ) && preg_match( '/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $e['created_at'] ) ) {
							$fix['created_at'] = $e['created_at'];
						}
						if ( ! empty( $e['notes'] ) && is_array( $e['notes'] ) ) {
							$fix['notes'] = wp_json_encode( array_map( static function ( $n ) {
								return array( 'id' => (string) ( $n['id'] ?? wp_rand() ), 'text' => sanitize_textarea_field( $n['text'] ?? '' ), 'author' => sanitize_text_field( $n['author'] ?? '' ), 'date' => sanitize_text_field( $n['date'] ?? '' ) );
							}, $e['notes'] ) );
						}
						if ( $fix ) {
							$wpdb->update( $wpdb->formglut_entries, $fix, array( 'id' => $entry_id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
						}
					}
				}
			}
		}
		if ( empty( $created ) ) {
			wp_send_json_error( array( 'message' => __( 'No forms could be imported from this file.', 'formglut' ) ) );
		}
		FormGlut_Log::activity( 'tools.import', sprintf( /* translators: 1: forms, 2: entries */ __( 'Imported %1$d form(s) and %2$d entries from a file', 'formglut' ), count( $created ), $n_entries ), 'tools', 0, array( 'ids' => $created ) );
		wp_send_json_success( array(
			/* translators: 1: forms, 2: entries */
			'message' => sprintf( __( 'Imported %1$d form(s) and %2$d entries.', 'formglut' ), count( $created ), $n_entries ),
			'ids'     => $created,
		) );
	}

	/* ── Logs ─────────────────────────────────────────────────────────── */

	/**
	 * A page of log rows.
	 *
	 * @return void
	 */
	public static function logs() {
		self::guard();
		wp_send_json_success( FormGlut_Log::query( array(
			'type'      => isset( $_GET['type'] ) ? sanitize_key( wp_unslash( $_GET['type'] ) ) : 'activity', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			'search'    => isset( $_GET['search'] ) ? sanitize_text_field( wp_unslash( $_GET['search'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			'status'    => isset( $_GET['status'] ) ? sanitize_key( wp_unslash( $_GET['status'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			'event'     => isset( $_GET['event'] ) ? sanitize_text_field( wp_unslash( $_GET['event'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			'date_from' => isset( $_GET['date_from'] ) ? sanitize_text_field( wp_unslash( $_GET['date_from'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			'date_to'   => isset( $_GET['date_to'] ) ? sanitize_text_field( wp_unslash( $_GET['date_to'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			'page'      => isset( $_GET['page'] ) ? absint( $_GET['page'] ) : 1, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			'per_page'  => isset( $_GET['per_page'] ) ? absint( $_GET['per_page'] ) : 25, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		) ) );
	}

	/**
	 * Distinct events for the filter dropdown.
	 *
	 * @return void
	 */
	public static function log_events() {
		self::guard();
		wp_send_json_success( array( 'events' => FormGlut_Log::events( isset( $_GET['type'] ) ? sanitize_key( wp_unslash( $_GET['type'] ) ) : 'activity' ) ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}

	/**
	 * Delete the log of one type.
	 *
	 * @return void
	 */
	public static function clear_logs() {
		self::guard();
		$type = isset( $_POST['type'] ) ? sanitize_key( wp_unslash( $_POST['type'] ) ) : 'activity'; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$n    = FormGlut_Log::clear( in_array( $type, array( 'activity', 'api', 'all' ), true ) ? $type : 'activity' );
		FormGlut_Log::activity( 'tools.logs_cleared', sprintf( /* translators: 1: number of rows, 2: log name */ __( '%1$d row(s) deleted from the %2$s log', 'formglut' ), $n, $type ), 'tools' );
		/* translators: %d: number of rows */
		wp_send_json_success( array( 'message' => sprintf( __( '%d log row(s) deleted.', 'formglut' ), $n ) ) );
	}

	/**
	 * Read or save log settings.
	 *
	 * @return void
	 */
	public static function log_settings() {
		self::guard();
		if ( isset( $_POST['settings'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$raw = json_decode( wp_unslash( $_POST['settings'] ), true ); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput
			wp_send_json_success( array( 'settings' => FormGlut_Log::save_settings( $raw ) ) );
		}
		wp_send_json_success( array( 'settings' => FormGlut_Log::settings() ) );
	}

	/* ── System status ────────────────────────────────────────────────── */

	/**
	 * Environment and health checks.
	 *
	 * @return void
	 */
	public static function status() {
		self::guard();
		global $wpdb;

		$table_ok = static function ( $t ) use ( $wpdb ) {
			return (bool) $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $t ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		};
		$col_ok   = static function ( $t, $c ) use ( $wpdb ) {
			return (bool) $wpdb->get_var( $wpdb->prepare( "SHOW COLUMNS FROM {$t} LIKE %s", $c ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		};
		$dirs   = wp_get_upload_dir();
		$folder = trailingslashit( $dirs['basedir'] ) . 'formglut';
		$keys   = FormGlut_Payments::keys();
		$active = array();
		foreach ( array( 'wpforms-lite/wpforms.php' => 'WPForms', 'fluentform/fluentform.php' => 'Fluent Forms', 'ninja-forms/ninja-forms.php' => 'Ninja Forms', 'forminator/forminator.php' => 'Forminator', 'metform/metform.php' => 'MetForm', 'sureforms/sureforms.php' => 'SureForms', 'formidable/formidable.php' => 'Formidable', 'form-maker/form-maker.php' => 'Form Maker', 'gutena-forms/gutena-forms.php' => 'Gutena Forms', 'akismet/akismet.php' => 'Akismet', 'formglut-pro/formglut-pro.php' => 'FormGlut Pro' ) as $file => $name ) {
			if ( in_array( $file, (array) get_option( 'active_plugins', array() ), true ) ) {
				$active[] = $name;
			}
		}

		$checks = array(
			array( __( 'Forms table', 'formglut' ), $table_ok( $wpdb->formglut_forms ) && $col_ok( $wpdb->formglut_forms, 'settings' ), '' ),
			array( __( 'Entries table', 'formglut' ), $table_ok( $wpdb->formglut_entries ) && $col_ok( $wpdb->formglut_entries, 'notes' ), '' ),
			array( __( 'Logs table', 'formglut' ), $table_ok( FormGlut_Log::table() ), '' ),
			array( __( 'Uploads folder is writable', 'formglut' ), wp_mkdir_p( $folder ) && wp_is_writable( $folder ), $folder ),
			array( __( 'Daily clean-up scheduled', 'formglut' ), (bool) wp_next_scheduled( FormGlut_Form_Settings::RETENTION_HOOK ), '' ),
			array( __( 'WordPress cron enabled', 'formglut' ), ! ( defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON ), defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON ? __( 'DISABLE_WP_CRON is set: make sure a real cron calls wp-cron.php.', 'formglut' ) : '' ),
			array( __( 'HTTPS', 'formglut' ), is_ssl() || 0 === strpos( home_url(), 'https://' ), __( 'Payments and many integrations need HTTPS.', 'formglut' ) ),
			array( __( 'Sender email set', 'formglut' ), is_email( FormGlut_Settings::get( 'formglut_sender_email', '' ) ), __( 'Emails from an address on your own domain are delivered more reliably.', 'formglut' ) ),
		);

		wp_send_json_success( array(
			'environment'  => array(
				'FormGlut'        => FORMGLUT_VERSION . ' (database ' . get_option( 'formglut_schema_version', '1' ) . ')',
				'FormGlut Pro'    => formglut_is_pro_enabled() ? __( 'active', 'formglut' ) : __( 'not active', 'formglut' ),
				'WordPress'       => get_bloginfo( 'version' ) . ( is_multisite() ? ' (multisite)' : '' ),
				'PHP'             => PHP_VERSION,
				'MySQL / MariaDB' => $wpdb->db_version(),
				'Memory limit'    => WP_MEMORY_LIMIT . ' / max ' . ini_get( 'memory_limit' ),
				'Max upload'      => size_format( wp_max_upload_size() ),
				'Max execution'   => ini_get( 'max_execution_time' ) . 's',
				'WP_DEBUG'        => WP_DEBUG ? 'on' : 'off',
				'Timezone'        => wp_timezone_string(),
				'Site URL'        => home_url(),
				'Theme'           => wp_get_theme()->get( 'Name' ),
				'Related plugins' => $active ? implode( ', ', $active ) : '—',
			),
			'checks'       => array_map( static function ( $c ) {
				return array( 'label' => $c[0], 'ok' => (bool) $c[1], 'note' => $c[2] );
			}, $checks ),
			'counts'       => array(
				'forms'    => (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_forms}" ), // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				'entries'  => (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_entries}" ), // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				'spam'     => (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_entries} WHERE status = 'spam'" ), // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				'trash'    => (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_entries} WHERE status = 'trash'" ), // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				'activity' => (int) $wpdb->get_var( 'SELECT COUNT(*) FROM ' . FormGlut_Log::table() . " WHERE type = 'activity'" ), // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				'api'      => (int) $wpdb->get_var( 'SELECT COUNT(*) FROM ' . FormGlut_Log::table() . " WHERE type = 'api'" ), // phpcs:ignore WordPress.DB.DirectDatabaseQuery
			),
			'integrations' => array(
				array( 'Stripe', '' !== $keys['publishable'] && '' !== $keys['secret'], $keys['mode'] ),
				array( 'Mailchimp', '' !== trim( (string) FormGlut_Settings::get( 'formglut_mailchimp_api_key', '' ) ), '' ),
				array( 'HubSpot', '' !== trim( (string) FormGlut_Settings::get( 'formglut_hubspot_token', '' ) ), '' ),
				array( 'reCAPTCHA', '' !== FormGlut_Settings::get( 'formglut_recaptcha_site_key', '' ) && '' !== FormGlut_Settings::get( 'formglut_recaptcha_secret_key', '' ), '' ),
				array( 'hCaptcha', '' !== FormGlut_Settings::get( 'formglut_hcaptcha_site_key', '' ) && '' !== FormGlut_Settings::get( 'formglut_hcaptcha_secret_key', '' ), '' ),
				array( 'Turnstile', '' !== FormGlut_Settings::get( 'formglut_turnstile_site_key', '' ) && '' !== FormGlut_Settings::get( 'formglut_turnstile_secret_key', '' ), '' ),
			),
		) );
	}

	/* ── Maintenance ──────────────────────────────────────────────────── */

	/**
	 * Clean-up actions.
	 *
	 * @return void
	 */
	public static function maintenance() {
		self::guard();
		global $wpdb;
		$action = isset( $_POST['task'] ) ? sanitize_key( wp_unslash( $_POST['task'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$n      = 0;
		switch ( $action ) {
			case 'delete_spam':
			case 'delete_trash':
				$status = 'delete_spam' === $action ? 'spam' : 'trash';
				$ids    = $wpdb->get_col( $wpdb->prepare( "SELECT id FROM {$wpdb->formglut_entries} WHERE status = %s", $status ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				foreach ( $ids as $id ) {
					$n += FormGlut_Entry::delete( $id ) ? 1 : 0;
				}
				break;
			case 'prune_logs':
				$n = FormGlut_Log::prune();
				break;
			case 'run_retention':
				$before = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_entries}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				FormGlut_Form_Settings::run_retention();
				$n = $before - (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_entries}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				break;
			case 'clear_email_log':
				delete_option( 'formglut_email_log_items' );
				break;
			case 'clear_rate_limits':
				$n = (int) $wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s", $wpdb->esc_like( '_transient_formglut_rl_' ) . '%', $wpdb->esc_like( '_transient_timeout_formglut_rl_' ) . '%' ) ) / 2; // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				break;
			case 'repair_tables':
				FormGlut_DB::create_tables();
				update_option( 'formglut_schema_version', FormGlut_Form_Settings::SCHEMA_VERSION );
				break;
			default:
				wp_send_json_error( array( 'message' => __( 'Unknown task.', 'formglut' ) ) );
		}
		FormGlut_Log::activity( 'tools.maintenance', sprintf( /* translators: 1: task, 2: count */ __( 'Maintenance task “%1$s” ran (%2$d affected)', 'formglut' ), $action, $n ), 'tools', 0, array( 'task' => $action, 'affected' => $n ) );
		/* translators: %d: number of items */
		wp_send_json_success( array( 'message' => sprintf( __( 'Done. %d item(s) affected.', 'formglut' ), (int) $n ) ) );
	}
}
