import { c$ as wrapperRaf, R as React, X as _toConsumableArray, co as reactExports, $ as classNames, Z as canUseDom, cW as useToken, cO as useLayoutEffect, I as Icon$1, H as _extends, d as ConfigContext, cz as toArray$3, cj as omit, a1 as cloneElement, cw as supportNodeRef, cL as useComposeRef, bY as getNodeRef, f as ContextIsolator, cC as unit, bA as genFocusOutline, cy as textEllipsis, bH as genStyleHooks, cg as merge, a0 as clearFix, cr as resetComponent, F as FastColor, cs as resetIcon, cY as useZIndex, cM as useEvent, cH as useCSSVarCls, c4 as initCollapseMotion, bB as genFocusStyle, ab as devUseWarning, cS as useMergedState, d0 as zIndexContext, a2 as commonjsGlobal, bN as getDefaultExportFromCjs, w as Trigger, G as _defineProperty, L as _objectSpread2, U as _slicedToArray, Y as _typeof, c_ as warningOnce, cP as useLayoutUpdateEffect, cb as isVisible, v as RefResizeObserver, cl as pickAttrs, M as _objectWithoutProperties, y as _createClass, x as _classCallCheck, a3 as composeRef, i as FormItemInputContext, D as DisabledContext, W as Wave, T as TARGET_CLS, cN as useId, cV as useSize, c5 as initComponentToken$1, bF as genOutlinedStyle, bJ as genUnderlinedStyle, bz as genFilledStyle, bv as genBorderlessStyle, c6 as initInputToken, bw as genCompactItemStyle, bG as genPlaceholderStyle, cK as useComponentConfig, a as Button$1, cJ as useCompactItemContext, cX as useVariant, cQ as useLocale$1, cd as locale$1, b$ as getStatusClassNames, bW as getMergedStatus, n as ReactDOM, K as KeyCode, bu as genBasicInputStyle, bt as genBaseOutlinedStyle, bx as genDisabledStyle, bD as genInputSmallStyle, bI as genSubStyleComponent, ce as locale$2, c8 as isEqual, cn as reactDomExports, cx as supportRef, cR as useMemo, bK as get, bs as fillRef, bM as getDOM, bZ as getScrollBarSize, c0 as getTargetScrollBarSize, b as CSSMotion, J as _inherits, z as _createSuper, _ as _assertThisInitialized, l as Keyframe, o as RefIcon$j, k as Input$1, p as RefIcon$k, ch as mergeProps, ck as operationUnit, cf as localeValues, e as ConfigProvider } from "./api-C3T_2YIP.js";
import { d as initSlideMotion, e as slideDownOut, h as slideUpOut, s as slideDownIn, f as slideUpIn, i as initMoveMotion, b as genPurePanel, F as ForwardOverflow, g as genOverflowStyle, c as getMultipleSelectorUnit, u as useIcons$1, S as Select, L as List, R as RefIcon$i, E as Empty, D as DefaultRenderEmpty, a as Spin } from "./index-DnCN3rVY.js";
import { T as Tooltip, i as initZoomMotion, c as getArrowStyle, b as getArrowOffsetToken, d as getArrowToken, e as getPlacements, a as genRoundedArrow } from "./index-DoebJELJ.js";
import { D as Divider, M as MenuItem$1, g as genCollapseMotion, u as useFullPath, S as SubMenu$1, E as ExportMenu, R as RefIcon$g, b as MenuItemGroup, a as Dropdown$2, c as RefIcon$h } from "./EllipsisOutlined-DVpo83LX.js";
import { S as Space } from "./index-DUJ6TIST.js";
function isWindow(obj) {
  return obj !== null && obj !== void 0 && obj === obj.window;
}
const getScroll = (target) => {
  var _a, _b;
  if (typeof window === "undefined") {
    return 0;
  }
  let result = 0;
  if (isWindow(target)) {
    result = target.pageYOffset;
  } else if (target instanceof Document) {
    result = target.documentElement.scrollTop;
  } else if (target instanceof HTMLElement) {
    result = target.scrollTop;
  } else if (target) {
    result = target["scrollTop"];
  }
  if (target && !isWindow(target) && typeof result !== "number") {
    result = (_b = ((_a = target.ownerDocument) !== null && _a !== void 0 ? _a : target).documentElement) === null || _b === void 0 ? void 0 : _b.scrollTop;
  }
  return result;
};
function easeInOutCubic(t, b, c, d) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }
  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}
function scrollTo(y, options = {}) {
  const {
    getContainer = () => window,
    callback,
    duration = 450
  } = options;
  const container = getContainer();
  const scrollTop = getScroll(container);
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
    if (isWindow(container)) {
      container.scrollTo(window.pageXOffset, nextScrollTop);
    } else if (container instanceof Document || container.constructor.name === "HTMLDocument") {
      container.documentElement.scrollTop = nextScrollTop;
    } else {
      container.scrollTop = nextScrollTop;
    }
    if (time < duration) {
      wrapperRaf(frameFunc);
    } else if (typeof callback === "function") {
      callback();
    }
  };
  wrapperRaf(frameFunc);
}
const useForceUpdate = () => {
  return React.useReducer((ori) => ori + 1, 0);
};
function mergeClassNames(schema, ...classNames$1) {
  const mergedSchema = schema || {};
  return classNames$1.reduce((acc, cur) => {
    Object.keys(cur || {}).forEach((key) => {
      const keySchema = mergedSchema[key];
      const curVal = cur[key];
      if (keySchema && typeof keySchema === "object") {
        if (curVal && typeof curVal === "object") {
          acc[key] = mergeClassNames(keySchema, acc[key], curVal);
        } else {
          const {
            _default: defaultField
          } = keySchema;
          if (defaultField) {
            acc[key] = acc[key] || {};
            acc[key][defaultField] = classNames(acc[key][defaultField], curVal);
          }
        }
      } else {
        acc[key] = classNames(acc[key], curVal);
      }
    });
    return acc;
  }, {});
}
function useSemanticClassNames(schema, ...classNames2) {
  return reactExports.useMemo(() => mergeClassNames.apply(void 0, [schema].concat(classNames2)), [classNames2, schema]);
}
function useSemanticStyles(...styles) {
  return reactExports.useMemo(() => {
    return styles.reduce((acc, cur = {}) => {
      Object.keys(cur).forEach((key) => {
        acc[key] = Object.assign(Object.assign({}, acc[key]), cur[key]);
      });
      return acc;
    }, {});
  }, [styles]);
}
function fillObjectBySchema(obj, schema) {
  const newObj = Object.assign({}, obj);
  Object.keys(schema).forEach((key) => {
    if (key !== "_default") {
      const nestSchema = schema[key];
      const nextValue = newObj[key] || {};
      newObj[key] = nestSchema ? fillObjectBySchema(nextValue, nestSchema) : nextValue;
    }
  });
  return newObj;
}
const useMergeSemantic = (classNamesList, stylesList, schema) => {
  const mergedClassNames = useSemanticClassNames.apply(void 0, [schema].concat(_toConsumableArray(classNamesList)));
  const mergedStyles = useSemanticStyles.apply(void 0, _toConsumableArray(stylesList));
  return reactExports.useMemo(() => {
    return [fillObjectBySchema(mergedClassNames, schema), fillObjectBySchema(mergedStyles, schema)];
  }, [mergedClassNames, mergedStyles, schema]);
};
const useMultipleSelect = (getKey2) => {
  const [prevSelectedIndex, setPrevSelectedIndex] = reactExports.useState(null);
  const multipleSelect = reactExports.useCallback((currentSelectedIndex, data, selectedKeys) => {
    const configPrevSelectedIndex = prevSelectedIndex !== null && prevSelectedIndex !== void 0 ? prevSelectedIndex : currentSelectedIndex;
    const startIndex = Math.min(configPrevSelectedIndex || 0, currentSelectedIndex);
    const endIndex = Math.max(configPrevSelectedIndex || 0, currentSelectedIndex);
    const rangeKeys = data.slice(startIndex, endIndex + 1).map(getKey2);
    const shouldSelected = rangeKeys.some((rangeKey) => !selectedKeys.has(rangeKey));
    const changedKeys = [];
    rangeKeys.forEach((item) => {
      if (shouldSelected) {
        if (!selectedKeys.has(item)) {
          changedKeys.push(item);
        }
        selectedKeys.add(item);
      } else {
        selectedKeys.delete(item);
        changedKeys.push(item);
      }
    });
    setPrevSelectedIndex(shouldSelected ? endIndex : null);
    return changedKeys;
  }, [prevSelectedIndex]);
  return [multipleSelect, setPrevSelectedIndex];
};
function fillProxy(element, handler) {
  element._antProxy = element._antProxy || {};
  Object.keys(handler).forEach((key) => {
    if (!(key in element._antProxy)) {
      const ori = element[key];
      element._antProxy[key] = ori;
      element[key] = handler[key];
    }
  });
  return element;
}
const useProxyImperativeHandle = (ref, init) => {
  return reactExports.useImperativeHandle(ref, () => {
    const refObj = init();
    const {
      nativeElement
    } = refObj;
    if (typeof Proxy !== "undefined") {
      return new Proxy(nativeElement, {
        get(obj, prop) {
          if (refObj[prop]) {
            return refObj[prop];
          }
          return Reflect.get(obj, prop);
        }
      });
    }
    return fillProxy(nativeElement, refObj);
  });
};
const useSyncState$1 = (initialValue) => {
  const ref = reactExports.useRef(initialValue);
  const [, forceUpdate] = useForceUpdate();
  return [() => ref.current, (newValue) => {
    ref.current = newValue;
    forceUpdate();
  }];
};
var isStyleNameSupport = function isStyleNameSupport2(styleName) {
  if (canUseDom() && window.document.documentElement) {
    var styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    var documentElement = window.document.documentElement;
    return styleNameList.some(function(name) {
      return name in documentElement.style;
    });
  }
  return false;
};
var isStyleValueSupport = function isStyleValueSupport2(styleName, value) {
  if (!isStyleNameSupport(styleName)) {
    return false;
  }
  var ele = document.createElement("div");
  var origin = ele.style[styleName];
  ele.style[styleName] = value;
  return ele.style[styleName] !== origin;
};
function isStyleSupport(styleName, styleValue) {
  if (!Array.isArray(styleName) && styleValue !== void 0) {
    return isStyleValueSupport(styleName, styleValue);
  }
  return isStyleNameSupport(styleName);
}
const addMediaQueryListener = (mql, handler) => {
  if (typeof (mql === null || mql === void 0 ? void 0 : mql.addEventListener) !== "undefined") {
    mql.addEventListener("change", handler);
  } else if (typeof (mql === null || mql === void 0 ? void 0 : mql.addListener) !== "undefined") {
    mql.addListener(handler);
  }
};
const removeMediaQueryListener = (mql, handler) => {
  if (typeof (mql === null || mql === void 0 ? void 0 : mql.removeEventListener) !== "undefined") {
    mql.removeEventListener("change", handler);
  } else if (typeof (mql === null || mql === void 0 ? void 0 : mql.removeListener) !== "undefined") {
    mql.removeListener(handler);
  }
};
const responsiveArray = ["xxl", "xl", "lg", "md", "sm", "xs"];
const getResponsiveMap = (token) => ({
  xs: `(max-width: ${token.screenXSMax}px)`,
  sm: `(min-width: ${token.screenSM}px)`,
  md: `(min-width: ${token.screenMD}px)`,
  lg: `(min-width: ${token.screenLG}px)`,
  xl: `(min-width: ${token.screenXL}px)`,
  xxl: `(min-width: ${token.screenXXL}px)`
});
const validateBreakpoints = (token) => {
  const indexableToken = token;
  const revBreakpoints = [].concat(responsiveArray).reverse();
  revBreakpoints.forEach((breakpoint, i) => {
    const breakpointUpper = breakpoint.toUpperCase();
    const screenMin = `screen${breakpointUpper}Min`;
    const screen = `screen${breakpointUpper}`;
    if (!(indexableToken[screenMin] <= indexableToken[screen])) {
      throw new Error(`${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`);
    }
    if (i < revBreakpoints.length - 1) {
      const screenMax = `screen${breakpointUpper}Max`;
      if (!(indexableToken[screen] <= indexableToken[screenMax])) {
        throw new Error(`${screen}<=${screenMax} fails : !(${indexableToken[screen]}<=${indexableToken[screenMax]})`);
      }
      const nextBreakpointUpperMin = revBreakpoints[i + 1].toUpperCase();
      const nextScreenMin = `screen${nextBreakpointUpperMin}Min`;
      if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) {
        throw new Error(`${screenMax}<=${nextScreenMin} fails : !(${indexableToken[screenMax]}<=${indexableToken[nextScreenMin]})`);
      }
    }
  });
  return token;
};
const useResponsiveObserver = () => {
  const [, token] = useToken();
  const responsiveMap = getResponsiveMap(validateBreakpoints(token));
  return React.useMemo(() => {
    const subscribers = /* @__PURE__ */ new Map();
    let subUid = -1;
    let screens = {};
    return {
      responsiveMap,
      matchHandlers: {},
      dispatch(pointMap) {
        screens = pointMap;
        subscribers.forEach((func) => func(screens));
        return subscribers.size >= 1;
      },
      subscribe(func) {
        if (!subscribers.size) {
          this.register();
        }
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
      },
      unsubscribe(paramToken) {
        subscribers.delete(paramToken);
        if (!subscribers.size) {
          this.unregister();
        }
      },
      register() {
        Object.entries(responsiveMap).forEach(([screen, mediaQuery]) => {
          const listener = ({
            matches
          }) => {
            this.dispatch(Object.assign(Object.assign({}, screens), {
              [screen]: matches
            }));
          };
          const mql = window.matchMedia(mediaQuery);
          addMediaQueryListener(mql, listener);
          this.matchHandlers[mediaQuery] = {
            mql,
            listener
          };
          listener(mql);
        });
      },
      unregister() {
        Object.values(responsiveMap).forEach((mediaQuery) => {
          const handler = this.matchHandlers[mediaQuery];
          removeMediaQueryListener(handler === null || handler === void 0 ? void 0 : handler.mql, handler === null || handler === void 0 ? void 0 : handler.listener);
        });
        subscribers.clear();
      }
    };
  }, [responsiveMap]);
};
function useBreakpoint(refreshOnChange = true, defaultScreens = {}) {
  const screensRef = reactExports.useRef(defaultScreens);
  const [, forceUpdate] = useForceUpdate();
  const responsiveObserver = useResponsiveObserver();
  useLayoutEffect(() => {
    const token = responsiveObserver.subscribe((supportScreens) => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });
    return () => responsiveObserver.unsubscribe(token);
  }, []);
  return screensRef.current;
}
var LeftOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" } }] }, "name": "left", "theme": "outlined" };
var LeftOutlined = function LeftOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: LeftOutlined$1
  }));
};
var RefIcon$f = /* @__PURE__ */ reactExports.forwardRef(LeftOutlined);
const isPrimitive = (value) => typeof value !== "object" && typeof value !== "function" || value === null;
const SiderContext = /* @__PURE__ */ reactExports.createContext({});
const MenuContext = /* @__PURE__ */ reactExports.createContext({
  prefixCls: "",
  firstLevel: true,
  inlineCollapsed: false
});
var __rest$c = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const MenuDivider = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    dashed
  } = props, restProps = __rest$c(props, ["prefixCls", "className", "dashed"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("menu", customizePrefixCls);
  const classString = classNames({
    [`${prefixCls}-item-divider-dashed`]: !!dashed
  }, className);
  return /* @__PURE__ */ reactExports.createElement(Divider, Object.assign({
    className: classString
  }, restProps));
};
const MenuItem = (props) => {
  var _a;
  const {
    className,
    children,
    icon,
    title,
    danger,
    extra
  } = props;
  const {
    prefixCls,
    firstLevel,
    direction,
    disableMenuItemTitleTooltip,
    inlineCollapsed: isInlineCollapsed
  } = reactExports.useContext(MenuContext);
  const renderItemChildren = (inlineCollapsed) => {
    const label = children === null || children === void 0 ? void 0 : children[0];
    const wrapNode = /* @__PURE__ */ reactExports.createElement("span", {
      className: classNames(`${prefixCls}-title-content`, {
        [`${prefixCls}-title-content-with-extra`]: !!extra || extra === 0
      })
    }, children);
    if (!icon || /* @__PURE__ */ reactExports.isValidElement(children) && children.type === "span") {
      if (children && inlineCollapsed && firstLevel && typeof label === "string") {
        return /* @__PURE__ */ reactExports.createElement("div", {
          className: `${prefixCls}-inline-collapsed-noicon`
        }, label.charAt(0));
      }
    }
    return wrapNode;
  };
  const {
    siderCollapsed
  } = reactExports.useContext(SiderContext);
  let tooltipTitle = title;
  if (typeof title === "undefined") {
    tooltipTitle = firstLevel ? children : "";
  } else if (title === false) {
    tooltipTitle = "";
  }
  const tooltipProps = {
    title: tooltipTitle
  };
  if (!siderCollapsed && !isInlineCollapsed) {
    tooltipProps.title = null;
    tooltipProps.open = false;
  }
  const childrenLength = toArray$3(children).length;
  let returnNode = /* @__PURE__ */ reactExports.createElement(MenuItem$1, Object.assign({}, omit(props, ["title", "icon", "danger"]), {
    className: classNames({
      [`${prefixCls}-item-danger`]: danger,
      [`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1
    }, className),
    title: typeof title === "string" ? title : void 0
  }), cloneElement(icon, {
    className: classNames(/* @__PURE__ */ reactExports.isValidElement(icon) ? (_a = icon.props) === null || _a === void 0 ? void 0 : _a.className : void 0, `${prefixCls}-item-icon`)
  }), renderItemChildren(isInlineCollapsed));
  if (!disableMenuItemTitleTooltip) {
    returnNode = /* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({}, tooltipProps, {
      placement: direction === "rtl" ? "left" : "right",
      classNames: {
        root: `${prefixCls}-inline-collapsed-tooltip`
      }
    }), returnNode);
  }
  return returnNode;
};
var __rest$b = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const OverrideContext = /* @__PURE__ */ reactExports.createContext(null);
const OverrideProvider = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    children
  } = props, restProps = __rest$b(props, ["children"]);
  const override = reactExports.useContext(OverrideContext);
  const context = reactExports.useMemo(() => Object.assign(Object.assign({}, override), restProps), [
    override,
    restProps.prefixCls,
    // restProps.expandIcon, Not mark as deps since this is a ReactNode
    restProps.mode,
    restProps.selectable,
    restProps.rootClassName
    // restProps.validator, Not mark as deps since this is a function
  ]);
  const canRef = supportNodeRef(children);
  const mergedRef = useComposeRef(ref, canRef ? getNodeRef(children) : null);
  return /* @__PURE__ */ reactExports.createElement(OverrideContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement(ContextIsolator, {
    space: true
  }, canRef ? /* @__PURE__ */ reactExports.cloneElement(children, {
    ref: mergedRef
  }) : children));
});
const getHorizontalStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    horizontalLineHeight,
    colorSplit,
    lineWidth,
    lineType,
    itemPaddingInline
  } = token;
  return {
    [`${componentCls}-horizontal`]: {
      lineHeight: horizontalLineHeight,
      border: 0,
      borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      boxShadow: "none",
      "&::after": {
        display: "block",
        clear: "both",
        height: 0,
        content: '"\\20"'
      },
      // ======================= Item =======================
      [`${componentCls}-item, ${componentCls}-submenu`]: {
        position: "relative",
        display: "inline-block",
        verticalAlign: "bottom",
        paddingInline: itemPaddingInline
      },
      [`> ${componentCls}-item:hover,
        > ${componentCls}-item-active,
        > ${componentCls}-submenu ${componentCls}-submenu-title:hover`]: {
        backgroundColor: "transparent"
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`].join(",")
      },
      // ===================== Sub Menu =====================
      [`${componentCls}-submenu-arrow`]: {
        display: "none"
      }
    }
  };
};
const getRTLStyle = ({
  componentCls,
  menuArrowOffset,
  calc
}) => ({
  [`${componentCls}-rtl`]: {
    direction: "rtl"
  },
  [`${componentCls}-submenu-rtl`]: {
    transformOrigin: "100% 0"
  },
  // Vertical Arrow
  [`${componentCls}-rtl${componentCls}-vertical,
    ${componentCls}-submenu-rtl ${componentCls}-vertical`]: {
    [`${componentCls}-submenu-arrow`]: {
      "&::before": {
        transform: `rotate(-45deg) translateY(${unit(calc(menuArrowOffset).mul(-1).equal())})`
      },
      "&::after": {
        transform: `rotate(45deg) translateY(${unit(menuArrowOffset)})`
      }
    }
  }
});
const accessibilityFocus = (token) => genFocusOutline(token);
const getThemeStyle = (token, themeSuffix) => {
  const {
    componentCls,
    itemColor,
    itemSelectedColor,
    subMenuItemSelectedColor,
    groupTitleColor,
    itemBg,
    subMenuItemBg,
    itemSelectedBg,
    activeBarHeight,
    activeBarWidth,
    activeBarBorderWidth,
    motionDurationSlow,
    motionEaseInOut,
    motionEaseOut,
    itemPaddingInline,
    motionDurationMid,
    itemHoverColor,
    lineType,
    colorSplit,
    // Disabled
    itemDisabledColor,
    // Danger
    dangerItemColor,
    dangerItemHoverColor,
    dangerItemSelectedColor,
    dangerItemActiveBg,
    dangerItemSelectedBg,
    // Bg
    popupBg,
    itemHoverBg,
    itemActiveBg,
    menuSubMenuBg,
    // Horizontal
    horizontalItemSelectedColor,
    horizontalItemSelectedBg,
    horizontalItemBorderRadius,
    horizontalItemHoverBg
  } = token;
  return {
    [`${componentCls}-${themeSuffix}, ${componentCls}-${themeSuffix} > ${componentCls}`]: {
      color: itemColor,
      background: itemBg,
      [`&${componentCls}-root:focus-visible`]: Object.assign({}, accessibilityFocus(token)),
      // ======================== Item ========================
      [`${componentCls}-item`]: {
        "&-group-title, &-extra": {
          color: groupTitleColor
        }
      },
      [`${componentCls}-submenu-selected > ${componentCls}-submenu-title`]: {
        color: subMenuItemSelectedColor
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        color: itemColor,
        [`&:not(${componentCls}-item-disabled):focus-visible`]: Object.assign({}, accessibilityFocus(token))
      },
      // Disabled
      [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
        color: `${itemDisabledColor} !important`
      },
      // Hover
      [`${componentCls}-item:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
        [`&:hover, > ${componentCls}-submenu-title:hover`]: {
          color: itemHoverColor
        }
      },
      [`&:not(${componentCls}-horizontal)`]: {
        [`${componentCls}-item:not(${componentCls}-item-selected)`]: {
          "&:hover": {
            backgroundColor: itemHoverBg
          },
          "&:active": {
            backgroundColor: itemActiveBg
          }
        },
        [`${componentCls}-submenu-title`]: {
          "&:hover": {
            backgroundColor: itemHoverBg
          },
          "&:active": {
            backgroundColor: itemActiveBg
          }
        }
      },
      // Danger - only Item has
      [`${componentCls}-item-danger`]: {
        color: dangerItemColor,
        [`&${componentCls}-item:hover`]: {
          [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
            color: dangerItemHoverColor
          }
        },
        [`&${componentCls}-item:active`]: {
          background: dangerItemActiveBg
        }
      },
      [`${componentCls}-item a`]: {
        "&, &:hover": {
          color: "inherit"
        }
      },
      [`${componentCls}-item-selected`]: {
        color: itemSelectedColor,
        // Danger
        [`&${componentCls}-item-danger`]: {
          color: dangerItemSelectedColor
        },
        "a, a:hover": {
          color: "inherit"
        }
      },
      [`& ${componentCls}-item-selected`]: {
        backgroundColor: itemSelectedBg,
        // Danger
        [`&${componentCls}-item-danger`]: {
          backgroundColor: dangerItemSelectedBg
        }
      },
      [`&${componentCls}-submenu > ${componentCls}`]: {
        backgroundColor: menuSubMenuBg
      },
      // ===== 设置浮层的颜色 =======
      // ！dark 模式会被popupBg 会被rest 为 darkPopupBg
      [`&${componentCls}-popup > ${componentCls}`]: {
        backgroundColor: popupBg
      },
      [`&${componentCls}-submenu-popup > ${componentCls}`]: {
        backgroundColor: popupBg
      },
      // ===== 设置浮层的颜色 end =======
      // ====================== Horizontal ======================
      [`&${componentCls}-horizontal`]: Object.assign(Object.assign({}, themeSuffix === "dark" ? {
        borderBottom: 0
      } : {}), {
        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: activeBarBorderWidth,
          marginTop: token.calc(activeBarBorderWidth).mul(-1).equal(),
          marginBottom: 0,
          borderRadius: horizontalItemBorderRadius,
          "&::after": {
            position: "absolute",
            insetInline: itemPaddingInline,
            bottom: 0,
            borderBottom: `${unit(activeBarHeight)} solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""'
          },
          "&:hover, &-active, &-open": {
            background: horizontalItemHoverBg,
            "&::after": {
              borderBottomWidth: activeBarHeight,
              borderBottomColor: horizontalItemSelectedColor
            }
          },
          "&-selected": {
            color: horizontalItemSelectedColor,
            backgroundColor: horizontalItemSelectedBg,
            "&:hover": {
              backgroundColor: horizontalItemSelectedBg
            },
            "&::after": {
              borderBottomWidth: activeBarHeight,
              borderBottomColor: horizontalItemSelectedColor
            }
          }
        }
      }),
      // ================== Inline & Vertical ===================
      //
      [`&${componentCls}-root`]: {
        [`&${componentCls}-inline, &${componentCls}-vertical`]: {
          borderInlineEnd: `${unit(activeBarBorderWidth)} ${lineType} ${colorSplit}`
        }
      },
      // ======================== Inline ========================
      [`&${componentCls}-inline`]: {
        // Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          background: subMenuItemBg
        },
        [`${componentCls}-item`]: {
          position: "relative",
          "&::after": {
            position: "absolute",
            insetBlock: 0,
            insetInlineEnd: 0,
            borderInlineEnd: `${unit(activeBarWidth)} solid ${itemSelectedColor}`,
            transform: "scaleY(0.0001)",
            opacity: 0,
            transition: [`transform ${motionDurationMid} ${motionEaseOut}`, `opacity ${motionDurationMid} ${motionEaseOut}`].join(","),
            content: '""'
          },
          // Danger
          [`&${componentCls}-item-danger`]: {
            "&::after": {
              borderInlineEndColor: dangerItemSelectedColor
            }
          }
        },
        [`${componentCls}-selected, ${componentCls}-item-selected`]: {
          "&::after": {
            transform: "scaleY(1)",
            opacity: 1,
            transition: [`transform ${motionDurationMid} ${motionEaseInOut}`, `opacity ${motionDurationMid} ${motionEaseInOut}`].join(",")
          }
        }
      }
    }
  };
};
const getVerticalInlineStyle = (token) => {
  const {
    componentCls,
    itemHeight,
    itemMarginInline,
    padding,
    menuArrowSize,
    marginXS,
    itemMarginBlock,
    itemWidth,
    itemPaddingInline
  } = token;
  const paddingWithArrow = token.calc(menuArrowSize).add(padding).add(marginXS).equal();
  return {
    [`${componentCls}-item`]: {
      position: "relative",
      overflow: "hidden"
    },
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      height: itemHeight,
      lineHeight: unit(itemHeight),
      paddingInline: itemPaddingInline,
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginInline: itemMarginInline,
      marginBlock: itemMarginBlock,
      width: itemWidth
    },
    [`> ${componentCls}-item,
            > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
      height: itemHeight,
      lineHeight: unit(itemHeight)
    },
    [`${componentCls}-item-group-list ${componentCls}-submenu-title,
            ${componentCls}-submenu-title`]: {
      paddingInlineEnd: paddingWithArrow
    }
  };
};
const getVerticalStyle = (token) => {
  const {
    componentCls,
    iconCls,
    itemHeight,
    colorTextLightSolid,
    dropdownWidth,
    controlHeightLG,
    motionEaseOut,
    paddingXL,
    itemMarginInline,
    fontSizeLG,
    motionDurationFast,
    motionDurationSlow,
    paddingXS,
    boxShadowSecondary,
    collapsedWidth,
    collapsedIconSize
  } = token;
  const inlineItemStyle = {
    height: itemHeight,
    lineHeight: unit(itemHeight),
    listStylePosition: "inside",
    listStyleType: "disc"
  };
  return [
    {
      [componentCls]: {
        "&-inline, &-vertical": Object.assign({
          [`&${componentCls}-root`]: {
            boxShadow: "none"
          }
        }, getVerticalInlineStyle(token))
      },
      [`${componentCls}-submenu-popup`]: {
        [`${componentCls}-vertical`]: Object.assign(Object.assign({}, getVerticalInlineStyle(token)), {
          boxShadow: boxShadowSecondary
        })
      }
    },
    // Vertical only
    {
      [`${componentCls}-submenu-popup ${componentCls}-vertical${componentCls}-sub`]: {
        minWidth: dropdownWidth,
        maxHeight: `calc(100vh - ${unit(token.calc(controlHeightLG).mul(2.5).equal())})`,
        padding: "0",
        overflow: "hidden",
        borderInlineEnd: 0,
        // https://github.com/ant-design/ant-design/issues/22244
        // https://github.com/ant-design/ant-design/issues/26812
        "&:not([class*='-active'])": {
          overflowX: "hidden",
          overflowY: "auto"
        }
      }
    },
    // Inline Only
    {
      [`${componentCls}-inline`]: {
        width: "100%",
        // Motion enhance for first level
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu-title`]: {
            display: "flex",
            alignItems: "center",
            transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`, `padding ${motionDurationFast} ${motionEaseOut}`].join(","),
            [`> ${componentCls}-title-content`]: {
              flex: "auto",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            "> *": {
              flex: "none"
            }
          }
        },
        // >>>>> Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          padding: 0,
          border: 0,
          borderRadius: 0,
          boxShadow: "none",
          [`& > ${componentCls}-submenu > ${componentCls}-submenu-title`]: inlineItemStyle,
          [`& ${componentCls}-item-group-title`]: {
            paddingInlineStart: paddingXL
          }
        },
        // >>>>> Item
        [`${componentCls}-item`]: inlineItemStyle
      }
    },
    // Inline Collapse Only
    {
      [`${componentCls}-inline-collapsed`]: {
        width: collapsedWidth,
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu ${componentCls}-submenu-title`]: {
            [`> ${componentCls}-inline-collapsed-noicon`]: {
              fontSize: fontSizeLG,
              textAlign: "center"
            }
          }
        },
        [`> ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-submenu > ${componentCls}-submenu-title,
          > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
          insetInlineStart: 0,
          paddingInline: `calc(50% - ${unit(token.calc(collapsedIconSize).div(2).equal())} - ${unit(itemMarginInline)})`,
          textOverflow: "clip",
          [`
            ${componentCls}-submenu-arrow,
            ${componentCls}-submenu-expand-icon
          `]: {
            opacity: 0
          },
          [`${componentCls}-item-icon, ${iconCls}`]: {
            margin: 0,
            fontSize: collapsedIconSize,
            lineHeight: unit(itemHeight),
            "+ span": {
              display: "inline-block",
              opacity: 0
            }
          }
        },
        [`${componentCls}-item-icon, ${iconCls}`]: {
          display: "inline-block"
        },
        "&-tooltip": {
          pointerEvents: "none",
          [`${componentCls}-item-icon, ${iconCls}`]: {
            display: "none"
          },
          "a, a:hover": {
            color: colorTextLightSolid
          }
        },
        [`${componentCls}-item-group-title`]: Object.assign(Object.assign({}, textEllipsis), {
          paddingInline: paddingXS
        })
      }
    }
  ];
};
const genMenuItemStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    motionEaseOut,
    iconCls,
    iconSize,
    iconMarginInlineEnd
  } = token;
  return {
    // >>>>> Item
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      position: "relative",
      display: "block",
      margin: 0,
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`, `padding calc(${motionDurationSlow} + 0.1s) ${motionEaseInOut}`].join(","),
      [`${componentCls}-item-icon, ${iconCls}`]: {
        minWidth: iconSize,
        fontSize: iconSize,
        transition: [`font-size ${motionDurationMid} ${motionEaseOut}`, `margin ${motionDurationSlow} ${motionEaseInOut}`, `color ${motionDurationSlow}`].join(","),
        "+ span": {
          marginInlineStart: iconMarginInlineEnd,
          opacity: 1,
          transition: [`opacity ${motionDurationSlow} ${motionEaseInOut}`, `margin ${motionDurationSlow}`, `color ${motionDurationSlow}`].join(",")
        }
      },
      [`${componentCls}-item-icon`]: Object.assign({}, resetIcon()),
      [`&${componentCls}-item-only-child`]: {
        [`> ${iconCls}, > ${componentCls}-item-icon`]: {
          marginInlineEnd: 0
        }
      }
    },
    // Disabled state sets text to gray and nukes hover/tab effects
    [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
      background: "none !important",
      cursor: "not-allowed",
      "&::after": {
        borderColor: "transparent !important"
      },
      a: {
        color: "inherit !important",
        cursor: "not-allowed",
        pointerEvents: "none"
      },
      [`> ${componentCls}-submenu-title`]: {
        color: "inherit !important",
        cursor: "not-allowed"
      }
    }
  };
};
const genSubMenuArrowStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    motionEaseInOut,
    borderRadius,
    menuArrowSize,
    menuArrowOffset
  } = token;
  return {
    [`${componentCls}-submenu`]: {
      "&-expand-icon, &-arrow": {
        position: "absolute",
        top: "50%",
        insetInlineEnd: token.margin,
        width: menuArrowSize,
        color: "currentcolor",
        transform: "translateY(-50%)",
        transition: `transform ${motionDurationSlow} ${motionEaseInOut}, opacity ${motionDurationSlow}`
      },
      "&-arrow": {
        // →
        "&::before, &::after": {
          position: "absolute",
          width: token.calc(menuArrowSize).mul(0.6).equal(),
          height: token.calc(menuArrowSize).mul(0.15).equal(),
          backgroundColor: "currentcolor",
          borderRadius,
          transition: [`background ${motionDurationSlow} ${motionEaseInOut}`, `transform ${motionDurationSlow} ${motionEaseInOut}`, `top ${motionDurationSlow} ${motionEaseInOut}`, `color ${motionDurationSlow} ${motionEaseInOut}`].join(","),
          content: '""'
        },
        "&::before": {
          transform: `rotate(45deg) translateY(${unit(token.calc(menuArrowOffset).mul(-1).equal())})`
        },
        "&::after": {
          transform: `rotate(-45deg) translateY(${unit(menuArrowOffset)})`
        }
      }
    }
  };
};
const getBaseStyle = (token) => {
  const {
    antCls,
    componentCls,
    fontSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    paddingXS,
    padding,
    colorSplit,
    lineWidth,
    zIndexPopup,
    borderRadiusLG,
    subMenuItemBorderRadius,
    menuArrowSize,
    menuArrowOffset,
    lineType,
    groupTitleLineHeight,
    groupTitleFontSize
  } = token;
  return [
    // Misc
    {
      "": {
        [componentCls]: Object.assign(Object.assign({}, clearFix()), {
          // Hidden
          "&-hidden": {
            display: "none"
          }
        })
      },
      [`${componentCls}-submenu-hidden`]: {
        display: "none"
      }
    },
    {
      [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), clearFix()), {
        marginBottom: 0,
        paddingInlineStart: 0,
        // Override default ul/ol
        fontSize,
        lineHeight: 0,
        listStyle: "none",
        outline: "none",
        // Magic cubic here but smooth transition
        transition: `width ${motionDurationSlow} cubic-bezier(0.2, 0, 0, 1) 0s`,
        "ul, ol": {
          margin: 0,
          padding: 0,
          listStyle: "none"
        },
        // Overflow ellipsis
        "&-overflow": {
          display: "flex",
          [`${componentCls}-item`]: {
            flex: "none"
          }
        },
        [`${componentCls}-item, ${componentCls}-submenu, ${componentCls}-submenu-title`]: {
          borderRadius: token.itemBorderRadius
        },
        [`${componentCls}-item-group-title`]: {
          padding: `${unit(paddingXS)} ${unit(padding)}`,
          fontSize: groupTitleFontSize,
          lineHeight: groupTitleLineHeight,
          transition: `all ${motionDurationSlow}`
        },
        [`&-horizontal ${componentCls}-submenu`]: {
          transition: [`border-color ${motionDurationSlow} ${motionEaseInOut}`, `background ${motionDurationSlow} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-submenu, ${componentCls}-submenu-inline`]: {
          transition: [`border-color ${motionDurationSlow} ${motionEaseInOut}`, `background ${motionDurationSlow} ${motionEaseInOut}`, `padding ${motionDurationMid} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-submenu ${componentCls}-sub`]: {
          cursor: "initial",
          transition: [`background ${motionDurationSlow} ${motionEaseInOut}`, `padding ${motionDurationSlow} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-title-content`]: {
          transition: `color ${motionDurationSlow}`,
          "&-with-extra": {
            display: "inline-flex",
            alignItems: "center",
            width: "100%"
          },
          // https://github.com/ant-design/ant-design/issues/41143
          [`> ${antCls}-typography-ellipsis-single-line`]: {
            display: "inline",
            verticalAlign: "unset"
          },
          [`${componentCls}-item-extra`]: {
            marginInlineStart: "auto",
            paddingInlineStart: token.padding
          }
        },
        [`${componentCls}-item a`]: {
          "&::before": {
            position: "absolute",
            inset: 0,
            backgroundColor: "transparent",
            content: '""'
          }
        },
        // Removed a Badge related style seems it's safe
        // https://github.com/ant-design/ant-design/issues/19809
        // >>>>> Divider
        [`${componentCls}-item-divider`]: {
          overflow: "hidden",
          lineHeight: 0,
          borderColor: colorSplit,
          borderStyle: lineType,
          borderWidth: 0,
          borderTopWidth: lineWidth,
          marginBlock: lineWidth,
          padding: 0,
          "&-dashed": {
            borderStyle: "dashed"
          }
        }
      }), genMenuItemStyle(token)), {
        [`${componentCls}-item-group`]: {
          [`${componentCls}-item-group-list`]: {
            margin: 0,
            padding: 0,
            [`${componentCls}-item, ${componentCls}-submenu-title`]: {
              paddingInline: `${unit(token.calc(fontSize).mul(2).equal())} ${unit(padding)}`
            }
          }
        },
        // ======================= Sub Menu =======================
        "&-submenu": {
          "&-popup": {
            position: "absolute",
            zIndex: zIndexPopup,
            borderRadius: borderRadiusLG,
            boxShadow: "none",
            transformOrigin: "0 0",
            [`&${componentCls}-submenu`]: {
              background: "transparent"
            },
            // https://github.com/ant-design/ant-design/issues/13955
            "&::before": {
              position: "absolute",
              inset: 0,
              zIndex: -1,
              width: "100%",
              height: "100%",
              opacity: 0,
              content: '""'
            },
            [`> ${componentCls}`]: Object.assign(Object.assign(Object.assign({
              borderRadius: borderRadiusLG
            }, genMenuItemStyle(token)), genSubMenuArrowStyle(token)), {
              [`${componentCls}-item, ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
                borderRadius: subMenuItemBorderRadius
              },
              [`${componentCls}-submenu-title::after`]: {
                transition: `transform ${motionDurationSlow} ${motionEaseInOut}`
              }
            })
          },
          [`
          &-placement-leftTop,
          &-placement-bottomRight,
          `]: {
            transformOrigin: "100% 0"
          },
          [`
          &-placement-leftBottom,
          &-placement-topRight,
          `]: {
            transformOrigin: "100% 100%"
          },
          [`
          &-placement-rightBottom,
          &-placement-topLeft,
          `]: {
            transformOrigin: "0 100%"
          },
          [`
          &-placement-bottomLeft,
          &-placement-rightTop,
          `]: {
            transformOrigin: "0 0"
          },
          [`
          &-placement-leftTop,
          &-placement-leftBottom
          `]: {
            paddingInlineEnd: token.paddingXS
          },
          [`
          &-placement-rightTop,
          &-placement-rightBottom
          `]: {
            paddingInlineStart: token.paddingXS
          },
          [`
          &-placement-topRight,
          &-placement-topLeft
          `]: {
            paddingBottom: token.paddingXS
          },
          [`
          &-placement-bottomRight,
          &-placement-bottomLeft
          `]: {
            paddingTop: token.paddingXS
          }
        }
      }), genSubMenuArrowStyle(token)), {
        [`&-inline-collapsed ${componentCls}-submenu-arrow,
        &-inline ${componentCls}-submenu-arrow`]: {
          // ↓
          "&::before": {
            transform: `rotate(-45deg) translateX(${unit(menuArrowOffset)})`
          },
          "&::after": {
            transform: `rotate(45deg) translateX(${unit(token.calc(menuArrowOffset).mul(-1).equal())})`
          }
        },
        [`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]: {
          // ↑
          transform: `translateY(${unit(token.calc(menuArrowSize).mul(0.2).mul(-1).equal())})`,
          "&::after": {
            transform: `rotate(-45deg) translateX(${unit(token.calc(menuArrowOffset).mul(-1).equal())})`
          },
          "&::before": {
            transform: `rotate(45deg) translateX(${unit(menuArrowOffset)})`
          }
        }
      })
    },
    // Integration with header element so menu items have the same height
    {
      [`${antCls}-layout-header`]: {
        [componentCls]: {
          lineHeight: "inherit"
        }
      }
    }
  ];
};
const prepareComponentToken$6 = (token) => {
  var _a, _b, _c;
  const {
    colorPrimary,
    colorError,
    colorTextDisabled,
    colorErrorBg,
    colorText,
    colorTextDescription,
    colorBgContainer,
    colorFillAlter,
    colorFillContent,
    lineWidth,
    lineWidthBold,
    controlItemBgActive,
    colorBgTextHover,
    controlHeightLG,
    lineHeight,
    colorBgElevated,
    marginXXS,
    padding,
    fontSize,
    controlHeightSM,
    fontSizeLG,
    colorTextLightSolid,
    colorErrorHover
  } = token;
  const activeBarWidth = (_a = token.activeBarWidth) !== null && _a !== void 0 ? _a : 0;
  const activeBarBorderWidth = (_b = token.activeBarBorderWidth) !== null && _b !== void 0 ? _b : lineWidth;
  const itemMarginInline = (_c = token.itemMarginInline) !== null && _c !== void 0 ? _c : token.marginXXS;
  const colorTextDark = new FastColor(colorTextLightSolid).setA(0.65).toRgbString();
  return {
    dropdownWidth: 160,
    zIndexPopup: token.zIndexPopupBase + 50,
    radiusItem: token.borderRadiusLG,
    itemBorderRadius: token.borderRadiusLG,
    radiusSubMenuItem: token.borderRadiusSM,
    subMenuItemBorderRadius: token.borderRadiusSM,
    colorItemText: colorText,
    itemColor: colorText,
    colorItemTextHover: colorText,
    itemHoverColor: colorText,
    colorItemTextHoverHorizontal: colorPrimary,
    horizontalItemHoverColor: colorPrimary,
    colorGroupTitle: colorTextDescription,
    groupTitleColor: colorTextDescription,
    colorItemTextSelected: colorPrimary,
    itemSelectedColor: colorPrimary,
    subMenuItemSelectedColor: colorPrimary,
    colorItemTextSelectedHorizontal: colorPrimary,
    horizontalItemSelectedColor: colorPrimary,
    colorItemBg: colorBgContainer,
    itemBg: colorBgContainer,
    colorItemBgHover: colorBgTextHover,
    itemHoverBg: colorBgTextHover,
    colorItemBgActive: colorFillContent,
    itemActiveBg: controlItemBgActive,
    colorSubItemBg: colorFillAlter,
    subMenuItemBg: colorFillAlter,
    colorItemBgSelected: controlItemBgActive,
    itemSelectedBg: controlItemBgActive,
    colorItemBgSelectedHorizontal: "transparent",
    horizontalItemSelectedBg: "transparent",
    colorActiveBarWidth: 0,
    activeBarWidth,
    colorActiveBarHeight: lineWidthBold,
    activeBarHeight: lineWidthBold,
    colorActiveBarBorderSize: lineWidth,
    activeBarBorderWidth,
    // Disabled
    colorItemTextDisabled: colorTextDisabled,
    itemDisabledColor: colorTextDisabled,
    // Danger
    colorDangerItemText: colorError,
    dangerItemColor: colorError,
    colorDangerItemTextHover: colorError,
    dangerItemHoverColor: colorError,
    colorDangerItemTextSelected: colorError,
    dangerItemSelectedColor: colorError,
    colorDangerItemBgActive: colorErrorBg,
    dangerItemActiveBg: colorErrorBg,
    colorDangerItemBgSelected: colorErrorBg,
    dangerItemSelectedBg: colorErrorBg,
    itemMarginInline,
    horizontalItemBorderRadius: 0,
    horizontalItemHoverBg: "transparent",
    itemHeight: controlHeightLG,
    groupTitleLineHeight: lineHeight,
    collapsedWidth: controlHeightLG * 2,
    popupBg: colorBgElevated,
    itemMarginBlock: marginXXS,
    itemPaddingInline: padding,
    horizontalLineHeight: `${controlHeightLG * 1.15}px`,
    iconSize: fontSize,
    iconMarginInlineEnd: controlHeightSM - fontSize,
    collapsedIconSize: fontSizeLG,
    groupTitleFontSize: fontSize,
    // Disabled
    darkItemDisabledColor: new FastColor(colorTextLightSolid).setA(0.25).toRgbString(),
    // Dark
    darkItemColor: colorTextDark,
    darkDangerItemColor: colorError,
    darkItemBg: "#001529",
    darkPopupBg: "#001529",
    darkSubMenuItemBg: "#000c17",
    darkItemSelectedColor: colorTextLightSolid,
    darkItemSelectedBg: colorPrimary,
    darkDangerItemSelectedBg: colorError,
    darkItemHoverBg: "transparent",
    darkGroupTitleColor: colorTextDark,
    darkItemHoverColor: colorTextLightSolid,
    darkDangerItemHoverColor: colorErrorHover,
    darkDangerItemSelectedColor: colorTextLightSolid,
    darkDangerItemActiveBg: colorError,
    // internal
    itemWidth: activeBarWidth ? `calc(100% + ${activeBarBorderWidth}px)` : `calc(100% - ${itemMarginInline * 2}px)`
  };
};
const useStyle$7 = (prefixCls, rootCls = prefixCls, injectStyle = true) => {
  const useStyle2 = genStyleHooks("Menu", (token) => {
    const {
      colorBgElevated,
      controlHeightLG,
      fontSize,
      darkItemColor,
      darkDangerItemColor,
      darkItemBg,
      darkSubMenuItemBg,
      darkItemSelectedColor,
      darkItemSelectedBg,
      darkDangerItemSelectedBg,
      darkItemHoverBg,
      darkGroupTitleColor,
      darkItemHoverColor,
      darkItemDisabledColor,
      darkDangerItemHoverColor,
      darkDangerItemSelectedColor,
      darkDangerItemActiveBg,
      popupBg,
      darkPopupBg
    } = token;
    const menuArrowSize = token.calc(fontSize).div(7).mul(5).equal();
    const menuToken = merge(token, {
      menuArrowSize,
      menuHorizontalHeight: token.calc(controlHeightLG).mul(1.15).equal(),
      menuArrowOffset: token.calc(menuArrowSize).mul(0.25).equal(),
      menuSubMenuBg: colorBgElevated,
      calc: token.calc,
      popupBg
    });
    const menuDarkToken = merge(menuToken, {
      itemColor: darkItemColor,
      itemHoverColor: darkItemHoverColor,
      groupTitleColor: darkGroupTitleColor,
      itemSelectedColor: darkItemSelectedColor,
      subMenuItemSelectedColor: darkItemSelectedColor,
      itemBg: darkItemBg,
      popupBg: darkPopupBg,
      subMenuItemBg: darkSubMenuItemBg,
      itemActiveBg: "transparent",
      itemSelectedBg: darkItemSelectedBg,
      activeBarHeight: 0,
      activeBarBorderWidth: 0,
      itemHoverBg: darkItemHoverBg,
      // Disabled
      itemDisabledColor: darkItemDisabledColor,
      // Danger
      dangerItemColor: darkDangerItemColor,
      dangerItemHoverColor: darkDangerItemHoverColor,
      dangerItemSelectedColor: darkDangerItemSelectedColor,
      dangerItemActiveBg: darkDangerItemActiveBg,
      dangerItemSelectedBg: darkDangerItemSelectedBg,
      menuSubMenuBg: darkSubMenuItemBg,
      // Horizontal
      horizontalItemSelectedColor: darkItemSelectedColor,
      horizontalItemSelectedBg: darkItemSelectedBg
    });
    return [
      // Basic
      getBaseStyle(menuToken),
      // Horizontal
      getHorizontalStyle(menuToken),
      // Hard code for some light style
      // Vertical
      getVerticalStyle(menuToken),
      // Hard code for some light style
      // Theme
      getThemeStyle(menuToken, "light"),
      getThemeStyle(menuDarkToken, "dark"),
      // RTL
      getRTLStyle(menuToken),
      // Motion
      genCollapseMotion(menuToken),
      initSlideMotion(menuToken, "slide-up"),
      initSlideMotion(menuToken, "slide-down"),
      initZoomMotion(menuToken, "zoom-big")
    ];
  }, prepareComponentToken$6, {
    deprecatedTokens: [["colorGroupTitle", "groupTitleColor"], ["radiusItem", "itemBorderRadius"], ["radiusSubMenuItem", "subMenuItemBorderRadius"], ["colorItemText", "itemColor"], ["colorItemTextHover", "itemHoverColor"], ["colorItemTextHoverHorizontal", "horizontalItemHoverColor"], ["colorItemTextSelected", "itemSelectedColor"], ["colorItemTextSelectedHorizontal", "horizontalItemSelectedColor"], ["colorItemTextDisabled", "itemDisabledColor"], ["colorDangerItemText", "dangerItemColor"], ["colorDangerItemTextHover", "dangerItemHoverColor"], ["colorDangerItemTextSelected", "dangerItemSelectedColor"], ["colorDangerItemBgActive", "dangerItemActiveBg"], ["colorDangerItemBgSelected", "dangerItemSelectedBg"], ["colorItemBg", "itemBg"], ["colorItemBgHover", "itemHoverBg"], ["colorSubItemBg", "subMenuItemBg"], ["colorItemBgActive", "itemActiveBg"], ["colorItemBgSelectedHorizontal", "horizontalItemSelectedBg"], ["colorActiveBarWidth", "activeBarWidth"], ["colorActiveBarHeight", "activeBarHeight"], ["colorActiveBarBorderSize", "activeBarBorderWidth"], ["colorItemBgSelected", "itemSelectedBg"]],
    // Dropdown will handle menu style self. We do not need to handle this.
    injectStyle,
    unitless: {
      groupTitleLineHeight: true
    }
  });
  return useStyle2(prefixCls, rootCls);
};
const SubMenu = (props) => {
  var _a;
  const {
    popupClassName,
    icon,
    title,
    theme: customTheme
  } = props;
  const context = reactExports.useContext(MenuContext);
  const {
    prefixCls,
    inlineCollapsed,
    theme: contextTheme
  } = context;
  const parentPath = useFullPath();
  let titleNode;
  if (!icon) {
    titleNode = inlineCollapsed && !parentPath.length && title && typeof title === "string" ? /* @__PURE__ */ reactExports.createElement("div", {
      className: `${prefixCls}-inline-collapsed-noicon`
    }, title.charAt(0)) : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-title-content`
    }, title);
  } else {
    const titleIsSpan = /* @__PURE__ */ reactExports.isValidElement(title) && title.type === "span";
    titleNode = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, cloneElement(icon, {
      className: classNames(/* @__PURE__ */ reactExports.isValidElement(icon) ? (_a = icon.props) === null || _a === void 0 ? void 0 : _a.className : void 0, `${prefixCls}-item-icon`)
    }), titleIsSpan ? title : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-title-content`
    }, title));
  }
  const contextValue = reactExports.useMemo(() => Object.assign(Object.assign({}, context), {
    firstLevel: false
  }), [context]);
  const [zIndex] = useZIndex("Menu");
  return /* @__PURE__ */ reactExports.createElement(MenuContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement(SubMenu$1, Object.assign({}, omit(props, ["icon"]), {
    title: titleNode,
    popupClassName: classNames(prefixCls, popupClassName, `${prefixCls}-${customTheme || contextTheme}`),
    popupStyle: Object.assign({
      zIndex
    }, props.popupStyle)
  })));
};
var __rest$a = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function isEmptyIcon(icon) {
  return icon === null || icon === false;
}
const MENU_COMPONENTS = {
  item: MenuItem,
  submenu: SubMenu,
  divider: MenuDivider
};
const InternalMenu = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a;
  const override = reactExports.useContext(OverrideContext);
  const overrideObj = override || {};
  const {
    getPrefixCls,
    getPopupContainer,
    direction,
    menu
  } = reactExports.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    theme = "light",
    expandIcon,
    _internalDisableMenuItemTitleTooltip,
    inlineCollapsed,
    siderCollapsed,
    rootClassName,
    mode,
    selectable,
    onClick,
    overflowedIndicatorPopupClassName
  } = props, restProps = __rest$a(props, ["prefixCls", "className", "style", "theme", "expandIcon", "_internalDisableMenuItemTitleTooltip", "inlineCollapsed", "siderCollapsed", "rootClassName", "mode", "selectable", "onClick", "overflowedIndicatorPopupClassName"]);
  const passedProps = omit(restProps, ["collapsedWidth"]);
  (_a = overrideObj.validator) === null || _a === void 0 ? void 0 : _a.call(overrideObj, {
    mode
  });
  const onItemClick = useEvent((...args) => {
    var _a2;
    onClick === null || onClick === void 0 ? void 0 : onClick.apply(void 0, args);
    (_a2 = overrideObj.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(overrideObj);
  });
  const mergedMode = overrideObj.mode || mode;
  const mergedSelectable = selectable !== null && selectable !== void 0 ? selectable : overrideObj.selectable;
  const mergedInlineCollapsed = inlineCollapsed !== null && inlineCollapsed !== void 0 ? inlineCollapsed : siderCollapsed;
  const defaultMotions = {
    horizontal: {
      motionName: `${rootPrefixCls}-slide-up`
    },
    inline: initCollapseMotion(rootPrefixCls),
    other: {
      motionName: `${rootPrefixCls}-zoom-big`
    }
  };
  const prefixCls = getPrefixCls("menu", customizePrefixCls || overrideObj.prefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$7(prefixCls, rootCls, !override);
  const menuClassName = classNames(`${prefixCls}-${theme}`, menu === null || menu === void 0 ? void 0 : menu.className, className);
  const mergedExpandIcon = reactExports.useMemo(() => {
    var _a2, _b;
    if (typeof expandIcon === "function" || isEmptyIcon(expandIcon)) {
      return expandIcon || null;
    }
    if (typeof overrideObj.expandIcon === "function" || isEmptyIcon(overrideObj.expandIcon)) {
      return overrideObj.expandIcon || null;
    }
    if (typeof (menu === null || menu === void 0 ? void 0 : menu.expandIcon) === "function" || isEmptyIcon(menu === null || menu === void 0 ? void 0 : menu.expandIcon)) {
      return (menu === null || menu === void 0 ? void 0 : menu.expandIcon) || null;
    }
    const mergedIcon = (_a2 = expandIcon !== null && expandIcon !== void 0 ? expandIcon : overrideObj === null || overrideObj === void 0 ? void 0 : overrideObj.expandIcon) !== null && _a2 !== void 0 ? _a2 : menu === null || menu === void 0 ? void 0 : menu.expandIcon;
    return cloneElement(mergedIcon, {
      className: classNames(`${prefixCls}-submenu-expand-icon`, /* @__PURE__ */ reactExports.isValidElement(mergedIcon) ? (_b = mergedIcon.props) === null || _b === void 0 ? void 0 : _b.className : void 0)
    });
  }, [expandIcon, overrideObj === null || overrideObj === void 0 ? void 0 : overrideObj.expandIcon, menu === null || menu === void 0 ? void 0 : menu.expandIcon, prefixCls]);
  const contextValue = reactExports.useMemo(() => ({
    prefixCls,
    inlineCollapsed: mergedInlineCollapsed || false,
    direction,
    firstLevel: true,
    theme,
    mode: mergedMode,
    disableMenuItemTitleTooltip: _internalDisableMenuItemTitleTooltip
  }), [prefixCls, mergedInlineCollapsed, direction, _internalDisableMenuItemTitleTooltip, theme]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(OverrideContext.Provider, {
    value: null
  }, /* @__PURE__ */ reactExports.createElement(MenuContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement(ExportMenu, Object.assign({
    getPopupContainer,
    overflowedIndicator: /* @__PURE__ */ reactExports.createElement(RefIcon$g, null),
    overflowedIndicatorPopupClassName: classNames(prefixCls, `${prefixCls}-${theme}`, overflowedIndicatorPopupClassName),
    mode: mergedMode,
    selectable: mergedSelectable,
    onClick: onItemClick
  }, passedProps, {
    inlineCollapsed: mergedInlineCollapsed,
    style: Object.assign(Object.assign({}, menu === null || menu === void 0 ? void 0 : menu.style), style),
    className: menuClassName,
    prefixCls,
    direction,
    defaultMotions,
    expandIcon: mergedExpandIcon,
    ref,
    rootClassName: classNames(rootClassName, hashId, overrideObj.rootClassName, cssVarCls, rootCls),
    _internalComponents: MENU_COMPONENTS
  })))));
});
const Menu = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const menuRef = reactExports.useRef(null);
  const context = reactExports.useContext(SiderContext);
  reactExports.useImperativeHandle(ref, () => ({
    menu: menuRef.current,
    focus: (options) => {
      var _a;
      (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.focus(options);
    }
  }));
  return /* @__PURE__ */ reactExports.createElement(InternalMenu, Object.assign({
    ref: menuRef
  }, props, context));
});
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.Divider = MenuDivider;
Menu.ItemGroup = MenuItemGroup;
const genStatusStyle = (token) => {
  const {
    componentCls,
    menuCls,
    colorError,
    colorTextLightSolid
  } = token;
  const itemCls = `${menuCls}-item`;
  return {
    [`${componentCls}, ${componentCls}-menu-submenu`]: {
      [`${menuCls} ${itemCls}`]: {
        [`&${itemCls}-danger:not(${itemCls}-disabled)`]: {
          color: colorError,
          "&:hover": {
            color: colorTextLightSolid,
            backgroundColor: colorError
          }
        }
      }
    }
  };
};
const genBaseStyle$1 = (token) => {
  const {
    componentCls,
    menuCls,
    zIndexPopup,
    dropdownArrowDistance,
    sizePopupArrow,
    antCls,
    iconCls,
    motionDurationMid,
    paddingBlock,
    fontSize,
    dropdownEdgeChildPadding,
    colorTextDisabled,
    fontSizeIcon,
    controlPaddingHorizontal,
    colorBgElevated
  } = token;
  return [
    {
      [componentCls]: {
        position: "absolute",
        top: -9999,
        left: {
          _skip_check_: true,
          value: -9999
        },
        zIndex: zIndexPopup,
        display: "block",
        // A placeholder out of dropdown visible range to avoid close when user moving
        "&::before": {
          position: "absolute",
          insetBlock: token.calc(sizePopupArrow).div(2).sub(dropdownArrowDistance).equal(),
          // insetInlineStart: -7, // FIXME: Seems not work for hidden element
          zIndex: -9999,
          opacity: 1e-4,
          content: '""'
        },
        // Makes vertical dropdowns have a scrollbar once they become taller than the viewport.
        "&-menu-vertical": {
          maxHeight: "100vh",
          overflowY: "auto"
        },
        [`&-trigger${antCls}-btn`]: {
          [`& > ${iconCls}-down, & > ${antCls}-btn-icon > ${iconCls}-down`]: {
            fontSize: fontSizeIcon
          }
        },
        [`${componentCls}-wrap`]: {
          position: "relative",
          [`${antCls}-btn > ${iconCls}-down`]: {
            fontSize: fontSizeIcon
          },
          [`${iconCls}-down::before`]: {
            transition: `transform ${motionDurationMid}`
          }
        },
        [`${componentCls}-wrap-open`]: {
          [`${iconCls}-down::before`]: {
            transform: `rotate(180deg)`
          }
        },
        [`
        &-hidden,
        &-menu-hidden,
        &-menu-submenu-hidden
      `]: {
          display: "none"
        },
        // =============================================================
        // ==                         Motion                          ==
        // =============================================================
        // When position is not enough for dropdown, the placement will revert.
        // We will handle this with revert motion name.
        [`&${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomRight,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomRight`]: {
          animationName: slideUpIn
        },
        [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-top,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-top,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topRight`]: {
          animationName: slideDownIn
        },
        [`&${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomRight`]: {
          animationName: slideUpOut
        },
        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-top,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topRight`]: {
          animationName: slideDownOut
        }
      }
    },
    // =============================================================
    // ==                        Arrow style                      ==
    // =============================================================
    getArrowStyle(token, colorBgElevated, {
      arrowPlacement: {
        top: true,
        bottom: true
      }
    }),
    {
      // =============================================================
      // ==                          Menu                           ==
      // =============================================================
      [`${componentCls} ${menuCls}`]: {
        position: "relative",
        margin: 0
      },
      [`${menuCls}-submenu-popup`]: {
        position: "absolute",
        zIndex: zIndexPopup,
        background: "transparent",
        boxShadow: "none",
        transformOrigin: "0 0",
        "ul, li": {
          listStyle: "none",
          margin: 0
        }
      },
      [`${componentCls}, ${componentCls}-menu-submenu`]: Object.assign(Object.assign({}, resetComponent(token)), {
        [menuCls]: Object.assign(Object.assign({
          padding: dropdownEdgeChildPadding,
          listStyleType: "none",
          backgroundColor: colorBgElevated,
          backgroundClip: "padding-box",
          borderRadius: token.borderRadiusLG,
          outline: "none",
          boxShadow: token.boxShadowSecondary
        }, genFocusStyle(token)), {
          "&:empty": {
            padding: 0,
            boxShadow: "none"
          },
          [`${menuCls}-item-group-title`]: {
            padding: `${unit(paddingBlock)} ${unit(controlPaddingHorizontal)}`,
            color: token.colorTextDescription,
            transition: `all ${motionDurationMid}`
          },
          // ======================= Item Content =======================
          [`${menuCls}-item`]: {
            position: "relative",
            display: "flex",
            alignItems: "center"
          },
          [`${menuCls}-item-icon`]: {
            minWidth: fontSize,
            marginInlineEnd: token.marginXS,
            fontSize: token.fontSizeSM
          },
          [`${menuCls}-title-content`]: {
            flex: "auto",
            "&-with-extra": {
              display: "inline-flex",
              alignItems: "center",
              width: "100%"
            },
            "> a": {
              color: "inherit",
              transition: `all ${motionDurationMid}`,
              "&:hover": {
                color: "inherit"
              },
              "&::after": {
                position: "absolute",
                inset: 0,
                content: '""'
              }
            },
            [`${menuCls}-item-extra`]: {
              paddingInlineStart: token.padding,
              marginInlineStart: "auto",
              fontSize: token.fontSizeSM,
              color: token.colorTextDescription
            }
          },
          // =========================== Item ===========================
          [`${menuCls}-item, ${menuCls}-submenu-title`]: Object.assign(Object.assign({
            display: "flex",
            margin: 0,
            padding: `${unit(paddingBlock)} ${unit(controlPaddingHorizontal)}`,
            color: token.colorText,
            fontWeight: "normal",
            fontSize,
            lineHeight: token.lineHeight,
            cursor: "pointer",
            transition: `all ${motionDurationMid}`,
            borderRadius: token.borderRadiusSM,
            "&:hover, &-active": {
              backgroundColor: token.controlItemBgHover
            }
          }, genFocusStyle(token)), {
            "&-selected": {
              color: token.colorPrimary,
              backgroundColor: token.controlItemBgActive,
              "&:hover, &-active": {
                backgroundColor: token.controlItemBgActiveHover
              }
            },
            "&-disabled": {
              color: colorTextDisabled,
              cursor: "not-allowed",
              "&:hover": {
                color: colorTextDisabled,
                backgroundColor: colorBgElevated,
                cursor: "not-allowed"
              },
              a: {
                pointerEvents: "none"
              }
            },
            "&-divider": {
              height: 1,
              // By design
              margin: `${unit(token.marginXXS)} 0`,
              overflow: "hidden",
              lineHeight: 0,
              backgroundColor: token.colorSplit
            },
            [`${componentCls}-menu-submenu-expand-icon`]: {
              position: "absolute",
              insetInlineEnd: token.paddingXS,
              [`${componentCls}-menu-submenu-arrow-icon`]: {
                marginInlineEnd: "0 !important",
                color: token.colorIcon,
                fontSize: fontSizeIcon,
                fontStyle: "normal"
              }
            }
          }),
          [`${menuCls}-item-group-list`]: {
            margin: `0 ${unit(token.marginXS)}`,
            padding: 0,
            listStyle: "none"
          },
          [`${menuCls}-submenu-title`]: {
            paddingInlineEnd: token.calc(controlPaddingHorizontal).add(token.fontSizeSM).equal()
          },
          [`${menuCls}-submenu-vertical`]: {
            position: "relative"
          },
          [`${menuCls}-submenu${menuCls}-submenu-disabled ${componentCls}-menu-submenu-title`]: {
            [`&, ${componentCls}-menu-submenu-arrow-icon`]: {
              color: colorTextDisabled,
              backgroundColor: colorBgElevated,
              cursor: "not-allowed"
            }
          },
          // https://github.com/ant-design/ant-design/issues/19264
          [`${menuCls}-submenu-selected ${componentCls}-menu-submenu-title`]: {
            color: token.colorPrimary
          }
        })
      })
    },
    // Follow code may reuse in other components
    [initSlideMotion(token, "slide-up"), initSlideMotion(token, "slide-down"), initMoveMotion(token, "move-up"), initMoveMotion(token, "move-down"), initZoomMotion(token, "zoom-big")]
  ];
};
const prepareComponentToken$5 = (token) => Object.assign(Object.assign({
  zIndexPopup: token.zIndexPopupBase + 50,
  paddingBlock: (token.controlHeight - token.fontSize * token.lineHeight) / 2
}, getArrowOffsetToken({
  contentRadius: token.borderRadiusLG,
  limitVerticalRadius: true
})), getArrowToken(token));
const useStyle$6 = genStyleHooks("Dropdown", (token) => {
  const {
    marginXXS,
    sizePopupArrow,
    paddingXXS,
    componentCls
  } = token;
  const dropdownToken = merge(token, {
    menuCls: `${componentCls}-menu`,
    dropdownArrowDistance: token.calc(sizePopupArrow).div(2).add(marginXXS).equal(),
    dropdownEdgeChildPadding: paddingXXS
  });
  return [genBaseStyle$1(dropdownToken), genStatusStyle(dropdownToken)];
}, prepareComponentToken$5, {
  resetStyle: false
});
const Dropdown$1 = (props) => {
  var _a;
  const {
    menu,
    arrow,
    prefixCls: customizePrefixCls,
    children,
    trigger,
    disabled,
    dropdownRender,
    popupRender,
    getPopupContainer,
    overlayClassName,
    rootClassName,
    overlayStyle,
    open,
    onOpenChange,
    // Deprecated
    visible,
    onVisibleChange,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    autoAdjustOverflow = true,
    placement = "",
    overlay,
    transitionName,
    destroyOnHidden,
    destroyPopupOnHide
  } = props;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    dropdown
  } = reactExports.useContext(ConfigContext);
  const mergedPopupRender = popupRender || dropdownRender;
  devUseWarning();
  const memoTransitionName = reactExports.useMemo(() => {
    const rootPrefixCls = getPrefixCls();
    if (transitionName !== void 0) {
      return transitionName;
    }
    if (placement.includes("top")) {
      return `${rootPrefixCls}-slide-down`;
    }
    return `${rootPrefixCls}-slide-up`;
  }, [getPrefixCls, placement, transitionName]);
  const memoPlacement = reactExports.useMemo(() => {
    if (!placement) {
      return direction === "rtl" ? "bottomRight" : "bottomLeft";
    }
    if (placement.includes("Center")) {
      return placement.slice(0, placement.indexOf("Center"));
    }
    return placement;
  }, [placement, direction]);
  const prefixCls = getPrefixCls("dropdown", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$6(prefixCls, rootCls);
  const [, token] = useToken();
  const child = reactExports.Children.only(isPrimitive(children) ? /* @__PURE__ */ reactExports.createElement("span", null, children) : children);
  const popupTrigger = cloneElement(child, {
    className: classNames(`${prefixCls}-trigger`, {
      [`${prefixCls}-rtl`]: direction === "rtl"
    }, child.props.className),
    disabled: (_a = child.props.disabled) !== null && _a !== void 0 ? _a : disabled
  });
  const triggerActions = disabled ? [] : trigger;
  const alignPoint = !!(triggerActions === null || triggerActions === void 0 ? void 0 : triggerActions.includes("contextMenu"));
  const [mergedOpen, setOpen] = useMergedState(false, {
    value: open !== null && open !== void 0 ? open : visible
  });
  const onInnerOpenChange = useEvent((nextOpen) => {
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextOpen, {
      source: "trigger"
    });
    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(nextOpen);
    setOpen(nextOpen);
  });
  const overlayClassNameCustomized = classNames(overlayClassName, rootClassName, hashId, cssVarCls, rootCls, dropdown === null || dropdown === void 0 ? void 0 : dropdown.className, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  });
  const builtinPlacements = getPlacements({
    arrowPointAtCenter: typeof arrow === "object" && arrow.pointAtCenter,
    autoAdjustOverflow,
    offset: token.marginXXS,
    arrowWidth: arrow ? token.sizePopupArrow : 0,
    borderRadius: token.borderRadius
  });
  const onMenuClick = useEvent(() => {
    if ((menu === null || menu === void 0 ? void 0 : menu.selectable) && (menu === null || menu === void 0 ? void 0 : menu.multiple)) {
      return;
    }
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false, {
      source: "menu"
    });
    setOpen(false);
  });
  const renderOverlay = () => {
    let overlayNode;
    if (menu === null || menu === void 0 ? void 0 : menu.items) {
      overlayNode = /* @__PURE__ */ reactExports.createElement(Menu, Object.assign({}, menu));
    } else if (typeof overlay === "function") {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }
    if (mergedPopupRender) {
      overlayNode = mergedPopupRender(overlayNode);
    }
    overlayNode = reactExports.Children.only(typeof overlayNode === "string" ? /* @__PURE__ */ reactExports.createElement("span", null, overlayNode) : overlayNode);
    return /* @__PURE__ */ reactExports.createElement(OverrideProvider, {
      prefixCls: `${prefixCls}-menu`,
      rootClassName: classNames(cssVarCls, rootCls),
      expandIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-menu-submenu-arrow`
      }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$f, {
        className: `${prefixCls}-menu-submenu-arrow-icon`
      }) : /* @__PURE__ */ reactExports.createElement(RefIcon$h, {
        className: `${prefixCls}-menu-submenu-arrow-icon`
      })),
      mode: "vertical",
      selectable: false,
      onClick: onMenuClick,
      validator: ({
        mode
      }) => {
      }
    }, overlayNode);
  };
  const [zIndex, contextZIndex] = useZIndex("Dropdown", overlayStyle === null || overlayStyle === void 0 ? void 0 : overlayStyle.zIndex);
  let renderNode = /* @__PURE__ */ reactExports.createElement(Dropdown$2, Object.assign({
    alignPoint
  }, omit(props, ["rootClassName"]), {
    mouseEnterDelay,
    mouseLeaveDelay,
    visible: mergedOpen,
    builtinPlacements,
    arrow: !!arrow,
    overlayClassName: overlayClassNameCustomized,
    prefixCls,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    transitionName: memoTransitionName,
    trigger: triggerActions,
    overlay: renderOverlay,
    placement: memoPlacement,
    onVisibleChange: onInnerOpenChange,
    overlayStyle: Object.assign(Object.assign(Object.assign({}, dropdown === null || dropdown === void 0 ? void 0 : dropdown.style), overlayStyle), {
      zIndex
    }),
    autoDestroy: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyPopupOnHide
  }), popupTrigger);
  if (zIndex) {
    renderNode = /* @__PURE__ */ reactExports.createElement(zIndexContext.Provider, {
      value: contextZIndex
    }, renderNode);
  }
  return wrapCSSVar(renderNode);
};
const PurePanel$1 = genPurePanel(Dropdown$1, "align", void 0, "dropdown", (prefixCls) => prefixCls);
const WrapPurePanel = (props) => /* @__PURE__ */ reactExports.createElement(PurePanel$1, Object.assign({}, props), /* @__PURE__ */ reactExports.createElement("span", null));
Dropdown$1._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;
var dayjs_min = { exports: {} };
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
      return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t2, e2, n2) {
      var r2 = String(t2);
      return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t2(e2, n2) {
      if (e2.date() < n2.date()) return -t2(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return void 0 === t2;
    } }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t2) {
      return t2 instanceof _ || !(!t2 || !t2[p]);
    }, w = function t2(e2, n2, r2) {
      var i2;
      if (!e2) return g;
      if ("string" == typeof e2) {
        var s2 = e2.toLowerCase();
        D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1) return t2(u2[0]);
      } else {
        var a2 = e2.name;
        D[a2] = e2, i2 = a2;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, O = function(t2, e2) {
      if (S(t2)) return t2.clone();
      var n2 = "object" == typeof e2 ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, b = v;
    b.l = w, b.i = S, b.w = function(t2, e2) {
      return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t2) {
        this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var e2 = t3.date, n2 = t3.utc;
          if (null === e2) return /* @__PURE__ */ new Date(NaN);
          if (b.u(e2)) return /* @__PURE__ */ new Date();
          if (e2 instanceof Date) return new Date(e2);
          if ("string" == typeof e2 && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return b;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = O(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return O(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < O(t2);
      }, m2.$g = function(t2, e2, n2) {
        return b.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
          var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t3, e3) {
          return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (f2) {
          case h:
            return r2 ? l2(1, 0) : l2(31, 11);
          case c:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === c || o2 === h) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[b.p(t2)]();
      }, m2.add = function(r2, f2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = b.p(f2), y2 = function(t2) {
          var e2 = O(l2);
          return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
        };
        if ($2 === c) return this.set(c, this.$M + r2);
        if ($2 === h) return this.set(h, this.$y + r2);
        if ($2 === a) return y2(1);
        if ($2 === o) return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return b.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid()) return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, d2 = function(t3) {
          return b.s(s2 % 12 || 12, t3, "0");
        }, $2 = f2 || function(t3, e3, n3) {
          var r3 = t3 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        };
        return r2.replace(y, function(t3, r3) {
          return r3 || function(t4) {
            switch (t4) {
              case "YY":
                return String(e2.$y).slice(-2);
              case "YYYY":
                return b.s(e2.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return b.s(a2 + 1, 2, "0");
              case "MMM":
                return h2(n2.monthsShort, a2, c2, 3);
              case "MMMM":
                return h2(c2, a2);
              case "D":
                return e2.$D;
              case "DD":
                return b.s(e2.$D, 2, "0");
              case "d":
                return String(e2.$W);
              case "dd":
                return h2(n2.weekdaysMin, e2.$W, o2, 2);
              case "ddd":
                return h2(n2.weekdaysShort, e2.$W, o2, 3);
              case "dddd":
                return o2[e2.$W];
              case "H":
                return String(s2);
              case "HH":
                return b.s(s2, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $2(s2, u2, true);
              case "A":
                return $2(s2, u2, false);
              case "m":
                return String(u2);
              case "mm":
                return b.s(u2, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return b.s(e2.$s, 2, "0");
              case "SSS":
                return b.s(e2.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t3) || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
          return b.m(y2, m3);
        };
        switch (M3) {
          case h:
            $2 = D2() / 12;
            break;
          case c:
            $2 = D2();
            break;
          case f:
            $2 = D2() / 3;
            break;
          case o:
            $2 = (g2 - v2) / 6048e5;
            break;
          case a:
            $2 = (g2 - v2) / 864e5;
            break;
          case u:
            $2 = g2 / n;
            break;
          case s:
            $2 = g2 / e;
            break;
          case i:
            $2 = g2 / t;
            break;
          default:
            $2 = g2;
        }
        return l2 ? $2 : b.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2) return this.$L;
        var n2 = this.clone(), r2 = w(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return b.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), k = _.prototype;
    return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
      k[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), O.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, O), t2.$i = true), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
      return O(1e3 * t2);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
var weekday$1 = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    return function(e, t) {
      t.prototype.weekday = function(e2) {
        var t2 = this.$locale().weekStart || 0, i = this.$W, n = (i < t2 ? i + 7 : i) - t2;
        return this.$utils().u(e2) ? n : this.subtract(n, "day").add(e2, "day");
      };
    };
  });
})(weekday$1);
var weekdayExports = weekday$1.exports;
const weekday = /* @__PURE__ */ getDefaultExportFromCjs(weekdayExports);
var localeData$1 = { exports: {} };
(function(module, exports) {
  !function(n, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    return function(n, e, t) {
      var r = e.prototype, o = function(n2) {
        return n2 && (n2.indexOf ? n2 : n2.s);
      }, u = function(n2, e2, t2, r2, u2) {
        var i2 = n2.name ? n2 : n2.$locale(), a2 = o(i2[e2]), s2 = o(i2[t2]), f = a2 || s2.map(function(n3) {
          return n3.slice(0, r2);
        });
        if (!u2) return f;
        var d = i2.weekStart;
        return f.map(function(n3, e3) {
          return f[(e3 + (d || 0)) % 7];
        });
      }, i = function() {
        return t.Ls[t.locale()];
      }, a = function(n2, e2) {
        return n2.formats[e2] || function(n3) {
          return n3.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(n4, e3, t2) {
            return e3 || t2.slice(1);
          });
        }(n2.formats[e2.toUpperCase()]);
      }, s = function() {
        var n2 = this;
        return { months: function(e2) {
          return e2 ? e2.format("MMMM") : u(n2, "months");
        }, monthsShort: function(e2) {
          return e2 ? e2.format("MMM") : u(n2, "monthsShort", "months", 3);
        }, firstDayOfWeek: function() {
          return n2.$locale().weekStart || 0;
        }, weekdays: function(e2) {
          return e2 ? e2.format("dddd") : u(n2, "weekdays");
        }, weekdaysMin: function(e2) {
          return e2 ? e2.format("dd") : u(n2, "weekdaysMin", "weekdays", 2);
        }, weekdaysShort: function(e2) {
          return e2 ? e2.format("ddd") : u(n2, "weekdaysShort", "weekdays", 3);
        }, longDateFormat: function(e2) {
          return a(n2.$locale(), e2);
        }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
      };
      r.localeData = function() {
        return s.bind(this)();
      }, t.localeData = function() {
        var n2 = i();
        return { firstDayOfWeek: function() {
          return n2.weekStart || 0;
        }, weekdays: function() {
          return t.weekdays();
        }, weekdaysShort: function() {
          return t.weekdaysShort();
        }, weekdaysMin: function() {
          return t.weekdaysMin();
        }, months: function() {
          return t.months();
        }, monthsShort: function() {
          return t.monthsShort();
        }, longDateFormat: function(e2) {
          return a(n2, e2);
        }, meridiem: n2.meridiem, ordinal: n2.ordinal };
      }, t.months = function() {
        return u(i(), "months");
      }, t.monthsShort = function() {
        return u(i(), "monthsShort", "months", 3);
      }, t.weekdays = function(n2) {
        return u(i(), "weekdays", null, null, n2);
      }, t.weekdaysShort = function(n2) {
        return u(i(), "weekdaysShort", "weekdays", 3, n2);
      }, t.weekdaysMin = function(n2) {
        return u(i(), "weekdaysMin", "weekdays", 2, n2);
      };
    };
  });
})(localeData$1);
var localeDataExports = localeData$1.exports;
const localeData = /* @__PURE__ */ getDefaultExportFromCjs(localeDataExports);
var weekOfYear$1 = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    var e = "week", t = "year";
    return function(i, n, r) {
      var f = n.prototype;
      f.week = function(i2) {
        if (void 0 === i2 && (i2 = null), null !== i2) return this.add(7 * (i2 - this.week()), "day");
        var n2 = this.$locale().yearStart || 1;
        if (11 === this.month() && this.date() > 25) {
          var f2 = r(this).startOf(t).add(1, t).date(n2), s = r(this).endOf(e);
          if (f2.isBefore(s)) return 1;
        }
        var a = r(this).startOf(t).date(n2).startOf(e).subtract(1, "millisecond"), o = this.diff(a, e, true);
        return o < 0 ? r(this).startOf("week").week() : Math.ceil(o);
      }, f.weeks = function(e2) {
        return void 0 === e2 && (e2 = null), this.week(e2);
      };
    };
  });
})(weekOfYear$1);
var weekOfYearExports = weekOfYear$1.exports;
const weekOfYear = /* @__PURE__ */ getDefaultExportFromCjs(weekOfYearExports);
var weekYear$1 = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    return function(e, t) {
      t.prototype.weekYear = function() {
        var e2 = this.month(), t2 = this.week(), n = this.year();
        return 1 === t2 && 11 === e2 ? n + 1 : 0 === e2 && t2 >= 52 ? n - 1 : n;
      };
    };
  });
})(weekYear$1);
var weekYearExports = weekYear$1.exports;
const weekYear = /* @__PURE__ */ getDefaultExportFromCjs(weekYearExports);
var advancedFormat$1 = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    return function(e, t) {
      var r = t.prototype, n = r.format;
      r.format = function(e2) {
        var t2 = this, r2 = this.$locale();
        if (!this.isValid()) return n.bind(this)(e2);
        var s = this.$utils(), a = (e2 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(e3) {
          switch (e3) {
            case "Q":
              return Math.ceil((t2.$M + 1) / 3);
            case "Do":
              return r2.ordinal(t2.$D);
            case "gggg":
              return t2.weekYear();
            case "GGGG":
              return t2.isoWeekYear();
            case "wo":
              return r2.ordinal(t2.week(), "W");
            case "w":
            case "ww":
              return s.s(t2.week(), "w" === e3 ? 1 : 2, "0");
            case "W":
            case "WW":
              return s.s(t2.isoWeek(), "W" === e3 ? 1 : 2, "0");
            case "k":
            case "kk":
              return s.s(String(0 === t2.$H ? 24 : t2.$H), "k" === e3 ? 1 : 2, "0");
            case "X":
              return Math.floor(t2.$d.getTime() / 1e3);
            case "x":
              return t2.$d.getTime();
            case "z":
              return "[" + t2.offsetName() + "]";
            case "zzz":
              return "[" + t2.offsetName("long") + "]";
            default:
              return e3;
          }
        });
        return n.bind(this)(a);
      };
    };
  });
})(advancedFormat$1);
var advancedFormatExports = advancedFormat$1.exports;
const advancedFormat = /* @__PURE__ */ getDefaultExportFromCjs(advancedFormatExports);
var customParseFormat$1 = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, o = /\d*[^-_:/,()\s\d]+/, s = {}, a = function(e2) {
      return (e2 = +e2) + (e2 > 68 ? 1900 : 2e3);
    };
    var f = function(e2) {
      return function(t2) {
        this[e2] = +t2;
      };
    }, h = [/[+-]\d\d:?(\d\d)?|Z/, function(e2) {
      (this.zone || (this.zone = {})).offset = function(e3) {
        if (!e3) return 0;
        if ("Z" === e3) return 0;
        var t2 = e3.match(/([+-]|\d\d)/g), n2 = 60 * t2[1] + (+t2[2] || 0);
        return 0 === n2 ? 0 : "+" === t2[0] ? -n2 : n2;
      }(e2);
    }], u = function(e2) {
      var t2 = s[e2];
      return t2 && (t2.indexOf ? t2 : t2.s.concat(t2.f));
    }, d = function(e2, t2) {
      var n2, r2 = s.meridiem;
      if (r2) {
        for (var i2 = 1; i2 <= 24; i2 += 1) if (e2.indexOf(r2(i2, 0, t2)) > -1) {
          n2 = i2 > 12;
          break;
        }
      } else n2 = e2 === (t2 ? "pm" : "PM");
      return n2;
    }, c = { A: [o, function(e2) {
      this.afternoon = d(e2, false);
    }], a: [o, function(e2) {
      this.afternoon = d(e2, true);
    }], Q: [n, function(e2) {
      this.month = 3 * (e2 - 1) + 1;
    }], S: [n, function(e2) {
      this.milliseconds = 100 * +e2;
    }], SS: [r, function(e2) {
      this.milliseconds = 10 * +e2;
    }], SSS: [/\d{3}/, function(e2) {
      this.milliseconds = +e2;
    }], s: [i, f("seconds")], ss: [i, f("seconds")], m: [i, f("minutes")], mm: [i, f("minutes")], H: [i, f("hours")], h: [i, f("hours")], HH: [i, f("hours")], hh: [i, f("hours")], D: [i, f("day")], DD: [r, f("day")], Do: [o, function(e2) {
      var t2 = s.ordinal, n2 = e2.match(/\d+/);
      if (this.day = n2[0], t2) for (var r2 = 1; r2 <= 31; r2 += 1) t2(r2).replace(/\[|\]/g, "") === e2 && (this.day = r2);
    }], w: [i, f("week")], ww: [r, f("week")], M: [i, f("month")], MM: [r, f("month")], MMM: [o, function(e2) {
      var t2 = u("months"), n2 = (u("monthsShort") || t2.map(function(e3) {
        return e3.slice(0, 3);
      })).indexOf(e2) + 1;
      if (n2 < 1) throw new Error();
      this.month = n2 % 12 || n2;
    }], MMMM: [o, function(e2) {
      var t2 = u("months").indexOf(e2) + 1;
      if (t2 < 1) throw new Error();
      this.month = t2 % 12 || t2;
    }], Y: [/[+-]?\d+/, f("year")], YY: [r, function(e2) {
      this.year = a(e2);
    }], YYYY: [/\d{4}/, f("year")], Z: h, ZZ: h };
    function l(n2) {
      var r2, i2;
      r2 = n2, i2 = s && s.formats;
      for (var o2 = (n2 = r2.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t2, n3, r3) {
        var o3 = r3 && r3.toUpperCase();
        return n3 || i2[r3] || e[r3] || i2[o3].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t3, n4) {
          return t3 || n4.slice(1);
        });
      })).match(t), a2 = o2.length, f2 = 0; f2 < a2; f2 += 1) {
        var h2 = o2[f2], u2 = c[h2], d2 = u2 && u2[0], l2 = u2 && u2[1];
        o2[f2] = l2 ? { regex: d2, parser: l2 } : h2.replace(/^\[|\]$/g, "");
      }
      return function(e2) {
        for (var t2 = {}, n3 = 0, r3 = 0; n3 < a2; n3 += 1) {
          var i3 = o2[n3];
          if ("string" == typeof i3) r3 += i3.length;
          else {
            var s2 = i3.regex, f3 = i3.parser, h3 = e2.slice(r3), u3 = s2.exec(h3)[0];
            f3.call(t2, u3), e2 = e2.replace(u3, "");
          }
        }
        return function(e3) {
          var t3 = e3.afternoon;
          if (void 0 !== t3) {
            var n4 = e3.hours;
            t3 ? n4 < 12 && (e3.hours += 12) : 12 === n4 && (e3.hours = 0), delete e3.afternoon;
          }
        }(t2), t2;
      };
    }
    return function(e2, t2, n2) {
      n2.p.customParseFormat = true, e2 && e2.parseTwoDigitYear && (a = e2.parseTwoDigitYear);
      var r2 = t2.prototype, i2 = r2.parse;
      r2.parse = function(e3) {
        var t3 = e3.date, r3 = e3.utc, o2 = e3.args;
        this.$u = r3;
        var a2 = o2[1];
        if ("string" == typeof a2) {
          var f2 = true === o2[2], h2 = true === o2[3], u2 = f2 || h2, d2 = o2[2];
          h2 && (d2 = o2[2]), s = this.$locale(), !f2 && d2 && (s = n2.Ls[d2]), this.$d = function(e4, t4, n3, r4) {
            try {
              if (["x", "X"].indexOf(t4) > -1) return new Date(("X" === t4 ? 1e3 : 1) * e4);
              var i3 = l(t4)(e4), o3 = i3.year, s2 = i3.month, a3 = i3.day, f3 = i3.hours, h3 = i3.minutes, u3 = i3.seconds, d3 = i3.milliseconds, c3 = i3.zone, m2 = i3.week, M2 = /* @__PURE__ */ new Date(), Y = a3 || (o3 || s2 ? 1 : M2.getDate()), p = o3 || M2.getFullYear(), v = 0;
              o3 && !s2 || (v = s2 > 0 ? s2 - 1 : M2.getMonth());
              var D, w = f3 || 0, g = h3 || 0, y = u3 || 0, L = d3 || 0;
              return c3 ? new Date(Date.UTC(p, v, Y, w, g, y, L + 60 * c3.offset * 1e3)) : n3 ? new Date(Date.UTC(p, v, Y, w, g, y, L)) : (D = new Date(p, v, Y, w, g, y, L), m2 && (D = r4(D).week(m2).toDate()), D);
            } catch (e5) {
              return /* @__PURE__ */ new Date("");
            }
          }(t3, a2, r3, n2), this.init(), d2 && true !== d2 && (this.$L = this.locale(d2).$L), u2 && t3 != this.format(a2) && (this.$d = /* @__PURE__ */ new Date("")), s = {};
        } else if (a2 instanceof Array) for (var c2 = a2.length, m = 1; m <= c2; m += 1) {
          o2[1] = a2[m - 1];
          var M = n2.apply(this, o2);
          if (M.isValid()) {
            this.$d = M.$d, this.$L = M.$L, this.init();
            break;
          }
          m === c2 && (this.$d = /* @__PURE__ */ new Date(""));
        }
        else i2.call(this, e3);
      };
    };
  });
})(customParseFormat$1);
var customParseFormatExports = customParseFormat$1.exports;
const customParseFormat = /* @__PURE__ */ getDefaultExportFromCjs(customParseFormatExports);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(function(o, c) {
  var proto = c.prototype;
  var oldFormat = proto.format;
  proto.format = function f(formatStr) {
    var str = (formatStr || "").replace("Wo", "wo");
    return oldFormat.bind(this)(str);
  };
});
var localeMap = {
  // ar_EG:
  // az_AZ:
  // bg_BG:
  bn_BD: "bn-bd",
  by_BY: "be",
  // ca_ES:
  // cs_CZ:
  // da_DK:
  // de_DE:
  // el_GR:
  en_GB: "en-gb",
  en_US: "en",
  // es_ES:
  // et_EE:
  // fa_IR:
  // fi_FI:
  fr_BE: "fr",
  // todo: dayjs has no fr_BE locale, use fr at present
  fr_CA: "fr-ca",
  // fr_FR:
  // ga_IE:
  // gl_ES:
  // he_IL:
  // hi_IN:
  // hr_HR:
  // hu_HU:
  hy_AM: "hy-am",
  // id_ID:
  // is_IS:
  // it_IT:
  // ja_JP:
  // ka_GE:
  // kk_KZ:
  // km_KH:
  kmr_IQ: "ku",
  // kn_IN:
  // ko_KR:
  // ku_IQ: // previous ku in antd
  // lt_LT:
  // lv_LV:
  // mk_MK:
  // ml_IN:
  // mn_MN:
  // ms_MY:
  // nb_NO:
  // ne_NP:
  nl_BE: "nl-be",
  // nl_NL:
  // pl_PL:
  pt_BR: "pt-br",
  // pt_PT:
  // ro_RO:
  // ru_RU:
  // sk_SK:
  // sl_SI:
  // sr_RS:
  // sv_SE:
  // ta_IN:
  // th_TH:
  // tr_TR:
  // uk_UA:
  // ur_PK:
  // vi_VN:
  zh_CN: "zh-cn",
  zh_HK: "zh-hk",
  zh_TW: "zh-tw"
};
var parseLocale = function parseLocale2(locale2) {
  var mapLocale = localeMap[locale2];
  return mapLocale || locale2.split("_")[0];
};
var generateConfig = {
  // get
  getNow: function getNow() {
    var now = dayjs();
    if (typeof now.tz === "function") {
      return now.tz();
    }
    return now;
  },
  getFixedDate: function getFixedDate(string) {
    return dayjs(string, ["YYYY-M-DD", "YYYY-MM-DD"]);
  },
  getEndDate: function getEndDate(date) {
    return date.endOf("month");
  },
  getWeekDay: function getWeekDay(date) {
    var clone = date.locale("en");
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },
  getYear: function getYear(date) {
    return date.year();
  },
  getMonth: function getMonth(date) {
    return date.month();
  },
  getDate: function getDate(date) {
    return date.date();
  },
  getHour: function getHour(date) {
    return date.hour();
  },
  getMinute: function getMinute(date) {
    return date.minute();
  },
  getSecond: function getSecond(date) {
    return date.second();
  },
  getMillisecond: function getMillisecond(date) {
    return date.millisecond();
  },
  // set
  addYear: function addYear(date, diff) {
    return date.add(diff, "year");
  },
  addMonth: function addMonth(date, diff) {
    return date.add(diff, "month");
  },
  addDate: function addDate(date, diff) {
    return date.add(diff, "day");
  },
  setYear: function setYear(date, year) {
    return date.year(year);
  },
  setMonth: function setMonth(date, month) {
    return date.month(month);
  },
  setDate: function setDate(date, num) {
    return date.date(num);
  },
  setHour: function setHour(date, hour) {
    return date.hour(hour);
  },
  setMinute: function setMinute(date, minute) {
    return date.minute(minute);
  },
  setSecond: function setSecond(date, second) {
    return date.second(second);
  },
  setMillisecond: function setMillisecond(date, milliseconds) {
    return date.millisecond(milliseconds);
  },
  // Compare
  isAfter: function isAfter(date1, date2) {
    return date1.isAfter(date2);
  },
  isValidate: function isValidate(date) {
    return date.isValid();
  },
  locale: {
    getWeekFirstDay: function getWeekFirstDay(locale2) {
      return dayjs().locale(parseLocale(locale2)).localeData().firstDayOfWeek();
    },
    getWeekFirstDate: function getWeekFirstDate(locale2, date) {
      return date.locale(parseLocale(locale2)).weekday(0);
    },
    getWeek: function getWeek(locale2, date) {
      return date.locale(parseLocale(locale2)).week();
    },
    getShortWeekDays: function getShortWeekDays(locale2) {
      return dayjs().locale(parseLocale(locale2)).localeData().weekdaysMin();
    },
    getShortMonths: function getShortMonths(locale2) {
      return dayjs().locale(parseLocale(locale2)).localeData().monthsShort();
    },
    format: function format(locale2, date, _format) {
      return date.locale(parseLocale(locale2)).format(_format);
    },
    parse: function parse(locale2, text, formats) {
      var localeStr = parseLocale(locale2);
      for (var i = 0; i < formats.length; i += 1) {
        var format2 = formats[i];
        var formatText = text;
        if (format2.includes("wo") || format2.includes("Wo")) {
          var year = formatText.split("-")[0];
          var weekStr = formatText.split("-")[1];
          var firstWeek = dayjs(year, "YYYY").startOf("year").locale(localeStr);
          for (var j = 0; j <= 52; j += 1) {
            var nextWeek = firstWeek.add(j, "week");
            if (nextWeek.format("Wo") === weekStr) {
              return nextWeek;
            }
          }
          return null;
        }
        var date = dayjs(formatText, format2, true).locale(localeStr);
        if (date.isValid()) {
          return date;
        }
      }
      return null;
    }
  }
};
function getRealPlacement(placement, rtl) {
  if (placement !== void 0) {
    return placement;
  }
  return rtl ? "bottomRight" : "bottomLeft";
}
var PickerContext = /* @__PURE__ */ reactExports.createContext(null);
var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ["tl", "bl"],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ["tr", "br"],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ["bl", "tl"],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topRight: {
    points: ["br", "tr"],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};
function PickerTrigger(_ref) {
  var popupElement = _ref.popupElement, popupStyle = _ref.popupStyle, popupClassName = _ref.popupClassName, popupAlign = _ref.popupAlign, transitionName = _ref.transitionName, getPopupContainer = _ref.getPopupContainer, children = _ref.children, range = _ref.range, placement = _ref.placement, _ref$builtinPlacement = _ref.builtinPlacements, builtinPlacements = _ref$builtinPlacement === void 0 ? BUILT_IN_PLACEMENTS : _ref$builtinPlacement, direction = _ref.direction, visible = _ref.visible, onClose = _ref.onClose;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  var dropdownPrefixCls = "".concat(prefixCls, "-dropdown");
  var realPlacement = getRealPlacement(placement, direction === "rtl");
  return /* @__PURE__ */ reactExports.createElement(Trigger, {
    showAction: [],
    hideAction: ["click"],
    popupPlacement: realPlacement,
    builtinPlacements,
    prefixCls: dropdownPrefixCls,
    popupTransitionName: transitionName,
    popup: popupElement,
    popupAlign,
    popupVisible: visible,
    popupClassName: classNames(popupClassName, _defineProperty(_defineProperty({}, "".concat(dropdownPrefixCls, "-range"), range), "".concat(dropdownPrefixCls, "-rtl"), direction === "rtl")),
    popupStyle,
    stretch: "minWidth",
    getPopupContainer,
    onPopupVisibleChange: function onPopupVisibleChange(nextVisible) {
      if (!nextVisible) {
        onClose();
      }
    }
  }, children);
}
function leftPad(str, length) {
  var fill = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  var current = String(str);
  while (current.length < length) {
    current = "".concat(fill).concat(current);
  }
  return current;
}
function toArray$2(val) {
  if (val === null || val === void 0) {
    return [];
  }
  return Array.isArray(val) ? val : [val];
}
function fillIndex(ori, index, value) {
  var clone = _toConsumableArray(ori);
  clone[index] = value;
  return clone;
}
function pickProps(props, keys) {
  var clone = {};
  var mergedKeys = keys || Object.keys(props);
  mergedKeys.forEach(function(key) {
    if (props[key] !== void 0) {
      clone[key] = props[key];
    }
  });
  return clone;
}
function getRowFormat(picker, locale2, format2) {
  if (format2) {
    return format2;
  }
  switch (picker) {
    case "time":
      return locale2.fieldTimeFormat;
    case "datetime":
      return locale2.fieldDateTimeFormat;
    case "month":
      return locale2.fieldMonthFormat;
    case "year":
      return locale2.fieldYearFormat;
    case "quarter":
      return locale2.fieldQuarterFormat;
    case "week":
      return locale2.fieldWeekFormat;
    default:
      return locale2.fieldDateFormat;
  }
}
function getFromDate(calendarValues, activeIndexList, activeIndex) {
  var mergedActiveIndex = activeIndex !== void 0 ? activeIndex : activeIndexList[activeIndexList.length - 1];
  var firstValuedIndex = activeIndexList.find(function(index) {
    return calendarValues[index];
  });
  return mergedActiveIndex !== firstValuedIndex ? calendarValues[firstValuedIndex] : void 0;
}
function pickTriggerProps(props) {
  return pickProps(props, ["placement", "builtinPlacements", "popupAlign", "getPopupContainer", "transitionName", "direction"]);
}
function useCellRender$1(cellRender, dateRender, monthCellRender, range) {
  var mergedCellRender = reactExports.useMemo(function() {
    if (cellRender) {
      return cellRender;
    }
    return function(current, info) {
      var date = current;
      if (dateRender && info.type === "date") {
        return dateRender(date, info.today);
      }
      if (monthCellRender && info.type === "month") {
        return monthCellRender(date, info.locale);
      }
      return info.originNode;
    };
  }, [cellRender, monthCellRender, dateRender]);
  var onInternalCellRender = reactExports.useCallback(function(date, info) {
    return mergedCellRender(date, _objectSpread2(_objectSpread2({}, info), {}, {
      range
    }));
  }, [mergedCellRender, range]);
  return onInternalCellRender;
}
function useFieldsInvalidate(calendarValue, isInvalidateDate) {
  var allowEmpty = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  var _React$useState = reactExports.useState([false, false]), _React$useState2 = _slicedToArray(_React$useState, 2), fieldsInvalidates = _React$useState2[0], setFieldsInvalidates = _React$useState2[1];
  var onSelectorInvalid = function onSelectorInvalid2(invalid, index) {
    setFieldsInvalidates(function(ori) {
      return fillIndex(ori, index, invalid);
    });
  };
  var submitInvalidates = reactExports.useMemo(function() {
    return fieldsInvalidates.map(function(invalid, index) {
      if (invalid) {
        return true;
      }
      var current = calendarValue[index];
      if (!current) {
        return false;
      }
      if (!allowEmpty[index] && !current) {
        return true;
      }
      if (current && isInvalidateDate(current, {
        activeIndex: index
      })) {
        return true;
      }
      return false;
    });
  }, [calendarValue, fieldsInvalidates, isInvalidateDate, allowEmpty]);
  return [submitInvalidates, onSelectorInvalid];
}
function fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem) {
  var timeFormat = "";
  var cells = [];
  if (showHour) {
    cells.push(showMeridiem ? "hh" : "HH");
  }
  if (showMinute) {
    cells.push("mm");
  }
  if (showSecond) {
    cells.push("ss");
  }
  timeFormat = cells.join(":");
  if (showMillisecond) {
    timeFormat += ".SSS";
  }
  if (showMeridiem) {
    timeFormat += " A";
  }
  return timeFormat;
}
function fillLocale(locale2, showHour, showMinute, showSecond, showMillisecond, use12Hours) {
  var fieldDateTimeFormat = locale2.fieldDateTimeFormat, fieldDateFormat = locale2.fieldDateFormat, fieldTimeFormat = locale2.fieldTimeFormat, fieldMonthFormat = locale2.fieldMonthFormat, fieldYearFormat = locale2.fieldYearFormat, fieldWeekFormat = locale2.fieldWeekFormat, fieldQuarterFormat = locale2.fieldQuarterFormat, yearFormat = locale2.yearFormat, cellYearFormat = locale2.cellYearFormat, cellQuarterFormat = locale2.cellQuarterFormat, dayFormat = locale2.dayFormat, cellDateFormat = locale2.cellDateFormat;
  var timeFormat = fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, use12Hours);
  return _objectSpread2(_objectSpread2({}, locale2), {}, {
    fieldDateTimeFormat: fieldDateTimeFormat || "YYYY-MM-DD ".concat(timeFormat),
    fieldDateFormat: fieldDateFormat || "YYYY-MM-DD",
    fieldTimeFormat: fieldTimeFormat || timeFormat,
    fieldMonthFormat: fieldMonthFormat || "YYYY-MM",
    fieldYearFormat: fieldYearFormat || "YYYY",
    fieldWeekFormat: fieldWeekFormat || "gggg-wo",
    fieldQuarterFormat: fieldQuarterFormat || "YYYY-[Q]Q",
    yearFormat: yearFormat || "YYYY",
    cellYearFormat: cellYearFormat || "YYYY",
    cellQuarterFormat: cellQuarterFormat || "[Q]Q",
    cellDateFormat: cellDateFormat || dayFormat || "D"
  });
}
function useLocale(locale2, showProps) {
  var showHour = showProps.showHour, showMinute = showProps.showMinute, showSecond = showProps.showSecond, showMillisecond = showProps.showMillisecond, use12Hours = showProps.use12Hours;
  return React.useMemo(function() {
    return fillLocale(locale2, showHour, showMinute, showSecond, showMillisecond, use12Hours);
  }, [locale2, showHour, showMinute, showSecond, showMillisecond, use12Hours]);
}
function checkShow(format2, keywords, show) {
  return show !== null && show !== void 0 ? show : keywords.some(function(keyword) {
    return format2.includes(keyword);
  });
}
var showTimeKeys = [
  // 'format',
  "showNow",
  "showHour",
  "showMinute",
  "showSecond",
  "showMillisecond",
  "use12Hours",
  "hourStep",
  "minuteStep",
  "secondStep",
  "millisecondStep",
  "hideDisabledOptions",
  "defaultValue",
  "disabledHours",
  "disabledMinutes",
  "disabledSeconds",
  "disabledMilliseconds",
  "disabledTime",
  "changeOnScroll",
  "defaultOpenValue"
];
function pickTimeProps(props) {
  var timeProps = pickProps(props, showTimeKeys);
  var format2 = props.format, picker = props.picker;
  var propFormat = null;
  if (format2) {
    propFormat = format2;
    if (Array.isArray(propFormat)) {
      propFormat = propFormat[0];
    }
    propFormat = _typeof(propFormat) === "object" ? propFormat.format : propFormat;
  }
  if (picker === "time") {
    timeProps.format = propFormat;
  }
  return [timeProps, propFormat];
}
function isStringFormat(format2) {
  return format2 && typeof format2 === "string";
}
function existShowConfig(showHour, showMinute, showSecond, showMillisecond) {
  return [showHour, showMinute, showSecond, showMillisecond].some(function(show) {
    return show !== void 0;
  });
}
function fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond) {
  var parsedShowHour = showHour;
  var parsedShowMinute = showMinute;
  var parsedShowSecond = showSecond;
  if (!hasShowConfig && !parsedShowHour && !parsedShowMinute && !parsedShowSecond && !showMillisecond) {
    parsedShowHour = true;
    parsedShowMinute = true;
    parsedShowSecond = true;
  } else if (hasShowConfig) {
    var _parsedShowHour, _parsedShowMinute, _parsedShowSecond;
    var existFalse = [parsedShowHour, parsedShowMinute, parsedShowSecond].some(function(show) {
      return show === false;
    });
    var existTrue = [parsedShowHour, parsedShowMinute, parsedShowSecond].some(function(show) {
      return show === true;
    });
    var defaultShow = existFalse ? true : !existTrue;
    parsedShowHour = (_parsedShowHour = parsedShowHour) !== null && _parsedShowHour !== void 0 ? _parsedShowHour : defaultShow;
    parsedShowMinute = (_parsedShowMinute = parsedShowMinute) !== null && _parsedShowMinute !== void 0 ? _parsedShowMinute : defaultShow;
    parsedShowSecond = (_parsedShowSecond = parsedShowSecond) !== null && _parsedShowSecond !== void 0 ? _parsedShowSecond : defaultShow;
  }
  return [parsedShowHour, parsedShowMinute, parsedShowSecond, showMillisecond];
}
function getTimeProps(componentProps) {
  var showTime = componentProps.showTime;
  var _pickTimeProps = pickTimeProps(componentProps), _pickTimeProps2 = _slicedToArray(_pickTimeProps, 2), pickedProps = _pickTimeProps2[0], propFormat = _pickTimeProps2[1];
  var showTimeConfig = showTime && _typeof(showTime) === "object" ? showTime : {};
  var timeConfig = _objectSpread2(_objectSpread2({
    defaultOpenValue: showTimeConfig.defaultOpenValue || showTimeConfig.defaultValue
  }, pickedProps), showTimeConfig);
  var showMillisecond = timeConfig.showMillisecond;
  var showHour = timeConfig.showHour, showMinute = timeConfig.showMinute, showSecond = timeConfig.showSecond;
  var hasShowConfig = existShowConfig(showHour, showMinute, showSecond, showMillisecond);
  var _fillShowConfig = fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond);
  var _fillShowConfig2 = _slicedToArray(_fillShowConfig, 3);
  showHour = _fillShowConfig2[0];
  showMinute = _fillShowConfig2[1];
  showSecond = _fillShowConfig2[2];
  return [timeConfig, _objectSpread2(_objectSpread2({}, timeConfig), {}, {
    showHour,
    showMinute,
    showSecond,
    showMillisecond
  }), timeConfig.format, propFormat];
}
function fillShowTimeConfig(picker, showTimeFormat, propFormat, timeConfig, locale2) {
  var isTimePicker = picker === "time";
  if (picker === "datetime" || isTimePicker) {
    var pickedProps = timeConfig;
    var defaultLocaleFormat = getRowFormat(picker, locale2, null);
    var baselineFormat = defaultLocaleFormat;
    var formatList = [showTimeFormat, propFormat];
    for (var i = 0; i < formatList.length; i += 1) {
      var format2 = toArray$2(formatList[i])[0];
      if (isStringFormat(format2)) {
        baselineFormat = format2;
        break;
      }
    }
    var showHour = pickedProps.showHour, showMinute = pickedProps.showMinute, showSecond = pickedProps.showSecond, showMillisecond = pickedProps.showMillisecond;
    var use12Hours = pickedProps.use12Hours;
    var showMeridiem = checkShow(baselineFormat, ["a", "A", "LT", "LLL", "LTS"], use12Hours);
    var hasShowConfig = existShowConfig(showHour, showMinute, showSecond, showMillisecond);
    if (!hasShowConfig) {
      showHour = checkShow(baselineFormat, ["H", "h", "k", "LT", "LLL"]);
      showMinute = checkShow(baselineFormat, ["m", "LT", "LLL"]);
      showSecond = checkShow(baselineFormat, ["s", "LTS"]);
      showMillisecond = checkShow(baselineFormat, ["SSS"]);
    }
    var _fillShowConfig3 = fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond);
    var _fillShowConfig4 = _slicedToArray(_fillShowConfig3, 3);
    showHour = _fillShowConfig4[0];
    showMinute = _fillShowConfig4[1];
    showSecond = _fillShowConfig4[2];
    var timeFormat = showTimeFormat || fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem);
    return _objectSpread2(_objectSpread2({}, pickedProps), {}, {
      // Format
      format: timeFormat,
      // Show Config
      showHour,
      showMinute,
      showSecond,
      showMillisecond,
      use12Hours: showMeridiem
    });
  }
  return null;
}
function fillClearIcon(prefixCls, allowClear, clearIcon) {
  if (allowClear === false) {
    return null;
  }
  var config = allowClear && _typeof(allowClear) === "object" ? allowClear : {};
  return config.clearIcon || clearIcon || /* @__PURE__ */ reactExports.createElement("span", {
    className: "".concat(prefixCls, "-clear-btn")
  });
}
var WEEK_DAY_COUNT = 7;
function nullableCompare(value1, value2, oriCompareFn) {
  if (!value1 && !value2 || value1 === value2) {
    return true;
  }
  if (!value1 || !value2) {
    return false;
  }
  return oriCompareFn();
}
function isSameDecade(generateConfig2, decade1, decade2) {
  return nullableCompare(decade1, decade2, function() {
    var num1 = Math.floor(generateConfig2.getYear(decade1) / 10);
    var num2 = Math.floor(generateConfig2.getYear(decade2) / 10);
    return num1 === num2;
  });
}
function isSameYear(generateConfig2, year1, year2) {
  return nullableCompare(year1, year2, function() {
    return generateConfig2.getYear(year1) === generateConfig2.getYear(year2);
  });
}
function getQuarter(generateConfig2, date) {
  var quota = Math.floor(generateConfig2.getMonth(date) / 3);
  return quota + 1;
}
function isSameQuarter(generateConfig2, quarter1, quarter2) {
  return nullableCompare(quarter1, quarter2, function() {
    return isSameYear(generateConfig2, quarter1, quarter2) && getQuarter(generateConfig2, quarter1) === getQuarter(generateConfig2, quarter2);
  });
}
function isSameMonth(generateConfig2, month1, month2) {
  return nullableCompare(month1, month2, function() {
    return isSameYear(generateConfig2, month1, month2) && generateConfig2.getMonth(month1) === generateConfig2.getMonth(month2);
  });
}
function isSameDate(generateConfig2, date1, date2) {
  return nullableCompare(date1, date2, function() {
    return isSameYear(generateConfig2, date1, date2) && isSameMonth(generateConfig2, date1, date2) && generateConfig2.getDate(date1) === generateConfig2.getDate(date2);
  });
}
function isSameTime(generateConfig2, time1, time2) {
  return nullableCompare(time1, time2, function() {
    return generateConfig2.getHour(time1) === generateConfig2.getHour(time2) && generateConfig2.getMinute(time1) === generateConfig2.getMinute(time2) && generateConfig2.getSecond(time1) === generateConfig2.getSecond(time2);
  });
}
function isSameTimestamp(generateConfig2, time1, time2) {
  return nullableCompare(time1, time2, function() {
    return isSameDate(generateConfig2, time1, time2) && isSameTime(generateConfig2, time1, time2) && generateConfig2.getMillisecond(time1) === generateConfig2.getMillisecond(time2);
  });
}
function isSameWeek(generateConfig2, locale2, date1, date2) {
  return nullableCompare(date1, date2, function() {
    var weekStartDate1 = generateConfig2.locale.getWeekFirstDate(locale2, date1);
    var weekStartDate2 = generateConfig2.locale.getWeekFirstDate(locale2, date2);
    return isSameYear(generateConfig2, weekStartDate1, weekStartDate2) && generateConfig2.locale.getWeek(locale2, date1) === generateConfig2.locale.getWeek(locale2, date2);
  });
}
function isSame(generateConfig2, locale2, source, target, type) {
  switch (type) {
    case "date":
      return isSameDate(generateConfig2, source, target);
    case "week":
      return isSameWeek(generateConfig2, locale2.locale, source, target);
    case "month":
      return isSameMonth(generateConfig2, source, target);
    case "quarter":
      return isSameQuarter(generateConfig2, source, target);
    case "year":
      return isSameYear(generateConfig2, source, target);
    case "decade":
      return isSameDecade(generateConfig2, source, target);
    case "time":
      return isSameTime(generateConfig2, source, target);
    default:
      return isSameTimestamp(generateConfig2, source, target);
  }
}
function isInRange(generateConfig2, startDate, endDate, current) {
  if (!startDate || !endDate || !current) {
    return false;
  }
  return generateConfig2.isAfter(current, startDate) && generateConfig2.isAfter(endDate, current);
}
function isSameOrAfter(generateConfig2, locale2, date1, date2, type) {
  if (isSame(generateConfig2, locale2, date1, date2, type)) {
    return true;
  }
  return generateConfig2.isAfter(date1, date2);
}
function getWeekStartDate(locale2, generateConfig2, value) {
  var weekFirstDay = generateConfig2.locale.getWeekFirstDay(locale2);
  var monthStartDate = generateConfig2.setDate(value, 1);
  var startDateWeekDay = generateConfig2.getWeekDay(monthStartDate);
  var alignStartDate = generateConfig2.addDate(monthStartDate, weekFirstDay - startDateWeekDay);
  if (generateConfig2.getMonth(alignStartDate) === generateConfig2.getMonth(value) && generateConfig2.getDate(alignStartDate) > 1) {
    alignStartDate = generateConfig2.addDate(alignStartDate, -7);
  }
  return alignStartDate;
}
function formatValue(value, _ref) {
  var generateConfig2 = _ref.generateConfig, locale2 = _ref.locale, format2 = _ref.format;
  if (!value) {
    return "";
  }
  return typeof format2 === "function" ? format2(value) : generateConfig2.locale.format(locale2.locale, value, format2);
}
function fillTime(generateConfig2, date, time) {
  var tmpDate = date;
  var getFn = ["getHour", "getMinute", "getSecond", "getMillisecond"];
  var setFn = ["setHour", "setMinute", "setSecond", "setMillisecond"];
  setFn.forEach(function(fn, index) {
    if (time) {
      tmpDate = generateConfig2[fn](tmpDate, generateConfig2[getFn[index]](time));
    } else {
      tmpDate = generateConfig2[fn](tmpDate, 0);
    }
  });
  return tmpDate;
}
function useDisabledBoundary(generateConfig2, locale2, disabledDate, minDate, maxDate) {
  var mergedDisabledDate = useEvent(function(date, info) {
    if (disabledDate && disabledDate(date, info)) {
      return true;
    }
    if (minDate && generateConfig2.isAfter(minDate, date) && !isSame(generateConfig2, locale2, minDate, date, info.type)) {
      return true;
    }
    if (maxDate && generateConfig2.isAfter(date, maxDate) && !isSame(generateConfig2, locale2, maxDate, date, info.type)) {
      return true;
    }
    return false;
  });
  return mergedDisabledDate;
}
function useFieldFormat(picker, locale2, format2) {
  return reactExports.useMemo(function() {
    var rawFormat = getRowFormat(picker, locale2, format2);
    var formatList = toArray$2(rawFormat);
    var firstFormat = formatList[0];
    var maskFormat = _typeof(firstFormat) === "object" && firstFormat.type === "mask" ? firstFormat.format : null;
    return [
      // Format list
      formatList.map(function(config) {
        return typeof config === "string" || typeof config === "function" ? config : config.format;
      }),
      // Mask Format
      maskFormat
    ];
  }, [picker, locale2, format2]);
}
function useInputReadOnly(formatList, inputReadOnly, multiple) {
  if (typeof formatList[0] === "function" || multiple) {
    return true;
  }
  return inputReadOnly;
}
function useInvalidate(generateConfig2, picker, disabledDate, showTime) {
  var isInvalidate = useEvent(function(date, info) {
    var outsideInfo = _objectSpread2({
      type: picker
    }, info);
    delete outsideInfo.activeIndex;
    if (
      // Date object is invalid
      !generateConfig2.isValidate(date) || // Date is disabled by `disabledDate`
      disabledDate && disabledDate(date, outsideInfo)
    ) {
      return true;
    }
    if ((picker === "date" || picker === "time") && showTime) {
      var _showTime$disabledTim;
      var range = info && info.activeIndex === 1 ? "end" : "start";
      var _ref = ((_showTime$disabledTim = showTime.disabledTime) === null || _showTime$disabledTim === void 0 ? void 0 : _showTime$disabledTim.call(showTime, date, range, {
        from: outsideInfo.from
      })) || {}, disabledHours = _ref.disabledHours, disabledMinutes = _ref.disabledMinutes, disabledSeconds = _ref.disabledSeconds, disabledMilliseconds = _ref.disabledMilliseconds;
      var legacyDisabledHours = showTime.disabledHours, legacyDisabledMinutes = showTime.disabledMinutes, legacyDisabledSeconds = showTime.disabledSeconds;
      var mergedDisabledHours = disabledHours || legacyDisabledHours;
      var mergedDisabledMinutes = disabledMinutes || legacyDisabledMinutes;
      var mergedDisabledSeconds = disabledSeconds || legacyDisabledSeconds;
      var hour = generateConfig2.getHour(date);
      var minute = generateConfig2.getMinute(date);
      var second = generateConfig2.getSecond(date);
      var millisecond = generateConfig2.getMillisecond(date);
      if (mergedDisabledHours && mergedDisabledHours().includes(hour)) {
        return true;
      }
      if (mergedDisabledMinutes && mergedDisabledMinutes(hour).includes(minute)) {
        return true;
      }
      if (mergedDisabledSeconds && mergedDisabledSeconds(hour, minute).includes(second)) {
        return true;
      }
      if (disabledMilliseconds && disabledMilliseconds(hour, minute, second).includes(millisecond)) {
        return true;
      }
    }
    return false;
  });
  return isInvalidate;
}
function useList(value) {
  var fillMode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var values = reactExports.useMemo(function() {
    var list = value ? toArray$2(value) : value;
    if (fillMode && list) {
      list[1] = list[1] || list[0];
    }
    return list;
  }, [value, fillMode]);
  return values;
}
function useFilledProps(props, updater) {
  var generateConfig2 = props.generateConfig, locale2 = props.locale, _props$picker = props.picker, picker = _props$picker === void 0 ? "date" : _props$picker, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-picker" : _props$prefixCls, _props$styles = props.styles, styles = _props$styles === void 0 ? {} : _props$styles, _props$classNames = props.classNames, classNames2 = _props$classNames === void 0 ? {} : _props$classNames, _props$order = props.order, order = _props$order === void 0 ? true : _props$order, _props$components = props.components, components = _props$components === void 0 ? {} : _props$components, inputRender = props.inputRender, allowClear = props.allowClear, clearIcon = props.clearIcon, needConfirm = props.needConfirm, multiple = props.multiple, format2 = props.format, inputReadOnly = props.inputReadOnly, disabledDate = props.disabledDate, minDate = props.minDate, maxDate = props.maxDate, showTime = props.showTime, value = props.value, defaultValue = props.defaultValue, pickerValue = props.pickerValue, defaultPickerValue = props.defaultPickerValue;
  var values = useList(value);
  var defaultValues = useList(defaultValue);
  var pickerValues = useList(pickerValue);
  var defaultPickerValues = useList(defaultPickerValue);
  var internalPicker = picker === "date" && showTime ? "datetime" : picker;
  var multipleInteractivePicker = internalPicker === "time" || internalPicker === "datetime";
  var complexPicker = multipleInteractivePicker || multiple;
  var mergedNeedConfirm = needConfirm !== null && needConfirm !== void 0 ? needConfirm : multipleInteractivePicker;
  var _getTimeProps = getTimeProps(props), _getTimeProps2 = _slicedToArray(_getTimeProps, 4), timeProps = _getTimeProps2[0], localeTimeProps = _getTimeProps2[1], showTimeFormat = _getTimeProps2[2], propFormat = _getTimeProps2[3];
  var mergedLocale = useLocale(locale2, localeTimeProps);
  var mergedShowTime = reactExports.useMemo(function() {
    return fillShowTimeConfig(internalPicker, showTimeFormat, propFormat, timeProps, mergedLocale);
  }, [internalPicker, showTimeFormat, propFormat, timeProps, mergedLocale]);
  var filledProps = reactExports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, props), {}, {
      prefixCls,
      locale: mergedLocale,
      picker,
      styles,
      classNames: classNames2,
      order,
      components: _objectSpread2({
        input: inputRender
      }, components),
      clearIcon: fillClearIcon(prefixCls, allowClear, clearIcon),
      showTime: mergedShowTime,
      value: values,
      defaultValue: defaultValues,
      pickerValue: pickerValues,
      defaultPickerValue: defaultPickerValues
    }, updater === null || updater === void 0 ? void 0 : updater());
  }, [props]);
  var _useFieldFormat = useFieldFormat(internalPicker, mergedLocale, format2), _useFieldFormat2 = _slicedToArray(_useFieldFormat, 2), formatList = _useFieldFormat2[0], maskFormat = _useFieldFormat2[1];
  var mergedInputReadOnly = useInputReadOnly(formatList, inputReadOnly, multiple);
  var disabledBoundaryDate = useDisabledBoundary(generateConfig2, locale2, disabledDate, minDate, maxDate);
  var isInvalidateDate = useInvalidate(generateConfig2, picker, disabledBoundaryDate, mergedShowTime);
  var mergedProps = reactExports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, filledProps), {}, {
      needConfirm: mergedNeedConfirm,
      inputReadOnly: mergedInputReadOnly,
      disabledDate: disabledBoundaryDate
    });
  }, [filledProps, mergedNeedConfirm, mergedInputReadOnly, disabledBoundaryDate]);
  return [mergedProps, internalPicker, complexPicker, formatList, maskFormat, isInvalidateDate];
}
function useDelayState(value, defaultValue, onChange) {
  var _useMergedState = useMergedState(defaultValue, {
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), state = _useMergedState2[0], setState = _useMergedState2[1];
  var nextValueRef = React.useRef(value);
  var rafRef = React.useRef();
  var cancelRaf = function cancelRaf2() {
    wrapperRaf.cancel(rafRef.current);
  };
  var doUpdate = useEvent(function() {
    setState(nextValueRef.current);
    if (onChange && state !== nextValueRef.current) {
      onChange(nextValueRef.current);
    }
  });
  var updateValue = useEvent(function(next, immediately) {
    cancelRaf();
    nextValueRef.current = next;
    if (next || immediately) {
      doUpdate();
    } else {
      rafRef.current = wrapperRaf(doUpdate);
    }
  });
  React.useEffect(function() {
    return cancelRaf;
  }, []);
  return [state, updateValue];
}
function useOpen(open, defaultOpen) {
  var disabledList = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  var onOpenChange = arguments.length > 3 ? arguments[3] : void 0;
  var mergedOpen = disabledList.every(function(disabled) {
    return disabled;
  }) ? false : open;
  var _useDelayState = useDelayState(mergedOpen, defaultOpen || false, onOpenChange), _useDelayState2 = _slicedToArray(_useDelayState, 2), rafOpen = _useDelayState2[0], setRafOpen = _useDelayState2[1];
  function setOpen(next) {
    var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!config.inherit || rafOpen) {
      setRafOpen(next, config.force);
    }
  }
  return [rafOpen, setOpen];
}
function usePickerRef(ref) {
  var selectorRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    var _selectorRef$current;
    return {
      nativeElement: (_selectorRef$current = selectorRef.current) === null || _selectorRef$current === void 0 ? void 0 : _selectorRef$current.nativeElement,
      focus: function focus(options) {
        var _selectorRef$current2;
        (_selectorRef$current2 = selectorRef.current) === null || _selectorRef$current2 === void 0 || _selectorRef$current2.focus(options);
      },
      blur: function blur() {
        var _selectorRef$current3;
        (_selectorRef$current3 = selectorRef.current) === null || _selectorRef$current3 === void 0 || _selectorRef$current3.blur();
      }
    };
  });
  return selectorRef;
}
function usePresets(presets, legacyRanges) {
  return reactExports.useMemo(function() {
    if (presets) {
      return presets;
    }
    if (legacyRanges) {
      warningOnce(false, "`ranges` is deprecated. Please use `presets` instead.");
      return Object.entries(legacyRanges).map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), label = _ref2[0], value = _ref2[1];
        return {
          label,
          value
        };
      });
    }
    return [];
  }, [presets, legacyRanges]);
}
function useLockEffect(condition, callback) {
  var delayFrames = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  var callbackRef = reactExports.useRef(callback);
  callbackRef.current = callback;
  useLayoutUpdateEffect(function() {
    if (condition) {
      callbackRef.current(condition);
    } else {
      var id = wrapperRaf(function() {
        callbackRef.current(condition);
      }, delayFrames);
      return function() {
        wrapperRaf.cancel(id);
      };
    }
  }, [condition]);
}
function useRangeActive(disabled) {
  var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var mergedOpen = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var _React$useState = reactExports.useState(0), _React$useState2 = _slicedToArray(_React$useState, 2), activeIndex = _React$useState2[0], setActiveIndex = _React$useState2[1];
  var _React$useState3 = reactExports.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), focused = _React$useState4[0], setFocused = _React$useState4[1];
  var activeListRef = reactExports.useRef([]);
  var submitIndexRef = reactExports.useRef(null);
  var lastOperationRef = reactExports.useRef(null);
  var updateSubmitIndex = function updateSubmitIndex2(index) {
    submitIndexRef.current = index;
  };
  var hasActiveSubmitValue = function hasActiveSubmitValue2(index) {
    return submitIndexRef.current === index;
  };
  var triggerFocus = function triggerFocus2(nextFocus) {
    setFocused(nextFocus);
  };
  var lastOperation = function lastOperation2(type) {
    if (type) {
      lastOperationRef.current = type;
    }
    return lastOperationRef.current;
  };
  var nextActiveIndex = function nextActiveIndex2(nextValue) {
    var list = activeListRef.current;
    var filledActiveSet = new Set(list.filter(function(index) {
      return nextValue[index] || empty[index];
    }));
    var nextIndex = list[list.length - 1] === 0 ? 1 : 0;
    if (filledActiveSet.size >= 2 || disabled[nextIndex]) {
      return null;
    }
    return nextIndex;
  };
  useLockEffect(focused || mergedOpen, function() {
    if (!focused) {
      activeListRef.current = [];
      updateSubmitIndex(null);
    }
  });
  reactExports.useEffect(function() {
    if (focused) {
      activeListRef.current.push(activeIndex);
    }
  }, [focused, activeIndex]);
  return [focused, triggerFocus, lastOperation, activeIndex, setActiveIndex, nextActiveIndex, activeListRef.current, updateSubmitIndex, hasActiveSubmitValue];
}
function useRangeDisabledDate(values, disabled, activeIndexList, generateConfig2, locale2, disabledDate) {
  var activeIndex = activeIndexList[activeIndexList.length - 1];
  var rangeDisabledDate = function rangeDisabledDate2(date, info) {
    var _values = _slicedToArray(values, 2), start = _values[0], end = _values[1];
    var mergedInfo = _objectSpread2(_objectSpread2({}, info), {}, {
      from: getFromDate(values, activeIndexList)
    });
    if (activeIndex === 1 && disabled[0] && start && // Same date isOK
    !isSame(generateConfig2, locale2, start, date, mergedInfo.type) && // Before start date
    generateConfig2.isAfter(start, date)) {
      return true;
    }
    if (activeIndex === 0 && disabled[1] && end && // Same date isOK
    !isSame(generateConfig2, locale2, end, date, mergedInfo.type) && // After end date
    generateConfig2.isAfter(date, end)) {
      return true;
    }
    return disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, mergedInfo);
  };
  return rangeDisabledDate;
}
function offsetPanelDate(generateConfig2, picker, date, offset2) {
  switch (picker) {
    case "date":
    case "week":
      return generateConfig2.addMonth(date, offset2);
    case "month":
    case "quarter":
      return generateConfig2.addYear(date, offset2);
    case "year":
      return generateConfig2.addYear(date, offset2 * 10);
    case "decade":
      return generateConfig2.addYear(date, offset2 * 100);
    default:
      return date;
  }
}
var EMPTY_LIST$2 = [];
function useRangePickerValue(generateConfig2, locale2, calendarValue, modes, open, activeIndex, pickerMode, multiplePanel) {
  var defaultPickerValue = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : EMPTY_LIST$2;
  var pickerValue = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : EMPTY_LIST$2;
  var timeDefaultValue = arguments.length > 10 && arguments[10] !== void 0 ? arguments[10] : EMPTY_LIST$2;
  var onPickerValueChange = arguments.length > 11 ? arguments[11] : void 0;
  var minDate = arguments.length > 12 ? arguments[12] : void 0;
  var maxDate = arguments.length > 13 ? arguments[13] : void 0;
  var isTimePicker = pickerMode === "time";
  var mergedActiveIndex = activeIndex || 0;
  var getDefaultPickerValue = function getDefaultPickerValue2(index) {
    var now = generateConfig2.getNow();
    if (isTimePicker) {
      now = fillTime(generateConfig2, now);
    }
    return defaultPickerValue[index] || calendarValue[index] || now;
  };
  var _pickerValue = _slicedToArray(pickerValue, 2), startPickerValue = _pickerValue[0], endPickerValue = _pickerValue[1];
  var _useMergedState = useMergedState(function() {
    return getDefaultPickerValue(0);
  }, {
    value: startPickerValue
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedStartPickerValue = _useMergedState2[0], setStartPickerValue = _useMergedState2[1];
  var _useMergedState3 = useMergedState(function() {
    return getDefaultPickerValue(1);
  }, {
    value: endPickerValue
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), mergedEndPickerValue = _useMergedState4[0], setEndPickerValue = _useMergedState4[1];
  var currentPickerValue = reactExports.useMemo(function() {
    var current = [mergedStartPickerValue, mergedEndPickerValue][mergedActiveIndex];
    return isTimePicker ? current : fillTime(generateConfig2, current, timeDefaultValue[mergedActiveIndex]);
  }, [isTimePicker, mergedStartPickerValue, mergedEndPickerValue, mergedActiveIndex, generateConfig2, timeDefaultValue]);
  var setCurrentPickerValue = function setCurrentPickerValue2(nextPickerValue) {
    var source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "panel";
    var updater = [setStartPickerValue, setEndPickerValue][mergedActiveIndex];
    updater(nextPickerValue);
    var clone = [mergedStartPickerValue, mergedEndPickerValue];
    clone[mergedActiveIndex] = nextPickerValue;
    if (onPickerValueChange && (!isSame(generateConfig2, locale2, mergedStartPickerValue, clone[0], pickerMode) || !isSame(generateConfig2, locale2, mergedEndPickerValue, clone[1], pickerMode))) {
      onPickerValueChange(clone, {
        source,
        range: mergedActiveIndex === 1 ? "end" : "start",
        mode: modes
      });
    }
  };
  var getEndDatePickerValue = function getEndDatePickerValue2(startDate, endDate) {
    if (multiplePanel) {
      var SAME_CHECKER = {
        date: "month",
        week: "month",
        month: "year",
        quarter: "year"
      };
      var mode = SAME_CHECKER[pickerMode];
      if (mode && !isSame(generateConfig2, locale2, startDate, endDate, mode)) {
        return offsetPanelDate(generateConfig2, pickerMode, endDate, -1);
      }
      if (pickerMode === "year" && startDate) {
        var srcYear = Math.floor(generateConfig2.getYear(startDate) / 10);
        var tgtYear = Math.floor(generateConfig2.getYear(endDate) / 10);
        if (srcYear !== tgtYear) {
          return offsetPanelDate(generateConfig2, pickerMode, endDate, -1);
        }
      }
    }
    return endDate;
  };
  var prevActiveIndexRef = reactExports.useRef(null);
  useLayoutEffect(function() {
    if (open) {
      if (!defaultPickerValue[mergedActiveIndex]) {
        var nextPickerValue = isTimePicker ? null : generateConfig2.getNow();
        if (prevActiveIndexRef.current !== null && prevActiveIndexRef.current !== mergedActiveIndex) {
          nextPickerValue = [mergedStartPickerValue, mergedEndPickerValue][mergedActiveIndex ^ 1];
        } else if (calendarValue[mergedActiveIndex]) {
          nextPickerValue = mergedActiveIndex === 0 ? calendarValue[0] : getEndDatePickerValue(calendarValue[0], calendarValue[1]);
        } else if (calendarValue[mergedActiveIndex ^ 1]) {
          nextPickerValue = calendarValue[mergedActiveIndex ^ 1];
        }
        if (nextPickerValue) {
          if (minDate && generateConfig2.isAfter(minDate, nextPickerValue)) {
            nextPickerValue = minDate;
          }
          var offsetPickerValue = multiplePanel ? offsetPanelDate(generateConfig2, pickerMode, nextPickerValue, 1) : nextPickerValue;
          if (maxDate && generateConfig2.isAfter(offsetPickerValue, maxDate)) {
            nextPickerValue = multiplePanel ? offsetPanelDate(generateConfig2, pickerMode, maxDate, -1) : maxDate;
          }
          setCurrentPickerValue(nextPickerValue, "reset");
        }
      }
    }
  }, [open, mergedActiveIndex, calendarValue[mergedActiveIndex]]);
  reactExports.useEffect(function() {
    if (open) {
      prevActiveIndexRef.current = mergedActiveIndex;
    } else {
      prevActiveIndexRef.current = null;
    }
  }, [open, mergedActiveIndex]);
  useLayoutEffect(function() {
    if (open && defaultPickerValue) {
      if (defaultPickerValue[mergedActiveIndex]) {
        setCurrentPickerValue(defaultPickerValue[mergedActiveIndex], "reset");
      }
    }
  }, [open, mergedActiveIndex]);
  return [currentPickerValue, setCurrentPickerValue];
}
function useSyncState(defaultValue, controlledValue) {
  var valueRef = reactExports.useRef(defaultValue);
  var _React$useState = reactExports.useState({}), _React$useState2 = _slicedToArray(_React$useState, 2), forceUpdate = _React$useState2[1];
  var getter = function getter2(useControlledValueFirst) {
    return useControlledValueFirst && controlledValue !== void 0 ? controlledValue : valueRef.current;
  };
  var setter = function setter2(nextValue) {
    valueRef.current = nextValue;
    forceUpdate({});
  };
  return [getter, setter, getter(true)];
}
var EMPTY_VALUE = [];
function useUtil(generateConfig2, locale2, formatList) {
  var getDateTexts = function getDateTexts2(dates) {
    return dates.map(function(date) {
      return formatValue(date, {
        generateConfig: generateConfig2,
        locale: locale2,
        format: formatList[0]
      });
    });
  };
  var isSameDates = function isSameDates2(source, target) {
    var maxLen = Math.max(source.length, target.length);
    var diffIndex = -1;
    for (var i = 0; i < maxLen; i += 1) {
      var prev = source[i] || null;
      var next = target[i] || null;
      if (prev !== next && !isSameTimestamp(generateConfig2, prev, next)) {
        diffIndex = i;
        break;
      }
    }
    return [diffIndex < 0, diffIndex !== 0];
  };
  return [getDateTexts, isSameDates];
}
function orderDates(dates, generateConfig2) {
  return _toConsumableArray(dates).sort(function(a, b) {
    return generateConfig2.isAfter(a, b) ? 1 : -1;
  });
}
function useCalendarValue(mergedValue) {
  var _useSyncState = useSyncState(mergedValue), _useSyncState2 = _slicedToArray(_useSyncState, 2), calendarValue = _useSyncState2[0], setCalendarValue = _useSyncState2[1];
  var syncWithValue = useEvent(function() {
    setCalendarValue(mergedValue);
  });
  reactExports.useEffect(function() {
    syncWithValue();
  }, [mergedValue]);
  return [calendarValue, setCalendarValue];
}
function useInnerValue(generateConfig2, locale2, formatList, rangeValue, order, defaultValue, value, onCalendarChange, onOk) {
  var _useMergedState = useMergedState(defaultValue, {
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), innerValue = _useMergedState2[0], setInnerValue = _useMergedState2[1];
  var mergedValue = innerValue || EMPTY_VALUE;
  var _useCalendarValue = useCalendarValue(mergedValue), _useCalendarValue2 = _slicedToArray(_useCalendarValue, 2), calendarValue = _useCalendarValue2[0], setCalendarValue = _useCalendarValue2[1];
  var _useUtil = useUtil(generateConfig2, locale2, formatList), _useUtil2 = _slicedToArray(_useUtil, 2), getDateTexts = _useUtil2[0], isSameDates = _useUtil2[1];
  var triggerCalendarChange = useEvent(function(nextCalendarValues) {
    var clone = _toConsumableArray(nextCalendarValues);
    if (rangeValue) {
      for (var i = 0; i < 2; i += 1) {
        clone[i] = clone[i] || null;
      }
    } else if (order) {
      clone = orderDates(clone.filter(function(date) {
        return date;
      }), generateConfig2);
    }
    var _isSameDates = isSameDates(calendarValue(), clone), _isSameDates2 = _slicedToArray(_isSameDates, 2), isSameMergedDates = _isSameDates2[0], isSameStart = _isSameDates2[1];
    if (!isSameMergedDates) {
      setCalendarValue(clone);
      if (onCalendarChange) {
        var cellTexts = getDateTexts(clone);
        onCalendarChange(clone, cellTexts, {
          range: isSameStart ? "end" : "start"
        });
      }
    }
  });
  var triggerOk = function triggerOk2() {
    if (onOk) {
      onOk(calendarValue());
    }
  };
  return [mergedValue, setInnerValue, calendarValue, triggerCalendarChange, triggerOk];
}
function useRangeValue(info, mergedValue, setInnerValue, getCalendarValue, triggerCalendarChange, disabled, formatList, focused, open, isInvalidateDate) {
  var generateConfig2 = info.generateConfig, locale2 = info.locale, picker = info.picker, onChange = info.onChange, allowEmpty = info.allowEmpty, order = info.order;
  var orderOnChange = disabled.some(function(d) {
    return d;
  }) ? false : order;
  var _useUtil3 = useUtil(generateConfig2, locale2, formatList), _useUtil4 = _slicedToArray(_useUtil3, 2), getDateTexts = _useUtil4[0], isSameDates = _useUtil4[1];
  var _useSyncState3 = useSyncState(mergedValue), _useSyncState4 = _slicedToArray(_useSyncState3, 2), submitValue = _useSyncState4[0], setSubmitValue = _useSyncState4[1];
  var syncWithValue = useEvent(function() {
    setSubmitValue(mergedValue);
  });
  reactExports.useEffect(function() {
    syncWithValue();
  }, [mergedValue]);
  var triggerSubmit = useEvent(function(nextValue) {
    var isNullValue = nextValue === null;
    var clone = _toConsumableArray(nextValue || submitValue());
    if (isNullValue) {
      var maxLen = Math.max(disabled.length, clone.length);
      for (var i = 0; i < maxLen; i += 1) {
        if (!disabled[i]) {
          clone[i] = null;
        }
      }
    }
    if (orderOnChange && clone[0] && clone[1]) {
      clone = orderDates(clone, generateConfig2);
    }
    triggerCalendarChange(clone);
    var _clone = clone, _clone2 = _slicedToArray(_clone, 2), start = _clone2[0], end = _clone2[1];
    var startEmpty = !start;
    var endEmpty = !end;
    var validateEmptyDateRange = allowEmpty ? (
      // Validate empty start
      (!startEmpty || allowEmpty[0]) && // Validate empty end
      (!endEmpty || allowEmpty[1])
    ) : true;
    var validateOrder = !order || startEmpty || endEmpty || isSame(generateConfig2, locale2, start, end, picker) || generateConfig2.isAfter(end, start);
    var validateDates = (
      // Validate start
      (disabled[0] || !start || !isInvalidateDate(start, {
        activeIndex: 0
      })) && // Validate end
      (disabled[1] || !end || !isInvalidateDate(end, {
        from: start,
        activeIndex: 1
      }))
    );
    var allPassed = (
      // Null value is from clear button
      isNullValue || // Normal check
      validateEmptyDateRange && validateOrder && validateDates
    );
    if (allPassed) {
      setInnerValue(clone);
      var _isSameDates3 = isSameDates(clone, mergedValue), _isSameDates4 = _slicedToArray(_isSameDates3, 1), isSameMergedDates = _isSameDates4[0];
      if (onChange && !isSameMergedDates) {
        onChange(
          // Return null directly if all date are empty
          isNullValue && clone.every(function(val) {
            return !val;
          }) ? null : clone,
          getDateTexts(clone)
        );
      }
    }
    return allPassed;
  });
  var flushSubmit = useEvent(function(index, needTriggerChange) {
    var nextSubmitValue = fillIndex(submitValue(), index, getCalendarValue()[index]);
    setSubmitValue(nextSubmitValue);
    if (needTriggerChange) {
      triggerSubmit();
    }
  });
  var interactiveFinished = !focused && !open;
  useLockEffect(!interactiveFinished, function() {
    if (interactiveFinished) {
      triggerSubmit();
      triggerCalendarChange(mergedValue);
      syncWithValue();
    }
  }, 2);
  return [flushSubmit, triggerSubmit];
}
function useShowNow(picker, mode, showNow, showToday, rangePicker) {
  if (mode !== "date" && mode !== "time") {
    return false;
  }
  if (showNow !== void 0) {
    return showNow;
  }
  if (showToday !== void 0) {
    return showToday;
  }
  return !rangePicker && (picker === "date" || picker === "time");
}
function findValidateTime(date, getHourUnits, getMinuteUnits, getSecondUnits, getMillisecondUnits, generateConfig2) {
  var nextDate = date;
  function alignValidate(getUnitValue, setUnitValue, units) {
    var nextValue = generateConfig2[getUnitValue](nextDate);
    var nextUnit = units.find(function(unit2) {
      return unit2.value === nextValue;
    });
    if (!nextUnit || nextUnit.disabled) {
      var validateUnits = units.filter(function(unit2) {
        return !unit2.disabled;
      });
      var reverseEnabledUnits = _toConsumableArray(validateUnits).reverse();
      var validateUnit = reverseEnabledUnits.find(function(unit2) {
        return unit2.value <= nextValue;
      }) || validateUnits[0];
      if (validateUnit) {
        nextValue = validateUnit.value;
        nextDate = generateConfig2[setUnitValue](nextDate, nextValue);
      }
    }
    return nextValue;
  }
  var nextHour = alignValidate("getHour", "setHour", getHourUnits());
  var nextMinute = alignValidate("getMinute", "setMinute", getMinuteUnits(nextHour));
  var nextSecond = alignValidate("getSecond", "setSecond", getSecondUnits(nextHour, nextMinute));
  alignValidate("getMillisecond", "setMillisecond", getMillisecondUnits(nextHour, nextMinute, nextSecond));
  return nextDate;
}
function emptyDisabled() {
  return [];
}
function generateUnits(start, end) {
  var step = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  var hideDisabledOptions = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var disabledUnits = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
  var pad = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 2;
  var units = [];
  var integerStep = step >= 1 ? step | 0 : 1;
  for (var i = start; i <= end; i += integerStep) {
    var disabled = disabledUnits.includes(i);
    if (!disabled || !hideDisabledOptions) {
      units.push({
        label: leftPad(i, pad),
        value: i,
        disabled
      });
    }
  }
  return units;
}
function useTimeInfo(generateConfig2) {
  var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var date = arguments.length > 2 ? arguments[2] : void 0;
  var _ref = props || {}, use12Hours = _ref.use12Hours, _ref$hourStep = _ref.hourStep, hourStep = _ref$hourStep === void 0 ? 1 : _ref$hourStep, _ref$minuteStep = _ref.minuteStep, minuteStep = _ref$minuteStep === void 0 ? 1 : _ref$minuteStep, _ref$secondStep = _ref.secondStep, secondStep = _ref$secondStep === void 0 ? 1 : _ref$secondStep, _ref$millisecondStep = _ref.millisecondStep, millisecondStep = _ref$millisecondStep === void 0 ? 100 : _ref$millisecondStep, hideDisabledOptions = _ref.hideDisabledOptions, disabledTime = _ref.disabledTime, disabledHours = _ref.disabledHours, disabledMinutes = _ref.disabledMinutes, disabledSeconds = _ref.disabledSeconds;
  var mergedDate = reactExports.useMemo(function() {
    return date || generateConfig2.getNow();
  }, [date, generateConfig2]);
  var getDisabledTimes = reactExports.useCallback(function(targetDate) {
    var disabledConfig = (disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime(targetDate)) || {};
    return [disabledConfig.disabledHours || disabledHours || emptyDisabled, disabledConfig.disabledMinutes || disabledMinutes || emptyDisabled, disabledConfig.disabledSeconds || disabledSeconds || emptyDisabled, disabledConfig.disabledMilliseconds || emptyDisabled];
  }, [disabledTime, disabledHours, disabledMinutes, disabledSeconds]);
  var _React$useMemo = reactExports.useMemo(function() {
    return getDisabledTimes(mergedDate);
  }, [mergedDate, getDisabledTimes]), _React$useMemo2 = _slicedToArray(_React$useMemo, 4), mergedDisabledHours = _React$useMemo2[0], mergedDisabledMinutes = _React$useMemo2[1], mergedDisabledSeconds = _React$useMemo2[2], mergedDisabledMilliseconds = _React$useMemo2[3];
  var getAllUnits = reactExports.useCallback(function(getDisabledHours, getDisabledMinutes, getDisabledSeconds, getDisabledMilliseconds) {
    var hours = generateUnits(0, 23, hourStep, hideDisabledOptions, getDisabledHours());
    var rowHourUnits2 = use12Hours ? hours.map(function(unit2) {
      return _objectSpread2(_objectSpread2({}, unit2), {}, {
        label: leftPad(unit2.value % 12 || 12, 2)
      });
    }) : hours;
    var getMinuteUnits2 = function getMinuteUnits3(nextHour) {
      return generateUnits(0, 59, minuteStep, hideDisabledOptions, getDisabledMinutes(nextHour));
    };
    var getSecondUnits2 = function getSecondUnits3(nextHour, nextMinute) {
      return generateUnits(0, 59, secondStep, hideDisabledOptions, getDisabledSeconds(nextHour, nextMinute));
    };
    var getMillisecondUnits2 = function getMillisecondUnits3(nextHour, nextMinute, nextSecond) {
      return generateUnits(0, 999, millisecondStep, hideDisabledOptions, getDisabledMilliseconds(nextHour, nextMinute, nextSecond), 3);
    };
    return [rowHourUnits2, getMinuteUnits2, getSecondUnits2, getMillisecondUnits2];
  }, [hideDisabledOptions, hourStep, use12Hours, millisecondStep, minuteStep, secondStep]);
  var _React$useMemo3 = reactExports.useMemo(function() {
    return getAllUnits(mergedDisabledHours, mergedDisabledMinutes, mergedDisabledSeconds, mergedDisabledMilliseconds);
  }, [getAllUnits, mergedDisabledHours, mergedDisabledMinutes, mergedDisabledSeconds, mergedDisabledMilliseconds]), _React$useMemo4 = _slicedToArray(_React$useMemo3, 4), rowHourUnits = _React$useMemo4[0], getMinuteUnits = _React$useMemo4[1], getSecondUnits = _React$useMemo4[2], getMillisecondUnits = _React$useMemo4[3];
  var getValidTime = function getValidTime2(nextTime, certainDate) {
    var getCheckHourUnits = function getCheckHourUnits2() {
      return rowHourUnits;
    };
    var getCheckMinuteUnits = getMinuteUnits;
    var getCheckSecondUnits = getSecondUnits;
    var getCheckMillisecondUnits = getMillisecondUnits;
    if (certainDate) {
      var _getDisabledTimes = getDisabledTimes(certainDate), _getDisabledTimes2 = _slicedToArray(_getDisabledTimes, 4), targetDisabledHours = _getDisabledTimes2[0], targetDisabledMinutes = _getDisabledTimes2[1], targetDisabledSeconds = _getDisabledTimes2[2], targetDisabledMilliseconds = _getDisabledTimes2[3];
      var _getAllUnits = getAllUnits(targetDisabledHours, targetDisabledMinutes, targetDisabledSeconds, targetDisabledMilliseconds), _getAllUnits2 = _slicedToArray(_getAllUnits, 4), targetRowHourUnits = _getAllUnits2[0], targetGetMinuteUnits = _getAllUnits2[1], targetGetSecondUnits = _getAllUnits2[2], targetGetMillisecondUnits = _getAllUnits2[3];
      getCheckHourUnits = function getCheckHourUnits2() {
        return targetRowHourUnits;
      };
      getCheckMinuteUnits = targetGetMinuteUnits;
      getCheckSecondUnits = targetGetSecondUnits;
      getCheckMillisecondUnits = targetGetMillisecondUnits;
    }
    var validateDate = findValidateTime(nextTime, getCheckHourUnits, getCheckMinuteUnits, getCheckSecondUnits, getCheckMillisecondUnits, generateConfig2);
    return validateDate;
  };
  return [
    // getValidTime
    getValidTime,
    // Units
    rowHourUnits,
    getMinuteUnits,
    getSecondUnits,
    getMillisecondUnits
  ];
}
function Footer$2(props) {
  var mode = props.mode, internalMode = props.internalMode, renderExtraFooter = props.renderExtraFooter, showNow = props.showNow, showTime = props.showTime, onSubmit = props.onSubmit, onNow = props.onNow, invalid = props.invalid, needConfirm = props.needConfirm, generateConfig2 = props.generateConfig, disabledDate = props.disabledDate;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls, locale2 = _React$useContext.locale, _React$useContext$but = _React$useContext.button, Button2 = _React$useContext$but === void 0 ? "button" : _React$useContext$but;
  var now = generateConfig2.getNow();
  var _useTimeInfo = useTimeInfo(generateConfig2, showTime, now), _useTimeInfo2 = _slicedToArray(_useTimeInfo, 1), getValidTime = _useTimeInfo2[0];
  var extraNode = renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter(mode);
  var nowDisabled = disabledDate(now, {
    type: mode
  });
  var onInternalNow = function onInternalNow2() {
    if (!nowDisabled) {
      var validateNow = getValidTime(now);
      onNow(validateNow);
    }
  };
  var nowPrefixCls = "".concat(prefixCls, "-now");
  var nowBtnPrefixCls = "".concat(nowPrefixCls, "-btn");
  var presetNode = showNow && /* @__PURE__ */ reactExports.createElement("li", {
    className: nowPrefixCls
  }, /* @__PURE__ */ reactExports.createElement("a", {
    className: classNames(nowBtnPrefixCls, nowDisabled && "".concat(nowBtnPrefixCls, "-disabled")),
    "aria-disabled": nowDisabled,
    onClick: onInternalNow
  }, internalMode === "date" ? locale2.today : locale2.now));
  var okNode = needConfirm && /* @__PURE__ */ reactExports.createElement("li", {
    className: "".concat(prefixCls, "-ok")
  }, /* @__PURE__ */ reactExports.createElement(Button2, {
    disabled: invalid,
    onClick: onSubmit
  }, locale2.ok));
  var rangeNode = (presetNode || okNode) && /* @__PURE__ */ reactExports.createElement("ul", {
    className: "".concat(prefixCls, "-ranges")
  }, presetNode, okNode);
  if (!extraNode && !rangeNode) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-footer")
  }, extraNode && /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-footer-extra")
  }, extraNode), rangeNode);
}
function useToggleDates(generateConfig2, locale2, panelMode) {
  function toggleDates(list, target) {
    var index = list.findIndex(function(date) {
      return isSame(generateConfig2, locale2, date, target, panelMode);
    });
    if (index === -1) {
      return [].concat(_toConsumableArray(list), [target]);
    }
    var sliceList = _toConsumableArray(list);
    sliceList.splice(index, 1);
    return sliceList;
  }
  return toggleDates;
}
var PanelContext = /* @__PURE__ */ reactExports.createContext(null);
function usePanelContext() {
  return reactExports.useContext(PanelContext);
}
function useInfo(props, panelType) {
  var prefixCls = props.prefixCls, generateConfig2 = props.generateConfig, locale2 = props.locale, disabledDate = props.disabledDate, minDate = props.minDate, maxDate = props.maxDate, cellRender = props.cellRender, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue, onHover = props.onHover, values = props.values, pickerValue = props.pickerValue, onSelect = props.onSelect, prevIcon = props.prevIcon, nextIcon = props.nextIcon, superPrevIcon = props.superPrevIcon, superNextIcon = props.superNextIcon;
  var now = generateConfig2.getNow();
  var info = {
    now,
    values,
    pickerValue,
    prefixCls,
    disabledDate,
    minDate,
    maxDate,
    cellRender,
    hoverValue,
    hoverRangeValue,
    onHover,
    locale: locale2,
    generateConfig: generateConfig2,
    onSelect,
    panelType,
    // Icons
    prevIcon,
    nextIcon,
    superPrevIcon,
    superNextIcon
  };
  return [info, now];
}
var PickerHackContext = /* @__PURE__ */ reactExports.createContext({});
function PanelBody(props) {
  var rowNum = props.rowNum, colNum = props.colNum, baseDate = props.baseDate, getCellDate = props.getCellDate, prefixColumn = props.prefixColumn, rowClassName = props.rowClassName, titleFormat = props.titleFormat, getCellText = props.getCellText, getCellClassName = props.getCellClassName, headerCells = props.headerCells, _props$cellSelection = props.cellSelection, cellSelection = _props$cellSelection === void 0 ? true : _props$cellSelection, disabledDate = props.disabledDate;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, type = _usePanelContext.panelType, now = _usePanelContext.now, contextDisabledDate = _usePanelContext.disabledDate, cellRender = _usePanelContext.cellRender, onHover = _usePanelContext.onHover, hoverValue = _usePanelContext.hoverValue, hoverRangeValue = _usePanelContext.hoverRangeValue, generateConfig2 = _usePanelContext.generateConfig, values = _usePanelContext.values, locale2 = _usePanelContext.locale, onSelect = _usePanelContext.onSelect;
  var mergedDisabledDate = disabledDate || contextDisabledDate;
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var _React$useContext = reactExports.useContext(PickerHackContext), onCellDblClick = _React$useContext.onCellDblClick;
  var matchValues = function matchValues2(date) {
    return values.some(function(singleValue) {
      return singleValue && isSame(generateConfig2, locale2, date, singleValue, type);
    });
  };
  var rows = [];
  for (var row = 0; row < rowNum; row += 1) {
    var rowNode = [];
    var rowStartDate = void 0;
    var _loop = function _loop2() {
      var offset2 = row * colNum + col;
      var currentDate = getCellDate(baseDate, offset2);
      var disabled = mergedDisabledDate === null || mergedDisabledDate === void 0 ? void 0 : mergedDisabledDate(currentDate, {
        type
      });
      if (col === 0) {
        rowStartDate = currentDate;
        if (prefixColumn) {
          rowNode.push(prefixColumn(rowStartDate));
        }
      }
      var inRange = false;
      var rangeStart = false;
      var rangeEnd = false;
      if (cellSelection && hoverRangeValue) {
        var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2), hoverStart = _hoverRangeValue[0], hoverEnd = _hoverRangeValue[1];
        inRange = isInRange(generateConfig2, hoverStart, hoverEnd, currentDate);
        rangeStart = isSame(generateConfig2, locale2, currentDate, hoverStart, type);
        rangeEnd = isSame(generateConfig2, locale2, currentDate, hoverEnd, type);
      }
      var title = titleFormat ? formatValue(currentDate, {
        locale: locale2,
        format: titleFormat,
        generateConfig: generateConfig2
      }) : void 0;
      var inner = /* @__PURE__ */ reactExports.createElement("div", {
        className: "".concat(cellPrefixCls, "-inner")
      }, getCellText(currentDate));
      rowNode.push(/* @__PURE__ */ reactExports.createElement("td", {
        key: col,
        title,
        className: classNames(cellPrefixCls, _objectSpread2(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(cellPrefixCls, "-disabled"), disabled), "".concat(cellPrefixCls, "-hover"), (hoverValue || []).some(function(date) {
          return isSame(generateConfig2, locale2, currentDate, date, type);
        })), "".concat(cellPrefixCls, "-in-range"), inRange && !rangeStart && !rangeEnd), "".concat(cellPrefixCls, "-range-start"), rangeStart), "".concat(cellPrefixCls, "-range-end"), rangeEnd), "".concat(prefixCls, "-cell-selected"), !hoverRangeValue && // WeekPicker use row instead
        type !== "week" && matchValues(currentDate)), getCellClassName(currentDate))),
        onClick: function onClick() {
          if (!disabled) {
            onSelect(currentDate);
          }
        },
        onDoubleClick: function onDoubleClick() {
          if (!disabled && onCellDblClick) {
            onCellDblClick();
          }
        },
        onMouseEnter: function onMouseEnter() {
          if (!disabled) {
            onHover === null || onHover === void 0 || onHover(currentDate);
          }
        },
        onMouseLeave: function onMouseLeave() {
          if (!disabled) {
            onHover === null || onHover === void 0 || onHover(null);
          }
        }
      }, cellRender ? cellRender(currentDate, {
        prefixCls,
        originNode: inner,
        today: now,
        type,
        locale: locale2
      }) : inner));
    };
    for (var col = 0; col < colNum; col += 1) {
      _loop();
    }
    rows.push(/* @__PURE__ */ reactExports.createElement("tr", {
      key: row,
      className: rowClassName === null || rowClassName === void 0 ? void 0 : rowClassName(rowStartDate)
    }, rowNode));
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-body")
  }, /* @__PURE__ */ reactExports.createElement("table", {
    className: "".concat(prefixCls, "-content")
  }, headerCells && /* @__PURE__ */ reactExports.createElement("thead", null, /* @__PURE__ */ reactExports.createElement("tr", null, headerCells)), /* @__PURE__ */ reactExports.createElement("tbody", null, rows)));
}
var HIDDEN_STYLE$1 = {
  visibility: "hidden"
};
function PanelHeader(props) {
  var offset2 = props.offset, superOffset = props.superOffset, onChange = props.onChange, getStart = props.getStart, getEnd = props.getEnd, children = props.children;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, _usePanelContext$prev = _usePanelContext.prevIcon, prevIcon = _usePanelContext$prev === void 0 ? "‹" : _usePanelContext$prev, _usePanelContext$next = _usePanelContext.nextIcon, nextIcon = _usePanelContext$next === void 0 ? "›" : _usePanelContext$next, _usePanelContext$supe = _usePanelContext.superPrevIcon, superPrevIcon = _usePanelContext$supe === void 0 ? "«" : _usePanelContext$supe, _usePanelContext$supe2 = _usePanelContext.superNextIcon, superNextIcon = _usePanelContext$supe2 === void 0 ? "»" : _usePanelContext$supe2, minDate = _usePanelContext.minDate, maxDate = _usePanelContext.maxDate, generateConfig2 = _usePanelContext.generateConfig, locale2 = _usePanelContext.locale, pickerValue = _usePanelContext.pickerValue, type = _usePanelContext.panelType;
  var headerPrefixCls = "".concat(prefixCls, "-header");
  var _React$useContext = reactExports.useContext(PickerHackContext), hidePrev = _React$useContext.hidePrev, hideNext = _React$useContext.hideNext, hideHeader = _React$useContext.hideHeader;
  var disabledOffsetPrev = reactExports.useMemo(function() {
    if (!minDate || !offset2 || !getEnd) {
      return false;
    }
    var prevPanelLimitDate = getEnd(offset2(-1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, prevPanelLimitDate, minDate, type);
  }, [minDate, offset2, pickerValue, getEnd, generateConfig2, locale2, type]);
  var disabledSuperOffsetPrev = reactExports.useMemo(function() {
    if (!minDate || !superOffset || !getEnd) {
      return false;
    }
    var prevPanelLimitDate = getEnd(superOffset(-1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, prevPanelLimitDate, minDate, type);
  }, [minDate, superOffset, pickerValue, getEnd, generateConfig2, locale2, type]);
  var disabledOffsetNext = reactExports.useMemo(function() {
    if (!maxDate || !offset2 || !getStart) {
      return false;
    }
    var nextPanelLimitDate = getStart(offset2(1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, maxDate, nextPanelLimitDate, type);
  }, [maxDate, offset2, pickerValue, getStart, generateConfig2, locale2, type]);
  var disabledSuperOffsetNext = reactExports.useMemo(function() {
    if (!maxDate || !superOffset || !getStart) {
      return false;
    }
    var nextPanelLimitDate = getStart(superOffset(1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, maxDate, nextPanelLimitDate, type);
  }, [maxDate, superOffset, pickerValue, getStart, generateConfig2, locale2, type]);
  var onOffset = function onOffset2(distance) {
    if (offset2) {
      onChange(offset2(distance, pickerValue));
    }
  };
  var onSuperOffset = function onSuperOffset2(distance) {
    if (superOffset) {
      onChange(superOffset(distance, pickerValue));
    }
  };
  if (hideHeader) {
    return null;
  }
  var prevBtnCls = "".concat(headerPrefixCls, "-prev-btn");
  var nextBtnCls = "".concat(headerPrefixCls, "-next-btn");
  var superPrevBtnCls = "".concat(headerPrefixCls, "-super-prev-btn");
  var superNextBtnCls = "".concat(headerPrefixCls, "-super-next-btn");
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: headerPrefixCls
  }, superOffset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.previousYear,
    onClick: function onClick() {
      return onSuperOffset(-1);
    },
    tabIndex: -1,
    className: classNames(superPrevBtnCls, disabledSuperOffsetPrev && "".concat(superPrevBtnCls, "-disabled")),
    disabled: disabledSuperOffsetPrev,
    style: hidePrev ? HIDDEN_STYLE$1 : {}
  }, superPrevIcon), offset2 && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.previousMonth,
    onClick: function onClick() {
      return onOffset(-1);
    },
    tabIndex: -1,
    className: classNames(prevBtnCls, disabledOffsetPrev && "".concat(prevBtnCls, "-disabled")),
    disabled: disabledOffsetPrev,
    style: hidePrev ? HIDDEN_STYLE$1 : {}
  }, prevIcon), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(headerPrefixCls, "-view")
  }, children), offset2 && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.nextMonth,
    onClick: function onClick() {
      return onOffset(1);
    },
    tabIndex: -1,
    className: classNames(nextBtnCls, disabledOffsetNext && "".concat(nextBtnCls, "-disabled")),
    disabled: disabledOffsetNext,
    style: hideNext ? HIDDEN_STYLE$1 : {}
  }, nextIcon), superOffset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.nextYear,
    onClick: function onClick() {
      return onSuperOffset(1);
    },
    tabIndex: -1,
    className: classNames(superNextBtnCls, disabledSuperOffsetNext && "".concat(superNextBtnCls, "-disabled")),
    disabled: disabledSuperOffsetNext,
    style: hideNext ? HIDDEN_STYLE$1 : {}
  }, superNextIcon));
}
function DatePanel(props) {
  var prefixCls = props.prefixCls, _props$panelName = props.panelName, panelName = _props$panelName === void 0 ? "date" : _props$panelName, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange, _props$mode = props.mode, mode = _props$mode === void 0 ? "date" : _props$mode, disabledDate = props.disabledDate, onSelect = props.onSelect, onHover = props.onHover, showWeek = props.showWeek;
  var panelPrefixCls = "".concat(prefixCls, "-").concat(panelName, "-panel");
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var isWeek = mode === "week";
  var _useInfo = useInfo(props, mode), _useInfo2 = _slicedToArray(_useInfo, 2), info = _useInfo2[0], now = _useInfo2[1];
  var weekFirstDay = generateConfig2.locale.getWeekFirstDay(locale2.locale);
  var monthStartDate = generateConfig2.setDate(pickerValue, 1);
  var baseDate = getWeekStartDate(locale2.locale, generateConfig2, monthStartDate);
  var month = generateConfig2.getMonth(pickerValue);
  var showPrefixColumn = showWeek === void 0 ? isWeek : showWeek;
  var prefixColumn = showPrefixColumn ? function(date) {
    var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, {
      type: "week"
    });
    return /* @__PURE__ */ reactExports.createElement("td", {
      key: "week",
      className: classNames(cellPrefixCls, "".concat(cellPrefixCls, "-week"), _defineProperty({}, "".concat(cellPrefixCls, "-disabled"), disabled)),
      onClick: function onClick() {
        if (!disabled) {
          onSelect(date);
        }
      },
      onMouseEnter: function onMouseEnter() {
        if (!disabled) {
          onHover === null || onHover === void 0 || onHover(date);
        }
      },
      onMouseLeave: function onMouseLeave() {
        if (!disabled) {
          onHover === null || onHover === void 0 || onHover(null);
        }
      }
    }, /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(cellPrefixCls, "-inner")
    }, generateConfig2.locale.getWeek(locale2.locale, date)));
  } : null;
  var headerCells = [];
  var weekDaysLocale = locale2.shortWeekDays || (generateConfig2.locale.getShortWeekDays ? generateConfig2.locale.getShortWeekDays(locale2.locale) : []);
  if (prefixColumn) {
    headerCells.push(/* @__PURE__ */ reactExports.createElement("th", {
      key: "empty"
    }, /* @__PURE__ */ reactExports.createElement("span", {
      style: {
        width: 0,
        height: 0,
        position: "absolute",
        overflow: "hidden",
        opacity: 0
      }
    }, locale2.week)));
  }
  for (var i = 0; i < WEEK_DAY_COUNT; i += 1) {
    headerCells.push(/* @__PURE__ */ reactExports.createElement("th", {
      key: i
    }, weekDaysLocale[(i + weekFirstDay) % WEEK_DAY_COUNT]));
  }
  var getCellDate = function getCellDate2(date, offset2) {
    return generateConfig2.addDate(date, offset2);
  };
  var getCellText = function getCellText2(date) {
    return formatValue(date, {
      locale: locale2,
      format: locale2.cellDateFormat,
      generateConfig: generateConfig2
    });
  };
  var getCellClassName = function getCellClassName2(date) {
    var classObj = _defineProperty(_defineProperty({}, "".concat(prefixCls, "-cell-in-view"), isSameMonth(generateConfig2, date, pickerValue)), "".concat(prefixCls, "-cell-today"), isSameDate(generateConfig2, date, now));
    return classObj;
  };
  var monthsLocale = locale2.shortMonths || (generateConfig2.locale.getShortMonths ? generateConfig2.locale.getShortMonths(locale2.locale) : []);
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.yearSelect,
    key: "year",
    onClick: function onClick() {
      onModeChange("year", pickerValue);
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, formatValue(pickerValue, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  var monthNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.monthSelect,
    key: "month",
    onClick: function onClick() {
      onModeChange("month", pickerValue);
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-month-btn")
  }, locale2.monthFormat ? formatValue(pickerValue, {
    locale: locale2,
    format: locale2.monthFormat,
    generateConfig: generateConfig2
  }) : monthsLocale[month]);
  var monthYearNodes = locale2.monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(panelPrefixCls, showWeek && "".concat(panelPrefixCls, "-show-week"))
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    offset: function offset2(distance) {
      return generateConfig2.addMonth(pickerValue, distance);
    },
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance);
    },
    onChange: onPickerValueChange,
    getStart: function getStart(date) {
      return generateConfig2.setDate(date, 1);
    },
    getEnd: function getEnd(date) {
      var clone = generateConfig2.setDate(date, 1);
      clone = generateConfig2.addMonth(clone, 1);
      return generateConfig2.addDate(clone, -1);
    }
  }, monthYearNodes), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends({
    titleFormat: locale2.fieldDateFormat
  }, props, {
    colNum: WEEK_DAY_COUNT,
    rowNum: 6,
    baseDate,
    headerCells,
    getCellDate,
    getCellText,
    getCellClassName,
    prefixColumn,
    cellSelection: !isWeek
  }))));
}
var SPEED_PTG = 1 / 3;
function useScrollTo(ulRef, value) {
  var scrollingRef = reactExports.useRef(false);
  var scrollRafRef = reactExports.useRef(null);
  var scrollDistRef = reactExports.useRef(null);
  var isScrolling = function isScrolling2() {
    return scrollingRef.current;
  };
  var stopScroll = function stopScroll2() {
    wrapperRaf.cancel(scrollRafRef.current);
    scrollingRef.current = false;
  };
  var scrollRafTimesRef = reactExports.useRef();
  var startScroll = function startScroll2() {
    var ul = ulRef.current;
    scrollDistRef.current = null;
    scrollRafTimesRef.current = 0;
    if (ul) {
      var targetLi = ul.querySelector('[data-value="'.concat(value, '"]'));
      var firstLi = ul.querySelector("li");
      var doScroll = function doScroll2() {
        stopScroll();
        scrollingRef.current = true;
        scrollRafTimesRef.current += 1;
        var currentTop = ul.scrollTop;
        var firstLiTop = firstLi.offsetTop;
        var targetLiTop = targetLi.offsetTop;
        var targetTop = targetLiTop - firstLiTop;
        if (targetLiTop === 0 && targetLi !== firstLi || !isVisible(ul)) {
          if (scrollRafTimesRef.current <= 5) {
            scrollRafRef.current = wrapperRaf(doScroll2);
          }
          return;
        }
        var nextTop = currentTop + (targetTop - currentTop) * SPEED_PTG;
        var dist = Math.abs(targetTop - nextTop);
        if (scrollDistRef.current !== null && scrollDistRef.current < dist) {
          stopScroll();
          return;
        }
        scrollDistRef.current = dist;
        if (dist <= 1) {
          ul.scrollTop = targetTop;
          stopScroll();
          return;
        }
        ul.scrollTop = nextTop;
        scrollRafRef.current = wrapperRaf(doScroll2);
      };
      if (targetLi && firstLi) {
        doScroll();
      }
    }
  };
  var syncScroll = useEvent(startScroll);
  return [syncScroll, stopScroll, isScrolling];
}
var SCROLL_DELAY = 300;
function flattenUnits(units) {
  return units.map(function(_ref) {
    var value = _ref.value, label = _ref.label, disabled = _ref.disabled;
    return [value, label, disabled].join(",");
  }).join(";");
}
function TimeColumn(props) {
  var units = props.units, value = props.value, optionalValue = props.optionalValue, type = props.type, onChange = props.onChange, onHover = props.onHover, onDblClick = props.onDblClick, changeOnScroll = props.changeOnScroll;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, cellRender = _usePanelContext.cellRender, now = _usePanelContext.now, locale2 = _usePanelContext.locale;
  var panelPrefixCls = "".concat(prefixCls, "-time-panel");
  var cellPrefixCls = "".concat(prefixCls, "-time-panel-cell");
  var ulRef = reactExports.useRef(null);
  var checkDelayRef = reactExports.useRef();
  var clearDelayCheck = function clearDelayCheck2() {
    clearTimeout(checkDelayRef.current);
  };
  var _useScrollTo = useScrollTo(ulRef, value !== null && value !== void 0 ? value : optionalValue), _useScrollTo2 = _slicedToArray(_useScrollTo, 3), syncScroll = _useScrollTo2[0], stopScroll = _useScrollTo2[1], isScrolling = _useScrollTo2[2];
  useLayoutEffect(function() {
    syncScroll();
    clearDelayCheck();
    return function() {
      stopScroll();
      clearDelayCheck();
    };
  }, [value, optionalValue, flattenUnits(units)]);
  var onInternalScroll = function onInternalScroll2(event) {
    clearDelayCheck();
    var target = event.target;
    if (!isScrolling() && changeOnScroll) {
      checkDelayRef.current = setTimeout(function() {
        var ul = ulRef.current;
        var firstLiTop = ul.querySelector("li").offsetTop;
        var liList = Array.from(ul.querySelectorAll("li"));
        var liTopList = liList.map(function(li) {
          return li.offsetTop - firstLiTop;
        });
        var liDistList = liTopList.map(function(top, index) {
          if (units[index].disabled) {
            return Number.MAX_SAFE_INTEGER;
          }
          return Math.abs(top - target.scrollTop);
        });
        var minDist = Math.min.apply(Math, _toConsumableArray(liDistList));
        var minDistIndex = liDistList.findIndex(function(dist) {
          return dist === minDist;
        });
        var targetUnit = units[minDistIndex];
        if (targetUnit && !targetUnit.disabled) {
          onChange(targetUnit.value);
        }
      }, SCROLL_DELAY);
    }
  };
  var columnPrefixCls = "".concat(panelPrefixCls, "-column");
  return /* @__PURE__ */ reactExports.createElement("ul", {
    className: columnPrefixCls,
    ref: ulRef,
    "data-type": type,
    onScroll: onInternalScroll
  }, units.map(function(_ref2) {
    var label = _ref2.label, unitValue = _ref2.value, disabled = _ref2.disabled;
    var inner = /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(cellPrefixCls, "-inner")
    }, label);
    return /* @__PURE__ */ reactExports.createElement("li", {
      key: unitValue,
      className: classNames(cellPrefixCls, _defineProperty(_defineProperty({}, "".concat(cellPrefixCls, "-selected"), value === unitValue), "".concat(cellPrefixCls, "-disabled"), disabled)),
      onClick: function onClick() {
        if (!disabled) {
          onChange(unitValue);
        }
      },
      onDoubleClick: function onDoubleClick() {
        if (!disabled && onDblClick) {
          onDblClick();
        }
      },
      onMouseEnter: function onMouseEnter() {
        onHover(unitValue);
      },
      onMouseLeave: function onMouseLeave() {
        onHover(null);
      },
      "data-value": unitValue
    }, cellRender ? cellRender(unitValue, {
      prefixCls,
      originNode: inner,
      today: now,
      type: "time",
      subType: type,
      locale: locale2
    }) : inner);
  }));
}
function isAM(hour) {
  return hour < 12;
}
function TimePanelBody(props) {
  var showHour = props.showHour, showMinute = props.showMinute, showSecond = props.showSecond, showMillisecond = props.showMillisecond, showMeridiem = props.use12Hours, changeOnScroll = props.changeOnScroll;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, values = _usePanelContext.values, generateConfig2 = _usePanelContext.generateConfig, locale2 = _usePanelContext.locale, onSelect = _usePanelContext.onSelect, _usePanelContext$onHo = _usePanelContext.onHover, onHover = _usePanelContext$onHo === void 0 ? function() {
  } : _usePanelContext$onHo, pickerValue = _usePanelContext.pickerValue;
  var value = (values === null || values === void 0 ? void 0 : values[0]) || null;
  var _React$useContext = reactExports.useContext(PickerHackContext), onCellDblClick = _React$useContext.onCellDblClick;
  var _useTimeInfo = useTimeInfo(generateConfig2, props, value), _useTimeInfo2 = _slicedToArray(_useTimeInfo, 5), getValidTime = _useTimeInfo2[0], rowHourUnits = _useTimeInfo2[1], getMinuteUnits = _useTimeInfo2[2], getSecondUnits = _useTimeInfo2[3], getMillisecondUnits = _useTimeInfo2[4];
  var getUnitValue = function getUnitValue2(func) {
    var valueUnitVal = value && generateConfig2[func](value);
    var pickerUnitValue = pickerValue && generateConfig2[func](pickerValue);
    return [valueUnitVal, pickerUnitValue];
  };
  var _getUnitValue = getUnitValue("getHour"), _getUnitValue2 = _slicedToArray(_getUnitValue, 2), hour = _getUnitValue2[0], pickerHour = _getUnitValue2[1];
  var _getUnitValue3 = getUnitValue("getMinute"), _getUnitValue4 = _slicedToArray(_getUnitValue3, 2), minute = _getUnitValue4[0], pickerMinute = _getUnitValue4[1];
  var _getUnitValue5 = getUnitValue("getSecond"), _getUnitValue6 = _slicedToArray(_getUnitValue5, 2), second = _getUnitValue6[0], pickerSecond = _getUnitValue6[1];
  var _getUnitValue7 = getUnitValue("getMillisecond"), _getUnitValue8 = _slicedToArray(_getUnitValue7, 2), millisecond = _getUnitValue8[0], pickerMillisecond = _getUnitValue8[1];
  var meridiem = hour === null ? null : isAM(hour) ? "am" : "pm";
  var hourUnits = reactExports.useMemo(function() {
    if (!showMeridiem) {
      return rowHourUnits;
    }
    return isAM(hour) ? rowHourUnits.filter(function(h) {
      return isAM(h.value);
    }) : rowHourUnits.filter(function(h) {
      return !isAM(h.value);
    });
  }, [hour, rowHourUnits, showMeridiem]);
  var getEnabled = function getEnabled2(units, val) {
    var _enabledUnits$;
    var enabledUnits = units.filter(function(unit2) {
      return !unit2.disabled;
    });
    return val !== null && val !== void 0 ? val : (
      // Fallback to enabled value
      enabledUnits === null || enabledUnits === void 0 || (_enabledUnits$ = enabledUnits[0]) === null || _enabledUnits$ === void 0 ? void 0 : _enabledUnits$.value
    );
  };
  var validHour = getEnabled(rowHourUnits, hour);
  var minuteUnits = reactExports.useMemo(function() {
    return getMinuteUnits(validHour);
  }, [getMinuteUnits, validHour]);
  var validMinute = getEnabled(minuteUnits, minute);
  var secondUnits = reactExports.useMemo(function() {
    return getSecondUnits(validHour, validMinute);
  }, [getSecondUnits, validHour, validMinute]);
  var validSecond = getEnabled(secondUnits, second);
  var millisecondUnits = reactExports.useMemo(function() {
    return getMillisecondUnits(validHour, validMinute, validSecond);
  }, [getMillisecondUnits, validHour, validMinute, validSecond]);
  var validMillisecond = getEnabled(millisecondUnits, millisecond);
  var meridiemUnits = reactExports.useMemo(function() {
    if (!showMeridiem) {
      return [];
    }
    var base = generateConfig2.getNow();
    var amDate = generateConfig2.setHour(base, 6);
    var pmDate = generateConfig2.setHour(base, 18);
    var formatMeridiem = function formatMeridiem2(date, defaultLabel) {
      var cellMeridiemFormat = locale2.cellMeridiemFormat;
      return cellMeridiemFormat ? formatValue(date, {
        generateConfig: generateConfig2,
        locale: locale2,
        format: cellMeridiemFormat
      }) : defaultLabel;
    };
    return [{
      label: formatMeridiem(amDate, "AM"),
      value: "am",
      disabled: rowHourUnits.every(function(h) {
        return h.disabled || !isAM(h.value);
      })
    }, {
      label: formatMeridiem(pmDate, "PM"),
      value: "pm",
      disabled: rowHourUnits.every(function(h) {
        return h.disabled || isAM(h.value);
      })
    }];
  }, [rowHourUnits, showMeridiem, generateConfig2, locale2]);
  var triggerChange = function triggerChange2(nextDate) {
    var validateDate = getValidTime(nextDate);
    onSelect(validateDate);
  };
  var triggerDateTmpl = reactExports.useMemo(function() {
    var tmpl = value || pickerValue || generateConfig2.getNow();
    var isNotNull = function isNotNull2(num) {
      return num !== null && num !== void 0;
    };
    if (isNotNull(hour)) {
      tmpl = generateConfig2.setHour(tmpl, hour);
      tmpl = generateConfig2.setMinute(tmpl, minute);
      tmpl = generateConfig2.setSecond(tmpl, second);
      tmpl = generateConfig2.setMillisecond(tmpl, millisecond);
    } else if (isNotNull(pickerHour)) {
      tmpl = generateConfig2.setHour(tmpl, pickerHour);
      tmpl = generateConfig2.setMinute(tmpl, pickerMinute);
      tmpl = generateConfig2.setSecond(tmpl, pickerSecond);
      tmpl = generateConfig2.setMillisecond(tmpl, pickerMillisecond);
    } else if (isNotNull(validHour)) {
      tmpl = generateConfig2.setHour(tmpl, validHour);
      tmpl = generateConfig2.setMinute(tmpl, validMinute);
      tmpl = generateConfig2.setSecond(tmpl, validSecond);
      tmpl = generateConfig2.setMillisecond(tmpl, validMillisecond);
    }
    return tmpl;
  }, [value, pickerValue, hour, minute, second, millisecond, validHour, validMinute, validSecond, validMillisecond, pickerHour, pickerMinute, pickerSecond, pickerMillisecond, generateConfig2]);
  var fillColumnValue = function fillColumnValue2(val, func) {
    if (val === null) {
      return null;
    }
    return generateConfig2[func](triggerDateTmpl, val);
  };
  var getNextHourTime = function getNextHourTime2(val) {
    return fillColumnValue(val, "setHour");
  };
  var getNextMinuteTime = function getNextMinuteTime2(val) {
    return fillColumnValue(val, "setMinute");
  };
  var getNextSecondTime = function getNextSecondTime2(val) {
    return fillColumnValue(val, "setSecond");
  };
  var getNextMillisecondTime = function getNextMillisecondTime2(val) {
    return fillColumnValue(val, "setMillisecond");
  };
  var getMeridiemTime = function getMeridiemTime2(val) {
    if (val === null) {
      return null;
    }
    if (val === "am" && !isAM(hour)) {
      return generateConfig2.setHour(triggerDateTmpl, hour - 12);
    } else if (val === "pm" && isAM(hour)) {
      return generateConfig2.setHour(triggerDateTmpl, hour + 12);
    }
    return triggerDateTmpl;
  };
  var onHourChange = function onHourChange2(val) {
    triggerChange(getNextHourTime(val));
  };
  var onMinuteChange = function onMinuteChange2(val) {
    triggerChange(getNextMinuteTime(val));
  };
  var onSecondChange = function onSecondChange2(val) {
    triggerChange(getNextSecondTime(val));
  };
  var onMillisecondChange = function onMillisecondChange2(val) {
    triggerChange(getNextMillisecondTime(val));
  };
  var onMeridiemChange = function onMeridiemChange2(val) {
    triggerChange(getMeridiemTime(val));
  };
  var onHourHover = function onHourHover2(val) {
    onHover(getNextHourTime(val));
  };
  var onMinuteHover = function onMinuteHover2(val) {
    onHover(getNextMinuteTime(val));
  };
  var onSecondHover = function onSecondHover2(val) {
    onHover(getNextSecondTime(val));
  };
  var onMillisecondHover = function onMillisecondHover2(val) {
    onHover(getNextMillisecondTime(val));
  };
  var onMeridiemHover = function onMeridiemHover2(val) {
    onHover(getMeridiemTime(val));
  };
  var sharedColumnProps = {
    onDblClick: onCellDblClick,
    changeOnScroll
  };
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-content")
  }, showHour && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends({
    units: hourUnits,
    value: hour,
    optionalValue: pickerHour,
    type: "hour",
    onChange: onHourChange,
    onHover: onHourHover
  }, sharedColumnProps)), showMinute && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends({
    units: minuteUnits,
    value: minute,
    optionalValue: pickerMinute,
    type: "minute",
    onChange: onMinuteChange,
    onHover: onMinuteHover
  }, sharedColumnProps)), showSecond && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends({
    units: secondUnits,
    value: second,
    optionalValue: pickerSecond,
    type: "second",
    onChange: onSecondChange,
    onHover: onSecondHover
  }, sharedColumnProps)), showMillisecond && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends({
    units: millisecondUnits,
    value: millisecond,
    optionalValue: pickerMillisecond,
    type: "millisecond",
    onChange: onMillisecondChange,
    onHover: onMillisecondHover
  }, sharedColumnProps)), showMeridiem && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends({
    units: meridiemUnits,
    value: meridiem,
    type: "meridiem",
    onChange: onMeridiemChange,
    onHover: onMeridiemHover
  }, sharedColumnProps)));
}
function TimePanel(props) {
  var prefixCls = props.prefixCls, value = props.value, locale2 = props.locale, generateConfig2 = props.generateConfig, showTime = props.showTime;
  var _ref = showTime || {}, format2 = _ref.format;
  var panelPrefixCls = "".concat(prefixCls, "-time-panel");
  var _useInfo = useInfo(props, "time"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(panelPrefixCls)
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, null, value ? formatValue(value, {
    locale: locale2,
    format: format2,
    generateConfig: generateConfig2
  }) : " "), /* @__PURE__ */ reactExports.createElement(TimePanelBody, showTime)));
}
function DateTimePanel(props) {
  var prefixCls = props.prefixCls, generateConfig2 = props.generateConfig, showTime = props.showTime, onSelect = props.onSelect, value = props.value, pickerValue = props.pickerValue, onHover = props.onHover;
  var panelPrefixCls = "".concat(prefixCls, "-datetime-panel");
  var _useTimeInfo = useTimeInfo(generateConfig2, showTime), _useTimeInfo2 = _slicedToArray(_useTimeInfo, 1), getValidTime = _useTimeInfo2[0];
  var mergeTime = function mergeTime2(date) {
    if (value) {
      return fillTime(generateConfig2, date, value);
    }
    return fillTime(generateConfig2, date, pickerValue);
  };
  var onDateHover = function onDateHover2(date) {
    onHover === null || onHover === void 0 || onHover(date ? mergeTime(date) : date);
  };
  var onDateSelect = function onDateSelect2(date) {
    var cloneDate = mergeTime(date);
    onSelect(getValidTime(cloneDate, cloneDate));
  };
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(DatePanel, _extends({}, props, {
    onSelect: onDateSelect,
    onHover: onDateHover
  })), /* @__PURE__ */ reactExports.createElement(TimePanel, props));
}
function DecadePanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange;
  var panelPrefixCls = "".concat(prefixCls, "-decade-panel");
  var _useInfo = useInfo(props, "decade"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  var getStartYear = function getStartYear2(date) {
    var startYear = Math.floor(generateConfig2.getYear(date) / 100) * 100;
    return generateConfig2.setYear(date, startYear);
  };
  var getEndYear = function getEndYear2(date) {
    var startYear = getStartYear(date);
    return generateConfig2.addYear(startYear, 99);
  };
  var startYearDate = getStartYear(pickerValue);
  var endYearDate = getEndYear(pickerValue);
  var baseDate = generateConfig2.addYear(startYearDate, -10);
  var getCellDate = function getCellDate2(date, offset2) {
    return generateConfig2.addYear(date, offset2 * 10);
  };
  var getCellText = function getCellText2(date) {
    var cellYearFormat = locale2.cellYearFormat;
    var startYearStr = formatValue(date, {
      locale: locale2,
      format: cellYearFormat,
      generateConfig: generateConfig2
    });
    var endYearStr = formatValue(generateConfig2.addYear(date, 9), {
      locale: locale2,
      format: cellYearFormat,
      generateConfig: generateConfig2
    });
    return "".concat(startYearStr, "-").concat(endYearStr);
  };
  var getCellClassName = function getCellClassName2(date) {
    return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), isSameDecade(generateConfig2, date, startYearDate) || isSameDecade(generateConfig2, date, endYearDate) || isInRange(generateConfig2, startYearDate, endYearDate, date));
  };
  var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
    var baseStartDate = generateConfig2.setDate(currentDate, 1);
    var baseStartMonth = generateConfig2.setMonth(baseStartDate, 0);
    var baseStartYear = generateConfig2.setYear(baseStartMonth, Math.floor(generateConfig2.getYear(baseStartMonth) / 10) * 10);
    var baseEndYear = generateConfig2.addYear(baseStartYear, 10);
    var baseEndDate = generateConfig2.addDate(baseEndYear, -1);
    return disabledDate(baseStartYear, disabledInfo) && disabledDate(baseEndDate, disabledInfo);
  } : null;
  var yearNode = "".concat(formatValue(startYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }), "-").concat(formatValue(endYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance * 100);
    },
    onChange: onPickerValueChange,
    getStart: getStartYear,
    getEnd: getEndYear
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends({}, props, {
    disabledDate: mergedDisabledDate,
    colNum: 3,
    rowNum: 4,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function MonthPanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
  var panelPrefixCls = "".concat(prefixCls, "-month-panel");
  var _useInfo = useInfo(props, "month"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  var baseDate = generateConfig2.setMonth(pickerValue, 0);
  var monthsLocale = locale2.shortMonths || (generateConfig2.locale.getShortMonths ? generateConfig2.locale.getShortMonths(locale2.locale) : []);
  var getCellDate = function getCellDate2(date, offset2) {
    return generateConfig2.addMonth(date, offset2);
  };
  var getCellText = function getCellText2(date) {
    var month = generateConfig2.getMonth(date);
    return locale2.monthFormat ? formatValue(date, {
      locale: locale2,
      format: locale2.monthFormat,
      generateConfig: generateConfig2
    }) : monthsLocale[month];
  };
  var getCellClassName = function getCellClassName2() {
    return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), true);
  };
  var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
    var startDate = generateConfig2.setDate(currentDate, 1);
    var nextMonthStartDate = generateConfig2.setMonth(startDate, generateConfig2.getMonth(startDate) + 1);
    var endDate = generateConfig2.addDate(nextMonthStartDate, -1);
    return disabledDate(startDate, disabledInfo) && disabledDate(endDate, disabledInfo);
  } : null;
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    key: "year",
    "aria-label": locale2.yearSelect,
    onClick: function onClick() {
      onModeChange("year");
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, formatValue(pickerValue, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance);
    },
    onChange: onPickerValueChange,
    getStart: function getStart(date) {
      return generateConfig2.setMonth(date, 0);
    },
    getEnd: function getEnd(date) {
      return generateConfig2.setMonth(date, 11);
    }
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends({}, props, {
    disabledDate: mergedDisabledDate,
    titleFormat: locale2.fieldMonthFormat,
    colNum: 3,
    rowNum: 4,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function QuarterPanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
  var panelPrefixCls = "".concat(prefixCls, "-quarter-panel");
  var _useInfo = useInfo(props, "quarter"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  var baseDate = generateConfig2.setMonth(pickerValue, 0);
  var getCellDate = function getCellDate2(date, offset2) {
    return generateConfig2.addMonth(date, offset2 * 3);
  };
  var getCellText = function getCellText2(date) {
    return formatValue(date, {
      locale: locale2,
      format: locale2.cellQuarterFormat,
      generateConfig: generateConfig2
    });
  };
  var getCellClassName = function getCellClassName2() {
    return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), true);
  };
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    key: "year",
    "aria-label": locale2.yearSelect,
    onClick: function onClick() {
      onModeChange("year");
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, formatValue(pickerValue, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance);
    },
    onChange: onPickerValueChange,
    getStart: function getStart(date) {
      return generateConfig2.setMonth(date, 0);
    },
    getEnd: function getEnd(date) {
      return generateConfig2.setMonth(date, 11);
    }
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends({}, props, {
    titleFormat: locale2.fieldQuarterFormat,
    colNum: 4,
    rowNum: 1,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function WeekPanel(props) {
  var prefixCls = props.prefixCls, generateConfig2 = props.generateConfig, locale2 = props.locale, value = props.value, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue;
  var localeName = locale2.locale;
  var rowPrefixCls = "".concat(prefixCls, "-week-panel-row");
  var rowClassName = function rowClassName2(currentDate) {
    var rangeCls = {};
    if (hoverRangeValue) {
      var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2), rangeStart = _hoverRangeValue[0], rangeEnd = _hoverRangeValue[1];
      var isRangeStart = isSameWeek(generateConfig2, localeName, rangeStart, currentDate);
      var isRangeEnd = isSameWeek(generateConfig2, localeName, rangeEnd, currentDate);
      rangeCls["".concat(rowPrefixCls, "-range-start")] = isRangeStart;
      rangeCls["".concat(rowPrefixCls, "-range-end")] = isRangeEnd;
      rangeCls["".concat(rowPrefixCls, "-range-hover")] = !isRangeStart && !isRangeEnd && isInRange(generateConfig2, rangeStart, rangeEnd, currentDate);
    }
    if (hoverValue) {
      rangeCls["".concat(rowPrefixCls, "-hover")] = hoverValue.some(function(date) {
        return isSameWeek(generateConfig2, localeName, currentDate, date);
      });
    }
    return classNames(
      rowPrefixCls,
      _defineProperty({}, "".concat(rowPrefixCls, "-selected"), !hoverRangeValue && isSameWeek(generateConfig2, localeName, value, currentDate)),
      // Patch for hover range
      rangeCls
    );
  };
  return /* @__PURE__ */ reactExports.createElement(DatePanel, _extends({}, props, {
    mode: "week",
    panelName: "week",
    rowClassName
  }));
}
function YearPanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
  var panelPrefixCls = "".concat(prefixCls, "-year-panel");
  var _useInfo = useInfo(props, "year"), _useInfo2 = _slicedToArray(_useInfo, 1), info = _useInfo2[0];
  var getStartYear = function getStartYear2(date) {
    var startYear = Math.floor(generateConfig2.getYear(date) / 10) * 10;
    return generateConfig2.setYear(date, startYear);
  };
  var getEndYear = function getEndYear2(date) {
    var startYear = getStartYear(date);
    return generateConfig2.addYear(startYear, 9);
  };
  var startYearDate = getStartYear(pickerValue);
  var endYearDate = getEndYear(pickerValue);
  var baseDate = generateConfig2.addYear(startYearDate, -1);
  var getCellDate = function getCellDate2(date, offset2) {
    return generateConfig2.addYear(date, offset2);
  };
  var getCellText = function getCellText2(date) {
    return formatValue(date, {
      locale: locale2,
      format: locale2.cellYearFormat,
      generateConfig: generateConfig2
    });
  };
  var getCellClassName = function getCellClassName2(date) {
    return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), isSameYear(generateConfig2, date, startYearDate) || isSameYear(generateConfig2, date, endYearDate) || isInRange(generateConfig2, startYearDate, endYearDate, date));
  };
  var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
    var startMonth = generateConfig2.setMonth(currentDate, 0);
    var startDate = generateConfig2.setDate(startMonth, 1);
    var endMonth = generateConfig2.addYear(startDate, 1);
    var endDate = generateConfig2.addDate(endMonth, -1);
    return disabledDate(startDate, disabledInfo) && disabledDate(endDate, disabledInfo);
  } : null;
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    key: "decade",
    "aria-label": locale2.decadeSelect,
    onClick: function onClick() {
      onModeChange("decade");
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-decade-btn")
  }, formatValue(startYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }), "-", formatValue(endYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance * 10);
    },
    onChange: onPickerValueChange,
    getStart: getStartYear,
    getEnd: getEndYear
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends({}, props, {
    disabledDate: mergedDisabledDate,
    titleFormat: locale2.fieldYearFormat,
    colNum: 3,
    rowNum: 4,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
var DefaultComponents = {
  date: DatePanel,
  datetime: DateTimePanel,
  week: WeekPanel,
  month: MonthPanel,
  quarter: QuarterPanel,
  year: YearPanel,
  decade: DecadePanel,
  time: TimePanel
};
function PickerPanel(props, ref) {
  var _React$useContext;
  var locale2 = props.locale, generateConfig2 = props.generateConfig, direction = props.direction, prefixCls = props.prefixCls, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, multiple = props.multiple, defaultValue = props.defaultValue, value = props.value, onChange = props.onChange, onSelect = props.onSelect, defaultPickerValue = props.defaultPickerValue, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, mode = props.mode, onPanelChange = props.onPanelChange, _props$picker = props.picker, picker = _props$picker === void 0 ? "date" : _props$picker, showTime = props.showTime, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue, cellRender = props.cellRender, dateRender = props.dateRender, monthCellRender = props.monthCellRender, _props$components = props.components, components = _props$components === void 0 ? {} : _props$components, hideHeader = props.hideHeader;
  var mergedPrefixCls = ((_React$useContext = reactExports.useContext(PickerContext)) === null || _React$useContext === void 0 ? void 0 : _React$useContext.prefixCls) || prefixCls || "rc-picker";
  var rootRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: rootRef.current
    };
  });
  var _getTimeProps = getTimeProps(props), _getTimeProps2 = _slicedToArray(_getTimeProps, 4), timeProps = _getTimeProps2[0], localeTimeProps = _getTimeProps2[1], showTimeFormat = _getTimeProps2[2], propFormat = _getTimeProps2[3];
  var filledLocale = useLocale(locale2, localeTimeProps);
  var internalPicker = picker === "date" && showTime ? "datetime" : picker;
  var mergedShowTime = reactExports.useMemo(function() {
    return fillShowTimeConfig(internalPicker, showTimeFormat, propFormat, timeProps, filledLocale);
  }, [internalPicker, showTimeFormat, propFormat, timeProps, filledLocale]);
  var now = generateConfig2.getNow();
  var _useMergedState = useMergedState(picker, {
    value: mode,
    postState: function postState(val) {
      return val || "date";
    }
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedMode = _useMergedState2[0], setMergedMode = _useMergedState2[1];
  var internalMode = mergedMode === "date" && mergedShowTime ? "datetime" : mergedMode;
  var toggleDates = useToggleDates(generateConfig2, locale2, internalPicker);
  var _useMergedState3 = useMergedState(defaultValue, {
    value
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), innerValue = _useMergedState4[0], setMergedValue = _useMergedState4[1];
  var mergedValue = reactExports.useMemo(function() {
    var values = toArray$2(innerValue).filter(function(val) {
      return val;
    });
    return multiple ? values : values.slice(0, 1);
  }, [innerValue, multiple]);
  var triggerChange = useEvent(function(nextValue) {
    setMergedValue(nextValue);
    if (onChange && (nextValue === null || mergedValue.length !== nextValue.length || mergedValue.some(function(ori, index) {
      return !isSame(generateConfig2, locale2, ori, nextValue[index], internalPicker);
    }))) {
      onChange === null || onChange === void 0 || onChange(multiple ? nextValue : nextValue[0]);
    }
  });
  var onInternalSelect = useEvent(function(newDate) {
    onSelect === null || onSelect === void 0 || onSelect(newDate);
    if (mergedMode === picker) {
      var nextValues = multiple ? toggleDates(mergedValue, newDate) : [newDate];
      triggerChange(nextValues);
    }
  });
  var _useMergedState5 = useMergedState(defaultPickerValue || mergedValue[0] || now, {
    value: pickerValue
  }), _useMergedState6 = _slicedToArray(_useMergedState5, 2), mergedPickerValue = _useMergedState6[0], setInternalPickerValue = _useMergedState6[1];
  reactExports.useEffect(function() {
    if (mergedValue[0] && !pickerValue) {
      setInternalPickerValue(mergedValue[0]);
    }
  }, [mergedValue[0]]);
  var triggerPanelChange = function triggerPanelChange2(viewDate, nextMode) {
    onPanelChange === null || onPanelChange === void 0 || onPanelChange(viewDate || pickerValue, nextMode || mergedMode);
  };
  var setPickerValue = function setPickerValue2(nextPickerValue) {
    var triggerPanelEvent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    setInternalPickerValue(nextPickerValue);
    onPickerValueChange === null || onPickerValueChange === void 0 || onPickerValueChange(nextPickerValue);
    if (triggerPanelEvent) {
      triggerPanelChange(nextPickerValue);
    }
  };
  var triggerModeChange = function triggerModeChange2(nextMode, viewDate) {
    setMergedMode(nextMode);
    if (viewDate) {
      setPickerValue(viewDate);
    }
    triggerPanelChange(viewDate, nextMode);
  };
  var onPanelValueSelect = function onPanelValueSelect2(nextValue) {
    onInternalSelect(nextValue);
    setPickerValue(nextValue);
    if (mergedMode !== picker) {
      var decadeYearQueue = ["decade", "year"];
      var decadeYearMonthQueue = [].concat(decadeYearQueue, ["month"]);
      var pickerQueue = {
        quarter: [].concat(decadeYearQueue, ["quarter"]),
        week: [].concat(_toConsumableArray(decadeYearMonthQueue), ["week"]),
        date: [].concat(_toConsumableArray(decadeYearMonthQueue), ["date"])
      };
      var queue = pickerQueue[picker] || decadeYearMonthQueue;
      var index = queue.indexOf(mergedMode);
      var nextMode = queue[index + 1];
      if (nextMode) {
        triggerModeChange(nextMode, nextValue);
      }
    }
  };
  var hoverRangeDate = reactExports.useMemo(function() {
    var start;
    var end;
    if (Array.isArray(hoverRangeValue)) {
      var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2);
      start = _hoverRangeValue[0];
      end = _hoverRangeValue[1];
    } else {
      start = hoverRangeValue;
    }
    if (!start && !end) {
      return null;
    }
    start = start || end;
    end = end || start;
    return generateConfig2.isAfter(start, end) ? [end, start] : [start, end];
  }, [hoverRangeValue, generateConfig2]);
  var onInternalCellRender = useCellRender$1(cellRender, dateRender, monthCellRender);
  var PanelComponent = components[internalMode] || DefaultComponents[internalMode] || DatePanel;
  var parentHackContext = reactExports.useContext(PickerHackContext);
  var pickerPanelContext = reactExports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, parentHackContext), {}, {
      hideHeader
    });
  }, [parentHackContext, hideHeader]);
  var panelCls = "".concat(mergedPrefixCls, "-panel");
  var panelProps = pickProps(props, [
    // Week
    "showWeek",
    // Icons
    "prevIcon",
    "nextIcon",
    "superPrevIcon",
    "superNextIcon",
    // Disabled
    "disabledDate",
    "minDate",
    "maxDate",
    // Hover
    "onHover"
  ]);
  return /* @__PURE__ */ reactExports.createElement(PickerHackContext.Provider, {
    value: pickerPanelContext
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: rootRef,
    tabIndex,
    className: classNames(panelCls, _defineProperty({}, "".concat(panelCls, "-rtl"), direction === "rtl"))
  }, /* @__PURE__ */ reactExports.createElement(PanelComponent, _extends({}, panelProps, {
    // Time
    showTime: mergedShowTime,
    prefixCls: mergedPrefixCls,
    locale: filledLocale,
    generateConfig: generateConfig2,
    onModeChange: triggerModeChange,
    pickerValue: mergedPickerValue,
    onPickerValueChange: function onPickerValueChange2(nextPickerValue) {
      setPickerValue(nextPickerValue, true);
    },
    value: mergedValue[0],
    onSelect: onPanelValueSelect,
    values: mergedValue,
    cellRender: onInternalCellRender,
    hoverRangeValue: hoverRangeDate,
    hoverValue
  }))));
}
var RefPanelPicker = /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef(PickerPanel));
function PopupPanel(props) {
  var picker = props.picker, multiplePanel = props.multiplePanel, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, needConfirm = props.needConfirm, onSubmit = props.onSubmit, range = props.range, hoverValue = props.hoverValue;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls, generateConfig2 = _React$useContext.generateConfig;
  var internalOffsetDate = reactExports.useCallback(function(date, offset2) {
    return offsetPanelDate(generateConfig2, picker, date, offset2);
  }, [generateConfig2, picker]);
  var nextPickerValue = reactExports.useMemo(function() {
    return internalOffsetDate(pickerValue, 1);
  }, [pickerValue, internalOffsetDate]);
  var onSecondPickerValueChange = function onSecondPickerValueChange2(nextDate) {
    onPickerValueChange(internalOffsetDate(nextDate, -1));
  };
  var sharedContext = {
    onCellDblClick: function onCellDblClick() {
      if (needConfirm) {
        onSubmit();
      }
    }
  };
  var hideHeader = picker === "time";
  var pickerProps = _objectSpread2(_objectSpread2({}, props), {}, {
    hoverValue: null,
    hoverRangeValue: null,
    hideHeader
  });
  if (range) {
    pickerProps.hoverRangeValue = hoverValue;
  } else {
    pickerProps.hoverValue = hoverValue;
  }
  if (multiplePanel) {
    return /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(prefixCls, "-panels")
    }, /* @__PURE__ */ reactExports.createElement(PickerHackContext.Provider, {
      value: _objectSpread2(_objectSpread2({}, sharedContext), {}, {
        hideNext: true
      })
    }, /* @__PURE__ */ reactExports.createElement(RefPanelPicker, pickerProps)), /* @__PURE__ */ reactExports.createElement(PickerHackContext.Provider, {
      value: _objectSpread2(_objectSpread2({}, sharedContext), {}, {
        hidePrev: true
      })
    }, /* @__PURE__ */ reactExports.createElement(RefPanelPicker, _extends({}, pickerProps, {
      pickerValue: nextPickerValue,
      onPickerValueChange: onSecondPickerValueChange
    }))));
  }
  return /* @__PURE__ */ reactExports.createElement(PickerHackContext.Provider, {
    value: _objectSpread2({}, sharedContext)
  }, /* @__PURE__ */ reactExports.createElement(RefPanelPicker, pickerProps));
}
function executeValue(value) {
  return typeof value === "function" ? value() : value;
}
function PresetPanel(props) {
  var prefixCls = props.prefixCls, presets = props.presets, _onClick = props.onClick, onHover = props.onHover;
  if (!presets.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-presets")
  }, /* @__PURE__ */ reactExports.createElement("ul", null, presets.map(function(_ref, index) {
    var label = _ref.label, value = _ref.value;
    return /* @__PURE__ */ reactExports.createElement("li", {
      key: index,
      onClick: function onClick() {
        _onClick(executeValue(value));
      },
      onMouseEnter: function onMouseEnter() {
        onHover(executeValue(value));
      },
      onMouseLeave: function onMouseLeave() {
        onHover(null);
      }
    }, label);
  })));
}
function Popup(props) {
  var panelRender = props.panelRender, internalMode = props.internalMode, picker = props.picker, showNow = props.showNow, range = props.range, multiple = props.multiple, _props$activeInfo = props.activeInfo, activeInfo = _props$activeInfo === void 0 ? [0, 0, 0] : _props$activeInfo, presets = props.presets, onPresetHover = props.onPresetHover, onPresetSubmit = props.onPresetSubmit, onFocus = props.onFocus, onBlur = props.onBlur, onPanelMouseDown = props.onPanelMouseDown, direction = props.direction, value = props.value, onSelect = props.onSelect, isInvalid = props.isInvalid, defaultOpenValue = props.defaultOpenValue, onOk = props.onOk, onSubmit = props.onSubmit;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  var panelPrefixCls = "".concat(prefixCls, "-panel");
  var rtl = direction === "rtl";
  var arrowRef = reactExports.useRef(null);
  var wrapperRef = reactExports.useRef(null);
  var _React$useState = reactExports.useState(0), _React$useState2 = _slicedToArray(_React$useState, 2), containerWidth = _React$useState2[0], setContainerWidth = _React$useState2[1];
  var _React$useState3 = reactExports.useState(0), _React$useState4 = _slicedToArray(_React$useState3, 2), containerOffset = _React$useState4[0], setContainerOffset = _React$useState4[1];
  var _React$useState5 = reactExports.useState(0), _React$useState6 = _slicedToArray(_React$useState5, 2), arrowOffset = _React$useState6[0], setArrowOffset = _React$useState6[1];
  var onResize = function onResize2(info) {
    if (info.width) {
      setContainerWidth(info.width);
    }
  };
  var _activeInfo = _slicedToArray(activeInfo, 3), activeInputLeft = _activeInfo[0], activeInputRight = _activeInfo[1], selectorWidth = _activeInfo[2];
  var _React$useState7 = reactExports.useState(0), _React$useState8 = _slicedToArray(_React$useState7, 2), retryTimes = _React$useState8[0], setRetryTimes = _React$useState8[1];
  reactExports.useEffect(function() {
    setRetryTimes(10);
  }, [activeInputLeft]);
  reactExports.useEffect(function() {
    if (range && wrapperRef.current) {
      var _arrowRef$current;
      var arrowWidth = ((_arrowRef$current = arrowRef.current) === null || _arrowRef$current === void 0 ? void 0 : _arrowRef$current.offsetWidth) || 0;
      var wrapperRect = wrapperRef.current.getBoundingClientRect();
      if (!wrapperRect.height || wrapperRect.right < 0) {
        setRetryTimes(function(times) {
          return Math.max(0, times - 1);
        });
        return;
      }
      var nextArrowOffset = (rtl ? activeInputRight - arrowWidth : activeInputLeft) - wrapperRect.left;
      setArrowOffset(nextArrowOffset);
      if (containerWidth && containerWidth < selectorWidth) {
        var offset2 = rtl ? wrapperRect.right - (activeInputRight - arrowWidth + containerWidth) : activeInputLeft + arrowWidth - wrapperRect.left - containerWidth;
        var safeOffset = Math.max(0, offset2);
        setContainerOffset(safeOffset);
      } else {
        setContainerOffset(0);
      }
    }
  }, [retryTimes, rtl, containerWidth, activeInputLeft, activeInputRight, selectorWidth, range]);
  function filterEmpty(list) {
    return list.filter(function(item) {
      return item;
    });
  }
  var valueList = reactExports.useMemo(function() {
    return filterEmpty(toArray$2(value));
  }, [value]);
  var isTimePickerEmptyValue = picker === "time" && !valueList.length;
  var footerSubmitValue = reactExports.useMemo(function() {
    if (isTimePickerEmptyValue) {
      return filterEmpty([defaultOpenValue]);
    }
    return valueList;
  }, [isTimePickerEmptyValue, valueList, defaultOpenValue]);
  var popupPanelValue = isTimePickerEmptyValue ? defaultOpenValue : valueList;
  var disableSubmit = reactExports.useMemo(function() {
    if (!footerSubmitValue.length) {
      return true;
    }
    return footerSubmitValue.some(function(val) {
      return isInvalid(val);
    });
  }, [footerSubmitValue, isInvalid]);
  var onFooterSubmit = function onFooterSubmit2() {
    if (isTimePickerEmptyValue) {
      onSelect(defaultOpenValue);
    }
    onOk();
    onSubmit();
  };
  var mergedNodes = /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-panel-layout")
  }, /* @__PURE__ */ reactExports.createElement(PresetPanel, {
    prefixCls,
    presets,
    onClick: onPresetSubmit,
    onHover: onPresetHover
  }), /* @__PURE__ */ reactExports.createElement("div", null, /* @__PURE__ */ reactExports.createElement(PopupPanel, _extends({}, props, {
    value: popupPanelValue
  })), /* @__PURE__ */ reactExports.createElement(Footer$2, _extends({}, props, {
    showNow: multiple ? false : showNow,
    invalid: disableSubmit,
    onSubmit: onFooterSubmit
  }))));
  if (panelRender) {
    mergedNodes = panelRender(mergedNodes);
  }
  var containerPrefixCls = "".concat(panelPrefixCls, "-container");
  var marginLeft = "marginLeft";
  var marginRight = "marginRight";
  var renderNode = /* @__PURE__ */ reactExports.createElement("div", {
    onMouseDown: onPanelMouseDown,
    tabIndex: -1,
    className: classNames(
      containerPrefixCls,
      // Used for Today Button style, safe to remove if no need
      "".concat(prefixCls, "-").concat(internalMode, "-panel-container")
    ),
    style: _defineProperty(_defineProperty({}, rtl ? marginRight : marginLeft, containerOffset), rtl ? marginLeft : marginRight, "auto"),
    onFocus,
    onBlur
  }, mergedNodes);
  if (range) {
    renderNode = /* @__PURE__ */ reactExports.createElement("div", {
      onMouseDown: onPanelMouseDown,
      ref: wrapperRef,
      className: classNames("".concat(prefixCls, "-range-wrapper"), "".concat(prefixCls, "-").concat(picker, "-range-wrapper"))
    }, /* @__PURE__ */ reactExports.createElement("div", {
      ref: arrowRef,
      className: "".concat(prefixCls, "-range-arrow"),
      style: {
        left: arrowOffset
      }
    }), /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
      onResize
    }, renderNode));
  }
  return renderNode;
}
function useInputProps(props, postProps) {
  var format2 = props.format, maskFormat = props.maskFormat, generateConfig2 = props.generateConfig, locale2 = props.locale, preserveInvalidOnBlur = props.preserveInvalidOnBlur, inputReadOnly = props.inputReadOnly, required = props.required, ariaRequired = props["aria-required"], onSubmit = props.onSubmit, _onFocus = props.onFocus, _onBlur = props.onBlur, onInputChange = props.onInputChange, onInvalid = props.onInvalid, open = props.open, onOpenChange = props.onOpenChange, _onKeyDown = props.onKeyDown, _onChange = props.onChange, activeHelp = props.activeHelp, name = props.name, autoComplete = props.autoComplete, id = props.id, value = props.value, invalid = props.invalid, placeholder = props.placeholder, disabled = props.disabled, activeIndex = props.activeIndex, allHelp = props.allHelp, picker = props.picker;
  var parseDate = function parseDate2(str, formatStr) {
    var parsed = generateConfig2.locale.parse(locale2.locale, str, [formatStr]);
    return parsed && generateConfig2.isValidate(parsed) ? parsed : null;
  };
  var firstFormat = format2[0];
  var getText = reactExports.useCallback(function(date) {
    return formatValue(date, {
      locale: locale2,
      format: firstFormat,
      generateConfig: generateConfig2
    });
  }, [locale2, generateConfig2, firstFormat]);
  var valueTexts = reactExports.useMemo(function() {
    return value.map(getText);
  }, [value, getText]);
  var size = reactExports.useMemo(function() {
    var defaultSize = picker === "time" ? 8 : 10;
    var length = typeof firstFormat === "function" ? firstFormat(generateConfig2.getNow()).length : firstFormat.length;
    return Math.max(defaultSize, length) + 2;
  }, [firstFormat, picker, generateConfig2]);
  var _validateFormat = function validateFormat(text) {
    for (var i = 0; i < format2.length; i += 1) {
      var singleFormat = format2[i];
      if (typeof singleFormat === "string") {
        var parsed = parseDate(text, singleFormat);
        if (parsed) {
          return parsed;
        }
      }
    }
    return false;
  };
  var getInputProps = function getInputProps2(index) {
    function getProp(propValue) {
      return index !== void 0 ? propValue[index] : propValue;
    }
    var pickedAttrs = pickAttrs(props, {
      aria: true,
      data: true
    });
    var inputProps = _objectSpread2(_objectSpread2({}, pickedAttrs), {}, {
      // ============== Shared ==============
      format: maskFormat,
      validateFormat: function validateFormat(text) {
        return !!_validateFormat(text);
      },
      preserveInvalidOnBlur,
      readOnly: inputReadOnly,
      required,
      "aria-required": ariaRequired,
      name,
      autoComplete,
      size,
      // ============= By Index =============
      id: getProp(id),
      value: getProp(valueTexts) || "",
      invalid: getProp(invalid),
      placeholder: getProp(placeholder),
      active: activeIndex === index,
      helped: allHelp || activeHelp && activeIndex === index,
      disabled: getProp(disabled),
      onFocus: function onFocus(event) {
        _onFocus(event, index);
      },
      onBlur: function onBlur(event) {
        _onBlur(event, index);
      },
      onSubmit,
      // Get validate text value
      onChange: function onChange(text) {
        onInputChange();
        var parsed = _validateFormat(text);
        if (parsed) {
          onInvalid(false, index);
          _onChange(parsed, index);
          return;
        }
        onInvalid(!!text, index);
      },
      onHelp: function onHelp() {
        onOpenChange(true, {
          index
        });
      },
      onKeyDown: function onKeyDown2(event) {
        var prevented = false;
        _onKeyDown === null || _onKeyDown === void 0 || _onKeyDown(event, function() {
          prevented = true;
        });
        if (!event.defaultPrevented && !prevented) {
          switch (event.key) {
            case "Escape":
              onOpenChange(false, {
                index
              });
              break;
            case "Enter":
              if (!open) {
                onOpenChange(true);
              }
              break;
          }
        }
      }
    }, postProps === null || postProps === void 0 ? void 0 : postProps({
      valueTexts
    }));
    Object.keys(inputProps).forEach(function(key) {
      if (inputProps[key] === void 0) {
        delete inputProps[key];
      }
    });
    return inputProps;
  };
  return [getInputProps, getText];
}
var propNames = ["onMouseEnter", "onMouseLeave"];
function useRootProps(props) {
  return reactExports.useMemo(function() {
    return pickProps(props, propNames);
  }, [props]);
}
var _excluded$e = ["icon", "type"], _excluded2$2 = ["onClear"];
function Icon(props) {
  var icon = props.icon, type = props.type, restProps = _objectWithoutProperties(props, _excluded$e);
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  return icon ? /* @__PURE__ */ reactExports.createElement("span", _extends({
    className: "".concat(prefixCls, "-").concat(type)
  }, restProps), icon) : null;
}
function ClearIcon(_ref) {
  var onClear = _ref.onClear, restProps = _objectWithoutProperties(_ref, _excluded2$2);
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, restProps, {
    type: "clear",
    role: "button",
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    },
    onClick: function onClick(e) {
      e.stopPropagation();
      onClear();
    }
  }));
}
var FORMAT_KEYS = ["YYYY", "MM", "DD", "HH", "mm", "ss", "SSS"];
var REPLACE_KEY = "顧";
var MaskFormat = /* @__PURE__ */ function() {
  function MaskFormat2(format2) {
    _classCallCheck(this, MaskFormat2);
    _defineProperty(this, "format", void 0);
    _defineProperty(this, "maskFormat", void 0);
    _defineProperty(this, "cells", void 0);
    _defineProperty(this, "maskCells", void 0);
    this.format = format2;
    var replaceKeys = FORMAT_KEYS.map(function(key) {
      return "(".concat(key, ")");
    }).join("|");
    var replaceReg = new RegExp(replaceKeys, "g");
    this.maskFormat = format2.replace(
      replaceReg,
      // Use Chinese character to avoid user use it in format
      function(key) {
        return REPLACE_KEY.repeat(key.length);
      }
    );
    var cellReg = new RegExp("(".concat(FORMAT_KEYS.join("|"), ")"));
    var strCells = (format2.split(cellReg) || []).filter(function(str) {
      return str;
    });
    var offset2 = 0;
    this.cells = strCells.map(function(text) {
      var mask = FORMAT_KEYS.includes(text);
      var start = offset2;
      var end = offset2 + text.length;
      offset2 = end;
      return {
        text,
        mask,
        start,
        end
      };
    });
    this.maskCells = this.cells.filter(function(cell) {
      return cell.mask;
    });
  }
  _createClass(MaskFormat2, [{
    key: "getSelection",
    value: function getSelection(maskCellIndex) {
      var _ref = this.maskCells[maskCellIndex] || {}, start = _ref.start, end = _ref.end;
      return [start || 0, end || 0];
    }
    /** Check given text match format */
  }, {
    key: "match",
    value: function match(text) {
      for (var i = 0; i < this.maskFormat.length; i += 1) {
        var maskChar = this.maskFormat[i];
        var textChar = text[i];
        if (!textChar || maskChar !== REPLACE_KEY && maskChar !== textChar) {
          return false;
        }
      }
      return true;
    }
    /** Get mask cell count */
  }, {
    key: "size",
    value: function size() {
      return this.maskCells.length;
    }
  }, {
    key: "getMaskCellIndex",
    value: function getMaskCellIndex(anchorIndex) {
      var closetDist = Number.MAX_SAFE_INTEGER;
      var closetIndex = 0;
      for (var i = 0; i < this.maskCells.length; i += 1) {
        var _this$maskCells$i = this.maskCells[i], start = _this$maskCells$i.start, end = _this$maskCells$i.end;
        if (anchorIndex >= start && anchorIndex <= end) {
          return i;
        }
        var dist = Math.min(Math.abs(anchorIndex - start), Math.abs(anchorIndex - end));
        if (dist < closetDist) {
          closetDist = dist;
          closetIndex = i;
        }
      }
      return closetIndex;
    }
  }]);
  return MaskFormat2;
}();
function getMaskRange(key) {
  var PresetRange = {
    YYYY: [0, 9999, (/* @__PURE__ */ new Date()).getFullYear()],
    MM: [1, 12],
    DD: [1, 31],
    HH: [0, 23],
    mm: [0, 59],
    ss: [0, 59],
    SSS: [0, 999]
  };
  return PresetRange[key];
}
var _excluded$d = ["active", "showActiveCls", "suffixIcon", "format", "validateFormat", "onChange", "onInput", "helped", "onHelp", "onSubmit", "onKeyDown", "preserveInvalidOnBlur", "invalid", "clearIcon"];
var Input = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var active = props.active, _props$showActiveCls = props.showActiveCls, showActiveCls = _props$showActiveCls === void 0 ? true : _props$showActiveCls, suffixIcon = props.suffixIcon, format2 = props.format, validateFormat = props.validateFormat, onChange = props.onChange;
  props.onInput;
  var helped = props.helped, onHelp = props.onHelp, onSubmit = props.onSubmit, onKeyDown2 = props.onKeyDown, _props$preserveInvali = props.preserveInvalidOnBlur, preserveInvalidOnBlur = _props$preserveInvali === void 0 ? false : _props$preserveInvali, invalid = props.invalid, clearIcon = props.clearIcon, restProps = _objectWithoutProperties(props, _excluded$d);
  var value = props.value, onFocus = props.onFocus, onBlur = props.onBlur, onMouseUp = props.onMouseUp;
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls, _React$useContext$inp = _React$useContext.input, Component = _React$useContext$inp === void 0 ? "input" : _React$useContext$inp;
  var inputPrefixCls = "".concat(prefixCls, "-input");
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focused = _React$useState2[0], setFocused = _React$useState2[1];
  var _React$useState3 = reactExports.useState(value), _React$useState4 = _slicedToArray(_React$useState3, 2), internalInputValue = _React$useState4[0], setInputValue = _React$useState4[1];
  var _React$useState5 = reactExports.useState(""), _React$useState6 = _slicedToArray(_React$useState5, 2), focusCellText = _React$useState6[0], setFocusCellText = _React$useState6[1];
  var _React$useState7 = reactExports.useState(null), _React$useState8 = _slicedToArray(_React$useState7, 2), focusCellIndex = _React$useState8[0], setFocusCellIndex = _React$useState8[1];
  var _React$useState9 = reactExports.useState(null), _React$useState10 = _slicedToArray(_React$useState9, 2), forceSelectionSyncMark = _React$useState10[0], forceSelectionSync = _React$useState10[1];
  var inputValue = internalInputValue || "";
  reactExports.useEffect(function() {
    setInputValue(value);
  }, [value]);
  var holderRef = reactExports.useRef();
  var inputRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: holderRef.current,
      inputElement: inputRef.current,
      focus: function focus(options) {
        inputRef.current.focus(options);
      },
      blur: function blur() {
        inputRef.current.blur();
      }
    };
  });
  var maskFormat = reactExports.useMemo(function() {
    return new MaskFormat(format2 || "");
  }, [format2]);
  var _React$useMemo = reactExports.useMemo(function() {
    if (helped) {
      return [0, 0];
    }
    return maskFormat.getSelection(focusCellIndex);
  }, [maskFormat, focusCellIndex, helped]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), selectionStart = _React$useMemo2[0], selectionEnd = _React$useMemo2[1];
  var onModify = function onModify2(text) {
    if (text && text !== format2 && text !== value) {
      onHelp();
    }
  };
  var triggerInputChange = useEvent(function(text) {
    if (validateFormat(text)) {
      onChange(text);
    }
    setInputValue(text);
    onModify(text);
  });
  var onInternalChange = function onInternalChange2(event) {
    if (!format2) {
      var text = event.target.value;
      onModify(text);
      setInputValue(text);
      onChange(text);
    }
  };
  var onFormatPaste = function onFormatPaste2(event) {
    var pasteText = event.clipboardData.getData("text");
    if (validateFormat(pasteText)) {
      triggerInputChange(pasteText);
    }
  };
  var mouseDownRef = reactExports.useRef(false);
  var onFormatMouseDown = function onFormatMouseDown2() {
    mouseDownRef.current = true;
  };
  var onFormatMouseUp = function onFormatMouseUp2(event) {
    var _ref = event.target, start = _ref.selectionStart;
    var closeMaskIndex = maskFormat.getMaskCellIndex(start);
    setFocusCellIndex(closeMaskIndex);
    forceSelectionSync({});
    onMouseUp === null || onMouseUp === void 0 || onMouseUp(event);
    mouseDownRef.current = false;
  };
  var onFormatFocus = function onFormatFocus2(event) {
    setFocused(true);
    setFocusCellIndex(0);
    setFocusCellText("");
    onFocus(event);
  };
  var onSharedBlur = function onSharedBlur2(event) {
    onBlur(event);
  };
  var onFormatBlur = function onFormatBlur2(event) {
    setFocused(false);
    onSharedBlur(event);
  };
  useLockEffect(active, function() {
    if (!active && !preserveInvalidOnBlur) {
      setInputValue(value);
    }
  });
  var onSharedKeyDown = function onSharedKeyDown2(event) {
    if (event.key === "Enter" && validateFormat(inputValue)) {
      onSubmit();
    }
    onKeyDown2 === null || onKeyDown2 === void 0 || onKeyDown2(event);
  };
  var onFormatKeyDown = function onFormatKeyDown2(event) {
    onSharedKeyDown(event);
    var key = event.key;
    var nextCellText = null;
    var nextFillText = null;
    var maskCellLen = selectionEnd - selectionStart;
    var cellFormat = format2.slice(selectionStart, selectionEnd);
    var offsetCellIndex = function offsetCellIndex2(offset2) {
      setFocusCellIndex(function(idx) {
        var nextIndex = idx + offset2;
        nextIndex = Math.max(nextIndex, 0);
        nextIndex = Math.min(nextIndex, maskFormat.size() - 1);
        return nextIndex;
      });
    };
    var offsetCellValue = function offsetCellValue2(offset2) {
      var _getMaskRange = getMaskRange(cellFormat), _getMaskRange2 = _slicedToArray(_getMaskRange, 3), rangeStart = _getMaskRange2[0], rangeEnd = _getMaskRange2[1], rangeDefault = _getMaskRange2[2];
      var currentText = inputValue.slice(selectionStart, selectionEnd);
      var currentTextNum = Number(currentText);
      if (isNaN(currentTextNum)) {
        return String(rangeDefault ? rangeDefault : offset2 > 0 ? rangeStart : rangeEnd);
      }
      var num = currentTextNum + offset2;
      var range = rangeEnd - rangeStart + 1;
      return String(rangeStart + (range + num - rangeStart) % range);
    };
    switch (key) {
      case "Backspace":
      case "Delete":
        nextCellText = "";
        nextFillText = cellFormat;
        break;
      case "ArrowLeft":
        nextCellText = "";
        offsetCellIndex(-1);
        break;
      case "ArrowRight":
        nextCellText = "";
        offsetCellIndex(1);
        break;
      case "ArrowUp":
        nextCellText = "";
        nextFillText = offsetCellValue(1);
        break;
      case "ArrowDown":
        nextCellText = "";
        nextFillText = offsetCellValue(-1);
        break;
      default:
        if (!isNaN(Number(key))) {
          nextCellText = focusCellText + key;
          nextFillText = nextCellText;
        }
        break;
    }
    if (nextCellText !== null) {
      setFocusCellText(nextCellText);
      if (nextCellText.length >= maskCellLen) {
        offsetCellIndex(1);
        setFocusCellText("");
      }
    }
    if (nextFillText !== null) {
      var nextFocusValue = (
        // before
        inputValue.slice(0, selectionStart) + // replace
        leftPad(nextFillText, maskCellLen) + // after
        inputValue.slice(selectionEnd)
      );
      triggerInputChange(nextFocusValue.slice(0, format2.length));
    }
    forceSelectionSync({});
  };
  var rafRef = reactExports.useRef();
  useLayoutEffect(function() {
    if (!focused || !format2 || mouseDownRef.current) {
      return;
    }
    if (!maskFormat.match(inputValue)) {
      triggerInputChange(format2);
      return;
    }
    inputRef.current.setSelectionRange(selectionStart, selectionEnd);
    rafRef.current = wrapperRaf(function() {
      inputRef.current.setSelectionRange(selectionStart, selectionEnd);
    });
    return function() {
      wrapperRaf.cancel(rafRef.current);
    };
  }, [maskFormat, format2, focused, inputValue, focusCellIndex, selectionStart, selectionEnd, forceSelectionSyncMark, triggerInputChange]);
  var inputProps = format2 ? {
    onFocus: onFormatFocus,
    onBlur: onFormatBlur,
    onKeyDown: onFormatKeyDown,
    onMouseDown: onFormatMouseDown,
    onMouseUp: onFormatMouseUp,
    onPaste: onFormatPaste
  } : {};
  return /* @__PURE__ */ reactExports.createElement("div", {
    ref: holderRef,
    className: classNames(inputPrefixCls, _defineProperty(_defineProperty({}, "".concat(inputPrefixCls, "-active"), active && showActiveCls), "".concat(inputPrefixCls, "-placeholder"), helped))
  }, /* @__PURE__ */ reactExports.createElement(Component, _extends({
    ref: inputRef,
    "aria-invalid": invalid,
    autoComplete: "off"
  }, restProps, {
    onKeyDown: onSharedKeyDown,
    onBlur: onSharedBlur
    // Replace with format
  }, inputProps, {
    // Value
    value: inputValue,
    onChange: onInternalChange
  })), /* @__PURE__ */ reactExports.createElement(Icon, {
    type: "suffix",
    icon: suffixIcon
  }), clearIcon);
});
var _excluded$c = ["id", "prefix", "clearIcon", "suffixIcon", "separator", "activeIndex", "activeHelp", "allHelp", "focused", "onFocus", "onBlur", "onKeyDown", "locale", "generateConfig", "placeholder", "className", "style", "onClick", "onClear", "value", "onChange", "onSubmit", "onInputChange", "format", "maskFormat", "preserveInvalidOnBlur", "onInvalid", "disabled", "invalid", "inputReadOnly", "direction", "onOpenChange", "onActiveInfo", "placement", "onMouseDown", "required", "aria-required", "autoFocus", "tabIndex"], _excluded2$1 = ["index"];
function RangeSelector(props, ref) {
  var id = props.id, prefix = props.prefix, clearIcon = props.clearIcon, suffixIcon = props.suffixIcon, _props$separator = props.separator, separator = _props$separator === void 0 ? "~" : _props$separator, activeIndex = props.activeIndex;
  props.activeHelp;
  props.allHelp;
  var focused = props.focused;
  props.onFocus;
  props.onBlur;
  props.onKeyDown;
  props.locale;
  props.generateConfig;
  var placeholder = props.placeholder, className = props.className, style = props.style, onClick = props.onClick, onClear = props.onClear, value = props.value;
  props.onChange;
  props.onSubmit;
  props.onInputChange;
  props.format;
  props.maskFormat;
  props.preserveInvalidOnBlur;
  props.onInvalid;
  var disabled = props.disabled, invalid = props.invalid;
  props.inputReadOnly;
  var direction = props.direction;
  props.onOpenChange;
  var onActiveInfo = props.onActiveInfo;
  props.placement;
  var _onMouseDown = props.onMouseDown;
  props.required;
  props["aria-required"];
  var autoFocus = props.autoFocus, tabIndex = props.tabIndex, restProps = _objectWithoutProperties(props, _excluded$c);
  var rtl = direction === "rtl";
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  var ids = reactExports.useMemo(function() {
    if (typeof id === "string") {
      return [id];
    }
    var mergedId = id || {};
    return [mergedId.start, mergedId.end];
  }, [id]);
  var rootRef = reactExports.useRef();
  var inputStartRef = reactExports.useRef();
  var inputEndRef = reactExports.useRef();
  var getInput = function getInput2(index) {
    var _index;
    return (_index = [inputStartRef, inputEndRef][index]) === null || _index === void 0 ? void 0 : _index.current;
  };
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: rootRef.current,
      focus: function focus(options) {
        if (_typeof(options) === "object") {
          var _getInput;
          var _ref = options || {}, _ref$index = _ref.index, _index2 = _ref$index === void 0 ? 0 : _ref$index, rest = _objectWithoutProperties(_ref, _excluded2$1);
          (_getInput = getInput(_index2)) === null || _getInput === void 0 || _getInput.focus(rest);
        } else {
          var _getInput2;
          (_getInput2 = getInput(options !== null && options !== void 0 ? options : 0)) === null || _getInput2 === void 0 || _getInput2.focus();
        }
      },
      blur: function blur() {
        var _getInput3, _getInput4;
        (_getInput3 = getInput(0)) === null || _getInput3 === void 0 || _getInput3.blur();
        (_getInput4 = getInput(1)) === null || _getInput4 === void 0 || _getInput4.blur();
      }
    };
  });
  var rootProps = useRootProps(restProps);
  var mergedPlaceholder = reactExports.useMemo(function() {
    return Array.isArray(placeholder) ? placeholder : [placeholder, placeholder];
  }, [placeholder]);
  var _useInputProps = useInputProps(_objectSpread2(_objectSpread2({}, props), {}, {
    id: ids,
    placeholder: mergedPlaceholder
  })), _useInputProps2 = _slicedToArray(_useInputProps, 1), getInputProps = _useInputProps2[0];
  var _React$useState = reactExports.useState({
    position: "absolute",
    width: 0
  }), _React$useState2 = _slicedToArray(_React$useState, 2), activeBarStyle = _React$useState2[0], setActiveBarStyle = _React$useState2[1];
  var syncActiveOffset = useEvent(function() {
    var input = getInput(activeIndex);
    if (input) {
      var inputRect = input.nativeElement.getBoundingClientRect();
      var parentRect = rootRef.current.getBoundingClientRect();
      var rectOffset = inputRect.left - parentRect.left;
      setActiveBarStyle(function(ori) {
        return _objectSpread2(_objectSpread2({}, ori), {}, {
          width: inputRect.width,
          left: rectOffset
        });
      });
      onActiveInfo([inputRect.left, inputRect.right, parentRect.width]);
    }
  });
  reactExports.useEffect(function() {
    syncActiveOffset();
  }, [activeIndex]);
  var showClear = clearIcon && (value[0] && !disabled[0] || value[1] && !disabled[1]);
  var startAutoFocus = autoFocus && !disabled[0];
  var endAutoFocus = autoFocus && !startAutoFocus && !disabled[1];
  return /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: syncActiveOffset
  }, /* @__PURE__ */ reactExports.createElement("div", _extends({}, rootProps, {
    className: classNames(prefixCls, "".concat(prefixCls, "-range"), _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-disabled"), disabled.every(function(i) {
      return i;
    })), "".concat(prefixCls, "-invalid"), invalid.some(function(i) {
      return i;
    })), "".concat(prefixCls, "-rtl"), rtl), className),
    style,
    ref: rootRef,
    onClick,
    onMouseDown: function onMouseDown(e) {
      var target = e.target;
      if (target !== inputStartRef.current.inputElement && target !== inputEndRef.current.inputElement) {
        e.preventDefault();
      }
      _onMouseDown === null || _onMouseDown === void 0 || _onMouseDown(e);
    }
  }), prefix && /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-prefix")
  }, prefix), /* @__PURE__ */ reactExports.createElement(Input, _extends({
    ref: inputStartRef
  }, getInputProps(0), {
    autoFocus: startAutoFocus,
    tabIndex,
    "date-range": "start"
  })), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-range-separator")
  }, separator), /* @__PURE__ */ reactExports.createElement(Input, _extends({
    ref: inputEndRef
  }, getInputProps(1), {
    autoFocus: endAutoFocus,
    tabIndex,
    "date-range": "end"
  })), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-active-bar"),
    style: activeBarStyle
  }), /* @__PURE__ */ reactExports.createElement(Icon, {
    type: "suffix",
    icon: suffixIcon
  }), showClear && /* @__PURE__ */ reactExports.createElement(ClearIcon, {
    icon: clearIcon,
    onClear
  })));
}
var RefRangeSelector = /* @__PURE__ */ reactExports.forwardRef(RangeSelector);
function separateConfig(config, defaultConfig) {
  var singleConfig = config !== null && config !== void 0 ? config : defaultConfig;
  if (Array.isArray(singleConfig)) {
    return singleConfig;
  }
  return [singleConfig, singleConfig];
}
function getActiveRange(activeIndex) {
  return activeIndex === 1 ? "end" : "start";
}
function RangePicker(props, ref) {
  var _useFilledProps = useFilledProps(props, function() {
    var disabled2 = props.disabled, allowEmpty2 = props.allowEmpty;
    var mergedDisabled = separateConfig(disabled2, false);
    var mergedAllowEmpty = separateConfig(allowEmpty2, false);
    return {
      disabled: mergedDisabled,
      allowEmpty: mergedAllowEmpty
    };
  }), _useFilledProps2 = _slicedToArray(_useFilledProps, 6), filledProps = _useFilledProps2[0], internalPicker = _useFilledProps2[1], complexPicker = _useFilledProps2[2], formatList = _useFilledProps2[3], maskFormat = _useFilledProps2[4], isInvalidateDate = _useFilledProps2[5];
  var prefixCls = filledProps.prefixCls, styles = filledProps.styles, classNames2 = filledProps.classNames, defaultValue = filledProps.defaultValue, value = filledProps.value, needConfirm = filledProps.needConfirm, onKeyDown2 = filledProps.onKeyDown, disabled = filledProps.disabled, allowEmpty = filledProps.allowEmpty, disabledDate = filledProps.disabledDate, minDate = filledProps.minDate, maxDate = filledProps.maxDate, defaultOpen = filledProps.defaultOpen, open = filledProps.open, onOpenChange = filledProps.onOpenChange, locale2 = filledProps.locale, generateConfig2 = filledProps.generateConfig, picker = filledProps.picker, showNow = filledProps.showNow, showToday = filledProps.showToday, showTime = filledProps.showTime, mode = filledProps.mode, onPanelChange = filledProps.onPanelChange, onCalendarChange = filledProps.onCalendarChange, onOk = filledProps.onOk, defaultPickerValue = filledProps.defaultPickerValue, pickerValue = filledProps.pickerValue, onPickerValueChange = filledProps.onPickerValueChange, inputReadOnly = filledProps.inputReadOnly, suffixIcon = filledProps.suffixIcon, onFocus = filledProps.onFocus, onBlur = filledProps.onBlur, presets = filledProps.presets, ranges = filledProps.ranges, components = filledProps.components, cellRender = filledProps.cellRender, dateRender = filledProps.dateRender, monthCellRender = filledProps.monthCellRender, onClick = filledProps.onClick;
  var selectorRef = usePickerRef(ref);
  var _useOpen = useOpen(open, defaultOpen, disabled, onOpenChange), _useOpen2 = _slicedToArray(_useOpen, 2), mergedOpen = _useOpen2[0], setMergeOpen = _useOpen2[1];
  var triggerOpen = function triggerOpen2(nextOpen, config) {
    if (disabled.some(function(fieldDisabled) {
      return !fieldDisabled;
    }) || !nextOpen) {
      setMergeOpen(nextOpen, config);
    }
  };
  var _useInnerValue = useInnerValue(generateConfig2, locale2, formatList, true, false, defaultValue, value, onCalendarChange, onOk), _useInnerValue2 = _slicedToArray(_useInnerValue, 5), mergedValue = _useInnerValue2[0], setInnerValue = _useInnerValue2[1], getCalendarValue = _useInnerValue2[2], triggerCalendarChange = _useInnerValue2[3], triggerOk = _useInnerValue2[4];
  var calendarValue = getCalendarValue();
  var _useRangeActive = useRangeActive(disabled, allowEmpty, mergedOpen), _useRangeActive2 = _slicedToArray(_useRangeActive, 9), focused = _useRangeActive2[0], triggerFocus = _useRangeActive2[1], lastOperation = _useRangeActive2[2], activeIndex = _useRangeActive2[3], setActiveIndex = _useRangeActive2[4], nextActiveIndex = _useRangeActive2[5], activeIndexList = _useRangeActive2[6], updateSubmitIndex = _useRangeActive2[7], hasActiveSubmitValue = _useRangeActive2[8];
  var onSharedFocus = function onSharedFocus2(event, index) {
    triggerFocus(true);
    onFocus === null || onFocus === void 0 || onFocus(event, {
      range: getActiveRange(index !== null && index !== void 0 ? index : activeIndex)
    });
  };
  var onSharedBlur = function onSharedBlur2(event, index) {
    triggerFocus(false);
    onBlur === null || onBlur === void 0 || onBlur(event, {
      range: getActiveRange(index !== null && index !== void 0 ? index : activeIndex)
    });
  };
  var mergedShowTime = reactExports.useMemo(function() {
    if (!showTime) {
      return null;
    }
    var disabledTime = showTime.disabledTime;
    var proxyDisabledTime = disabledTime ? function(date) {
      var range = getActiveRange(activeIndex);
      var fromDate = getFromDate(calendarValue, activeIndexList, activeIndex);
      return disabledTime(date, range, {
        from: fromDate
      });
    } : void 0;
    return _objectSpread2(_objectSpread2({}, showTime), {}, {
      disabledTime: proxyDisabledTime
    });
  }, [showTime, activeIndex, calendarValue, activeIndexList]);
  var _useMergedState = useMergedState([picker, picker], {
    value: mode
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), modes = _useMergedState2[0], setModes = _useMergedState2[1];
  var mergedMode = modes[activeIndex] || picker;
  var internalMode = mergedMode === "date" && mergedShowTime ? "datetime" : mergedMode;
  var multiplePanel = internalMode === picker && internalMode !== "time";
  var mergedShowNow = useShowNow(picker, mergedMode, showNow, showToday, true);
  var _useRangeValue = useRangeValue(filledProps, mergedValue, setInnerValue, getCalendarValue, triggerCalendarChange, disabled, formatList, focused, mergedOpen, isInvalidateDate), _useRangeValue2 = _slicedToArray(_useRangeValue, 2), flushSubmit = _useRangeValue2[0], triggerSubmitChange = _useRangeValue2[1];
  var mergedDisabledDate = useRangeDisabledDate(calendarValue, disabled, activeIndexList, generateConfig2, locale2, disabledDate);
  var _useFieldsInvalidate = useFieldsInvalidate(calendarValue, isInvalidateDate, allowEmpty), _useFieldsInvalidate2 = _slicedToArray(_useFieldsInvalidate, 2), submitInvalidates = _useFieldsInvalidate2[0], onSelectorInvalid = _useFieldsInvalidate2[1];
  var _useRangePickerValue = useRangePickerValue(generateConfig2, locale2, calendarValue, modes, mergedOpen, activeIndex, internalPicker, multiplePanel, defaultPickerValue, pickerValue, mergedShowTime === null || mergedShowTime === void 0 ? void 0 : mergedShowTime.defaultOpenValue, onPickerValueChange, minDate, maxDate), _useRangePickerValue2 = _slicedToArray(_useRangePickerValue, 2), currentPickerValue = _useRangePickerValue2[0], setCurrentPickerValue = _useRangePickerValue2[1];
  var triggerModeChange = useEvent(function(nextPickerValue, nextMode, triggerEvent) {
    var clone = fillIndex(modes, activeIndex, nextMode);
    if (clone[0] !== modes[0] || clone[1] !== modes[1]) {
      setModes(clone);
    }
    if (onPanelChange && triggerEvent !== false) {
      var clonePickerValue = _toConsumableArray(calendarValue);
      if (nextPickerValue) {
        clonePickerValue[activeIndex] = nextPickerValue;
      }
      onPanelChange(clonePickerValue, clone);
    }
  });
  var fillCalendarValue = function fillCalendarValue2(date, index) {
    return (
      // Trigger change only when date changed
      fillIndex(calendarValue, index, date)
    );
  };
  var triggerPartConfirm = function triggerPartConfirm2(date, skipFocus) {
    var nextValue = calendarValue;
    if (date) {
      nextValue = fillCalendarValue(date, activeIndex);
    }
    updateSubmitIndex(activeIndex);
    var nextIndex = nextActiveIndex(nextValue);
    triggerCalendarChange(nextValue);
    flushSubmit(activeIndex, nextIndex === null);
    if (nextIndex === null) {
      triggerOpen(false, {
        force: true
      });
    } else if (!skipFocus) {
      selectorRef.current.focus({
        index: nextIndex
      });
    }
  };
  var onSelectorClick = function onSelectorClick2(event) {
    var _activeElement;
    var rootNode = event.target.getRootNode();
    if (!selectorRef.current.nativeElement.contains((_activeElement = rootNode.activeElement) !== null && _activeElement !== void 0 ? _activeElement : document.activeElement)) {
      var enabledIndex = disabled.findIndex(function(d) {
        return !d;
      });
      if (enabledIndex >= 0) {
        selectorRef.current.focus({
          index: enabledIndex
        });
      }
    }
    triggerOpen(true);
    onClick === null || onClick === void 0 || onClick(event);
  };
  var onSelectorClear = function onSelectorClear2() {
    triggerSubmitChange(null);
    triggerOpen(false, {
      force: true
    });
  };
  var _React$useState = reactExports.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), hoverSource = _React$useState2[0], setHoverSource = _React$useState2[1];
  var _React$useState3 = reactExports.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), internalHoverValues = _React$useState4[0], setInternalHoverValues = _React$useState4[1];
  var hoverValues = reactExports.useMemo(function() {
    return internalHoverValues || calendarValue;
  }, [calendarValue, internalHoverValues]);
  reactExports.useEffect(function() {
    if (!mergedOpen) {
      setInternalHoverValues(null);
    }
  }, [mergedOpen]);
  var _React$useState5 = reactExports.useState([0, 0, 0]), _React$useState6 = _slicedToArray(_React$useState5, 2), activeInfo = _React$useState6[0], setActiveInfo = _React$useState6[1];
  var presetList = usePresets(presets, ranges);
  var onPresetHover = function onPresetHover2(nextValues) {
    setInternalHoverValues(nextValues);
    setHoverSource("preset");
  };
  var onPresetSubmit = function onPresetSubmit2(nextValues) {
    var passed = triggerSubmitChange(nextValues);
    if (passed) {
      triggerOpen(false, {
        force: true
      });
    }
  };
  var onNow = function onNow2(now) {
    triggerPartConfirm(now);
  };
  var onPanelHover = function onPanelHover2(date) {
    setInternalHoverValues(date ? fillCalendarValue(date, activeIndex) : null);
    setHoverSource("cell");
  };
  var onPanelFocus = function onPanelFocus2(event) {
    triggerOpen(true);
    onSharedFocus(event);
  };
  var onPanelMouseDown = function onPanelMouseDown2() {
    lastOperation("panel");
  };
  var onPanelSelect = function onPanelSelect2(date) {
    var clone = fillIndex(calendarValue, activeIndex, date);
    triggerCalendarChange(clone);
    if (!needConfirm && !complexPicker && internalPicker === internalMode) {
      triggerPartConfirm(date);
    }
  };
  var onPopupClose = function onPopupClose2() {
    triggerOpen(false);
  };
  var onInternalCellRender = useCellRender$1(cellRender, dateRender, monthCellRender, getActiveRange(activeIndex));
  var panelValue = calendarValue[activeIndex] || null;
  var isPopupInvalidateDate = useEvent(function(date) {
    return isInvalidateDate(date, {
      activeIndex
    });
  });
  var panelProps = reactExports.useMemo(function() {
    var domProps = pickAttrs(filledProps, false);
    var restProps = omit(filledProps, [].concat(_toConsumableArray(Object.keys(domProps)), ["onChange", "onCalendarChange", "style", "className", "onPanelChange", "disabledTime"]));
    return restProps;
  }, [filledProps]);
  var panel = /* @__PURE__ */ reactExports.createElement(Popup, _extends({}, panelProps, {
    showNow: mergedShowNow,
    showTime: mergedShowTime,
    range: true,
    multiplePanel,
    activeInfo,
    disabledDate: mergedDisabledDate,
    onFocus: onPanelFocus,
    onBlur: onSharedBlur,
    onPanelMouseDown,
    picker,
    mode: mergedMode,
    internalMode,
    onPanelChange: triggerModeChange,
    format: maskFormat,
    value: panelValue,
    isInvalid: isPopupInvalidateDate,
    onChange: null,
    onSelect: onPanelSelect,
    pickerValue: currentPickerValue,
    defaultOpenValue: toArray$2(showTime === null || showTime === void 0 ? void 0 : showTime.defaultOpenValue)[activeIndex],
    onPickerValueChange: setCurrentPickerValue,
    hoverValue: hoverValues,
    onHover: onPanelHover,
    needConfirm,
    onSubmit: triggerPartConfirm,
    onOk: triggerOk,
    presets: presetList,
    onPresetHover,
    onPresetSubmit,
    onNow,
    cellRender: onInternalCellRender
  }));
  var onSelectorChange = function onSelectorChange2(date, index) {
    var clone = fillCalendarValue(date, index);
    triggerCalendarChange(clone);
  };
  var onSelectorInputChange = function onSelectorInputChange2() {
    lastOperation("input");
  };
  var onSelectorFocus = function onSelectorFocus2(event, index) {
    var activeListLen = activeIndexList.length;
    var lastActiveIndex = activeIndexList[activeListLen - 1];
    if (activeListLen && lastActiveIndex !== index && needConfirm && // Not change index if is not filled
    !allowEmpty[lastActiveIndex] && !hasActiveSubmitValue(lastActiveIndex) && calendarValue[lastActiveIndex]) {
      selectorRef.current.focus({
        index: lastActiveIndex
      });
      return;
    }
    lastOperation("input");
    triggerOpen(true, {
      inherit: true
    });
    if (activeIndex !== index && mergedOpen && !needConfirm && complexPicker) {
      triggerPartConfirm(null, true);
    }
    setActiveIndex(index);
    onSharedFocus(event, index);
  };
  var onSelectorBlur = function onSelectorBlur2(event, index) {
    triggerOpen(false);
    if (!needConfirm && lastOperation() === "input") {
      var nextIndex = nextActiveIndex(calendarValue);
      flushSubmit(activeIndex, nextIndex === null);
    }
    onSharedBlur(event, index);
  };
  var onSelectorKeyDown = function onSelectorKeyDown2(event, preventDefault) {
    if (event.key === "Tab") {
      triggerPartConfirm(null, true);
    }
    onKeyDown2 === null || onKeyDown2 === void 0 || onKeyDown2(event, preventDefault);
  };
  var context = reactExports.useMemo(function() {
    return {
      prefixCls,
      locale: locale2,
      generateConfig: generateConfig2,
      button: components.button,
      input: components.input
    };
  }, [prefixCls, locale2, generateConfig2, components.button, components.input]);
  useLayoutEffect(function() {
    if (mergedOpen && activeIndex !== void 0) {
      triggerModeChange(null, picker, false);
    }
  }, [mergedOpen, activeIndex, picker]);
  useLayoutEffect(function() {
    var lastOp = lastOperation();
    if (!mergedOpen && lastOp === "input") {
      triggerOpen(false);
      triggerPartConfirm(null, true);
    }
    if (!mergedOpen && complexPicker && !needConfirm && lastOp === "panel") {
      triggerOpen(true);
      triggerPartConfirm();
    }
  }, [mergedOpen]);
  return /* @__PURE__ */ reactExports.createElement(PickerContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement(PickerTrigger, _extends({}, pickTriggerProps(filledProps), {
    popupElement: panel,
    popupStyle: styles.popup,
    popupClassName: classNames2.popup,
    visible: mergedOpen,
    onClose: onPopupClose,
    range: true
  }), /* @__PURE__ */ reactExports.createElement(
    RefRangeSelector,
    _extends({}, filledProps, {
      // Ref
      ref: selectorRef,
      suffixIcon,
      activeIndex: focused || mergedOpen ? activeIndex : null,
      activeHelp: !!internalHoverValues,
      allHelp: !!internalHoverValues && hoverSource === "preset",
      focused,
      onFocus: onSelectorFocus,
      onBlur: onSelectorBlur,
      onKeyDown: onSelectorKeyDown,
      onSubmit: triggerPartConfirm,
      value: hoverValues,
      maskFormat,
      onChange: onSelectorChange,
      onInputChange: onSelectorInputChange,
      format: formatList,
      inputReadOnly,
      disabled,
      open: mergedOpen,
      onOpenChange: triggerOpen,
      onClick: onSelectorClick,
      onClear: onSelectorClear,
      invalid: submitInvalidates,
      onInvalid: onSelectorInvalid,
      onActiveInfo: setActiveInfo
    })
  )));
}
var RefRangePicker = /* @__PURE__ */ reactExports.forwardRef(RangePicker);
function MultipleDates(props) {
  var prefixCls = props.prefixCls, value = props.value, onRemove = props.onRemove, _props$removeIcon = props.removeIcon, removeIcon = _props$removeIcon === void 0 ? "×" : _props$removeIcon, formatDate = props.formatDate, disabled = props.disabled, maxTagCount = props.maxTagCount, placeholder = props.placeholder;
  var selectorCls = "".concat(prefixCls, "-selector");
  var selectionCls = "".concat(prefixCls, "-selection");
  var overflowCls = "".concat(selectionCls, "-overflow");
  function renderSelector(content, onClose) {
    return /* @__PURE__ */ reactExports.createElement("span", {
      className: classNames("".concat(selectionCls, "-item")),
      title: typeof content === "string" ? content : null
    }, /* @__PURE__ */ reactExports.createElement("span", {
      className: "".concat(selectionCls, "-item-content")
    }, content), !disabled && onClose && /* @__PURE__ */ reactExports.createElement("span", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
      },
      onClick: onClose,
      className: "".concat(selectionCls, "-item-remove")
    }, removeIcon));
  }
  function renderItem(date) {
    var displayLabel = formatDate(date);
    var onClose = function onClose2(event) {
      if (event) event.stopPropagation();
      onRemove(date);
    };
    return renderSelector(displayLabel, onClose);
  }
  function renderRest(omittedValues) {
    var content = "+ ".concat(omittedValues.length, " ...");
    return renderSelector(content);
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: selectorCls
  }, /* @__PURE__ */ reactExports.createElement(ForwardOverflow, {
    prefixCls: overflowCls,
    data: value,
    renderItem,
    renderRest,
    itemKey: function itemKey2(date) {
      return formatDate(date);
    },
    maxCount: maxTagCount
  }), !value.length && /* @__PURE__ */ reactExports.createElement("span", {
    className: "".concat(prefixCls, "-selection-placeholder")
  }, placeholder));
}
var _excluded$b = ["id", "open", "prefix", "clearIcon", "suffixIcon", "activeHelp", "allHelp", "focused", "onFocus", "onBlur", "onKeyDown", "locale", "generateConfig", "placeholder", "className", "style", "onClick", "onClear", "internalPicker", "value", "onChange", "onSubmit", "onInputChange", "multiple", "maxTagCount", "format", "maskFormat", "preserveInvalidOnBlur", "onInvalid", "disabled", "invalid", "inputReadOnly", "direction", "onOpenChange", "onMouseDown", "required", "aria-required", "autoFocus", "tabIndex", "removeIcon"];
function SingleSelector(props, ref) {
  props.id;
  var open = props.open, prefix = props.prefix, clearIcon = props.clearIcon, suffixIcon = props.suffixIcon;
  props.activeHelp;
  props.allHelp;
  var focused = props.focused;
  props.onFocus;
  props.onBlur;
  props.onKeyDown;
  var locale2 = props.locale, generateConfig2 = props.generateConfig, placeholder = props.placeholder, className = props.className, style = props.style, onClick = props.onClick, onClear = props.onClear, internalPicker = props.internalPicker, value = props.value, onChange = props.onChange, onSubmit = props.onSubmit;
  props.onInputChange;
  var multiple = props.multiple, maxTagCount = props.maxTagCount;
  props.format;
  props.maskFormat;
  props.preserveInvalidOnBlur;
  props.onInvalid;
  var disabled = props.disabled, invalid = props.invalid;
  props.inputReadOnly;
  var direction = props.direction;
  props.onOpenChange;
  var _onMouseDown = props.onMouseDown;
  props.required;
  props["aria-required"];
  var autoFocus = props.autoFocus, tabIndex = props.tabIndex, removeIcon = props.removeIcon, restProps = _objectWithoutProperties(props, _excluded$b);
  var rtl = direction === "rtl";
  var _React$useContext = reactExports.useContext(PickerContext), prefixCls = _React$useContext.prefixCls;
  var rootRef = reactExports.useRef();
  var inputRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: rootRef.current,
      focus: function focus(options) {
        var _inputRef$current;
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus(options);
      },
      blur: function blur() {
        var _inputRef$current2;
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.blur();
      }
    };
  });
  var rootProps = useRootProps(restProps);
  var onSingleChange = function onSingleChange2(date) {
    onChange([date]);
  };
  var onMultipleRemove = function onMultipleRemove2(date) {
    var nextValues = value.filter(function(oriDate) {
      return oriDate && !isSame(generateConfig2, locale2, oriDate, date, internalPicker);
    });
    onChange(nextValues);
    if (!open) {
      onSubmit();
    }
  };
  var _useInputProps = useInputProps(_objectSpread2(_objectSpread2({}, props), {}, {
    onChange: onSingleChange
  }), function(_ref) {
    var valueTexts = _ref.valueTexts;
    return {
      value: valueTexts[0] || "",
      active: focused
    };
  }), _useInputProps2 = _slicedToArray(_useInputProps, 2), getInputProps = _useInputProps2[0], getText = _useInputProps2[1];
  var showClear = !!(clearIcon && value.length && !disabled);
  var selectorNode = multiple ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(MultipleDates, {
    prefixCls,
    value,
    onRemove: onMultipleRemove,
    formatDate: getText,
    maxTagCount,
    disabled,
    removeIcon,
    placeholder
  }), /* @__PURE__ */ reactExports.createElement("input", {
    className: "".concat(prefixCls, "-multiple-input"),
    value: value.map(getText).join(","),
    ref: inputRef,
    readOnly: true,
    autoFocus,
    tabIndex
  }), /* @__PURE__ */ reactExports.createElement(Icon, {
    type: "suffix",
    icon: suffixIcon
  }), showClear && /* @__PURE__ */ reactExports.createElement(ClearIcon, {
    icon: clearIcon,
    onClear
  })) : /* @__PURE__ */ reactExports.createElement(Input, _extends({
    ref: inputRef
  }, getInputProps(), {
    autoFocus,
    tabIndex,
    suffixIcon,
    clearIcon: showClear && /* @__PURE__ */ reactExports.createElement(ClearIcon, {
      icon: clearIcon,
      onClear
    }),
    showActiveCls: false
  }));
  return /* @__PURE__ */ reactExports.createElement("div", _extends({}, rootProps, {
    className: classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-multiple"), multiple), "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-invalid"), invalid), "".concat(prefixCls, "-rtl"), rtl), className),
    style,
    ref: rootRef,
    onClick,
    onMouseDown: function onMouseDown(e) {
      var _inputRef$current3;
      var target = e.target;
      if (target !== ((_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.inputElement)) {
        e.preventDefault();
      }
      _onMouseDown === null || _onMouseDown === void 0 || _onMouseDown(e);
    }
  }), prefix && /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-prefix")
  }, prefix), selectorNode);
}
var RefSingleSelector = /* @__PURE__ */ reactExports.forwardRef(SingleSelector);
function Picker(props, ref) {
  var _useFilledProps = useFilledProps(props), _useFilledProps2 = _slicedToArray(_useFilledProps, 6), filledProps = _useFilledProps2[0], internalPicker = _useFilledProps2[1], complexPicker = _useFilledProps2[2], formatList = _useFilledProps2[3], maskFormat = _useFilledProps2[4], isInvalidateDate = _useFilledProps2[5];
  var _ref = filledProps, prefixCls = _ref.prefixCls, styles = _ref.styles, classNames2 = _ref.classNames, order = _ref.order, defaultValue = _ref.defaultValue, value = _ref.value, needConfirm = _ref.needConfirm, onChange = _ref.onChange, onKeyDown2 = _ref.onKeyDown, disabled = _ref.disabled, disabledDate = _ref.disabledDate, minDate = _ref.minDate, maxDate = _ref.maxDate, defaultOpen = _ref.defaultOpen, open = _ref.open, onOpenChange = _ref.onOpenChange, locale2 = _ref.locale, generateConfig2 = _ref.generateConfig, picker = _ref.picker, showNow = _ref.showNow, showToday = _ref.showToday, showTime = _ref.showTime, mode = _ref.mode, onPanelChange = _ref.onPanelChange, onCalendarChange = _ref.onCalendarChange, onOk = _ref.onOk, multiple = _ref.multiple, defaultPickerValue = _ref.defaultPickerValue, pickerValue = _ref.pickerValue, onPickerValueChange = _ref.onPickerValueChange, inputReadOnly = _ref.inputReadOnly, suffixIcon = _ref.suffixIcon, removeIcon = _ref.removeIcon, onFocus = _ref.onFocus, onBlur = _ref.onBlur, presets = _ref.presets, components = _ref.components, cellRender = _ref.cellRender, dateRender = _ref.dateRender, monthCellRender = _ref.monthCellRender, onClick = _ref.onClick;
  var selectorRef = usePickerRef(ref);
  function pickerParam(values) {
    if (values === null) {
      return null;
    }
    return multiple ? values : values[0];
  }
  var toggleDates = useToggleDates(generateConfig2, locale2, internalPicker);
  var _useOpen = useOpen(open, defaultOpen, [disabled], onOpenChange), _useOpen2 = _slicedToArray(_useOpen, 2), mergedOpen = _useOpen2[0], triggerOpen = _useOpen2[1];
  var onInternalCalendarChange = function onInternalCalendarChange2(dates, dateStrings, info) {
    if (onCalendarChange) {
      var filteredInfo = _objectSpread2({}, info);
      delete filteredInfo.range;
      onCalendarChange(pickerParam(dates), pickerParam(dateStrings), filteredInfo);
    }
  };
  var onInternalOk = function onInternalOk2(dates) {
    onOk === null || onOk === void 0 || onOk(pickerParam(dates));
  };
  var _useInnerValue = useInnerValue(generateConfig2, locale2, formatList, false, order, defaultValue, value, onInternalCalendarChange, onInternalOk), _useInnerValue2 = _slicedToArray(_useInnerValue, 5), mergedValue = _useInnerValue2[0], setInnerValue = _useInnerValue2[1], getCalendarValue = _useInnerValue2[2], triggerCalendarChange = _useInnerValue2[3], triggerOk = _useInnerValue2[4];
  var calendarValue = getCalendarValue();
  var _useRangeActive = useRangeActive([disabled]), _useRangeActive2 = _slicedToArray(_useRangeActive, 4), focused = _useRangeActive2[0], triggerFocus = _useRangeActive2[1], lastOperation = _useRangeActive2[2], activeIndex = _useRangeActive2[3];
  var onSharedFocus = function onSharedFocus2(event) {
    triggerFocus(true);
    onFocus === null || onFocus === void 0 || onFocus(event, {});
  };
  var onSharedBlur = function onSharedBlur2(event) {
    triggerFocus(false);
    onBlur === null || onBlur === void 0 || onBlur(event, {});
  };
  var _useMergedState = useMergedState(picker, {
    value: mode
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedMode = _useMergedState2[0], setMode = _useMergedState2[1];
  var internalMode = mergedMode === "date" && showTime ? "datetime" : mergedMode;
  var mergedShowNow = useShowNow(picker, mergedMode, showNow, showToday);
  var onInternalChange = onChange && function(dates, dateStrings) {
    onChange(pickerParam(dates), pickerParam(dateStrings));
  };
  var _useRangeValue = useRangeValue(
    _objectSpread2(_objectSpread2({}, filledProps), {}, {
      onChange: onInternalChange
    }),
    mergedValue,
    setInnerValue,
    getCalendarValue,
    triggerCalendarChange,
    [],
    //disabled,
    formatList,
    focused,
    mergedOpen,
    isInvalidateDate
  ), _useRangeValue2 = _slicedToArray(_useRangeValue, 2), triggerSubmitChange = _useRangeValue2[1];
  var _useFieldsInvalidate = useFieldsInvalidate(calendarValue, isInvalidateDate), _useFieldsInvalidate2 = _slicedToArray(_useFieldsInvalidate, 2), submitInvalidates = _useFieldsInvalidate2[0], onSelectorInvalid = _useFieldsInvalidate2[1];
  var submitInvalidate = reactExports.useMemo(function() {
    return submitInvalidates.some(function(invalidated) {
      return invalidated;
    });
  }, [submitInvalidates]);
  var onInternalPickerValueChange = function onInternalPickerValueChange2(dates, info) {
    if (onPickerValueChange) {
      var cleanInfo = _objectSpread2(_objectSpread2({}, info), {}, {
        mode: info.mode[0]
      });
      delete cleanInfo.range;
      onPickerValueChange(dates[0], cleanInfo);
    }
  };
  var _useRangePickerValue = useRangePickerValue(
    generateConfig2,
    locale2,
    calendarValue,
    [mergedMode],
    mergedOpen,
    activeIndex,
    internalPicker,
    false,
    // multiplePanel,
    defaultPickerValue,
    pickerValue,
    toArray$2(showTime === null || showTime === void 0 ? void 0 : showTime.defaultOpenValue),
    onInternalPickerValueChange,
    minDate,
    maxDate
  ), _useRangePickerValue2 = _slicedToArray(_useRangePickerValue, 2), currentPickerValue = _useRangePickerValue2[0], setCurrentPickerValue = _useRangePickerValue2[1];
  var triggerModeChange = useEvent(function(nextPickerValue, nextMode, triggerEvent) {
    setMode(nextMode);
    if (onPanelChange && triggerEvent !== false) {
      var lastPickerValue = nextPickerValue || calendarValue[calendarValue.length - 1];
      onPanelChange(lastPickerValue, nextMode);
    }
  });
  var triggerConfirm = function triggerConfirm2() {
    triggerSubmitChange(getCalendarValue());
    triggerOpen(false, {
      force: true
    });
  };
  var onSelectorClick = function onSelectorClick2(event) {
    if (!disabled && !selectorRef.current.nativeElement.contains(document.activeElement)) {
      selectorRef.current.focus();
    }
    triggerOpen(true);
    onClick === null || onClick === void 0 || onClick(event);
  };
  var onSelectorClear = function onSelectorClear2() {
    triggerSubmitChange(null);
    triggerOpen(false, {
      force: true
    });
  };
  var _React$useState = reactExports.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), hoverSource = _React$useState2[0], setHoverSource = _React$useState2[1];
  var _React$useState3 = reactExports.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), internalHoverValue = _React$useState4[0], setInternalHoverValue = _React$useState4[1];
  var hoverValues = reactExports.useMemo(function() {
    var values = [internalHoverValue].concat(_toConsumableArray(calendarValue)).filter(function(date) {
      return date;
    });
    return multiple ? values : values.slice(0, 1);
  }, [calendarValue, internalHoverValue, multiple]);
  var selectorValues = reactExports.useMemo(function() {
    if (!multiple && internalHoverValue) {
      return [internalHoverValue];
    }
    return calendarValue.filter(function(date) {
      return date;
    });
  }, [calendarValue, internalHoverValue, multiple]);
  reactExports.useEffect(function() {
    if (!mergedOpen) {
      setInternalHoverValue(null);
    }
  }, [mergedOpen]);
  var presetList = usePresets(presets);
  var onPresetHover = function onPresetHover2(nextValue) {
    setInternalHoverValue(nextValue);
    setHoverSource("preset");
  };
  var onPresetSubmit = function onPresetSubmit2(nextValue) {
    var nextCalendarValues = multiple ? toggleDates(getCalendarValue(), nextValue) : [nextValue];
    var passed = triggerSubmitChange(nextCalendarValues);
    if (passed && !multiple) {
      triggerOpen(false, {
        force: true
      });
    }
  };
  var onNow = function onNow2(now) {
    onPresetSubmit(now);
  };
  var onPanelHover = function onPanelHover2(date) {
    setInternalHoverValue(date);
    setHoverSource("cell");
  };
  var onPanelFocus = function onPanelFocus2(event) {
    triggerOpen(true);
    onSharedFocus(event);
  };
  var onPanelSelect = function onPanelSelect2(date) {
    lastOperation("panel");
    if (multiple && internalMode !== picker) {
      return;
    }
    var nextValues = multiple ? toggleDates(getCalendarValue(), date) : [date];
    triggerCalendarChange(nextValues);
    if (!needConfirm && !complexPicker && internalPicker === internalMode) {
      triggerConfirm();
    }
  };
  var onPopupClose = function onPopupClose2() {
    triggerOpen(false);
  };
  var onInternalCellRender = useCellRender$1(cellRender, dateRender, monthCellRender);
  var panelProps = reactExports.useMemo(function() {
    var domProps = pickAttrs(filledProps, false);
    var restProps = omit(filledProps, [].concat(_toConsumableArray(Object.keys(domProps)), ["onChange", "onCalendarChange", "style", "className", "onPanelChange"]));
    return _objectSpread2(_objectSpread2({}, restProps), {}, {
      multiple: filledProps.multiple
    });
  }, [filledProps]);
  var panel = /* @__PURE__ */ reactExports.createElement(Popup, _extends({}, panelProps, {
    showNow: mergedShowNow,
    showTime,
    disabledDate,
    onFocus: onPanelFocus,
    onBlur: onSharedBlur,
    picker,
    mode: mergedMode,
    internalMode,
    onPanelChange: triggerModeChange,
    format: maskFormat,
    value: calendarValue,
    isInvalid: isInvalidateDate,
    onChange: null,
    onSelect: onPanelSelect,
    pickerValue: currentPickerValue,
    defaultOpenValue: showTime === null || showTime === void 0 ? void 0 : showTime.defaultOpenValue,
    onPickerValueChange: setCurrentPickerValue,
    hoverValue: hoverValues,
    onHover: onPanelHover,
    needConfirm,
    onSubmit: triggerConfirm,
    onOk: triggerOk,
    presets: presetList,
    onPresetHover,
    onPresetSubmit,
    onNow,
    cellRender: onInternalCellRender
  }));
  var onSelectorChange = function onSelectorChange2(date) {
    triggerCalendarChange(date);
  };
  var onSelectorInputChange = function onSelectorInputChange2() {
    lastOperation("input");
  };
  var onSelectorFocus = function onSelectorFocus2(event) {
    lastOperation("input");
    triggerOpen(true, {
      inherit: true
    });
    onSharedFocus(event);
  };
  var onSelectorBlur = function onSelectorBlur2(event) {
    triggerOpen(false);
    onSharedBlur(event);
  };
  var onSelectorKeyDown = function onSelectorKeyDown2(event, preventDefault) {
    if (event.key === "Tab") {
      triggerConfirm();
    }
    onKeyDown2 === null || onKeyDown2 === void 0 || onKeyDown2(event, preventDefault);
  };
  var context = reactExports.useMemo(function() {
    return {
      prefixCls,
      locale: locale2,
      generateConfig: generateConfig2,
      button: components.button,
      input: components.input
    };
  }, [prefixCls, locale2, generateConfig2, components.button, components.input]);
  useLayoutEffect(function() {
    if (mergedOpen && activeIndex !== void 0) {
      triggerModeChange(null, picker, false);
    }
  }, [mergedOpen, activeIndex, picker]);
  useLayoutEffect(function() {
    var lastOp = lastOperation();
    if (!mergedOpen && lastOp === "input") {
      triggerOpen(false);
      triggerConfirm();
    }
    if (!mergedOpen && complexPicker && !needConfirm && lastOp === "panel") {
      triggerConfirm();
    }
  }, [mergedOpen]);
  return /* @__PURE__ */ reactExports.createElement(PickerContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement(PickerTrigger, _extends({}, pickTriggerProps(filledProps), {
    popupElement: panel,
    popupStyle: styles.popup,
    popupClassName: classNames2.popup,
    visible: mergedOpen,
    onClose: onPopupClose
  }), /* @__PURE__ */ reactExports.createElement(
    RefSingleSelector,
    _extends({}, filledProps, {
      // Ref
      ref: selectorRef,
      suffixIcon,
      removeIcon,
      activeHelp: !!internalHoverValue,
      allHelp: !!internalHoverValue && hoverSource === "preset",
      focused,
      onFocus: onSelectorFocus,
      onBlur: onSelectorBlur,
      onKeyDown: onSelectorKeyDown,
      onSubmit: triggerConfirm,
      value: selectorValues,
      maskFormat,
      onChange: onSelectorChange,
      onInputChange: onSelectorInputChange,
      internalPicker,
      format: formatList,
      inputReadOnly,
      disabled,
      open: mergedOpen,
      onOpenChange: triggerOpen,
      onClick: onSelectorClick,
      onClear: onSelectorClear,
      invalid: submitInvalidate,
      onInvalid: function onInvalid(invalid) {
        onSelectorInvalid(invalid, 0);
      }
    })
  )));
}
var RefPicker = /* @__PURE__ */ reactExports.forwardRef(Picker);
const RadioGroupContext = /* @__PURE__ */ reactExports.createContext(null);
const RadioGroupContextProvider = RadioGroupContext.Provider;
const RadioOptionTypeContext = /* @__PURE__ */ reactExports.createContext(null);
const RadioOptionTypeContextProvider = RadioOptionTypeContext.Provider;
var _excluded$a = ["prefixCls", "className", "style", "checked", "disabled", "defaultChecked", "type", "title", "onChange"];
var Checkbox$2 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-checkbox" : _props$prefixCls, className = props.className, style = props.style, checked = props.checked, disabled = props.disabled, _props$defaultChecked = props.defaultChecked, defaultChecked = _props$defaultChecked === void 0 ? false : _props$defaultChecked, _props$type = props.type, type = _props$type === void 0 ? "checkbox" : _props$type, title = props.title, onChange = props.onChange, inputProps = _objectWithoutProperties(props, _excluded$a);
  var inputRef = reactExports.useRef(null);
  var holderRef = reactExports.useRef(null);
  var _useMergedState = useMergedState(defaultChecked, {
    value: checked
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), rawValue = _useMergedState2[0], setRawValue = _useMergedState2[1];
  reactExports.useImperativeHandle(ref, function() {
    return {
      focus: function focus(options) {
        var _inputRef$current;
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus(options);
      },
      blur: function blur() {
        var _inputRef$current2;
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.blur();
      },
      input: inputRef.current,
      nativeElement: holderRef.current
    };
  });
  var classString = classNames(prefixCls, className, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-checked"), rawValue), "".concat(prefixCls, "-disabled"), disabled));
  var handleChange = function handleChange2(e) {
    if (disabled) {
      return;
    }
    if (!("checked" in props)) {
      setRawValue(e.target.checked);
    }
    onChange === null || onChange === void 0 || onChange({
      target: _objectSpread2(_objectSpread2({}, props), {}, {
        type,
        checked: e.target.checked
      }),
      stopPropagation: function stopPropagation() {
        e.stopPropagation();
      },
      preventDefault: function preventDefault() {
        e.preventDefault();
      },
      nativeEvent: e.nativeEvent
    });
  };
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classString,
    title,
    style,
    ref: holderRef
  }, /* @__PURE__ */ reactExports.createElement("input", _extends({}, inputProps, {
    className: "".concat(prefixCls, "-input"),
    ref: inputRef,
    onChange: handleChange,
    disabled,
    checked: !!rawValue,
    type
  })), /* @__PURE__ */ reactExports.createElement("span", {
    className: "".concat(prefixCls, "-inner")
  }));
});
function useBubbleLock(onOriginInputClick) {
  const labelClickLockRef = React.useRef(null);
  const clearLock = () => {
    wrapperRaf.cancel(labelClickLockRef.current);
    labelClickLockRef.current = null;
  };
  const onLabelClick = () => {
    clearLock();
    labelClickLockRef.current = wrapperRaf(() => {
      labelClickLockRef.current = null;
    });
  };
  const onInputClick = (e) => {
    if (labelClickLockRef.current) {
      e.stopPropagation();
      clearLock();
    }
    onOriginInputClick === null || onOriginInputClick === void 0 ? void 0 : onOriginInputClick(e);
  };
  return [onLabelClick, onInputClick];
}
const getGroupRadioStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      fontSize: 0,
      // RTL
      [`&${groupPrefixCls}-rtl`]: {
        direction: "rtl"
      },
      [`&${groupPrefixCls}-block`]: {
        display: "flex"
      },
      [`${antCls}-badge ${antCls}-badge-count`]: {
        zIndex: 1
      },
      [`> ${antCls}-badge:not(:first-child) > ${antCls}-button-wrapper`]: {
        borderInlineStart: "none"
      }
    })
  };
};
const getRadioBasicStyle = (token) => {
  const {
    componentCls,
    wrapperMarginInlineEnd,
    colorPrimary,
    radioSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOutCirc,
    colorBgContainer,
    colorBorder,
    lineWidth,
    colorBgContainerDisabled,
    colorTextDisabled,
    paddingXS,
    dotColorDisabled,
    lineType,
    radioColor,
    radioBgColor,
    calc
  } = token;
  const radioInnerPrefixCls = `${componentCls}-inner`;
  const dotPadding = 4;
  const radioDotDisabledSize = calc(radioSize).sub(calc(dotPadding).mul(2));
  const radioSizeCalc = calc(1).mul(radioSize).equal({
    unit: true
  });
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-flex",
      alignItems: "baseline",
      marginInlineStart: 0,
      marginInlineEnd: wrapperMarginInlineEnd,
      cursor: "pointer",
      "&:last-child": {
        marginInlineEnd: 0
      },
      // RTL
      [`&${componentCls}-wrapper-rtl`]: {
        direction: "rtl"
      },
      "&-disabled": {
        cursor: "not-allowed",
        color: token.colorTextDisabled
      },
      "&::after": {
        display: "inline-block",
        width: 0,
        overflow: "hidden",
        content: '"\\a0"'
      },
      "&-block": {
        flex: 1,
        justifyContent: "center"
      },
      // hashId 在 wrapper 上，只能铺平
      [`${componentCls}-checked::after`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: "100%",
        height: "100%",
        border: `${unit(lineWidth)} ${lineType} ${colorPrimary}`,
        borderRadius: "50%",
        visibility: "hidden",
        opacity: 0,
        content: '""'
      },
      [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "relative",
        display: "inline-block",
        outline: "none",
        cursor: "pointer",
        alignSelf: "center",
        borderRadius: "50%"
      }),
      [`${componentCls}-wrapper:hover &,
        &:hover ${radioInnerPrefixCls}`]: {
        borderColor: colorPrimary
      },
      [`${componentCls}-input:focus-visible + ${radioInnerPrefixCls}`]: genFocusOutline(token),
      [`${componentCls}:hover::after, ${componentCls}-wrapper:hover &::after`]: {
        visibility: "visible"
      },
      [`${componentCls}-inner`]: {
        "&::after": {
          boxSizing: "border-box",
          position: "absolute",
          insetBlockStart: "50%",
          insetInlineStart: "50%",
          display: "block",
          width: radioSizeCalc,
          height: radioSizeCalc,
          marginBlockStart: calc(1).mul(radioSize).div(-2).equal({
            unit: true
          }),
          marginInlineStart: calc(1).mul(radioSize).div(-2).equal({
            unit: true
          }),
          backgroundColor: radioColor,
          borderBlockStart: 0,
          borderInlineStart: 0,
          borderRadius: radioSizeCalc,
          transform: "scale(0)",
          opacity: 0,
          transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`,
          content: '""'
        },
        boxSizing: "border-box",
        position: "relative",
        insetBlockStart: 0,
        insetInlineStart: 0,
        display: "block",
        width: radioSizeCalc,
        height: radioSizeCalc,
        backgroundColor: colorBgContainer,
        borderColor: colorBorder,
        borderStyle: "solid",
        borderWidth: lineWidth,
        borderRadius: "50%",
        transition: `all ${motionDurationMid}`
      },
      [`${componentCls}-input`]: {
        position: "absolute",
        inset: 0,
        zIndex: 1,
        cursor: "pointer",
        opacity: 0
      },
      // 选中状态
      [`${componentCls}-checked`]: {
        [radioInnerPrefixCls]: {
          borderColor: colorPrimary,
          backgroundColor: radioBgColor,
          "&::after": {
            transform: `scale(${token.calc(token.dotSize).div(radioSize).equal()})`,
            opacity: 1,
            transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`
          }
        }
      },
      [`${componentCls}-disabled`]: {
        cursor: "not-allowed",
        [radioInnerPrefixCls]: {
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder,
          cursor: "not-allowed",
          "&::after": {
            backgroundColor: dotColorDisabled
          }
        },
        [`${componentCls}-input`]: {
          cursor: "not-allowed"
        },
        [`${componentCls}-disabled + span`]: {
          color: colorTextDisabled,
          cursor: "not-allowed"
        },
        [`&${componentCls}-checked`]: {
          [radioInnerPrefixCls]: {
            "&::after": {
              transform: `scale(${calc(radioDotDisabledSize).div(radioSize).equal()})`
            }
          }
        }
      },
      [`span${componentCls} + *`]: {
        paddingInlineStart: paddingXS,
        paddingInlineEnd: paddingXS
      }
    })
  };
};
const getRadioButtonStyle = (token) => {
  const {
    buttonColor,
    controlHeight,
    componentCls,
    lineWidth,
    lineType,
    colorBorder,
    motionDurationMid,
    buttonPaddingInline,
    fontSize,
    buttonBg,
    fontSizeLG,
    controlHeightLG,
    controlHeightSM,
    paddingXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusLG,
    buttonCheckedBg,
    buttonSolidCheckedColor,
    colorTextDisabled,
    colorBgContainerDisabled,
    buttonCheckedBgDisabled,
    buttonCheckedColorDisabled,
    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive,
    buttonSolidCheckedBg,
    buttonSolidCheckedHoverBg,
    buttonSolidCheckedActiveBg,
    calc
  } = token;
  return {
    [`${componentCls}-button-wrapper`]: {
      position: "relative",
      display: "inline-block",
      height: controlHeight,
      margin: 0,
      paddingInline: buttonPaddingInline,
      paddingBlock: 0,
      color: buttonColor,
      fontSize,
      lineHeight: unit(calc(controlHeight).sub(calc(lineWidth).mul(2)).equal()),
      background: buttonBg,
      border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
      // strange align fix for chrome but works
      // https://gw.alipayobjects.com/zos/rmsportal/VFTfKXJuogBAXcvfAUWJ.gif
      borderBlockStartWidth: calc(lineWidth).add(0.02).equal(),
      borderInlineEndWidth: lineWidth,
      cursor: "pointer",
      transition: [`color ${motionDurationMid}`, `background ${motionDurationMid}`, `box-shadow ${motionDurationMid}`].join(","),
      a: {
        color: buttonColor
      },
      [`> ${componentCls}-button`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: -1,
        width: "100%",
        height: "100%"
      },
      "&:not(:last-child)": {
        marginInlineEnd: calc(lineWidth).mul(-1).equal()
      },
      "&:first-child": {
        borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
        borderStartStartRadius: borderRadius,
        borderEndStartRadius: borderRadius
      },
      "&:last-child": {
        borderStartEndRadius: borderRadius,
        borderEndEndRadius: borderRadius
      },
      "&:first-child:last-child": {
        borderRadius
      },
      [`${componentCls}-group-large &`]: {
        height: controlHeightLG,
        fontSize: fontSizeLG,
        lineHeight: unit(calc(controlHeightLG).sub(calc(lineWidth).mul(2)).equal()),
        "&:first-child": {
          borderStartStartRadius: borderRadiusLG,
          borderEndStartRadius: borderRadiusLG
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        }
      },
      [`${componentCls}-group-small &`]: {
        height: controlHeightSM,
        paddingInline: calc(paddingXS).sub(lineWidth).equal(),
        paddingBlock: 0,
        lineHeight: unit(calc(controlHeightSM).sub(calc(lineWidth).mul(2)).equal()),
        "&:first-child": {
          borderStartStartRadius: borderRadiusSM,
          borderEndStartRadius: borderRadiusSM
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusSM,
          borderEndEndRadius: borderRadiusSM
        }
      },
      "&:hover": {
        position: "relative",
        color: colorPrimary
      },
      "&:has(:focus-visible)": genFocusOutline(token),
      [`${componentCls}-inner, input[type='checkbox'], input[type='radio']`]: {
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: "none"
      },
      [`&-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        zIndex: 1,
        color: colorPrimary,
        background: buttonCheckedBg,
        borderColor: colorPrimary,
        "&::before": {
          backgroundColor: colorPrimary
        },
        "&:first-child": {
          borderColor: colorPrimary
        },
        "&:hover": {
          color: colorPrimaryHover,
          borderColor: colorPrimaryHover,
          "&::before": {
            backgroundColor: colorPrimaryHover
          }
        },
        "&:active": {
          color: colorPrimaryActive,
          borderColor: colorPrimaryActive,
          "&::before": {
            backgroundColor: colorPrimaryActive
          }
        }
      },
      [`${componentCls}-group-solid &-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        color: buttonSolidCheckedColor,
        background: buttonSolidCheckedBg,
        borderColor: buttonSolidCheckedBg,
        "&:hover": {
          color: buttonSolidCheckedColor,
          background: buttonSolidCheckedHoverBg,
          borderColor: buttonSolidCheckedHoverBg
        },
        "&:active": {
          color: buttonSolidCheckedColor,
          background: buttonSolidCheckedActiveBg,
          borderColor: buttonSolidCheckedActiveBg
        }
      },
      "&-disabled": {
        color: colorTextDisabled,
        backgroundColor: colorBgContainerDisabled,
        borderColor: colorBorder,
        cursor: "not-allowed",
        "&:first-child, &:hover": {
          color: colorTextDisabled,
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder
        }
      },
      [`&-disabled${componentCls}-button-wrapper-checked`]: {
        color: buttonCheckedColorDisabled,
        backgroundColor: buttonCheckedBgDisabled,
        borderColor: colorBorder,
        boxShadow: "none"
      },
      "&-block": {
        flex: 1,
        textAlign: "center"
      }
    }
  };
};
const prepareComponentToken$4 = (token) => {
  const {
    wireframe,
    padding,
    marginXS,
    lineWidth,
    fontSizeLG,
    colorText,
    colorBgContainer,
    colorTextDisabled,
    controlItemBgActiveDisabled,
    colorTextLightSolid,
    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive,
    colorWhite
  } = token;
  const dotPadding = 4;
  const radioSize = fontSizeLG;
  const radioDotSize = wireframe ? radioSize - dotPadding * 2 : radioSize - (dotPadding + lineWidth) * 2;
  return {
    // Radio
    radioSize,
    dotSize: radioDotSize,
    dotColorDisabled: colorTextDisabled,
    // Radio buttons
    buttonSolidCheckedColor: colorTextLightSolid,
    buttonSolidCheckedBg: colorPrimary,
    buttonSolidCheckedHoverBg: colorPrimaryHover,
    buttonSolidCheckedActiveBg: colorPrimaryActive,
    buttonBg: colorBgContainer,
    buttonCheckedBg: colorBgContainer,
    buttonColor: colorText,
    buttonCheckedBgDisabled: controlItemBgActiveDisabled,
    buttonCheckedColorDisabled: colorTextDisabled,
    buttonPaddingInline: padding - lineWidth,
    wrapperMarginInlineEnd: marginXS,
    // internal
    radioColor: wireframe ? colorPrimary : colorWhite,
    radioBgColor: wireframe ? colorBgContainer : colorPrimary
  };
};
const useStyle$5 = genStyleHooks("Radio", (token) => {
  const {
    controlOutline,
    controlOutlineWidth
  } = token;
  const radioFocusShadow = `0 0 0 ${unit(controlOutlineWidth)} ${controlOutline}`;
  const radioButtonFocusShadow = radioFocusShadow;
  const radioToken = merge(token, {
    radioFocusShadow,
    radioButtonFocusShadow
  });
  return [getGroupRadioStyle(radioToken), getRadioBasicStyle(radioToken), getRadioButtonStyle(radioToken)];
}, prepareComponentToken$4, {
  unitless: {
    radioSize: true,
    dotSize: true
  }
});
var __rest$9 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalRadio = (props, ref) => {
  var _a, _b;
  const groupContext = reactExports.useContext(RadioGroupContext);
  const radioOptionTypeContext = reactExports.useContext(RadioOptionTypeContext);
  const {
    getPrefixCls,
    direction,
    radio
  } = reactExports.useContext(ConfigContext);
  const innerRef = reactExports.useRef(null);
  const mergedRef = composeRef(ref, innerRef);
  const {
    isFormItemInput
  } = reactExports.useContext(FormItemInputContext);
  const onChange = (e) => {
    var _a2, _b2;
    (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, e);
    (_b2 = groupContext === null || groupContext === void 0 ? void 0 : groupContext.onChange) === null || _b2 === void 0 ? void 0 : _b2.call(groupContext, e);
  };
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    style,
    title
  } = props, restProps = __rest$9(props, ["prefixCls", "className", "rootClassName", "children", "style", "title"]);
  const radioPrefixCls = getPrefixCls("radio", customizePrefixCls);
  const isButtonType = ((groupContext === null || groupContext === void 0 ? void 0 : groupContext.optionType) || radioOptionTypeContext) === "button";
  const prefixCls = isButtonType ? `${radioPrefixCls}-button` : radioPrefixCls;
  const rootCls = useCSSVarCls(radioPrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$5(radioPrefixCls, rootCls);
  const radioProps = Object.assign({}, restProps);
  const disabled = reactExports.useContext(DisabledContext);
  if (groupContext) {
    radioProps.name = groupContext.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === groupContext.value;
    radioProps.disabled = (_a = radioProps.disabled) !== null && _a !== void 0 ? _a : groupContext.disabled;
  }
  radioProps.disabled = (_b = radioProps.disabled) !== null && _b !== void 0 ? _b : disabled;
  const wrapperClassString = classNames(`${prefixCls}-wrapper`, {
    [`${prefixCls}-wrapper-checked`]: radioProps.checked,
    [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    [`${prefixCls}-wrapper-rtl`]: direction === "rtl",
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
    [`${prefixCls}-wrapper-block`]: !!(groupContext === null || groupContext === void 0 ? void 0 : groupContext.block)
  }, radio === null || radio === void 0 ? void 0 : radio.className, className, rootClassName, hashId, cssVarCls, rootCls);
  const [onLabelClick, onInputClick] = useBubbleLock(radioProps.onClick);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Wave, {
    component: "Radio",
    disabled: radioProps.disabled
  }, /* @__PURE__ */ reactExports.createElement("label", {
    className: wrapperClassString,
    style: Object.assign(Object.assign({}, radio === null || radio === void 0 ? void 0 : radio.style), style),
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    title,
    onClick: onLabelClick
  }, /* @__PURE__ */ reactExports.createElement(Checkbox$2, Object.assign({}, radioProps, {
    className: classNames(radioProps.className, {
      [TARGET_CLS]: !isButtonType
    }),
    type: "radio",
    prefixCls,
    ref: mergedRef,
    onClick: onInputClick
  })), children !== void 0 ? /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-label`
  }, children) : null)));
};
const Radio$1 = /* @__PURE__ */ reactExports.forwardRef(InternalRadio);
function toArray$1(candidate) {
  if (candidate === void 0 || candidate === false) {
    return [];
  }
  return Array.isArray(candidate) ? candidate : [candidate];
}
(function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
});
function toNamePathStr(name) {
  const namePath = toArray$1(name);
  return namePath.join("_");
}
const RadioGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    name: formItemName
  } = reactExports.useContext(FormItemInputContext);
  const defaultName = useId(toNamePathStr(formItemName));
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    options,
    buttonStyle = "outline",
    disabled,
    children,
    size: customizeSize,
    style,
    id,
    optionType,
    name = defaultName,
    defaultValue,
    value: customizedValue,
    block = false,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur
  } = props;
  const [value, setValue] = useMergedState(defaultValue, {
    value: customizedValue
  });
  const onRadioChange = reactExports.useCallback((event) => {
    const lastValue = value;
    const val = event.target.value;
    if (!("value" in props)) {
      setValue(val);
    }
    if (val !== lastValue) {
      onChange === null || onChange === void 0 ? void 0 : onChange(event);
    }
  }, [value, setValue, onChange]);
  const prefixCls = getPrefixCls("radio", customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$5(prefixCls, rootCls);
  let childrenToRender = children;
  if (options && options.length > 0) {
    childrenToRender = options.map((option) => {
      if (typeof option === "string" || typeof option === "number") {
        return /* @__PURE__ */ reactExports.createElement(Radio$1, {
          key: option.toString(),
          prefixCls,
          disabled,
          value: option,
          checked: value === option
        }, option);
      }
      return /* @__PURE__ */ reactExports.createElement(Radio$1, {
        key: `radio-group-value-options-${option.value}`,
        prefixCls,
        disabled: option.disabled || disabled,
        value: option.value,
        checked: value === option.value,
        title: option.title,
        style: option.style,
        className: option.className,
        id: option.id,
        required: option.required
      }, option.label);
    });
  }
  const mergedSize = useSize(customizeSize);
  const classString = classNames(groupPrefixCls, `${groupPrefixCls}-${buttonStyle}`, {
    [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
    [`${groupPrefixCls}-rtl`]: direction === "rtl",
    [`${groupPrefixCls}-block`]: block
  }, className, rootClassName, hashId, cssVarCls, rootCls);
  const memoizedValue = reactExports.useMemo(() => ({
    onChange: onRadioChange,
    value,
    disabled,
    name,
    optionType,
    block
  }), [onRadioChange, value, disabled, name, optionType, block]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({}, pickAttrs(props, {
    aria: true,
    data: true
  }), {
    className: classString,
    style,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    id,
    ref
  }), /* @__PURE__ */ reactExports.createElement(RadioGroupContextProvider, {
    value: memoizedValue
  }, childrenToRender)));
});
const Group = /* @__PURE__ */ reactExports.memo(RadioGroup);
var __rest$8 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const RadioButton = (props, ref) => {
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls
  } = props, radioProps = __rest$8(props, ["prefixCls"]);
  const prefixCls = getPrefixCls("radio", customizePrefixCls);
  return /* @__PURE__ */ reactExports.createElement(RadioOptionTypeContextProvider, {
    value: "button"
  }, /* @__PURE__ */ reactExports.createElement(Radio$1, Object.assign({
    prefixCls
  }, radioProps, {
    type: "radio",
    ref
  })));
};
const Button = /* @__PURE__ */ reactExports.forwardRef(RadioButton);
const Radio = Radio$1;
Radio.Button = Button;
Radio.Group = Group;
Radio.__ANT_RADIO = true;
const genSize = (token, suffix) => {
  const {
    componentCls,
    controlHeight
  } = token;
  const suffixCls = suffix ? `${componentCls}-${suffix}` : "";
  const multipleSelectorUnit = getMultipleSelectorUnit(token);
  return [
    // genSelectionStyle(token, suffix),
    {
      [`${componentCls}-multiple${suffixCls}`]: {
        paddingBlock: multipleSelectorUnit.containerPadding,
        paddingInlineStart: multipleSelectorUnit.basePadding,
        minHeight: controlHeight,
        // ======================== Selections ========================
        [`${componentCls}-selection-item`]: {
          height: multipleSelectorUnit.itemHeight,
          lineHeight: unit(multipleSelectorUnit.itemLineHeight)
        }
      }
    }
  ];
};
const genPickerMultipleStyle = (token) => {
  const {
    componentCls,
    calc,
    lineWidth
  } = token;
  const smallToken = merge(token, {
    fontHeight: token.fontSize,
    selectHeight: token.controlHeightSM,
    multipleSelectItemHeight: token.multipleItemHeightSM,
    borderRadius: token.borderRadiusSM,
    borderRadiusSM: token.borderRadiusXS,
    controlHeight: token.controlHeightSM
  });
  const largeToken = merge(token, {
    fontHeight: calc(token.multipleItemHeightLG).sub(calc(lineWidth).mul(2).equal()).equal(),
    fontSize: token.fontSizeLG,
    selectHeight: token.controlHeightLG,
    multipleSelectItemHeight: token.multipleItemHeightLG,
    borderRadius: token.borderRadiusLG,
    borderRadiusSM: token.borderRadius,
    controlHeight: token.controlHeightLG
  });
  return [
    // ======================== Size ========================
    genSize(smallToken, "small"),
    genSize(token),
    genSize(largeToken, "large"),
    // ====================== Selection ======================
    {
      [`${componentCls}${componentCls}-multiple`]: Object.assign(Object.assign({
        width: "100%",
        cursor: "text",
        // ==================== Selector =====================
        [`${componentCls}-selector`]: {
          flex: "auto",
          padding: 0,
          position: "relative",
          "&:after": {
            margin: 0
          },
          // ================== placeholder ==================
          [`${componentCls}-selection-placeholder`]: {
            position: "absolute",
            top: "50%",
            insetInlineStart: token.inputPaddingHorizontalBase,
            insetInlineEnd: 0,
            transform: "translateY(-50%)",
            transition: `all ${token.motionDurationSlow}`,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flex: 1,
            color: token.colorTextPlaceholder,
            pointerEvents: "none"
          }
        }
      }, genOverflowStyle(token)), {
        // ====================== Input ======================
        // Input is `readonly`, which is used for a11y only
        [`${componentCls}-multiple-input`]: {
          width: 0,
          height: 0,
          border: 0,
          visibility: "hidden",
          position: "absolute",
          zIndex: -1
        }
      })
    }
  ];
};
const genPickerCellInnerStyle = (token) => {
  const {
    pickerCellCls,
    pickerCellInnerCls,
    cellHeight,
    borderRadiusSM,
    motionDurationMid,
    cellHoverBg,
    lineWidth,
    lineType,
    colorPrimary,
    cellActiveWithRangeBg,
    colorTextLightSolid,
    colorTextDisabled,
    cellBgDisabled,
    colorFillSecondary
  } = token;
  return {
    "&::before": {
      position: "absolute",
      top: "50%",
      insetInlineStart: 0,
      insetInlineEnd: 0,
      zIndex: 1,
      height: cellHeight,
      transform: "translateY(-50%)",
      content: '""',
      pointerEvents: "none"
    },
    // >>> Default
    [pickerCellInnerCls]: {
      position: "relative",
      zIndex: 2,
      display: "inline-block",
      minWidth: cellHeight,
      height: cellHeight,
      lineHeight: unit(cellHeight),
      borderRadius: borderRadiusSM,
      transition: `background ${motionDurationMid}`
    },
    // >>> Hover
    [`&:hover:not(${pickerCellCls}-in-view):not(${pickerCellCls}-disabled),
    &:hover:not(${pickerCellCls}-selected):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end):not(${pickerCellCls}-disabled)`]: {
      [pickerCellInnerCls]: {
        background: cellHoverBg
      }
    },
    // >>> Today
    [`&-in-view${pickerCellCls}-today ${pickerCellInnerCls}`]: {
      "&::before": {
        position: "absolute",
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: 1,
        border: `${unit(lineWidth)} ${lineType} ${colorPrimary}`,
        borderRadius: borderRadiusSM,
        content: '""'
      }
    },
    // >>> In Range
    [`&-in-view${pickerCellCls}-in-range,
      &-in-view${pickerCellCls}-range-start,
      &-in-view${pickerCellCls}-range-end`]: {
      position: "relative",
      [`&:not(${pickerCellCls}-disabled):before`]: {
        background: cellActiveWithRangeBg
      }
    },
    // >>> Selected
    [`&-in-view${pickerCellCls}-selected,
      &-in-view${pickerCellCls}-range-start,
      &-in-view${pickerCellCls}-range-end`]: {
      [`&:not(${pickerCellCls}-disabled) ${pickerCellInnerCls}`]: {
        color: colorTextLightSolid,
        background: colorPrimary
      },
      [`&${pickerCellCls}-disabled ${pickerCellInnerCls}`]: {
        background: colorFillSecondary
      }
    },
    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-disabled):before`]: {
      insetInlineStart: "50%"
    },
    [`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-disabled):before`]: {
      insetInlineEnd: "50%"
    },
    // range start border-radius
    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-end) ${pickerCellInnerCls}`]: {
      borderStartStartRadius: borderRadiusSM,
      borderEndStartRadius: borderRadiusSM,
      borderStartEndRadius: 0,
      borderEndEndRadius: 0
    },
    // range end border-radius
    [`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-start) ${pickerCellInnerCls}`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      borderStartEndRadius: borderRadiusSM,
      borderEndEndRadius: borderRadiusSM
    },
    // >>> Disabled
    "&-disabled": {
      color: colorTextDisabled,
      cursor: "not-allowed",
      [pickerCellInnerCls]: {
        background: "transparent"
      },
      "&::before": {
        background: cellBgDisabled
      }
    },
    [`&-disabled${pickerCellCls}-today ${pickerCellInnerCls}::before`]: {
      borderColor: colorTextDisabled
    }
  };
};
const genPanelStyle = (token) => {
  const {
    componentCls,
    pickerCellCls,
    pickerCellInnerCls,
    pickerYearMonthCellWidth,
    pickerControlIconSize,
    cellWidth,
    paddingSM,
    paddingXS,
    paddingXXS,
    colorBgContainer,
    lineWidth,
    lineType,
    borderRadiusLG,
    colorPrimary,
    colorTextHeading,
    colorSplit,
    pickerControlIconBorderWidth,
    colorIcon,
    textHeight,
    motionDurationMid,
    colorIconHover,
    fontWeightStrong,
    cellHeight,
    pickerCellPaddingVertical,
    colorTextDisabled,
    colorText,
    fontSize,
    motionDurationSlow,
    withoutTimeCellHeight,
    pickerQuarterPanelContentHeight,
    borderRadiusSM,
    colorTextLightSolid,
    cellHoverBg,
    timeColumnHeight,
    timeColumnWidth,
    timeCellHeight,
    controlItemBgActive,
    marginXXS,
    pickerDatePanelPaddingHorizontal,
    pickerControlIconMargin
  } = token;
  const pickerPanelWidth = token.calc(cellWidth).mul(7).add(token.calc(pickerDatePanelPaddingHorizontal).mul(2)).equal();
  return {
    [componentCls]: {
      "&-panel": {
        display: "inline-flex",
        flexDirection: "column",
        textAlign: "center",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        outline: "none",
        "&-focused": {
          borderColor: colorPrimary
        },
        "&-rtl": {
          [`${componentCls}-prev-icon,
              ${componentCls}-super-prev-icon`]: {
            transform: "rotate(45deg)"
          },
          [`${componentCls}-next-icon,
              ${componentCls}-super-next-icon`]: {
            transform: "rotate(-135deg)"
          },
          [`${componentCls}-time-panel`]: {
            [`${componentCls}-content`]: {
              direction: "ltr",
              "> *": {
                direction: "rtl"
              }
            }
          }
        }
      },
      // ========================================================
      // =                     Shared Panel                     =
      // ========================================================
      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel,
        &-week-panel,
        &-date-panel,
        &-time-panel`]: {
        display: "flex",
        flexDirection: "column",
        width: pickerPanelWidth
      },
      // ======================= Header =======================
      "&-header": {
        display: "flex",
        padding: `0 ${unit(paddingXS)}`,
        color: colorTextHeading,
        borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
        "> *": {
          flex: "none"
        },
        button: {
          padding: 0,
          color: colorIcon,
          lineHeight: unit(textHeight),
          background: "transparent",
          border: 0,
          cursor: "pointer",
          transition: `color ${motionDurationMid}`,
          fontSize: "inherit",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          "&:empty": {
            display: "none"
          }
        },
        "> button": {
          minWidth: "1.6em",
          fontSize,
          "&:hover": {
            color: colorIconHover
          },
          "&:disabled": {
            opacity: 0.25,
            pointerEvents: "none"
          }
        },
        "&-view": {
          flex: "auto",
          fontWeight: fontWeightStrong,
          lineHeight: unit(textHeight),
          "> button": {
            color: "inherit",
            fontWeight: "inherit",
            verticalAlign: "top",
            "&:not(:first-child)": {
              marginInlineStart: paddingXS
            },
            "&:hover": {
              color: colorPrimary
            }
          }
        }
      },
      // Arrow button
      [`&-prev-icon,
        &-next-icon,
        &-super-prev-icon,
        &-super-next-icon`]: {
        position: "relative",
        width: pickerControlIconSize,
        height: pickerControlIconSize,
        "&::before": {
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: `0 solid currentcolor`,
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          content: '""'
        }
      },
      [`&-super-prev-icon,
        &-super-next-icon`]: {
        "&::after": {
          position: "absolute",
          top: pickerControlIconMargin,
          insetInlineStart: pickerControlIconMargin,
          display: "inline-block",
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: "0 solid currentcolor",
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          content: '""'
        }
      },
      "&-prev-icon, &-super-prev-icon": {
        transform: "rotate(-45deg)"
      },
      "&-next-icon, &-super-next-icon": {
        transform: "rotate(135deg)"
      },
      // ======================== Body ========================
      "&-content": {
        width: "100%",
        tableLayout: "fixed",
        borderCollapse: "collapse",
        "th, td": {
          position: "relative",
          minWidth: cellHeight,
          fontWeight: "normal"
        },
        th: {
          height: token.calc(cellHeight).add(token.calc(pickerCellPaddingVertical).mul(2)).equal(),
          color: colorText,
          verticalAlign: "middle"
        }
      },
      "&-cell": Object.assign({
        padding: `${unit(pickerCellPaddingVertical)} 0`,
        color: colorTextDisabled,
        cursor: "pointer",
        // In view
        "&-in-view": {
          color: colorText
        }
      }, genPickerCellInnerStyle(token)),
      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-content`]: {
          height: token.calc(withoutTimeCellHeight).mul(4).equal()
        },
        [pickerCellInnerCls]: {
          padding: `0 ${unit(paddingXS)}`
        }
      },
      "&-quarter-panel": {
        [`${componentCls}-content`]: {
          height: pickerQuarterPanelContentHeight
        }
      },
      // ========================================================
      // =                       Special                        =
      // ========================================================
      // ===================== Decade Panel =====================
      "&-decade-panel": {
        [pickerCellInnerCls]: {
          padding: `0 ${unit(token.calc(paddingXS).div(2).equal())}`
        },
        [`${componentCls}-cell::before`]: {
          display: "none"
        }
      },
      // ============= Year & Quarter & Month Panel =============
      [`&-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-body`]: {
          padding: `0 ${unit(paddingXS)}`
        },
        [pickerCellInnerCls]: {
          width: pickerYearMonthCellWidth
        }
      },
      // ====================== Date Panel ======================
      "&-date-panel": {
        [`${componentCls}-body`]: {
          padding: `${unit(paddingXS)} ${unit(pickerDatePanelPaddingHorizontal)}`
        },
        [`${componentCls}-content th`]: {
          boxSizing: "border-box",
          padding: 0
        }
      },
      // ====================== Week Panel ======================
      "&-week-panel-row": {
        td: {
          "&:before": {
            transition: `background ${motionDurationMid}`
          },
          "&:first-child:before": {
            borderStartStartRadius: borderRadiusSM,
            borderEndStartRadius: borderRadiusSM
          },
          "&:last-child:before": {
            borderStartEndRadius: borderRadiusSM,
            borderEndEndRadius: borderRadiusSM
          }
        },
        "&:hover td:before": {
          background: cellHoverBg
        },
        "&-range-start td, &-range-end td, &-selected td, &-hover td": {
          // Rise priority to override hover style
          [`&${pickerCellCls}`]: {
            "&:before": {
              background: colorPrimary
            },
            [`&${componentCls}-cell-week`]: {
              color: new FastColor(colorTextLightSolid).setA(0.5).toHexString()
            },
            [pickerCellInnerCls]: {
              color: colorTextLightSolid
            }
          }
        },
        "&-range-hover td:before": {
          background: controlItemBgActive
        }
      },
      // >>> ShowWeek
      "&-week-panel, &-date-panel-show-week": {
        [`${componentCls}-body`]: {
          padding: `${unit(paddingXS)} ${unit(paddingSM)}`
        },
        [`${componentCls}-content th`]: {
          width: "auto"
        }
      },
      // ==================== Datetime Panel ====================
      "&-datetime-panel": {
        display: "flex",
        [`${componentCls}-time-panel`]: {
          borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}`
        },
        [`${componentCls}-date-panel,
          ${componentCls}-time-panel`]: {
          transition: `opacity ${motionDurationSlow}`
        },
        // Keyboard
        "&-active": {
          [`${componentCls}-date-panel,
            ${componentCls}-time-panel`]: {
            opacity: 0.3,
            "&-active": {
              opacity: 1
            }
          }
        }
      },
      // ====================== Time Panel ======================
      "&-time-panel": {
        width: "auto",
        minWidth: "auto",
        [`${componentCls}-content`]: {
          display: "flex",
          flex: "auto",
          height: timeColumnHeight
        },
        "&-column": {
          flex: "1 0 auto",
          width: timeColumnWidth,
          margin: `${unit(paddingXXS)} 0`,
          padding: 0,
          overflowY: "hidden",
          textAlign: "start",
          listStyle: "none",
          transition: `background ${motionDurationMid}`,
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: 8,
            backgroundColor: "transparent"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: token.colorTextTertiary,
            borderRadius: token.borderRadiusSM
          },
          // For Firefox
          "&": {
            scrollbarWidth: "thin",
            scrollbarColor: `${token.colorTextTertiary} transparent`
          },
          "&::after": {
            display: "block",
            height: `calc(100% - ${unit(timeCellHeight)})`,
            content: '""'
          },
          "&:not(:first-child)": {
            borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}`
          },
          "&-active": {
            background: new FastColor(controlItemBgActive).setA(0.2).toHexString()
          },
          "&:hover": {
            overflowY: "auto"
          },
          "> li": {
            margin: 0,
            padding: 0,
            [`&${componentCls}-time-panel-cell`]: {
              marginInline: marginXXS,
              [`${componentCls}-time-panel-cell-inner`]: {
                display: "block",
                width: token.calc(timeColumnWidth).sub(token.calc(marginXXS).mul(2)).equal(),
                height: timeCellHeight,
                margin: 0,
                paddingBlock: 0,
                paddingInlineEnd: 0,
                paddingInlineStart: token.calc(timeColumnWidth).sub(timeCellHeight).div(2).equal(),
                color: colorText,
                lineHeight: unit(timeCellHeight),
                borderRadius: borderRadiusSM,
                cursor: "pointer",
                transition: `background ${motionDurationMid}`,
                "&:hover": {
                  background: cellHoverBg
                }
              },
              "&-selected": {
                [`${componentCls}-time-panel-cell-inner`]: {
                  background: controlItemBgActive
                }
              },
              "&-disabled": {
                [`${componentCls}-time-panel-cell-inner`]: {
                  color: colorTextDisabled,
                  background: "transparent",
                  cursor: "not-allowed"
                }
              }
            }
          }
        }
      }
    }
  };
};
const genPickerPanelStyle = (token) => {
  const {
    componentCls,
    textHeight,
    lineWidth,
    paddingSM,
    antCls,
    colorPrimary,
    cellActiveWithRangeBg,
    colorPrimaryBorder,
    lineType,
    colorSplit
  } = token;
  return {
    [`${componentCls}-dropdown`]: {
      // ======================== Footer ========================
      [`${componentCls}-footer`]: {
        borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
        "&-extra": {
          padding: `0 ${unit(paddingSM)}`,
          lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
          textAlign: "start",
          "&:not(:last-child)": {
            borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`
          }
        }
      },
      // ==================== Footer > Ranges ===================
      [`${componentCls}-panels + ${componentCls}-footer ${componentCls}-ranges`]: {
        justifyContent: "space-between"
      },
      [`${componentCls}-ranges`]: {
        marginBlock: 0,
        paddingInline: unit(paddingSM),
        overflow: "hidden",
        textAlign: "start",
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "> li": {
          lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
          display: "inline-block"
        },
        [`${componentCls}-now-btn-disabled`]: {
          pointerEvents: "none",
          color: token.colorTextDisabled
        },
        // https://github.com/ant-design/ant-design/issues/23687
        [`${componentCls}-preset > ${antCls}-tag-blue`]: {
          color: colorPrimary,
          background: cellActiveWithRangeBg,
          borderColor: colorPrimaryBorder,
          cursor: "pointer"
        },
        [`${componentCls}-ok`]: {
          paddingBlock: token.calc(lineWidth).mul(2).equal(),
          marginInlineStart: "auto"
        }
      }
    }
  };
};
const initPickerPanelToken = (token) => {
  const {
    componentCls,
    controlHeightLG,
    paddingXXS,
    padding
  } = token;
  return {
    pickerCellCls: `${componentCls}-cell`,
    pickerCellInnerCls: `${componentCls}-cell-inner`,
    pickerYearMonthCellWidth: token.calc(controlHeightLG).mul(1.5).equal(),
    pickerQuarterPanelContentHeight: token.calc(controlHeightLG).mul(1.4).equal(),
    pickerCellPaddingVertical: token.calc(paddingXXS).add(token.calc(paddingXXS).div(2)).equal(),
    pickerCellBorderGap: 2,
    // Magic for gap between cells
    pickerControlIconSize: 7,
    pickerControlIconMargin: 4,
    pickerControlIconBorderWidth: 1.5,
    pickerDatePanelPaddingHorizontal: token.calc(padding).add(token.calc(paddingXXS).div(2)).equal()
    // 18 in normal
  };
};
const initPanelComponentToken = (token) => {
  const {
    colorBgContainerDisabled,
    controlHeight,
    controlHeightSM,
    controlHeightLG,
    paddingXXS,
    lineWidth
  } = token;
  const dblPaddingXXS = paddingXXS * 2;
  const dblLineWidth = lineWidth * 2;
  const multipleItemHeight = Math.min(controlHeight - dblPaddingXXS, controlHeight - dblLineWidth);
  const multipleItemHeightSM = Math.min(controlHeightSM - dblPaddingXXS, controlHeightSM - dblLineWidth);
  const multipleItemHeightLG = Math.min(controlHeightLG - dblPaddingXXS, controlHeightLG - dblLineWidth);
  const INTERNAL_FIXED_ITEM_MARGIN = Math.floor(paddingXXS / 2);
  const filledToken = {
    INTERNAL_FIXED_ITEM_MARGIN,
    cellHoverBg: token.controlItemBgHover,
    cellActiveWithRangeBg: token.controlItemBgActive,
    cellHoverWithRangeBg: new FastColor(token.colorPrimary).lighten(35).toHexString(),
    cellRangeBorderColor: new FastColor(token.colorPrimary).lighten(20).toHexString(),
    cellBgDisabled: colorBgContainerDisabled,
    timeColumnWidth: controlHeightLG * 1.4,
    timeColumnHeight: 28 * 8,
    timeCellHeight: 28,
    cellWidth: controlHeightSM * 1.5,
    cellHeight: controlHeightSM,
    textHeight: controlHeightLG,
    withoutTimeCellHeight: controlHeightLG * 1.65,
    multipleItemBg: token.colorFillSecondary,
    multipleItemBorderColor: "transparent",
    multipleItemHeight,
    multipleItemHeightSM,
    multipleItemHeightLG,
    multipleSelectorBgDisabled: colorBgContainerDisabled,
    multipleItemColorDisabled: token.colorTextDisabled,
    multipleItemBorderColorDisabled: "transparent"
  };
  return filledToken;
};
const prepareComponentToken$3 = (token) => Object.assign(Object.assign(Object.assign(Object.assign({}, initComponentToken$1(token)), initPanelComponentToken(token)), getArrowToken(token)), {
  presetsWidth: 120,
  presetsMaxWidth: 200,
  zIndexPopup: token.zIndexPopupBase + 50
});
const genVariantsStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: [
      Object.assign(Object.assign(Object.assign(Object.assign({}, genOutlinedStyle(token)), genUnderlinedStyle(token)), genFilledStyle(token)), genBorderlessStyle(token)),
      // ========================= Multiple =========================
      {
        "&-outlined": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
          }
        },
        "&-filled": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.colorBgContainer,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
          }
        },
        "&-borderless": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
          }
        },
        "&-underlined": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
          }
        }
      }
    ]
  };
};
const genPickerPadding = (paddingBlock, paddingInline) => {
  return {
    padding: `${unit(paddingBlock)} ${unit(paddingInline)}`
  };
};
const genPickerStatusStyle = (token) => {
  const {
    componentCls,
    colorError,
    colorWarning
  } = token;
  return {
    [`${componentCls}:not(${componentCls}-disabled):not([disabled])`]: {
      [`&${componentCls}-status-error`]: {
        [`${componentCls}-active-bar`]: {
          background: colorError
        }
      },
      [`&${componentCls}-status-warning`]: {
        [`${componentCls}-active-bar`]: {
          background: colorWarning
        }
      }
    }
  };
};
const genPickerStyle = (token) => {
  var _a;
  const {
    componentCls,
    antCls,
    paddingInline,
    lineWidth,
    lineType,
    colorBorder,
    borderRadius,
    motionDurationMid,
    colorTextDisabled,
    colorTextPlaceholder,
    colorTextQuaternary,
    fontSizeLG,
    inputFontSizeLG,
    fontSizeSM,
    inputFontSizeSM,
    controlHeightSM,
    paddingInlineSM,
    paddingXS,
    marginXS,
    colorIcon,
    lineWidthBold,
    colorPrimary,
    motionDurationSlow,
    zIndexPopup,
    paddingXXS,
    sizePopupArrow,
    colorBgElevated,
    borderRadiusLG,
    boxShadowSecondary,
    borderRadiusSM,
    colorSplit,
    cellHoverBg,
    presetsWidth,
    presetsMaxWidth,
    boxShadowPopoverArrow,
    fontHeight,
    lineHeightLG
  } = token;
  return [
    {
      [componentCls]: Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genPickerPadding(token.paddingBlock, token.paddingInline)), {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 1,
        borderRadius,
        transition: `border ${motionDurationMid}, box-shadow ${motionDurationMid}, background ${motionDurationMid}`,
        [`${componentCls}-prefix`]: {
          flex: "0 0 auto",
          marginInlineEnd: token.inputAffixPadding
        },
        // ======================== Input =========================
        [`${componentCls}-input`]: {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: "100%",
          "> input": Object.assign(Object.assign({
            position: "relative",
            display: "inline-block",
            width: "100%",
            color: "inherit",
            fontSize: (_a = token.inputFontSize) !== null && _a !== void 0 ? _a : token.fontSize,
            lineHeight: token.lineHeight,
            transition: `all ${motionDurationMid}`
          }, genPlaceholderStyle(colorTextPlaceholder)), {
            flex: "auto",
            // Fix Firefox flex not correct:
            // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
            minWidth: 1,
            height: "auto",
            padding: 0,
            background: "transparent",
            border: 0,
            fontFamily: "inherit",
            "&:focus": {
              boxShadow: "none",
              outline: 0
            },
            "&[disabled]": {
              background: "transparent",
              color: colorTextDisabled,
              cursor: "not-allowed"
            }
          }),
          "&-placeholder": {
            "> input": {
              color: colorTextPlaceholder
            }
          }
        },
        // Size
        "&-large": Object.assign(Object.assign({}, genPickerPadding(token.paddingBlockLG, token.paddingInlineLG)), {
          [`${componentCls}-input > input`]: {
            fontSize: inputFontSizeLG !== null && inputFontSizeLG !== void 0 ? inputFontSizeLG : fontSizeLG,
            lineHeight: lineHeightLG
          }
        }),
        "&-small": Object.assign(Object.assign({}, genPickerPadding(token.paddingBlockSM, token.paddingInlineSM)), {
          [`${componentCls}-input > input`]: {
            fontSize: inputFontSizeSM !== null && inputFontSizeSM !== void 0 ? inputFontSizeSM : fontSizeSM
          }
        }),
        [`${componentCls}-suffix`]: {
          display: "flex",
          flex: "none",
          alignSelf: "center",
          marginInlineStart: token.calc(paddingXS).div(2).equal(),
          color: colorTextQuaternary,
          lineHeight: 1,
          pointerEvents: "none",
          transition: `opacity ${motionDurationMid}, color ${motionDurationMid}`,
          "> *": {
            verticalAlign: "top",
            "&:not(:last-child)": {
              marginInlineEnd: marginXS
            }
          }
        },
        [`${componentCls}-clear`]: {
          position: "absolute",
          top: "50%",
          insetInlineEnd: 0,
          color: colorTextQuaternary,
          lineHeight: 1,
          transform: "translateY(-50%)",
          cursor: "pointer",
          opacity: 0,
          transition: `opacity ${motionDurationMid}, color ${motionDurationMid}`,
          "> *": {
            verticalAlign: "top"
          },
          "&:hover": {
            color: colorIcon
          }
        },
        "&:hover": {
          [`${componentCls}-clear`]: {
            opacity: 1
          },
          // Should use the following selector, but since `:has` has poor compatibility,
          // we use `:not(:last-child)` instead, which may cause some problems in some cases.
          // [`${componentCls}-suffix:has(+ ${componentCls}-clear)`]: {
          [`${componentCls}-suffix:not(:last-child)`]: {
            opacity: 0
          }
        },
        [`${componentCls}-separator`]: {
          position: "relative",
          display: "inline-block",
          width: "1em",
          height: fontSizeLG,
          color: colorTextQuaternary,
          fontSize: fontSizeLG,
          verticalAlign: "top",
          cursor: "default",
          [`${componentCls}-focused &`]: {
            color: colorIcon
          },
          [`${componentCls}-range-separator &`]: {
            [`${componentCls}-disabled &`]: {
              cursor: "not-allowed"
            }
          }
        },
        // ======================== Range =========================
        "&-range": {
          position: "relative",
          display: "inline-flex",
          // Active bar
          [`${componentCls}-active-bar`]: {
            bottom: token.calc(lineWidth).mul(-1).equal(),
            height: lineWidthBold,
            background: colorPrimary,
            opacity: 0,
            transition: `all ${motionDurationSlow} ease-out`,
            pointerEvents: "none"
          },
          [`&${componentCls}-focused`]: {
            [`${componentCls}-active-bar`]: {
              opacity: 1
            }
          },
          [`${componentCls}-range-separator`]: {
            alignItems: "center",
            padding: `0 ${unit(paddingXS)}`,
            lineHeight: 1
          }
        },
        // ======================== Clear =========================
        "&-range, &-multiple": {
          // Clear
          [`${componentCls}-clear`]: {
            insetInlineEnd: paddingInline
          },
          [`&${componentCls}-small`]: {
            [`${componentCls}-clear`]: {
              insetInlineEnd: paddingInlineSM
            }
          }
        },
        // ======================= Dropdown =======================
        "&-dropdown": Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genPanelStyle(token)), {
          pointerEvents: "none",
          position: "absolute",
          // Fix incorrect position of picker popup
          // https://github.com/ant-design/ant-design/issues/35590
          top: -9999,
          left: {
            _skip_check_: true,
            value: -9999
          },
          zIndex: zIndexPopup,
          [`&${componentCls}-dropdown-hidden`]: {
            display: "none"
          },
          "&-rtl": {
            direction: "rtl"
          },
          [`&${componentCls}-dropdown-placement-bottomLeft,
            &${componentCls}-dropdown-placement-bottomRight`]: {
            [`${componentCls}-range-arrow`]: {
              top: 0,
              display: "block",
              transform: "translateY(-100%)"
            }
          },
          [`&${componentCls}-dropdown-placement-topLeft,
            &${componentCls}-dropdown-placement-topRight`]: {
            [`${componentCls}-range-arrow`]: {
              bottom: 0,
              display: "block",
              transform: "translateY(100%) rotate(180deg)"
            }
          },
          [`&${antCls}-slide-up-appear, &${antCls}-slide-up-enter`]: {
            [`${componentCls}-range-arrow${componentCls}-range-arrow`]: {
              transition: "none"
            }
          },
          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topRight`]: {
            animationName: slideDownIn
          },
          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomRight`]: {
            animationName: slideUpIn
          },
          // https://github.com/ant-design/ant-design/issues/48727
          [`&${antCls}-slide-up-leave ${componentCls}-panel-container`]: {
            pointerEvents: "none"
          },
          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topRight`]: {
            animationName: slideDownOut
          },
          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomRight`]: {
            animationName: slideUpOut
          },
          // Time picker with additional style
          [`${componentCls}-panel > ${componentCls}-time-panel`]: {
            paddingTop: paddingXXS
          },
          // ======================== Ranges ========================
          [`${componentCls}-range-wrapper`]: {
            display: "flex",
            position: "relative"
          },
          [`${componentCls}-range-arrow`]: Object.assign(Object.assign({
            position: "absolute",
            zIndex: 1,
            display: "none",
            paddingInline: token.calc(paddingInline).mul(1.5).equal(),
            boxSizing: "content-box",
            transition: `all ${motionDurationSlow} ease-out`
          }, genRoundedArrow(token, colorBgElevated, boxShadowPopoverArrow)), {
            "&:before": {
              insetInlineStart: token.calc(paddingInline).mul(1.5).equal()
            }
          }),
          [`${componentCls}-panel-container`]: {
            overflow: "hidden",
            verticalAlign: "top",
            background: colorBgElevated,
            borderRadius: borderRadiusLG,
            boxShadow: boxShadowSecondary,
            transition: `margin ${motionDurationSlow}`,
            display: "inline-block",
            pointerEvents: "auto",
            // ======================== Layout ========================
            [`${componentCls}-panel-layout`]: {
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "stretch"
            },
            // ======================== Preset ========================
            [`${componentCls}-presets`]: {
              display: "flex",
              flexDirection: "column",
              minWidth: presetsWidth,
              maxWidth: presetsMaxWidth,
              ul: {
                height: 0,
                flex: "auto",
                listStyle: "none",
                overflow: "auto",
                margin: 0,
                padding: paddingXS,
                borderInlineEnd: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
                li: Object.assign(Object.assign({}, textEllipsis), {
                  borderRadius: borderRadiusSM,
                  paddingInline: paddingXS,
                  paddingBlock: token.calc(controlHeightSM).sub(fontHeight).div(2).equal(),
                  cursor: "pointer",
                  transition: `all ${motionDurationSlow}`,
                  "+ li": {
                    marginTop: marginXS
                  },
                  "&:hover": {
                    background: cellHoverBg
                  }
                })
              }
            },
            // ======================== Panels ========================
            [`${componentCls}-panels`]: {
              display: "inline-flex",
              flexWrap: "nowrap",
              // [`${componentCls}-panel`]: {
              //   borderWidth: `0 0 ${unit(lineWidth)}`,
              // },
              "&:last-child": {
                [`${componentCls}-panel`]: {
                  borderWidth: 0
                }
              }
            },
            [`${componentCls}-panel`]: {
              verticalAlign: "top",
              background: "transparent",
              borderRadius: 0,
              borderWidth: 0,
              [`${componentCls}-content, table`]: {
                textAlign: "center"
              },
              "&-focused": {
                borderColor: colorBorder
              }
            }
          }
        }),
        "&-dropdown-range": {
          padding: `${unit(token.calc(sizePopupArrow).mul(2).div(3).equal())} 0`,
          "&-hidden": {
            display: "none"
          }
        },
        "&-rtl": {
          direction: "rtl",
          [`${componentCls}-separator`]: {
            transform: "scale(-1, 1)"
          },
          [`${componentCls}-footer`]: {
            "&-extra": {
              direction: "rtl"
            }
          }
        }
      })
    },
    // Follow code may reuse in other components
    initSlideMotion(token, "slide-up"),
    initSlideMotion(token, "slide-down"),
    initMoveMotion(token, "move-up"),
    initMoveMotion(token, "move-down")
  ];
};
const useStyle$4 = genStyleHooks("DatePicker", (token) => {
  const pickerToken = merge(initInputToken(token), initPickerPanelToken(token), {
    inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(1).equal(),
    multipleSelectItemHeight: token.multipleItemHeight,
    selectHeight: token.controlHeight
  });
  return [
    genPickerPanelStyle(pickerToken),
    genPickerStyle(pickerToken),
    genVariantsStyle(pickerToken),
    genPickerStatusStyle(pickerToken),
    genPickerMultipleStyle(pickerToken),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token, {
      focusElCls: `${token.componentCls}-focused`
    })
  ];
}, prepareComponentToken$3);
function getEntity(keyEntities, key) {
  return keyEntities[key];
}
var _excluded$9 = ["children"];
function getPosition(level, index) {
  return "".concat(level, "-").concat(index);
}
function isTreeNode(node) {
  return node && node.type && node.type.isTreeNode;
}
function getKey(key, pos) {
  if (key !== null && key !== void 0) {
    return key;
  }
  return pos;
}
function fillFieldNames(fieldNames) {
  var _ref = fieldNames || {}, title = _ref.title, _title = _ref._title, key = _ref.key, children = _ref.children;
  var mergedTitle = title || "title";
  return {
    title: mergedTitle,
    _title: _title || [mergedTitle],
    key: key || "key",
    children: children || "children"
  };
}
function convertTreeToData(rootNodes) {
  function dig(node) {
    var treeNodes = toArray$3(node);
    return treeNodes.map(function(treeNode) {
      if (!isTreeNode(treeNode)) {
        warningOnce(!treeNode, "Tree/TreeNode can only accept TreeNode as children.");
        return null;
      }
      var key = treeNode.key;
      var _treeNode$props = treeNode.props, children = _treeNode$props.children, rest = _objectWithoutProperties(_treeNode$props, _excluded$9);
      var dataNode = _objectSpread2({
        key
      }, rest);
      var parsedChildren = dig(children);
      if (parsedChildren.length) {
        dataNode.children = parsedChildren;
      }
      return dataNode;
    }).filter(function(dataNode) {
      return dataNode;
    });
  }
  return dig(rootNodes);
}
function flattenTreeData(treeNodeList, expandedKeys, fieldNames) {
  var _fillFieldNames = fillFieldNames(fieldNames), fieldTitles = _fillFieldNames._title, fieldKey = _fillFieldNames.key, fieldChildren = _fillFieldNames.children;
  var expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  var flattenList = [];
  function dig(list) {
    var parent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    return list.map(function(treeNode, index) {
      var pos = getPosition(parent ? parent.pos : "0", index);
      var mergedKey = getKey(treeNode[fieldKey], pos);
      var mergedTitle;
      for (var i = 0; i < fieldTitles.length; i += 1) {
        var fieldTitle = fieldTitles[i];
        if (treeNode[fieldTitle] !== void 0) {
          mergedTitle = treeNode[fieldTitle];
          break;
        }
      }
      var flattenNode = Object.assign(omit(treeNode, [].concat(_toConsumableArray(fieldTitles), [fieldKey, fieldChildren])), {
        title: mergedTitle,
        key: mergedKey,
        parent,
        pos,
        children: null,
        data: treeNode,
        isStart: [].concat(_toConsumableArray(parent ? parent.isStart : []), [index === 0]),
        isEnd: [].concat(_toConsumableArray(parent ? parent.isEnd : []), [index === list.length - 1])
      });
      flattenList.push(flattenNode);
      if (expandedKeys === true || expandedKeySet.has(mergedKey)) {
        flattenNode.children = dig(treeNode[fieldChildren] || [], flattenNode);
      } else {
        flattenNode.children = [];
      }
      return flattenNode;
    });
  }
  dig(treeNodeList);
  return flattenList;
}
function traverseDataNodes(dataNodes, callback, config) {
  var mergedConfig = {};
  if (_typeof(config) === "object") {
    mergedConfig = config;
  } else {
    mergedConfig = {
      externalGetKey: config
    };
  }
  mergedConfig = mergedConfig || {};
  var _mergedConfig = mergedConfig, childrenPropName = _mergedConfig.childrenPropName, externalGetKey = _mergedConfig.externalGetKey, fieldNames = _mergedConfig.fieldNames;
  var _fillFieldNames2 = fillFieldNames(fieldNames), fieldKey = _fillFieldNames2.key, fieldChildren = _fillFieldNames2.children;
  var mergeChildrenPropName = childrenPropName || fieldChildren;
  var syntheticGetKey;
  if (externalGetKey) {
    if (typeof externalGetKey === "string") {
      syntheticGetKey = function syntheticGetKey2(node) {
        return node[externalGetKey];
      };
    } else if (typeof externalGetKey === "function") {
      syntheticGetKey = function syntheticGetKey2(node) {
        return externalGetKey(node);
      };
    }
  } else {
    syntheticGetKey = function syntheticGetKey2(node, pos) {
      return getKey(node[fieldKey], pos);
    };
  }
  function processNode(node, index, parent, pathNodes) {
    var children = node ? node[mergeChildrenPropName] : dataNodes;
    var pos = node ? getPosition(parent.pos, index) : "0";
    var connectNodes = node ? [].concat(_toConsumableArray(pathNodes), [node]) : [];
    if (node) {
      var key = syntheticGetKey(node, pos);
      var _data = {
        node,
        index,
        pos,
        key,
        parentPos: parent.node ? parent.pos : null,
        level: parent.level + 1,
        nodes: connectNodes
      };
      callback(_data);
    }
    if (children) {
      children.forEach(function(subNode, subIndex) {
        processNode(subNode, subIndex, {
          node,
          pos,
          level: parent ? parent.level + 1 : -1
        }, connectNodes);
      });
    }
  }
  processNode(null);
}
function convertDataToEntities(dataNodes) {
  var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, initWrapper = _ref2.initWrapper, processEntity = _ref2.processEntity, onProcessFinished = _ref2.onProcessFinished, externalGetKey = _ref2.externalGetKey, childrenPropName = _ref2.childrenPropName, fieldNames = _ref2.fieldNames;
  var legacyExternalGetKey = arguments.length > 2 ? arguments[2] : void 0;
  var mergedExternalGetKey = externalGetKey || legacyExternalGetKey;
  var posEntities = {};
  var keyEntities = {};
  var wrapper = {
    posEntities,
    keyEntities
  };
  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }
  traverseDataNodes(dataNodes, function(item) {
    var node = item.node, index = item.index, pos = item.pos, key = item.key, parentPos = item.parentPos, level = item.level, nodes = item.nodes;
    var entity = {
      node,
      nodes,
      index,
      key,
      pos,
      level
    };
    var mergedKey = getKey(key, pos);
    posEntities[pos] = entity;
    keyEntities[mergedKey] = entity;
    entity.parent = posEntities[parentPos];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }
    if (processEntity) {
      processEntity(entity, wrapper);
    }
  }, {
    externalGetKey: mergedExternalGetKey,
    childrenPropName,
    fieldNames
  });
  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }
  return wrapper;
}
function getTreeNodeProps(key, _ref3) {
  var expandedKeys = _ref3.expandedKeys, selectedKeys = _ref3.selectedKeys, loadedKeys = _ref3.loadedKeys, loadingKeys = _ref3.loadingKeys, checkedKeys = _ref3.checkedKeys, halfCheckedKeys = _ref3.halfCheckedKeys, dragOverNodeKey = _ref3.dragOverNodeKey, dropPosition = _ref3.dropPosition, keyEntities = _ref3.keyEntities;
  var entity = getEntity(keyEntities, key);
  var treeNodeProps = {
    eventKey: key,
    expanded: expandedKeys.indexOf(key) !== -1,
    selected: selectedKeys.indexOf(key) !== -1,
    loaded: loadedKeys.indexOf(key) !== -1,
    loading: loadingKeys.indexOf(key) !== -1,
    checked: checkedKeys.indexOf(key) !== -1,
    halfChecked: halfCheckedKeys.indexOf(key) !== -1,
    pos: String(entity ? entity.pos : ""),
    // [Legacy] Drag props
    // Since the interaction of drag is changed, the semantic of the props are
    // not accuracy, I think it should be finally removed
    dragOver: dragOverNodeKey === key && dropPosition === 0,
    dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
    dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
  };
  return treeNodeProps;
}
function convertNodePropsToEventData(props) {
  var data = props.data, expanded = props.expanded, selected = props.selected, checked = props.checked, loaded = props.loaded, loading = props.loading, halfChecked = props.halfChecked, dragOver = props.dragOver, dragOverGapTop = props.dragOverGapTop, dragOverGapBottom = props.dragOverGapBottom, pos = props.pos, active = props.active, eventKey = props.eventKey;
  var eventData = _objectSpread2(_objectSpread2({}, data), {}, {
    expanded,
    selected,
    checked,
    loaded,
    loading,
    halfChecked,
    dragOver,
    dragOverGapTop,
    dragOverGapBottom,
    pos,
    active,
    key: eventKey
  });
  if (!("props" in eventData)) {
    Object.defineProperty(eventData, "props", {
      get: function get2() {
        warningOnce(false, "Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.");
        return props;
      }
    });
  }
  return eventData;
}
function removeFromCheckedKeys(halfCheckedKeys, checkedKeys) {
  var filteredKeys = /* @__PURE__ */ new Set();
  halfCheckedKeys.forEach(function(key) {
    if (!checkedKeys.has(key)) {
      filteredKeys.add(key);
    }
  });
  return filteredKeys;
}
function isCheckDisabled(node) {
  var _ref = node || {}, disabled = _ref.disabled, disableCheckbox = _ref.disableCheckbox, checkable = _ref.checkable;
  return !!(disabled || disableCheckbox) || checkable === false;
}
function fillConductCheck(keys, levelEntities, maxLevel, syntheticGetCheckDisabled) {
  var checkedKeys = new Set(keys);
  var halfCheckedKeys = /* @__PURE__ */ new Set();
  for (var level = 0; level <= maxLevel; level += 1) {
    var entities = levelEntities.get(level) || /* @__PURE__ */ new Set();
    entities.forEach(function(entity) {
      var key = entity.key, node = entity.node, _entity$children = entity.children, children = _entity$children === void 0 ? [] : _entity$children;
      if (checkedKeys.has(key) && !syntheticGetCheckDisabled(node)) {
        children.filter(function(childEntity) {
          return !syntheticGetCheckDisabled(childEntity.node);
        }).forEach(function(childEntity) {
          checkedKeys.add(childEntity.key);
        });
      }
    });
  }
  var visitedKeys = /* @__PURE__ */ new Set();
  for (var _level = maxLevel; _level >= 0; _level -= 1) {
    var _entities = levelEntities.get(_level) || /* @__PURE__ */ new Set();
    _entities.forEach(function(entity) {
      var parent = entity.parent, node = entity.node;
      if (syntheticGetCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) {
        return;
      }
      if (syntheticGetCheckDisabled(entity.parent.node)) {
        visitedKeys.add(parent.key);
        return;
      }
      var allChecked = true;
      var partialChecked = false;
      (parent.children || []).filter(function(childEntity) {
        return !syntheticGetCheckDisabled(childEntity.node);
      }).forEach(function(_ref2) {
        var key = _ref2.key;
        var checked = checkedKeys.has(key);
        if (allChecked && !checked) {
          allChecked = false;
        }
        if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
          partialChecked = true;
        }
      });
      if (allChecked) {
        checkedKeys.add(parent.key);
      }
      if (partialChecked) {
        halfCheckedKeys.add(parent.key);
      }
      visitedKeys.add(parent.key);
    });
  }
  return {
    checkedKeys: Array.from(checkedKeys),
    halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys))
  };
}
function cleanConductCheck(keys, halfKeys, levelEntities, maxLevel, syntheticGetCheckDisabled) {
  var checkedKeys = new Set(keys);
  var halfCheckedKeys = new Set(halfKeys);
  for (var level = 0; level <= maxLevel; level += 1) {
    var entities = levelEntities.get(level) || /* @__PURE__ */ new Set();
    entities.forEach(function(entity) {
      var key = entity.key, node = entity.node, _entity$children2 = entity.children, children = _entity$children2 === void 0 ? [] : _entity$children2;
      if (!checkedKeys.has(key) && !halfCheckedKeys.has(key) && !syntheticGetCheckDisabled(node)) {
        children.filter(function(childEntity) {
          return !syntheticGetCheckDisabled(childEntity.node);
        }).forEach(function(childEntity) {
          checkedKeys.delete(childEntity.key);
        });
      }
    });
  }
  halfCheckedKeys = /* @__PURE__ */ new Set();
  var visitedKeys = /* @__PURE__ */ new Set();
  for (var _level2 = maxLevel; _level2 >= 0; _level2 -= 1) {
    var _entities2 = levelEntities.get(_level2) || /* @__PURE__ */ new Set();
    _entities2.forEach(function(entity) {
      var parent = entity.parent, node = entity.node;
      if (syntheticGetCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) {
        return;
      }
      if (syntheticGetCheckDisabled(entity.parent.node)) {
        visitedKeys.add(parent.key);
        return;
      }
      var allChecked = true;
      var partialChecked = false;
      (parent.children || []).filter(function(childEntity) {
        return !syntheticGetCheckDisabled(childEntity.node);
      }).forEach(function(_ref3) {
        var key = _ref3.key;
        var checked = checkedKeys.has(key);
        if (allChecked && !checked) {
          allChecked = false;
        }
        if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
          partialChecked = true;
        }
      });
      if (!allChecked) {
        checkedKeys.delete(parent.key);
      }
      if (partialChecked) {
        halfCheckedKeys.add(parent.key);
      }
      visitedKeys.add(parent.key);
    });
  }
  return {
    checkedKeys: Array.from(checkedKeys),
    halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys))
  };
}
function conductCheck(keyList, checked, keyEntities, getCheckDisabled) {
  var warningMissKeys = [];
  var syntheticGetCheckDisabled;
  if (getCheckDisabled) {
    syntheticGetCheckDisabled = getCheckDisabled;
  } else {
    syntheticGetCheckDisabled = isCheckDisabled;
  }
  var keys = new Set(keyList.filter(function(key) {
    var hasEntity = !!getEntity(keyEntities, key);
    if (!hasEntity) {
      warningMissKeys.push(key);
    }
    return hasEntity;
  }));
  var levelEntities = /* @__PURE__ */ new Map();
  var maxLevel = 0;
  Object.keys(keyEntities).forEach(function(key) {
    var entity = keyEntities[key];
    var level = entity.level;
    var levelSet = levelEntities.get(level);
    if (!levelSet) {
      levelSet = /* @__PURE__ */ new Set();
      levelEntities.set(level, levelSet);
    }
    levelSet.add(entity);
    maxLevel = Math.max(maxLevel, level);
  });
  warningOnce(!warningMissKeys.length, "Tree missing follow keys: ".concat(warningMissKeys.slice(0, 100).map(function(key) {
    return "'".concat(key, "'");
  }).join(", ")));
  var result;
  if (checked === true) {
    result = fillConductCheck(keys, levelEntities, maxLevel, syntheticGetCheckDisabled);
  } else {
    result = cleanConductCheck(keys, checked.halfCheckedKeys, levelEntities, maxLevel, syntheticGetCheckDisabled);
  }
  return result;
}
const genCheckboxStyle = (token) => {
  const {
    checkboxCls
  } = token;
  const wrapperCls = `${checkboxCls}-wrapper`;
  return [
    // ===================== Basic =====================
    {
      // Group
      [`${checkboxCls}-group`]: Object.assign(Object.assign({}, resetComponent(token)), {
        display: "inline-flex",
        flexWrap: "wrap",
        columnGap: token.marginXS,
        // Group > Grid
        [`> ${token.antCls}-row`]: {
          flex: 1
        }
      }),
      // Wrapper
      [wrapperCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        display: "inline-flex",
        alignItems: "baseline",
        cursor: "pointer",
        // Fix checkbox & radio in flex align #30260
        "&:after": {
          display: "inline-block",
          width: 0,
          overflow: "hidden",
          content: "'\\a0'"
        },
        // Checkbox near checkbox
        [`& + ${wrapperCls}`]: {
          marginInlineStart: 0
        },
        [`&${wrapperCls}-in-form-item`]: {
          'input[type="checkbox"]': {
            width: 14,
            // FIXME: magic
            height: 14
            // FIXME: magic
          }
        }
      }),
      // Wrapper > Checkbox
      [checkboxCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "relative",
        whiteSpace: "nowrap",
        lineHeight: 1,
        cursor: "pointer",
        borderRadius: token.borderRadiusSM,
        // To make alignment right when `controlHeight` is changed
        // Ref: https://github.com/ant-design/ant-design/issues/41564
        alignSelf: "center",
        // Wrapper > Checkbox > input
        [`${checkboxCls}-input`]: {
          position: "absolute",
          // Since baseline align will get additional space offset,
          // we need to move input to top to make it align with text.
          // Ref: https://github.com/ant-design/ant-design/issues/38926#issuecomment-1486137799
          inset: 0,
          zIndex: 1,
          cursor: "pointer",
          opacity: 0,
          margin: 0,
          [`&:focus-visible + ${checkboxCls}-inner`]: genFocusOutline(token)
        },
        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          boxSizing: "border-box",
          display: "block",
          width: token.checkboxSize,
          height: token.checkboxSize,
          direction: "ltr",
          backgroundColor: token.colorBgContainer,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadiusSM,
          borderCollapse: "separate",
          transition: `all ${token.motionDurationSlow}`,
          "&:after": {
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            insetInlineStart: "25%",
            display: "table",
            width: token.calc(token.checkboxSize).div(14).mul(5).equal(),
            height: token.calc(token.checkboxSize).div(14).mul(8).equal(),
            border: `${unit(token.lineWidthBold)} solid ${token.colorWhite}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: "rotate(45deg) scale(0) translate(-50%,-50%)",
            opacity: 0,
            content: '""',
            transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`
          }
        },
        // Wrapper > Checkbox + Text
        "& + span": {
          paddingInlineStart: token.paddingXS,
          paddingInlineEnd: token.paddingXS
        }
      })
    },
    // ===================== Hover =====================
    {
      // Wrapper & Wrapper > Checkbox
      [`
        ${wrapperCls}:not(${wrapperCls}-disabled),
        ${checkboxCls}:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          borderColor: token.colorPrimary
        }
      },
      [`${wrapperCls}:not(${wrapperCls}-disabled)`]: {
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled) ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: "transparent"
        },
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled):after`]: {
          borderColor: token.colorPrimaryHover
        }
      }
    },
    // ==================== Checked ====================
    {
      // Wrapper > Checkbox
      [`${checkboxCls}-checked`]: {
        [`${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimary,
          borderColor: token.colorPrimary,
          "&:after": {
            opacity: 1,
            transform: "rotate(45deg) scale(1) translate(-50%,-50%)",
            transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`
          }
        }
      },
      [`
        ${wrapperCls}-checked:not(${wrapperCls}-disabled),
        ${checkboxCls}-checked:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: "transparent"
        }
      }
    },
    // ================= Indeterminate =================
    {
      [checkboxCls]: {
        "&-indeterminate": {
          "&": {
            // Wrapper > Checkbox > inner
            [`${checkboxCls}-inner`]: {
              backgroundColor: `${token.colorBgContainer}`,
              borderColor: `${token.colorBorder}`,
              "&:after": {
                top: "50%",
                insetInlineStart: "50%",
                width: token.calc(token.fontSizeLG).div(2).equal(),
                height: token.calc(token.fontSizeLG).div(2).equal(),
                backgroundColor: token.colorPrimary,
                border: 0,
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1,
                content: '""'
              }
            },
            // https://github.com/ant-design/ant-design/issues/50074
            [`&:hover ${checkboxCls}-inner`]: {
              backgroundColor: `${token.colorBgContainer}`,
              borderColor: `${token.colorPrimary}`
            }
          }
        }
      }
    },
    // ==================== Disable ====================
    {
      // Wrapper
      [`${wrapperCls}-disabled`]: {
        cursor: "not-allowed"
      },
      // Wrapper > Checkbox
      [`${checkboxCls}-disabled`]: {
        // Wrapper > Checkbox > input
        [`&, ${checkboxCls}-input`]: {
          cursor: "not-allowed",
          // Disabled for native input to enable Tooltip event handler
          // ref: https://github.com/ant-design/ant-design/issues/39822#issuecomment-1365075901
          pointerEvents: "none"
        },
        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          background: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          "&:after": {
            borderColor: token.colorTextDisabled
          }
        },
        "&:after": {
          display: "none"
        },
        "& + span": {
          color: token.colorTextDisabled
        },
        [`&${checkboxCls}-indeterminate ${checkboxCls}-inner::after`]: {
          background: token.colorTextDisabled
        }
      }
    }
  ];
};
function getStyle(prefixCls, token) {
  const checkboxToken = merge(token, {
    checkboxCls: `.${prefixCls}`,
    checkboxSize: token.controlInteractiveSize
  });
  return genCheckboxStyle(checkboxToken);
}
const useStyle$3 = genStyleHooks("Checkbox", (token, {
  prefixCls
}) => [getStyle(prefixCls, token)]);
const GroupContext = /* @__PURE__ */ React.createContext(null);
var __rest$7 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalCheckbox = (props, ref) => {
  var _a;
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    indeterminate = false,
    style,
    onMouseEnter,
    onMouseLeave,
    skipGroup = false,
    disabled
  } = props, restProps = __rest$7(props, ["prefixCls", "className", "rootClassName", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave", "skipGroup", "disabled"]);
  const {
    getPrefixCls,
    direction,
    checkbox
  } = reactExports.useContext(ConfigContext);
  const checkboxGroup = reactExports.useContext(GroupContext);
  const {
    isFormItemInput
  } = reactExports.useContext(FormItemInputContext);
  const contextDisabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = (_a = (checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.disabled) || disabled) !== null && _a !== void 0 ? _a : contextDisabled;
  const prevValue = reactExports.useRef(restProps.value);
  const checkboxRef = reactExports.useRef(null);
  const mergedRef = composeRef(ref, checkboxRef);
  reactExports.useEffect(() => {
    checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
  }, []);
  reactExports.useEffect(() => {
    if (skipGroup) {
      return;
    }
    if (restProps.value !== prevValue.current) {
      checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(prevValue.current);
      checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
      prevValue.current = restProps.value;
    }
    return () => checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(restProps.value);
  }, [restProps.value]);
  reactExports.useEffect(() => {
    var _a2;
    if ((_a2 = checkboxRef.current) === null || _a2 === void 0 ? void 0 : _a2.input) {
      checkboxRef.current.input.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  const prefixCls = getPrefixCls("checkbox", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$3(prefixCls, rootCls);
  const checkboxProps = Object.assign({}, restProps);
  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = (...args) => {
      if (restProps.onChange) {
        restProps.onChange.apply(restProps, args);
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({
          label: children,
          value: restProps.value
        });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value.includes(restProps.value);
  }
  const classString = classNames(`${prefixCls}-wrapper`, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
    [`${prefixCls}-wrapper-disabled`]: mergedDisabled,
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput
  }, checkbox === null || checkbox === void 0 ? void 0 : checkbox.className, className, rootClassName, cssVarCls, rootCls, hashId);
  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate
  }, TARGET_CLS, hashId);
  const [onLabelClick, onInputClick] = useBubbleLock(checkboxProps.onClick);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Wave, {
    component: "Checkbox",
    disabled: mergedDisabled
  }, /* @__PURE__ */ reactExports.createElement("label", {
    className: classString,
    style: Object.assign(Object.assign({}, checkbox === null || checkbox === void 0 ? void 0 : checkbox.style), style),
    onMouseEnter,
    onMouseLeave,
    onClick: onLabelClick
  }, /* @__PURE__ */ reactExports.createElement(Checkbox$2, Object.assign({}, checkboxProps, {
    onClick: onInputClick,
    prefixCls,
    className: checkboxClass,
    disabled: mergedDisabled,
    ref: mergedRef
  })), children !== void 0 && children !== null && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-label`
  }, children))));
};
const Checkbox$1 = /* @__PURE__ */ reactExports.forwardRef(InternalCheckbox);
var __rest$6 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const CheckboxGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    defaultValue,
    children,
    options = [],
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    onChange
  } = props, restProps = __rest$6(props, ["defaultValue", "children", "options", "prefixCls", "className", "rootClassName", "style", "onChange"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const [value, setValue] = reactExports.useState(restProps.value || defaultValue || []);
  const [registeredValues, setRegisteredValues] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if ("value" in restProps) {
      setValue(restProps.value || []);
    }
  }, [restProps.value]);
  const memoizedOptions = reactExports.useMemo(() => options.map((option) => {
    if (typeof option === "string" || typeof option === "number") {
      return {
        label: option,
        value: option
      };
    }
    return option;
  }), [options]);
  const cancelValue = (val) => {
    setRegisteredValues((prevValues) => prevValues.filter((v) => v !== val));
  };
  const registerValue = (val) => {
    setRegisteredValues((prevValues) => [].concat(_toConsumableArray(prevValues), [val]));
  };
  const toggleOption = (option) => {
    const optionIndex = value.indexOf(option.value);
    const newValue = _toConsumableArray(value);
    if (optionIndex === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(optionIndex, 1);
    }
    if (!("value" in restProps)) {
      setValue(newValue);
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(newValue.filter((val) => registeredValues.includes(val)).sort((a, b) => {
      const indexA = memoizedOptions.findIndex((opt) => opt.value === a);
      const indexB = memoizedOptions.findIndex((opt) => opt.value === b);
      return indexA - indexB;
    }));
  };
  const prefixCls = getPrefixCls("checkbox", customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$3(prefixCls, rootCls);
  const domProps = omit(restProps, ["value", "disabled"]);
  const childrenNode = options.length ? memoizedOptions.map((option) => /* @__PURE__ */ reactExports.createElement(Checkbox$1, {
    prefixCls,
    key: option.value.toString(),
    disabled: "disabled" in option ? option.disabled : restProps.disabled,
    value: option.value,
    checked: value.includes(option.value),
    onChange: option.onChange,
    className: classNames(`${groupPrefixCls}-item`, option.className),
    style: option.style,
    title: option.title,
    id: option.id,
    required: option.required
  }, option.label)) : children;
  const memoizedContext = reactExports.useMemo(() => ({
    toggleOption,
    value,
    disabled: restProps.disabled,
    name: restProps.name,
    // https://github.com/ant-design/ant-design/issues/16376
    registerValue,
    cancelValue
  }), [toggleOption, value, restProps.disabled, restProps.name, registerValue, cancelValue]);
  const classString = classNames(groupPrefixCls, {
    [`${groupPrefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, cssVarCls, rootCls, hashId);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({
    className: classString,
    style
  }, domProps, {
    ref
  }), /* @__PURE__ */ reactExports.createElement(GroupContext.Provider, {
    value: memoizedContext
  }, childrenNode)));
});
const Checkbox = Checkbox$1;
Checkbox.Group = CheckboxGroup;
Checkbox.__ANT_CHECKBOX = true;
var SwapRightOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z" } }] }, "name": "swap-right", "theme": "outlined" };
var SwapRightOutlined = function SwapRightOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: SwapRightOutlined$1
  }));
};
var RefIcon$e = /* @__PURE__ */ reactExports.forwardRef(SwapRightOutlined);
const useMergedPickerSemantic = (pickerType, classNames$1, styles, popupClassName, popupStyle) => {
  const {
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig(pickerType);
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames$1], [contextStyles, styles], {
    popup: {
      _default: "root"
    }
  });
  return reactExports.useMemo(() => {
    var _a, _b;
    const filledClassNames = Object.assign(Object.assign({}, mergedClassNames), {
      popup: Object.assign(Object.assign({}, mergedClassNames.popup), {
        root: classNames((_a = mergedClassNames.popup) === null || _a === void 0 ? void 0 : _a.root, popupClassName)
      })
    });
    const filledStyles = Object.assign(Object.assign({}, mergedStyles), {
      popup: Object.assign(Object.assign({}, mergedStyles.popup), {
        root: Object.assign(Object.assign({}, (_b = mergedStyles.popup) === null || _b === void 0 ? void 0 : _b.root), popupStyle)
      })
    });
    return [filledClassNames, filledStyles];
  }, [mergedClassNames, mergedStyles, popupClassName, popupStyle]);
};
function getPlaceholder(locale2, picker, customizePlaceholder) {
  if (customizePlaceholder !== void 0) {
    return customizePlaceholder;
  }
  if (picker === "year" && locale2.lang.yearPlaceholder) {
    return locale2.lang.yearPlaceholder;
  }
  if (picker === "quarter" && locale2.lang.quarterPlaceholder) {
    return locale2.lang.quarterPlaceholder;
  }
  if (picker === "month" && locale2.lang.monthPlaceholder) {
    return locale2.lang.monthPlaceholder;
  }
  if (picker === "week" && locale2.lang.weekPlaceholder) {
    return locale2.lang.weekPlaceholder;
  }
  if (picker === "time" && locale2.timePickerLocale.placeholder) {
    return locale2.timePickerLocale.placeholder;
  }
  return locale2.lang.placeholder;
}
function getRangePlaceholder(locale2, picker, customizePlaceholder) {
  if (customizePlaceholder !== void 0) {
    return customizePlaceholder;
  }
  if (picker === "year" && locale2.lang.yearPlaceholder) {
    return locale2.lang.rangeYearPlaceholder;
  }
  if (picker === "quarter" && locale2.lang.quarterPlaceholder) {
    return locale2.lang.rangeQuarterPlaceholder;
  }
  if (picker === "month" && locale2.lang.monthPlaceholder) {
    return locale2.lang.rangeMonthPlaceholder;
  }
  if (picker === "week" && locale2.lang.weekPlaceholder) {
    return locale2.lang.rangeWeekPlaceholder;
  }
  if (picker === "time" && locale2.timePickerLocale.placeholder) {
    return locale2.timePickerLocale.rangePlaceholder;
  }
  return locale2.lang.rangePlaceholder;
}
function useIcons(props, prefixCls) {
  const {
    allowClear = true
  } = props;
  const {
    clearIcon,
    removeIcon
  } = useIcons$1(Object.assign(Object.assign({}, props), {
    prefixCls,
    componentName: "DatePicker"
  }));
  const mergedAllowClear = reactExports.useMemo(() => {
    if (allowClear === false) {
      return false;
    }
    const allowClearConfig = allowClear === true ? {} : allowClear;
    return Object.assign({
      clearIcon
    }, allowClearConfig);
  }, [allowClear, clearIcon]);
  return [mergedAllowClear, removeIcon];
}
const [WEEK, WEEKPICKER] = ["week", "WeekPicker"];
const [MONTH, MONTHPICKER] = ["month", "MonthPicker"];
const [YEAR, YEARPICKER] = ["year", "YearPicker"];
const [QUARTER, QUARTERPICKER] = ["quarter", "QuarterPicker"];
const [TIME, TIMEPICKER] = ["time", "TimePicker"];
var CalendarOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z" } }] }, "name": "calendar", "theme": "outlined" };
var CalendarOutlined = function CalendarOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: CalendarOutlined$1
  }));
};
var RefIcon$d = /* @__PURE__ */ reactExports.forwardRef(CalendarOutlined);
var ClockCircleOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" } }] }, "name": "clock-circle", "theme": "outlined" };
var ClockCircleOutlined = function ClockCircleOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: ClockCircleOutlined$1
  }));
};
var RefIcon$c = /* @__PURE__ */ reactExports.forwardRef(ClockCircleOutlined);
const SuffixIcon = ({
  picker,
  hasFeedback,
  feedbackIcon,
  suffixIcon
}) => {
  if (suffixIcon === null || suffixIcon === false) {
    return null;
  }
  if (suffixIcon === true || suffixIcon === void 0) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, picker === TIME ? /* @__PURE__ */ React.createElement(RefIcon$c, null) : /* @__PURE__ */ React.createElement(RefIcon$d, null), hasFeedback && feedbackIcon);
  }
  return suffixIcon;
};
const PickerButton = (props) => /* @__PURE__ */ reactExports.createElement(Button$1, Object.assign({
  size: "small",
  type: "primary"
}, props));
function useComponents(components) {
  return reactExports.useMemo(() => Object.assign({
    button: PickerButton
  }, components), [components]);
}
var __rest$5 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const generateRangePicker = (generateConfig2) => {
  const RangePicker2 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
    var _a;
    const {
      prefixCls: customizePrefixCls,
      getPopupContainer: customGetPopupContainer,
      components,
      className,
      style,
      placement,
      size: customizeSize,
      disabled: customDisabled,
      bordered = true,
      placeholder,
      popupStyle,
      popupClassName,
      dropdownClassName,
      status: customStatus,
      rootClassName,
      variant: customVariant,
      picker,
      styles,
      classNames: classNames$1,
      suffixIcon
    } = props, restProps = __rest$5(props, ["prefixCls", "getPopupContainer", "components", "className", "style", "placement", "size", "disabled", "bordered", "placeholder", "popupStyle", "popupClassName", "dropdownClassName", "status", "rootClassName", "variant", "picker", "styles", "classNames", "suffixIcon"]);
    const pickerType = picker === TIME ? "timePicker" : "datePicker";
    const innerRef = reactExports.useRef(null);
    const {
      getPrefixCls,
      direction,
      getPopupContainer,
      rangePicker
    } = reactExports.useContext(ConfigContext);
    const prefixCls = getPrefixCls("picker", customizePrefixCls);
    const {
      compactSize,
      compactItemClassnames
    } = useCompactItemContext(prefixCls, direction);
    const rootPrefixCls = getPrefixCls();
    const [variant, enableVariantCls] = useVariant("rangePicker", customVariant, bordered);
    const rootCls = useCSSVarCls(prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls, rootCls);
    const [mergedClassNames, mergedStyles] = useMergedPickerSemantic(pickerType, classNames$1, styles, popupClassName || dropdownClassName, popupStyle);
    const [mergedAllowClear] = useIcons(props, prefixCls);
    const mergedComponents = useComponents(components);
    const mergedSize = useSize((ctx) => {
      var _a2;
      return (_a2 = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a2 !== void 0 ? _a2 : ctx;
    });
    const disabled = reactExports.useContext(DisabledContext);
    const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
    const formItemContext = reactExports.useContext(FormItemInputContext);
    const {
      hasFeedback,
      status: contextStatus,
      feedbackIcon
    } = formItemContext;
    const mergedSuffixIcon = /* @__PURE__ */ reactExports.createElement(SuffixIcon, {
      picker,
      hasFeedback,
      feedbackIcon,
      suffixIcon
    });
    reactExports.useImperativeHandle(ref, () => innerRef.current);
    const [contextLocale] = useLocale$1("Calendar", locale$1);
    const locale2 = Object.assign(Object.assign({}, contextLocale), props.locale);
    const [zIndex] = useZIndex("DatePicker", (_a = mergedStyles.popup.root) === null || _a === void 0 ? void 0 : _a.zIndex);
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(ContextIsolator, {
      space: true
    }, /* @__PURE__ */ reactExports.createElement(RefRangePicker, Object.assign({
      separator: /* @__PURE__ */ reactExports.createElement("span", {
        "aria-label": "to",
        className: `${prefixCls}-separator`
      }, /* @__PURE__ */ reactExports.createElement(RefIcon$e, null)),
      disabled: mergedDisabled,
      ref: innerRef,
      placement,
      placeholder: getRangePlaceholder(locale2, picker, placeholder),
      suffixIcon: mergedSuffixIcon,
      prevIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-prev-icon`
      }),
      nextIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-next-icon`
      }),
      superPrevIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-super-prev-icon`
      }),
      superNextIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-super-next-icon`
      }),
      transitionName: `${rootPrefixCls}-slide-up`,
      picker
    }, restProps, {
      className: classNames({
        [`${prefixCls}-${mergedSize}`]: mergedSize,
        [`${prefixCls}-${variant}`]: enableVariantCls
      }, getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), hashId, compactItemClassnames, className, rangePicker === null || rangePicker === void 0 ? void 0 : rangePicker.className, cssVarCls, rootCls, rootClassName, mergedClassNames.root),
      style: Object.assign(Object.assign(Object.assign({}, rangePicker === null || rangePicker === void 0 ? void 0 : rangePicker.style), style), mergedStyles.root),
      locale: locale2.lang,
      prefixCls,
      getPopupContainer: customGetPopupContainer || getPopupContainer,
      generateConfig: generateConfig2,
      components: mergedComponents,
      direction,
      classNames: {
        popup: classNames(hashId, cssVarCls, rootCls, rootClassName, mergedClassNames.popup.root)
      },
      styles: {
        popup: Object.assign(Object.assign({}, mergedStyles.popup.root), {
          zIndex
        })
      },
      allowClear: mergedAllowClear
    }))));
  });
  return RangePicker2;
};
var __rest$4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const generatePicker$1 = (generateConfig2) => {
  const getPicker = (picker, displayName) => {
    const consumerName = displayName === TIMEPICKER ? "timePicker" : "datePicker";
    const Picker2 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
      var _a;
      const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customizeGetPopupContainer,
        components,
        style,
        className,
        rootClassName,
        size: customizeSize,
        bordered,
        placement,
        placeholder,
        popupStyle,
        popupClassName,
        dropdownClassName,
        disabled: customDisabled,
        status: customStatus,
        variant: customVariant,
        onCalendarChange,
        styles,
        classNames: classNames$1,
        suffixIcon
      } = props, restProps = __rest$4(props, ["prefixCls", "getPopupContainer", "components", "style", "className", "rootClassName", "size", "bordered", "placement", "placeholder", "popupStyle", "popupClassName", "dropdownClassName", "disabled", "status", "variant", "onCalendarChange", "styles", "classNames", "suffixIcon"]);
      const {
        getPrefixCls,
        direction,
        getPopupContainer,
        // Consume different styles according to different names
        [consumerName]: consumerStyle
      } = reactExports.useContext(ConfigContext);
      const prefixCls = getPrefixCls("picker", customizePrefixCls);
      const {
        compactSize,
        compactItemClassnames
      } = useCompactItemContext(prefixCls, direction);
      const innerRef = reactExports.useRef(null);
      const [variant, enableVariantCls] = useVariant("datePicker", customVariant, bordered);
      const rootCls = useCSSVarCls(prefixCls);
      const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls, rootCls);
      reactExports.useImperativeHandle(ref, () => innerRef.current);
      const additionalProps = {
        showToday: true
      };
      const mergedPicker = picker || props.picker;
      const rootPrefixCls = getPrefixCls();
      const {
        onSelect,
        multiple
      } = restProps;
      const hasLegacyOnSelect = onSelect && picker === "time" && !multiple;
      const onInternalCalendarChange = (date, dateStr, info) => {
        onCalendarChange === null || onCalendarChange === void 0 ? void 0 : onCalendarChange(date, dateStr, info);
        if (hasLegacyOnSelect) {
          onSelect(date);
        }
      };
      const [mergedClassNames, mergedStyles] = useMergedPickerSemantic(consumerName, classNames$1, styles, popupClassName || dropdownClassName, popupStyle);
      const [mergedAllowClear, removeIcon] = useIcons(props, prefixCls);
      const mergedComponents = useComponents(components);
      const mergedSize = useSize((ctx) => {
        var _a2;
        return (_a2 = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a2 !== void 0 ? _a2 : ctx;
      });
      const disabled = reactExports.useContext(DisabledContext);
      const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
      const formItemContext = reactExports.useContext(FormItemInputContext);
      const {
        hasFeedback,
        status: contextStatus,
        feedbackIcon
      } = formItemContext;
      const mergedSuffixIcon = /* @__PURE__ */ reactExports.createElement(SuffixIcon, {
        picker: mergedPicker,
        hasFeedback,
        feedbackIcon,
        suffixIcon
      });
      const [contextLocale] = useLocale$1("DatePicker", locale$1);
      const locale2 = Object.assign(Object.assign({}, contextLocale), props.locale);
      const [zIndex] = useZIndex("DatePicker", (_a = mergedStyles.popup.root) === null || _a === void 0 ? void 0 : _a.zIndex);
      return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(ContextIsolator, {
        space: true
      }, /* @__PURE__ */ reactExports.createElement(RefPicker, Object.assign({
        ref: innerRef,
        placeholder: getPlaceholder(locale2, mergedPicker, placeholder),
        suffixIcon: mergedSuffixIcon,
        placement,
        prevIcon: /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-prev-icon`
        }),
        nextIcon: /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-next-icon`
        }),
        superPrevIcon: /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-super-prev-icon`
        }),
        superNextIcon: /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-super-next-icon`
        }),
        transitionName: `${rootPrefixCls}-slide-up`,
        picker,
        onCalendarChange: onInternalCalendarChange
      }, additionalProps, restProps, {
        locale: locale2.lang,
        className: classNames({
          [`${prefixCls}-${mergedSize}`]: mergedSize,
          [`${prefixCls}-${variant}`]: enableVariantCls
        }, getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), hashId, compactItemClassnames, consumerStyle === null || consumerStyle === void 0 ? void 0 : consumerStyle.className, className, cssVarCls, rootCls, rootClassName, mergedClassNames.root),
        style: Object.assign(Object.assign(Object.assign({}, consumerStyle === null || consumerStyle === void 0 ? void 0 : consumerStyle.style), style), mergedStyles.root),
        prefixCls,
        getPopupContainer: customizeGetPopupContainer || getPopupContainer,
        generateConfig: generateConfig2,
        components: mergedComponents,
        direction,
        disabled: mergedDisabled,
        classNames: {
          popup: classNames(hashId, cssVarCls, rootCls, rootClassName, mergedClassNames.popup.root)
        },
        styles: {
          popup: Object.assign(Object.assign({}, mergedStyles.popup.root), {
            zIndex
          })
        },
        allowClear: mergedAllowClear,
        removeIcon
      }))));
    });
    return Picker2;
  };
  const DatePicker2 = getPicker();
  const WeekPicker = getPicker(WEEK, WEEKPICKER);
  const MonthPicker = getPicker(MONTH, MONTHPICKER);
  const YearPicker = getPicker(YEAR, YEARPICKER);
  const QuarterPicker = getPicker(QUARTER, QUARTERPICKER);
  const TimePicker = getPicker(TIME, TIMEPICKER);
  return {
    DatePicker: DatePicker2,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker
  };
};
const generatePicker = (generateConfig2) => {
  const {
    DatePicker: DatePicker2,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker
  } = generatePicker$1(generateConfig2);
  const RangePicker2 = generateRangePicker(generateConfig2);
  const MergedDatePicker = DatePicker2;
  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;
  MergedDatePicker.RangePicker = RangePicker2;
  MergedDatePicker.TimePicker = TimePicker;
  MergedDatePicker.QuarterPicker = QuarterPicker;
  return MergedDatePicker;
};
const DatePicker = generatePicker(generateConfig);
const PurePanel = genPurePanel(DatePicker, "popupAlign", void 0, "picker");
DatePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
const PureRangePanel = genPurePanel(DatePicker.RangePicker, "popupAlign", void 0, "picker");
DatePicker._InternalRangePanelDoNotUseOrYouWillBeFired = PureRangePanel;
DatePicker.generatePicker = generatePicker;
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const DropdownButton = (props) => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    type = "default",
    danger,
    disabled,
    loading,
    onClick,
    htmlType,
    children,
    className,
    menu,
    arrow,
    autoFocus,
    overlay,
    trigger,
    align,
    open,
    onOpenChange,
    placement,
    getPopupContainer,
    href,
    icon = /* @__PURE__ */ reactExports.createElement(RefIcon$g, null),
    title,
    buttonsRender = (buttons) => buttons,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyOnHidden,
    destroyPopupOnHide,
    dropdownRender,
    popupRender
  } = props, restProps = __rest$3(props, ["prefixCls", "type", "danger", "disabled", "loading", "onClick", "htmlType", "children", "className", "menu", "arrow", "autoFocus", "overlay", "trigger", "align", "open", "onOpenChange", "placement", "getPopupContainer", "href", "icon", "title", "buttonsRender", "mouseEnterDelay", "mouseLeaveDelay", "overlayClassName", "overlayStyle", "destroyOnHidden", "destroyPopupOnHide", "dropdownRender", "popupRender"]);
  const prefixCls = getPrefixCls("dropdown", customizePrefixCls);
  const buttonPrefixCls = `${prefixCls}-button`;
  const mergedPopupRender = popupRender || dropdownRender;
  const dropdownProps = {
    menu,
    arrow,
    autoFocus,
    align,
    disabled,
    trigger: disabled ? [] : trigger,
    onOpenChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyOnHidden,
    popupRender: mergedPopupRender
  };
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const classes = classNames(buttonPrefixCls, compactItemClassnames, className);
  if ("destroyPopupOnHide" in props) {
    dropdownProps.destroyPopupOnHide = destroyPopupOnHide;
  }
  if ("overlay" in props) {
    dropdownProps.overlay = overlay;
  }
  if ("open" in props) {
    dropdownProps.open = open;
  }
  if ("placement" in props) {
    dropdownProps.placement = placement;
  } else {
    dropdownProps.placement = direction === "rtl" ? "bottomLeft" : "bottomRight";
  }
  const leftButton = /* @__PURE__ */ reactExports.createElement(Button$1, {
    type,
    danger,
    disabled,
    loading,
    onClick,
    htmlType,
    href,
    title
  }, children);
  const rightButton = /* @__PURE__ */ reactExports.createElement(Button$1, {
    type,
    danger,
    icon
  });
  const [leftButtonToRender, rightButtonToRender] = buttonsRender([leftButton, rightButton]);
  return /* @__PURE__ */ reactExports.createElement(Space.Compact, Object.assign({
    className: classes,
    size: compactSize,
    block: true
  }, restProps), leftButtonToRender, /* @__PURE__ */ reactExports.createElement(Dropdown$1, Object.assign({}, dropdownProps), rightButtonToRender));
};
DropdownButton.__ANT_BUTTON = true;
const Dropdown = Dropdown$1;
Dropdown.Button = DropdownButton;
function addEventListenerWrap(target, eventType, cb, option) {
  var callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
    ReactDOM.unstable_batchedUpdates(cb, e);
  } : cb;
  if (target !== null && target !== void 0 && target.addEventListener) {
    target.addEventListener(eventType, callback, option);
  }
  return {
    remove: function remove() {
      if (target !== null && target !== void 0 && target.removeEventListener) {
        target.removeEventListener(eventType, callback, option);
      }
    }
  };
}
var DoubleLeftOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" } }] }, "name": "double-left", "theme": "outlined" };
var DoubleLeftOutlined = function DoubleLeftOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: DoubleLeftOutlined$1
  }));
};
var RefIcon$b = /* @__PURE__ */ reactExports.forwardRef(DoubleLeftOutlined);
var DoubleRightOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" } }] }, "name": "double-right", "theme": "outlined" };
var DoubleRightOutlined = function DoubleRightOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: DoubleRightOutlined$1
  }));
};
var RefIcon$a = /* @__PURE__ */ reactExports.forwardRef(DoubleRightOutlined);
var locale = {
  // Options
  items_per_page: "条/页",
  jump_to: "跳至",
  jump_to_confirm: "确定",
  page: "页",
  // Pagination
  prev_page: "上一页",
  next_page: "下一页",
  prev_5: "向前 5 页",
  next_5: "向后 5 页",
  prev_3: "向前 3 页",
  next_3: "向后 3 页",
  page_size: "页码"
};
var defaultPageSizeOptions = [10, 20, 50, 100];
var Options = function Options2(props) {
  var _props$pageSizeOption = props.pageSizeOptions, pageSizeOptions = _props$pageSizeOption === void 0 ? defaultPageSizeOptions : _props$pageSizeOption, locale2 = props.locale, changeSize = props.changeSize, pageSize = props.pageSize, goButton = props.goButton, quickGo = props.quickGo, rootPrefixCls = props.rootPrefixCls, disabled = props.disabled, buildOptionText = props.buildOptionText, showSizeChanger = props.showSizeChanger, sizeChangerRender = props.sizeChangerRender;
  var _React$useState = React.useState(""), _React$useState2 = _slicedToArray(_React$useState, 2), goInputText = _React$useState2[0], setGoInputText = _React$useState2[1];
  var getValidValue = function getValidValue2() {
    return !goInputText || Number.isNaN(goInputText) ? void 0 : Number(goInputText);
  };
  var mergeBuildOptionText = typeof buildOptionText === "function" ? buildOptionText : function(value) {
    return "".concat(value, " ").concat(locale2.items_per_page);
  };
  var handleChange = function handleChange2(e) {
    setGoInputText(e.target.value);
  };
  var handleBlur = function handleBlur2(e) {
    if (goButton || goInputText === "") {
      return;
    }
    setGoInputText("");
    if (e.relatedTarget && (e.relatedTarget.className.indexOf("".concat(rootPrefixCls, "-item-link")) >= 0 || e.relatedTarget.className.indexOf("".concat(rootPrefixCls, "-item")) >= 0)) {
      return;
    }
    quickGo === null || quickGo === void 0 || quickGo(getValidValue());
  };
  var go = function go2(e) {
    if (goInputText === "") {
      return;
    }
    if (e.keyCode === KeyCode.ENTER || e.type === "click") {
      setGoInputText("");
      quickGo === null || quickGo === void 0 || quickGo(getValidValue());
    }
  };
  var getPageSizeOptions = function getPageSizeOptions2() {
    if (pageSizeOptions.some(function(option) {
      return option.toString() === pageSize.toString();
    })) {
      return pageSizeOptions;
    }
    return pageSizeOptions.concat([pageSize]).sort(function(a, b) {
      var numberA = Number.isNaN(Number(a)) ? 0 : Number(a);
      var numberB = Number.isNaN(Number(b)) ? 0 : Number(b);
      return numberA - numberB;
    });
  };
  var prefixCls = "".concat(rootPrefixCls, "-options");
  if (!showSizeChanger && !quickGo) {
    return null;
  }
  var changeSelect = null;
  var goInput = null;
  var gotoButton = null;
  if (showSizeChanger && sizeChangerRender) {
    changeSelect = sizeChangerRender({
      disabled,
      size: pageSize,
      onSizeChange: function onSizeChange(nextValue) {
        changeSize === null || changeSize === void 0 || changeSize(Number(nextValue));
      },
      "aria-label": locale2.page_size,
      className: "".concat(prefixCls, "-size-changer"),
      options: getPageSizeOptions().map(function(opt) {
        return {
          label: mergeBuildOptionText(opt),
          value: opt
        };
      })
    });
  }
  if (quickGo) {
    if (goButton) {
      gotoButton = typeof goButton === "boolean" ? /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: go,
        onKeyUp: go,
        disabled,
        className: "".concat(prefixCls, "-quick-jumper-button")
      }, locale2.jump_to_confirm) : /* @__PURE__ */ React.createElement("span", {
        onClick: go,
        onKeyUp: go
      }, goButton);
    }
    goInput = /* @__PURE__ */ React.createElement("div", {
      className: "".concat(prefixCls, "-quick-jumper")
    }, locale2.jump_to, /* @__PURE__ */ React.createElement("input", {
      disabled,
      type: "text",
      value: goInputText,
      onChange: handleChange,
      onKeyUp: go,
      onBlur: handleBlur,
      "aria-label": locale2.page
    }), locale2.page, gotoButton);
  }
  return /* @__PURE__ */ React.createElement("li", {
    className: prefixCls
  }, changeSelect, goInput);
};
var Pager = function Pager2(props) {
  var rootPrefixCls = props.rootPrefixCls, page = props.page, active = props.active, className = props.className, showTitle = props.showTitle, onClick = props.onClick, onKeyPress = props.onKeyPress, itemRender = props.itemRender;
  var prefixCls = "".concat(rootPrefixCls, "-item");
  var cls = classNames(prefixCls, "".concat(prefixCls, "-").concat(page), _defineProperty(_defineProperty({}, "".concat(prefixCls, "-active"), active), "".concat(prefixCls, "-disabled"), !page), className);
  var handleClick = function handleClick2() {
    onClick(page);
  };
  var handleKeyPress = function handleKeyPress2(e) {
    onKeyPress(e, onClick, page);
  };
  var pager = itemRender(page, "page", /* @__PURE__ */ React.createElement("a", {
    rel: "nofollow"
  }, page));
  return pager ? /* @__PURE__ */ React.createElement("li", {
    title: showTitle ? String(page) : null,
    className: cls,
    onClick: handleClick,
    onKeyDown: handleKeyPress,
    tabIndex: 0
  }, pager) : null;
};
var defaultItemRender = function defaultItemRender2(page, type, element) {
  return element;
};
function noop$1() {
}
function isInteger(v) {
  var value = Number(v);
  return typeof value === "number" && !Number.isNaN(value) && isFinite(value) && Math.floor(value) === value;
}
function calculatePage(p, pageSize, total) {
  var _pageSize = typeof p === "undefined" ? pageSize : p;
  return Math.floor((total - 1) / _pageSize) + 1;
}
var Pagination$1 = function Pagination2(props) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-pagination" : _props$prefixCls, _props$selectPrefixCl = props.selectPrefixCls, selectPrefixCls = _props$selectPrefixCl === void 0 ? "rc-select" : _props$selectPrefixCl, className = props.className, currentProp = props.current, _props$defaultCurrent = props.defaultCurrent, defaultCurrent = _props$defaultCurrent === void 0 ? 1 : _props$defaultCurrent, _props$total = props.total, total = _props$total === void 0 ? 0 : _props$total, pageSizeProp = props.pageSize, _props$defaultPageSiz = props.defaultPageSize, defaultPageSize = _props$defaultPageSiz === void 0 ? 10 : _props$defaultPageSiz, _props$onChange = props.onChange, onChange = _props$onChange === void 0 ? noop$1 : _props$onChange, hideOnSinglePage = props.hideOnSinglePage, align = props.align, _props$showPrevNextJu = props.showPrevNextJumpers, showPrevNextJumpers = _props$showPrevNextJu === void 0 ? true : _props$showPrevNextJu, showQuickJumper = props.showQuickJumper, showLessItems = props.showLessItems, _props$showTitle = props.showTitle, showTitle = _props$showTitle === void 0 ? true : _props$showTitle, _props$onShowSizeChan = props.onShowSizeChange, onShowSizeChange = _props$onShowSizeChan === void 0 ? noop$1 : _props$onShowSizeChan, _props$locale = props.locale, locale$12 = _props$locale === void 0 ? locale : _props$locale, style = props.style, _props$totalBoundaryS = props.totalBoundaryShowSizeChanger, totalBoundaryShowSizeChanger = _props$totalBoundaryS === void 0 ? 50 : _props$totalBoundaryS, disabled = props.disabled, simple = props.simple, showTotal = props.showTotal, _props$showSizeChange = props.showSizeChanger, showSizeChanger = _props$showSizeChange === void 0 ? total > totalBoundaryShowSizeChanger : _props$showSizeChange, sizeChangerRender = props.sizeChangerRender, pageSizeOptions = props.pageSizeOptions, _props$itemRender = props.itemRender, itemRender = _props$itemRender === void 0 ? defaultItemRender : _props$itemRender, jumpPrevIcon = props.jumpPrevIcon, jumpNextIcon = props.jumpNextIcon, prevIcon = props.prevIcon, nextIcon = props.nextIcon;
  var paginationRef = React.useRef(null);
  var _useMergedState = useMergedState(10, {
    value: pageSizeProp,
    defaultValue: defaultPageSize
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), pageSize = _useMergedState2[0], setPageSize = _useMergedState2[1];
  var _useMergedState3 = useMergedState(1, {
    value: currentProp,
    defaultValue: defaultCurrent,
    postState: function postState(c) {
      return Math.max(1, Math.min(c, calculatePage(void 0, pageSize, total)));
    }
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), current = _useMergedState4[0], setCurrent = _useMergedState4[1];
  var _React$useState = React.useState(current), _React$useState2 = _slicedToArray(_React$useState, 2), internalInputVal = _React$useState2[0], setInternalInputVal = _React$useState2[1];
  reactExports.useEffect(function() {
    setInternalInputVal(current);
  }, [current]);
  var jumpPrevPage = Math.max(1, current - (showLessItems ? 3 : 5));
  var jumpNextPage = Math.min(calculatePage(void 0, pageSize, total), current + (showLessItems ? 3 : 5));
  function getItemIcon(icon, label) {
    var iconNode = icon || /* @__PURE__ */ React.createElement("button", {
      type: "button",
      "aria-label": label,
      className: "".concat(prefixCls, "-item-link")
    });
    if (typeof icon === "function") {
      iconNode = /* @__PURE__ */ React.createElement(icon, _objectSpread2({}, props));
    }
    return iconNode;
  }
  function getValidValue(e) {
    var inputValue = e.target.value;
    var allPages2 = calculatePage(void 0, pageSize, total);
    var value;
    if (inputValue === "") {
      value = inputValue;
    } else if (Number.isNaN(Number(inputValue))) {
      value = internalInputVal;
    } else if (inputValue >= allPages2) {
      value = allPages2;
    } else {
      value = Number(inputValue);
    }
    return value;
  }
  function isValid(page) {
    return isInteger(page) && page !== current && isInteger(total) && total > 0;
  }
  var shouldDisplayQuickJumper = total > pageSize ? showQuickJumper : false;
  function handleKeyDown(event) {
    if (event.keyCode === KeyCode.UP || event.keyCode === KeyCode.DOWN) {
      event.preventDefault();
    }
  }
  function handleKeyUp(event) {
    var value = getValidValue(event);
    if (value !== internalInputVal) {
      setInternalInputVal(value);
    }
    switch (event.keyCode) {
      case KeyCode.ENTER:
        handleChange(value);
        break;
      case KeyCode.UP:
        handleChange(value - 1);
        break;
      case KeyCode.DOWN:
        handleChange(value + 1);
        break;
    }
  }
  function handleBlur(event) {
    handleChange(getValidValue(event));
  }
  function changePageSize(size) {
    var newCurrent = calculatePage(size, pageSize, total);
    var nextCurrent = current > newCurrent && newCurrent !== 0 ? newCurrent : current;
    setPageSize(size);
    setInternalInputVal(nextCurrent);
    onShowSizeChange === null || onShowSizeChange === void 0 || onShowSizeChange(current, size);
    setCurrent(nextCurrent);
    onChange === null || onChange === void 0 || onChange(nextCurrent, size);
  }
  function handleChange(page) {
    if (isValid(page) && !disabled) {
      var currentPage = calculatePage(void 0, pageSize, total);
      var newPage = page;
      if (page > currentPage) {
        newPage = currentPage;
      } else if (page < 1) {
        newPage = 1;
      }
      if (newPage !== internalInputVal) {
        setInternalInputVal(newPage);
      }
      setCurrent(newPage);
      onChange === null || onChange === void 0 || onChange(newPage, pageSize);
      return newPage;
    }
    return current;
  }
  var hasPrev = current > 1;
  var hasNext = current < calculatePage(void 0, pageSize, total);
  function prevHandle() {
    if (hasPrev) handleChange(current - 1);
  }
  function nextHandle() {
    if (hasNext) handleChange(current + 1);
  }
  function jumpPrevHandle() {
    handleChange(jumpPrevPage);
  }
  function jumpNextHandle() {
    handleChange(jumpNextPage);
  }
  function runIfEnter(event, callback) {
    if (event.key === "Enter" || event.charCode === KeyCode.ENTER || event.keyCode === KeyCode.ENTER) {
      for (var _len = arguments.length, restParams = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        restParams[_key - 2] = arguments[_key];
      }
      callback.apply(void 0, restParams);
    }
  }
  function runIfEnterPrev(event) {
    runIfEnter(event, prevHandle);
  }
  function runIfEnterNext(event) {
    runIfEnter(event, nextHandle);
  }
  function runIfEnterJumpPrev(event) {
    runIfEnter(event, jumpPrevHandle);
  }
  function runIfEnterJumpNext(event) {
    runIfEnter(event, jumpNextHandle);
  }
  function renderPrev(prevPage2) {
    var prevButton = itemRender(prevPage2, "prev", getItemIcon(prevIcon, "prev page"));
    return /* @__PURE__ */ React.isValidElement(prevButton) ? /* @__PURE__ */ React.cloneElement(prevButton, {
      disabled: !hasPrev
    }) : prevButton;
  }
  function renderNext(nextPage2) {
    var nextButton = itemRender(nextPage2, "next", getItemIcon(nextIcon, "next page"));
    return /* @__PURE__ */ React.isValidElement(nextButton) ? /* @__PURE__ */ React.cloneElement(nextButton, {
      disabled: !hasNext
    }) : nextButton;
  }
  function handleGoTO(event) {
    if (event.type === "click" || event.keyCode === KeyCode.ENTER) {
      handleChange(internalInputVal);
    }
  }
  var jumpPrev = null;
  var dataOrAriaAttributeProps = pickAttrs(props, {
    aria: true,
    data: true
  });
  var totalText = showTotal && /* @__PURE__ */ React.createElement("li", {
    className: "".concat(prefixCls, "-total-text")
  }, showTotal(total, [total === 0 ? 0 : (current - 1) * pageSize + 1, current * pageSize > total ? total : current * pageSize]));
  var jumpNext = null;
  var allPages = calculatePage(void 0, pageSize, total);
  if (hideOnSinglePage && total <= pageSize) {
    return null;
  }
  var pagerList = [];
  var pagerProps = {
    rootPrefixCls: prefixCls,
    onClick: handleChange,
    onKeyPress: runIfEnter,
    showTitle,
    itemRender,
    page: -1
  };
  var prevPage = current - 1 > 0 ? current - 1 : 0;
  var nextPage = current + 1 < allPages ? current + 1 : allPages;
  var goButton = showQuickJumper && showQuickJumper.goButton;
  var isReadOnly = _typeof(simple) === "object" ? simple.readOnly : !simple;
  var gotoButton = goButton;
  var simplePager = null;
  if (simple) {
    if (goButton) {
      if (typeof goButton === "boolean") {
        gotoButton = /* @__PURE__ */ React.createElement("button", {
          type: "button",
          onClick: handleGoTO,
          onKeyUp: handleGoTO
        }, locale$12.jump_to_confirm);
      } else {
        gotoButton = /* @__PURE__ */ React.createElement("span", {
          onClick: handleGoTO,
          onKeyUp: handleGoTO
        }, goButton);
      }
      gotoButton = /* @__PURE__ */ React.createElement("li", {
        title: showTitle ? "".concat(locale$12.jump_to).concat(current, "/").concat(allPages) : null,
        className: "".concat(prefixCls, "-simple-pager")
      }, gotoButton);
    }
    simplePager = /* @__PURE__ */ React.createElement("li", {
      title: showTitle ? "".concat(current, "/").concat(allPages) : null,
      className: "".concat(prefixCls, "-simple-pager")
    }, isReadOnly ? internalInputVal : /* @__PURE__ */ React.createElement("input", {
      type: "text",
      "aria-label": locale$12.jump_to,
      value: internalInputVal,
      disabled,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onChange: handleKeyUp,
      onBlur: handleBlur,
      size: 3
    }), /* @__PURE__ */ React.createElement("span", {
      className: "".concat(prefixCls, "-slash")
    }, "/"), allPages);
  }
  var pageBufferSize = showLessItems ? 1 : 2;
  if (allPages <= 3 + pageBufferSize * 2) {
    if (!allPages) {
      pagerList.push(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: "noPager",
        page: 1,
        className: "".concat(prefixCls, "-item-disabled")
      })));
    }
    for (var i = 1; i <= allPages; i += 1) {
      pagerList.push(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: i,
        page: i,
        active: current === i
      })));
    }
  } else {
    var prevItemTitle = showLessItems ? locale$12.prev_3 : locale$12.prev_5;
    var nextItemTitle = showLessItems ? locale$12.next_3 : locale$12.next_5;
    var jumpPrevContent = itemRender(jumpPrevPage, "jump-prev", getItemIcon(jumpPrevIcon, "prev page"));
    var jumpNextContent = itemRender(jumpNextPage, "jump-next", getItemIcon(jumpNextIcon, "next page"));
    if (showPrevNextJumpers) {
      jumpPrev = jumpPrevContent ? /* @__PURE__ */ React.createElement("li", {
        title: showTitle ? prevItemTitle : null,
        key: "prev",
        onClick: jumpPrevHandle,
        tabIndex: 0,
        onKeyDown: runIfEnterJumpPrev,
        className: classNames("".concat(prefixCls, "-jump-prev"), _defineProperty({}, "".concat(prefixCls, "-jump-prev-custom-icon"), !!jumpPrevIcon))
      }, jumpPrevContent) : null;
      jumpNext = jumpNextContent ? /* @__PURE__ */ React.createElement("li", {
        title: showTitle ? nextItemTitle : null,
        key: "next",
        onClick: jumpNextHandle,
        tabIndex: 0,
        onKeyDown: runIfEnterJumpNext,
        className: classNames("".concat(prefixCls, "-jump-next"), _defineProperty({}, "".concat(prefixCls, "-jump-next-custom-icon"), !!jumpNextIcon))
      }, jumpNextContent) : null;
    }
    var left = Math.max(1, current - pageBufferSize);
    var right = Math.min(current + pageBufferSize, allPages);
    if (current - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }
    if (allPages - current <= pageBufferSize) {
      left = allPages - pageBufferSize * 2;
    }
    for (var _i = left; _i <= right; _i += 1) {
      pagerList.push(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: _i,
        page: _i,
        active: current === _i
      })));
    }
    if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
      pagerList[0] = /* @__PURE__ */ React.cloneElement(pagerList[0], {
        className: classNames("".concat(prefixCls, "-item-after-jump-prev"), pagerList[0].props.className)
      });
      pagerList.unshift(jumpPrev);
    }
    if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
      var lastOne = pagerList[pagerList.length - 1];
      pagerList[pagerList.length - 1] = /* @__PURE__ */ React.cloneElement(lastOne, {
        className: classNames("".concat(prefixCls, "-item-before-jump-next"), lastOne.props.className)
      });
      pagerList.push(jumpNext);
    }
    if (left !== 1) {
      pagerList.unshift(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: 1,
        page: 1
      })));
    }
    if (right !== allPages) {
      pagerList.push(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: allPages,
        page: allPages
      })));
    }
  }
  var prev = renderPrev(prevPage);
  if (prev) {
    var prevDisabled = !hasPrev || !allPages;
    prev = /* @__PURE__ */ React.createElement("li", {
      title: showTitle ? locale$12.prev_page : null,
      onClick: prevHandle,
      tabIndex: prevDisabled ? null : 0,
      onKeyDown: runIfEnterPrev,
      className: classNames("".concat(prefixCls, "-prev"), _defineProperty({}, "".concat(prefixCls, "-disabled"), prevDisabled)),
      "aria-disabled": prevDisabled
    }, prev);
  }
  var next = renderNext(nextPage);
  if (next) {
    var nextDisabled, nextTabIndex;
    if (simple) {
      nextDisabled = !hasNext;
      nextTabIndex = hasPrev ? 0 : null;
    } else {
      nextDisabled = !hasNext || !allPages;
      nextTabIndex = nextDisabled ? null : 0;
    }
    next = /* @__PURE__ */ React.createElement("li", {
      title: showTitle ? locale$12.next_page : null,
      onClick: nextHandle,
      tabIndex: nextTabIndex,
      onKeyDown: runIfEnterNext,
      className: classNames("".concat(prefixCls, "-next"), _defineProperty({}, "".concat(prefixCls, "-disabled"), nextDisabled)),
      "aria-disabled": nextDisabled
    }, next);
  }
  var cls = classNames(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-start"), align === "start"), "".concat(prefixCls, "-center"), align === "center"), "".concat(prefixCls, "-end"), align === "end"), "".concat(prefixCls, "-simple"), simple), "".concat(prefixCls, "-disabled"), disabled));
  return /* @__PURE__ */ React.createElement("ul", _extends({
    className: cls,
    style,
    ref: paginationRef
  }, dataOrAriaAttributeProps), totalText, prev, simple ? simplePager : pagerList, next, /* @__PURE__ */ React.createElement(Options, {
    locale: locale$12,
    rootPrefixCls: prefixCls,
    disabled,
    selectPrefixCls,
    changeSize: changePageSize,
    pageSize,
    pageSizeOptions,
    quickGo: shouldDisplayQuickJumper ? handleChange : null,
    goButton: gotoButton,
    showSizeChanger,
    sizeChangerRender
  }));
};
const genPaginationDisabledStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-disabled`]: {
      "&, &:hover": {
        cursor: "not-allowed",
        [`${componentCls}-item-link`]: {
          color: token.colorTextDisabled,
          cursor: "not-allowed"
        }
      },
      "&:focus-visible": {
        cursor: "not-allowed",
        [`${componentCls}-item-link`]: {
          color: token.colorTextDisabled,
          cursor: "not-allowed"
        }
      }
    },
    [`&${componentCls}-disabled`]: {
      cursor: "not-allowed",
      [`${componentCls}-item`]: {
        cursor: "not-allowed",
        backgroundColor: "transparent",
        "&:hover, &:active": {
          backgroundColor: "transparent"
        },
        a: {
          color: token.colorTextDisabled,
          backgroundColor: "transparent",
          border: "none",
          cursor: "not-allowed"
        },
        "&-active": {
          borderColor: token.colorBorder,
          backgroundColor: token.itemActiveBgDisabled,
          "&:hover, &:active": {
            backgroundColor: token.itemActiveBgDisabled
          },
          a: {
            color: token.itemActiveColorDisabled
          }
        }
      },
      [`${componentCls}-item-link`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed",
        "&:hover, &:active": {
          backgroundColor: "transparent"
        },
        [`${componentCls}-simple&`]: {
          backgroundColor: "transparent",
          "&:hover, &:active": {
            backgroundColor: "transparent"
          }
        }
      },
      [`${componentCls}-simple-pager`]: {
        color: token.colorTextDisabled
      },
      [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
        [`${componentCls}-item-link-icon`]: {
          opacity: 0
        },
        [`${componentCls}-item-ellipsis`]: {
          opacity: 1
        }
      }
    }
  };
};
const genPaginationMiniStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`&${componentCls}-mini ${componentCls}-total-text, &${componentCls}-mini ${componentCls}-simple-pager`]: {
      height: token.itemSizeSM,
      lineHeight: unit(token.itemSizeSM)
    },
    [`&${componentCls}-mini ${componentCls}-item`]: {
      minWidth: token.itemSizeSM,
      height: token.itemSizeSM,
      margin: 0,
      lineHeight: unit(token.calc(token.itemSizeSM).sub(2).equal())
    },
    [`&${componentCls}-mini ${componentCls}-prev, &${componentCls}-mini ${componentCls}-next`]: {
      minWidth: token.itemSizeSM,
      height: token.itemSizeSM,
      margin: 0,
      lineHeight: unit(token.itemSizeSM)
    },
    [`&${componentCls}-mini:not(${componentCls}-disabled)`]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        [`&:hover ${componentCls}-item-link`]: {
          backgroundColor: token.colorBgTextHover
        },
        [`&:active ${componentCls}-item-link`]: {
          backgroundColor: token.colorBgTextActive
        },
        [`&${componentCls}-disabled:hover ${componentCls}-item-link`]: {
          backgroundColor: "transparent"
        }
      }
    },
    [`
    &${componentCls}-mini ${componentCls}-prev ${componentCls}-item-link,
    &${componentCls}-mini ${componentCls}-next ${componentCls}-item-link
    `]: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      "&::after": {
        height: token.itemSizeSM,
        lineHeight: unit(token.itemSizeSM)
      }
    },
    [`&${componentCls}-mini ${componentCls}-jump-prev, &${componentCls}-mini ${componentCls}-jump-next`]: {
      height: token.itemSizeSM,
      marginInlineEnd: 0,
      lineHeight: unit(token.itemSizeSM)
    },
    [`&${componentCls}-mini ${componentCls}-options`]: {
      marginInlineStart: token.paginationMiniOptionsMarginInlineStart,
      "&-size-changer": {
        top: token.miniOptionsSizeChangerTop
      },
      "&-quick-jumper": {
        height: token.itemSizeSM,
        lineHeight: unit(token.itemSizeSM),
        input: Object.assign(Object.assign({}, genInputSmallStyle(token)), {
          width: token.paginationMiniQuickJumperInputWidth,
          height: token.controlHeightSM
        })
      }
    }
  };
};
const genPaginationSimpleStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`&${componentCls}-simple`]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        height: token.itemSize,
        lineHeight: unit(token.itemSize),
        verticalAlign: "top",
        [`${componentCls}-item-link`]: {
          height: token.itemSize,
          backgroundColor: "transparent",
          border: 0,
          "&:hover": {
            backgroundColor: token.colorBgTextHover
          },
          "&:active": {
            backgroundColor: token.colorBgTextActive
          },
          "&::after": {
            height: token.itemSize,
            lineHeight: unit(token.itemSize)
          }
        }
      },
      [`${componentCls}-simple-pager`]: {
        display: "inline-flex",
        alignItems: "center",
        height: token.itemSize,
        marginInlineEnd: token.marginXS,
        input: {
          boxSizing: "border-box",
          height: "100%",
          width: token.quickJumperInputWidth,
          padding: `0 ${unit(token.paginationItemPaddingInline)}`,
          textAlign: "center",
          backgroundColor: token.itemInputBg,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadius,
          outline: "none",
          transition: `border-color ${token.motionDurationMid}`,
          color: "inherit",
          "&:hover": {
            borderColor: token.colorPrimary
          },
          "&:focus": {
            borderColor: token.colorPrimaryHover,
            boxShadow: `${unit(token.inputOutlineOffset)} 0 ${unit(token.controlOutlineWidth)} ${token.controlOutline}`
          },
          "&[disabled]": {
            color: token.colorTextDisabled,
            backgroundColor: token.colorBgContainerDisabled,
            borderColor: token.colorBorder,
            cursor: "not-allowed"
          }
        }
      },
      [`&${componentCls}-disabled`]: {
        [`${componentCls}-prev, ${componentCls}-next`]: {
          [`${componentCls}-item-link`]: {
            "&:hover, &:active": {
              backgroundColor: "transparent"
            }
          }
        }
      },
      [`&${componentCls}-mini`]: {
        [`${componentCls}-prev, ${componentCls}-next`]: {
          height: token.itemSizeSM,
          lineHeight: unit(token.itemSizeSM),
          [`${componentCls}-item-link`]: {
            height: token.itemSizeSM,
            "&::after": {
              height: token.itemSizeSM,
              lineHeight: unit(token.itemSizeSM)
            }
          }
        },
        [`${componentCls}-simple-pager`]: {
          height: token.itemSizeSM,
          input: {
            width: token.paginationMiniQuickJumperInputWidth
          }
        }
      }
    }
  };
};
const genPaginationJumpStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
      outline: 0,
      [`${componentCls}-item-container`]: {
        position: "relative",
        [`${componentCls}-item-link-icon`]: {
          color: token.colorPrimary,
          fontSize: token.fontSizeSM,
          opacity: 0,
          transition: `all ${token.motionDurationMid}`,
          "&-svg": {
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            margin: "auto"
          }
        },
        [`${componentCls}-item-ellipsis`]: {
          position: "absolute",
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          display: "block",
          margin: "auto",
          color: token.colorTextDisabled,
          letterSpacing: token.paginationEllipsisLetterSpacing,
          textAlign: "center",
          textIndent: token.paginationEllipsisTextIndent,
          opacity: 1,
          transition: `all ${token.motionDurationMid}`
        }
      },
      "&:hover": {
        [`${componentCls}-item-link-icon`]: {
          opacity: 1
        },
        [`${componentCls}-item-ellipsis`]: {
          opacity: 0
        }
      }
    },
    [`
    ${componentCls}-prev,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
      marginInlineEnd: token.marginXS
    },
    [`
    ${componentCls}-prev,
    ${componentCls}-next,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
      display: "inline-block",
      minWidth: token.itemSize,
      height: token.itemSize,
      color: token.colorText,
      fontFamily: token.fontFamily,
      lineHeight: unit(token.itemSize),
      textAlign: "center",
      verticalAlign: "middle",
      listStyle: "none",
      borderRadius: token.borderRadius,
      cursor: "pointer",
      transition: `all ${token.motionDurationMid}`
    },
    [`${componentCls}-prev, ${componentCls}-next`]: {
      outline: 0,
      button: {
        color: token.colorText,
        cursor: "pointer",
        userSelect: "none"
      },
      [`${componentCls}-item-link`]: {
        display: "block",
        width: "100%",
        height: "100%",
        padding: 0,
        fontSize: token.fontSizeSM,
        textAlign: "center",
        backgroundColor: "transparent",
        border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
        borderRadius: token.borderRadius,
        outline: "none",
        transition: `all ${token.motionDurationMid}`
      },
      [`&:hover ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgTextHover
      },
      [`&:active ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgTextActive
      },
      [`&${componentCls}-disabled:hover`]: {
        [`${componentCls}-item-link`]: {
          backgroundColor: "transparent"
        }
      }
    },
    [`${componentCls}-slash`]: {
      marginInlineEnd: token.paginationSlashMarginInlineEnd,
      marginInlineStart: token.paginationSlashMarginInlineStart
    },
    [`${componentCls}-options`]: {
      display: "inline-block",
      marginInlineStart: token.margin,
      verticalAlign: "middle",
      "&-size-changer": {
        display: "inline-block",
        width: "auto"
      },
      "&-quick-jumper": {
        display: "inline-block",
        height: token.controlHeight,
        marginInlineStart: token.marginXS,
        lineHeight: unit(token.controlHeight),
        verticalAlign: "top",
        input: Object.assign(Object.assign(Object.assign({}, genBasicInputStyle(token)), genBaseOutlinedStyle(token, {
          borderColor: token.colorBorder,
          hoverBorderColor: token.colorPrimaryHover,
          activeBorderColor: token.colorPrimary,
          activeShadow: token.activeShadow
        })), {
          "&[disabled]": Object.assign({}, genDisabledStyle(token)),
          width: token.quickJumperInputWidth,
          height: token.controlHeight,
          boxSizing: "border-box",
          margin: 0,
          marginInlineStart: token.marginXS,
          marginInlineEnd: token.marginXS
        })
      }
    }
  };
};
const genPaginationItemStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-item`]: {
      display: "inline-block",
      minWidth: token.itemSize,
      height: token.itemSize,
      marginInlineEnd: token.marginXS,
      fontFamily: token.fontFamily,
      lineHeight: unit(token.calc(token.itemSize).sub(2).equal()),
      textAlign: "center",
      verticalAlign: "middle",
      listStyle: "none",
      backgroundColor: token.itemBg,
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
      borderRadius: token.borderRadius,
      outline: 0,
      cursor: "pointer",
      userSelect: "none",
      a: {
        display: "block",
        padding: `0 ${unit(token.paginationItemPaddingInline)}`,
        color: token.colorText,
        "&:hover": {
          textDecoration: "none"
        }
      },
      [`&:not(${componentCls}-item-active)`]: {
        "&:hover": {
          transition: `all ${token.motionDurationMid}`,
          backgroundColor: token.colorBgTextHover
        },
        "&:active": {
          backgroundColor: token.colorBgTextActive
        }
      },
      "&-active": {
        fontWeight: token.fontWeightStrong,
        backgroundColor: token.itemActiveBg,
        borderColor: token.colorPrimary,
        a: {
          color: token.itemActiveColor
        },
        "&:hover": {
          borderColor: token.colorPrimaryHover
        },
        "&:hover a": {
          color: token.itemActiveColorHover
        }
      }
    }
  };
};
const genPaginationStyle$1 = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "flex",
      flexWrap: "wrap",
      rowGap: token.paddingXS,
      "&-start": {
        justifyContent: "start"
      },
      "&-center": {
        justifyContent: "center"
      },
      "&-end": {
        justifyContent: "end"
      },
      "ul, ol": {
        margin: 0,
        padding: 0,
        listStyle: "none"
      },
      "&::after": {
        display: "block",
        clear: "both",
        height: 0,
        overflow: "hidden",
        visibility: "hidden",
        content: '""'
      },
      [`${componentCls}-total-text`]: {
        display: "inline-block",
        height: token.itemSize,
        marginInlineEnd: token.marginXS,
        lineHeight: unit(token.calc(token.itemSize).sub(2).equal()),
        verticalAlign: "middle"
      }
    }), genPaginationItemStyle(token)), genPaginationJumpStyle(token)), genPaginationSimpleStyle(token)), genPaginationMiniStyle(token)), genPaginationDisabledStyle(token)), {
      // media query style
      [`@media only screen and (max-width: ${token.screenLG}px)`]: {
        [`${componentCls}-item`]: {
          "&-after-jump-prev, &-before-jump-next": {
            display: "none"
          }
        }
      },
      [`@media only screen and (max-width: ${token.screenSM}px)`]: {
        [`${componentCls}-options`]: {
          display: "none"
        }
      }
    }),
    // rtl style
    [`&${token.componentCls}-rtl`]: {
      direction: "rtl"
    }
  };
};
const genPaginationFocusStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}:not(${componentCls}-disabled)`]: {
      [`${componentCls}-item`]: Object.assign({}, genFocusStyle(token)),
      [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
        "&:focus-visible": Object.assign({
          [`${componentCls}-item-link-icon`]: {
            opacity: 1
          },
          [`${componentCls}-item-ellipsis`]: {
            opacity: 0
          }
        }, genFocusOutline(token))
      },
      [`${componentCls}-prev, ${componentCls}-next`]: {
        [`&:focus-visible ${componentCls}-item-link`]: genFocusOutline(token)
      }
    }
  };
};
const prepareComponentToken$2 = (token) => Object.assign({
  itemBg: token.colorBgContainer,
  itemSize: token.controlHeight,
  itemSizeSM: token.controlHeightSM,
  itemActiveBg: token.colorBgContainer,
  itemActiveColor: token.colorPrimary,
  itemActiveColorHover: token.colorPrimaryHover,
  itemLinkBg: token.colorBgContainer,
  itemActiveColorDisabled: token.colorTextDisabled,
  itemActiveBgDisabled: token.controlItemBgActiveDisabled,
  itemInputBg: token.colorBgContainer,
  miniOptionsSizeChangerTop: 0
}, initComponentToken$1(token));
const prepareToken = (token) => merge(token, {
  inputOutlineOffset: 0,
  quickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.25).equal(),
  paginationMiniOptionsMarginInlineStart: token.calc(token.marginXXS).div(2).equal(),
  paginationMiniQuickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.1).equal(),
  paginationItemPaddingInline: token.calc(token.marginXXS).mul(1.5).equal(),
  paginationEllipsisLetterSpacing: token.calc(token.marginXXS).div(2).equal(),
  paginationSlashMarginInlineStart: token.marginSM,
  paginationSlashMarginInlineEnd: token.marginSM,
  paginationEllipsisTextIndent: "0.13em"
  // magic for ui experience
}, initInputToken(token));
const useStyle$2 = genStyleHooks("Pagination", (token) => {
  const paginationToken = prepareToken(token);
  return [genPaginationStyle$1(paginationToken), genPaginationFocusStyle(paginationToken)];
}, prepareComponentToken$2);
const genBorderedStyle$1 = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}${componentCls}-bordered${componentCls}-disabled:not(${componentCls}-mini)`]: {
      "&, &:hover": {
        [`${componentCls}-item-link`]: {
          borderColor: token.colorBorder
        }
      },
      "&:focus-visible": {
        [`${componentCls}-item-link`]: {
          borderColor: token.colorBorder
        }
      },
      [`${componentCls}-item, ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgContainerDisabled,
        borderColor: token.colorBorder,
        [`&:hover:not(${componentCls}-item-active)`]: {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          a: {
            color: token.colorTextDisabled
          }
        },
        [`&${componentCls}-item-active`]: {
          backgroundColor: token.itemActiveBgDisabled
        }
      },
      [`${componentCls}-prev, ${componentCls}-next`]: {
        "&:hover button": {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          color: token.colorTextDisabled
        },
        [`${componentCls}-item-link`]: {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder
        }
      }
    },
    [`${componentCls}${componentCls}-bordered:not(${componentCls}-mini)`]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        "&:hover button": {
          borderColor: token.colorPrimaryHover,
          backgroundColor: token.itemBg
        },
        [`${componentCls}-item-link`]: {
          backgroundColor: token.itemLinkBg,
          borderColor: token.colorBorder
        },
        [`&:hover ${componentCls}-item-link`]: {
          borderColor: token.colorPrimary,
          backgroundColor: token.itemBg,
          color: token.colorPrimary
        },
        [`&${componentCls}-disabled`]: {
          [`${componentCls}-item-link`]: {
            borderColor: token.colorBorder,
            color: token.colorTextDisabled
          }
        }
      },
      [`${componentCls}-item`]: {
        backgroundColor: token.itemBg,
        border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
        [`&:hover:not(${componentCls}-item-active)`]: {
          borderColor: token.colorPrimary,
          backgroundColor: token.itemBg,
          a: {
            color: token.colorPrimary
          }
        },
        "&-active": {
          borderColor: token.colorPrimary
        }
      }
    }
  };
};
const BorderedStyle = genSubStyleComponent(["Pagination", "bordered"], (token) => {
  const paginationToken = prepareToken(token);
  return genBorderedStyle$1(paginationToken);
}, prepareComponentToken$2);
function useShowSizeChanger(showSizeChanger) {
  return reactExports.useMemo(() => {
    if (typeof showSizeChanger === "boolean") {
      return [showSizeChanger, {}];
    }
    if (showSizeChanger && typeof showSizeChanger === "object") {
      return [true, showSizeChanger];
    }
    return [void 0, void 0];
  }, [showSizeChanger]);
}
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Pagination = (props) => {
  const {
    align,
    prefixCls: customizePrefixCls,
    selectPrefixCls: customizeSelectPrefixCls,
    className,
    rootClassName,
    style,
    size: customizeSize,
    locale: customLocale,
    responsive,
    showSizeChanger,
    selectComponentClass,
    pageSizeOptions
  } = props, restProps = __rest$2(props, ["align", "prefixCls", "selectPrefixCls", "className", "rootClassName", "style", "size", "locale", "responsive", "showSizeChanger", "selectComponentClass", "pageSizeOptions"]);
  const {
    xs
  } = useBreakpoint(responsive);
  const [, token] = useToken();
  const {
    getPrefixCls,
    direction,
    showSizeChanger: contextShowSizeChangerConfig,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("pagination");
  const prefixCls = getPrefixCls("pagination", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$2(prefixCls);
  const mergedSize = useSize(customizeSize);
  const isSmall = mergedSize === "small" || !!(xs && !mergedSize && responsive);
  const [contextLocale] = useLocale$1("Pagination", locale$2);
  const locale2 = Object.assign(Object.assign({}, contextLocale), customLocale);
  const [propShowSizeChanger, propSizeChangerSelectProps] = useShowSizeChanger(showSizeChanger);
  const [contextShowSizeChanger, contextSizeChangerSelectProps] = useShowSizeChanger(contextShowSizeChangerConfig);
  const mergedShowSizeChanger = propShowSizeChanger !== null && propShowSizeChanger !== void 0 ? propShowSizeChanger : contextShowSizeChanger;
  const mergedShowSizeChangerSelectProps = propSizeChangerSelectProps !== null && propSizeChangerSelectProps !== void 0 ? propSizeChangerSelectProps : contextSizeChangerSelectProps;
  const SizeChanger = selectComponentClass || Select;
  const mergedPageSizeOptions = reactExports.useMemo(() => {
    return pageSizeOptions ? pageSizeOptions.map((option) => Number(option)) : void 0;
  }, [pageSizeOptions]);
  const sizeChangerRender = (info) => {
    var _a;
    const {
      disabled,
      size: pageSize,
      onSizeChange,
      "aria-label": ariaLabel,
      className: sizeChangerClassName,
      options
    } = info;
    const {
      className: propSizeChangerClassName,
      onChange: propSizeChangerOnChange
    } = mergedShowSizeChangerSelectProps || {};
    const selectedValue = (_a = options.find((option) => String(option.value) === String(pageSize))) === null || _a === void 0 ? void 0 : _a.value;
    return /* @__PURE__ */ reactExports.createElement(SizeChanger, Object.assign({
      disabled,
      showSearch: true,
      popupMatchSelectWidth: false,
      getPopupContainer: (triggerNode) => triggerNode.parentNode,
      "aria-label": ariaLabel,
      options
    }, mergedShowSizeChangerSelectProps, {
      value: selectedValue,
      onChange: (nextSize, option) => {
        onSizeChange === null || onSizeChange === void 0 ? void 0 : onSizeChange(nextSize);
        propSizeChangerOnChange === null || propSizeChangerOnChange === void 0 ? void 0 : propSizeChangerOnChange(nextSize, option);
      },
      size: isSmall ? "small" : "middle",
      className: classNames(sizeChangerClassName, propSizeChangerClassName)
    }));
  };
  const iconsProps = reactExports.useMemo(() => {
    const ellipsis = /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-item-ellipsis`
    }, "•••");
    const prevIcon = /* @__PURE__ */ reactExports.createElement("button", {
      className: `${prefixCls}-item-link`,
      type: "button",
      tabIndex: -1
    }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$h, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$f, null));
    const nextIcon = /* @__PURE__ */ reactExports.createElement("button", {
      className: `${prefixCls}-item-link`,
      type: "button",
      tabIndex: -1
    }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$f, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$h, null));
    const jumpPrevIcon = (
      // biome-ignore lint/a11y/useValidAnchor: it is hard to refactor
      /* @__PURE__ */ reactExports.createElement("a", {
        className: `${prefixCls}-item-link`
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-item-container`
      }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$a, {
        className: `${prefixCls}-item-link-icon`
      }) : /* @__PURE__ */ reactExports.createElement(RefIcon$b, {
        className: `${prefixCls}-item-link-icon`
      }), ellipsis))
    );
    const jumpNextIcon = (
      // biome-ignore lint/a11y/useValidAnchor: it is hard to refactor
      /* @__PURE__ */ reactExports.createElement("a", {
        className: `${prefixCls}-item-link`
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-item-container`
      }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$b, {
        className: `${prefixCls}-item-link-icon`
      }) : /* @__PURE__ */ reactExports.createElement(RefIcon$a, {
        className: `${prefixCls}-item-link-icon`
      }), ellipsis))
    );
    return {
      prevIcon,
      nextIcon,
      jumpPrevIcon,
      jumpNextIcon
    };
  }, [direction, prefixCls]);
  const selectPrefixCls = getPrefixCls("select", customizeSelectPrefixCls);
  const extendedClassName = classNames({
    [`${prefixCls}-${align}`]: !!align,
    [`${prefixCls}-mini`]: isSmall,
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-bordered`]: token.wireframe
  }, contextClassName, className, rootClassName, hashId, cssVarCls);
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, token.wireframe && /* @__PURE__ */ reactExports.createElement(BorderedStyle, {
    prefixCls
  }), /* @__PURE__ */ reactExports.createElement(Pagination$1, Object.assign({}, iconsProps, restProps, {
    style: mergedStyle,
    prefixCls,
    selectPrefixCls,
    className: extendedClassName,
    locale: locale2,
    pageSizeOptions: mergedPageSizeOptions,
    showSizeChanger: mergedShowSizeChanger,
    sizeChangerRender
  }))));
};
var EXPAND_COLUMN = {};
var INTERNAL_HOOKS = "rc-table-internal-hook";
function createContext(defaultValue) {
  var Context = /* @__PURE__ */ reactExports.createContext(void 0);
  var Provider = function Provider2(_ref) {
    var value = _ref.value, children = _ref.children;
    var valueRef = reactExports.useRef(value);
    valueRef.current = value;
    var _React$useState = reactExports.useState(function() {
      return {
        getValue: function getValue() {
          return valueRef.current;
        },
        listeners: /* @__PURE__ */ new Set()
      };
    }), _React$useState2 = _slicedToArray(_React$useState, 1), context = _React$useState2[0];
    useLayoutEffect(function() {
      reactDomExports.unstable_batchedUpdates(function() {
        context.listeners.forEach(function(listener) {
          listener(value);
        });
      });
    }, [value]);
    return /* @__PURE__ */ reactExports.createElement(Context.Provider, {
      value: context
    }, children);
  };
  return {
    Context,
    Provider,
    defaultValue
  };
}
function useContext(holder, selector) {
  var eventSelector = useEvent(typeof selector === "function" ? selector : function(ctx) {
    if (selector === void 0) {
      return ctx;
    }
    if (!Array.isArray(selector)) {
      return ctx[selector];
    }
    var obj = {};
    selector.forEach(function(key) {
      obj[key] = ctx[key];
    });
    return obj;
  });
  var context = reactExports.useContext(holder === null || holder === void 0 ? void 0 : holder.Context);
  var _ref2 = context || {}, listeners = _ref2.listeners, getValue = _ref2.getValue;
  var valueRef = reactExports.useRef();
  valueRef.current = eventSelector(context ? getValue() : holder === null || holder === void 0 ? void 0 : holder.defaultValue);
  var _React$useState3 = reactExports.useState({}), _React$useState4 = _slicedToArray(_React$useState3, 2), forceUpdate = _React$useState4[1];
  useLayoutEffect(function() {
    if (!context) {
      return;
    }
    function trigger(nextValue) {
      var nextSelectorValue = eventSelector(nextValue);
      if (!isEqual(valueRef.current, nextSelectorValue, true)) {
        forceUpdate({});
      }
    }
    listeners.add(trigger);
    return function() {
      listeners.delete(trigger);
    };
  }, [context]);
  return valueRef.current;
}
function createImmutable() {
  var ImmutableContext = /* @__PURE__ */ reactExports.createContext(null);
  function useImmutableMark2() {
    return reactExports.useContext(ImmutableContext);
  }
  function makeImmutable2(Component, shouldTriggerRender) {
    var refAble = supportRef(Component);
    var ImmutableComponent = function ImmutableComponent2(props, ref) {
      var refProps = refAble ? {
        ref
      } : {};
      var renderTimesRef = reactExports.useRef(0);
      var prevProps = reactExports.useRef(props);
      var mark = useImmutableMark2();
      if (mark !== null) {
        return /* @__PURE__ */ reactExports.createElement(Component, _extends({}, props, refProps));
      }
      if (
        // Always trigger re-render if not provide `notTriggerRender`
        !shouldTriggerRender || shouldTriggerRender(prevProps.current, props)
      ) {
        renderTimesRef.current += 1;
      }
      prevProps.current = props;
      return /* @__PURE__ */ reactExports.createElement(ImmutableContext.Provider, {
        value: renderTimesRef.current
      }, /* @__PURE__ */ reactExports.createElement(Component, _extends({}, props, refProps)));
    };
    return refAble ? /* @__PURE__ */ reactExports.forwardRef(ImmutableComponent) : ImmutableComponent;
  }
  function responseImmutable2(Component, propsAreEqual) {
    var refAble = supportRef(Component);
    var ImmutableComponent = function ImmutableComponent2(props, ref) {
      var refProps = refAble ? {
        ref
      } : {};
      useImmutableMark2();
      return /* @__PURE__ */ reactExports.createElement(Component, _extends({}, props, refProps));
    };
    return refAble ? /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef(ImmutableComponent), propsAreEqual) : /* @__PURE__ */ reactExports.memo(ImmutableComponent, propsAreEqual);
  }
  return {
    makeImmutable: makeImmutable2,
    responseImmutable: responseImmutable2,
    useImmutableMark: useImmutableMark2
  };
}
var _createImmutable = createImmutable(), makeImmutable = _createImmutable.makeImmutable, responseImmutable = _createImmutable.responseImmutable, useImmutableMark = _createImmutable.useImmutableMark;
var TableContext = createContext();
var PerfContext = /* @__PURE__ */ reactExports.createContext({
  renderWithProps: false
});
var INTERNAL_KEY_PREFIX = "RC_TABLE_KEY";
function toArray(arr) {
  if (arr === void 0 || arr === null) {
    return [];
  }
  return Array.isArray(arr) ? arr : [arr];
}
function getColumnsKey(columns) {
  var columnKeys = [];
  var keys = {};
  columns.forEach(function(column) {
    var _ref = column || {}, key = _ref.key, dataIndex = _ref.dataIndex;
    var mergedKey = key || toArray(dataIndex).join("-") || INTERNAL_KEY_PREFIX;
    while (keys[mergedKey]) {
      mergedKey = "".concat(mergedKey, "_next");
    }
    keys[mergedKey] = true;
    columnKeys.push(mergedKey);
  });
  return columnKeys;
}
function validateValue(val) {
  return val !== null && val !== void 0;
}
function validNumberValue(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isRenderCell(data) {
  return data && _typeof(data) === "object" && !Array.isArray(data) && !/* @__PURE__ */ reactExports.isValidElement(data);
}
function useCellRender(record, dataIndex, renderIndex, children, render, shouldCellUpdate) {
  var perfRecord = reactExports.useContext(PerfContext);
  var mark = useImmutableMark();
  var retData = useMemo(function() {
    if (validateValue(children)) {
      return [children];
    }
    var path = dataIndex === null || dataIndex === void 0 || dataIndex === "" ? [] : Array.isArray(dataIndex) ? dataIndex : [dataIndex];
    var value = get(record, path);
    var returnChildNode = value;
    var returnCellProps = void 0;
    if (render) {
      var renderData = render(value, record, renderIndex);
      if (isRenderCell(renderData)) {
        returnChildNode = renderData.children;
        returnCellProps = renderData.props;
        perfRecord.renderWithProps = true;
      } else {
        returnChildNode = renderData;
      }
    }
    return [returnChildNode, returnCellProps];
  }, [
    // Force update deps
    mark,
    // Normal deps
    record,
    children,
    dataIndex,
    render,
    renderIndex
  ], function(prev, next) {
    if (shouldCellUpdate) {
      var _prev = _slicedToArray(prev, 2), prevRecord = _prev[1];
      var _next = _slicedToArray(next, 2), nextRecord = _next[1];
      return shouldCellUpdate(nextRecord, prevRecord);
    }
    if (perfRecord.renderWithProps) {
      return true;
    }
    return !isEqual(prev, next, true);
  });
  return retData;
}
function inHoverRange(cellStartRow, cellRowSpan, startRow, endRow) {
  var cellEndRow = cellStartRow + cellRowSpan - 1;
  return cellStartRow <= endRow && cellEndRow >= startRow;
}
function useHoverState(rowIndex, rowSpan) {
  return useContext(TableContext, function(ctx) {
    var hovering = inHoverRange(rowIndex, rowSpan || 1, ctx.hoverStartRow, ctx.hoverEndRow);
    return [hovering, ctx.onHover];
  });
}
var getTitleFromCellRenderChildren = function getTitleFromCellRenderChildren2(_ref) {
  var ellipsis = _ref.ellipsis, rowType = _ref.rowType, children = _ref.children;
  var title;
  var ellipsisConfig = ellipsis === true ? {
    showTitle: true
  } : ellipsis;
  if (ellipsisConfig && (ellipsisConfig.showTitle || rowType === "header")) {
    if (typeof children === "string" || typeof children === "number") {
      title = children.toString();
    } else if (/* @__PURE__ */ reactExports.isValidElement(children) && typeof children.props.children === "string") {
      title = children.props.children;
    }
  }
  return title;
};
function Cell(props) {
  var _ref2, _ref3, _legacyCellProps$colS, _ref4, _ref5, _legacyCellProps$rowS, _additionalProps$titl, _classNames;
  var Component = props.component, children = props.children, ellipsis = props.ellipsis, scope = props.scope, prefixCls = props.prefixCls, className = props.className, align = props.align, record = props.record, render = props.render, dataIndex = props.dataIndex, renderIndex = props.renderIndex, shouldCellUpdate = props.shouldCellUpdate, index = props.index, rowType = props.rowType, colSpan = props.colSpan, rowSpan = props.rowSpan, fixLeft = props.fixLeft, fixRight = props.fixRight, firstFixLeft = props.firstFixLeft, lastFixLeft = props.lastFixLeft, firstFixRight = props.firstFixRight, lastFixRight = props.lastFixRight, appendNode = props.appendNode, _props$additionalProp = props.additionalProps, additionalProps = _props$additionalProp === void 0 ? {} : _props$additionalProp, isSticky = props.isSticky;
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var _useContext = useContext(TableContext, ["supportSticky", "allColumnsFixedLeft", "rowHoverable"]), supportSticky = _useContext.supportSticky, allColumnsFixedLeft = _useContext.allColumnsFixedLeft, rowHoverable = _useContext.rowHoverable;
  var _useCellRender = useCellRender(record, dataIndex, renderIndex, children, render, shouldCellUpdate), _useCellRender2 = _slicedToArray(_useCellRender, 2), childNode = _useCellRender2[0], legacyCellProps = _useCellRender2[1];
  var fixedStyle = {};
  var isFixLeft = typeof fixLeft === "number" && supportSticky;
  var isFixRight = typeof fixRight === "number" && supportSticky;
  if (isFixLeft) {
    fixedStyle.position = "sticky";
    fixedStyle.left = fixLeft;
  }
  if (isFixRight) {
    fixedStyle.position = "sticky";
    fixedStyle.right = fixRight;
  }
  var mergedColSpan = (_ref2 = (_ref3 = (_legacyCellProps$colS = legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.colSpan) !== null && _legacyCellProps$colS !== void 0 ? _legacyCellProps$colS : additionalProps.colSpan) !== null && _ref3 !== void 0 ? _ref3 : colSpan) !== null && _ref2 !== void 0 ? _ref2 : 1;
  var mergedRowSpan = (_ref4 = (_ref5 = (_legacyCellProps$rowS = legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.rowSpan) !== null && _legacyCellProps$rowS !== void 0 ? _legacyCellProps$rowS : additionalProps.rowSpan) !== null && _ref5 !== void 0 ? _ref5 : rowSpan) !== null && _ref4 !== void 0 ? _ref4 : 1;
  var _useHoverState = useHoverState(index, mergedRowSpan), _useHoverState2 = _slicedToArray(_useHoverState, 2), hovering = _useHoverState2[0], onHover = _useHoverState2[1];
  var onMouseEnter = useEvent(function(event) {
    var _additionalProps$onMo;
    if (record) {
      onHover(index, index + mergedRowSpan - 1);
    }
    additionalProps === null || additionalProps === void 0 || (_additionalProps$onMo = additionalProps.onMouseEnter) === null || _additionalProps$onMo === void 0 || _additionalProps$onMo.call(additionalProps, event);
  });
  var onMouseLeave = useEvent(function(event) {
    var _additionalProps$onMo2;
    if (record) {
      onHover(-1, -1);
    }
    additionalProps === null || additionalProps === void 0 || (_additionalProps$onMo2 = additionalProps.onMouseLeave) === null || _additionalProps$onMo2 === void 0 || _additionalProps$onMo2.call(additionalProps, event);
  });
  if (mergedColSpan === 0 || mergedRowSpan === 0) {
    return null;
  }
  var title = (_additionalProps$titl = additionalProps.title) !== null && _additionalProps$titl !== void 0 ? _additionalProps$titl : getTitleFromCellRenderChildren({
    rowType,
    ellipsis,
    children: childNode
  });
  var mergedClassName = classNames(cellPrefixCls, className, (_classNames = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left"), isFixLeft && supportSticky), "".concat(cellPrefixCls, "-fix-left-first"), firstFixLeft && supportSticky), "".concat(cellPrefixCls, "-fix-left-last"), lastFixLeft && supportSticky), "".concat(cellPrefixCls, "-fix-left-all"), lastFixLeft && allColumnsFixedLeft && supportSticky), "".concat(cellPrefixCls, "-fix-right"), isFixRight && supportSticky), "".concat(cellPrefixCls, "-fix-right-first"), firstFixRight && supportSticky), "".concat(cellPrefixCls, "-fix-right-last"), lastFixRight && supportSticky), "".concat(cellPrefixCls, "-ellipsis"), ellipsis), "".concat(cellPrefixCls, "-with-append"), appendNode), "".concat(cellPrefixCls, "-fix-sticky"), (isFixLeft || isFixRight) && isSticky && supportSticky), _defineProperty(_classNames, "".concat(cellPrefixCls, "-row-hover"), !legacyCellProps && hovering)), additionalProps.className, legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.className);
  var alignStyle = {};
  if (align) {
    alignStyle.textAlign = align;
  }
  var mergedStyle = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.style), fixedStyle), alignStyle), additionalProps.style);
  var mergedChildNode = childNode;
  if (_typeof(mergedChildNode) === "object" && !Array.isArray(mergedChildNode) && !/* @__PURE__ */ reactExports.isValidElement(mergedChildNode)) {
    mergedChildNode = null;
  }
  if (ellipsis && (lastFixLeft || firstFixRight)) {
    mergedChildNode = /* @__PURE__ */ reactExports.createElement("span", {
      className: "".concat(cellPrefixCls, "-content")
    }, mergedChildNode);
  }
  return /* @__PURE__ */ reactExports.createElement(Component, _extends({}, legacyCellProps, additionalProps, {
    className: mergedClassName,
    style: mergedStyle,
    title,
    scope,
    onMouseEnter: rowHoverable ? onMouseEnter : void 0,
    onMouseLeave: rowHoverable ? onMouseLeave : void 0,
    colSpan: mergedColSpan !== 1 ? mergedColSpan : null,
    rowSpan: mergedRowSpan !== 1 ? mergedRowSpan : null
  }), appendNode, mergedChildNode);
}
const Cell$1 = /* @__PURE__ */ reactExports.memo(Cell);
function getCellFixedInfo(colStart, colEnd, columns, stickyOffsets, direction) {
  var startColumn = columns[colStart] || {};
  var endColumn = columns[colEnd] || {};
  var fixLeft;
  var fixRight;
  if (startColumn.fixed === "left") {
    fixLeft = stickyOffsets.left[direction === "rtl" ? colEnd : colStart];
  } else if (endColumn.fixed === "right") {
    fixRight = stickyOffsets.right[direction === "rtl" ? colStart : colEnd];
  }
  var lastFixLeft = false;
  var firstFixRight = false;
  var lastFixRight = false;
  var firstFixLeft = false;
  var nextColumn = columns[colEnd + 1];
  var prevColumn = columns[colStart - 1];
  var canLastFix = nextColumn && !nextColumn.fixed || prevColumn && !prevColumn.fixed || columns.every(function(col) {
    return col.fixed === "left";
  });
  if (direction === "rtl") {
    if (fixLeft !== void 0) {
      var prevFixLeft = prevColumn && prevColumn.fixed === "left";
      firstFixLeft = !prevFixLeft && canLastFix;
    } else if (fixRight !== void 0) {
      var nextFixRight = nextColumn && nextColumn.fixed === "right";
      lastFixRight = !nextFixRight && canLastFix;
    }
  } else if (fixLeft !== void 0) {
    var nextFixLeft = nextColumn && nextColumn.fixed === "left";
    lastFixLeft = !nextFixLeft && canLastFix;
  } else if (fixRight !== void 0) {
    var prevFixRight = prevColumn && prevColumn.fixed === "right";
    firstFixRight = !prevFixRight && canLastFix;
  }
  return {
    fixLeft,
    fixRight,
    lastFixLeft,
    firstFixRight,
    lastFixRight,
    firstFixLeft,
    isSticky: stickyOffsets.isSticky
  };
}
var SummaryContext = /* @__PURE__ */ reactExports.createContext({});
function SummaryCell(_ref) {
  var className = _ref.className, index = _ref.index, children = _ref.children, _ref$colSpan = _ref.colSpan, colSpan = _ref$colSpan === void 0 ? 1 : _ref$colSpan, rowSpan = _ref.rowSpan, align = _ref.align;
  var _useContext = useContext(TableContext, ["prefixCls", "direction"]), prefixCls = _useContext.prefixCls, direction = _useContext.direction;
  var _React$useContext = reactExports.useContext(SummaryContext), scrollColumnIndex = _React$useContext.scrollColumnIndex, stickyOffsets = _React$useContext.stickyOffsets, flattenColumns = _React$useContext.flattenColumns;
  var lastIndex = index + colSpan - 1;
  var mergedColSpan = lastIndex + 1 === scrollColumnIndex ? colSpan + 1 : colSpan;
  var fixedInfo = getCellFixedInfo(index, index + mergedColSpan - 1, flattenColumns, stickyOffsets, direction);
  return /* @__PURE__ */ reactExports.createElement(Cell$1, _extends({
    className,
    index,
    component: "td",
    prefixCls,
    record: null,
    dataIndex: null,
    align,
    colSpan: mergedColSpan,
    rowSpan,
    render: function render() {
      return children;
    }
  }, fixedInfo));
}
var _excluded$8 = ["children"];
function FooterRow(_ref) {
  var children = _ref.children, props = _objectWithoutProperties(_ref, _excluded$8);
  return /* @__PURE__ */ reactExports.createElement("tr", props, children);
}
function Summary(_ref) {
  var children = _ref.children;
  return children;
}
Summary.Row = FooterRow;
Summary.Cell = SummaryCell;
function Footer(props) {
  var children = props.children, stickyOffsets = props.stickyOffsets, flattenColumns = props.flattenColumns;
  var prefixCls = useContext(TableContext, "prefixCls");
  var lastColumnIndex = flattenColumns.length - 1;
  var scrollColumn = flattenColumns[lastColumnIndex];
  var summaryContext = reactExports.useMemo(function() {
    return {
      stickyOffsets,
      flattenColumns,
      scrollColumnIndex: scrollColumn !== null && scrollColumn !== void 0 && scrollColumn.scrollbar ? lastColumnIndex : null
    };
  }, [scrollColumn, flattenColumns, lastColumnIndex, stickyOffsets]);
  return /* @__PURE__ */ reactExports.createElement(SummaryContext.Provider, {
    value: summaryContext
  }, /* @__PURE__ */ reactExports.createElement("tfoot", {
    className: "".concat(prefixCls, "-summary")
  }, children));
}
const Footer$1 = responseImmutable(Footer);
var FooterComponents = Summary;
function Column$1(_) {
  return null;
}
function ColumnGroup$1(_) {
  return null;
}
function fillRecords(list, record, indent, childrenColumnName, expandedKeys, getRowKey, index) {
  var key = getRowKey(record, index);
  list.push({
    record,
    indent,
    index,
    rowKey: key
  });
  var expanded = expandedKeys === null || expandedKeys === void 0 ? void 0 : expandedKeys.has(key);
  if (record && Array.isArray(record[childrenColumnName]) && expanded) {
    for (var i = 0; i < record[childrenColumnName].length; i += 1) {
      fillRecords(list, record[childrenColumnName][i], indent + 1, childrenColumnName, expandedKeys, getRowKey, i);
    }
  }
}
function useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey) {
  var arr = reactExports.useMemo(function() {
    if (expandedKeys !== null && expandedKeys !== void 0 && expandedKeys.size) {
      var list = [];
      for (var i = 0; i < (data === null || data === void 0 ? void 0 : data.length); i += 1) {
        var record = data[i];
        fillRecords(list, record, 0, childrenColumnName, expandedKeys, getRowKey, i);
      }
      return list;
    }
    return data === null || data === void 0 ? void 0 : data.map(function(item, index) {
      return {
        record: item,
        indent: 0,
        index,
        rowKey: getRowKey(item, index)
      };
    });
  }, [data, childrenColumnName, expandedKeys, getRowKey]);
  return arr;
}
function useRowInfo(record, rowKey, recordIndex, indent) {
  var context = useContext(TableContext, ["prefixCls", "fixedInfoList", "flattenColumns", "expandableType", "expandRowByClick", "onTriggerExpand", "rowClassName", "expandedRowClassName", "indentSize", "expandIcon", "expandedRowRender", "expandIconColumnIndex", "expandedKeys", "childrenColumnName", "rowExpandable", "onRow"]);
  var flattenColumns = context.flattenColumns, expandableType = context.expandableType, expandedKeys = context.expandedKeys, childrenColumnName = context.childrenColumnName, onTriggerExpand = context.onTriggerExpand, rowExpandable = context.rowExpandable, onRow = context.onRow, expandRowByClick = context.expandRowByClick, rowClassName = context.rowClassName;
  var nestExpandable = expandableType === "nest";
  var rowSupportExpand = expandableType === "row" && (!rowExpandable || rowExpandable(record));
  var mergedExpandable = rowSupportExpand || nestExpandable;
  var expanded = expandedKeys && expandedKeys.has(rowKey);
  var hasNestChildren = childrenColumnName && record && record[childrenColumnName];
  var onInternalTriggerExpand = useEvent(onTriggerExpand);
  var rowProps = onRow === null || onRow === void 0 ? void 0 : onRow(record, recordIndex);
  var onRowClick = rowProps === null || rowProps === void 0 ? void 0 : rowProps.onClick;
  var onClick = function onClick2(event) {
    if (expandRowByClick && mergedExpandable) {
      onTriggerExpand(record, event);
    }
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    onRowClick === null || onRowClick === void 0 || onRowClick.apply(void 0, [event].concat(args));
  };
  var computeRowClassName;
  if (typeof rowClassName === "string") {
    computeRowClassName = rowClassName;
  } else if (typeof rowClassName === "function") {
    computeRowClassName = rowClassName(record, recordIndex, indent);
  }
  var columnsKey = getColumnsKey(flattenColumns);
  return _objectSpread2(_objectSpread2({}, context), {}, {
    columnsKey,
    nestExpandable,
    expanded,
    hasNestChildren,
    record,
    onTriggerExpand: onInternalTriggerExpand,
    rowSupportExpand,
    expandable: mergedExpandable,
    rowProps: _objectSpread2(_objectSpread2({}, rowProps), {}, {
      className: classNames(computeRowClassName, rowProps === null || rowProps === void 0 ? void 0 : rowProps.className),
      onClick
    })
  });
}
function ExpandedRow(props) {
  var prefixCls = props.prefixCls, children = props.children, Component = props.component, cellComponent = props.cellComponent, className = props.className, expanded = props.expanded, colSpan = props.colSpan, isEmpty = props.isEmpty, _props$stickyOffset = props.stickyOffset, stickyOffset = _props$stickyOffset === void 0 ? 0 : _props$stickyOffset;
  var _useContext = useContext(TableContext, ["scrollbarSize", "fixHeader", "fixColumn", "componentWidth", "horizonScroll"]), scrollbarSize = _useContext.scrollbarSize, fixHeader = _useContext.fixHeader, fixColumn = _useContext.fixColumn, componentWidth = _useContext.componentWidth, horizonScroll = _useContext.horizonScroll;
  var contentNode = children;
  if (isEmpty ? horizonScroll && componentWidth : fixColumn) {
    contentNode = /* @__PURE__ */ reactExports.createElement("div", {
      style: {
        width: componentWidth - stickyOffset - (fixHeader && !isEmpty ? scrollbarSize : 0),
        position: "sticky",
        left: stickyOffset,
        overflow: "hidden"
      },
      className: "".concat(prefixCls, "-expanded-row-fixed")
    }, contentNode);
  }
  return /* @__PURE__ */ reactExports.createElement(Component, {
    className,
    style: {
      display: expanded ? null : "none"
    }
  }, /* @__PURE__ */ reactExports.createElement(Cell$1, {
    component: cellComponent,
    prefixCls,
    colSpan
  }, contentNode));
}
function renderExpandIcon$1(_ref) {
  var prefixCls = _ref.prefixCls, record = _ref.record, onExpand = _ref.onExpand, expanded = _ref.expanded, expandable = _ref.expandable;
  var expandClassName = "".concat(prefixCls, "-row-expand-icon");
  if (!expandable) {
    return /* @__PURE__ */ reactExports.createElement("span", {
      className: classNames(expandClassName, "".concat(prefixCls, "-row-spaced"))
    });
  }
  var onClick = function onClick2(event) {
    onExpand(record, event);
    event.stopPropagation();
  };
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(expandClassName, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-row-expanded"), expanded), "".concat(prefixCls, "-row-collapsed"), !expanded)),
    onClick
  });
}
function findAllChildrenKeys(data, getRowKey, childrenColumnName) {
  var keys = [];
  function dig(list) {
    (list || []).forEach(function(item, index) {
      keys.push(getRowKey(item, index));
      dig(item[childrenColumnName]);
    });
  }
  dig(data);
  return keys;
}
function computedExpandedClassName(cls, record, index, indent) {
  if (typeof cls === "string") {
    return cls;
  }
  if (typeof cls === "function") {
    return cls(record, index, indent);
  }
  return "";
}
function getCellProps(rowInfo, column, colIndex, indent, index) {
  var _column$onCell;
  var rowKeys = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
  var expandedRowOffset = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0;
  var record = rowInfo.record, prefixCls = rowInfo.prefixCls, columnsKey = rowInfo.columnsKey, fixedInfoList = rowInfo.fixedInfoList, expandIconColumnIndex = rowInfo.expandIconColumnIndex, nestExpandable = rowInfo.nestExpandable, indentSize = rowInfo.indentSize, expandIcon = rowInfo.expandIcon, expanded = rowInfo.expanded, hasNestChildren = rowInfo.hasNestChildren, onTriggerExpand = rowInfo.onTriggerExpand, expandable = rowInfo.expandable, expandedKeys = rowInfo.expandedKeys;
  var key = columnsKey[colIndex];
  var fixedInfo = fixedInfoList[colIndex];
  var appendCellNode;
  if (colIndex === (expandIconColumnIndex || 0) && nestExpandable) {
    appendCellNode = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("span", {
      style: {
        paddingLeft: "".concat(indentSize * indent, "px")
      },
      className: "".concat(prefixCls, "-row-indent indent-level-").concat(indent)
    }), expandIcon({
      prefixCls,
      expanded,
      expandable: hasNestChildren,
      record,
      onExpand: onTriggerExpand
    }));
  }
  var additionalCellProps = ((_column$onCell = column.onCell) === null || _column$onCell === void 0 ? void 0 : _column$onCell.call(column, record, index)) || {};
  if (expandedRowOffset) {
    var _additionalCellProps$ = additionalCellProps.rowSpan, rowSpan = _additionalCellProps$ === void 0 ? 1 : _additionalCellProps$;
    if (expandable && rowSpan && colIndex < expandedRowOffset) {
      var currentRowSpan = rowSpan;
      for (var i = index; i < index + rowSpan; i += 1) {
        var rowKey = rowKeys[i];
        if (expandedKeys.has(rowKey)) {
          currentRowSpan += 1;
        }
      }
      additionalCellProps.rowSpan = currentRowSpan;
    }
  }
  return {
    key,
    fixedInfo,
    appendCellNode,
    additionalCellProps
  };
}
function BodyRow(props) {
  var className = props.className, style = props.style, record = props.record, index = props.index, renderIndex = props.renderIndex, rowKey = props.rowKey, rowKeys = props.rowKeys, _props$indent = props.indent, indent = _props$indent === void 0 ? 0 : _props$indent, RowComponent = props.rowComponent, cellComponent = props.cellComponent, scopeCellComponent = props.scopeCellComponent, expandedRowInfo = props.expandedRowInfo;
  var rowInfo = useRowInfo(record, rowKey, index, indent);
  var prefixCls = rowInfo.prefixCls, flattenColumns = rowInfo.flattenColumns, expandedRowClassName = rowInfo.expandedRowClassName, expandedRowRender = rowInfo.expandedRowRender, rowProps = rowInfo.rowProps, expanded = rowInfo.expanded, rowSupportExpand = rowInfo.rowSupportExpand;
  var expandedRef = reactExports.useRef(false);
  expandedRef.current || (expandedRef.current = expanded);
  var expandedClsName = computedExpandedClassName(expandedRowClassName, record, index, indent);
  var baseRowNode = /* @__PURE__ */ reactExports.createElement(RowComponent, _extends({}, rowProps, {
    "data-row-key": rowKey,
    className: classNames(className, "".concat(prefixCls, "-row"), "".concat(prefixCls, "-row-level-").concat(indent), rowProps === null || rowProps === void 0 ? void 0 : rowProps.className, _defineProperty({}, expandedClsName, indent >= 1)),
    style: _objectSpread2(_objectSpread2({}, style), rowProps === null || rowProps === void 0 ? void 0 : rowProps.style)
  }), flattenColumns.map(function(column, colIndex) {
    var render = column.render, dataIndex = column.dataIndex, columnClassName = column.className;
    var _getCellProps = getCellProps(rowInfo, column, colIndex, indent, index, rowKeys, expandedRowInfo === null || expandedRowInfo === void 0 ? void 0 : expandedRowInfo.offset), key = _getCellProps.key, fixedInfo = _getCellProps.fixedInfo, appendCellNode = _getCellProps.appendCellNode, additionalCellProps = _getCellProps.additionalCellProps;
    return /* @__PURE__ */ reactExports.createElement(Cell$1, _extends({
      className: columnClassName,
      ellipsis: column.ellipsis,
      align: column.align,
      scope: column.rowScope,
      component: column.rowScope ? scopeCellComponent : cellComponent,
      prefixCls,
      key,
      record,
      index,
      renderIndex,
      dataIndex,
      render,
      shouldCellUpdate: column.shouldCellUpdate
    }, fixedInfo, {
      appendNode: appendCellNode,
      additionalProps: additionalCellProps
    }));
  }));
  var expandRowNode;
  if (rowSupportExpand && (expandedRef.current || expanded)) {
    var expandContent = expandedRowRender(record, index, indent + 1, expanded);
    expandRowNode = /* @__PURE__ */ reactExports.createElement(ExpandedRow, {
      expanded,
      className: classNames("".concat(prefixCls, "-expanded-row"), "".concat(prefixCls, "-expanded-row-level-").concat(indent + 1), expandedClsName),
      prefixCls,
      component: RowComponent,
      cellComponent,
      colSpan: expandedRowInfo ? expandedRowInfo.colSpan : flattenColumns.length,
      stickyOffset: expandedRowInfo === null || expandedRowInfo === void 0 ? void 0 : expandedRowInfo.sticky,
      isEmpty: false
    }, expandContent);
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, baseRowNode, expandRowNode);
}
const BodyRow$1 = responseImmutable(BodyRow);
function MeasureCell(_ref) {
  var columnKey = _ref.columnKey, onColumnResize = _ref.onColumnResize, prefixCls = _ref.prefixCls, title = _ref.title;
  var cellRef = reactExports.useRef();
  useLayoutEffect(function() {
    if (cellRef.current) {
      onColumnResize(columnKey, cellRef.current.offsetWidth);
    }
  }, []);
  return /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    data: columnKey
  }, /* @__PURE__ */ reactExports.createElement("th", {
    ref: cellRef,
    className: "".concat(prefixCls, "-measure-cell")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-measure-cell-content")
  }, title || " ")));
}
function MeasureRow(_ref) {
  var prefixCls = _ref.prefixCls, columnsKey = _ref.columnsKey, onColumnResize = _ref.onColumnResize, columns = _ref.columns;
  var ref = reactExports.useRef(null);
  var _useContext = useContext(TableContext, ["measureRowRender"]), measureRowRender = _useContext.measureRowRender;
  var measureRow = /* @__PURE__ */ reactExports.createElement("tr", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-measure-row"),
    ref,
    tabIndex: -1
  }, /* @__PURE__ */ reactExports.createElement(RefResizeObserver.Collection, {
    onBatchResize: function onBatchResize(infoList) {
      if (isVisible(ref.current)) {
        infoList.forEach(function(_ref2) {
          var columnKey = _ref2.data, size = _ref2.size;
          onColumnResize(columnKey, size.offsetWidth);
        });
      }
    }
  }, columnsKey.map(function(columnKey) {
    var column = columns.find(function(col) {
      return col.key === columnKey;
    });
    var rawTitle = column === null || column === void 0 ? void 0 : column.title;
    var titleForMeasure = /* @__PURE__ */ reactExports.isValidElement(rawTitle) ? /* @__PURE__ */ reactExports.cloneElement(rawTitle, {
      ref: null
    }) : rawTitle;
    return /* @__PURE__ */ reactExports.createElement(MeasureCell, {
      prefixCls,
      key: columnKey,
      columnKey,
      onColumnResize,
      title: titleForMeasure
    });
  })));
  return measureRowRender ? measureRowRender(measureRow) : measureRow;
}
function Body(props) {
  var data = props.data, measureColumnWidth = props.measureColumnWidth;
  var _useContext = useContext(TableContext, ["prefixCls", "getComponent", "onColumnResize", "flattenColumns", "getRowKey", "expandedKeys", "childrenColumnName", "emptyNode", "expandedRowOffset", "fixedInfoList", "colWidths"]), prefixCls = _useContext.prefixCls, getComponent = _useContext.getComponent, onColumnResize = _useContext.onColumnResize, flattenColumns = _useContext.flattenColumns, getRowKey = _useContext.getRowKey, expandedKeys = _useContext.expandedKeys, childrenColumnName = _useContext.childrenColumnName, emptyNode = _useContext.emptyNode, _useContext$expandedR = _useContext.expandedRowOffset, expandedRowOffset = _useContext$expandedR === void 0 ? 0 : _useContext$expandedR, colWidths = _useContext.colWidths;
  var flattenData2 = useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey);
  var rowKeys = reactExports.useMemo(function() {
    return flattenData2.map(function(item) {
      return item.rowKey;
    });
  }, [flattenData2]);
  var perfRef = reactExports.useRef({
    renderWithProps: false
  });
  var expandedRowInfo = reactExports.useMemo(function() {
    var expandedColSpan = flattenColumns.length - expandedRowOffset;
    var expandedStickyStart = 0;
    for (var i = 0; i < expandedRowOffset; i += 1) {
      expandedStickyStart += colWidths[i] || 0;
    }
    return {
      offset: expandedRowOffset,
      colSpan: expandedColSpan,
      sticky: expandedStickyStart
    };
  }, [flattenColumns.length, expandedRowOffset, colWidths]);
  var WrapperComponent = getComponent(["body", "wrapper"], "tbody");
  var trComponent = getComponent(["body", "row"], "tr");
  var tdComponent = getComponent(["body", "cell"], "td");
  var thComponent = getComponent(["body", "cell"], "th");
  var rows;
  if (data.length) {
    rows = flattenData2.map(function(item, idx) {
      var record = item.record, indent = item.indent, renderIndex = item.index, rowKey = item.rowKey;
      return /* @__PURE__ */ reactExports.createElement(BodyRow$1, {
        key: rowKey,
        rowKey,
        rowKeys,
        record,
        index: idx,
        renderIndex,
        rowComponent: trComponent,
        cellComponent: tdComponent,
        scopeCellComponent: thComponent,
        indent,
        expandedRowInfo
      });
    });
  } else {
    rows = /* @__PURE__ */ reactExports.createElement(ExpandedRow, {
      expanded: true,
      className: "".concat(prefixCls, "-placeholder"),
      prefixCls,
      component: trComponent,
      cellComponent: tdComponent,
      colSpan: flattenColumns.length,
      isEmpty: true
    }, emptyNode);
  }
  var columnsKey = getColumnsKey(flattenColumns);
  return /* @__PURE__ */ reactExports.createElement(PerfContext.Provider, {
    value: perfRef.current
  }, /* @__PURE__ */ reactExports.createElement(WrapperComponent, {
    className: "".concat(prefixCls, "-tbody")
  }, measureColumnWidth && /* @__PURE__ */ reactExports.createElement(MeasureRow, {
    prefixCls,
    columnsKey,
    onColumnResize,
    columns: flattenColumns
  }), rows));
}
const Body$1 = responseImmutable(Body);
var _excluded$7 = ["expandable"];
var INTERNAL_COL_DEFINE = "RC_TABLE_INTERNAL_COL_DEFINE";
function getExpandableProps(props) {
  var expandable = props.expandable, legacyExpandableConfig = _objectWithoutProperties(props, _excluded$7);
  var config;
  if ("expandable" in props) {
    config = _objectSpread2(_objectSpread2({}, legacyExpandableConfig), expandable);
  } else {
    config = legacyExpandableConfig;
  }
  if (config.showExpandColumn === false) {
    config.expandIconColumnIndex = -1;
  }
  return config;
}
var _excluded$6 = ["columnType"];
function ColGroup(_ref) {
  var colWidths = _ref.colWidths, columns = _ref.columns, columCount = _ref.columCount;
  var _useContext = useContext(TableContext, ["tableLayout"]), tableLayout = _useContext.tableLayout;
  var cols = [];
  var len = columCount || columns.length;
  var mustInsert = false;
  for (var i = len - 1; i >= 0; i -= 1) {
    var width = colWidths[i];
    var column = columns && columns[i];
    var additionalProps = void 0;
    var minWidth = void 0;
    if (column) {
      additionalProps = column[INTERNAL_COL_DEFINE];
      if (tableLayout === "auto") {
        minWidth = column.minWidth;
      }
    }
    if (width || minWidth || additionalProps || mustInsert) {
      var _ref2 = additionalProps || {};
      _ref2.columnType;
      var restAdditionalProps = _objectWithoutProperties(_ref2, _excluded$6);
      cols.unshift(/* @__PURE__ */ reactExports.createElement("col", _extends({
        key: i,
        style: {
          width,
          minWidth
        }
      }, restAdditionalProps)));
      mustInsert = true;
    }
  }
  return cols.length > 0 ? /* @__PURE__ */ reactExports.createElement("colgroup", null, cols) : null;
}
var _excluded$5 = ["className", "noData", "columns", "flattenColumns", "colWidths", "colGroup", "columCount", "stickyOffsets", "direction", "fixHeader", "stickyTopOffset", "stickyBottomOffset", "stickyClassName", "scrollX", "tableLayout", "onScroll", "children"];
function useColumnWidth(colWidths, columCount) {
  return reactExports.useMemo(function() {
    var cloneColumns = [];
    for (var i = 0; i < columCount; i += 1) {
      var val = colWidths[i];
      if (val !== void 0) {
        cloneColumns[i] = val;
      } else {
        return null;
      }
    }
    return cloneColumns;
  }, [colWidths.join("_"), columCount]);
}
var FixedHolder = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var className = props.className, noData = props.noData, columns = props.columns, flattenColumns = props.flattenColumns, colWidths = props.colWidths, colGroup = props.colGroup, columCount = props.columCount, stickyOffsets = props.stickyOffsets, direction = props.direction, fixHeader = props.fixHeader, stickyTopOffset = props.stickyTopOffset, stickyBottomOffset = props.stickyBottomOffset, stickyClassName = props.stickyClassName, scrollX = props.scrollX, _props$tableLayout = props.tableLayout, tableLayout = _props$tableLayout === void 0 ? "fixed" : _props$tableLayout, onScroll = props.onScroll, children = props.children, restProps = _objectWithoutProperties(props, _excluded$5);
  var _useContext = useContext(TableContext, ["prefixCls", "scrollbarSize", "isSticky", "getComponent"]), prefixCls = _useContext.prefixCls, scrollbarSize = _useContext.scrollbarSize, isSticky = _useContext.isSticky, getComponent = _useContext.getComponent;
  var TableComponent = getComponent(["header", "table"], "table");
  var combinationScrollBarSize = isSticky && !fixHeader ? 0 : scrollbarSize;
  var scrollRef = reactExports.useRef(null);
  var setScrollRef = reactExports.useCallback(function(element) {
    fillRef(ref, element);
    fillRef(scrollRef, element);
  }, []);
  reactExports.useEffect(function() {
    function onWheel(e) {
      var _ref = e, currentTarget = _ref.currentTarget, deltaX = _ref.deltaX;
      if (deltaX) {
        onScroll({
          currentTarget,
          scrollLeft: currentTarget.scrollLeft + deltaX
        });
        e.preventDefault();
      }
    }
    var scrollEle = scrollRef.current;
    scrollEle === null || scrollEle === void 0 || scrollEle.addEventListener("wheel", onWheel, {
      passive: false
    });
    return function() {
      scrollEle === null || scrollEle === void 0 || scrollEle.removeEventListener("wheel", onWheel);
    };
  }, []);
  var lastColumn = flattenColumns[flattenColumns.length - 1];
  var ScrollBarColumn = {
    fixed: lastColumn ? lastColumn.fixed : null,
    scrollbar: true,
    onHeaderCell: function onHeaderCell() {
      return {
        className: "".concat(prefixCls, "-cell-scrollbar")
      };
    }
  };
  var columnsWithScrollbar = reactExports.useMemo(function() {
    return combinationScrollBarSize ? [].concat(_toConsumableArray(columns), [ScrollBarColumn]) : columns;
  }, [combinationScrollBarSize, columns]);
  var flattenColumnsWithScrollbar = reactExports.useMemo(function() {
    return combinationScrollBarSize ? [].concat(_toConsumableArray(flattenColumns), [ScrollBarColumn]) : flattenColumns;
  }, [combinationScrollBarSize, flattenColumns]);
  var headerStickyOffsets = reactExports.useMemo(function() {
    var right = stickyOffsets.right, left = stickyOffsets.left;
    return _objectSpread2(_objectSpread2({}, stickyOffsets), {}, {
      left: direction === "rtl" ? [].concat(_toConsumableArray(left.map(function(width) {
        return width + combinationScrollBarSize;
      })), [0]) : left,
      right: direction === "rtl" ? right : [].concat(_toConsumableArray(right.map(function(width) {
        return width + combinationScrollBarSize;
      })), [0]),
      isSticky
    });
  }, [combinationScrollBarSize, stickyOffsets, isSticky]);
  var mergedColumnWidth = useColumnWidth(colWidths, columCount);
  var isColGroupEmpty = reactExports.useMemo(function() {
    var noWidth = !mergedColumnWidth || !mergedColumnWidth.length || mergedColumnWidth.every(function(w) {
      return !w;
    });
    return noData || noWidth;
  }, [noData, mergedColumnWidth]);
  return /* @__PURE__ */ reactExports.createElement("div", {
    style: _objectSpread2({
      overflow: "hidden"
    }, isSticky ? {
      top: stickyTopOffset,
      bottom: stickyBottomOffset
    } : {}),
    ref: setScrollRef,
    className: classNames(className, _defineProperty({}, stickyClassName, !!stickyClassName))
  }, /* @__PURE__ */ reactExports.createElement(TableComponent, {
    style: {
      tableLayout,
      minWidth: "100%",
      // https://github.com/ant-design/ant-design/issues/54894
      width: scrollX
    }
  }, isColGroupEmpty ? colGroup : /* @__PURE__ */ reactExports.createElement(ColGroup, {
    colWidths: [].concat(_toConsumableArray(mergedColumnWidth), [combinationScrollBarSize]),
    columCount: columCount + 1,
    columns: flattenColumnsWithScrollbar
  }), children(_objectSpread2(_objectSpread2({}, restProps), {}, {
    stickyOffsets: headerStickyOffsets,
    columns: columnsWithScrollbar,
    flattenColumns: flattenColumnsWithScrollbar
  }))));
});
const FixedHolder$1 = /* @__PURE__ */ reactExports.memo(FixedHolder);
var HeaderRow = function HeaderRow2(props) {
  var cells = props.cells, stickyOffsets = props.stickyOffsets, flattenColumns = props.flattenColumns, RowComponent = props.rowComponent, CellComponent = props.cellComponent, onHeaderRow = props.onHeaderRow, index = props.index;
  var _useContext = useContext(TableContext, ["prefixCls", "direction"]), prefixCls = _useContext.prefixCls, direction = _useContext.direction;
  var rowProps;
  if (onHeaderRow) {
    rowProps = onHeaderRow(cells.map(function(cell) {
      return cell.column;
    }), index);
  }
  var columnsKey = getColumnsKey(cells.map(function(cell) {
    return cell.column;
  }));
  return /* @__PURE__ */ reactExports.createElement(RowComponent, rowProps, cells.map(function(cell, cellIndex) {
    var column = cell.column;
    var fixedInfo = getCellFixedInfo(cell.colStart, cell.colEnd, flattenColumns, stickyOffsets, direction);
    var additionalProps;
    if (column && column.onHeaderCell) {
      additionalProps = cell.column.onHeaderCell(column);
    }
    return /* @__PURE__ */ reactExports.createElement(Cell$1, _extends({}, cell, {
      scope: column.title ? cell.colSpan > 1 ? "colgroup" : "col" : null,
      ellipsis: column.ellipsis,
      align: column.align,
      component: CellComponent,
      prefixCls,
      key: columnsKey[cellIndex]
    }, fixedInfo, {
      additionalProps,
      rowType: "header"
    }));
  }));
};
function parseHeaderRows(rootColumns) {
  var rows = [];
  function fillRowCells(columns, colIndex) {
    var rowIndex2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    rows[rowIndex2] = rows[rowIndex2] || [];
    var currentColIndex = colIndex;
    var colSpans = columns.filter(Boolean).map(function(column) {
      var cell = {
        key: column.key,
        className: column.className || "",
        children: column.title,
        column,
        colStart: currentColIndex
      };
      var colSpan = 1;
      var subColumns = column.children;
      if (subColumns && subColumns.length > 0) {
        colSpan = fillRowCells(subColumns, currentColIndex, rowIndex2 + 1).reduce(function(total, count) {
          return total + count;
        }, 0);
        cell.hasSubColumns = true;
      }
      if ("colSpan" in column) {
        colSpan = column.colSpan;
      }
      if ("rowSpan" in column) {
        cell.rowSpan = column.rowSpan;
      }
      cell.colSpan = colSpan;
      cell.colEnd = cell.colStart + colSpan - 1;
      rows[rowIndex2].push(cell);
      currentColIndex += colSpan;
      return colSpan;
    });
    return colSpans;
  }
  fillRowCells(rootColumns, 0);
  var rowCount = rows.length;
  var _loop = function _loop2(rowIndex2) {
    rows[rowIndex2].forEach(function(cell) {
      if (!("rowSpan" in cell) && !cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex2;
      }
    });
  };
  for (var rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    _loop(rowIndex);
  }
  return rows;
}
var Header = function Header2(props) {
  var stickyOffsets = props.stickyOffsets, columns = props.columns, flattenColumns = props.flattenColumns, onHeaderRow = props.onHeaderRow;
  var _useContext = useContext(TableContext, ["prefixCls", "getComponent"]), prefixCls = _useContext.prefixCls, getComponent = _useContext.getComponent;
  var rows = reactExports.useMemo(function() {
    return parseHeaderRows(columns);
  }, [columns]);
  var WrapperComponent = getComponent(["header", "wrapper"], "thead");
  var trComponent = getComponent(["header", "row"], "tr");
  var thComponent = getComponent(["header", "cell"], "th");
  return /* @__PURE__ */ reactExports.createElement(WrapperComponent, {
    className: "".concat(prefixCls, "-thead")
  }, rows.map(function(row, rowIndex) {
    var rowNode = /* @__PURE__ */ reactExports.createElement(HeaderRow, {
      key: rowIndex,
      flattenColumns,
      cells: row,
      stickyOffsets,
      rowComponent: trComponent,
      cellComponent: thComponent,
      onHeaderRow,
      index: rowIndex
    });
    return rowNode;
  }));
};
const Header$1 = responseImmutable(Header);
function parseColWidth(totalWidth) {
  var width = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if (typeof width === "number") {
    return width;
  }
  if (width.endsWith("%")) {
    return totalWidth * parseFloat(width) / 100;
  }
  return null;
}
function useWidthColumns(flattenColumns, scrollWidth, clientWidth) {
  return reactExports.useMemo(function() {
    if (scrollWidth && scrollWidth > 0) {
      var totalWidth = 0;
      var missWidthCount = 0;
      flattenColumns.forEach(function(col) {
        var colWidth = parseColWidth(scrollWidth, col.width);
        if (colWidth) {
          totalWidth += colWidth;
        } else {
          missWidthCount += 1;
        }
      });
      var maxFitWidth = Math.max(scrollWidth, clientWidth);
      var restWidth = Math.max(maxFitWidth - totalWidth, missWidthCount);
      var restCount = missWidthCount;
      var avgWidth = restWidth / missWidthCount;
      var realTotal = 0;
      var filledColumns = flattenColumns.map(function(col) {
        var clone = _objectSpread2({}, col);
        var colWidth = parseColWidth(scrollWidth, clone.width);
        if (colWidth) {
          clone.width = colWidth;
        } else {
          var colAvgWidth = Math.floor(avgWidth);
          clone.width = restCount === 1 ? restWidth : colAvgWidth;
          restWidth -= colAvgWidth;
          restCount -= 1;
        }
        realTotal += clone.width;
        return clone;
      });
      if (realTotal < maxFitWidth) {
        var scale = maxFitWidth / realTotal;
        restWidth = maxFitWidth;
        filledColumns.forEach(function(col, index) {
          var colWidth = Math.floor(col.width * scale);
          col.width = index === filledColumns.length - 1 ? restWidth : colWidth;
          restWidth -= colWidth;
        });
      }
      return [filledColumns, Math.max(realTotal, maxFitWidth)];
    }
    return [flattenColumns, scrollWidth];
  }, [flattenColumns, scrollWidth, clientWidth]);
}
var _excluded$4 = ["children"], _excluded2 = ["fixed"];
function convertChildrenToColumns(children) {
  return toArray$3(children).filter(function(node) {
    return /* @__PURE__ */ reactExports.isValidElement(node);
  }).map(function(_ref) {
    var key = _ref.key, props = _ref.props;
    var nodeChildren = props.children, restProps = _objectWithoutProperties(props, _excluded$4);
    var column = _objectSpread2({
      key
    }, restProps);
    if (nodeChildren) {
      column.children = convertChildrenToColumns(nodeChildren);
    }
    return column;
  });
}
function filterHiddenColumns(columns) {
  return columns.filter(function(column) {
    return column && _typeof(column) === "object" && !column.hidden;
  }).map(function(column) {
    var subColumns = column.children;
    if (subColumns && subColumns.length > 0) {
      return _objectSpread2(_objectSpread2({}, column), {}, {
        children: filterHiddenColumns(subColumns)
      });
    }
    return column;
  });
}
function flatColumns(columns) {
  var parentKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key";
  return columns.filter(function(column) {
    return column && _typeof(column) === "object";
  }).reduce(function(list, column, index) {
    var fixed = column.fixed;
    var parsedFixed = fixed === true ? "left" : fixed;
    var mergedKey = "".concat(parentKey, "-").concat(index);
    var subColumns = column.children;
    if (subColumns && subColumns.length > 0) {
      return [].concat(_toConsumableArray(list), _toConsumableArray(flatColumns(subColumns, mergedKey).map(function(subColum) {
        var _subColum$fixed;
        return _objectSpread2(_objectSpread2({}, subColum), {}, {
          fixed: (_subColum$fixed = subColum.fixed) !== null && _subColum$fixed !== void 0 ? _subColum$fixed : parsedFixed
        });
      })));
    }
    return [].concat(_toConsumableArray(list), [_objectSpread2(_objectSpread2({
      key: mergedKey
    }, column), {}, {
      fixed: parsedFixed
    })]);
  }, []);
}
function revertForRtl(columns) {
  return columns.map(function(column) {
    var fixed = column.fixed, restProps = _objectWithoutProperties(column, _excluded2);
    var parsedFixed = fixed;
    if (fixed === "left") {
      parsedFixed = "right";
    } else if (fixed === "right") {
      parsedFixed = "left";
    }
    return _objectSpread2({
      fixed: parsedFixed
    }, restProps);
  });
}
function useColumns(_ref2, transformColumns) {
  var prefixCls = _ref2.prefixCls, columns = _ref2.columns, children = _ref2.children, expandable = _ref2.expandable, expandedKeys = _ref2.expandedKeys, columnTitle = _ref2.columnTitle, getRowKey = _ref2.getRowKey, onTriggerExpand = _ref2.onTriggerExpand, expandIcon = _ref2.expandIcon, rowExpandable = _ref2.rowExpandable, expandIconColumnIndex = _ref2.expandIconColumnIndex, _ref2$expandedRowOffs = _ref2.expandedRowOffset, expandedRowOffset = _ref2$expandedRowOffs === void 0 ? 0 : _ref2$expandedRowOffs, direction = _ref2.direction, expandRowByClick = _ref2.expandRowByClick, columnWidth = _ref2.columnWidth, fixed = _ref2.fixed, scrollWidth = _ref2.scrollWidth, clientWidth = _ref2.clientWidth;
  var baseColumns = reactExports.useMemo(function() {
    var newColumns = columns || convertChildrenToColumns(children) || [];
    return filterHiddenColumns(newColumns.slice());
  }, [columns, children]);
  var withExpandColumns = reactExports.useMemo(function() {
    if (expandable) {
      var cloneColumns = baseColumns.slice();
      if (!cloneColumns.includes(EXPAND_COLUMN)) {
        var expandColIndex = expandIconColumnIndex || 0;
        var insertIndex = expandColIndex === 0 && fixed === "right" ? baseColumns.length : expandColIndex;
        if (insertIndex >= 0) {
          cloneColumns.splice(insertIndex, 0, EXPAND_COLUMN);
        }
      }
      var expandColumnIndex = cloneColumns.indexOf(EXPAND_COLUMN);
      cloneColumns = cloneColumns.filter(function(column, index) {
        return column !== EXPAND_COLUMN || index === expandColumnIndex;
      });
      var prevColumn = baseColumns[expandColumnIndex];
      var fixedColumn;
      if (fixed) {
        fixedColumn = fixed;
      } else {
        fixedColumn = prevColumn ? prevColumn.fixed : null;
      }
      var expandColumn = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, INTERNAL_COL_DEFINE, {
        className: "".concat(prefixCls, "-expand-icon-col"),
        columnType: "EXPAND_COLUMN"
      }), "title", columnTitle), "fixed", fixedColumn), "className", "".concat(prefixCls, "-row-expand-icon-cell")), "width", columnWidth), "render", function render(_, record, index) {
        var rowKey = getRowKey(record, index);
        var expanded = expandedKeys.has(rowKey);
        var recordExpandable = rowExpandable ? rowExpandable(record) : true;
        var icon = expandIcon({
          prefixCls,
          expanded,
          expandable: recordExpandable,
          record,
          onExpand: onTriggerExpand
        });
        if (expandRowByClick) {
          return /* @__PURE__ */ reactExports.createElement("span", {
            onClick: function onClick(e) {
              return e.stopPropagation();
            }
          }, icon);
        }
        return icon;
      });
      return cloneColumns.map(function(col, index) {
        var column = col === EXPAND_COLUMN ? expandColumn : col;
        if (index < expandedRowOffset) {
          return _objectSpread2(_objectSpread2({}, column), {}, {
            fixed: column.fixed || "left"
          });
        }
        return column;
      });
    }
    return baseColumns.filter(function(col) {
      return col !== EXPAND_COLUMN;
    });
  }, [expandable, baseColumns, getRowKey, expandedKeys, expandIcon, direction, expandedRowOffset]);
  var mergedColumns = reactExports.useMemo(function() {
    var finalColumns = withExpandColumns;
    if (transformColumns) {
      finalColumns = transformColumns(finalColumns);
    }
    if (!finalColumns.length) {
      finalColumns = [{
        render: function render() {
          return null;
        }
      }];
    }
    return finalColumns;
  }, [transformColumns, withExpandColumns, direction]);
  var flattenColumns = reactExports.useMemo(function() {
    if (direction === "rtl") {
      return revertForRtl(flatColumns(mergedColumns));
    }
    return flatColumns(mergedColumns);
  }, [mergedColumns, direction, scrollWidth]);
  var hasGapFixed = reactExports.useMemo(function() {
    var lastLeftIndex = -1;
    for (var i = flattenColumns.length - 1; i >= 0; i -= 1) {
      var colFixed = flattenColumns[i].fixed;
      if (colFixed === "left" || colFixed === true) {
        lastLeftIndex = i;
        break;
      }
    }
    if (lastLeftIndex >= 0) {
      for (var _i = 0; _i <= lastLeftIndex; _i += 1) {
        var _colFixed = flattenColumns[_i].fixed;
        if (_colFixed !== "left" && _colFixed !== true) {
          return true;
        }
      }
    }
    var firstRightIndex = flattenColumns.findIndex(function(_ref3) {
      var colFixed2 = _ref3.fixed;
      return colFixed2 === "right";
    });
    if (firstRightIndex >= 0) {
      for (var _i2 = firstRightIndex; _i2 < flattenColumns.length; _i2 += 1) {
        var _colFixed2 = flattenColumns[_i2].fixed;
        if (_colFixed2 !== "right") {
          return true;
        }
      }
    }
    return false;
  }, [flattenColumns]);
  var _useWidthColumns = useWidthColumns(flattenColumns, scrollWidth, clientWidth), _useWidthColumns2 = _slicedToArray(_useWidthColumns, 2), filledColumns = _useWidthColumns2[0], realScrollWidth = _useWidthColumns2[1];
  return [mergedColumns, filledColumns, realScrollWidth, hasGapFixed];
}
function useExpand(props, mergedData, getRowKey) {
  var expandableConfig = getExpandableProps(props);
  var expandIcon = expandableConfig.expandIcon, expandedRowKeys = expandableConfig.expandedRowKeys, defaultExpandedRowKeys = expandableConfig.defaultExpandedRowKeys, defaultExpandAllRows = expandableConfig.defaultExpandAllRows, expandedRowRender = expandableConfig.expandedRowRender, onExpand = expandableConfig.onExpand, onExpandedRowsChange = expandableConfig.onExpandedRowsChange, childrenColumnName = expandableConfig.childrenColumnName;
  var mergedExpandIcon = expandIcon || renderExpandIcon$1;
  var mergedChildrenColumnName = childrenColumnName || "children";
  var expandableType = reactExports.useMemo(function() {
    if (expandedRowRender) {
      return "row";
    }
    if (props.expandable && props.internalHooks === INTERNAL_HOOKS && props.expandable.__PARENT_RENDER_ICON__ || mergedData.some(function(record) {
      return record && _typeof(record) === "object" && record[mergedChildrenColumnName];
    })) {
      return "nest";
    }
    return false;
  }, [!!expandedRowRender, mergedData]);
  var _React$useState = reactExports.useState(function() {
    if (defaultExpandedRowKeys) {
      return defaultExpandedRowKeys;
    }
    if (defaultExpandAllRows) {
      return findAllChildrenKeys(mergedData, getRowKey, mergedChildrenColumnName);
    }
    return [];
  }), _React$useState2 = _slicedToArray(_React$useState, 2), innerExpandedKeys = _React$useState2[0], setInnerExpandedKeys = _React$useState2[1];
  var mergedExpandedKeys = reactExports.useMemo(function() {
    return new Set(expandedRowKeys || innerExpandedKeys || []);
  }, [expandedRowKeys, innerExpandedKeys]);
  var onTriggerExpand = reactExports.useCallback(function(record) {
    var key = getRowKey(record, mergedData.indexOf(record));
    var newExpandedKeys;
    var hasKey = mergedExpandedKeys.has(key);
    if (hasKey) {
      mergedExpandedKeys.delete(key);
      newExpandedKeys = _toConsumableArray(mergedExpandedKeys);
    } else {
      newExpandedKeys = [].concat(_toConsumableArray(mergedExpandedKeys), [key]);
    }
    setInnerExpandedKeys(newExpandedKeys);
    if (onExpand) {
      onExpand(!hasKey, record);
    }
    if (onExpandedRowsChange) {
      onExpandedRowsChange(newExpandedKeys);
    }
  }, [getRowKey, mergedExpandedKeys, mergedData, onExpand, onExpandedRowsChange]);
  return [expandableConfig, expandableType, mergedExpandedKeys, mergedExpandIcon, mergedChildrenColumnName, onTriggerExpand];
}
function useFixedInfo(flattenColumns, stickyOffsets, direction) {
  var fixedInfoList = flattenColumns.map(function(_, colIndex) {
    return getCellFixedInfo(colIndex, colIndex, flattenColumns, stickyOffsets, direction);
  });
  return useMemo(function() {
    return fixedInfoList;
  }, [fixedInfoList], function(prev, next) {
    return !isEqual(prev, next);
  });
}
function useLayoutState(defaultState) {
  var stateRef = reactExports.useRef(defaultState);
  var _useState = reactExports.useState({}), _useState2 = _slicedToArray(_useState, 2), forceUpdate = _useState2[1];
  var lastPromiseRef = reactExports.useRef(null);
  var updateBatchRef = reactExports.useRef([]);
  function setFrameState(updater) {
    updateBatchRef.current.push(updater);
    var promise = Promise.resolve();
    lastPromiseRef.current = promise;
    promise.then(function() {
      if (lastPromiseRef.current === promise) {
        var prevBatch = updateBatchRef.current;
        var prevState = stateRef.current;
        updateBatchRef.current = [];
        prevBatch.forEach(function(batchUpdater) {
          stateRef.current = batchUpdater(stateRef.current);
        });
        lastPromiseRef.current = null;
        if (prevState !== stateRef.current) {
          forceUpdate({});
        }
      }
    });
  }
  reactExports.useEffect(function() {
    return function() {
      lastPromiseRef.current = null;
    };
  }, []);
  return [stateRef.current, setFrameState];
}
function useTimeoutLock(defaultState) {
  var frameRef = reactExports.useRef(null);
  var timeoutRef = reactExports.useRef();
  function cleanUp() {
    window.clearTimeout(timeoutRef.current);
  }
  function setState(newState) {
    frameRef.current = newState;
    cleanUp();
    timeoutRef.current = window.setTimeout(function() {
      frameRef.current = null;
      timeoutRef.current = void 0;
    }, 100);
  }
  function getState() {
    return frameRef.current;
  }
  reactExports.useEffect(function() {
    return cleanUp;
  }, []);
  return [setState, getState];
}
function useHover() {
  var _React$useState = reactExports.useState(-1), _React$useState2 = _slicedToArray(_React$useState, 2), startRow = _React$useState2[0], setStartRow = _React$useState2[1];
  var _React$useState3 = reactExports.useState(-1), _React$useState4 = _slicedToArray(_React$useState3, 2), endRow = _React$useState4[0], setEndRow = _React$useState4[1];
  var onHover = reactExports.useCallback(function(start, end) {
    setStartRow(start);
    setEndRow(end);
  }, []);
  return [startRow, endRow, onHover];
}
var defaultContainer = canUseDom() ? window : null;
function useSticky(sticky, prefixCls) {
  var _ref = _typeof(sticky) === "object" ? sticky : {}, _ref$offsetHeader = _ref.offsetHeader, offsetHeader = _ref$offsetHeader === void 0 ? 0 : _ref$offsetHeader, _ref$offsetSummary = _ref.offsetSummary, offsetSummary = _ref$offsetSummary === void 0 ? 0 : _ref$offsetSummary, _ref$offsetScroll = _ref.offsetScroll, offsetScroll = _ref$offsetScroll === void 0 ? 0 : _ref$offsetScroll, _ref$getContainer = _ref.getContainer, getContainer = _ref$getContainer === void 0 ? function() {
    return defaultContainer;
  } : _ref$getContainer;
  var container = getContainer() || defaultContainer;
  var isSticky = !!sticky;
  return reactExports.useMemo(function() {
    return {
      isSticky,
      stickyClassName: isSticky ? "".concat(prefixCls, "-sticky-holder") : "",
      offsetHeader,
      offsetSummary,
      offsetScroll,
      container
    };
  }, [isSticky, offsetScroll, offsetHeader, offsetSummary, prefixCls, container]);
}
function useStickyOffsets(colWidths, flattenColumns, direction) {
  var stickyOffsets = reactExports.useMemo(function() {
    var columnCount = flattenColumns.length;
    var getOffsets = function getOffsets2(startIndex, endIndex, offset2) {
      var offsets = [];
      var total = 0;
      for (var i = startIndex; i !== endIndex; i += offset2) {
        offsets.push(total);
        if (flattenColumns[i].fixed) {
          total += colWidths[i] || 0;
        }
      }
      return offsets;
    };
    var startOffsets = getOffsets(0, columnCount, 1);
    var endOffsets = getOffsets(columnCount - 1, -1, -1).reverse();
    return direction === "rtl" ? {
      left: endOffsets,
      right: startOffsets
    } : {
      left: startOffsets,
      right: endOffsets
    };
  }, [colWidths, flattenColumns, direction]);
  return stickyOffsets;
}
function Panel(_ref) {
  var className = _ref.className, children = _ref.children;
  return /* @__PURE__ */ reactExports.createElement("div", {
    className
  }, children);
}
function getOffset(node) {
  var element = getDOM(node);
  var box = element.getBoundingClientRect();
  var docElem = document.documentElement;
  return {
    left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
    top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
  };
}
var StickyScrollBar = function StickyScrollBar2(_ref, ref) {
  var _scrollBodyRef$curren, _scrollBodyRef$curren2;
  var scrollBodyRef = _ref.scrollBodyRef, onScroll = _ref.onScroll, offsetScroll = _ref.offsetScroll, container = _ref.container, direction = _ref.direction;
  var prefixCls = useContext(TableContext, "prefixCls");
  var bodyScrollWidth = ((_scrollBodyRef$curren = scrollBodyRef.current) === null || _scrollBodyRef$curren === void 0 ? void 0 : _scrollBodyRef$curren.scrollWidth) || 0;
  var bodyWidth = ((_scrollBodyRef$curren2 = scrollBodyRef.current) === null || _scrollBodyRef$curren2 === void 0 ? void 0 : _scrollBodyRef$curren2.clientWidth) || 0;
  var scrollBarWidth = bodyScrollWidth && bodyWidth * (bodyWidth / bodyScrollWidth);
  var scrollBarRef = reactExports.useRef();
  var _useLayoutState = useLayoutState({
    scrollLeft: 0,
    isHiddenScrollBar: true
  }), _useLayoutState2 = _slicedToArray(_useLayoutState, 2), scrollState = _useLayoutState2[0], setScrollState = _useLayoutState2[1];
  var refState = reactExports.useRef({
    delta: 0,
    x: 0
  });
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), isActive = _React$useState2[0], setActive = _React$useState2[1];
  var rafRef = reactExports.useRef(null);
  reactExports.useEffect(function() {
    return function() {
      wrapperRaf.cancel(rafRef.current);
    };
  }, []);
  var onMouseUp = function onMouseUp2() {
    setActive(false);
  };
  var onMouseDown = function onMouseDown2(event) {
    event.persist();
    refState.current.delta = event.pageX - scrollState.scrollLeft;
    refState.current.x = 0;
    setActive(true);
    event.preventDefault();
  };
  var onMouseMove = function onMouseMove2(event) {
    var _window;
    var _ref2 = event || ((_window = window) === null || _window === void 0 ? void 0 : _window.event), buttons = _ref2.buttons;
    if (!isActive || buttons === 0) {
      if (isActive) {
        setActive(false);
      }
      return;
    }
    var left = refState.current.x + event.pageX - refState.current.x - refState.current.delta;
    var isRTL = direction === "rtl";
    left = Math.max(isRTL ? scrollBarWidth - bodyWidth : 0, Math.min(isRTL ? 0 : bodyWidth - scrollBarWidth, left));
    var shouldScroll = !isRTL || Math.abs(left) + Math.abs(scrollBarWidth) < bodyWidth;
    if (shouldScroll) {
      onScroll({
        scrollLeft: left / bodyWidth * (bodyScrollWidth + 2)
      });
      refState.current.x = event.pageX;
    }
  };
  var checkScrollBarVisible = function checkScrollBarVisible2() {
    wrapperRaf.cancel(rafRef.current);
    rafRef.current = wrapperRaf(function() {
      if (!scrollBodyRef.current) {
        return;
      }
      var tableOffsetTop = getOffset(scrollBodyRef.current).top;
      var tableBottomOffset = tableOffsetTop + scrollBodyRef.current.offsetHeight;
      var currentClientOffset = container === window ? document.documentElement.scrollTop + window.innerHeight : getOffset(container).top + container.clientHeight;
      setScrollState(function(state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          isHiddenScrollBar: tableBottomOffset - getScrollBarSize() <= currentClientOffset || tableOffsetTop >= currentClientOffset - offsetScroll
        });
      });
    });
  };
  var setScrollLeft = function setScrollLeft2(left) {
    setScrollState(function(state) {
      return _objectSpread2(_objectSpread2({}, state), {}, {
        scrollLeft: bodyScrollWidth ? left / bodyScrollWidth * bodyWidth : 0
      });
    });
  };
  reactExports.useImperativeHandle(ref, function() {
    return {
      setScrollLeft,
      checkScrollBarVisible
    };
  });
  reactExports.useEffect(function() {
    var onMouseUpListener = addEventListenerWrap(document.body, "mouseup", onMouseUp, false);
    var onMouseMoveListener = addEventListenerWrap(document.body, "mousemove", onMouseMove, false);
    checkScrollBarVisible();
    return function() {
      onMouseUpListener.remove();
      onMouseMoveListener.remove();
    };
  }, [scrollBarWidth, isActive]);
  reactExports.useEffect(function() {
    if (!scrollBodyRef.current) return;
    var scrollParents = [];
    var parent = getDOM(scrollBodyRef.current);
    while (parent) {
      scrollParents.push(parent);
      parent = parent.parentElement;
    }
    scrollParents.forEach(function(p) {
      return p.addEventListener("scroll", checkScrollBarVisible, false);
    });
    window.addEventListener("resize", checkScrollBarVisible, false);
    window.addEventListener("scroll", checkScrollBarVisible, false);
    container.addEventListener("scroll", checkScrollBarVisible, false);
    return function() {
      scrollParents.forEach(function(p) {
        return p.removeEventListener("scroll", checkScrollBarVisible);
      });
      window.removeEventListener("resize", checkScrollBarVisible);
      window.removeEventListener("scroll", checkScrollBarVisible);
      container.removeEventListener("scroll", checkScrollBarVisible);
    };
  }, [container]);
  reactExports.useEffect(function() {
    if (!scrollState.isHiddenScrollBar) {
      setScrollState(function(state) {
        var bodyNode = scrollBodyRef.current;
        if (!bodyNode) {
          return state;
        }
        return _objectSpread2(_objectSpread2({}, state), {}, {
          scrollLeft: bodyNode.scrollLeft / bodyNode.scrollWidth * bodyNode.clientWidth
        });
      });
    }
  }, [scrollState.isHiddenScrollBar]);
  if (bodyScrollWidth <= bodyWidth || !scrollBarWidth || scrollState.isHiddenScrollBar) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    style: {
      height: getScrollBarSize(),
      width: bodyWidth,
      bottom: offsetScroll
    },
    className: "".concat(prefixCls, "-sticky-scroll")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    onMouseDown,
    ref: scrollBarRef,
    className: classNames("".concat(prefixCls, "-sticky-scroll-bar"), _defineProperty({}, "".concat(prefixCls, "-sticky-scroll-bar-active"), isActive)),
    style: {
      width: "".concat(scrollBarWidth, "px"),
      transform: "translate3d(".concat(scrollState.scrollLeft, "px, 0, 0)")
    }
  }));
};
const StickyScrollBar$1 = /* @__PURE__ */ reactExports.forwardRef(StickyScrollBar);
var DEFAULT_PREFIX = "rc-table";
var EMPTY_DATA = [];
var EMPTY_SCROLL_TARGET = {};
function defaultEmpty() {
  return "No Data";
}
function Table$1(tableProps, ref) {
  var props = _objectSpread2({
    rowKey: "key",
    prefixCls: DEFAULT_PREFIX,
    emptyText: defaultEmpty
  }, tableProps);
  var prefixCls = props.prefixCls, className = props.className, rowClassName = props.rowClassName, style = props.style, data = props.data, rowKey = props.rowKey, scroll = props.scroll, tableLayout = props.tableLayout, direction = props.direction, title = props.title, footer = props.footer, summary = props.summary, caption = props.caption, id = props.id, showHeader = props.showHeader, components = props.components, emptyText = props.emptyText, onRow = props.onRow, onHeaderRow = props.onHeaderRow, measureRowRender = props.measureRowRender, onScroll = props.onScroll, internalHooks = props.internalHooks, transformColumns = props.transformColumns, internalRefs = props.internalRefs, tailor = props.tailor, getContainerWidth = props.getContainerWidth, sticky = props.sticky, _props$rowHoverable = props.rowHoverable, rowHoverable = _props$rowHoverable === void 0 ? true : _props$rowHoverable;
  var mergedData = data || EMPTY_DATA;
  var hasData = !!mergedData.length;
  var useInternalHooks = internalHooks === INTERNAL_HOOKS;
  var getComponent = reactExports.useCallback(function(path, defaultComponent) {
    return get(components, path) || defaultComponent;
  }, [components]);
  var getRowKey = reactExports.useMemo(function() {
    if (typeof rowKey === "function") {
      return rowKey;
    }
    return function(record) {
      var key = record && record[rowKey];
      return key;
    };
  }, [rowKey]);
  var customizeScrollBody = getComponent(["body"]);
  var _useHover = useHover(), _useHover2 = _slicedToArray(_useHover, 3), startRow = _useHover2[0], endRow = _useHover2[1], onHover = _useHover2[2];
  var _useExpand = useExpand(props, mergedData, getRowKey), _useExpand2 = _slicedToArray(_useExpand, 6), expandableConfig = _useExpand2[0], expandableType = _useExpand2[1], mergedExpandedKeys = _useExpand2[2], mergedExpandIcon = _useExpand2[3], mergedChildrenColumnName = _useExpand2[4], onTriggerExpand = _useExpand2[5];
  var scrollX = scroll === null || scroll === void 0 ? void 0 : scroll.x;
  var _React$useState = reactExports.useState(0), _React$useState2 = _slicedToArray(_React$useState, 2), componentWidth = _React$useState2[0], setComponentWidth = _React$useState2[1];
  var _useColumns = useColumns(_objectSpread2(_objectSpread2(_objectSpread2({}, props), expandableConfig), {}, {
    expandable: !!expandableConfig.expandedRowRender,
    columnTitle: expandableConfig.columnTitle,
    expandedKeys: mergedExpandedKeys,
    getRowKey,
    // https://github.com/ant-design/ant-design/issues/23894
    onTriggerExpand,
    expandIcon: mergedExpandIcon,
    expandIconColumnIndex: expandableConfig.expandIconColumnIndex,
    direction,
    scrollWidth: useInternalHooks && tailor && typeof scrollX === "number" ? scrollX : null,
    clientWidth: componentWidth
  }), useInternalHooks ? transformColumns : null), _useColumns2 = _slicedToArray(_useColumns, 4), columns = _useColumns2[0], flattenColumns = _useColumns2[1], flattenScrollX = _useColumns2[2], hasGapFixed = _useColumns2[3];
  var mergedScrollX = flattenScrollX !== null && flattenScrollX !== void 0 ? flattenScrollX : scrollX;
  var columnContext = reactExports.useMemo(function() {
    return {
      columns,
      flattenColumns
    };
  }, [columns, flattenColumns]);
  var fullTableRef = reactExports.useRef();
  var scrollHeaderRef = reactExports.useRef();
  var scrollBodyRef = reactExports.useRef();
  var scrollBodyContainerRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: fullTableRef.current,
      scrollTo: function scrollTo2(config) {
        var _scrollBodyRef$curren3;
        if (scrollBodyRef.current instanceof HTMLElement) {
          var index = config.index, top = config.top, key = config.key;
          if (validNumberValue(top)) {
            var _scrollBodyRef$curren;
            (_scrollBodyRef$curren = scrollBodyRef.current) === null || _scrollBodyRef$curren === void 0 || _scrollBodyRef$curren.scrollTo({
              top
            });
          } else {
            var _scrollBodyRef$curren2;
            var mergedKey = key !== null && key !== void 0 ? key : getRowKey(mergedData[index]);
            (_scrollBodyRef$curren2 = scrollBodyRef.current.querySelector('[data-row-key="'.concat(mergedKey, '"]'))) === null || _scrollBodyRef$curren2 === void 0 || _scrollBodyRef$curren2.scrollIntoView();
          }
        } else if ((_scrollBodyRef$curren3 = scrollBodyRef.current) !== null && _scrollBodyRef$curren3 !== void 0 && _scrollBodyRef$curren3.scrollTo) {
          scrollBodyRef.current.scrollTo(config);
        }
      }
    };
  });
  var scrollSummaryRef = reactExports.useRef();
  var _React$useState3 = reactExports.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), pingedLeft = _React$useState4[0], setPingedLeft = _React$useState4[1];
  var _React$useState5 = reactExports.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), pingedRight = _React$useState6[0], setPingedRight = _React$useState6[1];
  var _React$useState7 = reactExports.useState(/* @__PURE__ */ new Map()), _React$useState8 = _slicedToArray(_React$useState7, 2), colsWidths = _React$useState8[0], updateColsWidths = _React$useState8[1];
  var colsKeys = getColumnsKey(flattenColumns);
  var pureColWidths = colsKeys.map(function(columnKey) {
    return colsWidths.get(columnKey);
  });
  var colWidths = reactExports.useMemo(function() {
    return pureColWidths;
  }, [pureColWidths.join("_")]);
  var stickyOffsets = useStickyOffsets(colWidths, flattenColumns, direction);
  var fixHeader = scroll && validateValue(scroll.y);
  var horizonScroll = scroll && validateValue(mergedScrollX) || Boolean(expandableConfig.fixed);
  var fixColumn = horizonScroll && flattenColumns.some(function(_ref) {
    var fixed = _ref.fixed;
    return fixed;
  });
  var stickyRef = reactExports.useRef();
  var _useSticky = useSticky(sticky, prefixCls), isSticky = _useSticky.isSticky, offsetHeader = _useSticky.offsetHeader, offsetSummary = _useSticky.offsetSummary, offsetScroll = _useSticky.offsetScroll, stickyClassName = _useSticky.stickyClassName, container = _useSticky.container;
  var summaryNode = reactExports.useMemo(function() {
    return summary === null || summary === void 0 ? void 0 : summary(mergedData);
  }, [summary, mergedData]);
  var fixFooter = (fixHeader || isSticky) && /* @__PURE__ */ reactExports.isValidElement(summaryNode) && summaryNode.type === Summary && summaryNode.props.fixed;
  var scrollXStyle;
  var scrollYStyle;
  var scrollTableStyle;
  if (fixHeader) {
    scrollYStyle = {
      overflowY: hasData ? "scroll" : "auto",
      maxHeight: scroll.y
    };
  }
  if (horizonScroll) {
    scrollXStyle = {
      overflowX: "auto"
    };
    if (!fixHeader) {
      scrollYStyle = {
        overflowY: "hidden"
      };
    }
    scrollTableStyle = {
      width: mergedScrollX === true ? "auto" : mergedScrollX,
      minWidth: "100%"
    };
  }
  var onColumnResize = reactExports.useCallback(function(columnKey, width) {
    updateColsWidths(function(widths) {
      if (widths.get(columnKey) !== width) {
        var newWidths = new Map(widths);
        newWidths.set(columnKey, width);
        return newWidths;
      }
      return widths;
    });
  }, []);
  var _useTimeoutLock = useTimeoutLock(), _useTimeoutLock2 = _slicedToArray(_useTimeoutLock, 2), setScrollTarget = _useTimeoutLock2[0], getScrollTarget = _useTimeoutLock2[1];
  function forceScroll(scrollLeft, target) {
    if (!target) {
      return;
    }
    if (typeof target === "function") {
      target(scrollLeft);
    } else if (target.scrollLeft !== scrollLeft) {
      target.scrollLeft = scrollLeft;
      if (target.scrollLeft !== scrollLeft) {
        setTimeout(function() {
          target.scrollLeft = scrollLeft;
        }, 0);
      }
    }
  }
  var onInternalScroll = useEvent(function(_ref2) {
    var currentTarget = _ref2.currentTarget, scrollLeft = _ref2.scrollLeft;
    var isRTL = direction === "rtl";
    var mergedScrollLeft = typeof scrollLeft === "number" ? scrollLeft : currentTarget.scrollLeft;
    var compareTarget = currentTarget || EMPTY_SCROLL_TARGET;
    if (!getScrollTarget() || getScrollTarget() === compareTarget) {
      var _stickyRef$current;
      setScrollTarget(compareTarget);
      forceScroll(mergedScrollLeft, scrollHeaderRef.current);
      forceScroll(mergedScrollLeft, scrollBodyRef.current);
      forceScroll(mergedScrollLeft, scrollSummaryRef.current);
      forceScroll(mergedScrollLeft, (_stickyRef$current = stickyRef.current) === null || _stickyRef$current === void 0 ? void 0 : _stickyRef$current.setScrollLeft);
    }
    var measureTarget = currentTarget || scrollHeaderRef.current;
    if (measureTarget) {
      var scrollWidth = (
        // Should use mergedScrollX in virtual table(useInternalHooks && tailor === true)
        useInternalHooks && tailor && typeof mergedScrollX === "number" ? mergedScrollX : measureTarget.scrollWidth
      );
      var clientWidth = measureTarget.clientWidth;
      if (scrollWidth === clientWidth) {
        setPingedLeft(false);
        setPingedRight(false);
        return;
      }
      if (isRTL) {
        setPingedLeft(-mergedScrollLeft < scrollWidth - clientWidth);
        setPingedRight(-mergedScrollLeft > 0);
      } else {
        setPingedLeft(mergedScrollLeft > 0);
        setPingedRight(mergedScrollLeft < scrollWidth - clientWidth);
      }
    }
  });
  var onBodyScroll = useEvent(function(e) {
    onInternalScroll(e);
    onScroll === null || onScroll === void 0 || onScroll(e);
  });
  var triggerOnScroll = function triggerOnScroll2() {
    if (horizonScroll && scrollBodyRef.current) {
      var _scrollBodyRef$curren4;
      onInternalScroll({
        currentTarget: getDOM(scrollBodyRef.current),
        scrollLeft: (_scrollBodyRef$curren4 = scrollBodyRef.current) === null || _scrollBodyRef$curren4 === void 0 ? void 0 : _scrollBodyRef$curren4.scrollLeft
      });
    } else {
      setPingedLeft(false);
      setPingedRight(false);
    }
  };
  var onFullTableResize = function onFullTableResize2(_ref3) {
    var _stickyRef$current2;
    var width = _ref3.width;
    (_stickyRef$current2 = stickyRef.current) === null || _stickyRef$current2 === void 0 || _stickyRef$current2.checkScrollBarVisible();
    var mergedWidth = fullTableRef.current ? fullTableRef.current.offsetWidth : width;
    if (useInternalHooks && getContainerWidth && fullTableRef.current) {
      mergedWidth = getContainerWidth(fullTableRef.current, mergedWidth) || mergedWidth;
    }
    if (mergedWidth !== componentWidth) {
      triggerOnScroll();
      setComponentWidth(mergedWidth);
    }
  };
  var mounted = reactExports.useRef(false);
  reactExports.useEffect(function() {
    if (mounted.current) {
      triggerOnScroll();
    }
  }, [horizonScroll, data, columns.length]);
  reactExports.useEffect(function() {
    mounted.current = true;
  }, []);
  var _React$useState9 = reactExports.useState(0), _React$useState10 = _slicedToArray(_React$useState9, 2), scrollbarSize = _React$useState10[0], setScrollbarSize = _React$useState10[1];
  var _React$useState11 = reactExports.useState(true), _React$useState12 = _slicedToArray(_React$useState11, 2), supportSticky = _React$useState12[0], setSupportSticky = _React$useState12[1];
  useLayoutEffect(function() {
    if (!tailor || !useInternalHooks) {
      if (scrollBodyRef.current instanceof Element) {
        setScrollbarSize(getTargetScrollBarSize(scrollBodyRef.current).width);
      } else {
        setScrollbarSize(getTargetScrollBarSize(scrollBodyContainerRef.current).width);
      }
    }
    setSupportSticky(isStyleSupport("position", "sticky"));
  }, []);
  reactExports.useEffect(function() {
    if (useInternalHooks && internalRefs) {
      internalRefs.body.current = scrollBodyRef.current;
    }
  });
  var renderFixedHeaderTable = reactExports.useCallback(function(fixedHolderPassProps) {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Header$1, fixedHolderPassProps), fixFooter === "top" && /* @__PURE__ */ reactExports.createElement(Footer$1, fixedHolderPassProps, summaryNode));
  }, [fixFooter, summaryNode]);
  var renderFixedFooterTable = reactExports.useCallback(function(fixedHolderPassProps) {
    return /* @__PURE__ */ reactExports.createElement(Footer$1, fixedHolderPassProps, summaryNode);
  }, [summaryNode]);
  var TableComponent = getComponent(["table"], "table");
  var mergedTableLayout = reactExports.useMemo(function() {
    if (tableLayout) {
      return tableLayout;
    }
    if (fixColumn) {
      return mergedScrollX === "max-content" ? "auto" : "fixed";
    }
    if (fixHeader || isSticky || flattenColumns.some(function(_ref4) {
      var ellipsis = _ref4.ellipsis;
      return ellipsis;
    })) {
      return "fixed";
    }
    return "auto";
  }, [fixHeader, fixColumn, flattenColumns, tableLayout, isSticky]);
  var groupTableNode;
  var headerProps = {
    colWidths,
    columCount: flattenColumns.length,
    stickyOffsets,
    onHeaderRow,
    fixHeader,
    scroll
  };
  var emptyNode = reactExports.useMemo(function() {
    if (hasData) {
      return null;
    }
    if (typeof emptyText === "function") {
      return emptyText();
    }
    return emptyText;
  }, [hasData, emptyText]);
  var bodyTable = /* @__PURE__ */ reactExports.createElement(Body$1, {
    data: mergedData,
    measureColumnWidth: fixHeader || horizonScroll || isSticky
  });
  var bodyColGroup = /* @__PURE__ */ reactExports.createElement(ColGroup, {
    colWidths: flattenColumns.map(function(_ref5) {
      var width = _ref5.width;
      return width;
    }),
    columns: flattenColumns
  });
  var captionElement = caption !== null && caption !== void 0 ? /* @__PURE__ */ reactExports.createElement("caption", {
    className: "".concat(prefixCls, "-caption")
  }, caption) : void 0;
  var dataProps = pickAttrs(props, {
    data: true
  });
  var ariaProps = pickAttrs(props, {
    aria: true
  });
  if (fixHeader || isSticky) {
    var bodyContent;
    if (typeof customizeScrollBody === "function") {
      bodyContent = customizeScrollBody(mergedData, {
        scrollbarSize,
        ref: scrollBodyRef,
        onScroll: onInternalScroll
      });
      headerProps.colWidths = flattenColumns.map(function(_ref6, index) {
        var width = _ref6.width;
        var colWidth = index === flattenColumns.length - 1 ? width - scrollbarSize : width;
        if (typeof colWidth === "number" && !Number.isNaN(colWidth)) {
          return colWidth;
        }
        return 0;
      });
    } else {
      bodyContent = /* @__PURE__ */ reactExports.createElement("div", {
        style: _objectSpread2(_objectSpread2({}, scrollXStyle), scrollYStyle),
        onScroll: onBodyScroll,
        ref: scrollBodyRef,
        className: classNames("".concat(prefixCls, "-body"))
      }, /* @__PURE__ */ reactExports.createElement(TableComponent, _extends({
        style: _objectSpread2(_objectSpread2({}, scrollTableStyle), {}, {
          tableLayout: mergedTableLayout
        })
      }, ariaProps), captionElement, bodyColGroup, bodyTable, !fixFooter && summaryNode && /* @__PURE__ */ reactExports.createElement(Footer$1, {
        stickyOffsets,
        flattenColumns
      }, summaryNode)));
    }
    var fixedHolderProps = _objectSpread2(_objectSpread2(_objectSpread2({
      noData: !mergedData.length
    }, headerProps), columnContext), {}, {
      direction,
      stickyClassName,
      scrollX: mergedScrollX,
      tableLayout: mergedTableLayout,
      onScroll: onInternalScroll
    });
    groupTableNode = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, showHeader !== false && /* @__PURE__ */ reactExports.createElement(FixedHolder$1, _extends({}, fixedHolderProps, {
      stickyTopOffset: offsetHeader,
      className: "".concat(prefixCls, "-header"),
      ref: scrollHeaderRef,
      colGroup: bodyColGroup
    }), renderFixedHeaderTable), bodyContent, fixFooter && fixFooter !== "top" && /* @__PURE__ */ reactExports.createElement(FixedHolder$1, _extends({}, fixedHolderProps, {
      stickyBottomOffset: offsetSummary,
      className: "".concat(prefixCls, "-summary"),
      ref: scrollSummaryRef,
      colGroup: bodyColGroup
    }), renderFixedFooterTable), isSticky && scrollBodyRef.current && scrollBodyRef.current instanceof Element && /* @__PURE__ */ reactExports.createElement(StickyScrollBar$1, {
      ref: stickyRef,
      offsetScroll,
      scrollBodyRef,
      onScroll: onInternalScroll,
      container,
      direction
    }));
  } else {
    groupTableNode = /* @__PURE__ */ reactExports.createElement("div", {
      style: _objectSpread2(_objectSpread2({}, scrollXStyle), scrollYStyle),
      className: classNames("".concat(prefixCls, "-content")),
      onScroll: onInternalScroll,
      ref: scrollBodyRef
    }, /* @__PURE__ */ reactExports.createElement(TableComponent, _extends({
      style: _objectSpread2(_objectSpread2({}, scrollTableStyle), {}, {
        tableLayout: mergedTableLayout
      })
    }, ariaProps), captionElement, bodyColGroup, showHeader !== false && /* @__PURE__ */ reactExports.createElement(Header$1, _extends({}, headerProps, columnContext)), bodyTable, summaryNode && /* @__PURE__ */ reactExports.createElement(Footer$1, {
      stickyOffsets,
      flattenColumns
    }, summaryNode)));
  }
  var fullTable = /* @__PURE__ */ reactExports.createElement("div", _extends({
    className: classNames(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-rtl"), direction === "rtl"), "".concat(prefixCls, "-ping-left"), pingedLeft), "".concat(prefixCls, "-ping-right"), pingedRight), "".concat(prefixCls, "-layout-fixed"), tableLayout === "fixed"), "".concat(prefixCls, "-fixed-header"), fixHeader), "".concat(prefixCls, "-fixed-column"), fixColumn), "".concat(prefixCls, "-fixed-column-gapped"), fixColumn && hasGapFixed), "".concat(prefixCls, "-scroll-horizontal"), horizonScroll), "".concat(prefixCls, "-has-fix-left"), flattenColumns[0] && flattenColumns[0].fixed), "".concat(prefixCls, "-has-fix-right"), flattenColumns[flattenColumns.length - 1] && flattenColumns[flattenColumns.length - 1].fixed === "right")),
    style,
    id,
    ref: fullTableRef
  }, dataProps), title && /* @__PURE__ */ reactExports.createElement(Panel, {
    className: "".concat(prefixCls, "-title")
  }, title(mergedData)), /* @__PURE__ */ reactExports.createElement("div", {
    ref: scrollBodyContainerRef,
    className: "".concat(prefixCls, "-container")
  }, groupTableNode), footer && /* @__PURE__ */ reactExports.createElement(Panel, {
    className: "".concat(prefixCls, "-footer")
  }, footer(mergedData)));
  if (horizonScroll) {
    fullTable = /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
      onResize: onFullTableResize
    }, fullTable);
  }
  var fixedInfoList = useFixedInfo(flattenColumns, stickyOffsets, direction);
  var TableContextValue = reactExports.useMemo(function() {
    return {
      // Scroll
      scrollX: mergedScrollX,
      // Table
      prefixCls,
      getComponent,
      scrollbarSize,
      direction,
      fixedInfoList,
      isSticky,
      supportSticky,
      componentWidth,
      fixHeader,
      fixColumn,
      horizonScroll,
      // Body
      tableLayout: mergedTableLayout,
      rowClassName,
      expandedRowClassName: expandableConfig.expandedRowClassName,
      expandIcon: mergedExpandIcon,
      expandableType,
      expandRowByClick: expandableConfig.expandRowByClick,
      expandedRowRender: expandableConfig.expandedRowRender,
      expandedRowOffset: expandableConfig.expandedRowOffset,
      onTriggerExpand,
      expandIconColumnIndex: expandableConfig.expandIconColumnIndex,
      indentSize: expandableConfig.indentSize,
      allColumnsFixedLeft: flattenColumns.every(function(col) {
        return col.fixed === "left";
      }),
      emptyNode,
      // Column
      columns,
      flattenColumns,
      onColumnResize,
      colWidths,
      // Row
      hoverStartRow: startRow,
      hoverEndRow: endRow,
      onHover,
      rowExpandable: expandableConfig.rowExpandable,
      onRow,
      getRowKey,
      expandedKeys: mergedExpandedKeys,
      childrenColumnName: mergedChildrenColumnName,
      rowHoverable,
      // Measure Row
      measureRowRender
    };
  }, [
    // Scroll
    mergedScrollX,
    // Table
    prefixCls,
    getComponent,
    scrollbarSize,
    direction,
    fixedInfoList,
    isSticky,
    supportSticky,
    componentWidth,
    fixHeader,
    fixColumn,
    horizonScroll,
    // Body
    mergedTableLayout,
    rowClassName,
    expandableConfig.expandedRowClassName,
    mergedExpandIcon,
    expandableType,
    expandableConfig.expandRowByClick,
    expandableConfig.expandedRowRender,
    expandableConfig.expandedRowOffset,
    onTriggerExpand,
    expandableConfig.expandIconColumnIndex,
    expandableConfig.indentSize,
    emptyNode,
    // Column
    columns,
    flattenColumns,
    onColumnResize,
    colWidths,
    // Row
    startRow,
    endRow,
    onHover,
    expandableConfig.rowExpandable,
    onRow,
    getRowKey,
    mergedExpandedKeys,
    mergedChildrenColumnName,
    rowHoverable,
    measureRowRender
  ]);
  return /* @__PURE__ */ reactExports.createElement(TableContext.Provider, {
    value: TableContextValue
  }, fullTable);
}
var RefTable = /* @__PURE__ */ reactExports.forwardRef(Table$1);
function genTable(shouldTriggerRender) {
  return makeImmutable(RefTable, shouldTriggerRender);
}
var ImmutableTable = genTable();
ImmutableTable.EXPAND_COLUMN = EXPAND_COLUMN;
ImmutableTable.INTERNAL_HOOKS = INTERNAL_HOOKS;
ImmutableTable.Column = Column$1;
ImmutableTable.ColumnGroup = ColumnGroup$1;
ImmutableTable.Summary = FooterComponents;
var StaticContext = createContext(null);
var GridContext = createContext(null);
function getColumnWidth(colIndex, colSpan, columnsOffset) {
  var mergedColSpan = colSpan || 1;
  return columnsOffset[colIndex + mergedColSpan] - (columnsOffset[colIndex] || 0);
}
function VirtualCell(props) {
  var rowInfo = props.rowInfo, column = props.column, colIndex = props.colIndex, indent = props.indent, index = props.index, component = props.component, renderIndex = props.renderIndex, record = props.record, style = props.style, className = props.className, inverse = props.inverse, getHeight = props.getHeight;
  var render = column.render, dataIndex = column.dataIndex, columnClassName = column.className, colWidth = column.width;
  var _useContext = useContext(GridContext, ["columnsOffset"]), columnsOffset = _useContext.columnsOffset;
  var _getCellProps = getCellProps(rowInfo, column, colIndex, indent, index), key = _getCellProps.key, fixedInfo = _getCellProps.fixedInfo, appendCellNode = _getCellProps.appendCellNode, additionalCellProps = _getCellProps.additionalCellProps;
  var cellStyle = additionalCellProps.style, _additionalCellProps$ = additionalCellProps.colSpan, colSpan = _additionalCellProps$ === void 0 ? 1 : _additionalCellProps$, _additionalCellProps$2 = additionalCellProps.rowSpan, rowSpan = _additionalCellProps$2 === void 0 ? 1 : _additionalCellProps$2;
  var startColIndex = colIndex - 1;
  var concatColWidth = getColumnWidth(startColIndex, colSpan, columnsOffset);
  var marginOffset = colSpan > 1 ? colWidth - concatColWidth : 0;
  var mergedStyle = _objectSpread2(_objectSpread2(_objectSpread2({}, cellStyle), style), {}, {
    flex: "0 0 ".concat(concatColWidth, "px"),
    width: "".concat(concatColWidth, "px"),
    marginRight: marginOffset,
    pointerEvents: "auto"
  });
  var needHide = reactExports.useMemo(function() {
    if (inverse) {
      return rowSpan <= 1;
    } else {
      return colSpan === 0 || rowSpan === 0 || rowSpan > 1;
    }
  }, [rowSpan, colSpan, inverse]);
  if (needHide) {
    mergedStyle.visibility = "hidden";
  } else if (inverse) {
    mergedStyle.height = getHeight === null || getHeight === void 0 ? void 0 : getHeight(rowSpan);
  }
  var mergedRender = needHide ? function() {
    return null;
  } : render;
  var cellSpan = {};
  if (rowSpan === 0 || colSpan === 0) {
    cellSpan.rowSpan = 1;
    cellSpan.colSpan = 1;
  }
  return /* @__PURE__ */ reactExports.createElement(Cell$1, _extends({
    className: classNames(columnClassName, className),
    ellipsis: column.ellipsis,
    align: column.align,
    scope: column.rowScope,
    component,
    prefixCls: rowInfo.prefixCls,
    key,
    record,
    index,
    renderIndex,
    dataIndex,
    render: mergedRender,
    shouldCellUpdate: column.shouldCellUpdate
  }, fixedInfo, {
    appendNode: appendCellNode,
    additionalProps: _objectSpread2(_objectSpread2({}, additionalCellProps), {}, {
      style: mergedStyle
    }, cellSpan)
  }));
}
var _excluded$3 = ["data", "index", "className", "rowKey", "style", "extra", "getHeight"];
var BodyLine = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var data = props.data, index = props.index, className = props.className, rowKey = props.rowKey, style = props.style, extra = props.extra, getHeight = props.getHeight, restProps = _objectWithoutProperties(props, _excluded$3);
  var record = data.record, indent = data.indent, renderIndex = data.index;
  var _useContext = useContext(TableContext, ["prefixCls", "flattenColumns", "fixColumn", "componentWidth", "scrollX"]), scrollX = _useContext.scrollX, flattenColumns = _useContext.flattenColumns, prefixCls = _useContext.prefixCls, fixColumn = _useContext.fixColumn, componentWidth = _useContext.componentWidth;
  var _useContext2 = useContext(StaticContext, ["getComponent"]), getComponent = _useContext2.getComponent;
  var rowInfo = useRowInfo(record, rowKey, index, indent);
  var RowComponent = getComponent(["body", "row"], "div");
  var cellComponent = getComponent(["body", "cell"], "div");
  var rowSupportExpand = rowInfo.rowSupportExpand, expanded = rowInfo.expanded, rowProps = rowInfo.rowProps, expandedRowRender = rowInfo.expandedRowRender, expandedRowClassName = rowInfo.expandedRowClassName;
  var expandRowNode;
  if (rowSupportExpand && expanded) {
    var expandContent = expandedRowRender(record, index, indent + 1, expanded);
    var expandedClsName = computedExpandedClassName(expandedRowClassName, record, index, indent);
    var additionalProps = {};
    if (fixColumn) {
      additionalProps = {
        style: _defineProperty({}, "--virtual-width", "".concat(componentWidth, "px"))
      };
    }
    var rowCellCls = "".concat(prefixCls, "-expanded-row-cell");
    expandRowNode = /* @__PURE__ */ reactExports.createElement(RowComponent, {
      className: classNames("".concat(prefixCls, "-expanded-row"), "".concat(prefixCls, "-expanded-row-level-").concat(indent + 1), expandedClsName)
    }, /* @__PURE__ */ reactExports.createElement(Cell$1, {
      component: cellComponent,
      prefixCls,
      className: classNames(rowCellCls, _defineProperty({}, "".concat(rowCellCls, "-fixed"), fixColumn)),
      additionalProps
    }, expandContent));
  }
  var rowStyle = _objectSpread2(_objectSpread2({}, style), {}, {
    width: scrollX
  });
  if (extra) {
    rowStyle.position = "absolute";
    rowStyle.pointerEvents = "none";
  }
  var rowNode = /* @__PURE__ */ reactExports.createElement(RowComponent, _extends({}, rowProps, restProps, {
    "data-row-key": rowKey,
    ref: rowSupportExpand ? null : ref,
    className: classNames(className, "".concat(prefixCls, "-row"), rowProps === null || rowProps === void 0 ? void 0 : rowProps.className, _defineProperty({}, "".concat(prefixCls, "-row-extra"), extra)),
    style: _objectSpread2(_objectSpread2({}, rowStyle), rowProps === null || rowProps === void 0 ? void 0 : rowProps.style)
  }), flattenColumns.map(function(column, colIndex) {
    return /* @__PURE__ */ reactExports.createElement(VirtualCell, {
      key: colIndex,
      component: cellComponent,
      rowInfo,
      column,
      colIndex,
      indent,
      index,
      renderIndex,
      record,
      inverse: extra,
      getHeight
    });
  }));
  if (rowSupportExpand) {
    return /* @__PURE__ */ reactExports.createElement("div", {
      ref
    }, rowNode, expandRowNode);
  }
  return rowNode;
});
var ResponseBodyLine = responseImmutable(BodyLine);
var Grid = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var data = props.data, onScroll = props.onScroll;
  var _useContext = useContext(TableContext, ["flattenColumns", "onColumnResize", "getRowKey", "prefixCls", "expandedKeys", "childrenColumnName", "scrollX", "direction"]), flattenColumns = _useContext.flattenColumns, onColumnResize = _useContext.onColumnResize, getRowKey = _useContext.getRowKey, expandedKeys = _useContext.expandedKeys, prefixCls = _useContext.prefixCls, childrenColumnName = _useContext.childrenColumnName, scrollX = _useContext.scrollX, direction = _useContext.direction;
  var _useContext2 = useContext(StaticContext), sticky = _useContext2.sticky, scrollY = _useContext2.scrollY, listItemHeight = _useContext2.listItemHeight, getComponent = _useContext2.getComponent, onTablePropScroll = _useContext2.onScroll;
  var listRef = reactExports.useRef();
  var flattenData2 = useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey);
  var columnsWidth = reactExports.useMemo(function() {
    var total = 0;
    return flattenColumns.map(function(_ref) {
      var width = _ref.width, minWidth = _ref.minWidth, key = _ref.key;
      var finalWidth = Math.max(width || 0, minWidth || 0);
      total += finalWidth;
      return [key, finalWidth, total];
    });
  }, [flattenColumns]);
  var columnsOffset = reactExports.useMemo(function() {
    return columnsWidth.map(function(colWidth) {
      return colWidth[2];
    });
  }, [columnsWidth]);
  reactExports.useEffect(function() {
    columnsWidth.forEach(function(_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2), key = _ref3[0], width = _ref3[1];
      onColumnResize(key, width);
    });
  }, [columnsWidth]);
  reactExports.useImperativeHandle(ref, function() {
    var _listRef$current2;
    var obj = {
      scrollTo: function scrollTo2(config) {
        var _listRef$current;
        (_listRef$current = listRef.current) === null || _listRef$current === void 0 || _listRef$current.scrollTo(config);
      },
      nativeElement: (_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 ? void 0 : _listRef$current2.nativeElement
    };
    Object.defineProperty(obj, "scrollLeft", {
      get: function get2() {
        var _listRef$current3;
        return ((_listRef$current3 = listRef.current) === null || _listRef$current3 === void 0 ? void 0 : _listRef$current3.getScrollInfo().x) || 0;
      },
      set: function set(value) {
        var _listRef$current4;
        (_listRef$current4 = listRef.current) === null || _listRef$current4 === void 0 || _listRef$current4.scrollTo({
          left: value
        });
      }
    });
    Object.defineProperty(obj, "scrollTop", {
      get: function get2() {
        var _listRef$current5;
        return ((_listRef$current5 = listRef.current) === null || _listRef$current5 === void 0 ? void 0 : _listRef$current5.getScrollInfo().y) || 0;
      },
      set: function set(value) {
        var _listRef$current6;
        (_listRef$current6 = listRef.current) === null || _listRef$current6 === void 0 || _listRef$current6.scrollTo({
          top: value
        });
      }
    });
    return obj;
  });
  var getRowSpan = function getRowSpan2(column, index) {
    var _flattenData$index;
    var record = (_flattenData$index = flattenData2[index]) === null || _flattenData$index === void 0 ? void 0 : _flattenData$index.record;
    var onCell = column.onCell;
    if (onCell) {
      var _cellProps$rowSpan;
      var cellProps = onCell(record, index);
      return (_cellProps$rowSpan = cellProps === null || cellProps === void 0 ? void 0 : cellProps.rowSpan) !== null && _cellProps$rowSpan !== void 0 ? _cellProps$rowSpan : 1;
    }
    return 1;
  };
  var extraRender = function extraRender2(info) {
    var start = info.start, end = info.end, getSize = info.getSize, offsetY = info.offsetY;
    if (end < 0) {
      return null;
    }
    var firstRowSpanColumns = flattenColumns.filter(
      // rowSpan is 0
      function(column) {
        return getRowSpan(column, start) === 0;
      }
    );
    var startIndex = start;
    var _loop = function _loop4(i2) {
      firstRowSpanColumns = firstRowSpanColumns.filter(function(column) {
        return getRowSpan(column, i2) === 0;
      });
      if (!firstRowSpanColumns.length) {
        startIndex = i2;
        return 1;
      }
    };
    for (var i = start; i >= 0; i -= 1) {
      if (_loop(i)) break;
    }
    var lastRowSpanColumns = flattenColumns.filter(
      // rowSpan is not 1
      function(column) {
        return getRowSpan(column, end) !== 1;
      }
    );
    var endIndex = end;
    var _loop2 = function _loop22(_i3) {
      lastRowSpanColumns = lastRowSpanColumns.filter(function(column) {
        return getRowSpan(column, _i3) !== 1;
      });
      if (!lastRowSpanColumns.length) {
        endIndex = Math.max(_i3 - 1, end);
        return 1;
      }
    };
    for (var _i = end; _i < flattenData2.length; _i += 1) {
      if (_loop2(_i)) break;
    }
    var spanLines = [];
    var _loop3 = function _loop32(_i22) {
      var item = flattenData2[_i22];
      if (!item) {
        return 1;
      }
      if (flattenColumns.some(function(column) {
        return getRowSpan(column, _i22) > 1;
      })) {
        spanLines.push(_i22);
      }
    };
    for (var _i2 = startIndex; _i2 <= endIndex; _i2 += 1) {
      if (_loop3(_i2)) continue;
    }
    var nodes = spanLines.map(function(index) {
      var item = flattenData2[index];
      var rowKey = getRowKey(item.record, index);
      var getHeight = function getHeight2(rowSpan) {
        var endItemIndex = index + rowSpan - 1;
        var endItemKey = getRowKey(flattenData2[endItemIndex].record, endItemIndex);
        var sizeInfo2 = getSize(rowKey, endItemKey);
        return sizeInfo2.bottom - sizeInfo2.top;
      };
      var sizeInfo = getSize(rowKey);
      return /* @__PURE__ */ reactExports.createElement(ResponseBodyLine, {
        key: index,
        data: item,
        rowKey,
        index,
        style: {
          top: -offsetY + sizeInfo.top
        },
        extra: true,
        getHeight
      });
    });
    return nodes;
  };
  var gridContext = reactExports.useMemo(function() {
    return {
      columnsOffset
    };
  }, [columnsOffset]);
  var tblPrefixCls = "".concat(prefixCls, "-tbody");
  var wrapperComponent = getComponent(["body", "wrapper"]);
  var horizontalScrollBarStyle = {};
  if (sticky) {
    horizontalScrollBarStyle.position = "sticky";
    horizontalScrollBarStyle.bottom = 0;
    if (_typeof(sticky) === "object" && sticky.offsetScroll) {
      horizontalScrollBarStyle.bottom = sticky.offsetScroll;
    }
  }
  return /* @__PURE__ */ reactExports.createElement(GridContext.Provider, {
    value: gridContext
  }, /* @__PURE__ */ reactExports.createElement(List, {
    fullHeight: false,
    ref: listRef,
    prefixCls: "".concat(tblPrefixCls, "-virtual"),
    styles: {
      horizontalScrollBar: horizontalScrollBarStyle
    },
    className: tblPrefixCls,
    height: scrollY,
    itemHeight: listItemHeight || 24,
    data: flattenData2,
    itemKey: function itemKey2(item) {
      return getRowKey(item.record);
    },
    component: wrapperComponent,
    scrollWidth: scrollX,
    direction,
    onVirtualScroll: function onVirtualScroll(_ref4) {
      var _listRef$current7;
      var x = _ref4.x;
      onScroll({
        currentTarget: (_listRef$current7 = listRef.current) === null || _listRef$current7 === void 0 ? void 0 : _listRef$current7.nativeElement,
        scrollLeft: x
      });
    },
    onScroll: onTablePropScroll,
    extraRender
  }, function(item, index, itemProps) {
    var rowKey = getRowKey(item.record, index);
    return /* @__PURE__ */ reactExports.createElement(ResponseBodyLine, {
      data: item,
      rowKey,
      index,
      style: itemProps.style
    });
  }));
});
var ResponseGrid = responseImmutable(Grid);
var renderBody = function renderBody2(rawData, props) {
  var ref = props.ref, onScroll = props.onScroll;
  return /* @__PURE__ */ reactExports.createElement(ResponseGrid, {
    ref,
    data: rawData,
    onScroll
  });
};
function VirtualTable(props, ref) {
  var data = props.data, columns = props.columns, scroll = props.scroll, sticky = props.sticky, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? DEFAULT_PREFIX : _props$prefixCls, className = props.className, listItemHeight = props.listItemHeight, components = props.components, onScroll = props.onScroll;
  var _ref = scroll || {}, scrollX = _ref.x, scrollY = _ref.y;
  if (typeof scrollX !== "number") {
    scrollX = 1;
  }
  if (typeof scrollY !== "number") {
    scrollY = 500;
  }
  var getComponent = useEvent(function(path, defaultComponent) {
    return get(components, path) || defaultComponent;
  });
  var onInternalScroll = useEvent(onScroll);
  var context = reactExports.useMemo(function() {
    return {
      sticky,
      scrollY,
      listItemHeight,
      getComponent,
      onScroll: onInternalScroll
    };
  }, [sticky, scrollY, listItemHeight, getComponent, onInternalScroll]);
  return /* @__PURE__ */ reactExports.createElement(StaticContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement(ImmutableTable, _extends({}, props, {
    className: classNames(className, "".concat(prefixCls, "-virtual")),
    scroll: _objectSpread2(_objectSpread2({}, scroll), {}, {
      x: scrollX
    }),
    components: _objectSpread2(_objectSpread2({}, components), {}, {
      // fix https://github.com/ant-design/ant-design/issues/48991
      body: data !== null && data !== void 0 && data.length ? renderBody : void 0
    }),
    columns,
    internalHooks: INTERNAL_HOOKS,
    tailor: true,
    ref
  })));
}
var RefVirtualTable = /* @__PURE__ */ reactExports.forwardRef(VirtualTable);
function genVirtualTable(shouldTriggerRender) {
  return makeImmutable(RefVirtualTable, shouldTriggerRender);
}
genVirtualTable();
const Column = (_) => null;
const ColumnGroup = (_) => null;
var TreeContext = /* @__PURE__ */ reactExports.createContext(null);
var UnstableContext = /* @__PURE__ */ reactExports.createContext({});
var Indent = function Indent2(_ref) {
  var prefixCls = _ref.prefixCls, level = _ref.level, isStart = _ref.isStart, isEnd = _ref.isEnd;
  var baseClassName = "".concat(prefixCls, "-indent-unit");
  var list = [];
  for (var i = 0; i < level; i += 1) {
    list.push(/* @__PURE__ */ reactExports.createElement("span", {
      key: i,
      className: classNames(baseClassName, _defineProperty(_defineProperty({}, "".concat(baseClassName, "-start"), isStart[i]), "".concat(baseClassName, "-end"), isEnd[i]))
    }));
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-indent")
  }, list);
};
const Indent$1 = /* @__PURE__ */ reactExports.memo(Indent);
var _excluded$2 = ["eventKey", "className", "style", "dragOver", "dragOverGapTop", "dragOverGapBottom", "isLeaf", "isStart", "isEnd", "expanded", "selected", "checked", "halfChecked", "loading", "domRef", "active", "data", "onMouseMove", "selectable"];
var ICON_OPEN = "open";
var ICON_CLOSE = "close";
var defaultTitle = "---";
var TreeNode = function TreeNode2(props) {
  var _unstableContext$node, _context$filterTreeNo, _classNames4;
  var eventKey = props.eventKey, className = props.className, style = props.style, dragOver = props.dragOver, dragOverGapTop = props.dragOverGapTop, dragOverGapBottom = props.dragOverGapBottom, isLeaf = props.isLeaf, isStart = props.isStart, isEnd = props.isEnd, expanded = props.expanded, selected = props.selected, checked = props.checked, halfChecked = props.halfChecked, loading = props.loading, domRef = props.domRef, active = props.active, data = props.data, onMouseMove = props.onMouseMove, selectable = props.selectable, otherProps = _objectWithoutProperties(props, _excluded$2);
  var context = React.useContext(TreeContext);
  var unstableContext = React.useContext(UnstableContext);
  var selectHandleRef = React.useRef(null);
  var _React$useState = React.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), dragNodeHighlight = _React$useState2[0], setDragNodeHighlight = _React$useState2[1];
  var isDisabled = !!(context.disabled || props.disabled || (_unstableContext$node = unstableContext.nodeDisabled) !== null && _unstableContext$node !== void 0 && _unstableContext$node.call(unstableContext, data));
  var isCheckable = React.useMemo(function() {
    if (!context.checkable || props.checkable === false) {
      return false;
    }
    return context.checkable;
  }, [context.checkable, props.checkable]);
  var onSelect = function onSelect2(e) {
    if (isDisabled) {
      return;
    }
    context.onNodeSelect(e, convertNodePropsToEventData(props));
  };
  var onCheck = function onCheck2(e) {
    if (isDisabled) {
      return;
    }
    if (!isCheckable || props.disableCheckbox) {
      return;
    }
    context.onNodeCheck(e, convertNodePropsToEventData(props), !checked);
  };
  var isSelectable = React.useMemo(function() {
    if (typeof selectable === "boolean") {
      return selectable;
    }
    return context.selectable;
  }, [selectable, context.selectable]);
  var onSelectorClick = function onSelectorClick2(e) {
    context.onNodeClick(e, convertNodePropsToEventData(props));
    if (isSelectable) {
      onSelect(e);
    } else {
      onCheck(e);
    }
  };
  var onSelectorDoubleClick = function onSelectorDoubleClick2(e) {
    context.onNodeDoubleClick(e, convertNodePropsToEventData(props));
  };
  var onMouseEnter = function onMouseEnter2(e) {
    context.onNodeMouseEnter(e, convertNodePropsToEventData(props));
  };
  var onMouseLeave = function onMouseLeave2(e) {
    context.onNodeMouseLeave(e, convertNodePropsToEventData(props));
  };
  var onContextMenu = function onContextMenu2(e) {
    context.onNodeContextMenu(e, convertNodePropsToEventData(props));
  };
  var isDraggable = React.useMemo(function() {
    return !!(context.draggable && (!context.draggable.nodeDraggable || context.draggable.nodeDraggable(data)));
  }, [context.draggable, data]);
  var onDragStart = function onDragStart2(e) {
    e.stopPropagation();
    setDragNodeHighlight(true);
    context.onNodeDragStart(e, props);
    try {
      e.dataTransfer.setData("text/plain", "");
    } catch (_unused) {
    }
  };
  var onDragEnter = function onDragEnter2(e) {
    e.preventDefault();
    e.stopPropagation();
    context.onNodeDragEnter(e, props);
  };
  var onDragOver = function onDragOver2(e) {
    e.preventDefault();
    e.stopPropagation();
    context.onNodeDragOver(e, props);
  };
  var onDragLeave = function onDragLeave2(e) {
    e.stopPropagation();
    context.onNodeDragLeave(e, props);
  };
  var onDragEnd = function onDragEnd2(e) {
    e.stopPropagation();
    setDragNodeHighlight(false);
    context.onNodeDragEnd(e, props);
  };
  var onDrop = function onDrop2(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragNodeHighlight(false);
    context.onNodeDrop(e, props);
  };
  var onExpand = function onExpand2(e) {
    if (loading) {
      return;
    }
    context.onNodeExpand(e, convertNodePropsToEventData(props));
  };
  var hasChildren = React.useMemo(function() {
    var _ref = getEntity(context.keyEntities, eventKey) || {}, children = _ref.children;
    return Boolean((children || []).length);
  }, [context.keyEntities, eventKey]);
  var memoizedIsLeaf = React.useMemo(function() {
    if (isLeaf === false) {
      return false;
    }
    return isLeaf || !context.loadData && !hasChildren || context.loadData && props.loaded && !hasChildren;
  }, [isLeaf, context.loadData, hasChildren, props.loaded]);
  React.useEffect(function() {
    if (loading) {
      return;
    }
    if (typeof context.loadData === "function" && expanded && !memoizedIsLeaf && !props.loaded) {
      context.onNodeLoad(convertNodePropsToEventData(props));
    }
  }, [loading, context.loadData, context.onNodeLoad, expanded, memoizedIsLeaf, props]);
  var dragHandlerNode = React.useMemo(function() {
    var _context$draggable;
    if (!((_context$draggable = context.draggable) !== null && _context$draggable !== void 0 && _context$draggable.icon)) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("span", {
      className: "".concat(context.prefixCls, "-draggable-icon")
    }, context.draggable.icon);
  }, [context.draggable]);
  var renderSwitcherIconDom = function renderSwitcherIconDom2(isInternalLeaf) {
    var switcherIcon = props.switcherIcon || context.switcherIcon;
    if (typeof switcherIcon === "function") {
      return switcherIcon(_objectSpread2(_objectSpread2({}, props), {}, {
        isLeaf: isInternalLeaf
      }));
    }
    return switcherIcon;
  };
  var renderSwitcher = function renderSwitcher2() {
    if (memoizedIsLeaf) {
      var _switcherIconDom = renderSwitcherIconDom(true);
      return _switcherIconDom !== false ? /* @__PURE__ */ React.createElement("span", {
        className: classNames("".concat(context.prefixCls, "-switcher"), "".concat(context.prefixCls, "-switcher-noop"))
      }, _switcherIconDom) : null;
    }
    var switcherIconDom = renderSwitcherIconDom(false);
    return switcherIconDom !== false ? /* @__PURE__ */ React.createElement("span", {
      onClick: onExpand,
      className: classNames("".concat(context.prefixCls, "-switcher"), "".concat(context.prefixCls, "-switcher_").concat(expanded ? ICON_OPEN : ICON_CLOSE))
    }, switcherIconDom) : null;
  };
  var checkboxNode = React.useMemo(function() {
    if (!isCheckable) {
      return null;
    }
    var $custom = typeof isCheckable !== "boolean" ? isCheckable : null;
    return /* @__PURE__ */ React.createElement("span", {
      className: classNames("".concat(context.prefixCls, "-checkbox"), _defineProperty(_defineProperty(_defineProperty({}, "".concat(context.prefixCls, "-checkbox-checked"), checked), "".concat(context.prefixCls, "-checkbox-indeterminate"), !checked && halfChecked), "".concat(context.prefixCls, "-checkbox-disabled"), isDisabled || props.disableCheckbox)),
      onClick: onCheck,
      role: "checkbox",
      "aria-checked": halfChecked ? "mixed" : checked,
      "aria-disabled": isDisabled || props.disableCheckbox,
      "aria-label": "Select ".concat(typeof props.title === "string" ? props.title : "tree node")
    }, $custom);
  }, [isCheckable, checked, halfChecked, isDisabled, props.disableCheckbox, props.title]);
  var nodeState = React.useMemo(function() {
    if (memoizedIsLeaf) {
      return null;
    }
    return expanded ? ICON_OPEN : ICON_CLOSE;
  }, [memoizedIsLeaf, expanded]);
  var iconNode = React.useMemo(function() {
    return /* @__PURE__ */ React.createElement("span", {
      className: classNames("".concat(context.prefixCls, "-iconEle"), "".concat(context.prefixCls, "-icon__").concat(nodeState || "docu"), _defineProperty({}, "".concat(context.prefixCls, "-icon_loading"), loading))
    });
  }, [context.prefixCls, nodeState, loading]);
  var dropIndicatorNode = React.useMemo(function() {
    var rootDraggable = Boolean(context.draggable);
    var showIndicator = !props.disabled && rootDraggable && context.dragOverNodeKey === eventKey;
    if (!showIndicator) {
      return null;
    }
    return context.dropIndicatorRender({
      dropPosition: context.dropPosition,
      dropLevelOffset: context.dropLevelOffset,
      indent: context.indent,
      prefixCls: context.prefixCls,
      direction: context.direction
    });
  }, [context.dropPosition, context.dropLevelOffset, context.indent, context.prefixCls, context.direction, context.draggable, context.dragOverNodeKey, context.dropIndicatorRender]);
  var selectorNode = React.useMemo(function() {
    var _props$title = props.title, title = _props$title === void 0 ? defaultTitle : _props$title;
    var wrapClass = "".concat(context.prefixCls, "-node-content-wrapper");
    var $icon;
    if (context.showIcon) {
      var currentIcon = props.icon || context.icon;
      $icon = currentIcon ? /* @__PURE__ */ React.createElement("span", {
        className: classNames("".concat(context.prefixCls, "-iconEle"), "".concat(context.prefixCls, "-icon__customize"))
      }, typeof currentIcon === "function" ? currentIcon(props) : currentIcon) : iconNode;
    } else if (context.loadData && loading) {
      $icon = iconNode;
    }
    var titleNode;
    if (typeof title === "function") {
      titleNode = title(data);
    } else if (context.titleRender) {
      titleNode = context.titleRender(data);
    } else {
      titleNode = title;
    }
    return /* @__PURE__ */ React.createElement("span", {
      ref: selectHandleRef,
      title: typeof title === "string" ? title : "",
      className: classNames(wrapClass, "".concat(wrapClass, "-").concat(nodeState || "normal"), _defineProperty({}, "".concat(context.prefixCls, "-node-selected"), !isDisabled && (selected || dragNodeHighlight))),
      onMouseEnter,
      onMouseLeave,
      onContextMenu,
      onClick: onSelectorClick,
      onDoubleClick: onSelectorDoubleClick
    }, $icon, /* @__PURE__ */ React.createElement("span", {
      className: "".concat(context.prefixCls, "-title")
    }, titleNode), dropIndicatorNode);
  }, [context.prefixCls, context.showIcon, props, context.icon, iconNode, context.titleRender, data, nodeState, onMouseEnter, onMouseLeave, onContextMenu, onSelectorClick, onSelectorDoubleClick]);
  var dataOrAriaAttributeProps = pickAttrs(otherProps, {
    aria: true,
    data: true
  });
  var _ref2 = getEntity(context.keyEntities, eventKey) || {}, level = _ref2.level;
  var isEndNode = isEnd[isEnd.length - 1];
  var draggableWithoutDisabled = !isDisabled && isDraggable;
  var dragging = context.draggingNodeKey === eventKey;
  var ariaSelected = selectable !== void 0 ? {
    "aria-selected": !!selectable
  } : void 0;
  return /* @__PURE__ */ React.createElement("div", _extends({
    ref: domRef,
    role: "treeitem",
    "aria-expanded": isLeaf ? void 0 : expanded,
    className: classNames(className, "".concat(context.prefixCls, "-treenode"), (_classNames4 = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames4, "".concat(context.prefixCls, "-treenode-disabled"), isDisabled), "".concat(context.prefixCls, "-treenode-switcher-").concat(expanded ? "open" : "close"), !isLeaf), "".concat(context.prefixCls, "-treenode-checkbox-checked"), checked), "".concat(context.prefixCls, "-treenode-checkbox-indeterminate"), halfChecked), "".concat(context.prefixCls, "-treenode-selected"), selected), "".concat(context.prefixCls, "-treenode-loading"), loading), "".concat(context.prefixCls, "-treenode-active"), active), "".concat(context.prefixCls, "-treenode-leaf-last"), isEndNode), "".concat(context.prefixCls, "-treenode-draggable"), isDraggable), "dragging", dragging), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames4, "drop-target", context.dropTargetKey === eventKey), "drop-container", context.dropContainerKey === eventKey), "drag-over", !isDisabled && dragOver), "drag-over-gap-top", !isDisabled && dragOverGapTop), "drag-over-gap-bottom", !isDisabled && dragOverGapBottom), "filter-node", (_context$filterTreeNo = context.filterTreeNode) === null || _context$filterTreeNo === void 0 ? void 0 : _context$filterTreeNo.call(context, convertNodePropsToEventData(props))), "".concat(context.prefixCls, "-treenode-leaf"), memoizedIsLeaf))),
    style,
    draggable: draggableWithoutDisabled,
    onDragStart: draggableWithoutDisabled ? onDragStart : void 0,
    onDragEnter: isDraggable ? onDragEnter : void 0,
    onDragOver: isDraggable ? onDragOver : void 0,
    onDragLeave: isDraggable ? onDragLeave : void 0,
    onDrop: isDraggable ? onDrop : void 0,
    onDragEnd: isDraggable ? onDragEnd : void 0,
    onMouseMove
  }, ariaSelected, dataOrAriaAttributeProps), /* @__PURE__ */ React.createElement(Indent$1, {
    prefixCls: context.prefixCls,
    level,
    isStart,
    isEnd
  }), dragHandlerNode, renderSwitcher(), checkboxNode, selectorNode);
};
TreeNode.isTreeNode = 1;
function arrDel(list, value) {
  if (!list) return [];
  var clone = list.slice();
  var index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}
function arrAdd(list, value) {
  var clone = (list || []).slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}
function posToArr(pos) {
  return pos.split("-");
}
function getDragChildrenKeys(dragNodeKey, keyEntities) {
  var dragChildrenKeys = [];
  var entity = getEntity(keyEntities, dragNodeKey);
  function dig() {
    var list = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    list.forEach(function(_ref) {
      var key = _ref.key, children = _ref.children;
      dragChildrenKeys.push(key);
      dig(children);
    });
  }
  dig(entity.children);
  return dragChildrenKeys;
}
function isLastChild(treeNodeEntity) {
  if (treeNodeEntity.parent) {
    var posArr = posToArr(treeNodeEntity.pos);
    return Number(posArr[posArr.length - 1]) === treeNodeEntity.parent.children.length - 1;
  }
  return false;
}
function isFirstChild(treeNodeEntity) {
  var posArr = posToArr(treeNodeEntity.pos);
  return Number(posArr[posArr.length - 1]) === 0;
}
function calcDropPosition(event, dragNodeProps, targetNodeProps, indent, startMousePosition, allowDrop2, flattenedNodes, keyEntities, expandKeys, direction) {
  var _abstractDropNodeEnti;
  var clientX = event.clientX, clientY = event.clientY;
  var _getBoundingClientRec = event.target.getBoundingClientRect(), top = _getBoundingClientRec.top, height = _getBoundingClientRec.height;
  var horizontalMouseOffset = (direction === "rtl" ? -1 : 1) * (((startMousePosition === null || startMousePosition === void 0 ? void 0 : startMousePosition.x) || 0) - clientX);
  var rawDropLevelOffset = (horizontalMouseOffset - 12) / indent;
  var filteredExpandKeys = expandKeys.filter(function(key) {
    var _keyEntities$key;
    return (_keyEntities$key = keyEntities[key]) === null || _keyEntities$key === void 0 || (_keyEntities$key = _keyEntities$key.children) === null || _keyEntities$key === void 0 ? void 0 : _keyEntities$key.length;
  });
  var abstractDropNodeEntity = getEntity(keyEntities, targetNodeProps.eventKey);
  if (clientY < top + height / 2) {
    var nodeIndex = flattenedNodes.findIndex(function(flattenedNode) {
      return flattenedNode.key === abstractDropNodeEntity.key;
    });
    var prevNodeIndex = nodeIndex <= 0 ? 0 : nodeIndex - 1;
    var prevNodeKey = flattenedNodes[prevNodeIndex].key;
    abstractDropNodeEntity = getEntity(keyEntities, prevNodeKey);
  }
  var initialAbstractDropNodeKey = abstractDropNodeEntity.key;
  var abstractDragOverEntity = abstractDropNodeEntity;
  var dragOverNodeKey = abstractDropNodeEntity.key;
  var dropPosition = 0;
  var dropLevelOffset = 0;
  if (!filteredExpandKeys.includes(initialAbstractDropNodeKey)) {
    for (var i = 0; i < rawDropLevelOffset; i += 1) {
      if (isLastChild(abstractDropNodeEntity)) {
        abstractDropNodeEntity = abstractDropNodeEntity.parent;
        dropLevelOffset += 1;
      } else {
        break;
      }
    }
  }
  var abstractDragDataNode = dragNodeProps.data;
  var abstractDropDataNode = abstractDropNodeEntity.node;
  var dropAllowed = true;
  if (isFirstChild(abstractDropNodeEntity) && abstractDropNodeEntity.level === 0 && clientY < top + height / 2 && allowDrop2({
    dragNode: abstractDragDataNode,
    dropNode: abstractDropDataNode,
    dropPosition: -1
  }) && abstractDropNodeEntity.key === targetNodeProps.eventKey) {
    dropPosition = -1;
  } else if ((abstractDragOverEntity.children || []).length && filteredExpandKeys.includes(dragOverNodeKey)) {
    if (allowDrop2({
      dragNode: abstractDragDataNode,
      dropNode: abstractDropDataNode,
      dropPosition: 0
    })) {
      dropPosition = 0;
    } else {
      dropAllowed = false;
    }
  } else if (dropLevelOffset === 0) {
    if (rawDropLevelOffset > -1.5) {
      if (allowDrop2({
        dragNode: abstractDragDataNode,
        dropNode: abstractDropDataNode,
        dropPosition: 1
      })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    } else {
      if (allowDrop2({
        dragNode: abstractDragDataNode,
        dropNode: abstractDropDataNode,
        dropPosition: 0
      })) {
        dropPosition = 0;
      } else if (allowDrop2({
        dragNode: abstractDragDataNode,
        dropNode: abstractDropDataNode,
        dropPosition: 1
      })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    }
  } else {
    if (allowDrop2({
      dragNode: abstractDragDataNode,
      dropNode: abstractDropDataNode,
      dropPosition: 1
    })) {
      dropPosition = 1;
    } else {
      dropAllowed = false;
    }
  }
  return {
    dropPosition,
    dropLevelOffset,
    dropTargetKey: abstractDropNodeEntity.key,
    dropTargetPos: abstractDropNodeEntity.pos,
    dragOverNodeKey,
    dropContainerKey: dropPosition === 0 ? null : ((_abstractDropNodeEnti = abstractDropNodeEntity.parent) === null || _abstractDropNodeEnti === void 0 ? void 0 : _abstractDropNodeEnti.key) || null,
    dropAllowed
  };
}
function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys) return void 0;
  var multiple = props.multiple;
  if (multiple) {
    return selectedKeys.slice();
  }
  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }
  return selectedKeys;
}
function parseCheckedKeys(keys) {
  if (!keys) {
    return null;
  }
  var keyProps;
  if (Array.isArray(keys)) {
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: void 0
    };
  } else if (_typeof(keys) === "object") {
    keyProps = {
      checkedKeys: keys.checked || void 0,
      halfCheckedKeys: keys.halfChecked || void 0
    };
  } else {
    warningOnce(false, "`checkedKeys` is not an array or an object");
    return null;
  }
  return keyProps;
}
function conductExpandParent(keyList, keyEntities) {
  var expandedKeys = /* @__PURE__ */ new Set();
  function conductUp(key) {
    if (expandedKeys.has(key)) return;
    var entity = getEntity(keyEntities, key);
    if (!entity) return;
    expandedKeys.add(key);
    var parent = entity.parent, node = entity.node;
    if (node.disabled) return;
    if (parent) {
      conductUp(parent.key);
    }
  }
  (keyList || []).forEach(function(key) {
    conductUp(key);
  });
  return _toConsumableArray(expandedKeys);
}
const SELECTION_COLUMN = {};
const SELECTION_ALL = "SELECT_ALL";
const SELECTION_INVERT = "SELECT_INVERT";
const SELECTION_NONE = "SELECT_NONE";
const EMPTY_LIST$1 = [];
const flattenData = (childrenColumnName, data, list = []) => {
  (data || []).forEach((record) => {
    list.push(record);
    if (record && typeof record === "object" && childrenColumnName in record) {
      flattenData(childrenColumnName, record[childrenColumnName], list);
    }
  });
  return list;
};
const useSelection = (config, rowSelection) => {
  const {
    preserveSelectedRowKeys,
    selectedRowKeys,
    defaultSelectedRowKeys,
    getCheckboxProps,
    getTitleCheckboxProps,
    onChange: onSelectionChange,
    onSelect,
    onSelectAll,
    onSelectInvert,
    onSelectNone,
    onSelectMultiple,
    columnWidth: selectionColWidth,
    type: selectionType,
    selections,
    fixed,
    renderCell: customizeRenderCell,
    hideSelectAll,
    checkStrictly = true
  } = rowSelection || {};
  const {
    prefixCls,
    data,
    pageData,
    getRecordByKey,
    getRowKey,
    expandType,
    childrenColumnName,
    locale: tableLocale,
    getPopupContainer
  } = config;
  const warning = devUseWarning();
  const [multipleSelect, updatePrevSelectedIndex] = useMultipleSelect((item) => item);
  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState(selectedRowKeys || defaultSelectedRowKeys || EMPTY_LIST$1, {
    value: selectedRowKeys
  });
  const preserveRecordsRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const updatePreserveRecordsCache = reactExports.useCallback((keys) => {
    if (preserveSelectedRowKeys) {
      const newCache = /* @__PURE__ */ new Map();
      keys.forEach((key) => {
        let record = getRecordByKey(key);
        if (!record && preserveRecordsRef.current.has(key)) {
          record = preserveRecordsRef.current.get(key);
        }
        newCache.set(key, record);
      });
      preserveRecordsRef.current = newCache;
    }
  }, [getRecordByKey, preserveSelectedRowKeys]);
  reactExports.useEffect(() => {
    updatePreserveRecordsCache(mergedSelectedKeys);
  }, [mergedSelectedKeys]);
  const flattedData = reactExports.useMemo(() => flattenData(childrenColumnName, pageData), [childrenColumnName, pageData]);
  const {
    keyEntities
  } = reactExports.useMemo(() => {
    if (checkStrictly) {
      return {
        keyEntities: null
      };
    }
    let convertData = data;
    if (preserveSelectedRowKeys) {
      const keysSet = new Set(flattedData.map((record, index) => getRowKey(record, index)));
      const preserveRecords = Array.from(preserveRecordsRef.current).reduce((total, [key, value]) => keysSet.has(key) ? total : total.concat(value), []);
      convertData = [].concat(_toConsumableArray(convertData), _toConsumableArray(preserveRecords));
    }
    return convertDataToEntities(convertData, {
      externalGetKey: getRowKey,
      childrenPropName: childrenColumnName
    });
  }, [data, getRowKey, checkStrictly, childrenColumnName, preserveSelectedRowKeys, flattedData]);
  const checkboxPropsMap = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    flattedData.forEach((record, index) => {
      const key = getRowKey(record, index);
      const checkboxProps = (getCheckboxProps ? getCheckboxProps(record) : null) || {};
      map.set(key, checkboxProps);
    });
    return map;
  }, [flattedData, getRowKey, getCheckboxProps]);
  const isCheckboxDisabled = reactExports.useCallback((r) => {
    const rowKey = getRowKey(r);
    let checkboxProps;
    if (checkboxPropsMap.has(rowKey)) {
      checkboxProps = checkboxPropsMap.get(getRowKey(r));
    } else {
      checkboxProps = getCheckboxProps ? getCheckboxProps(r) : void 0;
    }
    return !!(checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.disabled);
  }, [checkboxPropsMap, getRowKey]);
  const [derivedSelectedKeys, derivedHalfSelectedKeys] = reactExports.useMemo(() => {
    if (checkStrictly) {
      return [mergedSelectedKeys || [], []];
    }
    const {
      checkedKeys,
      halfCheckedKeys
    } = conductCheck(mergedSelectedKeys, true, keyEntities, isCheckboxDisabled);
    return [checkedKeys || [], halfCheckedKeys];
  }, [mergedSelectedKeys, checkStrictly, keyEntities, isCheckboxDisabled]);
  const derivedSelectedKeySet = reactExports.useMemo(() => {
    const keys = selectionType === "radio" ? derivedSelectedKeys.slice(0, 1) : derivedSelectedKeys;
    return new Set(keys);
  }, [derivedSelectedKeys, selectionType]);
  const derivedHalfSelectedKeySet = reactExports.useMemo(() => selectionType === "radio" ? /* @__PURE__ */ new Set() : new Set(derivedHalfSelectedKeys), [derivedHalfSelectedKeys, selectionType]);
  reactExports.useEffect(() => {
    if (!rowSelection) {
      setMergedSelectedKeys(EMPTY_LIST$1);
    }
  }, [!!rowSelection]);
  const setSelectedKeys = reactExports.useCallback((keys, method) => {
    let availableKeys;
    let records;
    updatePreserveRecordsCache(keys);
    if (preserveSelectedRowKeys) {
      availableKeys = keys;
      records = keys.map((key) => preserveRecordsRef.current.get(key));
    } else {
      availableKeys = [];
      records = [];
      keys.forEach((key) => {
        const record = getRecordByKey(key);
        if (record !== void 0) {
          availableKeys.push(key);
          records.push(record);
        }
      });
    }
    setMergedSelectedKeys(availableKeys);
    onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(availableKeys, records, {
      type: method
    });
  }, [setMergedSelectedKeys, getRecordByKey, onSelectionChange, preserveSelectedRowKeys]);
  const triggerSingleSelection = reactExports.useCallback((key, selected, keys, event) => {
    if (onSelect) {
      const rows = keys.map((k) => getRecordByKey(k));
      onSelect(getRecordByKey(key), selected, rows, event);
    }
    setSelectedKeys(keys, "single");
  }, [onSelect, getRecordByKey, setSelectedKeys]);
  const mergedSelections = reactExports.useMemo(() => {
    if (!selections || hideSelectAll) {
      return null;
    }
    const selectionList = selections === true ? [SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE] : selections;
    return selectionList.map((selection) => {
      if (selection === SELECTION_ALL) {
        return {
          key: "all",
          text: tableLocale.selectionAll,
          onSelect() {
            setSelectedKeys(data.map((record, index) => getRowKey(record, index)).filter((key) => {
              const checkProps = checkboxPropsMap.get(key);
              return !(checkProps === null || checkProps === void 0 ? void 0 : checkProps.disabled) || derivedSelectedKeySet.has(key);
            }), "all");
          }
        };
      }
      if (selection === SELECTION_INVERT) {
        return {
          key: "invert",
          text: tableLocale.selectInvert,
          onSelect() {
            const keySet = new Set(derivedSelectedKeySet);
            pageData.forEach((record, index) => {
              const key = getRowKey(record, index);
              const checkProps = checkboxPropsMap.get(key);
              if (!(checkProps === null || checkProps === void 0 ? void 0 : checkProps.disabled)) {
                if (keySet.has(key)) {
                  keySet.delete(key);
                } else {
                  keySet.add(key);
                }
              }
            });
            const keys = Array.from(keySet);
            if (onSelectInvert) {
              warning.deprecated(false, "onSelectInvert", "onChange");
              onSelectInvert(keys);
            }
            setSelectedKeys(keys, "invert");
          }
        };
      }
      if (selection === SELECTION_NONE) {
        return {
          key: "none",
          text: tableLocale.selectNone,
          onSelect() {
            onSelectNone === null || onSelectNone === void 0 ? void 0 : onSelectNone();
            setSelectedKeys(Array.from(derivedSelectedKeySet).filter((key) => {
              const checkProps = checkboxPropsMap.get(key);
              return checkProps === null || checkProps === void 0 ? void 0 : checkProps.disabled;
            }), "none");
          }
        };
      }
      return selection;
    }).map((selection) => Object.assign(Object.assign({}, selection), {
      onSelect: (...rest) => {
        var _a2;
        var _a;
        (_a = selection.onSelect) === null || _a === void 0 ? void 0 : (_a2 = _a).call.apply(_a2, [selection].concat(rest));
        updatePrevSelectedIndex(null);
      }
    }));
  }, [selections, derivedSelectedKeySet, pageData, getRowKey, onSelectInvert, setSelectedKeys]);
  const transformColumns = reactExports.useCallback((columns) => {
    var _a;
    if (!rowSelection) {
      return columns.filter((col) => col !== SELECTION_COLUMN);
    }
    let cloneColumns = _toConsumableArray(columns);
    const keySet = new Set(derivedSelectedKeySet);
    const recordKeys = flattedData.map(getRowKey).filter((key) => !checkboxPropsMap.get(key).disabled);
    const checkedCurrentAll = recordKeys.every((key) => keySet.has(key));
    const checkedCurrentSome = recordKeys.some((key) => keySet.has(key));
    const onSelectAllChange = () => {
      const changeKeys = [];
      if (checkedCurrentAll) {
        recordKeys.forEach((key) => {
          keySet.delete(key);
          changeKeys.push(key);
        });
      } else {
        recordKeys.forEach((key) => {
          if (!keySet.has(key)) {
            keySet.add(key);
            changeKeys.push(key);
          }
        });
      }
      const keys = Array.from(keySet);
      onSelectAll === null || onSelectAll === void 0 ? void 0 : onSelectAll(!checkedCurrentAll, keys.map((k) => getRecordByKey(k)), changeKeys.map((k) => getRecordByKey(k)));
      setSelectedKeys(keys, "all");
      updatePrevSelectedIndex(null);
    };
    let title;
    let columnTitleCheckbox;
    if (selectionType !== "radio") {
      let customizeSelections;
      if (mergedSelections) {
        const menu = {
          getPopupContainer,
          items: mergedSelections.map((selection, index) => {
            const {
              key,
              text,
              onSelect: onSelectionClick
            } = selection;
            return {
              key: key !== null && key !== void 0 ? key : index,
              onClick: () => {
                onSelectionClick === null || onSelectionClick === void 0 ? void 0 : onSelectionClick(recordKeys);
              },
              label: text
            };
          })
        };
        customizeSelections = /* @__PURE__ */ reactExports.createElement("div", {
          className: `${prefixCls}-selection-extra`
        }, /* @__PURE__ */ reactExports.createElement(Dropdown, {
          menu,
          getPopupContainer
        }, /* @__PURE__ */ reactExports.createElement("span", null, /* @__PURE__ */ reactExports.createElement(RefIcon$i, null))));
      }
      const allDisabledData = flattedData.map((record, index) => {
        const key = getRowKey(record, index);
        const checkboxProps = checkboxPropsMap.get(key) || {};
        return Object.assign({
          checked: keySet.has(key)
        }, checkboxProps);
      }).filter(({
        disabled: disabled2
      }) => disabled2);
      const allDisabled = !!allDisabledData.length && allDisabledData.length === flattedData.length;
      const allDisabledAndChecked = allDisabled && allDisabledData.every(({
        checked
      }) => checked);
      const allDisabledSomeChecked = allDisabled && allDisabledData.some(({
        checked
      }) => checked);
      const customCheckboxProps = (getTitleCheckboxProps === null || getTitleCheckboxProps === void 0 ? void 0 : getTitleCheckboxProps()) || {};
      const {
        onChange,
        disabled
      } = customCheckboxProps;
      columnTitleCheckbox = /* @__PURE__ */ reactExports.createElement(Checkbox, Object.assign({
        "aria-label": customizeSelections ? "Custom selection" : "Select all"
      }, customCheckboxProps, {
        checked: !allDisabled ? !!flattedData.length && checkedCurrentAll : allDisabledAndChecked,
        indeterminate: !allDisabled ? !checkedCurrentAll && checkedCurrentSome : !allDisabledAndChecked && allDisabledSomeChecked,
        onChange: (e) => {
          onSelectAllChange();
          onChange === null || onChange === void 0 ? void 0 : onChange(e);
        },
        disabled: disabled !== null && disabled !== void 0 ? disabled : flattedData.length === 0 || allDisabled,
        skipGroup: true
      }));
      title = !hideSelectAll && /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-selection`
      }, columnTitleCheckbox, customizeSelections);
    }
    let renderCell;
    if (selectionType === "radio") {
      renderCell = (_, record, index) => {
        const key = getRowKey(record, index);
        const checked = keySet.has(key);
        const checkboxProps = checkboxPropsMap.get(key);
        return {
          node: /* @__PURE__ */ reactExports.createElement(Radio, Object.assign({}, checkboxProps, {
            checked,
            onClick: (e) => {
              var _a2;
              e.stopPropagation();
              (_a2 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(checkboxProps, e);
            },
            onChange: (event) => {
              var _a2;
              if (!keySet.has(key)) {
                triggerSingleSelection(key, true, [key], event.nativeEvent);
              }
              (_a2 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(checkboxProps, event);
            }
          })),
          checked
        };
      };
    } else {
      renderCell = (_, record, index) => {
        var _a2;
        const key = getRowKey(record, index);
        const checked = keySet.has(key);
        const indeterminate = derivedHalfSelectedKeySet.has(key);
        const checkboxProps = checkboxPropsMap.get(key);
        let mergedIndeterminate;
        if (expandType === "nest") {
          mergedIndeterminate = indeterminate;
        } else {
          mergedIndeterminate = (_a2 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.indeterminate) !== null && _a2 !== void 0 ? _a2 : indeterminate;
        }
        return {
          node: /* @__PURE__ */ reactExports.createElement(Checkbox, Object.assign({}, checkboxProps, {
            indeterminate: mergedIndeterminate,
            checked,
            skipGroup: true,
            onClick: (e) => {
              var _a3;
              e.stopPropagation();
              (_a3 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onClick) === null || _a3 === void 0 ? void 0 : _a3.call(checkboxProps, e);
            },
            onChange: (event) => {
              var _a3;
              const {
                nativeEvent
              } = event;
              const {
                shiftKey
              } = nativeEvent;
              const currentSelectedIndex = recordKeys.indexOf(key);
              const isMultiple = derivedSelectedKeys.some((item) => recordKeys.includes(item));
              if (shiftKey && checkStrictly && isMultiple) {
                const changedKeys = multipleSelect(currentSelectedIndex, recordKeys, keySet);
                const keys = Array.from(keySet);
                onSelectMultiple === null || onSelectMultiple === void 0 ? void 0 : onSelectMultiple(!checked, keys.map((recordKey) => getRecordByKey(recordKey)), changedKeys.map((recordKey) => getRecordByKey(recordKey)));
                setSelectedKeys(keys, "multiple");
              } else {
                const originCheckedKeys = derivedSelectedKeys;
                if (checkStrictly) {
                  const checkedKeys = checked ? arrDel(originCheckedKeys, key) : arrAdd(originCheckedKeys, key);
                  triggerSingleSelection(key, !checked, checkedKeys, nativeEvent);
                } else {
                  const result = conductCheck([].concat(_toConsumableArray(originCheckedKeys), [key]), true, keyEntities, isCheckboxDisabled);
                  const {
                    checkedKeys,
                    halfCheckedKeys
                  } = result;
                  let nextCheckedKeys = checkedKeys;
                  if (checked) {
                    const tempKeySet = new Set(checkedKeys);
                    tempKeySet.delete(key);
                    nextCheckedKeys = conductCheck(Array.from(tempKeySet), {
                      halfCheckedKeys
                    }, keyEntities, isCheckboxDisabled).checkedKeys;
                  }
                  triggerSingleSelection(key, !checked, nextCheckedKeys, nativeEvent);
                }
              }
              if (checked) {
                updatePrevSelectedIndex(null);
              } else {
                updatePrevSelectedIndex(currentSelectedIndex);
              }
              (_a3 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onChange) === null || _a3 === void 0 ? void 0 : _a3.call(checkboxProps, event);
            }
          })),
          checked
        };
      };
    }
    const renderSelectionCell = (_, record, index) => {
      const {
        node,
        checked
      } = renderCell(_, record, index);
      if (customizeRenderCell) {
        return customizeRenderCell(checked, record, index, node);
      }
      return node;
    };
    if (!cloneColumns.includes(SELECTION_COLUMN)) {
      if (cloneColumns.findIndex((col) => {
        var _a2;
        return ((_a2 = col[INTERNAL_COL_DEFINE]) === null || _a2 === void 0 ? void 0 : _a2.columnType) === "EXPAND_COLUMN";
      }) === 0) {
        const [expandColumn, ...restColumns] = cloneColumns;
        cloneColumns = [expandColumn, SELECTION_COLUMN].concat(_toConsumableArray(restColumns));
      } else {
        cloneColumns = [SELECTION_COLUMN].concat(_toConsumableArray(cloneColumns));
      }
    }
    const selectionColumnIndex = cloneColumns.indexOf(SELECTION_COLUMN);
    cloneColumns = cloneColumns.filter((column, index) => column !== SELECTION_COLUMN || index === selectionColumnIndex);
    const prevCol = cloneColumns[selectionColumnIndex - 1];
    const nextCol = cloneColumns[selectionColumnIndex + 1];
    let mergedFixed = fixed;
    if (mergedFixed === void 0) {
      if ((nextCol === null || nextCol === void 0 ? void 0 : nextCol.fixed) !== void 0) {
        mergedFixed = nextCol.fixed;
      } else if ((prevCol === null || prevCol === void 0 ? void 0 : prevCol.fixed) !== void 0) {
        mergedFixed = prevCol.fixed;
      }
    }
    if (mergedFixed && prevCol && ((_a = prevCol[INTERNAL_COL_DEFINE]) === null || _a === void 0 ? void 0 : _a.columnType) === "EXPAND_COLUMN" && prevCol.fixed === void 0) {
      prevCol.fixed = mergedFixed;
    }
    const columnCls = classNames(`${prefixCls}-selection-col`, {
      [`${prefixCls}-selection-col-with-dropdown`]: selections && selectionType === "checkbox"
    });
    const renderColumnTitle2 = () => {
      if (!(rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnTitle)) {
        return title;
      }
      if (typeof rowSelection.columnTitle === "function") {
        return rowSelection.columnTitle(columnTitleCheckbox);
      }
      return rowSelection.columnTitle;
    };
    const selectionColumn = {
      fixed: mergedFixed,
      width: selectionColWidth,
      className: `${prefixCls}-selection-column`,
      title: renderColumnTitle2(),
      render: renderSelectionCell,
      onCell: rowSelection.onCell,
      align: rowSelection.align,
      [INTERNAL_COL_DEFINE]: {
        className: columnCls
      }
    };
    return cloneColumns.map((col) => col === SELECTION_COLUMN ? selectionColumn : col);
  }, [getRowKey, flattedData, rowSelection, derivedSelectedKeys, derivedSelectedKeySet, derivedHalfSelectedKeySet, selectionColWidth, mergedSelections, expandType, checkboxPropsMap, onSelectMultiple, triggerSingleSelection, isCheckboxDisabled]);
  return [transformColumns, derivedSelectedKeySet];
};
function renderExpandIcon(locale2) {
  return (props) => {
    const {
      prefixCls,
      onExpand,
      record,
      expanded,
      expandable
    } = props;
    const iconPrefix = `${prefixCls}-row-expand-icon`;
    return /* @__PURE__ */ reactExports.createElement("button", {
      type: "button",
      onClick: (e) => {
        onExpand(record, e);
        e.stopPropagation();
      },
      className: classNames(iconPrefix, {
        [`${iconPrefix}-spaced`]: !expandable,
        [`${iconPrefix}-expanded`]: expandable && expanded,
        [`${iconPrefix}-collapsed`]: expandable && !expanded
      }),
      "aria-label": expanded ? locale2.collapse : locale2.expand,
      "aria-expanded": expanded
    });
  };
}
function useContainerWidth(prefixCls) {
  const getContainerWidth = (ele, width) => {
    const container = ele.querySelector(`.${prefixCls}-container`);
    let returnWidth = width;
    if (container) {
      const style = getComputedStyle(container);
      const borderLeft = Number.parseInt(style.borderLeftWidth, 10);
      const borderRight = Number.parseInt(style.borderRightWidth, 10);
      returnWidth = width - borderLeft - borderRight;
    }
    return returnWidth;
  };
  return getContainerWidth;
}
const getColumnKey = (column, defaultKey) => {
  if ("key" in column && column.key !== void 0 && column.key !== null) {
    return column.key;
  }
  if (column.dataIndex) {
    return Array.isArray(column.dataIndex) ? column.dataIndex.join(".") : column.dataIndex;
  }
  return defaultKey;
};
function getColumnPos(index, pos) {
  return pos ? `${pos}-${index}` : `${index}`;
}
const renderColumnTitle = (title, props) => {
  if (typeof title === "function") {
    return title(props);
  }
  return title;
};
const safeColumnTitle = (title, props) => {
  const res = renderColumnTitle(title, props);
  if (Object.prototype.toString.call(res) === "[object Object]") {
    return "";
  }
  return res;
};
var FilterFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z" } }] }, "name": "filter", "theme": "filled" };
var FilterFilled = function FilterFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: FilterFilled$1
  }));
};
var RefIcon$9 = /* @__PURE__ */ reactExports.forwardRef(FilterFilled);
var DropIndicator = function DropIndicator2(props) {
  var dropPosition = props.dropPosition, dropLevelOffset = props.dropLevelOffset, indent = props.indent;
  var style = {
    pointerEvents: "none",
    position: "absolute",
    right: 0,
    backgroundColor: "red",
    height: 2
  };
  switch (dropPosition) {
    case -1:
      style.top = 0;
      style.left = -dropLevelOffset * indent;
      break;
    case 1:
      style.bottom = 0;
      style.left = -dropLevelOffset * indent;
      break;
    case 0:
      style.bottom = 0;
      style.left = indent;
      break;
  }
  return /* @__PURE__ */ React.createElement("div", {
    style
  });
};
function _objectDestructuringEmpty(t) {
  if (null == t) throw new TypeError("Cannot destructure " + t);
}
function useUnmount(triggerStart, triggerEnd) {
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), firstMount = _React$useState2[0], setFirstMount = _React$useState2[1];
  useLayoutEffect(function() {
    if (firstMount) {
      triggerStart();
      return function() {
        triggerEnd();
      };
    }
  }, [firstMount]);
  useLayoutEffect(function() {
    setFirstMount(true);
    return function() {
      setFirstMount(false);
    };
  }, []);
}
var _excluded$1 = ["className", "style", "motion", "motionNodes", "motionType", "onMotionStart", "onMotionEnd", "active", "treeNodeRequiredProps"];
var MotionTreeNode = /* @__PURE__ */ reactExports.forwardRef(function(oriProps, ref) {
  var className = oriProps.className, style = oriProps.style, motion = oriProps.motion, motionNodes = oriProps.motionNodes, motionType = oriProps.motionType, onOriginMotionStart = oriProps.onMotionStart, onOriginMotionEnd = oriProps.onMotionEnd, active = oriProps.active, treeNodeRequiredProps = oriProps.treeNodeRequiredProps, props = _objectWithoutProperties(oriProps, _excluded$1);
  var _React$useState = reactExports.useState(true), _React$useState2 = _slicedToArray(_React$useState, 2), visible = _React$useState2[0], setVisible = _React$useState2[1];
  var _React$useContext = reactExports.useContext(TreeContext), prefixCls = _React$useContext.prefixCls;
  var targetVisible = motionNodes && motionType !== "hide";
  useLayoutEffect(function() {
    if (motionNodes) {
      if (targetVisible !== visible) {
        setVisible(targetVisible);
      }
    }
  }, [motionNodes]);
  var triggerMotionStart = function triggerMotionStart2() {
    if (motionNodes) {
      onOriginMotionStart();
    }
  };
  var triggerMotionEndRef = reactExports.useRef(false);
  var triggerMotionEnd = function triggerMotionEnd2() {
    if (motionNodes && !triggerMotionEndRef.current) {
      triggerMotionEndRef.current = true;
      onOriginMotionEnd();
    }
  };
  useUnmount(triggerMotionStart, triggerMotionEnd);
  var onVisibleChanged = function onVisibleChanged2(nextVisible) {
    if (targetVisible === nextVisible) {
      triggerMotionEnd();
    }
  };
  if (motionNodes) {
    return /* @__PURE__ */ reactExports.createElement(CSSMotion, _extends({
      ref,
      visible
    }, motion, {
      motionAppear: motionType === "show",
      onVisibleChanged
    }), function(_ref, motionRef) {
      var motionClassName = _ref.className, motionStyle = _ref.style;
      return /* @__PURE__ */ reactExports.createElement("div", {
        ref: motionRef,
        className: classNames("".concat(prefixCls, "-treenode-motion"), motionClassName),
        style: motionStyle
      }, motionNodes.map(function(treeNode) {
        var restProps = Object.assign({}, (_objectDestructuringEmpty(treeNode.data), treeNode.data)), title = treeNode.title, key = treeNode.key, isStart = treeNode.isStart, isEnd = treeNode.isEnd;
        delete restProps.children;
        var treeNodeProps = getTreeNodeProps(key, treeNodeRequiredProps);
        return /* @__PURE__ */ reactExports.createElement(TreeNode, _extends({}, restProps, treeNodeProps, {
          title,
          active,
          data: treeNode.data,
          key,
          isStart,
          isEnd
        }));
      }));
    });
  }
  return /* @__PURE__ */ reactExports.createElement(TreeNode, _extends({
    domRef: ref,
    className,
    style
  }, props, {
    active
  }));
});
function findExpandedKeys() {
  var prev = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var next = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var prevLen = prev.length;
  var nextLen = next.length;
  if (Math.abs(prevLen - nextLen) !== 1) {
    return {
      add: false,
      key: null
    };
  }
  function find(shorter, longer) {
    var cache = /* @__PURE__ */ new Map();
    shorter.forEach(function(key) {
      cache.set(key, true);
    });
    var keys = longer.filter(function(key) {
      return !cache.has(key);
    });
    return keys.length === 1 ? keys[0] : null;
  }
  if (prevLen < nextLen) {
    return {
      add: true,
      key: find(prev, next)
    };
  }
  return {
    add: false,
    key: find(next, prev)
  };
}
function getExpandRange(shorter, longer, key) {
  var shorterStartIndex = shorter.findIndex(function(data) {
    return data.key === key;
  });
  var shorterEndNode = shorter[shorterStartIndex + 1];
  var longerStartIndex = longer.findIndex(function(data) {
    return data.key === key;
  });
  if (shorterEndNode) {
    var longerEndIndex = longer.findIndex(function(data) {
      return data.key === shorterEndNode.key;
    });
    return longer.slice(longerStartIndex + 1, longerEndIndex);
  }
  return longer.slice(longerStartIndex + 1);
}
var _excluded = ["prefixCls", "data", "selectable", "checkable", "expandedKeys", "selectedKeys", "checkedKeys", "loadedKeys", "loadingKeys", "halfCheckedKeys", "keyEntities", "disabled", "dragging", "dragOverNodeKey", "dropPosition", "motion", "height", "itemHeight", "virtual", "scrollWidth", "focusable", "activeItem", "focused", "tabIndex", "onKeyDown", "onFocus", "onBlur", "onActiveChange", "onListChangeStart", "onListChangeEnd"];
var HIDDEN_STYLE = {
  width: 0,
  height: 0,
  display: "flex",
  overflow: "hidden",
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0
};
var noop = function noop2() {
};
var MOTION_KEY = "RC_TREE_MOTION_".concat(Math.random());
var MotionNode = {
  key: MOTION_KEY
};
var MotionEntity = {
  key: MOTION_KEY,
  level: 0,
  index: 0,
  pos: "0",
  node: MotionNode,
  nodes: [MotionNode]
};
var MotionFlattenData = {
  parent: null,
  children: [],
  pos: MotionEntity.pos,
  data: MotionNode,
  title: null,
  key: MOTION_KEY,
  /** Hold empty list here since we do not use it */
  isStart: [],
  isEnd: []
};
function getMinimumRangeTransitionRange(list, virtual, height, itemHeight) {
  if (virtual === false || !height) {
    return list;
  }
  return list.slice(0, Math.ceil(height / itemHeight) + 1);
}
function itemKey(item) {
  var key = item.key, pos = item.pos;
  return getKey(key, pos);
}
function getAccessibilityPath(item) {
  var path = String(item.data.key);
  var current = item;
  while (current.parent) {
    current = current.parent;
    path = "".concat(current.data.key, " > ").concat(path);
  }
  return path;
}
var NodeList = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, data = props.data;
  props.selectable;
  props.checkable;
  var expandedKeys = props.expandedKeys, selectedKeys = props.selectedKeys, checkedKeys = props.checkedKeys, loadedKeys = props.loadedKeys, loadingKeys = props.loadingKeys, halfCheckedKeys = props.halfCheckedKeys, keyEntities = props.keyEntities, disabled = props.disabled, dragging = props.dragging, dragOverNodeKey = props.dragOverNodeKey, dropPosition = props.dropPosition, motion = props.motion, height = props.height, itemHeight = props.itemHeight, virtual = props.virtual, scrollWidth = props.scrollWidth, focusable = props.focusable, activeItem = props.activeItem, focused = props.focused, tabIndex = props.tabIndex, onKeyDown2 = props.onKeyDown, onFocus = props.onFocus, onBlur = props.onBlur, onActiveChange = props.onActiveChange, onListChangeStart = props.onListChangeStart, onListChangeEnd = props.onListChangeEnd, domProps = _objectWithoutProperties(props, _excluded);
  var listRef = reactExports.useRef(null);
  var indentMeasurerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, function() {
    return {
      scrollTo: function scrollTo2(scroll) {
        listRef.current.scrollTo(scroll);
      },
      getIndentWidth: function getIndentWidth() {
        return indentMeasurerRef.current.offsetWidth;
      }
    };
  });
  var _React$useState = reactExports.useState(expandedKeys), _React$useState2 = _slicedToArray(_React$useState, 2), prevExpandedKeys = _React$useState2[0], setPrevExpandedKeys = _React$useState2[1];
  var _React$useState3 = reactExports.useState(data), _React$useState4 = _slicedToArray(_React$useState3, 2), prevData = _React$useState4[0], setPrevData = _React$useState4[1];
  var _React$useState5 = reactExports.useState(data), _React$useState6 = _slicedToArray(_React$useState5, 2), transitionData = _React$useState6[0], setTransitionData = _React$useState6[1];
  var _React$useState7 = reactExports.useState([]), _React$useState8 = _slicedToArray(_React$useState7, 2), transitionRange = _React$useState8[0], setTransitionRange = _React$useState8[1];
  var _React$useState9 = reactExports.useState(null), _React$useState10 = _slicedToArray(_React$useState9, 2), motionType = _React$useState10[0], setMotionType = _React$useState10[1];
  var dataRef = reactExports.useRef(data);
  dataRef.current = data;
  function onMotionEnd() {
    var latestData = dataRef.current;
    setPrevData(latestData);
    setTransitionData(latestData);
    setTransitionRange([]);
    setMotionType(null);
    onListChangeEnd();
  }
  useLayoutEffect(function() {
    setPrevExpandedKeys(expandedKeys);
    var diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);
    if (diffExpanded.key !== null) {
      if (diffExpanded.add) {
        var keyIndex = prevData.findIndex(function(_ref) {
          var key = _ref.key;
          return key === diffExpanded.key;
        });
        var rangeNodes = getMinimumRangeTransitionRange(getExpandRange(prevData, data, diffExpanded.key), virtual, height, itemHeight);
        var newTransitionData = prevData.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);
        setTransitionData(newTransitionData);
        setTransitionRange(rangeNodes);
        setMotionType("show");
      } else {
        var _keyIndex = data.findIndex(function(_ref2) {
          var key = _ref2.key;
          return key === diffExpanded.key;
        });
        var _rangeNodes = getMinimumRangeTransitionRange(getExpandRange(data, prevData, diffExpanded.key), virtual, height, itemHeight);
        var _newTransitionData = data.slice();
        _newTransitionData.splice(_keyIndex + 1, 0, MotionFlattenData);
        setTransitionData(_newTransitionData);
        setTransitionRange(_rangeNodes);
        setMotionType("hide");
      }
    } else if (prevData !== data) {
      setPrevData(data);
      setTransitionData(data);
    }
  }, [expandedKeys, data]);
  reactExports.useEffect(function() {
    if (!dragging) {
      onMotionEnd();
    }
  }, [dragging]);
  var mergedData = motion ? transitionData : data;
  var treeNodeRequiredProps = {
    expandedKeys,
    selectedKeys,
    loadedKeys,
    loadingKeys,
    checkedKeys,
    halfCheckedKeys,
    dragOverNodeKey,
    dropPosition,
    keyEntities
  };
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, focused && activeItem && /* @__PURE__ */ reactExports.createElement("span", {
    style: HIDDEN_STYLE,
    "aria-live": "assertive"
  }, getAccessibilityPath(activeItem)), /* @__PURE__ */ reactExports.createElement("div", null, /* @__PURE__ */ reactExports.createElement("input", {
    style: HIDDEN_STYLE,
    disabled: focusable === false || disabled,
    tabIndex: focusable !== false ? tabIndex : null,
    onKeyDown: onKeyDown2,
    onFocus,
    onBlur,
    value: "",
    onChange: noop,
    "aria-label": "for screen reader"
  })), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-treenode"),
    "aria-hidden": true,
    style: {
      position: "absolute",
      pointerEvents: "none",
      visibility: "hidden",
      height: 0,
      overflow: "hidden",
      border: 0,
      padding: 0
    }
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-indent")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: indentMeasurerRef,
    className: "".concat(prefixCls, "-indent-unit")
  }))), /* @__PURE__ */ reactExports.createElement(List, _extends({}, domProps, {
    data: mergedData,
    itemKey,
    height,
    fullHeight: false,
    virtual,
    itemHeight,
    scrollWidth,
    prefixCls: "".concat(prefixCls, "-list"),
    ref: listRef,
    role: "tree",
    onVisibleChange: function onVisibleChange(originList) {
      if (originList.every(function(item) {
        return itemKey(item) !== MOTION_KEY;
      })) {
        onMotionEnd();
      }
    }
  }), function(treeNode) {
    var pos = treeNode.pos, restProps = Object.assign({}, (_objectDestructuringEmpty(treeNode.data), treeNode.data)), title = treeNode.title, key = treeNode.key, isStart = treeNode.isStart, isEnd = treeNode.isEnd;
    var mergedKey = getKey(key, pos);
    delete restProps.key;
    delete restProps.children;
    var treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);
    return /* @__PURE__ */ reactExports.createElement(MotionTreeNode, _extends({}, restProps, treeNodeProps, {
      title,
      active: !!activeItem && key === activeItem.key,
      pos,
      data: treeNode.data,
      isStart,
      isEnd,
      motion,
      motionNodes: key === MOTION_KEY ? transitionRange : null,
      motionType,
      onMotionStart: onListChangeStart,
      onMotionEnd,
      treeNodeRequiredProps,
      onMouseMove: function onMouseMove() {
        onActiveChange(null);
      }
    }));
  }));
});
var MAX_RETRY_TIMES = 10;
var Tree$2 = /* @__PURE__ */ function(_React$Component) {
  _inherits(Tree2, _React$Component);
  var _super = _createSuper(Tree2);
  function Tree2() {
    var _this;
    _classCallCheck(this, Tree2);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(_args));
    _defineProperty(_assertThisInitialized(_this), "destroyed", false);
    _defineProperty(_assertThisInitialized(_this), "delayedDragEnterLogic", void 0);
    _defineProperty(_assertThisInitialized(_this), "loadingRetryTimes", {});
    _defineProperty(_assertThisInitialized(_this), "state", {
      keyEntities: {},
      indent: null,
      selectedKeys: [],
      checkedKeys: [],
      halfCheckedKeys: [],
      loadedKeys: [],
      loadingKeys: [],
      expandedKeys: [],
      draggingNodeKey: null,
      dragChildrenKeys: [],
      // dropTargetKey is the key of abstract-drop-node
      // the abstract-drop-node is the real drop node when drag and drop
      // not the DOM drag over node
      dropTargetKey: null,
      dropPosition: null,
      // the drop position of abstract-drop-node, inside 0, top -1, bottom 1
      dropContainerKey: null,
      // the container key of abstract-drop-node if dropPosition is -1 or 1
      dropLevelOffset: null,
      // the drop level offset of abstract-drag-over-node
      dropTargetPos: null,
      // the pos of abstract-drop-node
      dropAllowed: true,
      // if drop to abstract-drop-node is allowed
      // the abstract-drag-over-node
      // if mouse is on the bottom of top dom node or no the top of the bottom dom node
      // abstract-drag-over-node is the top node
      dragOverNodeKey: null,
      treeData: [],
      flattenNodes: [],
      focused: false,
      activeKey: null,
      listChanging: false,
      prevProps: null,
      fieldNames: fillFieldNames()
    });
    _defineProperty(_assertThisInitialized(_this), "dragStartMousePosition", null);
    _defineProperty(_assertThisInitialized(_this), "dragNodeProps", null);
    _defineProperty(_assertThisInitialized(_this), "currentMouseOverDroppableNodeKey", null);
    _defineProperty(_assertThisInitialized(_this), "listRef", /* @__PURE__ */ reactExports.createRef());
    _defineProperty(_assertThisInitialized(_this), "onNodeDragStart", function(event, nodeProps) {
      var _this$state = _this.state, expandedKeys = _this$state.expandedKeys, keyEntities = _this$state.keyEntities;
      var onDragStart = _this.props.onDragStart;
      var eventKey = nodeProps.eventKey;
      _this.dragNodeProps = nodeProps;
      _this.dragStartMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      var newExpandedKeys = arrDel(expandedKeys, eventKey);
      _this.setState({
        draggingNodeKey: eventKey,
        dragChildrenKeys: getDragChildrenKeys(eventKey, keyEntities),
        indent: _this.listRef.current.getIndentWidth()
      });
      _this.setExpandedKeys(newExpandedKeys);
      window.addEventListener("dragend", _this.onWindowDragEnd);
      onDragStart === null || onDragStart === void 0 || onDragStart({
        event,
        node: convertNodePropsToEventData(nodeProps)
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDragEnter", function(event, nodeProps) {
      var _this$state2 = _this.state, expandedKeys = _this$state2.expandedKeys, keyEntities = _this$state2.keyEntities, dragChildrenKeys = _this$state2.dragChildrenKeys, flattenNodes = _this$state2.flattenNodes, indent = _this$state2.indent;
      var _this$props = _this.props, onDragEnter = _this$props.onDragEnter, onExpand = _this$props.onExpand, allowDrop2 = _this$props.allowDrop, direction = _this$props.direction;
      var pos = nodeProps.pos, eventKey = nodeProps.eventKey;
      if (_this.currentMouseOverDroppableNodeKey !== eventKey) {
        _this.currentMouseOverDroppableNodeKey = eventKey;
      }
      if (!_this.dragNodeProps) {
        _this.resetDragState();
        return;
      }
      var _calcDropPosition = calcDropPosition(event, _this.dragNodeProps, nodeProps, indent, _this.dragStartMousePosition, allowDrop2, flattenNodes, keyEntities, expandedKeys, direction), dropPosition = _calcDropPosition.dropPosition, dropLevelOffset = _calcDropPosition.dropLevelOffset, dropTargetKey = _calcDropPosition.dropTargetKey, dropContainerKey = _calcDropPosition.dropContainerKey, dropTargetPos = _calcDropPosition.dropTargetPos, dropAllowed = _calcDropPosition.dropAllowed, dragOverNodeKey = _calcDropPosition.dragOverNodeKey;
      if (
        // don't allow drop inside its children
        dragChildrenKeys.includes(dropTargetKey) || // don't allow drop when drop is not allowed caculated by calcDropPosition
        !dropAllowed
      ) {
        _this.resetDragState();
        return;
      }
      if (!_this.delayedDragEnterLogic) {
        _this.delayedDragEnterLogic = {};
      }
      Object.keys(_this.delayedDragEnterLogic).forEach(function(key) {
        clearTimeout(_this.delayedDragEnterLogic[key]);
      });
      if (_this.dragNodeProps.eventKey !== nodeProps.eventKey) {
        event.persist();
        _this.delayedDragEnterLogic[pos] = window.setTimeout(function() {
          if (_this.state.draggingNodeKey === null) {
            return;
          }
          var newExpandedKeys = _toConsumableArray(expandedKeys);
          var entity = getEntity(keyEntities, nodeProps.eventKey);
          if (entity && (entity.children || []).length) {
            newExpandedKeys = arrAdd(expandedKeys, nodeProps.eventKey);
          }
          if (!_this.props.hasOwnProperty("expandedKeys")) {
            _this.setExpandedKeys(newExpandedKeys);
          }
          onExpand === null || onExpand === void 0 || onExpand(newExpandedKeys, {
            node: convertNodePropsToEventData(nodeProps),
            expanded: true,
            nativeEvent: event.nativeEvent
          });
        }, 800);
      }
      if (_this.dragNodeProps.eventKey === dropTargetKey && dropLevelOffset === 0) {
        _this.resetDragState();
        return;
      }
      _this.setState({
        dragOverNodeKey,
        dropPosition,
        dropLevelOffset,
        dropTargetKey,
        dropContainerKey,
        dropTargetPos,
        dropAllowed
      });
      onDragEnter === null || onDragEnter === void 0 || onDragEnter({
        event,
        node: convertNodePropsToEventData(nodeProps),
        expandedKeys
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDragOver", function(event, nodeProps) {
      var _this$state3 = _this.state, dragChildrenKeys = _this$state3.dragChildrenKeys, flattenNodes = _this$state3.flattenNodes, keyEntities = _this$state3.keyEntities, expandedKeys = _this$state3.expandedKeys, indent = _this$state3.indent;
      var _this$props2 = _this.props, onDragOver = _this$props2.onDragOver, allowDrop2 = _this$props2.allowDrop, direction = _this$props2.direction;
      if (!_this.dragNodeProps) {
        return;
      }
      var _calcDropPosition2 = calcDropPosition(event, _this.dragNodeProps, nodeProps, indent, _this.dragStartMousePosition, allowDrop2, flattenNodes, keyEntities, expandedKeys, direction), dropPosition = _calcDropPosition2.dropPosition, dropLevelOffset = _calcDropPosition2.dropLevelOffset, dropTargetKey = _calcDropPosition2.dropTargetKey, dropContainerKey = _calcDropPosition2.dropContainerKey, dropTargetPos = _calcDropPosition2.dropTargetPos, dropAllowed = _calcDropPosition2.dropAllowed, dragOverNodeKey = _calcDropPosition2.dragOverNodeKey;
      if (dragChildrenKeys.includes(dropTargetKey) || !dropAllowed) {
        return;
      }
      if (_this.dragNodeProps.eventKey === dropTargetKey && dropLevelOffset === 0) {
        if (!(_this.state.dropPosition === null && _this.state.dropLevelOffset === null && _this.state.dropTargetKey === null && _this.state.dropContainerKey === null && _this.state.dropTargetPos === null && _this.state.dropAllowed === false && _this.state.dragOverNodeKey === null)) {
          _this.resetDragState();
        }
      } else if (!(dropPosition === _this.state.dropPosition && dropLevelOffset === _this.state.dropLevelOffset && dropTargetKey === _this.state.dropTargetKey && dropContainerKey === _this.state.dropContainerKey && dropTargetPos === _this.state.dropTargetPos && dropAllowed === _this.state.dropAllowed && dragOverNodeKey === _this.state.dragOverNodeKey)) {
        _this.setState({
          dropPosition,
          dropLevelOffset,
          dropTargetKey,
          dropContainerKey,
          dropTargetPos,
          dropAllowed,
          dragOverNodeKey
        });
      }
      onDragOver === null || onDragOver === void 0 || onDragOver({
        event,
        node: convertNodePropsToEventData(nodeProps)
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDragLeave", function(event, nodeProps) {
      if (_this.currentMouseOverDroppableNodeKey === nodeProps.eventKey && !event.currentTarget.contains(event.relatedTarget)) {
        _this.resetDragState();
        _this.currentMouseOverDroppableNodeKey = null;
      }
      var onDragLeave = _this.props.onDragLeave;
      onDragLeave === null || onDragLeave === void 0 || onDragLeave({
        event,
        node: convertNodePropsToEventData(nodeProps)
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onWindowDragEnd", function(event) {
      _this.onNodeDragEnd(event, null, true);
      window.removeEventListener("dragend", _this.onWindowDragEnd);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDragEnd", function(event, nodeProps) {
      var onDragEnd = _this.props.onDragEnd;
      _this.setState({
        dragOverNodeKey: null
      });
      _this.cleanDragState();
      onDragEnd === null || onDragEnd === void 0 || onDragEnd({
        event,
        node: convertNodePropsToEventData(nodeProps)
      });
      _this.dragNodeProps = null;
      window.removeEventListener("dragend", _this.onWindowDragEnd);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDrop", function(event, _) {
      var _this$getActiveItem;
      var outsideTree = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var _this$state4 = _this.state, dragChildrenKeys = _this$state4.dragChildrenKeys, dropPosition = _this$state4.dropPosition, dropTargetKey = _this$state4.dropTargetKey, dropTargetPos = _this$state4.dropTargetPos, dropAllowed = _this$state4.dropAllowed;
      if (!dropAllowed) {
        return;
      }
      var onDrop = _this.props.onDrop;
      _this.setState({
        dragOverNodeKey: null
      });
      _this.cleanDragState();
      if (dropTargetKey === null) return;
      var abstractDropNodeProps = _objectSpread2(_objectSpread2({}, getTreeNodeProps(dropTargetKey, _this.getTreeNodeRequiredProps())), {}, {
        active: ((_this$getActiveItem = _this.getActiveItem()) === null || _this$getActiveItem === void 0 ? void 0 : _this$getActiveItem.key) === dropTargetKey,
        data: getEntity(_this.state.keyEntities, dropTargetKey).node
      });
      var dropToChild = dragChildrenKeys.includes(dropTargetKey);
      warningOnce(!dropToChild, "Can not drop to dragNode's children node. This is a bug of rc-tree. Please report an issue.");
      var posArr = posToArr(dropTargetPos);
      var dropResult = {
        event,
        node: convertNodePropsToEventData(abstractDropNodeProps),
        dragNode: _this.dragNodeProps ? convertNodePropsToEventData(_this.dragNodeProps) : null,
        dragNodesKeys: [_this.dragNodeProps.eventKey].concat(dragChildrenKeys),
        dropToGap: dropPosition !== 0,
        dropPosition: dropPosition + Number(posArr[posArr.length - 1])
      };
      if (!outsideTree) {
        onDrop === null || onDrop === void 0 || onDrop(dropResult);
      }
      _this.dragNodeProps = null;
    });
    _defineProperty(_assertThisInitialized(_this), "cleanDragState", function() {
      var draggingNodeKey = _this.state.draggingNodeKey;
      if (draggingNodeKey !== null) {
        _this.setState({
          draggingNodeKey: null,
          dropPosition: null,
          dropContainerKey: null,
          dropTargetKey: null,
          dropLevelOffset: null,
          dropAllowed: true,
          dragOverNodeKey: null
        });
      }
      _this.dragStartMousePosition = null;
      _this.currentMouseOverDroppableNodeKey = null;
    });
    _defineProperty(_assertThisInitialized(_this), "triggerExpandActionExpand", function(e, treeNode) {
      var _this$state5 = _this.state, expandedKeys = _this$state5.expandedKeys, flattenNodes = _this$state5.flattenNodes;
      var expanded = treeNode.expanded, key = treeNode.key, isLeaf = treeNode.isLeaf;
      if (isLeaf || e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
      }
      var node = flattenNodes.filter(function(nodeItem) {
        return nodeItem.key === key;
      })[0];
      var eventNode = convertNodePropsToEventData(_objectSpread2(_objectSpread2({}, getTreeNodeProps(key, _this.getTreeNodeRequiredProps())), {}, {
        data: node.data
      }));
      _this.setExpandedKeys(expanded ? arrDel(expandedKeys, key) : arrAdd(expandedKeys, key));
      _this.onNodeExpand(e, eventNode);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeClick", function(e, treeNode) {
      var _this$props3 = _this.props, onClick = _this$props3.onClick, expandAction = _this$props3.expandAction;
      if (expandAction === "click") {
        _this.triggerExpandActionExpand(e, treeNode);
      }
      onClick === null || onClick === void 0 || onClick(e, treeNode);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDoubleClick", function(e, treeNode) {
      var _this$props4 = _this.props, onDoubleClick = _this$props4.onDoubleClick, expandAction = _this$props4.expandAction;
      if (expandAction === "doubleClick") {
        _this.triggerExpandActionExpand(e, treeNode);
      }
      onDoubleClick === null || onDoubleClick === void 0 || onDoubleClick(e, treeNode);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeSelect", function(e, treeNode) {
      var selectedKeys = _this.state.selectedKeys;
      var _this$state6 = _this.state, keyEntities = _this$state6.keyEntities, fieldNames = _this$state6.fieldNames;
      var _this$props5 = _this.props, onSelect = _this$props5.onSelect, multiple = _this$props5.multiple;
      var selected = treeNode.selected;
      var key = treeNode[fieldNames.key];
      var targetSelected = !selected;
      if (!targetSelected) {
        selectedKeys = arrDel(selectedKeys, key);
      } else if (!multiple) {
        selectedKeys = [key];
      } else {
        selectedKeys = arrAdd(selectedKeys, key);
      }
      var selectedNodes = selectedKeys.map(function(selectedKey) {
        var entity = getEntity(keyEntities, selectedKey);
        return entity ? entity.node : null;
      }).filter(Boolean);
      _this.setUncontrolledState({
        selectedKeys
      });
      onSelect === null || onSelect === void 0 || onSelect(selectedKeys, {
        event: "select",
        selected: targetSelected,
        node: treeNode,
        selectedNodes,
        nativeEvent: e.nativeEvent
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeCheck", function(e, treeNode, checked) {
      var _this$state7 = _this.state, keyEntities = _this$state7.keyEntities, oriCheckedKeys = _this$state7.checkedKeys, oriHalfCheckedKeys = _this$state7.halfCheckedKeys;
      var _this$props6 = _this.props, checkStrictly = _this$props6.checkStrictly, onCheck = _this$props6.onCheck;
      var key = treeNode.key;
      var checkedObj;
      var eventObj = {
        event: "check",
        node: treeNode,
        checked,
        nativeEvent: e.nativeEvent
      };
      if (checkStrictly) {
        var checkedKeys = checked ? arrAdd(oriCheckedKeys, key) : arrDel(oriCheckedKeys, key);
        var halfCheckedKeys = arrDel(oriHalfCheckedKeys, key);
        checkedObj = {
          checked: checkedKeys,
          halfChecked: halfCheckedKeys
        };
        eventObj.checkedNodes = checkedKeys.map(function(checkedKey) {
          return getEntity(keyEntities, checkedKey);
        }).filter(Boolean).map(function(entity) {
          return entity.node;
        });
        _this.setUncontrolledState({
          checkedKeys
        });
      } else {
        var _conductCheck = conductCheck([].concat(_toConsumableArray(oriCheckedKeys), [key]), true, keyEntities), _checkedKeys = _conductCheck.checkedKeys, _halfCheckedKeys = _conductCheck.halfCheckedKeys;
        if (!checked) {
          var keySet = new Set(_checkedKeys);
          keySet.delete(key);
          var _conductCheck2 = conductCheck(Array.from(keySet), {
            halfCheckedKeys: _halfCheckedKeys
          }, keyEntities);
          _checkedKeys = _conductCheck2.checkedKeys;
          _halfCheckedKeys = _conductCheck2.halfCheckedKeys;
        }
        checkedObj = _checkedKeys;
        eventObj.checkedNodes = [];
        eventObj.checkedNodesPositions = [];
        eventObj.halfCheckedKeys = _halfCheckedKeys;
        _checkedKeys.forEach(function(checkedKey) {
          var entity = getEntity(keyEntities, checkedKey);
          if (!entity) return;
          var node = entity.node, pos = entity.pos;
          eventObj.checkedNodes.push(node);
          eventObj.checkedNodesPositions.push({
            node,
            pos
          });
        });
        _this.setUncontrolledState({
          checkedKeys: _checkedKeys
        }, false, {
          halfCheckedKeys: _halfCheckedKeys
        });
      }
      onCheck === null || onCheck === void 0 || onCheck(checkedObj, eventObj);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeLoad", function(treeNode) {
      var _entity$children;
      var key = treeNode.key;
      var keyEntities = _this.state.keyEntities;
      var entity = getEntity(keyEntities, key);
      if (entity !== null && entity !== void 0 && (_entity$children = entity.children) !== null && _entity$children !== void 0 && _entity$children.length) {
        return;
      }
      var loadPromise = new Promise(function(resolve, reject) {
        _this.setState(function(_ref) {
          var _ref$loadedKeys = _ref.loadedKeys, loadedKeys = _ref$loadedKeys === void 0 ? [] : _ref$loadedKeys, _ref$loadingKeys = _ref.loadingKeys, loadingKeys = _ref$loadingKeys === void 0 ? [] : _ref$loadingKeys;
          var _this$props7 = _this.props, loadData = _this$props7.loadData, onLoad = _this$props7.onLoad;
          if (!loadData || loadedKeys.includes(key) || loadingKeys.includes(key)) {
            return null;
          }
          var promise = loadData(treeNode);
          promise.then(function() {
            var currentLoadedKeys = _this.state.loadedKeys;
            var newLoadedKeys = arrAdd(currentLoadedKeys, key);
            onLoad === null || onLoad === void 0 || onLoad(newLoadedKeys, {
              event: "load",
              node: treeNode
            });
            _this.setUncontrolledState({
              loadedKeys: newLoadedKeys
            });
            _this.setState(function(prevState) {
              return {
                loadingKeys: arrDel(prevState.loadingKeys, key)
              };
            });
            resolve();
          }).catch(function(e) {
            _this.setState(function(prevState) {
              return {
                loadingKeys: arrDel(prevState.loadingKeys, key)
              };
            });
            _this.loadingRetryTimes[key] = (_this.loadingRetryTimes[key] || 0) + 1;
            if (_this.loadingRetryTimes[key] >= MAX_RETRY_TIMES) {
              var currentLoadedKeys = _this.state.loadedKeys;
              warningOnce(false, "Retry for `loadData` many times but still failed. No more retry.");
              _this.setUncontrolledState({
                loadedKeys: arrAdd(currentLoadedKeys, key)
              });
              resolve();
            }
            reject(e);
          });
          return {
            loadingKeys: arrAdd(loadingKeys, key)
          };
        });
      });
      loadPromise.catch(function() {
      });
      return loadPromise;
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeMouseEnter", function(event, node) {
      var onMouseEnter = _this.props.onMouseEnter;
      onMouseEnter === null || onMouseEnter === void 0 || onMouseEnter({
        event,
        node
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeMouseLeave", function(event, node) {
      var onMouseLeave = _this.props.onMouseLeave;
      onMouseLeave === null || onMouseLeave === void 0 || onMouseLeave({
        event,
        node
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeContextMenu", function(event, node) {
      var onRightClick = _this.props.onRightClick;
      if (onRightClick) {
        event.preventDefault();
        onRightClick({
          event,
          node
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onFocus", function() {
      var onFocus = _this.props.onFocus;
      _this.setState({
        focused: true
      });
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      onFocus === null || onFocus === void 0 || onFocus.apply(void 0, args);
    });
    _defineProperty(_assertThisInitialized(_this), "onBlur", function() {
      var onBlur = _this.props.onBlur;
      _this.setState({
        focused: false
      });
      _this.onActiveChange(null);
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      onBlur === null || onBlur === void 0 || onBlur.apply(void 0, args);
    });
    _defineProperty(_assertThisInitialized(_this), "getTreeNodeRequiredProps", function() {
      var _this$state8 = _this.state, expandedKeys = _this$state8.expandedKeys, selectedKeys = _this$state8.selectedKeys, loadedKeys = _this$state8.loadedKeys, loadingKeys = _this$state8.loadingKeys, checkedKeys = _this$state8.checkedKeys, halfCheckedKeys = _this$state8.halfCheckedKeys, dragOverNodeKey = _this$state8.dragOverNodeKey, dropPosition = _this$state8.dropPosition, keyEntities = _this$state8.keyEntities;
      return {
        expandedKeys: expandedKeys || [],
        selectedKeys: selectedKeys || [],
        loadedKeys: loadedKeys || [],
        loadingKeys: loadingKeys || [],
        checkedKeys: checkedKeys || [],
        halfCheckedKeys: halfCheckedKeys || [],
        dragOverNodeKey,
        dropPosition,
        keyEntities
      };
    });
    _defineProperty(_assertThisInitialized(_this), "setExpandedKeys", function(expandedKeys) {
      var _this$state9 = _this.state, treeData = _this$state9.treeData, fieldNames = _this$state9.fieldNames;
      var flattenNodes = flattenTreeData(treeData, expandedKeys, fieldNames);
      _this.setUncontrolledState({
        expandedKeys,
        flattenNodes
      }, true);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeExpand", function(e, treeNode) {
      var expandedKeys = _this.state.expandedKeys;
      var _this$state10 = _this.state, listChanging = _this$state10.listChanging, fieldNames = _this$state10.fieldNames;
      var _this$props8 = _this.props, onExpand = _this$props8.onExpand, loadData = _this$props8.loadData;
      var expanded = treeNode.expanded;
      var key = treeNode[fieldNames.key];
      if (listChanging) {
        return;
      }
      var certain = expandedKeys.includes(key);
      var targetExpanded = !expanded;
      warningOnce(expanded && certain || !expanded && !certain, "Expand state not sync with index check");
      expandedKeys = targetExpanded ? arrAdd(expandedKeys, key) : arrDel(expandedKeys, key);
      _this.setExpandedKeys(expandedKeys);
      onExpand === null || onExpand === void 0 || onExpand(expandedKeys, {
        node: treeNode,
        expanded: targetExpanded,
        nativeEvent: e.nativeEvent
      });
      if (targetExpanded && loadData) {
        var loadPromise = _this.onNodeLoad(treeNode);
        if (loadPromise) {
          loadPromise.then(function() {
            var newFlattenTreeData = flattenTreeData(_this.state.treeData, expandedKeys, fieldNames);
            _this.setUncontrolledState({
              flattenNodes: newFlattenTreeData
            });
          }).catch(function() {
            var currentExpandedKeys = _this.state.expandedKeys;
            var expandedKeysToRestore = arrDel(currentExpandedKeys, key);
            _this.setExpandedKeys(expandedKeysToRestore);
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onListChangeStart", function() {
      _this.setUncontrolledState({
        listChanging: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onListChangeEnd", function() {
      setTimeout(function() {
        _this.setUncontrolledState({
          listChanging: false
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onActiveChange", function(newActiveKey) {
      var activeKey = _this.state.activeKey;
      var _this$props9 = _this.props, onActiveChange = _this$props9.onActiveChange, _this$props9$itemScro = _this$props9.itemScrollOffset, itemScrollOffset = _this$props9$itemScro === void 0 ? 0 : _this$props9$itemScro;
      if (activeKey === newActiveKey) {
        return;
      }
      _this.setState({
        activeKey: newActiveKey
      });
      if (newActiveKey !== null) {
        _this.scrollTo({
          key: newActiveKey,
          offset: itemScrollOffset
        });
      }
      onActiveChange === null || onActiveChange === void 0 || onActiveChange(newActiveKey);
    });
    _defineProperty(_assertThisInitialized(_this), "getActiveItem", function() {
      var _this$state11 = _this.state, activeKey = _this$state11.activeKey, flattenNodes = _this$state11.flattenNodes;
      if (activeKey === null) {
        return null;
      }
      return flattenNodes.find(function(_ref2) {
        var key = _ref2.key;
        return key === activeKey;
      }) || null;
    });
    _defineProperty(_assertThisInitialized(_this), "offsetActiveKey", function(offset2) {
      var _this$state12 = _this.state, flattenNodes = _this$state12.flattenNodes, activeKey = _this$state12.activeKey;
      var index = flattenNodes.findIndex(function(_ref3) {
        var key = _ref3.key;
        return key === activeKey;
      });
      if (index === -1 && offset2 < 0) {
        index = flattenNodes.length;
      }
      index = (index + offset2 + flattenNodes.length) % flattenNodes.length;
      var item = flattenNodes[index];
      if (item) {
        var _key4 = item.key;
        _this.onActiveChange(_key4);
      } else {
        _this.onActiveChange(null);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function(event) {
      var _this$state13 = _this.state, activeKey = _this$state13.activeKey, expandedKeys = _this$state13.expandedKeys, checkedKeys = _this$state13.checkedKeys, fieldNames = _this$state13.fieldNames;
      var _this$props10 = _this.props, onKeyDown2 = _this$props10.onKeyDown, checkable = _this$props10.checkable, selectable = _this$props10.selectable;
      switch (event.which) {
        case KeyCode.UP: {
          _this.offsetActiveKey(-1);
          event.preventDefault();
          break;
        }
        case KeyCode.DOWN: {
          _this.offsetActiveKey(1);
          event.preventDefault();
          break;
        }
      }
      var activeItem = _this.getActiveItem();
      if (activeItem && activeItem.data) {
        var treeNodeRequiredProps = _this.getTreeNodeRequiredProps();
        var expandable = activeItem.data.isLeaf === false || !!(activeItem.data[fieldNames.children] || []).length;
        var eventNode = convertNodePropsToEventData(_objectSpread2(_objectSpread2({}, getTreeNodeProps(activeKey, treeNodeRequiredProps)), {}, {
          data: activeItem.data,
          active: true
        }));
        switch (event.which) {
          case KeyCode.LEFT: {
            if (expandable && expandedKeys.includes(activeKey)) {
              _this.onNodeExpand({}, eventNode);
            } else if (activeItem.parent) {
              _this.onActiveChange(activeItem.parent.key);
            }
            event.preventDefault();
            break;
          }
          case KeyCode.RIGHT: {
            if (expandable && !expandedKeys.includes(activeKey)) {
              _this.onNodeExpand({}, eventNode);
            } else if (activeItem.children && activeItem.children.length) {
              _this.onActiveChange(activeItem.children[0].key);
            }
            event.preventDefault();
            break;
          }
          case KeyCode.ENTER:
          case KeyCode.SPACE: {
            if (checkable && !eventNode.disabled && eventNode.checkable !== false && !eventNode.disableCheckbox) {
              _this.onNodeCheck({}, eventNode, !checkedKeys.includes(activeKey));
            } else if (!checkable && selectable && !eventNode.disabled && eventNode.selectable !== false) {
              _this.onNodeSelect({}, eventNode);
            }
            break;
          }
        }
      }
      onKeyDown2 === null || onKeyDown2 === void 0 || onKeyDown2(event);
    });
    _defineProperty(_assertThisInitialized(_this), "setUncontrolledState", function(state) {
      var atomic = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var forceState = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!_this.destroyed) {
        var needSync = false;
        var allPassed = true;
        var newState = {};
        Object.keys(state).forEach(function(name) {
          if (_this.props.hasOwnProperty(name)) {
            allPassed = false;
            return;
          }
          needSync = true;
          newState[name] = state[name];
        });
        if (needSync && (!atomic || allPassed)) {
          _this.setState(_objectSpread2(_objectSpread2({}, newState), forceState));
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "scrollTo", function(scroll) {
      _this.listRef.current.scrollTo(scroll);
    });
    return _this;
  }
  _createClass(Tree2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.destroyed = false;
      this.onUpdated();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.onUpdated();
    }
  }, {
    key: "onUpdated",
    value: function onUpdated() {
      var _this$props11 = this.props, activeKey = _this$props11.activeKey, _this$props11$itemScr = _this$props11.itemScrollOffset, itemScrollOffset = _this$props11$itemScr === void 0 ? 0 : _this$props11$itemScr;
      if (activeKey !== void 0 && activeKey !== this.state.activeKey) {
        this.setState({
          activeKey
        });
        if (activeKey !== null) {
          this.scrollTo({
            key: activeKey,
            offset: itemScrollOffset
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("dragend", this.onWindowDragEnd);
      this.destroyed = true;
    }
  }, {
    key: "resetDragState",
    value: function resetDragState() {
      this.setState({
        dragOverNodeKey: null,
        dropPosition: null,
        dropLevelOffset: null,
        dropTargetKey: null,
        dropContainerKey: null,
        dropTargetPos: null,
        dropAllowed: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state14 = this.state, focused = _this$state14.focused, flattenNodes = _this$state14.flattenNodes, keyEntities = _this$state14.keyEntities, draggingNodeKey = _this$state14.draggingNodeKey, activeKey = _this$state14.activeKey, dropLevelOffset = _this$state14.dropLevelOffset, dropContainerKey = _this$state14.dropContainerKey, dropTargetKey = _this$state14.dropTargetKey, dropPosition = _this$state14.dropPosition, dragOverNodeKey = _this$state14.dragOverNodeKey, indent = _this$state14.indent;
      var _this$props12 = this.props, prefixCls = _this$props12.prefixCls, className = _this$props12.className, style = _this$props12.style, showLine = _this$props12.showLine, focusable = _this$props12.focusable, _this$props12$tabInde = _this$props12.tabIndex, tabIndex = _this$props12$tabInde === void 0 ? 0 : _this$props12$tabInde, selectable = _this$props12.selectable, showIcon = _this$props12.showIcon, icon = _this$props12.icon, switcherIcon = _this$props12.switcherIcon, draggable = _this$props12.draggable, checkable = _this$props12.checkable, checkStrictly = _this$props12.checkStrictly, disabled = _this$props12.disabled, motion = _this$props12.motion, loadData = _this$props12.loadData, filterTreeNode = _this$props12.filterTreeNode, height = _this$props12.height, itemHeight = _this$props12.itemHeight, scrollWidth = _this$props12.scrollWidth, virtual = _this$props12.virtual, titleRender = _this$props12.titleRender, dropIndicatorRender2 = _this$props12.dropIndicatorRender, onContextMenu = _this$props12.onContextMenu, onScroll = _this$props12.onScroll, direction = _this$props12.direction, rootClassName = _this$props12.rootClassName, rootStyle = _this$props12.rootStyle;
      var domProps = pickAttrs(this.props, {
        aria: true,
        data: true
      });
      var draggableConfig;
      if (draggable) {
        if (_typeof(draggable) === "object") {
          draggableConfig = draggable;
        } else if (typeof draggable === "function") {
          draggableConfig = {
            nodeDraggable: draggable
          };
        } else {
          draggableConfig = {};
        }
      }
      var contextValue = {
        prefixCls,
        selectable,
        showIcon,
        icon,
        switcherIcon,
        draggable: draggableConfig,
        draggingNodeKey,
        checkable,
        checkStrictly,
        disabled,
        keyEntities,
        dropLevelOffset,
        dropContainerKey,
        dropTargetKey,
        dropPosition,
        dragOverNodeKey,
        indent,
        direction,
        dropIndicatorRender: dropIndicatorRender2,
        loadData,
        filterTreeNode,
        titleRender,
        onNodeClick: this.onNodeClick,
        onNodeDoubleClick: this.onNodeDoubleClick,
        onNodeExpand: this.onNodeExpand,
        onNodeSelect: this.onNodeSelect,
        onNodeCheck: this.onNodeCheck,
        onNodeLoad: this.onNodeLoad,
        onNodeMouseEnter: this.onNodeMouseEnter,
        onNodeMouseLeave: this.onNodeMouseLeave,
        onNodeContextMenu: this.onNodeContextMenu,
        onNodeDragStart: this.onNodeDragStart,
        onNodeDragEnter: this.onNodeDragEnter,
        onNodeDragOver: this.onNodeDragOver,
        onNodeDragLeave: this.onNodeDragLeave,
        onNodeDragEnd: this.onNodeDragEnd,
        onNodeDrop: this.onNodeDrop
      };
      return /* @__PURE__ */ reactExports.createElement(TreeContext.Provider, {
        value: contextValue
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: classNames(prefixCls, className, rootClassName, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-show-line"), showLine), "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-active-focused"), activeKey !== null)),
        style: rootStyle
      }, /* @__PURE__ */ reactExports.createElement(NodeList, _extends({
        ref: this.listRef,
        prefixCls,
        style,
        data: flattenNodes,
        disabled,
        selectable,
        checkable: !!checkable,
        motion,
        dragging: draggingNodeKey !== null,
        height,
        itemHeight,
        virtual,
        focusable,
        focused,
        tabIndex,
        activeItem: this.getActiveItem(),
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        onActiveChange: this.onActiveChange,
        onListChangeStart: this.onListChangeStart,
        onListChangeEnd: this.onListChangeEnd,
        onContextMenu,
        onScroll,
        scrollWidth
      }, this.getTreeNodeRequiredProps(), domProps))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, prevState) {
      var prevProps = prevState.prevProps;
      var newState = {
        prevProps: props
      };
      function needSync(name) {
        return !prevProps && props.hasOwnProperty(name) || prevProps && prevProps[name] !== props[name];
      }
      var treeData;
      var fieldNames = prevState.fieldNames;
      if (needSync("fieldNames")) {
        fieldNames = fillFieldNames(props.fieldNames);
        newState.fieldNames = fieldNames;
      }
      if (needSync("treeData")) {
        treeData = props.treeData;
      } else if (needSync("children")) {
        warningOnce(false, "`children` of Tree is deprecated. Please use `treeData` instead.");
        treeData = convertTreeToData(props.children);
      }
      if (treeData) {
        newState.treeData = treeData;
        var entitiesMap = convertDataToEntities(treeData, {
          fieldNames
        });
        newState.keyEntities = _objectSpread2(_defineProperty({}, MOTION_KEY, MotionEntity), entitiesMap.keyEntities);
      }
      var keyEntities = newState.keyEntities || prevState.keyEntities;
      if (needSync("expandedKeys") || prevProps && needSync("autoExpandParent")) {
        newState.expandedKeys = props.autoExpandParent || !prevProps && props.defaultExpandParent ? conductExpandParent(props.expandedKeys, keyEntities) : props.expandedKeys;
      } else if (!prevProps && props.defaultExpandAll) {
        var cloneKeyEntities = _objectSpread2({}, keyEntities);
        delete cloneKeyEntities[MOTION_KEY];
        var nextExpandedKeys = [];
        Object.keys(cloneKeyEntities).forEach(function(key) {
          var entity = cloneKeyEntities[key];
          if (entity.children && entity.children.length) {
            nextExpandedKeys.push(entity.key);
          }
        });
        newState.expandedKeys = nextExpandedKeys;
      } else if (!prevProps && props.defaultExpandedKeys) {
        newState.expandedKeys = props.autoExpandParent || props.defaultExpandParent ? conductExpandParent(props.defaultExpandedKeys, keyEntities) : props.defaultExpandedKeys;
      }
      if (!newState.expandedKeys) {
        delete newState.expandedKeys;
      }
      if (treeData || newState.expandedKeys) {
        var flattenNodes = flattenTreeData(treeData || prevState.treeData, newState.expandedKeys || prevState.expandedKeys, fieldNames);
        newState.flattenNodes = flattenNodes;
      }
      if (props.selectable) {
        if (needSync("selectedKeys")) {
          newState.selectedKeys = calcSelectedKeys(props.selectedKeys, props);
        } else if (!prevProps && props.defaultSelectedKeys) {
          newState.selectedKeys = calcSelectedKeys(props.defaultSelectedKeys, props);
        }
      }
      if (props.checkable) {
        var checkedKeyEntity;
        if (needSync("checkedKeys")) {
          checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {};
        } else if (!prevProps && props.defaultCheckedKeys) {
          checkedKeyEntity = parseCheckedKeys(props.defaultCheckedKeys) || {};
        } else if (treeData) {
          checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {
            checkedKeys: prevState.checkedKeys,
            halfCheckedKeys: prevState.halfCheckedKeys
          };
        }
        if (checkedKeyEntity) {
          var _checkedKeyEntity = checkedKeyEntity, _checkedKeyEntity$che = _checkedKeyEntity.checkedKeys, checkedKeys = _checkedKeyEntity$che === void 0 ? [] : _checkedKeyEntity$che, _checkedKeyEntity$hal = _checkedKeyEntity.halfCheckedKeys, halfCheckedKeys = _checkedKeyEntity$hal === void 0 ? [] : _checkedKeyEntity$hal;
          if (!props.checkStrictly) {
            var conductKeys = conductCheck(checkedKeys, true, keyEntities);
            checkedKeys = conductKeys.checkedKeys;
            halfCheckedKeys = conductKeys.halfCheckedKeys;
          }
          newState.checkedKeys = checkedKeys;
          newState.halfCheckedKeys = halfCheckedKeys;
        }
      }
      if (needSync("loadedKeys")) {
        newState.loadedKeys = props.loadedKeys;
      }
      return newState;
    }
  }]);
  return Tree2;
}(reactExports.Component);
_defineProperty(Tree$2, "defaultProps", {
  prefixCls: "rc-tree",
  showLine: false,
  showIcon: true,
  selectable: true,
  multiple: false,
  checkable: false,
  disabled: false,
  checkStrictly: false,
  draggable: false,
  defaultExpandParent: true,
  autoExpandParent: false,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: [],
  dropIndicatorRender: DropIndicator,
  allowDrop: function allowDrop() {
    return true;
  },
  expandAction: false
});
_defineProperty(Tree$2, "TreeNode", TreeNode);
var FileOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" } }] }, "name": "file", "theme": "outlined" };
var FileOutlined = function FileOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: FileOutlined$1
  }));
};
var RefIcon$8 = /* @__PURE__ */ reactExports.forwardRef(FileOutlined);
var FolderOpenOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 00-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z" } }] }, "name": "folder-open", "theme": "outlined" };
var FolderOpenOutlined = function FolderOpenOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: FolderOpenOutlined$1
  }));
};
var RefIcon$7 = /* @__PURE__ */ reactExports.forwardRef(FolderOpenOutlined);
var FolderOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z" } }] }, "name": "folder", "theme": "outlined" };
var FolderOutlined = function FolderOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: FolderOutlined$1
  }));
};
var RefIcon$6 = /* @__PURE__ */ reactExports.forwardRef(FolderOutlined);
var HolderOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z" } }] }, "name": "holder", "theme": "outlined" };
var HolderOutlined = function HolderOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: HolderOutlined$1
  }));
};
var RefIcon$5 = /* @__PURE__ */ reactExports.forwardRef(HolderOutlined);
const genDirectoryStyle = ({
  treeCls,
  treeNodeCls,
  directoryNodeSelectedBg,
  directoryNodeSelectedColor,
  motionDurationMid,
  borderRadius,
  controlItemBgHover
}) => ({
  [`${treeCls}${treeCls}-directory ${treeNodeCls}`]: {
    // >>> Title
    [`${treeCls}-node-content-wrapper`]: {
      position: "static",
      [`&:has(${treeCls}-drop-indicator)`]: {
        position: "relative"
      },
      [`> *:not(${treeCls}-drop-indicator)`]: {
        position: "relative"
      },
      "&:hover": {
        background: "transparent"
      },
      // Expand interactive area to whole line
      "&:before": {
        position: "absolute",
        inset: 0,
        transition: `background-color ${motionDurationMid}`,
        content: '""',
        borderRadius
      },
      "&:hover:before": {
        background: controlItemBgHover
      }
    },
    [`${treeCls}-switcher, ${treeCls}-checkbox, ${treeCls}-draggable-icon`]: {
      zIndex: 1
    },
    // ============= Selected =============
    "&-selected": {
      background: directoryNodeSelectedBg,
      borderRadius,
      [`${treeCls}-switcher, ${treeCls}-draggable-icon`]: {
        color: directoryNodeSelectedColor
      },
      // >>> Title
      [`${treeCls}-node-content-wrapper`]: {
        color: directoryNodeSelectedColor,
        background: "transparent",
        "&, &:hover": {
          color: directoryNodeSelectedColor
        },
        "&:before, &:hover:before": {
          background: directoryNodeSelectedBg
        }
      }
    }
  }
});
const treeNodeFX = new Keyframe("ant-tree-node-fx-do-not-use", {
  "0%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
});
const getSwitchStyle = (prefixCls, token) => ({
  [`.${prefixCls}-switcher-icon`]: {
    display: "inline-block",
    fontSize: 10,
    verticalAlign: "baseline",
    svg: {
      transition: `transform ${token.motionDurationSlow}`
    }
  }
});
const getDropIndicatorStyle = (prefixCls, token) => ({
  [`.${prefixCls}-drop-indicator`]: {
    position: "absolute",
    // it should displayed over the following node
    zIndex: 1,
    height: 2,
    backgroundColor: token.colorPrimary,
    borderRadius: 1,
    pointerEvents: "none",
    "&:after": {
      position: "absolute",
      top: -3,
      insetInlineStart: -6,
      width: 8,
      height: 8,
      backgroundColor: "transparent",
      border: `${unit(token.lineWidthBold)} solid ${token.colorPrimary}`,
      borderRadius: "50%",
      content: '""'
    }
  }
});
const genBaseStyle = (prefixCls, token) => {
  const {
    treeCls,
    treeNodeCls,
    treeNodePadding,
    titleHeight,
    indentSize,
    nodeSelectedBg,
    nodeHoverBg,
    colorTextQuaternary,
    controlItemBgActiveDisabled
  } = token;
  return {
    [treeCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      // fix https://github.com/ant-design/ant-design/issues/50316
      ["--rc-virtual-list-scrollbar-bg"]: token.colorSplit,
      background: token.colorBgContainer,
      borderRadius: token.borderRadius,
      transition: `background-color ${token.motionDurationSlow}`,
      "&-rtl": {
        direction: "rtl"
      },
      [`&${treeCls}-rtl ${treeCls}-switcher_close ${treeCls}-switcher-icon svg`]: {
        transform: "rotate(90deg)"
      },
      [`&-focused:not(:hover):not(${treeCls}-active-focused)`]: genFocusOutline(token),
      // =================== Virtual List ===================
      [`${treeCls}-list-holder-inner`]: {
        alignItems: "flex-start"
      },
      [`&${treeCls}-block-node`]: {
        [`${treeCls}-list-holder-inner`]: {
          alignItems: "stretch",
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            flex: "auto"
          },
          // >>> Drag
          [`${treeNodeCls}.dragging:after`]: {
            position: "absolute",
            inset: 0,
            border: `1px solid ${token.colorPrimary}`,
            opacity: 0,
            animationName: treeNodeFX,
            animationDuration: token.motionDurationSlow,
            animationPlayState: "running",
            animationFillMode: "forwards",
            content: '""',
            pointerEvents: "none",
            borderRadius: token.borderRadius
          }
        }
      },
      // ===================== TreeNode =====================
      [treeNodeCls]: {
        display: "flex",
        alignItems: "flex-start",
        marginBottom: treeNodePadding,
        lineHeight: unit(titleHeight),
        position: "relative",
        // 非常重要，避免 drop-indicator 在拖拽过程中闪烁
        "&:before": {
          content: '""',
          position: "absolute",
          zIndex: 1,
          insetInlineStart: 0,
          width: "100%",
          top: "100%",
          height: treeNodePadding
        },
        // Disabled
        [`&-disabled ${treeCls}-node-content-wrapper`]: {
          color: token.colorTextDisabled,
          cursor: "not-allowed",
          "&:hover": {
            background: "transparent"
          }
        },
        [`${treeCls}-checkbox-disabled + ${treeCls}-node-selected,&${treeNodeCls}-disabled${treeNodeCls}-selected ${treeCls}-node-content-wrapper`]: {
          backgroundColor: controlItemBgActiveDisabled
        },
        // we can not set pointer-events to none for checkbox in tree
        // ref: https://github.com/ant-design/ant-design/issues/39822#issuecomment-2605234058
        [`${treeCls}-checkbox-disabled`]: {
          pointerEvents: "unset"
        },
        // not disable
        [`&:not(${treeNodeCls}-disabled)`]: {
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            "&:hover": {
              color: token.nodeHoverColor
            }
          }
        },
        [`&-active ${treeCls}-node-content-wrapper`]: {
          background: token.controlItemBgHover
        },
        [`&:not(${treeNodeCls}-disabled).filter-node ${treeCls}-title`]: {
          color: token.colorPrimary,
          fontWeight: token.fontWeightStrong
        },
        "&-draggable": {
          cursor: "grab",
          [`${treeCls}-draggable-icon`]: {
            // https://github.com/ant-design/ant-design/issues/41915
            flexShrink: 0,
            width: titleHeight,
            textAlign: "center",
            visibility: "visible",
            color: colorTextQuaternary
          },
          [`&${treeNodeCls}-disabled ${treeCls}-draggable-icon`]: {
            visibility: "hidden"
          }
        }
      },
      // >>> Indent
      [`${treeCls}-indent`]: {
        alignSelf: "stretch",
        whiteSpace: "nowrap",
        userSelect: "none",
        "&-unit": {
          display: "inline-block",
          width: indentSize
        }
      },
      // >>> Drag Handler
      [`${treeCls}-draggable-icon`]: {
        visibility: "hidden"
      },
      // Switcher / Checkbox
      [`${treeCls}-switcher, ${treeCls}-checkbox`]: {
        marginInlineEnd: token.calc(token.calc(titleHeight).sub(token.controlInteractiveSize)).div(2).equal()
      },
      // >>> Switcher
      [`${treeCls}-switcher`]: Object.assign(Object.assign({}, getSwitchStyle(prefixCls, token)), {
        position: "relative",
        flex: "none",
        alignSelf: "stretch",
        width: titleHeight,
        textAlign: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: `all ${token.motionDurationSlow}`,
        "&-noop": {
          cursor: "unset"
        },
        "&:before": {
          pointerEvents: "none",
          content: '""',
          width: titleHeight,
          height: titleHeight,
          position: "absolute",
          left: {
            _skip_check_: true,
            value: 0
          },
          top: 0,
          borderRadius: token.borderRadius,
          transition: `all ${token.motionDurationSlow}`
        },
        [`&:not(${treeCls}-switcher-noop):hover:before`]: {
          backgroundColor: token.colorBgTextHover
        },
        [`&_close ${treeCls}-switcher-icon svg`]: {
          transform: "rotate(-90deg)"
        },
        "&-loading-icon": {
          color: token.colorPrimary
        },
        "&-leaf-line": {
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          width: "100%",
          height: "100%",
          // https://github.com/ant-design/ant-design/issues/31884
          "&:before": {
            position: "absolute",
            top: 0,
            insetInlineEnd: token.calc(titleHeight).div(2).equal(),
            bottom: token.calc(treeNodePadding).mul(-1).equal(),
            marginInlineStart: -1,
            borderInlineEnd: `1px solid ${token.colorBorder}`,
            content: '""'
          },
          "&:after": {
            position: "absolute",
            width: token.calc(token.calc(titleHeight).div(2).equal()).mul(0.8).equal(),
            height: token.calc(titleHeight).div(2).equal(),
            borderBottom: `1px solid ${token.colorBorder}`,
            content: '""'
          }
        }
      }),
      // >>> Title
      // add `${treeCls}-checkbox + span` to cover checkbox `${checkboxCls} + span`
      [`${treeCls}-node-content-wrapper`]: Object.assign(Object.assign({
        position: "relative",
        minHeight: titleHeight,
        paddingBlock: 0,
        paddingInline: token.paddingXS,
        background: "transparent",
        borderRadius: token.borderRadius,
        cursor: "pointer",
        transition: `all ${token.motionDurationMid}, border 0s, line-height 0s, box-shadow 0s`
      }, getDropIndicatorStyle(prefixCls, token)), {
        "&:hover": {
          backgroundColor: nodeHoverBg
        },
        [`&${treeCls}-node-selected`]: {
          color: token.nodeSelectedColor,
          backgroundColor: nodeSelectedBg
        },
        // Icon
        [`${treeCls}-iconEle`]: {
          display: "inline-block",
          width: titleHeight,
          height: titleHeight,
          textAlign: "center",
          verticalAlign: "top",
          "&:empty": {
            display: "none"
          }
        }
      }),
      // https://github.com/ant-design/ant-design/issues/28217
      [`${treeCls}-unselectable ${treeCls}-node-content-wrapper:hover`]: {
        backgroundColor: "transparent"
      },
      [`${treeNodeCls}.drop-container > [draggable]`]: {
        boxShadow: `0 0 0 2px ${token.colorPrimary}`
      },
      // ==================== Show Line =====================
      "&-show-line": {
        // ================ Indent lines ================
        [`${treeCls}-indent-unit`]: {
          position: "relative",
          height: "100%",
          "&:before": {
            position: "absolute",
            top: 0,
            insetInlineEnd: token.calc(titleHeight).div(2).equal(),
            bottom: token.calc(treeNodePadding).mul(-1).equal(),
            borderInlineEnd: `1px solid ${token.colorBorder}`,
            content: '""'
          },
          "&-end:before": {
            display: "none"
          }
        },
        // ============== Cover Background ==============
        [`${treeCls}-switcher`]: {
          background: "transparent",
          "&-line-icon": {
            // https://github.com/ant-design/ant-design/issues/32813
            verticalAlign: "-0.15em"
          }
        }
      },
      [`${treeNodeCls}-leaf-last ${treeCls}-switcher-leaf-line:before`]: {
        top: "auto !important",
        bottom: "auto !important",
        height: `${unit(token.calc(titleHeight).div(2).equal())} !important`
      }
    })
  };
};
const genTreeStyle = (prefixCls, token, enableDirectory = true) => {
  const treeCls = `.${prefixCls}`;
  const treeNodeCls = `${treeCls}-treenode`;
  const treeNodePadding = token.calc(token.paddingXS).div(2).equal();
  const treeToken = merge(token, {
    treeCls,
    treeNodeCls,
    treeNodePadding
  });
  return [
    // Basic
    genBaseStyle(prefixCls, treeToken),
    // Directory
    enableDirectory && genDirectoryStyle(treeToken)
  ].filter(Boolean);
};
const initComponentToken = (token) => {
  const {
    controlHeightSM,
    controlItemBgHover,
    controlItemBgActive
  } = token;
  const titleHeight = controlHeightSM;
  return {
    titleHeight,
    indentSize: titleHeight,
    nodeHoverBg: controlItemBgHover,
    nodeHoverColor: token.colorText,
    nodeSelectedBg: controlItemBgActive,
    nodeSelectedColor: token.colorText
  };
};
const prepareComponentToken$1 = (token) => {
  const {
    colorTextLightSolid,
    colorPrimary
  } = token;
  return Object.assign(Object.assign({}, initComponentToken(token)), {
    directoryNodeSelectedColor: colorTextLightSolid,
    directoryNodeSelectedBg: colorPrimary
  });
};
const useStyle$1 = genStyleHooks("Tree", (token, {
  prefixCls
}) => [{
  [token.componentCls]: getStyle(`${prefixCls}-checkbox`, token)
}, genTreeStyle(prefixCls, token), genCollapseMotion(token)], prepareComponentToken$1);
const offset = 4;
function dropIndicatorRender(props) {
  const {
    dropPosition,
    dropLevelOffset,
    prefixCls,
    indent,
    direction = "ltr"
  } = props;
  const startPosition = direction === "ltr" ? "left" : "right";
  const endPosition = direction === "ltr" ? "right" : "left";
  const style = {
    [startPosition]: -dropLevelOffset * indent + offset,
    [endPosition]: 0
  };
  switch (dropPosition) {
    case -1:
      style.top = -3;
      break;
    case 1:
      style.bottom = -3;
      break;
    default:
      style.bottom = -3;
      style[startPosition] = indent + offset;
      break;
  }
  return /* @__PURE__ */ React.createElement("div", {
    style,
    className: `${prefixCls}-drop-indicator`
  });
}
var CaretDownFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" } }] }, "name": "caret-down", "theme": "filled" };
var CaretDownFilled = function CaretDownFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: CaretDownFilled$1
  }));
};
var RefIcon$4 = /* @__PURE__ */ reactExports.forwardRef(CaretDownFilled);
var MinusSquareOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" } }, { "tag": "path", "attrs": { "d": "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" } }] }, "name": "minus-square", "theme": "outlined" };
var MinusSquareOutlined = function MinusSquareOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: MinusSquareOutlined$1
  }));
};
var RefIcon$3 = /* @__PURE__ */ reactExports.forwardRef(MinusSquareOutlined);
var PlusSquareOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" } }, { "tag": "path", "attrs": { "d": "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" } }] }, "name": "plus-square", "theme": "outlined" };
var PlusSquareOutlined = function PlusSquareOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: PlusSquareOutlined$1
  }));
};
var RefIcon$2 = /* @__PURE__ */ reactExports.forwardRef(PlusSquareOutlined);
const SwitcherIconCom = (props) => {
  var _a, _b;
  const {
    prefixCls,
    switcherIcon,
    treeNodeProps,
    showLine,
    switcherLoadingIcon
  } = props;
  const {
    isLeaf,
    expanded,
    loading
  } = treeNodeProps;
  if (loading) {
    if (/* @__PURE__ */ reactExports.isValidElement(switcherLoadingIcon)) {
      return switcherLoadingIcon;
    }
    return /* @__PURE__ */ reactExports.createElement(RefIcon$j, {
      className: `${prefixCls}-switcher-loading-icon`
    });
  }
  let showLeafIcon;
  if (showLine && typeof showLine === "object") {
    showLeafIcon = showLine.showLeafIcon;
  }
  if (isLeaf) {
    if (!showLine) {
      return null;
    }
    if (typeof showLeafIcon !== "boolean" && !!showLeafIcon) {
      const leafIcon = typeof showLeafIcon === "function" ? showLeafIcon(treeNodeProps) : showLeafIcon;
      const leafCls = `${prefixCls}-switcher-line-custom-icon`;
      if (/* @__PURE__ */ reactExports.isValidElement(leafIcon)) {
        return cloneElement(leafIcon, {
          className: classNames((_a = leafIcon.props) === null || _a === void 0 ? void 0 : _a.className, leafCls)
        });
      }
      return leafIcon;
    }
    return showLeafIcon ? /* @__PURE__ */ reactExports.createElement(RefIcon$8, {
      className: `${prefixCls}-switcher-line-icon`
    }) : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-switcher-leaf-line`
    });
  }
  const switcherCls = `${prefixCls}-switcher-icon`;
  const switcher = typeof switcherIcon === "function" ? switcherIcon(treeNodeProps) : switcherIcon;
  if (/* @__PURE__ */ reactExports.isValidElement(switcher)) {
    return cloneElement(switcher, {
      className: classNames((_b = switcher.props) === null || _b === void 0 ? void 0 : _b.className, switcherCls)
    });
  }
  if (switcher !== void 0) {
    return switcher;
  }
  if (showLine) {
    return expanded ? /* @__PURE__ */ reactExports.createElement(RefIcon$3, {
      className: `${prefixCls}-switcher-line-icon`
    }) : /* @__PURE__ */ reactExports.createElement(RefIcon$2, {
      className: `${prefixCls}-switcher-line-icon`
    });
  }
  return /* @__PURE__ */ reactExports.createElement(RefIcon$4, {
    className: switcherCls
  });
};
const Tree$1 = /* @__PURE__ */ React.forwardRef((props, ref) => {
  var _a;
  const {
    getPrefixCls,
    direction,
    virtual,
    tree
  } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon = false,
    showLine,
    switcherIcon,
    switcherLoadingIcon,
    blockNode = false,
    children,
    checkable = false,
    selectable = true,
    draggable,
    disabled,
    motion: customMotion,
    style
  } = props;
  const prefixCls = getPrefixCls("tree", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = disabled !== null && disabled !== void 0 ? disabled : contextDisabled;
  const motion = customMotion !== null && customMotion !== void 0 ? customMotion : Object.assign(Object.assign({}, initCollapseMotion(rootPrefixCls)), {
    motionAppear: false
  });
  const newProps = Object.assign(Object.assign({}, props), {
    checkable,
    selectable,
    showIcon,
    motion,
    blockNode,
    disabled: mergedDisabled,
    showLine: Boolean(showLine),
    dropIndicatorRender
  });
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const [, token] = useToken();
  const itemHeight = token.paddingXS / 2 + (((_a = token.Tree) === null || _a === void 0 ? void 0 : _a.titleHeight) || token.controlHeightSM);
  const draggableConfig = React.useMemo(() => {
    if (!draggable) {
      return false;
    }
    let mergedDraggable = {};
    switch (typeof draggable) {
      case "function":
        mergedDraggable.nodeDraggable = draggable;
        break;
      case "object":
        mergedDraggable = Object.assign({}, draggable);
        break;
    }
    if (mergedDraggable.icon !== false) {
      mergedDraggable.icon = mergedDraggable.icon || /* @__PURE__ */ React.createElement(RefIcon$5, null);
    }
    return mergedDraggable;
  }, [draggable]);
  const renderSwitcherIcon = (nodeProps) => /* @__PURE__ */ React.createElement(SwitcherIconCom, {
    prefixCls,
    switcherIcon,
    switcherLoadingIcon,
    treeNodeProps: nodeProps,
    showLine
  });
  return wrapCSSVar(
    // @ts-ignore
    /* @__PURE__ */ React.createElement(Tree$2, Object.assign({
      itemHeight,
      ref,
      virtual
    }, newProps, {
      // newProps may contain style so declare style below it
      style: Object.assign(Object.assign({}, tree === null || tree === void 0 ? void 0 : tree.style), style),
      prefixCls,
      className: classNames({
        [`${prefixCls}-icon-hide`]: !showIcon,
        [`${prefixCls}-block-node`]: blockNode,
        [`${prefixCls}-unselectable`]: !selectable,
        [`${prefixCls}-rtl`]: direction === "rtl",
        [`${prefixCls}-disabled`]: mergedDisabled
      }, tree === null || tree === void 0 ? void 0 : tree.className, className, hashId, cssVarCls),
      direction,
      checkable: checkable ? /* @__PURE__ */ React.createElement("span", {
        className: `${prefixCls}-checkbox-inner`
      }) : checkable,
      selectable,
      switcherIcon: renderSwitcherIcon,
      draggable: draggableConfig
    }), children)
  );
});
const RECORD_NONE = 0;
const RECORD_START = 1;
const RECORD_END = 2;
function traverseNodesKey(treeData, callback, fieldNames) {
  const {
    key: fieldKey,
    children: fieldChildren
  } = fieldNames;
  function processNode(dataNode) {
    const key = dataNode[fieldKey];
    const children = dataNode[fieldChildren];
    if (callback(key, dataNode) !== false) {
      traverseNodesKey(children || [], callback, fieldNames);
    }
  }
  treeData.forEach(processNode);
}
function calcRangeKeys({
  treeData,
  expandedKeys,
  startKey,
  endKey,
  fieldNames
}) {
  const keys = [];
  let record = RECORD_NONE;
  if (startKey && startKey === endKey) {
    return [startKey];
  }
  if (!startKey || !endKey) {
    return [];
  }
  function matchKey(key) {
    return key === startKey || key === endKey;
  }
  traverseNodesKey(treeData, (key) => {
    if (record === RECORD_END) {
      return false;
    }
    if (matchKey(key)) {
      keys.push(key);
      if (record === RECORD_NONE) {
        record = RECORD_START;
      } else if (record === RECORD_START) {
        record = RECORD_END;
        return false;
      }
    } else if (record === RECORD_START) {
      keys.push(key);
    }
    return expandedKeys.includes(key);
  }, fillFieldNames(fieldNames));
  return keys;
}
function convertDirectoryKeysToNodes(treeData, keys, fieldNames) {
  const restKeys = _toConsumableArray(keys);
  const nodes = [];
  traverseNodesKey(treeData, (key, node) => {
    const index = restKeys.indexOf(key);
    if (index !== -1) {
      nodes.push(node);
      restKeys.splice(index, 1);
    }
    return !!restKeys.length;
  }, fillFieldNames(fieldNames));
  return nodes;
}
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getIcon(props) {
  const {
    isLeaf,
    expanded
  } = props;
  if (isLeaf) {
    return /* @__PURE__ */ reactExports.createElement(RefIcon$8, null);
  }
  return expanded ? /* @__PURE__ */ reactExports.createElement(RefIcon$7, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$6, null);
}
function getTreeData({
  treeData,
  children
}) {
  return treeData || convertTreeToData(children);
}
const DirectoryTree = (_a, ref) => {
  var {
    defaultExpandAll,
    defaultExpandParent,
    defaultExpandedKeys
  } = _a, props = __rest$1(_a, ["defaultExpandAll", "defaultExpandParent", "defaultExpandedKeys"]);
  const lastSelectedKey = reactExports.useRef(null);
  const cachedSelectedKeys = reactExports.useRef(null);
  const getInitExpandedKeys = () => {
    const {
      keyEntities
    } = convertDataToEntities(getTreeData(props), {
      fieldNames: props.fieldNames
    });
    let initExpandedKeys;
    if (defaultExpandAll) {
      initExpandedKeys = Object.keys(keyEntities);
    } else if (defaultExpandParent) {
      initExpandedKeys = conductExpandParent(props.expandedKeys || defaultExpandedKeys || [], keyEntities);
    } else {
      initExpandedKeys = props.expandedKeys || defaultExpandedKeys || [];
    }
    return initExpandedKeys;
  };
  const [selectedKeys, setSelectedKeys] = reactExports.useState(props.selectedKeys || props.defaultSelectedKeys || []);
  const [expandedKeys, setExpandedKeys] = reactExports.useState(() => getInitExpandedKeys());
  reactExports.useEffect(() => {
    if ("selectedKeys" in props) {
      setSelectedKeys(props.selectedKeys);
    }
  }, [props.selectedKeys]);
  reactExports.useEffect(() => {
    if ("expandedKeys" in props) {
      setExpandedKeys(props.expandedKeys);
    }
  }, [props.expandedKeys]);
  const onExpand = (keys, info) => {
    var _a2;
    if (!("expandedKeys" in props)) {
      setExpandedKeys(keys);
    }
    return (_a2 = props.onExpand) === null || _a2 === void 0 ? void 0 : _a2.call(props, keys, info);
  };
  const onSelect = (keys, event) => {
    var _a2;
    const {
      multiple,
      fieldNames
    } = props;
    const {
      node,
      nativeEvent
    } = event;
    const {
      key = ""
    } = node;
    const treeData = getTreeData(props);
    const newEvent = Object.assign(Object.assign({}, event), {
      selected: true
    });
    const ctrlPick = (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.ctrlKey) || (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.metaKey);
    const shiftPick = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.shiftKey;
    let newSelectedKeys;
    if (multiple && ctrlPick) {
      newSelectedKeys = keys;
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
    } else if (multiple && shiftPick) {
      newSelectedKeys = Array.from(new Set([].concat(_toConsumableArray(cachedSelectedKeys.current || []), _toConsumableArray(calcRangeKeys({
        treeData,
        expandedKeys,
        startKey: key,
        endKey: lastSelectedKey.current,
        fieldNames
      })))));
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
    } else {
      newSelectedKeys = [key];
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
    }
    (_a2 = props.onSelect) === null || _a2 === void 0 ? void 0 : _a2.call(props, newSelectedKeys, newEvent);
    if (!("selectedKeys" in props)) {
      setSelectedKeys(newSelectedKeys);
    }
  };
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon = true,
    expandAction = "click"
  } = props, otherProps = __rest$1(props, ["prefixCls", "className", "showIcon", "expandAction"]);
  const prefixCls = getPrefixCls("tree", customizePrefixCls);
  const connectClassName = classNames(`${prefixCls}-directory`, {
    [`${prefixCls}-directory-rtl`]: direction === "rtl"
  }, className);
  return /* @__PURE__ */ reactExports.createElement(Tree$1, Object.assign({
    icon: getIcon,
    ref,
    blockNode: true
  }, otherProps, {
    showIcon,
    expandAction,
    prefixCls,
    className: connectClassName,
    expandedKeys,
    selectedKeys,
    onSelect,
    onExpand
  }));
};
const ForwardDirectoryTree = /* @__PURE__ */ reactExports.forwardRef(DirectoryTree);
const Tree = Tree$1;
Tree.DirectoryTree = ForwardDirectoryTree;
Tree.TreeNode = TreeNode;
const FilterSearch = (props) => {
  const {
    value,
    filterSearch,
    tablePrefixCls,
    locale: locale2,
    onChange
  } = props;
  if (!filterSearch) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${tablePrefixCls}-filter-dropdown-search`
  }, /* @__PURE__ */ reactExports.createElement(Input$1, {
    prefix: /* @__PURE__ */ reactExports.createElement(RefIcon$k, null),
    placeholder: locale2.filterSearchPlaceholder,
    onChange,
    value,
    // for skip min-width of input
    htmlSize: 1,
    className: `${tablePrefixCls}-filter-dropdown-search-input`
  }));
};
const onKeyDown = (event) => {
  const {
    keyCode
  } = event;
  if (keyCode === KeyCode.ENTER) {
    event.stopPropagation();
  }
};
const FilterDropdownMenuWrapper = /* @__PURE__ */ reactExports.forwardRef((props, ref) => /* @__PURE__ */ reactExports.createElement("div", {
  className: props.className,
  onClick: (e) => e.stopPropagation(),
  onKeyDown,
  ref
}, props.children));
function flattenKeys(filters) {
  let keys = [];
  (filters || []).forEach(({
    value,
    children
  }) => {
    keys.push(value);
    if (children) {
      keys = [].concat(_toConsumableArray(keys), _toConsumableArray(flattenKeys(children)));
    }
  });
  return keys;
}
function hasSubMenu(filters) {
  return filters.some(({
    children
  }) => children);
}
function searchValueMatched(searchValue, text) {
  if (typeof text === "string" || typeof text === "number") {
    return text === null || text === void 0 ? void 0 : text.toString().toLowerCase().includes(searchValue.trim().toLowerCase());
  }
  return false;
}
function renderFilterItems({
  filters,
  prefixCls,
  filteredKeys,
  filterMultiple,
  searchValue,
  filterSearch
}) {
  return filters.map((filter, index) => {
    const key = String(filter.value);
    if (filter.children) {
      return {
        key: key || index,
        label: filter.text,
        popupClassName: `${prefixCls}-dropdown-submenu`,
        children: renderFilterItems({
          filters: filter.children,
          prefixCls,
          filteredKeys,
          filterMultiple,
          searchValue,
          filterSearch
        })
      };
    }
    const Component = filterMultiple ? Checkbox : Radio;
    const item = {
      key: filter.value !== void 0 ? key : index,
      label: /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Component, {
        checked: filteredKeys.includes(key)
      }), /* @__PURE__ */ reactExports.createElement("span", null, filter.text))
    };
    if (searchValue.trim()) {
      if (typeof filterSearch === "function") {
        return filterSearch(searchValue, filter) ? item : null;
      }
      return searchValueMatched(searchValue, filter.text) ? item : null;
    }
    return item;
  });
}
function wrapStringListType(keys) {
  return keys || [];
}
const FilterDropdown = (props) => {
  var _a, _b, _c, _d;
  const {
    tablePrefixCls,
    prefixCls,
    column,
    dropdownPrefixCls,
    columnKey,
    filterOnClose,
    filterMultiple,
    filterMode = "menu",
    filterSearch = false,
    filterState,
    triggerFilter,
    locale: locale2,
    children,
    getPopupContainer,
    rootClassName
  } = props;
  const {
    filterResetToDefaultFilteredValue,
    defaultFilteredValue,
    filterDropdownProps = {},
    // Deprecated
    filterDropdownOpen,
    filterDropdownVisible,
    onFilterDropdownVisibleChange,
    onFilterDropdownOpenChange
  } = column;
  const [visible, setVisible] = reactExports.useState(false);
  const filtered = !!(filterState && (((_a = filterState.filteredKeys) === null || _a === void 0 ? void 0 : _a.length) || filterState.forceFiltered));
  const triggerVisible = (newVisible) => {
    var _a2;
    setVisible(newVisible);
    (_a2 = filterDropdownProps.onOpenChange) === null || _a2 === void 0 ? void 0 : _a2.call(filterDropdownProps, newVisible);
    onFilterDropdownOpenChange === null || onFilterDropdownOpenChange === void 0 ? void 0 : onFilterDropdownOpenChange(newVisible);
    onFilterDropdownVisibleChange === null || onFilterDropdownVisibleChange === void 0 ? void 0 : onFilterDropdownVisibleChange(newVisible);
  };
  const mergedVisible = (_d = (_c = (_b = filterDropdownProps.open) !== null && _b !== void 0 ? _b : filterDropdownOpen) !== null && _c !== void 0 ? _c : filterDropdownVisible) !== null && _d !== void 0 ? _d : visible;
  const propFilteredKeys = filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys;
  const [getFilteredKeysSync, setFilteredKeysSync] = useSyncState$1(wrapStringListType(propFilteredKeys));
  const onSelectKeys = ({
    selectedKeys
  }) => {
    setFilteredKeysSync(selectedKeys);
  };
  const onCheck = (keys, {
    node,
    checked
  }) => {
    if (!filterMultiple) {
      onSelectKeys({
        selectedKeys: checked && node.key ? [node.key] : []
      });
    } else {
      onSelectKeys({
        selectedKeys: keys
      });
    }
  };
  reactExports.useEffect(() => {
    if (!visible) {
      return;
    }
    onSelectKeys({
      selectedKeys: wrapStringListType(propFilteredKeys)
    });
  }, [propFilteredKeys]);
  const [openKeys, setOpenKeys] = reactExports.useState([]);
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };
  const [searchValue, setSearchValue] = reactExports.useState("");
  const onSearch = (e) => {
    const {
      value
    } = e.target;
    setSearchValue(value);
  };
  reactExports.useEffect(() => {
    if (!visible) {
      setSearchValue("");
    }
  }, [visible]);
  const internalTriggerFilter = (keys) => {
    const mergedKeys = (keys === null || keys === void 0 ? void 0 : keys.length) ? keys : null;
    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }
    if (isEqual(mergedKeys, filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys, true)) {
      return null;
    }
    triggerFilter({
      column,
      key: columnKey,
      filteredKeys: mergedKeys
    });
  };
  const onConfirm = () => {
    triggerVisible(false);
    internalTriggerFilter(getFilteredKeysSync());
  };
  const onReset = ({
    confirm,
    closeDropdown
  } = {
    confirm: false,
    closeDropdown: false
  }) => {
    if (confirm) {
      internalTriggerFilter([]);
    }
    if (closeDropdown) {
      triggerVisible(false);
    }
    setSearchValue("");
    if (filterResetToDefaultFilteredValue) {
      setFilteredKeysSync((defaultFilteredValue || []).map((key) => String(key)));
    } else {
      setFilteredKeysSync([]);
    }
  };
  const doFilter = ({
    closeDropdown
  } = {
    closeDropdown: true
  }) => {
    if (closeDropdown) {
      triggerVisible(false);
    }
    internalTriggerFilter(getFilteredKeysSync());
  };
  const onVisibleChange = (newVisible, info) => {
    if (info.source === "trigger") {
      if (newVisible && propFilteredKeys !== void 0) {
        setFilteredKeysSync(wrapStringListType(propFilteredKeys));
      }
      triggerVisible(newVisible);
      if (!newVisible && !column.filterDropdown && filterOnClose) {
        onConfirm();
      }
    }
  };
  const dropdownMenuClass = classNames({
    [`${dropdownPrefixCls}-menu-without-submenu`]: !hasSubMenu(column.filters || [])
  });
  const onCheckAll = (e) => {
    if (e.target.checked) {
      const allFilterKeys = flattenKeys(column === null || column === void 0 ? void 0 : column.filters).map((key) => String(key));
      setFilteredKeysSync(allFilterKeys);
    } else {
      setFilteredKeysSync([]);
    }
  };
  const getTreeData2 = ({
    filters
  }) => (filters || []).map((filter, index) => {
    const key = String(filter.value);
    const item = {
      title: filter.text,
      key: filter.value !== void 0 ? key : String(index)
    };
    if (filter.children) {
      item.children = getTreeData2({
        filters: filter.children
      });
    }
    return item;
  });
  const getFilterData2 = (node) => {
    var _a2;
    return Object.assign(Object.assign({}, node), {
      text: node.title,
      value: node.key,
      children: ((_a2 = node.children) === null || _a2 === void 0 ? void 0 : _a2.map((item) => getFilterData2(item))) || []
    });
  };
  let dropdownContent;
  const {
    direction,
    renderEmpty
  } = reactExports.useContext(ConfigContext);
  if (typeof column.filterDropdown === "function") {
    dropdownContent = column.filterDropdown({
      prefixCls: `${dropdownPrefixCls}-custom`,
      setSelectedKeys: (selectedKeys) => onSelectKeys({
        selectedKeys
      }),
      selectedKeys: getFilteredKeysSync(),
      confirm: doFilter,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible,
      close: () => {
        triggerVisible(false);
      }
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    const selectedKeys = getFilteredKeysSync() || [];
    const getFilterComponent = () => {
      var _a2, _b2;
      const empty = (_a2 = renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("Table.filter")) !== null && _a2 !== void 0 ? _a2 : /* @__PURE__ */ reactExports.createElement(Empty, {
        image: Empty.PRESENTED_IMAGE_SIMPLE,
        description: locale2.filterEmptyText,
        styles: {
          image: {
            height: 24
          }
        },
        style: {
          margin: 0,
          padding: "16px 0"
        }
      });
      if ((column.filters || []).length === 0) {
        return empty;
      }
      if (filterMode === "tree") {
        return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(FilterSearch, {
          filterSearch,
          value: searchValue,
          onChange: onSearch,
          tablePrefixCls,
          locale: locale2
        }), /* @__PURE__ */ reactExports.createElement("div", {
          className: `${tablePrefixCls}-filter-dropdown-tree`
        }, filterMultiple ? /* @__PURE__ */ reactExports.createElement(Checkbox, {
          checked: selectedKeys.length === flattenKeys(column.filters).length,
          indeterminate: selectedKeys.length > 0 && selectedKeys.length < flattenKeys(column.filters).length,
          className: `${tablePrefixCls}-filter-dropdown-checkall`,
          onChange: onCheckAll
        }, (_b2 = locale2 === null || locale2 === void 0 ? void 0 : locale2.filterCheckall) !== null && _b2 !== void 0 ? _b2 : locale2 === null || locale2 === void 0 ? void 0 : locale2.filterCheckAll) : null, /* @__PURE__ */ reactExports.createElement(Tree, {
          checkable: true,
          selectable: false,
          blockNode: true,
          multiple: filterMultiple,
          checkStrictly: !filterMultiple,
          className: `${dropdownPrefixCls}-menu`,
          onCheck,
          checkedKeys: selectedKeys,
          selectedKeys,
          showIcon: false,
          treeData: getTreeData2({
            filters: column.filters
          }),
          autoExpandParent: true,
          defaultExpandAll: true,
          filterTreeNode: searchValue.trim() ? (node) => {
            if (typeof filterSearch === "function") {
              return filterSearch(searchValue, getFilterData2(node));
            }
            return searchValueMatched(searchValue, node.title);
          } : void 0
        })));
      }
      const items = renderFilterItems({
        filters: column.filters || [],
        filterSearch,
        prefixCls,
        filteredKeys: getFilteredKeysSync(),
        filterMultiple,
        searchValue
      });
      const isEmpty = items.every((item) => item === null);
      return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(FilterSearch, {
        filterSearch,
        value: searchValue,
        onChange: onSearch,
        tablePrefixCls,
        locale: locale2
      }), isEmpty ? empty : /* @__PURE__ */ reactExports.createElement(Menu, {
        selectable: true,
        multiple: filterMultiple,
        prefixCls: `${dropdownPrefixCls}-menu`,
        className: dropdownMenuClass,
        onSelect: onSelectKeys,
        onDeselect: onSelectKeys,
        selectedKeys,
        getPopupContainer,
        openKeys,
        onOpenChange,
        items
      }));
    };
    const getResetDisabled = () => {
      if (filterResetToDefaultFilteredValue) {
        return isEqual((defaultFilteredValue || []).map((key) => String(key)), selectedKeys, true);
      }
      return selectedKeys.length === 0;
    };
    dropdownContent = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, getFilterComponent(), /* @__PURE__ */ reactExports.createElement("div", {
      className: `${prefixCls}-dropdown-btns`
    }, /* @__PURE__ */ reactExports.createElement(Button$1, {
      type: "link",
      size: "small",
      disabled: getResetDisabled(),
      onClick: () => onReset()
    }, locale2.filterReset), /* @__PURE__ */ reactExports.createElement(Button$1, {
      type: "primary",
      size: "small",
      onClick: onConfirm
    }, locale2.filterConfirm)));
  }
  if (column.filterDropdown) {
    dropdownContent = /* @__PURE__ */ reactExports.createElement(OverrideProvider, {
      selectable: void 0
    }, dropdownContent);
  }
  dropdownContent = /* @__PURE__ */ reactExports.createElement(FilterDropdownMenuWrapper, {
    className: `${prefixCls}-dropdown`
  }, dropdownContent);
  const getDropdownTrigger = () => {
    let filterIcon;
    if (typeof column.filterIcon === "function") {
      filterIcon = column.filterIcon(filtered);
    } else if (column.filterIcon) {
      filterIcon = column.filterIcon;
    } else {
      filterIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$9, null);
    }
    return /* @__PURE__ */ reactExports.createElement("span", {
      role: "button",
      tabIndex: -1,
      className: classNames(`${prefixCls}-trigger`, {
        active: filtered
      }),
      onClick: (e) => {
        e.stopPropagation();
      }
    }, filterIcon);
  };
  const mergedDropdownProps = mergeProps({
    trigger: ["click"],
    placement: direction === "rtl" ? "bottomLeft" : "bottomRight",
    children: getDropdownTrigger(),
    getPopupContainer
  }, Object.assign(Object.assign({}, filterDropdownProps), {
    rootClassName: classNames(rootClassName, filterDropdownProps.rootClassName),
    open: mergedVisible,
    onOpenChange: onVisibleChange,
    popupRender: () => {
      if (typeof (filterDropdownProps === null || filterDropdownProps === void 0 ? void 0 : filterDropdownProps.dropdownRender) === "function") {
        return filterDropdownProps.dropdownRender(dropdownContent);
      }
      return dropdownContent;
    }
  }));
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-column`
  }, /* @__PURE__ */ reactExports.createElement("span", {
    className: `${tablePrefixCls}-column-title`
  }, children), /* @__PURE__ */ reactExports.createElement(Dropdown, Object.assign({}, mergedDropdownProps)));
};
const collectFilterStates = (columns, init, pos) => {
  let filterStates = [];
  (columns || []).forEach((column, index) => {
    var _a;
    const columnPos = getColumnPos(index, pos);
    const filterDropdownIsDefined = column.filterDropdown !== void 0;
    if (column.filters || filterDropdownIsDefined || "onFilter" in column) {
      if ("filteredValue" in column) {
        let filteredValues = column.filteredValue;
        if (!filterDropdownIsDefined) {
          filteredValues = (_a = filteredValues === null || filteredValues === void 0 ? void 0 : filteredValues.map(String)) !== null && _a !== void 0 ? _a : filteredValues;
        }
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: filteredValues,
          forceFiltered: column.filtered
        });
      } else {
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: init && column.defaultFilteredValue ? column.defaultFilteredValue : void 0,
          forceFiltered: column.filtered
        });
      }
    }
    if ("children" in column) {
      filterStates = [].concat(_toConsumableArray(filterStates), _toConsumableArray(collectFilterStates(column.children, init, columnPos)));
    }
  });
  return filterStates;
};
function injectFilter(prefixCls, dropdownPrefixCls, columns, filterStates, locale2, triggerFilter, getPopupContainer, pos, rootClassName) {
  return columns.map((column, index) => {
    const columnPos = getColumnPos(index, pos);
    const {
      filterOnClose = true,
      filterMultiple = true,
      filterMode,
      filterSearch
    } = column;
    let newColumn = column;
    if (newColumn.filters || newColumn.filterDropdown) {
      const columnKey = getColumnKey(newColumn, columnPos);
      const filterState = filterStates.find(({
        key
      }) => columnKey === key);
      newColumn = Object.assign(Object.assign({}, newColumn), {
        title: (renderProps) => /* @__PURE__ */ reactExports.createElement(FilterDropdown, {
          tablePrefixCls: prefixCls,
          prefixCls: `${prefixCls}-filter`,
          dropdownPrefixCls,
          column: newColumn,
          columnKey,
          filterState,
          filterOnClose,
          filterMultiple,
          filterMode,
          filterSearch,
          triggerFilter,
          locale: locale2,
          getPopupContainer,
          rootClassName
        }, renderColumnTitle(column.title, renderProps))
      });
    }
    if ("children" in newColumn) {
      newColumn = Object.assign(Object.assign({}, newColumn), {
        children: injectFilter(prefixCls, dropdownPrefixCls, newColumn.children, filterStates, locale2, triggerFilter, getPopupContainer, columnPos, rootClassName)
      });
    }
    return newColumn;
  });
}
const generateFilterInfo = (filterStates) => {
  const currentFilters = {};
  filterStates.forEach(({
    key,
    filteredKeys,
    column
  }) => {
    const keyAsString = key;
    const {
      filters,
      filterDropdown
    } = column;
    if (filterDropdown) {
      currentFilters[keyAsString] = filteredKeys || null;
    } else if (Array.isArray(filteredKeys)) {
      const keys = flattenKeys(filters);
      currentFilters[keyAsString] = keys.filter((originKey) => filteredKeys.includes(String(originKey)));
    } else {
      currentFilters[keyAsString] = null;
    }
  });
  return currentFilters;
};
const getFilterData = (data, filterStates, childrenColumnName) => {
  const filterDatas = filterStates.reduce((currentData, filterState) => {
    const {
      column: {
        onFilter,
        filters
      },
      filteredKeys
    } = filterState;
    if (onFilter && filteredKeys && filteredKeys.length) {
      return currentData.map((record) => Object.assign({}, record)).filter((record) => filteredKeys.some((key) => {
        const keys = flattenKeys(filters);
        const keyIndex = keys.findIndex((k) => String(k) === String(key));
        const realKey = keyIndex !== -1 ? keys[keyIndex] : key;
        if (record[childrenColumnName]) {
          record[childrenColumnName] = getFilterData(record[childrenColumnName], filterStates, childrenColumnName);
        }
        return onFilter(realKey, record);
      }));
    }
    return currentData;
  }, data);
  return filterDatas;
};
const getMergedColumns = (rawMergedColumns) => rawMergedColumns.flatMap((column) => {
  if ("children" in column) {
    return [column].concat(_toConsumableArray(getMergedColumns(column.children || [])));
  }
  return [column];
});
const useFilter = (props) => {
  const {
    prefixCls,
    dropdownPrefixCls,
    mergedColumns: rawMergedColumns,
    onFilterChange,
    getPopupContainer,
    locale: tableLocale,
    rootClassName
  } = props;
  devUseWarning();
  const mergedColumns = reactExports.useMemo(() => getMergedColumns(rawMergedColumns || []), [rawMergedColumns]);
  const [filterStates, setFilterStates] = reactExports.useState(() => collectFilterStates(mergedColumns, true));
  const mergedFilterStates = reactExports.useMemo(() => {
    const collectedStates = collectFilterStates(mergedColumns, false);
    if (collectedStates.length === 0) {
      return collectedStates;
    }
    let filteredKeysIsAllNotControlled = true;
    collectedStates.forEach(({
      filteredKeys
    }) => {
      if (filteredKeys !== void 0) {
        filteredKeysIsAllNotControlled = false;
      }
    });
    if (filteredKeysIsAllNotControlled) {
      const keyList = (mergedColumns || []).map((column, index) => getColumnKey(column, getColumnPos(index)));
      return filterStates.filter(({
        key
      }) => keyList.includes(key)).map((item) => {
        const col = mergedColumns[keyList.indexOf(item.key)];
        return Object.assign(Object.assign({}, item), {
          column: Object.assign(Object.assign({}, item.column), col),
          forceFiltered: col.filtered
        });
      });
    }
    return collectedStates;
  }, [mergedColumns, filterStates]);
  const filters = reactExports.useMemo(() => generateFilterInfo(mergedFilterStates), [mergedFilterStates]);
  const triggerFilter = (filterState) => {
    const newFilterStates = mergedFilterStates.filter(({
      key
    }) => key !== filterState.key);
    newFilterStates.push(filterState);
    setFilterStates(newFilterStates);
    onFilterChange(generateFilterInfo(newFilterStates), newFilterStates);
  };
  const transformColumns = (innerColumns) => injectFilter(prefixCls, dropdownPrefixCls, innerColumns, mergedFilterStates, tableLocale, triggerFilter, getPopupContainer, void 0, rootClassName);
  return [transformColumns, mergedFilterStates, filters];
};
const useLazyKVMap = (data, childrenColumnName, getRowKey) => {
  const mapCacheRef = reactExports.useRef({});
  function getRecordByKey(key) {
    var _a;
    if (!mapCacheRef.current || mapCacheRef.current.data !== data || mapCacheRef.current.childrenColumnName !== childrenColumnName || mapCacheRef.current.getRowKey !== getRowKey) {
      let dig = function(records) {
        records.forEach((record, index) => {
          const rowKey = getRowKey(record, index);
          kvMap.set(rowKey, record);
          if (record && typeof record === "object" && childrenColumnName in record) {
            dig(record[childrenColumnName] || []);
          }
        });
      };
      const kvMap = /* @__PURE__ */ new Map();
      dig(data);
      mapCacheRef.current = {
        data,
        childrenColumnName,
        kvMap,
        getRowKey
      };
    }
    return (_a = mapCacheRef.current.kvMap) === null || _a === void 0 ? void 0 : _a.get(key);
  }
  return [getRecordByKey];
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const DEFAULT_PAGE_SIZE = 10;
function getPaginationParam(mergedPagination, pagination) {
  const param = {
    current: mergedPagination.current,
    pageSize: mergedPagination.pageSize
  };
  const paginationObj = pagination && typeof pagination === "object" ? pagination : {};
  Object.keys(paginationObj).forEach((pageProp) => {
    const value = mergedPagination[pageProp];
    if (typeof value !== "function") {
      param[pageProp] = value;
    }
  });
  return param;
}
function usePagination(total, onChange, pagination) {
  const _a = pagination && typeof pagination === "object" ? pagination : {}, {
    total: paginationTotal = 0
  } = _a, paginationObj = __rest(_a, ["total"]);
  const [innerPagination, setInnerPagination] = reactExports.useState(() => ({
    current: "defaultCurrent" in paginationObj ? paginationObj.defaultCurrent : 1,
    pageSize: "defaultPageSize" in paginationObj ? paginationObj.defaultPageSize : DEFAULT_PAGE_SIZE
  }));
  const mergedPagination = mergeProps(innerPagination, paginationObj, {
    total: paginationTotal > 0 ? paginationTotal : total
  });
  const maxPage = Math.ceil((paginationTotal || total) / mergedPagination.pageSize);
  if (mergedPagination.current > maxPage) {
    mergedPagination.current = maxPage || 1;
  }
  const refreshPagination = (current, pageSize) => {
    setInnerPagination({
      current: current !== null && current !== void 0 ? current : 1,
      pageSize: pageSize || mergedPagination.pageSize
    });
  };
  const onInternalChange = (current, pageSize) => {
    var _a2;
    if (pagination) {
      (_a2 = pagination.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(pagination, current, pageSize);
    }
    refreshPagination(current, pageSize);
    onChange(current, pageSize || (mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.pageSize));
  };
  if (pagination === false) {
    return [{}, () => {
    }];
  }
  return [Object.assign(Object.assign({}, mergedPagination), {
    onChange: onInternalChange
  }), refreshPagination];
}
var CaretDownOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" } }] }, "name": "caret-down", "theme": "outlined" };
var CaretDownOutlined = function CaretDownOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: CaretDownOutlined$1
  }));
};
var RefIcon$1 = /* @__PURE__ */ reactExports.forwardRef(CaretDownOutlined);
var CaretUpOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" } }] }, "name": "caret-up", "theme": "outlined" };
var CaretUpOutlined = function CaretUpOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: CaretUpOutlined$1
  }));
};
var RefIcon = /* @__PURE__ */ reactExports.forwardRef(CaretUpOutlined);
const ASCEND = "ascend";
const DESCEND = "descend";
const getMultiplePriority = (column) => {
  if (typeof column.sorter === "object" && typeof column.sorter.multiple === "number") {
    return column.sorter.multiple;
  }
  return false;
};
const getSortFunction = (sorter) => {
  if (typeof sorter === "function") {
    return sorter;
  }
  if (sorter && typeof sorter === "object" && sorter.compare) {
    return sorter.compare;
  }
  return false;
};
const nextSortDirection = (sortDirections, current) => {
  if (!current) {
    return sortDirections[0];
  }
  return sortDirections[sortDirections.indexOf(current) + 1];
};
const collectSortStates = (columns, init, pos) => {
  let sortStates = [];
  const pushState = (column, columnPos) => {
    sortStates.push({
      column,
      key: getColumnKey(column, columnPos),
      multiplePriority: getMultiplePriority(column),
      sortOrder: column.sortOrder
    });
  };
  (columns || []).forEach((column, index) => {
    const columnPos = getColumnPos(index, pos);
    if (column.children) {
      if ("sortOrder" in column) {
        pushState(column, columnPos);
      }
      sortStates = [].concat(_toConsumableArray(sortStates), _toConsumableArray(collectSortStates(column.children, init, columnPos)));
    } else if (column.sorter) {
      if ("sortOrder" in column) {
        pushState(column, columnPos);
      } else if (init && column.defaultSortOrder) {
        sortStates.push({
          column,
          key: getColumnKey(column, columnPos),
          multiplePriority: getMultiplePriority(column),
          sortOrder: column.defaultSortOrder
        });
      }
    }
  });
  return sortStates;
};
const injectSorter = (prefixCls, columns, sorterStates, triggerSorter, defaultSortDirections, tableLocale, tableShowSorterTooltip, pos) => {
  const finalColumns = (columns || []).map((column, index) => {
    const columnPos = getColumnPos(index, pos);
    let newColumn = column;
    if (newColumn.sorter) {
      const sortDirections = newColumn.sortDirections || defaultSortDirections;
      const showSorterTooltip = newColumn.showSorterTooltip === void 0 ? tableShowSorterTooltip : newColumn.showSorterTooltip;
      const columnKey = getColumnKey(newColumn, columnPos);
      const sorterState = sorterStates.find(({
        key
      }) => key === columnKey);
      const sortOrder = sorterState ? sorterState.sortOrder : null;
      const nextSortOrder = nextSortDirection(sortDirections, sortOrder);
      let sorter;
      if (column.sortIcon) {
        sorter = column.sortIcon({
          sortOrder
        });
      } else {
        const upNode = sortDirections.includes(ASCEND) && /* @__PURE__ */ reactExports.createElement(RefIcon, {
          className: classNames(`${prefixCls}-column-sorter-up`, {
            active: sortOrder === ASCEND
          })
        });
        const downNode = sortDirections.includes(DESCEND) && /* @__PURE__ */ reactExports.createElement(RefIcon$1, {
          className: classNames(`${prefixCls}-column-sorter-down`, {
            active: sortOrder === DESCEND
          })
        });
        sorter = /* @__PURE__ */ reactExports.createElement("span", {
          className: classNames(`${prefixCls}-column-sorter`, {
            [`${prefixCls}-column-sorter-full`]: !!(upNode && downNode)
          })
        }, /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-column-sorter-inner`,
          "aria-hidden": "true"
        }, upNode, downNode));
      }
      const {
        cancelSort,
        triggerAsc,
        triggerDesc
      } = tableLocale || {};
      let sortTip = cancelSort;
      if (nextSortOrder === DESCEND) {
        sortTip = triggerDesc;
      } else if (nextSortOrder === ASCEND) {
        sortTip = triggerAsc;
      }
      const tooltipProps = typeof showSorterTooltip === "object" ? Object.assign({
        title: sortTip
      }, showSorterTooltip) : {
        title: sortTip
      };
      newColumn = Object.assign(Object.assign({}, newColumn), {
        className: classNames(newColumn.className, {
          [`${prefixCls}-column-sort`]: sortOrder
        }),
        title: (renderProps) => {
          const columnSortersClass = `${prefixCls}-column-sorters`;
          const renderColumnTitleWrapper = /* @__PURE__ */ reactExports.createElement("span", {
            className: `${prefixCls}-column-title`
          }, renderColumnTitle(column.title, renderProps));
          const renderSortTitle = /* @__PURE__ */ reactExports.createElement("div", {
            className: columnSortersClass
          }, renderColumnTitleWrapper, sorter);
          if (showSorterTooltip) {
            if (typeof showSorterTooltip !== "boolean" && (showSorterTooltip === null || showSorterTooltip === void 0 ? void 0 : showSorterTooltip.target) === "sorter-icon") {
              return /* @__PURE__ */ reactExports.createElement("div", {
                className: classNames(columnSortersClass, `${columnSortersClass}-tooltip-target-sorter`)
              }, renderColumnTitleWrapper, /* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({}, tooltipProps), sorter));
            }
            return /* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({}, tooltipProps), renderSortTitle);
          }
          return renderSortTitle;
        },
        onHeaderCell: (col) => {
          var _a;
          const cell = ((_a = column.onHeaderCell) === null || _a === void 0 ? void 0 : _a.call(column, col)) || {};
          const originOnClick = cell.onClick;
          const originOKeyDown = cell.onKeyDown;
          cell.onClick = (event) => {
            triggerSorter({
              column,
              key: columnKey,
              sortOrder: nextSortOrder,
              multiplePriority: getMultiplePriority(column)
            });
            originOnClick === null || originOnClick === void 0 ? void 0 : originOnClick(event);
          };
          cell.onKeyDown = (event) => {
            if (event.keyCode === KeyCode.ENTER) {
              triggerSorter({
                column,
                key: columnKey,
                sortOrder: nextSortOrder,
                multiplePriority: getMultiplePriority(column)
              });
              originOKeyDown === null || originOKeyDown === void 0 ? void 0 : originOKeyDown(event);
            }
          };
          const renderTitle = safeColumnTitle(column.title, {});
          const displayTitle = renderTitle === null || renderTitle === void 0 ? void 0 : renderTitle.toString();
          if (sortOrder) {
            cell["aria-sort"] = sortOrder === "ascend" ? "ascending" : "descending";
          }
          cell["aria-label"] = displayTitle || "";
          cell.className = classNames(cell.className, `${prefixCls}-column-has-sorters`);
          cell.tabIndex = 0;
          if (column.ellipsis) {
            cell.title = (renderTitle !== null && renderTitle !== void 0 ? renderTitle : "").toString();
          }
          return cell;
        }
      });
    }
    if ("children" in newColumn) {
      newColumn = Object.assign(Object.assign({}, newColumn), {
        children: injectSorter(prefixCls, newColumn.children, sorterStates, triggerSorter, defaultSortDirections, tableLocale, tableShowSorterTooltip, columnPos)
      });
    }
    return newColumn;
  });
  return finalColumns;
};
const stateToInfo = (sorterState) => {
  const {
    column,
    sortOrder
  } = sorterState;
  return {
    column,
    order: sortOrder,
    field: column.dataIndex,
    columnKey: column.key
  };
};
const generateSorterInfo = (sorterStates) => {
  const activeSorters = sorterStates.filter(({
    sortOrder
  }) => sortOrder).map(stateToInfo);
  if (activeSorters.length === 0 && sorterStates.length) {
    const lastIndex = sorterStates.length - 1;
    return Object.assign(Object.assign({}, stateToInfo(sorterStates[lastIndex])), {
      column: void 0,
      order: void 0,
      field: void 0,
      columnKey: void 0
    });
  }
  if (activeSorters.length <= 1) {
    return activeSorters[0] || {};
  }
  return activeSorters;
};
const getSortData = (data, sortStates, childrenColumnName) => {
  const innerSorterStates = sortStates.slice().sort((a, b) => b.multiplePriority - a.multiplePriority);
  const cloneData = data.slice();
  const runningSorters = innerSorterStates.filter(({
    column: {
      sorter
    },
    sortOrder
  }) => getSortFunction(sorter) && sortOrder);
  if (!runningSorters.length) {
    return cloneData;
  }
  return cloneData.sort((record1, record2) => {
    for (let i = 0; i < runningSorters.length; i += 1) {
      const sorterState = runningSorters[i];
      const {
        column: {
          sorter
        },
        sortOrder
      } = sorterState;
      const compareFn = getSortFunction(sorter);
      if (compareFn && sortOrder) {
        const compareResult = compareFn(record1, record2, sortOrder);
        if (compareResult !== 0) {
          return sortOrder === ASCEND ? compareResult : -compareResult;
        }
      }
    }
    return 0;
  }).map((record) => {
    const subRecords = record[childrenColumnName];
    if (subRecords) {
      return Object.assign(Object.assign({}, record), {
        [childrenColumnName]: getSortData(subRecords, sortStates, childrenColumnName)
      });
    }
    return record;
  });
};
const useFilterSorter = (props) => {
  const {
    prefixCls,
    mergedColumns,
    sortDirections,
    tableLocale,
    showSorterTooltip,
    onSorterChange
  } = props;
  const [sortStates, setSortStates] = reactExports.useState(() => collectSortStates(mergedColumns, true));
  const getColumnKeys = (columns, pos) => {
    const newKeys = [];
    columns.forEach((item, index) => {
      const columnPos = getColumnPos(index, pos);
      newKeys.push(getColumnKey(item, columnPos));
      if (Array.isArray(item.children)) {
        const childKeys = getColumnKeys(item.children, columnPos);
        newKeys.push.apply(newKeys, _toConsumableArray(childKeys));
      }
    });
    return newKeys;
  };
  const mergedSorterStates = reactExports.useMemo(() => {
    let validate = true;
    const collectedStates = collectSortStates(mergedColumns, false);
    if (!collectedStates.length) {
      const mergedColumnsKeys = getColumnKeys(mergedColumns);
      return sortStates.filter(({
        key
      }) => mergedColumnsKeys.includes(key));
    }
    const validateStates = [];
    function patchStates(state) {
      if (validate) {
        validateStates.push(state);
      } else {
        validateStates.push(Object.assign(Object.assign({}, state), {
          sortOrder: null
        }));
      }
    }
    let multipleMode = null;
    collectedStates.forEach((state) => {
      if (multipleMode === null) {
        patchStates(state);
        if (state.sortOrder) {
          if (state.multiplePriority === false) {
            validate = false;
          } else {
            multipleMode = true;
          }
        }
      } else if (multipleMode && state.multiplePriority !== false) {
        patchStates(state);
      } else {
        validate = false;
        patchStates(state);
      }
    });
    return validateStates;
  }, [mergedColumns, sortStates]);
  const columnTitleSorterProps = reactExports.useMemo(() => {
    var _a, _b;
    const sortColumns = mergedSorterStates.map(({
      column,
      sortOrder
    }) => ({
      column,
      order: sortOrder
    }));
    return {
      sortColumns,
      // Legacy
      sortColumn: (_a = sortColumns[0]) === null || _a === void 0 ? void 0 : _a.column,
      sortOrder: (_b = sortColumns[0]) === null || _b === void 0 ? void 0 : _b.order
    };
  }, [mergedSorterStates]);
  const triggerSorter = (sortState) => {
    let newSorterStates;
    if (sortState.multiplePriority === false || !mergedSorterStates.length || mergedSorterStates[0].multiplePriority === false) {
      newSorterStates = [sortState];
    } else {
      newSorterStates = [].concat(_toConsumableArray(mergedSorterStates.filter(({
        key
      }) => key !== sortState.key)), [sortState]);
    }
    setSortStates(newSorterStates);
    onSorterChange(generateSorterInfo(newSorterStates), newSorterStates);
  };
  const transformColumns = (innerColumns) => injectSorter(prefixCls, innerColumns, mergedSorterStates, triggerSorter, sortDirections, tableLocale, showSorterTooltip);
  const getSorters = () => generateSorterInfo(mergedSorterStates);
  return [transformColumns, mergedSorterStates, columnTitleSorterProps, getSorters];
};
const fillTitle = (columns, columnTitleProps) => {
  const finalColumns = columns.map((column) => {
    const cloneColumn = Object.assign({}, column);
    cloneColumn.title = renderColumnTitle(column.title, columnTitleProps);
    if ("children" in cloneColumn) {
      cloneColumn.children = fillTitle(cloneColumn.children, columnTitleProps);
    }
    return cloneColumn;
  });
  return finalColumns;
};
const useTitleColumns = (columnTitleProps) => {
  const filledColumns = reactExports.useCallback((columns) => fillTitle(columns, columnTitleProps), [columnTitleProps]);
  return [filledColumns];
};
const RcTable = genTable((prev, next) => {
  const {
    _renderTimes: prevRenderTimes
  } = prev;
  const {
    _renderTimes: nextRenderTimes
  } = next;
  return prevRenderTimes !== nextRenderTimes;
});
const RcVirtualTable = genVirtualTable((prev, next) => {
  const {
    _renderTimes: prevRenderTimes
  } = prev;
  const {
    _renderTimes: nextRenderTimes
  } = next;
  return prevRenderTimes !== nextRenderTimes;
});
const genBorderedStyle = (token) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    tableBorderColor,
    tableHeaderBg,
    tablePaddingVertical,
    tablePaddingHorizontal,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  const getSizeBorderStyle = (size, paddingVertical, paddingHorizontal) => ({
    [`&${componentCls}-${size}`]: {
      [`> ${componentCls}-container`]: {
        [`> ${componentCls}-content, > ${componentCls}-body`]: {
          [`
            > table > tbody > tr > th,
            > table > tbody > tr > td
          `]: {
            [`> ${componentCls}-expanded-row-fixed`]: {
              margin: `${unit(calc(paddingVertical).mul(-1).equal())}
              ${unit(calc(calc(paddingHorizontal).add(lineWidth)).mul(-1).equal())}`
            }
          }
        }
      }
    }
  });
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}${componentCls}-bordered`]: Object.assign(Object.assign(Object.assign({
        // ============================ Title =============================
        [`> ${componentCls}-title`]: {
          border: tableBorder,
          borderBottom: 0
        },
        // ============================ Content ============================
        [`> ${componentCls}-container`]: {
          borderInlineStart: tableBorder,
          borderTop: tableBorder,
          [`
            > ${componentCls}-content,
            > ${componentCls}-header,
            > ${componentCls}-body,
            > ${componentCls}-summary
          `]: {
            "> table": {
              // ============================= Cell =============================
              [`
                > thead > tr > th,
                > thead > tr > td,
                > tbody > tr > th,
                > tbody > tr > td,
                > tfoot > tr > th,
                > tfoot > tr > td
              `]: {
                borderInlineEnd: tableBorder
              },
              // ============================ Header ============================
              "> thead": {
                "> tr:not(:last-child) > th": {
                  borderBottom: tableBorder
                },
                "> tr > th::before": {
                  backgroundColor: "transparent !important"
                }
              },
              // Fixed right should provides additional border
              [`
                > thead > tr,
                > tbody > tr,
                > tfoot > tr
              `]: {
                [`> ${componentCls}-cell-fix-right-first::after`]: {
                  borderInlineEnd: tableBorder
                }
              },
              // ========================== Expandable ==========================
              [`
                > tbody > tr > th,
                > tbody > tr > td
              `]: {
                [`> ${componentCls}-expanded-row-fixed`]: {
                  margin: `${unit(calc(tablePaddingVertical).mul(-1).equal())} ${unit(calc(calc(tablePaddingHorizontal).add(lineWidth)).mul(-1).equal())}`,
                  "&::after": {
                    position: "absolute",
                    top: 0,
                    insetInlineEnd: lineWidth,
                    bottom: 0,
                    borderInlineEnd: tableBorder,
                    content: '""'
                  }
                }
              }
            }
          }
        },
        // ============================ Scroll ============================
        [`&${componentCls}-scroll-horizontal`]: {
          [`> ${componentCls}-container > ${componentCls}-body`]: {
            "> table > tbody": {
              [`
                > tr${componentCls}-expanded-row,
                > tr${componentCls}-placeholder
              `]: {
                "> th, > td": {
                  borderInlineEnd: 0
                }
              }
            }
          }
        }
      }, getSizeBorderStyle("middle", token.tablePaddingVerticalMiddle, token.tablePaddingHorizontalMiddle)), getSizeBorderStyle("small", token.tablePaddingVerticalSmall, token.tablePaddingHorizontalSmall)), {
        // ============================ Footer ============================
        [`> ${componentCls}-footer`]: {
          border: tableBorder,
          borderTop: 0
        }
      }),
      // ============================ Nested ============================
      [`${componentCls}-cell`]: {
        [`${componentCls}-container:first-child`]: {
          // :first-child to avoid the case when bordered and title is set
          borderTop: 0
        },
        // https://github.com/ant-design/ant-design/issues/35577
        "&-scrollbar:not([rowspan])": {
          boxShadow: `0 ${unit(lineWidth)} 0 ${unit(lineWidth)} ${tableHeaderBg}`
        }
      },
      [`${componentCls}-bordered ${componentCls}-cell-scrollbar`]: {
        borderInlineEnd: tableBorder
      }
    }
  };
};
const genEllipsisStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-cell-ellipsis`]: Object.assign(Object.assign({}, textEllipsis), {
        wordBreak: "keep-all",
        // Fixed first or last should special process
        [`
          &${componentCls}-cell-fix-left-last,
          &${componentCls}-cell-fix-right-first
        `]: {
          overflow: "visible",
          [`${componentCls}-cell-content`]: {
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }
        },
        [`${componentCls}-column-title`]: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "keep-all"
        }
      })
    }
  };
};
const genEmptyStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-tbody > tr${componentCls}-placeholder`]: {
        textAlign: "center",
        color: token.colorTextDisabled,
        [`
          &:hover > th,
          &:hover > td,
        `]: {
          background: token.colorBgContainer
        }
      }
    }
  };
};
const genExpandStyle = (token) => {
  const {
    componentCls,
    antCls,
    motionDurationSlow,
    lineWidth,
    paddingXS,
    lineType,
    tableBorderColor,
    tableExpandIconBg,
    tableExpandColumnWidth,
    borderRadius,
    tablePaddingVertical,
    tablePaddingHorizontal,
    tableExpandedRowBg,
    paddingXXS,
    expandIconMarginTop,
    expandIconSize,
    expandIconHalfInner,
    expandIconScale,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  const expandIconLineOffset = calc(paddingXXS).sub(lineWidth).equal();
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-expand-icon-col`]: {
        width: tableExpandColumnWidth
      },
      [`${componentCls}-row-expand-icon-cell`]: {
        textAlign: "center",
        [`${componentCls}-row-expand-icon`]: {
          display: "inline-flex",
          float: "none",
          verticalAlign: "sub"
        }
      },
      [`${componentCls}-row-indent`]: {
        height: 1,
        float: "left"
      },
      [`${componentCls}-row-expand-icon`]: Object.assign(Object.assign({}, operationUnit(token)), {
        position: "relative",
        float: "left",
        width: expandIconSize,
        height: expandIconSize,
        color: "inherit",
        lineHeight: unit(expandIconSize),
        background: tableExpandIconBg,
        border: tableBorder,
        borderRadius,
        transform: `scale(${expandIconScale})`,
        "&:focus, &:hover, &:active": {
          borderColor: "currentcolor"
        },
        "&::before, &::after": {
          position: "absolute",
          background: "currentcolor",
          transition: `transform ${motionDurationSlow} ease-out`,
          content: '""'
        },
        "&::before": {
          top: expandIconHalfInner,
          insetInlineEnd: expandIconLineOffset,
          insetInlineStart: expandIconLineOffset,
          height: lineWidth
        },
        "&::after": {
          top: expandIconLineOffset,
          bottom: expandIconLineOffset,
          insetInlineStart: expandIconHalfInner,
          width: lineWidth,
          transform: "rotate(90deg)"
        },
        // Motion effect
        "&-collapsed::before": {
          transform: "rotate(-180deg)"
        },
        "&-collapsed::after": {
          transform: "rotate(0deg)"
        },
        "&-spaced": {
          "&::before, &::after": {
            display: "none",
            content: "none"
          },
          background: "transparent",
          border: 0,
          visibility: "hidden"
        }
      }),
      [`${componentCls}-row-indent + ${componentCls}-row-expand-icon`]: {
        marginTop: expandIconMarginTop,
        marginInlineEnd: paddingXS
      },
      [`tr${componentCls}-expanded-row`]: {
        "&, &:hover": {
          "> th, > td": {
            background: tableExpandedRowBg
          }
        },
        // https://github.com/ant-design/ant-design/issues/25573
        [`${antCls}-descriptions-view`]: {
          display: "flex",
          table: {
            flex: "auto",
            width: "100%"
          }
        }
      },
      // With fixed
      [`${componentCls}-expanded-row-fixed`]: {
        position: "relative",
        margin: `${unit(calc(tablePaddingVertical).mul(-1).equal())} ${unit(calc(tablePaddingHorizontal).mul(-1).equal())}`,
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`
      }
    }
  };
};
const genFilterStyle = (token) => {
  const {
    componentCls,
    antCls,
    iconCls,
    tableFilterDropdownWidth,
    tableFilterDropdownSearchWidth,
    paddingXXS,
    paddingXS,
    colorText,
    lineWidth,
    lineType,
    tableBorderColor,
    headerIconColor,
    fontSizeSM,
    tablePaddingHorizontal,
    borderRadius,
    motionDurationSlow,
    colorIcon,
    colorPrimary,
    tableHeaderFilterActiveBg,
    colorTextDisabled,
    tableFilterDropdownBg,
    tableFilterDropdownHeight,
    controlItemBgHover,
    controlItemBgActive,
    boxShadowSecondary,
    filterDropdownMenuBg,
    calc
  } = token;
  const dropdownPrefixCls = `${antCls}-dropdown`;
  const tableFilterDropdownPrefixCls = `${componentCls}-filter-dropdown`;
  const treePrefixCls = `${antCls}-tree`;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  return [
    {
      [`${componentCls}-wrapper`]: {
        [`${componentCls}-filter-column`]: {
          display: "flex",
          justifyContent: "space-between"
        },
        [`${componentCls}-filter-trigger`]: {
          position: "relative",
          display: "flex",
          alignItems: "center",
          marginBlock: calc(paddingXXS).mul(-1).equal(),
          marginInline: `${unit(paddingXXS)} ${unit(calc(tablePaddingHorizontal).div(2).mul(-1).equal())}`,
          padding: `0 ${unit(paddingXXS)}`,
          color: headerIconColor,
          fontSize: fontSizeSM,
          borderRadius,
          cursor: "pointer",
          transition: `all ${motionDurationSlow}`,
          "&:hover": {
            color: colorIcon,
            background: tableHeaderFilterActiveBg
          },
          "&.active": {
            color: colorPrimary
          }
        }
      }
    },
    {
      // Dropdown
      [`${antCls}-dropdown`]: {
        [tableFilterDropdownPrefixCls]: Object.assign(Object.assign({}, resetComponent(token)), {
          minWidth: tableFilterDropdownWidth,
          backgroundColor: tableFilterDropdownBg,
          borderRadius,
          boxShadow: boxShadowSecondary,
          overflow: "hidden",
          // Reset menu
          [`${dropdownPrefixCls}-menu`]: {
            // https://github.com/ant-design/ant-design/issues/4916
            // https://github.com/ant-design/ant-design/issues/19542
            maxHeight: tableFilterDropdownHeight,
            overflowX: "hidden",
            border: 0,
            boxShadow: "none",
            borderRadius: "unset",
            backgroundColor: filterDropdownMenuBg,
            "&:empty::after": {
              display: "block",
              padding: `${unit(paddingXS)} 0`,
              color: colorTextDisabled,
              fontSize: fontSizeSM,
              textAlign: "center",
              content: '"Not Found"'
            }
          },
          [`${tableFilterDropdownPrefixCls}-tree`]: {
            paddingBlock: `${unit(paddingXS)} 0`,
            paddingInline: paddingXS,
            [treePrefixCls]: {
              padding: 0
            },
            [`${treePrefixCls}-treenode ${treePrefixCls}-node-content-wrapper:hover`]: {
              backgroundColor: controlItemBgHover
            },
            [`${treePrefixCls}-treenode-checkbox-checked ${treePrefixCls}-node-content-wrapper`]: {
              "&, &:hover": {
                backgroundColor: controlItemBgActive
              }
            }
          },
          [`${tableFilterDropdownPrefixCls}-search`]: {
            padding: paddingXS,
            borderBottom: tableBorder,
            "&-input": {
              input: {
                minWidth: tableFilterDropdownSearchWidth
              },
              [iconCls]: {
                color: colorTextDisabled
              }
            }
          },
          [`${tableFilterDropdownPrefixCls}-checkall`]: {
            width: "100%",
            marginBottom: paddingXXS,
            marginInlineStart: paddingXXS
          },
          // Operation
          [`${tableFilterDropdownPrefixCls}-btns`]: {
            display: "flex",
            justifyContent: "space-between",
            padding: `${unit(calc(paddingXS).sub(lineWidth).equal())} ${unit(paddingXS)}`,
            overflow: "hidden",
            borderTop: tableBorder
          }
        })
      }
    },
    // Dropdown Menu & SubMenu
    {
      // submenu of table filter dropdown
      [`${antCls}-dropdown ${tableFilterDropdownPrefixCls}, ${tableFilterDropdownPrefixCls}-submenu`]: {
        // Checkbox
        [`${antCls}-checkbox-wrapper + span`]: {
          paddingInlineStart: paddingXS,
          color: colorText
        },
        "> ul": {
          maxHeight: "calc(100vh - 130px)",
          overflowX: "hidden",
          overflowY: "auto"
        }
      }
    }
  ];
};
const genFixedStyle = (token) => {
  const {
    componentCls,
    lineWidth,
    colorSplit,
    motionDurationSlow,
    zIndexTableFixed: zIndexTableFixed2,
    tableBg,
    zIndexTableSticky,
    calc
  } = token;
  const shadowColor = colorSplit;
  return {
    [`${componentCls}-wrapper`]: {
      [`
        ${componentCls}-cell-fix-left,
        ${componentCls}-cell-fix-right
      `]: {
        position: "sticky !important",
        zIndex: zIndexTableFixed2,
        background: tableBg
      },
      [`
        ${componentCls}-cell-fix-left-first::after,
        ${componentCls}-cell-fix-left-last::after
      `]: {
        position: "absolute",
        top: 0,
        right: {
          _skip_check_: true,
          value: 0
        },
        bottom: calc(lineWidth).mul(-1).equal(),
        width: 30,
        transform: "translateX(100%)",
        transition: `box-shadow ${motionDurationSlow}`,
        content: '""',
        pointerEvents: "none",
        // fix issues: https://github.com/ant-design/ant-design/issues/54587
        willChange: "transform"
      },
      [`${componentCls}-cell-fix-left-all::after`]: {
        display: "none"
      },
      [`
        ${componentCls}-cell-fix-right-first::after,
        ${componentCls}-cell-fix-right-last::after
      `]: {
        position: "absolute",
        top: 0,
        bottom: calc(lineWidth).mul(-1).equal(),
        left: {
          _skip_check_: true,
          value: 0
        },
        width: 30,
        transform: "translateX(-100%)",
        transition: `box-shadow ${motionDurationSlow}`,
        content: '""',
        pointerEvents: "none"
      },
      [`${componentCls}-container`]: {
        position: "relative",
        "&::before, &::after": {
          position: "absolute",
          top: 0,
          bottom: 0,
          zIndex: calc(zIndexTableSticky).add(1).equal({
            unit: false
          }),
          width: 30,
          transition: `box-shadow ${motionDurationSlow}`,
          content: '""',
          pointerEvents: "none"
        },
        "&::before": {
          insetInlineStart: 0
        },
        "&::after": {
          insetInlineEnd: 0
        }
      },
      [`${componentCls}-ping-left`]: {
        [`&:not(${componentCls}-has-fix-left) ${componentCls}-container::before`]: {
          boxShadow: `inset 10px 0 8px -8px ${shadowColor}`
        },
        [`
          ${componentCls}-cell-fix-left-first::after,
          ${componentCls}-cell-fix-left-last::after
        `]: {
          boxShadow: `inset 10px 0 8px -8px ${shadowColor}`
        },
        [`${componentCls}-cell-fix-left-last::before`]: {
          backgroundColor: "transparent !important"
        }
      },
      [`${componentCls}-ping-right`]: {
        [`&:not(${componentCls}-has-fix-right) ${componentCls}-container::after`]: {
          boxShadow: `inset -10px 0 8px -8px ${shadowColor}`
        },
        [`
          ${componentCls}-cell-fix-right-first::after,
          ${componentCls}-cell-fix-right-last::after
        `]: {
          boxShadow: `inset -10px 0 8px -8px ${shadowColor}`
        }
      },
      // Gapped fixed Columns do not show the shadow
      [`${componentCls}-fixed-column-gapped`]: {
        [`
        ${componentCls}-cell-fix-left-first::after,
        ${componentCls}-cell-fix-left-last::after,
        ${componentCls}-cell-fix-right-first::after,
        ${componentCls}-cell-fix-right-last::after
      `]: {
          boxShadow: "none"
        }
      }
    }
  };
};
const genPaginationStyle = (token) => {
  const {
    componentCls,
    antCls,
    margin
  } = token;
  return {
    [`${componentCls}-wrapper ${componentCls}-pagination${antCls}-pagination`]: {
      margin: `${unit(margin)} 0`
    }
  };
};
const genRadiusStyle = (token) => {
  const {
    componentCls,
    tableRadius
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [componentCls]: {
        // https://github.com/ant-design/ant-design/issues/39115#issuecomment-1362314574
        [`${componentCls}-title, ${componentCls}-header`]: {
          borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`
        },
        [`${componentCls}-title + ${componentCls}-container`]: {
          borderStartStartRadius: 0,
          borderStartEndRadius: 0,
          // https://github.com/ant-design/ant-design/issues/41975
          [`${componentCls}-header, table`]: {
            borderRadius: 0
          },
          "table > thead > tr:first-child": {
            "th:first-child, th:last-child, td:first-child, td:last-child": {
              borderRadius: 0
            }
          }
        },
        "&-container": {
          borderStartStartRadius: tableRadius,
          borderStartEndRadius: tableRadius,
          "table > thead > tr:first-child": {
            "> *:first-child": {
              borderStartStartRadius: tableRadius
            },
            "> *:last-child": {
              borderStartEndRadius: tableRadius
            }
          }
        },
        "&-footer": {
          borderRadius: `0 0 ${unit(tableRadius)} ${unit(tableRadius)}`
        }
      }
    }
  };
};
const genStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-wrapper-rtl`]: {
      direction: "rtl",
      table: {
        direction: "rtl"
      },
      [`${componentCls}-pagination-left`]: {
        justifyContent: "flex-end"
      },
      [`${componentCls}-pagination-right`]: {
        justifyContent: "flex-start"
      },
      [`${componentCls}-row-expand-icon`]: {
        float: "right",
        "&::after": {
          transform: "rotate(-90deg)"
        },
        "&-collapsed::before": {
          transform: "rotate(180deg)"
        },
        "&-collapsed::after": {
          transform: "rotate(0deg)"
        }
      },
      [`${componentCls}-container`]: {
        "&::before": {
          insetInlineStart: "unset",
          insetInlineEnd: 0
        },
        "&::after": {
          insetInlineStart: 0,
          insetInlineEnd: "unset"
        },
        [`${componentCls}-row-indent`]: {
          float: "right"
        }
      }
    }
  };
};
const genSelectionStyle = (token) => {
  const {
    componentCls,
    antCls,
    iconCls,
    fontSizeIcon,
    padding,
    paddingXS,
    headerIconColor,
    headerIconHoverColor,
    tableSelectionColumnWidth,
    tableSelectedRowBg,
    tableSelectedRowHoverBg,
    tableRowHoverBg,
    tablePaddingHorizontal,
    calc
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      // ========================== Selections ==========================
      [`${componentCls}-selection-col`]: {
        width: tableSelectionColumnWidth,
        [`&${componentCls}-selection-col-with-dropdown`]: {
          width: calc(tableSelectionColumnWidth).add(fontSizeIcon).add(calc(padding).div(4)).equal()
        }
      },
      [`${componentCls}-bordered ${componentCls}-selection-col`]: {
        width: calc(tableSelectionColumnWidth).add(calc(paddingXS).mul(2)).equal(),
        [`&${componentCls}-selection-col-with-dropdown`]: {
          width: calc(tableSelectionColumnWidth).add(fontSizeIcon).add(calc(padding).div(4)).add(calc(paddingXS).mul(2)).equal()
        }
      },
      [`
        table tr th${componentCls}-selection-column,
        table tr td${componentCls}-selection-column,
        ${componentCls}-selection-column
      `]: {
        paddingInlineEnd: token.paddingXS,
        paddingInlineStart: token.paddingXS,
        textAlign: "center",
        [`${antCls}-radio-wrapper`]: {
          marginInlineEnd: 0
        }
      },
      [`table tr th${componentCls}-selection-column${componentCls}-cell-fix-left`]: {
        zIndex: calc(token.zIndexTableFixed).add(1).equal({
          unit: false
        })
      },
      [`table tr th${componentCls}-selection-column::after`]: {
        backgroundColor: "transparent !important"
      },
      [`${componentCls}-selection`]: {
        position: "relative",
        display: "inline-flex",
        flexDirection: "column"
      },
      [`${componentCls}-selection-extra`]: {
        position: "absolute",
        top: 0,
        zIndex: 1,
        cursor: "pointer",
        transition: `all ${token.motionDurationSlow}`,
        marginInlineStart: "100%",
        paddingInlineStart: unit(calc(tablePaddingHorizontal).div(4).equal()),
        [iconCls]: {
          color: headerIconColor,
          fontSize: fontSizeIcon,
          verticalAlign: "baseline",
          "&:hover": {
            color: headerIconHoverColor
          }
        }
      },
      // ============================= Rows =============================
      [`${componentCls}-tbody`]: {
        [`${componentCls}-row`]: {
          [`&${componentCls}-row-selected`]: {
            [`> ${componentCls}-cell`]: {
              background: tableSelectedRowBg,
              "&-row-hover": {
                background: tableSelectedRowHoverBg
              }
            }
          },
          [`> ${componentCls}-cell-row-hover`]: {
            background: tableRowHoverBg
          }
        }
      }
    }
  };
};
const genSizeStyle = (token) => {
  const {
    componentCls,
    tableExpandColumnWidth,
    calc
  } = token;
  const getSizeStyle = (size, paddingVertical, paddingHorizontal, fontSize) => ({
    [`${componentCls}${componentCls}-${size}`]: {
      fontSize,
      [`
        ${componentCls}-title,
        ${componentCls}-footer,
        ${componentCls}-cell,
        ${componentCls}-thead > tr > th,
        ${componentCls}-tbody > tr > th,
        ${componentCls}-tbody > tr > td,
        tfoot > tr > th,
        tfoot > tr > td
      `]: {
        padding: `${unit(paddingVertical)} ${unit(paddingHorizontal)}`
      },
      [`${componentCls}-filter-trigger`]: {
        marginInlineEnd: unit(calc(paddingHorizontal).div(2).mul(-1).equal())
      },
      [`${componentCls}-expanded-row-fixed`]: {
        margin: `${unit(calc(paddingVertical).mul(-1).equal())} ${unit(calc(paddingHorizontal).mul(-1).equal())}`
      },
      [`${componentCls}-tbody`]: {
        // ========================= Nest Table ===========================
        [`${componentCls}-wrapper:only-child ${componentCls}`]: {
          marginBlock: unit(calc(paddingVertical).mul(-1).equal()),
          marginInline: `${unit(calc(tableExpandColumnWidth).sub(paddingHorizontal).equal())} ${unit(calc(paddingHorizontal).mul(-1).equal())}`
        }
      },
      // https://github.com/ant-design/ant-design/issues/35167
      [`${componentCls}-selection-extra`]: {
        paddingInlineStart: unit(calc(paddingHorizontal).div(4).equal())
      }
    }
  });
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({}, getSizeStyle("middle", token.tablePaddingVerticalMiddle, token.tablePaddingHorizontalMiddle, token.tableFontSizeMiddle)), getSizeStyle("small", token.tablePaddingVerticalSmall, token.tablePaddingHorizontalSmall, token.tableFontSizeSmall))
  };
};
const genSorterStyle = (token) => {
  const {
    componentCls,
    marginXXS,
    fontSizeIcon,
    headerIconColor,
    headerIconHoverColor
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-thead th${componentCls}-column-has-sorters`]: {
        outline: "none",
        cursor: "pointer",
        // why left 0s? Avoid column header move with transition when left is changed
        // https://github.com/ant-design/ant-design/issues/50588
        transition: `all ${token.motionDurationSlow}, left 0s`,
        "&:hover": {
          background: token.tableHeaderSortHoverBg,
          "&::before": {
            backgroundColor: "transparent !important"
          }
        },
        "&:focus-visible": {
          color: token.colorPrimary
        },
        // https://github.com/ant-design/ant-design/issues/30969
        [`
          &${componentCls}-cell-fix-left:hover,
          &${componentCls}-cell-fix-right:hover
        `]: {
          background: token.tableFixedHeaderSortActiveBg
        }
      },
      [`${componentCls}-thead th${componentCls}-column-sort`]: {
        background: token.tableHeaderSortBg,
        "&::before": {
          backgroundColor: "transparent !important"
        }
      },
      [`td${componentCls}-column-sort`]: {
        background: token.tableBodySortBg
      },
      [`${componentCls}-column-title`]: {
        position: "relative",
        zIndex: 1,
        flex: 1,
        minWidth: 0
      },
      [`${componentCls}-column-sorters`]: {
        display: "flex",
        flex: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        "&::after": {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          content: '""'
        }
      },
      [`${componentCls}-column-sorters-tooltip-target-sorter`]: {
        "&::after": {
          content: "none"
        }
      },
      [`${componentCls}-column-sorter`]: {
        marginInlineStart: marginXXS,
        color: headerIconColor,
        fontSize: 0,
        transition: `color ${token.motionDurationSlow}`,
        "&-inner": {
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center"
        },
        "&-up, &-down": {
          fontSize: fontSizeIcon,
          "&.active": {
            color: token.colorPrimary
          }
        },
        [`${componentCls}-column-sorter-up + ${componentCls}-column-sorter-down`]: {
          marginTop: "-0.3em"
        }
      },
      [`${componentCls}-column-sorters:hover ${componentCls}-column-sorter`]: {
        color: headerIconHoverColor
      }
    }
  };
};
const genStickyStyle = (token) => {
  const {
    componentCls,
    opacityLoading,
    tableScrollThumbBg,
    tableScrollThumbBgHover,
    tableScrollThumbSize,
    tableScrollBg,
    zIndexTableSticky,
    stickyScrollBarBorderRadius,
    lineWidth,
    lineType,
    tableBorderColor
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-sticky`]: {
        "&-holder": {
          position: "sticky",
          zIndex: zIndexTableSticky,
          background: token.colorBgContainer
        },
        "&-scroll": {
          position: "sticky",
          bottom: 0,
          height: `${unit(tableScrollThumbSize)} !important`,
          zIndex: zIndexTableSticky,
          display: "flex",
          alignItems: "center",
          background: tableScrollBg,
          borderTop: tableBorder,
          opacity: opacityLoading,
          "&:hover": {
            transformOrigin: "center bottom"
          },
          // fake scrollbar style of sticky
          "&-bar": {
            height: tableScrollThumbSize,
            backgroundColor: tableScrollThumbBg,
            borderRadius: stickyScrollBarBorderRadius,
            transition: `all ${token.motionDurationSlow}, transform 0s`,
            position: "absolute",
            bottom: 0,
            "&:hover, &-active": {
              backgroundColor: tableScrollThumbBgHover
            }
          }
        }
      }
    }
  };
};
const genSummaryStyle = (token) => {
  const {
    componentCls,
    lineWidth,
    tableBorderColor,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${token.lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-summary`]: {
        position: "relative",
        zIndex: token.zIndexTableFixed,
        background: token.tableBg,
        "> tr": {
          "> th, > td": {
            borderBottom: tableBorder
          }
        }
      },
      [`div${componentCls}-summary`]: {
        boxShadow: `0 ${unit(calc(lineWidth).mul(-1).equal())} 0 ${tableBorderColor}`
      }
    }
  };
};
const genVirtualStyle = (token) => {
  const {
    componentCls,
    motionDurationMid,
    lineWidth,
    lineType,
    tableBorderColor,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  const rowCellCls = `${componentCls}-expanded-row-cell`;
  return {
    [`${componentCls}-wrapper`]: {
      // ========================== Row ==========================
      [`${componentCls}-tbody-virtual`]: {
        [`${componentCls}-tbody-virtual-holder-inner`]: {
          [`
            & > ${componentCls}-row, 
            & > div:not(${componentCls}-row) > ${componentCls}-row
          `]: {
            display: "flex",
            boxSizing: "border-box",
            width: "100%"
          }
        },
        [`${componentCls}-cell`]: {
          borderBottom: tableBorder,
          transition: `background ${motionDurationMid}`
        },
        [`${componentCls}-expanded-row`]: {
          [`${rowCellCls}${rowCellCls}-fixed`]: {
            position: "sticky",
            insetInlineStart: 0,
            overflow: "hidden",
            width: `calc(var(--virtual-width) - ${unit(lineWidth)})`,
            borderInlineEnd: "none"
          }
        }
      },
      // ======================== Border =========================
      [`${componentCls}-bordered`]: {
        [`${componentCls}-tbody-virtual`]: {
          "&:after": {
            content: '""',
            insetInline: 0,
            bottom: 0,
            borderBottom: tableBorder,
            position: "absolute"
          },
          [`${componentCls}-cell`]: {
            borderInlineEnd: tableBorder,
            [`&${componentCls}-cell-fix-right-first:before`]: {
              content: '""',
              position: "absolute",
              insetBlock: 0,
              insetInlineStart: calc(lineWidth).mul(-1).equal(),
              borderInlineStart: tableBorder
            }
          }
        },
        // Empty placeholder
        [`&${componentCls}-virtual`]: {
          [`${componentCls}-placeholder ${componentCls}-cell`]: {
            borderInlineEnd: tableBorder,
            borderBottom: tableBorder
          }
        }
      }
    }
  };
};
const genTableStyle = (token) => {
  const {
    componentCls,
    fontWeightStrong,
    tablePaddingVertical,
    tablePaddingHorizontal,
    tableExpandColumnWidth,
    lineWidth,
    lineType,
    tableBorderColor,
    tableFontSize,
    tableBg,
    tableRadius,
    tableHeaderTextColor,
    motionDurationMid,
    tableHeaderBg,
    tableHeaderCellSplitColor,
    tableFooterTextColor,
    tableFooterBg,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({
      clear: "both",
      maxWidth: "100%",
      // fix https://github.com/ant-design/ant-design/issues/46177
      ["--rc-virtual-list-scrollbar-bg"]: token.tableScrollBg
    }, clearFix()), {
      [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        fontSize: tableFontSize,
        background: tableBg,
        borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`,
        // https://github.com/ant-design/ant-design/issues/47486
        scrollbarColor: `${token.tableScrollThumbBg} ${token.tableScrollBg}`
      }),
      // https://github.com/ant-design/ant-design/issues/17611
      table: {
        width: "100%",
        textAlign: "start",
        borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`,
        borderCollapse: "separate",
        borderSpacing: 0
      },
      // ============================= Cell ==============================
      [`
          ${componentCls}-cell,
          ${componentCls}-thead > tr > th,
          ${componentCls}-tbody > tr > th,
          ${componentCls}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td
        `]: {
        position: "relative",
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`,
        overflowWrap: "break-word"
      },
      // ============================ Title =============================
      [`${componentCls}-title`]: {
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`
      },
      // ============================ Header ============================
      [`${componentCls}-thead`]: {
        [`
          > tr > th,
          > tr > td
        `]: {
          position: "relative",
          color: tableHeaderTextColor,
          fontWeight: fontWeightStrong,
          textAlign: "start",
          background: tableHeaderBg,
          borderBottom: tableBorder,
          transition: `background ${motionDurationMid} ease`,
          "&[colspan]:not([colspan='1'])": {
            textAlign: "center"
          },
          [`&:not(:last-child):not(${componentCls}-selection-column):not(${componentCls}-row-expand-icon-cell):not([colspan])::before`]: {
            position: "absolute",
            top: "50%",
            insetInlineEnd: 0,
            width: 1,
            height: "1.6em",
            backgroundColor: tableHeaderCellSplitColor,
            transform: "translateY(-50%)",
            transition: `background-color ${motionDurationMid}`,
            content: '""'
          }
        },
        "> tr:not(:last-child) > th[colspan]": {
          borderBottom: 0
        }
      },
      // ============================ Body ============================
      [`${componentCls}-tbody`]: {
        "> tr": {
          "> th, > td": {
            transition: `background ${motionDurationMid}, border-color ${motionDurationMid}`,
            borderBottom: tableBorder,
            // ========================= Nest Table ===========================
            [`
              > ${componentCls}-wrapper:only-child,
              > ${componentCls}-expanded-row-fixed > ${componentCls}-wrapper:only-child
            `]: {
              [componentCls]: {
                marginBlock: unit(calc(tablePaddingVertical).mul(-1).equal()),
                marginInline: `${unit(calc(tableExpandColumnWidth).sub(tablePaddingHorizontal).equal())}
                ${unit(calc(tablePaddingHorizontal).mul(-1).equal())}`,
                [`${componentCls}-tbody > tr:last-child > td`]: {
                  borderBottomWidth: 0,
                  "&:first-child, &:last-child": {
                    borderRadius: 0
                  }
                }
              }
            }
          },
          "> th": {
            position: "relative",
            color: tableHeaderTextColor,
            fontWeight: fontWeightStrong,
            textAlign: "start",
            background: tableHeaderBg,
            borderBottom: tableBorder,
            transition: `background ${motionDurationMid} ease`
          },
          // measure cell styles
          [`& > ${componentCls}-measure-cell`]: {
            paddingBlock: `0 !important`,
            borderBlock: `0 !important`,
            [`${componentCls}-measure-cell-content`]: {
              height: 0,
              overflow: "hidden",
              pointerEvents: "none"
            }
          }
        }
      },
      // ============================ Footer ============================
      [`${componentCls}-footer`]: {
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`,
        color: tableFooterTextColor,
        background: tableFooterBg
      }
    })
  };
};
const prepareComponentToken = (token) => {
  const {
    colorFillAlter,
    colorBgContainer,
    colorTextHeading,
    colorFillSecondary,
    colorFillContent,
    controlItemBgActive,
    controlItemBgActiveHover,
    padding,
    paddingSM,
    paddingXS,
    colorBorderSecondary,
    borderRadiusLG,
    controlHeight,
    colorTextPlaceholder,
    fontSize,
    fontSizeSM,
    lineHeight,
    lineWidth,
    colorIcon,
    colorIconHover,
    opacityLoading,
    controlInteractiveSize
  } = token;
  const colorFillSecondarySolid = new FastColor(colorFillSecondary).onBackground(colorBgContainer).toHexString();
  const colorFillContentSolid = new FastColor(colorFillContent).onBackground(colorBgContainer).toHexString();
  const colorFillAlterSolid = new FastColor(colorFillAlter).onBackground(colorBgContainer).toHexString();
  const baseColorAction = new FastColor(colorIcon);
  const baseColorActionHover = new FastColor(colorIconHover);
  const expandIconHalfInner = controlInteractiveSize / 2 - lineWidth;
  const expandIconSize = expandIconHalfInner * 2 + lineWidth * 3;
  return {
    headerBg: colorFillAlterSolid,
    headerColor: colorTextHeading,
    headerSortActiveBg: colorFillSecondarySolid,
    headerSortHoverBg: colorFillContentSolid,
    bodySortBg: colorFillAlterSolid,
    rowHoverBg: colorFillAlterSolid,
    rowSelectedBg: controlItemBgActive,
    rowSelectedHoverBg: controlItemBgActiveHover,
    rowExpandedBg: colorFillAlter,
    cellPaddingBlock: padding,
    cellPaddingInline: padding,
    cellPaddingBlockMD: paddingSM,
    cellPaddingInlineMD: paddingXS,
    cellPaddingBlockSM: paddingXS,
    cellPaddingInlineSM: paddingXS,
    borderColor: colorBorderSecondary,
    headerBorderRadius: borderRadiusLG,
    footerBg: colorFillAlterSolid,
    footerColor: colorTextHeading,
    cellFontSize: fontSize,
    cellFontSizeMD: fontSize,
    cellFontSizeSM: fontSize,
    headerSplitColor: colorBorderSecondary,
    fixedHeaderSortActiveBg: colorFillSecondarySolid,
    headerFilterHoverBg: colorFillContent,
    filterDropdownMenuBg: colorBgContainer,
    filterDropdownBg: colorBgContainer,
    expandIconBg: colorBgContainer,
    selectionColumnWidth: controlHeight,
    stickyScrollBarBg: colorTextPlaceholder,
    stickyScrollBarBorderRadius: 100,
    expandIconMarginTop: (fontSize * lineHeight - lineWidth * 3) / 2 - Math.ceil((fontSizeSM * 1.4 - lineWidth * 3) / 2),
    headerIconColor: baseColorAction.clone().setA(baseColorAction.a * opacityLoading).toRgbString(),
    headerIconHoverColor: baseColorActionHover.clone().setA(baseColorActionHover.a * opacityLoading).toRgbString(),
    expandIconHalfInner,
    expandIconSize,
    expandIconScale: controlInteractiveSize / expandIconSize
  };
};
const zIndexTableFixed = 2;
const useStyle = genStyleHooks("Table", (token) => {
  const {
    colorTextHeading,
    colorSplit,
    colorBgContainer,
    controlInteractiveSize: checkboxSize,
    headerBg,
    headerColor,
    headerSortActiveBg,
    headerSortHoverBg,
    bodySortBg,
    rowHoverBg,
    rowSelectedBg,
    rowSelectedHoverBg,
    rowExpandedBg,
    cellPaddingBlock,
    cellPaddingInline,
    cellPaddingBlockMD,
    cellPaddingInlineMD,
    cellPaddingBlockSM,
    cellPaddingInlineSM,
    borderColor,
    footerBg,
    footerColor,
    headerBorderRadius,
    cellFontSize,
    cellFontSizeMD,
    cellFontSizeSM,
    headerSplitColor,
    fixedHeaderSortActiveBg,
    headerFilterHoverBg,
    filterDropdownBg,
    expandIconBg,
    selectionColumnWidth,
    stickyScrollBarBg,
    calc
  } = token;
  const tableToken = merge(token, {
    tableFontSize: cellFontSize,
    tableBg: colorBgContainer,
    tableRadius: headerBorderRadius,
    tablePaddingVertical: cellPaddingBlock,
    tablePaddingHorizontal: cellPaddingInline,
    tablePaddingVerticalMiddle: cellPaddingBlockMD,
    tablePaddingHorizontalMiddle: cellPaddingInlineMD,
    tablePaddingVerticalSmall: cellPaddingBlockSM,
    tablePaddingHorizontalSmall: cellPaddingInlineSM,
    tableBorderColor: borderColor,
    tableHeaderTextColor: headerColor,
    tableHeaderBg: headerBg,
    tableFooterTextColor: footerColor,
    tableFooterBg: footerBg,
    tableHeaderCellSplitColor: headerSplitColor,
    tableHeaderSortBg: headerSortActiveBg,
    tableHeaderSortHoverBg: headerSortHoverBg,
    tableBodySortBg: bodySortBg,
    tableFixedHeaderSortActiveBg: fixedHeaderSortActiveBg,
    tableHeaderFilterActiveBg: headerFilterHoverBg,
    tableFilterDropdownBg: filterDropdownBg,
    tableRowHoverBg: rowHoverBg,
    tableSelectedRowBg: rowSelectedBg,
    tableSelectedRowHoverBg: rowSelectedHoverBg,
    zIndexTableFixed,
    zIndexTableSticky: calc(zIndexTableFixed).add(1).equal({
      unit: false
    }),
    tableFontSizeMiddle: cellFontSizeMD,
    tableFontSizeSmall: cellFontSizeSM,
    tableSelectionColumnWidth: selectionColumnWidth,
    tableExpandIconBg: expandIconBg,
    tableExpandColumnWidth: calc(checkboxSize).add(calc(token.padding).mul(2)).equal(),
    tableExpandedRowBg: rowExpandedBg,
    // Dropdown
    tableFilterDropdownWidth: 120,
    tableFilterDropdownHeight: 264,
    tableFilterDropdownSearchWidth: 140,
    // Virtual Scroll Bar
    tableScrollThumbSize: 8,
    // Mac scroll bar size
    tableScrollThumbBg: stickyScrollBarBg,
    tableScrollThumbBgHover: colorTextHeading,
    tableScrollBg: colorSplit
  });
  return [genTableStyle(tableToken), genPaginationStyle(tableToken), genSummaryStyle(tableToken), genSorterStyle(tableToken), genFilterStyle(tableToken), genBorderedStyle(tableToken), genRadiusStyle(tableToken), genExpandStyle(tableToken), genSummaryStyle(tableToken), genEmptyStyle(tableToken), genSelectionStyle(tableToken), genFixedStyle(tableToken), genStickyStyle(tableToken), genEllipsisStyle(tableToken), genSizeStyle(tableToken), genStyle(tableToken), genVirtualStyle(tableToken)];
}, prepareComponentToken, {
  unitless: {
    expandIconScale: true
  }
});
const EMPTY_LIST = [];
const InternalTable = (props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    size: customizeSize,
    bordered,
    dropdownPrefixCls: customizeDropdownPrefixCls,
    dataSource,
    pagination,
    rowSelection,
    rowKey = "key",
    rowClassName,
    columns,
    children,
    childrenColumnName: legacyChildrenColumnName,
    onChange,
    getPopupContainer,
    loading,
    expandIcon,
    expandable,
    expandedRowRender,
    expandIconColumnIndex,
    indentSize,
    scroll,
    sortDirections,
    locale: locale2,
    showSorterTooltip = {
      target: "full-header"
    },
    virtual
  } = props;
  devUseWarning();
  const baseColumns = reactExports.useMemo(() => columns || convertChildrenToColumns(children), [columns, children]);
  const needResponsive = reactExports.useMemo(() => baseColumns.some((col) => col.responsive), [baseColumns]);
  const screens = useBreakpoint(needResponsive);
  const mergedColumns = reactExports.useMemo(() => {
    const matched = new Set(Object.keys(screens).filter((m) => screens[m]));
    return baseColumns.filter((c) => !c.responsive || c.responsive.some((r) => matched.has(r)));
  }, [baseColumns, screens]);
  const tableProps = omit(props, ["className", "style", "columns"]);
  const {
    locale: contextLocale = localeValues,
    direction,
    table,
    renderEmpty,
    getPrefixCls,
    getPopupContainer: getContextPopupContainer
  } = reactExports.useContext(ConfigContext);
  const mergedSize = useSize(customizeSize);
  const tableLocale = Object.assign(Object.assign({}, contextLocale.Table), locale2);
  const rawData = dataSource || EMPTY_LIST;
  const prefixCls = getPrefixCls("table", customizePrefixCls);
  const dropdownPrefixCls = getPrefixCls("dropdown", customizeDropdownPrefixCls);
  const [, token] = useToken();
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const mergedExpandable = Object.assign(Object.assign({
    childrenColumnName: legacyChildrenColumnName,
    expandIconColumnIndex
  }, expandable), {
    expandIcon: (_a = expandable === null || expandable === void 0 ? void 0 : expandable.expandIcon) !== null && _a !== void 0 ? _a : (_b = table === null || table === void 0 ? void 0 : table.expandable) === null || _b === void 0 ? void 0 : _b.expandIcon
  });
  const {
    childrenColumnName = "children"
  } = mergedExpandable;
  const expandType = reactExports.useMemo(() => {
    if (rawData.some((item) => item === null || item === void 0 ? void 0 : item[childrenColumnName])) {
      return "nest";
    }
    if (expandedRowRender || (expandable === null || expandable === void 0 ? void 0 : expandable.expandedRowRender)) {
      return "row";
    }
    return null;
  }, [rawData]);
  const internalRefs = {
    body: reactExports.useRef(null)
  };
  const getContainerWidth = useContainerWidth(prefixCls);
  const rootRef = reactExports.useRef(null);
  const tblRef = reactExports.useRef(null);
  useProxyImperativeHandle(ref, () => Object.assign(Object.assign({}, tblRef.current), {
    nativeElement: rootRef.current
  }));
  const getRowKey = reactExports.useMemo(() => {
    if (typeof rowKey === "function") {
      return rowKey;
    }
    return (record) => record === null || record === void 0 ? void 0 : record[rowKey];
  }, [rowKey]);
  const [getRecordByKey] = useLazyKVMap(rawData, childrenColumnName, getRowKey);
  const changeEventInfo = {};
  const triggerOnChange = (info, action, reset = false) => {
    var _a2, _b2, _c, _d;
    const changeInfo = Object.assign(Object.assign({}, changeEventInfo), info);
    if (reset) {
      (_a2 = changeEventInfo.resetPagination) === null || _a2 === void 0 ? void 0 : _a2.call(changeEventInfo);
      if ((_b2 = changeInfo.pagination) === null || _b2 === void 0 ? void 0 : _b2.current) {
        changeInfo.pagination.current = 1;
      }
      if (pagination) {
        (_c = pagination.onChange) === null || _c === void 0 ? void 0 : _c.call(pagination, 1, (_d = changeInfo.pagination) === null || _d === void 0 ? void 0 : _d.pageSize);
      }
    }
    if (scroll && scroll.scrollToFirstRowOnChange !== false && internalRefs.body.current) {
      scrollTo(0, {
        getContainer: () => internalRefs.body.current
      });
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(changeInfo.pagination, changeInfo.filters, changeInfo.sorter, {
      currentDataSource: getFilterData(getSortData(rawData, changeInfo.sorterStates, childrenColumnName), changeInfo.filterStates, childrenColumnName),
      action
    });
  };
  const onSorterChange = (sorter, sorterStates) => {
    triggerOnChange({
      sorter,
      sorterStates
    }, "sort", false);
  };
  const [transformSorterColumns, sortStates, sorterTitleProps, getSorters] = useFilterSorter({
    prefixCls,
    mergedColumns,
    onSorterChange,
    sortDirections: sortDirections || ["ascend", "descend"],
    tableLocale,
    showSorterTooltip
  });
  const sortedData = reactExports.useMemo(() => getSortData(rawData, sortStates, childrenColumnName), [rawData, sortStates]);
  changeEventInfo.sorter = getSorters();
  changeEventInfo.sorterStates = sortStates;
  const onFilterChange = (filters2, filterStates2) => {
    triggerOnChange({
      filters: filters2,
      filterStates: filterStates2
    }, "filter", true);
  };
  const [transformFilterColumns, filterStates, filters] = useFilter({
    prefixCls,
    locale: tableLocale,
    dropdownPrefixCls,
    mergedColumns,
    onFilterChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    rootClassName: classNames(rootClassName, rootCls)
  });
  const mergedData = getFilterData(sortedData, filterStates, childrenColumnName);
  changeEventInfo.filters = filters;
  changeEventInfo.filterStates = filterStates;
  const columnTitleProps = reactExports.useMemo(() => {
    const mergedFilters = {};
    Object.keys(filters).forEach((filterKey) => {
      if (filters[filterKey] !== null) {
        mergedFilters[filterKey] = filters[filterKey];
      }
    });
    return Object.assign(Object.assign({}, sorterTitleProps), {
      filters: mergedFilters
    });
  }, [sorterTitleProps, filters]);
  const [transformTitleColumns] = useTitleColumns(columnTitleProps);
  const onPaginationChange = (current, pageSize) => {
    triggerOnChange({
      pagination: Object.assign(Object.assign({}, changeEventInfo.pagination), {
        current,
        pageSize
      })
    }, "paginate");
  };
  const [mergedPagination, resetPagination] = usePagination(mergedData.length, onPaginationChange, pagination);
  changeEventInfo.pagination = pagination === false ? {} : getPaginationParam(mergedPagination, pagination);
  changeEventInfo.resetPagination = resetPagination;
  const pageData = reactExports.useMemo(() => {
    if (pagination === false || !mergedPagination.pageSize) {
      return mergedData;
    }
    const {
      current = 1,
      total,
      pageSize = DEFAULT_PAGE_SIZE
    } = mergedPagination;
    if (mergedData.length < total) {
      if (mergedData.length > pageSize) {
        return mergedData.slice((current - 1) * pageSize, current * pageSize);
      }
      return mergedData;
    }
    return mergedData.slice((current - 1) * pageSize, current * pageSize);
  }, [!!pagination, mergedData, mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.current, mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.pageSize, mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.total]);
  const [transformSelectionColumns, selectedKeySet] = useSelection({
    prefixCls,
    data: mergedData,
    pageData,
    getRowKey,
    getRecordByKey,
    expandType,
    childrenColumnName,
    locale: tableLocale,
    getPopupContainer: getPopupContainer || getContextPopupContainer
  }, rowSelection);
  const internalRowClassName = (record, index, indent) => {
    let mergedRowClassName;
    if (typeof rowClassName === "function") {
      mergedRowClassName = classNames(rowClassName(record, index, indent));
    } else {
      mergedRowClassName = classNames(rowClassName);
    }
    return classNames({
      [`${prefixCls}-row-selected`]: selectedKeySet.has(getRowKey(record, index))
    }, mergedRowClassName);
  };
  mergedExpandable.__PARENT_RENDER_ICON__ = mergedExpandable.expandIcon;
  mergedExpandable.expandIcon = mergedExpandable.expandIcon || expandIcon || renderExpandIcon(tableLocale);
  if (expandType === "nest" && mergedExpandable.expandIconColumnIndex === void 0) {
    mergedExpandable.expandIconColumnIndex = rowSelection ? 1 : 0;
  } else if (mergedExpandable.expandIconColumnIndex > 0 && rowSelection) {
    mergedExpandable.expandIconColumnIndex -= 1;
  }
  if (typeof mergedExpandable.indentSize !== "number") {
    mergedExpandable.indentSize = typeof indentSize === "number" ? indentSize : 15;
  }
  const transformColumns = reactExports.useCallback((innerColumns) => transformTitleColumns(transformSelectionColumns(transformFilterColumns(transformSorterColumns(innerColumns)))), [transformSorterColumns, transformFilterColumns, transformSelectionColumns]);
  const getPaginationNodes = () => {
    if (pagination === false || !(mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.total)) {
      return {};
    }
    const getPaginationSize = () => mergedPagination.size || (mergedSize === "small" || mergedSize === "middle" ? "small" : void 0);
    const renderPagination = (position) => {
      const align = position === "left" ? "start" : position === "right" ? "end" : position;
      return /* @__PURE__ */ reactExports.createElement(Pagination, Object.assign({}, mergedPagination, {
        align: mergedPagination.align || align,
        className: classNames(`${prefixCls}-pagination`, mergedPagination.className),
        size: getPaginationSize()
      }));
    };
    const defaultPosition = direction === "rtl" ? "left" : "right";
    const positions = mergedPagination.position;
    if (positions === null || !Array.isArray(positions)) {
      return {
        bottom: renderPagination(defaultPosition)
      };
    }
    const topPosition = positions.find((pos) => typeof pos === "string" && pos.toLowerCase().includes("top"));
    const bottomPosition = positions.find((pos) => typeof pos === "string" && pos.toLowerCase().includes("bottom"));
    const isNone = positions.every((pos) => `${pos}` === "none");
    const topAlign = topPosition ? topPosition.toLowerCase().replace("top", "") : "";
    const bottomAlign = bottomPosition ? bottomPosition.toLowerCase().replace("bottom", "") : "";
    const shouldDefaultBottom = !topPosition && !bottomPosition && !isNone;
    const renderTop = () => topAlign ? renderPagination(topAlign) : void 0;
    const renderBottom = () => {
      if (bottomAlign) {
        return renderPagination(bottomAlign);
      }
      if (shouldDefaultBottom) {
        return renderPagination(defaultPosition);
      }
      return void 0;
    };
    return {
      top: renderTop(),
      bottom: renderBottom()
    };
  };
  const spinProps = reactExports.useMemo(() => {
    if (typeof loading === "boolean") {
      return {
        spinning: loading
      };
    } else if (typeof loading === "object" && loading !== null) {
      return Object.assign({
        spinning: true
      }, loading);
    } else {
      return void 0;
    }
  }, [loading]);
  const wrapperClassNames = classNames(cssVarCls, rootCls, `${prefixCls}-wrapper`, table === null || table === void 0 ? void 0 : table.className, {
    [`${prefixCls}-wrapper-rtl`]: direction === "rtl"
  }, className, rootClassName, hashId);
  const mergedStyle = Object.assign(Object.assign({}, table === null || table === void 0 ? void 0 : table.style), style);
  const mergedEmptyNode = reactExports.useMemo(() => {
    if ((spinProps === null || spinProps === void 0 ? void 0 : spinProps.spinning) && rawData === EMPTY_LIST) {
      return null;
    }
    if (typeof (locale2 === null || locale2 === void 0 ? void 0 : locale2.emptyText) !== "undefined") {
      return locale2.emptyText;
    }
    return (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("Table")) || /* @__PURE__ */ reactExports.createElement(DefaultRenderEmpty, {
      componentName: "Table"
    });
  }, [spinProps === null || spinProps === void 0 ? void 0 : spinProps.spinning, rawData, locale2 === null || locale2 === void 0 ? void 0 : locale2.emptyText, renderEmpty]);
  const TableComponent = virtual ? RcVirtualTable : RcTable;
  const virtualProps = {};
  const listItemHeight = reactExports.useMemo(() => {
    const {
      fontSize,
      lineHeight,
      lineWidth,
      padding,
      paddingXS,
      paddingSM
    } = token;
    const fontHeight = Math.floor(fontSize * lineHeight);
    switch (mergedSize) {
      case "middle":
        return paddingSM * 2 + fontHeight + lineWidth;
      case "small":
        return paddingXS * 2 + fontHeight + lineWidth;
      default:
        return padding * 2 + fontHeight + lineWidth;
    }
  }, [token, mergedSize]);
  if (virtual) {
    virtualProps.listItemHeight = listItemHeight;
  }
  const {
    top: topPaginationNode,
    bottom: bottomPaginationNode
  } = getPaginationNodes();
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    ref: rootRef,
    className: wrapperClassNames,
    style: mergedStyle
  }, /* @__PURE__ */ reactExports.createElement(Spin, Object.assign({
    spinning: false
  }, spinProps), topPaginationNode, /* @__PURE__ */ reactExports.createElement(TableComponent, Object.assign({}, virtualProps, tableProps, {
    ref: tblRef,
    columns: mergedColumns,
    direction,
    expandable: mergedExpandable,
    prefixCls,
    className: classNames({
      [`${prefixCls}-middle`]: mergedSize === "middle",
      [`${prefixCls}-small`]: mergedSize === "small",
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-empty`]: rawData.length === 0
    }, cssVarCls, rootCls, hashId),
    data: pageData,
    rowKey: getRowKey,
    rowClassName: internalRowClassName,
    emptyText: mergedEmptyNode,
    // Internal
    internalHooks: INTERNAL_HOOKS,
    internalRefs,
    transformColumns,
    getContainerWidth,
    measureRowRender: (measureRow) => /* @__PURE__ */ reactExports.createElement(ConfigProvider, {
      getPopupContainer: (node) => node
    }, measureRow)
  })), bottomPaginationNode)));
};
const InternalTable$1 = /* @__PURE__ */ reactExports.forwardRef(InternalTable);
const Table = (props, ref) => {
  const renderTimesRef = reactExports.useRef(0);
  renderTimesRef.current += 1;
  return /* @__PURE__ */ reactExports.createElement(InternalTable$1, Object.assign({}, props, {
    ref,
    _renderTimes: renderTimesRef.current
  }));
};
const ForwardTable = /* @__PURE__ */ reactExports.forwardRef(Table);
ForwardTable.SELECTION_COLUMN = SELECTION_COLUMN;
ForwardTable.EXPAND_COLUMN = EXPAND_COLUMN;
ForwardTable.SELECTION_ALL = SELECTION_ALL;
ForwardTable.SELECTION_INVERT = SELECTION_INVERT;
ForwardTable.SELECTION_NONE = SELECTION_NONE;
ForwardTable.Column = Column;
ForwardTable.ColumnGroup = ColumnGroup;
ForwardTable.Summary = FooterComponents;
export {
  Checkbox as C,
  DatePicker as D,
  ForwardTable as F,
  Dropdown as a,
  dayjs as d,
  responsiveArray as r,
  useBreakpoint as u
};
//# sourceMappingURL=Table-Cg2SJaMG.js.map
