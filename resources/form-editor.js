import { R as React, a3 as _slicedToArray, a8 as classNames, Y as _defineProperty, a1 as _objectWithoutProperties, K as KeyCode, Z as _extends, a0 as _objectSpread2, a as CSSMotion, bG as toArray, bU as useMergedState, b$ as warningOnce, bw as pickAttrs, a6 as _typeof, a5 as _toConsumableArray, by as reactExports, d as ConfigContext, b6 as genStyleHooks, bt as merge, bH as unit, bz as resetComponent, b5 as genFocusStyle, bA as resetIcon, bL as useComponentConfig, bW as useSize, aa as cloneElement, bk as initCollapseMotion, bu as omit, I as Icon, c0 as wrapperRaf, bR as useLayoutUpdateEffect, bN as useEvent, A as RefResizeObserver, bM as useComposeRef, bo as isMobile, bi as getTransitionName, bF as textEllipsis, b4 as genFocusOutline, bJ as useCSSVarCls, u as RefIcon$2, bq as jsxRuntimeExports, i as FontAwesomeIcon, al as faCertificate, aV as faShield, am as faCheckDouble, a$ as faTableColumns, aN as faPaperPlane, aM as faPalette, aX as faSliders, aj as faBarcode, aC as faHandshake, au as faExpand, aw as faEyeSlash, aH as faLock, aK as faMask, aJ as faMapLocation, ak as faCalendar, ap as faClock, aP as faPercent, aL as faMoneyBill, aY as faSpinner, aB as faGlobe, aE as faHeading, b1 as faUser, az as faFont, aQ as faPhone, aF as faLink, aZ as faSquareCheck, an as faCircleDot, aD as faHashtag, aG as faList, ax as faFileLines, as as faEnvelope, aO as faPenToSquare, E as Tooltip, ao as faCircleInfo, B as Button, b0 as faTrash, aR as faPlus, bC as staticMethods, a2 as _pg, ah as faArrowLeft, aT as faRotateLeft, aU as faRotateRight, av as faEye, aq as faCode, ay as faFloppyDisk, ai as faArrowUp, ag as faArrowDown, aA as faGear, ar as faCopy, ae as createRoot } from "./chunks/Header-DYLbO79M.js";
import { h as getForm, k as updateForm, c as createForm } from "./chunks/api-CP2qo9fl.js";
import { _ as __ } from "./chunks/default-i18n-Bi0ZJkXv.js";
import { S as Switch } from "./chunks/index-SfeydlGU.js";
import { e as genCollapseMotion, m as initSlideMotion, S as Select, I as Input, c as Spin } from "./chunks/index-8--dsiAZ.js";
import { c as RefIcon$1, E as ExportMenu, M as MenuItem, a as Dropdown, R as RefIcon$3 } from "./chunks/EllipsisOutlined-YtwsN71l.js";
var PanelContent = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, forceRender = props.forceRender, className = props.className, style = props.style, children = props.children, isActive = props.isActive, role = props.role, customizeClassNames = props.classNames, styles = props.styles;
  var _React$useState = React.useState(isActive || forceRender), _React$useState2 = _slicedToArray(_React$useState, 2), rendered = _React$useState2[0], setRendered = _React$useState2[1];
  React.useEffect(function() {
    if (forceRender || isActive) {
      setRendered(true);
    }
  }, [forceRender, isActive]);
  if (!rendered) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", {
    ref,
    className: classNames("".concat(prefixCls, "-content"), _defineProperty(_defineProperty({}, "".concat(prefixCls, "-content-active"), isActive), "".concat(prefixCls, "-content-inactive"), !isActive), className),
    style,
    role
  }, /* @__PURE__ */ React.createElement("div", {
    className: classNames("".concat(prefixCls, "-content-box"), customizeClassNames === null || customizeClassNames === void 0 ? void 0 : customizeClassNames.body),
    style: styles === null || styles === void 0 ? void 0 : styles.body
  }, children));
});
PanelContent.displayName = "PanelContent";
var _excluded$4 = ["showArrow", "headerClass", "isActive", "onItemClick", "forceRender", "className", "classNames", "styles", "prefixCls", "collapsible", "accordion", "panelKey", "extra", "header", "expandIcon", "openMotion", "destroyInactivePanel", "children"];
var CollapsePanel$1 = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  var _props$showArrow = props.showArrow, showArrow = _props$showArrow === void 0 ? true : _props$showArrow, headerClass = props.headerClass, isActive = props.isActive, onItemClick = props.onItemClick, forceRender = props.forceRender, className = props.className, _props$classNames = props.classNames, customizeClassNames = _props$classNames === void 0 ? {} : _props$classNames, _props$styles = props.styles, styles = _props$styles === void 0 ? {} : _props$styles, prefixCls = props.prefixCls, collapsible = props.collapsible, accordion = props.accordion, panelKey = props.panelKey, extra = props.extra, header = props.header, expandIcon = props.expandIcon, openMotion = props.openMotion, destroyInactivePanel = props.destroyInactivePanel, children = props.children, resetProps = _objectWithoutProperties(props, _excluded$4);
  var disabled = collapsible === "disabled";
  var ifExtraExist = extra !== null && extra !== void 0 && typeof extra !== "boolean";
  var collapsibleProps = _defineProperty(_defineProperty(_defineProperty({
    onClick: function onClick() {
      onItemClick === null || onItemClick === void 0 || onItemClick(panelKey);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === "Enter" || e.keyCode === KeyCode.ENTER || e.which === KeyCode.ENTER) {
        onItemClick === null || onItemClick === void 0 || onItemClick(panelKey);
      }
    },
    role: accordion ? "tab" : "button"
  }, "aria-expanded", isActive), "aria-disabled", disabled), "tabIndex", disabled ? -1 : 0);
  var iconNodeInner = typeof expandIcon === "function" ? expandIcon(props) : /* @__PURE__ */ React.createElement("i", {
    className: "arrow"
  });
  var iconNode = iconNodeInner && /* @__PURE__ */ React.createElement("div", _extends({
    className: "".concat(prefixCls, "-expand-icon")
  }, ["header", "icon"].includes(collapsible) ? collapsibleProps : {}), iconNodeInner);
  var collapsePanelClassNames = classNames("".concat(prefixCls, "-item"), _defineProperty(_defineProperty({}, "".concat(prefixCls, "-item-active"), isActive), "".concat(prefixCls, "-item-disabled"), disabled), className);
  var headerClassName = classNames(headerClass, "".concat(prefixCls, "-header"), _defineProperty({}, "".concat(prefixCls, "-collapsible-").concat(collapsible), !!collapsible), customizeClassNames.header);
  var headerProps = _objectSpread2({
    className: headerClassName,
    style: styles.header
  }, ["header", "icon"].includes(collapsible) ? {} : collapsibleProps);
  return /* @__PURE__ */ React.createElement("div", _extends({}, resetProps, {
    ref,
    className: collapsePanelClassNames
  }), /* @__PURE__ */ React.createElement("div", headerProps, showArrow && iconNode, /* @__PURE__ */ React.createElement("span", _extends({
    className: "".concat(prefixCls, "-header-text")
  }, collapsible === "header" ? collapsibleProps : {}), header), ifExtraExist && /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-extra")
  }, extra)), /* @__PURE__ */ React.createElement(CSSMotion, _extends({
    visible: isActive,
    leavedClassName: "".concat(prefixCls, "-content-hidden")
  }, openMotion, {
    forceRender,
    removeOnLeave: destroyInactivePanel
  }), function(_ref, motionRef) {
    var motionClassName = _ref.className, motionStyle = _ref.style;
    return /* @__PURE__ */ React.createElement(PanelContent, {
      ref: motionRef,
      prefixCls,
      className: motionClassName,
      classNames: customizeClassNames,
      style: motionStyle,
      styles,
      isActive,
      forceRender,
      role: accordion ? "tabpanel" : void 0
    }, children);
  }));
});
var _excluded$3 = ["children", "label", "key", "collapsible", "onItemClick", "destroyInactivePanel"];
var convertItemsToNodes = function convertItemsToNodes2(items, props) {
  var prefixCls = props.prefixCls, accordion = props.accordion, collapsible = props.collapsible, destroyInactivePanel = props.destroyInactivePanel, onItemClick = props.onItemClick, activeKey = props.activeKey, openMotion = props.openMotion, expandIcon = props.expandIcon;
  return items.map(function(item, index) {
    var children = item.children, label = item.label, rawKey = item.key, rawCollapsible = item.collapsible, rawOnItemClick = item.onItemClick, rawDestroyInactivePanel = item.destroyInactivePanel, restProps = _objectWithoutProperties(item, _excluded$3);
    var key = String(rawKey !== null && rawKey !== void 0 ? rawKey : index);
    var mergeCollapsible = rawCollapsible !== null && rawCollapsible !== void 0 ? rawCollapsible : collapsible;
    var mergeDestroyInactivePanel = rawDestroyInactivePanel !== null && rawDestroyInactivePanel !== void 0 ? rawDestroyInactivePanel : destroyInactivePanel;
    var handleItemClick = function handleItemClick2(value) {
      if (mergeCollapsible === "disabled") return;
      onItemClick(value);
      rawOnItemClick === null || rawOnItemClick === void 0 || rawOnItemClick(value);
    };
    var isActive = false;
    if (accordion) {
      isActive = activeKey[0] === key;
    } else {
      isActive = activeKey.indexOf(key) > -1;
    }
    return /* @__PURE__ */ React.createElement(CollapsePanel$1, _extends({}, restProps, {
      prefixCls,
      key,
      panelKey: key,
      isActive,
      accordion,
      openMotion,
      expandIcon,
      header: label,
      collapsible: mergeCollapsible,
      onItemClick: handleItemClick,
      destroyInactivePanel: mergeDestroyInactivePanel
    }), children);
  });
};
var getNewChild = function getNewChild2(child, index, props) {
  if (!child) return null;
  var prefixCls = props.prefixCls, accordion = props.accordion, collapsible = props.collapsible, destroyInactivePanel = props.destroyInactivePanel, onItemClick = props.onItemClick, activeKey = props.activeKey, openMotion = props.openMotion, expandIcon = props.expandIcon;
  var key = child.key || String(index);
  var _child$props = child.props, header = _child$props.header, headerClass = _child$props.headerClass, childDestroyInactivePanel = _child$props.destroyInactivePanel, childCollapsible = _child$props.collapsible, childOnItemClick = _child$props.onItemClick;
  var isActive = false;
  if (accordion) {
    isActive = activeKey[0] === key;
  } else {
    isActive = activeKey.indexOf(key) > -1;
  }
  var mergeCollapsible = childCollapsible !== null && childCollapsible !== void 0 ? childCollapsible : collapsible;
  var handleItemClick = function handleItemClick2(value) {
    if (mergeCollapsible === "disabled") return;
    onItemClick(value);
    childOnItemClick === null || childOnItemClick === void 0 || childOnItemClick(value);
  };
  var childProps = {
    key,
    panelKey: key,
    header,
    headerClass,
    isActive,
    prefixCls,
    destroyInactivePanel: childDestroyInactivePanel !== null && childDestroyInactivePanel !== void 0 ? childDestroyInactivePanel : destroyInactivePanel,
    openMotion,
    accordion,
    children: child.props.children,
    onItemClick: handleItemClick,
    expandIcon,
    collapsible: mergeCollapsible
  };
  if (typeof child.type === "string") {
    return child;
  }
  Object.keys(childProps).forEach(function(propName) {
    if (typeof childProps[propName] === "undefined") {
      delete childProps[propName];
    }
  });
  return /* @__PURE__ */ React.cloneElement(child, childProps);
};
function useItems(items, rawChildren, props) {
  if (Array.isArray(items)) {
    return convertItemsToNodes(items, props);
  }
  return toArray(rawChildren).map(function(child, index) {
    return getNewChild(child, index, props);
  });
}
function getActiveKeysArray(activeKey) {
  var currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    var activeKeyType = _typeof(currentActiveKey);
    currentActiveKey = activeKeyType === "number" || activeKeyType === "string" ? [currentActiveKey] : [];
  }
  return currentActiveKey.map(function(key) {
    return String(key);
  });
}
var Collapse$2 = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-collapse" : _props$prefixCls, _props$destroyInactiv = props.destroyInactivePanel, destroyInactivePanel = _props$destroyInactiv === void 0 ? false : _props$destroyInactiv, style = props.style, accordion = props.accordion, className = props.className, children = props.children, collapsible = props.collapsible, openMotion = props.openMotion, expandIcon = props.expandIcon, rawActiveKey = props.activeKey, defaultActiveKey = props.defaultActiveKey, _onChange = props.onChange, items = props.items;
  var collapseClassName = classNames(prefixCls, className);
  var _useMergedState = useMergedState([], {
    value: rawActiveKey,
    onChange: function onChange(v) {
      return _onChange === null || _onChange === void 0 ? void 0 : _onChange(v);
    },
    defaultValue: defaultActiveKey,
    postState: getActiveKeysArray
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), activeKey = _useMergedState2[0], setActiveKey = _useMergedState2[1];
  var onItemClick = function onItemClick2(key) {
    return setActiveKey(function() {
      if (accordion) {
        return activeKey[0] === key ? [] : [key];
      }
      var index = activeKey.indexOf(key);
      var isActive = index > -1;
      if (isActive) {
        return activeKey.filter(function(item) {
          return item !== key;
        });
      }
      return [].concat(_toConsumableArray(activeKey), [key]);
    });
  };
  warningOnce(!children, "[rc-collapse] `children` will be removed in next major version. Please use `items` instead.");
  var mergedChildren = useItems(items, children, {
    prefixCls,
    accordion,
    openMotion,
    expandIcon,
    collapsible,
    destroyInactivePanel,
    onItemClick,
    activeKey
  });
  return /* @__PURE__ */ React.createElement("div", _extends({
    ref,
    className: collapseClassName,
    style,
    role: accordion ? "tablist" : void 0
  }, pickAttrs(props, {
    aria: true,
    data: true
  })), mergedChildren);
});
const Collapse$3 = Object.assign(Collapse$2, {
  /**
   * @deprecated use `items` instead, will be removed in `v4.0.0`
   */
  Panel: CollapsePanel$1
});
Collapse$3.Panel;
const CollapsePanel = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showArrow = true
  } = props;
  const prefixCls = getPrefixCls("collapse", customizePrefixCls);
  const collapsePanelClassName = classNames({
    [`${prefixCls}-no-arrow`]: !showArrow
  }, className);
  return /* @__PURE__ */ reactExports.createElement(Collapse$3.Panel, Object.assign({
    ref
  }, props, {
    prefixCls,
    className: collapsePanelClassName
  }));
});
const genBaseStyle = (token) => {
  const {
    componentCls,
    contentBg,
    padding,
    headerBg,
    headerPadding,
    collapseHeaderPaddingSM,
    collapseHeaderPaddingLG,
    collapsePanelBorderRadius,
    lineWidth,
    lineType,
    colorBorder,
    colorText,
    colorTextHeading,
    colorTextDisabled,
    fontSizeLG,
    lineHeight,
    lineHeightLG,
    marginSM,
    paddingSM,
    paddingLG,
    paddingXS,
    motionDurationSlow,
    fontSizeIcon,
    contentPadding,
    fontHeight,
    fontHeightLG
  } = token;
  const borderBase = `${unit(lineWidth)} ${lineType} ${colorBorder}`;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      backgroundColor: headerBg,
      border: borderBase,
      borderRadius: collapsePanelBorderRadius,
      "&-rtl": {
        direction: "rtl"
      },
      [`& > ${componentCls}-item`]: {
        borderBottom: borderBase,
        "&:first-child": {
          [`
            &,
            & > ${componentCls}-header`]: {
            borderRadius: `${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)} 0 0`
          }
        },
        "&:last-child": {
          [`
            &,
            & > ${componentCls}-header`]: {
            borderRadius: `0 0 ${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)}`
          }
        },
        [`> ${componentCls}-header`]: Object.assign(Object.assign({
          position: "relative",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "flex-start",
          padding: headerPadding,
          color: colorTextHeading,
          lineHeight,
          cursor: "pointer",
          transition: `all ${motionDurationSlow}, visibility 0s`
        }, genFocusStyle(token)), {
          [`> ${componentCls}-header-text`]: {
            flex: "auto"
          },
          // >>>>> Arrow
          [`${componentCls}-expand-icon`]: {
            height: fontHeight,
            display: "flex",
            alignItems: "center",
            paddingInlineEnd: marginSM
          },
          [`${componentCls}-arrow`]: Object.assign(Object.assign({}, resetIcon()), {
            fontSize: fontSizeIcon,
            // when `transform: rotate()` is applied to icon's root element
            transition: `transform ${motionDurationSlow}`,
            // when `transform: rotate()` is applied to icon's child element
            svg: {
              transition: `transform ${motionDurationSlow}`
            }
          }),
          // >>>>> Text
          [`${componentCls}-header-text`]: {
            marginInlineEnd: "auto"
          }
        }),
        [`${componentCls}-collapsible-header`]: {
          cursor: "default",
          [`${componentCls}-header-text`]: {
            flex: "none",
            cursor: "pointer"
          },
          [`${componentCls}-expand-icon`]: {
            cursor: "pointer"
          }
        },
        [`${componentCls}-collapsible-icon`]: {
          cursor: "unset",
          [`${componentCls}-expand-icon`]: {
            cursor: "pointer"
          }
        }
      },
      [`${componentCls}-content`]: {
        color: colorText,
        backgroundColor: contentBg,
        borderTop: borderBase,
        [`& > ${componentCls}-content-box`]: {
          padding: contentPadding
        },
        "&-hidden": {
          display: "none"
        }
      },
      "&-small": {
        [`> ${componentCls}-item`]: {
          [`> ${componentCls}-header`]: {
            padding: collapseHeaderPaddingSM,
            paddingInlineStart: paddingXS,
            [`> ${componentCls}-expand-icon`]: {
              // Arrow offset
              marginInlineStart: token.calc(paddingSM).sub(paddingXS).equal()
            }
          },
          [`> ${componentCls}-content > ${componentCls}-content-box`]: {
            padding: paddingSM
          }
        }
      },
      "&-large": {
        [`> ${componentCls}-item`]: {
          fontSize: fontSizeLG,
          lineHeight: lineHeightLG,
          [`> ${componentCls}-header`]: {
            padding: collapseHeaderPaddingLG,
            paddingInlineStart: padding,
            [`> ${componentCls}-expand-icon`]: {
              height: fontHeightLG,
              // Arrow offset
              marginInlineStart: token.calc(paddingLG).sub(padding).equal()
            }
          },
          [`> ${componentCls}-content > ${componentCls}-content-box`]: {
            padding: paddingLG
          }
        }
      },
      [`${componentCls}-item:last-child`]: {
        borderBottom: 0,
        [`> ${componentCls}-content`]: {
          borderRadius: `0 0 ${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)}`
        }
      },
      [`& ${componentCls}-item-disabled > ${componentCls}-header`]: {
        [`
          &,
          & > .arrow
        `]: {
          color: colorTextDisabled,
          cursor: "not-allowed"
        }
      },
      // ========================== Icon Position ==========================
      [`&${componentCls}-icon-position-end`]: {
        [`& > ${componentCls}-item`]: {
          [`> ${componentCls}-header`]: {
            [`${componentCls}-expand-icon`]: {
              order: 1,
              paddingInlineEnd: 0,
              paddingInlineStart: marginSM
            }
          }
        }
      }
    })
  };
};
const genArrowStyle = (token) => {
  const {
    componentCls
  } = token;
  const fixedSelector = `> ${componentCls}-item > ${componentCls}-header ${componentCls}-arrow`;
  return {
    [`${componentCls}-rtl`]: {
      [fixedSelector]: {
        transform: `rotate(180deg)`
      }
    }
  };
};
const genBorderlessStyle = (token) => {
  const {
    componentCls,
    headerBg,
    borderlessContentPadding,
    borderlessContentBg,
    colorBorder
  } = token;
  return {
    [`${componentCls}-borderless`]: {
      backgroundColor: headerBg,
      border: 0,
      [`> ${componentCls}-item`]: {
        borderBottom: `1px solid ${colorBorder}`
      },
      [`
        > ${componentCls}-item:last-child,
        > ${componentCls}-item:last-child ${componentCls}-header
      `]: {
        borderRadius: 0
      },
      [`> ${componentCls}-item:last-child`]: {
        borderBottom: 0
      },
      [`> ${componentCls}-item > ${componentCls}-content`]: {
        backgroundColor: borderlessContentBg,
        borderTop: 0
      },
      [`> ${componentCls}-item > ${componentCls}-content > ${componentCls}-content-box`]: {
        padding: borderlessContentPadding
      }
    }
  };
};
const genGhostStyle = (token) => {
  const {
    componentCls,
    paddingSM
  } = token;
  return {
    [`${componentCls}-ghost`]: {
      backgroundColor: "transparent",
      border: 0,
      [`> ${componentCls}-item`]: {
        borderBottom: 0,
        [`> ${componentCls}-content`]: {
          backgroundColor: "transparent",
          border: 0,
          [`> ${componentCls}-content-box`]: {
            paddingBlock: paddingSM
          }
        }
      }
    }
  };
};
const prepareComponentToken$1 = (token) => ({
  headerPadding: `${token.paddingSM}px ${token.padding}px`,
  headerBg: token.colorFillAlter,
  contentPadding: `${token.padding}px 16px`,
  // Fixed Value
  contentBg: token.colorBgContainer,
  borderlessContentPadding: `${token.paddingXXS}px 16px ${token.padding}px`,
  borderlessContentBg: "transparent"
});
const useStyle$1 = genStyleHooks("Collapse", (token) => {
  const collapseToken = merge(token, {
    collapseHeaderPaddingSM: `${unit(token.paddingXS)} ${unit(token.paddingSM)}`,
    collapseHeaderPaddingLG: `${unit(token.padding)} ${unit(token.paddingLG)}`,
    collapsePanelBorderRadius: token.borderRadiusLG
  });
  return [genBaseStyle(collapseToken), genBorderlessStyle(collapseToken), genGhostStyle(collapseToken), genArrowStyle(collapseToken), genCollapseMotion(collapseToken)];
}, prepareComponentToken$1);
const Collapse = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction,
    expandIcon: contextExpandIcon,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("collapse");
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    bordered = true,
    ghost,
    size: customizeSize,
    expandIconPosition = "start",
    children,
    destroyInactivePanel,
    destroyOnHidden,
    expandIcon
  } = props;
  const mergedSize = useSize((ctx) => {
    var _a;
    return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : ctx) !== null && _a !== void 0 ? _a : "middle";
  });
  const prefixCls = getPrefixCls("collapse", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const mergedExpandIconPosition = reactExports.useMemo(() => {
    if (expandIconPosition === "left") {
      return "start";
    }
    return expandIconPosition === "right" ? "end" : expandIconPosition;
  }, [expandIconPosition]);
  const mergedExpandIcon = expandIcon !== null && expandIcon !== void 0 ? expandIcon : contextExpandIcon;
  const renderExpandIcon = reactExports.useCallback((panelProps = {}) => {
    const icon = typeof mergedExpandIcon === "function" ? mergedExpandIcon(panelProps) : /* @__PURE__ */ reactExports.createElement(RefIcon$1, {
      rotate: panelProps.isActive ? direction === "rtl" ? -90 : 90 : void 0,
      "aria-label": panelProps.isActive ? "expanded" : "collapsed"
    });
    return cloneElement(icon, () => {
      var _a;
      return {
        className: classNames((_a = icon.props) === null || _a === void 0 ? void 0 : _a.className, `${prefixCls}-arrow`)
      };
    });
  }, [mergedExpandIcon, prefixCls, direction]);
  const collapseClassName = classNames(`${prefixCls}-icon-position-${mergedExpandIconPosition}`, {
    [`${prefixCls}-borderless`]: !bordered,
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-ghost`]: !!ghost,
    [`${prefixCls}-${mergedSize}`]: mergedSize !== "middle"
  }, contextClassName, className, rootClassName, hashId, cssVarCls);
  const openMotion = reactExports.useMemo(() => Object.assign(Object.assign({}, initCollapseMotion(rootPrefixCls)), {
    motionAppear: false,
    leavedClassName: `${prefixCls}-content-hidden`
  }), [rootPrefixCls, prefixCls]);
  const items = reactExports.useMemo(() => {
    if (!children) {
      return null;
    }
    return toArray(children).map((child, index) => {
      var _a, _b;
      const childProps = child.props;
      if (childProps === null || childProps === void 0 ? void 0 : childProps.disabled) {
        const key = (_a = child.key) !== null && _a !== void 0 ? _a : String(index);
        const mergedChildProps = Object.assign(Object.assign({}, omit(child.props, ["disabled"])), {
          key,
          collapsible: (_b = childProps.collapsible) !== null && _b !== void 0 ? _b : "disabled"
        });
        return cloneElement(child, mergedChildProps);
      }
      return child;
    });
  }, [children]);
  return wrapCSSVar(
    // @ts-ignore
    /* @__PURE__ */ reactExports.createElement(Collapse$3, Object.assign({
      ref,
      openMotion
    }, omit(props, ["rootClassName"]), {
      expandIcon: renderExpandIcon,
      prefixCls,
      className: collapseClassName,
      style: Object.assign(Object.assign({}, contextStyle), style),
      // TODO: In the future, destroyInactivePanel in rc-collapse needs to be upgrade to destroyOnHidden
      destroyInactivePanel: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyInactivePanel
    }), items)
  );
});
const Collapse$1 = Object.assign(Collapse, {
  Panel: CollapsePanel
});
var PlusOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" } }, { "tag": "path", "attrs": { "d": "M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z" } }] }, "name": "plus", "theme": "outlined" };
var PlusOutlined = function PlusOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: PlusOutlined$1
  }));
};
var RefIcon = /* @__PURE__ */ reactExports.forwardRef(PlusOutlined);
const TabContext = /* @__PURE__ */ reactExports.createContext(null);
var useIndicator = function useIndicator2(options) {
  var activeTabOffset = options.activeTabOffset, horizontal = options.horizontal, rtl = options.rtl, _options$indicator = options.indicator, indicator = _options$indicator === void 0 ? {} : _options$indicator;
  var size = indicator.size, _indicator$align = indicator.align, align = _indicator$align === void 0 ? "center" : _indicator$align;
  var _useState = reactExports.useState(), _useState2 = _slicedToArray(_useState, 2), inkStyle = _useState2[0], setInkStyle = _useState2[1];
  var inkBarRafRef = reactExports.useRef();
  var getLength = React.useCallback(function(origin) {
    if (typeof size === "function") {
      return size(origin);
    }
    if (typeof size === "number") {
      return size;
    }
    return origin;
  }, [size]);
  function cleanInkBarRaf() {
    wrapperRaf.cancel(inkBarRafRef.current);
  }
  reactExports.useEffect(function() {
    var newInkStyle = {};
    if (activeTabOffset) {
      if (horizontal) {
        newInkStyle.width = getLength(activeTabOffset.width);
        var key = rtl ? "right" : "left";
        if (align === "start") {
          newInkStyle[key] = activeTabOffset[key];
        }
        if (align === "center") {
          newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width / 2;
          newInkStyle.transform = rtl ? "translateX(50%)" : "translateX(-50%)";
        }
        if (align === "end") {
          newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width;
          newInkStyle.transform = "translateX(-100%)";
        }
      } else {
        newInkStyle.height = getLength(activeTabOffset.height);
        if (align === "start") {
          newInkStyle.top = activeTabOffset.top;
        }
        if (align === "center") {
          newInkStyle.top = activeTabOffset.top + activeTabOffset.height / 2;
          newInkStyle.transform = "translateY(-50%)";
        }
        if (align === "end") {
          newInkStyle.top = activeTabOffset.top + activeTabOffset.height;
          newInkStyle.transform = "translateY(-100%)";
        }
      }
    }
    cleanInkBarRaf();
    inkBarRafRef.current = wrapperRaf(function() {
      var isEqual = inkStyle && newInkStyle && Object.keys(newInkStyle).every(function(key2) {
        var newValue = newInkStyle[key2];
        var oldValue = inkStyle[key2];
        return typeof newValue === "number" && typeof oldValue === "number" ? Math.round(newValue) === Math.round(oldValue) : newValue === oldValue;
      });
      if (!isEqual) {
        setInkStyle(newInkStyle);
      }
    });
    return cleanInkBarRaf;
  }, [JSON.stringify(activeTabOffset), horizontal, rtl, align, getLength]);
  return {
    style: inkStyle
  };
};
var DEFAULT_SIZE$1 = {
  width: 0,
  height: 0,
  left: 0,
  top: 0
};
function useOffsets(tabs, tabSizes, holderScrollWidth) {
  return reactExports.useMemo(function() {
    var _tabs$;
    var map = /* @__PURE__ */ new Map();
    var lastOffset = tabSizes.get((_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.key) || DEFAULT_SIZE$1;
    var rightOffset = lastOffset.left + lastOffset.width;
    for (var i = 0; i < tabs.length; i += 1) {
      var key = tabs[i].key;
      var data = tabSizes.get(key);
      if (!data) {
        var _tabs;
        data = tabSizes.get((_tabs = tabs[i - 1]) === null || _tabs === void 0 ? void 0 : _tabs.key) || DEFAULT_SIZE$1;
      }
      var entity = map.get(key) || _objectSpread2({}, data);
      entity.right = rightOffset - entity.left - entity.width;
      map.set(key, entity);
    }
    return map;
  }, [tabs.map(function(tab) {
    return tab.key;
  }).join("_"), tabSizes, holderScrollWidth]);
}
function useSyncState(defaultState, onChange) {
  var stateRef = reactExports.useRef(defaultState);
  var _React$useState = reactExports.useState({}), _React$useState2 = _slicedToArray(_React$useState, 2), forceUpdate = _React$useState2[1];
  function setState(updater) {
    var newValue = typeof updater === "function" ? updater(stateRef.current) : updater;
    if (newValue !== stateRef.current) {
      onChange(newValue, stateRef.current);
    }
    stateRef.current = newValue;
    forceUpdate({});
  }
  return [stateRef.current, setState];
}
var MIN_SWIPE_DISTANCE = 0.1;
var STOP_SWIPE_DISTANCE = 0.01;
var REFRESH_INTERVAL = 20;
var SPEED_OFF_MULTIPLE = Math.pow(0.995, REFRESH_INTERVAL);
function useTouchMove(ref, onOffset) {
  var _useState = reactExports.useState(), _useState2 = _slicedToArray(_useState, 2), touchPosition = _useState2[0], setTouchPosition = _useState2[1];
  var _useState3 = reactExports.useState(0), _useState4 = _slicedToArray(_useState3, 2), lastTimestamp = _useState4[0], setLastTimestamp = _useState4[1];
  var _useState5 = reactExports.useState(0), _useState6 = _slicedToArray(_useState5, 2), lastTimeDiff = _useState6[0], setLastTimeDiff = _useState6[1];
  var _useState7 = reactExports.useState(), _useState8 = _slicedToArray(_useState7, 2), lastOffset = _useState8[0], setLastOffset = _useState8[1];
  var motionRef = reactExports.useRef();
  function onTouchStart(e) {
    var _e$touches$ = e.touches[0], screenX = _e$touches$.screenX, screenY = _e$touches$.screenY;
    setTouchPosition({
      x: screenX,
      y: screenY
    });
    window.clearInterval(motionRef.current);
  }
  function onTouchMove(e) {
    if (!touchPosition) return;
    var _e$touches$2 = e.touches[0], screenX = _e$touches$2.screenX, screenY = _e$touches$2.screenY;
    setTouchPosition({
      x: screenX,
      y: screenY
    });
    var offsetX = screenX - touchPosition.x;
    var offsetY = screenY - touchPosition.y;
    onOffset(offsetX, offsetY);
    var now = Date.now();
    setLastTimestamp(now);
    setLastTimeDiff(now - lastTimestamp);
    setLastOffset({
      x: offsetX,
      y: offsetY
    });
  }
  function onTouchEnd() {
    if (!touchPosition) return;
    setTouchPosition(null);
    setLastOffset(null);
    if (lastOffset) {
      var distanceX = lastOffset.x / lastTimeDiff;
      var distanceY = lastOffset.y / lastTimeDiff;
      var absX = Math.abs(distanceX);
      var absY = Math.abs(distanceY);
      if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) return;
      var currentX = distanceX;
      var currentY = distanceY;
      motionRef.current = window.setInterval(function() {
        if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
          window.clearInterval(motionRef.current);
          return;
        }
        currentX *= SPEED_OFF_MULTIPLE;
        currentY *= SPEED_OFF_MULTIPLE;
        onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL);
      }, REFRESH_INTERVAL);
    }
  }
  var lastWheelDirectionRef = reactExports.useRef();
  function onWheel(e) {
    var deltaX = e.deltaX, deltaY = e.deltaY;
    var mixed = 0;
    var absX = Math.abs(deltaX);
    var absY = Math.abs(deltaY);
    if (absX === absY) {
      mixed = lastWheelDirectionRef.current === "x" ? deltaX : deltaY;
    } else if (absX > absY) {
      mixed = deltaX;
      lastWheelDirectionRef.current = "x";
    } else {
      mixed = deltaY;
      lastWheelDirectionRef.current = "y";
    }
    if (onOffset(-mixed, -mixed)) {
      e.preventDefault();
    }
  }
  var touchEventsRef = reactExports.useRef(null);
  touchEventsRef.current = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onWheel
  };
  reactExports.useEffect(function() {
    function onProxyTouchStart(e) {
      touchEventsRef.current.onTouchStart(e);
    }
    function onProxyTouchMove(e) {
      touchEventsRef.current.onTouchMove(e);
    }
    function onProxyTouchEnd(e) {
      touchEventsRef.current.onTouchEnd(e);
    }
    function onProxyWheel(e) {
      touchEventsRef.current.onWheel(e);
    }
    document.addEventListener("touchmove", onProxyTouchMove, {
      passive: false
    });
    document.addEventListener("touchend", onProxyTouchEnd, {
      passive: true
    });
    ref.current.addEventListener("touchstart", onProxyTouchStart, {
      passive: true
    });
    ref.current.addEventListener("wheel", onProxyWheel, {
      passive: false
    });
    return function() {
      document.removeEventListener("touchmove", onProxyTouchMove);
      document.removeEventListener("touchend", onProxyTouchEnd);
    };
  }, []);
}
function useUpdate(callback) {
  var _useState = reactExports.useState(0), _useState2 = _slicedToArray(_useState, 2), count = _useState2[0], setCount = _useState2[1];
  var effectRef = reactExports.useRef(0);
  var callbackRef = reactExports.useRef();
  callbackRef.current = callback;
  useLayoutUpdateEffect(function() {
    var _callbackRef$current;
    (_callbackRef$current = callbackRef.current) === null || _callbackRef$current === void 0 || _callbackRef$current.call(callbackRef);
  }, [count]);
  return function() {
    if (effectRef.current !== count) {
      return;
    }
    effectRef.current += 1;
    setCount(effectRef.current);
  };
}
function useUpdateState(defaultState) {
  var batchRef = reactExports.useRef([]);
  var _useState3 = reactExports.useState({}), _useState4 = _slicedToArray(_useState3, 2), forceUpdate = _useState4[1];
  var state = reactExports.useRef(typeof defaultState === "function" ? defaultState() : defaultState);
  var flushUpdate = useUpdate(function() {
    var current = state.current;
    batchRef.current.forEach(function(callback) {
      current = callback(current);
    });
    batchRef.current = [];
    state.current = current;
    forceUpdate({});
  });
  function updater(callback) {
    batchRef.current.push(callback);
    flushUpdate();
  }
  return [state.current, updater];
}
var DEFAULT_SIZE = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  right: 0
};
function useVisibleRange(tabOffsets, visibleTabContentValue, transform, tabContentSizeValue, addNodeSizeValue, operationNodeSizeValue, _ref) {
  var tabs = _ref.tabs, tabPosition = _ref.tabPosition, rtl = _ref.rtl;
  var charUnit;
  var position;
  var transformSize;
  if (["top", "bottom"].includes(tabPosition)) {
    charUnit = "width";
    position = rtl ? "right" : "left";
    transformSize = Math.abs(transform);
  } else {
    charUnit = "height";
    position = "top";
    transformSize = -transform;
  }
  return reactExports.useMemo(function() {
    if (!tabs.length) {
      return [0, 0];
    }
    var len = tabs.length;
    var endIndex = len;
    for (var i = 0; i < len; i += 1) {
      var offset = tabOffsets.get(tabs[i].key) || DEFAULT_SIZE;
      if (Math.floor(offset[position] + offset[charUnit]) > Math.floor(transformSize + visibleTabContentValue)) {
        endIndex = i - 1;
        break;
      }
    }
    var startIndex = 0;
    for (var _i = len - 1; _i >= 0; _i -= 1) {
      var _offset = tabOffsets.get(tabs[_i].key) || DEFAULT_SIZE;
      if (_offset[position] < transformSize) {
        startIndex = _i + 1;
        break;
      }
    }
    return startIndex > endIndex ? [0, -1] : [startIndex, endIndex];
  }, [tabOffsets, visibleTabContentValue, tabContentSizeValue, addNodeSizeValue, operationNodeSizeValue, transformSize, tabPosition, tabs.map(function(tab) {
    return tab.key;
  }).join("_"), rtl]);
}
function stringify(obj) {
  var tgt;
  if (obj instanceof Map) {
    tgt = {};
    obj.forEach(function(v, k) {
      tgt[k] = v;
    });
  } else {
    tgt = obj;
  }
  return JSON.stringify(tgt);
}
var RC_TABS_DOUBLE_QUOTE = "TABS_DQ";
function genDataNodeKey(key) {
  return String(key).replace(/"/g, RC_TABS_DOUBLE_QUOTE);
}
function getRemovable(closable, closeIcon, editable, disabled) {
  if (
    // Only editable tabs can be removed
    !editable || // Tabs cannot be removed when disabled
    disabled || // closable is false
    closable === false || // If closable is undefined, the remove button should be hidden when closeIcon is null or false
    closable === void 0 && (closeIcon === false || closeIcon === null)
  ) {
    return false;
  }
  return true;
}
var AddButton = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, editable = props.editable, locale = props.locale, style = props.style;
  if (!editable || editable.showAdd === false) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("button", {
    ref,
    type: "button",
    className: "".concat(prefixCls, "-nav-add"),
    style,
    "aria-label": (locale === null || locale === void 0 ? void 0 : locale.addAriaLabel) || "Add tab",
    onClick: function onClick(event) {
      editable.onEdit("add", {
        event
      });
    }
  }, editable.addIcon || "+");
});
var ExtraContent = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var position = props.position, prefixCls = props.prefixCls, extra = props.extra;
  if (!extra) {
    return null;
  }
  var content;
  var assertExtra = {};
  if (_typeof(extra) === "object" && !/* @__PURE__ */ reactExports.isValidElement(extra)) {
    assertExtra = extra;
  } else {
    assertExtra.right = extra;
  }
  if (position === "right") {
    content = assertExtra.right;
  }
  if (position === "left") {
    content = assertExtra.left;
  }
  return content ? /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-extra-content"),
    ref
  }, content) : null;
});
var OperationNode = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, id = props.id, tabs = props.tabs, locale = props.locale, mobile = props.mobile, _props$more = props.more, moreProps = _props$more === void 0 ? {} : _props$more, style = props.style, className = props.className, editable = props.editable, tabBarGutter = props.tabBarGutter, rtl = props.rtl, removeAriaLabel = props.removeAriaLabel, onTabClick = props.onTabClick, getPopupContainer = props.getPopupContainer, popupClassName = props.popupClassName;
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray(_useState, 2), open = _useState2[0], setOpen = _useState2[1];
  var _useState3 = reactExports.useState(null), _useState4 = _slicedToArray(_useState3, 2), selectedKey = _useState4[0], setSelectedKey = _useState4[1];
  var _moreProps$icon = moreProps.icon, moreIcon = _moreProps$icon === void 0 ? "More" : _moreProps$icon;
  var popupId = "".concat(id, "-more-popup");
  var dropdownPrefix = "".concat(prefixCls, "-dropdown");
  var selectedItemId = selectedKey !== null ? "".concat(popupId, "-").concat(selectedKey) : null;
  var dropdownAriaLabel = locale === null || locale === void 0 ? void 0 : locale.dropdownAriaLabel;
  function onRemoveTab(event, key) {
    event.preventDefault();
    event.stopPropagation();
    editable.onEdit("remove", {
      key,
      event
    });
  }
  var menu = /* @__PURE__ */ reactExports.createElement(ExportMenu, {
    onClick: function onClick(_ref) {
      var key = _ref.key, domEvent = _ref.domEvent;
      onTabClick(key, domEvent);
      setOpen(false);
    },
    prefixCls: "".concat(dropdownPrefix, "-menu"),
    id: popupId,
    tabIndex: -1,
    role: "listbox",
    "aria-activedescendant": selectedItemId,
    selectedKeys: [selectedKey],
    "aria-label": dropdownAriaLabel !== void 0 ? dropdownAriaLabel : "expanded dropdown"
  }, tabs.map(function(tab) {
    var closable = tab.closable, disabled = tab.disabled, closeIcon = tab.closeIcon, key = tab.key, label = tab.label;
    var removable = getRemovable(closable, closeIcon, editable, disabled);
    return /* @__PURE__ */ reactExports.createElement(MenuItem, {
      key,
      id: "".concat(popupId, "-").concat(key),
      role: "option",
      "aria-controls": id && "".concat(id, "-panel-").concat(key),
      disabled
    }, /* @__PURE__ */ reactExports.createElement("span", null, label), removable && /* @__PURE__ */ reactExports.createElement("button", {
      type: "button",
      "aria-label": removeAriaLabel || "remove",
      tabIndex: 0,
      className: "".concat(dropdownPrefix, "-menu-item-remove"),
      onClick: function onClick(e) {
        e.stopPropagation();
        onRemoveTab(e, key);
      }
    }, closeIcon || editable.removeIcon || "×"));
  }));
  function selectOffset(offset) {
    var enabledTabs = tabs.filter(function(tab2) {
      return !tab2.disabled;
    });
    var selectedIndex = enabledTabs.findIndex(function(tab2) {
      return tab2.key === selectedKey;
    }) || 0;
    var len = enabledTabs.length;
    for (var i = 0; i < len; i += 1) {
      selectedIndex = (selectedIndex + offset + len) % len;
      var tab = enabledTabs[selectedIndex];
      if (!tab.disabled) {
        setSelectedKey(tab.key);
        return;
      }
    }
  }
  function onKeyDown(e) {
    var which = e.which;
    if (!open) {
      if ([KeyCode.DOWN, KeyCode.SPACE, KeyCode.ENTER].includes(which)) {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }
    switch (which) {
      case KeyCode.UP:
        selectOffset(-1);
        e.preventDefault();
        break;
      case KeyCode.DOWN:
        selectOffset(1);
        e.preventDefault();
        break;
      case KeyCode.ESC:
        setOpen(false);
        break;
      case KeyCode.SPACE:
      case KeyCode.ENTER:
        if (selectedKey !== null) {
          onTabClick(selectedKey, e);
        }
        break;
    }
  }
  reactExports.useEffect(function() {
    var ele = document.getElementById(selectedItemId);
    if (ele && ele.scrollIntoView) {
      ele.scrollIntoView(false);
    }
  }, [selectedKey]);
  reactExports.useEffect(function() {
    if (!open) {
      setSelectedKey(null);
    }
  }, [open]);
  var moreStyle = _defineProperty({}, rtl ? "marginRight" : "marginLeft", tabBarGutter);
  if (!tabs.length) {
    moreStyle.visibility = "hidden";
    moreStyle.order = 1;
  }
  var overlayClassName = classNames(_defineProperty({}, "".concat(dropdownPrefix, "-rtl"), rtl));
  var moreNode = mobile ? null : /* @__PURE__ */ reactExports.createElement(Dropdown, _extends({
    prefixCls: dropdownPrefix,
    overlay: menu,
    visible: tabs.length ? open : false,
    onVisibleChange: setOpen,
    overlayClassName: classNames(overlayClassName, popupClassName),
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    getPopupContainer
  }, moreProps), /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    className: "".concat(prefixCls, "-nav-more"),
    style: moreStyle,
    "aria-haspopup": "listbox",
    "aria-controls": popupId,
    id: "".concat(id, "-more"),
    "aria-expanded": open,
    onKeyDown
  }, moreIcon));
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-nav-operations"), className),
    style,
    ref
  }, moreNode, /* @__PURE__ */ reactExports.createElement(AddButton, {
    prefixCls,
    locale,
    editable
  }));
});
const OperationNode$1 = /* @__PURE__ */ reactExports.memo(OperationNode, function(_, next) {
  return (
    // https://github.com/ant-design/ant-design/issues/32544
    // We'd better remove syntactic sugar in `rc-menu` since this has perf issue
    next.tabMoving
  );
});
var TabNode = function TabNode2(props) {
  var prefixCls = props.prefixCls, id = props.id, active = props.active, focus = props.focus, _props$tab = props.tab, key = _props$tab.key, label = _props$tab.label, disabled = _props$tab.disabled, closeIcon = _props$tab.closeIcon, icon = _props$tab.icon, closable = props.closable, renderWrapper = props.renderWrapper, removeAriaLabel = props.removeAriaLabel, editable = props.editable, onClick = props.onClick, onFocus = props.onFocus, onBlur = props.onBlur, onKeyDown = props.onKeyDown, onMouseDown = props.onMouseDown, onMouseUp = props.onMouseUp, style = props.style, tabCount = props.tabCount, currentPosition = props.currentPosition;
  var tabPrefix = "".concat(prefixCls, "-tab");
  var removable = getRemovable(closable, closeIcon, editable, disabled);
  function onInternalClick(e) {
    if (disabled) {
      return;
    }
    onClick(e);
  }
  function onRemoveTab(event) {
    event.preventDefault();
    event.stopPropagation();
    editable.onEdit("remove", {
      key,
      event
    });
  }
  var labelNode = reactExports.useMemo(function() {
    return icon && typeof label === "string" ? /* @__PURE__ */ reactExports.createElement("span", null, label) : label;
  }, [label, icon]);
  var btnRef = reactExports.useRef(null);
  reactExports.useEffect(function() {
    if (focus && btnRef.current) {
      btnRef.current.focus();
    }
  }, [focus]);
  var node = /* @__PURE__ */ reactExports.createElement("div", {
    key,
    "data-node-key": genDataNodeKey(key),
    className: classNames(tabPrefix, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(tabPrefix, "-with-remove"), removable), "".concat(tabPrefix, "-active"), active), "".concat(tabPrefix, "-disabled"), disabled), "".concat(tabPrefix, "-focus"), focus)),
    style,
    onClick: onInternalClick
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: btnRef,
    role: "tab",
    "aria-selected": active,
    id: id && "".concat(id, "-tab-").concat(key),
    className: "".concat(tabPrefix, "-btn"),
    "aria-controls": id && "".concat(id, "-panel-").concat(key),
    "aria-disabled": disabled,
    tabIndex: disabled ? null : active ? 0 : -1,
    onClick: function onClick2(e) {
      e.stopPropagation();
      onInternalClick(e);
    },
    onKeyDown,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur
  }, focus && /* @__PURE__ */ reactExports.createElement("div", {
    "aria-live": "polite",
    style: {
      width: 0,
      height: 0,
      position: "absolute",
      overflow: "hidden",
      opacity: 0
    }
  }, "Tab ".concat(currentPosition, " of ").concat(tabCount)), icon && /* @__PURE__ */ reactExports.createElement("span", {
    className: "".concat(tabPrefix, "-icon")
  }, icon), label && labelNode), removable && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    role: "tab",
    "aria-label": removeAriaLabel || "remove",
    tabIndex: active ? 0 : -1,
    className: "".concat(tabPrefix, "-remove"),
    onClick: function onClick2(e) {
      e.stopPropagation();
      onRemoveTab(e);
    }
  }, closeIcon || editable.removeIcon || "×"));
  return renderWrapper ? renderWrapper(node) : node;
};
var getTabSize = function getTabSize2(tab, containerRect) {
  var offsetWidth = tab.offsetWidth, offsetHeight = tab.offsetHeight, offsetTop = tab.offsetTop, offsetLeft = tab.offsetLeft;
  var _tab$getBoundingClien = tab.getBoundingClientRect(), width = _tab$getBoundingClien.width, height = _tab$getBoundingClien.height, left = _tab$getBoundingClien.left, top = _tab$getBoundingClien.top;
  if (Math.abs(width - offsetWidth) < 1) {
    return [width, height, left - containerRect.left, top - containerRect.top];
  }
  return [offsetWidth, offsetHeight, offsetLeft, offsetTop];
};
var getSize = function getSize2(refObj) {
  var _ref = refObj.current || {}, _ref$offsetWidth = _ref.offsetWidth, offsetWidth = _ref$offsetWidth === void 0 ? 0 : _ref$offsetWidth, _ref$offsetHeight = _ref.offsetHeight, offsetHeight = _ref$offsetHeight === void 0 ? 0 : _ref$offsetHeight;
  if (refObj.current) {
    var _refObj$current$getBo = refObj.current.getBoundingClientRect(), width = _refObj$current$getBo.width, height = _refObj$current$getBo.height;
    if (Math.abs(width - offsetWidth) < 1) {
      return [width, height];
    }
  }
  return [offsetWidth, offsetHeight];
};
var getUnitValue = function getUnitValue2(size, tabPositionTopOrBottom) {
  return size[tabPositionTopOrBottom ? 0 : 1];
};
var TabNavList = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var className = props.className, style = props.style, id = props.id, animated = props.animated, activeKey = props.activeKey, rtl = props.rtl, extra = props.extra, editable = props.editable, locale = props.locale, tabPosition = props.tabPosition, tabBarGutter = props.tabBarGutter, children = props.children, onTabClick = props.onTabClick, onTabScroll = props.onTabScroll, indicator = props.indicator;
  var _React$useContext = reactExports.useContext(TabContext), prefixCls = _React$useContext.prefixCls, tabs = _React$useContext.tabs;
  var containerRef = reactExports.useRef(null);
  var extraLeftRef = reactExports.useRef(null);
  var extraRightRef = reactExports.useRef(null);
  var tabsWrapperRef = reactExports.useRef(null);
  var tabListRef = reactExports.useRef(null);
  var operationsRef = reactExports.useRef(null);
  var innerAddButtonRef = reactExports.useRef(null);
  var tabPositionTopOrBottom = tabPosition === "top" || tabPosition === "bottom";
  var _useSyncState = useSyncState(0, function(next, prev) {
    if (tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({
        direction: next > prev ? "left" : "right"
      });
    }
  }), _useSyncState2 = _slicedToArray(_useSyncState, 2), transformLeft = _useSyncState2[0], setTransformLeft = _useSyncState2[1];
  var _useSyncState3 = useSyncState(0, function(next, prev) {
    if (!tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({
        direction: next > prev ? "top" : "bottom"
      });
    }
  }), _useSyncState4 = _slicedToArray(_useSyncState3, 2), transformTop = _useSyncState4[0], setTransformTop = _useSyncState4[1];
  var _useState = reactExports.useState([0, 0]), _useState2 = _slicedToArray(_useState, 2), containerExcludeExtraSize = _useState2[0], setContainerExcludeExtraSize = _useState2[1];
  var _useState3 = reactExports.useState([0, 0]), _useState4 = _slicedToArray(_useState3, 2), tabContentSize = _useState4[0], setTabContentSize = _useState4[1];
  var _useState5 = reactExports.useState([0, 0]), _useState6 = _slicedToArray(_useState5, 2), addSize = _useState6[0], setAddSize = _useState6[1];
  var _useState7 = reactExports.useState([0, 0]), _useState8 = _slicedToArray(_useState7, 2), operationSize = _useState8[0], setOperationSize = _useState8[1];
  var _useUpdateState = useUpdateState(/* @__PURE__ */ new Map()), _useUpdateState2 = _slicedToArray(_useUpdateState, 2), tabSizes = _useUpdateState2[0], setTabSizes = _useUpdateState2[1];
  var tabOffsets = useOffsets(tabs, tabSizes, tabContentSize[0]);
  var containerExcludeExtraSizeValue = getUnitValue(containerExcludeExtraSize, tabPositionTopOrBottom);
  var tabContentSizeValue = getUnitValue(tabContentSize, tabPositionTopOrBottom);
  var addSizeValue = getUnitValue(addSize, tabPositionTopOrBottom);
  var operationSizeValue = getUnitValue(operationSize, tabPositionTopOrBottom);
  var needScroll = Math.floor(containerExcludeExtraSizeValue) < Math.floor(tabContentSizeValue + addSizeValue);
  var visibleTabContentValue = needScroll ? containerExcludeExtraSizeValue - operationSizeValue : containerExcludeExtraSizeValue - addSizeValue;
  var operationsHiddenClassName = "".concat(prefixCls, "-nav-operations-hidden");
  var transformMin = 0;
  var transformMax = 0;
  if (!tabPositionTopOrBottom) {
    transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
    transformMax = 0;
  } else if (rtl) {
    transformMin = 0;
    transformMax = Math.max(0, tabContentSizeValue - visibleTabContentValue);
  } else {
    transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
    transformMax = 0;
  }
  function alignInRange(value) {
    if (value < transformMin) {
      return transformMin;
    }
    if (value > transformMax) {
      return transformMax;
    }
    return value;
  }
  var touchMovingRef = reactExports.useRef(null);
  var _useState9 = reactExports.useState(), _useState10 = _slicedToArray(_useState9, 2), lockAnimation = _useState10[0], setLockAnimation = _useState10[1];
  function doLockAnimation() {
    setLockAnimation(Date.now());
  }
  function clearTouchMoving() {
    if (touchMovingRef.current) {
      clearTimeout(touchMovingRef.current);
    }
  }
  useTouchMove(tabsWrapperRef, function(offsetX, offsetY) {
    function doMove(setState, offset) {
      setState(function(value) {
        var newValue = alignInRange(value + offset);
        return newValue;
      });
    }
    if (!needScroll) {
      return false;
    }
    if (tabPositionTopOrBottom) {
      doMove(setTransformLeft, offsetX);
    } else {
      doMove(setTransformTop, offsetY);
    }
    clearTouchMoving();
    doLockAnimation();
    return true;
  });
  reactExports.useEffect(function() {
    clearTouchMoving();
    if (lockAnimation) {
      touchMovingRef.current = setTimeout(function() {
        setLockAnimation(0);
      }, 100);
    }
    return clearTouchMoving;
  }, [lockAnimation]);
  var _useVisibleRange = useVisibleRange(
    tabOffsets,
    // Container
    visibleTabContentValue,
    // Transform
    tabPositionTopOrBottom ? transformLeft : transformTop,
    // Tabs
    tabContentSizeValue,
    // Add
    addSizeValue,
    // Operation
    operationSizeValue,
    _objectSpread2(_objectSpread2({}, props), {}, {
      tabs
    })
  ), _useVisibleRange2 = _slicedToArray(_useVisibleRange, 2), visibleStart = _useVisibleRange2[0], visibleEnd = _useVisibleRange2[1];
  var scrollToTab = useEvent(function() {
    var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : activeKey;
    var tabOffset = tabOffsets.get(key) || {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0
    };
    if (tabPositionTopOrBottom) {
      var newTransform = transformLeft;
      if (rtl) {
        if (tabOffset.right < transformLeft) {
          newTransform = tabOffset.right;
        } else if (tabOffset.right + tabOffset.width > transformLeft + visibleTabContentValue) {
          newTransform = tabOffset.right + tabOffset.width - visibleTabContentValue;
        }
      } else if (tabOffset.left < -transformLeft) {
        newTransform = -tabOffset.left;
      } else if (tabOffset.left + tabOffset.width > -transformLeft + visibleTabContentValue) {
        newTransform = -(tabOffset.left + tabOffset.width - visibleTabContentValue);
      }
      setTransformTop(0);
      setTransformLeft(alignInRange(newTransform));
    } else {
      var _newTransform = transformTop;
      if (tabOffset.top < -transformTop) {
        _newTransform = -tabOffset.top;
      } else if (tabOffset.top + tabOffset.height > -transformTop + visibleTabContentValue) {
        _newTransform = -(tabOffset.top + tabOffset.height - visibleTabContentValue);
      }
      setTransformLeft(0);
      setTransformTop(alignInRange(_newTransform));
    }
  });
  var _useState11 = reactExports.useState(), _useState12 = _slicedToArray(_useState11, 2), focusKey = _useState12[0], setFocusKey = _useState12[1];
  var _useState13 = reactExports.useState(false), _useState14 = _slicedToArray(_useState13, 2), isMouse = _useState14[0], setIsMouse = _useState14[1];
  var enabledTabs = tabs.filter(function(tab) {
    return !tab.disabled;
  }).map(function(tab) {
    return tab.key;
  });
  var onOffset = function onOffset2(offset) {
    var currentIndex = enabledTabs.indexOf(focusKey || activeKey);
    var len = enabledTabs.length;
    var nextIndex = (currentIndex + offset + len) % len;
    var newKey = enabledTabs[nextIndex];
    setFocusKey(newKey);
  };
  var handleRemoveTab = function handleRemoveTab2(removalTabKey, e) {
    var removeIndex = enabledTabs.indexOf(removalTabKey);
    var removeTab = tabs.find(function(tab) {
      return tab.key === removalTabKey;
    });
    var removable = getRemovable(removeTab === null || removeTab === void 0 ? void 0 : removeTab.closable, removeTab === null || removeTab === void 0 ? void 0 : removeTab.closeIcon, editable, removeTab === null || removeTab === void 0 ? void 0 : removeTab.disabled);
    if (removable) {
      e.preventDefault();
      e.stopPropagation();
      editable.onEdit("remove", {
        key: removalTabKey,
        event: e
      });
      if (removeIndex === enabledTabs.length - 1) {
        onOffset(-1);
      } else {
        onOffset(1);
      }
    }
  };
  var handleMouseDown = function handleMouseDown2(key, e) {
    setIsMouse(true);
    if (e.button === 1) {
      handleRemoveTab(key, e);
    }
  };
  var handleKeyDown = function handleKeyDown2(e) {
    var code = e.code;
    var isRTL = rtl && tabPositionTopOrBottom;
    var firstEnabledTab = enabledTabs[0];
    var lastEnabledTab = enabledTabs[enabledTabs.length - 1];
    switch (code) {
      case "ArrowLeft": {
        if (tabPositionTopOrBottom) {
          onOffset(isRTL ? 1 : -1);
        }
        break;
      }
      case "ArrowRight": {
        if (tabPositionTopOrBottom) {
          onOffset(isRTL ? -1 : 1);
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (!tabPositionTopOrBottom) {
          onOffset(-1);
        }
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (!tabPositionTopOrBottom) {
          onOffset(1);
        }
        break;
      }
      case "Home": {
        e.preventDefault();
        setFocusKey(firstEnabledTab);
        break;
      }
      case "End": {
        e.preventDefault();
        setFocusKey(lastEnabledTab);
        break;
      }
      case "Enter":
      case "Space": {
        e.preventDefault();
        onTabClick(focusKey !== null && focusKey !== void 0 ? focusKey : activeKey, e);
        break;
      }
      case "Backspace":
      case "Delete": {
        handleRemoveTab(focusKey, e);
        break;
      }
    }
  };
  var tabNodeStyle = {};
  if (tabPositionTopOrBottom) {
    tabNodeStyle[rtl ? "marginRight" : "marginLeft"] = tabBarGutter;
  } else {
    tabNodeStyle.marginTop = tabBarGutter;
  }
  var tabNodes = tabs.map(function(tab, i) {
    var key = tab.key;
    return /* @__PURE__ */ reactExports.createElement(TabNode, {
      id,
      prefixCls,
      key,
      tab,
      style: i === 0 ? void 0 : tabNodeStyle,
      closable: tab.closable,
      editable,
      active: key === activeKey,
      focus: key === focusKey,
      renderWrapper: children,
      removeAriaLabel: locale === null || locale === void 0 ? void 0 : locale.removeAriaLabel,
      tabCount: enabledTabs.length,
      currentPosition: i + 1,
      onClick: function onClick(e) {
        onTabClick(key, e);
      },
      onKeyDown: handleKeyDown,
      onFocus: function onFocus() {
        if (!isMouse) {
          setFocusKey(key);
        }
        scrollToTab(key);
        doLockAnimation();
        if (!tabsWrapperRef.current) {
          return;
        }
        if (!rtl) {
          tabsWrapperRef.current.scrollLeft = 0;
        }
        tabsWrapperRef.current.scrollTop = 0;
      },
      onBlur: function onBlur() {
        setFocusKey(void 0);
      },
      onMouseDown: function onMouseDown(e) {
        return handleMouseDown(key, e);
      },
      onMouseUp: function onMouseUp() {
        setIsMouse(false);
      }
    });
  });
  var updateTabSizes = function updateTabSizes2() {
    return setTabSizes(function() {
      var _tabListRef$current;
      var newSizes = /* @__PURE__ */ new Map();
      var listRect = (_tabListRef$current = tabListRef.current) === null || _tabListRef$current === void 0 ? void 0 : _tabListRef$current.getBoundingClientRect();
      tabs.forEach(function(_ref2) {
        var _tabListRef$current2;
        var key = _ref2.key;
        var btnNode = (_tabListRef$current2 = tabListRef.current) === null || _tabListRef$current2 === void 0 ? void 0 : _tabListRef$current2.querySelector('[data-node-key="'.concat(genDataNodeKey(key), '"]'));
        if (btnNode) {
          var _getTabSize = getTabSize(btnNode, listRect), _getTabSize2 = _slicedToArray(_getTabSize, 4), width = _getTabSize2[0], height = _getTabSize2[1], left = _getTabSize2[2], top = _getTabSize2[3];
          newSizes.set(key, {
            width,
            height,
            left,
            top
          });
        }
      });
      return newSizes;
    });
  };
  reactExports.useEffect(function() {
    updateTabSizes();
  }, [tabs.map(function(tab) {
    return tab.key;
  }).join("_")]);
  var onListHolderResize = useUpdate(function() {
    var containerSize = getSize(containerRef);
    var extraLeftSize = getSize(extraLeftRef);
    var extraRightSize = getSize(extraRightRef);
    setContainerExcludeExtraSize([containerSize[0] - extraLeftSize[0] - extraRightSize[0], containerSize[1] - extraLeftSize[1] - extraRightSize[1]]);
    var newAddSize = getSize(innerAddButtonRef);
    setAddSize(newAddSize);
    var newOperationSize = getSize(operationsRef);
    setOperationSize(newOperationSize);
    var tabContentFullSize = getSize(tabListRef);
    setTabContentSize([tabContentFullSize[0] - newAddSize[0], tabContentFullSize[1] - newAddSize[1]]);
    updateTabSizes();
  });
  var startHiddenTabs = tabs.slice(0, visibleStart);
  var endHiddenTabs = tabs.slice(visibleEnd + 1);
  var hiddenTabs = [].concat(_toConsumableArray(startHiddenTabs), _toConsumableArray(endHiddenTabs));
  var activeTabOffset = tabOffsets.get(activeKey);
  var _useIndicator = useIndicator({
    activeTabOffset,
    horizontal: tabPositionTopOrBottom,
    indicator,
    rtl
  }), indicatorStyle = _useIndicator.style;
  reactExports.useEffect(function() {
    scrollToTab();
  }, [activeKey, transformMin, transformMax, stringify(activeTabOffset), stringify(tabOffsets), tabPositionTopOrBottom]);
  reactExports.useEffect(function() {
    onListHolderResize();
  }, [rtl]);
  var hasDropdown = !!hiddenTabs.length;
  var wrapPrefix = "".concat(prefixCls, "-nav-wrap");
  var pingLeft;
  var pingRight;
  var pingTop;
  var pingBottom;
  if (tabPositionTopOrBottom) {
    if (rtl) {
      pingRight = transformLeft > 0;
      pingLeft = transformLeft !== transformMax;
    } else {
      pingLeft = transformLeft < 0;
      pingRight = transformLeft !== transformMin;
    }
  } else {
    pingTop = transformTop < 0;
    pingBottom = transformTop !== transformMin;
  }
  return /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: onListHolderResize
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: useComposeRef(ref, containerRef),
    role: "tablist",
    "aria-orientation": tabPositionTopOrBottom ? "horizontal" : "vertical",
    className: classNames("".concat(prefixCls, "-nav"), className),
    style,
    onKeyDown: function onKeyDown() {
      doLockAnimation();
    }
  }, /* @__PURE__ */ reactExports.createElement(ExtraContent, {
    ref: extraLeftRef,
    position: "left",
    extra,
    prefixCls
  }), /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: onListHolderResize
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(wrapPrefix, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(wrapPrefix, "-ping-left"), pingLeft), "".concat(wrapPrefix, "-ping-right"), pingRight), "".concat(wrapPrefix, "-ping-top"), pingTop), "".concat(wrapPrefix, "-ping-bottom"), pingBottom)),
    ref: tabsWrapperRef
  }, /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: onListHolderResize
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: tabListRef,
    className: "".concat(prefixCls, "-nav-list"),
    style: {
      transform: "translate(".concat(transformLeft, "px, ").concat(transformTop, "px)"),
      transition: lockAnimation ? "none" : void 0
    }
  }, tabNodes, /* @__PURE__ */ reactExports.createElement(AddButton, {
    ref: innerAddButtonRef,
    prefixCls,
    locale,
    editable,
    style: _objectSpread2(_objectSpread2({}, tabNodes.length === 0 ? void 0 : tabNodeStyle), {}, {
      visibility: hasDropdown ? "hidden" : null
    })
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-ink-bar"), _defineProperty({}, "".concat(prefixCls, "-ink-bar-animated"), animated.inkBar)),
    style: indicatorStyle
  }))))), /* @__PURE__ */ reactExports.createElement(OperationNode$1, _extends({}, props, {
    removeAriaLabel: locale === null || locale === void 0 ? void 0 : locale.removeAriaLabel,
    ref: operationsRef,
    prefixCls,
    tabs: hiddenTabs,
    className: !hasDropdown && operationsHiddenClassName,
    tabMoving: !!lockAnimation
  })), /* @__PURE__ */ reactExports.createElement(ExtraContent, {
    ref: extraRightRef,
    position: "right",
    extra,
    prefixCls
  })));
});
var TabPane$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, className = props.className, style = props.style, id = props.id, active = props.active, tabKey = props.tabKey, children = props.children;
  return /* @__PURE__ */ reactExports.createElement("div", {
    id: id && "".concat(id, "-panel-").concat(tabKey),
    role: "tabpanel",
    tabIndex: active ? 0 : -1,
    "aria-labelledby": id && "".concat(id, "-tab-").concat(tabKey),
    "aria-hidden": !active,
    style,
    className: classNames(prefixCls, active && "".concat(prefixCls, "-active"), className),
    ref
  }, children);
});
var _excluded$2 = ["renderTabBar"], _excluded2 = ["label", "key"];
var TabNavListWrapper = function TabNavListWrapper2(_ref) {
  var renderTabBar = _ref.renderTabBar, restProps = _objectWithoutProperties(_ref, _excluded$2);
  var _React$useContext = reactExports.useContext(TabContext), tabs = _React$useContext.tabs;
  if (renderTabBar) {
    var tabNavBarProps = _objectSpread2(_objectSpread2({}, restProps), {}, {
      // Legacy support. We do not use this actually
      panes: tabs.map(function(_ref2) {
        var label = _ref2.label, key = _ref2.key, restTabProps = _objectWithoutProperties(_ref2, _excluded2);
        return /* @__PURE__ */ reactExports.createElement(TabPane$1, _extends({
          tab: label,
          key,
          tabKey: key
        }, restTabProps));
      })
    });
    return renderTabBar(tabNavBarProps, TabNavList);
  }
  return /* @__PURE__ */ reactExports.createElement(TabNavList, restProps);
};
var _excluded$1 = ["key", "forceRender", "style", "className", "destroyInactiveTabPane"];
var TabPanelList = function TabPanelList2(props) {
  var id = props.id, activeKey = props.activeKey, animated = props.animated, tabPosition = props.tabPosition, destroyInactiveTabPane = props.destroyInactiveTabPane;
  var _React$useContext = reactExports.useContext(TabContext), prefixCls = _React$useContext.prefixCls, tabs = _React$useContext.tabs;
  var tabPaneAnimated = animated.tabPane;
  var tabPanePrefixCls = "".concat(prefixCls, "-tabpane");
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-content-holder"))
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-content"), "".concat(prefixCls, "-content-").concat(tabPosition), _defineProperty({}, "".concat(prefixCls, "-content-animated"), tabPaneAnimated))
  }, tabs.map(function(item) {
    var key = item.key, forceRender = item.forceRender, paneStyle = item.style, paneClassName = item.className, itemDestroyInactiveTabPane = item.destroyInactiveTabPane, restTabProps = _objectWithoutProperties(item, _excluded$1);
    var active = key === activeKey;
    return /* @__PURE__ */ reactExports.createElement(CSSMotion, _extends({
      key,
      visible: active,
      forceRender,
      removeOnLeave: !!(destroyInactiveTabPane || itemDestroyInactiveTabPane),
      leavedClassName: "".concat(tabPanePrefixCls, "-hidden")
    }, animated.tabPaneMotion), function(_ref, ref) {
      var motionStyle = _ref.style, motionClassName = _ref.className;
      return /* @__PURE__ */ reactExports.createElement(TabPane$1, _extends({}, restTabProps, {
        prefixCls: tabPanePrefixCls,
        id,
        tabKey: key,
        animated: tabPaneAnimated,
        active,
        style: _objectSpread2(_objectSpread2({}, paneStyle), motionStyle),
        className: classNames(paneClassName, motionClassName),
        ref
      }));
    });
  })));
};
function useAnimateConfig$1() {
  var animated = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    inkBar: true,
    tabPane: false
  };
  var mergedAnimated;
  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false
    };
  } else if (animated === true) {
    mergedAnimated = {
      inkBar: true,
      tabPane: false
    };
  } else {
    mergedAnimated = _objectSpread2({
      inkBar: true
    }, _typeof(animated) === "object" ? animated : {});
  }
  if (mergedAnimated.tabPaneMotion && mergedAnimated.tabPane === void 0) {
    mergedAnimated.tabPane = true;
  }
  if (!mergedAnimated.tabPaneMotion && mergedAnimated.tabPane) {
    mergedAnimated.tabPane = false;
  }
  return mergedAnimated;
}
var _excluded = ["id", "prefixCls", "className", "items", "direction", "activeKey", "defaultActiveKey", "editable", "animated", "tabPosition", "tabBarGutter", "tabBarStyle", "tabBarExtraContent", "locale", "more", "destroyInactiveTabPane", "renderTabBar", "onChange", "onTabClick", "onTabScroll", "getPopupContainer", "popupClassName", "indicator"];
var uuid = 0;
var Tabs$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var id = props.id, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-tabs" : _props$prefixCls, className = props.className, items = props.items, direction = props.direction, activeKey = props.activeKey, defaultActiveKey = props.defaultActiveKey, editable = props.editable, animated = props.animated, _props$tabPosition = props.tabPosition, tabPosition = _props$tabPosition === void 0 ? "top" : _props$tabPosition, tabBarGutter = props.tabBarGutter, tabBarStyle = props.tabBarStyle, tabBarExtraContent = props.tabBarExtraContent, locale = props.locale, more = props.more, destroyInactiveTabPane = props.destroyInactiveTabPane, renderTabBar = props.renderTabBar, onChange = props.onChange, onTabClick = props.onTabClick, onTabScroll = props.onTabScroll, getPopupContainer = props.getPopupContainer, popupClassName = props.popupClassName, indicator = props.indicator, restProps = _objectWithoutProperties(props, _excluded);
  var tabs = reactExports.useMemo(function() {
    return (items || []).filter(function(item) {
      return item && _typeof(item) === "object" && "key" in item;
    });
  }, [items]);
  var rtl = direction === "rtl";
  var mergedAnimated = useAnimateConfig$1(animated);
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray(_useState, 2), mobile = _useState2[0], setMobile = _useState2[1];
  reactExports.useEffect(function() {
    setMobile(isMobile());
  }, []);
  var _useMergedState = useMergedState(function() {
    var _tabs$;
    return (_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.key;
  }, {
    value: activeKey,
    defaultValue: defaultActiveKey
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedActiveKey = _useMergedState2[0], setMergedActiveKey = _useMergedState2[1];
  var _useState3 = reactExports.useState(function() {
    return tabs.findIndex(function(tab) {
      return tab.key === mergedActiveKey;
    });
  }), _useState4 = _slicedToArray(_useState3, 2), activeIndex = _useState4[0], setActiveIndex = _useState4[1];
  reactExports.useEffect(function() {
    var newActiveIndex = tabs.findIndex(function(tab) {
      return tab.key === mergedActiveKey;
    });
    if (newActiveIndex === -1) {
      var _tabs$newActiveIndex;
      newActiveIndex = Math.max(0, Math.min(activeIndex, tabs.length - 1));
      setMergedActiveKey((_tabs$newActiveIndex = tabs[newActiveIndex]) === null || _tabs$newActiveIndex === void 0 ? void 0 : _tabs$newActiveIndex.key);
    }
    setActiveIndex(newActiveIndex);
  }, [tabs.map(function(tab) {
    return tab.key;
  }).join("_"), mergedActiveKey, activeIndex]);
  var _useMergedState3 = useMergedState(null, {
    value: id
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), mergedId = _useMergedState4[0], setMergedId = _useMergedState4[1];
  reactExports.useEffect(function() {
    if (!id) {
      setMergedId("rc-tabs-".concat(uuid));
      uuid += 1;
    }
  }, []);
  function onInternalTabClick(key, e) {
    onTabClick === null || onTabClick === void 0 || onTabClick(key, e);
    var isActiveChanged = key !== mergedActiveKey;
    setMergedActiveKey(key);
    if (isActiveChanged) {
      onChange === null || onChange === void 0 || onChange(key);
    }
  }
  var sharedProps = {
    id: mergedId,
    activeKey: mergedActiveKey,
    animated: mergedAnimated,
    tabPosition,
    rtl,
    mobile
  };
  var tabNavBarProps = _objectSpread2(_objectSpread2({}, sharedProps), {}, {
    editable,
    locale,
    more,
    tabBarGutter,
    onTabClick: onInternalTabClick,
    onTabScroll,
    extra: tabBarExtraContent,
    style: tabBarStyle,
    panes: null,
    getPopupContainer,
    popupClassName,
    indicator
  });
  return /* @__PURE__ */ reactExports.createElement(TabContext.Provider, {
    value: {
      tabs,
      prefixCls
    }
  }, /* @__PURE__ */ reactExports.createElement("div", _extends({
    ref,
    id,
    className: classNames(prefixCls, "".concat(prefixCls, "-").concat(tabPosition), _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-mobile"), mobile), "".concat(prefixCls, "-editable"), editable), "".concat(prefixCls, "-rtl"), rtl), className)
  }, restProps), /* @__PURE__ */ reactExports.createElement(TabNavListWrapper, _extends({}, tabNavBarProps, {
    renderTabBar
  })), /* @__PURE__ */ reactExports.createElement(TabPanelList, _extends({
    destroyInactiveTabPane
  }, sharedProps, {
    animated: mergedAnimated
  }))));
});
const motion = {
  motionAppear: false,
  motionEnter: true,
  motionLeave: true
};
function useAnimateConfig(prefixCls, animated = {
  inkBar: true,
  tabPane: false
}) {
  let mergedAnimated;
  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false
    };
  } else if (animated === true) {
    mergedAnimated = {
      inkBar: true,
      tabPane: true
    };
  } else {
    mergedAnimated = Object.assign({
      inkBar: true
    }, typeof animated === "object" ? animated : {});
  }
  if (mergedAnimated.tabPane) {
    mergedAnimated.tabPaneMotion = Object.assign(Object.assign({}, motion), {
      motionName: getTransitionName(prefixCls, "switch")
    });
  }
  return mergedAnimated;
}
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function filter(items) {
  return items.filter((item) => item);
}
function useLegacyItems(items, children) {
  if (items) {
    return items.map((item) => {
      var _a;
      const mergedDestroyOnHidden = (_a = item.destroyOnHidden) !== null && _a !== void 0 ? _a : item.destroyInactiveTabPane;
      return Object.assign(Object.assign({}, item), {
        // TODO: In the future, destroyInactiveTabPane in rc-tabs needs to be upgrade to destroyOnHidden
        destroyInactiveTabPane: mergedDestroyOnHidden
      });
    });
  }
  const childrenItems = toArray(children).map((node) => {
    if (/* @__PURE__ */ reactExports.isValidElement(node)) {
      const {
        key,
        props
      } = node;
      const _a = props || {}, {
        tab
      } = _a, restProps = __rest$1(_a, ["tab"]);
      const item = Object.assign(Object.assign({
        key: String(key)
      }, restProps), {
        label: tab
      });
      return item;
    }
    return null;
  });
  return filter(childrenItems);
}
const genMotionStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow
  } = token;
  return [
    {
      [componentCls]: {
        [`${componentCls}-switch`]: {
          "&-appear, &-enter": {
            transition: "none",
            "&-start": {
              opacity: 0
            },
            "&-active": {
              opacity: 1,
              transition: `opacity ${motionDurationSlow}`
            }
          },
          "&-leave": {
            position: "absolute",
            transition: "none",
            inset: 0,
            "&-start": {
              opacity: 1
            },
            "&-active": {
              opacity: 0,
              transition: `opacity ${motionDurationSlow}`
            }
          }
        }
      }
    },
    // Follow code may reuse in other components
    [initSlideMotion(token, "slide-up"), initSlideMotion(token, "slide-down")]
  ];
};
const genCardStyle = (token) => {
  const {
    componentCls,
    tabsCardPadding,
    cardBg,
    cardGutter,
    colorBorderSecondary,
    itemSelectedColor
  } = token;
  return {
    [`${componentCls}-card`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-tab`]: {
          margin: 0,
          padding: tabsCardPadding,
          background: cardBg,
          border: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`
        },
        [`${componentCls}-tab-active`]: {
          color: itemSelectedColor,
          background: token.colorBgContainer
        },
        [`${componentCls}-tab-focus:has(${componentCls}-tab-btn:focus-visible)`]: genFocusOutline(token, -3),
        [`& ${componentCls}-tab${componentCls}-tab-focus ${componentCls}-tab-btn:focus-visible`]: {
          outline: "none"
        },
        [`${componentCls}-ink-bar`]: {
          visibility: "hidden"
        }
      },
      // ========================== Top & Bottom ==========================
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginLeft: {
              _skip_check_: true,
              value: unit(cardGutter)
            }
          }
        }
      },
      [`&${componentCls}-top`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`
          },
          [`${componentCls}-tab-active`]: {
            borderBottomColor: token.colorBgContainer
          }
        }
      },
      [`&${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`
          },
          [`${componentCls}-tab-active`]: {
            borderTopColor: token.colorBgContainer
          }
        }
      },
      // ========================== Left & Right ==========================
      [`&${componentCls}-left, &${componentCls}-right`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginTop: unit(cardGutter)
          }
        }
      },
      [`&${componentCls}-left`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `${unit(token.borderRadiusLG)} 0 0 ${unit(token.borderRadiusLG)}`
            }
          },
          [`${componentCls}-tab-active`]: {
            borderRightColor: {
              _skip_check_: true,
              value: token.colorBgContainer
            }
          }
        }
      },
      [`&${componentCls}-right`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0`
            }
          },
          [`${componentCls}-tab-active`]: {
            borderLeftColor: {
              _skip_check_: true,
              value: token.colorBgContainer
            }
          }
        }
      }
    }
  };
};
const genDropdownStyle = (token) => {
  const {
    componentCls,
    itemHoverColor,
    dropdownEdgeChildVerticalPadding
  } = token;
  return {
    [`${componentCls}-dropdown`]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "absolute",
      top: -9999,
      left: {
        _skip_check_: true,
        value: -9999
      },
      zIndex: token.zIndexPopup,
      display: "block",
      "&-hidden": {
        display: "none"
      },
      [`${componentCls}-dropdown-menu`]: {
        maxHeight: token.tabsDropdownHeight,
        margin: 0,
        padding: `${unit(dropdownEdgeChildVerticalPadding)} 0`,
        overflowX: "hidden",
        overflowY: "auto",
        textAlign: {
          _skip_check_: true,
          value: "left"
        },
        listStyleType: "none",
        backgroundColor: token.colorBgContainer,
        backgroundClip: "padding-box",
        borderRadius: token.borderRadiusLG,
        outline: "none",
        boxShadow: token.boxShadowSecondary,
        "&-item": Object.assign(Object.assign({}, textEllipsis), {
          display: "flex",
          alignItems: "center",
          minWidth: token.tabsDropdownWidth,
          margin: 0,
          padding: `${unit(token.paddingXXS)} ${unit(token.paddingSM)}`,
          color: token.colorText,
          fontWeight: "normal",
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          cursor: "pointer",
          transition: `all ${token.motionDurationSlow}`,
          "> span": {
            flex: 1,
            whiteSpace: "nowrap"
          },
          "&-remove": {
            flex: "none",
            marginLeft: {
              _skip_check_: true,
              value: token.marginSM
            },
            color: token.colorIcon,
            fontSize: token.fontSizeSM,
            background: "transparent",
            border: 0,
            cursor: "pointer",
            "&:hover": {
              color: itemHoverColor
            }
          },
          "&:hover": {
            background: token.controlItemBgHover
          },
          "&-disabled": {
            "&, &:hover": {
              color: token.colorTextDisabled,
              background: "transparent",
              cursor: "not-allowed"
            }
          }
        })
      }
    })
  };
};
const genPositionStyle = (token) => {
  const {
    componentCls,
    margin,
    colorBorderSecondary,
    horizontalMargin,
    verticalItemPadding,
    verticalItemMargin,
    calc
  } = token;
  return {
    // ========================== Top & Bottom ==========================
    [`${componentCls}-top, ${componentCls}-bottom`]: {
      flexDirection: "column",
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        margin: horizontalMargin,
        "&::before": {
          position: "absolute",
          right: {
            _skip_check_: true,
            value: 0
          },
          left: {
            _skip_check_: true,
            value: 0
          },
          borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
          content: "''"
        },
        [`${componentCls}-ink-bar`]: {
          height: token.lineWidthBold,
          "&-animated": {
            transition: `width ${token.motionDurationSlow}, left ${token.motionDurationSlow},
            right ${token.motionDurationSlow}`
          }
        },
        [`${componentCls}-nav-wrap`]: {
          "&::before, &::after": {
            top: 0,
            bottom: 0,
            width: token.controlHeight
          },
          "&::before": {
            left: {
              _skip_check_: true,
              value: 0
            },
            boxShadow: token.boxShadowTabsOverflowLeft
          },
          "&::after": {
            right: {
              _skip_check_: true,
              value: 0
            },
            boxShadow: token.boxShadowTabsOverflowRight
          },
          [`&${componentCls}-nav-wrap-ping-left::before`]: {
            opacity: 1
          },
          [`&${componentCls}-nav-wrap-ping-right::after`]: {
            opacity: 1
          }
        }
      }
    },
    [`${componentCls}-top`]: {
      [`> ${componentCls}-nav,
        > div > ${componentCls}-nav`]: {
        "&::before": {
          bottom: 0
        },
        [`${componentCls}-ink-bar`]: {
          bottom: 0
        }
      }
    },
    [`${componentCls}-bottom`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        order: 1,
        marginTop: margin,
        marginBottom: 0,
        "&::before": {
          top: 0
        },
        [`${componentCls}-ink-bar`]: {
          top: 0
        }
      },
      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        order: 0
      }
    },
    // ========================== Left & Right ==========================
    [`${componentCls}-left, ${componentCls}-right`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        flexDirection: "column",
        minWidth: calc(token.controlHeight).mul(1.25).equal(),
        // >>>>>>>>>>> Tab
        [`${componentCls}-tab`]: {
          padding: verticalItemPadding,
          textAlign: "center"
        },
        [`${componentCls}-tab + ${componentCls}-tab`]: {
          margin: verticalItemMargin
        },
        // >>>>>>>>>>> Nav
        [`${componentCls}-nav-wrap`]: {
          flexDirection: "column",
          "&::before, &::after": {
            right: {
              _skip_check_: true,
              value: 0
            },
            left: {
              _skip_check_: true,
              value: 0
            },
            height: token.controlHeight
          },
          "&::before": {
            top: 0,
            boxShadow: token.boxShadowTabsOverflowTop
          },
          "&::after": {
            bottom: 0,
            boxShadow: token.boxShadowTabsOverflowBottom
          },
          [`&${componentCls}-nav-wrap-ping-top::before`]: {
            opacity: 1
          },
          [`&${componentCls}-nav-wrap-ping-bottom::after`]: {
            opacity: 1
          }
        },
        // >>>>>>>>>>> Ink Bar
        [`${componentCls}-ink-bar`]: {
          width: token.lineWidthBold,
          "&-animated": {
            transition: `height ${token.motionDurationSlow}, top ${token.motionDurationSlow}`
          }
        },
        [`${componentCls}-nav-list, ${componentCls}-nav-operations`]: {
          flex: "1 0 auto",
          // fix safari scroll problem
          flexDirection: "column"
        }
      }
    },
    [`${componentCls}-left`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-ink-bar`]: {
          right: {
            _skip_check_: true,
            value: 0
          }
        }
      },
      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        marginLeft: {
          _skip_check_: true,
          value: unit(calc(token.lineWidth).mul(-1).equal())
        },
        borderLeft: {
          _skip_check_: true,
          value: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
        },
        [`> ${componentCls}-content > ${componentCls}-tabpane`]: {
          paddingLeft: {
            _skip_check_: true,
            value: token.paddingLG
          }
        }
      }
    },
    [`${componentCls}-right`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        order: 1,
        [`${componentCls}-ink-bar`]: {
          left: {
            _skip_check_: true,
            value: 0
          }
        }
      },
      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        order: 0,
        marginRight: {
          _skip_check_: true,
          value: calc(token.lineWidth).mul(-1).equal()
        },
        borderRight: {
          _skip_check_: true,
          value: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
        },
        [`> ${componentCls}-content > ${componentCls}-tabpane`]: {
          paddingRight: {
            _skip_check_: true,
            value: token.paddingLG
          }
        }
      }
    }
  };
};
const genSizeStyle = (token) => {
  const {
    componentCls,
    cardPaddingSM,
    cardPaddingLG,
    cardHeightSM,
    cardHeightLG,
    horizontalItemPaddingSM,
    horizontalItemPaddingLG
  } = token;
  return {
    // >>>>> shared
    [componentCls]: {
      "&-small": {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: horizontalItemPaddingSM,
            fontSize: token.titleFontSizeSM
          }
        }
      },
      "&-large": {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: horizontalItemPaddingLG,
            fontSize: token.titleFontSizeLG,
            lineHeight: token.lineHeightLG
          }
        }
      }
    },
    // >>>>> card
    [`${componentCls}-card`]: {
      // Small
      [`&${componentCls}-small`]: {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: cardPaddingSM
          },
          [`${componentCls}-nav-add`]: {
            minWidth: cardHeightSM,
            minHeight: cardHeightSM
          }
        },
        [`&${componentCls}-bottom`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: `0 0 ${unit(token.borderRadius)} ${unit(token.borderRadius)}`
          }
        },
        [`&${componentCls}-top`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: `${unit(token.borderRadius)} ${unit(token.borderRadius)} 0 0`
          }
        },
        [`&${componentCls}-right`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `0 ${unit(token.borderRadius)} ${unit(token.borderRadius)} 0`
            }
          }
        },
        [`&${componentCls}-left`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `${unit(token.borderRadius)} 0 0 ${unit(token.borderRadius)}`
            }
          }
        }
      },
      // Large
      [`&${componentCls}-large`]: {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: cardPaddingLG
          },
          [`${componentCls}-nav-add`]: {
            minWidth: cardHeightLG,
            minHeight: cardHeightLG
          }
        }
      }
    }
  };
};
const genTabStyle = (token) => {
  const {
    componentCls,
    itemActiveColor,
    itemHoverColor,
    iconCls,
    tabsHorizontalItemMargin,
    horizontalItemPadding,
    itemSelectedColor,
    itemColor
  } = token;
  const tabCls = `${componentCls}-tab`;
  return {
    [tabCls]: {
      position: "relative",
      WebkitTouchCallout: "none",
      WebkitTapHighlightColor: "transparent",
      display: "inline-flex",
      alignItems: "center",
      padding: horizontalItemPadding,
      fontSize: token.titleFontSize,
      background: "transparent",
      border: 0,
      outline: "none",
      cursor: "pointer",
      color: itemColor,
      "&-btn, &-remove": {
        "&:focus:not(:focus-visible), &:active": {
          color: itemActiveColor
        }
      },
      "&-btn": {
        outline: "none",
        transition: `all ${token.motionDurationSlow}`,
        [`${tabCls}-icon:not(:last-child)`]: {
          marginInlineEnd: token.marginSM
        }
      },
      "&-remove": Object.assign({
        flex: "none",
        lineHeight: 1,
        marginRight: {
          _skip_check_: true,
          value: token.calc(token.marginXXS).mul(-1).equal()
        },
        marginLeft: {
          _skip_check_: true,
          value: token.marginXS
        },
        color: token.colorIcon,
        fontSize: token.fontSizeSM,
        background: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
        transition: `all ${token.motionDurationSlow}`,
        "&:hover": {
          color: token.colorTextHeading
        }
      }, genFocusStyle(token)),
      "&:hover": {
        color: itemHoverColor
      },
      [`&${tabCls}-active ${tabCls}-btn`]: {
        color: itemSelectedColor,
        textShadow: token.tabsActiveTextShadow
      },
      [`&${tabCls}-focus ${tabCls}-btn:focus-visible`]: genFocusOutline(token),
      [`&${tabCls}-disabled`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed"
      },
      [`&${tabCls}-disabled ${tabCls}-btn, &${tabCls}-disabled ${componentCls}-remove`]: {
        "&:focus, &:active": {
          color: token.colorTextDisabled
        }
      },
      [`& ${tabCls}-remove ${iconCls}`]: {
        margin: 0,
        verticalAlign: "middle"
      },
      [`${iconCls}:not(:last-child)`]: {
        marginRight: {
          _skip_check_: true,
          value: token.marginSM
        }
      }
    },
    [`${tabCls} + ${tabCls}`]: {
      margin: {
        _skip_check_: true,
        value: tabsHorizontalItemMargin
      }
    }
  };
};
const genRtlStyle = (token) => {
  const {
    componentCls,
    tabsHorizontalItemMarginRTL,
    iconCls,
    cardGutter,
    calc
  } = token;
  const rtlCls = `${componentCls}-rtl`;
  return {
    [rtlCls]: {
      direction: "rtl",
      [`${componentCls}-nav`]: {
        [`${componentCls}-tab`]: {
          margin: {
            _skip_check_: true,
            value: tabsHorizontalItemMarginRTL
          },
          [`${componentCls}-tab:last-of-type`]: {
            marginLeft: {
              _skip_check_: true,
              value: 0
            }
          },
          [iconCls]: {
            marginRight: {
              _skip_check_: true,
              value: 0
            },
            marginLeft: {
              _skip_check_: true,
              value: unit(token.marginSM)
            }
          },
          [`${componentCls}-tab-remove`]: {
            marginRight: {
              _skip_check_: true,
              value: unit(token.marginXS)
            },
            marginLeft: {
              _skip_check_: true,
              value: unit(calc(token.marginXXS).mul(-1).equal())
            },
            [iconCls]: {
              margin: 0
            }
          }
        }
      },
      [`&${componentCls}-left`]: {
        [`> ${componentCls}-nav`]: {
          order: 1
        },
        [`> ${componentCls}-content-holder`]: {
          order: 0
        }
      },
      [`&${componentCls}-right`]: {
        [`> ${componentCls}-nav`]: {
          order: 0
        },
        [`> ${componentCls}-content-holder`]: {
          order: 1
        }
      },
      // ====================== Card ======================
      [`&${componentCls}-card${componentCls}-top, &${componentCls}-card${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginRight: {
              _skip_check_: true,
              value: cardGutter
            },
            marginLeft: {
              _skip_check_: true,
              value: 0
            }
          }
        }
      }
    },
    [`${componentCls}-dropdown-rtl`]: {
      direction: "rtl"
    },
    [`${componentCls}-menu-item`]: {
      [`${componentCls}-dropdown-rtl`]: {
        textAlign: {
          _skip_check_: true,
          value: "right"
        }
      }
    }
  };
};
const genTabsStyle = (token) => {
  const {
    componentCls,
    tabsCardPadding,
    cardHeight,
    cardGutter,
    itemHoverColor,
    itemActiveColor,
    colorBorderSecondary
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "flex",
      // ========================== Navigation ==========================
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        position: "relative",
        display: "flex",
        flex: "none",
        alignItems: "center",
        [`${componentCls}-nav-wrap`]: {
          position: "relative",
          display: "flex",
          flex: "auto",
          alignSelf: "stretch",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transform: "translate(0)",
          // Fix chrome render bug
          // >>>>> Ping shadow
          "&::before, &::after": {
            position: "absolute",
            zIndex: 1,
            opacity: 0,
            transition: `opacity ${token.motionDurationSlow}`,
            content: "''",
            pointerEvents: "none"
          }
        },
        [`${componentCls}-nav-list`]: {
          position: "relative",
          display: "flex",
          transition: `opacity ${token.motionDurationSlow}`
        },
        // >>>>>>>> Operations
        [`${componentCls}-nav-operations`]: {
          display: "flex",
          alignSelf: "stretch"
        },
        [`${componentCls}-nav-operations-hidden`]: {
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none"
        },
        [`${componentCls}-nav-more`]: {
          position: "relative",
          padding: tabsCardPadding,
          background: "transparent",
          border: 0,
          color: token.colorText,
          "&::after": {
            position: "absolute",
            right: {
              _skip_check_: true,
              value: 0
            },
            bottom: 0,
            left: {
              _skip_check_: true,
              value: 0
            },
            height: token.calc(token.controlHeightLG).div(8).equal(),
            transform: "translateY(100%)",
            content: "''"
          }
        },
        [`${componentCls}-nav-add`]: Object.assign({
          minWidth: cardHeight,
          minHeight: cardHeight,
          marginLeft: {
            _skip_check_: true,
            value: cardGutter
          },
          background: "transparent",
          border: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
          borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`,
          outline: "none",
          cursor: "pointer",
          color: token.colorText,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,
          "&:hover": {
            color: itemHoverColor
          },
          "&:active, &:focus:not(:focus-visible)": {
            color: itemActiveColor
          }
        }, genFocusStyle(token, -3))
      },
      [`${componentCls}-extra-content`]: {
        flex: "none"
      },
      // ============================ InkBar ============================
      [`${componentCls}-ink-bar`]: {
        position: "absolute",
        background: token.inkBarColor,
        pointerEvents: "none"
      }
    }), genTabStyle(token)), {
      // =========================== TabPanes ===========================
      [`${componentCls}-content`]: {
        position: "relative",
        width: "100%"
      },
      [`${componentCls}-content-holder`]: {
        flex: "auto",
        minWidth: 0,
        minHeight: 0
      },
      [`${componentCls}-tabpane`]: Object.assign(Object.assign({}, genFocusStyle(token)), {
        "&-hidden": {
          display: "none"
        }
      })
    }),
    [`${componentCls}-centered`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-nav-wrap`]: {
          [`&:not([class*='${componentCls}-nav-wrap-ping']) > ${componentCls}-nav-list`]: {
            margin: "auto"
          }
        }
      }
    }
  };
};
const prepareComponentToken = (token) => {
  const {
    cardHeight,
    cardHeightSM,
    cardHeightLG,
    controlHeight,
    controlHeightLG
  } = token;
  const mergedCardHeight = cardHeight || controlHeightLG;
  const mergedCardHeightSM = cardHeightSM || controlHeight;
  const mergedCardHeightLG = cardHeightLG || controlHeightLG + 8;
  return {
    zIndexPopup: token.zIndexPopupBase + 50,
    cardBg: token.colorFillAlter,
    // We can not pass this as valid value,
    // Since `cardHeight` will lock nav add button height.
    cardHeight: mergedCardHeight,
    cardHeightSM: mergedCardHeightSM,
    cardHeightLG: mergedCardHeightLG,
    // Initialize with empty string, because cardPadding will be calculated with cardHeight by default.
    cardPadding: `${(mergedCardHeight - token.fontHeight) / 2 - token.lineWidth}px ${token.padding}px`,
    cardPaddingSM: `${(mergedCardHeightSM - token.fontHeight) / 2 - token.lineWidth}px ${token.paddingXS}px`,
    cardPaddingLG: `${(mergedCardHeightLG - token.fontHeightLG) / 2 - token.lineWidth}px ${token.padding}px`,
    titleFontSize: token.fontSize,
    titleFontSizeLG: token.fontSizeLG,
    titleFontSizeSM: token.fontSize,
    inkBarColor: token.colorPrimary,
    horizontalMargin: `0 0 ${token.margin}px 0`,
    horizontalItemGutter: 32,
    // Fixed Value
    // Initialize with empty string, because horizontalItemMargin will be calculated with horizontalItemGutter by default.
    horizontalItemMargin: ``,
    horizontalItemMarginRTL: ``,
    horizontalItemPadding: `${token.paddingSM}px 0`,
    horizontalItemPaddingSM: `${token.paddingXS}px 0`,
    horizontalItemPaddingLG: `${token.padding}px 0`,
    verticalItemPadding: `${token.paddingXS}px ${token.paddingLG}px`,
    verticalItemMargin: `${token.margin}px 0 0 0`,
    itemColor: token.colorText,
    itemSelectedColor: token.colorPrimary,
    itemHoverColor: token.colorPrimaryHover,
    itemActiveColor: token.colorPrimaryActive,
    cardGutter: token.marginXXS / 2
  };
};
const useStyle = genStyleHooks("Tabs", (token) => {
  const tabsToken = merge(token, {
    // `cardPadding` is empty by default, so we could calculate with dynamic `cardHeight`
    tabsCardPadding: token.cardPadding,
    dropdownEdgeChildVerticalPadding: token.paddingXXS,
    tabsActiveTextShadow: "0 0 0.25px currentcolor",
    tabsDropdownHeight: 200,
    tabsDropdownWidth: 120,
    tabsHorizontalItemMargin: `0 0 0 ${unit(token.horizontalItemGutter)}`,
    tabsHorizontalItemMarginRTL: `0 0 0 ${unit(token.horizontalItemGutter)}`
  });
  return [genSizeStyle(tabsToken), genRtlStyle(tabsToken), genPositionStyle(tabsToken), genDropdownStyle(tabsToken), genCardStyle(tabsToken), genTabsStyle(tabsToken), genMotionStyle(tabsToken)];
}, prepareComponentToken);
const TabPane = () => null;
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalTabs = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
  const {
    type,
    className,
    rootClassName,
    size: customSize,
    onEdit,
    hideAdd,
    centered,
    addIcon,
    removeIcon,
    moreIcon,
    more,
    popupClassName,
    children,
    items,
    animated,
    style,
    indicatorSize,
    indicator,
    destroyInactiveTabPane,
    destroyOnHidden
  } = props, otherProps = __rest(props, ["type", "className", "rootClassName", "size", "onEdit", "hideAdd", "centered", "addIcon", "removeIcon", "moreIcon", "more", "popupClassName", "children", "items", "animated", "style", "indicatorSize", "indicator", "destroyInactiveTabPane", "destroyOnHidden"]);
  const {
    prefixCls: customizePrefixCls
  } = otherProps;
  const {
    direction,
    tabs,
    getPrefixCls,
    getPopupContainer
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("tabs", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const tabsRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    nativeElement: tabsRef.current
  }));
  let editable;
  if (type === "editable-card") {
    editable = {
      onEdit: (editType, {
        key,
        event
      }) => {
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(editType === "add" ? event : key, editType);
      },
      removeIcon: (_a = removeIcon !== null && removeIcon !== void 0 ? removeIcon : tabs === null || tabs === void 0 ? void 0 : tabs.removeIcon) !== null && _a !== void 0 ? _a : /* @__PURE__ */ reactExports.createElement(RefIcon$2, null),
      addIcon: (addIcon !== null && addIcon !== void 0 ? addIcon : tabs === null || tabs === void 0 ? void 0 : tabs.addIcon) || /* @__PURE__ */ reactExports.createElement(RefIcon, null),
      showAdd: hideAdd !== true
    };
  }
  const rootPrefixCls = getPrefixCls();
  const size = useSize(customSize);
  const mergedItems = useLegacyItems(items, children);
  const mergedAnimated = useAnimateConfig(prefixCls, animated);
  const mergedStyle = Object.assign(Object.assign({}, tabs === null || tabs === void 0 ? void 0 : tabs.style), style);
  const mergedIndicator = {
    align: (_b = indicator === null || indicator === void 0 ? void 0 : indicator.align) !== null && _b !== void 0 ? _b : (_c = tabs === null || tabs === void 0 ? void 0 : tabs.indicator) === null || _c === void 0 ? void 0 : _c.align,
    size: (_g = (_e = (_d = indicator === null || indicator === void 0 ? void 0 : indicator.size) !== null && _d !== void 0 ? _d : indicatorSize) !== null && _e !== void 0 ? _e : (_f = tabs === null || tabs === void 0 ? void 0 : tabs.indicator) === null || _f === void 0 ? void 0 : _f.size) !== null && _g !== void 0 ? _g : tabs === null || tabs === void 0 ? void 0 : tabs.indicatorSize
  };
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Tabs$1, Object.assign({
    ref: tabsRef,
    direction,
    getPopupContainer
  }, otherProps, {
    items: mergedItems,
    className: classNames({
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-card`]: ["card", "editable-card"].includes(type),
      [`${prefixCls}-editable-card`]: type === "editable-card",
      [`${prefixCls}-centered`]: centered
    }, tabs === null || tabs === void 0 ? void 0 : tabs.className, className, rootClassName, hashId, cssVarCls, rootCls),
    popupClassName: classNames(popupClassName, hashId, cssVarCls, rootCls),
    style: mergedStyle,
    editable,
    more: Object.assign({
      icon: (_l = (_k = (_j = (_h = tabs === null || tabs === void 0 ? void 0 : tabs.more) === null || _h === void 0 ? void 0 : _h.icon) !== null && _j !== void 0 ? _j : tabs === null || tabs === void 0 ? void 0 : tabs.moreIcon) !== null && _k !== void 0 ? _k : moreIcon) !== null && _l !== void 0 ? _l : /* @__PURE__ */ reactExports.createElement(RefIcon$3, null),
      transitionName: `${rootPrefixCls}-slide-up`
    }, more),
    prefixCls,
    animated: mergedAnimated,
    indicator: mergedIndicator,
    // TODO: In the future, destroyInactiveTabPane in rc-tabs needs to be upgrade to destroyOnHidden
    destroyInactiveTabPane: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyInactiveTabPane
  })));
});
const Tabs = InternalTabs;
Tabs.TabPane = TabPane;
const FIELD_TYPES = {
  /* ═════════════════════════════════════════════════════════════════════
     GENERAL FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * TEXT INPUT FIELD
   * Single-line text input with comprehensive options
   */
  text: {
    label: "Text Input",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPenToSquare }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Text Input",
      admin_label: "",
      placeholder: "Enter text here...",
      default_value: "",
      required: false,
      help_text: "",
      help_text_position: "below",
      prefix_label: "",
      suffix_label: "",
      mobile_keyboard_type: "default",
      enable_mask: false,
      mask_pattern: "",
      custom_mask: "",
      mask_placeholder: "_",
      // === Validation Section ===
      validation_message: "Please enter a valid value",
      character_limit: "",
      validate_unique: false,
      unique_error_message: "This value has already been submitted",
      // === Style Section ===
      element_class: "",
      container_class: "",
      // === Advanced Section ===
      name_attribute: "",
      reversible_mask: false,
      clear_on_invalid: false,
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      conditions: []
    }
  },
  /**
   * EMAIL FIELD
   * Email input with email validation
   */
  email: {
    label: "Email Address",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Email Address",
      admin_label: "",
      placeholder: "email@example.com",
      default_value: "",
      required: true,
      help_text: "",
      help_text_position: "below",
      // === Validation Section ===
      validation_message: "Please enter a valid email address",
      confirm_email: false,
      confirm_label: "Confirm Email Address",
      confirm_placeholder: "Re-enter email",
      confirm_error_message: "Email addresses do not match",
      validate_unique: false,
      unique_error_message: "This email has already been registered",
      // === Style Section ===
      element_class: "",
      container_class: "",
      // === Advanced Section ===
      name_attribute: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      conditions: []
    }
  },
  /**
   * TEXT AREA FIELD
   * Multi-line text input
   */
  textarea: {
    label: "Text Area",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileLines }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Message",
      admin_label: "",
      placeholder: "Type your message here...",
      default_value: "",
      required: false,
      help_text: "",
      help_text_position: "below",
      rows: 4,
      cols: "",
      resize: "vertical",
      // === Validation Section ===
      validation_message: "Please enter at least {min} characters",
      max_length: "",
      min_length: "",
      // === Style Section ===
      element_class: "",
      container_class: "",
      // === Advanced Section ===
      name_attribute: "",
      enable_rtl: false,
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      conditions: []
    }
  },
  /**
   * DROPDOWN / SELECT FIELD
   * Single choice dropdown
   */
  select: {
    label: "Dropdown",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faList }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Dropdown",
      admin_label: "",
      placeholder: "Choose an option...",
      default_value: "",
      required: false,
      help_text: "",
      help_text_position: "below",
      disable_first_option: true,
      shuffle_options: false,
      enable_search: false,
      min_search_chars: 1,
      options: [
        { label: "Option 1", value: "option1", image: "", disabled: false, calc_value: "" },
        { label: "Option 2", value: "option2", image: "", disabled: false, calc_value: "" },
        { label: "Option 3", value: "option3", image: "", disabled: false, calc_value: "" }
      ],
      // === Validation Section ===
      validation_message: "Please select an option",
      // === Style Section ===
      element_class: "",
      container_class: "",
      // === Advanced Section ===
      name_attribute: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      conditions: []
    }
  },
  /**
   * MULTIPLE SELECT FIELD
   * Multiple choice dropdown (FREE in FluentForm)
   */
  multiselect: {
    label: "Multiple Select",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faList }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Multiple Select",
      admin_label: "",
      placeholder: "Choose options...",
      default_value: [],
      required: false,
      help_text: "",
      help_text_position: "below",
      shuffle_options: false,
      enable_search: true,
      select_all_button: true,
      display_format: "tags",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" }
      ],
      // === Validation Section ===
      validation_message: "Please select at least one option",
      min_selections: 0,
      max_selections: 0,
      // === Style Section ===
      element_class: "",
      container_class: "",
      // === Advanced Section ===
      name_attribute: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      conditions: []
    }
  },
  /**
   * NUMERIC FIELD
   * Number input with formatting options
   */
  number: {
    label: "Numeric Field",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHashtag }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Number",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Enter a number...",
      default_value: "",
      // === Number Formatting ===
      number_format: "none",
      // none, us_decimal, us_no_decimal, eu_decimal, eu_no_decimal, currency, percentage
      decimal_places: 2,
      // For formatted numbers
      thousands_separator: true,
      // 1,234 vs 1234
      // === Prefix/Suffix ===
      prefix_label: "",
      // e.g., $
      suffix_label: "",
      // e.g., %
      // === Constraints ===
      min_value: "",
      // Minimum value
      max_value: "",
      // Maximum value
      step: 1,
      // Increment/decrement step
      // === Validation ===
      required: false,
      min_digits: "",
      // Exact digit count
      max_digits: "",
      // === Mobile ===
      keyboard_type: "numeric",
      // numeric, decimal
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Calculation (Pro Feature in FluentForm) ===
      enable_calculation: false,
      // Enable for calculated fields
      calculation_formula: "",
      // e.g., {field1} + {field2}
      // === Advanced ===
      name_attribute: "",
      read_only: false
    }
  },
  /**
   * RADIO FIELD
   * Single choice radio buttons
   */
  radio: {
    label: "Radio Buttons",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleDot }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Radio Buttons",
      label_placement: "default",
      admin_label: "",
      // === Radio Options ===
      options: [
        { label: "Option 1", value: "option1", image: "", calc_value: "" },
        { label: "Option 2", value: "option2", image: "", calc_value: "" },
        { label: "Option 3", value: "option3", image: "", calc_value: "" }
      ],
      default_value: "",
      // === Layout ===
      layout: "default",
      // default, inline, button, 2_column, 3_column, 4_column, 5_column
      columns_gap: "medium",
      // small, medium, large
      button_style: "primary",
      // For button layout: primary, secondary, success, danger
      // === Visual Options ===
      show_option_images: false,
      image_size: "medium",
      // small, medium, large
      shuffle_options: false,
      // === Validation ===
      required: false,
      unselect_option: false,
      // Allow deselecting
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * CHECKBOX FIELD
   * Multiple choice checkboxes
   */
  checkbox: {
    label: "Checkbox",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSquareCheck }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Checkbox",
      label_placement: "default",
      admin_label: "",
      // === Checkbox Options ===
      options: [
        { label: "Option 1", value: "option1", image: "", calc_value: "" },
        { label: "Option 2", value: "option2", image: "", calc_value: "" },
        { label: "Option 3", value: "option3", image: "", calc_value: "" }
      ],
      default_value: [],
      // Array of selected values
      // === Layout ===
      layout: "default",
      // default, inline, button, 2_column, 3_column, 4_column, 5_column
      button_style: "primary",
      // === Visual Options ===
      show_option_images: false,
      image_size: "medium",
      shuffle_options: false,
      // === Selection ===
      min_selections: 0,
      // Minimum selections required
      max_selections: 0,
      // 0 = unlimited
      selection_message: "Select between {min} and {max} options",
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * URL INPUT FIELD
   * Website URL input (FREE in FluentForm)
   */
  url: {
    label: "Website URL",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLink }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Website",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "https://example.com",
      default_value: "",
      // Supports smart codes
      // === URL Options ===
      url_scheme: "any",
      // any, http, https
      allow_relative: false,
      // Allow URLs without domain
      validate_url: true,
      // Check if URL is valid
      // === Link Options ===
      open_in_new_tab: false,
      // Add target="_blank"
      add_nofollow: false,
      // Add rel="nofollow"
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      prefix_label: "",
      // e.g., https://
      suffix_label: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      autocomplete_attribute: "url"
    }
  },
  /**
   * PHONE FIELD
   * Phone number input (FREE in FluentForm)
   */
  phone: {
    label: "Phone Number",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPhone }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Phone Number",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "+1 (555) 123-4567",
      default_value: "",
      // === Phone Format ===
      phone_format: "international",
      // international, us, uk, custom
      custom_format: "",
      // Custom mask pattern
      country_code: "us",
      // Default country
      allow_country_code: true,
      // Show country dropdown
      // === Validation ===
      required: false,
      validate_phone: true,
      // Validate phone format
      validation_type: "format",
      // format, length, both
      // === Styling ===
      container_class: "",
      element_class: "",
      prefix_label: "",
      // e.g., +1
      suffix_label: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      autocomplete_attribute: "tel",
      keyboard_type: "tel"
    }
  },
  /**
   * DATE & TIME FIELD
   * Date and/or time picker
   */
  date: {
    label: "Date & Time",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendar }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Date",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Select a date...",
      default_value: "",
      // Supports smart codes: {current_date}
      // === Date Format ===
      date_format: "mm/dd/yyyy",
      // mm/dd/yyyy, dd/mm/yyyy, yyyy-mm-dd, etc.
      display_format: "F j, Y",
      // Display format: January 1, 2024
      picker_format: "m/d/Y",
      // Flatpickr format
      // === Date Type ===
      date_type: "date",
      // date, time, datetime, date_range
      time_format: "12h",
      // 12h, 24h
      time_increment: 30,
      // Minutes: 1, 5, 10, 15, 30
      // === Constraints ===
      min_date: "",
      // Earliest selectable date
      max_date: "",
      // Latest selectable date
      disable_dates: [],
      // Array of disabled dates
      disable_weekdays: [],
      // [0, 6] = disable Sunday, Saturday
      enable_dates: [],
      // Only these dates available
      // === Range Options (for date_range) ===
      range_separator: " to ",
      start_date_label: "From",
      end_date_label: "To",
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      theme: "default",
      // default, dark, light
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      enable_timezone: false,
      default_timezone: "UTC",
      inline_picker: false,
      // Show inline calendar
      week_numbers: false,
      // Show week numbers
      highlight_today: true
    }
  },
  /**
   * CUSTOM HTML FIELD
   * Display custom HTML content
   */
  html: {
    label: "Custom HTML",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFont }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: "HTML Content",
      html_content: "<p>Custom HTML content here...</p>",
      // === Options ===
      enable_shortcodes: true,
      // Parse WordPress shortcodes
      sanitize_html: false,
      // Sanitize for security
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * NAME FIELDS
   * Compound name input (First, Middle, Last) (FREE in FluentForm)
   */
  name: {
    label: "Name Fields",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUser }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Full Name",
      label_placement: "default",
      admin_label: "",
      // === Name Format ===
      name_format: "first-last",
      // first, first-last, first-middle-last, last-first
      placeholder: "John Doe",
      // === Field Visibility ===
      show_first_name: true,
      show_middle_name: false,
      show_last_name: true,
      require_first_name: true,
      require_middle_name: false,
      require_last_name: true,
      // === Field Labels ===
      first_name_label: "First Name",
      middle_name_label: "Middle Name",
      last_name_label: "Last Name",
      // === Placeholders ===
      first_name_placeholder: "First name",
      middle_name_placeholder: "Middle name",
      last_name_placeholder: "Last name",
      // === Layout ===
      name_layout: "horizontal",
      // horizontal, vertical
      name_spacing: "medium",
      // small, medium, large
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * HEADING FIELD
   * Section heading/divider (FREE in FluentForm)
   */
  heading: {
    label: "Heading",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHeading }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Content ===
      text: "Section Heading",
      heading_level: "h2",
      // h1, h2, h3, h4, h5, h6
      // === Alignment ===
      alignment: "left",
      // left, center, right
      // === Styling ===
      container_class: "",
      element_class: "",
      color_scheme: "default",
      // default, primary, secondary, custom
      custom_color: "",
      // === Divider ===
      show_divider: false,
      divider_style: "solid",
      // solid, dashed, dotted, double
      divider_color: "",
      // === Description ===
      description: "",
      description_position: "below",
      // below, above
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * COUNTRY SELECT
   * Country dropdown (FREE in FluentForm)
   */
  country_select: {
    label: "Country",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faGlobe }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Country",
      label_placement: "default",
      admin_label: "",
      // === Dropdown Options ===
      placeholder: "Select country...",
      default_value: "",
      // e.g., 'US'
      // === Country List ===
      country_list: "all",
      // all, specific, exclude
      included_countries: [],
      // List of country codes
      excluded_countries: [],
      // List to exclude
      top_countries: ["US", "CA", "GB"],
      // Show at top
      // === Display Format ===
      display_format: "name",
      // name, code, both
      flag_type: "emoji",
      // emoji, none, image
      // === Search ===
      enable_search: true,
      searchable_threshold: 20,
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * SPINNER FIELD
   * Number with increment/decrement buttons (FREE in FluentForm)
   */
  spinner: {
    label: "Spinner",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSpinner }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Quantity",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "0",
      default_value: 0,
      // === Constraints ===
      min: 0,
      max: 100,
      step: 1,
      // === Buttons ===
      show_buttons: true,
      increment_label: "+",
      decrement_label: "-",
      button_position: "right",
      // left, right, both
      // === Formatting ===
      prefix_label: "",
      suffix_label: "",
      number_format: "none",
      decimal_places: 0,
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      button_style: "default",
      // default, primary, secondary
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      wrap_values: false
      // Wrap around when reaching min/max
    }
  },
  /**
   * CURRENCY FIELD
   * Money/currency input (FREE - variant of Numeric)
   */
  currency: {
    label: "Currency",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMoneyBill }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Amount",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "$0.00",
      default_value: "",
      // === Currency Settings ===
      currency_code: "USD",
      // ISO currency code
      currency_symbol: "$",
      symbol_position: "before",
      // before, after
      decimal_places: 2,
      thousands_separator: true,
      // === Constraints ===
      min_value: "",
      max_value: "",
      step: 0.01,
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      read_only: false
    }
  },
  /**
   * PERCENTAGE FIELD
   * Percentage input (FREE - variant of Numeric)
   */
  percentage: {
    label: "Percentage",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPercent }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Percentage",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "0%",
      default_value: "",
      // === Percentage Settings ===
      symbol_position: "after",
      // before, after, both, none
      decimal_places: 0,
      // Usually 0 or 2
      // === Constraints ===
      min_value: 0,
      max_value: 100,
      step: 1,
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      read_only: false
    }
  },
  /**
   * TIME PICKER
   * Time-only picker (FREE - part of Date field in FluentForm)
   */
  time: {
    label: "Time",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faClock }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Time",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Select time...",
      default_value: "",
      // e.g., '09:00'
      // === Time Format ===
      time_format: "12h",
      // 12h, 24h
      display_format: "g:i A",
      // PHP format
      // === Constraints ===
      min_time: "",
      // Earliest time: '09:00'
      max_time: "",
      // Latest time: '17:00'
      time_increment: 30,
      // Minutes: 1, 5, 10, 15, 30
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      inline_picker: false
    }
  },
  /**
   * DATE RANGE FIELD
   * Date range picker (FREE - variant of Date field)
   */
  date_range: {
    label: "Date Range",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendar }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Date Range",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Select date range...",
      default_value: { start: "", end: "" },
      // === Format ===
      date_format: "mm/dd/yyyy",
      range_separator: " - ",
      // === Constraints ===
      min_date: "",
      max_date: "",
      min_duration: "",
      // Minimum days between
      max_duration: "",
      // Maximum days between
      // === Labels ===
      start_label: "Start Date",
      end_label: "End Date",
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      single_datepicker: true
      // Single picker with range
    }
  },
  /**
   * ADDRESS FIELDS
   * Compound address input (FREE in FluentForm)
   */
  address: {
    label: "Address",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMapLocation }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Address",
      label_placement: "default",
      admin_label: "",
      // === Field Components ===
      include_street1: true,
      include_street2: true,
      include_city: true,
      include_state: true,
      include_zip: true,
      include_country: false,
      // === Component Labels ===
      street1_label: "Street Address",
      street2_label: "Address Line 2",
      city_label: "City",
      state_label: "State/Province",
      zip_label: "Postal/Zip Code",
      country_label: "Country",
      // === Placeholders ===
      street1_placeholder: "Street address",
      street2_placeholder: "Apartment, suite, etc.",
      city_placeholder: "City",
      state_placeholder: "State",
      zip_placeholder: "Zip code",
      // === State/Zip Options ===
      state_dropdown: false,
      // Dropdown vs text
      states_list: "US",
      // Country for states
      zip_format: "",
      // Validation format
      // === Layout ===
      address_layout: "vertical",
      // vertical, horizontal, grid
      grid_columns: 2,
      // For horizontal layout
      // === Required ===
      required_fields: [],
      // Which fields are required
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * MASK INPUT FIELD
   * Text with input masking (FREE in FluentForm)
   */
  masked_input: {
    label: "Mask Input",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMask }),
    category: "general",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Masked Input",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "",
      default_value: "",
      // === Mask Options ===
      mask_type: "custom",
      // phone-us, phone-uk, date, ssn, credit_card, custom
      custom_mask: "(999) 999-9999",
      // 9 = digit, a = letter, * = alphanumeric
      mask_placeholder: "_",
      // Character for empty spots
      // === Behavior ===
      reversible_mask: false,
      clear_on_invalid: false,
      auto_format: true,
      // === Validation ===
      required: false,
      validate_mask: true,
      // Require complete mask
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      mask_hint: "",
      // Show expected format
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /* ═════════════════════════════════════════════════════════════════════
     ADVANCED FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * PASSWORD FIELD
   */
  password: {
    label: "Password",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLock }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Password",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Enter password...",
      default_value: "",
      // === Password Strength ===
      enable_strength_meter: false,
      min_strength: 2,
      // 0-4
      strength_label: "Password Strength",
      // === Constraints ===
      min_length: 8,
      max_length: "",
      require_uppercase: false,
      require_lowercase: false,
      require_number: false,
      require_special: false,
      forbidden_chars: "",
      // === Confirmation ===
      require_confirmation: false,
      confirmation_label: "Confirm Password",
      confirmation_placeholder: "Re-enter password",
      confirmation_error: "Passwords do not match",
      // === Visibility Toggle ===
      show_toggle: true,
      // Eye icon to show/hide
      show_text: "Show",
      hide_text: "Hide",
      // === Validation ===
      required: true,
      validation_message: "Password does not meet requirements",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      requirements_hint: "Must be at least 8 characters",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      autocomplete_attribute: "new-password"
    }
  },
  /**
   * HIDDEN FIELD
   */
  hidden: {
    label: "Hidden Field",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEyeSlash }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Hidden Field",
      admin_label: "",
      // === Value ===
      default_value: "",
      // Supports smart codes
      // === Advanced ===
      name_attribute: "",
      param_populate: ""
      // Populate from URL param
    }
  },
  /**
   * SECTION BREAK
   * Content divider with optional collapsible (FREE in FluentForm)
   */
  section_break: {
    label: "Section Break",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faExpand }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Content ===
      title: "Section Title",
      description: "Optional section description",
      // === Alignment ===
      alignment: "left",
      // left, center, right
      // === Divider ===
      show_divider: true,
      divider_style: "solid",
      // solid, dashed, dotted
      divider_color: "",
      divider_thickness: 1,
      // px
      // === Collapsible ===
      collapsible: false,
      default_collapsed: false,
      toggle_text_open: "Show",
      toggle_text_closed: "Hide",
      toggle_position: "right",
      // left, right
      // === Styling ===
      container_class: "",
      element_class: "",
      background_color: "",
      text_color: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * TERMS & CONDITIONS
   * Terms agreement checkbox (FREE in FluentForm)
   */
  terms_conditions: {
    label: "Terms & Conditions",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHandshake }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: "I agree to the Terms & Conditions",
      terms_content: "<p>Enter your terms and conditions here...</p>",
      // === Display Type ===
      display_type: "checkbox",
      // checkbox, link, scroll, modal
      link_text: "View Terms",
      link_url: "",
      modal_title: "Terms & Conditions",
      modal_width: 600,
      // === Scroll Box ===
      scroll_height: 200,
      // For scroll type
      require_scroll: false,
      // Must scroll to bottom
      // === Validation ===
      required: true,
      required_message: "You must agree to continue",
      // === Styling ===
      container_class: "",
      element_class: "",
      checkbox_position: "left",
      // left, right
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * GDPR AGREEMENT
   * GDPR consent checkbox (FREE in FluentForm)
   */
  gdpr_agreement: {
    label: "GDPR Agreement",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faShield }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: "I consent to the processing of my personal data",
      policy_text: "Your privacy is important to us. Please read our privacy policy.",
      policy_url: "",
      // === Consent Type ===
      consent_type: "checkbox",
      // checkbox, opt-in, opt-out
      default_checked: false,
      // === Storage Info ===
      storage_duration_text: "Your data will be stored for {days} days.",
      storage_days: 365,
      show_storage_info: true,
      // === Additional Info ===
      show_withdraw_link: true,
      withdraw_text: "You can withdraw your consent at any time.",
      withdraw_email: "",
      // Email for withdrawal requests
      // === Validation ===
      required: true,
      required_message: "You must consent to continue",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * SHORTCODE
   * WordPress shortcode output (FREE - WordPress feature)
   */
  shortcode: {
    label: "Shortcode",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBarcode }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: "",
      shortcode_content: "[your_shortcode]",
      // === Options ===
      run_shortcode: true,
      cache_output: false,
      cache_duration: 3600,
      // seconds
      // === Fallback ===
      fallback_content: "",
      // Show if shortcode fails
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * ACTION HOOK
   * Custom WordPress action hook (FREE - developer feature)
   */
  action_hook: {
    label: "Action Hook",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: "",
      hook_name: "custom_form_hook",
      // === Hook Options ===
      priority: 10,
      arguments: [],
      // Array of argument names
      // === Output ===
      echo_output: true,
      fallback_content: "",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * TOGGLE SWITCH
   * On/off toggle switch
   */
  /**
   * RANGE SLIDER
   * Numeric range slider (FREE in FluentForm)
   */
  range_slider: {
    label: "Range Slider",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSliders }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Range",
      label_placement: "default",
      admin_label: "",
      // === Range Options ===
      min: 0,
      max: 100,
      step: 1,
      default_value: 50,
      // === Labels ===
      show_value: true,
      value_prefix: "",
      value_suffix: "",
      min_label: "",
      // e.g., 'Poor'
      max_label: "",
      // e.g., 'Excellent'
      value_position: "above",
      // above, below
      // === Appearance ===
      slider_style: "modern",
      // modern, classic, simple
      show_ticks: false,
      tick_interval: 10,
      fill_track: true,
      // Fill from min to current value
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      track_color: "",
      handle_color: "",
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      tooltip: "always"
      // always, on_hover, none
    }
  },
  /**
   * COLOR PICKER
   * Color selection input (FREE in FluentForm)
   */
  color_picker: {
    label: "Color Picker",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPalette }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "Choose Color",
      label_placement: "default",
      admin_label: "",
      // === Color Options ===
      default_color: "#e94560",
      color_format: "hex",
      // hex, rgb, hsl
      // === Display Type ===
      picker_type: "swatches",
      // default, swatches, both
      swatches: ["#e94560", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1"],
      allow_custom: true,
      // === Constraints ===
      allowed_colors: [],
      // Restrict to these colors
      exclude_colors: [],
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      swatch_size: "medium",
      // small, medium, large
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      opacity: false
      // Allow alpha channel
    }
  },
  /**
   * STAR RATING
   * Visual star rating (PRO in FluentForm)
   */
  /**
   * SIGNATURE
   * Digital signature canvas (PRO in FluentForm)
   */
  /**
   * VIDEO EMBED
   */
  /**
   * AUDIO UPLOAD
   */
  /**
   * IMAGE SELECT
   */
  /**
   * FORM STEP
   * Multi-step form break (PRO in FluentForm)
   */
  /**
   * NET PROMOTER SCORE
   * NPS survey field (PRO in FluentForm)
   */
  /**
   * LIKERT SCALE
   */
  /**
   * EMOJI RATING
   */
  /**
   * CALCULATED FIELD
   */
  /**
   * LOOKUP FIELD
   */
  /**
   * RESET BUTTON
   */
  /**
   * SAVE & RESUME
   */
  /**
   * SOCIAL MEDIA PROFILES
   */
  /* ═════════════════════════════════════════════════════════════════════
     PRO FIELDS (Additional)
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * CHAINED SELECT
   * Hierarchical dropdowns (PRO in FluentForm)
   */
  /**
   * REPEAT FIELD
   * Repeatable field group (PRO in FluentForm)
   */
  /**
   * RICH TEXT INPUT
   * WYSIWYG editor (PRO in FluentForm)
   */
  /**
   * TAG INPUT
   */
  /**
   * SEARCHABLE DROPDOWN
   */
  /* ═════════════════════════════════════════════════════════════════════
     UPLOAD FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * FILE UPLOAD
   */
  /**
   * IMAGE UPLOAD
   */
  /**
   * MULTI-FILE UPLOAD
   */
  /**
   * CROPPED IMAGE UPLOAD
   */
  /**
   * WEBCAM CAPTURE
   */
  /**
   * VOICE RECORDING
   */
  /* ═════════════════════════════════════════════════════════════════════
     SURVEY & QUIZ FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * MATRIX QUESTION
   */
  /**
   * CHECKABLE GRID
   * Grid-based selection (PRO in FluentForm)
   */
  /**
   * MULTIPLE CHOICE GRID
   */
  /**
   * SEMANTIC DIFFERENTIAL
   */
  /**
   * IMAGE COMPARISON
   */
  /**
   * LABELED SLIDER
   */
  /**
   * QUIZ SCORE
   */
  /**
   * RANKING / ORDERING
   */
  /* ═════════════════════════════════════════════════════════════════════
     WORDPRESS SPECIFIC FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * USER REGISTRATION
   */
  /**
   * POST SUBMISSION
   */
  /**
   * FEATURED IMAGE UPLOAD
   */
  /**
   * CATEGORY SELECTION
   */
  /**
   * TAG SELECTION
   */
  /**
   * USER ROLE SELECTION
   */
  /* ═════════════════════════════════════════════════════════════════════
     DYNAMIC & INTERACTIVE FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * DYNAMIC LIST / TABLE
   * Dynamic table rows (PRO in FluentForm)
   */
  /**
   * EMAIL CONFIRMATION
   */
  /**
   * PASSWORD CONFIRMATION
   */
  /**
   * TOOLTIP FIELD
   */
  /**
   * ADDRESS AUTOCOMPLETE
   */
  /**
   * CUSTOM SUBMIT BUTTON
   * (FREE in FluentForm)
   */
  custom_submit_button: {
    label: "Custom Submit Button",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }),
    category: "advanced",
    coming_soon: true,
    defaultProps: {
      // === Button Options ===
      label: "",
      button_text: "Submit Form",
      button_icon: "",
      // Icon class or SVG
      icon_position: "left",
      // left, right
      // === Button Style ===
      button_style: "primary",
      // primary, secondary, success, danger, warning
      button_size: "medium",
      // small, medium, large
      button_shape: "rounded",
      // rounded, square, pill
      button_width: "auto",
      // auto, full, custom
      // === Alignment ===
      button_alignment: "left",
      // left, center, right
      // === Button States ===
      loading_text: "Submitting...",
      loading_icon: "",
      // Spinner icon
      disabled_while_submitting: true,
      // === Confirmation ===
      require_confirmation: false,
      confirm_message: "Are you sure you want to submit?",
      confirm_button_text: "Yes, Submit",
      cancel_button_text: "Cancel",
      // === Styling ===
      container_class: "",
      element_class: "",
      custom_css: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      button_id: "",
      tabindex: 0
    }
  },
  /**
   * LIKE / DISLIKE
   */
  /**
   * FACEBOOK LIKE
   */
  /**
   * MARK ON MAP
   */
  /**
   * COLOR SWATCH
   */
  /**
   * DUAL LISTBOX
   */
  /**
   * CHAINED FIELDS
   */
  /* ═════════════════════════════════════════════════════════════════════
     CONTAINER LAYOUTS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * ONE COLUMN CONTAINER
   * (FREE in FluentForm - basic layout)
   */
  column_1: {
    label: "One Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: true,
    defaultProps: {
      label: "",
      columns: [{ width: 100, fields: [] }],
      container_class: "",
      conditional_logic: false,
      conditions: [],
      name_attribute: ""
    }
  },
  /**
   * TWO COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_2: {
    label: "Two Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: true,
    defaultProps: {
      label: "",
      columns: [
        { width: 50, fields: [] },
        { width: 50, fields: [] }
      ],
      container_class: "",
      gap: "medium",
      // small, medium, large
      responsive_stack: true,
      // Stack on mobile
      conditional_logic: false,
      conditions: [],
      name_attribute: ""
    }
  },
  /**
   * THREE COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_3: {
    label: "Three Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: true,
    defaultProps: {
      label: "",
      columns: [
        { width: 33.33, fields: [] },
        { width: 33.33, fields: [] },
        { width: 33.34, fields: [] }
      ],
      container_class: "",
      gap: "medium",
      responsive_stack: true,
      conditional_logic: false,
      conditions: [],
      name_attribute: ""
    }
  },
  /**
   * FOUR COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_4: {
    label: "Four Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: true,
    defaultProps: {
      label: "",
      columns: [
        { width: 25, fields: [] },
        { width: 25, fields: [] },
        { width: 25, fields: [] },
        { width: 25, fields: [] }
      ],
      container_class: "",
      gap: "medium",
      responsive_stack: true,
      conditional_logic: false,
      conditions: [],
      name_attribute: ""
    }
  },
  /**
   * FIVE COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_5: {
    label: "Five Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: true,
    defaultProps: {
      label: "",
      columns: [
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] }
      ],
      container_class: "",
      gap: "medium",
      responsive_stack: true,
      conditional_logic: false,
      conditions: [],
      name_attribute: ""
    }
  },
  /**
   * SIX COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_6: {
    label: "Six Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: true,
    defaultProps: {
      label: "",
      columns: [
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.7, fields: [] }
      ],
      container_class: "",
      gap: "medium",
      responsive_stack: true,
      conditional_logic: false,
      conditions: [],
      name_attribute: ""
    }
  },
  /**
   * ACCORDION SECTION
   */
  /**
   * TABS CONTAINER
   */
  /**
   * PROGRESS BAR
   */
  /**
   * COUNTDOWN TIMER
   */
  /* ═════════════════════════════════════════════════════════════════════
     PAYMENT FIELDS (PRO in FluentForm)
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * PAYMENT ITEM
   */
  /**
   * SUBSCRIPTION ITEM
   */
  /**
   * COUPON
   */
  /**
   * ITEM QUANTITY
   */
  /**
   * PAYMENT SUMMARY
   */
  /**
   * CUSTOM PAYMENT AMOUNT
   */
  /**
   * PAYMENT METHOD
   */
  /**
   * SHIPPING ADDRESS
   */
  /**
   * DONATION
   */
  /**
   * PRODUCT VARIATIONS
   */
  /**
   * TAX CALCULATION
   */
  /**
   * CREDIT CARD
   */
  /* ═════════════════════════════════════════════════════════════════════
     SECURITY FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * HONEYPOT
   */
  /**
   * RECAPTCHA
   * (FREE in FluentForm - essential security)
   */
  recaptcha: {
    label: "reCAPTCHA",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCheckDouble }),
    category: "security",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "",
      label_placement: "default",
      admin_label: "",
      // === Version ===
      version: "v3",
      // v2, v3
      v2_type: "checkbox",
      // checkbox, invisible
      // === Site Key ===
      site_key: "",
      // === Display ===
      theme: "light",
      // light, dark
      size: "normal",
      // normal, compact
      language: "auto",
      // auto, or specific code
      // === v3 Specific ===
      score_threshold: 0.5,
      // === Validation ===
      required: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * HCAPTCHA
   * (FREE in FluentForm)
   */
  hcaptcha: {
    label: "hCaptcha",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faShield }),
    category: "security",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "",
      label_placement: "default",
      admin_label: "",
      // === Site Key ===
      site_key: "",
      // === Display ===
      theme: "light",
      // light, dark
      size: "normal",
      // normal, compact
      sentinel: "auto",
      // auto, specific value
      // === Validation ===
      required: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * TURNSTILE
   * (FREE in FluentForm)
   */
  turnstile: {
    label: "Turnstile",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCertificate }),
    category: "security",
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: "",
      label_placement: "default",
      admin_label: "",
      // === Site Key ===
      site_key: "",
      // === Display ===
      theme: "auto",
      // auto, light, dark
      size: "normal",
      // normal, compact
      appearance: "always",
      // always, execute, interaction-only
      // === Validation ===
      required: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Advanced ===
      name_attribute: ""
    }
  }
  /**
   * MATH CAPTCHA
   */
  /**
   * SLIDER CAPTCHA
   */
};
function getAllFieldTypes() {
  const allFields = { ...FIELD_TYPES };
  if (typeof window !== "undefined" && window.formglut_pro_fields) {
    Object.assign(allFields, window.formglut_pro_fields);
  }
  return allFields;
}
function createField(type) {
  const allFields = getAllFieldTypes();
  const fieldType = allFields[type];
  if (!fieldType) {
    return { id: "", type: "text", label: "", required: false };
  }
  return {
    id: "",
    type,
    ...JSON.parse(JSON.stringify(fieldType.defaultProps))
  };
}
const COMMON_OPTION_VALUES = {
  keyboardTypes: [
    { value: "default", label: "Standard Keyboard" },
    { value: "numeric", label: "Numeric (0-9)" },
    { value: "decimal", label: "Decimal (0-9 with .)" },
    { value: "tel", label: "Telephone Keypad" },
    { value: "email", label: "Email Keyboard" },
    { value: "url", label: "URL Keyboard" }
  ],
  resize: [
    { value: "vertical", label: "Vertical Only" },
    { value: "horizontal", label: "Horizontal Only" },
    { value: "both", label: "Both Directions" },
    { value: "none", label: "None" }
  ],
  maskPatterns: [
    { value: "", label: "None" },
    { value: "(999) 999-9999", label: "Phone: (###) ###-####" },
    { value: "999-99-9999", label: "SSN: ###-##-####" },
    { value: "9999 9999 9999 9999", label: "Credit Card: #### #### #### ####" },
    { value: "99/99/9999", label: "Date: ##/##/####" },
    { value: "aaaaaaaaaa", label: "Letters Only (10)" },
    { value: "**********", label: "Alphanumeric (10)" }
  ]
};
const SECTION_ORDER = [
  "general",
  "validation",
  "style",
  "advanced",
  "conditional"
];
const SECTION_TITLES = {
  general: "Field Options",
  validation: "Validation",
  style: "Style Options",
  advanced: "Advanced",
  conditional: "Conditional Logic"
};
const UNIVERSAL_OPTIONS = {
  // === Field Options (General) ===
  // Label and related options
  label: {
    type: "text",
    label: "Element Label",
    section: "general",
    description: "The label displayed above or beside the field"
  },
  admin_label: {
    type: "text",
    label: "Admin Field Label",
    section: "general",
    description: "Label shown only in admin entries view (useful for short/technical labels)"
  },
  // Input options
  placeholder: {
    type: "text",
    label: "Placeholder",
    section: "general",
    description: "Helpful hint shown inside the field when empty"
  },
  default_value: {
    type: "text",
    label: "Default Value",
    section: "general",
    description: "Field is pre-filled with this value. Supports SmartCodes like {user_email}"
  },
  required: {
    type: "switch",
    label: "Required",
    section: "general",
    description: "User must fill this field before submitting the form"
  },
  // Help options (grouped together)
  help_text: {
    type: "textarea",
    label: "Help Message",
    section: "general",
    description: "Additional help text shown below or above the field",
    rows: 2
  },
  help_text_position: {
    type: "select",
    label: "Help Message Position",
    section: "general",
    description: "Where to show the help message",
    options: [
      { value: "tooltip", label: "Tooltip on Hover" },
      { value: "below", label: "Below Field" },
      { value: "above", label: "Above Field" }
    ]
  },
  // Prefix/Suffix (grouped together)
  prefix_label: {
    type: "text",
    label: "Prefix Label",
    section: "general",
    description: "Text or HTML shown before the input (e.g., $, https://)"
  },
  suffix_label: {
    type: "text",
    label: "Suffix Label",
    section: "general",
    description: "Text or HTML shown after the input (e.g., %, .com)"
  },
  // === Validation ===
  validation_message: {
    type: "text",
    label: "Validation Message",
    section: "validation",
    description: "Custom error message shown when validation fails"
  },
  // === Style Options ===
  element_class: {
    type: "text",
    label: "Element Class",
    section: "style",
    description: "CSS class for the input element"
  },
  container_class: {
    type: "text",
    label: "Container Class",
    section: "style",
    description: "CSS class for the wrapper container"
  },
  name_attribute: {
    type: "text",
    label: "Name Attribute",
    section: "advanced",
    description: "Custom name attribute for the field (useful for integrations)"
  }
};
const TEXT_INPUT_OPTIONS = {
  ...UNIVERSAL_OPTIONS,
  // === General Options ===
  mobile_keyboard_type: {
    type: "select",
    label: "Mobile Keyboard Type",
    section: "general",
    description: "Keyboard type shown on mobile devices",
    options: COMMON_OPTION_VALUES.keyboardTypes
  },
  // === Input Mask ===
  enable_mask: {
    type: "switch",
    label: "Enable Mask Input",
    section: "general",
    description: "Force input to match a specific pattern (e.g., phone number)"
  },
  mask_pattern: {
    type: "select",
    label: "Mask Pattern",
    section: "general",
    description: "Predefined mask patterns",
    options: COMMON_OPTION_VALUES.maskPatterns
  },
  custom_mask: {
    type: "text",
    label: "Custom Mask",
    section: "general",
    description: "Custom mask pattern: 9=digit, a=letter, *=alphanumeric (e.g., (999) 999-9999)"
  },
  mask_placeholder: {
    type: "text",
    label: "Mask Placeholder",
    section: "general",
    description: "Character shown for unfilled mask positions (default: _)"
  },
  // === Validation ===
  character_limit: {
    type: "number",
    label: "Max Text Length",
    section: "validation",
    min: 0,
    description: "Maximum number of characters allowed (0 = unlimited)"
  },
  validate_unique: {
    type: "switch",
    label: "Validate as Unique",
    section: "validation",
    description: "Check for duplicate values in previous submissions"
  },
  unique_error_message: {
    type: "text",
    label: "Duplicate Error Message",
    section: "validation",
    description: "Error message shown when value already exists"
  },
  // === Advanced ===
  reversible_mask: {
    type: "switch",
    label: "Reversible Mask",
    section: "advanced",
    description: "Allow the mask to work in reverse when deleting"
  },
  clear_on_invalid: {
    type: "switch",
    label: "Clear if Not Match",
    section: "advanced",
    description: "Clear the field if input doesn't match the mask"
  }
};
const EMAIL_OPTIONS = {
  ...UNIVERSAL_OPTIONS,
  // === Field Options ===
  confirm_email: {
    type: "switch",
    label: "Require Email Confirmation",
    section: "validation",
    description: "User must enter the same email twice"
  },
  confirm_label: {
    type: "text",
    label: "Confirmation Field Label",
    section: "validation",
    description: "Label for the confirmation email field"
  },
  confirm_placeholder: {
    type: "text",
    label: "Confirmation Placeholder",
    section: "validation",
    description: "Placeholder for the confirmation field"
  },
  confirm_error_message: {
    type: "text",
    label: "Mismatch Error Message",
    section: "validation",
    description: "Error shown when emails don't match"
  },
  // === Validation ===
  validate_unique: {
    type: "switch",
    label: "Validate as Unique",
    section: "validation",
    description: "Check if this email has already been submitted"
  },
  unique_error_message: {
    type: "text",
    label: "Validation Message for Duplicate",
    section: "validation",
    description: "Error message when email already exists"
  }
};
const TEXTAREA_OPTIONS = {
  ...UNIVERSAL_OPTIONS,
  // === Field Options ===
  rows: {
    type: "number",
    label: "Rows",
    section: "general",
    min: 1,
    max: 50,
    description: "Number of visible text lines"
  },
  cols: {
    type: "number",
    label: "Columns",
    section: "general",
    min: 1,
    max: 100,
    description: "Width in average character widths (leave empty for 100%)"
  },
  resize: {
    type: "select",
    label: "Resize Handle",
    section: "general",
    description: "Allow users to resize the textarea",
    options: COMMON_OPTION_VALUES.resize
  },
  max_length: {
    type: "number",
    label: "Max Text Length",
    section: "validation",
    min: 0,
    description: "Maximum number of characters allowed"
  },
  min_length: {
    type: "number",
    label: "Min Length",
    section: "validation",
    min: 0,
    description: "Minimum number of characters required"
  },
  enable_rtl: {
    type: "switch",
    label: "Enable RTL",
    section: "advanced",
    description: "Enable right-to-left text direction"
  }
};
const SELECT_OPTIONS = {
  ...UNIVERSAL_OPTIONS,
  // === Field Options ===
  disable_first_option: {
    type: "switch",
    label: "Disable First Option",
    section: "general",
    description: "First option (usually placeholder) cannot be selected"
  },
  shuffle_options: {
    type: "switch",
    label: "Shuffle Options",
    section: "general",
    description: "Randomize option order each time the form loads"
  },
  enable_search: {
    type: "switch",
    label: "Enable Search",
    section: "general",
    description: "Add search functionality to dropdown (useful for many options)"
  },
  min_search_chars: {
    type: "number",
    label: "Min Search Characters",
    section: "general",
    min: 1,
    description: "Minimum characters before search starts"
  }
};
const MULTISELECT_OPTIONS = {
  ...UNIVERSAL_OPTIONS,
  // === Field Options ===
  shuffle_options: {
    type: "switch",
    label: "Shuffle Options",
    section: "general",
    description: "Randomize option order each time the form loads"
  },
  enable_search: {
    type: "switch",
    label: "Enable Search",
    section: "general",
    description: "Add search functionality to dropdown (useful for many options)"
  },
  select_all_button: {
    type: "switch",
    label: "Show Select All Button",
    section: "general",
    description: "Add a button to select all options"
  },
  display_format: {
    type: "select",
    label: "Display Format",
    section: "general",
    description: "How selected options are displayed",
    options: [
      { value: "tags", label: "Tags (Chips)" },
      { value: "text", label: "Text (Comma Separated)" },
      { value: "count", label: 'Count Only (e.g., "3 selected")' }
    ]
  },
  // === Selection Limits ===
  min_selections: {
    type: "number",
    label: "Min Selections Required",
    section: "validation",
    min: 0,
    description: "Minimum number of options user must select (0 = no minimum)"
  },
  max_selections: {
    type: "number",
    label: "Max Selections Allowed",
    section: "validation",
    min: 1,
    description: "Maximum number of options user can select"
  }
};
const FIELD_TYPE_OPTIONS_MAP = {
  // === Implemented Fields ===
  text: TEXT_INPUT_OPTIONS,
  email: EMAIL_OPTIONS,
  textarea: TEXTAREA_OPTIONS,
  select: SELECT_OPTIONS,
  multiselect: MULTISELECT_OPTIONS,
  // === Future Fields (will have their own option sets) ===
  url: TEXT_INPUT_OPTIONS,
  // Reuse text input options for now
  phone: TEXT_INPUT_OPTIONS,
  // Reuse text input options for now
  hidden: UNIVERSAL_OPTIONS,
  // Minimal options for hidden fields
  password: TEXT_INPUT_OPTIONS,
  // Reuse text input options for now
  number: TEXT_INPUT_OPTIONS,
  // Reuse text input options for now
  radio: SELECT_OPTIONS,
  // Similar to select
  checkbox: SELECT_OPTIONS,
  // Similar to select
  date: UNIVERSAL_OPTIONS,
  time: UNIVERSAL_OPTIONS,
  color_picker: UNIVERSAL_OPTIONS,
  file_upload: UNIVERSAL_OPTIONS
};
function getOptionsForFieldType(fieldType) {
  return FIELD_TYPE_OPTIONS_MAP[fieldType] || UNIVERSAL_OPTIONS;
}
const CONDITION_OPERATORS = [
  { value: "is", label: __("Is equal to", "formglut") },
  { value: "is_not", label: __("Is not equal to", "formglut") },
  { value: "contains", label: __("Contains", "formglut") },
  { value: "not_contains", label: __("Does not contain", "formglut") },
  { value: "starts_with", label: __("Starts with", "formglut") },
  { value: "ends_with", label: __("Ends with", "formglut") },
  { value: "greater_than", label: __("Is greater than", "formglut") },
  { value: "less_than", label: __("Is less than", "formglut") },
  { value: "is_empty", label: __("Is empty", "formglut") },
  { value: "is_not_empty", label: __("Is not empty", "formglut") }
];
function ConditionalLogicOptions({ field, allFields = [], onUpdate }) {
  const enabled = field.conditional_logic || false;
  const conditionMatch = field.condition_match || "any";
  const conditions = field.conditions || [];
  const up = (key, val) => {
    const update = {};
    update[key] = val;
    onUpdate(field.id, update);
  };
  const availableFields = allFields.filter(
    (f) => f.id !== field.id && !["html", "hidden", "section_break", "captcha", "submit_button"].includes(f.type)
  );
  const getFieldOptions = (fieldId) => {
    const f = allFields.find((field2) => field2.id === fieldId);
    if (!f || !["select", "radio", "checkbox", "multiselect"].includes(f.type)) {
      return [];
    }
    return (f.options || []).map((opt) => ({
      value: opt.value || opt.label,
      label: opt.label || `Option`
    }));
  };
  const addCondition = () => {
    var _a;
    const newConditions = [
      ...conditions,
      {
        field_id: ((_a = availableFields[0]) == null ? void 0 : _a.id) || "",
        operator: "is",
        value: ""
      }
    ];
    up("conditions", newConditions);
  };
  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    up("conditions", newConditions);
  };
  const updateCondition = (index, key, value) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [key]: value };
    up("conditions", newConditions);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-conditional-logic", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-prop-label", style: { marginBottom: 0 }, children: __("Enable Conditional Logic", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Show/hide this field based on values of other fields", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FontAwesomeIcon,
          {
            icon: faCircleInfo,
            style: { fontSize: 13, color: "#94a3b8", cursor: "help" }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: enabled, onChange: (v) => up("conditional_logic", v) })
    ] }),
    enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", style: { marginTop: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-prop-label", children: __("Condition Match", "formglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Any: Show field if ANY condition is met. All: Show field if ALL conditions are met.", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FontAwesomeIcon,
            {
              icon: faCircleInfo,
              style: { fontSize: 13, color: "#94a3b8", cursor: "help" }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            value: conditionMatch,
            onChange: (v) => up("condition_match", v),
            style: { width: "100%" },
            options: [
              { value: "any", label: __("Any", "formglut") },
              { value: "all", label: __("All", "formglut") }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-conditions-list", style: { marginTop: 12 }, children: [
        conditions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px 0", textAlign: "center", color: "#94a3b8", fontSize: 13 }, children: __('No conditions added yet. Click "Add Condition" to create one.', "formglut") }) : conditions.map((condition, index) => {
          const selectedField = availableFields.find((f) => f.id === condition.field_id);
          const isSelectField = selectedField && ["select", "radio", "checkbox", "multiselect"].includes(selectedField.type);
          const fieldOptions = isSelectField ? getFieldOptions(condition.field_id) : [];
          const noValueNeeded = ["is_empty", "is_not_empty"].includes(condition.operator);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-condition-row", style: {
            marginBottom: 8,
            padding: "8px",
            background: "#f8fafc",
            borderRadius: 6,
            border: "1px solid #e2e8f0",
            overflow: "hidden"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 8 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Select,
                {
                  size: "small",
                  value: condition.field_id,
                  onChange: (v) => updateCondition(index, "field_id", v),
                  placeholder: __("Select field", "formglut"),
                  style: { flex: 1, minWidth: 0 },
                  options: availableFields.map((f) => ({
                    value: f.id,
                    label: f.admin_label || f.label || f.type
                  }))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Select,
                {
                  size: "small",
                  value: condition.operator,
                  onChange: (v) => {
                    updateCondition(index, "operator", v);
                    if (["is_empty", "is_not_empty"].includes(v)) {
                      updateCondition(index, "value", "");
                    }
                  },
                  placeholder: __("Operator", "formglut"),
                  style: { flex: 1, minWidth: 0 },
                  options: CONDITION_OPERATORS
                }
              )
            ] }),
            !noValueNeeded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
              isSelectField ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Select,
                {
                  size: "small",
                  value: condition.value,
                  onChange: (v) => updateCondition(index, "value", v),
                  placeholder: __("Select value", "formglut"),
                  style: { flex: 1, minWidth: 0 },
                  options: fieldOptions,
                  allowClear: true
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  size: "small",
                  value: condition.value,
                  onChange: (e) => updateCondition(index, "value", e.target.value),
                  placeholder: __("Enter value", "formglut"),
                  style: { flex: 1, minWidth: 0 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "small",
                  danger: true,
                  type: "text",
                  onClick: () => removeCondition(index),
                  style: { minWidth: 32, padding: "0 8px", flexShrink: 0 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrash })
                }
              )
            ] }),
            noValueNeeded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "small",
                danger: true,
                type: "text",
                onClick: () => removeCondition(index),
                style: { minWidth: 32, padding: "0 8px" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrash })
              }
            ) })
          ] }, index);
        }),
        availableFields.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "small",
            type: "dashed",
            onClick: addCondition,
            style: { width: "100%", marginTop: 8 },
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus, style: { fontSize: 12 } }),
            children: __("Add Condition", "formglut")
          }
        ),
        availableFields.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "12px", marginTop: 8, background: "#fff7ed", borderRadius: 6, border: "1px solid #fed7aa", fontSize: 12, color: "#c2410c" }, children: __("Add other fields to your form first to use conditional logic.", "formglut") })
      ] })
    ] })
  ] });
}
const FIELD_SPECIFIC_OPTIONS = {
  // === Size/Dimensions ===
  width: { type: "text", label: "Width", section: "style", placeholder: "e.g., 100%, 300px", description: "Custom width for the element" },
  height: { type: "text", label: "Height", section: "style", placeholder: "e.g., 200px", description: "Custom height for the element" },
  // === CSS Class ===
  css_class: { type: "text", label: "CSS Class", section: "style", placeholder: "Add CSS class", description: "Custom CSS class for styling" },
  // === URL Options ===
  url_scheme: {
    type: "select",
    label: "URL Scheme",
    section: "validation",
    description: "Require a specific URL protocol (http or https)",
    options: [
      { value: "any", label: "Any" },
      { value: "http", label: "HTTP Only" },
      { value: "https", label: "HTTPS Only" }
    ]
  },
  allow_relative: { type: "switch", label: "Allow Relative URLs", section: "validation", description: "Allow relative URLs like /path/to/page" },
  validate_url: { type: "switch", label: "Validate URL Format", section: "validation", description: "Ensure the input is a valid URL format" },
  // === Phone Options ===
  phone_format: {
    type: "select",
    label: "Phone Format",
    section: "general",
    description: "Expected phone number format for validation",
    options: [
      { value: "international", label: "International" },
      { value: "us", label: "US (###) ###-####" },
      { value: "uk", label: "UK #### ######" },
      { value: "custom", label: "Custom Format" }
    ]
  },
  custom_format: { type: "text", label: "Custom Format", section: "general", placeholder: "(999) 999-9999", description: "Custom phone format mask using 9 for digits" }
};
function getOptionDefinitions(fieldType) {
  const sharedOptions = getOptionsForFieldType(fieldType);
  return { ...sharedOptions, ...FIELD_SPECIFIC_OPTIONS };
}
function getApplicableOptions(fieldType, field = {}) {
  const fieldTypeConfig = FIELD_TYPES[fieldType];
  if (!fieldTypeConfig) return [];
  const defaultProps = fieldTypeConfig.defaultProps || {};
  const applicableKeys = Object.keys(defaultProps);
  const excludeKeys = [
    "id",
    "type",
    "options",
    "conditions",
    "conditional_logic",
    "condition_match",
    "columns",
    "levels",
    "items",
    "images",
    "variations",
    "plans",
    "steps",
    "questions",
    "pairs",
    "tabs",
    "available_items",
    "selected_items",
    "child_fields",
    "chain_data",
    "chain_rules",
    "query_args",
    "search_fields",
    "filter_fields",
    "column_types",
    "role_descriptions",
    "custom_roles",
    "custom_icons",
    "allowed_methods",
    "available_methods",
    "tax_rates",
    "accepted_cards",
    "validation_messages",
    "option_groups"
  ];
  return applicableKeys.filter((key) => !excludeKeys.includes(key));
}
function renderLabelWithTooltip(label, description, inline = false) {
  if (!description) {
    return inline ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-prop-label", style: { marginBottom: 0 }, children: label }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-label", children: label });
  }
  const containerStyle = inline ? { marginBottom: 0, display: "flex", alignItems: "center", gap: 6 } : { display: "flex", alignItems: "center", gap: 6, marginBottom: 6 };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: containerStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-prop-label", style: { marginBottom: 0 }, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: description, placement: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FontAwesomeIcon,
      {
        icon: faCircleInfo,
        style: {
          fontSize: 13,
          color: "#94a3b8",
          cursor: "help",
          flexShrink: 0,
          marginTop: -1
        }
      }
    ) })
  ] });
}
function renderOptionInput(key, definition, value, onChange) {
  const { type, label, description, options: selectOptions, placeholder, min, max, rows, icon } = definition;
  const inputId = `field-option-${key}`;
  const commonProps = {
    id: inputId,
    value: value ?? "",
    style: { width: "100%" }
  };
  const labelContent = renderLabelWithTooltip(label, description, false);
  switch (type) {
    case "switch":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }, children: [
        renderLabelWithTooltip(label, description, true),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: !!value, onChange: (v) => onChange(key, v) })
      ] }, key);
    case "select":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        labelContent,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            ...commonProps,
            options: selectOptions || [],
            allowClear: definition.allowClear !== false,
            onChange: (v) => onChange(key, v)
          }
        )
      ] }, key);
    case "number":
      const displayValue = value !== void 0 && value !== "" && !isNaN(Number(value)) ? Number(value) : "";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        labelContent,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: inputId,
            type: "number",
            value: displayValue,
            min: min !== void 0 ? Number(min) : void 0,
            max: max !== void 0 ? Number(max) : void 0,
            placeholder,
            autoComplete: "off",
            onChange: (e) => {
              const val = e.target.value;
              if (val === "" || val === null || val === void 0) {
                onChange(key, "");
                return;
              }
              const num = Number(val);
              if (isNaN(num)) {
                onChange(key, "");
              } else if (min !== void 0 && num < min) {
                onChange(key, min);
              } else if (max !== void 0 && num > max) {
                onChange(key, max);
              } else {
                onChange(key, num);
              }
            }
          }
        )
      ] }, key);
    case "color":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        labelContent,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "color",
              value: value || "#000000",
              onChange: (e) => onChange(key, e.target.value),
              style: { width: 36, height: 36, border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", padding: 2 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: value || "",
              onChange: (e) => onChange(key, e.target.value),
              placeholder: "#000000",
              style: { flex: 1 }
            }
          )
        ] })
      ] }, key);
    case "textarea":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        labelContent,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input.TextArea,
          {
            ...commonProps,
            onChange: (e) => onChange(key, e.target.value),
            rows: rows || 3,
            placeholder
          }
        )
      ] }, key);
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        labelContent,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...commonProps, onChange: (e) => onChange(key, e.target.value), placeholder })
      ] }, key);
  }
}
function DynamicFieldOptions({ field, onUpdate, allFields = [] }) {
  var _a, _b;
  if (!field) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-no-selection", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-no-selection-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleInfo }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-no-selection-text", children: [
        __("Select a field", "formglut"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        __("to edit its options", "formglut")
      ] })
    ] });
  }
  const up = (key, val) => {
    const update = {};
    update[key] = val;
    onUpdate(field.id, update);
  };
  const applicableKeys = reactExports.useMemo(() => {
    return getApplicableOptions(field.type, field);
  }, [field.type]);
  const MASK_OPTION_KEYS = [
    "mask_pattern",
    "custom_mask",
    "mask_placeholder",
    "reversible_mask",
    "clear_on_invalid"
  ];
  const EMAIL_CONFIRMATION_KEYS = [
    "confirm_label",
    "confirm_placeholder",
    "confirm_error_message"
  ];
  const UNIQUE_ERROR_KEYS = [
    "unique_error_message"
  ];
  const optionsBySection = reactExports.useMemo(() => {
    const sections = {};
    const optionDefinitions = getOptionDefinitions(field.type);
    applicableKeys.forEach((key) => {
      if (MASK_OPTION_KEYS.includes(key) && !field.enable_mask) {
        return;
      }
      if (EMAIL_CONFIRMATION_KEYS.includes(key) && !field.confirm_email) {
        return;
      }
      if (UNIQUE_ERROR_KEYS.includes(key) && !field.validate_unique) {
        return;
      }
      const definition = optionDefinitions[key] || {
        type: typeof field[key] === "boolean" ? "switch" : "text",
        label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        section: "advanced"
      };
      const section = definition.section || "general";
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push({ key, definition });
    });
    return sections;
  }, [applicableKeys, field, field.type]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 12, padding: "6px 10px", background: "#f8fafc", borderRadius: 6, fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }, children: [
      (_a = FIELD_TYPES[field.type]) == null ? void 0 : _a.icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600 }, children: ((_b = FIELD_TYPES[field.type]) == null ? void 0 : _b.label) || field.type })
    ] }),
    ["select", "radio", "checkbox", "multiselect"].includes(field.type) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-section-title", children: __("Choice Options", "formglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-label", children: __("Options", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: 8 }, children: [
          (field.options || []).map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 12, color: "#94a3b8", minWidth: 20, textAlign: "center" }, children: [
              idx + 1,
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                size: "small",
                value: opt.label || "",
                placeholder: __("Label", "formglut"),
                onChange: (e) => {
                  const newOpts = [...field.options || []];
                  newOpts[idx] = { ...newOpts[idx], label: e.target.value };
                  if (!newOpts[idx].value) newOpts[idx].value = e.target.value.toLowerCase().replace(/\s+/g, "_");
                  up("options", newOpts);
                },
                style: { flex: 2 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                size: "small",
                value: opt.value || "",
                placeholder: __("Value", "formglut"),
                onChange: (e) => {
                  const newOpts = [...field.options || []];
                  newOpts[idx] = { ...newOpts[idx], value: e.target.value };
                  up("options", newOpts);
                },
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "small",
                danger: true,
                type: "text",
                disabled: (field.options || []).length <= 1,
                onClick: () => {
                  const newOpts = (field.options || []).filter((_, i) => i !== idx);
                  up("options", newOpts);
                },
                style: { minWidth: 32, padding: "0 8px" },
                children: "×"
              }
            )
          ] }, idx)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "small",
              type: "dashed",
              onClick: () => {
                const newOpts = [...field.options || [], { label: `Option ${(field.options || []).length + 1}`, value: `option${(field.options || []).length + 1}` }];
                up("options", newOpts);
              },
              style: { width: "100%", marginTop: 6 },
              children: [
                "+ ",
                __("Add Option", "formglut")
              ]
            }
          )
        ] })
      ] }),
      field.type === "select" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-label", children: __("Default Selected", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            value: field.default_value || "",
            onChange: (v) => up("default_value", v),
            style: { width: "100%" },
            allowClear: true,
            options: [
              { value: "", label: __("None", "formglut") },
              ...(field.options || []).map((opt, i) => ({ value: opt.value || opt.label, label: opt.label || `Option ${i + 1}` }))
            ]
          }
        )
      ] }),
      field.type === "multiselect" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-label", children: __("Default Selected", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            mode: "multiple",
            value: field.default_value || [],
            onChange: (v) => up("default_value", v),
            style: { width: "100%" },
            allowClear: true,
            placeholder: __("Select default options...", "formglut"),
            options: (field.options || []).map((opt, i) => ({ value: opt.value || opt.label, label: opt.label || `Option ${i + 1}` }))
          }
        )
      ] })
    ] }),
    SECTION_ORDER.filter((section) => optionsBySection[section] || section === "conditional").map((section) => {
      if (section === "conditional") {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-section-title", children: __(SECTION_TITLES[section] || section, "formglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConditionalLogicOptions,
            {
              field,
              allFields,
              onUpdate
            }
          )
        ] }, section);
      }
      if (!optionsBySection[section]) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-section-title", children: __(SECTION_TITLES[section] || section, "formglut") }),
        optionsBySection[section].map(
          ({ key, definition }) => renderOptionInput(key, definition, field[key], up)
        )
      ] }, section);
    })
  ] });
}
staticMethods.config({
  duration: 3,
  maxCount: 3,
  top: 24,
  placement: "top"
});
let uid = 0;
function genId() {
  uid += 1;
  return "f" + Date.now() + "_" + uid;
}
function parseCss(cssString) {
  if (!cssString || typeof cssString !== "string") return {};
  const styles = {};
  cssString.split(";").forEach((rule) => {
    const [property, ...valueParts] = rule.split(":");
    const value = valueParts.join(":").trim();
    const prop = property == null ? void 0 : property.trim();
    if (prop && value) {
      const jsProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      styles[jsProp] = value;
    }
  });
  return styles;
}
function getInputMode(keyboardType) {
  const modeMap = {
    numeric: "numeric",
    decimal: "decimal",
    tel: "tel",
    email: "email",
    url: "url"
  };
  return modeMap[keyboardType] || void 0;
}
function PlaceholderStylesInjector({ fieldId, placeholderStyle }) {
  reactExports.useEffect(() => {
    if (!placeholderStyle) return;
    const styleId = `fg-placeholder-styles-${fieldId}`;
    const styleElement = document.createElement("style");
    styleElement.id = styleId;
    styleElement.textContent = `
      .fg-field-${fieldId}::placeholder,
      .fg-field-${fieldId} ::placeholder {
        ${placeholderStyle}
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
    };
  }, [fieldId, placeholderStyle]);
  return null;
}
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
function applyInputMask(value, mask) {
  if (!mask || !value) return value;
  const maskChars = mask.split("");
  const valueChars = value.toString().split("");
  let result = "";
  let valueIndex = 0;
  for (let i = 0; i < maskChars.length && valueIndex < valueChars.length; i++) {
    const maskChar = maskChars[i];
    const valueChar = valueChars[valueIndex];
    if (maskChar === "9") {
      if (/\d/.test(valueChar)) {
        result += valueChar;
        valueIndex++;
      }
    } else if (maskChar === "a") {
      if (/[a-zA-Z]/.test(valueChar)) {
        result += valueChar;
        valueIndex++;
      }
    } else if (maskChar === "*") {
      if (/[a-zA-Z0-9]/.test(valueChar)) {
        result += valueChar;
        valueIndex++;
      }
    } else {
      result += maskChar;
      if (valueChar === maskChar) {
        valueIndex++;
      }
    }
  }
  return result;
}
const pad = (val, fallback) => val != null && val !== "" ? val + "px" : fallback + "px";
function FieldTemplate({ field: f }) {
  const [validationErrors, setValidationErrors] = React.useState({});
  const [multiSelectValues, setMultiSelectValues] = React.useState(f.default_value || []);
  const labelCustomStyle = parseCss(f.label_style);
  const inputCustomStyle = parseCss(f.input_style || f.textarea_style || f.dropdown_style);
  const helpTextCustomStyle = parseCss(f.help_text_style);
  const errorCustomStyle = parseCss(f.error_message_style);
  const containerCustomStyle = parseCss(f.container_style);
  const prefixSuffixCustomStyle = parseCss(f.prefix_suffix_style);
  const inputStyle = {
    background: f.bg_color || "#fafbfc",
    color: f.text_color || "#94a3b8",
    borderColor: f.border_color || "#e2e8f0",
    borderRadius: (f.border_radius ?? 8) + "px",
    padding: `${pad(f.padding_top, 10)} ${pad(f.padding_right, 14)} ${pad(f.padding_bottom, 10)} ${pad(f.padding_left, 14)}`,
    margin: `${pad(f.margin_top, 0)} ${pad(f.margin_right, 0)} ${pad(f.margin_bottom, 0)} ${pad(f.margin_left, 0)}`,
    ...inputCustomStyle
  };
  const fieldWidthVal = f.field_width === "custom" && f.field_width_custom ? f.field_width_custom + "px" : f.field_width;
  const wrapperStyle = {
    ...fieldWidthVal && fieldWidthVal !== "100%" ? { maxWidth: fieldWidthVal } : {},
    ...containerCustomStyle
  };
  const labelPlacement = f.label_placement || "top";
  const labelWidthVal = f.label_width === "custom" && f.label_width_custom ? f.label_width_custom + "px" : f.label_width;
  const labelStyle = labelPlacement === "left" || labelPlacement === "right" ? { flex: "0 0 auto", width: labelWidthVal && labelWidthVal !== "auto" && labelWidthVal !== "100%" ? labelWidthVal : void 0, whiteSpace: "nowrap", marginBottom: 0, ...labelCustomStyle } : labelPlacement === "hidden" ? { display: "none", ...labelCustomStyle } : { ...labelCustomStyle };
  const showHelpTip = f.help_text && f.help_text_position === "tooltip";
  const showHelpAbove = f.help_text && f.help_text_position === "above";
  const showHelpBelow = f.help_text && (!f.help_text_position || f.help_text_position === "below");
  const getDisplayOptions = () => {
    const opts = f.options || [];
    if (f.shuffle_options) {
      return shuffleArray(opts);
    }
    return opts;
  };
  const getMaskedValue = (value) => {
    if (f.enable_mask && (f.custom_mask || f.mask_pattern)) {
      const mask = f.custom_mask || f.mask_pattern;
      return applyInputMask(value, mask);
    }
    return value;
  };
  const getErrorMessage = () => {
    if (f.required && validationErrors.required) {
      return f.validation_message || "This field is required";
    }
    if (f.validate_unique && validationErrors.unique) {
      return f.unique_error_message || "This value already exists";
    }
    if (validationErrors.pattern) {
      return f.validation_message || "Invalid format";
    }
    if (f.type === "email" && f.confirm_email && validationErrors.confirm) {
      return f.confirm_error_message || "Emails do not match";
    }
    return null;
  };
  const errorMessage = getErrorMessage();
  const label = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-form-field-label", style: labelStyle, children: [
    f.admin_label || f.label || /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#94a3b8", fontStyle: "italic" }, children: [
      f.type,
      " ",
      __("field", "formglut")
    ] }),
    f.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "required", children: "*" }),
    showHelpTip && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-help-tip", title: f.help_text, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "10", cy: "10", r: "9", stroke: "currentColor", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 9v5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "10", cy: "6.5", r: "0.75", fill: "currentColor" })
    ] }) })
  ] });
  function renderInput() {
    const fieldName = f.name_attribute || f.id;
    const inputMode = getInputMode(f.mobile_keyboard_type);
    const charLimit = f.character_limit || f.max_length ? Number(f.character_limit || f.max_length) : 0;
    const maxLength = charLimit > 0 ? charLimit : void 0;
    const displayOptions = getDisplayOptions();
    if (f.type === "textarea") {
      const resizeValue = f.resize || "vertical";
      const resizeStyle = resizeValue === "both" ? {} : { resize: resizeValue };
      const minLength = f.min_length ? Number(f.min_length) : void 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-input-group", children: [
        f.prefix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-prefix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.prefix_label } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: `fg-form-field-input fg-field-${f.id} ${f.element_class || ""}`,
            name: fieldName,
            rows: f.rows || 4,
            placeholder: f.placeholder,
            defaultValue: f.default_value,
            maxLength,
            minLength,
            readOnly: true,
            dir: f.enable_rtl ? "rtl" : void 0,
            style: { ...resizeStyle, ...inputStyle }
          },
          `textarea-${f.id}-${f.default_value || ""}-${f.max_length || ""}`
        ),
        f.suffix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-suffix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.suffix_label } })
      ] });
    }
    if (f.type === "email") {
      const maskedValue2 = getMaskedValue(f.default_value);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: f.confirm_email ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-input-group", style: { marginBottom: 8 }, children: [
          f.prefix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-prefix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.prefix_label } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: `fg-form-field-input fg-field-${f.id} ${f.element_class || ""}`,
              type: "email",
              name: `${fieldName}_primary`,
              placeholder: f.placeholder || "Email Address",
              defaultValue: maskedValue2,
              maxLength,
              inputMode,
              readOnly: true,
              style: inputStyle
            },
            `email-${f.id}-primary`
          ),
          f.suffix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-suffix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.suffix_label } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-input-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: 12, color: "#64748b", marginBottom: 4, display: "block" }, children: f.confirm_label || "Confirm Email Address" }),
          f.prefix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-prefix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.prefix_label } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: `fg-form-field-input ${f.element_class || ""}`,
              type: "email",
              name: `${fieldName}_confirm`,
              placeholder: f.confirm_placeholder || "Re-enter email",
              defaultValue: "",
              inputMode,
              readOnly: true,
              style: inputStyle
            },
            `email-${f.id}-confirm`
          ),
          f.suffix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-suffix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.suffix_label } })
        ] }),
        validationErrors.confirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-error-message", style: { color: "#ef4444", fontSize: 12, marginTop: 4, ...errorCustomStyle }, children: f.confirm_error_message || "Emails do not match" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-input-group", children: [
        f.prefix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-prefix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.prefix_label } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `fg-form-field-input fg-field-${f.id} ${f.element_class || ""}`,
            type: "email",
            name: fieldName,
            placeholder: f.placeholder || "email@example.com",
            defaultValue: maskedValue2,
            maxLength,
            inputMode,
            readOnly: true,
            style: inputStyle
          },
          `email-${f.id}`
        ),
        f.suffix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-suffix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.suffix_label } })
      ] }) });
    }
    if (f.type === "select") {
      const firstOptionDisabled = f.disable_first_option !== false;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: `fg-form-field-input fg-field-${f.id} ${f.element_class || ""}`,
          name: fieldName,
          defaultValue: f.default_value,
          disabled: true,
          style: inputStyle,
          children: [
            f.placeholder && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: firstOptionDisabled, children: f.placeholder }),
            displayOptions.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value || opt.label, disabled: firstOptionDisabled && i === 0, children: opt.label || `Option ${i + 1}` }, i))
          ]
        },
        `select-${f.id}-${f.default_value || ""}`
      );
    }
    if (f.type === "multiselect") {
      const getDisplayContent = () => {
        const selectedCount = multiSelectValues.length;
        const selectedOptions = displayOptions.filter(
          (opt) => multiSelectValues.includes(opt.value || opt.label)
        );
        switch (f.display_format) {
          case "count":
            return selectedCount > 0 ? `${selectedCount} selected` : f.placeholder || "Select options...";
          case "text":
            return selectedOptions.map((opt) => opt.label).join(", ") || f.placeholder || "Select options...";
          case "tags":
          default:
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 4 }, children: [
              selectedOptions.map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                background: "#e2e8f0",
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 12
              }, children: opt.label }, idx)),
              selectedCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8" }, children: f.placeholder || "Select options..." })
            ] });
        }
      };
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fg-multiselect-wrapper fg-field-${f.id} ${f.element_class || ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "fg-form-field-input",
            style: {
              ...inputStyle,
              minHeight: 38,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "8px 12px"
            },
            children: [
              getDisplayContent(),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "auto", fontSize: 12 }, children: "▼" })
            ]
          }
        ),
        f.select_all_button && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "fg-select-all-btn",
            style: {
              marginTop: 4,
              padding: "4px 8px",
              fontSize: 12,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 4,
              cursor: "pointer"
            },
            onClick: () => {
              const allValues = displayOptions.map((opt) => opt.value || opt.label);
              setMultiSelectValues(allValues);
            },
            children: "Select All"
          }
        ),
        (f.min_selections > 0 || f.max_selections > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "#64748b", marginTop: 4 }, children: [
          f.min_selections > 0 && `Min: ${f.min_selections}`,
          f.min_selections > 0 && f.max_selections > 0 && " | ",
          f.max_selections > 0 && `Max: ${f.max_selections}`
        ] }),
        multiSelectValues.length > 0 && f.selection_message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#10b981", marginTop: 4 }, children: f.selection_message })
      ] });
    }
    if (f.type === "radio") {
      const isInline = f.layout === "inline" || f.inline;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: isInline ? "flex" : "block", gap: isInline ? "16px" : "8px" }, children: displayOptions.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: fieldName, disabled: true, style: { margin: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.label || `Option ${i + 1}` })
      ] }, i)) });
    }
    if (f.type === "checkbox") {
      const isInline = f.layout === "inline" || f.inline;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: isInline ? "flex" : "block", gap: isInline ? "16px" : "8px" }, children: displayOptions.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", name: fieldName, disabled: true, style: { margin: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.label || `Option ${i + 1}` })
      ] }, i)) });
    }
    if (typeof window.formglutProRenderPreview === "function") {
      const proPreview = window.formglutProRenderPreview(f, inputStyle);
      if (proPreview) return proPreview;
    }
    const typeAttr = f.type === "number" ? "number" : f.type === "email" ? "email" : "text";
    const maskedValue = getMaskedValue(f.default_value);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-input-group", children: [
      f.prefix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-prefix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.prefix_label } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: `fg-form-field-input fg-field-${f.id} ${f.element_class || ""}`,
          type: typeAttr,
          name: fieldName,
          placeholder: f.placeholder,
          defaultValue: maskedValue,
          maxLength,
          inputMode,
          readOnly: true,
          style: inputStyle
        },
        `input-${f.id}-${f.default_value || ""}-${f.max_length || ""}`
      ),
      f.suffix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-suffix", style: prefixSuffixCustomStyle, dangerouslySetInnerHTML: { __html: f.suffix_label } })
    ] });
  }
  const helpTextContent = (showHelpAbove || showHelpBelow) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-help-text", style: helpTextCustomStyle, children: f.help_text });
  const containerClasses = `fg-field-wrapper ${f.container_class || ""}`.trim();
  if (labelPlacement === "left" || labelPlacement === "right") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderStylesInjector, { fieldId: f.id, placeholderStyle: f.placeholder_style }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: containerClasses, style: { display: "flex", alignItems: "center", gap: 8, ...wrapper }, children: [
        labelPlacement === "left" ? label : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          showHelpAbove && helpTextContent,
          renderInput(),
          showHelpBelow && helpTextContent,
          errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-error-message", style: { color: "#ef4444", fontSize: 12, marginTop: 4, ...errorCustomStyle }, children: errorMessage })
        ] }),
        labelPlacement === "right" ? label : null
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderStylesInjector, { fieldId: f.id, placeholderStyle: f.placeholder_style }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: containerClasses, style: wrapperStyle, children: [
      label,
      showHelpAbove && helpTextContent,
      renderInput(),
      showHelpBelow && helpTextContent,
      errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-error-message", style: { color: "#ef4444", fontSize: 12, marginTop: 4, ...errorCustomStyle }, children: errorMessage })
    ] })
  ] });
}
function AddFieldsTab({ onAddField: addFieldFn }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [proEnabled, setProEnabled] = React.useState(false);
  React.useEffect(() => {
    if (typeof window.formglut_admin !== "undefined" && window.formglut_admin.pro_enabled) {
      setProEnabled(true);
    }
  }, []);
  function handleDragStart(e, fieldType) {
    e.dataTransfer.setData("fgFieldType", fieldType);
    e.dataTransfer.effectAllowed = "copy";
  }
  function handleComingSoonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    staticMethods.info(__("This field is not implemented yet", "formglut"));
  }
  const groupedFields = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const groups = {};
    const allFields = getAllFieldTypes();
    Object.entries(allFields).forEach(([key, cfg]) => {
      if (query && !cfg.label.toLowerCase().includes(query)) {
        return;
      }
      const category = cfg.category || "general";
      const isPro = cfg.pro || false;
      if (isPro && !proEnabled) {
        return;
      }
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push({
        key,
        label: cfg.label,
        icon: cfg.icon,
        pro: isPro,
        enabled: true,
        coming_soon: cfg.coming_soon || false
      });
    });
    const categoryOrder = ["general", "advanced", "layout", "payment", "security", "upload", "survey", "wordpress"];
    const orderedGroups = {};
    categoryOrder.forEach((cat) => {
      if (groups[cat]) {
        orderedGroups[cat] = groups[cat];
      }
    });
    Object.keys(groups).forEach((cat) => {
      if (!orderedGroups[cat]) {
        orderedGroups[cat] = groups[cat];
      }
    });
    return orderedGroups;
  }, [searchQuery, proEnabled]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "0 4px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: __("Search fields...", "formglut"),
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        allowClear: true,
        prefix: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { color: "#94a3b8" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "11", cy: "11", r: "8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m21 21-4.35-4.35" })
        ] }),
        style: { marginBottom: 16 }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collapse$1,
      {
        defaultActiveKey: ["general"],
        bordered: false,
        size: "small",
        style: { background: "transparent" },
        items: Object.entries(groupedFields).map(([category, fields]) => ({
          key: category,
          label: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, fontSize: 13 }, children: {
            general: __("General Fields", "formglut"),
            advanced: __("Advanced Fields", "formglut"),
            layout: __("Container Layouts", "formglut"),
            payment: __("Payment Fields", "formglut"),
            security: __("Security Fields", "formglut"),
            upload: __("Upload Fields", "formglut"),
            survey: __("Survey & Quiz", "formglut"),
            wordpress: __("WordPress", "formglut")
          }[category] || category }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-field-grid", children: fields.map((ft) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "fg-field-btn" + (ft.coming_soon ? " fg-field-coming-soon" : ""),
              draggable: !ft.coming_soon,
              "data-field-type": ft.key,
              onDragStart: !ft.coming_soon ? (e) => handleDragStart(e, ft.key) : void 0,
              onClick: !ft.coming_soon ? () => addFieldFn(ft.key) : handleComingSoonClick,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-field-btn-icon", children: ft.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-field-btn-label", children: ft.label }),
                ft.coming_soon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-pro-badge fg-coming-soon-badge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faClock }) })
              ]
            },
            ft.key
          )) })
        }))
      }
    )
  ] });
}
function FieldOptionsTab({ field, onUpdate, submitBtn, onSubBtnUpdate, selectedSubmit, allFields = [] }) {
  if (selectedSubmit) {
    const updateSub = (key, val) => {
      const u = {};
      u[key] = val;
      onSubBtnUpdate(u);
    };
    const renderLabel = (label, tooltip) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-prop-label", style: { marginBottom: 0 }, children: label }),
      tooltip && /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: tooltip, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleInfo, style: { fontSize: 13, color: "#94a3b8", cursor: "help", flexShrink: 0, marginTop: -1 } }) })
    ] });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-section-title", children: __("Button Settings", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
          renderLabel(__("Button Text", "formglut"), __("The text displayed on the submit button.", "formglut")),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: submitBtn.text, onChange: (e) => updateSub("text", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
          renderLabel(__("Button Size", "formglut"), __("The preset size of the button. Small is compact, Large is more prominent.", "formglut")),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: submitBtn.size, onChange: (v) => updateSub("size", v), style: { width: "100%" }, options: [{ value: "small", label: __("Small", "formglut") }, { value: "medium", label: __("Medium", "formglut") }, { value: "large", label: __("Large", "formglut") }] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
          renderLabel(__("Button Alignment", "formglut"), __("How the button is positioned within the form. Full Width stretches to fill the container.", "formglut")),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: submitBtn.alignment, onChange: (v) => updateSub("alignment", v), style: { width: "100%" }, options: [{ value: "left", label: __("Left", "formglut") }, { value: "center", label: __("Center", "formglut") }, { value: "right", label: __("Right", "formglut") }, { value: "full", label: __("Full Width", "formglut") }] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-section-title", children: __("Button Styling", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
          renderLabel(__("Background Color", "formglut"), __("The background color of the submit button.", "formglut")),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: submitBtn.bg_color, onChange: (e) => updateSub("bg_color", e.target.value), style: { width: 36, height: 36, border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", padding: 2 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: submitBtn.bg_color, onChange: (e) => updateSub("bg_color", e.target.value), style: { flex: 1 } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
          renderLabel(__("Text Color", "formglut"), __("The color of the text on the submit button.", "formglut")),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: submitBtn.text_color, onChange: (e) => updateSub("text_color", e.target.value), style: { width: 36, height: 36, border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", padding: 2 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: submitBtn.text_color, onChange: (e) => updateSub("text_color", e.target.value), style: { flex: 1 } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
          renderLabel(__("Border Radius (px)", "formglut"), __("Round the corners of the button. Higher values create more rounded corners.", "formglut")),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: submitBtn.border_radius, onChange: (e) => updateSub("border_radius", parseInt(e.target.value) || 0) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
          renderLabel(__("Font Size (px)", "formglut"), __("The size of the text on the button in pixels.", "formglut")),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: submitBtn.font_size, onChange: (e) => updateSub("font_size", parseInt(e.target.value) || 14) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
          renderLabel(__("Font Weight", "formglut"), __("The thickness of the text. Bold makes the text more prominent.", "formglut")),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: submitBtn.font_weight, onChange: (v) => updateSub("font_weight", v), style: { width: "100%" }, options: [{ value: 400, label: __("Normal (400)", "formglut") }, { value: 500, label: __("Medium (500)", "formglut") }, { value: 600, label: __("Semi Bold (600)", "formglut") }, { value: 700, label: __("Bold (700)", "formglut") }] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
          renderLabel(__("Height (px)", "formglut"), __("The height of the button in pixels.", "formglut")),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: submitBtn.height, onChange: (e) => updateSub("height", parseInt(e.target.value) || 48) })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicFieldOptions, { field, onUpdate, allFields });
}
function StyleOptionsTab({ field, onUpdate }) {
  var _a, _b;
  if (!field) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-no-selection", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-no-selection-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPalette }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-no-selection-text", children: [
        __("Select a field", "formglut"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        __("to edit its style", "formglut")
      ] })
    ] });
  }
  const up = (key, val) => {
    const u = {};
    u[key] = val;
    onUpdate(field.id, u);
  };
  const renderLabel = (label, tooltip) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-prop-label", style: { marginBottom: 0 }, children: label }),
    tooltip && /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: tooltip, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleInfo, style: { fontSize: 13, color: "#94a3b8", cursor: "help", flexShrink: 0, marginTop: -1 } }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 12, padding: "6px 10px", background: "#f8fafc", borderRadius: 6, fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }, children: [
      (_a = FIELD_TYPES[field.type]) == null ? void 0 : _a.icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600 }, children: ((_b = FIELD_TYPES[field.type]) == null ? void 0 : _b.label) || field.type })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-section-title", children: __("Label Style", "formglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Label Placement", "formglut"), __("Position the label above, below, left, or right of the field input.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: field.label_placement || "top", onChange: (v) => up("label_placement", v), style: { width: "100%" }, options: [{ value: "top", label: __("Top", "formglut") }, { value: "left", label: __("Left", "formglut") }, { value: "right", label: __("Right", "formglut") }, { value: "hidden", label: __("Hidden", "formglut") }] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Label Width", "formglut"), __('Set the width of the label. Use "Auto" to let the label text determine the width.', "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: field.label_width || "auto", onChange: (v) => {
          up("label_width", v);
          if (v !== "custom") up("label_width_custom", "");
        }, style: { width: "100%" }, options: [{ value: "auto", label: __("Auto", "formglut") }, { value: "120px", label: __("Small (120px)", "formglut") }, { value: "160px", label: __("Medium (160px)", "formglut") }, { value: "200px", label: __("Large (200px)", "formglut") }, { value: "100%", label: __("Full Width", "formglut") }, { value: "custom", label: __("Custom", "formglut") }] })
      ] }),
      field.label_width === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Custom Width (px)", "formglut"), __("Enter a custom width in pixels for the label.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: field.label_width_custom || "", placeholder: __("e.g. 180", "formglut"), onChange: (e) => up("label_width_custom", e.target.value), addonAfter: "px" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-section-title", children: __("Field Style", "formglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Field Width", "formglut"), __("Set the width of the field input area. Half = 50%, Three Quarter = 75%, Full Width = 100%.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: field.field_width || "100%", onChange: (v) => {
          up("field_width", v);
          if (v !== "custom") up("field_width_custom", "");
        }, style: { width: "100%" }, options: [{ value: "50%", label: __("Half", "formglut") }, { value: "75%", label: __("Three Quarter", "formglut") }, { value: "100%", label: __("Full Width", "formglut") }, { value: "custom", label: __("Custom", "formglut") }] })
      ] }),
      field.field_width === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Custom Width (px)", "formglut"), __("Enter a custom width in pixels for the field input.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: field.field_width_custom || "", placeholder: __("e.g. 400", "formglut"), onChange: (e) => up("field_width_custom", e.target.value), addonAfter: "px" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Input Padding (px)", "formglut"), __("Control the spacing inside the field input between the text and the border.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: __("Top", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", size: "small", value: field.padding_top ?? 10, onChange: (e) => up("padding_top", parseInt(e.target.value) || 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: __("Right", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", size: "small", value: field.padding_right ?? 14, onChange: (e) => up("padding_right", parseInt(e.target.value) || 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: __("Bottom", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", size: "small", value: field.padding_bottom ?? 10, onChange: (e) => up("padding_bottom", parseInt(e.target.value) || 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: __("Left", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", size: "small", value: field.padding_left ?? 14, onChange: (e) => up("padding_left", parseInt(e.target.value) || 0) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Input Margin (px)", "formglut"), __("Control the spacing outside the field input to separate it from other elements.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: __("Top", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", size: "small", value: field.margin_top ?? 0, onChange: (e) => up("margin_top", parseInt(e.target.value) || 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: __("Right", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", size: "small", value: field.margin_right ?? 0, onChange: (e) => up("margin_right", parseInt(e.target.value) || 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: __("Bottom", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", size: "small", value: field.margin_bottom ?? 0, onChange: (e) => up("margin_bottom", parseInt(e.target.value) || 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: __("Left", "formglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", size: "small", value: field.margin_left ?? 0, onChange: (e) => up("margin_left", parseInt(e.target.value) || 0) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Border Radius (px)", "formglut"), __("Round the corners of the field input. Higher values create more rounded corners.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: field.border_radius ?? 8, onChange: (e) => up("border_radius", parseInt(e.target.value) || 0) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-section-title", children: __("Colors", "formglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Background Color", "formglut"), __("The background color of the field input area.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: field.bg_color || "#ffffff", onChange: (e) => up("bg_color", e.target.value), style: { width: 36, height: 36, border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", padding: 2 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: field.bg_color || "#ffffff", onChange: (e) => up("bg_color", e.target.value), style: { flex: 1 } })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Border Color", "formglut"), __("The color of the border around the field input.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: field.border_color || "#e2e8f0", onChange: (e) => up("border_color", e.target.value), style: { width: 36, height: 36, border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", padding: 2 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: field.border_color || "#e2e8f0", onChange: (e) => up("border_color", e.target.value), style: { flex: 1 } })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("Text Color", "formglut"), __("The color of the text entered by users in the field input.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: field.text_color || "#1e293b", onChange: (e) => up("text_color", e.target.value), style: { width: 36, height: 36, border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", padding: 2 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: field.text_color || "#1e293b", onChange: (e) => up("text_color", e.target.value), style: { flex: 1 } })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-prop-section-title", children: __("Custom CSS", "formglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-prop-field", children: [
        renderLabel(__("CSS Class", "formglut"), __("Add a custom CSS class to this field for advanced styling. You can then target this class in your custom CSS.", "formglut")),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: field.css_class || "", placeholder: __("my-custom-class", "formglut"), onChange: (e) => up("css_class", e.target.value) })
      ] })
    ] })
  ] });
}
function getFormIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("form_id") ? parseInt(params.get("form_id"), 10) : null;
}
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => {
      return fallbackCopy(text);
    });
  }
  return fallbackCopy(text);
}
function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful ? Promise.resolve() : Promise.reject(new Error("Copy command failed"));
  } catch (err) {
    document.body.removeChild(textArea);
    return Promise.reject(err);
  }
}
const DEFAULT_SUBMIT_BTN = {
  text: __("Submit Form", "formglut"),
  size: "large",
  alignment: "full",
  bg_color: "#e94560",
  text_color: "#ffffff",
  border_radius: 10,
  font_size: 15,
  font_weight: 600,
  height: 48
};
function FormEditor() {
  const [fields, setFields] = reactExports.useState([]);
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("addFields");
  const dragIdxRef = reactExports.useRef(null);
  const [submitBtn, setSubmitBtn] = reactExports.useState({ ...DEFAULT_SUBMIT_BTN });
  const [selectedSubmit, setSelectedSubmit] = reactExports.useState(false);
  const [dropIdx, setDropIdx] = reactExports.useState(null);
  const [formTitle, setFormTitle] = reactExports.useState(__("Untitled Form", "formglut"));
  const [formId, setFormId] = reactExports.useState(getFormIdFromUrl());
  const [deviceWidth, setDeviceWidth] = reactExports.useState("100%");
  const [isDirty, setIsDirty] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(!!formId);
  const [history, setHistory] = reactExports.useState([]);
  const [historyIdx, setHistoryIdx] = reactExports.useState(-1);
  const initialLoadDone = reactExports.useRef(false);
  const pushHistory = reactExports.useCallback((newFields, newSubmitBtn) => {
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIdx + 1);
      trimmed.push({ fields: newFields, submitBtn: { ...newSubmitBtn || submitBtn } });
      if (trimmed.length > 50) trimmed.shift();
      setHistoryIdx(trimmed.length - 1);
      return trimmed;
    });
  }, [historyIdx, submitBtn]);
  function undo() {
    if (historyIdx <= 0) return;
    const prev = history[historyIdx - 1];
    setHistoryIdx(historyIdx - 1);
    setFields(prev.fields);
    setSubmitBtn(prev.submitBtn);
    setIsDirty(true);
  }
  function redo() {
    if (historyIdx >= history.length - 1) return;
    const next = history[historyIdx + 1];
    setHistoryIdx(historyIdx + 1);
    setFields(next.fields);
    setSubmitBtn(next.submitBtn);
    setIsDirty(true);
  }
  reactExports.useEffect(() => {
    if (!formId) {
      setLoading(false);
      return;
    }
    getForm(formId).then((data) => {
      const form = data.form;
      if (form.title) setFormTitle(form.title);
      if (Array.isArray(form.fields)) setFields(form.fields);
      if (form.submit_btn && typeof form.submit_btn === "object") {
        setSubmitBtn({ ...DEFAULT_SUBMIT_BTN, ...form.submit_btn });
      }
      setLoading(false);
    }).catch((err) => {
      staticMethods.error(err.message || __("Failed to load form.", "formglut"));
      setLoading(false);
    });
  }, []);
  reactExports.useEffect(() => {
    if (!initialLoadDone.current && !loading) {
      setHistory([{ fields, submitBtn }]);
      setHistoryIdx(0);
      initialLoadDone.current = true;
    }
  }, [loading]);
  reactExports.useEffect(() => {
    const h = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [isDirty]);
  reactExports.useEffect(() => {
    function onKey(e) {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      if (e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (e.key === "z" && e.shiftKey || e.key === "y") {
        e.preventDefault();
        redo();
      } else if (e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  function addField(type) {
    const f = createField(type);
    if (!f) return;
    f.id = genId();
    const next = [...fields, f];
    setFields(next);
    setIsDirty(true);
    pushHistory(next);
  }
  function removeField(id) {
    const next = fields.filter((f) => f.id !== id);
    setFields(next);
    if (selectedId === id) {
      setSelectedId(null);
      setActiveTab("addFields");
    }
    setIsDirty(true);
    pushHistory(next);
  }
  function duplicateField(id) {
    let next;
    setFields((p) => {
      const idx = p.findIndex((f) => f.id === id);
      if (idx === -1) return p;
      const copy = Object.assign({}, p[idx], { id: genId(), label: p[idx].label + " (copy)" });
      next = [...p];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    staticMethods.success(__("Field duplicated", "formglut"));
    setIsDirty(true);
    if (next) pushHistory(next);
  }
  function moveField(id, dir) {
    let next;
    setFields((p) => {
      const idx = p.findIndex((f) => f.id === id);
      if (idx === -1) return p;
      const ni = idx + dir;
      if (ni < 0 || ni >= p.length) return p;
      next = [...p];
      [next[idx], next[ni]] = [next[ni], next[idx]];
      return next;
    });
    setIsDirty(true);
    if (next) pushHistory(next);
  }
  function updateFieldProp(id, updates) {
    let next;
    setFields((p) => {
      next = p.map((f) => f.id === id ? Object.assign({}, f, updates) : f);
      return next;
    });
    setIsDirty(true);
    if (next) pushHistory(next);
  }
  function selectField(id) {
    setSelectedId(id);
    setSelectedSubmit(false);
    setActiveTab("fieldOptions");
  }
  function selectSubmitBtn() {
    setSelectedId(null);
    setSelectedSubmit(true);
    setActiveTab("fieldOptions");
  }
  function handleCanvasDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }
  function handleCanvasDrop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData("fgFieldType");
    if (type && FIELD_TYPES[type]) {
      const insertAt = dropIdx != null ? dropIdx : fields.length;
      const f = createField(type);
      if (f) {
        const next = [...fields];
        next.splice(insertAt, 0, f);
        setFields(next);
        setIsDirty(true);
        pushHistory(next);
      }
    }
    dragIdxRef.current = null;
    setDropIdx(null);
  }
  function handleCanvasDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) setDropIdx(null);
  }
  function handleEmptyDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
    setDropIdx(null);
  }
  function handleEmptyDragLeave(e) {
    e.currentTarget.classList.remove("drag-over");
  }
  function handleEmptyDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
    const type = e.dataTransfer.getData("fgFieldType");
    if (type && FIELD_TYPES[type]) addField(type);
    setDropIdx(null);
  }
  function handleFieldDragStart(e, idx) {
    dragIdxRef.current = idx;
    e.dataTransfer.setData("fgReorder", "true");
    e.dataTransfer.effectAllowed = "move";
  }
  function handleFieldDragOver(e, idx) {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setDropIdx(e.clientY < rect.top + rect.height / 2 ? idx : idx + 1);
  }
  function handleFieldDrop(e, targetIdx) {
    e.preventDefault();
    e.stopPropagation();
    const type = e.dataTransfer.getData("fgFieldType");
    if (type && FIELD_TYPES[type]) {
      const f = createField(type);
      if (!f) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ins = e.clientY < rect.top + rect.height / 2 ? targetIdx : targetIdx + 1;
      const next2 = [...fields];
      next2.splice(ins, 0, f);
      setFields(next2);
      setIsDirty(true);
      pushHistory(next2);
      setDropIdx(null);
      return;
    }
    const fromIdx = dragIdxRef.current;
    if (fromIdx === null || fromIdx === targetIdx) {
      setDropIdx(null);
      return;
    }
    const rect2 = e.currentTarget.getBoundingClientRect();
    const midY = rect2.top + rect2.height / 2;
    const next = [...fields];
    const item = next.splice(fromIdx, 1)[0];
    let adj = fromIdx < targetIdx ? targetIdx - 1 : targetIdx;
    if (e.clientY >= midY) adj += 1;
    next.splice(adj, 0, item);
    setFields(next);
    setIsDirty(true);
    pushHistory(next);
    dragIdxRef.current = null;
    setDropIdx(null);
  }
  function handleFieldDragEnd() {
    dragIdxRef.current = null;
    setDropIdx(null);
  }
  async function handleSave() {
    if (saving) return;
    const title = formTitle.trim();
    if (!title) {
      staticMethods.warning(__("Please enter a form title.", "formglut"));
      return;
    }
    setSaving(true);
    try {
      const payload = { title, fields, submit_btn: submitBtn, status: "active" };
      if (formId) {
        payload.id = formId;
        await updateForm(payload);
        staticMethods.success(__("Form saved.", "formglut"));
      } else {
        const result = await createForm(payload);
        setFormId(result.form_id);
        const url = new URL(window.location.href);
        url.searchParams.set("form_id", result.form_id);
        window.history.replaceState({}, "", url.toString());
        staticMethods.success(__("Form created.", "formglut"));
      }
      setIsDirty(false);
    } catch (err) {
      staticMethods.error(err.message || __("Failed to save form.", "formglut"));
    } finally {
      setSaving(false);
    }
  }
  const selectedField = fields.find((f) => f.id === selectedId) || null;
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "large", tip: __("Loading form...", "formglut") }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { height: "100vh", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fg-editor-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-editor-header-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "fg-editor-back", href: _pg.all_forms, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowLeft }),
          " ",
          __("Back", "formglut")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "fg-editor-title-input", value: formTitle, onChange: (e) => {
          setFormTitle(e.target.value);
          setIsDirty(true);
        }, placeholder: __("Enter form title...", "formglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-editor-header-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "fg-editor-tab active", children: __("Editor", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "fg-editor-tab", href: _pg.settings, children: __("Settings", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "fg-editor-tab", href: _pg.entries, children: __("Entries", "formglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-editor-header-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Undo", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateLeft }), size: "small", type: "text", style: { color: "rgba(255,255,255,0.7)" }, onClick: undo, disabled: historyIdx <= 0 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Redo", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateRight }), size: "small", type: "text", style: { color: "rgba(255,255,255,0.7)" }, onClick: redo, disabled: historyIdx >= history.length - 1 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEye }), style: { color: "#fff", background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.15)", borderRadius: 8 }, onClick: () => {
          if (formId) {
            window.open(_pg.preview + "&form_id=" + formId, "_blank");
          } else {
            staticMethods.warning(__("Save the form first to preview.", "formglut"));
          }
        }, children: __("Preview", "formglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: formId ? `[formglut id="${formId}"]` : __("Save the form first to get shortcode.", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCode }), style: { color: "#fff", background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.15)", borderRadius: 8 }, disabled: !formId, onClick: () => {
          const shortcode = `[formglut id="${formId}"]`;
          copyToClipboard(shortcode).then(() => staticMethods.success(__("Shortcode copied!", "formglut"))).catch(() => staticMethods.error(__("Failed to copy shortcode.", "formglut")));
        }, children: __("Shortcode", "formglut") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFloppyDisk }), type: "primary", loading: saving, onClick: handleSave, style: { background: "#e94560", borderColor: "#e94560", borderRadius: 8, fontWeight: 600 }, children: isDirty ? __("Save Form *", "formglut") : __("Save Form", "formglut") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-editor-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-sidebar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { activeKey: activeTab, onChange: setActiveTab, centered: true, items: [
        { key: "addFields", label: __("Add Fields", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddFieldsTab, { onAddField: addField }) },
        { key: "fieldOptions", label: __("Field Options", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FieldOptionsTab, { field: selectedField, onUpdate: updateFieldProp, submitBtn, onSubBtnUpdate: (u) => {
          const next = { ...submitBtn, ...u };
          setSubmitBtn(next);
          setIsDirty(true);
          pushHistory(fields, next);
        }, selectedSubmit, allFields: fields }) },
        { key: "styleOptions", label: __("Style Options", "formglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(StyleOptionsTab, { field: selectedField, onUpdate: updateFieldProp }) }
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-canvas-area", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-canvas-toolbar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-device-switcher", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "fg-device-btn" + (deviceWidth === "100%" ? " active" : ""), onClick: () => setDeviceWidth("100%"), title: "Desktop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "fg-device-btn" + (deviceWidth === "640px" ? " active" : ""), onClick: () => setDeviceWidth("640px"), title: "Tablet", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "4", y: "2", width: "16", height: "20", rx: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "18", x2: "12", y2: "18.01" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "fg-device-btn" + (deviceWidth === "480px" ? " active" : ""), onClick: () => setDeviceWidth("480px"), title: "Mobile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "18", x2: "12", y2: "18.01" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-undo-hint", style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              fields.length,
              " ",
              fields.length !== 1 ? __("fields", "formglut") : __("field", "formglut"),
              isDirty ? " — " + __("unsaved", "formglut") : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  var _a;
                  return window.open(((_a = formglut_admin == null ? void 0 : formglut_admin.pages) == null ? void 0 : _a.pro_features) || "https://formglut.com/pro", "_blank");
                },
                style: {
                  background: "linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1))",
                  border: "1px solid rgba(251, 191, 36, 0.4)",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#fbbf24",
                  fontSize: "12px",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 8px rgba(251, 191, 36, 0.15)"
                },
                onMouseEnter: (e) => {
                  e.target.style.background = "linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.2))";
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 4px 12px rgba(251, 191, 36, 0.25)";
                },
                onMouseLeave: (e) => {
                  e.target.style.background = "linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1))";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 2px 8px rgba(251, 191, 36, 0.15)";
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "currentColor", style: { color: "#fbbf24" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Check Pro Fields", "formglut") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { marginLeft: "2px", color: "#fbbf24" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-canvas", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-canvas-form", style: { maxWidth: deviceWidth === "100%" ? "900px" : deviceWidth, transition: "max-width 0.3s ease" }, onClick: () => {
          setSelectedId(null);
          setSelectedSubmit(false);
        }, onDragOver: handleCanvasDragOver, onDrop: handleCanvasDrop, onDragLeave: handleCanvasDragLeave, children: fields.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-empty-state", onDragOver: handleEmptyDragOver, onDragLeave: handleEmptyDragLeave, onDrop: handleEmptyDrop, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-empty-state-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-empty-state-title", children: __("No fields yet", "formglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-empty-state-desc", children: [
            __("Drag fields from the left panel", "formglut"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            __("or click a field type to add it", "formglut")
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          fields.map((f, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
            dropIdx === idx && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-drop-indicator visible", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Drop here", "formglut") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "fg-form-field" + (selectedId === f.id ? " selected" : ""),
                onClick: (e) => {
                  e.stopPropagation();
                  selectField(f.id);
                },
                draggable: true,
                onDragStart: (e) => handleFieldDragStart(e, idx),
                onDragOver: (e) => handleFieldDragOver(e, idx),
                onDragLeave: () => {
                },
                onDrop: (e) => handleFieldDrop(e, idx),
                onDragEnd: handleFieldDragEnd,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-field-toolbar", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Move up", "formglut"), mouseEnterDelay: 0.4, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
                      e.stopPropagation();
                      moveField(f.id, -1);
                    }, disabled: idx === 0, style: { opacity: idx === 0 ? 0.3 : 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowUp }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Move down", "formglut"), mouseEnterDelay: 0.4, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
                      e.stopPropagation();
                      moveField(f.id, 1);
                    }, disabled: idx === fields.length - 1, style: { opacity: idx === fields.length - 1 ? 0.3 : 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowDown }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-sep" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Settings", "formglut"), mouseEnterDelay: 0.4, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
                      e.stopPropagation();
                      selectField(f.id);
                    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faGear }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Style", "formglut"), mouseEnterDelay: 0.4, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
                      e.stopPropagation();
                      setSelectedId(f.id);
                      setActiveTab("styleOptions");
                    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPalette }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toolbar-sep" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Duplicate", "formglut"), mouseEnterDelay: 0.4, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
                      e.stopPropagation();
                      duplicateField(f.id);
                    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCopy }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Delete", "formglut"), mouseEnterDelay: 0.4, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "danger", onClick: (e) => {
                      e.stopPropagation();
                      removeField(f.id);
                    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrash }) }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FieldTemplate, { field: f }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-add-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-add-between-btn", onClick: (e) => {
                    e.stopPropagation();
                    setActiveTab("addFields");
                  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }) }) })
                ]
              }
            )
          ] }, f.id)),
          dropIdx === fields.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-drop-indicator visible", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Drop here", "formglut") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fg-submit-field" + (selectedSubmit ? " selected" : ""), onClick: (e) => {
            e.stopPropagation();
            selectSubmitBtn();
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: submitBtn.alignment !== "full" ? { textAlign: submitBtn.alignment } : {}, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", size: submitBtn.size === "medium" ? "middle" : submitBtn.size, block: submitBtn.alignment === "full", style: { background: submitBtn.bg_color, borderColor: submitBtn.bg_color, color: submitBtn.text_color, height: submitBtn.height, fontWeight: submitBtn.font_weight, fontSize: submitBtn.font_size, borderRadius: submitBtn.border_radius }, children: submitBtn.text }) }) })
        ] }) }) })
      ] })
    ] })
  ] });
}
createRoot(document.getElementById("formglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(FormEditor, {}));
//# sourceMappingURL=form-editor.js.map
