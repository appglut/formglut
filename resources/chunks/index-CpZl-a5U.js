import { bP as reactExports, cc as useSafeState, B as Button, ah as convertLegacyProps, bj as genStyleHooks, bf as genCompactItemStyle, R as React, d as ConfigContext, c0 as useCompactItemContext, ab as classNames, bI as merge, c1 as useComponentConfig, bX as toArray, c as Compact, w as RefIcon, c8 as useLocale, bH as localeValues, ca as useMergedState, bK as omit } from "./NavMenu-D0YBC0d1.js";
import { g as getRenderPropValue, a as PurePanel$1, P as Popover } from "./index-DXRCHqrQ.js";
const isThenable = (thing) => {
  return typeof (thing === null || thing === void 0 ? void 0 : thing.then) === "function";
};
const ActionButton = (props) => {
  const {
    type,
    children,
    prefixCls,
    buttonProps,
    close,
    autoFocus,
    emitEvent,
    isSilent,
    quitOnNullishReturnValue,
    actionFn
  } = props;
  const clickedRef = reactExports.useRef(false);
  const buttonRef = reactExports.useRef(null);
  const [loading, setLoading] = useSafeState(false);
  const onInternalClose = (...args) => {
    close === null || close === void 0 ? void 0 : close.apply(void 0, args);
  };
  reactExports.useEffect(() => {
    let timeoutId = null;
    if (autoFocus) {
      timeoutId = setTimeout(() => {
        var _a;
        (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.focus({
          preventScroll: true
        });
      });
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [autoFocus]);
  const handlePromiseOnOk = (returnValueOfOnOk) => {
    if (!isThenable(returnValueOfOnOk)) {
      return;
    }
    setLoading(true);
    returnValueOfOnOk.then((...args) => {
      setLoading(false, true);
      onInternalClose.apply(void 0, args);
      clickedRef.current = false;
    }, (e) => {
      setLoading(false, true);
      clickedRef.current = false;
      if (isSilent === null || isSilent === void 0 ? void 0 : isSilent()) {
        return;
      }
      return Promise.reject(e);
    });
  };
  const onClick = (e) => {
    if (clickedRef.current) {
      return;
    }
    clickedRef.current = true;
    if (!actionFn) {
      onInternalClose();
      return;
    }
    let returnValueOfOnOk;
    if (emitEvent) {
      returnValueOfOnOk = actionFn(e);
      if (quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
        clickedRef.current = false;
        onInternalClose(e);
        return;
      }
    } else if (actionFn.length) {
      returnValueOfOnOk = actionFn(close);
      clickedRef.current = false;
    } else {
      returnValueOfOnOk = actionFn();
      if (!isThenable(returnValueOfOnOk)) {
        onInternalClose();
        return;
      }
    }
    handlePromiseOnOk(returnValueOfOnOk);
  };
  return /* @__PURE__ */ reactExports.createElement(Button, Object.assign({}, convertLegacyProps(type), {
    onClick,
    loading,
    prefixCls
  }, buttonProps, {
    ref: buttonRef
  }), children);
};
function isPresetSize(size) {
  return ["small", "middle", "large"].includes(size);
}
function isValidGapNumber(size) {
  if (!size) {
    return false;
  }
  return typeof size === "number" && !Number.isNaN(size);
}
const genSpaceAddonStyle = (token) => {
  const {
    componentCls,
    borderRadius,
    paddingSM,
    colorBorder,
    paddingXS,
    fontSizeLG,
    fontSizeSM,
    borderRadiusLG,
    borderRadiusSM,
    colorBgContainerDisabled,
    lineWidth
  } = token;
  return {
    [componentCls]: [{
      display: "inline-flex",
      alignItems: "center",
      gap: 0,
      paddingInline: paddingSM,
      margin: 0,
      background: colorBgContainerDisabled,
      borderWidth: lineWidth,
      borderStyle: "solid",
      borderColor: colorBorder,
      borderRadius,
      "&-large": {
        fontSize: fontSizeLG,
        borderRadius: borderRadiusLG
      },
      "&-small": {
        paddingInline: paddingXS,
        borderRadius: borderRadiusSM,
        fontSize: fontSizeSM
      },
      "&-compact-last-item": {
        borderEndStartRadius: 0,
        borderStartStartRadius: 0
      },
      "&-compact-first-item": {
        borderEndEndRadius: 0,
        borderStartEndRadius: 0
      },
      "&-compact-item:not(:first-child):not(:last-child)": {
        borderRadius: 0
      },
      "&-compact-item:not(:last-child)": {
        borderInlineEndWidth: 0
      }
    }, genCompactItemStyle(token, {
      focus: false
    })]
  };
};
const useStyle$2 = genStyleHooks(["Space", "Addon"], (token) => [genSpaceAddonStyle(token)]);
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const SpaceAddon = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    className,
    children,
    style,
    prefixCls: customizePrefixCls
  } = props, restProps = __rest$3(props, ["className", "children", "style", "prefixCls"]);
  const {
    getPrefixCls,
    direction: directionConfig
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls("space-addon", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$2(prefixCls);
  const {
    compactItemClassnames,
    compactSize
  } = useCompactItemContext(prefixCls, directionConfig);
  const classes = classNames(prefixCls, hashId, compactItemClassnames, cssVarCls, {
    [`${prefixCls}-${compactSize}`]: compactSize
  }, className);
  return wrapCSSVar(/* @__PURE__ */ React.createElement("div", Object.assign({
    ref,
    className: classes,
    style
  }, restProps), children));
});
const SpaceContext = /* @__PURE__ */ React.createContext({
  latestIndex: 0
});
const SpaceContextProvider = SpaceContext.Provider;
const Item = ({
  className,
  index,
  children,
  split,
  style
}) => {
  const {
    latestIndex
  } = reactExports.useContext(SpaceContext);
  if (children === null || children === void 0) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("div", {
    className,
    style
  }, children), index < latestIndex && split && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${className}-split`
  }, split));
};
const genSpaceStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  return {
    [componentCls]: {
      display: "inline-flex",
      "&-rtl": {
        direction: "rtl"
      },
      "&-vertical": {
        flexDirection: "column"
      },
      "&-align": {
        flexDirection: "column",
        "&-center": {
          alignItems: "center"
        },
        "&-start": {
          alignItems: "flex-start"
        },
        "&-end": {
          alignItems: "flex-end"
        },
        "&-baseline": {
          alignItems: "baseline"
        }
      },
      [`${componentCls}-item:empty`]: {
        display: "none"
      },
      // https://github.com/ant-design/ant-design/issues/47875
      [`${componentCls}-item > ${antCls}-badge-not-a-wrapper:only-child`]: {
        display: "block"
      }
    }
  };
};
const genSpaceGapStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      "&-gap-row-small": {
        rowGap: token.spaceGapSmallSize
      },
      "&-gap-row-middle": {
        rowGap: token.spaceGapMiddleSize
      },
      "&-gap-row-large": {
        rowGap: token.spaceGapLargeSize
      },
      "&-gap-col-small": {
        columnGap: token.spaceGapSmallSize
      },
      "&-gap-col-middle": {
        columnGap: token.spaceGapMiddleSize
      },
      "&-gap-col-large": {
        columnGap: token.spaceGapLargeSize
      }
    }
  };
};
const useStyle$1 = genStyleHooks("Space", (token) => {
  const spaceToken = merge(token, {
    spaceGapSmallSize: token.paddingXS,
    spaceGapMiddleSize: token.padding,
    spaceGapLargeSize: token.paddingLG
  });
  return [genSpaceStyle(spaceToken), genSpaceGapStyle(spaceToken)];
}, () => ({}), {
  // Space component don't apply extra font style
  // https://github.com/ant-design/ant-design/issues/40315
  resetStyle: false
});
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalSpace = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a;
  const {
    getPrefixCls,
    direction: directionConfig,
    size: contextSize,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("space");
  const {
    size = contextSize !== null && contextSize !== void 0 ? contextSize : "small",
    align,
    className,
    rootClassName,
    children,
    direction = "horizontal",
    prefixCls: customizePrefixCls,
    split,
    style,
    wrap = false,
    classNames: customClassNames,
    styles
  } = props, otherProps = __rest$2(props, ["size", "align", "className", "rootClassName", "children", "direction", "prefixCls", "split", "style", "wrap", "classNames", "styles"]);
  const [horizontalSize, verticalSize] = Array.isArray(size) ? size : [size, size];
  const isPresetVerticalSize = isPresetSize(verticalSize);
  const isPresetHorizontalSize = isPresetSize(horizontalSize);
  const isValidVerticalSize = isValidGapNumber(verticalSize);
  const isValidHorizontalSize = isValidGapNumber(horizontalSize);
  const childNodes = toArray(children, {
    keepEmpty: true
  });
  const mergedAlign = align === void 0 && direction === "horizontal" ? "center" : align;
  const prefixCls = getPrefixCls("space", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const cls = classNames(prefixCls, contextClassName, hashId, `${prefixCls}-${direction}`, {
    [`${prefixCls}-rtl`]: directionConfig === "rtl",
    [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    [`${prefixCls}-gap-row-${verticalSize}`]: isPresetVerticalSize,
    [`${prefixCls}-gap-col-${horizontalSize}`]: isPresetHorizontalSize
  }, className, rootClassName, cssVarCls);
  const itemClassName = classNames(`${prefixCls}-item`, (_a = customClassNames === null || customClassNames === void 0 ? void 0 : customClassNames.item) !== null && _a !== void 0 ? _a : contextClassNames.item);
  const mergedItemStyle = Object.assign(Object.assign({}, contextStyles.item), styles === null || styles === void 0 ? void 0 : styles.item);
  const renderedItems = childNodes.map((child, i) => {
    const key = (child === null || child === void 0 ? void 0 : child.key) || `${itemClassName}-${i}`;
    return /* @__PURE__ */ reactExports.createElement(Item, {
      className: itemClassName,
      key,
      index: i,
      split,
      style: mergedItemStyle
    }, child);
  });
  const memoizedSpaceContext = reactExports.useMemo(() => {
    const calcLatestIndex = childNodes.reduce((latest, child, i) => child !== null && child !== void 0 ? i : latest, 0);
    return {
      latestIndex: calcLatestIndex
    };
  }, [childNodes]);
  if (childNodes.length === 0) {
    return null;
  }
  const gapStyle = {};
  if (wrap) {
    gapStyle.flexWrap = "wrap";
  }
  if (!isPresetHorizontalSize && isValidHorizontalSize) {
    gapStyle.columnGap = horizontalSize;
  }
  if (!isPresetVerticalSize && isValidVerticalSize) {
    gapStyle.rowGap = verticalSize;
  }
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({
    ref,
    className: cls,
    style: Object.assign(Object.assign(Object.assign({}, gapStyle), contextStyle), style)
  }, otherProps), /* @__PURE__ */ reactExports.createElement(SpaceContextProvider, {
    value: memoizedSpaceContext
  }, renderedItems)));
});
const Space = InternalSpace;
Space.Compact = Compact;
Space.Addon = SpaceAddon;
const genBaseStyle = (token) => {
  const {
    componentCls,
    iconCls,
    antCls,
    zIndexPopup,
    colorText,
    colorWarning,
    marginXXS,
    marginXS,
    fontSize,
    fontWeightStrong,
    colorTextHeading
  } = token;
  return {
    [componentCls]: {
      zIndex: zIndexPopup,
      [`&${antCls}-popover`]: {
        fontSize
      },
      [`${componentCls}-message`]: {
        marginBottom: marginXS,
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "start",
        [`> ${componentCls}-message-icon ${iconCls}`]: {
          color: colorWarning,
          fontSize,
          lineHeight: 1,
          marginInlineEnd: marginXS
        },
        [`${componentCls}-title`]: {
          fontWeight: fontWeightStrong,
          color: colorTextHeading,
          "&:only-child": {
            fontWeight: "normal"
          }
        },
        [`${componentCls}-description`]: {
          marginTop: marginXXS,
          color: colorText
        }
      },
      [`${componentCls}-buttons`]: {
        textAlign: "end",
        whiteSpace: "nowrap",
        button: {
          marginInlineStart: marginXS
        }
      }
    }
  };
};
const prepareComponentToken = (token) => {
  const {
    zIndexPopupBase
  } = token;
  return {
    zIndexPopup: zIndexPopupBase + 60
  };
};
const useStyle = genStyleHooks("Popconfirm", (token) => genBaseStyle(token), prepareComponentToken, {
  resetStyle: false
});
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Overlay = (props) => {
  const {
    prefixCls,
    okButtonProps,
    cancelButtonProps,
    title,
    description,
    cancelText,
    okText,
    okType = "primary",
    icon = /* @__PURE__ */ reactExports.createElement(RefIcon, null),
    showCancel = true,
    close,
    onConfirm,
    onCancel,
    onPopupClick
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const [contextLocale] = useLocale("Popconfirm", localeValues.Popconfirm);
  const titleNode = getRenderPropValue(title);
  const descriptionNode = getRenderPropValue(description);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-inner-content`,
    onClick: onPopupClick
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-message`
  }, icon && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-message-icon`
  }, icon), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-message-text`
  }, titleNode && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-title`
  }, titleNode), descriptionNode && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-description`
  }, descriptionNode))), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-buttons`
  }, showCancel && /* @__PURE__ */ reactExports.createElement(Button, Object.assign({
    onClick: onCancel,
    size: "small"
  }, cancelButtonProps), cancelText || (contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.cancelText)), /* @__PURE__ */ reactExports.createElement(ActionButton, {
    buttonProps: Object.assign(Object.assign({
      size: "small"
    }, convertLegacyProps(okType)), okButtonProps),
    actionFn: onConfirm,
    close,
    prefixCls: getPrefixCls("btn"),
    quitOnNullishReturnValue: true,
    emitEvent: true
  }, okText || (contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.okText))));
};
const PurePanel = (props) => {
  const {
    prefixCls: customizePrefixCls,
    placement,
    className,
    style
  } = props, restProps = __rest$1(props, ["prefixCls", "placement", "className", "style"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("popconfirm", customizePrefixCls);
  const [wrapCSSVar] = useStyle(prefixCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(PurePanel$1, {
    placement,
    className: classNames(prefixCls, className),
    style,
    content: /* @__PURE__ */ reactExports.createElement(Overlay, Object.assign({
      prefixCls
    }, restProps))
  }));
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalPopconfirm = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    placement = "top",
    trigger = "click",
    okType = "primary",
    icon = /* @__PURE__ */ reactExports.createElement(RefIcon, null),
    children,
    overlayClassName,
    onOpenChange,
    onVisibleChange,
    overlayStyle,
    styles,
    classNames: popconfirmClassNames
  } = props, restProps = __rest(props, ["prefixCls", "placement", "trigger", "okType", "icon", "children", "overlayClassName", "onOpenChange", "onVisibleChange", "overlayStyle", "styles", "classNames"]);
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("popconfirm");
  const [open, setOpen] = useMergedState(false, {
    value: (_a = props.open) !== null && _a !== void 0 ? _a : props.visible,
    defaultValue: (_b = props.defaultOpen) !== null && _b !== void 0 ? _b : props.defaultVisible
  });
  const settingOpen = (value, e) => {
    setOpen(value, true);
    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(value);
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(value, e);
  };
  const close = (e) => {
    settingOpen(false, e);
  };
  const onConfirm = (e) => {
    var _a2;
    return (_a2 = props.onConfirm) === null || _a2 === void 0 ? void 0 : _a2.call(void 0, e);
  };
  const onCancel = (e) => {
    var _a2;
    settingOpen(false, e);
    (_a2 = props.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(void 0, e);
  };
  const onInternalOpenChange = (value, e) => {
    const {
      disabled = false
    } = props;
    if (disabled) {
      return;
    }
    settingOpen(value, e);
  };
  const prefixCls = getPrefixCls("popconfirm", customizePrefixCls);
  const rootClassNames = classNames(prefixCls, contextClassName, overlayClassName, contextClassNames.root, popconfirmClassNames === null || popconfirmClassNames === void 0 ? void 0 : popconfirmClassNames.root);
  const bodyClassNames = classNames(contextClassNames.body, popconfirmClassNames === null || popconfirmClassNames === void 0 ? void 0 : popconfirmClassNames.body);
  const [wrapCSSVar] = useStyle(prefixCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Popover, Object.assign({}, omit(restProps, ["title"]), {
    trigger,
    placement,
    onOpenChange: onInternalOpenChange,
    open,
    ref,
    classNames: {
      root: rootClassNames,
      body: bodyClassNames
    },
    styles: {
      root: Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.root), contextStyle), overlayStyle), styles === null || styles === void 0 ? void 0 : styles.root),
      body: Object.assign(Object.assign({}, contextStyles.body), styles === null || styles === void 0 ? void 0 : styles.body)
    },
    content: /* @__PURE__ */ reactExports.createElement(Overlay, Object.assign({
      okType,
      icon
    }, props, {
      prefixCls,
      close,
      onConfirm,
      onCancel
    })),
    "data-popover-inject": true
  }), children));
});
const Popconfirm = InternalPopconfirm;
Popconfirm._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
export {
  ActionButton as A,
  Popconfirm as P,
  Space as S
};
//# sourceMappingURL=index-CpZl-a5U.js.map
