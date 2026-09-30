<?php
/**
 * FormGlut Settings Helpers.
 *
 * Manages plugin settings stored in wp_options.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Settings class.
 */
class FormGlut_Settings {

	/**
	 * Get default option values.
	 *
	 * @return array
	 */
	private static function get_defaults() {
		return array(
			'formglut_ajax_submit'        => true,
			'formglut_default_status'     => 'active',
			'formglut_store_entries'      => true,
			'formglut_admin_email'        => '',
			'formglut_sender_name'        => __( 'FormGlut', 'formglut' ),
			'formglut_sender_email'       => '',
			'formglut_email_subject'      => __( 'New form submission: {form_name}', 'formglut' ),
			'formglut_honeypot'           => true,
			'formglut_recaptcha_enabled'  => false,
			'formglut_recaptcha_site_key' => '',
			'formglut_recaptcha_secret_key' => '',
			'formglut_recaptcha_version'  => 'v3',
			'formglut_recaptcha_score'    => 0.5,
			'formglut_hcaptcha_site_key'  => '',
			'formglut_hcaptcha_secret_key' => '',
			'formglut_turnstile_site_key' => '',
			'formglut_turnstile_secret_key' => '',
			'formglut_success_message'    => __( 'Thank you! Your submission has been received.', 'formglut' ),
			'formglut_error_message'      => __( 'Something went wrong. Please try again.', 'formglut' ),
			'formglut_delete_on_uninstall' => false,
		);
	}

	/**
	 * Get all option keys.
	 *
	 * @return array
	 */
	private static function get_option_keys() {
		return array_keys( self::get_defaults() );
	}

	/**
	 * Get all plugin settings.
	 *
	 * @return array
	 */
	public static function get_all() {
		$settings = array();
		$defaults = self::get_defaults();

		foreach ( self::get_option_keys() as $key ) {
			$default        = isset( $defaults[ $key ] ) ? $defaults[ $key ] : '';
			$settings[ $key ] = get_option( $key, $default );
		}

		return $settings;
	}

	/**
	 * Get a single setting.
	 *
	 * @param string $key     Option key.
	 * @param mixed  $default Default value.
	 * @return mixed
	 */
	public static function get( $key, $default = null ) {
		if ( null === $default ) {
			$defaults = self::get_defaults();
			if ( isset( $defaults[ $key ] ) ) {
				$default = $defaults[ $key ];
			}
		}

		return get_option( $key, $default );
	}

	/**
	 * Update a single setting.
	 *
	 * @param string $key   Option key.
	 * @param mixed  $value Option value.
	 * @return bool
	 */
	public static function update( $key, $value ) {
		if ( ! in_array( $key, self::get_option_keys(), true ) ) {
			return false;
		}

		return update_option( $key, $value );
	}

	/**
	 * Save multiple settings at once.
	 *
	 * @param array $settings Key-value pairs.
	 * @return bool True if all saved successfully.
	 */
	public static function save( $settings ) {
		$saved = true;

		// Boolean settings.
		$bool_keys = array( 'formglut_ajax_submit', 'formglut_store_entries', 'formglut_honeypot', 'formglut_recaptcha_enabled', 'formglut_delete_on_uninstall' );
		foreach ( $bool_keys as $key ) {
			if ( isset( $settings[ $key ] ) ) {
				$saved = self::update( $key, (bool) $settings[ $key ] ) && $saved;
			}
		}

		// String settings (plain text).
		$text_keys = array( 'formglut_sender_name', 'formglut_success_message', 'formglut_error_message', 'formglut_recaptcha_site_key', 'formglut_hcaptcha_site_key', 'formglut_hcaptcha_secret_key', 'formglut_turnstile_site_key', 'formglut_turnstile_secret_key' );
		foreach ( $text_keys as $key ) {
			if ( isset( $settings[ $key ] ) ) {
				$saved = self::update( $key, sanitize_text_field( $settings[ $key ] ) ) && $saved;
			}
		}

		// Email settings.
		if ( isset( $settings['formglut_admin_email'] ) ) {
			$email = sanitize_email( $settings['formglut_admin_email'] );
			$saved = self::update( 'formglut_admin_email', $email ) && $saved;
		}
		if ( isset( $settings['formglut_sender_email'] ) ) {
			$email = sanitize_email( $settings['formglut_sender_email'] );
			$saved = self::update( 'formglut_sender_email', $email ) && $saved;
		}

		// Email subject.
		if ( isset( $settings['formglut_email_subject'] ) ) {
			$saved = self::update( 'formglut_email_subject', sanitize_text_field( $settings['formglut_email_subject'] ) ) && $saved;
		}

		// Default status.
		if ( isset( $settings['formglut_default_status'] ) ) {
			$status = sanitize_text_field( $settings['formglut_default_status'] );
			if ( in_array( $status, array( 'active', 'draft', 'closed' ), true ) ) {
				$saved = self::update( 'formglut_default_status', $status ) && $saved;
			}
		}

		if ( isset( $settings['formglut_recaptcha_version'] ) && in_array( $settings['formglut_recaptcha_version'], array( 'v2', 'v3' ), true ) ) {
			$saved = self::update( 'formglut_recaptcha_version', $settings['formglut_recaptcha_version'] ) && $saved;
		}
		if ( isset( $settings['formglut_recaptcha_score'] ) ) {
			$saved = self::update( 'formglut_recaptcha_score', max( 0.0, min( 1.0, (float) $settings['formglut_recaptcha_score'] ) ) ) && $saved;
		}

		// reCAPTCHA secret key (keep as-is, no heavy sanitization).
		if ( isset( $settings['formglut_recaptcha_secret_key'] ) ) {
			$saved = self::update( 'formglut_recaptcha_secret_key', sanitize_text_field( $settings['formglut_recaptcha_secret_key'] ) ) && $saved;
		}

		return $saved;
	}

	/**
	 * Site key, secret and ready state for a captcha provider.
	 *
	 * @param string $provider recaptcha | hcaptcha | turnstile.
	 * @return array { site_key, secret, ready }
	 */
	public static function captcha( $provider ) {
		$site   = (string) self::get( 'formglut_' . $provider . '_site_key', '' );
		$secret = (string) self::get( 'formglut_' . $provider . '_secret_key', '' );
		return array(
			'site_key' => $site,
			'secret'   => $secret,
			'ready'    => '' !== $site && '' !== $secret,
		);
	}
}
