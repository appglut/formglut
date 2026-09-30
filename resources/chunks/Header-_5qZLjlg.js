import { V as _pg, ct as jsxRuntimeExports, N as NavMenu, J as _dashboard, i as FontAwesomeIcon, aB as faChevronLeft, b2 as faHouse, X as _pluginUrl } from "./api-CWyUJK1g.js";
import { _ as __ } from "./default-i18n-C5tja8m9.js";
function Header({ nav, activePage }) {
  const items = [
    { label: __("Forms", "formglut"), href: _pg.all_forms },
    { label: __("Entries", "formglut"), href: _pg.entries },
    { label: __("Data & Logs", "formglut"), href: _pg.tools },
    { label: __("Global Settings", "formglut"), href: _pg.settings }
  ].map((n) => {
    if (n.label === activePage) n.active = true;
    return n;
  }).concat(nav || []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fg-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-header-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavMenu, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: _dashboard, className: "fg-header-back", title: __("Back to WordPress Admin", "formglut"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginTop: "0.5px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faChevronLeft }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHouse })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: _pluginUrl + "global-assets/images/formglut-logo.svg", alt: "FormGlut", className: "fg-logo-img" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fg-header-nav", children: items.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: n.href, className: n.active ? "active" : "", children: n.label }, n.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-header-right" })
  ] });
}
export {
  Header as H
};
//# sourceMappingURL=Header-_5qZLjlg.js.map
