import { bE as jsxRuntimeExports, bT as staticMethods, bP as reactExports, a4 as _pg, B as Button, ar as faChartLine, aW as faPalette, b4 as faShieldHalved, aR as faLock, aB as faEnvelope, av as faCircleCheck, aJ as faGear, i as FontAwesomeIcon, aE as faEye, H as Tooltip, az as faCode, aH as faFloppyDisk, ax as faCircleInfo, as as faCheck, aA as faCopy, ai as createRoot } from "./chunks/NavMenu-D0YBC0d1.js";
import { _ as __ } from "./chunks/default-i18n-Bi0ZJkXv.js";
import { E as EditorHeader } from "./chunks/EditorHeader-DE2K_3W-.js";
import { h as getForm, l as updateForm } from "./chunks/api-CyfhXhZs.js";
import { g as flattenFields } from "./chunks/fieldTypes-BVTzv2gA.js";
import { I as Input, S as Select, c as Spin } from "./chunks/index-CEbUDJaq.js";
import { T as TypedInputNumber } from "./chunks/index-C-rCU2IL.js";
import { S as Switch } from "./chunks/index-C0Htsu4a.js";
import { P as Popover } from "./chunks/index-DXRCHqrQ.js";
const DEFAULT_FORM_SETTINGS = {
  general: { show_title: false, form_class: "", submit_processing: "" },
  confirmation: { type: "message", message: "", redirect_url: "", after_submit: "reset", scroll: true, autoclose: 0, error_message: "" },
  notifications: {
    enabled: true,
    to: "",
    cc: "",
    bcc: "",
    from_name: "",
    from_email: "",
    reply_to: "",
    subject: "",
    message: "",
    autoresponder: { enabled: false, email_field: "", subject: "", message: "" }
  },
  restrictions: {
    require_login: false,
    guest_message: "",
    entry_limit: 0,
    limit_message: "",
    schedule_enabled: false,
    schedule_start: "",
    schedule_end: "",
    before_message: "",
    after_message: "",
    deny_empty: false,
    one_per_ip: false,
    duplicate_message: ""
  },
  spam: { honeypot: "global", akismet: false, keywords: "", keyword_action: "reject", store_ip: true, store_entries: "global", retention_days: 0, min_time: 0 },
  style: { form_width: "", form_align: "left", custom_css: "" },
  entries: { count_views: true }
};
function mergeFormSettings(saved) {
  const merge = (base, over) => {
    const out = { ...base };
    Object.keys(base).forEach((k) => {
      if (over && over[k] !== void 0 && over[k] !== null) {
        out[k] = base[k] && typeof base[k] === "object" && !Array.isArray(base[k]) ? merge(base[k], over[k]) : over[k];
      }
    });
    return out;
  };
  return merge(DEFAULT_FORM_SETTINGS, saved || {});
}
function buildSchema(emailFields) {
  const emailOptions = [{ value: "", label: __("— None —", "formglut") }, ...emailFields];
  return [
    {
      key: "general",
      title: __("General", "formglut"),
      fields: [
        { path: "general.show_title", type: "switch", label: __("Show form title", "formglut"), tip: __("Print the form title above the fields.", "formglut") },
        { path: "general.form_class", type: "text", label: __("Form CSS class", "formglut"), tip: __("Extra class(es) added to the form wrapper.", "formglut"), placeholder: "my-form" },
        { path: "general.submit_processing", type: "text", label: __("Button text while sending", "formglut"), tip: __("Shown on the submit button while the form is being sent.", "formglut"), placeholder: __("Sending…", "formglut") }
      ]
    },
    {
      key: "confirmation",
      title: __("Confirmation", "formglut"),
      fields: [
        { path: "confirmation.type", type: "select", label: __("After a successful submit", "formglut"), options: [{ value: "message", label: __("Show a message", "formglut") }, { value: "url", label: __("Redirect to a URL", "formglut") }] },
        { path: "confirmation.message", tags: true, type: "textarea", label: __("Success message", "formglut"), tip: __("Leave empty to use the global success message. Smart tags such as {field:FIELD_ID} work here.", "formglut"), show: (s) => s.confirmation.type === "message" },
        { path: "confirmation.redirect_url", tags: "url", type: "text", label: __("Redirect URL", "formglut"), tip: __("Full URL. You can add values, e.g. https://site.com/thanks?entry={entry_id}.", "formglut"), placeholder: "https://", show: (s) => s.confirmation.type === "url" },
        { path: "confirmation.after_submit", type: "select", label: __("Form after submit", "formglut"), options: [{ value: "reset", label: __("Clear the fields", "formglut") }, { value: "hide", label: __("Hide the form", "formglut") }, { value: "keep", label: __("Keep the values", "formglut") }], show: (s) => s.confirmation.type === "message" },
        { path: "confirmation.scroll", type: "switch", label: __("Scroll to the message", "formglut"), show: (s) => s.confirmation.type === "message" },
        { path: "confirmation.autoclose", type: "number", label: __("Hide message after (seconds)", "formglut"), tip: __("0 keeps the message on screen.", "formglut"), show: (s) => s.confirmation.type === "message" },
        { path: "confirmation.error_message", type: "textarea", label: __("Failure message", "formglut"), tip: __("Leave empty to use the global error message.", "formglut") }
      ]
    },
    {
      key: "notifications",
      title: __("Notifications", "formglut"),
      fields: [
        { path: "notifications.enabled", type: "switch", label: __("Send admin notification", "formglut") },
        { path: "notifications.to", tags: "plain", type: "text", label: __("Send to", "formglut"), tip: __("Comma-separated addresses. Empty uses the admin email from Settings.", "formglut"), placeholder: "{admin_email}", show: (s) => s.notifications.enabled },
        { path: "notifications.cc", tags: "plain", type: "text", label: __("CC", "formglut"), show: (s) => s.notifications.enabled },
        { path: "notifications.bcc", tags: "plain", type: "text", label: __("BCC", "formglut"), show: (s) => s.notifications.enabled },
        { path: "notifications.from_name", tags: "plain", type: "text", label: __("From name", "formglut"), tip: __("Empty uses the sender name from Settings.", "formglut"), show: (s) => s.notifications.enabled },
        { path: "notifications.from_email", type: "text", label: __("From email", "formglut"), show: (s) => s.notifications.enabled },
        { path: "notifications.reply_to", type: "select", label: __("Reply-To", "formglut"), tip: __("Reply goes to the address the visitor typed in this field.", "formglut"), options: emailOptions, show: (s) => s.notifications.enabled },
        { path: "notifications.subject", tags: "plain", type: "text", label: __("Subject", "formglut"), tip: __("Empty uses the subject template from Settings.", "formglut"), placeholder: "New entry: {form_name}", show: (s) => s.notifications.enabled },
        { path: "notifications.message", tags: true, type: "textarea", rows: 6, label: __("Message", "formglut"), tip: __("Empty sends a table of all fields. Use {all_fields} to place that table inside your own text.", "formglut"), show: (s) => s.notifications.enabled },
        { path: "notifications.autoresponder.enabled", type: "switch", label: __("Send a confirmation email to the visitor", "formglut"), divider: true },
        { path: "notifications.autoresponder.email_field", type: "select", label: __("Visitor email field", "formglut"), options: emailOptions, show: (s) => s.notifications.autoresponder.enabled },
        { path: "notifications.autoresponder.subject", tags: "plain", type: "text", label: __("Subject", "formglut"), placeholder: "Thank you for contacting {site_name}", show: (s) => s.notifications.autoresponder.enabled },
        { path: "notifications.autoresponder.message", tags: true, type: "textarea", rows: 5, label: __("Message", "formglut"), show: (s) => s.notifications.autoresponder.enabled }
      ]
    },
    {
      key: "restrictions",
      title: __("Restrictions", "formglut"),
      fields: [
        { path: "restrictions.require_login", type: "switch", label: __("Only logged-in users", "formglut") },
        { path: "restrictions.guest_message", type: "text", label: __("Message for visitors", "formglut"), show: (s) => s.restrictions.require_login },
        { path: "restrictions.entry_limit", type: "number", label: __("Limit total entries", "formglut"), tip: __("0 = unlimited. The form closes when the limit is reached.", "formglut") },
        { path: "restrictions.limit_message", type: "text", label: __("Message when the limit is reached", "formglut"), show: (s) => s.restrictions.entry_limit > 0 },
        { path: "restrictions.schedule_enabled", type: "switch", label: __("Schedule the form", "formglut") },
        { path: "restrictions.schedule_start", type: "datetime", label: __("Opens", "formglut"), show: (s) => s.restrictions.schedule_enabled },
        { path: "restrictions.schedule_end", type: "datetime", label: __("Closes", "formglut"), show: (s) => s.restrictions.schedule_enabled },
        { path: "restrictions.before_message", type: "text", label: __("Message before opening", "formglut"), show: (s) => s.restrictions.schedule_enabled },
        { path: "restrictions.after_message", type: "text", label: __("Message after closing", "formglut"), show: (s) => s.restrictions.schedule_enabled },
        { path: "restrictions.deny_empty", type: "switch", label: __("Reject empty submissions", "formglut") },
        { path: "restrictions.one_per_ip", type: "switch", label: __("One entry per IP address", "formglut"), tip: __("Needs “Store IP address” to stay on.", "formglut") },
        { path: "restrictions.duplicate_message", type: "text", label: __("Message for repeat submissions", "formglut"), show: (s) => s.restrictions.one_per_ip }
      ]
    },
    {
      key: "spam",
      title: __("Spam & privacy", "formglut"),
      fields: [
        { path: "spam.honeypot", type: "select", label: __("Honeypot", "formglut"), options: [{ value: "global", label: __("Use global setting", "formglut") }, { value: "on", label: __("On for this form", "formglut") }, { value: "off", label: __("Off for this form", "formglut") }] },
        { path: "spam.akismet", type: "switch", label: __("Check with Akismet", "formglut"), tip: __("Needs the Akismet plugin with an API key. Spam is saved in the Spam folder.", "formglut") },
        { path: "spam.keywords", type: "textarea", rows: 4, label: __("Blocked words", "formglut"), tip: __("One word or phrase per line.", "formglut") },
        { path: "spam.keyword_action", type: "select", label: __("When a blocked word is found", "formglut"), options: [{ value: "reject", label: __("Reject the submission", "formglut") }, { value: "spam", label: __("Save it as spam", "formglut") }], show: (s) => s.spam.keywords.trim() !== "" },
        { path: "spam.min_time", type: "number", label: __("Minimum time to fill (seconds)", "formglut"), tip: __("0 = off. Faster submissions are treated as bots.", "formglut") },
        { path: "spam.store_entries", type: "select", label: __("Save entries", "formglut"), options: [{ value: "global", label: __("Use global setting", "formglut") }, { value: "save", label: __("Always save", "formglut") }, { value: "email_only", label: __("Email only, do not save", "formglut") }] },
        { path: "spam.store_ip", type: "switch", label: __("Store IP address and browser", "formglut") },
        { path: "spam.retention_days", type: "number", label: __("Delete entries after (days)", "formglut"), tip: __("0 keeps entries forever.", "formglut") }
      ]
    },
    {
      key: "style",
      title: __("Layout & CSS", "formglut"),
      fields: [
        { path: "style.form_width", type: "text", label: __("Form width", "formglut"), tip: __("For example 640px, 100% or 40rem. Empty uses the default.", "formglut"), placeholder: "640px" },
        { path: "style.form_align", type: "select", label: __("Form alignment", "formglut"), options: [{ value: "left", label: __("Left", "formglut") }, { value: "center", label: __("Center", "formglut") }, { value: "right", label: __("Right", "formglut") }] },
        { path: "style.custom_css", type: "code", rows: 6, label: __("Custom CSS", "formglut"), tip: __("Use {form} for this form’s wrapper, e.g. {form} .formglut-label { color: red; }", "formglut") }
      ]
    },
    {
      key: "entries",
      title: __("Entries & analytics", "formglut"),
      fields: [
        { path: "entries.count_views", type: "switch", label: __("Count form views", "formglut") }
      ]
    }
  ];
}
const getIn = (obj, path) => path.split(".").reduce((o, k) => o ? o[k] : void 0, obj);
const setIn = (obj, path, value) => {
  const keys = path.split(".");
  const next = { ...obj };
  let cur = next;
  keys.slice(0, -1).forEach((k) => {
    cur[k] = { ...cur[k] };
    cur = cur[k];
  });
  cur[keys[keys.length - 1]] = value;
  return next;
};
function FieldInput({ f, value, onChange }) {
  switch (f.type) {
    case "switch":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: !!value, onChange });
    case "select":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value, onChange, options: f.options, style: { width: "100%" } });
    case "number":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 0, value, onChange: (v) => onChange(v || 0), style: { width: "100%" } });
    case "textarea":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: f.rows || 3, value, onChange: (e) => onChange(e.target.value) });
    case "code":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: f.rows || 6, value, onChange: (e) => onChange(e.target.value), spellCheck: false, style: { fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12 } });
    case "datetime":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", value, onChange: (e) => onChange(e.target.value) });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value, placeholder: f.placeholder, onChange: (e) => onChange(e.target.value) });
  }
}
staticMethods.config({ duration: 3, maxCount: 3, top: 24 });
const SECTION_META = {
  general: { icon: faGear, desc: __("How the form is presented on the page.", "formglut") },
  confirmation: { icon: faCircleCheck, desc: __("What visitors see after they submit successfully.", "formglut") },
  notifications: { icon: faEnvelope, desc: __("Emails sent when someone submits this form.", "formglut") },
  restrictions: { icon: faLock, desc: __("Control who can submit, and when.", "formglut") },
  spam: { icon: faShieldHalved, desc: __("Keep bots out and decide what data is stored.", "formglut") },
  style: { icon: faPalette, desc: __("Size, alignment and custom CSS for this form.", "formglut") },
  entries: { icon: faChartLine, desc: __("How this form is counted.", "formglut") }
};
const NON_INPUT = ["html", "heading", "section_break", "shortcode", "action_hook", "custom_submit_button", "recaptcha", "hcaptcha", "turnstile"];
function copyText(text, done) {
  const finish = () => staticMethods.success(done);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(() => {
    });
  }
}
function TagPopover({ fields, mode, value, onInsert }) {
  const [open, setOpen] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState("");
  const general = [
    ["{form_name}", __("Form name", "formglut")],
    ["{form_id}", __("Form ID", "formglut")],
    ["{entry_id}", __("Entry ID", "formglut")],
    ["{site_name}", __("Site name", "formglut")],
    ["{site_url}", __("Site URL", "formglut")],
    ["{admin_email}", __("Admin email", "formglut")],
    ["{date}", __("Submission date", "formglut")],
    ["{time}", __("Submission time", "formglut")],
    ["{ip}", __("Visitor IP", "formglut")],
    ["{user_email}", __("Logged-in user email", "formglut")],
    ["{user_name}", __("Logged-in user name", "formglut")]
  ];
  if (mode === true) general.unshift(["{all_fields}", __("All fields (table)", "formglut")]);
  const perField = fields.filter((f) => f.id && !NON_INPUT.includes(f.type)).map((f) => ["{field:" + f.id + "}", f.admin_label || f.label || f.type]);
  const copy = (tag) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tag).catch(() => {
      });
    }
    setCopied(tag);
    setTimeout(() => setCopied(""), 1200);
  };
  const insert = (tag) => {
    const v = value || "";
    onInsert(v && !/\s$/.test(v) && !["url"].includes(mode) ? v + " " + tag : v + tag);
    setOpen(false);
    staticMethods.success(__("Tag added", "formglut"));
  };
  const list = (items) => items.map(([tag, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-tag-item", role: "button", tabIndex: 0, onClick: () => insert(tag), onKeyDown: (e) => {
    if (e.key === "Enter") insert(tag);
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "name", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: tag }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: copied === tag ? "copy done" : "copy", title: __("Copy", "formglut"), onClick: (e) => {
      e.stopPropagation();
      copy(tag);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: copied === tag ? faCheck : faCopy }) })
  ] }, tag));
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-tag-pop", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-tag-title", children: __("Insert a value from the form", "formglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-tag-hint", children: __("These are replaced with the real answer when someone submits the form. Click one to add it to this field, or use the copy icon to copy it.", "formglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-tag-group", children: __("General", "formglut") }),
    list(general),
    perField.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-tag-group", children: __("Field values", "formglut") }),
    list(perField)
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popover, { open, onOpenChange: setOpen, trigger: "click", placement: "bottomLeft", content, arrow: false, overlayClassName: "fg-tag-popover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Insert a value from the form, such as the visitor’s name or email", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "fg-tag-btn", "aria-label": __("Insert a value from the form", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleInfo }) }) }) });
}
function FormSettingsPage() {
  const formId = parseInt(new URLSearchParams(window.location.search).get("form_id") || "0", 10) || 0;
  const [state, setState] = reactExports.useState({ loading: !!formId, error: "", title: "", fields: [], status: "" });
  const [settings, setSettings] = reactExports.useState(DEFAULT_FORM_SETTINGS);
  const [active, setActive] = reactExports.useState("confirmation");
  const [saving, setSaving] = reactExports.useState(false);
  const [dirty, setDirty] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!formId) return;
    getForm(formId).then((d) => {
      setState({ loading: false, error: "", title: d.form.title, status: d.form.status, fields: Array.isArray(d.form.fields) ? d.form.fields : [] });
      setSettings(mergeFormSettings(d.form.settings));
    }).catch((e) => setState((s) => ({ ...s, loading: false, error: e.message || __("Form not found.", "formglut") })));
  }, [formId]);
  reactExports.useEffect(() => {
    const warn = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const save = async () => {
    setSaving(true);
    try {
      await updateForm({ id: formId, settings });
      setDirty(false);
      staticMethods.success(__("Form settings saved.", "formglut"));
    } catch (e) {
      staticMethods.error(e.message || __("Failed to save form settings.", "formglut"));
    } finally {
      setSaving(false);
    }
  };
  const update = (path, value) => {
    setSettings((s) => setIn(s, path, value));
    setDirty(true);
  };
  if (!formId || state.loading || state.error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EditorHeader, { formId, title: state.title, active: "settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-body", style: { textAlign: "center", paddingTop: 80 }, children: state.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "large" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-empty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-empty-title", children: state.error || __("No form selected", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: __("Open a form from the Forms list, then choose Settings.", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: _pg.all_forms, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", style: { background: "#e94560", borderColor: "#e94560" }, children: __("Go to Forms", "formglut") }) })
      ] }) })
    ] });
  }
  const inputFields = flattenFields(state.fields);
  const emailFields = inputFields.filter((f) => f.type === "email").map((f) => ({ value: f.id, label: f.admin_label || f.label || f.id }));
  const schema = buildSchema(emailFields);
  const section = schema.find((s) => s.key === active) || schema[0];
  const meta = SECTION_META[section.key] || {};
  const shortcode = `[formglut id="${formId}"]`;
  const rows = section.fields.filter((f) => !f.show || f.show(settings));
  const ghost = { color: "#fff", background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.15)", borderRadius: 8 };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(EditorHeader, { formId, title: state.title, active: "settings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEye }), style: ghost, onClick: () => window.open(_pg.preview + "&form_id=" + formId, "_blank"), children: __("Preview", "formglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: shortcode, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCode }), style: ghost, onClick: () => copyText(shortcode, __("Shortcode copied", "formglut")), children: __("Shortcode", "formglut") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFloppyDisk }), type: "primary", loading: saving, disabled: !dirty, onClick: save, style: { background: dirty ? "#e94560" : void 0, borderColor: dirty ? "#e94560" : void 0, borderRadius: 8, fontWeight: 600 }, children: dirty ? __("Save Settings *", "formglut") : __("Save Settings", "formglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-top", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-titlebar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-page-title", children: __("Form settings", "formglut") }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-note", children: __("These settings apply to this form only. Site-wide options are under FormGlut → Settings.", "formglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-layout", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fg-fs-nav", children: schema.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: s.key === section.key ? "active" : "", onClick: () => setActive(s.key), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: (SECTION_META[s.key] || {}).icon || faGear }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.title })
        ] }, s.key)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "fg-fs-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-card-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: meta.icon || faGear }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: section.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: meta.desc })
            ] })
          ] }),
          rows.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fg-fs-row ${f.type === "switch" ? "is-switch" : ""} ${f.divider ? "has-divider" : ""} ${["textarea", "code"].includes(f.type) ? "is-wide" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-label", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-label-line", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: f.label }),
                f.tags && /* @__PURE__ */ jsxRuntimeExports.jsx(TagPopover, { fields: inputFields, mode: f.tags, value: getIn(settings, f.path), onInsert: (v) => update(f.path, v) })
              ] }),
              f.tip && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-help", children: f.tip })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-control", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldInput, { f, value: getIn(settings, f.path), onChange: (v) => update(f.path, v) }) })
          ] }, f.path))
        ] })
      ] })
    ] })
  ] });
}
createRoot(document.getElementById("formglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(FormSettingsPage, {}));
//# sourceMappingURL=form-settings.js.map
