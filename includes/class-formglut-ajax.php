<?php
/**
 * FormGlut AJAX Handlers.
 *
 * Registers and handles all admin and frontend AJAX actions.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Ajax class.
 */
class FormGlut_Ajax {

	/**
	 * Single instance.
	 *
	 * @var FormGlut_Ajax|null
	 */
	private static $instance = null;

	/**
	 * Get singleton instance.
	 *
	 * @return FormGlut_Ajax
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor — register AJAX actions.
	 */
	private function __construct() {
		// Admin AJAX actions.
		$admin_actions = array(
			'get_forms',
			'get_form_stats',
			'get_form',
			'create_form',
			'update_form',
			'delete_form',
			'duplicate_form',
			'update_form_status',
			'increment_views',
			'get_entries',
			'get_entry',
			'get_entry_counts',
			'delete_entry',
			'update_entry_status',
			'toggle_entry_star',
			'get_settings',
			'save_settings',
		);

		foreach ( $admin_actions as $action ) {
			add_action( "wp_ajax_formglut_{$action}", array( $this, $action ) );
		}

		// Public AJAX actions (no auth required).
		add_action( 'wp_ajax_formglut_submit_form', array( $this, 'submit_form' ) );
		add_action( 'wp_ajax_nopriv_formglut_submit_form', array( $this, 'submit_form' ) );
	}

	/**
	 * Verify admin request — nonce + capability.
	 *
	 * @return void
	 */
	private function verify_admin_request() {
		check_ajax_referer( 'formglut_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Unauthorized.', 'formglut' ) ), 403 );
		}
	}

	/**
	 * Sanitize a JSON string and return the decoded array, or WP error.
	 *
	 * @param string $raw JSON string from POST.
	 * @return array|\WP_Error
	 */
	private function sanitize_json( $raw ) {
		$decoded = json_decode( wp_unslash( $raw ), true );

		if ( json_last_error() !== JSON_ERROR_NONE || ! is_array( $decoded ) ) {
			return new WP_Error( 'invalid_json', __( 'Invalid data format.', 'formglut' ) );
		}

		return $decoded;
	}

	/**
	 * Sanitize a form fields array — validates type, label, and options.
	 *
	 * @param array $fields Raw fields array.
	 * @return array Sanitized fields.
	 */
	private function sanitize_form_fields( $fields ) {
		$clean = array();

		foreach ( $fields as $field ) {
			if ( ! is_array( $field ) ) {
				continue;
			}

			$type = isset( $field['type'] ) ? sanitize_key( $field['type'] ) : 'text';
			if ( '' === $type ) {
				continue;
			}

			// Column containers: keep only layout props and recurse into each column.
			if ( FormGlut_Form::is_container( $field ) ) {
				$columns = array();
				foreach ( $field['columns'] as $column ) {
					$columns[] = array(
						'width'  => isset( $column['width'] ) ? max( 1, min( 100, (float) $column['width'] ) ) : 1,
						'fields' => isset( $column['fields'] ) && is_array( $column['fields'] ) ? $this->sanitize_form_fields( $column['fields'] ) : array(),
					);
				}
				$clean[] = array(
					'id'               => isset( $field['id'] ) ? sanitize_text_field( $field['id'] ) : uniqid( 'field_' ),
					'type'             => $type,
					'columns'          => $columns,
					'gap'              => isset( $field['gap'] ) ? sanitize_key( $field['gap'] ) : 'medium',
					'responsive_stack' => ! isset( $field['responsive_stack'] ) || ! empty( $field['responsive_stack'] ),
					'container_class'  => isset( $field['container_class'] ) ? sanitize_text_field( $field['container_class'] ) : '',
					'admin_label'      => isset( $field['admin_label'] ) ? sanitize_text_field( $field['admin_label'] ) : '',
				);
				continue;
			}

			$clean_field = array(
				'id'       => isset( $field['id'] ) ? sanitize_text_field( $field['id'] ) : uniqid( 'field_' ),
				'type'     => $type,
				'label'    => isset( $field['label'] ) ? sanitize_text_field( $field['label'] ) : '',
				'required' => ! empty( $field['required'] ),
			);

			$optional_string_keys = array( 'placeholder', 'validation_message', 'css_class', 'default_value', 'help_text', 'tag', 'style', 'allowed_types', 'resize', 'name_attribute', 'element_class', 'container_class', 'prefix_label', 'suffix_label', 'label', 'admin_label', 'label_placement', 'field_width', 'label_width', 'unique_error_message', 'mask_pattern', 'mask_placeholder' );
			foreach ( $optional_string_keys as $key ) {
				if ( isset( $field[ $key ] ) ) {
					$clean_field[ $key ] = is_array( $field[ $key ] ) ? $this->sanitize_deep( $field[ $key ] ) : sanitize_text_field( $field[ $key ] );
				}
			}

			foreach ( array( 'html_content', 'terms_content' ) as $html_key ) {
				if ( isset( $field[ $html_key ] ) && is_string( $field[ $html_key ] ) ) {
					$clean_field[ $html_key ] = wp_kses_post( $field[ $html_key ] );
				}
			}

			if ( isset( $field['options'] ) && is_array( $field['options'] ) ) {
				$clean_field['options'] = array();
				foreach ( $field['options'] as $option ) {
					if ( is_array( $option ) ) {
						$clean_field['options'][] = array(
							'label' => isset( $option['label'] ) ? sanitize_text_field( $option['label'] ) : '',
							'value' => isset( $option['value'] ) ? sanitize_text_field( $option['value'] ) : '',
						) + ( ! empty( $option['disabled'] ) ? array( 'disabled' => true ) : array() );
					}
				}
			}

			$optional_int_keys = array( 'rows', 'cols', 'maxlength', 'character_limit', 'min_length', 'max_length', 'min', 'max', 'step', 'min_selection', 'max_selection', 'max_size', 'field_width_custom', 'label_width_custom' );
			foreach ( $optional_int_keys as $key ) {
				if ( isset( $field[ $key ] ) ) {
					$clean_field[ $key ] = 'step' === $key ? abs( (float) $field[ $key ] ) : absint( $field[ $key ] );
				}
			}

			if ( isset( $field['hidden'] ) ) {
				$clean_field['hidden'] = ! empty( $field['hidden'] );
			}

			// Conditional Logic - preserve conditions array
			if ( isset( $field['conditional_logic'] ) ) {
				$clean_field['conditional_logic'] = ! empty( $field['conditional_logic'] );
			}
			if ( isset( $field['condition_match'] ) ) {
				$clean_field['condition_match'] = in_array( $field['condition_match'], array( 'any', 'all' ), true )
					? $field['condition_match']
					: 'any';
			}

			// Validate as Unique option
			if ( isset( $field['validate_unique'] ) ) {
				$clean_field['validate_unique'] = ! empty( $field['validate_unique'] );
			}

			// Mask options
			if ( isset( $field['enable_mask'] ) ) {
				$clean_field['enable_mask'] = ! empty( $field['enable_mask'] );
			}
			if ( isset( $field['reversible_mask'] ) ) {
				$clean_field['reversible_mask'] = ! empty( $field['reversible_mask'] );
			}
			if ( isset( $field['clear_on_invalid'] ) ) {
				$clean_field['clear_on_invalid'] = ! empty( $field['clear_on_invalid'] );
			}

			// Other boolean options
			if ( isset( $field['inline'] ) ) {
				$clean_field['inline'] = ! empty( $field['inline'] );
			}
			if ( isset( $field['disable_first_option'] ) ) {
				$clean_field['disable_first_option'] = ! empty( $field['disable_first_option'] );
			}
			if ( isset( $field['conditions'] ) && is_array( $field['conditions'] ) ) {
				$clean_field['conditions'] = array();
				foreach ( $field['conditions'] as $condition ) {
					if ( is_array( $condition ) && isset( $condition['field_id'] ) ) {
						$clean_field['conditions'][] = array(
							'field_id' => sanitize_text_field( $condition['field_id'] ),
							'operator' => isset( $condition['operator'] ) ? sanitize_text_field( $condition['operator'] ) : 'is',
							'value'    => isset( $condition['value'] ) ? sanitize_text_field( $condition['value'] ) : '',
						);
					}
				}
			}

			// Preserve any extra keys not explicitly handled (pass-through sanitized).
			foreach ( $field as $key => $value ) {
				if ( ! isset( $clean_field[ $key ] ) ) {
					if ( is_bool( $value ) ) {
						$clean_field[ $key ] = $value;
					} elseif ( is_string( $value ) ) {
						$clean_field[ $key ] = sanitize_text_field( $value );
					} elseif ( is_int( $value ) || is_float( $value ) ) {
						$clean_field[ $key ] = $value;
					} elseif ( is_array( $value ) ) {
						$clean_field[ $key ] = $this->sanitize_deep( $value );
					}
				}
			}

			$clean[] = $clean_field;
		}

		return $clean;
	}

	/**
	 * Field types that collect no value (display, layout, security widgets).
	 *
	 * @var string[]
	 */
	const NON_INPUT_TYPES = array( 'html', 'heading', 'section_break', 'shortcode', 'action_hook', 'custom_submit_button', 'recaptcha', 'hcaptcha', 'turnstile', 'divider' );

	/**
	 * Recursively sanitize an arbitrary field option value (strings, numbers, bools, arrays).
	 *
	 * @param mixed $value Raw value.
	 * @return mixed
	 */
	private function sanitize_deep( $value ) {
		if ( is_array( $value ) ) {
			$out = array();
			foreach ( $value as $k => $v ) {
				$out[ is_int( $k ) ? $k : sanitize_text_field( $k ) ] = $this->sanitize_deep( $v );
			}
			return $out;
		}
		if ( is_bool( $value ) || is_int( $value ) || is_float( $value ) || null === $value ) {
			return $value;
		}
		return sanitize_text_field( (string) $value );
	}

	/**
	 * Sanitize the submit button config array.
	 *
	 * @param array $config Raw submit button config.
	 * @return array Sanitized config.
	 */
	private function sanitize_submit_btn( $config ) {
		if ( ! is_array( $config ) ) {
			return array();
		}

		$clean = array();

		$string_keys = array( 'text', 'size', 'alignment', 'bg_color', 'text_color', 'font_weight' );
		foreach ( $string_keys as $key ) {
			if ( isset( $config[ $key ] ) ) {
				$clean[ $key ] = sanitize_text_field( $config[ $key ] );
			}
		}

		$int_keys = array( 'border_radius', 'font_size', 'height' );
		foreach ( $int_keys as $key ) {
			if ( isset( $config[ $key ] ) ) {
				$clean[ $key ] = absint( $config[ $key ] );
			}
		}

		return $clean;
	}

	/* ── Form Handlers ────────────────────────────────────────────────── */

	/**
	 * Get paginated list of forms.
	 *
	 * @return void
	 */
	public function get_forms() {
		$this->verify_admin_request();

		$page     = absint( $_GET['page'] ?? 1 ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$per_page = absint( $_GET['per_page'] ?? 20 ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$search   = isset( $_GET['search'] ) ? sanitize_text_field( wp_unslash( $_GET['search'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$status   = isset( $_GET['status'] ) ? sanitize_text_field( wp_unslash( $_GET['status'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$orderby  = isset( $_GET['orderby'] ) ? sanitize_key( $_GET['orderby'] ) : 'created_at'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$order    = isset( $_GET['order'] ) ? sanitize_key( $_GET['order'] ) : 'DESC'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$date_from = isset( $_GET['date_from'] ) ? sanitize_text_field( wp_unslash( $_GET['date_from'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$date_to   = isset( $_GET['date_to'] ) ? sanitize_text_field( wp_unslash( $_GET['date_to'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		$offset = max( 0, ( $page - 1 ) * $per_page );

		$result = FormGlut_Form::get_all( array(
			'search'   => $search,
			'date_from' => $date_from,
			'date_to'   => $date_to,
			'status'   => $status,
			'orderby'  => $orderby,
			'order'    => $order,
			'per_page' => $per_page,
			'offset'   => $offset,
		) );

		$forms = array();
		foreach ( $result['forms'] as $form ) {
			$views          = absint( $form->views );
			$entries        = absint( $form->entry_count );
			$conversion     = $views > 0 ? round( ( $entries / $views ) * 100 ) : 0;

			$forms[] = array(
				'id'          => absint( $form->id ),
				'title'       => esc_html( $form->title ),
				'status'      => esc_html( $form->status ),
				'views'       => $views,
				'entries'     => $entries,
				'conversion'  => $conversion,
				'created'     => esc_html( $form->created_at ),
				'updated'     => esc_html( $form->updated_at ),
				'shortcode'   => '[formglut id="' . absint( $form->id ) . '"]',
			);
		}

		wp_send_json_success( array(
			'forms'     => $forms,
			'total'     => absint( $result['total'] ),
			'page'      => $page,
			'per_page'  => $per_page,
			'total_pages' => $per_page > 0 ? (int) ceil( $result['total'] / $per_page ) : 1,
		) );
	}

	/**
	 * Get a single form by ID.
	 *
	 * @return void
	 */
	/**
	 * Get aggregate form statistics.
	 *
	 * @return void
	 */
	public function get_form_stats() {
		$this->verify_admin_request();

		global $wpdb;

		$total_forms    = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_forms}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$active_forms   = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_forms} WHERE status IN ('active','published')" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$draft_forms    = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_forms} WHERE status = 'draft'" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$closed_forms   = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_forms} WHERE status = 'closed'" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching

		$total_entries = 0;
		$entries_exists = $wpdb->get_var( "SHOW TABLES LIKE '{$wpdb->formglut_entries}'" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		if ( $entries_exists ) {
			$total_entries = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_entries}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		}

		wp_send_json_success( array(
			'total_forms'   => $total_forms,
			'active_forms'  => $active_forms,
			'draft_forms'   => $draft_forms,
			'closed_forms'  => $closed_forms,
			'total_entries' => $total_entries,
		) );
	}

	public function get_form() {
		$this->verify_admin_request();

		$form_id = absint( $_GET['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( ! $form_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing form ID.', 'formglut' ) ) );
		}

		$form = FormGlut_Form::get( $form_id );
		if ( ! $form ) {
			wp_send_json_error( array( 'message' => __( 'Form not found.', 'formglut' ) ) );
		}

		wp_send_json_success( array(
			'form' => array(
				'id'         => absint( $form->id ),
				'title'      => esc_html( $form->title ),
				'fields'     => $form->fields,
				'submit_btn' => $form->submit_btn,
				'settings'   => $form->settings,
				'status'     => esc_html( $form->status ),
				'views'      => absint( $form->views ),
				'created_at' => esc_html( $form->created_at ),
				'updated_at' => esc_html( $form->updated_at ),
			),
		) );
	}

	/**
	 * Create a new form.
	 *
	 * @return void
	 */
	public function create_form() {
		$this->verify_admin_request();

		$title = isset( $_POST['title'] ) ? sanitize_text_field( wp_unslash( $_POST['title'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( empty( $title ) ) {
			wp_send_json_error( array( 'message' => __( 'Form title is required.', 'formglut' ) ) );
		}

		// Parse and sanitize fields JSON.
		$fields = array();
		if ( isset( $_POST['fields'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$parsed = $this->sanitize_json( $_POST['fields'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			if ( is_wp_error( $parsed ) ) {
				wp_send_json_error( array( 'message' => $parsed->get_error_message() ) );
			}
			$fields = $this->sanitize_form_fields( $parsed );
		}

		// Parse and sanitize submit_btn JSON.
		$submit_btn = array();
		if ( isset( $_POST['submit_btn'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$parsed = $this->sanitize_json( $_POST['submit_btn'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			if ( is_wp_error( $parsed ) ) {
				wp_send_json_error( array( 'message' => $parsed->get_error_message() ) );
			}
			$submit_btn = $this->sanitize_submit_btn( $parsed );
		}

		$settings = array();
		if ( isset( $_POST['settings'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$parsed = $this->sanitize_json( $_POST['settings'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			if ( ! is_wp_error( $parsed ) ) {
				$settings = $parsed;
			}
		}

		$status = isset( $_POST['status'] ) ? sanitize_text_field( wp_unslash( $_POST['status'] ) ) : 'draft'; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! in_array( $status, array( 'active', 'draft', 'closed', 'published' ), true ) ) {
			$status = 'draft';
		}

		$form_id = FormGlut_Form::create( array(
			'title'      => $title,
			'fields'     => $fields,
			'submit_btn' => $submit_btn,
			'settings'   => $settings,
			'status'     => $status,
		) );

		if ( ! $form_id ) {
			wp_send_json_error( array( 'message' => __( 'Failed to create form.', 'formglut' ) ) );
		}

		wp_send_json_success( array(
			'message' => __( 'Form created successfully.', 'formglut' ),
			'form_id' => absint( $form_id ),
		) );
	}

	/**
	 * Update an existing form.
	 *
	 * @return void
	 */
	public function update_form() {
		$this->verify_admin_request();

		$form_id = absint( $_POST['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! $form_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing form ID.', 'formglut' ) ) );
		}

		$form = FormGlut_Form::get( $form_id );
		if ( ! $form ) {
			wp_send_json_error( array( 'message' => __( 'Form not found.', 'formglut' ) ) );
		}

		$data = array();

		if ( isset( $_POST['title'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$title = sanitize_text_field( wp_unslash( $_POST['title'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( empty( $title ) ) {
				wp_send_json_error( array( 'message' => __( 'Form title cannot be empty.', 'formglut' ) ) );
			}
			$data['title'] = $title;
		}

		if ( isset( $_POST['fields'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$parsed = $this->sanitize_json( $_POST['fields'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			if ( is_wp_error( $parsed ) ) {
				wp_send_json_error( array( 'message' => $parsed->get_error_message() ) );
			}
			$data['fields'] = $this->sanitize_form_fields( $parsed );
		}

		if ( isset( $_POST['submit_btn'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$parsed = $this->sanitize_json( $_POST['submit_btn'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			if ( is_wp_error( $parsed ) ) {
				wp_send_json_error( array( 'message' => $parsed->get_error_message() ) );
			}
			$data['submit_btn'] = $this->sanitize_submit_btn( $parsed );
		}

		if ( isset( $_POST['settings'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$parsed = $this->sanitize_json( $_POST['settings'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			if ( is_wp_error( $parsed ) ) {
				wp_send_json_error( array( 'message' => $parsed->get_error_message() ) );
			}
			$data['settings'] = $parsed;
		}

		if ( isset( $_POST['status'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			$status = sanitize_text_field( wp_unslash( $_POST['status'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( ! in_array( $status, array( 'active', 'draft', 'closed', 'published' ), true ) ) {
				wp_send_json_error( array( 'message' => __( 'Invalid status.', 'formglut' ) ) );
			}
			$data['status'] = $status;
		}

		if ( empty( $data ) ) {
			wp_send_json_error( array( 'message' => __( 'No data to update.', 'formglut' ) ) );
		}

		$updated = FormGlut_Form::update( $form_id, $data );
		if ( ! $updated ) {
			wp_send_json_error( array( 'message' => __( 'Failed to update form.', 'formglut' ) ) );
		}

		wp_send_json_success( array(
			'message' => __( 'Form updated successfully.', 'formglut' ),
		) );
	}

	/**
	 * Delete a form and all its entries.
	 *
	 * @return void
	 */
	public function delete_form() {
		$this->verify_admin_request();

		$form_id = absint( $_POST['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! $form_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing form ID.', 'formglut' ) ) );
		}

		$form = FormGlut_Form::get( $form_id );
		if ( ! $form ) {
			wp_send_json_error( array( 'message' => __( 'Form not found.', 'formglut' ) ) );
		}

		$deleted = FormGlut_Form::delete( $form_id );
		if ( ! $deleted ) {
			wp_send_json_error( array( 'message' => __( 'Failed to delete form.', 'formglut' ) ) );
		}

		wp_send_json_success( array(
			'message' => __( 'Form deleted successfully.', 'formglut' ),
		) );
	}

	/**
	 * Duplicate a form.
	 *
	 * @return void
	 */
	public function duplicate_form() {
		$this->verify_admin_request();

		$form_id = absint( $_POST['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! $form_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing form ID.', 'formglut' ) ) );
		}

		$new_id = FormGlut_Form::duplicate( $form_id );
		if ( ! $new_id ) {
			wp_send_json_error( array( 'message' => __( 'Failed to duplicate form.', 'formglut' ) ) );
		}

		wp_send_json_success( array(
			'message' => __( 'Form duplicated successfully.', 'formglut' ),
			'form_id' => absint( $new_id ),
		) );
	}

	/**
	 * Update a form's status (active/draft/closed).
	 *
	 * @return void
	 */
	public function update_form_status() {
		$this->verify_admin_request();

		$form_id = absint( $_POST['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$status  = isset( $_POST['status'] ) ? sanitize_text_field( wp_unslash( $_POST['status'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing

		if ( ! $form_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing form ID.', 'formglut' ) ) );
		}

		if ( ! in_array( $status, array( 'active', 'draft', 'closed', 'published' ), true ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid status.', 'formglut' ) ) );
		}

		$form = FormGlut_Form::get( $form_id );
		if ( ! $form ) {
			wp_send_json_error( array( 'message' => __( 'Form not found.', 'formglut' ) ) );
		}

		$updated = FormGlut_Form::update( $form_id, array( 'status' => $status ) );
		if ( ! $updated ) {
			wp_send_json_error( array( 'message' => __( 'Failed to update status.', 'formglut' ) ) );
		}

		wp_send_json_success( array(
			'message' => __( 'Status updated.', 'formglut' ),
			'status'  => $status,
		) );
	}

	/**
	 * Increment a form's view count.
	 *
	 * @return void
	 */
	public function increment_views() {
		$this->verify_admin_request();

		$form_id = absint( $_POST['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! $form_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing form ID.', 'formglut' ) ) );
		}

		FormGlut_Form::increment_views( $form_id );

		wp_send_json_success( array(
			'message' => __( 'Views incremented.', 'formglut' ),
		) );
	}

	/* ── Entry Handlers ────────────────────────────────────────────────── */

	/**
	 * Get paginated list of entries.
	 *
	 * @return void
	 */
	public function get_entries() {
		$this->verify_admin_request();

		$page     = absint( $_GET['page'] ?? 1 ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$per_page = absint( $_GET['per_page'] ?? 20 ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$form_id  = absint( $_GET['form_id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$search   = isset( $_GET['search'] ) ? sanitize_text_field( wp_unslash( $_GET['search'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$status   = isset( $_GET['status'] ) ? sanitize_text_field( wp_unslash( $_GET['status'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$starred  = isset( $_GET['starred'] ) && '' !== $_GET['starred'] ? absint( $_GET['starred'] ) : null; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$orderby  = isset( $_GET['orderby'] ) ? sanitize_key( $_GET['orderby'] ) : 'created_at'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$order    = isset( $_GET['order'] ) ? sanitize_key( $_GET['order'] ) : 'DESC'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		$offset = max( 0, ( $page - 1 ) * $per_page );

		$result = FormGlut_Entry::get_entries( array(
			'form_id'  => $form_id,
			'search'   => $search,
			'status'   => $status,
			'starred'  => $starred,
			'orderby'  => $orderby,
			'order'    => $order,
			'per_page' => $per_page,
			'offset'   => $offset,
		) );

		$entries = array();
		foreach ( $result['entries'] as $entry ) {
			$entries[] = array(
				'id'          => absint( $entry->id ),
				'form_id'     => absint( $entry->form_id ),
				'fields_data' => $entry->fields_data,
				'status'      => esc_html( $entry->status ),
				'starred'     => absint( $entry->starred ),
				'ip_address'  => esc_html( $entry->ip_address ),
				'browser'     => esc_html( $this->parse_user_agent( $entry->browser ) ),
				'source_url'  => esc_url( $entry->source_url ),
				'country'     => esc_html( $entry->country ),
				'created_at'  => esc_html( $entry->created_at ),
			);
		}

		// Attach form titles to entries.
		global $wpdb;
		$form_ids    = array_unique( wp_list_pluck( $entries, 'form_id' ) );
		$form_titles = array();
		if ( $form_ids ) {
			$placeholders       = implode( ',', array_fill( 0, count( $form_ids ), '%d' ) );
			$form_results = $wpdb->get_results( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
				$wpdb->prepare(
					"SELECT id, title FROM {$wpdb->formglut_forms} WHERE id IN ({$placeholders})", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQLPlaceholders.UnfinishedPrepare
					...$form_ids
				)
			);
			foreach ( $form_results as $f ) {
				$form_titles[ $f->id ] = esc_html( $f->title );
			}
		}
		foreach ( $entries as &$e ) {
			$e['form_title'] = isset( $form_titles[ $e['form_id'] ] ) ? $form_titles[ $e['form_id'] ] : '';
		}
		unset( $e );

		wp_send_json_success( array(
			'entries'    => $entries,
			'total'      => absint( $result['total'] ),
			'page'       => $page,
			'per_page'   => $per_page,
			'total_pages' => $per_page > 0 ? (int) ceil( $result['total'] / $per_page ) : 1,
		) );
	}

	/**
	 * Get entry counts grouped by status.
	 *
	 * @return void
	 */
	public function get_entry_counts() {
		$this->verify_admin_request();

		global $wpdb;

		$form_id = absint( $_GET['form_id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		$where = '';
		if ( $form_id ) {
			$where = $wpdb->prepare( ' WHERE form_id = %d', $form_id );
		}

		$counts = array(
			'all'     => 0,
			'unread'  => 0,
			'read'    => 0,
			'starred' => 0,
			'spam'    => 0,
			'trash'   => 0,
		);

		$counts['all'] = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_entries}{$where}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

		$statuses = array( 'unread', 'read', 'spam', 'trash' );
		foreach ( $statuses as $status ) {
			$counts[ $status ] = (int) $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
				"SELECT COUNT(*) FROM {$wpdb->formglut_entries}{$where}" . ( $where ? ' AND' : ' WHERE' ) . $wpdb->prepare( ' status = %s', $status ) // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQL.NotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
			);
		}

		$starred_where = $where ? $where . $wpdb->prepare( ' AND starred = %d', 1 ) : $wpdb->prepare( ' WHERE starred = %d', 1 );
		$counts['starred'] = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$wpdb->formglut_entries}{$starred_where}" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter

		wp_send_json_success( array( 'counts' => $counts ) );
	}

	/**
	 * Get a single entry by ID.
	 *
	 * @return void
	 */
	public function get_entry() {
		$this->verify_admin_request();

		$entry_id = absint( $_GET['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( ! $entry_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing entry ID.', 'formglut' ) ) );
		}

		$entry = FormGlut_Entry::get( $entry_id );
		if ( ! $entry ) {
			wp_send_json_error( array( 'message' => __( 'Entry not found.', 'formglut' ) ) );
		}

		// Load form title for context.
		$form = FormGlut_Form::get( $entry->form_id );

		wp_send_json_success( array(
			'entry' => array(
				'id'          => absint( $entry->id ),
				'form_id'     => absint( $entry->form_id ),
				'form_title'  => $form ? esc_html( $form->title ) : '',
				'fields_data' => json_decode( $entry->fields_data, true ),
				'status'      => esc_html( $entry->status ),
				'starred'     => absint( $entry->starred ),
				'ip_address'  => esc_html( $entry->ip_address ),
				'browser'     => esc_html( $this->parse_user_agent( $entry->browser ) ),
				'source_url'  => esc_url( $entry->source_url ),
				'country'     => esc_html( $entry->country ),
				'created_at'  => esc_html( $entry->created_at ),
			),
		) );
	}

	/**
	 * Delete an entry.
	 *
	 * @return void
	 */
	public function delete_entry() {
		$this->verify_admin_request();

		$entry_id = absint( $_POST['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! $entry_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing entry ID.', 'formglut' ) ) );
		}

		$entry = FormGlut_Entry::get( $entry_id );
		if ( ! $entry ) {
			wp_send_json_error( array( 'message' => __( 'Entry not found.', 'formglut' ) ) );
		}

		$deleted = FormGlut_Entry::delete( $entry_id );
		if ( ! $deleted ) {
			wp_send_json_error( array( 'message' => __( 'Failed to delete entry.', 'formglut' ) ) );
		}

		wp_send_json_success( array(
			'message' => __( 'Entry deleted.', 'formglut' ),
		) );
	}

	/**
	 * Update an entry's status.
	 *
	 * @return void
	 */
	public function update_entry_status() {
		$this->verify_admin_request();

		$entry_id = absint( $_POST['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$status   = isset( $_POST['status'] ) ? sanitize_text_field( wp_unslash( $_POST['status'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing

		if ( ! $entry_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing entry ID.', 'formglut' ) ) );
		}

		$allowed_statuses = array( 'unread', 'read', 'spam', 'trash' );
		if ( ! in_array( $status, $allowed_statuses, true ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid status.', 'formglut' ) ) );
		}

		$entry = FormGlut_Entry::get( $entry_id );
		if ( ! $entry ) {
			wp_send_json_error( array( 'message' => __( 'Entry not found.', 'formglut' ) ) );
		}

		$updated = FormGlut_Entry::update_status( $entry_id, $status );
		if ( ! $updated ) {
			wp_send_json_error( array( 'message' => __( 'Failed to update entry status.', 'formglut' ) ) );
		}

		wp_send_json_success( array(
			'message' => __( 'Entry status updated.', 'formglut' ),
			'status'  => $status,
		) );
	}

	/**
	 * Toggle the starred state of an entry.
	 *
	 * @return void
	 */
	public function toggle_entry_star() {
		$this->verify_admin_request();

		$entry_id = absint( $_POST['id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! $entry_id ) {
			wp_send_json_error( array( 'message' => __( 'Missing entry ID.', 'formglut' ) ) );
		}

		$entry = FormGlut_Entry::get( $entry_id );
		if ( ! $entry ) {
			wp_send_json_error( array( 'message' => __( 'Entry not found.', 'formglut' ) ) );
		}

		$new_starred = FormGlut_Entry::toggle_star( $entry_id );

		wp_send_json_success( array(
			'message' => $new_starred ? __( 'Entry starred.', 'formglut' ) : __( 'Star removed.', 'formglut' ),
			'starred' => absint( $new_starred ),
		) );
	}

	/* ── Settings Handlers ─────────────────────────────────────────────── */

	/**
	 * Get all plugin settings.
	 *
	 * @return void
	 */
	public function get_settings() {
		$this->verify_admin_request();

		wp_send_json_success( array(
			'settings' => FormGlut_Settings::get_all(),
		) );
	}

	/**
	 * Save plugin settings.
	 *
	 * @return void
	 */
	public function save_settings() {
		$this->verify_admin_request();

		$raw = isset( $_POST['settings'] ) ? $_POST['settings'] : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		if ( empty( $raw ) ) {
			wp_send_json_error( array( 'message' => __( 'No settings provided.', 'formglut' ) ) );
		}

		$settings = $this->sanitize_json( $raw );
		if ( is_wp_error( $settings ) ) {
			wp_send_json_error( array( 'message' => $settings->get_error_message() ) );
		}

		$saved = FormGlut_Settings::save( $settings );
		if ( ! $saved ) {
			wp_send_json_error( array( 'message' => __( 'Failed to save settings.', 'formglut' ) ) );
		}

		wp_send_json_success( array(
			'message' => __( 'Settings saved.', 'formglut' ),
		) );
	}

	/* ── Frontend Submission ───────────────────────────────────────────── */

	/**
	 * Handle public form submission.
	 *
	 * Uses a separate nonce (formglut_submit_nonce) from admin actions.
	 * No authentication required — this is a public endpoint.
	 *
	 * @return void
	 */
	public function submit_form() {
		check_ajax_referer( 'formglut_submit_nonce', 'nonce' );

		$success_msg = FormGlut_Settings::get( 'formglut_success_message', __( 'Thank you! Your submission has been received.', 'formglut' ) );
		$error_msg   = FormGlut_Settings::get( 'formglut_error_message', __( 'Something went wrong. Please try again.', 'formglut' ) );

		$form_id = absint( $_POST['form_id'] ?? 0 );
		if ( ! $form_id ) {
			wp_send_json_error( array( 'message' => $error_msg ) );
		}

		$form = FormGlut_Form::get( $form_id );
		if ( ! $form || ! in_array( $form->status, array( 'active', 'published' ), true ) ) {
			wp_send_json_error( array( 'message' => $error_msg ) );
		}

		// Per-form settings (defaults already filled in).
		$fs   = $form->settings;
		$conf = $fs['confirmation'];
		if ( '' !== $conf['error_message'] ) {
			$error_msg = $conf['error_message'];
		}

		// Restrictions: login required, schedule and entry limit.
		$availability = FormGlut_Form_Settings::availability( $form );
		if ( ! $availability['open'] ) {
			wp_send_json_error( array( 'message' => $availability['message'] ) );
		}

		// Check honeypot (per-form override, then the global setting).
		if ( FormGlut_Form_Settings::honeypot_enabled( $form ) && ! empty( $_POST['formglut_hp'] ) ) {
			wp_send_json_success( array( 'message' => $success_msg ) );
			return;
		}

		// Minimum fill time (anti-bot).
		$min_time = (int) $fs['spam']['min_time'];
		if ( $min_time > 0 ) {
			$token = isset( $_POST['formglut_ts'] ) ? sanitize_text_field( wp_unslash( $_POST['formglut_ts'] ) ) : '';
			if ( ! FormGlut_Form_Settings::time_token_ok( $token, $form_id, $min_time ) ) {
				wp_send_json_error( array( 'message' => __( 'Please take a moment to complete the form before submitting.', 'formglut' ) ) );
			}
		}

		// Captcha verification: fields on the form, plus the optional "protect every form" reCAPTCHA v3.
		$error_msg     = FormGlut_Settings::get( 'formglut_error_message', __( 'Something went wrong. Please try again.', 'formglut' ) );
		$captcha_error = $this->verify_captchas( $form, $error_msg );
		if ( '' !== $captcha_error ) {
			wp_send_json_error( array( 'message' => $captcha_error ) );
			return;
		}

		// Validate and sanitize submitted fields against form definition.
		$fields_data = array();
		$errors      = array();

		if ( is_array( $form->fields ) ) {
			foreach ( FormGlut_Form::flatten_fields( $form->fields ) as $field ) {
				$field_id   = isset( $field['id'] ) ? $field['id'] : '';
				$field_type = isset( $field['type'] ) ? $field['type'] : 'text';
				$field_label = ! empty( $field['admin_label'] ) ? $field['admin_label'] : ( isset( $field['label'] ) ? $field['label'] : $field_id );
				$required   = ! empty( $field['required'] );

				if ( in_array( $field_type, self::NON_INPUT_TYPES, true ) ) {
					continue;
				}

				// Use custom name attribute if set, otherwise fall back to field ID
				$field_name = isset( $field['name_attribute'] ) && '' !== $field['name_attribute']
					? $field['name_attribute']
					: $field_id;

				$value      = isset( $_POST[ $field_name ] ) ? wp_unslash( $_POST[ $field_name ] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- sanitized in sanitize_field_value() below.

				// Multi-part fields post an array: check required parts, then store one readable value.
				if ( in_array( $field_type, array( 'name', 'address', 'date_range' ), true ) ) {
					$posted = is_array( $value ) ? array_map( 'sanitize_text_field', $value ) : array();
					$error  = $this->validate_multipart( $field, $field_type, $posted, $field_label );
					if ( '' !== $error && ! ( ! empty( $field['conditional_logic'] ) && ! array_filter( $posted, 'strlen' ) ) ) {
						$errors[ $field_id ] = $error;
						continue;
					}
					$value = $this->collapse_multipart( $field, $field_type, $posted );
				}

				// Check if field was conditionally hidden (frontend passes this info)
				// The frontend clears values from hidden fields, so if conditional logic is enabled
				// and the value is empty, we skip validation
				$is_conditional = ! empty( $field['conditional_logic'] );
				$was_hidden = $is_conditional && '' === $value;

				// Required check - skip for conditionally hidden fields
				if ( $required && ! $was_hidden && '' === $value ) {
					$errors[ $field_id ] = isset( $field['validation_message'] ) && '' !== $field['validation_message']
						? $field['validation_message']
						: sprintf( /* translators: %s: field label */ __( '%s is required.', 'formglut' ), $field_label );
					continue;
				}

				// Skip empty optional fields.
				if ( '' === $value ) {
					$fields_data[ $field_id ] = '';
					continue;
				}

				// Email format validation.
				if ( 'email' === $field_type && ! is_email( $value ) ) {
					$errors[ $field_id ] = isset( $field['validation_message'] ) && '' !== $field['validation_message']
						? $field['validation_message']
						: sprintf( /* translators: %s: field label */ __( 'Please enter a valid email address for %s.', 'formglut' ), $field_label );
					continue;
				}

				// Type-specific validation (length, range, format, allowed options, selection limits).
				$type_error = $this->validate_field_value( $field, $field_type, $value, $field_label, $field_name );
				if ( '' !== $type_error ) {
					$errors[ $field_id ] = $type_error;
					continue;
				}

				// Unique value validation.
				if ( ! empty( $field['validate_unique'] ) ) {
					// Check if this value already exists in previous entries for this form
					global $wpdb;
					$entries_table = $wpdb->prefix . 'formglut_entries';

					// Sanitize the value for safe comparison
					$sanitized_value = $this->sanitize_field_value( $value, $field_type, $field );

					// Query for existing entries with this field value
					$existing = $wpdb->get_var( $wpdb->prepare(
						"SELECT COUNT(*) FROM {$entries_table}
						WHERE form_id = %d
						AND fields_data LIKE %s",
						$form_id,
						'%"' . $wpdb->esc_like( $field_id ) . '":"' . $wpdb->esc_like( $sanitized_value ) . '"}%'
					) );

					if ( $existing > 0 ) {
						$errors[ $field_id ] = isset( $field['unique_error_message'] ) && '' !== $field['unique_error_message']
							? $field['unique_error_message']
							: sprintf(
								/* translators: %s: field label */
								__( 'This %s has already been submitted.', 'formglut' ),
								strtolower( $field_label )
							);
						continue;
					}
				}

				// Sanitize by field type.
				$fields_data[ $field_id ] = $this->sanitize_field_value( $value, $field_type, $field );
			}
		}

		if ( ! empty( $errors ) ) {
			wp_send_json_error( array(
				'message'   => __( 'Please fix the errors above.', 'formglut' ),
				'errors'    => $errors,
			) );
		}

		// Per-form submission rules.
		$ip = $this->get_client_ip();
		$rs = $fs['restrictions'];
		$sp = $fs['spam'];

		if ( $rs['deny_empty'] && ! array_filter( $fields_data, static function ( $v ) {
			return is_array( $v ) ? ! empty( array_filter( $v, 'strlen' ) ) : '' !== trim( (string) $v );
		} ) ) {
			wp_send_json_error( array( 'message' => __( 'Please fill in the form before submitting.', 'formglut' ) ) );
		}

		if ( $rs['one_per_ip'] && '' !== $ip ) {
			global $wpdb;
			$already = (int) $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
				$wpdb->prepare( "SELECT COUNT(*) FROM {$wpdb->formglut_entries} WHERE form_id = %d AND ip_address = %s", $form_id, $ip )
			);
			if ( $already > 0 ) {
				wp_send_json_error( array( 'message' => '' !== $rs['duplicate_message'] ? $rs['duplicate_message'] : __( 'You have already submitted this form.', 'formglut' ) ) );
			}
		}

		// Spam checks: blocked words, then Akismet.
		$is_spam = false;
		if ( '' !== trim( $sp['keywords'] ) && FormGlut_Form_Settings::has_blocked_keyword( $sp['keywords'], $fields_data ) ) {
			if ( 'reject' === $sp['keyword_action'] ) {
				wp_send_json_error( array( 'message' => __( 'Your submission contains words that are not allowed.', 'formglut' ) ) );
			}
			$is_spam = true;
		}
		if ( ! $is_spam && $sp['akismet'] ) {
			$is_spam = FormGlut_Form_Settings::akismet_is_spam( $fields_data, $form, $ip );
		}

		// Store entry (per-form override, then the global setting).
		$entry_id      = 0;
		$store_entries = FormGlut_Form_Settings::stores_entries( $form );
		$keep_ip       = (bool) $sp['store_ip'];
		if ( $store_entries ) {
			$entry_id = FormGlut_Entry::create( array(
				'form_id'     => $form_id,
				'fields_data' => $fields_data,
				'status'      => $is_spam ? 'spam' : 'unread',
				'starred'     => 0,
				'ip_address'  => $keep_ip ? $ip : '',
				'browser'     => $keep_ip ? $this->get_user_browser() : '',
				'source_url'  => isset( $_SERVER['HTTP_REFERER'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) : '',
				'country'     => '',
			) );

			if ( ! $entry_id ) {
				wp_send_json_error( array( 'message' => $error_msg ) );
			}
		}

		// Send email notifications (never for spam).
		if ( ! $is_spam ) {
			$this->send_notification_email( $form, $fields_data, $entry_id, $keep_ip ? $ip : '' );
		}

		// Confirmation: message (with smart tags) and what the browser should do next.
		$message  = FormGlut_Form_Settings::replace_tags( '' !== $conf['message'] ? $conf['message'] : $success_msg, $form, $fields_data, $entry_id, false, $keep_ip ? $ip : '' );
		$redirect = '';
		if ( 'url' === $conf['type'] && '' !== $conf['redirect_url'] ) {
			$encoded  = array_map( static function ( $v ) {
				return rawurlencode( is_array( $v ) ? implode( ',', $v ) : (string) $v );
			}, $fields_data );
			$redirect = esc_url_raw( FormGlut_Form_Settings::replace_tags( $conf['redirect_url'], $form, $encoded, $entry_id ) );
		}

		wp_send_json_success( array(
			'message'      => $message,
			'entry_id'     => absint( $entry_id ),
			'confirmation' => array(
				'redirect_url' => $redirect,
				'after_submit' => $conf['after_submit'],
				'scroll'       => (bool) $conf['scroll'],
				'autoclose'    => (int) $conf['autoclose'],
			),
		) );
	}

	/**
	 * Send the admin notification (and optional auto-responder) for a form submission.
	 *
	 * Per-form notification settings win; empty values fall back to the global settings.
	 *
	 * @param object $form        Form object.
	 * @param array  $fields_data Sanitized field values.
	 * @param int    $entry_id    Entry ID (0 if not stored).
	 * @param string $ip          Visitor IP (empty when not stored).
	 */
	private function send_notification_email( $form, $fields_data, $entry_id, $ip = '' ) {
		$n = $form->settings['notifications'];
		$t = static function ( $text, $html = false ) use ( $form, $fields_data, $entry_id, $ip ) {
			return FormGlut_Form_Settings::replace_tags( $text, $form, $fields_data, $entry_id, $html, $ip );
		};

		$sender_name  = '' !== $n['from_name'] ? $t( $n['from_name'] ) : FormGlut_Settings::get( 'formglut_sender_name', __( 'FormGlut', 'formglut' ) );
		$sender_email = '' !== $n['from_email'] ? $n['from_email'] : FormGlut_Settings::get( 'formglut_sender_email', '' );

		$base_headers = array( 'Content-Type: text/html; charset=UTF-8' );
		if ( ! empty( $sender_email ) && is_email( $sender_email ) ) {
			$from           = ! empty( $sender_name ) ? "{$sender_name} <{$sender_email}>" : $sender_email;
			$base_headers[] = "From: {$from}";
		}

		$wrap_body = static function ( $body ) {
			return false === strpos( $body, '<' ) ? wpautop( $body ) : $body;
		};

		// ── Admin notification ────────────────────────────────────────────
		if ( $n['enabled'] ) {
			$resolve = function ( $list ) use ( $t ) {
				$out = array();
				foreach ( preg_split( '/[\s,;]+/', (string) $list ) as $addr ) {
					$addr = trim( $t( $addr ) );
					if ( '' !== $addr && is_email( $addr ) ) {
						$out[] = $addr;
					}
				}
				return $out;
			};

			$to = '' !== $n['to'] ? $resolve( $n['to'] ) : array();
			if ( empty( $to ) ) {
				$global = FormGlut_Settings::get( 'formglut_admin_email', '' );
				$to     = ! empty( $global ) && is_email( $global ) ? array( $global ) : array();
			}

			if ( ! empty( $to ) ) {
				$headers = $base_headers;

				if ( '' !== $n['reply_to'] ) {
					$reply = isset( $fields_data[ $n['reply_to'] ] ) ? (string) $fields_data[ $n['reply_to'] ] : $t( $n['reply_to'] );
					if ( is_email( $reply ) ) {
						$headers[] = 'Reply-To: ' . $reply;
					}
				}
				foreach ( $resolve( $n['cc'] ) as $addr ) {
					$headers[] = 'Cc: ' . $addr;
				}
				foreach ( $resolve( $n['bcc'] ) as $addr ) {
					$headers[] = 'Bcc: ' . $addr;
				}

				$subject_tpl = '' !== $n['subject'] ? $n['subject'] : FormGlut_Settings::get( 'formglut_email_subject', __( 'New form submission: {form_name}', 'formglut' ) );
				$subject     = wp_strip_all_tags( $t( $subject_tpl ) );

				if ( '' !== trim( $n['message'] ) ) {
					$body = $wrap_body( $t( $n['message'], true ) );
				} else {
					$body  = '<h2>' . esc_html( $subject ) . '</h2>';
					$body .= $t( '{all_fields}', true );
					$body .= '<p style="margin-top:16px;color:#94a3b8;font-size:12px;">' . esc_html__( 'Submitted on', 'formglut' ) . ' ' . esc_html( current_time( 'mysql' ) ) . '</p>';
				}

				wp_mail( $to, $subject, $body, $headers );
			}
		}

		// ── Auto-responder to the submitter ──────────────────────────────
		$ar = $n['autoresponder'];
		if ( $ar['enabled'] && '' !== $ar['email_field'] && ! empty( $fields_data[ $ar['email_field'] ] ) && is_email( (string) $fields_data[ $ar['email_field'] ] ) ) {
			$subject_tpl = '' !== $ar['subject'] ? $ar['subject'] : __( 'Thank you for contacting {site_name}', 'formglut' );
			$message_tpl = '' !== trim( $ar['message'] ) ? $ar['message'] : __( "Thank you! We have received your submission.\n\n{all_fields}", 'formglut' );
			wp_mail(
				(string) $fields_data[ $ar['email_field'] ],
				wp_strip_all_tags( $t( $subject_tpl ) ),
				$wrap_body( $t( $message_tpl, true ) ),
				$base_headers
			);
		}
	}

	/**
	 * Sanitize a submitted field value based on field type.
	 *
	 * @param mixed  $value  Raw submitted value.
	 * @param string $type   Field type.
	 * @param array  $config Field configuration.
	 * @return mixed Sanitized value.
	 */
	private function sanitize_field_value( $value, $type, $config = array() ) {
		switch ( $type ) {
			case 'email':
				return sanitize_email( $value );

			case 'password':
				// Never store or email the real password.
				return '********';

			case 'number':
				return is_numeric( $value ) ? $value : 0;

			case 'url':
				return esc_url_raw( $value );

			case 'textarea':
				return sanitize_textarea_field( $value );

			case 'phone':
				return preg_replace( '/[^0-9+\-\s\(\)]/', '', $value );

			case 'html':
				return wp_kses_post( $value );

			case 'select':
			case 'radio':
				return sanitize_text_field( $value );

			case 'checkbox':
			case 'multiselect':
				if ( is_array( $value ) ) {
					return array_map( 'sanitize_text_field', $value );
				}
				return sanitize_text_field( $value );

			case 'file':
				// File uploads handled separately; store reference only.
				return sanitize_text_field( $value );

			case 'date':
				return preg_replace( '/[^0-9\-:T]/', '', $value );

			case 'hidden':
				return sanitize_text_field( $value );

			default:
				return sanitize_text_field( $value );
		}
	}

	/**
	 * Verify every captcha that applies to this form.
	 *
	 * @param object $form      Form object.
	 * @param string $error_msg Generic error message.
	 * @return string Error message, or '' when all checks pass (or none apply).
	 */
	private function verify_captchas( $form, $error_msg ) {
		$checks = array();
		foreach ( FormGlut_Form::flatten_fields( is_array( $form->fields ) ? $form->fields : array() ) as $field ) {
			$type = isset( $field['type'] ) ? $field['type'] : '';
			if ( in_array( $type, array( 'recaptcha', 'hcaptcha', 'turnstile' ), true ) ) {
				$checks[ $type ] = ! empty( $field['validation_message'] ) ? $field['validation_message'] : $error_msg;
			}
		}
		if ( ! isset( $checks['recaptcha'] ) && FormGlut_Settings::get( 'formglut_recaptcha_enabled', false ) && 'v2' !== FormGlut_Settings::get( 'formglut_recaptcha_version', 'v3' ) ) {
			$checks['recaptcha'] = $error_msg;
		}

		$endpoints = array(
			'recaptcha' => array( 'https://www.google.com/recaptcha/api/siteverify', 'g-recaptcha-response' ),
			'hcaptcha'  => array( 'https://api.hcaptcha.com/siteverify', 'h-captcha-response' ),
			'turnstile' => array( 'https://challenges.cloudflare.com/turnstile/v0/siteverify', 'cf-turnstile-response' ),
		);

		foreach ( $checks as $provider => $message ) {
			$cfg = FormGlut_Settings::captcha( $provider );
			if ( ! $cfg['ready'] ) {
				continue; // Not configured: the widget is not rendered either.
			}
			$token = isset( $_POST[ $endpoints[ $provider ][1] ] ) ? sanitize_text_field( wp_unslash( $_POST[ $endpoints[ $provider ][1] ] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified in submit_form().
			if ( '' === $token ) {
				return $message;
			}
			$response = wp_remote_post( $endpoints[ $provider ][0], array(
				'body'    => array(
					'secret'   => $cfg['secret'],
					'response' => $token,
					'remoteip' => $this->get_client_ip(),
				),
				'timeout' => 10,
			) );
			if ( is_wp_error( $response ) ) {
				return $message;
			}
			$body = json_decode( wp_remote_retrieve_body( $response ), true );
			if ( empty( $body['success'] ) ) {
				return $message;
			}
			if ( 'recaptcha' === $provider && isset( $body['score'] ) && (float) $body['score'] < (float) FormGlut_Settings::get( 'formglut_recaptcha_score', 0.5 ) ) {
				return $message;
			}
		}
		return '';
	}

	/**
	 * Check the sub-inputs of a name, address or date range field.
	 *
	 * @param array  $field  Field config.
	 * @param string $type   Field type.
	 * @param array  $posted Sanitized sub-values keyed by part.
	 * @param string $label  Field label.
	 * @return string Error message, or ''.
	 */
	private function validate_multipart( $field, $type, $posted, $label ) {
		$custom = isset( $field['validation_message'] ) && '' !== $field['validation_message'] ? $field['validation_message'] : '';
		foreach ( FormGlut_Shortcode::multipart_parts( $field, $type ) as $key => $part ) {
			if ( $part[2] && $part[3] && ( ! isset( $posted[ $key ] ) || '' === $posted[ $key ] ) ) {
				/* translators: 1: field label, 2: sub-field label */
				return $custom ? $custom : sprintf( __( '%1$s: %2$s is required.', 'formglut' ), $label, $part[0] ? $part[0] : $key );
			}
		}

		if ( 'date_range' === $type ) {
			foreach ( array( 'start', 'end' ) as $key ) {
				if ( ! empty( $posted[ $key ] ) ) {
					$error = $this->validate_field_value( $field, 'date', $posted[ $key ], $label, '' );
					if ( '' !== $error ) {
						return $error;
					}
				}
			}
			if ( ! empty( $posted['start'] ) && ! empty( $posted['end'] ) && $posted['end'] < $posted['start'] ) {
				/* translators: %s: field label */
				return sprintf( __( '%s: the end date must be after the start date.', 'formglut' ), $label );
			}
		}

		if ( 'address' === $type && ! empty( $posted['country'] ) ) {
			$countries = include FORMGLUT_PLUGIN_DIR . 'includes/data/countries.php';
			if ( ! isset( $countries[ $posted['country'] ] ) ) {
				/* translators: %s: field label */
				return sprintf( __( 'Please choose a valid country for %s.', 'formglut' ), $label );
			}
		}
		return '';
	}

	/**
	 * Join the sub-values of a multi-part field into one stored string.
	 *
	 * @param array  $field  Field config.
	 * @param string $type   Field type.
	 * @param array  $posted Sanitized sub-values keyed by part.
	 * @return string
	 */
	private function collapse_multipart( $field, $type, $posted ) {
		$values = array();
		foreach ( array_keys( FormGlut_Shortcode::multipart_parts( $field, $type ) ) as $key ) {
			if ( isset( $posted[ $key ] ) && '' !== $posted[ $key ] ) {
				$values[] = $posted[ $key ];
			}
		}
		$glue = array( 'name' => ' ', 'address' => ', ', 'date_range' => isset( $field['range_separator'] ) && '' !== $field['range_separator'] ? $field['range_separator'] : ' - ' );
		return implode( $glue[ $type ], $values );
	}

	/**
	 * Validate a submitted value against its field settings.
	 *
	 * @param array  $field      Field config.
	 * @param string $type       Field type.
	 * @param mixed  $value      Submitted (unslashed) value, non-empty.
	 * @param string $label      Field label for messages.
	 * @param string $field_name Posted field name.
	 * @return string Error message, or '' when valid.
	 */
	private function validate_field_value( $field, $type, $value, $label, $field_name ) {
		$custom = isset( $field['validation_message'] ) && '' !== $field['validation_message'] ? $field['validation_message'] : '';

		if ( is_array( $value ) && ! in_array( $type, array( 'checkbox', 'multiselect' ), true ) ) {
			return $custom ? $custom : sprintf( /* translators: %s: field label */ __( '%s is invalid.', 'formglut' ), $label );
		}

		switch ( $type ) {
			case 'text':
			case 'textarea':
				$max = ! empty( $field['max_length'] ) ? absint( $field['max_length'] ) : ( ! empty( $field['character_limit'] ) ? absint( $field['character_limit'] ) : 0 );
				$min = 'textarea' === $type && ! empty( $field['min_length'] ) ? absint( $field['min_length'] ) : 0;
				if ( $max && mb_strlen( $value ) > $max ) {
					/* translators: 1: field label, 2: max length */
					return sprintf( __( '%1$s must not exceed %2$d characters.', 'formglut' ), $label, $max );
				}
				if ( $min && mb_strlen( $value ) < $min ) {
					/* translators: 1: field label, 2: min length */
					return sprintf( __( '%1$s must be at least %2$d characters.', 'formglut' ), $label, $min );
				}
				break;

			case 'email':
				if ( ! empty( $field['confirm_email'] ) ) {
					$confirm = isset( $_POST[ $field_name . '_confirm' ] ) ? sanitize_text_field( wp_unslash( $_POST[ $field_name . '_confirm' ] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified in submit_form().
					if ( $confirm !== $value ) {
						return isset( $field['confirm_error_message'] ) && '' !== $field['confirm_error_message'] ? $field['confirm_error_message'] : __( 'Email addresses do not match.', 'formglut' );
					}
				}
				break;

			case 'number':
				if ( ! is_numeric( $value ) ) {
					return $custom ? $custom : sprintf( /* translators: %s: field label */ __( '%s must be a number.', 'formglut' ), $label );
				}
				$min = isset( $field['min_value'] ) && '' !== $field['min_value'] ? $field['min_value'] : ( isset( $field['min'] ) ? $field['min'] : '' );
				$max = isset( $field['max_value'] ) && '' !== $field['max_value'] ? $field['max_value'] : ( isset( $field['max'] ) ? $field['max'] : '' );
				if ( is_numeric( $min ) && (float) $value < (float) $min ) {
					/* translators: 1: field label, 2: minimum value */
					return sprintf( __( '%1$s must be at least %2$s.', 'formglut' ), $label, $min );
				}
				if ( is_numeric( $max ) && (float) $value > (float) $max ) {
					/* translators: 1: field label, 2: maximum value */
					return sprintf( __( '%1$s must not exceed %2$s.', 'formglut' ), $label, $max );
				}
				break;

			case 'url':
				if ( ! isset( $field['validate_url'] ) || ! empty( $field['validate_url'] ) ) {
					$relative = ! empty( $field['allow_relative'] ) && 0 === strpos( $value, '/' );
					if ( ! $relative && ! filter_var( $value, FILTER_VALIDATE_URL ) ) {
						return $custom ? $custom : sprintf( /* translators: %s: field label */ __( 'Please enter a valid URL for %s.', 'formglut' ), $label );
					}
					$scheme = isset( $field['url_scheme'] ) ? $field['url_scheme'] : 'any';
					if ( ! $relative && in_array( $scheme, array( 'http', 'https' ), true ) && strtolower( (string) wp_parse_url( $value, PHP_URL_SCHEME ) ) !== $scheme ) {
						/* translators: 1: field label, 2: URL scheme */
						return sprintf( __( '%1$s must start with %2$s://', 'formglut' ), $label, $scheme );
					}
				}
				break;

			case 'phone':
				if ( ! isset( $field['validate_phone'] ) || ! empty( $field['validate_phone'] ) ) {
					$digits = strlen( preg_replace( '/\D/', '', $value ) );
					if ( $digits < 7 || $digits > 15 || preg_match( '/[^0-9+\-\s().]/', $value ) ) {
						return $custom ? $custom : sprintf( /* translators: %s: field label */ __( 'Please enter a valid phone number for %s.', 'formglut' ), $label );
					}
				}
				break;

			case 'password':
				$min = ! empty( $field['min_length'] ) ? absint( $field['min_length'] ) : 0;
				$max = ! empty( $field['max_length'] ) ? absint( $field['max_length'] ) : 0;
				$bad = ( $min && mb_strlen( $value ) < $min ) || ( $max && mb_strlen( $value ) > $max )
					|| ( ! empty( $field['require_uppercase'] ) && ! preg_match( '/[A-Z]/', $value ) )
					|| ( ! empty( $field['require_lowercase'] ) && ! preg_match( '/[a-z]/', $value ) )
					|| ( ! empty( $field['require_number'] ) && ! preg_match( '/\d/', $value ) )
					|| ( ! empty( $field['require_special'] ) && ! preg_match( '/[^A-Za-z0-9]/', $value ) );
				if ( $bad ) {
					return $custom ? $custom : sprintf( /* translators: %s: field label */ __( '%s does not meet the requirements.', 'formglut' ), $label );
				}
				if ( ! empty( $field['require_confirmation'] ) ) {
					$confirm = isset( $_POST[ $field_name . '_confirm' ] ) ? wp_unslash( $_POST[ $field_name . '_confirm' ] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- compared only.
					if ( $confirm !== $value ) {
						return ! empty( $field['confirmation_error'] ) ? $field['confirmation_error'] : __( 'Passwords do not match', 'formglut' );
					}
				}
				break;

			case 'range_slider':
				$min = isset( $field['min'] ) && is_numeric( $field['min'] ) ? (float) $field['min'] : 0;
				$max = isset( $field['max'] ) && is_numeric( $field['max'] ) ? (float) $field['max'] : 100;
				if ( ! is_numeric( $value ) || (float) $value < $min || (float) $value > $max ) {
					return $custom ? $custom : sprintf( /* translators: %s: field label */ __( 'Please choose a valid value for %s.', 'formglut' ), $label );
				}
				break;

			case 'color_picker':
				$color = sanitize_hex_color( $value );
				if ( ! $color ) {
					return $custom ? $custom : sprintf( /* translators: %s: field label */ __( 'Please choose a valid color for %s.', 'formglut' ), $label );
				}
				$picker = isset( $field['picker_type'] ) ? $field['picker_type'] : 'swatches';
				if ( 'swatches' === $picker && isset( $field['allow_custom'] ) && ! $field['allow_custom'] ) {
					$allowed = array_map( 'strtolower', array_filter( array_map( 'sanitize_hex_color', isset( $field['swatches'] ) ? (array) $field['swatches'] : array() ) ) );
					if ( ! in_array( strtolower( $color ), $allowed, true ) ) {
						return $custom ? $custom : sprintf( /* translators: %s: field label */ __( 'Please choose one of the offered colors for %s.', 'formglut' ), $label );
					}
				}
				break;

			case 'currency':
			case 'percentage':
			case 'spinner':
				if ( ! is_numeric( $value ) ) {
					return $custom ? $custom : sprintf( /* translators: %s: field label */ __( '%s must be a number.', 'formglut' ), $label );
				}
				$min = 'spinner' === $type ? ( isset( $field['min'] ) ? $field['min'] : '' ) : ( isset( $field['min_value'] ) ? $field['min_value'] : '' );
				$max = 'spinner' === $type ? ( isset( $field['max'] ) ? $field['max'] : '' ) : ( isset( $field['max_value'] ) ? $field['max_value'] : '' );
				if ( is_numeric( $min ) && (float) $value < (float) $min ) {
					/* translators: 1: field label, 2: minimum value */
					return sprintf( __( '%1$s must be at least %2$s.', 'formglut' ), $label, $min );
				}
				if ( is_numeric( $max ) && (float) $value > (float) $max ) {
					/* translators: 1: field label, 2: maximum value */
					return sprintf( __( '%1$s must not exceed %2$s.', 'formglut' ), $label, $max );
				}
				break;

			case 'time':
				if ( ! preg_match( '/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/', $value ) ) {
					return $custom ? $custom : sprintf( /* translators: %s: field label */ __( 'Please enter a valid time for %s.', 'formglut' ), $label );
				}
				$hm = substr( $value, 0, 5 );
				if ( ! empty( $field['min_time'] ) && $hm < $field['min_time'] ) {
					/* translators: 1: field label, 2: time */
					return sprintf( __( '%1$s must be at or after %2$s.', 'formglut' ), $label, $field['min_time'] );
				}
				if ( ! empty( $field['max_time'] ) && $hm > $field['max_time'] ) {
					/* translators: 1: field label, 2: time */
					return sprintf( __( '%1$s must be at or before %2$s.', 'formglut' ), $label, $field['max_time'] );
				}
				break;

			case 'country_select':
				$countries = include FORMGLUT_PLUGIN_DIR . 'includes/data/countries.php';
				$mode      = isset( $field['country_list'] ) ? $field['country_list'] : 'all';
				$ok        = isset( $countries[ $value ] )
					&& ! ( 'include' === $mode && ! empty( $field['included_countries'] ) && ! in_array( $value, (array) $field['included_countries'], true ) )
					&& ! ( 'exclude' === $mode && in_array( $value, (array) ( isset( $field['excluded_countries'] ) ? $field['excluded_countries'] : array() ), true ) );
				if ( ! $ok ) {
					return $custom ? $custom : sprintf( /* translators: %s: field label */ __( 'Please choose a valid country for %s.', 'formglut' ), $label );
				}
				break;

			case 'masked_input':
				$mask = isset( $field['custom_mask'] ) ? (string) $field['custom_mask'] : '';
				if ( $mask && ( ! isset( $field['validate_mask'] ) || ! empty( $field['validate_mask'] ) ) ) {
					$regex = '';
					foreach ( preg_split( '//u', $mask, -1, PREG_SPLIT_NO_EMPTY ) as $ch ) {
						$regex .= '9' === $ch ? '\d' : ( 'a' === $ch ? '[A-Za-z]' : ( '*' === $ch ? '[A-Za-z0-9]' : preg_quote( $ch, '/' ) ) );
					}
					if ( ! preg_match( '/^' . $regex . '$/u', $value ) ) {
						return $custom ? $custom : sprintf( /* translators: 1: field label, 2: mask */ __( '%1$s must match the format %2$s.', 'formglut' ), $label, $mask );
					}
				}
				break;

			case 'date':
				$format = isset( $field['date_type'] ) && 'datetime' === $field['date_type'] ? 'Y-m-d\TH:i' : 'Y-m-d';
				$date   = DateTime::createFromFormat( $format, $value );
				if ( ! $date || $date->format( $format ) !== $value ) {
					return $custom ? $custom : sprintf( /* translators: %s: field label */ __( 'Please enter a valid date for %s.', 'formglut' ), $label );
				}
				$day = substr( $value, 0, 10 );
				if ( ! empty( $field['min_date'] ) && $day < $field['min_date'] ) {
					/* translators: 1: field label, 2: date */
					return sprintf( __( '%1$s must be on or after %2$s.', 'formglut' ), $label, $field['min_date'] );
				}
				if ( ! empty( $field['max_date'] ) && $day > $field['max_date'] ) {
					/* translators: 1: field label, 2: date */
					return sprintf( __( '%1$s must be on or before %2$s.', 'formglut' ), $label, $field['max_date'] );
				}
				break;

			case 'select':
			case 'radio':
			case 'checkbox':
			case 'multiselect':
				$allowed = array();
				foreach ( ( isset( $field['options'] ) && is_array( $field['options'] ) ? $field['options'] : array() ) as $opt ) {
					if ( empty( $opt['disabled'] ) ) {
						$allowed[] = isset( $opt['value'] ) && '' !== $opt['value'] ? (string) $opt['value'] : ( isset( $opt['label'] ) ? (string) $opt['label'] : '' );
					}
				}
				$values = (array) $value;
				foreach ( $values as $v ) {
					if ( ! in_array( (string) $v, $allowed, true ) ) {
						return $custom ? $custom : sprintf( /* translators: %s: field label */ __( 'Please choose a valid option for %s.', 'formglut' ), $label );
					}
				}
				if ( in_array( $type, array( 'checkbox', 'multiselect' ), true ) ) {
					$min = isset( $field['min_selections'] ) ? absint( $field['min_selections'] ) : 0;
					$max = isset( $field['max_selections'] ) ? absint( $field['max_selections'] ) : 0;
					if ( $min && count( $values ) < $min ) {
						/* translators: 1: field label, 2: minimum */
						return sprintf( __( 'Please select at least %2$d options for %1$s.', 'formglut' ), $label, $min );
					}
					if ( $max && count( $values ) > $max ) {
						/* translators: 1: field label, 2: maximum */
						return sprintf( __( 'Please select no more than %2$d options for %1$s.', 'formglut' ), $label, $max );
					}
				}
				break;
		}

		return '';
	}

	/**
	 * Get the client IP address safely.
	 *
	 * @return string
	 */
	private function get_client_ip() {
		$ip_headers = array(
			'HTTP_CF_CONNECTING_IP', // Cloudflare.
			'HTTP_X_FORWARDED_FOR',
			'HTTP_X_REAL_IP',
			'REMOTE_ADDR',
		);

		foreach ( $ip_headers as $header ) {
			if ( ! empty( $_SERVER[ $header ] ) ) {
				$ip = explode( ',', sanitize_text_field( wp_unslash( $_SERVER[ $header ] ) ) );
				$ip = trim( $ip[0] );
				if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
					return $ip;
				}
			}
		}

		return '';
	}

	/**
	 * Get a simplified user agent / browser string.
	 *
	 * @return string
	 */
	private function get_user_browser() {
		if ( empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
			return '';
		}

		$ua = sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) );

		// Keep it under 255 chars (DB column limit).
		return substr( $ua, 0, 255 );
	}

		/**
		 * Parse a raw User-Agent string into a readable format.
		 *
		 * @param string $ua Raw User-Agent string.
		 * @return string Parsed string e.g. 'Chrome 145 / Linux'.
		 */
		private function parse_user_agent( $ua ) {
			if ( empty( $ua ) ) {
				return '';
			}

			$browser = '';
			$os      = '';

			// Detect browser.
			if ( preg_match( '/Edg\/([\d.]+)/', $ua, $m ) ) {
				$browser = 'Edge ' . intval( $m[1] );
			} elseif ( preg_match( '/OPR\/([\d.]+)/', $ua, $m ) ) {
				$browser = 'Opera ' . intval( $m[1] );
			} elseif ( preg_match( '/Firefox\/([\d.]+)/', $ua, $m ) ) {
				$browser = 'Firefox ' . intval( $m[1] );
			} elseif ( preg_match( '/Chrome\/([\d.]+)/', $ua, $m ) ) {
				$browser = 'Chrome ' . intval( $m[1] );
			} elseif ( preg_match( '/Safari\/([\d.]+)/', $ua, $m ) && ! preg_match( '/Chrome/', $ua ) ) {
				$browser = 'Safari ' . intval( $m[1] );
			}

			// Detect OS.
			if ( preg_match( '/Windows NT ([\d.]+)/', $ua, $m ) ) {
				$win = array( '10.0' => '10/11', '6.3' => '8.1', '6.2' => '8', '6.1' => '7' );
				$os = 'Windows ' . ( $win[ $m[1] ] ?? intval( $m[1] ) );
			} elseif ( preg_match( '/Mac OS X ([\d_]+)/', $ua, $m ) ) {
				$os = 'macOS ' . str_replace( '_', '.', $m[1] );
			} elseif ( preg_match( '/Linux/', $ua ) ) {
				if ( preg_match( '/Android ([\d.]+)/', $ua, $m ) ) {
					$os = 'Android ' . intval( $m[1] );
				} else {
					$os = 'Linux';
				}
			} elseif ( preg_match( '/iPhone OS ([\d_]+)/', $ua, $m ) ) {
				$os = 'iOS ' . str_replace( '_', '.', $m[1] );
			} elseif ( preg_match( '/iPad.*OS ([\d_]+)/', $ua, $m ) ) {
				$os = 'iPadOS ' . str_replace( '_', '.', $m[1] );
			}

			$parts = array_filter( array( $browser, $os ) );
			return $parts ? implode( ' / ', $parts ) : substr( $ua, 0, 80 );
		}
	}
