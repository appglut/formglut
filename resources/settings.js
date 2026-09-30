import { cQ as staticMethods, aY as faGear, aN as faEnvelope, aK as faCommentDots, bs as faShieldHalved, bE as faUserShield, az as faCheckDouble, aI as faCloud, aM as faCreditCard, bk as faPlug, aO as faEnvelopeCircleCheck, bt as faSliders, cI as reactExports, ct as jsxRuntimeExports, a as Button, i as FontAwesomeIcon, aW as faFloppyDisk, k as Input, c0 as getEmailLog, cP as sendTestEmail, ad as createRoot } from "./chunks/api-CWyUJK1g.js";
import { _ as __ } from "./chunks/default-i18n-C5tja8m9.js";
import { H as Header } from "./chunks/Header-_5qZLjlg.js";
import { b as Spin, S as Select } from "./chunks/index-DP98aNXk.js";
import { T as TypedInputNumber } from "./chunks/index-pBpPOguF.js";
import { S as Switch } from "./chunks/index-DLAPZase.js";
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
  formglut_delete_on_uninstall: false,
  formglut_email_log: false,
  formglut_currency: "USD",
  formglut_stripe_mode: "test",
  formglut_stripe_test_publishable: "",
  formglut_stripe_test_secret: "",
  formglut_stripe_live_publishable: "",
  formglut_stripe_live_secret: "",
  formglut_mailchimp_api_key: "",
  formglut_hubspot_token: ""
};
const BOOL_KEYS = ["formglut_ajax_submit", "formglut_store_entries", "formglut_honeypot", "formglut_recaptcha_enabled", "formglut_delete_on_uninstall", "formglut_email_log"];
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
    key: "payments",
    title: __("Payments", "formglut"),
    icon: faCreditCard,
    desc: __("Stripe keys for Payment fields. Find them in your Stripe Dashboard → Developers → API keys.", "formglut"),
    fields: [
      { key: "formglut_stripe_mode", type: "select", label: __("Mode", "formglut"), tip: __("Use Test while you try things out; no real money moves.", "formglut"), options: [{ value: "test", label: __("Test", "formglut") }, { value: "live", label: __("Live", "formglut") }] },
      { key: "formglut_currency", type: "select", label: __("Currency", "formglut"), options: ["USD", "EUR", "GBP", "CAD", "AUD", "NZD", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "INR", "BDT", "PKR", "SGD", "HKD", "MYR", "ZAR", "BRL", "MXN", "AED", "SAR", "TRY", "JPY", "KRW"].map((c) => ({ value: c, label: c })) },
      { key: "formglut_stripe_test_publishable", type: "text", label: __("Test publishable key", "formglut"), placeholder: "pk_test_…", show: (s) => s.formglut_stripe_mode === "test" },
      { key: "formglut_stripe_test_secret", type: "password", label: __("Test secret key", "formglut"), placeholder: "sk_test_…", show: (s) => s.formglut_stripe_mode === "test" },
      { key: "formglut_stripe_live_publishable", type: "text", label: __("Live publishable key", "formglut"), placeholder: "pk_live_…", show: (s) => s.formglut_stripe_mode === "live" },
      { key: "formglut_stripe_live_secret", type: "password", label: __("Live secret key", "formglut"), placeholder: "sk_live_…", show: (s) => s.formglut_stripe_mode === "live" }
    ]
  },
  {
    key: "integrations",
    title: __("Integrations", "formglut"),
    icon: faPlug,
    desc: __("Connect services once here, then choose what each form sends in its Form Settings › Integrations.", "formglut"),
    fields: [
      { key: "formglut_mailchimp_api_key", type: "password", label: __("Mailchimp API key", "formglut"), tip: __("Mailchimp → Profile → Extras → API keys. It ends with your data centre, e.g. -us21.", "formglut"), placeholder: "xxxxxxxx-us21" },
      { key: "formglut_hubspot_token", type: "password", label: __("HubSpot private app token", "formglut"), tip: __("HubSpot → Settings → Integrations → Private apps. Give the app the “crm.objects.contacts.write” scope.", "formglut"), placeholder: "pat-…" }
    ]
  },
  {
    key: "emaillog",
    title: __("Email log", "formglut"),
    icon: faEnvelopeCircleCheck,
    desc: __("Check that emails go out: send a test, and keep a list of the last 50 emails FormGlut sent.", "formglut"),
    fields: [
      { key: "formglut_email_log", type: "switch", label: __("Keep an email log", "formglut"), tip: __("Stores recipient, subject and status (not the message) of the last 50 emails.", "formglut") }
    ],
    extra: "emaillog"
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
function EmailLog() {
  const [to, setTo] = reactExports.useState((window.formglut_admin || {}).admin_email || "");
  const [sending, setSending] = reactExports.useState(false);
  const [items, setItems] = reactExports.useState(null);
  const load = () => getEmailLog().then((d) => setItems(d.items || [])).catch(() => setItems([]));
  reactExports.useEffect(() => {
    load();
  }, []);
  const send = async () => {
    setSending(true);
    try {
      const r = await sendTestEmail(to);
      staticMethods.success(r.message);
      load();
    } catch (e) {
      staticMethods.error(e.message);
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-emaillog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-label", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-label-line", children: /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: __("Send a test email", "formglut") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-help", children: __("Uses the sender name and email above.", "formglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-control", style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: to, onChange: (e) => setTo(e.target.value), placeholder: "you@example.com" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: send, loading: sending, children: __("Send", "formglut") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-emaillog-list", children: items === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "small" }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-help", children: __("No emails logged yet. Turn on the log above and save.", "formglut") }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: __("Date", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: __("To", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: __("Subject", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: __("Status", "formglut") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: it.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: it.to }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          it.subject,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-help", children: it.context })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-log-" + it.status, children: it.status === "sent" ? __("Sent", "formglut") : __("Failed", "formglut") }) })
      ] }, i)) })
    ] }) })
  ] });
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
          section.hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-note", style: { margin: "4px 0 18px" }, children: section.hint }),
          section.extra === "emaillog" && /* @__PURE__ */ jsxRuntimeExports.jsx(EmailLog, {})
        ] })
      ] })
    ] })
  ] });
}
createRoot(document.getElementById("formglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}));
//# sourceMappingURL=settings.js.map
