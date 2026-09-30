import { co as reactExports, d as ConfigContext, $ as classNames, bH as genStyleHooks, cg as merge, cC as unit, cr as resetComponent, F as FastColor, bI as genSubStyleComponent, cj as omit, cI as useClosable, cm as pickClosable, W as Wave, cp as replaceElement, bX as getMigrationSources, cv as staticMethods, cc as jsxRuntimeExports, a as Button, ci as migrateForm, bT as getFormStats, bU as getForms, R as React, O as _pg, h as FontAwesomeIcon, b4 as faPenToSquare, aO as faGear, aJ as faFileExport, ae as exportFormsUrl, aH as faEye, aB as faCopy, bm as faTrash, aK as faFileImport, b8 as faPlus, au as faCircleCheck, bn as faTrashCan, br as faXmark, j as Input, aY as faMagnifyingGlass, an as faCalendarDays, bc as faRotateRight, aL as faFileLines, aa as deleteForm, c3 as importForms, ac as duplicateForm, cG as updateFormStatus, S as Skeleton, bi as faStar, a6 as createForm, a7 as createRoot } from "./chunks/api-C3T_2YIP.js";
import { _ as __ } from "./chunks/default-i18n-Bi0ZJkXv.js";
import { r as responsiveArray, u as useBreakpoint, C as Checkbox, d as dayjs, a as Dropdown, D as DatePicker, F as ForwardTable } from "./chunks/Table-Cg2SJaMG.js";
import { H as Header } from "./chunks/Header-xSHotuJx.js";
import { f as createField } from "./chunks/fieldTypes-B4mkecXL.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { u as useColStyle, a as useRowStyle, M as Modal } from "./chunks/index-1tTAWJ6k.js";
import { a as Spin, S as Select } from "./chunks/index-DnCN3rVY.js";
import { g as genPresetColor, f as isPresetColor, h as isPresetStatusColor, T as Tooltip } from "./chunks/index-DoebJELJ.js";
import { S as Switch } from "./chunks/index-BJj4IPqo.js";
import { S as Space, P as Popconfirm } from "./chunks/index-DUJ6TIST.js";
import "./chunks/EllipsisOutlined-DVpo83LX.js";
import "./chunks/ActionButton-1FHh5CEq.js";
import "./chunks/index-3Uh34z5Q.js";
const RowContext = /* @__PURE__ */ reactExports.createContext({});
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function parseFlex(flex) {
  if (flex === "auto") {
    return "1 1 auto";
  }
  if (typeof flex === "number") {
    return `${flex} ${flex} auto`;
  }
  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }
  return flex;
}
const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"];
const Col = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    gutter,
    wrap
  } = reactExports.useContext(RowContext);
  const {
    prefixCls: customizePrefixCls,
    span,
    order,
    offset,
    push,
    pull,
    className,
    children,
    flex,
    style
  } = props, others = __rest$3(props, ["prefixCls", "span", "order", "offset", "push", "pull", "className", "children", "flex", "style"]);
  const prefixCls = getPrefixCls("col", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useColStyle(prefixCls);
  const sizeStyle = {};
  let sizeClassObj = {};
  sizes.forEach((size) => {
    let sizeProps = {};
    const propSize = props[size];
    if (typeof propSize === "number") {
      sizeProps.span = propSize;
    } else if (typeof propSize === "object") {
      sizeProps = propSize || {};
    }
    delete others[size];
    sizeClassObj = Object.assign(Object.assign({}, sizeClassObj), {
      [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== void 0,
      [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
      [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
      [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
      [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
      [`${prefixCls}-rtl`]: direction === "rtl"
    });
    if (sizeProps.flex) {
      sizeClassObj[`${prefixCls}-${size}-flex`] = true;
      sizeStyle[`--${prefixCls}-${size}-flex`] = parseFlex(sizeProps.flex);
    }
  });
  const classes = classNames(prefixCls, {
    [`${prefixCls}-${span}`]: span !== void 0,
    [`${prefixCls}-order-${order}`]: order,
    [`${prefixCls}-offset-${offset}`]: offset,
    [`${prefixCls}-push-${push}`]: push,
    [`${prefixCls}-pull-${pull}`]: pull
  }, className, sizeClassObj, hashId, cssVarCls);
  const mergedStyle = {};
  if (gutter === null || gutter === void 0 ? void 0 : gutter[0]) {
    const horizontalGutter = typeof gutter[0] === "number" ? `${gutter[0] / 2}px` : `calc(${gutter[0]} / 2)`;
    mergedStyle.paddingLeft = horizontalGutter;
    mergedStyle.paddingRight = horizontalGutter;
  }
  if (flex) {
    mergedStyle.flex = parseFlex(flex);
    if (wrap === false && !mergedStyle.minWidth) {
      mergedStyle.minWidth = 0;
    }
  }
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({}, others, {
    style: Object.assign(Object.assign(Object.assign({}, mergedStyle), style), sizeStyle),
    className: classes,
    ref
  }), children));
});
function useGutter(gutter, screens) {
  const results = [void 0, void 0];
  const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, void 0];
  const mergedScreens = screens || {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true
  };
  normalizedGutter.forEach((g, index) => {
    if (typeof g === "object" && g !== null) {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint = responsiveArray[i];
        if (mergedScreens[breakpoint] && g[breakpoint] !== void 0) {
          results[index] = g[breakpoint];
          break;
        }
      }
    } else {
      results[index] = g;
    }
  });
  return results;
}
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function useMergedPropByScreen(oriProp, screen) {
  const [prop, setProp] = reactExports.useState(typeof oriProp === "string" ? oriProp : "");
  const calcMergedAlignOrJustify = () => {
    if (typeof oriProp === "string") {
      setProp(oriProp);
    }
    if (typeof oriProp !== "object") {
      return;
    }
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint = responsiveArray[i];
      if (!screen || !screen[breakpoint]) {
        continue;
      }
      const curVal = oriProp[breakpoint];
      if (curVal !== void 0) {
        setProp(curVal);
        return;
      }
    }
  };
  reactExports.useEffect(() => {
    calcMergedAlignOrJustify();
  }, [JSON.stringify(oriProp), screen]);
  return prop;
}
const Row = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    justify,
    align,
    className,
    style,
    children,
    gutter = 0,
    wrap
  } = props, others = __rest$2(props, ["prefixCls", "justify", "align", "className", "style", "children", "gutter", "wrap"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const screens = useBreakpoint(true, null);
  const mergedAlign = useMergedPropByScreen(align, screens);
  const mergedJustify = useMergedPropByScreen(justify, screens);
  const prefixCls = getPrefixCls("row", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useRowStyle(prefixCls);
  const gutters = useGutter(gutter, screens);
  const classes = classNames(prefixCls, {
    [`${prefixCls}-no-wrap`]: wrap === false,
    [`${prefixCls}-${mergedJustify}`]: mergedJustify,
    [`${prefixCls}-${mergedAlign}`]: mergedAlign,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, hashId, cssVarCls);
  const rowStyle = {};
  if (gutters === null || gutters === void 0 ? void 0 : gutters[0]) {
    const horizontalGutter = typeof gutters[0] === "number" ? `${gutters[0] / -2}px` : `calc(${gutters[0]} / -2)`;
    rowStyle.marginLeft = horizontalGutter;
    rowStyle.marginRight = horizontalGutter;
  }
  const [gutterH, gutterV] = gutters;
  rowStyle.rowGap = gutterV;
  const rowContext = reactExports.useMemo(() => ({
    gutter: [gutterH, gutterV],
    wrap
  }), [gutterH, gutterV, wrap]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(RowContext.Provider, {
    value: rowContext
  }, /* @__PURE__ */ reactExports.createElement("div", Object.assign({}, others, {
    className: classes,
    style: Object.assign(Object.assign({}, rowStyle), style),
    ref
  }), children)));
});
const genBaseStyle = (token) => {
  const {
    paddingXXS,
    lineWidth,
    tagPaddingHorizontal,
    componentCls,
    calc
  } = token;
  const paddingInline = calc(tagPaddingHorizontal).sub(lineWidth).equal();
  const iconMarginInline = calc(paddingXXS).sub(lineWidth).equal();
  return {
    // Result
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      height: "auto",
      // https://github.com/ant-design/ant-design/pull/47504
      marginInlineEnd: token.marginXS,
      paddingInline,
      fontSize: token.tagFontSize,
      lineHeight: token.tagLineHeight,
      whiteSpace: "nowrap",
      background: token.defaultBg,
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
      borderRadius: token.borderRadiusSM,
      opacity: 1,
      transition: `all ${token.motionDurationMid}`,
      textAlign: "start",
      position: "relative",
      // RTL
      [`&${componentCls}-rtl`]: {
        direction: "rtl"
      },
      "&, a, a:hover": {
        color: token.defaultColor
      },
      [`${componentCls}-close-icon`]: {
        marginInlineStart: iconMarginInline,
        fontSize: token.tagIconSize,
        color: token.colorIcon,
        cursor: "pointer",
        transition: `all ${token.motionDurationMid}`,
        "&:hover": {
          color: token.colorTextHeading
        }
      },
      [`&${componentCls}-has-color`]: {
        borderColor: "transparent",
        [`&, a, a:hover, ${token.iconCls}-close, ${token.iconCls}-close:hover`]: {
          color: token.colorTextLightSolid
        }
      },
      "&-checkable": {
        backgroundColor: "transparent",
        borderColor: "transparent",
        cursor: "pointer",
        [`&:not(${componentCls}-checkable-checked):hover`]: {
          color: token.colorPrimary,
          backgroundColor: token.colorFillSecondary
        },
        "&:active, &-checked": {
          color: token.colorTextLightSolid
        },
        "&-checked": {
          backgroundColor: token.colorPrimary,
          "&:hover": {
            backgroundColor: token.colorPrimaryHover
          }
        },
        "&:active": {
          backgroundColor: token.colorPrimaryActive
        }
      },
      "&-hidden": {
        display: "none"
      },
      // To ensure that a space will be placed between character and `Icon`.
      [`> ${token.iconCls} + span, > span + ${token.iconCls}`]: {
        marginInlineStart: paddingInline
      }
    }),
    [`${componentCls}-borderless`]: {
      borderColor: "transparent",
      background: token.tagBorderlessBg
    }
  };
};
const prepareToken = (token) => {
  const {
    lineWidth,
    fontSizeIcon,
    calc
  } = token;
  const tagFontSize = token.fontSizeSM;
  const tagToken = merge(token, {
    tagFontSize,
    tagLineHeight: unit(calc(token.lineHeightSM).mul(tagFontSize).equal()),
    tagIconSize: calc(fontSizeIcon).sub(calc(lineWidth).mul(2)).equal(),
    // Tag icon is much smaller
    tagPaddingHorizontal: 8,
    // Fixed padding.
    tagBorderlessBg: token.defaultBg
  });
  return tagToken;
};
const prepareComponentToken = (token) => ({
  defaultBg: new FastColor(token.colorFillQuaternary).onBackground(token.colorBgContainer).toHexString(),
  defaultColor: token.colorText
});
const useStyle = genStyleHooks("Tag", (token) => {
  const tagToken = prepareToken(token);
  return genBaseStyle(tagToken);
}, prepareComponentToken);
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const CheckableTag = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    style,
    className,
    checked,
    children,
    icon,
    onChange,
    onClick
  } = props, restProps = __rest$1(props, ["prefixCls", "style", "className", "checked", "children", "icon", "onChange", "onClick"]);
  const {
    getPrefixCls,
    tag
  } = reactExports.useContext(ConfigContext);
  const handleClick = (e) => {
    onChange === null || onChange === void 0 ? void 0 : onChange(!checked);
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
  };
  const prefixCls = getPrefixCls("tag", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const cls = classNames(prefixCls, `${prefixCls}-checkable`, {
    [`${prefixCls}-checkable-checked`]: checked
  }, tag === null || tag === void 0 ? void 0 : tag.className, className, hashId, cssVarCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", Object.assign({}, restProps, {
    ref,
    style: Object.assign(Object.assign({}, style), tag === null || tag === void 0 ? void 0 : tag.style),
    className: cls,
    onClick: handleClick
  }), icon, /* @__PURE__ */ reactExports.createElement("span", null, children)));
});
const genPresetStyle = (token) => genPresetColor(token, (colorKey, {
  textColor,
  lightBorderColor,
  lightColor,
  darkColor
}) => ({
  [`${token.componentCls}${token.componentCls}-${colorKey}`]: {
    color: textColor,
    background: lightColor,
    borderColor: lightBorderColor,
    // Inverse color
    "&-inverse": {
      color: token.colorTextLightSolid,
      background: darkColor,
      borderColor: darkColor
    },
    [`&${token.componentCls}-borderless`]: {
      borderColor: "transparent"
    }
  }
}));
const PresetCmp = genSubStyleComponent(["Tag", "preset"], (token) => {
  const tagToken = prepareToken(token);
  return genPresetStyle(tagToken);
}, prepareComponentToken);
function capitalize(str) {
  if (typeof str !== "string") {
    return str;
  }
  const ret = str.charAt(0).toUpperCase() + str.slice(1);
  return ret;
}
const genTagStatusStyle = (token, status, cssVariableType) => {
  const capitalizedCssVariableType = capitalize(cssVariableType);
  return {
    [`${token.componentCls}${token.componentCls}-${status}`]: {
      color: token[`color${cssVariableType}`],
      background: token[`color${capitalizedCssVariableType}Bg`],
      borderColor: token[`color${capitalizedCssVariableType}Border`],
      [`&${token.componentCls}-borderless`]: {
        borderColor: "transparent"
      }
    }
  };
};
const StatusCmp = genSubStyleComponent(["Tag", "status"], (token) => {
  const tagToken = prepareToken(token);
  return [genTagStatusStyle(tagToken, "success", "Success"), genTagStatusStyle(tagToken, "processing", "Info"), genTagStatusStyle(tagToken, "error", "Error"), genTagStatusStyle(tagToken, "warning", "Warning")];
}, prepareComponentToken);
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalTag = /* @__PURE__ */ reactExports.forwardRef((tagProps, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    children,
    icon,
    color,
    onClose,
    bordered = true,
    visible: deprecatedVisible
  } = tagProps, props = __rest(tagProps, ["prefixCls", "className", "rootClassName", "style", "children", "icon", "color", "onClose", "bordered", "visible"]);
  const {
    getPrefixCls,
    direction,
    tag: tagContext
  } = reactExports.useContext(ConfigContext);
  const [visible, setVisible] = reactExports.useState(true);
  const domProps = omit(props, ["closeIcon", "closable"]);
  reactExports.useEffect(() => {
    if (deprecatedVisible !== void 0) {
      setVisible(deprecatedVisible);
    }
  }, [deprecatedVisible]);
  const isPreset = isPresetColor(color);
  const isStatus = isPresetStatusColor(color);
  const isInternalColor = isPreset || isStatus;
  const tagStyle = Object.assign(Object.assign({
    backgroundColor: color && !isInternalColor ? color : void 0
  }, tagContext === null || tagContext === void 0 ? void 0 : tagContext.style), style);
  const prefixCls = getPrefixCls("tag", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const tagClassName = classNames(prefixCls, tagContext === null || tagContext === void 0 ? void 0 : tagContext.className, {
    [`${prefixCls}-${color}`]: isInternalColor,
    [`${prefixCls}-has-color`]: color && !isInternalColor,
    [`${prefixCls}-hidden`]: !visible,
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-borderless`]: !bordered
  }, className, rootClassName, hashId, cssVarCls);
  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose === null || onClose === void 0 ? void 0 : onClose(e);
    if (e.defaultPrevented) {
      return;
    }
    setVisible(false);
  };
  const [, mergedCloseIcon] = useClosable(pickClosable(tagProps), pickClosable(tagContext), {
    closable: false,
    closeIconRender: (iconNode2) => {
      const replacement = /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-close-icon`,
        onClick: handleCloseClick
      }, iconNode2);
      return replaceElement(iconNode2, replacement, (originProps) => ({
        onClick: (e) => {
          var _a;
          (_a = originProps === null || originProps === void 0 ? void 0 : originProps.onClick) === null || _a === void 0 ? void 0 : _a.call(originProps, e);
          handleCloseClick(e);
        },
        className: classNames(originProps === null || originProps === void 0 ? void 0 : originProps.className, `${prefixCls}-close-icon`)
      }));
    }
  });
  const isNeedWave = typeof props.onClick === "function" || children && children.type === "a";
  const iconNode = icon || null;
  const kids = iconNode ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, iconNode, children && /* @__PURE__ */ reactExports.createElement("span", null, children)) : children;
  const tagNode = /* @__PURE__ */ reactExports.createElement("span", Object.assign({}, domProps, {
    ref,
    className: tagClassName,
    style: tagStyle
  }), kids, mergedCloseIcon, isPreset && /* @__PURE__ */ reactExports.createElement(PresetCmp, {
    key: "preset",
    prefixCls
  }), isStatus && /* @__PURE__ */ reactExports.createElement(StatusCmp, {
    key: "status",
    prefixCls
  }));
  return wrapCSSVar(isNeedWave ? /* @__PURE__ */ reactExports.createElement(Wave, {
    component: "Tag"
  }, tagNode) : tagNode);
});
const Tag = InternalTag;
Tag.CheckableTag = CheckableTag;
let n = 0;
const f = (type, props = {}) => ({ ...createField(type), id: "f" + Date.now().toString(36) + ++n, ...props });
const cols = (children, gap = "medium") => ({ ...createField("column_2"), id: "c" + Date.now().toString(36) + ++n, gap, columns: children.map((fields) => ({ width: 50, fields })) });
const choices = (list) => list.map((label) => ({ label, value: label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") }));
const TEMPLATES = [
  {
    key: "contact",
    title: __("Contact form", "formglut"),
    desc: __("Name, email, subject and message.", "formglut"),
    icon: "✉️",
    build: () => ({
      fields: [
        cols([[f("text", { label: __("Your name", "formglut"), placeholder: "", required: true })], [f("email", { label: __("Email", "formglut") })]]),
        f("text", { label: __("Subject", "formglut"), placeholder: "" }),
        f("textarea", { label: __("Message", "formglut"), placeholder: __("How can we help?", "formglut"), required: true })
      ],
      settings: { confirmation: { message: __("Thanks! We will get back to you soon.", "formglut") } }
    })
  },
  {
    key: "feedback",
    title: __("Feedback survey", "formglut"),
    desc: __("Star rating, what went well and what to improve.", "formglut"),
    icon: "⭐",
    build: () => ({
      fields: [
        f("star_rating", { label: __("How would you rate your experience?", "formglut"), required: true, show_labels: true }),
        f("radio", { label: __("Would you recommend us?", "formglut"), options: choices([__("Yes", "formglut"), __("Maybe", "formglut"), __("No", "formglut")]), layout: "inline" }),
        f("textarea", { label: __("What did you like?", "formglut"), placeholder: "" }),
        f("textarea", { label: __("What could we do better?", "formglut"), placeholder: "" }),
        f("email", { label: __("Email (optional)", "formglut"), required: false })
      ]
    })
  },
  {
    key: "newsletter",
    title: __("Newsletter sign-up", "formglut"),
    desc: __("Email and first name with consent.", "formglut"),
    icon: "📰",
    build: () => ({
      fields: [
        cols([[f("text", { label: __("First name", "formglut"), placeholder: "" })], [f("email", { label: __("Email", "formglut") })]]),
        f("gdpr_agreement", { required: true })
      ],
      settings: { confirmation: { message: __("You are subscribed. Welcome aboard!", "formglut") } }
    })
  },
  {
    key: "quote",
    title: __("Request a quote", "formglut"),
    desc: __("Contact details, service, budget and details.", "formglut"),
    icon: "💼",
    build: () => ({
      fields: [
        f("name", {}),
        cols([[f("email", { label: __("Email", "formglut") })], [f("phone", { label: __("Phone", "formglut"), required: false })]]),
        f("select", { label: __("Service", "formglut"), required: true, options: choices([__("Design", "formglut"), __("Development", "formglut"), __("Marketing", "formglut"), __("Other", "formglut")]) }),
        f("select", { label: __("Budget", "formglut"), options: choices(["< $1,000", "$1,000 – $5,000", "$5,000 – $10,000", "> $10,000"]) }),
        f("textarea", { label: __("Project details", "formglut"), placeholder: "", required: true }),
        f("file_upload", { label: __("Attachments (optional)", "formglut"), required: false, multiple: true })
      ]
    })
  },
  {
    key: "event",
    title: __("Event registration", "formglut"),
    desc: __("Attendee details, ticket type and dietary needs.", "formglut"),
    icon: "🎟️",
    build: () => ({
      fields: [
        f("name", {}),
        cols([[f("email", { label: __("Email", "formglut") })], [f("phone", { label: __("Phone", "formglut"), required: false })]]),
        f("radio", { label: __("Ticket", "formglut"), required: true, options: choices([__("Standard", "formglut"), __("VIP", "formglut"), __("Student", "formglut")]) }),
        f("checkbox", { label: __("Dietary requirements", "formglut"), options: choices([__("Vegetarian", "formglut"), __("Vegan", "formglut"), __("Gluten free", "formglut")]), enable_other: true, layout: "inline" }),
        f("unique_id", { label: __("Booking number", "formglut"), id_prefix: "EV-" })
      ],
      settings: { confirmation: { message: __("You are registered! Your booking number is {field:BOOKING}.", "formglut") } }
    })
  },
  {
    key: "job",
    title: __("Job application", "formglut"),
    desc: __("Multi-step: details, experience, CV upload.", "formglut"),
    icon: "🧑‍💼",
    build: () => ({
      fields: [
        f("name", {}),
        cols([[f("email", { label: __("Email", "formglut") })], [f("phone", { label: __("Phone", "formglut") })]]),
        f("form_step", { step_title: __("Experience", "formglut") }),
        f("select", { label: __("Position", "formglut"), required: true, options: choices([__("Designer", "formglut"), __("Developer", "formglut"), __("Support", "formglut")]) }),
        f("url", { label: __("Portfolio or LinkedIn", "formglut"), required: false }),
        f("textarea", { label: __("Why do you want to join us?", "formglut"), placeholder: "", max_words: 250, show_counter: true }),
        f("form_step", { step_title: __("Documents", "formglut") }),
        f("file_upload", { label: __("CV / résumé", "formglut"), required: true, allowed_types: "pdf, doc, docx" }),
        f("terms_conditions", { required: true })
      ],
      settings: { multistep: { first_title: __("Your details", "formglut") }, notifications: { attach_files: true } }
    })
  },
  {
    key: "support",
    title: __("Support ticket", "formglut"),
    desc: __("Priority, category, description and screenshot.", "formglut"),
    icon: "🛟",
    build: () => ({
      fields: [
        cols([[f("text", { label: __("Your name", "formglut"), placeholder: "", required: true })], [f("email", { label: __("Email", "formglut") })]]),
        cols([[f("select", { label: __("Category", "formglut"), options: choices([__("Billing", "formglut"), __("Technical", "formglut"), __("Account", "formglut"), __("Other", "formglut")]) })], [f("radio", { label: __("Priority", "formglut"), options: choices([__("Low", "formglut"), __("Normal", "formglut"), __("High", "formglut")]), layout: "inline" })]]),
        f("text", { label: __("Subject", "formglut"), placeholder: "", required: true }),
        f("rich_text", { label: __("Describe the problem", "formglut"), required: true }),
        f("file_upload", { label: __("Screenshot (optional)", "formglut"), required: false, images_only: true }),
        f("unique_id", { label: __("Ticket number", "formglut"), id_prefix: "TK-" })
      ]
    })
  },
  {
    key: "appointment",
    title: __("Appointment booking", "formglut"),
    desc: __("Date, time and reason — weekdays only.", "formglut"),
    icon: "📅",
    build: () => ({
      fields: [
        f("name", {}),
        cols([[f("email", { label: __("Email", "formglut") })], [f("phone", { label: __("Phone", "formglut") })]]),
        cols([[f("date", { label: __("Preferred date", "formglut"), required: true, use_picker: true, disable_past: true, disable_weekends: true })], [f("time", { label: __("Preferred time", "formglut"), time_format: "12", time_increment: 30, min_time: "09:00", max_time: "17:00" })]]),
        f("textarea", { label: __("Reason for the visit", "formglut"), placeholder: "" })
      ]
    })
  }
];
function finalizeTemplate(t) {
  var _a, _b;
  const built = t.build();
  const flat = [];
  const walk = (list) => list.forEach((x) => {
    if (x.columns) x.columns.forEach((c) => walk(c.fields || []));
    else flat.push(x);
  });
  walk(built.fields);
  const uid = flat.find((x) => x.type === "unique_id");
  if (uid && ((_b = (_a = built.settings) == null ? void 0 : _a.confirmation) == null ? void 0 : _b.message)) {
    built.settings.confirmation.message = built.settings.confirmation.message.replace("{field:BOOKING}", "{field:" + uid.id + "}");
  }
  return built;
}
function MigratorModal({ open, onClose, onImported }) {
  const [sources, setSources] = reactExports.useState(null);
  const [picked, setPicked] = reactExports.useState({});
  const [running, setRunning] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!open) return;
    setSources(null);
    setPicked({});
    setResults([]);
    getMigrationSources().then((d) => setSources(d.sources || [])).catch((e) => {
      staticMethods.error(e.message);
      setSources([]);
    });
  }, [open]);
  const keyOf = (s, f2) => s.key + ":" + f2.id;
  const selected = Object.keys(picked).filter((k) => picked[k]);
  const run = async () => {
    var _a, _b;
    setRunning(true);
    const out = [];
    for (const k of selected) {
      const [source, id] = k.split(":");
      const title = ((_b = (_a = sources.find((s) => s.key === source)) == null ? void 0 : _a.forms.find((f2) => String(f2.id) === id)) == null ? void 0 : _b.title) || k;
      try {
        const r = await migrateForm(source, Number(id));
        out.push({ ok: true, title, formId: r.form_id, skipped: r.skipped || [] });
      } catch (e) {
        out.push({ ok: false, title, error: e.message });
      }
      setResults([...out]);
    }
    setRunning(false);
    setPicked({});
    onImported();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      onCancel: onClose,
      width: 640,
      title: __("Import from another form plugin", "formglut"),
      footer: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onClose, children: __("Close", "formglut") }, "close"),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", disabled: !selected.length, loading: running, onClick: run, style: selected.length ? { background: "#e94560", borderColor: "#e94560" } : void 0, children: selected.length ? sprintf(__("Import %d form(s)", "formglut"), selected.length) : __("Import", "formglut") }, "go")
      ],
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#64748b", marginTop: 0 }, children: __("Copies each form’s fields, labels, choices and columns into a new FormGlut draft. Entries stay in the other plugin. Supported: Fluent Forms, Forminator, WPForms, Contact Form 7.", "formglut") }),
        sources === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", padding: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {}) }) : sources.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-fs-note", children: __("No forms from supported plugins were found on this site.", "formglut") }) : sources.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-mig-source", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-mig-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: s.forms.length > 0 && s.forms.every((f2) => picked[keyOf(s, f2)]), onChange: (e) => setPicked((p) => {
              const n2 = { ...p };
              s.forms.forEach((f2) => {
                n2[keyOf(s, f2)] = e.target.checked;
              });
              return n2;
            }), children: __("Select all", "formglut") })
          ] }),
          s.forms.map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fg-mig-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: !!picked[keyOf(s, f2)], onChange: (e) => setPicked((p) => ({ ...p, [keyOf(s, f2)]: e.target.checked })) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t", children: f2.title || __("(no title)", "formglut") }),
            f2.fields !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "m", children: sprintf(__("%d fields", "formglut"), f2.fields) }),
            f2.imported && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "green", children: __("Imported before", "formglut") })
          ] }, f2.id))
        ] }, s.key)),
        results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-mig-results", children: results.map((r, i) => {
          var _a, _b;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: r.ok ? "ok" : "bad", children: [
            r.ok ? "✓" : "✕",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: r.title }),
            " ",
            r.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: (((_b = (_a = window.formglut_admin) == null ? void 0 : _a.pages) == null ? void 0 : _b.editor) || "") + "&form_id=" + r.formId, children: __("Open in editor", "formglut") }) : r.error,
            r.ok && r.skipped.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-fs-help", children: [
              __("Not imported (no matching FormGlut field):", "formglut"),
              " ",
              r.skipped.join(", ")
            ] })
          ] }, i);
        }) })
      ]
    }
  );
}
staticMethods.config({
  duration: 3,
  maxCount: 3,
  top: 24,
  placement: "top"
});
function CreateFormModal({ open, onClose }) {
  const [creating, setCreating] = reactExports.useState(false);
  const [picking, setPicking] = reactExports.useState(false);
  async function handleCreate(template) {
    setCreating(true);
    try {
      const built = template ? finalizeTemplate(template) : { fields: [], settings: {} };
      const result = await createForm({
        title: template ? template.title : __("Untitled Form", "formglut"),
        fields: built.fields,
        submit_btn: {},
        settings: built.settings || {},
        status: "draft"
      });
      onClose();
      window.location.href = _pg.editor + "&form_id=" + result.form_id;
    } catch (err) {
      staticMethods.error(err.message || __("Failed to create form.", "formglut"));
    } finally {
      setCreating(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 18, fontWeight: 700 }, children: __("Create A New Form", "formglut") }),
      open,
      onCancel: onClose,
      footer: null,
      width: "64%",
      centered: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Row, { gutter: 24, style: { marginTop: 24, marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { span: 8, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-create-card", onClick: creating ? void 0 : () => handleCreate(null), style: creating ? { opacity: 0.6, pointerEvents: "none" } : {}, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-create-card-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-create-card-title", children: __("New Blank Form", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-create-card-desc", children: __("Create a new blank form from scratch.", "formglut") })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { span: 8, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-create-card", onClick: () => setPicking(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-create-card-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileLines }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-create-card-title", children: __("Choose a Template", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-create-card-desc", children: __("Choose a pre-made form template and customize it.", "formglut") })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { span: 8, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-create-card", style: { opacity: 0.5, cursor: "not-allowed" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-create-card-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-create-card-title", children: [
              __("Create Conversational Form", "formglut"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-pro-pill", children: "PRO" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-create-card-desc", children: __("Turn your content, surveys into conversations.", "formglut") })
          ] }) })
        ] }),
        picking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-template-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-template-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: __("Templates", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "fg-template-back", onClick: () => setPicking(false), children: __("Hide templates", "formglut") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { gutter: [16, 16], children: TEMPLATES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { xs: 24, sm: 12, lg: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "fg-template-card", disabled: creating, onClick: () => handleCreate(t), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-template-icon", "aria-hidden": "true", children: t.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-template-title", children: t.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-template-desc", children: t.desc })
          ] }) }, t.key)) })
        ] })
      ]
    }
  );
}
function SkeletonLoader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fg-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-header-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Button, { active: true, style: { width: 80, height: 36 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, style: { width: 120, height: 36, marginLeft: 16 } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fg-header-nav", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Button, { active: true, style: { width: 70, height: 32, margin: "0 4px" } }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-page-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, style: { width: 180, height: 32 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, style: { width: 240, height: 18, marginTop: 8 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Space, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Button, { active: true, style: { width: 150 } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-stats-row", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 90, height: 16 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, style: { width: 60, height: 32, marginTop: 8 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 120, height: 14, marginTop: 6 } })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-table-toolbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-table-toolbar-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, style: { width: 240, height: 32 } }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "0 20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #f0f0f0" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 24, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 200, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 120, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 60, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 80, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 80, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 60, height: 16 } })
          ] }),
          [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #fafafa" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 24, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Avatar, { active: true, shape: "square", size: 36 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 160, height: 16 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 130, height: 12, marginTop: 4 } })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 130, height: 24 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 40, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 50, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 40, height: 16 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Avatar, { active: true, size: 28, shape: "circle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Avatar, { active: true, size: 28, shape: "circle" })
            ] })
          ] }, i))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end", padding: "16px 20px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton.Input, { active: true, size: "small", style: { width: 200, height: 24 } }) })
      ] })
    ] })
  ] });
}
function AllForms() {
  const [forms, setForms] = reactExports.useState([]);
  const [total, setTotal] = reactExports.useState(0);
  const [page, setPage] = reactExports.useState(1);
  const [perPage, setPerPage] = reactExports.useState(10);
  const [searchText, setSearchText] = reactExports.useState("");
  const [orderby, setOrderby] = reactExports.useState("created_at");
  const [order, setOrder] = reactExports.useState("DESC");
  const [loading, setLoading] = reactExports.useState(true);
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = reactExports.useState([]);
  const [statusFilter, setStatusFilter] = reactExports.useState("");
  const [datePreset, setDatePreset] = reactExports.useState("");
  const [customRange, setCustomRange] = reactExports.useState(null);
  const dateRange = (() => {
    const fmt = (d) => d.format("YYYY-MM-DD");
    const today = dayjs();
    switch (datePreset) {
      case "today":
        return [fmt(today), fmt(today)];
      case "last_week":
        return [fmt(today.subtract(6, "day")), fmt(today)];
      case "this_month":
        return [fmt(today.startOf("month")), fmt(today)];
      case "custom":
        return customRange && customRange[0] && customRange[1] ? [fmt(customRange[0]), fmt(customRange[1])] : ["", ""];
      default:
        return ["", ""];
    }
  })();
  const [dateFrom, dateTo] = dateRange;
  const [stats, setStats] = reactExports.useState({
    totalForms: 0,
    totalEntries: 0,
    activeForms: 0,
    draftForms: 0,
    closedForms: 0
  });
  const loadStats = reactExports.useCallback(async () => {
    try {
      const s = await getFormStats();
      setStats({
        totalForms: s.total_forms || 0,
        totalEntries: s.total_entries || 0,
        activeForms: s.active_forms || 0,
        draftForms: s.draft_forms || 0,
        closedForms: s.closed_forms || 0
      });
    } catch (_) {
    }
  }, []);
  const loadForms = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const result = await getForms({
        page,
        per_page: perPage,
        search: searchText,
        orderby,
        order,
        status: statusFilter,
        date_from: dateFrom,
        date_to: dateTo
      });
      setForms(result.forms || []);
      setTotal(result.total || 0);
    } catch (err) {
      staticMethods.error(err.message || __("Failed to load forms.", "formglut"));
    } finally {
      setLoading(false);
    }
  }, [page, perPage, searchText, orderby, order, statusFilter, dateFrom, dateTo]);
  reactExports.useEffect(() => {
    loadStats();
  }, [loadStats]);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      loadForms();
    }, 300);
    return () => clearTimeout(timer);
  }, [loadForms]);
  const [searchInput, setSearchInput] = reactExports.useState("");
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);
  async function handleDelete(id) {
    try {
      await deleteForm(id);
      staticMethods.success(__("Form deleted.", "formglut"));
      loadForms();
    } catch (err) {
      staticMethods.error(err.message || __("Failed to delete form.", "formglut"));
    }
  }
  const importRef = React.useRef(null);
  const [showMigrator, setShowMigrator] = reactExports.useState(false);
  async function handleImportFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      JSON.parse(text);
      const res = await importForms(text);
      staticMethods.success(res.message || __("Forms imported.", "formglut"));
      loadForms();
      loadStats();
    } catch (err) {
      staticMethods.error(err instanceof SyntaxError ? __("This file is not valid JSON.", "formglut") : err.message || __("Import failed.", "formglut"));
    }
  }
  async function handleDuplicate(id) {
    try {
      await duplicateForm(id);
      staticMethods.success(__("Form duplicated.", "formglut"));
      loadForms();
    } catch (err) {
      staticMethods.error(err.message || __("Failed to duplicate form.", "formglut"));
    }
  }
  async function handleStatusChange(id, checked) {
    const status = checked ? "active" : "draft";
    try {
      await updateFormStatus(id, status);
      staticMethods.success(checked ? __("Form activated.", "formglut") : __("Form set to draft.", "formglut"));
      loadForms();
    } catch (err) {
      staticMethods.error(err.message || __("Failed to update status.", "formglut"));
    }
  }
  async function handleBulkDelete() {
    if (!selectedRowKeys.length) return;
    try {
      await Promise.all(selectedRowKeys.map((id) => deleteForm(id)));
      staticMethods.success(__("%s form(s) deleted.", "formglut").replace("%s", selectedRowKeys.length));
      setSelectedRowKeys([]);
      loadForms();
    } catch (err) {
      staticMethods.error(__("Failed to delete some forms.", "formglut"));
    }
  }
  async function handleBulkStatus(status) {
    if (!selectedRowKeys.length) return;
    try {
      await Promise.all(selectedRowKeys.map((id) => updateFormStatus(id, status)));
      staticMethods.success(__("%s form(s) updated.", "formglut").replace("%s", selectedRowKeys.length));
      setSelectedRowKeys([]);
      loadForms();
    } catch (err) {
      staticMethods.error(__("Failed to update some forms.", "formglut"));
    }
  }
  const columns = [
    {
      title: __("ID", "formglut"),
      dataIndex: "id",
      width: 70,
      sorter: true,
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, color: "#64748b" }, children: [
        "#",
        v
      ] })
    },
    {
      title: __("Form Name", "formglut"),
      dataIndex: "title",
      width: 380,
      render: (text, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontWeight: 600, fontSize: 14 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: _pg.editor + "&form_id=" + r.id, style: { color: "#1a1a2e" }, children: text }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-status-dot " + (r.status === "active" || r.status === "published" ? "active" : r.status === "closed" ? "closed" : "draft") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8", fontWeight: 400, fontSize: 12 }, children: r.status === "published" ? __("Active", "formglut") : r.status.charAt(0).toUpperCase() + r.status.slice(1) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#b0b8c4", marginTop: 1 }, children: r.created })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-row-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: _pg.editor + "&form_id=" + r.id, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPenToSquare }),
            " ",
            __("Edit", "formglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-action-sep", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: _pg.form_settings + "&form_id=" + r.id, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faGear }),
            " ",
            __("Settings", "formglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-action-sep", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: exportFormsUrl(r.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }),
            " ",
            __("Export", "formglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-action-sep", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: _pg.preview + "&form_id=" + r.id, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEye }),
            " ",
            __("Preview", "formglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-action-sep", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              size: "small",
              checked: r.status === "active" || r.status === "published",
              checkedChildren: __("Active", "formglut"),
              unCheckedChildren: __("Draft", "formglut"),
              onChange: (checked) => handleStatusChange(r.id, checked)
            }
          )
        ] })
      ] })
    },
    {
      title: __("Shortcode", "formglut"),
      dataIndex: "shortcode",
      width: 260,
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-shortcode", onClick: () => {
        const ta = document.createElement("textarea");
        ta.value = v;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        staticMethods.success(__("Copied!", "formglut"));
      }, children: v })
    },
    {
      title: __("Views", "formglut"),
      dataIndex: "views",
      width: 100,
      sorter: true,
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, color: "#1a1a2e" }, children: (v || 0).toLocaleString() })
    },
    {
      title: __("Entries", "formglut"),
      dataIndex: "entries",
      width: 100,
      sorter: true,
      render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: _pg.entries + "&form_id=" + r.id, style: { fontWeight: 600, color: "#1a1a2e" }, children: (v || 0).toLocaleString() }) })
    },
    {
      title: __("Conversion", "formglut"),
      dataIndex: "conversion",
      width: 100,
      sorter: true,
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, color: v > 60 ? "#10b981" : v > 30 ? "#f59e0b" : "#ef4444" }, children: [
        v,
        "%"
      ] })
    },
    {
      title: __("Action", "formglut"),
      dataIndex: "action",
      width: 100,
      align: "center",
      render: (_, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Space, { size: 4, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Duplicate form", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCopy }), style: { color: "#64748b" }, onClick: () => handleDuplicate(r.id) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Are you sure to delete this?", "formglut"), okText: __("Confirm", "formglut"), cancelText: __("Cancel", "formglut"), okButtonProps: { danger: true }, onConfirm: () => handleDelete(r.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Delete form", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrash }), danger: true }) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    loading && forms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLoader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { activePage: "Forms" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-page-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-page-title", children: __("All Forms", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-page-subtitle", children: __("Manage and monitor all your forms", "formglut") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Space, { size: 8, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: importRef, type: "file", accept: ".json,application/json", style: { display: "none" }, onChange: handleImportFile }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Dropdown, { trigger: ["click"], menu: { items: [
              { key: "file", label: __("From a FormGlut file (.json)", "formglut"), onClick: () => importRef.current && importRef.current.click() },
              { key: "plugin", label: __("From another form plugin…", "formglut"), onClick: () => setShowMigrator(true) }
            ] }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileImport }), children: __("Import", "formglut") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MigratorModal, { open: showMigrator, onClose: () => setShowMigrator(false), onImported: () => {
              loadForms();
              loadStats();
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), style: { background: "#e94560", borderColor: "#e94560" }, onClick: () => {
              setShowCreateModal(true);
            }, children: __("Add New Form", "formglut") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-stats-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-stat-label", children: __("Total Forms", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-stat-value", children: stats.totalForms.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-stat-label", children: __("Total Entries", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-stat-value", children: stats.totalEntries.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-stat-label", children: __("Active Forms", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-stat-value", children: stats.activeForms })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-stat-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-stat-label", children: __("Draft Forms", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-stat-value", children: stats.draftForms })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-filter-tabs", children: [
          { key: "", label: __("All", "formglut"), count: stats.totalForms },
          { key: "active", label: __("Active", "formglut"), count: stats.activeForms },
          { key: "draft", label: __("Draft", "formglut"), count: stats.draftForms },
          { key: "closed", label: __("Closed", "formglut"), count: stats.closedForms }
        ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "fg-filter-tab" + (statusFilter === tab.key ? " active" : ""),
            onClick: () => {
              setStatusFilter(tab.key);
              setPage(1);
            },
            children: [
              tab.label,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-filter-count", children: tab.count })
            ]
          },
          tab.key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-wrap", children: [
          selectedRowKeys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-bulk-bar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              selectedRowKeys.length,
              " ",
              __("selected", "formglut")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", className: "fg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleCheck }), onClick: () => handleBulkStatus("active"), children: __("Set Active", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", className: "fg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPenToSquare }), onClick: () => handleBulkStatus("draft"), children: __("Set Draft", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", className: "fg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), href: exportFormsUrl(selectedRowKeys), children: __("Export", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Delete %s form(s)?", "formglut").replace("%s", selectedRowKeys.length), okText: __("Delete", "formglut"), cancelText: __("Cancel", "formglut"), okButtonProps: { danger: true }, onConfirm: handleBulkDelete, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", danger: true, className: "fg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), children: __("Delete", "formglut") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", type: "text", className: "fg-bulk-clear", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faXmark }), onClick: () => setSelectedRowKeys([]), children: __("Clear", "formglut") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-toolbar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-table-toolbar-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: __("Search forms...", "formglut"),
                prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass, style: { color: "#94a3b8" } }),
                style: { width: 240 },
                value: searchInput,
                onChange: (e) => setSearchInput(e.target.value),
                allowClear: true
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-table-toolbar-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Select,
                {
                  value: datePreset,
                  style: { width: 160 },
                  suffixIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendarDays }),
                  onChange: (v) => {
                    setDatePreset(v);
                    if (v !== "custom") setCustomRange(null);
                    setPage(1);
                  },
                  options: [
                    { value: "", label: __("All", "formglut") },
                    { value: "today", label: __("Today", "formglut") },
                    { value: "last_week", label: __("Last 7 Days", "formglut") },
                    { value: "this_month", label: __("This Month", "formglut") },
                    { value: "custom", label: __("Custom Range", "formglut") }
                  ]
                }
              ),
              datePreset === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                DatePicker.RangePicker,
                {
                  value: customRange,
                  onChange: (range) => {
                    setCustomRange(range);
                    setPage(1);
                  },
                  disabledDate: (d) => d && d.isAfter(dayjs(), "day"),
                  allowClear: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Refresh", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateRight, spin: loading, style: { color: "#64748b" } }), onClick: loadForms }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ForwardTable,
            {
              dataSource: forms,
              columns,
              rowKey: "id",
              rowSelection: {
                selectedRowKeys,
                onChange: setSelectedRowKeys
              },
              scroll: { x: "max-content" },
              loading: loading && forms.length > 0,
              onChange: (_pag, _filters, sorter) => {
                if (sorter.field) {
                  setOrderby(sorter.field);
                  setOrder(sorter.order === "ascend" ? "ASC" : "DESC");
                } else {
                  setOrderby("created_at");
                  setOrder("DESC");
                }
              },
              pagination: {
                current: page,
                pageSize: perPage,
                total,
                showSizeChanger: true,
                showTotal: (t) => `${t} ${__("forms total", "formglut")}`,
                onChange: (p, ps) => {
                  setPage(p);
                  setPerPage(ps);
                }
              },
              locale: {
                emptyText: !searchText && !dateFrom ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-empty-state", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-empty-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileLines }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-empty-title", children: __("No forms yet", "formglut") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-empty-desc", children: __("Create your first form and start collecting responses.", "formglut") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), style: { background: "#e94560", borderColor: "#e94560", marginTop: 12 }, onClick: () => setShowCreateModal(true), children: __("Create a Form", "formglut") })
                ] }) : __("No forms match your filters.", "formglut")
              },
              style: { padding: "0 8px" }
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CreateFormModal, { open: showCreateModal, onClose: () => {
      setShowCreateModal(false);
    } })
  ] });
}
createRoot(document.getElementById("formglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(AllForms, {}));
//# sourceMappingURL=all-forms.js.map
