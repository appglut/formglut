const { ajax_url, nonce } = window.formglut_admin || {};
async function request(action, data = {}, method = "GET") {
  if (!ajax_url || !nonce) {
    throw new Error("FormGlut admin data not loaded.");
  }
  const isGet = method === "GET";
  let url = ajax_url;
  const body = new FormData();
  body.append("action", action);
  body.append("nonce", nonce);
  Object.entries(data).forEach(([key, value]) => {
    if (value === void 0 || value === null) return;
    body.append(key, typeof value === "object" ? JSON.stringify(value) : value);
  });
  if (isGet) {
    const params = new URLSearchParams();
    params.append("action", action);
    params.append("nonce", nonce);
    Object.entries(data).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        params.append(key, typeof value === "object" ? JSON.stringify(value) : value);
      }
    });
    url += "?" + params.toString();
  }
  const options = { method: isGet ? "GET" : "POST", credentials: "same-origin" };
  if (!isGet) options.body = body;
  const response = await fetch(url, options);
  const result = await response.json();
  if (!result.success) {
    const msg = result.data && result.data.message ? result.data.message : "Request failed.";
    const err = new Error(msg);
    err.data = result.data;
    throw err;
  }
  return result.data;
}
function getForms(params = {}) {
  return request("formglut_get_forms", params, "GET");
}
function getFormStats() {
  return request("formglut_get_form_stats", {}, "GET");
}
function getForm(id) {
  return request("formglut_get_form", { id }, "GET");
}
function createForm(data) {
  return request("formglut_create_form", data, "POST");
}
function updateForm(data) {
  return request("formglut_update_form", data, "POST");
}
function deleteForm(id) {
  return request("formglut_delete_form", { id }, "POST");
}
function duplicateForm(id) {
  return request("formglut_duplicate_form", { id }, "POST");
}
function updateFormStatus(id, status) {
  return request("formglut_update_form_status", { id, status }, "POST");
}
function getEntries(params = {}) {
  return request("formglut_get_entries", params, "GET");
}
function getEntry(id) {
  return request("formglut_get_entry", { id }, "GET");
}
function getEntryCounts(params = {}) {
  return request("formglut_get_entry_counts", params, "GET");
}
function deleteEntry(id) {
  return request("formglut_delete_entry", { id }, "POST");
}
function updateEntryStatus(id, status) {
  return request("formglut_update_entry_status", { id, status }, "POST");
}
function toggleEntryStar(id) {
  return request("formglut_toggle_entry_star", { id }, "POST");
}
function getSettings() {
  return request("formglut_get_settings", {}, "GET");
}
export {
  deleteForm as a,
  duplicateForm as b,
  createForm as c,
  deleteEntry as d,
  getEntry as e,
  getEntryCounts as f,
  getEntries as g,
  getForm as h,
  getFormStats as i,
  getForms as j,
  getSettings as k,
  updateForm as l,
  updateFormStatus as m,
  toggleEntryStar as t,
  updateEntryStatus as u
};
//# sourceMappingURL=api-CyfhXhZs.js.map
