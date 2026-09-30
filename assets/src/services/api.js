/**
 * FormGlut API Service.
 *
 * Centralized wrapper around WordPress AJAX endpoints.
 * All backend communication goes through this module.
 */

const { ajax_url, nonce } = window.formglut_admin || {};

async function request(action, data = {}, method = 'GET') {
  if (!ajax_url || !nonce) {
    throw new Error('FormGlut admin data not loaded.');
  }

  const isGet = method === 'GET';
  let url = ajax_url;
  const body = new FormData();

  body.append('action', action);
  body.append('nonce', nonce);

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    body.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
  });

  if (isGet) {
    const params = new URLSearchParams();
    params.append('action', action);
    params.append('nonce', nonce);
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
      }
    });
    url += '?' + params.toString();
  }

  const options = { method: isGet ? 'GET' : 'POST', credentials: 'same-origin' };
  if (!isGet) options.body = body;

  const response = await fetch(url, options);
  const result = await response.json();

  if (!result.success) {
    const msg = (result.data && result.data.message) ? result.data.message : 'Request failed.';
    const err = new Error(msg);
    err.data = result.data;
    throw err;
  }

  return result.data;
}

/* ── Form Methods ─────────────────────────────────────────────────── */

export function getForms(params = {}) {
  return request('formglut_get_forms', params, 'GET');
}

export function getFormStats() {
  return request('formglut_get_form_stats', {}, 'GET');
}

export function getForm(id) {
  return request('formglut_get_form', { id }, 'GET');
}

export function createForm(data) {
  return request('formglut_create_form', data, 'POST');
}

export function updateForm(data) {
  return request('formglut_update_form', data, 'POST');
}

export function deleteForm(id) {
  return request('formglut_delete_form', { id }, 'POST');
}

export function duplicateForm(id) {
  return request('formglut_duplicate_form', { id }, 'POST');
}

export function updateFormStatus(id, status) {
  return request('formglut_update_form_status', { id, status }, 'POST');
}

/* ── Entry Methods ────────────────────────────────────────────────── */

export function getEntries(params = {}) {
  return request('formglut_get_entries', params, 'GET');
}

export function getEntry(id) {
  return request('formglut_get_entry', { id }, 'GET');
}

export function getEntryCounts(params = {}) {
  return request('formglut_get_entry_counts', params, 'GET');
}

export function deleteEntry(id) {
  return request('formglut_delete_entry', { id }, 'POST');
}

export function updateEntryStatus(id, status) {
  return request('formglut_update_entry_status', { id, status }, 'POST');
}

export function toggleEntryStar(id) {
  return request('formglut_toggle_entry_star', { id }, 'POST');
}

/* ── Settings Methods ─────────────────────────────────────────────── */

export function getSettings() {
  return request('formglut_get_settings', {}, 'GET');
}

export function saveSettings(settings) {
  return request('formglut_save_settings', { settings }, 'POST');
}

/* ── Tools ────────────────────────────────────────────────────────── */

const { ajax_url: _url, nonce: _nonce } = window.formglut_admin || {};

/** URL that downloads a file (GET handlers that send attachments). */
export function downloadUrl(action, params = {}) {
  const q = new URLSearchParams({ action, nonce: _nonce, ...Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')) });
  return `${_url}?${q.toString()}`;
}

export function exportFormsUrl(ids) {
  return downloadUrl('formglut_export_forms', { ids: [].concat(ids).join(',') });
}

export function importForms(data) {
  return request('formglut_import_forms', { data }, 'POST');
}

export function exportEntriesUrl(params = {}) {
  return downloadUrl('formglut_export_entries', params);
}

export function saveEntryNote(id, text) {
  return request('formglut_save_entry_notes', { id, text }, 'POST');
}

export function deleteEntryNote(id, noteId) {
  return request('formglut_save_entry_notes', { id, delete: noteId }, 'POST');
}

export function resendNotification(id) {
  return request('formglut_resend_notification', { id }, 'POST');
}

export function getEmailLog() {
  return request('formglut_get_email_log', {}, 'GET');
}

export function sendTestEmail(to) {
  return request('formglut_send_test_email', { to }, 'POST');
}

export function getMailchimpLists() {
  return request('formglut_get_mailchimp_lists', {}, 'GET');
}

export function toolsExportUrl(ids, entries) {
  const { ajax_url, nonce } = window.formglut_admin || {};
  return `${ajax_url}?action=formglut_tools_export&nonce=${nonce}&ids=${ids}&entries=${entries ? 1 : 0}`;
}

export function toolsImportPreview(data) {
  return request('formglut_tools_import_preview', { data }, 'POST');
}

export function toolsImport(data, opts) {
  return request('formglut_tools_import', { data, ...opts }, 'POST');
}

export function getLogs(params) {
  return request('formglut_tools_logs', params, 'GET');
}

export function getLogEvents(type) {
  return request('formglut_tools_log_events', { type }, 'GET');
}

export function clearLogs(type) {
  return request('formglut_tools_clear_logs', { type }, 'POST');
}

export function logSettings(settings) {
  return request('formglut_tools_log_settings', settings ? { settings } : {}, settings ? 'POST' : 'GET');
}

export function getSystemStatus() {
  return request('formglut_tools_status', {}, 'GET');
}

export function runMaintenance(task) {
  return request('formglut_tools_maintenance', { task }, 'POST');
}

export function getMigrationSources() {
  return request('formglut_get_migration_sources', {}, 'GET');
}

export function migrateEntries(source, id, form_id, offset) {
  return request('formglut_migrate_entries', { source, id, form_id, offset }, 'POST');
}

export function migrateForm(source, id) {
  return request('formglut_migrate_form', { source, id }, 'POST');
}
