<?php
/**
 * FormGlut Admin.
 *
 * Registers admin menus, enqueues assets, and renders admin pages.
 *
 * @package FormGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * FormGlut_Admin class.
 */
class FormGlut_Admin {

	/**
	 * Single instance.
	 *
	 * @var FormGlut_Admin|null
	 */
	private static $instance = null;

	/**
	 * Get singleton instance.
	 *
	 * @return FormGlut_Admin
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor — wire up hooks.
	 */
	private function __construct() {
		add_action( 'admin_menu', array( $this, 'register_menus' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_action( 'admin_head', array( $this, 'menu_icon_styles' ) );
		add_filter( 'admin_body_class', array( $this, 'add_body_class' ) );
		add_filter( 'script_loader_tag', array( $this, 'add_module_attribute' ), 10, 3 );
	}

	/**
	 * Register admin menu pages.
	 *
	 * @return void
	 */
	public function register_menus() {
		// Top-level menu — All Forms.
		add_menu_page(
			__( 'FormGlut — All Forms', 'formglut' ),
			__( 'FormGlut', 'formglut' ),
			'manage_options',
			'formglut-all-forms',
			array( $this, 'render_all_forms_page' ),
			FORMGLUT_PLUGIN_URL . 'global-assets/images/logo.svg',
			20
		);

		// Submenu — All Forms (renames the default top-level item).
		add_submenu_page(
			'formglut-all-forms',
			__( 'All Forms', 'formglut' ),
			__( 'All Forms', 'formglut' ),
			'manage_options',
			'formglut-all-forms',
			array( $this, 'render_all_forms_page' )
		);

		// Submenu — Add New Form.
		add_submenu_page(
			'formglut-all-forms',
			__( 'Add New Form', 'formglut' ),
			__( 'Add New', 'formglut' ),
			'manage_options',
			'formglut-editor',
			array( $this, 'render_editor_page' )
		);

		// Submenu — Entries.
		add_submenu_page(
			'formglut-all-forms',
			__( 'Entries', 'formglut' ),
			__( 'Entries', 'formglut' ),
			'manage_options',
			'formglut-entries',
			array( $this, 'render_entries_page' )
		);

		// Submenu — Settings.
		add_submenu_page(
			'formglut-all-forms',
			__( 'Settings', 'formglut' ),
			__( 'Settings', 'formglut' ),
			'manage_options',
			'formglut-settings',
			array( $this, 'render_settings_page' )
		);

		// Hidden submenu — Entry Detail (no menu item shown).
		add_submenu_page(
			'__formglut_does_not_exist',
			__( 'Entry Detail', 'formglut' ),
			'',
			'manage_options',
			'formglut-entry-detail',
			array( $this, 'render_entry_detail_page' )
		);

		// Hidden submenu - Form Preview.
		add_submenu_page(
			'__formglut_does_not_exist',
			__( 'Form Preview', 'formglut' ),
			'',
			'manage_options',
			'formglut-preview',
			array( $this, 'render_preview_page' )
		);
	}

	/**
	 * Enqueue admin assets only on FormGlut pages.
	 *
	 * @param string $hook The current admin page hook.
	 * @return void
	 */
	public function menu_icon_styles() {
		?>
		<style>
			#adminmenu .toplevel_page_formglut-all-forms .wp-menu-image img {
				opacity: 1 !important;
			}
			#adminmenu .toplevel_page_formglut-all-forms:hover .wp-menu-image img,
			#adminmenu .toplevel_page_formglut-all-forms.wp-has-current-submenu .wp-menu-image img {
				opacity: 1 !important;
			}
		</style>
		<?php
	}

	public function enqueue_assets( $hook ) {
		// Don't load admin assets on preview page - it has its own frontend assets.
		if ( isset( $_GET['page'] ) && 'formglut-preview' === sanitize_text_field( wp_unslash( $_GET['page'] ) ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return;
		}

		if ( ! $this->is_formglut_page( $hook ) ) {
			return;
		}

		// Map page slugs to their Vite build entry points.
		$page      = isset( $_GET['page'] ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$entry_map = array(
			'formglut-all-forms'              => 'all-forms',
			'formglut-editor'       => 'form-editor',
			'formglut-entries'      => 'entries',
			'formglut-settings'     => 'settings',
			'formglut-entry-detail' => 'single-entry',
		);

		$entry = isset( $entry_map[ $page ] ) ? $entry_map[ $page ] : 'all-forms';
		$build_url  = FORMGLUT_PLUGIN_URL . 'resources';
		$build_path = FORMGLUT_PLUGIN_DIR . 'resources';

		$script_handle = "formglut-{$entry}";

		// Enqueue React and ReactDOM (WordPress includes these).
		wp_enqueue_script( 'wp-i18n' );

		// Enqueue the page-specific built JS.
		if ( file_exists( $build_path . '/' . $entry . '.js' ) ) {
			wp_enqueue_script(
				$script_handle,
				$build_url . '/' . $entry . '.js',
				array( 'wp-i18n', 'wp-i18n' ),
				FORMGLUT_VERSION,
				true
			);
			wp_set_script_translations( $script_handle, 'formglut', FORMGLUT_PLUGIN_DIR . 'languages' );
		}

		// Enqueue all built CSS files.
		$css_files = glob( $build_path . '/assets/*.css' );
		if ( $css_files ) {
			foreach ( $css_files as $css_file ) {
				$css_name = pathinfo( $css_file, PATHINFO_FILENAME );
				wp_enqueue_style(
					"formglut-{$css_name}",
					$build_url . '/assets/' . basename( $css_file ),
					array(),
					FORMGLUT_VERSION
				);
			}
		}

		// Localize data for JS.
		$localize_data = array(
			'ajax_url'   => admin_url( 'admin-ajax.php' ),
			'nonce'      => wp_create_nonce( 'formglut_nonce' ),
			'rest_url'   => rest_url( 'formglut/v1/' ),
			'rest_nonce' => wp_create_nonce( 'wp_rest' ),
			'pages'      => array(
				'all_forms'    => admin_url( 'admin.php?page=formglut-all-forms' ),
				'editor'       => admin_url( 'admin.php?page=formglut-editor' ),
				'entries'      => admin_url( 'admin.php?page=formglut-entries' ),
				'settings'     => admin_url( 'admin.php?page=formglut-settings' ),
				'entry_detail' => admin_url( 'admin.php?page=formglut-entry-detail' ),
					'preview'      => admin_url( 'admin.php?page=formglut-preview' ),
			),
			'plugin_url'   => FORMGLUT_PLUGIN_URL,
			'dashboard_url' => admin_url( 'index.php' ),
			'pro_enabled'  => formglut_is_pro_enabled(),
		);

		// Pass editor context when editing an existing form.
		if ( 'formglut-editor' === $page && isset( $_GET['form_id'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$localize_data['form_id'] = absint( $_GET['form_id'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		}

		// Pass entry context when viewing a single entry.
		if ( 'formglut-entry-detail' === $page && isset( $_GET['entry_id'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$localize_data['entry_id'] = absint( $_GET['entry_id'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		}

		// Pass form filter for entries page.
		if ( 'formglut-entries' === $page && isset( $_GET['form_id'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$localize_data['filter_form_id'] = absint( $_GET['form_id'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		}

		if ( wp_script_is( $script_handle, 'enqueued' ) ) {
			wp_localize_script( $script_handle, 'formglut_admin', $localize_data );
		} else {
			wp_register_script( 'formglut-bootstrap', '', array(), FORMGLUT_VERSION, false );
			wp_enqueue_script( 'formglut-bootstrap' );
			wp_localize_script( 'formglut-bootstrap', 'formglut_admin', $localize_data );
		}
	}

	/**
	 * Add type="module" to FormGlut scripts for ES module support.
	 *
	 * @param string $tag    The script tag.
	 * @param string $handle The script handle.
	 * @param string $src    The script source.
	 * @return string
	 */
	public function add_module_attribute( $tag, $handle, $src ) {
		$formglut_handles = array(
			'formglut-all-forms',
			'formglut-form-editor',
			'formglut-entries',
			'formglut-settings',
			'formglut-single-entry',
			'formglut-preview',
			'formglut-frontend',
		);

		if ( in_array( $handle, $formglut_handles, true ) ) {
			$tag = str_replace( '<script ', '<script type="module" ', $tag );
		}

		return $tag;
	}

	/**
	 * Add custom body class on FormGlut admin pages.
	 *
	 * @param string $classes Existing body classes.
	 * @return string
	 */
	public function add_body_class( $classes ) {
		$screen = get_current_screen();
		if ( $screen && ( strpos( $screen->id, 'formglut' ) !== false || isset( $_GET['page'] ) && 0 === strpos( sanitize_text_field( wp_unslash( $_GET['page'] ) ), 'formglut' ) ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$classes .= ' formglut-admin-page';
		}
		return $classes;
	}

	/* ── Page Renderers ───────────────────────────────────────────────────── */

	/**
	 * Render All Forms page.
	 *
	 * @return void
	 */
	public function render_all_forms_page() {
		$this->render_page( 'all-forms.html' );
	}

	/**
	 * Render Form Editor page.
	 *
	 * @return void
	 */
	public function render_editor_page() {
		$this->render_page( 'form-editor.html' );
	}

	/**
	 * Render Entries page.
	 *
	 * @return void
	 */
	public function render_entries_page() {
		$this->render_page( 'entries.html' );
	}

	/**
	 * Render Settings page.
	 *
	 * @return void
	 */
	public function render_settings_page() {
		$this->render_page( 'settings.html' );
	}

	/**
	 * Render Entry Detail page (hidden — no menu item).
	 *
	 * @return void
	 */
	public function render_entry_detail_page() {
		$this->render_page( 'single-entry.html' );
	}

	/**
	 * Render a page from formglut_simple/ HTML templates.
	 *
	 * @param string $template_file File name (e.g. 'all-forms.html').
	 * @return void
	 */
	public function render_preview_page() {
		$form_id = isset( $_GET['form_id'] ) ? absint( $_GET['form_id'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( ! $form_id ) {
			wp_die( esc_html__( 'Missing form ID.', 'formglut' ) );
		}
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized access.', 'formglut' ) );
		}

		$form = FormGlut_Form::get( $form_id );
		$form_title = $form ? $form->title : '';

		$css_url = FORMGLUT_PLUGIN_URL . 'resources/assets/form-frontend.css';
		$js_url  = FORMGLUT_PLUGIN_URL . 'resources/form-frontend.js';

		wp_register_style( 'formglut-preview', $css_url, array(), FORMGLUT_VERSION );
		wp_print_styles( 'formglut-preview' );
		if ( file_exists( FORMGLUT_PLUGIN_DIR . 'resources/form-frontend.js' ) ) {
			$submit_nonce = wp_create_nonce( 'formglut_submit_nonce' );
			wp_register_script( 'formglut-preview', $js_url, array(), FORMGLUT_VERSION, false );
			wp_localize_script( 'formglut-preview', 'formglutFrontend', array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => $submit_nonce,
			) );
			wp_print_scripts( 'formglut-preview' );
		}
			?>
			<style>
				body { background: #f5f6fa; margin: 0; }
				#adminmenumain, #wpadminbar, #wpfooter, .update-nag, .notice { display: none !important; }
				html.wp-toolbar { padding-top: 0 !important; }
				#wpcontent { margin-left: 0 !important; padding: 0 !important; }
				#wpbody { padding-top: 0 !important; }
				.formglut-form-title { display: none; }
				.fg-preview-header {
					background: #fff; border-bottom: 1px solid #e5e7eb; padding: 12px 24px;
					display: flex !important; align-items: center !important; justify-content: center !important; gap: 20px;
					position: sticky; top: 0; z-index: 100;
				}
				.fg-preview-title {
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
					font-size: 15px; font-weight: 600; color: #334155;
				}
				.fg-device-switcher {
					display: inline-flex !important; gap: 2px !important; background: #f1f5f9; border-radius: 8px; padding: 3px;
				}
				button.fg-device-btn {
					display: inline-flex !important; align-items: center !important; justify-content: center !important;
					width: 34px !important; height: 30px !important; border: none !important;
					background: transparent !important; border-radius: 6px !important;
					cursor: pointer !important; color: #94a3b8 !important;
					transition: all 0.15s; padding: 0 !important; margin: 0 !important;
					line-height: 1 !important; box-shadow: none !important;
					font-size: 0 !important; vertical-align: middle;
				}
				button.fg-device-btn:hover { color: #475569 !important; background: #e2e8f0 !important; }
				button.fg-device-btn.active { background: #fff !important; color: #334155 !important; box-shadow: 0 1px 3px rgba(0,0,0,0.08) !important; }
				#fg-preview-container {
					padding: 32px 16px; margin: 0 auto; width: 100%;
					transition: max-width 0.3s ease;
				}
				#fg-preview-container .formglut-form-wrapper {
					max-width: 100% !important;
				}
			</style>
			<div class="fg-preview-header">
				<span class="fg-preview-title"><?php
				/* translators: %s: form title */
				printf( esc_html__( 'Preview: %s', 'formglut' ), esc_html( $form_title ) );
				?></span>
				<div class="fg-device-switcher">
					<button class="fg-device-btn active" onclick="fgSetDevice('100%', this)" title="Desktop">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
					</button>
					<button class="fg-device-btn" onclick="fgSetDevice('640px', this)" title="Tablet">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
					</button>
					<button class="fg-device-btn" onclick="fgSetDevice('480px', this)" title="Mobile">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
					</button>
				</div>
			</div>
			<div id="fg-preview-container" style="max-width:700px;">
				<?php echo do_shortcode( '[formglut id="' . $form_id . '"]' ); ?>
			</div>
			<script>
			(function() {
				window.fgSetDevice = function(w, btn) {
					var c = document.getElementById('fg-preview-container');
					if (!c) return;
					c.style.maxWidth = w === '100%' ? '700px' : w;
					var btns = document.querySelectorAll('button.fg-device-btn');
					for (var i = 0; i < btns.length; i++) {
						btns[i].classList.remove('active');
					}
					btn.classList.add('active');
				};
			})();
			</script>
			<?php
	}

	private function render_page( $template_file ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized access.', 'formglut' ) );
		}

		echo '<style>';
		echo '#adminmenumain, #wpadminbar, #wpfooter, .update-nag, .notice { display: none !important; }';
		echo 'html.wp-toolbar { padding-top: 0 !important; height: auto !important; overflow: auto !important; }';
		echo 'body { overflow: auto !important; height: auto !important; }';
		echo '#wpwrap { height: auto !important; min-height: 100vh !important; overflow: visible !important; }';
		echo '#wpcontent { margin-left: 0 !important; padding-left: 0 !important; height: auto !important; overflow: visible !important; }';
		echo '#wpbody { padding-top: 0 !important; height: auto !important; overflow: visible !important; }';
		echo '#wpbody-content { overflow: visible !important; padding-bottom: 0 !important; }';
		echo '.wrap { margin: 0 !important; }';
		echo '</style>';
		echo '<div id="formglut-root"></div>';
	}

	/**
	 * Check if the current admin page belongs to FormGlut.
	 *
	 * @param string $hook The current admin page hook.
	 * @return bool
	 */
	private function is_formglut_page( $hook ) {
		$formglut_hooks = array(
			'toplevel_page_formglut-all-forms',
			'formglut_page_formglut-editor',
			'formglut_page_formglut-entries',
			'formglut_page_formglut-settings',
			'formglut_page_formglut-entry-detail',
			'admin_page_formglut-entry-detail',
			'admin_page_formglut-preview',
		);

		return in_array( $hook, $formglut_hooks, true );
	}
}
