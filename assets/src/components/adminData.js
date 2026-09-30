/**
 * Data localized by PHP (formglut_admin) with safe fallbacks, shared by the headers and the nav menu.
 */
const admin = typeof formglut_admin !== 'undefined' ? formglut_admin : {};

export const _pg = admin.pages || {
  all_forms: 'all-forms.html',
  editor: 'form-editor.html',
  entries: 'entries.html',
  settings: 'settings.html',
  tools: 'tools.html',
  form_settings: 'form-settings.html',
  entry_detail: 'single-entry.html',
  preview: 'preview.html',
  pro_features: 'pro-features.html',
};

export const _dashboard = admin.dashboard_url || '/wp-admin/';

export const _pluginUrl = admin.plugin_url || '';
