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
