<?php
/**
 * FormGlut Migrator: import forms (fields and layout, not entries) from other form plugins.
 *
 * Supported: Fluent Forms, Forminator, WPForms, Contact Form 7. Each imported form becomes a new
 * FormGlut draft. Fields FormGlut has no match for are skipped and reported.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Migrator class.
 */
class FormGlut_Migrator {

	/**
	 * Counter for generated field IDs.
	 *
	 * @var int
	 */
	private static $n = 0;

	/**
	 * Field types skipped during the current conversion.
	 *
	 * @var string[]
	 */
	private static $skipped = array();

	/**
	 * Forms available to import, grouped by source plugin.
	 *
	 * @return array[] { key, name, forms: [ { id, title, fields } ] }
	 */
	public static function sources() {
		global $wpdb;
		$done    = get_option( 'formglut_migrated', array() );
		$sources = array();

		if ( $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $wpdb->prefix . 'fluentform_forms' ) ) ) {
			$rows = $wpdb->get_results( "SELECT id, title, form_fields FROM {$wpdb->prefix}fluentform_forms ORDER BY id DESC" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
			$sources[] = array( 'key' => 'fluentform', 'name' => 'Fluent Forms', 'forms' => array_map( static function ( $r ) use ( $done ) {
				$j = json_decode( $r->form_fields, true );
				return array( 'id' => (int) $r->id, 'title' => $r->title, 'fields' => isset( $j['fields'] ) ? count( $j['fields'] ) : 0, 'imported' => isset( $done[ 'fluentform:' . $r->id ] ) );
			}, (array) $rows ) );
		}
		foreach ( array( 'forminator_forms' => 'Forminator', 'wpforms' => 'WPForms', 'wpcf7_contact_form' => 'Contact Form 7' ) as $post_type => $name ) {
			$posts = get_posts( array( 'post_type' => $post_type, 'post_status' => array( 'publish', 'draft', 'private', 'pending' ), 'numberposts' => 200 ) );
			if ( $posts ) {
				$key       = array( 'forminator_forms' => 'forminator', 'wpforms' => 'wpforms', 'wpcf7_contact_form' => 'cf7' )[ $post_type ];
				$sources[] = array( 'key' => $key, 'name' => $name, 'forms' => array_map( static function ( $p ) use ( $key, $done ) {
					return array( 'id' => (int) $p->ID, 'title' => $p->post_title, 'fields' => null, 'imported' => isset( $done[ $key . ':' . $p->ID ] ) );
				}, $posts ) );
			}
		}
		return $sources;
	}

	/**
	 * Convert one form to FormGlut fields (not saved yet).
	 *
	 * @param string $source Source key.
	 * @param int    $id     Form ID in the source plugin.
	 * @return array|WP_Error { title, fields, submit, skipped[] }
	 */
	public static function convert( $source, $id ) {
		self::$skipped = array();
		switch ( $source ) {
			case 'fluentform':
				$data = self::from_fluentform( $id );
				break;
			case 'forminator':
				$data = self::from_forminator( $id );
				break;
			case 'wpforms':
				$data = self::from_wpforms( $id );
				break;
			case 'cf7':
				$data = self::from_cf7( $id );
				break;
			default:
				return new WP_Error( 'source', __( 'Unknown form plugin.', 'formglut' ) );
		}
		if ( is_wp_error( $data ) ) {
			return $data;
		}
		if ( empty( $data['fields'] ) ) {
			return new WP_Error( 'empty', __( 'No fields could be imported from this form.', 'formglut' ) );
		}
		$data['skipped'] = array_values( array_unique( self::$skipped ) );
		return $data;
	}

	/**
	 * Remember that a source form was imported.
	 *
	 * @param string $source  Source key.
	 * @param int    $id      Source form ID.
	 * @param int    $form_id New FormGlut form ID.
	 * @return void
	 */
	public static function mark_done( $source, $id, $form_id ) {
		$done                        = get_option( 'formglut_migrated', array() );
		$done[ $source . ':' . $id ] = (int) $form_id;
		update_option( 'formglut_migrated', $done, false );
	}

	/* ── helpers ─────────────────────────────────────────────────────── */

	/**
	 * A FormGlut field with a fresh ID.
	 *
	 * @param string $type  Field type.
	 * @param array  $props Properties.
	 * @return array
	 */
	private static function field( $type, $props ) {
		++self::$n;
		$props = array_filter( $props, static function ( $v ) {
			return null !== $v && '' !== $v;
		} );
		return array_merge( array( 'id' => 'm' . base_convert( (string) ( time() * 1000 + self::$n ), 10, 36 ), 'type' => $type ), $props );
	}

	/**
	 * Normalise a list of { label, value } choices.
	 *
	 * @param array $list Raw choices.
	 * @return array
	 */
	private static function choices( $list ) {
		$out = array();
		foreach ( (array) $list as $k => $c ) {
			if ( is_array( $c ) ) {
				$label = (string) ( $c['label'] ?? $c['text'] ?? '' );
				$value = (string) ( $c['value'] ?? '' );
			} else {
				$label = (string) $c;
				$value = is_string( $k ) ? $k : '';
			}
			if ( '' === $label && '' === $value ) {
				continue;
			}
			$out[] = array( 'label' => '' !== $label ? wp_strip_all_tags( $label ) : $value, 'value' => '' !== $value ? $value : sanitize_title( $label ) );
		}
		return $out;
	}

	/* ── Fluent Forms ────────────────────────────────────────────────── */

	private static function from_fluentform( $id ) {
		global $wpdb;
		$row = $wpdb->get_row( $wpdb->prepare( "SELECT title, form_fields FROM {$wpdb->prefix}fluentform_forms WHERE id = %d", $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		if ( ! $row ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$json   = json_decode( $row->form_fields, true );
		$fields = self::ff_list( isset( $json['fields'] ) ? $json['fields'] : array() );
		$submit = $json['submitButton']['settings']['button_ui']['text'] ?? null;
		return array( 'title' => $row->title, 'fields' => $fields, 'submit' => $submit );
	}

	private static function ff_list( $list ) {
		$out = array();
		foreach ( (array) $list as $f ) {
			$converted = self::ff_field( $f );
			if ( $converted ) {
				$out[] = $converted;
			}
		}
		return $out;
	}

	private static function ff_field( $f ) {
		$el   = $f['element'] ?? '';
		$s    = $f['settings'] ?? array();
		$a    = $f['attributes'] ?? array();
		$base = array(
			'label'              => $s['label'] ?? null,
			'admin_label'        => $s['admin_field_label'] ?? null,
			'placeholder'        => $a['placeholder'] ?? null,
			'required'           => ! empty( $s['validation_rules']['required']['value'] ),
			'validation_message' => $s['validation_rules']['required']['message'] ?? null,
			'help_text'          => $s['help_message'] ?? null,
			'default_value'      => is_scalar( $a['value'] ?? null ) ? $a['value'] : null,
			'name_attribute'     => $a['name'] ?? null,
		);
		$opts = self::choices( $s['advanced_options'] ?? ( $f['options'] ?? array() ) );
		$map  = array( 'input_text' => 'text', 'input_email' => 'email', 'textarea' => 'textarea', 'input_number' => 'number', 'input_url' => 'url', 'phone' => 'phone', 'input_date' => 'date', 'input_hidden' => 'hidden', 'input_password' => 'password', 'select_country' => 'country_select', 'color_picker' => 'color_picker', 'rich_text_input' => 'rich_text' );
		if ( isset( $map[ $el ] ) ) {
			return self::field( $map[ $el ], $base );
		}
		switch ( $el ) {
			case 'input_name':
				$sub = $f['fields'] ?? array();
				return self::field( 'name', array_merge( $base, array(
					'label'             => $base['label'] ? $base['label'] : __( 'Name', 'formglut' ),
					'show_first_name'   => ! empty( $sub['first_name']['settings']['visible'] ),
					'show_middle_name'  => ! empty( $sub['middle_name']['settings']['visible'] ),
					'show_last_name'    => ! empty( $sub['last_name']['settings']['visible'] ),
					'first_name_label'  => $sub['first_name']['settings']['label'] ?? null,
					'last_name_label'   => $sub['last_name']['settings']['label'] ?? null,
					'required'          => ! empty( $sub['first_name']['settings']['validation_rules']['required']['value'] ),
				) ) );
			case 'select':
				return self::field( ! empty( $a['multiple'] ) ? 'multiselect' : 'select', array_merge( $base, array( 'options' => $opts ) ) );
			case 'input_radio':
				return self::field( 'radio', array_merge( $base, array( 'options' => $opts ) ) );
			case 'input_checkbox':
				return self::field( 'checkbox', array_merge( $base, array( 'options' => $opts ) ) );
			case 'input_file':
			case 'input_image':
				return self::field( 'file_upload', array_merge( $base, array( 'images_only' => 'input_image' === $el, 'multiple' => (int) ( $s['max_file_count']['value'] ?? 1 ) > 1 ) ) );
			case 'address':
				return self::field( 'address', array_merge( $base, array( 'label' => $base['label'] ? $base['label'] : __( 'Address', 'formglut' ) ) ) );
			case 'section_break':
				return self::field( 'section_break', array( 'title' => $s['label'] ?? '', 'description' => $s['description'] ?? '' ) );
			case 'custom_html':
				return self::field( 'html', array( 'html_content' => $s['html_codes'] ?? '' ) );
			case 'terms_and_condition':
				return self::field( 'terms_conditions', array( 'label' => wp_strip_all_tags( $s['tnc_html'] ?? __( 'I agree to the terms', 'formglut' ) ), 'required' => true ) );
			case 'gdpr_agreement':
				return self::field( 'gdpr_agreement', array( 'label' => wp_strip_all_tags( $s['tnc_html'] ?? '' ), 'required' => true ) );
			case 'rangeslider':
				return self::field( 'range_slider', array_merge( $base, array( 'min' => $a['min'] ?? 0, 'max' => $a['max'] ?? 100 ) ) );
			case 'ratings':
				return self::field( 'star_rating', array_merge( $base, array( 'max_stars' => max( 3, min( 10, count( $opts ) ? count( $opts ) : 5 ) ) ) ) );
			case 'form_step':
				return self::field( 'form_step', array( 'step_title' => '' ) );
			case 'recaptcha':
			case 'hcaptcha':
			case 'turnstile':
				return self::field( $el, array() );
			case 'container':
				$columns = array();
				foreach ( ( $f['columns'] ?? array() ) as $col ) {
					$columns[] = array( 'width' => isset( $col['width'] ) ? (float) $col['width'] : 50, 'fields' => self::ff_list( $col['fields'] ?? array() ) );
				}
				$count = max( 1, min( 6, count( $columns ) ) );
				return array( 'id' => 'm' . base_convert( (string) ( time() * 1000 + ( ++self::$n ) ), 10, 36 ), 'type' => 'column_' . $count, 'columns' => array_slice( $columns, 0, 6 ), 'gap' => 'medium', 'responsive_stack' => true );
			case 'custom_submit_button':
				return null; // FormGlut adds its own submit button.
		}
		self::$skipped[] = $el;
		return null;
	}

	/* ── Forminator ──────────────────────────────────────────────────── */

	private static function from_forminator( $id ) {
		$post = get_post( $id );
		$meta = get_post_meta( $id, 'forminator_form_meta', true );
		if ( ! $post || ! is_array( $meta ) ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$fields = array();
		foreach ( ( $meta['fields'] ?? array() ) as $f ) {
			$t    = $f['type'] ?? '';
			$base = array(
				'label'       => $f['field_label'] ?? null,
				'placeholder' => $f['placeholder'] ?? null,
				'required'    => 'true' === ( $f['required'] ?? '' ) || true === ( $f['required'] ?? false ),
				'help_text'   => $f['description'] ?? null,
			);
			$map  = array( 'text' => 'text', 'email' => 'email', 'textarea' => 'textarea', 'number' => 'number', 'url' => 'url', 'phone' => 'phone', 'date' => 'date', 'time' => 'time', 'hidden' => 'hidden', 'password' => 'password', 'currency' => 'currency', 'slider' => 'range_slider', 'rating' => 'star_rating', 'address' => 'address', 'captcha' => 'recaptcha' );
			if ( isset( $map[ $t ] ) ) {
				$fields[] = self::field( $map[ $t ], $base );
				continue;
			}
			switch ( $t ) {
				case 'name':
					$fields[] = self::field( 'name', array_merge( $base, array( 'show_prefix' => 'true' === ( $f['prefix'] ?? '' ), 'show_first_name' => 'false' !== ( $f['fname'] ?? 'true' ), 'show_middle_name' => 'true' === ( $f['mname'] ?? '' ), 'show_last_name' => 'false' !== ( $f['lname'] ?? 'true' ), 'label' => $base['label'] ? $base['label'] : __( 'Name', 'formglut' ) ) ) );
					break;
				case 'select':
					$fields[] = self::field( 'multiselect' === ( $f['value_type'] ?? '' ) ? 'multiselect' : 'select', array_merge( $base, array( 'options' => self::choices( $f['options'] ?? array() ) ) ) );
					break;
				case 'radio':
				case 'checkbox':
					$fields[] = self::field( $t, array_merge( $base, array( 'options' => self::choices( $f['options'] ?? array() ) ) ) );
					break;
				case 'upload':
					$fields[] = self::field( 'file_upload', array_merge( $base, array( 'multiple' => 'multiple' === ( $f['file-type'] ?? '' ) ) ) );
					break;
				case 'html':
					$fields[] = self::field( 'html', array( 'html_content' => $f['variations'] ?? '' ) );
					break;
				case 'section':
					$fields[] = self::field( 'section_break', array( 'title' => $f['section_title'] ?? '', 'description' => $f['section_subtitle'] ?? '' ) );
					break;
				case 'consent':
				case 'gdprcheckbox':
					$fields[] = self::field( 'gdpr_agreement', array( 'label' => wp_strip_all_tags( $f['consent_description'] ?? ( $f['gdpr_description'] ?? $base['label'] ) ), 'required' => true ) );
					break;
				case 'page-break':
					$fields[] = self::field( 'form_step', array( 'step_title' => $f['field_label'] ?? '' ) );
					break;
				default:
					self::$skipped[] = $t;
			}
		}
		return array( 'title' => $post->post_title, 'fields' => $fields );
	}

	/* ── WPForms ─────────────────────────────────────────────────────── */

	private static function from_wpforms( $id ) {
		$post = get_post( $id );
		$data = $post ? json_decode( $post->post_content, true ) : null;
		if ( ! is_array( $data ) ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$fields = array();
		foreach ( ( $data['fields'] ?? array() ) as $f ) {
			$t    = $f['type'] ?? '';
			$base = array(
				'label'       => $f['label'] ?? null,
				'placeholder' => $f['placeholder'] ?? null,
				'required'    => ! empty( $f['required'] ),
				'help_text'   => $f['description'] ?? null,
				'default_value' => $f['default_value'] ?? null,
			);
			$map  = array( 'text' => 'text', 'textarea' => 'textarea', 'email' => 'email', 'number' => 'number', 'url' => 'url', 'phone' => 'phone', 'hidden' => 'hidden', 'password' => 'password', 'address' => 'address', 'rating' => 'star_rating', 'richtext' => 'rich_text' );
			if ( isset( $map[ $t ] ) ) {
				$fields[] = self::field( $map[ $t ], $base );
				continue;
			}
			switch ( $t ) {
				case 'name':
					$simple   = 'simple' === ( $f['format'] ?? '' );
					$fields[] = $simple ? self::field( 'text', $base ) : self::field( 'name', array_merge( $base, array( 'show_middle_name' => 'first-middle-last' === ( $f['format'] ?? '' ) ) ) );
					break;
				case 'select':
					$fields[] = self::field( ! empty( $f['multiple'] ) ? 'multiselect' : 'select', array_merge( $base, array( 'options' => self::choices( $f['choices'] ?? array() ) ) ) );
					break;
				case 'radio':
				case 'checkbox':
					$fields[] = self::field( $t, array_merge( $base, array( 'options' => self::choices( $f['choices'] ?? array() ) ) ) );
					break;
				case 'date-time':
					$fields[] = self::field( 'date', array_merge( $base, array( 'date_type' => 'date-time' === ( $f['format'] ?? '' ) ? 'datetime' : 'date' ) ) );
					break;
				case 'file-upload':
					$fields[] = self::field( 'file_upload', array_merge( $base, array( 'allowed_types' => $f['extensions'] ?? null, 'max_size' => $f['max_size'] ?? null, 'multiple' => (int) ( $f['max_file_number'] ?? 1 ) > 1 ) ) );
					break;
				case 'html':
				case 'content':
					$fields[] = self::field( 'html', array( 'html_content' => $f['code'] ?? ( $f['content'] ?? '' ) ) );
					break;
				case 'divider':
					$fields[] = self::field( 'section_break', array( 'title' => $f['label'] ?? '', 'description' => $f['description'] ?? '' ) );
					break;
				case 'pagebreak':
					if ( 'bottom' !== ( $f['position'] ?? '' ) ) {
						$fields[] = self::field( 'form_step', array( 'step_title' => $f['title'] ?? '' ) );
					}
					break;
				case 'gdpr-checkbox':
					$fields[] = self::field( 'gdpr_agreement', array( 'label' => wp_strip_all_tags( $f['choices'][1]['label'] ?? ( $f['label'] ?? '' ) ), 'required' => true ) );
					break;
				case 'number-slider':
					$fields[] = self::field( 'range_slider', array_merge( $base, array( 'min' => $f['min'] ?? 0, 'max' => $f['max'] ?? 100 ) ) );
					break;
				default:
					self::$skipped[] = $t;
			}
		}
		return array( 'title' => $post->post_title, 'fields' => $fields, 'submit' => $data['settings']['submit_text'] ?? null );
	}

	/* ── Contact Form 7 ──────────────────────────────────────────────── */

	private static function from_cf7( $id ) {
		$post = get_post( $id );
		if ( ! $post ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$template = get_post_meta( $id, '_form', true );
		$template = $template ? $template : $post->post_content;
		$fields   = array();
		$submit   = null;
		// Each tag: [type* name option "value" "value"]; the label is the text just before it.
		if ( preg_match_all( '/((?:(?!\[)[\s\S]){0,160})\[([a-z_]+)(\*?)\s+([^\s\]]+)([^\]]*)\]/i', $template, $matches, PREG_SET_ORDER ) ) {
			foreach ( $matches as $m ) {
				$type     = strtolower( $m[2] );
				$required = '*' === $m[3];
				$name     = $m[4];
				$rest     = $m[5];
				preg_match_all( '/"([^"]*)"/', $rest, $quoted );
				$values   = $quoted[1];
				$before   = trim( preg_replace( '/\s+/', ' ', wp_strip_all_tags( preg_replace( '/<\/label>[\s\S]*$/i', '', $m[1] ) ) ) );
				$label    = $before ? $before : ucwords( str_replace( array( '-', '_' ), ' ', $name ) );
				$ph       = preg_match( '/\bplaceholder\b/', $rest ) && $values ? $values[0] : null;
				$base     = array( 'label' => $label, 'required' => $required, 'placeholder' => $ph, 'name_attribute' => $name );
				$map      = array( 'text' => 'text', 'email' => 'email', 'url' => 'url', 'tel' => 'phone', 'number' => 'number', 'date' => 'date', 'textarea' => 'textarea', 'hidden' => 'hidden' );
				if ( isset( $map[ $type ] ) ) {
					$fields[] = self::field( $map[ $type ], $base );
				} elseif ( in_array( $type, array( 'select', 'checkbox', 'radio' ), true ) ) {
					$is_multi = 'select' === $type && false !== strpos( $rest, 'multiple' );
					$fields[] = self::field( $is_multi ? 'multiselect' : $type, array_merge( $base, array( 'placeholder' => null, 'options' => self::choices( $values ) ) ) );
				} elseif ( 'file' === $type ) {
					$fields[] = self::field( 'file_upload', $base );
				} elseif ( 'acceptance' === $type ) {
					$fields[] = self::field( 'terms_conditions', array( 'label' => $label, 'required' => true ) );
				} elseif ( 'submit' === $type ) {
					$submit = $values ? $values[0] : null;
				} else {
					self::$skipped[] = $type;
				}
			}
		}
		return array( 'title' => $post->post_title, 'fields' => $fields, 'submit' => $submit );
	}
}
