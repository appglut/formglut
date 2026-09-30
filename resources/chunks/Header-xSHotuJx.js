import { O as _pg, cc as jsxRuntimeExports, N as NavMenu, E as _dashboard, h as FontAwesomeIcon, at as faChevronLeft, aT as faHouse, Q as _pluginUrl } from "./api-C3T_2YIP.js";
import { _ as __ } from "./default-i18n-Bi0ZJkXv.js";
function Header({ nav, activePage }) {
  const items = [
    { label: __("Forms", "formglut"), href: _pg.all_forms },
    { label: __("Entries", "formglut"), href: _pg.entries },
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
//# sourceMappingURL=Header-xSHotuJx.js.map
