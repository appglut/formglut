<?php
/**
 * FormGlut Gutenberg block ("FormGlut Form").
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Block class.
 */
class FormGlut_Block {

	/**
	 * Hook the block in.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register' ) );
		add_action( 'elementor/widgets/register', array( __CLASS__, 'elementor' ) );
	}

	/**
	 * Register the Elementor widget (only runs when Elementor is active).
	 *
	 * @param \Elementor\Widgets_Manager $manager Widgets manager.
	 * @return void
	 */
	public static function elementor( $manager ) {
		require_once FORMGLUT_PLUGIN_DIR . 'includes/elementor/class-formglut-elementor-widget.php';
		$manager->register( new FormGlut_Elementor_Widget() );
	}

	/**
	 * Register the editor script, the block and its server render.
	 *
	 * @return void
	 */
	public static function register() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		wp_register_script(
			'formglut-block',
			FORMGLUT_PLUGIN_URL . 'global-assets/blocks/form-block.js',
			array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-components', 'wp-block-editor', 'wp-server-side-render' ),
			FORMGLUT_VERSION,
			true
		);
		wp_set_script_translations( 'formglut-block', 'formglut', FORMGLUT_PLUGIN_DIR . 'languages' );

		$css = FORMGLUT_PLUGIN_DIR . 'resources/assets/form-frontend.css';
		if ( file_exists( $css ) ) {
			wp_register_style( 'formglut-block-preview', FORMGLUT_PLUGIN_URL . 'resources/assets/form-frontend.css', array(), FORMGLUT_VERSION );
		}

		register_block_type(
			'formglut/form',
			array(
				'api_version'     => 3,
				'editor_script'   => 'formglut-block',
				'editor_style'    => file_exists( $css ) ? 'formglut-block-preview' : null,
				'attributes'      => array(
					'formId'    => array( 'type' => 'number', 'default' => 0 ),
					'align'     => array( 'type' => 'string', 'default' => '' ),
					'className' => array( 'type' => 'string', 'default' => '' ),
				),
				'render_callback' => array( __CLASS__, 'render' ),
			)
		);

		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'editor_data' ) );
	}

	/**
	 * Give the editor script the list of forms.
	 *
	 * @return void
	 */
	public static function editor_data() {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return;
		}
		$result = FormGlut_Form::get_all( array( 'per_page' => 500, 'orderby' => 'title', 'order' => 'ASC' ) );
		$forms  = array();
		foreach ( $result['forms'] as $form ) {
			$forms[] = array( 'id' => (int) $form->id, 'title' => $form->title, 'status' => $form->status );
		}
		wp_add_inline_script(
			'formglut-block',
			'window.formglutBlock = ' . wp_json_encode( array(
				'forms'   => $forms,
				'editUrl' => admin_url( 'admin.php?page=formglut-editor' ),
				'newUrl'  => admin_url( 'admin.php?page=formglut-editor' ),
			) ) . ';',
			'before'
		);
	}

	/**
	 * Render the selected form (same output as the shortcode).
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	public static function render( $attributes ) {
		$id = isset( $attributes['formId'] ) ? absint( $attributes['formId'] ) : 0;
		if ( ! $id ) {
			return '';
		}
		$html = FormGlut_Shortcode::get_instance()->render( array( 'id' => $id ) );
		if ( '' === $html && defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			return '<p style="padding:16px;border:1px dashed #cbd5e1;border-radius:8px;color:#64748b">' . esc_html__( 'This form is not active, so it is hidden on the site. Set it to Active to show it.', 'formglut' ) . '</p>';
		}
		$classes = trim( 'wp-block-formglut-form' . ( ! empty( $attributes['align'] ) ? ' align' . sanitize_html_class( $attributes['align'] ) : '' ) . ( ! empty( $attributes['className'] ) ? ' ' . esc_attr( $attributes['className'] ) : '' ) );
		return '<div class="' . esc_attr( $classes ) . '">' . $html . '</div>';
	}
}
