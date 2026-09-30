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
		add_action( 'admin_init', array( $this, 'maybe_render_preview' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_action( 'admin_head', array( $this, 'menu_icon_styles' ) );
		add_filter( 'admin_title', array( $this, 'filter_admin_title' ), 10, 2 );
		add_filter( 'admin_body_class', array( $this, 'add_body_class' ) );
		add_filter( 'script_loader_tag', array( $this, 'add_module_attribute' ), 10, 3 );
	}

	/**
	 * Set the browser tab title from the current FormGlut page slug.
	 *
	 * @param string $admin_title Full admin title.
	 * @param string $title       Page title.
	 * @return string
	 */
	public function filter_admin_title( $admin_title, $title ) {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';
		$map  = array(
			'formglut-all-forms'    => __( 'All Forms', 'formglut' ),
			'formglut-editor'       => ! empty( $_GET['form_id'] ) || ! empty( $_GET['id'] ) // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				? __( 'Edit Form', 'formglut' ) : __( 'Add New Form', 'formglut' ),
			'formglut-entries'      => __( 'Entries', 'formglut' ),
			'formglut-entry-detail' => __( 'Entry Detail', 'formglut' ),
			'formglut-form-settings' => __( 'Form Settings', 'formglut' ),
			'formglut-settings'     => __( 'Global Settings', 'formglut' ),
			'formglut-pro-features' => __( 'Pro Features', 'formglut' ),
			'formglut-preview'      => __( 'Form Preview', 'formglut' ),
		);
		if ( isset( $map[ $page ] ) ) {
			return $map[ $page ] . ' ‹ FormGlut ‹ ' . get_bloginfo( 'name' );
		}
		return $admin_title;
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
			__( 'Global Settings', 'formglut' ),
			__( 'Global Settings', 'formglut' ),
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

		// Hidden submenu — Form Settings (settings of one form, opened with ?form_id=).
		add_submenu_page(
			'__formglut_does_not_exist',
			__( 'Form Settings', 'formglut' ),
			'',
			'manage_options',
			'formglut-form-settings',
			array( $this, 'render_form_settings_page' )
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
	global $pagenow;

	// Only hide admin elements on FormGlut pages
	$is_formglut_page = isset( $_GET['page'] ) && strpos( sanitize_text_field( wp_unslash( $_GET['page'] ) ), 'formglut' ) === 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

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

	// Only hide WordPress admin elements on FormGlut pages
	if ( $is_formglut_page ) {
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
		</style>
		<?php
	}
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
			'formglut-form-settings' => 'form-settings',
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
				'form_settings' => admin_url( 'admin.php?page=formglut-form-settings' ),
				'entry_detail' => admin_url( 'admin.php?page=formglut-entry-detail' ),
				'preview'      => admin_url( 'admin.php?page=formglut-preview' ),
				'pro_features' => admin_url( 'admin.php?page=formglut-pro-features' ),
			),
			'plugin_url'   => FORMGLUT_PLUGIN_URL,
			'dashboard_url' => admin_url( 'index.php' ),
			'admin_email'   => wp_get_current_user()->user_email,
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
			'formglut-form-settings',
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
					<h1 class="fg-pro-title">99 Pro Features</h1>
					<p class="fg-pro-subtitle">Unlock powerful fields, options, and integrations to create any form you can imagine</p>
					<a href="https://formglut.com/pro" class="fg-pro-cta-btn" target="_blank">Get FormGlut Pro →</a>
				</div>

				<!-- Tabs -->
				<div class="fg-pro-tabs">
					<button class="fg-pro-tab active" onclick="switchTab('fields')">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
						Pro Fields <span style="opacity: 0.5; font-size: 12px;">(44)</span>
					</button>
					<button class="fg-pro-tab" onclick="switchTab('options')">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M1 12h6m6 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/></svg>
						Pro Options <span style="opacity: 0.5; font-size: 12px;">(32)</span>
					</button>
					<button class="fg-pro-tab" onclick="switchTab('integrations')">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
						Integrations <span style="opacity: 0.5; font-size: 12px;">(23)</span>
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
						array('icon' => '📍', 'title' => 'Address Autocomplete + Map', 'desc' => 'Google Places autocomplete, map picker and IP-based defaults', 'tag' => 'Smart'),
						array('icon' => '🔗', 'title' => 'Chained Select', 'desc' => 'Dependent dropdowns that update based on the previous choice', 'tag' => 'Conditional'),
						array('icon' => '👍', 'title' => 'Like / Dislike', 'desc' => 'Quick thumbs up / down feedback', 'tag' => 'Feedback'),
						array('icon' => '📑', 'title' => 'Repeat Field', 'desc' => 'Repeat a group of fields with add / remove', 'tag' => 'Dynamic'),
						array('icon' => '🏷️', 'title' => 'Tag Input', 'desc' => 'Tag-style input for labels and categories', 'tag' => 'Input'),
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
						array('icon' => '🎵', 'title' => 'Audio Upload', 'desc' => 'Upload or record audio', 'tag' => 'Media'),
						array('icon' => '🎨', 'title' => 'Color Swatch', 'desc' => 'Pick a colour from swatches', 'tag' => 'Design'),
						array('icon' => '↔️', 'title' => 'Dual List Box', 'desc' => 'Move items between two lists', 'tag' => 'Input'),
						array('icon' => '🧩', 'title' => 'Dynamic Choices / Dynamic List', 'desc' => 'Choices from posts, taxonomies, users or an API', 'tag' => 'Dynamic'),
						array('icon' => '😊', 'title' => 'Emoji Rating', 'desc' => 'Emoji / smiley rating', 'tag' => 'Feedback'),
						array('icon' => '🖼️', 'title' => 'Image Select / Image Choices', 'desc' => 'Radio and checkbox options shown as pictures', 'tag' => 'Visual'),
						array('icon' => '🔎', 'title' => 'Lookup Field', 'desc' => 'Fill a field from another value or list', 'tag' => 'Dynamic'),
						array('icon' => '📈', 'title' => 'Net Promoter Score', 'desc' => '0 to 10 how-likely-to-recommend scale', 'tag' => 'Survey'),
						array('icon' => '💾', 'title' => 'Save & Resume / Partial Entries', 'desc' => 'Visitors come back later; unfinished entries are kept', 'tag' => 'Workflow'),
						array('icon' => '✍️', 'title' => 'Signature', 'desc' => 'Draw or type a signature saved as an image', 'tag' => 'Advanced'),
						array('icon' => '👥', 'title' => 'Social Profiles', 'desc' => 'Collect social profile links', 'tag' => 'Input'),
						array('icon' => '🎬', 'title' => 'Video / Media Embed', 'desc' => 'Show a video or media inside the form', 'tag' => 'Media'),
						array('icon' => '👁️', 'title' => 'Entry Preview / Review before submit', 'desc' => 'Summary page before the final submit', 'tag' => 'Review'),
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
						array('icon' => '✂️', 'title' => 'Cropped Image Upload', 'desc' => 'Crop the image before uploading', 'tag' => 'Upload'),
						array('icon' => '📷', 'title' => 'Webcam / Camera Capture', 'desc' => 'Capture a photo or video from the camera', 'tag' => 'Media'),
						array('icon' => '🎙️', 'title' => 'Voice Recording', 'desc' => 'Record audio in the browser', 'tag' => 'Media'),
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
						array('icon' => '📊', 'title' => 'Likert / Matrix / Grid', 'desc' => 'Rows-by-columns survey grid (checkable and multiple-choice grids)', 'tag' => 'Survey'),
						array('icon' => '🖼️', 'title' => 'Image Comparison', 'desc' => 'Compare two images with a slider', 'tag' => 'Survey'),
						array('icon' => '🎯', 'title' => 'Quiz (scored)', 'desc' => 'Scored quiz with pass / fail and result pages', 'tag' => 'Quiz'),
						array('icon' => '📊', 'title' => 'Surveys & Polls with Results', 'desc' => 'Poll bars and survey result charts', 'tag' => 'Survey'),
						array('icon' => '🔢', 'title' => 'Ranking', 'desc' => 'Drag options into order', 'tag' => 'Survey'),
						array('icon' => '⚖️', 'title' => 'Semantic Differential', 'desc' => 'Bipolar scale rating', 'tag' => 'Survey'),
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
						array('icon' => '🎟️', 'title' => 'Coupon Code', 'desc' => 'Percent or fixed discounts with limits and expiry', 'tag' => 'Discount'),
						array('icon' => '💝', 'title' => 'Donation', 'desc' => 'Suggested amounts and recurring donations', 'tag' => 'Donation'),
						array('icon' => '💳', 'title' => 'Payment Method + Payment Summary', 'desc' => 'Let visitors choose a method; show an order summary', 'tag' => 'Checkout'),
						array('icon' => '🛍️', 'title' => 'Product Variations', 'desc' => 'Size / colour variants with their own price', 'tag' => 'Products'),
						array('icon' => '🔢', 'title' => 'Quantity / Multiple Items / Total / Shipping', 'desc' => 'Several products, quantities, shipping options and an order total', 'tag' => 'Products'),
						array('icon' => '🚚', 'title' => 'Shipping Address', 'desc' => 'Separate shipping details', 'tag' => 'Shipping'),
						array('icon' => '🔁', 'title' => 'Subscriptions & Recurring Billing', 'desc' => 'Monthly or yearly plans, trials, cancel and update card', 'tag' => 'Recurring'),
						array('icon' => '🧾', 'title' => 'Tax Calculation', 'desc' => 'Automatic tax by rate or region', 'tag' => 'Tax'),
						array('icon' => '📦', 'title' => 'Inventory / Stock Limits', 'desc' => 'Limit how many of an item can be ordered', 'tag' => 'Stock'),
						array('icon' => '🧮', 'title' => 'Payments Dashboard & Refunds', 'desc' => 'Payments list, refunds and receipts per entry', 'tag' => 'Reports'),
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
						array('icon' => '🛡️', 'title' => 'Slider Captcha', 'desc' => 'Drag-to-verify captcha', 'tag' => 'Captcha'),
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
						array('icon' => '📂', 'title' => 'Accordion', 'desc' => 'Collapsible sections', 'tag' => 'Layout'),
						array('icon' => '⏱️', 'title' => 'Countdown Timer', 'desc' => 'Timer that closes the form or a step', 'tag' => 'Layout'),
						array('icon' => '🗂️', 'title' => 'Tabs', 'desc' => 'Group fields in tabs', 'tag' => 'Layout'),
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
						array('icon' => '📝', 'title' => 'Post Submission (category, tags, featured image)', 'desc' => 'Create posts or custom post types from a form', 'tag' => 'Content'),
						array('icon' => '👤', 'title' => 'User Registration / Login', 'desc' => 'Create a WordPress user, log in, update a profile', 'tag' => 'Users'),
						array('icon' => '🔑', 'title' => 'User Role Selection', 'desc' => 'Let a user pick a role on sign-up', 'tag' => 'Users'),
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
						array('icon' => '🕘', 'title' => 'Form Revisions / Version History', 'desc' => 'Restore earlier versions of a form', 'tag' => 'History'),
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

			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
					Logic &amp; Workflow
				</h2>
				<div class="fg-pro-grid">
					<?php
					$logic_options = array(
						array('icon' => '📨', 'title' => 'Multiple + Conditional Notifications', 'desc' => 'Several emails per form, sent by answers', 'tag' => 'Workflow'),
						array('icon' => '🔀', 'title' => 'Conditional Confirmations & Redirects', 'desc' => 'Different message or page by answers', 'tag' => 'Workflow'),
						array('icon' => '📧', 'title' => 'Double Opt-in / Email Verification', 'desc' => 'Confirm the email before the entry counts', 'tag' => 'Verify'),
						array('icon' => '📄', 'title' => 'Form Landing Pages', 'desc' => 'Standalone shareable page per form', 'tag' => 'Publish'),
						array('icon' => '💬', 'title' => 'Conversational Forms', 'desc' => 'One question at a time, full-screen', 'tag' => 'Workflow'),
						array('icon' => '🔐', 'title' => 'Form Locker / Password Protection', 'desc' => 'Protect a form with a password or rules', 'tag' => 'Access'),
						array('icon' => '✅', 'title' => 'Approval Workflows & Entry Automation', 'desc' => 'Admin approval and automatic actions', 'tag' => 'Workflow'),
						array('icon' => '🖊️', 'title' => 'Front-end Posting & Editing', 'desc' => 'Users create posts and edit their own entries', 'tag' => 'Content'),
						array('icon' => '📚', 'title' => 'Directories & Views', 'desc' => 'Show entries on the site with a shortcode', 'tag' => 'Display'),
						array('icon' => '📴', 'title' => 'Offline Forms', 'desc' => 'Keep answers when the connection drops', 'tag' => 'Reliability'),
						array('icon' => '🚪', 'title' => 'Form Abandonment Recovery', 'desc' => 'Capture and follow up on people who leave', 'tag' => 'Recovery'),
					);
					foreach ($logic_options as $opt) :
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

			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
					Design &amp; Branding
				</h2>
				<div class="fg-pro-grid">
					<?php
					$design_options = array(
						array('icon' => '🎨', 'title' => 'Advanced Form Styler + Presets', 'desc' => 'Colours, fonts, spacing, button styles and saved presets', 'tag' => 'Design'),
						array('icon' => '🗃️', 'title' => 'Premium Template Library', 'desc' => 'Hundreds of industry templates', 'tag' => 'Templates'),
						array('icon' => '✉️', 'title' => 'Email Template Builder', 'desc' => 'Branded HTML emails with header, footer and logo', 'tag' => 'Email'),
						array('icon' => '🏷️', 'title' => 'White Label', 'desc' => 'Re-brand the plugin for clients', 'tag' => 'Agency'),
					);
					foreach ($design_options as $opt) :
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

			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
					AI &amp; Developer
				</h2>
				<div class="fg-pro-grid">
					<?php
					$ai_options = array(
						array('icon' => '🤖', 'title' => 'AI Form Builder + ChatGPT Actions', 'desc' => 'Generate a form from a prompt; AI summaries', 'tag' => 'AI'),
						array('icon' => '🔌', 'title' => 'REST API + MCP Tools', 'desc' => 'Read forms and entries from other systems', 'tag' => 'Developer'),
						array('icon' => '🚚', 'title' => 'Migrator with Entries', 'desc' => 'Import forms and entries from CF7, WPForms, Gravity, Ninja, Caldera, Fluent', 'tag' => 'Migrate'),
					);
					foreach ($ai_options as $opt) :
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
						array('icon' => '📤', 'title' => 'Excel & Scheduled Exports', 'desc' => 'Excel / JSON exports emailed on a schedule', 'tag' => 'Export'),
						array('icon' => '✏️', 'title' => 'Edit Entries (Inline Edit)', 'desc' => 'Edit a submitted entry in admin', 'tag' => 'Entries'),
						array('icon' => '🔄', 'title' => 'Entry Reprocessing', 'desc' => 'Re-run emails and integrations for an entry', 'tag' => 'Entries'),
						array('icon' => '🗄️', 'title' => 'Advanced Entry Management', 'desc' => 'Saved filters, column choice, assign, status workflow', 'tag' => 'Entries'),
						array('icon' => '📄', 'title' => 'PDF Generator', 'desc' => 'PDF of an entry, attachable to emails', 'tag' => 'Export'),
						array('icon' => '📈', 'title' => 'Reports, Charts & Email Summaries', 'desc' => 'Submission, conversion and field charts; weekly email', 'tag' => 'Reports'),
						array('icon' => '🧭', 'title' => 'User Journey / Flow Tracking', 'desc' => 'Pages visited before submitting', 'tag' => 'Reports'),
						array('icon' => '📡', 'title' => 'Google Analytics & GTM Events', 'desc' => 'Fire events on view, start and submit', 'tag' => 'Tracking'),
						array('icon' => '🧾', 'title' => 'Activity / Audit Log', 'desc' => 'Who viewed, changed or emailed an entry', 'tag' => 'Audit'),
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
						array('icon' => '🌍', 'title' => 'IP & Country Restrictions (Geo-blocking)', 'desc' => 'Block or allow by IP range or country', 'tag' => 'Access'),
						array('icon' => '🧑‍⚖️', 'title' => 'Moderation Queue', 'desc' => 'Review flagged entries before accepting', 'tag' => 'Review'),
						array('icon' => '🔏', 'title' => 'GDPR Toolkit (consent log, retention rules)', 'desc' => 'Consent records and automatic retention', 'tag' => 'Privacy'),
						array('icon' => '🧑‍💼', 'title' => 'Role Manager', 'desc' => 'Who can build forms and view / export entries', 'tag' => 'Access'),
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
						array('icon' => '🅿️', 'title' => 'PayPal', 'desc' => 'PayPal Commerce / Checkout', 'tag' => 'PayPal'),
						array('icon' => '◼️', 'title' => 'Square', 'desc' => 'Square payments', 'tag' => 'Square'),
						array('icon' => '💶', 'title' => 'Mollie', 'desc' => 'Mollie payments', 'tag' => 'Mollie'),
						array('icon' => '💸', 'title' => 'Razorpay', 'desc' => 'Razorpay payments', 'tag' => 'Razorpay'),
						array('icon' => '🏦', 'title' => 'Authorize.net, Elavon, 2Checkout, Mercado Pago', 'desc' => 'More payment gateways', 'tag' => 'Gateways'),
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
						array('icon' => '📮', 'title' => 'ConvertKit (Kit)', 'desc' => 'Kit forms and tags', 'tag' => 'Kit'),
						array('icon' => '📧', 'title' => 'ActiveCampaign', 'desc' => 'Contacts and automations', 'tag' => 'ActiveCampaign'),
						array('icon' => '📨', 'title' => 'GetResponse', 'desc' => 'Subscribe to GetResponse', 'tag' => 'GetResponse'),
						array('icon' => '✉️', 'title' => 'Brevo, MailerLite, Klaviyo, Constant Contact, AWeber, Campaign Monitor, MailPoet', 'desc' => 'More email marketing', 'tag' => 'Email'),
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
						array('icon' => '☁️', 'title' => 'Salesforce', 'desc' => 'Create leads and contacts', 'tag' => 'Salesforce'),
						array('icon' => '📇', 'title' => 'Zoho CRM', 'desc' => 'Zoho leads', 'tag' => 'Zoho'),
						array('icon' => '📊', 'title' => 'Pipedrive', 'desc' => 'Deals and people', 'tag' => 'Pipedrive'),
						array('icon' => '📋', 'title' => 'Trello', 'desc' => 'Cards from entries', 'tag' => 'Trello'),
						array('icon' => '📗', 'title' => 'Google Sheets / Drive / Calendar', 'desc' => 'Append rows, store files, create events', 'tag' => 'Sheets'),
						array('icon' => '🗃️', 'title' => 'Airtable / Notion / Asana', 'desc' => 'Records and tasks from entries', 'tag' => 'Airtable'),
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
						array('icon' => '🪝', 'title' => 'Advanced Webhooks', 'desc' => 'Headers, field mapping, retries, delivery log', 'tag' => 'Automation'),
						array('icon' => '⚡', 'title' => 'Zapier / Make / n8n / Automator', 'desc' => 'Native apps for automation tools', 'tag' => 'Automation'),
						array('icon' => '🔗', 'title' => 'Make (Integromat)', 'desc' => 'Make scenarios', 'tag' => 'Automation'),
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

			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
					Messaging &amp; SMS
				</h2>
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<?php
					$msg_integrations = array(
						array('icon' => '💬', 'title' => 'Discord / Telegram alerts', 'desc' => 'Post to Discord or Telegram', 'tag' => 'Alerts'),
						array('icon' => '📱', 'title' => 'SMS (Twilio, ClickSend)', 'desc' => 'Text the admin or submitter', 'tag' => 'SMS'),
					);
					foreach ($msg_integrations as $int) :
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

			<div class="fg-pro-section">
				<h2 class="fg-pro-section-title">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
					Store, Storage &amp; Languages
				</h2>
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<?php
					$other_integrations = array(
						array('icon' => '🛒', 'title' => 'WooCommerce', 'desc' => 'Sell products and sync orders', 'tag' => 'Store'),
						array('icon' => '☁️', 'title' => 'Cloud Storage for Uploads', 'desc' => 'Send files to Dropbox, Google Drive or S3', 'tag' => 'Storage'),
						array('icon' => '🌐', 'title' => 'Multilingual (WPML, Polylang)', 'desc' => 'Translate labels, messages and emails', 'tag' => 'Languages'),
					);
					foreach ($other_integrations as $int) :
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
	 * Render the settings page of a single form.
	 *
	 * @return void
	 */
	public function render_form_settings_page() {
		$this->render_page( 'form-settings.html' );
	}

	/**
	 * Output the preview page as a standalone document, before the admin chrome loads.
	 *
	 * The shell (header + device switcher) embeds the form in an iframe so that
	 * responsive CSS reacts to the chosen device width.
	 *
	 * @return void
	 */
	public function maybe_render_preview() {
		if ( ! isset( $_GET['page'] ) || 'formglut-preview' !== sanitize_key( wp_unslash( $_GET['page'] ) ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return;
		}
		$this->render_preview_page();
		exit;
	}

	/**
	 * Render the form preview (shell or iframe content).
	 *
	 * @return void
	 */
	public function render_preview_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized access.', 'formglut' ) );
		}

		$form_id = isset( $_GET['form_id'] ) ? absint( $_GET['form_id'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$form    = $form_id ? FormGlut_Form::get( $form_id ) : null;
		if ( ! $form ) {
			wp_die( esc_html__( 'Form not found.', 'formglut' ) );
		}

		if ( ! empty( $_GET['fg_frame'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$this->render_preview_frame( $form );
			return;
		}

		$is_active = in_array( $form->status, array( 'active', 'published' ), true );
		$frame_url = add_query_arg( array( 'page' => 'formglut-preview', 'form_id' => $form_id, 'fg_frame' => 1 ), admin_url( 'admin.php' ) );
		$edit_url  = add_query_arg( array( 'page' => 'formglut-editor', 'form_id' => $form_id ), admin_url( 'admin.php' ) );
		?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title><?php
	/* translators: %s: form title */
	printf( esc_html__( 'Preview: %s', 'formglut' ), esc_html( $form->title ) );
	?></title>
	<style>
		* { box-sizing: border-box; }
		html, body { margin: 0; height: 100%; }
		body { display: flex; flex-direction: column; background: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1e293b; }
		.fg-pv-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 20px; background: #fff; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; }
		.fg-pv-left, .fg-pv-right { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }
		.fg-pv-right { justify-content: flex-end; }
		.fg-pv-title { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
		.fg-pv-badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 10px; flex-shrink: 0; }
		.fg-pv-badge.active { background: #ecfdf5; color: #059669; }
		.fg-pv-badge.draft { background: #fff7ed; color: #c2410c; }
		.fg-pv-devices { display: flex; gap: 4px; background: #f1f5f9; padding: 4px; border-radius: 8px; }
		.fg-pv-device { display: flex; align-items: center; justify-content: center; width: 36px; height: 32px; border: 0; border-radius: 6px; background: transparent; color: #64748b; cursor: pointer; transition: all .15s; }
		.fg-pv-device:hover { color: #1e293b; background: #e2e8f0; }
		.fg-pv-device.active { background: #fff; color: #e94560; box-shadow: 0 1px 2px rgba(0,0,0,.08); }
		.fg-pv-width { font-size: 12px; color: #94a3b8; min-width: 48px; text-align: center; }
		.fg-pv-btn { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: #fff; color: #334155; font-size: 13px; text-decoration: none; cursor: pointer; transition: all .15s; }
		.fg-pv-btn:hover { border-color: #e94560; color: #e94560; }
		.fg-pv-btn.primary { background: #e94560; border-color: #e94560; color: #fff; }
		.fg-pv-btn.primary:hover { background: #d63853; color: #fff; }
		.fg-pv-stage { flex: 1; overflow: auto; padding: 24px; display: flex; justify-content: center; }
		.fg-pv-frame { width: 100%; height: 100%; min-height: 400px; border: 0; background: #fff; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,.08); transition: width .3s ease; }
		@media (max-width: 700px) { .fg-pv-width, .fg-pv-btn span { display: none; } }
	</style>
</head>
<body>
	<header class="fg-pv-header">
		<div class="fg-pv-left">
			<span class="fg-pv-title"><?php echo esc_html( $form->title ); ?></span>
			<span class="fg-pv-badge <?php echo $is_active ? 'active' : 'draft'; ?>"><?php echo $is_active ? esc_html__( 'Active', 'formglut' ) : esc_html( ucfirst( $form->status ) ); ?></span>
		</div>
		<div class="fg-pv-devices" role="group" aria-label="<?php esc_attr_e( 'Device width', 'formglut' ); ?>">
			<button type="button" class="fg-pv-device active" data-width="100%" title="<?php esc_attr_e( 'Desktop', 'formglut' ); ?>"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></button>
			<button type="button" class="fg-pv-device" data-width="768px" title="<?php esc_attr_e( 'Tablet', 'formglut' ); ?>"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg></button>
			<button type="button" class="fg-pv-device" data-width="375px" title="<?php esc_attr_e( 'Mobile', 'formglut' ); ?>"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg></button>
			<span class="fg-pv-width" id="fg-pv-width">100%</span>
		</div>
		<div class="fg-pv-right">
			<button type="button" class="fg-pv-btn" id="fg-pv-reload" title="<?php esc_attr_e( 'Reload preview', 'formglut' ); ?>"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg><span><?php esc_html_e( 'Reload', 'formglut' ); ?></span></button>
			<a class="fg-pv-btn primary" href="<?php echo esc_url( $edit_url ); ?>"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg><span><?php esc_html_e( 'Edit Form', 'formglut' ); ?></span></a>
		</div>
	</header>
	<main class="fg-pv-stage">
		<iframe class="fg-pv-frame" id="fg-pv-frame" src="<?php echo esc_url( $frame_url ); ?>" title="<?php esc_attr_e( 'Form preview', 'formglut' ); ?>"></iframe>
	</main>
	<script>
	(function () {
		var frame = document.getElementById('fg-pv-frame');
		var label = document.getElementById('fg-pv-width');
		var btns = document.querySelectorAll('.fg-pv-device');
		btns.forEach(function (btn) {
			btn.addEventListener('click', function () {
				btns.forEach(function (b) { b.classList.remove('active'); });
				btn.classList.add('active');
				frame.style.width = btn.dataset.width;
				label.textContent = btn.dataset.width;
			});
		});
		document.getElementById('fg-pv-reload').addEventListener('click', function () {
			frame.contentWindow.location.reload();
		});
	})();
	</script>
</body>
</html>
		<?php
	}

	/**
	 * Render the form alone, for use inside the preview iframe.
	 *
	 * @param object $form Form object.
	 * @return void
	 */
	private function render_preview_frame( $form ) {
		$form_html = FormGlut_Shortcode::get_instance()->render_preview( $form );
		$is_active = in_array( $form->status, array( 'active', 'published' ), true );
		?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_print_styles( 'formglut-frontend' ); ?>
	<style>
		body { margin: 0; padding: 24px 16px; background: #fff; }
		.fg-pv-notice { max-width: 640px; margin: 0 auto 16px; padding: 10px 14px; border-radius: 8px; background: #fff7ed; border: 1px solid #fed7aa; color: #9a3412; font: 13px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
	</style>
</head>
<body>
	<?php if ( ! $is_active ) : ?>
		<div class="fg-pv-notice"><?php esc_html_e( 'This form is not active, so it will not display on your site until you activate it.', 'formglut' ); ?></div>
	<?php endif; ?>
	<?php echo $form_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped while building. ?>
	<?php wp_print_scripts( array( 'formglut-frontend', 'formglut-recaptcha', 'formglut-hcaptcha', 'formglut-turnstile' ) ); ?>
</body>
</html>
		<?php
	}

	/**
	 * Render a page from formglut_simple/ HTML templates.
	 *
	 * @param string $template_file File name (e.g. 'all-forms.html').
	 * @return void
	 */
	private function render_page( $template_file ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Unauthorized access.', 'formglut' ) );
		}

		$plugin_url = FORMGLUT_PLUGIN_URL;
		$dashboard_url = admin_url( 'index.php' );

		echo '<style>';


		echo '#adminmenumain, #wpadminbar, #wpfooter, .update-nag, .notice { display: none !important; }';
		echo 'html.wp-toolbar { padding-top: 0 !important; height: auto !important; overflow: auto !important; }';
		echo 'body { overflow: auto !important; height: auto !important; }';
		echo '#wpwrap { height: auto !important; min-height: 100vh !important; overflow: visible !important; }';
		echo '#wpcontent { margin-left: 0 !important; padding-left: 0 !important; height: auto !important; overflow: visible !important; }';
		echo '#wpbody { padding-top: 0 !important; height: auto !important; overflow: visible !important; }';
		echo '#wpbody-content { overflow: visible !important; padding-bottom: 0 !important; }';
		echo '.wrap { margin: 0 !important; }';
		echo '.fg-skeleton-shimmer { animation: fg-shimmer 1.5s infinite; background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%); background-size: 200% 100%; }';
		echo '@keyframes fg-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }';
		echo '</style>';

		// Skeleton loader that will be replaced by React
		echo '<div id="formglut-root">';

		// Header skeleton
		echo '<header style="display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; border-bottom: 1px solid #f0f0f0; background: #fff;">';
		echo '<div style="display: flex; align-items: center; gap: 16px;">';
		echo '<div class="fg-skeleton-shimmer" style="width: 80px; height: 36px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 120px; height: 36px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '</div>';
		echo '<nav style="display: flex; gap: 4px;">';
		echo '<div class="fg-skeleton-shimmer" style="width: 70px; height: 32px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 70px; height: 32px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 70px; height: 32px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '</nav>';
		echo '</header>';

		// Content skeleton
		echo '<div style="padding: 24px;">';

		// Page header skeleton
		echo '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">';
		echo '<div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 180px; height: 32px; background: #f2f2f2; border-radius: 4px; margin-bottom: 8px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 240px; height: 18px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '</div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 150px; height: 32px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '</div>';

		// Stats row skeleton
		echo '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">';
		for ( $i = 0; $i < 4; $i++ ) {
			echo '<div style="background: #fff; border: 1px solid #f0f0f0; border-radius: 8px; padding: 16px;">';
			echo '<div class="fg-skeleton-shimmer" style="width: 90px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
			echo '<div class="fg-skeleton-shimmer" style="width: 60px; height: 32px; background: #f2f2f2; border-radius: 4px; margin-top: 8px;"></div>';
			echo '<div class="fg-skeleton-shimmer" style="width: 120px; height: 14px; background: #f2f2f2; border-radius: 4px; margin-top: 6px;"></div>';
			echo '</div>';
		}
		echo '</div>';

		// Table skeleton
		echo '<div style="background: #fff; border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden;">';
		echo '<div style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">';
		echo '<div class="fg-skeleton-shimmer" style="width: 240px; height: 32px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '</div>';

		// Table header row
		echo '<div style="display: flex; gap: 16px; padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">';
		echo '<div class="fg-skeleton-shimmer" style="width: 24px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 200px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 120px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 60px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 80px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 80px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '<div class="fg-skeleton-shimmer" style="width: 60px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '</div>';

		// Table data rows
		for ( $i = 0; $i < 6; $i++ ) {
			echo '<div style="display: flex; align-items: center; gap: 16px; padding: 14px 20px; border-bottom: 1px solid #fafafa;">';
			echo '<div class="fg-skeleton-shimmer" style="width: 24px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
			echo '<div style="display: flex; align-items: center; gap: 10px; flex: 1;">';
			echo '<div class="fg-skeleton-shimmer" style="width: 36px; height: 36px; background: #f2f2f2; border-radius: 4px;"></div>';
			echo '<div>';
			echo '<div class="fg-skeleton-shimmer" style="width: 160px; height: 16px; background: #f2f2f2; border-radius: 4px; margin-bottom: 4px;"></div>';
			echo '<div class="fg-skeleton-shimmer" style="width: 130px; height: 12px; background: #f2f2f2; border-radius: 4px;"></div>';
			echo '</div>';
			echo '</div>';
			echo '<div class="fg-skeleton-shimmer" style="width: 130px; height: 24px; background: #f2f2f2; border-radius: 4px;"></div>';
			echo '<div class="fg-skeleton-shimmer" style="width: 40px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
			echo '<div class="fg-skeleton-shimmer" style="width: 50px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
			echo '<div class="fg-skeleton-shimmer" style="width: 40px; height: 16px; background: #f2f2f2; border-radius: 4px;"></div>';
			echo '<div style="display: flex; gap: 4px;">';
			echo '<div class="fg-skeleton-shimmer" style="width: 28px; height: 28px; background: #f2f2f2; border-radius: 50%;"></div>';
			echo '<div class="fg-skeleton-shimmer" style="width: 28px; height: 28px; background: #f2f2f2; border-radius: 50%;"></div>';
			echo '</div>';
			echo '</div>';
		}

		// Pagination skeleton
		echo '<div style="display: flex; justify-content: flex-end; padding: 16px 20px;">';
		echo '<div class="fg-skeleton-shimmer" style="width: 200px; height: 24px; background: #f2f2f2; border-radius: 4px;"></div>';
		echo '</div>';
		echo '</div>';
		echo '</div>';
		echo '</div>';
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
			'admin_page_formglut-form-settings',
			'admin_page_formglut-preview',
		);

		return in_array( $hook, $formglut_hooks, true );
	}
}
