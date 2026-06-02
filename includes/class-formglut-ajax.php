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
		$allowed_types = array(
			'text', 'email', 'textarea', 'number', 'select',
			'radio', 'checkbox', 'date', 'file', 'hidden',
			'url', 'phone', 'name', 'address', 'html', 'heading', 'divider',
		);

		$clean = array();

		foreach ( $fields as $field ) {
			if ( ! is_array( $field ) ) {
				continue;
			}

			$type = isset( $field['type'] ) ? sanitize_key( $field['type'] ) : 'text';
			if ( ! in_array( $type, $allowed_types, true ) ) {
				continue;
			}

			$clean_field = array(
				'id'       => isset( $field['id'] ) ? sanitize_text_field( $field['id'] ) : uniqid( 'field_' ),
				'type'     => $type,
				'label'    => isset( $field['label'] ) ? sanitize_text_field( $field['label'] ) : '',
				'required' => ! empty( $field['required'] ),
			);

			$optional_string_keys = array( 'placeholder', 'validation_message', 'css_class', 'default_value', 'help_text', 'html_content', 'tag', 'style', 'allowed_types', 'resize' );
			foreach ( $optional_string_keys as $key ) {
				if ( isset( $field[ $key ] ) ) {
					$clean_field[ $key ] = sanitize_text_field( $field[ $key ] );
				}
			}

			if ( isset( $field['options'] ) && is_array( $field['options'] ) ) {
				$clean_field['options'] = array();
				foreach ( $field['options'] as $option ) {
					if ( is_array( $option ) ) {
						$clean_field['options'][] = array(
							'label' => isset( $option['label'] ) ? sanitize_text_field( $option['label'] ) : '',
							'value' => isset( $option['value'] ) ? sanitize_text_field( $option['value'] ) : '',
						);
					}
				}
			}

			$optional_int_keys = array( 'rows', 'cols', 'maxlength', 'character_limit', 'min_length', 'max_length', 'min', 'max', 'step', 'min_selection', 'max_selection', 'max_size' );
			foreach ( $optional_int_keys as $key ) {
				if ( isset( $field[ $key ] ) ) {
					$clean_field[ $key ] = absint( $field[ $key ] );
				}
			}

			if ( isset( $field['hidden'] ) ) {
				$clean_field['hidden'] = ! empty( $field['hidden'] );
			}

			// Preserve any extra keys not explicitly handled (pass-through sanitized).
			foreach ( $field as $key => $value ) {
				if ( ! isset( $clean_field[ $key ] ) && is_string( $value ) ) {
					$clean_field[ $key ] = sanitize_text_field( $value );
				}
			}

			$clean[] = $clean_field;
		}

		return $clean;
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

		$offset = max( 0, ( $page - 1 ) * $per_page );

		$result = FormGlut_Form::get_all( array(
			'search'   => $search,
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

		$status = isset( $_POST['status'] ) ? sanitize_text_field( wp_unslash( $_POST['status'] ) ) : 'draft'; // phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( ! in_array( $status, array( 'active', 'draft', 'closed', 'published' ), true ) ) {
			$status = 'draft';
		}

		$form_id = FormGlut_Form::create( array(
			'title'      => $title,
			'fields'     => $fields,
			'submit_btn' => $submit_btn,
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

		// Check honeypot — only if enabled in settings.
		$honeypot_enabled = FormGlut_Settings::get( 'formglut_honeypot', true );
		if ( $honeypot_enabled && ! empty( $_POST['formglut_hp'] ) ) {
			wp_send_json_success( array( 'message' => $success_msg ) );
			return;
		}

		// reCAPTCHA v3 verification — only if enabled and configured.
		$recaptcha_enabled = FormGlut_Settings::get( 'formglut_recaptcha_enabled', false );
		if ( $recaptcha_enabled ) {
			$recaptcha_secret = FormGlut_Settings::get( 'formglut_recaptcha_secret_key', '' );
			$recaptcha_token  = isset( $_POST['g-recaptcha-response'] ) ? sanitize_text_field( wp_unslash( $_POST['g-recaptcha-response'] ) ) : '';

			if ( $recaptcha_secret && $recaptcha_token ) {
				$verify = wp_remote_post( 'https://www.google.com/recaptcha/api/siteverify', array(
					'body' => array(
						'secret'   => $recaptcha_secret,
						'response' => $recaptcha_token,
						'remoteip' => $this->get_client_ip(),
					),
					'timeout' => 10,
				) );

				if ( ! is_wp_error( $verify ) ) {
					$body = json_decode( wp_remote_retrieve_body( $verify ), true );
					if ( empty( $body['success'] ) || ( isset( $body['score'] ) && $body['score'] < 0.5 ) ) {
						wp_send_json_error( array( 'message' => $error_msg ) );
						return;
					}
				}
			}
		}

		// Validate and sanitize submitted fields against form definition.
		$fields_data = array();
		$errors      = array();

		if ( is_array( $form->fields ) ) {
			foreach ( $form->fields as $field ) {
				$field_id   = isset( $field['id'] ) ? $field['id'] : '';
				$field_type = isset( $field['type'] ) ? $field['type'] : 'text';
				$field_label = isset( $field['label'] ) ? $field['label'] : $field_id;
				$required   = ! empty( $field['required'] );
				$value      = isset( $_POST[ $field_id ] ) ? wp_unslash( $_POST[ $field_id ] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- sanitized in sanitize_field_value() below.

				// Required check.
				if ( $required && '' === $value ) {
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

				// Max length validation.
				if ( ! empty( $field['maxlength'] ) && mb_strlen( $value ) > absint( $field['maxlength'] ) ) {
					$errors[ $field_id ] = sprintf(
						/* translators: 1: field label, 2: max length */
						__( '%1$s must not exceed %2$d characters.', 'formglut' ),
						$field_label,
						absint( $field['maxlength'] )
					);
					continue;
				}

				// Number range validation.
				if ( 'number' === $field_type && is_numeric( $value ) ) {
					if ( '' !== $field['min'] && $value < $field['min'] ) {
						$errors[ $field_id ] = sprintf(
							/* translators: 1: field label, 2: minimum value */
							__( '%1$s must be at least %2$s.', 'formglut' ),
							$field_label,
							$field['min']
						);
						continue;
					}
					if ( '' !== $field['max'] && $value > $field['max'] ) {
						$errors[ $field_id ] = sprintf(
							/* translators: 1: field label, 2: maximum value */
							__( '%1$s must not exceed %2$s.', 'formglut' ),
							$field_label,
							$field['max']
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

		// Store entry — only if setting enabled.
		$entry_id = 0;
		$store_entries = FormGlut_Settings::get( 'formglut_store_entries', true );
		if ( $store_entries ) {
			$entry_id = FormGlut_Entry::create( array(
				'form_id'     => $form_id,
				'fields_data' => $fields_data,
				'status'      => 'unread',
				'starred'     => 0,
				'ip_address'  => $this->get_client_ip(),
				'browser'     => $this->get_user_browser(),
				'source_url'  => isset( $_SERVER['HTTP_REFERER'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) : '',
				'country'     => '',
			) );

			if ( ! $entry_id ) {
				wp_send_json_error( array( 'message' => $error_msg ) );
			}
		}

		// Send email notification.
		$this->send_notification_email( $form, $fields_data, $entry_id );

		wp_send_json_success( array(
			'message'  => $success_msg,
			'entry_id' => absint( $entry_id ),
		) );
	}

	/**
	 * Send notification email for a form submission.
	 *
	 * @param object $form        Form object.
	 * @param array  $fields_data Sanitized field values.
	 * @param int    $entry_id    Entry ID (0 if not stored).
	 */
	private function send_notification_email( $form, $fields_data, $entry_id ) {
		$admin_email = FormGlut_Settings::get( 'formglut_admin_email', '' );
		if ( empty( $admin_email ) || ! is_email( $admin_email ) ) {
			return;
		}

		$sender_name  = FormGlut_Settings::get( 'formglut_sender_name', __( 'FormGlut', 'formglut' ) );
		$sender_email = FormGlut_Settings::get( 'formglut_sender_email', '' );
		$subject_tpl  = FormGlut_Settings::get( 'formglut_email_subject', __( 'New form submission: {form_name}', 'formglut' ) );

		// Build email headers.
		$headers = array( 'Content-Type: text/html; charset=UTF-8' );
		if ( ! empty( $sender_email ) && is_email( $sender_email ) ) {
			$from = ! empty( $sender_name ) ? "{$sender_name} <{$sender_email}>" : $sender_email;
			$headers[] = "From: {$from}";
		}

		// Build subject with template variables.
		$subject = str_replace(
			array( '{form_name}', '{form_id}', '{entry_id}' ),
			array( $form->title, $form->id, $entry_id ),
			$subject_tpl
		);

		// Build email body as HTML table.
		$body_lines = array(
			'<h2>' . esc_html( $subject ) . '</h2>',
			'<table style="width:100%;border-collapse:collapse;font-family:sans-serif;">',
		);

		if ( is_array( $form->fields ) ) {
			foreach ( $form->fields as $field ) {
				$field_id    = isset( $field['id'] ) ? $field['id'] : '';
				$field_label = isset( $field['label'] ) ? $field['label'] : $field_id;
				$value       = isset( $fields_data[ $field_id ] ) ? $fields_data[ $field_id ] : '';

				if ( is_array( $value ) ) {
					$value = implode( ', ', $value );
				}

				$body_lines[] = '<tr>';
				$body_lines[] = '<td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;color:#334155;width:180px;">' . esc_html( $field_label ) . '</td>';
				$body_lines[] = '<td style="padding:8px 12px;border:1px solid #e2e8f0;color:#475569;">' . esc_html( $value ) . '</td>';
				$body_lines[] = '</tr>';
			}
		}

		$body_lines[] = '</table>';
		$body_lines[] = '<p style="margin-top:16px;color:#94a3b8;font-size:12px;">' . esc_html__( 'Submitted on', 'formglut' ) . ' ' . esc_html( current_time( 'mysql' ) ) . '</p>';

		wp_mail( $admin_email, $subject, implode( "\n", $body_lines ), $headers );
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
				if ( is_array( $value ) ) {
					return array_map( 'sanitize_text_field', $value );
				}
				return sanitize_text_field( $value );

			case 'file':
				// File uploads handled separately; store reference only.
				return sanitize_text_field( $value );

			case 'date':
				return preg_replace( '/[^0-9\-]/', '', $value );

			case 'hidden':
				return sanitize_text_field( $value );

			default:
				return sanitize_text_field( $value );
		}
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
