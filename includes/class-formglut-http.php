<?php
/**
 * FormGlut HTTP: one place for outgoing requests to other services, so each is written to the API log.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Http class.
 */
class FormGlut_Http {

	/**
	 * Send a request and log it.
	 *
	 * @param string $service Name shown in the log (Slack, Mailchimp, Webhook …).
	 * @param string $url     URL.
	 * @param array  $args    wp_remote_request() arguments (method defaults to GET).
	 * @param int    $form_id Form the request belongs to (0 when none).
	 * @return array|WP_Error
	 */
	public static function request( $service, $url, $args = array(), $form_id = 0 ) {
		$args     = wp_parse_args( $args, array( 'method' => 'GET', 'timeout' => 8 ) );
		$cfg      = FormGlut_Log::settings();
		$fire_and_forget = isset( $args['blocking'] ) && false === $args['blocking'];

		// To log a status code the request has to wait for the answer.
		if ( $fire_and_forget && $cfg['api'] && $cfg['api_wait'] ) {
			$args['blocking'] = true;
			$args['timeout']  = 5;
			$fire_and_forget  = false;
		}

		$start = microtime(true);
		$res   = wp_remote_request( $url, $args );
		$ms    = (int) round( ( microtime(true) - $start ) * 1000 );

		$context = array( 'form_id' => (int) $form_id, 'request_bytes' => isset( $args['body'] ) ? strlen( is_array( $args['body'] ) ? http_build_query( $args['body'] ) : (string) $args['body'] ) : 0 );
		if ( is_wp_error( $res ) ) {
			$status           = 'error';
			$code             = 0;
			$context['error'] = $res->get_error_message();
		} elseif ( $fire_and_forget ) {
			$status = 'sent';
			$code   = 0;
		} else {
			$code                     = (int) wp_remote_retrieve_response_code( $res );
			$status                   = $code >= 200 && $code < 400 ? 'ok' : 'error';
			$context['response_bytes'] = strlen( (string) wp_remote_retrieve_body( $res ) );
			if ( 'error' === $status ) {
				$context['error'] = mb_substr( wp_strip_all_tags( (string) wp_remote_retrieve_body( $res ) ), 0, 300 );
			}
		}
		if ( $cfg['api_bodies'] ) {
			$context['request']  = mb_substr( is_array( $args['body'] ?? '' ) ? http_build_query( $args['body'] ) : (string) ( $args['body'] ?? '' ), 0, 4000 );
			$context['response'] = is_wp_error( $res ) || $fire_and_forget ? '' : mb_substr( (string) wp_remote_retrieve_body( $res ), 0, 4000 );
		}

		FormGlut_Log::api( $service, $args['method'], $url, $status, $code, $ms, $context );
		return $res;
	}
}
