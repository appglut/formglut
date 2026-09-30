<?php
/**
 * FormGlut Migrator: import forms (fields and layout, not entries) from other form plugins.
 *
 * Supported: WPForms, Fluent Forms, Ninja Forms, Forminator, MetForm, SureForms, Formidable, Form Maker, Gutena Forms and Contact Form 7. Each imported form becomes a new
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
		// Table based sources.
		$tables = array(
			array( 'ninja', 'Ninja Forms', 'nf3_forms', 'SELECT f.id, f.title AS title, (SELECT COUNT(*) FROM {p}nf3_fields x WHERE x.parent_id = f.id) AS n FROM {p}nf3_forms f ORDER BY f.id DESC' ),
			array( 'formidable', 'Formidable Forms', 'frm_forms', "SELECT f.id, f.name AS title, (SELECT COUNT(*) FROM {p}frm_fields x WHERE x.form_id = f.id) AS n FROM {p}frm_forms f WHERE f.status <> 'trash' AND (f.is_template = 0 OR f.is_template IS NULL) ORDER BY f.id DESC" ),
			array( 'formmaker', 'Form Maker', 'formmaker', 'SELECT id, title, 0 AS n FROM {p}formmaker ORDER BY id DESC' ),
		);
		foreach ( $tables as $t ) {
			$table = $wpdb->prefix . ( 'formidable' === $t[0] ? 'frm_forms' : $t[2] );
			if ( ! $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table ) ) ) {
				continue;
			}
			$rows = $wpdb->get_results( str_replace( '{p}', $wpdb->prefix, $t[3] ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.NotPrepared
			if ( $rows ) {
				$sources[] = array( 'key' => $t[0], 'name' => $t[1], 'forms' => array_map( static function ( $r ) use ( $t, $done ) {
					return array( 'id' => (int) $r->id, 'title' => $r->title, 'fields' => (int) $r->n ? (int) $r->n : null, 'imported' => isset( $done[ $t[0] . ':' . $r->id ] ) );
				}, $rows ) );
			}
		}
		// Block / Elementor based sources.
		if ( post_type_exists( 'metform-form' ) || $wpdb->get_var( "SELECT ID FROM {$wpdb->posts} WHERE post_type = 'metform-form' LIMIT 1" ) ) { // phpcs:ignore WordPress.DB.DirectDatabaseQuery
			$posts = get_posts( array( 'post_type' => 'metform-form', 'post_status' => array( 'publish', 'draft', 'private' ), 'numberposts' => 200 ) );
			if ( $posts ) {
				$sources[] = array( 'key' => 'metform', 'name' => 'MetForm', 'forms' => array_map( static function ( $p ) use ( $done ) {
					return array( 'id' => (int) $p->ID, 'title' => $p->post_title, 'fields' => null, 'imported' => isset( $done[ 'metform:' . $p->ID ] ) );
				}, $posts ) );
			}
		}
		$sure = get_posts( array( 'post_type' => 'sureforms_form', 'post_status' => array( 'publish', 'draft', 'private' ), 'numberposts' => 200 ) );
		if ( $sure ) {
			$sources[] = array( 'key' => 'sureforms', 'name' => 'SureForms', 'forms' => array_map( static function ( $p ) use ( $done ) {
				return array( 'id' => (int) $p->ID, 'title' => $p->post_title, 'fields' => null, 'imported' => isset( $done[ 'sureforms:' . $p->ID ] ) );
			}, $sure ) );
		}
		// Gutena Forms lives inside page content: list posts that contain the block.
		$gut = $wpdb->get_results( "SELECT ID, post_title FROM {$wpdb->posts} WHERE post_status IN ('publish','draft','private') AND post_type NOT IN ('revision','nav_menu_item') AND post_content LIKE '%<!-- wp:gutena/forms%' ORDER BY ID DESC LIMIT 200" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		if ( $gut ) {
			$sources[] = array( 'key' => 'gutena', 'name' => 'Gutena Forms', 'forms' => array_map( static function ( $p ) use ( $done ) {
				return array( 'id' => (int) $p->ID, 'title' => $p->post_title ? $p->post_title : __( '(no title)', 'formglut' ), 'fields' => null, 'imported' => isset( $done[ 'gutena:' . $p->ID ] ) );
			}, $gut ) );
		}
		$copied = get_option( 'formglut_migrated_entries', array() );
		foreach ( $sources as &$src ) {
			$counts = self::entry_counts( $src['key'] );
			foreach ( $src['forms'] as &$sf ) {
				$k                    = $src['key'] . ':' . $sf['id'];
				$sf['entries']        = isset( $counts[ $sf['id'] ] ) ? $counts[ $sf['id'] ] : 0;
				$sf['form_id']        = isset( $done[ $k ] ) ? (int) $done[ $k ] : 0;
				$sf['entries_copied'] = isset( $copied[ $k ] );
			}
			unset( $sf );
		}
		unset( $src );
		return $sources;
	}

	/**
	 * Remember that a form's entries were copied.
	 *
	 * @param string $source Source key.
	 * @param int    $id     Source form ID.
	 * @param int    $count  Entries copied.
	 * @return void
	 */
	public static function mark_entries_done( $source, $id, $count ) {
		$c                       = get_option( 'formglut_migrated_entries', array() );
		$c[ $source . ':' . $id ] = (int) $count;
		update_option( 'formglut_migrated_entries', $c, false );
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
			case 'ninja':
				$data = self::from_ninja( $id );
				break;
			case 'metform':
				$data = self::from_metform( $id );
				break;
			case 'sureforms':
				$data = self::from_sureforms( $id );
				break;
			case 'formidable':
				$data = self::from_formidable( $id );
				break;
			case 'formmaker':
				$data = self::from_formmaker( $id );
				break;
			case 'gutena':
				$data = self::from_gutena( $id );
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
			'src_key'            => $a['name'] ?? null,
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
				'src_key'     => $f['element_id'] ?? null,
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
				'src_key'     => isset( $f['id'] ) ? (string) $f['id'] : null,
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
				$base     = array( 'label' => $label, 'required' => $required, 'placeholder' => $ph, 'name_attribute' => $name, 'src_key' => $name );
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

	/* ── shared: simple type map used by the block / row based sources ── */

	/**
	 * Build a FormGlut field from a generic { type, base, choices } description.
	 *
	 * @param string $type    Source type (already normalised: text, email, select ...).
	 * @param array  $base    Common props.
	 * @param array  $choices Choices.
	 * @return array|null
	 */
	private static function generic( $type, $base, $choices = array() ) {
		$map = array( 'text' => 'text', 'email' => 'email', 'textarea' => 'textarea', 'number' => 'number', 'url' => 'url', 'phone' => 'phone', 'date' => 'date', 'time' => 'time', 'hidden' => 'hidden', 'password' => 'password', 'address' => 'address', 'rating' => 'star_rating', 'rich_text' => 'rich_text' );
		if ( isset( $map[ $type ] ) ) {
			return self::field( $map[ $type ], $base );
		}
		switch ( $type ) {
			case 'select':
			case 'multiselect':
			case 'radio':
			case 'checkbox':
				return self::field( $type, array_merge( $base, array( 'placeholder' => null, 'options' => self::choices( $choices ) ) ) );
			case 'file':
				return self::field( 'file_upload', $base );
			case 'html':
				return self::field( 'html', array( 'html_content' => $base['default_value'] ?? ( $base['label'] ?? '' ) ) );
			case 'divider':
				return self::field( 'section_break', array( 'title' => $base['label'] ?? '', 'description' => $base['help_text'] ?? '' ) );
			case 'step':
				return self::field( 'form_step', array( 'step_title' => $base['label'] ?? '' ) );
			case 'terms':
				return self::field( 'terms_conditions', array( 'label' => $base['label'] ?? __( 'I agree to the terms', 'formglut' ), 'required' => true ) );
			case 'recaptcha':
				return self::field( 'recaptcha', array() );
			case 'range':
				return self::field( 'range_slider', $base );
			case 'submit':
			case 'skip':
				return null;
		}
		self::$skipped[] = $type;
		return null;
	}

	/* ── Ninja Forms ─────────────────────────────────────────────────── */

	private static function from_ninja( $id ) {
		global $wpdb;
		$form = $wpdb->get_row( $wpdb->prepare( "SELECT title FROM {$wpdb->prefix}nf3_forms WHERE id = %d", $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		if ( ! $form ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$rows   = $wpdb->get_results( $wpdb->prepare( "SELECT id, type, label FROM {$wpdb->prefix}nf3_fields WHERE parent_id = %d", $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$fields = array();
		$submit = null;
		$list   = array();
		foreach ( $rows as $r ) {
			$meta = array();
			foreach ( (array) $wpdb->get_results( $wpdb->prepare( "SELECT `key`, `value` FROM {$wpdb->prefix}nf3_field_meta WHERE parent_id = %d", $r->id ) ) as $m ) { // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				$meta[ $m->key ] = $m->value;
			}
			$list[] = array( 'row' => $r, 'meta' => $meta, 'order' => (int) ( $meta['order'] ?? 0 ) );
		}
		usort( $list, static function ( $a, $b ) {
			return $a['order'] <=> $b['order'];
		} );
		$types = array( 'textbox' => 'text', 'firstname' => 'text', 'lastname' => 'text', 'email' => 'email', 'textarea' => 'textarea', 'number' => 'number', 'phone' => 'phone', 'date' => 'date', 'hidden' => 'hidden', 'password' => 'password', 'address' => 'address', 'zip' => 'text', 'city' => 'text', 'listselect' => 'select', 'listmultiselect' => 'multiselect', 'listradio' => 'radio', 'listcheckbox' => 'checkbox', 'checkbox' => 'checkbox', 'listcountry' => 'select', 'starrating' => 'rating', 'html' => 'html', 'hr' => 'divider', 'recaptcha' => 'recaptcha', 'recaptcha_v3' => 'recaptcha', 'terms' => 'terms', 'file_upload' => 'file', 'submit' => 'submit', 'spam' => 'skip', 'save' => 'skip', 'confirm' => 'skip' );
		foreach ( $list as $it ) {
			$t    = $it['row']->type;
			$meta = $it['meta'];
			if ( 'submit' === $t ) {
				$submit = $meta['label'] ?? $it['row']->label;
				continue;
			}
			$options = maybe_unserialize( $meta['options'] ?? '' );
			$base    = array( 'label' => $meta['label'] ?? $it['row']->label, 'required' => ! empty( $meta['required'] ), 'placeholder' => $meta['placeholder'] ?? null, 'help_text' => wp_strip_all_tags( $meta['desc_text'] ?? '' ), 'default_value' => $meta['default'] ?? null, 'name_attribute' => $meta['key'] ?? null, 'src_key' => (string) $it['row']->id );
			if ( 'html' === $t ) {
				$base['default_value'] = $meta['default'] ?? '';
			}
			if ( isset( $types[ $t ] ) ) {
				$f = self::generic( $types[ $t ], $base, is_array( $options ) ? $options : array() );
				if ( $f ) {
					$fields[] = $f;
				}
			} else {
				self::$skipped[] = $t;
			}
		}
		return array( 'title' => $form->title, 'fields' => $fields, 'submit' => $submit );
	}

	/* ── MetForm (Elementor widgets) ─────────────────────────────────── */

	private static function from_metform( $id ) {
		$post = get_post( $id );
		$tree = $post ? json_decode( (string) get_post_meta( $id, '_elementor_data', true ), true ) : null;
		if ( ! is_array( $tree ) ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$fields = array();
		$submit = null;
		self::mf_walk( $tree, $fields, $submit );
		return array( 'title' => $post->post_title, 'fields' => $fields, 'submit' => $submit );
	}

	private static function mf_walk( $nodes, &$fields, &$submit ) {
		$map = array( 'mf-text' => 'text', 'mf-email' => 'email', 'mf-textarea' => 'textarea', 'mf-number' => 'number', 'mf-telephone' => 'phone', 'mf-url' => 'url', 'mf-date' => 'date', 'mf-time' => 'time', 'mf-password' => 'password', 'mf-select' => 'select', 'mf-multi-select' => 'multiselect', 'mf-radio' => 'radio', 'mf-checkbox' => 'checkbox', 'mf-file-upload' => 'file', 'mf-rating' => 'rating', 'mf-range' => 'range', 'mf-recaptcha' => 'recaptcha', 'mf-simple-captcha' => 'skip', 'mf-switch' => 'checkbox', 'mf-gdpr-consent' => 'terms', 'mf-listing-fname' => 'text', 'mf-listing-lname' => 'text' );
		foreach ( (array) $nodes as $n ) {
			$w = $n['widgetType'] ?? '';
			$s = $n['settings'] ?? array();
			if ( 'mf-button' === $w ) {
				$submit = $s['mf_btn_text'] ?? null;
			} elseif ( $w ) {
				if ( isset( $map[ $w ] ) ) {
					$choices = array();
					foreach ( (array) ( $s['mf_input_list'] ?? array() ) as $o ) {
						$choices[] = array( 'label' => $o['mf_input_option_text'] ?? '', 'value' => $o['mf_input_option_value'] ?? '' );
					}
					$base = array( 'label' => $s['mf_input_label'] ?? null, 'required' => 'yes' === ( $s['mf_input_required'] ?? '' ), 'placeholder' => $s['mf_input_placeholder'] ?? null, 'help_text' => $s['mf_input_help_text'] ?? null, 'name_attribute' => $s['mf_input_name'] ?? null, 'src_key' => $s['mf_input_name'] ?? null );
					$f    = self::generic( $map[ $w ], $base, $choices );
					if ( $f ) {
						$fields[] = $f;
					}
				} elseif ( 0 === strpos( $w, 'mf-' ) ) {
					self::$skipped[] = $w;
				}
			}
			if ( ! empty( $n['elements'] ) ) {
				self::mf_walk( $n['elements'], $fields, $submit );
			}
		}
	}

	/* ── SureForms (blocks) ──────────────────────────────────────────── */

	private static function from_sureforms( $id ) {
		$post = get_post( $id );
		if ( ! $post ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$fields = array();
		$submit = null;
		self::block_walk( parse_blocks( $post->post_content ), 'srfm/', $fields, $submit );
		return array( 'title' => $post->post_title, 'fields' => $fields, 'submit' => $submit );
	}

	/**
	 * Walk blocks of a plugin namespace (SureForms, Gutena).
	 */
	private static function block_walk( $blocks, $ns, &$fields, &$submit ) {
		$map = array( 'input' => 'text', 'text' => 'text', 'text-input' => 'text', 'email' => 'email', 'textarea' => 'textarea', 'number' => 'number', 'phone' => 'phone', 'url' => 'url', 'date' => 'date', 'date-picker' => 'date', 'time' => 'time', 'address' => 'address', 'dropdown' => 'select', 'select' => 'select', 'multi-choice' => 'radio', 'radio' => 'radio', 'checkbox' => 'checkbox', 'gdpr' => 'terms', 'terms' => 'terms', 'upload' => 'file', 'file' => 'file', 'hidden' => 'hidden', 'password' => 'password', 'slider' => 'range', 'rating' => 'rating', 'page-break' => 'step', 'inline-button' => 'submit', 'button' => 'submit', 'submit' => 'submit' );
		foreach ( (array) $blocks as $b ) {
			$name = (string) ( $b['blockName'] ?? '' );
			if ( 0 === strpos( $name, $ns ) ) {
				$key = substr( $name, strlen( $ns ) );
				$a   = $b['attrs'] ?? array();
				if ( isset( $map[ $key ] ) ) {
					$type = $map[ $key ];
					if ( 'radio' === $type && isset( $a['singleSelection'] ) && false === $a['singleSelection'] ) {
						$type = 'checkbox';
					}
					if ( 'select' === $type && ! empty( $a['multiSelect'] ) ) {
						$type = 'multiselect';
					}
					$choices = array();
					foreach ( (array) ( $a['options'] ?? array() ) as $o ) {
						$choices[] = is_array( $o ) ? array( 'label' => $o['optionTitle'] ?? ( $o['label'] ?? '' ), 'value' => $o['value'] ?? '' ) : $o;
					}
					if ( 'submit' === $type ) {
						$submit = $a['text'] ?? ( $a['buttonText'] ?? null );
					} else {
						$f = self::generic( $type, array( 'label' => $a['label'] ?? ( $a['title'] ?? null ), 'required' => ! empty( $a['required'] ), 'placeholder' => $a['placeholder'] ?? null, 'help_text' => $a['help'] ?? ( $a['description'] ?? null ), 'default_value' => $a['defaultValue'] ?? null, 'name_attribute' => $a['slug'] ?? null, 'src_key' => $a['block_id'] ?? null ), $choices );
						if ( $f ) {
							$fields[] = $f;
						}
					}
				} elseif ( ! in_array( $key, array( 'form', 'forms', 'container', 'group', 'columns', 'column' ), true ) ) {
					self::$skipped[] = $key;
				}
			}
			if ( ! empty( $b['innerBlocks'] ) ) {
				self::block_walk( $b['innerBlocks'], $ns, $fields, $submit );
			}
		}
	}

	/* ── Formidable ──────────────────────────────────────────────────── */

	private static function from_formidable( $id ) {
		global $wpdb;
		$form = $wpdb->get_row( $wpdb->prepare( "SELECT name FROM {$wpdb->prefix}frm_forms WHERE id = %d", $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		if ( ! $form ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$rows   = $wpdb->get_results( $wpdb->prepare( "SELECT id, type, name, description, required, default_value, options, field_options FROM {$wpdb->prefix}frm_fields WHERE form_id = %d ORDER BY field_order", $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$map    = array( 'text' => 'text', 'email' => 'email', 'textarea' => 'textarea', 'number' => 'number', 'url' => 'url', 'phone' => 'phone', 'date' => 'date', 'time' => 'time', 'hidden' => 'hidden', 'password' => 'password', 'select' => 'select', 'radio' => 'radio', 'checkbox' => 'checkbox', 'file' => 'file', 'rte' => 'rich_text', 'html' => 'html', 'divider' => 'divider', 'break' => 'step', 'star' => 'rating', 'scale' => 'range', 'captcha' => 'recaptcha', 'end_divider' => 'skip', 'submit' => 'skip' );
		$fields = array();
		foreach ( $rows as $r ) {
			$fo   = maybe_unserialize( $r->field_options );
			$fo   = is_array( $fo ) ? $fo : array();
			$opts = maybe_unserialize( $r->options );
			$base = array( 'label' => $r->name, 'required' => (bool) $r->required, 'placeholder' => $fo['placeholder'] ?? null, 'help_text' => $r->description, 'default_value' => is_scalar( $r->default_value ) ? $r->default_value : null, 'src_key' => (string) $r->id );
			if ( 'html' === $r->type ) {
				$base['default_value'] = $fo['description'] ?? $r->description;
			}
			if ( isset( $map[ $r->type ] ) ) {
				$f = self::generic( $map[ $r->type ], $base, is_array( $opts ) ? $opts : array() );
				if ( $f ) {
					$fields[] = $f;
				}
			} else {
				self::$skipped[] = $r->type;
			}
		}
		return array( 'title' => $form->name, 'fields' => $fields );
	}

	/* ── Form Maker (10Web) ──────────────────────────────────────────── */

	private static function from_formmaker( $id ) {
		global $wpdb;
		$form = $wpdb->get_row( $wpdb->prepare( "SELECT title, form_fields FROM {$wpdb->prefix}formmaker WHERE id = %d", $id ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		if ( ! $form ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$map    = array( 'type_text' => 'text', 'type_own_select' => 'select', 'type_submitter_mail' => 'email', 'type_textarea' => 'textarea', 'type_number' => 'number', 'type_phone' => 'phone', 'type_phone_new' => 'phone', 'type_date' => 'date', 'type_date_new' => 'date', 'type_time' => 'time', 'type_hidden' => 'hidden', 'type_password' => 'password', 'type_address' => 'address', 'type_radio' => 'radio', 'type_checkbox' => 'checkbox', 'type_file_upload' => 'file', 'type_star_rating' => 'rating', 'type_slider' => 'range', 'type_section_break' => 'divider', 'type_send_copy' => 'skip', 'type_captcha' => 'skip', 'type_recaptcha' => 'recaptcha', 'type_submit_reset' => 'skip', 'type_page_break' => 'step', 'type_editor' => 'html', 'type_map' => 'skip' );
		$fields = array();
		foreach ( explode( '*:*new_field*:*', (string) $form->form_fields ) as $chunk ) {
			$parts = explode( '*:*', $chunk );
			$kv    = array();
			// Values come first, followed by their key: value*:*key*:*value*:*key ...
			for ( $i = 0; $i + 1 < count( $parts ); $i += 2 ) {
				$kv[ $parts[ $i + 1 ] ] = $parts[ $i ];
			}
			$t = $kv['type'] ?? '';
			if ( '' === $t ) {
				continue;
			}
			$choices = array();
			foreach ( array_filter( explode( '***', (string) ( $kv['w_choices'] ?? '' ) ), 'strlen' ) as $c ) {
				$choices[] = $c;
			}
			$base = array( 'label' => $kv['w_field_label'] ?? null, 'required' => 'yes' === ( $kv['w_required'] ?? '' ), 'placeholder' => $kv['w_first_val'] ?? null, 'src_key' => $kv['id'] ?? null );
			if ( 'type_editor' === $t ) {
				$base['default_value'] = $kv['w_editor'] ?? '';
			}
			if ( isset( $map[ $t ] ) ) {
				$f = self::generic( $map[ $t ], $base, $choices );
				if ( $f ) {
					$fields[] = $f;
				}
			} else {
				self::$skipped[] = $t;
			}
		}
		return array( 'title' => $form->title, 'fields' => $fields );
	}

	/* ── Gutena Forms (blocks inside posts) ──────────────────────────── */

	private static function from_gutena( $id ) {
		$post = get_post( $id );
		if ( ! $post ) {
			return new WP_Error( 'missing', __( 'Form not found.', 'formglut' ) );
		}
		$fields = array();
		$submit = null;
		self::block_walk( parse_blocks( $post->post_content ), 'gutena/', $fields, $submit );
		return array( 'title' => $post->post_title ? $post->post_title : __( 'Gutena form', 'formglut' ), 'fields' => $fields, 'submit' => $submit );
	}

	/* ── Entries ─────────────────────────────────────────────────────── */

	/**
	 * Separate the src_key markers from a converted field list.
	 *
	 * @param array $fields Converted fields.
	 * @return array { fields: clean fields, map: src_key => { id, type } }
	 */
	public static function split_keys( $fields ) {
		$map   = array();
		$clean = array();
		foreach ( (array) $fields as $f ) {
			if ( ! empty( $f['columns'] ) ) {
				foreach ( $f['columns'] as $i => $col ) {
					$inner                  = self::split_keys( $col['fields'] ?? array() );
					$f['columns'][ $i ]['fields'] = $inner['fields'];
					$map                    = $map + $inner['map'];
				}
			}
			if ( isset( $f['src_key'] ) ) {
				$map[ (string) $f['src_key'] ] = array( 'id' => $f['id'], 'type' => $f['type'] );
				unset( $f['src_key'] );
			}
			$clean[] = $f;
		}
		return array( 'fields' => $clean, 'map' => $map );
	}

	/**
	 * Remember which source field feeds which FormGlut field (used when copying entries).
	 *
	 * @param int   $form_id FormGlut form ID.
	 * @param array $map     From split_keys().
	 * @return void
	 */
	public static function save_map( $form_id, $map ) {
		update_option( 'formglut_migmap_' . (int) $form_id, $map, false );
	}

	/**
	 * Number of entries per source form, keyed by source form ID.
	 *
	 * @param string $source Source key.
	 * @return int[]
	 */
	public static function entry_counts( $source ) {
		global $wpdb;
		$p   = $wpdb->prefix;
		$has = static function ( $t ) use ( $wpdb, $p ) {
			return (bool) $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $p . $t ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
		};
		$sql = '';
		switch ( $source ) {
			case 'fluentform':
				$sql = $has( 'fluentform_submissions' ) ? "SELECT form_id k, COUNT(*) c FROM {$p}fluentform_submissions GROUP BY form_id" : '';
				break;
			case 'forminator':
				$sql = $has( 'frmt_form_entry' ) ? "SELECT form_id k, COUNT(*) c FROM {$p}frmt_form_entry WHERE entry_type = 'custom-forms' GROUP BY form_id" : '';
				break;
			case 'wpforms':
				$sql = $has( 'wpforms_entries' ) ? "SELECT form_id k, COUNT(*) c FROM {$p}wpforms_entries GROUP BY form_id" : '';
				break;
			case 'ninja':
				$sql = "SELECT pm.meta_value k, COUNT(*) c FROM {$wpdb->postmeta} pm JOIN {$wpdb->posts} po ON po.ID = pm.post_id WHERE pm.meta_key = '_form_id' AND po.post_type = 'nf_sub' AND po.post_status <> 'auto-draft' GROUP BY pm.meta_value";
				break;
			case 'formidable':
				$sql = $has( 'frm_items' ) ? "SELECT form_id k, COUNT(*) c FROM {$p}frm_items GROUP BY form_id" : '';
				break;
			case 'formmaker':
				$sql = $has( 'formmaker_submits' ) ? "SELECT form_id k, COUNT(DISTINCT group_id) c FROM {$p}formmaker_submits GROUP BY form_id" : '';
				break;
			case 'metform':
				$sql = "SELECT pm.meta_value k, COUNT(*) c FROM {$wpdb->postmeta} pm JOIN {$wpdb->posts} po ON po.ID = pm.post_id WHERE pm.meta_key = 'metform_entries__form_id' AND po.post_type = 'metform-entry' AND po.post_status <> 'auto-draft' GROUP BY pm.meta_value";
				break;
			case 'sureforms':
				$sql = $has( 'srfm_entries' ) ? "SELECT form_id k, COUNT(*) c FROM {$p}srfm_entries GROUP BY form_id" : '';
				break;
		}
		if ( '' === $sql ) {
			return array();
		}
		$wpdb->suppress_errors( true );
		$rows = $wpdb->get_results( $sql ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.NotPrepared
		$wpdb->suppress_errors( false );
		$out = array();
		foreach ( (array) $rows as $r ) {
			$out[ (int) $r->k ] = (int) $r->c;
		}
		return $out;
	}

	/**
	 * A slice of entries of one source form.
	 *
	 * @param string $source Source key.
	 * @param int    $id     Source form ID.
	 * @param int    $offset Offset.
	 * @param int    $limit  Page size.
	 * @return array[] Each { values: src_key => value, date, status, starred, ip, browser, url }.
	 */
	public static function read_entries( $source, $id, $offset, $limit ) {
		global $wpdb;
		$p      = $wpdb->prefix;
		$out    = array();
		$offset = max( 0, (int) $offset );
		$limit  = max( 1, (int) $limit );
		$wpdb->suppress_errors( true );
		switch ( $source ) {
			case 'fluentform':
				$rows = $wpdb->get_results( $wpdb->prepare( "SELECT response, status, is_favourite, browser, ip, source_url, created_at FROM {$p}fluentform_submissions WHERE form_id = %d ORDER BY id ASC LIMIT %d OFFSET %d", $id, $limit, $offset ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				foreach ( (array) $rows as $r ) {
					$out[] = array( 'values' => (array) json_decode( (string) $r->response, true ), 'date' => $r->created_at, 'status' => self::status( $r->status ), 'starred' => (int) $r->is_favourite, 'ip' => $r->ip, 'browser' => $r->browser, 'url' => $r->source_url );
				}
				break;
			case 'forminator':
				$rows = $wpdb->get_results( $wpdb->prepare( "SELECT entry_id, is_spam, date_created FROM {$p}frmt_form_entry WHERE form_id = %d AND entry_type = 'custom-forms' ORDER BY entry_id ASC LIMIT %d OFFSET %d", $id, $limit, $offset ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				foreach ( (array) $rows as $r ) {
					$vals = array();
					foreach ( (array) $wpdb->get_results( $wpdb->prepare( "SELECT meta_key, meta_value FROM {$p}frmt_form_entry_meta WHERE entry_id = %d", $r->entry_id ) ) as $m ) { // phpcs:ignore WordPress.DB.DirectDatabaseQuery
						$vals[ $m->meta_key ] = maybe_unserialize( $m->meta_value );
					}
					$out[] = array( 'values' => $vals, 'date' => $r->date_created, 'status' => (int) $r->is_spam ? 'spam' : 'read' );
				}
				break;
			case 'wpforms':
				$rows = $wpdb->get_results( $wpdb->prepare( "SELECT fields, status, starred, viewed, ip_address, date FROM {$p}wpforms_entries WHERE form_id = %d ORDER BY entry_id ASC LIMIT %d OFFSET %d", $id, $limit, $offset ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				foreach ( (array) $rows as $r ) {
					$vals = array();
					foreach ( (array) json_decode( (string) $r->fields, true ) as $fid => $f ) {
						$vals[ (string) $fid ] = is_array( $f ) && array_key_exists( 'value', $f ) ? $f['value'] : $f;
					}
					$out[] = array( 'values' => $vals, 'date' => $r->date, 'status' => 'spam' === $r->status ? 'spam' : ( (int) $r->viewed ? 'read' : 'unread' ), 'starred' => (int) $r->starred, 'ip' => $r->ip_address );
				}
				break;
			case 'ninja':
				$ids = $wpdb->get_col( $wpdb->prepare( "SELECT po.ID FROM {$wpdb->posts} po JOIN {$wpdb->postmeta} pm ON pm.post_id = po.ID AND pm.meta_key = '_form_id' AND pm.meta_value = %s WHERE po.post_type = 'nf_sub' AND po.post_status <> 'auto-draft' ORDER BY po.ID ASC LIMIT %d OFFSET %d", (string) $id, $limit, $offset ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				foreach ( (array) $ids as $pid ) {
					$vals = array();
					foreach ( get_post_meta( $pid ) as $k => $v ) {
						if ( 0 === strpos( $k, '_field_' ) ) {
							$vals[ substr( $k, 7 ) ] = maybe_unserialize( $v[0] );
						}
					}
					$post  = get_post( $pid );
					$out[] = array( 'values' => $vals, 'date' => $post->post_date, 'status' => 'trash' === $post->post_status ? 'trash' : 'read' );
				}
				break;
			case 'formidable':
				$rows = $wpdb->get_results( $wpdb->prepare( "SELECT id, ip, created_at FROM {$p}frm_items WHERE form_id = %d ORDER BY id ASC LIMIT %d OFFSET %d", $id, $limit, $offset ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				foreach ( (array) $rows as $r ) {
					$vals = array();
					foreach ( (array) $wpdb->get_results( $wpdb->prepare( "SELECT field_id, meta_value FROM {$p}frm_item_metas WHERE item_id = %d", $r->id ) ) as $m ) { // phpcs:ignore WordPress.DB.DirectDatabaseQuery
						$vals[ (string) $m->field_id ] = maybe_unserialize( $m->meta_value );
					}
					$out[] = array( 'values' => $vals, 'date' => $r->created_at, 'status' => 'read', 'ip' => $r->ip );
				}
				break;
			case 'formmaker':
				$groups = $wpdb->get_results( $wpdb->prepare( "SELECT group_id, MIN(`date`) d, MAX(ip) ip FROM {$p}formmaker_submits WHERE form_id = %d GROUP BY group_id ORDER BY group_id ASC LIMIT %d OFFSET %d", $id, $limit, $offset ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				foreach ( (array) $groups as $g ) {
					$vals = array();
					foreach ( (array) $wpdb->get_results( $wpdb->prepare( "SELECT element_label, element_value FROM {$p}formmaker_submits WHERE group_id = %d AND form_id = %d", $g->group_id, $id ) ) as $m ) { // phpcs:ignore WordPress.DB.DirectDatabaseQuery
						$vals[ (string) $m->element_label ] = false !== strpos( (string) $m->element_value, '***' ) ? array_filter( explode( '***', $m->element_value ), 'strlen' ) : $m->element_value;
					}
					$out[] = array( 'values' => $vals, 'date' => $g->d, 'status' => 'read', 'ip' => $g->ip );
				}
				break;
			case 'metform':
				$ids = $wpdb->get_col( $wpdb->prepare( "SELECT po.ID FROM {$wpdb->posts} po JOIN {$wpdb->postmeta} pm ON pm.post_id = po.ID AND pm.meta_key = 'metform_entries__form_id' AND pm.meta_value = %s WHERE po.post_type = 'metform-entry' AND po.post_status <> 'auto-draft' ORDER BY po.ID ASC LIMIT %d OFFSET %d", (string) $id, $limit, $offset ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				foreach ( (array) $ids as $pid ) {
					$post  = get_post( $pid );
					$out[] = array( 'values' => (array) maybe_unserialize( get_post_meta( $pid, 'metform_entries__form_data', true ) ), 'date' => $post->post_date, 'status' => 'trash' === $post->post_status ? 'trash' : 'read', 'url' => (string) get_post_meta( $pid, 'metform_entries__page_url', true ) );
				}
				break;
			case 'sureforms':
				$rows = $wpdb->get_results( $wpdb->prepare( "SELECT form_data, status, created_at FROM {$p}srfm_entries WHERE form_id = %d ORDER BY ID ASC LIMIT %d OFFSET %d", $id, $limit, $offset ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				foreach ( (array) $rows as $r ) {
					$vals = array();
					foreach ( (array) maybe_unserialize( $r->form_data ) as $k => $v ) {
						// Keys look like srfm-input-<block id>-lbl-<encoded label>.
						$vals[ preg_match( '/^srfm-[a-z\-]+?-([0-9a-f]{8})-lbl/i', (string) $k, $m ) ? $m[1] : (string) $k ] = $v;
					}
					$out[] = array( 'values' => $vals, 'date' => $r->created_at, 'status' => self::status( $r->status ) );
				}
				break;
		}
		$wpdb->suppress_errors( false );
		return $out;
	}

	/**
	 * Map another plugin's entry status to an entry status FormGlut knows.
	 *
	 * @param string $s Source status.
	 * @return string
	 */
	private static function status( $s ) {
		$s = strtolower( (string) $s );
		if ( in_array( $s, array( 'trashed', 'trash' ), true ) ) {
			return 'trash';
		}
		if ( 'spam' === $s ) {
			return 'spam';
		}
		return 'unread' === $s ? 'unread' : 'read';
	}

	/**
	 * Turn one source value into what FormGlut stores for a field of $type.
	 *
	 * @param mixed  $v    Source value.
	 * @param string $type FormGlut field type.
	 * @return string|string[]
	 */
	private static function value( $v, $type ) {
		if ( in_array( $type, array( 'checkbox', 'multiselect' ), true ) ) {
			$list = is_array( $v ) ? array_values( $v ) : preg_split( '/\s*,\s*/', (string) $v, -1, PREG_SPLIT_NO_EMPTY );
			return array_values( array_filter( array_map( static function ( $x ) {
				return sanitize_text_field( is_array( $x ) ? implode( ' ', $x ) : (string) $x );
			}, $list ), 'strlen' ) );
		}
		if ( is_array( $v ) ) {
			$parts = array();
			array_walk_recursive( $v, static function ( $x ) use ( &$parts ) {
				if ( is_scalar( $x ) && '' !== trim( (string) $x ) ) {
					$parts[] = trim( (string) $x );
				}
			} );
			$v = implode( 'address' === $type ? ', ' : ( 'file' === $type ? ', ' : ' ' ), $parts );
		}
		return 'textarea' === $type ? sanitize_textarea_field( (string) $v ) : sanitize_text_field( (string) $v );
	}

	/**
	 * Copy one slice of entries into a FormGlut form.
	 *
	 * @param string $source  Source key.
	 * @param int    $id      Source form ID.
	 * @param int    $form_id FormGlut form ID.
	 * @param int    $offset  Offset.
	 * @param int    $limit   Page size.
	 * @return array { read, copied }
	 */
	public static function copy_entries( $source, $id, $form_id, $offset, $limit ) {
		$map    = get_option( 'formglut_migmap_' . (int) $form_id, array() );
		$slice  = self::read_entries( $source, $id, $offset, $limit );
		$copied = 0;
		global $wpdb;
		foreach ( $slice as $e ) {
			$data = array();
			foreach ( $map as $key => $target ) {
				if ( isset( $e['values'][ $key ] ) && '' !== $e['values'][ $key ] && array() !== $e['values'][ $key ] ) {
					$data[ $target['id'] ] = self::value( $e['values'][ $key ], $target['type'] );
				}
			}
			if ( empty( $data ) ) {
				continue;
			}
			$date = isset( $e['date'] ) && preg_match( '/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/', (string) $e['date'] ) ? substr( $e['date'], 0, 19 ) : '';
			$new  = FormGlut_Entry::create( array(
				'form_id'     => $form_id,
				'fields_data' => $data,
				'status'      => $e['status'] ?? 'read',
				'starred'     => (int) ( $e['starred'] ?? 0 ),
				'ip_address'  => $e['ip'] ?? '',
				'browser'     => $e['browser'] ?? '',
				'source_url'  => $e['url'] ?? '',
			) );
			if ( $new ) {
				++$copied;
				if ( $date ) {
					$wpdb->update( $wpdb->formglut_entries, array( 'created_at' => $date ), array( 'id' => $new ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				}
			}
		}
		return array( 'read' => count( $slice ), 'copied' => $copied );
	}
}
