<?php
/**
 * FormGlut Shortcode.
 *
 * Registers the [formglut] shortcode and renders forms on the frontend.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Shortcode class.
 */
class FormGlut_Shortcode {

	/**
	 * Single instance.
	 *
	 * @var FormGlut_Shortcode|null
	 */
	private static $instance = null;

	/**
	 * Track whether frontend assets have been enqueued (avoid duplicates).
	 *
	 * @var bool
	 */
	private static $assets_enqueued = false;

	/**
	 * Get singleton instance.
	 *
	 * @return FormGlut_Shortcode
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor — register shortcode.
	 */
	/**
	 * ID of the form being rendered (passed to action hook fields).
	 *
	 * @var int
	 */
	private $current_form_id = 0;

	private function __construct() {
		add_shortcode( 'formglut', array( $this, 'render' ) );
		// Register module type filter for frontend script.
		add_filter( 'script_loader_tag', array( $this, 'add_module_type' ), 10, 3 );
	}

	/**
	 * Render the shortcode.
	 *
	 * @param array $atts Shortcode attributes.
	 * @return string HTML output.
	 */
	public function render( $atts ) {
		$atts = shortcode_atts( array(
			'id' => 0,
		), $atts, 'formglut' );

		$form_id = absint( $atts['id'] );

		if ( ! $form_id ) {
			return '';
		}

		$form = FormGlut_Form::get( $form_id );

		if ( ! $form || ! in_array( $form->status, array( 'active', 'published' ), true ) ) {
			return '';
		}

		// Increment view count (can be turned off per form).
		if ( ! empty( $form->settings['entries']['count_views'] ) ) {
			FormGlut_Form::increment_views( $form_id );
		}

		// Enqueue frontend assets (once per page load).
		$this->enqueue_frontend_assets();

		// Build form HTML.
		return $this->build_form_html( $form );
	}

	/**
	 * Render a form for the admin preview: ignores status and does not count a view.
	 *
	 * @param object $form Form object.
	 * @return string HTML output.
	 */
	public function render_preview( $form ) {
		$this->enqueue_frontend_assets();
		return $this->build_form_html( $form, false );
	}

	/**
	 * Enqueue frontend CSS and JS.
	 *
	 * @return void
	 */
	private function enqueue_frontend_assets() {
		if ( self::$assets_enqueued ) {
			return;
		}

		self::$assets_enqueued = true;

		$build_url  = FORMGLUT_PLUGIN_URL . 'resources';
		$build_path = FORMGLUT_PLUGIN_DIR . 'resources';

		// Enqueue React and ReactDOM (WordPress includes these).
		wp_enqueue_script( 'wp-i18n' );

		// Enqueue frontend JS.
		if ( file_exists( $build_path . '/form-frontend.js' ) ) {
			wp_enqueue_script(
				'formglut-frontend',
				$build_url . '/form-frontend.js',
				array( 'wp-i18n', 'wp-i18n' ),
				FORMGLUT_VERSION,
				true
			);
			wp_set_script_translations( 'formglut-frontend', 'formglut', FORMGLUT_PLUGIN_DIR . 'languages' );
		}

		// Enqueue frontend CSS.
		if ( file_exists( $build_path . '/assets/form-frontend.css' ) ) {
			wp_enqueue_style(
				'formglut-frontend',
				$build_url . '/assets/form-frontend.css',
				array(),
				FORMGLUT_VERSION
			);
		}

		// Localize AJAX data for frontend submission.
		wp_localize_script( 'formglut-frontend', 'formglutFrontend', array(
			'ajax_url'           => admin_url( 'admin-ajax.php' ),
			'nonce'              => wp_create_nonce( 'formglut_submit_nonce' ),
			'recaptcha_enabled'  => (bool) FormGlut_Settings::get( 'formglut_recaptcha_enabled', false ),
			'recaptcha_site_key' => FormGlut_Settings::get( 'formglut_recaptcha_site_key', '' ),
			'recaptcha_version'  => FormGlut_Settings::get( 'formglut_recaptcha_version', 'v3' ),
		) );

		// Enqueue reCAPTCHA v3 script if enabled and configured.
		$recaptcha_enabled  = FormGlut_Settings::get( 'formglut_recaptcha_enabled', false );
		$recaptcha_site_key = FormGlut_Settings::get( 'formglut_recaptcha_site_key', '' );
		if ( $recaptcha_enabled && ! empty( $recaptcha_site_key ) && 'v2' !== FormGlut_Settings::get( 'formglut_recaptcha_version', 'v3' ) ) {
			wp_enqueue_script(
				'formglut-recaptcha',
				'https://www.google.com/recaptcha/api.js?render=' . esc_attr( $recaptcha_site_key ),
				array(),
				FORMGLUT_VERSION,
				true
			);
		}
	}

	/**
	 * Build the complete form HTML.
	 *
	 * @param object $form    Form object with decoded fields.
	 * @param bool   $enforce Apply restrictions (login, schedule, entry limit). False in the admin preview.
	 * @return string HTML output (escaped).
	 */
	private function build_form_html( $form, $enforce = true ) {
		$form_id  = absint( $form->id );
		$fs       = $form->settings;

		// Restrictions: show the reason instead of the form.
		if ( $enforce ) {
			$availability = FormGlut_Form_Settings::availability( $form );
			if ( ! $availability['open'] ) {
				return '<div class="formglut-form-wrapper" id="formglut-form-' . esc_attr( $form_id ) . '"><div class="formglut-form-message formglut-error" style="display:block;">' . esc_html( $availability['message'] ) . '</div></div>';
			}
		}

		// Wrapper class, width and alignment.
		$wrapper_class = 'formglut-form-wrapper' . ( '' !== $fs['general']['form_class'] ? ' ' . $fs['general']['form_class'] : '' );
		$wrapper_style = '';
		if ( '' !== $fs['style']['form_width'] ) {
			$wrapper_style .= 'max-width:' . $fs['style']['form_width'] . ';';
		}
		if ( 'center' === $fs['style']['form_align'] ) {
			$wrapper_style .= 'margin-left:auto;margin-right:auto;';
		} elseif ( 'right' === $fs['style']['form_align'] ) {
			$wrapper_style .= 'margin-left:auto;margin-right:0;';
		} elseif ( '' !== $fs['style']['form_width'] ) {
			$wrapper_style .= 'margin-left:0;margin-right:auto;';
		}
		$custom_css = '' !== $fs['style']['custom_css'] ? str_replace( '{form}', '#formglut-form-' . $form_id, $fs['style']['custom_css'] ) : '';
		$processing = $fs['general']['submit_processing'];

		$this->current_form_id = $form_id;
		$has_custom_submit     = false;
		foreach ( FormGlut_Form::flatten_fields( is_array( $form->fields ) ? $form->fields : array() ) as $f ) {
			if ( isset( $f['type'] ) && 'custom_submit_button' === $f['type'] && empty( $f['hidden'] ) ) {
				$has_custom_submit = true;
			}
		}
		$title    = esc_html( $form->title );
		$fields   = is_array( $form->fields ) ? $form->fields : array();
		$btn      = is_array( $form->submit_btn ) ? $form->submit_btn : array();
		$btn_text = isset( $btn['text'] ) ? esc_html( $btn['text'] ) : __( 'Submit', 'formglut' );
		$btn_text = $btn_text ? $btn_text : __( 'Submit', 'formglut' );

		// Submit button styles.
		$btn_styles = $this->build_button_styles( $btn );

		ob_start();
		?>
		<div class="<?php echo esc_attr( $wrapper_class ); ?>" id="formglut-form-<?php echo esc_attr( $form_id ); ?>"<?php echo '' !== $wrapper_style ? ' style="' . esc_attr( $wrapper_style ) . '"' : ''; ?>>
			<?php if ( '' !== $custom_css ) : ?>
				<style><?php echo wp_strip_all_tags( $custom_css ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- tags stripped and sanitized when saved. ?></style>
			<?php endif; ?>
			<form class="formglut-form" data-form-id="<?php echo esc_attr( $form_id ); ?>" data-step-progress="<?php echo esc_attr( $fs['multistep']['progress'] ); ?>" data-first-step="<?php echo esc_attr( $fs['multistep']['first_title'] ); ?>" data-step-validate="<?php echo $fs['multistep']['validate_step'] ? '1' : '0'; ?>" novalidate>
				<?php if ( ! empty( $fs['general']['show_title'] ) ) : ?>
					<h3 class="formglut-form-title"><?php echo $title; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above. ?></h3>
				<?php endif; ?>
				<?php wp_nonce_field( 'formglut_submit_nonce', 'formglut_nonce_field' ); ?>
				<input type="hidden" name="action" value="formglut_submit_form" />
				<input type="hidden" name="form_id" value="<?php echo esc_attr( $form_id ); ?>" />
				<input type="hidden" name="nonce" class="formglut-nonce" value="" />

				<?php foreach ( $fields as $field ) : ?>
					<?php echo $this->render_field( $field ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- each field method escapes internally. ?>
				<?php endforeach; ?>

				<?php if ( FormGlut_Form_Settings::honeypot_enabled( $form ) ) : ?>
					<?php echo $this->render_honeypot(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php endif; ?>

				<?php if ( (int) $fs['spam']['min_time'] > 0 ) : ?>
					<input type="hidden" name="formglut_ts" value="<?php echo esc_attr( FormGlut_Form_Settings::time_token( $form_id ) ); ?>" />
				<?php endif; ?>

				<?php if ( ! $has_custom_submit ) : ?>
				<div class="formglut-form-actions" style="<?php echo esc_attr( $btn_styles['align'] ); ?>">
					<button type="submit" class="formglut-submit-btn" style="<?php echo esc_attr( $btn_styles['inline'] ); ?>"<?php echo '' !== $processing ? ' data-loading-text="' . esc_attr( $processing ) . '"' : ''; ?>>
						<span class="formglut-btn-text"><?php echo $btn_text; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- already escaped above. ?></span>
						<span class="formglut-btn-spinner" style="display:none;">&nbsp;&hellip;</span>
					</button>
				</div>
				<?php endif; ?>

				<div class="formglut-form-message formglut-success" role="status" aria-live="polite" tabindex="-1" style="display:none;"></div>
				<div class="formglut-form-message formglut-error" role="alert" tabindex="-1" style="display:none;"></div>
			</form>
			<?php if ( '' !== $fs['style']['custom_js'] && $enforce ) : ?>
				<script>document.addEventListener('formglut:submitted',function(event){if(!event.detail||event.detail.formId!==<?php echo (int) $form_id; ?>){return;}<?php echo $fs['style']['custom_js']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- saved only by users with unfiltered_html. ?>
});</script>
			<?php endif; ?>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Build inline styles for the submit button.
	 *
	 * @param array $btn Button config.
	 * @return array With 'inline' and 'align' style strings.
	 */
	private function build_button_styles( $btn ) {
		$inline_parts = array();
		$align_style  = '';

		if ( ! empty( $btn['bg_color'] ) ) {
			$inline_parts[] = 'background-color:' . sanitize_hex_color( $btn['bg_color'] );
			$inline_parts[] = 'border-color:' . sanitize_hex_color( $btn['bg_color'] );
		}
		if ( ! empty( $btn['text_color'] ) ) {
			$inline_parts[] = 'color:' . sanitize_hex_color( $btn['text_color'] );
		}
		if ( isset( $btn['border_radius'] ) ) {
			$inline_parts[] = 'border-radius:' . absint( $btn['border_radius'] ) . 'px';
		}
		if ( isset( $btn['font_size'] ) ) {
			$inline_parts[] = 'font-size:' . absint( $btn['font_size'] ) . 'px';
		}
		if ( ! empty( $btn['font_weight'] ) ) {
			$inline_parts[] = 'font-weight:' . absint( $btn['font_weight'] );
		}
		if ( isset( $btn['height'] ) ) {
			$inline_parts[] = 'height:' . absint( $btn['height'] ) . 'px';
		}

		$size = isset( $btn['size'] ) ? $btn['size'] : 'large';
		if ( 'small' === $size ) {
			$inline_parts[] = 'padding:6px 16px';
		} elseif ( 'medium' === $size ) {
			$inline_parts[] = 'padding:8px 24px';
		} else {
			$inline_parts[] = 'padding:10px 32px';
		}

		$alignment = isset( $btn['alignment'] ) ? $btn['alignment'] : 'full';
		if ( 'left' === $alignment ) {
			$align_style = 'text-align:left';
		} elseif ( 'center' === $alignment ) {
			$align_style = 'text-align:center';
		} elseif ( 'right' === $alignment ) {
			$align_style = 'text-align:right';
		} else {
			$align_style = 'text-align:center';
			$inline_parts[] = 'width:100%';
		}

		return array(
			'inline' => implode( ';', $inline_parts ),
			'align'  => $align_style,
		);
	}

	/**
	 * Build inline style strings for a field.
	 *
	 * @param array $field Field configuration.
	 * @return array With keys: input_style_str, label_style_str, wrapper_style_str, use_flex, label_placement.
	 */
	private function build_field_styles( $field ) {
		$input_styles   = array();
		$label_styles   = array();
		$wrapper_styles = array();
		$use_flex       = false;

		if ( ! empty( $field['bg_color'] ) ) {
			$input_styles[] = 'background-color:' . sanitize_hex_color( $field['bg_color'] );
		}
		if ( ! empty( $field['border_color'] ) ) {
			$input_styles[] = 'border-color:' . sanitize_hex_color( $field['border_color'] );
		}
		if ( ! empty( $field['text_color'] ) ) {
			$input_styles[] = 'color:' . sanitize_hex_color( $field['text_color'] );
		}
		if ( isset( $field['border_radius'] ) ) {
			$input_styles[] = 'border-radius:' . absint( $field['border_radius'] ) . 'px';
		}
		$pt = isset( $field['padding_top'] ) ? absint( $field['padding_top'] ) : 10;
		$pr = isset( $field['padding_right'] ) ? absint( $field['padding_right'] ) : 14;
		$pb = isset( $field['padding_bottom'] ) ? absint( $field['padding_bottom'] ) : 10;
		$pl = isset( $field['padding_left'] ) ? absint( $field['padding_left'] ) : 14;
		$input_styles[] = 'padding:' . $pt . 'px ' . $pr . 'px ' . $pb . 'px ' . $pl . 'px';
		$mt = isset( $field['margin_top'] ) ? absint( $field['margin_top'] ) : 0;
		$mr = isset( $field['margin_right'] ) ? absint( $field['margin_right'] ) : 0;
		$mb = isset( $field['margin_bottom'] ) ? absint( $field['margin_bottom'] ) : 0;
		$ml = isset( $field['margin_left'] ) ? absint( $field['margin_left'] ) : 0;
		if ( $mt || $mr || $mb || $ml ) {
			$input_styles[] = 'margin:' . $mt . 'px ' . $mr . 'px ' . $mb . 'px ' . $ml . 'px';
		}

		$label_placement = isset( $field['label_placement'] ) ? $field['label_placement'] : 'top';
		if ( 'hidden' === $label_placement ) {
			$label_styles[] = 'display:none';
		} elseif ( 'left' === $label_placement || 'right' === $label_placement ) {
			$use_flex = true;
			$label_styles[] = 'flex:0 0 auto';
			$label_styles[] = 'white-space:nowrap';
			$label_styles[] = 'margin-bottom:0';
			$lw = isset( $field['label_width'] ) ? $field['label_width'] : 'auto';
			if ( 'custom' === $lw && ! empty( $field['label_width_custom'] ) ) {
				$label_styles[] = 'width:' . absint( $field['label_width_custom'] ) . 'px';
			} elseif ( 'auto' !== $lw && '100%' !== $lw ) {
				$label_styles[] = 'width:' . esc_attr( $lw );
			}
		}

		$fw = isset( $field['field_width'] ) ? $field['field_width'] : '100%';
		if ( 'custom' === $fw && ! empty( $field['field_width_custom'] ) ) {
			$wrapper_styles[] = 'max-width:' . absint( $field['field_width_custom'] ) . 'px';
		} elseif ( ! empty( $fw ) && '100%' !== $fw ) {
			$wrapper_styles[] = 'max-width:' . esc_attr( $fw );
		}

		return array(
			// !important so field style options win over the base stylesheet (which guards against theme CSS).
			'input_style_str'   => ! empty( $input_styles ) ? ' style="' . esc_attr( implode( ' !important;', $input_styles ) . ' !important' ) . '"' : '',
			'label_style_str'   => ! empty( $label_styles ) ? ' style="' . esc_attr( implode( ';', $label_styles ) ) . '"' : '',
			'wrapper_style_str' => ! empty( $wrapper_styles ) ? ' style="' . esc_attr( implode( ';', $wrapper_styles ) ) . '"' : '',
			'use_flex'          => $use_flex,
			'label_placement'   => $label_placement,
		);
	}

	/**
	 * Render a single form field.
	 *
	 * @param array $field Field configuration.
	 * @return string HTML.
	 */
	private function render_field( $field ) {
		if ( FormGlut_Form::is_container( $field ) ) {
			return $this->render_container( $field );
		}
		if ( ! FormGlut_Form::field_visible( $field ) ) {
			return '';
		}

		$type     = isset( $field['type'] ) ? sanitize_key( $field['type'] ) : 'text';
		$id       = isset( $field['id'] ) ? sanitize_text_field( $field['id'] ) : '';
		$label    = isset( $field['label'] ) ? esc_html( $field['label'] ) : '';
		$required = ! empty( $field['required'] );
		$ph       = isset( $field['placeholder'] ) ? esc_attr( $field['placeholder'] ) : '';
		$hidden   = ! empty( $field['hidden'] );
		$prefix   = isset( $field['prefix_label'] ) ? $field['prefix_label'] : '';
		$suffix   = isset( $field['suffix_label'] ) ? $field['suffix_label'] : '';
		$default_value = isset( $field['default_value'] ) && ! is_array( $field['default_value'] ) ? esc_attr( $field['default_value'] ) : '';

		$help_text  = isset( $field['help_text'] ) ? esc_html( $field['help_text'] ) : '';
		// Check both max_length and character_limit for backward compatibility
		$char_limit = isset( $field['max_length'] ) ? intval( $field['max_length'] ) : ( isset( $field['character_limit'] ) ? intval( $field['character_limit'] ) : 0 );
		$maxlength  = $char_limit > 0 ? ' maxlength="' . $char_limit . '"' : '';
		$min_length = isset( $field['min_length'] ) && intval( $field['min_length'] ) > 0 ? intval( $field['min_length'] ) : 0;
		$minlength  = $min_length > 0 ? ' minlength="' . $min_length . '"' : '';
		$val_msg    = isset( $field['validation_message'] ) && '' !== $field['validation_message'] ? ' data-validation-message="' . esc_attr( $field['validation_message'] ) . '"' : '';
		$req_mark   = $required ? ' <span class="formglut-required">*</span>' : '';
		$req_attr   = $required ? ' required' : '';
		$hidden_cls = $hidden ? ' formglut-hidden' : '';

		$s = $this->build_field_styles( $field );

		// Mask input settings
		$enable_mask = ! empty( $field['enable_mask'] );
		$mask_pattern = isset( $field['mask_pattern'] ) ? esc_attr( $field['mask_pattern'] ) : '';
		$custom_mask = isset( $field['custom_mask'] ) ? esc_attr( $field['custom_mask'] ) : '';
		$mask_placeholder = isset( $field['mask_placeholder'] ) ? esc_attr( $field['mask_placeholder'] ) : '_';
		$reversible_mask = ! empty( $field['reversible_mask'] );
		$clear_on_invalid = ! empty( $field['clear_on_invalid'] );

		// Determine the actual mask to use
		$mask_to_use = $custom_mask ?: $mask_pattern;

		// Build mask data attributes
		$mask_attrs = '';
		if ( $enable_mask && $mask_to_use ) {
			$mask_attrs = ' data-mask="' . $mask_to_use . '"';
			$mask_attrs .= ' data-mask-placeholder="' . $mask_placeholder . '"';
			if ( $reversible_mask ) {
				$mask_attrs .= ' data-mask-reversible="1"';
			}
			if ( $clear_on_invalid ) {
				$mask_attrs .= ' data-mask-clear-invalid="1"';
			}
		}

		$help_html = $help_text ? '<span class="formglut-help-tip"><span class="formglut-help-icon"><svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="6.5" r="0.75" fill="currentColor"/></svg></span><span class="formglut-help-tooltip">' . $help_text . '</span></span>' : '';

		$name = isset( $field['name_attribute'] ) && '' !== $field['name_attribute'] ? sanitize_text_field( $field['name_attribute'] ) : $id;

		$container_cls_attr = '';
		foreach ( array( 'container_class', 'css_class' ) as $cls_key ) {
			if ( ! empty( $field[ $cls_key ] ) ) {
				$container_cls_attr .= ' ' . implode( ' ', array_filter( array_map( 'sanitize_html_class', explode( ' ', $field[ $cls_key ] ) ) ) );
			}
		}

		$conditional_data = '';
		if ( ! empty( $field['conditional_logic'] ) && ! empty( $field['conditions'] ) && is_array( $field['conditions'] ) ) {
			$conditional_data = ' data-conditional-logic="' . esc_attr( wp_json_encode( array(
				'enabled' => true,
				'match'   => isset( $field['condition_match'] ) ? $field['condition_match'] : 'any',
				'rules'   => array_values( $field['conditions'] ),
			) ) ) . '"';
		}

		if ( 'unique_id' === $type ) {
			return ''; // Created on submit.
		}
		if ( 'reset_button' === $type ) {
			$align = isset( $field['button_alignment'] ) && in_array( $field['button_alignment'], array( 'left', 'center', 'right' ), true ) ? $field['button_alignment'] : 'left';
			$el    = ! empty( $field['element_class'] ) ? ' ' . implode( ' ', array_filter( array_map( 'sanitize_html_class', explode( ' ', $field['element_class'] ) ) ) ) : '';
			return '<div class="formglut-field formglut-field-reset_button' . esc_attr( $container_cls_attr ) . '" style="text-align:' . esc_attr( $align ) . '"' . $conditional_data . '>'
				. '<button type="reset" class="formglut-reset-btn' . esc_attr( $el ) . '"' . ( ! isset( $field['confirm_reset'] ) || ! empty( $field['confirm_reset'] ) ? ' data-confirm="' . esc_attr__( 'Clear everything you have entered?', 'formglut' ) . '"' : '' ) . '>'
				. esc_html( ! empty( $field['button_text'] ) ? $field['button_text'] : __( 'Clear form', 'formglut' ) ) . '</button></div>';
		}
		if ( 'form_step' === $type ) {
			// A marker that the front-end script turns into steps with next / previous buttons.
			return '<div class="formglut-step-break" data-title="' . esc_attr( isset( $field['step_title'] ) ? $field['step_title'] : '' ) . '" data-next="' . esc_attr( ! empty( $field['next_text'] ) ? $field['next_text'] : __( 'Next', 'formglut' ) ) . '" data-prev="' . esc_attr( ! empty( $field['prev_text'] ) ? $field['prev_text'] : __( 'Previous', 'formglut' ) ) . '"></div>';
		}
		if ( 'hidden' === $type ) {
			return $this->render_hidden_field( $field );
		}
		if ( in_array( $type, array( 'recaptcha', 'hcaptcha', 'turnstile' ), true ) ) {
			return $this->render_captcha_field( $field, $type, $container_cls_attr );
		}
		if ( 'custom_submit_button' === $type ) {
			return $this->render_submit_field( $field, $conditional_data, $container_cls_attr );
		}
		if ( in_array( $type, array( 'terms_conditions', 'gdpr_agreement' ), true ) ) {
			return $this->render_consent_field( $field, $type, $conditional_data, $container_cls_attr );
		}
		if ( in_array( $type, array( 'section_break', 'shortcode', 'action_hook' ), true ) ) {
			return $this->render_block_field( $field, $type, $conditional_data, $container_cls_attr );
		}
		if ( in_array( $type, array( 'html', 'heading' ), true ) ) {
			return $this->render_display_field( $field, $type, $conditional_data, $container_cls_attr );
		}
		if ( in_array( $type, self::STANDARD_TYPES, true ) ) {
			return $this->render_standard_field( $field, $type, $s, $conditional_data, $container_cls_attr );
		}

		$open       = '<div class="formglut-field formglut-field-' . esc_attr( $type . $hidden_cls . $container_cls_attr ) . '"' . $s['wrapper_style_str'] . $conditional_data . '>';
		$label_html = ( $label && 'hidden' !== $s['label_placement'] )
			? '<label class="formglut-label" for="' . esc_attr( $id ) . '"' . $s['label_style_str'] . '><span class="formglut-label-text">' . $label . '</span>' . $req_mark . $help_html . '</label>'
			: '';

		ob_start();

		switch ( $type ) {
			case 'divider':
				echo '<hr class="formglut-divider' . esc_attr( $container_cls_attr ) . '"' . $conditional_data . ' />'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				break;

			// File upload is not available yet.
			case 'file':
			?>
			<div class="formglut-field formglut-field-<?php echo esc_attr( $type ); ?> formglut-field-pro">
				<?php if ( $label ) : ?>
				<label class="formglut-label"><?php echo esc_html( $label ); // phpcs:ignore ?><?php echo $req_mark; // phpcs:ignore ?></label>
				<?php endif; ?>
				<div class="formglut-pro-notice" style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 12px 16px; display: flex; align-items: center; gap: 12px;">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="flex-shrink: 0; color: #f59e0b;">
						<circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
						<path d="M10 5v5M10 13h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					</svg>
					<span style="color: #92400e; font-size: 14px; font-weight: 500;">
						<?php esc_html_e( 'This field is coming soon. Pro version will include this feature.', 'formglut' ); ?>
					</span>
				</div>
			</div>
			<?php
			break;

			default: // text, email
				$input_type = 'email' === $type ? 'email' : 'text';

				if ( $s['use_flex'] ) :
				?>
				<div class="formglut-field formglut-field-<?php echo esc_attr( $type ); ?><?php echo esc_attr( $hidden_cls ); ?>" style="display:flex;align-items:center;gap:8px;<?php echo ! empty( $s['wrapper_style_str'] ) ? esc_attr( trim( str_replace( array('style="', '"'), '', $s['wrapper_style_str'] ), ';' ) ) . ';' : ''; ?>">
					<?php if ( 'left' === $s['label_placement'] && $label ) : ?>
					<label class="formglut-label" for="<?php echo esc_attr( $id ); ?>"<?php echo $s['label_style_str']; ?>><?php echo '<span class="formglut-label-text">' . $label . '</span>' . $req_mark . $help_html; // phpcs:ignore ?></label>
					<?php endif; ?>
					<div class="formglut-input-group">
						<?php if ( $prefix ) : ?><span class="formglut-input-prefix"><?php echo $prefix; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- user-defined HTML allowed ?></span><?php endif; ?>
						<input type="<?php echo esc_attr( $input_type ); ?>" name="<?php echo esc_attr( $id ); ?>" id="<?php echo esc_attr( $id ); ?>" placeholder="<?php echo $ph; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>" value="<?php echo $default_value; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>" class="formglut-input"<?php echo $req_attr . $minlength . $maxlength . $val_msg . $mask_attrs . $s['input_style_str']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> />
						<?php if ( $suffix ) : ?><span class="formglut-input-suffix"><?php echo $suffix; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- user-defined HTML allowed ?></span><?php endif; ?>
					</div>
					<?php if ( 'right' === $s['label_placement'] && $label ) : ?>
					<label class="formglut-label" for="<?php echo esc_attr( $id ); ?>"<?php echo $s['label_style_str']; ?>><?php echo '<span class="formglut-label-text">' . $label . '</span>' . $req_mark . $help_html; // phpcs:ignore ?></label>
					<?php endif; ?>
					</div>
				<?php else : ?>
				<div class="formglut-field formglut-field-<?php echo esc_attr( $type ); ?><?php echo esc_attr( $hidden_cls ); ?>"<?php echo $s['wrapper_style_str']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<?php if ( $label && 'hidden' !== $s['label_placement'] ) : ?>
					<label class="formglut-label" for="<?php echo esc_attr( $id ); ?>"<?php echo $s['label_style_str']; ?>><?php echo '<span class="formglut-label-text">' . $label . '</span>' . $req_mark . $help_html; // phpcs:ignore ?></label>
					<?php endif; ?>
					<div class="formglut-input-group">
						<?php if ( $prefix ) : ?><span class="formglut-input-prefix"><?php echo $prefix; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- user-defined HTML allowed ?></span><?php endif; ?>
						<input type="<?php echo esc_attr( $input_type ); ?>" name="<?php echo esc_attr( $id ); ?>" id="<?php echo esc_attr( $id ); ?>" placeholder="<?php echo $ph; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>" value="<?php echo $default_value; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>" class="formglut-input"<?php echo $req_attr . $minlength . $maxlength . $val_msg . $mask_attrs . $s['input_style_str']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> />
						<?php if ( $suffix ) : ?><span class="formglut-input-suffix"><?php echo $suffix; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- user-defined HTML allowed ?></span><?php endif; ?>
					</div>
					</div>
				<?php
				endif;
				break;
		}

		return ob_get_clean();
	}

	/**
	 * General field types rendered by render_standard_field().
	 *
	 * @var string[]
	 */
	const STANDARD_TYPES = array( 'text', 'email', 'textarea', 'select', 'multiselect', 'number', 'radio', 'checkbox', 'url', 'phone', 'date', 'name', 'country_select', 'spinner', 'currency', 'percentage', 'time', 'date_range', 'address', 'masked_input', 'password', 'range_slider', 'color_picker', 'file_upload', 'toggle', 'star_rating', 'rich_text', 'math_captcha', 'calculation', 'payment_item', 'stripe_card' );

	/**
	 * Render one of the general field types. Mirrors FieldTemplate in the form editor
	 * so the editor canvas and the live form look and behave the same.
	 *
	 * @param array  $field            Field config.
	 * @param string $type             Field type.
	 * @param array  $s                Styles from build_field_styles().
	 * @param string $conditional_data Conditional logic data attribute.
	 * @param string $extra_classes    Container/CSS classes (leading space).
	 * @return string HTML.
	 */
	private function render_standard_field( $field, $type, $s, $conditional_data, $extra_classes ) {
		$id        = isset( $field['id'] ) ? sanitize_text_field( $field['id'] ) : '';
		$name      = isset( $field['name_attribute'] ) && '' !== $field['name_attribute'] ? sanitize_text_field( $field['name_attribute'] ) : $id;
		$label     = isset( $field['label'] ) ? (string) $field['label'] : '';
		$required  = ! empty( $field['required'] );
		$ph        = isset( $field['placeholder'] ) ? (string) $field['placeholder'] : '';
		$default   = isset( $field['default_value'] ) ? $field['default_value'] : '';
		$prefill   = FormGlut_Form::prefill_value( $field );
		if ( null !== $prefill ) {
			$default = in_array( $type, array( 'checkbox', 'multiselect' ), true ) ? array_map( 'trim', explode( ',', $prefill ) ) : $prefill;
		}
		$defaults  = array_map( 'strval', is_array( $default ) ? $default : ( '' === $default ? array() : array( $default ) ) );
		$el_class  = trim( 'formglut-input ' . ( isset( $field['element_class'] ) ? implode( ' ', array_map( 'sanitize_html_class', explode( ' ', $field['element_class'] ) ) ) : '' ) );
		$val_msg   = isset( $field['validation_message'] ) && '' !== $field['validation_message'] ? ' data-validation-message="' . esc_attr( $field['validation_message'] ) . '"' : '';
		$req_attr  = $required ? ' required' : '';
		$req_mark  = $required ? ' <span class="formglut-required">*</span>' : '';
		$is_choice = in_array( $type, array( 'radio', 'checkbox' ), true );

		$placement = $s['label_placement'];
		if ( 'default' === $placement || '' === $placement ) {
			$placement = 'top';
		}

		// Help text: tooltip beside the label, or a line above / below the input.
		$help     = isset( $field['help_text'] ) ? (string) $field['help_text'] : '';
		$help_pos = isset( $field['help_text_position'] ) && '' !== $field['help_text_position'] ? $field['help_text_position'] : 'below';
		$help_tip = '';
		if ( $help && 'tooltip' === $help_pos ) {
			$help_tip = '<span class="formglut-help-tip"><span class="formglut-help-icon"><svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="6.5" r="0.75" fill="currentColor"/></svg></span><span class="formglut-help-tooltip">' . esc_html( $help ) . '</span></span>';
		}
		$help_line = $help && 'tooltip' !== $help_pos ? '<div class="formglut-help-text">' . esc_html( $help ) . '</div>' : '';

		$label_html = '';
		if ( $label && 'hidden' !== $placement ) {
			$tag        = $is_choice ? 'div' : 'label';
			$for        = $is_choice ? '' : ' for="' . esc_attr( $id ) . '"';
			$label_html = '<' . $tag . ' class="formglut-label"' . $for . $s['label_style_str'] . '><span class="formglut-label-text">' . esc_html( $label ) . '</span>' . $req_mark . $help_tip . '</' . $tag . '>';
		}

		$control = $this->standard_control( $field, $type, compact( 'id', 'name', 'ph', 'default', 'defaults', 'el_class', 'val_msg', 'req_attr', 's' ) );

		$classes = 'formglut-field formglut-field-' . $type . ( ! empty( $field['hidden'] ) ? ' formglut-hidden' : '' ) . ( 'calculation' === $type && ! empty( $field['hide_on_form'] ) ? ' formglut-calc-hidden' : '' ) . $extra_classes . ' formglut-label-' . $placement;

		$html  = '<div class="' . esc_attr( $classes ) . '"' . $s['wrapper_style_str'] . $conditional_data . '>';
		$html .= in_array( $placement, array( 'top', 'left' ), true ) ? $label_html : '';
		$html .= '<div class="formglut-field-body">';
		$html .= 'above' === $help_pos ? $help_line : '';
		$html .= $control;
		$html .= 'above' !== $help_pos ? $help_line : '';
		$html .= '</div>';
		$html .= in_array( $placement, array( 'bottom', 'right' ), true ) ? $label_html : '';
		$html .= '</div>';

		return $html;
	}

	/**
	 * Data attributes for the live character / word counter.
	 *
	 * @param array $field Field config.
	 * @return string
	 */
	private function counter_attrs( $field ) {
		$words = ! empty( $field['max_words'] ) ? absint( $field['max_words'] ) : 0;
		$show  = ! isset( $field['show_counter'] ) || ! empty( $field['show_counter'] );
		return ( $words ? ' data-max-words="' . $words . '"' : '' ) . ( $show ? ' data-counter="1"' : ' data-counter="0"' );
	}

	/**
	 * Data attributes (and HTML min / max) for date fields: picker options and blocked days.
	 *
	 * @param array $field  Field config.
	 * @param bool  $is_dt  Date and time.
	 * @return string
	 */
	private function date_attrs( $field, $is_dt ) {
		$today = wp_date( 'Y-m-d' );
		$min   = ! empty( $field['min_date'] ) ? $field['min_date'] : '';
		$max   = ! empty( $field['max_date'] ) ? $field['max_date'] : '';
		if ( ! empty( $field['disable_past'] ) && ( '' === $min || $min < $today ) ) {
			$min = $today;
		}
		if ( ! empty( $field['disable_future'] ) && ( '' === $max || $max > $today ) ) {
			$max = $today;
		}
		$attrs = '';
		if ( ! empty( $field['use_picker'] ) ) {
			$blocked = array_values( array_filter( array_map( 'trim', explode( ',', isset( $field['disabled_dates'] ) ? $field['disabled_dates'] : '' ) ), static function ( $d ) {
				return (bool) preg_match( '/^\d{4}-\d{2}-\d{2}$/', $d );
			} ) );
			$attrs .= ' data-picker="date" data-format="' . esc_attr( ! empty( $field['date_format'] ) ? $field['date_format'] : 'Y-m-d' ) . '"'
				. ' data-first-day="' . esc_attr( isset( $field['first_day'] ) && '' !== $field['first_day'] ? absint( $field['first_day'] ) : 1 ) . '"'
				. ( $is_dt ? ' data-time="1" data-time24="' . ( ! empty( $field['time_24hr'] ) ? '1' : '0' ) . '"' : '' )
				. ( $min ? ' data-min="' . esc_attr( $min ) . '"' : '' ) . ( $max ? ' data-max="' . esc_attr( $max ) . '"' : '' )
				. ( ! empty( $field['disable_weekends'] ) ? ' data-no-weekends="1"' : '' )
				. ( $blocked ? ' data-disabled="' . esc_attr( implode( ',', $blocked ) ) . '"' : '' )
				. ' autocomplete="off"';
		} elseif ( $min !== ( isset( $field['min_date'] ) ? $field['min_date'] : '' ) || $max !== ( isset( $field['max_date'] ) ? $field['max_date'] : '' ) ) {
			// Native date box: past / future limits become min / max.
			$attrs .= ( $min && $min !== ( $field['min_date'] ?? '' ) ? ' min="' . esc_attr( $min . ( $is_dt ? 'T00:00' : '' ) ) . '"' : '' )
				. ( $max && $max !== ( $field['max_date'] ?? '' ) ? ' max="' . esc_attr( $max . ( $is_dt ? 'T23:59' : '' ) ) . '"' : '' );
		}
		return $attrs;
	}

	/**
	 * Country dial-code dropdown for the phone field.
	 *
	 * @param array  $field Field config.
	 * @param string $name  Input name.
	 * @param string $id    Input ID.
	 * @return string
	 */
	private function dial_code_select( $field, $name, $id ) {
		$codes     = FormGlut_Form::dial_codes();
		$countries = include FORMGLUT_PLUGIN_DIR . 'includes/data/countries.php';
		$default   = isset( $field['default_country'] ) && isset( $codes[ $field['default_country'] ] ) ? $field['default_country'] : 'US';
		$top       = array_values( array_intersect( (array) ( isset( $field['preferred_countries'] ) ? $field['preferred_countries'] : array() ), array_keys( $codes ) ) );
		$flag      = static function ( $iso ) {
			return mb_chr( 127397 + ord( $iso[0] ), 'UTF-8' ) . mb_chr( 127397 + ord( $iso[1] ), 'UTF-8' );
		};
		$option    = static function ( $iso ) use ( $codes, $countries, $default, $flag ) {
			return '<option value="' . esc_attr( $iso ) . '"' . selected( $iso, $default, false ) . ' data-dial="+' . esc_attr( $codes[ $iso ] ) . '">' . esc_html( $flag( $iso ) . ' ' . ( isset( $countries[ $iso ] ) ? $countries[ $iso ] : $iso ) . ' +' . $codes[ $iso ] ) . '</option>';
		};
		$html = '<select class="formglut-dial-code" name="' . esc_attr( $name ) . '_cc" aria-label="' . esc_attr__( 'Country code', 'formglut' ) . '" data-for="' . esc_attr( $id ) . '">';
		foreach ( $top as $iso ) {
			$html .= $option( $iso );
		}
		if ( $top ) {
			$html .= '<option disabled>──────────</option>';
		}
		foreach ( array_keys( $countries ) as $iso ) {
			if ( isset( $codes[ $iso ] ) && ! in_array( $iso, $top, true ) ) {
				$html .= $option( $iso );
			}
		}
		return $html . '</select>';
	}

	/**
	 * Build the input control for a general field type.
	 *
	 * @param array  $field Field config.
	 * @param string $type  Field type.
	 * @param array  $c     Shared values from render_standard_field().
	 * @return string HTML.
	 */
	private function standard_control( $field, $type, $c ) {
		$id   = $c['id'];
		$name = $c['name'];
		$s    = $c['s'];

		$options = isset( $field['options'] ) && is_array( $field['options'] ) ? $field['options'] : array();
		if ( ! empty( $field['shuffle_options'] ) ) {
			shuffle( $options );
		}

		switch ( $type ) {
			case 'textarea':
				$rows   = ! empty( $field['rows'] ) ? absint( $field['rows'] ) : 4;
				$max    = ! empty( $field['max_length'] ) ? absint( $field['max_length'] ) : ( ! empty( $field['character_limit'] ) ? absint( $field['character_limit'] ) : 0 );
				$min    = ! empty( $field['min_length'] ) ? absint( $field['min_length'] ) : 0;
				$resize = isset( $field['resize'] ) && in_array( $field['resize'], array( 'vertical', 'horizontal', 'both', 'none' ), true ) ? $field['resize'] : 'vertical';
				$attrs  = ' rows="' . $rows . '"'
					. ( ! empty( $field['cols'] ) ? ' cols="' . absint( $field['cols'] ) . '"' : '' )
					. ( $max ? ' maxlength="' . $max . '"' : '' )
					. ( $min ? ' minlength="' . $min . '"' : '' )
					. ( ! empty( $field['enable_rtl'] ) ? ' dir="rtl"' : '' )
					. $this->counter_attrs( $field );
				$style  = $this->merge_style( $s['input_style_str'], 'resize:' . $resize );
				$input  = '<textarea name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" placeholder="' . esc_attr( $c['ph'] ) . '" class="' . esc_attr( $c['el_class'] ) . '"' . $attrs . $c['req_attr'] . $c['val_msg'] . $style . '>' . esc_textarea( is_array( $c['default'] ) ? '' : $c['default'] ) . '</textarea>';
				return $this->with_affixes( $field, $input );

			case 'select':
				$html = '<select name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" class="' . esc_attr( $c['el_class'] . ' formglut-select' ) . '"' . ( ! empty( $field['searchable'] ) ? ' data-searchable="1"' : '' ) . $c['req_attr'] . $c['val_msg'] . $s['input_style_str'] . '>';
				if ( '' !== $c['ph'] ) {
					$ph_disabled = ! isset( $field['disable_first_option'] ) || false !== $field['disable_first_option'];
					$html       .= '<option value=""' . ( $ph_disabled ? ' disabled' : '' ) . ( $c['defaults'] ? '' : ' selected' ) . '>' . esc_html( $c['ph'] ) . '</option>';
				}
				foreach ( $options as $opt ) {
					$html .= $this->option_tag( $opt, $c['defaults'] );
				}
				return $html . '</select>';

			case 'multiselect':
				$size = min( max( count( $options ), 2 ), 6 );
				$html = '<div class="formglut-multiselect-wrapper"><select name="' . esc_attr( $name ) . '[]" id="' . esc_attr( $id ) . '" class="' . esc_attr( $c['el_class'] . ' formglut-select' ) . '" multiple size="' . $size . '"' . $c['req_attr'] . $c['val_msg'] . $this->selection_data( $field ) . $s['input_style_str'] . '>';
				foreach ( $options as $opt ) {
					$html .= $this->option_tag( $opt, $c['defaults'] );
				}
				$html .= '</select>';
				if ( ! empty( $field['select_all_button'] ) ) {
					$html .= '<button type="button" class="formglut-select-all-btn">' . esc_html__( 'Select All', 'formglut' ) . '</button>';
				}
				return $html . $this->selection_hint( $field ) . '</div>';

			case 'radio':
			case 'checkbox':
				$is_radio = 'radio' === $type;
				$layout   = isset( $field['layout'] ) ? sanitize_key( $field['layout'] ) : ( ! empty( $field['inline'] ) ? 'inline' : 'default' );
				$group_cl = 'formglut-choice-group formglut-choice-layout-' . $layout . ( ! empty( $field['element_class'] ) ? ' ' . implode( ' ', array_map( 'sanitize_html_class', explode( ' ', $field['element_class'] ) ) ) : '' );
				$html     = '<div class="' . esc_attr( $group_cl ) . '"' . ( $is_radio ? '' : $this->selection_data( $field ) ) . '>';
				foreach ( array_values( $options ) as $i => $opt ) {
					$opt_label = isset( $opt['label'] ) ? $opt['label'] : '';
					$opt_value = isset( $opt['value'] ) && '' !== $opt['value'] ? (string) $opt['value'] : $opt_label;
					$opt_id    = $id . '_' . $i;
					// Native "required" on every checkbox would force all of them; the server validates checkbox groups.
					$html .= '<label class="formglut-choice" for="' . esc_attr( $opt_id ) . '">'
						. '<input type="' . ( $is_radio ? 'radio' : 'checkbox' ) . '" name="' . esc_attr( $name ) . ( $is_radio ? '' : '[]' ) . '" id="' . esc_attr( $opt_id ) . '" value="' . esc_attr( $opt_value ) . '"'
						. ( in_array( $opt_value, $c['defaults'], true ) ? ' checked' : '' )
						. ( $is_radio ? $c['req_attr'] : '' )
						. ( ! empty( $opt['disabled'] ) ? ' disabled data-disabled-by-option="1"' : '' ) . ' />'
						. '<span>' . esc_html( $opt_label ) . '</span></label>';
				}
				if ( ! empty( $field['enable_other'] ) ) {
					$other_label = ! empty( $field['other_label'] ) ? $field['other_label'] : __( 'Other', 'formglut' );
					$html       .= '<label class="formglut-choice formglut-choice-other" for="' . esc_attr( $id ) . '_other">'
						. '<input type="' . ( $is_radio ? 'radio' : 'checkbox' ) . '" name="' . esc_attr( $name ) . ( $is_radio ? '' : '[]' ) . '" id="' . esc_attr( $id ) . '_other" value="__other__"' . ( $is_radio ? $c['req_attr'] : '' ) . ' />'
						. '<span>' . esc_html( $other_label ) . '</span>'
						. '<input type="text" class="formglut-other-input" name="' . esc_attr( $name ) . '_other" placeholder="' . esc_attr( ! empty( $field['other_placeholder'] ) ? $field['other_placeholder'] : __( 'Please specify', 'formglut' ) ) . '" aria-label="' . esc_attr( $other_label ) . '" /></label>';
				}
				$html .= '</div>';
				return $html . ( $is_radio ? '' : $this->selection_hint( $field ) );

			case 'name':
			case 'date_range':
			case 'address':
				return $this->multipart_control( $field, $type, $c );

			case 'password':
				$attrs  = ( ! empty( $field['min_length'] ) ? ' minlength="' . absint( $field['min_length'] ) . '"' : '' )
					. ( ! empty( $field['max_length'] ) ? ' maxlength="' . absint( $field['max_length'] ) . '"' : '' )
					. ' autocomplete="' . esc_attr( ! empty( $field['autocomplete_attribute'] ) ? $field['autocomplete_attribute'] : 'new-password' ) . '"';
				$toggle = ( ! isset( $field['show_toggle'] ) || ! empty( $field['show_toggle'] ) )
					? '<button type="button" class="formglut-password-toggle" data-show="' . esc_attr( isset( $field['show_text'] ) && '' !== $field['show_text'] ? $field['show_text'] : __( 'Show', 'formglut' ) ) . '" data-hide="' . esc_attr( isset( $field['hide_text'] ) && '' !== $field['hide_text'] ? $field['hide_text'] : __( 'Hide', 'formglut' ) ) . '">' . esc_html( isset( $field['show_text'] ) && '' !== $field['show_text'] ? $field['show_text'] : __( 'Show', 'formglut' ) ) . '</button>'
					: '';
				$meter  = ! empty( $field['enable_strength_meter'] ) ? ' data-strength-meter="1"' : '';
				$prule  = FormGlut_Form::field_pattern( $field );
				$html   = '<div class="formglut-password-wrap"><input type="password"' . ( $prule ? ' pattern="' . esc_attr( $prule['js'] ) . '" data-pattern-message="' . esc_attr( $prule['message'] ) . '"' : '' ) . ' name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" placeholder="' . esc_attr( $c['ph'] ) . '" class="' . esc_attr( $c['el_class'] ) . '"' . $attrs . $meter . $c['req_attr'] . $c['val_msg'] . $s['input_style_str'] . ' />' . $toggle . '</div>';
				if ( $meter ) {
					$html .= '<div class="formglut-strength" data-for="' . esc_attr( $id ) . '"><div class="formglut-strength-bar"><span></span></div><span class="formglut-strength-label">' . esc_html__( 'Password strength', 'formglut' ) . '</span></div>';
				}
				if ( ! empty( $field['requirements_hint'] ) ) {
					$html .= '<div class="formglut-choice-hint">' . esc_html( $field['requirements_hint'] ) . '</div>';
				}
				if ( ! empty( $field['require_confirmation'] ) ) {
					$conf_label = isset( $field['confirmation_label'] ) && '' !== $field['confirmation_label'] ? $field['confirmation_label'] : __( 'Confirm Password', 'formglut' );
					$conf_err   = isset( $field['confirmation_error'] ) && '' !== $field['confirmation_error'] ? $field['confirmation_error'] : __( 'Passwords do not match', 'formglut' );
					$html      .= '<div class="formglut-confirm-field"><label class="formglut-sublabel" for="' . esc_attr( $id ) . '_confirm">' . esc_html( $conf_label ) . '</label>'
						. '<div class="formglut-password-wrap"><input type="password" name="' . esc_attr( $name ) . '_confirm" id="' . esc_attr( $id ) . '_confirm" placeholder="' . esc_attr( isset( $field['confirmation_placeholder'] ) ? $field['confirmation_placeholder'] : '' ) . '" class="' . esc_attr( $c['el_class'] ) . '" autocomplete="new-password" data-confirm-of="' . esc_attr( $id ) . '" data-validation-message="' . esc_attr( $conf_err ) . '"' . $c['req_attr'] . $s['input_style_str'] . ' />' . $toggle . '</div></div>';
				}
				return $html;

			case 'payment_item':
				$cur = FormGlut_Payments::currency();
				if ( 'custom' === ( $field['item_type'] ?? 'fixed' ) ) {
					$min = (float) ( $field['min_amount'] ?? 0 );
					return '<div class="formglut-input-group"><span class="formglut-input-prefix">' . esc_html( $cur['symbol'] ) . '</span>'
						. '<input type="number" inputmode="decimal" step="' . ( $cur['decimals'] ? '0.01' : '1' ) . '" min="' . esc_attr( $min > 0 ? $min : 0 ) . '" class="' . esc_attr( $c['el_class'] . ' formglut-pay-item' ) . '" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" placeholder="' . esc_attr( '' !== $c['ph'] ? $c['ph'] : number_format( max( $min, 0 ), $cur['decimals'] ) ) . '"' . $c['req_attr'] . $c['val_msg'] . $s['input_style_str'] . ' /></div>';
				}
				$price = round( max( 0, (float) ( $field['amount'] ?? 0 ) ), 2 );
				return '<div class="formglut-pay-price">' . esc_html( $cur['symbol'] . number_format_i18n( $price, $cur['decimals'] ) ) . '</div>'
					. '<input type="hidden" class="formglut-pay-item" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" value="' . esc_attr( $price ) . '" />';

			case 'stripe_card':
				$keys = FormGlut_Payments::keys();
				$cur  = FormGlut_Payments::currency();
				if ( '' === $keys['publishable'] || '' === $keys['secret'] ) {
					return '<div class="formglut-captcha-notice">' . esc_html( current_user_can( 'manage_options' ) ? __( 'Add your Stripe keys in FormGlut → Global Settings → Payments to accept payments.', 'formglut' ) : __( 'Online payment is not available right now.', 'formglut' ) ) . '</div>';
				}
				wp_enqueue_script( 'formglut-stripe-js', 'https://js.stripe.com/v3/', array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- Stripe requires the unversioned URL.
				return '<div class="formglut-stripe" data-pk="' . esc_attr( $keys['publishable'] ) . '" data-currency="' . esc_attr( strtolower( $cur['code'] ) ) . '" data-decimals="' . esc_attr( $cur['decimals'] ) . '" data-symbol="' . esc_attr( $cur['symbol'] ) . '"'
					. ' data-source="' . esc_attr( 'calc' === ( $field['amount_source'] ?? 'items' ) ? 'calc' : 'items' ) . '" data-amount-field="' . esc_attr( $field['amount_field'] ?? '' ) . '">'
					. ( ! isset( $field['show_total'] ) || ! empty( $field['show_total'] ) ? '<div class="formglut-stripe-total">' . esc_html__( 'Total', 'formglut' ) . ' <strong class="formglut-stripe-amount">' . esc_html( $cur['symbol'] . number_format_i18n( 0, $cur['decimals'] ) ) . '</strong></div>' : '' )
					. '<div class="formglut-stripe-element"></div>'
					. ( 'test' === $keys['mode'] ? '<div class="formglut-stripe-test">' . esc_html__( 'Test mode: use card 4242 4242 4242 4242, any future date and any CVC.', 'formglut' ) . '</div>' : '' )
					. '</div>';

			case 'calculation':
				// Describe the fields the formula uses, so the browser can show the result live.
				$refs = array();
				if ( preg_match_all( '/\{field:([A-Za-z0-9_\-]+)\}/', isset( $field['formula'] ) ? (string) $field['formula'] : '', $m ) ) {
					foreach ( FormGlut_Form::flatten_fields( FormGlut_Form::get( $this->current_form_id )->fields ) as $ref ) {
						if ( empty( $ref['id'] ) || ! in_array( $ref['id'], $m[1], true ) ) {
							continue;
						}
						$calc_map = array();
						foreach ( ( isset( $ref['options'] ) && is_array( $ref['options'] ) ? $ref['options'] : array() ) as $opt ) {
							$key              = isset( $opt['value'] ) && '' !== $opt['value'] ? (string) $opt['value'] : ( isset( $opt['label'] ) ? (string) $opt['label'] : '' );
							$calc_map[ $key ] = isset( $opt['calc_value'] ) && '' !== $opt['calc_value'] ? (float) $opt['calc_value'] : ( is_numeric( $key ) ? (float) $key : 0 );
						}
						$refs[ $ref['id'] ] = array(
							'name' => ! empty( $ref['name_attribute'] ) ? $ref['name_attribute'] : $ref['id'],
							'type' => $ref['type'],
							'map'  => $calc_map ? $calc_map : null,
							'on'   => 'toggle' === $ref['type'] ? ( ! empty( $ref['on_value'] ) ? $ref['on_value'] : 'Yes' ) : null,
						);
					}
				}
				$decimals = isset( $field['decimals'] ) && '' !== $field['decimals'] ? absint( $field['decimals'] ) : 2;
				return '<input type="text" readonly tabindex="-1" class="' . esc_attr( $c['el_class'] . ' formglut-calc' ) . '" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" value="' . esc_attr( ( $field['calc_prefix'] ?? '' ) . number_format( 0, $decimals ) . ( $field['calc_suffix'] ?? '' ) ) . '"'
					. ' data-formula="' . esc_attr( isset( $field['formula'] ) ? $field['formula'] : '' ) . '" data-decimals="' . $decimals . '" data-prefix="' . esc_attr( $field['calc_prefix'] ?? '' ) . '" data-suffix="' . esc_attr( $field['calc_suffix'] ?? '' ) . '"'
					. ' data-refs="' . esc_attr( wp_json_encode( (object) $refs ) ) . '" aria-live="polite"' . $s['input_style_str'] . ' />';

			case 'toggle':
				$on  = isset( $field['on_value'] ) && '' !== $field['on_value'] ? $field['on_value'] : __( 'Yes', 'formglut' );
				$off = isset( $field['off_value'] ) ? $field['off_value'] : __( 'No', 'formglut' );
				return '<input type="hidden" name="' . esc_attr( $name ) . '" value="' . esc_attr( $off ) . '" />'
					. '<label class="formglut-toggle"><input type="checkbox" class="' . esc_attr( $c['el_class'] . ' formglut-toggle-input' ) . '" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" value="' . esc_attr( $on ) . '"' . ( ! empty( $field['default_on'] ) ? ' checked' : '' ) . $c['req_attr'] . $c['val_msg'] . ' />'
					. '<span class="formglut-toggle-track" aria-hidden="true"></span><span class="formglut-toggle-text">' . esc_html( isset( $field['toggle_text'] ) ? $field['toggle_text'] : '' ) . '</span></label>';

			case 'star_rating':
				$max   = max( 3, min( 10, absint( isset( $field['max_stars'] ) ? $field['max_stars'] : 5 ) ) );
				$words = ! empty( $field['show_labels'] ) ? array_map( 'trim', explode( ',', isset( $field['rating_labels'] ) ? $field['rating_labels'] : '' ) ) : array();
				$size  = isset( $field['star_size'] ) && in_array( $field['star_size'], array( 'small', 'medium', 'large' ), true ) ? $field['star_size'] : 'medium';
				$color = ! empty( $field['star_color'] ) ? sanitize_hex_color( $field['star_color'] ) : '';
				$html  = '<div class="formglut-stars formglut-stars-' . $size . '" role="radiogroup"' . ( $color ? ' style="--formglut-star:' . esc_attr( $color ) . '"' : '' ) . '>';
				for ( $i = $max; $i >= 1; $i-- ) {
					$word  = isset( $words[ $i - 1 ] ) ? $words[ $i - 1 ] : '';
					/* translators: 1: rating, 2: maximum */
					$aria  = $word ? $word : sprintf( __( '%1$d of %2$d stars', 'formglut' ), $i, $max );
					$html .= '<input type="radio" class="formglut-star-input" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id . '_' . $i ) . '" value="' . $i . '"' . ( (string) $i === (string) $c['default'] ? ' checked' : '' ) . ( $c['req_attr'] && $i === $max ? ' required' : '' ) . $c['val_msg'] . ' data-word="' . esc_attr( $word ) . '" />'
						. '<label for="' . esc_attr( $id . '_' . $i ) . '" title="' . esc_attr( $aria ) . '"><span class="screen-reader-text">' . esc_html( $aria ) . '</span>★</label>';
				}
				return $html . '</div>' . ( $words ? '<div class="formglut-star-word" aria-live="polite"></div>' : '' );

			case 'rich_text':
				$full  = isset( $field['toolbar'] ) && 'full' === $field['toolbar'];
				$tools = $full ? array( 'bold' => 'B', 'italic' => 'I', 'underline' => 'U', 'insertUnorderedList' => '•', 'insertOrderedList' => '1.', 'createLink' => '🔗', 'formatBlock' => '❝' ) : array( 'bold' => 'B', 'italic' => 'I', 'insertUnorderedList' => '•', 'insertOrderedList' => '1.' );
				$bar   = '';
				foreach ( $tools as $cmd => $glyph ) {
					$bar .= '<button type="button" data-cmd="' . esc_attr( $cmd ) . '" aria-label="' . esc_attr( $cmd ) . '">' . esc_html( $glyph ) . '</button>';
				}
				$height = max( 80, absint( isset( $field['editor_height'] ) ? $field['editor_height'] : 160 ) );
				$maxlen = ! empty( $field['max_length'] ) ? ' data-max-length="' . absint( $field['max_length'] ) . '"' : '';
				return '<div class="formglut-richtext"' . $s['input_style_str'] . '><div class="formglut-richtext-bar" role="toolbar">' . $bar . '</div>'
					. '<div class="formglut-richtext-area" contenteditable="true" role="textbox" aria-multiline="true" data-placeholder="' . esc_attr( $c['ph'] ) . '" style="min-height:' . ( $height - 40 ) . 'px"' . $maxlen . '>' . wp_kses_post( is_array( $c['default'] ) ? '' : (string) $c['default'] ) . '</div>'
					. '<textarea class="' . esc_attr( $c['el_class'] . ' formglut-richtext-value' ) . '" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '"' . $c['req_attr'] . $c['val_msg'] . ' hidden>' . esc_textarea( is_array( $c['default'] ) ? '' : (string) $c['default'] ) . '</textarea></div>';

			case 'math_captcha':
				$q = FormGlut_Form::math_question( $field, $this->current_form_id );
				return '<div class="formglut-math"><span class="formglut-math-q">' . esc_html( $q['text'] ) . ' =</span>'
					. '<input type="text" inputmode="numeric" autocomplete="off" class="' . esc_attr( $c['el_class'] ) . '" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" required' . $c['val_msg'] . $s['input_style_str'] . ' />'
					. '<input type="hidden" name="' . esc_attr( $name ) . '_mc" value="' . esc_attr( $q['token'] ) . '" /></div>';

			case 'file_upload':
				$rules    = FormGlut_Uploads::rules( $field );
				$accept   = implode( ',', array_map( static function ( $ext ) {
					return '.' . $ext;
				}, $rules['types'] ) );
				$multi    = $rules['multiple'];
				$btn_text = ! empty( $field['button_text'] ) ? $field['button_text'] : __( 'Choose file', 'formglut' );
				$hint     = strtoupper( implode( ', ', $rules['types'] ) ) . ' · ' . sprintf( /* translators: %s: size in MB */ __( 'max %s MB', 'formglut' ), $rules['max_mb'] ) . ( $multi ? ' · ' . sprintf( /* translators: %d: number of files */ __( 'up to %d files', 'formglut' ), $rules['max_files'] ) : '' );
				return '<div class="formglut-upload"' . $s['input_style_str'] . '>'
					. '<input type="file" class="' . esc_attr( $c['el_class'] . ' formglut-file-input' ) . '" name="' . esc_attr( $name ) . '[]" id="' . esc_attr( $id ) . '" accept="' . esc_attr( $accept ) . '"'
					. ( $multi ? ' multiple data-max-files="' . esc_attr( $rules['max_files'] ) . '"' : '' )
					. ' data-max-size="' . esc_attr( $rules['max_mb'] * MB_IN_BYTES ) . '" data-types="' . esc_attr( implode( ',', $rules['types'] ) ) . '"' . $c['req_attr'] . $c['val_msg'] . ' />'
					. '<label for="' . esc_attr( $id ) . '" class="formglut-upload-btn">' . esc_html( $btn_text ) . '</label>'
					. '<span class="formglut-upload-hint"><span class="formglut-upload-names">' . esc_html( $multi ? __( 'or drop files here', 'formglut' ) : __( 'or drop a file here', 'formglut' ) ) . '</span><small>' . esc_html( $hint ) . '</small></span>'
					. '</div>';

			case 'range_slider':
				$min   = isset( $field['min'] ) && is_numeric( $field['min'] ) ? $field['min'] + 0 : 0;
				$max   = isset( $field['max'] ) && is_numeric( $field['max'] ) ? $field['max'] + 0 : 100;
				$step  = isset( $field['step'] ) && is_numeric( $field['step'] ) && $field['step'] > 0 ? $field['step'] + 0 : 1;
				$value = is_numeric( $c['default'] ) ? $c['default'] + 0 : $min;
				$pre   = isset( $field['value_prefix'] ) ? $field['value_prefix'] : '';
				$suf   = isset( $field['value_suffix'] ) ? $field['value_suffix'] : '';
				$color = ! empty( $field['track_color'] ) ? sanitize_hex_color( $field['track_color'] ) : '';
				$html  = '<div class="formglut-range"' . ( $color ? ' style="--formglut-range-color:' . esc_attr( $color ) . '"' : '' ) . '>';
				if ( ! isset( $field['show_value'] ) || ! empty( $field['show_value'] ) ) {
					$html .= '<div class="formglut-range-value" data-prefix="' . esc_attr( $pre ) . '" data-suffix="' . esc_attr( $suf ) . '">' . esc_html( $pre . $value . $suf ) . '</div>';
				}
				$html .= '<input type="range" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" min="' . esc_attr( $min ) . '" max="' . esc_attr( $max ) . '" step="' . esc_attr( $step ) . '" value="' . esc_attr( $value ) . '"' . ( ! empty( $field['element_class'] ) ? ' class="' . esc_attr( $field['element_class'] ) . '"' : '' ) . $c['req_attr'] . ' />';
				$html .= '<div class="formglut-range-ends"><span>' . esc_html( isset( $field['min_label'] ) && '' !== $field['min_label'] ? $field['min_label'] : $min ) . '</span><span>' . esc_html( isset( $field['max_label'] ) && '' !== $field['max_label'] ? $field['max_label'] : $max ) . '</span></div>';
				return $html . '</div>';

			case 'color_picker':
				$picker   = isset( $field['picker_type'] ) ? $field['picker_type'] : 'swatches';
				$default  = ! empty( $field['default_color'] ) ? (string) sanitize_hex_color( $field['default_color'] ) : '';
				$swatches = 'picker' === $picker ? array() : array_filter( array_map( 'sanitize_hex_color', isset( $field['swatches'] ) ? (array) $field['swatches'] : array() ) );
				$size     = isset( $field['swatch_size'] ) && in_array( $field['swatch_size'], array( 'small', 'medium', 'large' ), true ) ? $field['swatch_size'] : 'medium';
				$html     = '<div class="' . esc_attr( 'formglut-color-picker formglut-swatch-' . $size . ( ! empty( $field['element_class'] ) ? ' ' . $field['element_class'] : '' ) ) . '">';
				$html    .= '<input type="hidden" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" value="' . esc_attr( $default ) . '" class="formglut-color-value" />';
				foreach ( $swatches as $color ) {
					$html .= '<button type="button" class="formglut-swatch' . ( strtolower( $color ) === strtolower( $default ) ? ' selected' : '' ) . '" data-color="' . esc_attr( $color ) . '" style="background:' . esc_attr( $color ) . '" aria-label="' . esc_attr( $color ) . '"></button>';
				}
				if ( 'swatches' !== $picker ) {
					$html .= '<input type="color" class="formglut-color-input" value="' . esc_attr( $default ? $default : '#000000' ) . '" aria-label="' . esc_attr__( 'Pick a color', 'formglut' ) . '" />';
				}
				return $html . '</div>';


			case 'country_select':
				return '<select name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" class="' . esc_attr( $c['el_class'] . ' formglut-select' ) . '"' . ( ! empty( $field['searchable'] ) ? ' data-searchable="1"' : '' ) . $c['req_attr'] . $c['val_msg'] . $s['input_style_str'] . '>'
					. '<option value="">' . esc_html( '' !== $c['ph'] ? $c['ph'] : __( 'Select a country', 'formglut' ) ) . '</option>'
					. $this->country_options( $field ) . '</select>';

			case 'spinner':
				$num_attrs = $this->num_attr( 'min', isset( $field['min'] ) ? $field['min'] : '' )
					. $this->num_attr( 'max', isset( $field['max'] ) ? $field['max'] : '' )
					. $this->num_attr( 'step', isset( $field['step'] ) ? $field['step'] : 1 )
					. ( ! empty( $field['wrap_values'] ) ? ' data-wrap="1"' : '' );
				$pos       = isset( $field['button_position'] ) && in_array( $field['button_position'], array( 'both', 'left', 'right' ), true ) ? $field['button_position'] : 'both';
				$btns      = ! isset( $field['show_buttons'] ) || ! empty( $field['show_buttons'] );
				$dec       = isset( $field['decrement_label'] ) && '' !== $field['decrement_label'] ? $field['decrement_label'] : '-';
				$inc       = isset( $field['increment_label'] ) && '' !== $field['increment_label'] ? $field['increment_label'] : '+';
				$value     = is_array( $c['default'] ) ? '' : (string) $c['default'];
				return '<div class="formglut-spinner formglut-spinner-' . esc_attr( $pos ) . '">'
					. ( $btns ? '<button type="button" class="formglut-spin-btn formglut-spin-dec" data-spin="-1" aria-label="' . esc_attr__( 'Decrease', 'formglut' ) . '">' . esc_html( $dec ) . '</button>' : '' )
					. '<input type="number" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" placeholder="' . esc_attr( $c['ph'] ) . '" value="' . esc_attr( $value ) . '" class="' . esc_attr( $c['el_class'] ) . '"' . $num_attrs . $c['req_attr'] . $c['val_msg'] . $s['input_style_str'] . ' />'
					. ( $btns ? '<button type="button" class="formglut-spin-btn formglut-spin-inc" data-spin="1" aria-label="' . esc_attr__( 'Increase', 'formglut' ) . '">' . esc_html( $inc ) . '</button>' : '' )
					. '</div>';

			case 'currency':
			case 'percentage':
				$is_currency = 'currency' === $type;
				$symbol      = $is_currency ? ( isset( $field['currency_symbol'] ) ? (string) $field['currency_symbol'] : '$' ) : '%';
				$before      = ( isset( $field['symbol_position'] ) ? $field['symbol_position'] : ( $is_currency ? 'before' : 'after' ) ) === 'before';
				$attrs       = $this->num_attr( 'min', isset( $field['min_value'] ) ? $field['min_value'] : '' )
					. $this->num_attr( 'max', isset( $field['max_value'] ) ? $field['max_value'] : '' )
					. $this->num_attr( 'step', isset( $field['step'] ) ? $field['step'] : '' )
					. ( ! empty( $field['read_only'] ) ? ' readonly' : '' );
				$value       = is_array( $c['default'] ) ? '' : (string) $c['default'];
				$input       = '<input type="number" inputmode="decimal" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" placeholder="' . esc_attr( $c['ph'] ) . '" value="' . esc_attr( $value ) . '" class="' . esc_attr( $c['el_class'] ) . '"' . $attrs . $c['req_attr'] . $c['val_msg'] . $s['input_style_str'] . ' />';
				return $this->with_affixes( array( ( $before ? 'prefix_label' : 'suffix_label' ) => esc_html( $symbol ) ), $input );

			case 'time':
				$inc   = isset( $field['time_increment'] ) ? absint( $field['time_increment'] ) : 0;
				$attrs = ( ! empty( $field['min_time'] ) ? ' min="' . esc_attr( $field['min_time'] ) . '"' : '' )
					. ( ! empty( $field['max_time'] ) ? ' max="' . esc_attr( $field['max_time'] ) . '"' : '' )
					. ( $inc ? ' step="' . ( $inc * 60 ) . '"' : '' );
				$tfmt  = isset( $field['time_format'] ) ? (string) $field['time_format'] : '';
				if ( in_array( $tfmt, array( '12', '24' ), true ) ) {
					// Calendar-style time picker so 12 / 24-hour display is the same in every browser.
					$attrs .= ' data-picker="time" data-time24="' . ( '24' === $tfmt ? '1' : '0' ) . '"' . ( $inc ? ' data-minute-step="' . $inc . '"' : '' );
				}
				$value = is_array( $c['default'] ) ? '' : (string) $c['default'];
				return '<input type="time" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" value="' . esc_attr( $value ) . '" class="' . esc_attr( $c['el_class'] ) . '"' . $attrs . $c['req_attr'] . $c['val_msg'] . $s['input_style_str'] . ' />';

			case 'masked_input':
				$mask  = isset( $field['custom_mask'] ) ? (string) $field['custom_mask'] : '';
				$ph    = '' !== $c['ph'] ? $c['ph'] : str_replace( array( '9', 'a', '*' ), array( '#', '?', '?' ), $mask );
				$attrs = $mask ? ' data-mask="' . esc_attr( $mask ) . '" data-mask-placeholder="_"'
					. ( ! empty( $field['reversible_mask'] ) ? ' data-mask-reversible="1"' : '' )
					. ( ! empty( $field['clear_on_invalid'] ) ? ' data-mask-clear-invalid="1"' : '' ) : '';
				$value = is_array( $c['default'] ) ? '' : (string) $c['default'];
				$input = '<input type="text" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" placeholder="' . esc_attr( $ph ) . '" value="' . esc_attr( $value ) . '" class="' . esc_attr( $c['el_class'] ) . '"' . $attrs . $c['req_attr'] . $c['val_msg'] . $s['input_style_str'] . ' />';
				return $this->with_affixes( $field, $input ) . ( ! empty( $field['mask_hint'] ) ? '<div class="formglut-choice-hint">' . esc_html( $field['mask_hint'] ) . '</div>' : '' );

			default: // text, email, number, url, phone, date.
				$input_types = array( 'email' => 'email', 'number' => 'number', 'url' => 'url', 'phone' => 'tel', 'date' => ( isset( $field['date_type'] ) && 'datetime' === $field['date_type'] ) ? 'datetime-local' : 'date' );
				$input_type  = isset( $input_types[ $type ] ) ? $input_types[ $type ] : 'text';
				$keyboards   = array( 'numeric' => 'numeric', 'decimal' => 'decimal', 'tel' => 'tel', 'email' => 'email', 'url' => 'url' );
				$keyboard    = isset( $field['mobile_keyboard_type'], $keyboards[ $field['mobile_keyboard_type'] ] ) ? $keyboards[ $field['mobile_keyboard_type'] ] : '';
				$ph          = $c['ph'];
				$attrs       = $keyboard ? ' inputmode="' . $keyboard . '"' : '';

				if ( ! empty( $field['autocomplete_attribute'] ) ) {
					$attrs .= ' autocomplete="' . esc_attr( $field['autocomplete_attribute'] ) . '"';
				}
				$rule = FormGlut_Form::field_pattern( $field );
				if ( $rule ) {
					$attrs .= ' pattern="' . esc_attr( $rule['js'] ) . '" data-pattern-message="' . esc_attr( $rule['message'] ) . '"';
				}
				if ( 'text' === $type && ! empty( $field['character_limit'] ) ) {
					$attrs .= ' maxlength="' . absint( $field['character_limit'] ) . '"';
				}
				if ( 'number' === $type ) {
					$attrs .= $this->num_attr( 'min', isset( $field['min_value'] ) ? $field['min_value'] : '' )
						. $this->num_attr( 'max', isset( $field['max_value'] ) ? $field['max_value'] : '' )
						. $this->num_attr( 'step', isset( $field['step'] ) ? $field['step'] : '' )
						. ( ! empty( $field['read_only'] ) ? ' readonly' : '' );
				}
				if ( in_array( $type, array( 'number' ), true ) && isset( $field['decimals'] ) && '' !== $field['decimals'] && empty( $field['step'] ) ) {
					$attrs .= ' step="' . esc_attr( 0 === absint( $field['decimals'] ) ? '1' : '0.' . str_repeat( '0', absint( $field['decimals'] ) - 1 ) . '1' ) . '"';
				}
				if ( 'text' === $type ) {
					$attrs .= $this->counter_attrs( $field );
				}
				if ( 'date' === $type ) {
					$attrs .= $this->date_attrs( $field, 'datetime-local' === $input_type );
					if ( ! empty( $field['use_picker'] ) ) {
						$input_type = 'text';
					}
				}
				if ( 'date' === $type && 'text' !== $input_type ) {
					$is_dt  = 'datetime-local' === $input_type;
					$attrs .= ( ! empty( $field['min_date'] ) ? ' min="' . esc_attr( $field['min_date'] . ( $is_dt ? 'T00:00' : '' ) ) . '"' : '' )
						. ( ! empty( $field['max_date'] ) ? ' max="' . esc_attr( $field['max_date'] . ( $is_dt ? 'T23:59' : '' ) ) . '"' : '' );
					$ph     = '';
				}

				// Input masks (text field option, or phone format).
				$mask = '';
				if ( 'text' === $type && ! empty( $field['enable_mask'] ) ) {
					$mask = ! empty( $field['custom_mask'] ) ? $field['custom_mask'] : ( isset( $field['mask_pattern'] ) ? $field['mask_pattern'] : '' );
				} elseif ( 'phone' === $type ) {
					$mask = $this->phone_mask( $field );
					if ( $mask && '' === $ph ) {
						$ph = str_replace( '9', '#', $mask );
					}
				}
				if ( $mask ) {
					$attrs .= ' data-mask="' . esc_attr( $mask ) . '" data-mask-placeholder="' . esc_attr( isset( $field['mask_placeholder'] ) && '' !== $field['mask_placeholder'] ? $field['mask_placeholder'] : '_' ) . '"'
						. ( ! empty( $field['reversible_mask'] ) ? ' data-mask-reversible="1"' : '' )
						. ( ! empty( $field['clear_on_invalid'] ) ? ' data-mask-clear-invalid="1"' : '' );
				}

				$value = is_array( $c['default'] ) ? '' : (string) $c['default'];
				$input = '<input type="' . $input_type . '" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '"' . ( '' !== $ph ? ' placeholder="' . esc_attr( $ph ) . '"' : '' ) . ' value="' . esc_attr( $value ) . '" class="' . esc_attr( $c['el_class'] ) . '"' . $attrs . $c['req_attr'] . $c['val_msg'] . $s['input_style_str'] . ' />';
				if ( 'phone' === $type && ! empty( $field['show_country_code'] ) ) {
					$input = $this->dial_code_select( $field, $name, $id ) . $input;
					$html  = '<div class="formglut-phone-cc">' . $this->with_affixes( $field, $input ) . '</div>';
				} else {
					$html = $this->with_affixes( $field, $input );
				}

				if ( 'email' === $type && ! empty( $field['confirm_email'] ) ) {
					$confirm_label = isset( $field['confirm_label'] ) && '' !== $field['confirm_label'] ? $field['confirm_label'] : __( 'Confirm Email Address', 'formglut' );
					$confirm_ph    = isset( $field['confirm_placeholder'] ) ? $field['confirm_placeholder'] : '';
					$confirm_input = '<input type="email" name="' . esc_attr( $name ) . '_confirm" id="' . esc_attr( $id ) . '_confirm" placeholder="' . esc_attr( $confirm_ph ) . '" class="' . esc_attr( $c['el_class'] ) . '" data-confirm-of="' . esc_attr( $id ) . '"' . ( isset( $field['confirm_error_message'] ) ? ' data-validation-message="' . esc_attr( $field['confirm_error_message'] ) . '"' : '' ) . $c['req_attr'] . $attrs . $s['input_style_str'] . ' />';
					$html         .= '<div class="formglut-confirm-field"><label class="formglut-sublabel" for="' . esc_attr( $id ) . '_confirm">' . esc_html( $confirm_label ) . '</label>' . $this->with_affixes( $field, $confirm_input ) . '</div>';
				}
				return $html;
		}
	}

	/**
	 * Sub-inputs of the multi-part fields, in display order: key => array( label, placeholder, shown, required ).
	 * Shared with the submit handler so validation matches what is rendered.
	 *
	 * @param array  $field Field config.
	 * @param string $type  name | date_range | address.
	 * @return array
	 */
	public static function multipart_parts( $field, $type ) {
		$req   = ! empty( $field['required'] );
		$get   = function ( $key, $fallback = '' ) use ( $field ) {
			return isset( $field[ $key ] ) && '' !== $field[ $key ] ? (string) $field[ $key ] : $fallback;
		};
		$shown = function ( $key, $default ) use ( $field ) {
			return isset( $field[ $key ] ) ? ! empty( $field[ $key ] ) : $default;
		};

		if ( 'name' === $type ) {
			$parts = array( 'prefix' => array( $get( 'prefix_label', __( 'Title', 'formglut' ) ), '', $shown( 'show_prefix', false ), false ) );
			foreach ( array( 'first' => true, 'middle' => false, 'last' => true ) as $p => $default ) {
				$parts[ $p ] = array( $get( $p . '_name_label' ), $get( $p . '_name_placeholder' ), $shown( 'show_' . $p . '_name', $default ), $req && $shown( 'require_' . $p . '_name', $default ) );
			}
			$parts['suffix'] = array( $get( 'suffix_label', __( 'Suffix', 'formglut' ) ), 'Jr, Sr, III', $shown( 'show_suffix', false ), false );
			return $parts;
		}

		if ( 'date_range' === $type ) {
			return array(
				'start' => array( $get( 'start_label', __( 'Start Date', 'formglut' ) ), '', true, $req ),
				'end'   => array( $get( 'end_label', __( 'End Date', 'formglut' ) ), '', true, $req ),
			);
		}

		return array(
			'street1' => array( $get( 'street1_label' ), $get( 'street1_placeholder' ), true, $req ),
			'street2' => array( $get( 'street2_label' ), $get( 'street2_placeholder' ), $shown( 'include_street2', true ), false ),
			'city'    => array( $get( 'city_label' ), $get( 'city_placeholder' ), $shown( 'include_city', true ), $req ),
			'state'   => array( $get( 'state_label' ), $get( 'state_placeholder' ), $shown( 'include_state', true ), $req ),
			'zip'     => array( $get( 'zip_label' ), $get( 'zip_placeholder' ), $shown( 'include_zip', true ), $req ),
			'country' => array( $get( 'country_label', __( 'Country', 'formglut' ) ), '', $shown( 'include_country', false ), $req ),
		);
	}

	/**
	 * Render the sub-inputs of a name, date range or address field.
	 *
	 * @param array  $field Field config.
	 * @param string $type  Field type.
	 * @param array  $c     Shared values from render_standard_field().
	 * @return string HTML.
	 */
	private function multipart_control( $field, $type, $c ) {
		$parts = array_filter( self::multipart_parts( $field, $type ), function ( $p ) {
			return $p[2];
		} );

		if ( 'name' === $type ) {
			$cols = isset( $field['name_layout'] ) && 'vertical' === $field['name_layout'] ? 1 : count( $parts );
		} elseif ( 'address' === $type ) {
			$cols = isset( $field['address_layout'] ) && 'vertical' === $field['address_layout'] ? 1 : max( 1, min( 3, absint( isset( $field['grid_columns'] ) ? $field['grid_columns'] : 2 ) ) );
		} else {
			$cols = 2;
		}

		$date_attrs = '';
		if ( 'date_range' === $type ) {
			$date_attrs = ( ! empty( $field['min_date'] ) ? ' min="' . esc_attr( $field['min_date'] ) . '"' : '' )
				. ( ! empty( $field['max_date'] ) ? ' max="' . esc_attr( $field['max_date'] ) . '"' : '' );
		}

		$html  = '<div class="formglut-subfields formglut-subfields-' . absint( max( 1, $cols ) ) . '">';
		$first = true;
		foreach ( $parts as $key => $p ) {
			list( $sub_label, $sub_ph, , $sub_req ) = $p;
			$sub_id   = $first ? $c['id'] : $c['id'] . '_' . $key;
			$sub_name = $c['name'] . '[' . $key . ']';
			$req      = $sub_req ? ' required' : '';
			$first    = false;

			if ( 'name' === $type && 'prefix' === $key ) {
				$titles = array_filter( array_map( 'trim', explode( ',', ! empty( $field['prefix_options'] ) ? $field['prefix_options'] : 'Mr, Mrs, Ms, Mx, Dr' ) ) );
				$input  = '<select name="' . esc_attr( $sub_name ) . '" id="' . esc_attr( $sub_id ) . '" class="' . esc_attr( $c['el_class'] . ' formglut-select' ) . '"' . $c['s']['input_style_str'] . '><option value="">—</option>';
				foreach ( $titles as $t ) {
					$input .= '<option value="' . esc_attr( $t ) . '">' . esc_html( $t ) . '</option>';
				}
				$input .= '</select>';
			} elseif ( 'country' === $key ) {
				$input = '<select name="' . esc_attr( $sub_name ) . '" id="' . esc_attr( $sub_id ) . '" class="' . esc_attr( $c['el_class'] . ' formglut-select' ) . '"' . $req . $c['s']['input_style_str'] . '><option value="">' . esc_html__( 'Select a country', 'formglut' ) . '</option>' . $this->country_options( array() ) . '</select>';
			} else {
				$input = '<input type="' . ( 'date_range' === $type ? 'date' : 'text' ) . '" name="' . esc_attr( $sub_name ) . '" id="' . esc_attr( $sub_id ) . '"' . ( '' !== $sub_ph ? ' placeholder="' . esc_attr( $sub_ph ) . '"' : '' ) . ' class="' . esc_attr( $c['el_class'] ) . '"' . $date_attrs . $req . $c['val_msg'] . $c['s']['input_style_str'] . ' />';
			}

			$full  = in_array( $key, array( 'street1', 'street2' ), true ) ? ' formglut-subfield-full' : '';
			$html .= '<div class="formglut-subfield formglut-subfield-' . esc_attr( $key ) . $full . '">'
				. ( '' !== $sub_label ? '<label class="formglut-sublabel" for="' . esc_attr( $sub_id ) . '">' . esc_html( $sub_label ) . '</label>' : '' )
				. $input . '</div>';
		}
		return $html . '</div>';
	}

	/**
	 * Render a terms or GDPR consent checkbox. Mirrors the editor canvas.
	 *
	 * @param array  $field            Field config.
	 * @param string $type             terms_conditions | gdpr_agreement.
	 * @param string $conditional_data Conditional logic data attribute.
	 * @param string $extra_classes    Container/CSS classes (leading space).
	 * @return string HTML.
	 */
	private function render_consent_field( $field, $type, $conditional_data, $extra_classes ) {
		$is_gdpr  = 'gdpr_agreement' === $type;
		$id       = isset( $field['id'] ) ? sanitize_text_field( $field['id'] ) : '';
		$name     = isset( $field['name_attribute'] ) && '' !== $field['name_attribute'] ? sanitize_text_field( $field['name_attribute'] ) : $id;
		$required = ! empty( $field['required'] );
		$mode     = isset( $field['display_type'] ) && in_array( $field['display_type'], array( 'box', 'modal', 'link', 'none' ), true ) ? $field['display_type'] : 'box';
		$label    = isset( $field['label'] ) ? esc_html( $field['label'] ) : '';
		$link     = '';
		$html     = '';

		if ( $is_gdpr && ! empty( $field['policy_url'] ) ) {
			$link = ' <a href="' . esc_url( $field['policy_url'] ) . '" target="_blank" rel="noopener noreferrer">' . esc_html__( 'Privacy Policy', 'formglut' ) . '</a>';
		} elseif ( ! $is_gdpr && 'modal' === $mode ) {
			$link = ' <a href="#" class="formglut-terms-open" data-dialog="' . esc_attr( $id ) . '_terms">' . esc_html( ! empty( $field['link_text'] ) ? $field['link_text'] : __( 'View Terms', 'formglut' ) ) . '</a>';
		} elseif ( ! $is_gdpr && 'link' === $mode && ! empty( $field['link_url'] ) ) {
			$link = ' <a href="' . esc_url( $field['link_url'] ) . '" target="_blank" rel="noopener noreferrer">' . esc_html( ! empty( $field['link_text'] ) ? $field['link_text'] : __( 'View Terms', 'formglut' ) ) . '</a>';
		}

		$content = ! $is_gdpr && ! empty( $field['terms_content'] ) ? wp_kses_post( $field['terms_content'] ) : '';
		$scroll  = ! $is_gdpr && 'box' === $mode && ! empty( $field['require_scroll'] ) && $content;

		if ( 'box' === $mode && $content ) {
			$html .= '<div class="formglut-terms-box"' . ( $scroll ? ' data-require-scroll="' . esc_attr( $id ) . '"' : '' ) . ' style="max-height:' . absint( ! empty( $field['scroll_height'] ) ? $field['scroll_height'] : 200 ) . 'px">' . $content . '</div>';
		}
		if ( $is_gdpr && ! empty( $field['policy_text'] ) ) {
			$html .= '<p class="formglut-choice-hint">' . esc_html( $field['policy_text'] ) . '</p>';
		}

		$checked = $is_gdpr && ! empty( $field['default_checked'] ) ? ' checked' : '';
		$el_cls  = ! empty( $field['element_class'] ) ? ' ' . implode( ' ', array_filter( array_map( 'sanitize_html_class', explode( ' ', $field['element_class'] ) ) ) ) : '';
		$right   = ! $is_gdpr && isset( $field['checkbox_position'] ) && 'right' === $field['checkbox_position'] ? ' formglut-consent-right' : '';
		$val_msg = ! empty( $field['validation_message'] ) ? ' data-validation-message="' . esc_attr( $field['validation_message'] ) . '"' : '';
		$html   .= '<label class="formglut-consent' . $right . '" for="' . esc_attr( $id ) . '">'
			. '<input type="checkbox" class="formglut-consent-input' . esc_attr( $el_cls ) . '" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" value="' . esc_attr__( 'Accepted', 'formglut' ) . '"' . ( $required ? ' required' : '' ) . $checked . ( $scroll ? ' disabled data-scroll-lock="1"' : '' ) . $val_msg . ' />'
			. '<span>' . $label . $link . ( $required ? ' <span class="formglut-required">*</span>' : '' ) . '</span></label>';

		if ( $is_gdpr ) {
			if ( ( ! isset( $field['show_storage_info'] ) || ! empty( $field['show_storage_info'] ) ) && ! empty( $field['storage_duration_text'] ) ) {
				$html .= '<p class="formglut-choice-hint">' . esc_html( str_replace( '{days}', (string) absint( isset( $field['storage_days'] ) ? $field['storage_days'] : 365 ), $field['storage_duration_text'] ) ) . '</p>';
			}
			if ( ! empty( $field['show_withdraw_link'] ) && ! empty( $field['withdraw_text'] ) ) {
				$mail  = ! empty( $field['withdraw_email'] ) && is_email( $field['withdraw_email'] ) ? ' <a href="mailto:' . esc_attr( $field['withdraw_email'] ) . '">' . esc_html( $field['withdraw_email'] ) . '</a>' : '';
				$html .= '<p class="formglut-choice-hint">' . esc_html( $field['withdraw_text'] ) . $mail . '</p>';
			}
		}
		if ( ! empty( $field['help_text'] ) ) {
			$html .= '<div class="formglut-help-text">' . esc_html( $field['help_text'] ) . '</div>';
		}
		if ( ! $is_gdpr && 'modal' === $mode ) {
			$html .= '<dialog class="formglut-terms-dialog" id="' . esc_attr( $id ) . '_terms"><div class="formglut-terms-dialog-head"><strong>' . esc_html( ! empty( $field['modal_title'] ) ? $field['modal_title'] : __( 'Terms & Conditions', 'formglut' ) ) . '</strong><button type="button" class="formglut-terms-close" aria-label="' . esc_attr__( 'Close', 'formglut' ) . '">&times;</button></div><div class="formglut-terms-dialog-body">' . $content . '</div></dialog>';
		}

		$classes = 'formglut-field formglut-field-' . $type . ( ! empty( $field['hidden'] ) ? ' formglut-hidden' : '' ) . $extra_classes;
		return '<div class="' . esc_attr( $classes ) . '"' . $conditional_data . '>' . $html . '</div>';
	}

	/**
	 * Render a section break, shortcode or action hook. Mirrors the editor canvas where possible.
	 *
	 * @param array  $field            Field config.
	 * @param string $type             Field type.
	 * @param string $conditional_data Conditional logic data attribute.
	 * @param string $extra_classes    Container/CSS classes (leading space).
	 * @return string HTML.
	 */
	private function render_block_field( $field, $type, $conditional_data, $extra_classes ) {
		$classes = 'formglut-field formglut-field-' . $type . ( ! empty( $field['hidden'] ) ? ' formglut-hidden' : '' ) . $extra_classes;
		$el_cls  = ! empty( $field['element_class'] ) ? ' ' . implode( ' ', array_filter( array_map( 'sanitize_html_class', explode( ' ', $field['element_class'] ) ) ) ) : '';

		if ( 'section_break' === $type ) {
			$align  = isset( $field['alignment'] ) && in_array( $field['alignment'], array( 'left', 'center', 'right' ), true ) ? $field['alignment'] : 'left';
			$bg     = ! empty( $field['background_color'] ) ? sanitize_hex_color( $field['background_color'] ) : '';
			$tc     = ! empty( $field['text_color'] ) ? sanitize_hex_color( $field['text_color'] ) : '';
			$tstyle = $tc ? ' style="color:' . esc_attr( $tc ) . '"' : '';
			$style  = 'text-align:' . $align . ( $bg ? ';background:' . $bg . ';padding:12px 16px;border-radius:8px' : '' );
			$toggle = '';
			if ( ! empty( $field['collapsible'] ) ) {
				$open      = isset( $field['toggle_text_open'] ) && '' !== $field['toggle_text_open'] ? $field['toggle_text_open'] : __( 'Hide', 'formglut' );
				$closed    = isset( $field['toggle_text_closed'] ) && '' !== $field['toggle_text_closed'] ? $field['toggle_text_closed'] : __( 'Show', 'formglut' );
				$collapsed = ! empty( $field['default_collapsed'] );
				$toggle    = '<button type="button" class="formglut-section-toggle" aria-expanded="' . ( $collapsed ? 'false' : 'true' ) . '" data-open="' . esc_attr( $open ) . '" data-closed="' . esc_attr( $closed ) . '">' . esc_html( $collapsed ? $closed : $open ) . '</button>';
			}
			$html = '<div class="formglut-section-head"><div class="formglut-section-text">'
				. ( ! empty( $field['title'] ) ? '<h3 class="' . esc_attr( 'formglut-section-title' . $el_cls ) . '"' . $tstyle . '>' . esc_html( $field['title'] ) . '</h3>' : '' )
				. ( ! empty( $field['description'] ) ? '<p class="formglut-section-desc"' . $tstyle . '>' . esc_html( $field['description'] ) . '</p>' : '' )
				. '</div>' . $toggle . '</div>';
			if ( ! empty( $field['show_divider'] ) ) {
				$ls    = isset( $field['divider_style'] ) && in_array( $field['divider_style'], array( 'solid', 'dashed', 'dotted' ), true ) ? $field['divider_style'] : 'solid';
				$dc    = ! empty( $field['divider_color'] ) ? sanitize_hex_color( $field['divider_color'] ) : '';
				$html .= '<hr class="formglut-section-divider" style="border-top-style:' . $ls . ';border-top-width:' . max( 1, absint( isset( $field['divider_thickness'] ) ? $field['divider_thickness'] : 1 ) ) . 'px' . ( $dc ? ';border-top-color:' . esc_attr( $dc ) : '' ) . '" />';
			}
			return '<div class="' . esc_attr( $classes . ( ! empty( $field['collapsible'] ) && ! empty( $field['default_collapsed'] ) ? ' formglut-section-collapsed' : '' ) ) . '" style="' . esc_attr( $style ) . '"' . $conditional_data . '>' . $html . '</div>';
		}

		$out = '';
		if ( 'shortcode' === $type ) {
			$code = isset( $field['shortcode_content'] ) ? (string) $field['shortcode_content'] : '';
			// Never nest FormGlut forms inside a form.
			if ( $code && ( ! isset( $field['run_shortcode'] ) || ! empty( $field['run_shortcode'] ) ) && false === stripos( $code, '[formglut' ) ) {
				$cache_key = ! empty( $field['cache_output'] ) ? 'formglut_sc_' . md5( $code ) : '';
				$out       = $cache_key ? get_transient( $cache_key ) : false;
				if ( false === $out ) {
					$out = do_shortcode( $code );
					if ( $cache_key ) {
						set_transient( $cache_key, $out, max( 60, absint( isset( $field['cache_duration'] ) ? $field['cache_duration'] : 3600 ) ) );
					}
				}
				if ( $out === $code ) {
					$out = '';
				}
			}
		} elseif ( 'action_hook' === $type && ! empty( $field['hook_name'] ) ) {
			ob_start();
			do_action( sanitize_key( $field['hook_name'] ), isset( $this->current_form_id ) ? $this->current_form_id : 0, $field );
			$out = ob_get_clean();
		}

		if ( '' === trim( (string) $out ) ) {
			$out = ! empty( $field['fallback_content'] ) ? esc_html( $field['fallback_content'] ) : '';
		}
		if ( '' === trim( (string) $out ) ) {
			return '';
		}
		return '<div class="' . esc_attr( $classes . $el_cls ) . '"' . $conditional_data . '>' . $out . '</div>'; // Shortcode / hook output is trusted site code.
	}

	/**
	 * Render a hidden field. The value may come from a URL parameter.
	 *
	 * @param array $field Field config.
	 * @return string HTML.
	 */
	private function render_hidden_field( $field ) {
		$id    = isset( $field['id'] ) ? sanitize_text_field( $field['id'] ) : '';
		$name  = isset( $field['name_attribute'] ) && '' !== $field['name_attribute'] ? sanitize_text_field( $field['name_attribute'] ) : $id;
		$value = isset( $field['default_value'] ) && ! is_array( $field['default_value'] ) ? (string) $field['default_value'] : '';
		$prefill = FormGlut_Form::prefill_value( $field );
		if ( null !== $prefill ) {
			$value = $prefill;
		}
		return '<input type="hidden" name="' . esc_attr( $name ) . '" id="' . esc_attr( $id ) . '" value="' . esc_attr( $value ) . '" />';
	}

	/**
	 * Inline style for a custom submit button (same rules as getSubmitButtonStyle() in the editor).
	 *
	 * @param array $field Field config.
	 * @return string CSS declarations.
	 */
	private function submit_button_style( $field ) {
		$color  = ! empty( $field['button_bg_color'] ) ? sanitize_hex_color( $field['button_bg_color'] ) : '#e94560';
		$tcolor = ! empty( $field['button_text_color'] ) ? sanitize_hex_color( $field['button_text_color'] ) : '';
		$sizes  = array( 'small' => array( '8px 16px', 13 ), 'medium' => array( '12px 24px', 15 ), 'large' => array( '14px 32px', 17 ) );
		$size   = isset( $field['button_size'], $sizes[ $field['button_size'] ] ) ? $sizes[ $field['button_size'] ] : $sizes['medium'];
		$radii  = array( 'square' => 0, 'rounded' => 8, 'pill' => 999 );
		$radius = isset( $field['button_shape'], $radii[ $field['button_shape'] ] ) ? $radii[ $field['button_shape'] ] : 8;
		$style  = isset( $field['button_style'] ) ? $field['button_style'] : 'primary';

		if ( 'outline' === $style ) {
			$look = 'background:transparent;color:' . ( $tcolor ? $tcolor : $color ) . ';border-color:' . $color;
		} elseif ( 'secondary' === $style ) {
			$bg   = ! empty( $field['button_bg_color'] ) ? $color : '#f1f5f9';
			$look = 'background:' . $bg . ';color:' . ( $tcolor ? $tcolor : '#334155' ) . ';border-color:' . ( ! empty( $field['button_bg_color'] ) ? $color : '#e2e8f0' );
		} else {
			$look = 'background:' . $color . ';color:' . ( $tcolor ? $tcolor : '#fff' ) . ';border-color:' . $color;
		}

		return 'padding:' . $size[0] . ';font-size:' . $size[1] . 'px;border-radius:' . $radius . 'px;border-width:1px;border-style:solid;font-weight:600;cursor:pointer;width:' . ( isset( $field['button_width'] ) && 'full' === $field['button_width'] ? '100%' : 'auto' ) . ';' . $look;
	}

	/**
	 * Render the custom submit button field.
	 *
	 * @param array  $field            Field config.
	 * @param string $conditional_data Conditional logic data attribute.
	 * @param string $extra_classes    Container/CSS classes (leading space).
	 * @return string HTML.
	 */
	private function render_submit_field( $field, $conditional_data, $extra_classes ) {
		$align   = isset( $field['button_alignment'] ) && in_array( $field['button_alignment'], array( 'left', 'center', 'right' ), true ) ? $field['button_alignment'] : 'left';
		$text    = ! empty( $field['button_text'] ) ? $field['button_text'] : __( 'Submit', 'formglut' );
		$attrs   = ( ! empty( $field['loading_text'] ) ? ' data-loading-text="' . esc_attr( $field['loading_text'] ) . '"' : '' )
			. ( ! empty( $field['require_confirmation'] ) ? ' data-confirm="' . esc_attr( ! empty( $field['confirm_message'] ) ? $field['confirm_message'] : __( 'Are you sure you want to submit?', 'formglut' ) ) . '"' : '' );
		$classes = 'formglut-field formglut-field-custom_submit_button formglut-form-actions' . ( ! empty( $field['hidden'] ) ? ' formglut-hidden' : '' ) . $extra_classes;
		return '<div class="' . esc_attr( $classes ) . '" style="text-align:' . esc_attr( $align ) . '"' . $conditional_data . '>'
			. '<button type="submit" class="' . esc_attr( trim( 'formglut-submit-btn formglut-custom-submit ' . ( isset( $field['element_class'] ) ? $field['element_class'] : '' ) ) ) . '" style="' . esc_attr( $this->submit_button_style( $field ) ) . '"' . $attrs . '>'
			. '<span class="formglut-btn-text">' . esc_html( $text ) . '</span><span class="formglut-btn-spinner" style="display:none;">&nbsp;&hellip;</span></button></div>';
	}

	/**
	 * Render a captcha widget and enqueue its provider script.
	 *
	 * @param array  $field         Field config.
	 * @param string $type          recaptcha | hcaptcha | turnstile.
	 * @param string $extra_classes Container/CSS classes (leading space).
	 * @return string HTML.
	 */
	private function render_captcha_field( $field, $type, $extra_classes ) {
		$cfg   = FormGlut_Settings::captcha( $type );
		$names = array( 'recaptcha' => 'reCAPTCHA', 'hcaptcha' => 'hCaptcha', 'turnstile' => 'Cloudflare Turnstile' );

		if ( ! $cfg['ready'] ) {
			if ( current_user_can( 'manage_options' ) ) {
				/* translators: %s: captcha provider name */
				return '<div class="formglut-field formglut-captcha-notice">' . esc_html( sprintf( __( '%s keys are not set, so this check is skipped. Add them in FormGlut → Settings. (Only admins see this.)', 'formglut' ), $names[ $type ] ) ) . '</div>';
			}
			return '';
		}

		$theme   = isset( $field['theme'] ) ? sanitize_key( $field['theme'] ) : '';
		$size    = isset( $field['size'] ) ? sanitize_key( $field['size'] ) : 'normal';
		$classes = 'formglut-field formglut-field-' . $type . ' formglut-captcha' . $extra_classes;
		$msg     = ! empty( $field['validation_message'] ) ? ' data-validation-message="' . esc_attr( $field['validation_message'] ) . '"' : '';
		$key     = ' data-sitekey="' . esc_attr( $cfg['site_key'] ) . '"';

		if ( 'recaptcha' === $type ) {
			if ( 'v2' === FormGlut_Settings::get( 'formglut_recaptcha_version', 'v3' ) ) {
				wp_enqueue_script( 'formglut-recaptcha', 'https://www.google.com/recaptcha/api.js', array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
				return '<div class="' . esc_attr( $classes ) . '"' . $msg . '><div class="g-recaptcha" data-captcha="recaptcha-v2"' . $key . ' data-theme="' . esc_attr( $theme ? $theme : 'light' ) . '" data-size="' . esc_attr( $size ) . '"></div></div>';
			}
			wp_enqueue_script( 'formglut-recaptcha', 'https://www.google.com/recaptcha/api.js?render=' . rawurlencode( $cfg['site_key'] ), array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
			return '<div class="' . esc_attr( $classes . ' formglut-captcha-invisible' ) . '" data-captcha="recaptcha-v3"' . $key . $msg . '></div>';
		}

		if ( 'hcaptcha' === $type ) {
			wp_enqueue_script( 'formglut-hcaptcha', 'https://js.hcaptcha.com/1/api.js', array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
			return '<div class="' . esc_attr( $classes ) . '"' . $msg . '><div class="h-captcha" data-captcha="hcaptcha"' . $key . ' data-theme="' . esc_attr( $theme ? $theme : 'light' ) . '" data-size="' . esc_attr( $size ) . '"></div></div>';
		}

		wp_enqueue_script( 'formglut-turnstile', 'https://challenges.cloudflare.com/turnstile/v0/api.js', array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		$appearance = isset( $field['appearance'] ) && 'interaction-only' === $field['appearance'] ? 'interaction-only' : 'always';
		return '<div class="' . esc_attr( $classes ) . '"' . $msg . '><div class="cf-turnstile" data-captcha="turnstile"' . $key . ' data-theme="' . esc_attr( $theme ? $theme : 'auto' ) . '" data-size="' . esc_attr( $size ) . '" data-appearance="' . esc_attr( $appearance ) . '"></div></div>';
	}

	/**
	 * Render a display-only field (custom HTML or heading). Mirrors the editor canvas.
	 *
	 * @param array  $field            Field config.
	 * @param string $type             html | heading.
	 * @param string $conditional_data Conditional logic data attribute.
	 * @param string $extra_classes    Container/CSS classes (leading space).
	 * @return string HTML.
	 */
	private function render_display_field( $field, $type, $conditional_data, $extra_classes ) {
		$hidden  = ! empty( $field['hidden'] ) ? ' formglut-hidden' : '';
		$el_cls  = ! empty( $field['element_class'] ) ? ' ' . implode( ' ', array_filter( array_map( 'sanitize_html_class', explode( ' ', $field['element_class'] ) ) ) ) : '';

		if ( 'html' === $type ) {
			$content = isset( $field['html_content'] ) ? wp_kses_post( $field['html_content'] ) : '';
			if ( ! empty( $field['enable_shortcodes'] ) && false === stripos( $content, '[formglut' ) ) {
				$content = do_shortcode( $content );
			}
			return '<div class="' . esc_attr( 'formglut-field formglut-field-html formglut-html-content' . $hidden . $extra_classes . $el_cls ) . '"' . $conditional_data . '>' . $content . '</div>';
		}

		$tag     = isset( $field['heading_level'] ) && in_array( $field['heading_level'], array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ), true ) ? $field['heading_level'] : 'h2';
		$align   = isset( $field['alignment'] ) && in_array( $field['alignment'], array( 'left', 'center', 'right' ), true ) ? $field['alignment'] : 'left';
		$color   = ! empty( $field['custom_color'] ) ? sanitize_hex_color( $field['custom_color'] ) : '';
		$text    = isset( $field['text'] ) && '' !== $field['text'] ? $field['text'] : ( isset( $field['label'] ) ? $field['label'] : '' );
		$html    = '<div class="' . esc_attr( 'formglut-field formglut-field-heading formglut-heading' . $hidden . $extra_classes ) . '" style="text-align:' . esc_attr( $align ) . '"' . $conditional_data . '>';
		$html   .= '<' . $tag . ' class="' . esc_attr( 'formglut-heading-text' . $el_cls ) . '"' . ( $color ? ' style="color:' . esc_attr( $color ) . '"' : '' ) . '>' . esc_html( $text ) . '</' . $tag . '>';
		if ( ! empty( $field['description'] ) ) {
			$html .= '<p class="formglut-heading-desc">' . esc_html( $field['description'] ) . '</p>';
		}
		if ( ! empty( $field['show_divider'] ) ) {
			$style = isset( $field['divider_style'] ) && in_array( $field['divider_style'], array( 'solid', 'dashed', 'dotted' ), true ) ? $field['divider_style'] : 'solid';
			$dcol  = ! empty( $field['divider_color'] ) ? sanitize_hex_color( $field['divider_color'] ) : '';
			$html .= '<hr class="formglut-heading-divider" style="border-top-style:' . esc_attr( $style ) . ( $dcol ? ';border-top-color:' . esc_attr( $dcol ) : '' ) . '" />';
		}
		return $html . '</div>';
	}

	/**
	 * Wrap an input with its prefix/suffix labels, if any.
	 *
	 * @param array  $field Field config.
	 * @param string $input Input HTML.
	 * @return string
	 */
	private function with_affixes( $field, $input ) {
		$prefix = isset( $field['prefix_label'] ) ? (string) $field['prefix_label'] : '';
		$suffix = isset( $field['suffix_label'] ) ? (string) $field['suffix_label'] : '';
		if ( '' === $prefix && '' === $suffix ) {
			return $input;
		}
		return '<div class="formglut-input-group">'
			. ( '' !== $prefix ? '<span class="formglut-input-prefix">' . wp_kses_post( $prefix ) . '</span>' : '' )
			. $input
			. ( '' !== $suffix ? '<span class="formglut-input-suffix">' . wp_kses_post( $suffix ) . '</span>' : '' )
			. '</div>';
	}

	/**
	 * Build an <option> tag.
	 *
	 * @param array $opt      Option config.
	 * @param array $defaults Selected values.
	 * @return string
	 */
	private function option_tag( $opt, $defaults ) {
		$opt_label = isset( $opt['label'] ) ? $opt['label'] : '';
		$opt_value = isset( $opt['value'] ) && '' !== $opt['value'] ? (string) $opt['value'] : $opt_label;
		return '<option value="' . esc_attr( $opt_value ) . '"' . ( in_array( $opt_value, $defaults, true ) ? ' selected' : '' ) . ( ! empty( $opt['disabled'] ) ? ' disabled' : '' ) . '>' . esc_html( $opt_label ) . '</option>';
	}

	/**
	 * Data attributes carrying min/max selection limits for the frontend script.
	 *
	 * @param array $field Field config.
	 * @return string
	 */
	private function selection_data( $field ) {
		$min = isset( $field['min_selections'] ) ? absint( $field['min_selections'] ) : 0;
		$max = isset( $field['max_selections'] ) ? absint( $field['max_selections'] ) : 0;
		return ( $min ? ' data-min-selections="' . $min . '"' : '' ) . ( $max ? ' data-max-selections="' . $max . '"' : '' );
	}

	/**
	 * Hint describing min/max selection limits (same wording as the editor).
	 *
	 * @param array $field Field config.
	 * @return string HTML.
	 */
	private function selection_hint( $field ) {
		$min = isset( $field['min_selections'] ) ? absint( $field['min_selections'] ) : 0;
		$max = isset( $field['max_selections'] ) ? absint( $field['max_selections'] ) : 0;
		if ( $min && $max ) {
			/* translators: 1: minimum, 2: maximum */
			$text = sprintf( __( 'Select between %1$d and %2$d options', 'formglut' ), $min, $max );
		} elseif ( $min ) {
			/* translators: %d: minimum */
			$text = sprintf( __( 'Select at least %d options', 'formglut' ), $min );
		} elseif ( $max ) {
			/* translators: %d: maximum */
			$text = sprintf( __( 'Select up to %d options', 'formglut' ), $max );
		} else {
			return '';
		}
		return '<div class="formglut-choice-hint">' . esc_html( $text ) . '</div>';
	}

	/**
	 * Input mask for a phone field's format (same masks as the editor).
	 *
	 * @param array $field Field config.
	 * @return string
	 */
	public function phone_mask( $field ) {
		$format = isset( $field['phone_format'] ) ? $field['phone_format'] : '';
		if ( 'custom' === $format ) {
			return isset( $field['custom_format'] ) ? (string) $field['custom_format'] : '';
		}
		$masks = array( 'us' => '(999) 999-9999', 'uk' => '9999 999999' );
		return isset( $masks[ $format ] ) ? $masks[ $format ] : '';
	}

	/**
	 * Append declarations to a ' style="..."' attribute string.
	 *
	 * @param string $style_attr Existing attribute (may be empty).
	 * @param string $extra      Extra CSS declarations.
	 * @return string
	 */
	private function merge_style( $style_attr, $extra ) {
		if ( '' === $style_attr ) {
			return ' style="' . esc_attr( $extra ) . '"';
		}
		return preg_replace( '/"$/', ';' . esc_attr( $extra ) . '"', $style_attr );
	}

	/**
	 * Build a numeric HTML attribute, omitted when the value is empty or non-numeric.
	 *
	 * @param string $attr  Attribute name.
	 * @param mixed  $value Value.
	 * @return string
	 */
	private function num_attr( $attr, $value ) {
		return ( '' !== $value && null !== $value && is_numeric( $value ) ) ? ' ' . $attr . '="' . esc_attr( $value ) . '"' : '';
	}

	/**
	 * Build <option> tags for a country field, honouring include/exclude and top-country settings.
	 *
	 * @param array $field Field config.
	 * @return string Escaped HTML.
	 */
	private function country_options( $field ) {
		static $countries = null;
		if ( null === $countries ) {
			$countries = include FORMGLUT_PLUGIN_DIR . 'includes/data/countries.php';
		}

		$list = $countries;
		$mode = isset( $field['country_list'] ) ? $field['country_list'] : 'all';
		if ( 'include' === $mode && ! empty( $field['included_countries'] ) ) {
			$list = array_intersect_key( $countries, array_flip( (array) $field['included_countries'] ) );
		} elseif ( 'exclude' === $mode && ! empty( $field['excluded_countries'] ) ) {
			$list = array_diff_key( $countries, array_flip( (array) $field['excluded_countries'] ) );
		}

		$format   = isset( $field['display_format'] ) ? $field['display_format'] : 'name';
		$flags    = isset( $field['flag_type'] ) && 'emoji' === $field['flag_type'];
		$selected = isset( $field['default_value'] ) ? (string) $field['default_value'] : '';

		$option = function ( $code, $name ) use ( $format, $flags, $selected ) {
			$text = 'code' === $format ? $code : ( 'both' === $format ? $name . ' (' . $code . ')' : $name );
			if ( $flags ) {
				$flag = '';
				foreach ( str_split( $code ) as $char ) {
					$flag .= mb_chr( 0x1F1E6 + ord( $char ) - 65, 'UTF-8' );
				}
				$text = $flag . ' ' . $text;
			}
			return '<option value="' . esc_attr( $code ) . '"' . selected( $selected, $code, false ) . '>' . esc_html( $text ) . '</option>';
		};

		$html = '';
		$top  = array_intersect_key( $list, array_flip( isset( $field['top_countries'] ) ? (array) $field['top_countries'] : array() ) );
		foreach ( $top as $code => $name ) {
			$html .= $option( $code, $name );
		}
		if ( $top ) {
			$html .= '<option disabled>──────────</option>';
		}
		foreach ( $list as $code => $name ) {
			$html .= $option( $code, $name );
		}
		return $html;
	}

	/**
	 * Render a column container and its nested fields.
	 *
	 * @param array $field Container definition.
	 * @return string HTML.
	 */
	private function render_container( $field ) {
		$gaps    = array( 'none' => 0, 'small' => 8, 'medium' => 16, 'large' => 24 );
		$gap_key = isset( $field['gap'] ) ? sanitize_key( $field['gap'] ) : 'medium';
		$gap     = isset( $gaps[ $gap_key ] ) ? $gaps[ $gap_key ] : 16;
		$classes = 'formglut-columns';
		if ( ! isset( $field['responsive_stack'] ) || $field['responsive_stack'] ) {
			$classes .= ' formglut-columns-stack';
		}
		if ( ! empty( $field['container_class'] ) ) {
			$classes .= ' ' . implode( ' ', array_map( 'sanitize_html_class', explode( ' ', $field['container_class'] ) ) );
		}

		$html = '<div class="' . esc_attr( trim( $classes ) ) . '" style="gap:' . absint( $gap ) . 'px;">';
		foreach ( $field['columns'] as $column ) {
			$width = isset( $column['width'] ) ? max( 1, (float) $column['width'] ) : 1;
			$html .= '<div class="formglut-column" style="flex:' . esc_attr( $width ) . ' 1 0%;">';
			foreach ( ( isset( $column['fields'] ) ? (array) $column['fields'] : array() ) as $child ) {
				if ( FormGlut_Form::is_container( $child ) ) {
					continue;
				}
				$html .= $this->render_field( $child );
			}
			$html .= '</div>';
		}
		$html .= '</div>';

		return $html;
	}

	/**
	 * Render a honeypot field for spam protection.
	 * Hidden from real users; bots fill it and get rejected.
	 *
	 * @return string HTML.
	 */
	private function render_honeypot() {
		return '<div class="formglut-hp" style="position:absolute;left:-9999px;opacity:0;height:0;overflow:hidden;"><label>' . esc_html__( 'Do not fill this field', 'formglut' ) . '</label><input type="text" name="formglut_hp" tabindex="-1" autocomplete="off" /></div>';
	}

	/**
	 * Add module type to frontend script tag.
	 *
	 * @param string $tag    The script tag.
	 * @param string $handle The script handle.
	 * @param string $src    The script source URL.
	 * @return string Modified script tag.
	 */
	public function add_module_type( $tag, $handle, $src ) {
		if ( 'formglut-frontend' === $handle ) {
			return str_replace( '<script ', '<script type="module" ', $tag );
		}
		return $tag;
	}
}
