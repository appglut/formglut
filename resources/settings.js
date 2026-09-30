import { bE as staticMethods, ay as faGear, aq as faEnvelope, ao as faCommentDots, aV as faShieldHalved, b3 as faUserShield, af as faCheckDouble, am as faCloud, aW as faSliders, bB as reactExports, bq as jsxRuntimeExports, B as Button, g as FontAwesomeIcon, aw as faFloppyDisk, a4 as createRoot } from "./chunks/NavMenu-DTs5z4CX.js";
import { _ as __ } from "./chunks/default-i18n-Bi0ZJkXv.js";
import { H as Header } from "./chunks/Header-CgkrRZA-.js";
import { c as Spin, I as Input, S as Select } from "./chunks/index-BLXOj64T.js";
import { T as TypedInputNumber } from "./chunks/index-aGc0xIpX.js";
import { S as Switch } from "./chunks/index-ryNm28KF.js";
staticMethods.config({ duration: 3, maxCount: 3, top: 24, placement: "top" });
const DEFAULTS = {
  formglut_ajax_submit: true,
  formglut_default_status: "active",
  formglut_store_entries: true,
  formglut_honeypot: true,
  formglut_admin_email: "",
  formglut_sender_name: "FormGlut",
  formglut_sender_email: "",
  formglut_email_subject: "New form submission: {form_name}",
  formglut_success_message: "Thank you! Your submission has been received.",
  formglut_error_message: "Something went wrong. Please try again.",
  formglut_recaptcha_version: "v3",
  formglut_recaptcha_site_key: "",
  formglut_recaptcha_secret_key: "",
  formglut_recaptcha_score: 0.5,
  formglut_recaptcha_enabled: false,
  formglut_hcaptcha_site_key: "",
  formglut_hcaptcha_secret_key: "",
  formglut_turnstile_site_key: "",
  formglut_turnstile_secret_key: "",
  formglut_delete_on_uninstall: false
};
const BOOL_KEYS = ["formglut_ajax_submit", "formglut_store_entries", "formglut_honeypot", "formglut_recaptcha_enabled", "formglut_delete_on_uninstall"];
function normalize(server) {
  const out = { ...DEFAULTS };
  Object.keys(DEFAULTS).forEach((k) => {
    const v = server[k];
    if (v === void 0 || v === null) return;
    if (BOOL_KEYS.includes(k)) out[k] = v === true || v === "1" || v === 1;
    else if (k === "formglut_recaptcha_score") out[k] = v === "" ? 0.5 : Number(v);
    else if (typeof v === "string" && v === "" && ["formglut_default_status", "formglut_recaptcha_version"].includes(k)) out[k] = DEFAULTS[k];
    else out[k] = v;
  });
  return out;
}
const KEYS_HELP = __("Create keys in the provider’s dashboard and paste them here.", "formglut");
const SECTIONS = [
  {
    key: "general",
    title: __("General", "formglut"),
    icon: faGear,
    desc: __("Defaults that apply to every form.", "formglut"),
    fields: [
      { key: "formglut_ajax_submit", type: "switch", label: __("AJAX form submission", "formglut"), tip: __("Send forms without reloading the page.", "formglut") },
      { key: "formglut_default_status", type: "select", label: __("Default form status", "formglut"), tip: __("Status given to a form when it is created.", "formglut"), options: [{ value: "active", label: __("Active", "formglut") }, { value: "draft", label: __("Draft", "formglut") }, { value: "closed", label: __("Closed", "formglut") }] },
      { key: "formglut_store_entries", type: "switch", label: __("Store form submissions", "formglut"), tip: __("Save every submission in the Entries list. A form can override this in its own settings.", "formglut") }
    ]
  },
  {
    key: "email",
    title: __("Email notifications", "formglut"),
    icon: faEnvelope,
    desc: __("Who receives submissions, and how the emails look. Each form can override these.", "formglut"),
    fields: [
      { key: "formglut_admin_email", type: "text", label: __("Admin notification email", "formglut"), tip: __("Receives a copy of every submission.", "formglut"), placeholder: "admin@yoursite.com" },
      { key: "formglut_sender_name", type: "text", label: __("Sender name", "formglut"), tip: __("The “From” name on notification emails.", "formglut"), placeholder: "FormGlut" },
      { key: "formglut_sender_email", type: "text", label: __("Sender email", "formglut"), tip: __("The “From” address. Use an address on your own domain.", "formglut"), placeholder: "noreply@yoursite.com" },
      { key: "formglut_email_subject", type: "text", label: __("Email subject template", "formglut"), tip: __("You can use {form_name}, {form_id} and {entry_id}.", "formglut"), placeholder: "New form submission: {form_name}" }
    ]
  },
  {
    key: "messages",
    title: __("Messages", "formglut"),
    icon: faCommentDots,
    desc: __("What visitors see after they submit. Each form can use its own text.", "formglut"),
    fields: [
      { key: "formglut_success_message", type: "textarea", label: __("Success message", "formglut"), tip: __("Shown after a successful submission.", "formglut") },
      { key: "formglut_error_message", type: "textarea", label: __("Error message", "formglut"), tip: __("Shown when something goes wrong.", "formglut") }
    ]
  },
  {
    key: "spam",
    title: __("Spam protection", "formglut"),
    icon: faShieldHalved,
    desc: __("Basic protection that needs no account.", "formglut"),
    fields: [
      { key: "formglut_honeypot", type: "switch", label: __("Enable honeypot", "formglut"), tip: __("Adds a hidden field that bots fill in. A form can turn this off for itself.", "formglut") }
    ],
    hint: __("For stronger protection add a reCAPTCHA, hCaptcha or Turnstile field to a form (Security Fields in the editor), and enter the keys in the next sections.", "formglut")
  },
  {
    key: "recaptcha",
    title: __("Google reCAPTCHA", "formglut"),
    icon: faUserShield,
    desc: KEYS_HELP,
    fields: [
      { key: "formglut_recaptcha_version", type: "select", label: __("Version", "formglut"), tip: __("Keys are tied to a version — use keys created for the version you pick.", "formglut"), options: [{ value: "v3", label: __("reCAPTCHA v3 (invisible, score based)", "formglut") }, { value: "v2", label: __("reCAPTCHA v2 (“I’m not a robot” checkbox)", "formglut") }] },
      { key: "formglut_recaptcha_site_key", type: "text", label: __("Site key", "formglut"), placeholder: __("Enter your site key", "formglut") },
      { key: "formglut_recaptcha_secret_key", type: "password", label: __("Secret key", "formglut"), placeholder: __("Enter your secret key", "formglut") },
      { key: "formglut_recaptcha_score", type: "score", label: __("Minimum score", "formglut"), tip: __("0.0 (likely bot) to 1.0 (likely human). Submissions below this score are rejected.", "formglut"), show: (s) => s.formglut_recaptcha_version !== "v2" },
      { key: "formglut_recaptcha_enabled", type: "switch", label: __("Protect every form", "formglut"), tip: __("Run reCAPTCHA v3 on all forms, even those without a reCAPTCHA field.", "formglut"), show: (s) => s.formglut_recaptcha_version !== "v2" }
    ]
  },
  {
    key: "hcaptcha",
    title: __("hCaptcha", "formglut"),
    icon: faCheckDouble,
    desc: KEYS_HELP,
    fields: [
      { key: "formglut_hcaptcha_site_key", type: "text", label: __("Site key", "formglut"), placeholder: __("Enter your site key", "formglut") },
      { key: "formglut_hcaptcha_secret_key", type: "password", label: __("Secret key", "formglut"), placeholder: __("Enter your secret key", "formglut") }
    ]
  },
  {
    key: "turnstile",
    title: __("Cloudflare Turnstile", "formglut"),
    icon: faCloud,
    desc: KEYS_HELP,
    fields: [
      { key: "formglut_turnstile_site_key", type: "text", label: __("Site key", "formglut"), placeholder: __("Enter your site key", "formglut") },
      { key: "formglut_turnstile_secret_key", type: "password", label: __("Secret key", "formglut"), placeholder: __("Enter your secret key", "formglut") }
    ]
  },
  {
    key: "advanced",
    title: __("Advanced", "formglut"),
    icon: faSliders,
    desc: __("Data handling for the whole plugin.", "formglut"),
    fields: [
      { key: "formglut_delete_on_uninstall", type: "switch", label: __("Delete data on uninstall", "formglut"), tip: __("Removes all forms, entries and settings when the plugin is deleted. This cannot be undone.", "formglut") }
    ]
  }
];
function Input1({ f, value, onChange }) {
  switch (f.type) {
    case "switch":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: !!value, onChange });
    case "select":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value, onChange, options: f.options, style: { width: "100%" } });
    case "textarea":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: 3, value, onChange: (e) => onChange(e.target.value) });
    case "password":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input.Password, { value, placeholder: f.placeholder, autoComplete: "new-password", onChange: (e) => onChange(e.target.value) });
    case "score":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 0, max: 1, step: 0.1, value, onChange: (v) => onChange(v ?? 0), style: { width: 140 } });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value, placeholder: f.placeholder, onChange: (e) => onChange(e.target.value) });
  }
}
function Settings() {
  const [values, setValues] = reactExports.useState(DEFAULTS);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [dirty, setDirty] = reactExports.useState(false);
  const [active, setActive] = reactExports.useState("general");
  reactExports.useEffect(() => {
    const { ajax_url, nonce } = window.formglut_admin || {};
    fetch(`${ajax_url}?${new URLSearchParams({ action: "formglut_get_settings", nonce }).toString()}`).then((r) => r.json()).then((result) => {
      if (result.success && result.data.settings) setValues(normalize(result.data.settings));
    }).catch(() => staticMethods.error(__("Failed to load settings.", "formglut"))).finally(() => setLoading(false));
  }, []);
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
  const update = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setDirty(true);
  };
  const save = () => {
    const { ajax_url, nonce } = window.formglut_admin || {};
    for (const key of ["formglut_admin_email", "formglut_sender_email"]) {
      if (values[key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[key])) {
        staticMethods.error(__("Enter a valid email address.", "formglut"));
        setActive("email");
        return;
      }
    }
    setSaving(true);
    fetch(ajax_url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ action: "formglut_save_settings", nonce, settings: JSON.stringify(values) }).toString(),
      credentials: "same-origin"
    }).then((r) => r.json()).then((result) => {
      var _a;
      if (result.success) {
        setDirty(false);
        staticMethods.success(__("Global settings saved.", "formglut"));
      } else staticMethods.error(((_a = result.data) == null ? void 0 : _a.message) || __("Failed to save settings.", "formglut"));
    }).catch(() => staticMethods.error(__("Network error. Please try again.", "formglut"))).finally(() => setSaving(false));
  };
  const title = __("Global Settings", "formglut");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { activePage: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-body", style: { textAlign: "center", paddingTop: 80 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "large" }) })
    ] });
  }
  const section = SECTIONS.find((s) => s.key === active) || SECTIONS[0];
  const rows = section.fields.filter((f) => !f.show || f.show(values));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { activePage: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-titlebar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-page-title", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-page-subtitle", children: __("Options that apply to every form. Each form can override many of them in its own Form Settings.", "formglut") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-actions", children: [
          dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-fs-unsaved", children: __("Unsaved changes", "formglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", size: "large", loading: saving, disabled: !dirty, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFloppyDisk }), onClick: save, style: { background: dirty ? "#e94560" : void 0, borderColor: dirty ? "#e94560" : void 0, borderRadius: 8, fontWeight: 600 }, children: __("Save settings", "formglut") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-layout", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fg-fs-nav", children: SECTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: s.key === section.key ? "active" : "", onClick: () => setActive(s.key), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: s.icon }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.title })
        ] }, s.key)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "fg-fs-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-card-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: section.icon }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: section.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: section.desc })
            ] })
          ] }),
          rows.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fg-fs-row ${f.type === "switch" ? "is-switch" : ""} ${f.type === "textarea" ? "is-wide" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-label", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-label-line", children: /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: f.label }) }),
              f.tip && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-help", children: f.tip })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-control", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input1, { f, value: values[f.key], onChange: (v) => update(f.key, v) }) })
          ] }, f.key)),
          section.hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-note", style: { margin: "4px 0 18px" }, children: section.hint })
        ] })
      ] })
    ] })
  ] });
}
createRoot(document.getElementById("formglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}));
//# sourceMappingURL=settings.js.map
