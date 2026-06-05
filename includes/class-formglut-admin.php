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

		// Submenu — Pro Features.
		add_submenu_page(
			'formglut-all-forms',
			__( 'Pro Features', 'formglut' ),
			__( '<span style="color: #fbbf24;">⭐ Pro Features</span>', 'formglut' ),
			'manage_options',
			'formglut-pro-features',
			array( $this, 'render_pro_features_page' )
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

					/* Hide WordPress admin elements for full-width preview */
					#adminmenumain, #wpadminbar, #wpfooter, .update-nag, .notice { display: none !important; }
					html.wp-toolbar { padding-top: 0 !important; height: auto !important; overflow: auto !important; }
					#wpwrap { height: auto !important; min-height: 100vh !important; overflow: visible !important; }
					#wpcontent { margin-left: 0 !important; padding-left: 0 !important; height: auto !important; overflow: visible !important; }
					#wpbody { padding-top: 0 !important; height: auto !important; overflow: visible !important; }
					#wpbody-content { overflow: visible !important; padding-bottom: 0 !important; }
					.wrap { margin: 0 !important; }

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
				'pro_features' => admin_url( 'admin.php?page=formglut-pro-features' ),
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
	 * Render Pro Features page.
	 *
	 * @return void
	/**
	 * Render Pro Features page with tabs.
	 *
	 * @return void
	 */
	public function render_pro_features_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized access.', 'formglut' ) );
		}
		?>
		<!DOCTYPE html>
		<html <?php language_attributes(); ?>>
		<head>
			<meta charset="<?php bloginfo( 'charset' ); ?>">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title><?php esc_html_e( 'Pro Features - FormGlut', 'formglut' ); ?></title>
			<?php wp_print_styles( 'wp-admin' ); ?>
			<style>

					/* Hide WordPress admin elements for full-width preview */
					#adminmenumain, #wpadminbar, #wpfooter, .update-nag, .notice { display: none !important; }
					html.wp-toolbar { padding-top: 0 !important; height: auto !important; overflow: auto !important; }
					#wpwrap { height: auto !important; min-height: 100vh !important; overflow: visible !important; }
					#wpcontent { margin-left: 0 !important; padding-left: 0 !important; height: auto !important; overflow: visible !important; }
					#wpbody { padding-top: 0 !important; height: auto !important; overflow: visible !important; }
					#wpbody-content { overflow: visible !important; padding-bottom: 0 !important; }
					.wrap { margin: 0 !important; }

				* { box-sizing: border-box; }
				body {
					margin: 0;
					padding: 0;
					background: #1a1a2e;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
					color: #fff;
					min-height: 100vh;
				}
				.fg-pro-container {
					max-width: 1200px;
					margin: 0 auto;
					padding: 40px 20px;
				}
				.fg-pro-header {
					text-align: center;
					padding: 60px 40px;
					background: rgba(255,255,255,0.03);
					border: 1px solid rgba(255,255,255,0.08);
					border-radius: 8px;
					margin-bottom: 40px;
				}
				.fg-pro-badge {
					display: inline-block;
					background: rgba(233, 69, 96, 0.15);
					color: #e94560;
					padding: 6px 14px;
					border-radius: 6px;
					font-size: 12px;
					font-weight: 600;
					margin-bottom: 20px;
					letter-spacing: 0.5px;
					text-transform: uppercase;
				}
				.fg-pro-title {
					font-size: 38px;
					font-weight: 700;
					margin: 0 0 16px 0;
					color: #fff;
					letter-spacing: -0.5px;
				}
				.fg-pro-subtitle {
					font-size: 16px;
					color: rgba(255,255,255,0.6);
					margin: 0 0 28px 0;
					max-width: 500px;
					margin-left: auto;
					margin-right: auto;
				}
				.fg-pro-cta-btn {
					display: inline-block;
					background: #e94560;
					color: #fff;
					padding: 14px 32px;
					border-radius: 8px;
					text-decoration: none;
					font-size: 14px;
					font-weight: 600;
					transition: background 0.2s ease;
					border: none;
					cursor: pointer;
				}
				.fg-pro-cta-btn:hover {
					background: #d63853;
				}

				/* Tabs */
				.fg-pro-tabs {
					display: flex;
					gap: 2px;
					background: rgba(255,255,255,0.03);
					padding: 4px;
					border-radius: 8px;
					margin-bottom: 32px;
					border: 1px solid rgba(255,255,255,0.06);
				}
				.fg-pro-tab {
					flex: 1;
					padding: 12px 20px;
					background: transparent;
					border: none;
					color: rgba(255,255,255,0.5);
					font-size: 14px;
					font-weight: 500;
					cursor: pointer;
					border-radius: 6px;
					transition: all 0.2s ease;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 8px;
				}
				.fg-pro-tab:hover {
					color: rgba(255,255,255,0.8);
					background: rgba(255,255,255,0.04);
				}
				.fg-pro-tab.active {
					background: rgba(255,255,255,0.08);
					color: #fff;
				}
				.fg-pro-tab svg {
					width: 16px;
					height: 16px;
					opacity: 0.7;
				}
				.fg-pro-tab.active svg {
					opacity: 1;
				}

				/* Tab Content */
				.fg-pro-tab-content {
					display: none;
				}
				.fg-pro-tab-content.active {
					display: block;
				}

				/* Sections */
				.fg-pro-section {
					margin-bottom: 40px;
				}
				.fg-pro-section-title {
					font-size: 15px;
					font-weight: 600;
					margin: 0 0 20px 0;
					color: rgba(255,255,255,0.5);
					display: flex;
					align-items: center;
					gap: 8px;
					text-transform: uppercase;
					letter-spacing: 0.5px;
				}
				.fg-pro-section-title svg {
					width: 16px;
					height: 16px;
					opacity: 0.5;
				}
				.fg-pro-grid {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
					gap: 16px;
				}
				.fg-pro-card {
					background: rgba(255,255,255,0.03);
					border: 1px solid rgba(255,255,255,0.06);
					border-radius: 8px;
					padding: 24px;
					transition: all 0.2s ease;
				}
				.fg-pro-card:hover {
					background: rgba(255,255,255,0.05);
					border-color: rgba(255,255,255,0.1);
				}
				.fg-pro-card-icon {
					font-size: 28px;
					margin-bottom: 16px;
				}
				.fg-pro-card-title {
					font-size: 15px;
					font-weight: 600;
					margin: 0 0 8px 0;
					color: #fff;
				}
				.fg-pro-card-desc {
					font-size: 13px;
					color: rgba(255,255,255,0.5);
					margin: 0 0 16px 0;
					line-height: 1.5;
				}
				.fg-pro-card-tag {
					display: inline-block;
					background: rgba(255,255,255,0.06);
					color: rgba(255,255,255,0.5);
					padding: 4px 10px;
					border-radius: 4px;
					font-size: 11px;
					font-weight: 500;
					text-transform: uppercase;
					letter-spacing: 0.3px;
				}

				/* Integration Cards */
				.fg-pro-integration-card {
					background: rgba(255,255,255,0.03);
					border: 1px solid rgba(255,255,255,0.06);
					border-radius: 8px;
					padding: 20px;
					display: flex;
					align-items: flex-start;
					gap: 16px;
					transition: all 0.2s ease;
				}
				.fg-pro-integration-card:hover {
					background: rgba(255,255,255,0.05);
					border-color: rgba(255,255,255,0.1);
				}
				.fg-pro-integration-icon {
					width: 44px;
					height: 44px;
					background: rgba(255,255,255,0.05);
					border-radius: 8px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 22px;
					flex-shrink: 0;
				}
				.fg-pro-integration-content {
					flex: 1;
				}
				.fg-pro-integration-title {
					font-size: 15px;
					font-weight: 600;
					margin: 0 0 6px 0;
					color: #fff;
				}
				.fg-pro-integration-desc {
					font-size: 13px;
					color: rgba(255,255,255,0.5);
					margin: 0 0 10px 0;
				}
				.fg-pro-integration-tag {
					display: inline-block;
					background: rgba(255,255,255,0.06);
					color: rgba(255,255,255,0.5);
					padding: 3px 8px;
					border-radius: 4px;
					font-size: 11px;
					font-weight: 500;
					text-transform: uppercase;
					letter-spacing: 0.3px;
				}

				/* Bottom CTA */
				.fg-pro-bottom-cta {
					text-align: center;
					padding: 48px;
					background: rgba(233, 69, 96, 0.08);
					border: 1px solid rgba(233, 69, 96, 0.15);
					border-radius: 8px;
					margin-top: 48px;
				}
				.fg-pro-bottom-cta h2 {
					font-size: 24px;
					font-weight: 600;
					margin: 0 0 12px 0;
					color: #fff;
				}
				.fg-pro-bottom-cta p {
					font-size: 14px;
					color: rgba(255,255,255,0.5);
					margin: 0 0 24px 0;
				}

				@media (max-width: 768px) {
					.fg-pro-header { padding: 40px 24px; }
					.fg-pro-title { font-size: 28px; }
					.fg-pro-subtitle { font-size: 14px; }
					.fg-pro-tabs { flex-wrap: wrap; }
					.fg-pro-tab { flex: 1 1 calc(50% - 2px); min-width: 100px; font-size: 13px; }
					.fg-pro-grid { grid-template-columns: 1fr; }
					.fg-pro-bottom-cta { padding: 32px 24px; }
				}
			</style>

		</head>
		<body>
			<div class="fg-pro-container">
				<!-- Header -->
				<div class="fg-pro-header">
					<span class="fg-pro-badge">🚀 FORMGLUT PRO</span>
					<h1 class="fg-pro-title">70+ Pro Features</h1>
					<p class="fg-pro-subtitle">Unlock powerful fields, options, and integrations to create any form you can imagine</p>
					<a href="https://formglut.com/pro" class="fg-pro-cta-btn" target="_blank">Get FormGlut Pro →</a>
				</div>

				<!-- Tabs -->
				<div class="fg-pro-tabs">
					<button class="fg-pro-tab active" onclick="switchTab('fields')">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
						Pro Fields <span style="opacity: 0.5; font-size: 12px;">(70+)</span>
					</button>
					<button class="fg-pro-tab" onclick="switchTab('options')">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M1 12h6m6 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/></svg>
						Pro Options <span style="opacity: 0.5; font-size: 12px;">(18+)</span>
					</button>
					<button class="fg-pro-tab" onclick="switchTab('integrations')">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
						Integrations <span style="opacity: 0.5; font-size: 12px;">(25+)</span>
					</button>
				</div>

				<!-- Fields Tab -->
				<div id="tab-fields" class="fg-pro-tab-content active">
					<?php $this->render_pro_fields_content(); ?>
				</div>

				<!-- Options Tab -->
				<div id="tab-options" class="fg-pro-tab-content">
					<?php $this->render_pro_options_content(); ?>
				</div>

				<!-- Integrations Tab -->
				<div id="tab-integrations" class="fg-pro-tab-content">
					<?php $this->render_pro_integrations_content(); ?>
				</div>
			</div>

			<script>
			function switchTab(tabName) {
				// Hide all content
				document.querySelectorAll('.fg-pro-tab-content').forEach(el => {
					el.classList.remove('active');
				});
				// Remove active from all tabs
				document.querySelectorAll('.fg-pro-tab').forEach(el => {
					el.classList.remove('active');
				});
				// Show selected content
				document.getElementById('tab-' + tabName).classList.add('active');
				// Add active to clicked tab
				event.target.classList.add('active');
			}
			</script>
		</body>
		</html>
		<?php
	}

	/**
	 * Render Pro Fields tab content.
	 */
	/**
	 * Render Pro Fields tab content with sub-tabs.
	 */
	private function render_pro_fields_content() {
		?>
		<!-- Sub-tabs for Pro Fields -->
		<div class="fg-field-subtabs">
			<button class="fg-field-subtab active" onclick="switchFieldTab('general')">
				<span>📝</span> General
			</button>
			<button class="fg-field-subtab" onclick="switchFieldTab('advanced')">
				<span>⚡</span> Advanced
			</button>
			<button class="fg-field-subtab" onclick="switchFieldTab('upload')">
				<span>📁</span> Upload
			</button>
			<button class="fg-field-subtab" onclick="switchFieldTab('survey')">
				<span>📊</span> Survey
			</button>
			<button class="fg-field-subtab" onclick="switchFieldTab('payment')">
				<span>💳</span> Payment
			</button>
			<button class="fg-field-subtab" onclick="switchFieldTab('security')">
				<span>🔒</span> Security
			</button>
			<button class="fg-field-subtab" onclick="switchFieldTab('layout')">
				<span>📐</span> Layout
			</button>
			<button class="fg-field-subtab" onclick="switchFieldTab('wordpress')">
				<span>🌐</span> WordPress
			</button>
		</div>

		<style>

					/* Hide WordPress admin elements for full-width preview */
					#adminmenumain, #wpadminbar, #wpfooter, .update-nag, .notice { display: none !important; }
					html.wp-toolbar { padding-top: 0 !important; height: auto !important; overflow: auto !important; }
					#wpwrap { height: auto !important; min-height: 100vh !important; overflow: visible !important; }
					#wpcontent { margin-left: 0 !important; padding-left: 0 !important; height: auto !important; overflow: visible !important; }
					#wpbody { padding-top: 0 !important; height: auto !important; overflow: visible !important; }
					#wpbody-content { overflow: visible !important; padding-bottom: 0 !important; }
					.wrap { margin: 0 !important; }

			.fg-field-subtabs {
				display: flex;
				gap: 2px;
				background: rgba(255,255,255,0.03);
				padding: 4px;
				border-radius: 8px;
				margin-bottom: 32px;
				border: 1px solid rgba(255,255,255,0.06);
				flex-wrap: wrap;
			}
			.fg-field-subtab {
				flex: 1;
				min-width: 100px;
				padding: 10px 16px;
				background: transparent;
				border: none;
				color: rgba(255,255,255,0.5);
				font-size: 13px;
				font-weight: 500;
				cursor: pointer;
				border-radius: 6px;
				transition: all 0.2s ease;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 6px;
			}
			.fg-field-subtab:hover {
				color: rgba(255,255,255,0.8);
				background: rgba(255,255,255,0.04);
			}
			.fg-field-subtab.active {
				background: rgba(255,255,255,0.08);
				color: #fff;
			}
			.fg-field-subtab span {
				font-size: 16px;
			}
			.fg-field-tab-content {
				display: none;
			}
			.fg-field-tab-content.active {
				display: block;
			}
			@media (max-width: 768px) {
				.fg-field-subtabs {
					gap: 2px;
					padding: 4px;
				}
				.fg-field-subtab {
					min-width: 70px;
					padding: 8px 10px;
					font-size: 11px;
				}
				.fg-field-subtab span {
					font-size: 14px;
				}
			}
		</style>

		<!-- General Fields Tab -->
		<div id="field-tab-general" class="fg-field-tab-content active">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
					General Pro Fields
				</h2>
				<div class="fg-pro-grid">
					<?php
					$general_fields = array(
						array('icon' => '📍', 'title' => 'Address Autocomplete', 'desc' => 'Google Places autocomplete for accurate addresses', 'tag' => 'Smart'),
						array('icon' => '🔗', 'title' => 'Chained Select', 'desc' => 'Dependent dropdown fields that update based on previous selections', 'tag' => 'Conditional'),
						array('icon' => '👍', 'title' => 'Like / Dislike', 'desc' => 'Quick feedback with thumbs up/down buttons', 'tag' => 'Feedback'),
						array('icon' => '📑', 'title' => 'Repeat Field', 'desc' => 'Repeat field groups dynamically with add/remove', 'tag' => 'Dynamic'),
						array('icon' => '📝', 'title' => 'Rich Text', 'desc' => 'WYSIWYG editor for formatted text input with toolbar', 'tag' => 'Advanced'),
						array('icon' => '🔍', 'title' => 'Searchable Dropdown', 'desc' => 'Enhanced dropdown with live search functionality', 'tag' => 'Enhanced'),
						array('icon' => '🏷️', 'title' => 'Tag Input', 'desc' => 'Tag-style input for categorization and labels', 'tag' => 'Input'),
					);
					foreach ($general_fields as $field) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $field['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $field['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $field['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $field['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Advanced Fields Tab -->
		<div id="field-tab-advanced" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
					Advanced Fields
				</h2>
				<div class="fg-pro-grid">
					<?php
					$advanced_fields = array(
						array('icon' => '🎤', 'title' => 'Audio Upload', 'desc' => 'Allow users to upload audio files', 'tag' => 'Media'),
						array('icon' => '🧮', 'title' => 'Calculated Field', 'desc' => 'Math calculations between form fields', 'tag' => 'Calculation'),
						array('icon' => '🔗', 'title' => 'Chained Fields', 'desc' => 'Multiple chained select dependencies', 'tag' => 'Conditional'),
						array('icon' => '🎨', 'title' => 'Color Swatch', 'desc' => 'Visual color picker with swatches', 'tag' => 'Input'),
						array('icon' => '📋', 'title' => 'Dual List Box', 'desc' => 'Two-pane selection list', 'tag' => 'Selection'),
						array('icon' => '📊', 'title' => 'Dynamic List', 'desc' => 'List that updates based on conditions', 'tag' => 'Dynamic'),
						array('icon' => '✉️', 'title' => 'Email Confirmation', 'desc' => 'Require users to confirm email address', 'tag' => 'Validation'),
						array('icon' => '😀', 'title' => 'Emoji Rating', 'desc' => 'Emoji-based rating input', 'tag' => 'Rating'),
						array('icon' => '👍', 'title' => 'Facebook Like', 'desc' => 'Facebook like button integration', 'tag' => 'Social'),
						array('icon' => '📑', 'title' => 'Form Step', 'desc' => 'Multi-step form break with navigation', 'tag' => 'Layout'),
						array('icon' => '🖼️', 'title' => 'Image Select', 'desc' => 'Select from visual image options', 'tag' => 'Visual'),
						array('icon' => '📊', 'title' => 'Likert Scale', 'desc' => 'Professional survey rating scales', 'tag' => 'Survey'),
						array('icon' => '🔍', 'title' => 'Lookup Field', 'desc' => 'Search posts, users, or custom data', 'tag' => 'Search'),
						array('icon' => '🗺️', 'title' => 'Mark on Map', 'desc' => 'Let users mark locations on map', 'tag' => 'Location'),
						array('icon' => '🎯', 'title' => 'Net Promoter Score', 'desc' => 'NPS survey field (0-10 scale)', 'tag' => 'Survey'),
						array('icon' => '🔒', 'title' => 'Password Confirmation', 'desc' => 'Require password confirmation field', 'tag' => 'Security'),
						array('icon' => '🔄', 'title' => 'Reset Button', 'desc' => 'Clear form with confirmation', 'tag' => 'Action'),
						array('icon' => '💾', 'title' => 'Save & Resume', 'desc' => 'Allow users to save and continue later', 'tag' => 'UX'),
						array('icon' => '✍️', 'title' => 'Signature', 'desc' => 'Digital signature canvas input', 'tag' => 'Signature'),
						array('icon' => '🌐', 'title' => 'Social Profiles', 'desc' => 'Social media profile URL inputs', 'tag' => 'Social'),
						array('icon' => '⭐', 'title' => 'Star Rating', 'desc' => 'Interactive star rating input', 'tag' => 'Rating'),
						array('icon' => '🔘', 'title' => 'Toggle Switch', 'desc' => 'On/off toggle switch input', 'tag' => 'Input'),
						array('icon' => '💡', 'title' => 'Tooltip Field', 'desc' => 'Field with helpful tooltip', 'tag' => 'Help'),
						array('icon' => '🎥', 'title' => 'Video Embed', 'desc' => 'Embed YouTube, Vimeo, or custom videos', 'tag' => 'Media'),
					);
					foreach ($advanced_fields as $field) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $field['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $field['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $field['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $field['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Upload Fields Tab -->
		<div id="field-tab-upload" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
					Upload Fields
				</h2>
				<div class="fg-pro-grid">
					<?php
					$upload_fields = array(
						array('icon' => '📁', 'title' => 'File Upload', 'desc' => 'Allow users to upload files with validation', 'tag' => 'Upload'),
						array('icon' => '🖼️', 'title' => 'Image Upload', 'desc' => 'Image upload with preview and gallery view', 'tag' => 'Image'),
						array('icon' => '📑', 'title' => 'Multi-file Upload', 'desc' => 'Upload multiple files at once', 'tag' => 'Upload'),
						array('icon' => '✂️', 'title' => 'Cropped Image Upload', 'desc' => 'Upload and crop images to specific dimensions', 'tag' => 'Image'),
						array('icon' => '📷', 'title' => 'Webcam Capture', 'desc' => 'Capture photo directly from webcam', 'tag' => 'Camera'),
						array('icon' => '🎤', 'title' => 'Voice Recording', 'desc' => 'Record voice directly in the form', 'tag' => 'Audio'),
					);
					foreach ($upload_fields as $field) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $field['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $field['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $field['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $field['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Survey Fields Tab -->
		<div id="field-tab-survey" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
					Survey & Quiz Fields
				</h2>
				<div class="fg-pro-grid">
					<?php
					$survey_fields = array(
						array('icon' => '📊', 'title' => 'Checkable Grid', 'desc' => 'Grid-based checkbox selection', 'tag' => 'Grid'),
						array('icon' => '🖼️', 'title' => 'Image Comparison', 'desc' => 'Compare two images side by side', 'tag' => 'Visual'),
						array('icon' => '📊', 'title' => 'Labeled Slider', 'desc' => 'Slider with descriptive labels', 'tag' => 'Slider'),
						array('icon' => '📋', 'title' => 'Matrix Question', 'desc' => 'Matrix-style survey questions', 'tag' => 'Survey'),
						array('icon' => '📊', 'title' => 'Multiple Choice Grid', 'desc' => 'Select one option per row in grid', 'tag' => 'Grid'),
						array('icon' => '🏆', 'title' => 'Quiz Score', 'desc' => 'Auto-score quiz submissions', 'tag' => 'Quiz'),
						array('icon' => '📊', 'title' => 'Ranking', 'desc' => 'Rank items by drag and drop', 'tag' => 'Ordering'),
						array('icon' => '📊', 'title' => 'Semantic Differential', 'desc' => 'Rate between contrasting adjectives', 'tag' => 'Survey'),
					);
					foreach ($survey_fields as $field) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $field['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $field['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $field['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $field['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Payment Fields Tab -->
		<div id="field-tab-payment" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
					Payment & Commerce
				</h2>
				<div class="fg-pro-grid">
					<?php
					$payment_fields = array(
						array('icon' => '🎟️', 'title' => 'Coupon Code', 'desc' => 'Discount and coupon code field', 'tag' => 'Commerce'),
						array('icon' => '💳', 'title' => 'Credit Card', 'desc' => 'Secure credit card payment field', 'tag' => 'Payment'),
						array('icon' => '💰', 'title' => 'Custom Amount', 'desc' => 'Let users enter payment amount', 'tag' => 'Payment'),
						array('icon' => '💵', 'title' => 'Donation', 'desc' => 'Optimized donation form field', 'tag' => 'Nonprofit'),
						array('icon' => '🛒', 'title' => 'Payment Item', 'desc' => 'Individual product/service item', 'tag' => 'Commerce'),
						array('icon' => '💳', 'title' => 'Payment Method', 'desc' => 'Select payment method', 'tag' => 'Payment'),
						array('icon' => '🧾', 'title' => 'Payment Summary', 'desc' => 'Display order summary before payment', 'tag' => 'Checkout'),
						array('icon' => '🔄', 'title' => 'Product Variations', 'desc' => 'Product options with price variations', 'tag' => 'Commerce'),
						array('icon' => '🔢', 'title' => 'Quantity', 'desc' => 'Item quantity selector', 'tag' => 'Commerce'),
						array('icon' => '🚚', 'title' => 'Shipping Address', 'desc' => 'Collect shipping address', 'tag' => 'Commerce'),
						array('icon' => '🔄', 'title' => 'Subscription', 'desc' => 'Recurring payment subscription', 'tag' => 'Recurring'),
						array('icon' => '🧮', 'title' => 'Tax Calculation', 'desc' => 'Automatic tax calculation', 'tag' => 'Commerce'),
					);
					foreach ($payment_fields as $field) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $field['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $field['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $field['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $field['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Security Fields Tab -->
		<div id="field-tab-security" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
					Security & Protection
				</h2>
				<div class="fg-pro-grid">
					<?php
					$security_fields = array(
						array('icon' => '🍯', 'title' => 'Honeypot', 'desc' => 'Hidden field to trap spam bots', 'tag' => 'Anti-Spam'),
						array('icon' => '🧮', 'title' => 'Math Captcha', 'desc' => 'Simple math challenge for humans', 'tag' => 'Captcha'),
						array('icon' => '🎚️', 'title' => 'Slider Captcha', 'desc' => 'Interactive slider verification', 'tag' => 'Captcha'),
					);
					foreach ($security_fields as $field) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $field['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $field['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $field['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $field['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Layout Fields Tab -->
		<div id="field-tab-layout" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
					Layout & Containers
				</h2>
				<div class="fg-pro-grid">
					<?php
					$layout_fields = array(
						array('icon' => '📦', 'title' => 'Accordion', 'desc' => 'Collapsible content sections', 'tag' => 'Layout'),
						array('icon' => '⏱️', 'title' => 'Countdown Timer', 'desc' => 'Countdown to deadline or event', 'tag' => 'Timer'),
						array('icon' => '📊', 'title' => 'Progress Bar', 'desc' => 'Show form completion progress', 'tag' => 'Progress'),
						array('icon' => '📑', 'title' => 'Tabs', 'desc' => 'Organize form content in tabs', 'tag' => 'Layout'),
					);
					foreach ($layout_fields as $field) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $field['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $field['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $field['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $field['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- WordPress Fields Tab -->
		<div id="field-tab-wordpress" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
					WordPress Integration
				</h2>
				<div class="fg-pro-grid">
					<?php
					$wp_fields = array(
						array('icon' => '📁', 'title' => 'Category Selection', 'desc' => 'Select from WordPress categories', 'tag' => 'WordPress'),
						array('icon' => '🖼️', 'title' => 'Featured Image', 'desc' => 'Upload/set featured image for posts', 'tag' => 'WordPress'),
						array('icon' => '📝', 'title' => 'Post Submission', 'desc' => 'Create posts from form submissions', 'tag' => 'WordPress'),
						array('icon' => '🏷️', 'title' => 'Tag Selection', 'desc' => 'Select from WordPress tags', 'tag' => 'WordPress'),
						array('icon' => '👤', 'title' => 'User Registration', 'desc' => 'Register new WordPress users', 'tag' => 'WordPress'),
						array('icon' => '👑', 'title' => 'User Role Selection', 'desc' => 'Select user role for registration', 'tag' => 'WordPress'),
					);
					foreach ($wp_fields as $field) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $field['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $field['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $field['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $field['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Bottom CTA -->
		<div class="fg-pro-bottom-cta">
			<h2>Unlock All 60+ Pro Fields</h2>
			<p>Get access to all field categories and start building powerful forms</p>
			<a href="https://formglut.com/pro" class="fg-pro-cta-btn" target="_blank">Get FormGlut Pro →</a>
		</div>

		<script>
		function switchFieldTab(tabName) {
			// Hide all content
			document.querySelectorAll('.fg-field-tab-content').forEach(el => {
				el.classList.remove('active');
			});
			// Remove active from all tabs
			document.querySelectorAll('.fg-field-subtab').forEach(el => {
				el.classList.remove('active');
			});
			// Show selected content
			document.getElementById('field-tab-' + tabName).classList.add('active');
			// Add active to clicked tab
			event.target.classList.add('active');
		}
		</script>
		<?php
	}

	
	/**
	 * Render Pro Options tab content.
	/**
	 * Render Pro Options tab content with sub-tabs.
	 */
	private function render_pro_options_content() {
		?>
		<!-- Sub-tabs for Pro Options -->
		<div class="fg-field-subtabs">
			<button class="fg-field-subtab active" onclick="switchOptionTab('advanced')">
				<span>⚙️</span> Advanced
			</button>
			<button class="fg-field-subtab" onclick="switchOptionTab('entries')">
				<span>📋</span> Entries
			</button>
			<button class="fg-field-subtab" onclick="switchOptionTab('spam')">
				<span>🛡️</span> Spam
			</button>
		</div>

		<!-- Advanced Options Tab -->
		<div id="option-tab-advanced" class="fg-field-tab-content active">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
					Advanced Form Options
				</h2>
				<div class="fg-pro-grid">
					<?php
					$form_options = array(
						array('icon' => '🔄', 'title' => 'Conditional Logic', 'desc' => 'Show/hide fields based on user input', 'tag' => 'Logic'),
						array('icon' => '📊', 'title' => 'Form Analytics', 'desc' => 'Track form views, submissions, conversion rates', 'tag' => 'Analytics'),
						array('icon' => '💾', 'title' => 'Save & Continue', 'desc' => 'Allow users to save forms and continue later', 'tag' => 'UX'),
						array('icon' => '📋', 'title' => 'Form Cloning', 'desc' => 'Duplicate forms with one click', 'tag' => 'Productivity'),
						array('icon' => '🎨', 'title' => 'Custom Styling', 'desc' => 'Custom CSS for each form', 'tag' => 'Design'),
						array('icon' => '📱', 'title' => 'Responsive Preview', 'desc' => 'Preview on all device sizes', 'tag' => 'Design'),
					);
					foreach ($form_options as $opt) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $opt['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $opt['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $opt['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $opt['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Entry Management Tab -->
		<div id="option-tab-entries" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
					Entry Management
				</h2>
				<div class="fg-pro-grid">
					<?php
					$entry_options = array(
						array('icon' => '📥', 'title' => 'Bulk Export', 'desc' => 'Export entries in CSV, Excel, PDF', 'tag' => 'Export'),
						array('icon' => '✏️', 'title' => 'Inline Edit', 'desc' => 'Edit entries directly from the list', 'tag' => 'Management'),
						array('icon' => '🔄', 'title' => 'Entry Reprocessing', 'desc' => 'Reprocess entries with updated settings', 'tag' => 'Advanced'),
						array('icon' => '📧', 'title' => 'Email Notifications', 'desc' => 'Multiple email recipients per form', 'tag' => 'Email'),
						array('icon' => '🔔', 'title' => 'Slack Notifications', 'desc' => 'Get notified in Slack channels', 'tag' => 'Integration'),
						array('icon' => '💬', 'title' => 'Discord Webhooks', 'desc' => 'Send form data to Discord', 'tag' => 'Integration'),
					);
					foreach ($entry_options as $opt) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $opt['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $opt['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $opt['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $opt['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Spam Protection Tab -->
		<div id="option-tab-spam" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
					Spam Protection
				</h2>
				<div class="fg-pro-grid">
					<?php
					$spam_options = array(
						array('icon' => '🛡️', 'title' => 'Akismet Integration', 'desc' => 'Industry-leading spam protection', 'tag' => 'Security'),
						array('icon' => '🔥', 'title' => 'Honeypot Field', 'desc' => 'Hidden field to trap bots', 'tag' => 'Security'),
						array('icon' => '⏱️', 'title' => 'Time Limit', 'desc' => 'Minimum time to complete form', 'tag' => 'Security'),
						array('icon' => '📍', 'title' => 'Geo-blocking', 'desc' => 'Block submissions from countries', 'tag' => 'Security'),
						array('icon' => '🔗', 'title' => 'Referrer Check', 'desc' => 'Block submissions from external sites', 'tag' => 'Security'),
					);
					foreach ($spam_options as $opt) :
					?>
					<div class="fg-pro-card">
						<div class="fg-pro-card-icon"><?php echo $opt['icon']; ?></div>
						<h3 class="fg-pro-card-title"><?php echo $opt['title']; ?></h3>
						<p class="fg-pro-card-desc"><?php echo $opt['desc']; ?></p>
						<span class="fg-pro-card-tag"><?php echo $opt['tag']; ?></span>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Bottom CTA -->
		<div class="fg-pro-bottom-cta">
			<h2>Unlock All Pro Options</h2>
			<p>Supercharge your forms with advanced options and settings</p>
			<a href="https://formglut.com/pro" class="fg-pro-cta-btn" target="_blank">Get Started →</a>
		</div>

		<script>
		function switchOptionTab(tabName) {
			// Hide all content
			document.querySelectorAll('#tab-options .fg-field-tab-content').forEach(el => {
				el.classList.remove('active');
			});
			// Remove active from all tabs within options tab
			document.querySelectorAll('#tab-options .fg-field-subtab').forEach(el => {
				el.classList.remove('active');
			});
			// Show selected content
			document.getElementById('option-tab-' + tabName).classList.add('active');
			// Add active to clicked tab
			event.target.classList.add('active');
		}
		</script>
		<?php
	}

	
	/**
	 * Render Pro Integrations tab content with sub-tabs.
	 */
	private function render_pro_integrations_content() {
		?>
		<!-- Sub-tabs for Integrations -->
		<div class="fg-field-subtabs">
			<button class="fg-field-subtab active" onclick="switchIntegrationTab('payment')">
				<span>💳</span> Payment
			</button>
			<button class="fg-field-subtab" onclick="switchIntegrationTab('email')">
				<span>📧</span> Email
			</button>
			<button class="fg-field-subtab" onclick="switchIntegrationTab('crm')">
				<span>👥</span> CRM
			</button>
			<button class="fg-field-subtab" onclick="switchIntegrationTab('webhooks')">
				<span>🔗</span> Webhooks
			</button>
		</div>

		<!-- Payment Tab -->
		<div id="integration-tab-payment" class="fg-field-tab-content active">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
					Payment Gateways
				</h2>
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<?php
					$payment_integrations = array(
						array('icon' => '💳', 'title' => 'Stripe', 'desc' => 'Accept all major credit cards with Stripe', 'tag' => 'Payment'),
						array('icon' => '🏦', 'title' => 'PayPal', 'desc' => 'PayPal Standard and Pro integration', 'tag' => 'Payment'),
						array('icon' => '🔵', 'title' => 'Square', 'desc' => 'Square payments integration', 'tag' => 'Payment'),
						array('icon' => '🏪', 'title' => 'Mollie', 'desc' => 'European payment gateway', 'tag' => 'Payment'),
						array('icon' => '💰', 'title' => 'Razorpay', 'desc' => 'Indian payment gateway', 'tag' => 'Payment'),
					);
					foreach ($payment_integrations as $int) :
					?>
					<div class="fg-pro-integration-card">
						<div class="fg-pro-integration-icon"><?php echo $int['icon']; ?></div>
						<div class="fg-pro-integration-content">
							<h3 class="fg-pro-integration-title"><?php echo $int['title']; ?></h3>
							<p class="fg-pro-integration-desc"><?php echo $int['desc']; ?></p>
							<span class="fg-pro-integration-tag"><?php echo $int['tag']; ?></span>
						</div>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Email Marketing Tab -->
		<div id="integration-tab-email" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
					Email Marketing
				</h2>
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<?php
					$email_integrations = array(
						array('icon' => '📧', 'title' => 'Mailchimp', 'desc' => 'Sync subscribers to Mailchimp lists', 'tag' => 'Marketing'),
						array('icon' => '✈️', 'title' => 'ConvertKit', 'desc' => 'Connect to ConvertKit', 'tag' => 'Marketing'),
						array('icon' => '🟠', 'title' => 'HubSpot', 'desc' => 'HubSpot CRM integration', 'tag' => 'CRM'),
						array('icon' => '📊', 'title' => 'ActiveCampaign', 'desc' => 'Email marketing automation', 'tag' => 'Marketing'),
						array('icon' => '🔄', 'title' => 'GetResponse', 'desc' => 'Email marketing platform', 'tag' => 'Marketing'),
					);
					foreach ($email_integrations as $int) :
					?>
					<div class="fg-pro-integration-card">
						<div class="fg-pro-integration-icon"><?php echo $int['icon']; ?></div>
						<div class="fg-pro-integration-content">
							<h3 class="fg-pro-integration-title"><?php echo $int['title']; ?></h3>
							<p class="fg-pro-integration-desc"><?php echo $int['desc']; ?></p>
							<span class="fg-pro-integration-tag"><?php echo $int['tag']; ?></span>
						</div>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- CRM & Productivity Tab -->
		<div id="integration-tab-crm" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
					CRM & Productivity
				</h2>
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<?php
					$crm_integrations = array(
						array('icon' => '🔵', 'title' => 'Salesforce', 'desc' => 'Send leads to Salesforce CRM', 'tag' => 'CRM'),
						array('icon' => '🟣', 'title' => 'Zoho CRM', 'desc' => 'Zoho CRM integration', 'tag' => 'CRM'),
						array('icon' => '🟢', 'title' => 'Pipedrive', 'desc' => 'Pipedrive CRM integration', 'tag' => 'CRM'),
						array('icon' => '📋', 'title' => 'Trello', 'desc' => 'Create cards from submissions', 'tag' => 'Productivity'),
						array('icon' => '📝', 'title' => 'Google Sheets', 'desc' => 'Auto-sync to Google Sheets', 'tag' => 'Productivity'),
						array('icon' => '📊', 'title' => 'Airtable', 'desc' => 'Send data to Airtable bases', 'tag' => 'Productivity'),
					);
					foreach ($crm_integrations as $int) :
					?>
					<div class="fg-pro-integration-card">
						<div class="fg-pro-integration-icon"><?php echo $int['icon']; ?></div>
						<div class="fg-pro-integration-content">
							<h3 class="fg-pro-integration-title"><?php echo $int['title']; ?></h3>
							<p class="fg-pro-integration-desc"><?php echo $int['desc']; ?></p>
							<span class="fg-pro-integration-tag"><?php echo $int['tag']; ?></span>
						</div>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Webhooks & API Tab -->
		<div id="integration-tab-webhooks" class="fg-field-tab-content">
			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M1 12h6m6 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/></svg>
					Webhooks & API
				</h2>
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<?php
					$api_integrations = array(
						array('icon' => '🔗', 'title' => 'Webhooks', 'desc' => 'Send data to any URL via POST', 'tag' => 'API'),
						array('icon' => '⚡', 'title' => 'Zapier', 'desc' => 'Connect to 5000+ apps via Zapier', 'tag' => 'Automation'),
						array('icon' => '🔌', 'title' => 'Make (Integromat)', 'desc' => 'Automation platform integration', 'tag' => 'Automation'),
						array('icon' => '🔧', 'title' => 'REST API', 'desc' => 'Full API access for developers', 'tag' => 'API'),
					);
					foreach ($api_integrations as $int) :
					?>
					<div class="fg-pro-integration-card">
						<div class="fg-pro-integration-icon"><?php echo $int['icon']; ?></div>
						<div class="fg-pro-integration-content">
							<h3 class="fg-pro-integration-title"><?php echo $int['title']; ?></h3>
							<p class="fg-pro-integration-desc"><?php echo $int['desc']; ?></p>
							<span class="fg-pro-integration-tag"><?php echo $int['tag']; ?></span>
						</div>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<!-- Bottom CTA -->
		<div class="fg-pro-bottom-cta">
			<h2>Connect Your Tools</h2>
			<p>Integrate with 50+ services via FormGlut Pro</p>
			<a href="https://formglut.com/pro" class="fg-pro-cta-btn" target="_blank">Get Started →</a>
		</div>

		<script>
		function switchIntegrationTab(tabName) {
			// Hide all content
			document.querySelectorAll('#tab-integrations .fg-field-tab-content').forEach(el => {
				el.classList.remove('active');
			});
			// Remove active from all tabs within integrations tab
			document.querySelectorAll('#tab-integrations .fg-field-subtab').forEach(el => {
				el.classList.remove('active');
			});
			// Show selected content
			document.getElementById('integration-tab-' + tabName).classList.add('active');
			// Add active to clicked tab
			event.target.classList.add('active');
		}
		</script>
		<?php
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

					/* Hide WordPress admin elements for full-width preview */
					#adminmenumain, #wpadminbar, #wpfooter, .update-nag, .notice { display: none !important; }
					html.wp-toolbar { padding-top: 0 !important; height: auto !important; overflow: auto !important; }
					#wpwrap { height: auto !important; min-height: 100vh !important; overflow: visible !important; }
					#wpcontent { margin-left: 0 !important; padding-left: 0 !important; height: auto !important; overflow: visible !important; }
					#wpbody { padding-top: 0 !important; height: auto !important; overflow: visible !important; }
					#wpbody-content { overflow: visible !important; padding-bottom: 0 !important; }
					.wrap { margin: 0 !important; }

				* { box-sizing: border-box; }
				body {
					margin: 0;
					padding: 0;
					background: #f0f0f1;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
					color: #1e293b;
					min-height: 100vh;
				}
				
				.fg-preview-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 16px 20px;
					background: #fff;
					border-bottom: 1px solid #e5e7eb;
					position: sticky;
					top: 0;
					z-index: 10;
				}
				.fg-preview-title {
					font-size: 14px;
					font-weight: 600;
					color: #1e293b;
				}
				.fg-device-switcher {
					display: flex;
					gap: 4px;
					background: #f3f4f6;
					padding: 4px;
					border-radius: 8px;
				}
				.fg-device-btn {
					padding: 8px 12px;
					background: transparent;
					border: none;
					color: #64748b;
					border-radius: 6px;
					cursor: pointer;
					transition: all 0.2s;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.fg-device-btn:hover {
					color: #334155;
					background: #e5e7eb;
				}
				.fg-device-btn.active {
					background: #fff;
					color: #0f172a;
					box-shadow: 0 1px 2px rgba(0,0,0,0.05);
				}
				.fg-device-btn svg {
					width: 18px;
					height: 18px;
				}
				#fg-preview-container {
					margin: 40px auto;
					padding: 0 20px;
					max-width: 100%;
					transition: max-width 0.3s ease;
				}

				.fg-pro-container {
					max-width: 1200px;
					margin: 0 auto;
					padding: 40px 20px;
				}
				.fg-pro-header {
					text-align: center;
					padding: 60px 40px;
					background: rgba(255,255,255,0.03);
					border: 1px solid rgba(255,255,255,0.08);
					border-radius: 8px;
					margin-bottom: 40px;
				}
				.fg-pro-badge {
					display: inline-block;
					background: rgba(233, 69, 96, 0.15);
					color: #e94560;
					padding: 6px 14px;
					border-radius: 6px;
					font-size: 12px;
					font-weight: 600;
					margin-bottom: 20px;
					letter-spacing: 0.5px;
					text-transform: uppercase;
				}
				.fg-pro-title {
					font-size: 38px;
					font-weight: 700;
					margin: 0 0 16px 0;
					color: #fff;
					letter-spacing: -0.5px;
				}
				.fg-pro-subtitle {
					font-size: 16px;
					color: rgba(255,255,255,0.6);
					margin: 0 0 28px 0;
					max-width: 500px;
					margin-left: auto;
					margin-right: auto;
				}
				.fg-pro-cta-btn {
					display: inline-block;
					background: #e94560;
					color: #fff;
					padding: 14px 32px;
					border-radius: 8px;
					text-decoration: none;
					font-size: 14px;
					font-weight: 600;
					transition: background 0.2s ease;
					border: none;
					cursor: pointer;
				}
				.fg-pro-cta-btn:hover {
					background: #d63853;
				}

				/* Tabs */
				.fg-pro-tabs {
					display: flex;
					gap: 2px;
					background: rgba(255,255,255,0.03);
					padding: 4px;
					border-radius: 8px;
					margin-bottom: 32px;
					border: 1px solid rgba(255,255,255,0.06);
				}
				.fg-pro-tab {
					flex: 1;
					padding: 12px 20px;
					background: transparent;
					border: none;
					color: rgba(255,255,255,0.5);
					font-size: 14px;
					font-weight: 500;
					cursor: pointer;
					border-radius: 6px;
					transition: all 0.2s ease;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 8px;
				}
				.fg-pro-tab:hover {
					color: rgba(255,255,255,0.8);
					background: rgba(255,255,255,0.04);
				}
				.fg-pro-tab.active {
					background: rgba(255,255,255,0.08);
					color: #fff;
				}
				.fg-pro-tab svg {
					width: 16px;
					height: 16px;
					opacity: 0.7;
				}
				.fg-pro-tab.active svg {
					opacity: 1;
				}

				/* Tab Content */
				.fg-pro-tab-content {
					display: none;
				}
				.fg-pro-tab-content.active {
					display: block;
				}

				/* Sections */
				.fg-pro-section {
					margin-bottom: 40px;
				}
				.fg-pro-section-title {
					font-size: 15px;
					font-weight: 600;
					margin: 0 0 20px 0;
					color: rgba(255,255,255,0.5);
					display: flex;
					align-items: center;
					gap: 8px;
					text-transform: uppercase;
					letter-spacing: 0.5px;
				}
				.fg-pro-section-title svg {
					width: 16px;
					height: 16px;
					opacity: 0.5;
				}
				.fg-pro-grid {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
					gap: 16px;
				}
				.fg-pro-card {
					background: rgba(255,255,255,0.03);
					border: 1px solid rgba(255,255,255,0.06);
					border-radius: 8px;
					padding: 24px;
					transition: all 0.2s ease;
				}
				.fg-pro-card:hover {
					background: rgba(255,255,255,0.05);
					border-color: rgba(255,255,255,0.1);
				}
				.fg-pro-card-icon {
					font-size: 28px;
					margin-bottom: 16px;
				}
				.fg-pro-card-title {
					font-size: 15px;
					font-weight: 600;
					margin: 0 0 8px 0;
					color: #fff;
				}
				.fg-pro-card-desc {
					font-size: 13px;
					color: rgba(255,255,255,0.5);
					margin: 0 0 16px 0;
					line-height: 1.5;
				}
				.fg-pro-card-tag {
					display: inline-block;
					background: rgba(255,255,255,0.06);
					color: rgba(255,255,255,0.5);
					padding: 4px 10px;
					border-radius: 4px;
					font-size: 11px;
					font-weight: 500;
					text-transform: uppercase;
					letter-spacing: 0.3px;
				}

				/* Integration Cards */
				.fg-pro-integration-card {
					background: rgba(255,255,255,0.03);
					border: 1px solid rgba(255,255,255,0.06);
					border-radius: 8px;
					padding: 20px;
					display: flex;
					align-items: flex-start;
					gap: 16px;
					transition: all 0.2s ease;
				}
				.fg-pro-integration-card:hover {
					background: rgba(255,255,255,0.05);
					border-color: rgba(255,255,255,0.1);
				}
				.fg-pro-integration-icon {
					width: 44px;
					height: 44px;
					background: rgba(255,255,255,0.05);
					border-radius: 8px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 22px;
					flex-shrink: 0;
				}
				.fg-pro-integration-content {
					flex: 1;
				}
				.fg-pro-integration-title {
					font-size: 15px;
					font-weight: 600;
					margin: 0 0 6px 0;
					color: #fff;
				}
				.fg-pro-integration-desc {
					font-size: 13px;
					color: rgba(255,255,255,0.5);
					margin: 0 0 10px 0;
				}
				.fg-pro-integration-tag {
					display: inline-block;
					background: rgba(255,255,255,0.06);
					color: rgba(255,255,255,0.5);
					padding: 3px 8px;
					border-radius: 4px;
					font-size: 11px;
					font-weight: 500;
					text-transform: uppercase;
					letter-spacing: 0.3px;
				}

				/* Bottom CTA */
				.fg-pro-bottom-cta {
					text-align: center;
					padding: 48px;
					background: rgba(233, 69, 96, 0.08);
					border: 1px solid rgba(233, 69, 96, 0.15);
					border-radius: 8px;
					margin-top: 48px;
				}
				.fg-pro-bottom-cta h2 {
					font-size: 24px;
					font-weight: 600;
					margin: 0 0 12px 0;
					color: #fff;
				}
				.fg-pro-bottom-cta p {
					font-size: 14px;
					color: rgba(255,255,255,0.5);
					margin: 0 0 24px 0;
				}

				@media (max-width: 768px) {
					.fg-pro-header { padding: 40px 24px; }
					.fg-pro-title { font-size: 28px; }
					.fg-pro-subtitle { font-size: 14px; }
					.fg-pro-tabs { flex-wrap: wrap; }
					.fg-pro-tab { flex: 1 1 calc(50% - 2px); min-width: 100px; font-size: 13px; }
					.fg-pro-grid { grid-template-columns: 1fr; }
					.fg-pro-bottom-cta { padding: 32px 24px; }
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
			<div id="fg-preview-container" style="max-width:100%;">
				<?php echo do_shortcode( '[formglut id="' . $form_id . '"]' ); ?>
			</div>
			<script>
			(function() {
				window.fgSetDevice = function(w, btn) {
					var c = document.getElementById('fg-preview-container');
					if (!c) return;
					c.style.maxWidth = w === '100%' ? '100%' : w;
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
