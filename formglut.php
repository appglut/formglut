<?php
/**
 * Plugin Name: FormGlut — Drag & Drop Form Builder O
 * Plugin URI:  https://wordpress.org/plugins/formglut/
 * Description: A lightweight drag-and-drop form builder with a modern React-based editor, entry management, email notifications, and spam protection.
 * Version:     1.2.0
 * Author:      AppGlut
 * Author URI:  https://appglut.com
 * License:     GPL-2.0-or-later
 * Text Domain: formglut
 * Domain Path: /languages
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/* ── Constants ─────────────────────────────────────────────────────────── */

if ( ! defined( 'FORMGLUT_VERSION' ) ) {
	define( 'FORMGLUT_VERSION', '1.2.0' );
}

if ( ! defined( 'FORMGLUT_PLUGIN_DIR' ) ) {
	define( 'FORMGLUT_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'FORMGLUT_PLUGIN_URL' ) ) {
	define( 'FORMGLUT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'FORMGLUT_PLUGIN_BASENAME' ) ) {
	define( 'FORMGLUT_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
}

/* ── Autoload includes ─────────────────────────────────────────────────── */

formglut_require_files();

/**
 * Load all include files.
 *
 * @return void
 */
function formglut_require_files() {
	$includes = array(
		'includes/class-formglut-activator.php',
		'includes/class-formglut-deactivator.php',
		'includes/class-formglut-db.php',
		'includes/class-formglut-admin.php',
		'includes/class-formglut-ajax.php',
		'includes/class-formglut-shortcode.php',
		'includes/class-formglut-entry.php',
		'includes/class-formglut-form.php',
		'includes/class-formglut-form-settings.php',
		'includes/class-formglut-settings.php',
	);

	foreach ( $includes as $file ) {
		$path = FORMGLUT_PLUGIN_DIR . $file;
		if ( file_exists( $path ) ) {
			require_once $path;
		}
	}
}

/* ── Activation / Deactivation ─────────────────────────────────────────── */

register_activation_hook( __FILE__, 'formglut_activate' );
register_deactivation_hook( __FILE__, 'formglut_deactivate' );
register_uninstall_hook( __FILE__, 'formglut_uninstall' );

/**
 * Run on plugin activation.
 *
 * @return void
 */
function formglut_activate() {
	if ( class_exists( 'FormGlut_Activator' ) ) {
		FormGlut_Activator::activate();
	}
}

/**
 * Run on plugin deactivation.
 *
 * @return void
 */
function formglut_deactivate() {
	if ( class_exists( 'FormGlut_Deactivator' ) ) {
		FormGlut_Deactivator::deactivate();
	}
}

/**
 * Run on plugin uninstall.
 *
 * @return void
 */
function formglut_uninstall() {
	global $wpdb;

	$delete_data = get_option( 'formglut_delete_on_uninstall', false );

	if ( $delete_data ) {
		$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}formglut_entries" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.DirectDatabaseQuery.SchemaChange
		$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}formglut_forms" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.DirectDatabaseQuery.SchemaChange

		// Delete all formglut options.
		$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
				$wpdb->esc_like( 'formglut_' ) . '%'
			)
		);
	} else {
		// Always clean up the db_version marker.
		delete_option( 'formglut_db_version' );
	}
}

/* ── Initialize plugin ─────────────────────────────────────────────────── */

/**
 * Check if FormGlut Pro is enabled.
 *
 * @return bool
 */
function formglut_is_pro_enabled() {
	// Check if FormGlut Pro plugin is active
	if ( ! function_exists( 'is_plugin_active' ) ) {
		include_once ABSPATH . 'wp-admin/includes/plugin.php';
	}

	$is_pro_active = is_plugin_active( 'formglut-pro/formglut-pro.php' );

	/**
	 * Filter whether FormGlut Pro is enabled.
	 * Allows pro functionality to be enabled via license or other means.
	 *
	 * @param bool $is_pro_enabled Whether pro features are enabled.
	 */
	return apply_filters( 'formglut_is_pro_enabled', $is_pro_active );
}

add_action( 'plugins_loaded', 'formglut_init' );

/**
 * Register custom table names on the $wpdb object.
 *
 * This allows accessing tables as $wpdb->formglut_forms and $wpdb->formglut_entries.
 *
 * @return void
 */
function formglut_register_table_names() {
	global $wpdb;

	$wpdb->formglut_forms   = $wpdb->prefix . 'formglut_forms';
	$wpdb->formglut_entries = $wpdb->prefix . 'formglut_entries';
}

/**
 * Bootstrap the plugin.
 *
 * @return void
 */
function formglut_init() {
	// Load text domain for translations.
	load_plugin_textdomain( 'formglut', false, dirname( FORMGLUT_PLUGIN_BASENAME ) . '/languages' ); // phpcs:ignore PluginCheck.CodeAnalysis.DiscouragedFunctions.load_plugin_textdomainFound

	// Register custom table names on $wpdb.
	formglut_register_table_names();

	// Add the per-form settings column on installs that predate it, and schedule entry retention.
	if ( class_exists( 'FormGlut_Form_Settings' ) ) {
		FormGlut_Form_Settings::maybe_upgrade();
		FormGlut_Form_Settings::init_retention();
	}

	// Boot admin.
	if ( class_exists( 'FormGlut_Admin' ) ) {
		FormGlut_Admin::get_instance();
	}

	// Boot AJAX handlers.
	if ( class_exists( 'FormGlut_Ajax' ) ) {
		FormGlut_Ajax::get_instance();
	}

	// Boot shortcode.
	if ( class_exists( 'FormGlut_Shortcode' ) ) {
		FormGlut_Shortcode::get_instance();
	}
}
