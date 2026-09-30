<?php
/**
 * Elementor widget: FormGlut Form.
 *
 * Loaded only when Elementor is active (see FormGlut_Block::elementor()).
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Elementor_Widget class.
 */
class FormGlut_Elementor_Widget extends \Elementor\Widget_Base {

	/**
	 * Widget slug.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'formglut_form';
	}

	/**
	 * Widget title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'FormGlut Form', 'formglut' );
	}

	/**
	 * Widget icon.
	 *
	 * @return string
	 */
	public function get_icon() {
		return 'eicon-form-horizontal';
	}

	/**
	 * Panel categories.
	 *
	 * @return string[]
	 */
	public function get_categories() {
		return array( 'general' );
	}

	/**
	 * Search keywords.
	 *
	 * @return string[]
	 */
	public function get_keywords() {
		return array( 'form', 'contact', 'formglut' );
	}

	/**
	 * Controls: pick the form.
	 *
	 * @return void
	 */
	protected function register_controls() {
		$options = array( '' => __( '— Select a form —', 'formglut' ) );
		$result  = FormGlut_Form::get_all( array( 'per_page' => 500, 'orderby' => 'title', 'order' => 'ASC' ) );
		foreach ( $result['forms'] as $form ) {
			$options[ (string) $form->id ] = $form->title . ( in_array( $form->status, array( 'active', 'published' ), true ) ? '' : ' (' . $form->status . ')' );
		}

		$this->start_controls_section( 'formglut_section', array( 'label' => __( 'Form', 'formglut' ) ) );
		$this->add_control(
			'form_id',
			array(
				'label'   => __( 'Form', 'formglut' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'options' => $options,
				'default' => '',
			)
		);
		$this->end_controls_section();
	}

	/**
	 * Output the form.
	 *
	 * @return void
	 */
	protected function render() {
		$id = absint( $this->get_settings_for_display( 'form_id' ) );
		if ( ! $id ) {
			if ( \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
				echo '<p style="padding:16px;border:1px dashed #cbd5e1;border-radius:8px;color:#64748b">' . esc_html__( 'Choose a form in the widget settings.', 'formglut' ) . '</p>';
			}
			return;
		}
		echo FormGlut_Block::render( array( 'formId' => $id ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- form HTML is escaped when built.
	}
}
