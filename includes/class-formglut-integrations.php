<?php
/**
 * FormGlut Integrations: Mailchimp and HubSpot.
 *
 * Keys are stored in Global Settings; each form maps its fields in Form Settings › Integrations.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Integrations class.
 */
class FormGlut_Integrations {

	/**
	 * Send a submission to every integration the form uses.
	 *
	 * @param object $form        Form row.
	 * @param array  $fields_data Submitted values.
	 * @return void
	 */
	public static function dispatch( $form, $fields_data ) {
		$i = $form->settings['integrations'];
		if ( ! empty( $i['mailchimp_enabled'] ) ) {
			self::mailchimp( $i, $fields_data, (int) $form->id );
		}
		if ( ! empty( $i['hubspot_enabled'] ) ) {
			self::hubspot( $i, $fields_data, (int) $form->id );
		}
	}

	/**
	 * Mailchimp base URL and auth header for the saved API key, or null.
	 *
	 * @return array|null
	 */
	private static function mailchimp_api() {
		$key = trim( (string) FormGlut_Settings::get( 'formglut_mailchimp_api_key', '' ) );
		if ( ! preg_match( '/-([a-z]{2,4}\d{1,3})$/', $key, $m ) ) {
			return null;
		}
		return array(
			'base'    => 'https://' . $m[1] . '.api.mailchimp.com/3.0/',
			'headers' => array( 'Authorization' => 'Basic ' . base64_encode( 'formglut:' . $key ), 'Content-Type' => 'application/json' ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode -- HTTP basic auth.
		);
	}

	/**
	 * Audiences of the connected Mailchimp account.
	 *
	 * @return array|WP_Error list of { id, name }
	 */
	public static function mailchimp_lists() {
		$api = self::mailchimp_api();
		if ( ! $api ) {
			return new WP_Error( 'no_key', __( 'Add a valid Mailchimp API key in Global Settings › Integrations first.', 'formglut' ) );
		}
		$res = FormGlut_Http::request( 'Mailchimp', $api['base'] . 'lists?count=200&fields=lists.id,lists.name', array( 'headers' => $api['headers'], 'timeout' => 10 ) );
		if ( is_wp_error( $res ) ) {
			return $res;
		}
		$body = json_decode( wp_remote_retrieve_body( $res ), true );
		if ( 200 !== wp_remote_retrieve_response_code( $res ) ) {
			return new WP_Error( 'mailchimp', ! empty( $body['detail'] ) ? $body['detail'] : __( 'Mailchimp did not accept the API key.', 'formglut' ) );
		}
		return array_map( static function ( $l ) {
			return array( 'id' => $l['id'], 'name' => $l['name'] );
		}, isset( $body['lists'] ) ? $body['lists'] : array() );
	}

	/**
	 * Value of a mapped field.
	 *
	 * @param array  $data Submitted values.
	 * @param string $id   Field ID.
	 * @return string
	 */
	private static function val( $data, $id ) {
		if ( '' === (string) $id || ! isset( $data[ $id ] ) ) {
			return '';
		}
		return is_array( $data[ $id ] ) ? implode( ', ', $data[ $id ] ) : trim( (string) $data[ $id ] );
	}

	/**
	 * Add or update the subscriber in a Mailchimp audience.
	 *
	 * @param array $i    Integration settings.
	 * @param array $data Submitted values.
	 * @return void
	 */
	private static function mailchimp( $i, $data, $form_id = 0 ) {
		$api   = self::mailchimp_api();
		$email = self::val( $data, $i['mailchimp_email'] );
		if ( ! $api || '' === $i['mailchimp_list'] || ! is_email( $email ) ) {
			return;
		}
		// Optional consent: only subscribe when the chosen checkbox / toggle has a value.
		if ( '' !== $i['mailchimp_consent'] ) {
			$consent = self::val( $data, $i['mailchimp_consent'] );
			if ( '' === $consent || in_array( strtolower( $consent ), array( 'no', 'off', '0', 'false' ), true ) ) {
				return;
			}
		}
		$merge = array_filter( array( 'FNAME' => self::val( $data, $i['mailchimp_first'] ), 'LNAME' => self::val( $data, $i['mailchimp_last'] ) ), 'strlen' );
		$url   = $api['base'] . 'lists/' . rawurlencode( $i['mailchimp_list'] ) . '/members/' . md5( strtolower( $email ) );
		$body  = array( 'email_address' => $email, 'status_if_new' => ! empty( $i['mailchimp_double'] ) ? 'pending' : 'subscribed' );
		if ( $merge ) {
			$body['merge_fields'] = $merge;
		}
		FormGlut_Http::request( 'Mailchimp', $url, array( 'method' => 'PUT', 'headers' => $api['headers'], 'timeout' => 8, 'body' => wp_json_encode( $body ) ), $form_id );

		$tags = array_filter( array_map( 'trim', explode( ',', (string) $i['mailchimp_tags'] ) ) );
		if ( $tags ) {
			FormGlut_Http::request( 'Mailchimp', $url . '/tags', array(
				'method'   => 'POST',
				'headers'  => $api['headers'],
				'timeout'  => 5,
				'blocking' => false,
				'body'     => wp_json_encode( array( 'tags' => array_map( static function ( $t ) {
					return array( 'name' => $t, 'status' => 'active' );
				}, $tags ) ) ),
			), $form_id );
		}
	}

	/**
	 * Create or update a HubSpot contact.
	 *
	 * @param array $i    Integration settings.
	 * @param array $data Submitted values.
	 * @return void
	 */
	private static function hubspot( $i, $data, $form_id = 0 ) {
		$token = trim( (string) FormGlut_Settings::get( 'formglut_hubspot_token', '' ) );
		$email = self::val( $data, $i['hubspot_email'] );
		if ( '' === $token || ! is_email( $email ) ) {
			return;
		}
		$props = array_filter( array(
			'email'     => $email,
			'firstname' => self::val( $data, $i['hubspot_first'] ),
			'lastname'  => self::val( $data, $i['hubspot_last'] ),
			'phone'     => self::val( $data, $i['hubspot_phone'] ),
			'company'   => self::val( $data, $i['hubspot_company'] ),
			'message'   => self::val( $data, $i['hubspot_message'] ),
		), 'strlen' );
		$args  = array( 'headers' => array( 'Authorization' => 'Bearer ' . $token, 'Content-Type' => 'application/json' ), 'timeout' => 8, 'body' => wp_json_encode( array( 'properties' => $props ) ) );
		$args['method'] = 'POST';
		$res            = FormGlut_Http::request( 'HubSpot', 'https://api.hubapi.com/crm/v3/objects/contacts', $args, $form_id );
		if ( ! is_wp_error( $res ) && 409 === wp_remote_retrieve_response_code( $res ) ) {
			// The contact exists: update it instead.
			$args['method'] = 'PATCH';
			FormGlut_Http::request( 'HubSpot', 'https://api.hubapi.com/crm/v3/objects/contacts/' . rawurlencode( $email ) . '?idProperty=email', $args, $form_id );
		}
	}
}
