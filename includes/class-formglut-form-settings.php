<?php
/**
 * FormGlut Per-Form Settings.
 *
 * Every form stores its own settings (keyed by the form ID) in the `settings` column of the
 * forms table. Values resolve as: built-in default <- global setting <- form setting.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Form_Settings class.
 */
class FormGlut_Form_Settings {

	/**
	 * Database schema version that introduced the `settings` column.
	 */
	const SCHEMA_VERSION = 4;

	/**
	 * Cron hook that applies the per-form entry retention period.
	 */
	const RETENTION_HOOK = 'formglut_retention_cleanup';

	/**
	 * Default settings for a form.
	 *
	 * @return array
	 */
	public static function defaults() {
		return array(
			'general'       => array(
				'show_title'        => false,
				'form_class'        => '',
				'submit_processing' => '',
			),
			'confirmation'  => array(
				'type'          => 'message', // message | url.
				'message'       => '',
				'redirect_url'  => '',
				'after_submit'  => 'reset', // reset | hide | keep.
				'scroll'        => true,
				'autoclose'     => 0,
				'error_message' => '',
			),
			'notifications' => array(
				'enabled'       => true,
				'to'            => '',
				'cc'            => '',
				'bcc'           => '',
				'from_name'     => '',
				'from_email'    => '',
				'reply_to'      => '',
				'subject'       => '',
				'message'       => '',
				'attach_files'  => false,
				'autoresponder' => array(
					'enabled'     => false,
					'email_field' => '',
					'subject'     => '',
					'message'     => '',
				),
			),
			'restrictions'  => array(
				'require_login'     => false,
				'guest_message'     => '',
				'entry_limit'       => 0,
				'limit_message'     => '',
				'schedule_enabled'  => false,
				'schedule_start'    => '',
				'schedule_end'      => '',
				'before_message'    => '',
				'after_message'     => '',
				'deny_empty'        => false,
				'one_per_ip'        => false,
				'duplicate_message' => '',
			),
			'spam'          => array(
				'honeypot'       => 'global', // global | on | off.
				'akismet'        => false,
				'keywords'       => '',
				'keyword_action' => 'reject', // reject | spam.
				'store_ip'       => true,
				'store_entries'  => 'global', // global | save | email_only.
				'retention_days' => 0,
				'min_time'       => 0,
				'rate_limit'     => 0,
				'referrer_check' => false,
			),
			'style'         => array(
				'form_width'  => '',
				'form_align'  => 'left', // left | center | right.
				'custom_css'  => '',
				'custom_js'   => '',
			),
			'entries'       => array(
				'count_views' => true,
			),
			'multistep'     => array(
				'progress'      => 'steps', // steps | bar | none.
				'first_title'   => '',
				'validate_step' => true,
			),
			'integrations'  => array(
				'webhook_enabled' => false,
				'webhook_url'     => '',
				'webhook_format'  => 'json', // json | form.
				'slack_enabled'   => false,
				'slack_webhook'   => '',
				'slack_message'   => '',
				'mailchimp_enabled' => false,
				'mailchimp_list'    => '',
				'mailchimp_email'   => '',
				'mailchimp_first'   => '',
				'mailchimp_last'    => '',
				'mailchimp_consent' => '',
				'mailchimp_double'  => false,
				'mailchimp_tags'    => '',
				'hubspot_enabled'   => false,
				'hubspot_email'     => '',
				'hubspot_first'     => '',
				'hubspot_last'      => '',
				'hubspot_phone'     => '',
				'hubspot_company'   => '',
				'hubspot_message'   => '',
			),
		);
	}

	/**
	 * Sanitize raw settings from the editor and merge them onto the defaults.
	 *
	 * @param mixed $raw    Raw settings (decoded JSON).
	 * @param bool  $saving True when an admin saves (applies the “who may add scripts” rule); false when reading.
	 * @return array Clean settings containing every known key.
	 */
	public static function sanitize( $raw, $saving = false ) {
		$raw = is_array( $raw ) ? $raw : array();
		$d   = self::defaults();
		$out = $d;

		$bool = static function ( $v ) {
			return ! empty( $v ) && 'false' !== $v && '0' !== $v;
		};
		$enum = static function ( $v, $allowed, $fallback ) {
			return in_array( $v, $allowed, true ) ? $v : $fallback;
		};
		$text = static function ( $v ) {
			return is_scalar( $v ) ? sanitize_text_field( (string) $v ) : '';
		};
		$area = static function ( $v ) {
			return is_scalar( $v ) ? sanitize_textarea_field( (string) $v ) : '';
		};
		$html = static function ( $v ) {
			return is_scalar( $v ) ? wp_kses_post( (string) $v ) : '';
		};
		$int  = static function ( $v ) {
			return absint( $v );
		};
		$date = static function ( $v ) {
			$v = is_scalar( $v ) ? (string) $v : '';
			return preg_match( '/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}$/', $v ) ? str_replace( ' ', 'T', $v ) : '';
		};
		$emails = static function ( $v ) {
			$list = array();
			foreach ( preg_split( '/[\s,;]+/', is_scalar( $v ) ? (string) $v : '' ) as $item ) {
				$item = trim( $item );
				// Allow smart tags such as {admin_email} or {field:email}.
				if ( '' !== $item && ( is_email( $item ) || preg_match( '/^\{[a-z_:0-9\-]+\}$/i', $item ) ) ) {
					$list[] = $item;
				}
			}
			return implode( ', ', $list );
		};

		$g = isset( $raw['general'] ) && is_array( $raw['general'] ) ? $raw['general'] : array();
		$out['general'] = array(
			'show_title'        => $bool( $g['show_title'] ?? $d['general']['show_title'] ),
			'form_class'        => implode( ' ', array_filter( array_map( 'sanitize_html_class', explode( ' ', $text( $g['form_class'] ?? '' ) ) ) ) ),
			'submit_processing' => $text( $g['submit_processing'] ?? '' ),
		);

		$c = isset( $raw['confirmation'] ) && is_array( $raw['confirmation'] ) ? $raw['confirmation'] : array();
		$out['confirmation'] = array(
			'type'          => $enum( $c['type'] ?? 'message', array( 'message', 'url' ), 'message' ),
			'message'       => $area( $c['message'] ?? '' ),
			'redirect_url'  => is_scalar( $c['redirect_url'] ?? '' ) ? trim( sanitize_text_field( (string) ( $c['redirect_url'] ?? '' ) ) ) : '',
			'after_submit'  => $enum( $c['after_submit'] ?? 'reset', array( 'reset', 'hide', 'keep' ), 'reset' ),
			'scroll'        => $bool( $c['scroll'] ?? true ),
			'autoclose'     => min( 3600, $int( $c['autoclose'] ?? 0 ) ),
			'error_message' => $area( $c['error_message'] ?? '' ),
		);

		$n  = isset( $raw['notifications'] ) && is_array( $raw['notifications'] ) ? $raw['notifications'] : array();
		$ar = isset( $n['autoresponder'] ) && is_array( $n['autoresponder'] ) ? $n['autoresponder'] : array();
		$out['notifications'] = array(
			'enabled'       => $bool( $n['enabled'] ?? true ),
			'to'            => $emails( $n['to'] ?? '' ),
			'cc'            => $emails( $n['cc'] ?? '' ),
			'bcc'           => $emails( $n['bcc'] ?? '' ),
			'from_name'     => $text( $n['from_name'] ?? '' ),
			'from_email'    => is_email( $n['from_email'] ?? '' ) ? sanitize_email( $n['from_email'] ) : '',
			'reply_to'      => $text( $n['reply_to'] ?? '' ),
			'subject'       => $text( $n['subject'] ?? '' ),
			'message'       => $html( $n['message'] ?? '' ),
			'attach_files'  => $bool( $n['attach_files'] ?? false ),
			'autoresponder' => array(
				'enabled'     => $bool( $ar['enabled'] ?? false ),
				'email_field' => $text( $ar['email_field'] ?? '' ),
				'subject'     => $text( $ar['subject'] ?? '' ),
				'message'     => $html( $ar['message'] ?? '' ),
			),
		);

		$r = isset( $raw['restrictions'] ) && is_array( $raw['restrictions'] ) ? $raw['restrictions'] : array();
		$out['restrictions'] = array(
			'require_login'     => $bool( $r['require_login'] ?? false ),
			'guest_message'     => $text( $r['guest_message'] ?? '' ),
			'entry_limit'       => $int( $r['entry_limit'] ?? 0 ),
			'limit_message'     => $text( $r['limit_message'] ?? '' ),
			'schedule_enabled'  => $bool( $r['schedule_enabled'] ?? false ),
			'schedule_start'    => $date( $r['schedule_start'] ?? '' ),
			'schedule_end'      => $date( $r['schedule_end'] ?? '' ),
			'before_message'    => $text( $r['before_message'] ?? '' ),
			'after_message'     => $text( $r['after_message'] ?? '' ),
			'deny_empty'        => $bool( $r['deny_empty'] ?? false ),
			'one_per_ip'        => $bool( $r['one_per_ip'] ?? false ),
			'duplicate_message' => $text( $r['duplicate_message'] ?? '' ),
		);

		$s = isset( $raw['spam'] ) && is_array( $raw['spam'] ) ? $raw['spam'] : array();
		$out['spam'] = array(
			'honeypot'       => $enum( $s['honeypot'] ?? 'global', array( 'global', 'on', 'off' ), 'global' ),
			'akismet'        => $bool( $s['akismet'] ?? false ),
			'keywords'       => $area( $s['keywords'] ?? '' ),
			'keyword_action' => $enum( $s['keyword_action'] ?? 'reject', array( 'reject', 'spam' ), 'reject' ),
			'store_ip'       => $bool( $s['store_ip'] ?? true ),
			'store_entries'  => $enum( $s['store_entries'] ?? 'global', array( 'global', 'save', 'email_only' ), 'global' ),
			'retention_days' => min( 3650, $int( $s['retention_days'] ?? 0 ) ),
			'min_time'       => min( 600, $int( $s['min_time'] ?? 0 ) ),
			'rate_limit'     => min( 1000, $int( $s['rate_limit'] ?? 0 ) ),
			'referrer_check' => $bool( $s['referrer_check'] ?? false ),
		);

		$st  = isset( $raw['style'] ) && is_array( $raw['style'] ) ? $raw['style'] : array();
		$css = is_scalar( $st['custom_css'] ?? '' ) ? wp_strip_all_tags( (string) ( $st['custom_css'] ?? '' ) ) : '';
		$css = preg_replace( '/(expression\s*\(|javascript\s*:|@import|behavior\s*:|-moz-binding)/i', '', $css );
		$width = is_scalar( $st['form_width'] ?? '' ) ? trim( (string) ( $st['form_width'] ?? '' ) ) : '';
		// Custom JS is kept only for users who may add scripts (single-site admins; super admins on multisite).
		$js = is_scalar( $st['custom_js'] ?? '' ) ? (string) ( $st['custom_js'] ?? '' ) : '';
		if ( $saving && ! current_user_can( 'unfiltered_html' ) ) {
			$js = isset( $raw['_stored_custom_js'] ) ? (string) $raw['_stored_custom_js'] : '';
		}
		$out['style'] = array(
			'form_width' => preg_match( '/^\d{1,4}(\.\d+)?(px|%|rem|em|vw)$/', $width ) ? $width : '',
			'form_align' => $enum( $st['form_align'] ?? 'left', array( 'left', 'center', 'right' ), 'left' ),
			'custom_css' => $css,
			'custom_js'  => str_ireplace( '</script', '<\/script', $js ),
		);

		$e = isset( $raw['entries'] ) && is_array( $raw['entries'] ) ? $raw['entries'] : array();
		$out['entries'] = array(
			'count_views' => $bool( $e['count_views'] ?? true ),
		);

		$m = isset( $raw['multistep'] ) && is_array( $raw['multistep'] ) ? $raw['multistep'] : array();
		$out['multistep'] = array(
			'progress'      => $enum( $m['progress'] ?? 'steps', array( 'steps', 'bar', 'none' ), 'steps' ),
			'first_title'   => $text( $m['first_title'] ?? '' ),
			'validate_step' => $bool( $m['validate_step'] ?? true ),
		);

		$i   = isset( $raw['integrations'] ) && is_array( $raw['integrations'] ) ? $raw['integrations'] : array();
		$url = is_scalar( $i['webhook_url'] ?? '' ) ? esc_url_raw( trim( (string) ( $i['webhook_url'] ?? '' ) ), array( 'http', 'https' ) ) : '';
		$out['integrations'] = array(
			'webhook_enabled' => $bool( $i['webhook_enabled'] ?? false ),
			'webhook_url'     => $url,
			'webhook_format'  => $enum( $i['webhook_format'] ?? 'json', array( 'json', 'form' ), 'json' ),
			'slack_enabled'   => $bool( $i['slack_enabled'] ?? false ),
			'slack_webhook'   => is_scalar( $i['slack_webhook'] ?? '' ) && 0 === strpos( (string) ( $i['slack_webhook'] ?? '' ), 'https://hooks.slack.com/' ) ? esc_url_raw( (string) $i['slack_webhook'] ) : '',
			'slack_message'   => $area( $i['slack_message'] ?? '' ),
			'mailchimp_enabled' => $bool( $i['mailchimp_enabled'] ?? false ),
			'mailchimp_list'    => preg_replace( '/[^A-Za-z0-9]/', '', (string) ( $i['mailchimp_list'] ?? '' ) ),
			'mailchimp_double'  => $bool( $i['mailchimp_double'] ?? false ),
			'mailchimp_tags'    => $text( $i['mailchimp_tags'] ?? '' ),
			'hubspot_enabled'   => $bool( $i['hubspot_enabled'] ?? false ),
		);
		foreach ( array( 'mailchimp_email', 'mailchimp_first', 'mailchimp_last', 'mailchimp_consent', 'hubspot_email', 'hubspot_first', 'hubspot_last', 'hubspot_phone', 'hubspot_company', 'hubspot_message' ) as $map_key ) {
			$out['integrations'][ $map_key ] = $text( $i[ $map_key ] ?? '' );
		}

		return $out;
	}

	/**
	 * Decode a stored settings JSON string into a full settings array.
	 *
	 * @param string|array|null $stored Stored value.
	 * @return array
	 */
	public static function from_stored( $stored ) {
		if ( is_string( $stored ) && '' !== $stored ) {
			$stored = json_decode( $stored, true );
		}
		return self::sanitize( is_array( $stored ) ? $stored : array() );
	}

	/**
	 * Get all settings for a form object (defaults filled in).
	 *
	 * @param object $form Form row.
	 * @return array
	 */
	public static function for_form( $form ) {
		return self::from_stored( isset( $form->settings ) ? $form->settings : '' );
	}

	/**
	 * Read one setting with a dotted path, e.g. `confirmation.type`.
	 *
	 * @param object $form    Form row.
	 * @param string $path    Dotted path.
	 * @param mixed  $default Fallback.
	 * @return mixed
	 */
	public static function get( $form, $path, $default = null ) {
		$value = self::for_form( $form );
		foreach ( explode( '.', $path ) as $part ) {
			if ( ! is_array( $value ) || ! array_key_exists( $part, $value ) ) {
				return $default;
			}
			$value = $value[ $part ];
		}
		return $value;
	}

	/**
	 * Whether the honeypot is active for a form (per-form override, then global setting).
	 *
	 * @param object $form Form row.
	 * @return bool
	 */
	public static function honeypot_enabled( $form ) {
		$mode = self::get( $form, 'spam.honeypot', 'global' );
		if ( 'on' === $mode ) {
			return true;
		}
		if ( 'off' === $mode ) {
			return false;
		}
		return (bool) FormGlut_Settings::get( 'formglut_honeypot', true );
	}

	/**
	 * Whether submissions for a form should be stored in the database.
	 *
	 * @param object $form Form row.
	 * @return bool
	 */
	public static function stores_entries( $form ) {
		$mode = self::get( $form, 'spam.store_entries', 'global' );
		if ( 'save' === $mode ) {
			return true;
		}
		if ( 'email_only' === $mode ) {
			return false;
		}
		return (bool) FormGlut_Settings::get( 'formglut_store_entries', true );
	}

	/**
	 * Signed timestamp printed in the form so the minimum fill time can be checked on submit.
	 *
	 * @param int $form_id Form ID.
	 * @return string
	 */
	public static function time_token( $form_id ) {
		$ts = time();
		return $ts . '.' . wp_hash( $ts . '|' . absint( $form_id ) );
	}

	/**
	 * Whether the signed timestamp is valid and at least `$min` seconds old.
	 *
	 * @param string $token   Posted token.
	 * @param int    $form_id Form ID.
	 * @param int    $min     Minimum seconds.
	 * @return bool
	 */
	public static function time_token_ok( $token, $form_id, $min ) {
		$parts = explode( '.', (string) $token, 2 );
		if ( 2 !== count( $parts ) || ! ctype_digit( $parts[0] ) ) {
			return false;
		}
		if ( ! hash_equals( wp_hash( $parts[0] . '|' . absint( $form_id ) ), $parts[1] ) ) {
			return false;
		}
		return ( time() - (int) $parts[0] ) >= $min;
	}

	/**
	 * Whether the form currently accepts submissions (login, schedule, entry limit).
	 *
	 * @param object $form Form row.
	 * @return array { open: bool, reason: string, message: string }
	 */
	public static function availability( $form ) {
		$s = self::for_form( $form );
		$r = $s['restrictions'];

		if ( $r['require_login'] && ! is_user_logged_in() ) {
			return array(
				'open'    => false,
				'reason'  => 'login',
				'message' => '' !== $r['guest_message'] ? $r['guest_message'] : __( 'You must be logged in to submit this form.', 'formglut' ),
			);
		}

		if ( $r['schedule_enabled'] ) {
			$now = new DateTimeImmutable( 'now', wp_timezone() );
			if ( '' !== $r['schedule_start'] ) {
				$start = new DateTimeImmutable( $r['schedule_start'], wp_timezone() );
				if ( $now < $start ) {
					return array(
						'open'    => false,
						'reason'  => 'not_open',
						'message' => '' !== $r['before_message'] ? $r['before_message'] : __( 'This form is not open yet.', 'formglut' ),
					);
				}
			}
			if ( '' !== $r['schedule_end'] ) {
				$end = new DateTimeImmutable( $r['schedule_end'], wp_timezone() );
				if ( $now > $end ) {
					return array(
						'open'    => false,
						'reason'  => 'closed',
						'message' => '' !== $r['after_message'] ? $r['after_message'] : __( 'This form is closed.', 'formglut' ),
					);
				}
			}
		}

		if ( $r['entry_limit'] > 0 && FormGlut_Form::get_entry_count( $form->id ) >= $r['entry_limit'] ) {
			return array(
				'open'    => false,
				'reason'  => 'limit',
				'message' => '' !== $r['limit_message'] ? $r['limit_message'] : __( 'This form is no longer accepting entries.', 'formglut' ),
			);
		}

		return array( 'open' => true, 'reason' => '', 'message' => '' );
	}

	/**
	 * Replace smart tags in a message or subject.
	 *
	 * Tags: {form_name} {form_id} {entry_id} {site_name} {site_url} {admin_email} {date} {time}
	 * {ip} {user_email} {user_name} {all_fields} {field:FIELD_ID}
	 *
	 * @param string $text        Text with tags.
	 * @param object $form        Form row.
	 * @param array  $fields_data Submitted values keyed by field ID.
	 * @param int    $entry_id    Entry ID (0 when not stored).
	 * @param bool   $html        Whether {all_fields} should be an HTML table.
	 * @param string $ip          Visitor IP (empty when not stored).
	 * @return string
	 */
	public static function replace_tags( $text, $form, $fields_data, $entry_id = 0, $html = false, $ip = '' ) {
		if ( '' === (string) $text || false === strpos( $text, '{' ) ) {
			return (string) $text;
		}

		$user  = wp_get_current_user();
		$plain = static function ( $v ) {
			return is_array( $v ) ? implode( ', ', array_map( 'strval', $v ) ) : (string) $v;
		};

		$map = array(
			'{form_name}'   => $form->title,
			'{form_id}'     => (string) $form->id,
			'{entry_id}'    => (string) $entry_id,
			'{site_name}'   => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ),
			'{site_url}'    => home_url( '/' ),
			'{admin_email}' => get_option( 'admin_email' ),
			'{date}'        => wp_date( get_option( 'date_format' ) ),
			'{time}'        => wp_date( get_option( 'time_format' ) ),
			'{ip}'          => $ip,
			'{user_email}'  => $user && $user->exists() ? $user->user_email : '',
			'{user_name}'   => $user && $user->exists() ? $user->display_name : '',
			'{payment_amount}' => ! empty( $fields_data['_payment']['amount'] ) ? number_format_i18n( (float) $fields_data['_payment']['amount'], 2 ) . ' ' . $fields_data['_payment']['currency'] : '',
			'{payment_id}'     => ! empty( $fields_data['_payment']['id'] ) ? $fields_data['_payment']['id'] : '',
		);
		$text = strtr( $text, $map );

		// {field:ID} -> submitted value.
		$text = preg_replace_callback(
			'/\{field:([A-Za-z0-9_\-]+)\}/',
			static function ( $m ) use ( $fields_data, $plain ) {
				return isset( $fields_data[ $m[1] ] ) ? $plain( $fields_data[ $m[1] ] ) : '';
			},
			$text
		);

		if ( false !== strpos( $text, '{all_fields}' ) ) {
			$rows = array();
			foreach ( FormGlut_Form::flatten_fields( is_array( $form->fields ) ? $form->fields : array() ) as $field ) {
				$id = isset( $field['id'] ) ? $field['id'] : '';
				if ( '' === $id || ! array_key_exists( $id, $fields_data ) ) {
					continue;
				}
				$label = ! empty( $field['admin_label'] ) ? $field['admin_label'] : ( isset( $field['label'] ) && '' !== $field['label'] ? $field['label'] : $id );
				$is_rich = 'rich_text' === ( $field['type'] ?? '' );
				$rows[]  = array( $label, $is_rich && ! $html ? trim( html_entity_decode( wp_strip_all_tags( (string) $fields_data[ $id ] ) ) ) : FormGlut_Form::display_value( $field, $fields_data[ $id ] ), $is_rich );
			}
			if ( $html ) {
				$table = '<table style="width:100%;border-collapse:collapse;font-family:sans-serif;">';
				foreach ( $rows as $row ) {
					$table .= '<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;color:#334155;width:180px;">' . esc_html( $row[0] ) . '</td><td style="padding:8px 12px;border:1px solid #e2e8f0;color:#475569;">' . ( ! empty( $row[2] ) ? wp_kses_post( $row[1] ) : esc_html( $row[1] ) ) . '</td></tr>';
				}
				$table .= '</table>';
			} else {
				$table = implode( "\n", array_map( static function ( $row ) {
					return $row[0] . ': ' . $row[1];
				}, $rows ) );
			}
			$text = str_replace( '{all_fields}', $table, $text );
		}

		return $text;
	}

	/**
	 * Whether any keyword from the list appears in the submitted values.
	 *
	 * @param string $keywords    One keyword per line.
	 * @param array  $fields_data Submitted values.
	 * @return bool
	 */
	public static function has_blocked_keyword( $keywords, $fields_data ) {
		$list = array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) $keywords ) ) );
		if ( empty( $list ) ) {
			return false;
		}
		$haystack = '';
		foreach ( $fields_data as $value ) {
			$haystack .= ' ' . ( is_array( $value ) ? implode( ' ', $value ) : (string) $value );
		}
		foreach ( $list as $word ) {
			if ( false !== mb_stripos( $haystack, $word ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Ask Akismet whether a submission is spam. Returns false when Akismet is not usable.
	 *
	 * @param array  $fields_data Submitted values.
	 * @param object $form        Form row.
	 * @param string $ip          Visitor IP.
	 * @return bool
	 */
	public static function akismet_is_spam( $fields_data, $form, $ip ) {
		if ( ! class_exists( 'Akismet' ) || ! method_exists( 'Akismet', 'http_post' ) || ! Akismet::get_api_key() ) {
			return false;
		}

		$email   = '';
		$content = array();
		foreach ( FormGlut_Form::flatten_fields( is_array( $form->fields ) ? $form->fields : array() ) as $field ) {
			$id = isset( $field['id'] ) ? $field['id'] : '';
			if ( '' === $id || empty( $fields_data[ $id ] ) ) {
				continue;
			}
			$value = is_array( $fields_data[ $id ] ) ? implode( ', ', $fields_data[ $id ] ) : (string) $fields_data[ $id ];
			if ( '' === $email && isset( $field['type'] ) && 'email' === $field['type'] ) {
				$email = $value;
			}
			$content[] = $value;
		}

		$payload = array(
			'blog'                 => home_url( '/' ),
			'blog_lang'            => get_locale(),
			'blog_charset'         => get_option( 'blog_charset' ),
			'user_ip'              => $ip,
			'user_agent'           => isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '', // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
			'referrer'             => isset( $_SERVER['HTTP_REFERER'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) : '',
			'comment_type'         => 'contact-form',
			'comment_author_email' => $email,
			'comment_content'      => implode( "\n", $content ),
		);

		$response = Akismet::http_post( http_build_query( $payload ), 'comment-check' );
		return is_array( $response ) && isset( $response[1] ) && 'true' === trim( (string) $response[1] );
	}

	/**
	 * POST a submission to the form's webhook URL (non-blocking).
	 *
	 * @param object $form        Form row.
	 * @param array  $fields_data Submitted values keyed by field ID.
	 * @param int    $entry_id    Entry ID (0 when not stored).
	 * @return void
	 */
	public static function send_webhook( $form, $fields_data, $entry_id ) {
		$w = $form->settings['integrations'];
		if ( empty( $w['webhook_enabled'] ) || '' === $w['webhook_url'] || ! wp_http_validate_url( $w['webhook_url'] ) ) {
			return;
		}

		// Field values keyed by the name attribute when set (friendlier for Zapier / Make), otherwise the field ID.
		$named = array();
		foreach ( FormGlut_Form::flatten_fields( is_array( $form->fields ) ? $form->fields : array() ) as $field ) {
			$id = isset( $field['id'] ) ? $field['id'] : '';
			if ( '' === $id || ! array_key_exists( $id, $fields_data ) ) {
				continue;
			}
			$key           = ! empty( $field['name_attribute'] ) ? $field['name_attribute'] : $id;
			$named[ $key ] = $fields_data[ $id ];
		}

		$payload = array(
			'form_id'      => (int) $form->id,
			'form_name'    => $form->title,
			'entry_id'     => (int) $entry_id,
			'submitted_at' => current_time( 'c' ),
			'source_url'   => isset( $_SERVER['HTTP_REFERER'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) : '',
			'fields'       => $named,
		);

		$json = 'json' === $w['webhook_format'];
		FormGlut_Http::request(
			'Webhook',
			$w['webhook_url'],
			array(
				'method'   => 'POST',
				'timeout'  => 5,
				'blocking' => false,
				'headers'  => array( 'Content-Type' => $json ? 'application/json' : 'application/x-www-form-urlencoded' ),
				'body'     => $json ? wp_json_encode( $payload ) : array_merge( array_diff_key( $payload, array( 'fields' => 1 ) ), $named ),
			),
			$form->id
		);
	}

	/**
	 * Post a short message about a submission to a Slack channel (incoming webhook).
	 *
	 * @param object $form        Form row.
	 * @param array  $fields_data Submitted values.
	 * @param int    $entry_id    Entry ID.
	 * @return void
	 */
	public static function send_slack( $form, $fields_data, $entry_id ) {
		$i = $form->settings['integrations'];
		if ( empty( $i['slack_enabled'] ) || '' === $i['slack_webhook'] ) {
			return;
		}
		$tpl  = '' !== trim( $i['slack_message'] ) ? $i['slack_message'] : "*New entry: {form_name}*\n{all_fields}";
		$text = self::replace_tags( $tpl, $form, $fields_data, $entry_id, false );
		if ( $entry_id ) {
			$text .= "\n<" . admin_url( 'admin.php?page=formglut-entry-detail&entry_id=' . absint( $entry_id ) ) . '|' . __( 'View entry', 'formglut' ) . '>';
		}
		FormGlut_Http::request( 'Slack', $i['slack_webhook'], array(
			'method'   => 'POST',
			'timeout'  => 5,
			'blocking' => false,
			'headers'  => array( 'Content-Type' => 'application/json' ),
			'body'     => wp_json_encode( array( 'text' => $text ) ),
		), $form->id );
	}

	/**
	 * Add the `settings` column to existing installs.
	 *
	 * @return void
	 */
	public static function maybe_upgrade() {
		if ( (int) get_option( 'formglut_schema_version', 1 ) >= self::SCHEMA_VERSION ) {
			return;
		}
		FormGlut_DB::create_tables();
		update_option( 'formglut_schema_version', self::SCHEMA_VERSION );
	}

	/**
	 * Register the retention cron event and its handler.
	 *
	 * @return void
	 */
	public static function init_retention() {
		add_action( self::RETENTION_HOOK, array( __CLASS__, 'run_retention' ) );
		if ( ! wp_next_scheduled( self::RETENTION_HOOK ) ) {
			wp_schedule_event( time() + HOUR_IN_SECONDS, 'daily', self::RETENTION_HOOK );
		}
	}

	/**
	 * Delete entries older than each form's retention period.
	 *
	 * @return void
	 */
	public static function run_retention() {
		global $wpdb;

		$rows = $wpdb->get_results( "SELECT id, settings FROM {$wpdb->formglut_forms} WHERE settings LIKE '%retention_days%'" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		foreach ( (array) $rows as $row ) {
			$days = (int) self::from_stored( $row->settings )['spam']['retention_days'];
			if ( $days > 0 ) {
				$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
					$wpdb->prepare(
						"DELETE FROM {$wpdb->formglut_entries} WHERE form_id = %d AND created_at < %s",
						$row->id,
						gmdate( 'Y-m-d H:i:s', strtotime( current_time( 'mysql' ) ) - $days * DAY_IN_SECONDS )
					)
				);
			}
		}
	}
}
