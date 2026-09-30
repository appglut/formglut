<?php
/**
 * FormGlut Payments: one-time Stripe payments for the free plugin.
 *
 * Flow: the browser sends the form with formglut_pay_step=intent → the server validates everything,
 * works out the amount itself and creates a PaymentIntent → the browser confirms it with Stripe →
 * the browser sends the form again with the PaymentIntent ID → the server checks it with Stripe
 * (succeeded, same amount and currency, this form, not used before) and only then saves the entry.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Payments class.
 */
class FormGlut_Payments {

	/**
	 * Stripe keys for the current mode.
	 *
	 * @return array { publishable, secret, mode }
	 */
	public static function keys() {
		$mode = 'live' === FormGlut_Settings::get( 'formglut_stripe_mode', 'test' ) ? 'live' : 'test';
		return array(
			'mode'        => $mode,
			'publishable' => trim( (string) FormGlut_Settings::get( 'formglut_stripe_' . $mode . '_publishable', '' ) ),
			'secret'      => trim( (string) FormGlut_Settings::get( 'formglut_stripe_' . $mode . '_secret', '' ) ),
		);
	}

	/**
	 * Currency code, symbol and decimal places.
	 *
	 * @return array { code, symbol, decimals }
	 */
	public static function currency() {
		$all  = FormGlut_Settings::currencies();
		$code = FormGlut_Settings::get( 'formglut_currency', 'USD' );
		$code = isset( $all[ $code ] ) ? $code : 'USD';
		return array( 'code' => $code, 'symbol' => $all[ $code ][0], 'decimals' => $all[ $code ][1] );
	}

	/**
	 * The Card Payment field of a form, if any.
	 *
	 * @param array $flat_fields Flattened fields.
	 * @return array|null
	 */
	public static function card_field( $flat_fields ) {
		foreach ( $flat_fields as $f ) {
			if ( 'stripe_card' === ( $f['type'] ?? '' ) && FormGlut_Form::field_visible( $f ) ) {
				return $f;
			}
		}
		return null;
	}

	/**
	 * Price of a Payment Item for this submission (fixed price, or the amount the visitor typed).
	 *
	 * @param array $field  Payment Item field.
	 * @param mixed $posted Posted value.
	 * @return float
	 */
	public static function item_amount( $field, $posted ) {
		if ( 'custom' === ( $field['item_type'] ?? 'fixed' ) ) {
			$v = is_scalar( $posted ) ? preg_replace( '/[^0-9.]/', '', (string) $posted ) : '';
			return is_numeric( $v ) ? round( (float) $v, 2 ) : 0;
		}
		return round( max( 0, (float) ( $field['amount'] ?? 0 ) ), 2 );
	}

	/**
	 * Total to charge, worked out on the server.
	 *
	 * @param array $card        Card Payment field.
	 * @param array $flat_fields Flattened fields.
	 * @param array $fields_data Sanitized submitted values (calculations already done).
	 * @return float
	 */
	public static function total( $card, $flat_fields, $fields_data ) {
		if ( 'calc' === ( $card['amount_source'] ?? 'items' ) && ! empty( $card['amount_field'] ) ) {
			$v = isset( $fields_data[ $card['amount_field'] ] ) ? preg_replace( '/[^0-9.\-]/', '', (string) $fields_data[ $card['amount_field'] ] ) : '';
			return is_numeric( $v ) ? max( 0, round( (float) $v, 2 ) ) : 0;
		}
		$sum = 0;
		foreach ( $flat_fields as $f ) {
			if ( 'payment_item' === ( $f['type'] ?? '' ) && ! empty( $f['id'] ) && array_key_exists( $f['id'], $fields_data ) ) {
				$sum += (float) $fields_data[ $f['id'] ];
			}
		}
		return round( $sum, 2 );
	}

	/**
	 * Amount in the currency's smallest unit (cents).
	 *
	 * @param float $amount Amount.
	 * @return int
	 */
	public static function minor( $amount ) {
		return (int) round( $amount * ( 10 ** self::currency()['decimals'] ) );
	}

	/**
	 * Call the Stripe API.
	 *
	 * @param string $method GET or POST.
	 * @param string $path   Path after /v1/.
	 * @param array  $body   Form body.
	 * @return array|WP_Error Decoded response.
	 */
	private static function stripe( $method, $path, $body = array(), $form_id = 0 ) {
		$keys = self::keys();
		if ( '' === $keys['secret'] ) {
			return new WP_Error( 'stripe_keys', __( 'Payments are not set up yet. Please contact the site owner.', 'formglut' ) );
		}
		$res = FormGlut_Http::request( 'Stripe', 'https://api.stripe.com/v1/' . $path, array(
			'method'  => $method,
			'timeout' => 20,
			'headers' => array( 'Authorization' => 'Bearer ' . $keys['secret'], 'Stripe-Version' => '2024-06-20' ),
			'body'    => $body ? $body : null,
		), $form_id );
		if ( is_wp_error( $res ) ) {
			return $res;
		}
		$data = json_decode( wp_remote_retrieve_body( $res ), true );
		if ( wp_remote_retrieve_response_code( $res ) >= 400 || ! is_array( $data ) ) {
			return new WP_Error( 'stripe', ! empty( $data['error']['message'] ) ? $data['error']['message'] : __( 'The payment could not be processed.', 'formglut' ) );
		}
		return $data;
	}

	/**
	 * Handle the payment part of a submission.
	 *
	 * Returns array( 'respond' => array ) to send to the browser and stop (intent step), or
	 * array( 'payment' => array|null ) to continue saving the entry.
	 *
	 * @param object $form        Form row.
	 * @param array  $flat_fields Flattened fields.
	 * @param array  $fields_data Submitted values.
	 * @return array|WP_Error
	 */
	public static function process( $form, $flat_fields, $fields_data ) {
		$card = self::card_field( $flat_fields );
		if ( ! $card ) {
			return array( 'payment' => null );
		}
		$total = self::total( $card, $flat_fields, $fields_data );
		if ( $total <= 0 ) {
			return array( 'payment' => null ); // Nothing to pay: save like a normal form.
		}
		$cur   = self::currency();
		$minor = self::minor( $total );
		$step  = isset( $_POST['formglut_pay_step'] ) ? sanitize_key( wp_unslash( $_POST['formglut_pay_step'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce checked in submit_form().

		if ( 'intent' === $step ) {
			$desc = ! empty( $card['payment_description'] ) ? FormGlut_Form_Settings::replace_tags( $card['payment_description'], $form, $fields_data ) : $form->title;
			$pi   = self::stripe( 'POST', 'payment_intents', array(
				'amount'                               => $minor,
				'currency'                             => strtolower( $cur['code'] ),
				'automatic_payment_methods[enabled]'   => 'true',
				'description'                          => wp_strip_all_tags( $desc ),
				'metadata[formglut_form_id]'           => (string) $form->id,
				'metadata[formglut_site]'              => home_url( '/' ),
			), (int) $form->id );
			if ( is_wp_error( $pi ) ) {
				return $pi;
			}
			return array( 'respond' => array( 'payment' => array( 'client_secret' => $pi['client_secret'], 'amount' => $minor ) ) );
		}

		$pi_id = isset( $_POST['formglut_payment_intent'] ) ? sanitize_text_field( wp_unslash( $_POST['formglut_payment_intent'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! preg_match( '/^pi_[A-Za-z0-9]+$/', $pi_id ) ) {
			return new WP_Error( 'no_payment', __( 'Please complete the payment.', 'formglut' ) );
		}
		if ( self::intent_used( $pi_id ) ) {
			return new WP_Error( 'used', __( 'This payment has already been used.', 'formglut' ) );
		}
		$pi = self::stripe( 'GET', 'payment_intents/' . rawurlencode( $pi_id ), array(), (int) $form->id );
		if ( is_wp_error( $pi ) ) {
			return $pi;
		}
		$ok = in_array( $pi['status'] ?? '', array( 'succeeded', 'processing' ), true )
			&& (int) ( $pi['amount'] ?? 0 ) === $minor
			&& strtolower( (string) ( $pi['currency'] ?? '' ) ) === strtolower( $cur['code'] )
			&& (string) ( $pi['metadata']['formglut_form_id'] ?? '' ) === (string) $form->id;
		if ( ! $ok ) {
			return new WP_Error( 'mismatch', __( 'We could not confirm your payment. If money was taken from your account, please contact us.', 'formglut' ) );
		}
		return array( 'payment' => array(
			'gateway'  => 'stripe',
			'id'       => $pi_id,
			'amount'   => $total,
			'currency' => $cur['code'],
			'status'   => $pi['status'],
			'mode'     => self::keys()['mode'],
		) );
	}

	/**
	 * Whether a PaymentIntent is already attached to an entry.
	 *
	 * @param string $pi_id PaymentIntent ID.
	 * @return bool
	 */
	private static function intent_used( $pi_id ) {
		global $wpdb;
		return (bool) $wpdb->get_var( $wpdb->prepare( "SELECT id FROM {$wpdb->formglut_entries} WHERE fields_data LIKE %s LIMIT 1", '%' . $wpdb->esc_like( '"' . $pi_id . '"' ) . '%' ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
	}
}
