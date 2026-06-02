<?php
/**
 * FormGlut Activator.
 *
 * Runs on plugin activation — creates database tables and sets default options.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Activator class.
 */
class FormGlut_Activator {

	/**
	 * Activate the plugin.
	 *
	 * @return void
	 */
	public static function activate() {
		self::create_tables();
		self::set_default_options();
		self::set_db_version();

		flush_rewrite_rules();
	}

	/**
	 * Create custom database tables.
	 *
	 * @return void
	 */
	private static function create_tables() {
		if ( ! class_exists( 'FormGlut_DB' ) ) {
			require_once FORMGLUT_PLUGIN_DIR . 'includes/class-formglut-db.php';
		}

		FormGlut_DB::create_tables();
	}

	/**
	 * Set default plugin options if they don't exist.
	 *
	 * @return void
	 */
	private static function set_default_options() {
		$defaults = array(
			'formglut_ajax_submit'          => true,
			'formglut_default_status'       => 'active',
			'formglut_store_entries'        => true,
			'formglut_admin_email'          => get_option( 'admin_email' ),
			'formglut_sender_name'          => __( 'FormGlut', 'formglut' ),
			'formglut_sender_email'         => '',
			'formglut_email_subject'        => __( 'New form submission: {form_name}', 'formglut' ),
			'formglut_honeypot'             => true,
			'formglut_recaptcha_enabled'    => false,
			'formglut_recaptcha_site_key'   => '',
			'formglut_recaptcha_secret_key' => '',
			'formglut_success_message'      => __( 'Thank you! Your submission has been received.', 'formglut' ),
			'formglut_error_message'        => __( 'Something went wrong. Please try again.', 'formglut' ),
			'formglut_delete_on_uninstall'  => false,
		);

		foreach ( $defaults as $key => $value ) {
			if ( false === get_option( $key ) ) {
				add_option( $key, $value );
			}
		}
	}

	/**
	 * Store the current database schema version.
	 *
	 * @return void
	 */
	private static function set_db_version() {
		update_option( 'formglut_db_version', FORMGLUT_VERSION );
	}
}
