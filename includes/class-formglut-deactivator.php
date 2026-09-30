<?php
/**
 * FormGlut Deactivator.
 *
 * Runs on plugin deactivation — cleans up transients and flushes rewrite rules.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Deactivator class.
 */
class FormGlut_Deactivator {

	/**
	 * Deactivate the plugin.
	 *
	 * @return void
	 */
	public static function deactivate() {
		self::clear_transients();
		wp_clear_scheduled_hook( 'formglut_retention_cleanup' );
		wp_clear_scheduled_hook( 'formglut_log_prune' );
		flush_rewrite_rules();
	}

	/**
	 * Delete all FormGlut transients.
	 *
	 * @return void
	 */
	private static function clear_transients() {
		global $wpdb;

		$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
				$wpdb->esc_like( '_transient_formglut_' ) . '%'
			)
		);

		$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
				$wpdb->esc_like( '_transient_timeout_formglut_' ) . '%'
			)
		);
	}
}
