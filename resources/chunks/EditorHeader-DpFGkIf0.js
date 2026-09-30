import { cc as jsxRuntimeExports, N as NavMenu, O as _pg, h as FontAwesomeIcon, ah as faArrowLeft } from "./api-C3T_2YIP.js";
import { _ as __ } from "./default-i18n-Bi0ZJkXv.js";
function EditorHeader({ formId, title, onTitleChange, active = "editor", children }) {
  const withId = (url) => formId ? `${url}&form_id=${formId}` : url;
  const tab = (key, label, href) => key === active ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "fg-editor-tab active", type: "button", children: label }) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "fg-editor-tab", href, children: label });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fg-editor-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-editor-header-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavMenu, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "fg-editor-back", href: _pg.all_forms, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowLeft }),
        " ",
        __("Back", "formglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "fg-editor-title-input",
          value: title,
          readOnly: !onTitleChange,
          onChange: onTitleChange ? (e) => onTitleChange(e.target.value) : void 0,
          placeholder: __("Enter form title...", "formglut")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-editor-header-center", children: [
      tab("editor", __("Editor", "formglut"), formId ? `${_pg.editor}&form_id=${formId}` : _pg.editor),
      tab("settings", __("Settings", "formglut"), formId ? `${_pg.form_settings}&form_id=${formId}` : _pg.settings),
      tab("entries", __("Entries", "formglut"), withId(_pg.entries))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-editor-header-right", children })
  ] });
}
export {
  EditorHeader as E
};
//# sourceMappingURL=EditorHeader-DpFGkIf0.js.map
