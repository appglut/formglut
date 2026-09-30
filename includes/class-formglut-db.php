<?php
/**
 * FormGlut Database.
 *
 * Creates and manages custom database tables for forms and entries.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_DB class.
 */
class FormGlut_DB {

	/**
	 * Create custom database tables using dbDelta().
	 *
	 * @return void
	 */
	public static function create_tables() {
		global $wpdb;

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		$charset_collate = $wpdb->get_charset_collate();

		$form_table      = self::get_form_table_name();
		$entry_table     = self::get_entry_table_name();

		$form_sql = "CREATE TABLE {$form_table} (
			id bigint UNSIGNED NOT NULL AUTO_INCREMENT,
			title varchar(255) NOT NULL DEFAULT '',
			status varchar(45) NOT NULL DEFAULT 'draft',
			appearance_settings text NOT NULL,
			form_fields longtext NOT NULL,
			submit_btn longtext NOT NULL,
			has_payment tinyint(1) NOT NULL DEFAULT 0,
			type varchar(45) NOT NULL DEFAULT '',
			conditions text NOT NULL,
			settings longtext NULL,
			views bigint UNSIGNED NOT NULL DEFAULT 0,
			created_by bigint UNSIGNED NOT NULL DEFAULT 0,
			created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY  (id)
		) {$charset_collate};";

		$entry_sql = "CREATE TABLE {$entry_table} (
			id bigint UNSIGNED NOT NULL AUTO_INCREMENT,
			form_id bigint UNSIGNED NOT NULL,
			fields_data longtext NOT NULL,
			status varchar(20) NOT NULL DEFAULT 'unread',
			starred tinyint(1) NOT NULL DEFAULT 0,
			ip_address varchar(45) NOT NULL DEFAULT '',
			browser varchar(255) NOT NULL DEFAULT '',
			source_url varchar(500) NOT NULL DEFAULT '',
			country varchar(100) NOT NULL DEFAULT '',
			created_at datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
			PRIMARY KEY  (id),
			KEY form_id (form_id)
		) {$charset_collate};";

		dbDelta( $form_sql );
		dbDelta( $entry_sql );
	}

	/**
	 * Get the fully qualified forms table name.
	 *
	 * @return string
	 */
	public static function get_form_table_name() {
		global $wpdb;
		return $wpdb->prefix . 'formglut_forms';
	}

	/**
	 * Get the fully qualified entries table name.
	 *
	 * @return string
	 */
	public static function get_entry_table_name() {
		global $wpdb;
		return $wpdb->prefix . 'formglut_entries';
	}
}
