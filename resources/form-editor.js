import { R as React, a3 as _slicedToArray, a8 as classNames, Y as _defineProperty, a1 as _objectWithoutProperties, K as KeyCode, Z as _extends, a0 as _objectSpread2, a as CSSMotion, c9 as toArray, cn as useMergedState, cu as warningOnce, b$ as pickAttrs, a6 as _typeof, a5 as _toConsumableArray, c1 as reactExports, d as ConfigContext, bB as genStyleHooks, bY as merge, ca as unit, c2 as resetComponent, bA as genFocusStyle, c3 as resetIcon, ce as useComponentConfig, cp as useSize, aa as cloneElement, bP as initCollapseMotion, bZ as omit, I as Icon, cv as wrapperRaf, ck as useLayoutUpdateEffect, cg as useEvent, A as RefResizeObserver, cf as useComposeRef, bT as isMobile, bN as getTransitionName, c8 as textEllipsis, bz as genFocusOutline, cc as useCSSVarCls, u as RefIcon$2, bV as jsxRuntimeExports, i as FontAwesomeIcon, bh as faSliders, ao as faCalculator, ar as faCertificate, be as faShield, as as faCheckDouble, aA as faCreditCard, aw as faClone, aR as faHeart, br as faTruck, a$ as faMoneyBill, b7 as faReceipt, aP as faHashtag, bn as faTags, b9 as faRotate, aS as faHourglassHalf, an as faBarsProgress, bm as faTableList, ay as faCompress, bl as faTableColumns, ai as faArrowDownShortWide, aV as faList, b0 as faPalette, aY as faMapLocation, bo as faThumbsUp, b1 as faPaperPlane, au as faCircleInfo, aW as faLock, aD as faEnvelope, bu as faUserTag, aT as faImage, aJ as faFileLines, bt as faUser, bk as faStar, aq as faCamera, a_ as faMicrophone, aB as faCropSimple, bs as faUpload, bw as faWandSparkles, ag as faAlignLeft, b8 as faRepeat, bd as faShareNodes, bc as faSave, bb as faRotateRight, ak as faArrowRightToBracket, aI as faFileAudio, bv as faVideo, bg as faSignature, bp as faToggleOn, am as faBarcode, aO as faHandshake, aF as faExpand, aH as faEyeSlash, aZ as faMask, ap as faCalendar, av as faClock, b3 as faPercent, bi as faSpinner, aN as faGlobe, aQ as faHeading, aL as faFont, b4 as faPhone, aU as faLink, bj as faSquareCheck, at as faCircleDot, b2 as faPenToSquare, E as Tooltip, B as Button, bq as faTrash, b5 as faPlus, c5 as staticMethods, a2 as _pg, aj as faArrowLeft, ba as faRotateLeft, aG as faEye, ax as faCode, aK as faFloppyDisk, al as faArrowUp, ah as faArrowDown, aM as faGear, az as faCopy, aC as faCrown, ae as createRoot } from "./chunks/Header-Cwf5epXY.js";
import { h as getForm, k as updateForm, c as createForm } from "./chunks/api-CP2qo9fl.js";
import { _ as __ } from "./chunks/default-i18n-Bi0ZJkXv.js";
import { S as Switch } from "./chunks/index-BDHgA9Q0.js";
import { e as genCollapseMotion, m as initSlideMotion, S as Select, I as Input, c as Spin } from "./chunks/index-B1Q4DCZy.js";
import { c as RefIcon$1, E as ExportMenu, M as MenuItem, a as Dropdown, R as RefIcon$3 } from "./chunks/EllipsisOutlined-Cungot-C.js";
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
      // === Label Options ===
      label: "Text Input",
      label_placement: "default",
      // default, top, bottom, left, right, hidden
      admin_label: "",
      // Admin-only label
      // === Input Options ===
      placeholder: "Enter text here...",
      default_value: "",
      // Supports smart codes
      character_limit: "",
      // Max length (0 = unlimited)
      // === Input Formatting ===
      prefix_label: "",
      // Text/HTML before input
      suffix_label: "",
      // Text/HTML after input
      // === Validation ===
      required: false,
      validation_type: "none",
      // none, required, email, url, numeric, pattern
      validation_pattern: "",
      // Regex pattern
      validation_message: "Please enter a valid value",
      unique_value: false,
      // Check for duplicates
      unique_error_message: "This value has already been submitted",
      // === Input Mask ===
      enable_mask: false,
      mask_pattern: "",
      // e.g., (999) 999-9999
      mask_placeholder: "_",
      // Character for unfilled mask
      reversible_mask: false,
      // Allow reverse mask
      clear_on_invalid: false,
      // Clear if doesn't match
      // === Mobile ===
      keyboard_type: "default",
      // default, numeric, decimal, tel, email, url
      // === Styling ===
      container_class: "",
      // CSS class for wrapper
      element_class: "",
      // CSS class for input
      input_width: "",
      // e.g., 100%, 300px
      // === Help & Tools ===
      help_text: "",
      // Tooltip/help message
      help_text_position: "below",
      // below, above, tooltip
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // Conditional logic rules
      // === Advanced ===
      name_attribute: "",
      // Custom name attribute
      autocomplete_attribute: "text",
      // HTML autocomplete
      read_only: false,
      disabled: false
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
      // === Label Options ===
      label: "Email Address",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "email@example.com",
      default_value: "",
      // Supports smart codes like {user_email}
      // === Validation ===
      required: true,
      confirm_email: false,
      // Require confirmation
      confirm_label: "Confirm Email Address",
      confirm_placeholder: "Re-enter email",
      confirm_error_message: "Email addresses do not match",
      unique_value: false,
      // Check for existing emails
      unique_error_message: "This email has already been registered",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      help_text_position: "below",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      autocomplete_attribute: "email",
      read_only: false
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
      // === Label Options ===
      label: "Message",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Type your message here...",
      default_value: "",
      rows: 4,
      // Visible rows
      cols: "",
      // Visible columns (empty = 100%)
      character_limit: "",
      // 0 = unlimited
      character_count_display: false,
      // Show count
      resize: "vertical",
      // vertical, horizontal, both, none
      // === Validation ===
      required: false,
      min_length: "",
      max_length: "",
      validation_message: "Please enter at least {min} characters",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      help_text_position: "below",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      read_only: false,
      enable_rtl: false
      // Right-to-left text
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
      // === Label Options ===
      label: "Dropdown",
      label_placement: "default",
      admin_label: "",
      // === Dropdown Options ===
      placeholder: "Choose an option...",
      options: [
        { label: "Option 1", value: "option1", image: "", disabled: false, calc_value: "" },
        { label: "Option 2", value: "option2", image: "", disabled: false, calc_value: "" },
        { label: "Option 3", value: "option3", image: "", disabled: false, calc_value: "" }
      ],
      default_value: "",
      // Supports smart codes
      // === Option Settings ===
      disable_first_option: true,
      // First option is placeholder
      shuffle_options: false,
      // Randomize order
      enable_search: false,
      // Searchable dropdown
      min_search_chars: 1,
      // Minimum characters to search
      // === Selection ===
      max_selections: 1,
      // 1 = single select
      selection_limit_message: "You can only select {max} options",
      // === Visual Options ===
      show_option_images: false,
      dropdown_style: "modern",
      // modern, classic, minimal
      option_direction: "vertical",
      // vertical, horizontal
      // === Grouping ===
      group_options: false,
      option_groups: [
        { label: "Group 1", options: [] },
        { label: "Group 2", options: [] }
      ],
      // === AJAX/Data Source ===
      ajax_source: false,
      ajax_endpoint: "",
      ajax_method: "GET",
      ajax_params: {},
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      help_text_position: "below",
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
   * MULTIPLE SELECT FIELD
   * Multiple choice dropdown (FREE in FluentForm)
   */
  multiselect: {
    label: "Multiple Select",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faList }),
    category: "general",
    defaultProps: {
      // === Label Options ===
      label: "Multiple Select",
      label_placement: "default",
      admin_label: "",
      // === Dropdown Options ===
      placeholder: "Choose options...",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" }
      ],
      default_value: [],
      // === Selection Settings ===
      max_selections: 0,
      // 0 = unlimited
      min_selections: 0,
      selection_limit_message: "Select between {min} and {max} options",
      // === Visual ===
      enable_search: true,
      searchable_threshold: 10,
      // Enable search after this many options
      select_all_button: true,
      display_format: "tags",
      // tags, text, count
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
   * NUMERIC FIELD
   * Number input with formatting options
   */
  number: {
    label: "Numeric Field",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHashtag }),
    category: "general",
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
  toggle: {
    label: "Toggle Switch",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faToggleOn }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Enable Feature",
      label_placement: "default",
      admin_label: "",
      // === Toggle Options ===
      default_checked: false,
      on_label: "ON",
      off_label: "OFF",
      on_value: "1",
      off_value: "0",
      // === Appearance ===
      toggle_style: "modern",
      // modern, classic, flat, ios
      toggle_size: "medium",
      // small, medium, large
      toggle_color: "success",
      // primary, success, warning, danger
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
   * RANGE SLIDER
   * Numeric range slider (FREE in FluentForm)
   */
  range_slider: {
    label: "Range Slider",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSliders }),
    category: "advanced",
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
  rating: {
    label: "Star Rating",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Rating",
      label_placement: "default",
      admin_label: "",
      // === Rating Options ===
      max_stars: 5,
      default_value: 0,
      allow_half: false,
      // Half-star ratings
      // === Appearance ===
      icon_type: "star",
      // star, heart, thumb, smiley, custom
      custom_icon: "",
      // SVG or icon class
      inactive_color: "#d1d5db",
      active_color: "#fbbf24",
      // === Labels ===
      show_labels: true,
      labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
      // === Behavior ===
      hover_effect: true,
      click_to_clear: true,
      // === Validation ===
      required: false,
      required_message: "Please select a rating",
      // === Styling ===
      container_class: "",
      element_class: "",
      icon_size: "medium",
      // small, medium, large, xl
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
   * SIGNATURE
   * Digital signature canvas (PRO in FluentForm)
   */
  signature: {
    label: "Signature",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSignature }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Signature",
      label_placement: "default",
      admin_label: "",
      // === Canvas Options ===
      width: 300,
      height: 150,
      pen_color: "#000000",
      pen_width: 2,
      bg_color: "#ffffff",
      bg_image: "",
      // Background image URL
      // === Buttons ===
      clear_button: true,
      clear_button_text: "Clear",
      undo_button: false,
      undo_button_text: "Undo",
      // === Output ===
      output_format: "png",
      // png, svg, jpg
      output_quality: 0.9,
      // For jpg
      // === Validation ===
      required: false,
      required_message: "Please sign above",
      // === Styling ===
      container_class: "",
      element_class: "",
      border_style: "solid",
      // solid, dashed, dotted
      border_width: 1,
      // === Help & Tools ===
      help_text: "Sign in the box above",
      placeholder_text: "Sign here",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      touch_only: false,
      // Only allow touch input
      smooth_lines: true
    }
  },
  /**
   * VIDEO EMBED
   */
  video_embed: {
    label: "Video Embed",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faVideo }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Video",
      admin_label: "",
      // === Video Source ===
      video_type: "youtube",
      // youtube, vimeo, self_hosted, embed_code
      video_url: "https://www.youtube.com/watch?v=...",
      embed_code: "",
      // Custom embed code
      video_file: "",
      // Self-hosted file URL
      // === YouTube Options ===
      youtube_autoplay: false,
      youtube_controls: true,
      youtube_rel: false,
      // Show related videos
      youtube_mute: false,
      // === Vimeo Options ===
      vimeo_autoplay: false,
      vimeo_title: true,
      vimeo_byline: true,
      vimeo_portrait: true,
      // === Size ===
      width: 560,
      height: 315,
      responsive: true,
      max_width: "",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      lazy_load: false
    }
  },
  /**
   * AUDIO UPLOAD
   */
  audio_upload: {
    label: "Audio Upload",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileAudio }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Upload Audio",
      admin_label: "",
      // === Upload Options ===
      button_text: "Choose Audio",
      max_size: 10,
      // MB
      allowed_types: ".mp3,.wav,.ogg,.m4a",
      max_duration: 300,
      // seconds
      // === Player Options ===
      show_player: true,
      autoplay: false,
      loop: false,
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
   * IMAGE SELECT
   */
  image_select: {
    label: "Image Select",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCamera }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select Image",
      label_placement: "default",
      admin_label: "",
      // === Selection Type ===
      selection_type: "single",
      // single, multiple
      min_selections: 0,
      max_selections: 0,
      // === Images ===
      images: [
        { url: "", label: "Option 1", value: "opt1" },
        { url: "", label: "Option 2", value: "opt2" },
        { url: "", label: "Option 3", value: "opt3" }
      ],
      default_value: "",
      // === Display ===
      image_width: 150,
      image_height: 150,
      image_fit: "cover",
      // cover, contain, fill
      layout: "grid",
      // grid, flex, carousel
      columns: 3,
      gap: "medium",
      // small, medium, large
      // === Visual ===
      show_labels: true,
      label_position: "below",
      // above, below, overlay, tooltip
      hover_effect: true,
      selected_border: true,
      border_color: "",
      selected_overlay: true,
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
   * FORM STEP
   * Multi-step form break (PRO in FluentForm)
   */
  form_step: {
    label: "Form Step",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowRightToBracket }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Content ===
      step_title: "Step 1",
      step_description: "Enter your information",
      step_number: 1,
      // === Buttons ===
      next_button_text: "Next",
      next_button_icon: "",
      prev_button_text: "Previous",
      prev_button_icon: "",
      // === Button Style ===
      button_style: "primary",
      // primary, secondary, success
      button_size: "medium",
      button_alignment: "right",
      // left, center, right, space_between
      // === Navigation ===
      enable_previous: true,
      save_progress: false,
      // === Progress ===
      show_progress: true,
      progress_type: "steps",
      // steps, percentage, bar
      // === Validation ===
      validate_before_next: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Advanced ===
      name_attribute: "",
      allow_navigation: true
      // Allow jumping between steps
    }
  },
  /**
   * NET PROMOTER SCORE
   * NPS survey field (PRO in FluentForm)
   */
  nps_score: {
    label: "Net Promoter Score",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faThumbsUp }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "How likely are you to recommend us?",
      label_placement: "default",
      admin_label: "",
      // === Scale ===
      scale: 10,
      // 0-10 or 1-10
      start_from_zero: true,
      // 0-10 vs 1-10
      // === Labels ===
      low_label: "Not at all likely",
      mid_label: "Neutral",
      high_label: "Extremely likely",
      show_labels: true,
      // === Categories ===
      show_categories: true,
      detractor_label: "Detractor",
      passive_label: "Passive",
      promoter_label: "Promoter",
      // === Appearance ===
      display_style: "buttons",
      // buttons, slider, dropdown
      button_layout: "horizontal",
      // horizontal, vertical
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      color_scheme: "default",
      // default, green, blue, custom
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
   * LIKERT SCALE
   */
  likert_scale: {
    label: "Likert Scale",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSliders }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Rate your agreement",
      label_placement: "default",
      admin_label: "",
      // === Questions ===
      questions: [
        "Statement 1",
        "Statement 2",
        "Statement 3"
      ],
      // === Scale ===
      scale_points: 5,
      // 3, 5, 7
      min_label: "Strongly Disagree",
      max_label: "Strongly Agree",
      center_label: "Neutral",
      // For odd scales
      // === Appearance ===
      layout: "vertical",
      // vertical, horizontal, matrix
      show_question_numbers: true,
      highlight_extremes: true,
      // === Validation ===
      required: false,
      require_all: false,
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
   * EMOJI RATING
   */
  emoji_rating: {
    label: "Emoji Rating",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faThumbsUp }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "How was your experience?",
      label_placement: "default",
      admin_label: "",
      // === Emoji Options ===
      emoji_type: "standard",
      // standard, custom
      emojis: ["😞", "😐", "🙂", "😃", "🤩"],
      custom_emojis: [],
      // Array of custom emoji URLs
      // === Labels ===
      show_labels: true,
      labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
      label_position: "below",
      // below, above
      // === Appearance ===
      size: "medium",
      // small, medium, large, xl
      layout: "horizontal",
      // horizontal, vertical
      animate_on_hover: true,
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
   * CALCULATED FIELD
   */
  calculated_field: {
    label: "Calculated Field",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalculator }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Calculated Result",
      label_placement: "default",
      admin_label: "",
      // === Formula ===
      formula: "{field1} + {field2}",
      formula_description: "",
      // Describe the calculation
      // === Number Format ===
      number_format: "number",
      // number, currency, percentage
      currency_symbol: "$",
      currency_position: "before",
      decimal_places: 2,
      thousands_separator: true,
      // === Display ===
      read_only: true,
      show_formula: false,
      // Show formula to users
      placeholder: "0",
      // === Conditional Calculation ===
      conditional_formula: false,
      formula_conditions: [],
      // Different formulas based on conditions
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
      live_update: true
      // Update as user types
    }
  },
  /**
   * LOOKUP FIELD
   */
  lookup_field: {
    label: "Lookup Field",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faWandSparkles }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Lookup",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Search...",
      min_search_chars: 2,
      // === Lookup Source ===
      lookup_type: "posts",
      // posts, users, taxonomies, custom
      post_type: "post",
      // Post type to search
      query_args: {},
      // WP_Query args
      // === Search Fields ===
      search_fields: ["post_title"],
      display_field: "post_title",
      value_field: "ID",
      // === Selection ===
      allow_multiple: false,
      max_selections: 0,
      selection_format: "count",
      // count, list, tags
      // === Filters ===
      filters: [],
      // Taxonomy filters, date filters, etc.
      // === AJAX ===
      enable_ajax: true,
      cache_results: true,
      cache_duration: 300,
      // seconds
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
   * RESET BUTTON
   */
  reset_button: {
    label: "Reset Button",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateRight }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Button Options ===
      label: "",
      button_text: "Reset Form",
      button_icon: "",
      // === Confirmation ===
      confirm_reset: true,
      confirm_message: "Are you sure you want to reset the form?",
      confirm_button_text: "Yes, Reset",
      cancel_button_text: "Cancel",
      // === Button Style ===
      button_style: "secondary",
      // primary, secondary, danger
      button_size: "medium",
      button_alignment: "left",
      // left, center, right
      // === Reset Behavior ===
      reset_hidden_fields: true,
      reset_to_defaults: true,
      // Or clear all
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
   * SAVE & RESUME
   */
  save_resume: {
    label: "Save & Resume",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSave }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Button Options ===
      label: "",
      button_text: "Save Progress",
      button_position: "bottom",
      // top, bottom, both
      button_style: "secondary",
      button_icon: "",
      // === Save Method ===
      save_method: "link",
      // link, email, auto
      save_button_label: "Save & Continue Later",
      // === Link Method ===
      link_label: "Your resume link:",
      link_copy_text: "Copy Link",
      link_copied_text: "Copied!",
      // === Email Method ===
      email_field: "",
      // Field containing email
      email_subject: "Continue your form submission",
      email_template: "",
      // === Auto Method ===
      auto_save: false,
      auto_save_interval: 30,
      // seconds
      // === Expiration ===
      expiry_days: 30,
      expiry_type: "days",
      // days, hours
      // === Storage ===
      storage_location: "database",
      // database, transient, cookie
      require_email: false,
      // === Resume ===
      resume_message: "You have a saved form submission.",
      resume_button_text: "Resume",
      delete_button_text: "Delete Saved Data",
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
   * SOCIAL MEDIA PROFILES
   */
  social_profiles: {
    label: "Social Profiles",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faShareNodes }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Social Media Profiles",
      label_placement: "default",
      admin_label: "",
      // === Platforms ===
      platforms: [
        { name: "facebook", label: "Facebook", icon: "", placeholder: "Facebook profile URL" },
        { name: "twitter", label: "Twitter/X", icon: "", placeholder: "Twitter username" },
        { name: "linkedin", label: "LinkedIn", icon: "", placeholder: "LinkedIn profile URL" },
        { name: "instagram", label: "Instagram", icon: "", placeholder: "Instagram username" }
      ],
      // === Input Options ===
      allow_multiple: false,
      // Multiple profiles per platform
      url_validation: true,
      // === Display ===
      show_icons: true,
      icon_size: "small",
      layout: "vertical",
      // vertical, horizontal, grid
      // === Validation ===
      required: false,
      required_platforms: [],
      // Which platforms are required
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
  /* ═════════════════════════════════════════════════════════════════════
     PRO FIELDS (Additional)
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * CHAINED SELECT
   * Hierarchical dropdowns (PRO in FluentForm)
   */
  chained_select: {
    label: "Chained Select",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowDownShortWide }),
    category: "general",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Chained Dropdown",
      label_placement: "default",
      admin_label: "",
      // === Chain Levels ===
      levels: [
        {
          label: "Category",
          options: [
            { label: "Option 1", value: "opt1", children: ["opt1_child1", "opt1_child2"] },
            { label: "Option 2", value: "opt2", children: ["opt2_child1", "opt2_child2"] }
          ],
          placeholder: "Select category..."
        },
        {
          label: "Subcategory",
          options: {},
          // Will be populated dynamically
          placeholder: "Select subcategory..."
        },
        {
          label: "Item",
          options: {},
          placeholder: "Select item..."
        }
      ],
      // === Chain Data ===
      chain_data: {},
      // Full hierarchy data
      data_source: "manual",
      // manual, json, ajax
      json_url: "",
      ajax_endpoint: "",
      // === Display ===
      display_type: "select",
      // select, radio, button
      enable_search: true,
      searchable_threshold: 10,
      // === Reset Behavior ===
      reset_children: true,
      // Clear child selects when parent changes
      // === Validation ===
      required: false,
      require_all_levels: false,
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
   * REPEAT FIELD
   * Repeatable field group (PRO in FluentForm)
   */
  repeat_field: {
    label: "Repeat Field",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRepeat }),
    category: "general",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Repeatable Items",
      admin_label: "",
      // === Child Fields ===
      child_fields: [],
      // Array of field definitions
      field_template: "text",
      // Template for new fields
      // === Repeat Limits ===
      min_repeats: 1,
      max_repeats: 0,
      // 0 = unlimited
      default_repeats: 1,
      // === Buttons ===
      add_button_text: "Add More",
      add_button_icon: "+",
      remove_button_text: "Remove",
      remove_button_icon: "×",
      button_position: "bottom",
      // top, bottom, both
      // === Layout ===
      repeat_layout: "vertical",
      // vertical, horizontal, grid
      item_spacing: "medium",
      // small, medium, large
      show_item_numbers: true,
      // === Collapsible Items ===
      collapsible_items: false,
      default_collapsed: false,
      // === Reordering ===
      allow_reorder: true,
      reorder_handle: "drag",
      // drag, button, both
      // === Validation ===
      required: false,
      require_min: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      item_class: "",
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
   * RICH TEXT INPUT
   * WYSIWYG editor (PRO in FluentForm)
   */
  rich_text: {
    label: "Rich Text",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faAlignLeft }),
    category: "general",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Rich Text Content",
      label_placement: "default",
      admin_label: "",
      // === Editor Options ===
      placeholder: "Enter formatted text...",
      default_value: "",
      // === Toolbar ===
      toolbar: "full",
      // full, simple, minimal, custom
      custom_toolbar: [],
      // Array of toolbar buttons
      // === Features ===
      allow_media: true,
      // Image/video uploads
      allow_links: true,
      allow_tables: true,
      allow_lists: true,
      allow_headings: true,
      allow_colors: true,
      allow_fonts: false,
      allow_font_size: false,
      allow_alignments: true,
      // === Media Options ===
      media_upload_url: "",
      max_image_size: 5,
      // MB
      // === Editor Settings ===
      editor_height: 200,
      editor_theme: "default",
      // default, dark, light
      clean_paste: true,
      // Remove formatting on paste
      auto_link: true,
      // Auto-detect links
      // === Validation ===
      required: false,
      min_length: "",
      max_length: "",
      word_count: false,
      // Enable word count
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      character_count: false,
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      readonly: false
    }
  },
  /**
   * TAG INPUT
   */
  tag_input: {
    label: "Tag Input",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTags }),
    category: "general",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Tags",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Add tags...",
      default_value: [],
      // === Tag Options ===
      allow_custom: true,
      available_tags: [],
      // Predefined tags
      tag_suggestions: true,
      min_chars_for_suggestions: 1,
      // === Constraints ===
      max_tags: 10,
      min_tags: 0,
      tag_separator: ",",
      // Comma, space, or enter
      // === Tag Display ===
      tag_color: "default",
      // default, primary, success, warning, danger
      tag_size: "medium",
      // small, medium, large
      removable: true,
      // === Validation ===
      required: false,
      duplicate_tags: false,
      // Allow duplicates
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
      tag_transform: "lowercase"
      // lowercase, uppercase, preserve
    }
  },
  /**
   * SEARCHABLE DROPDOWN
   */
  searchable_dropdown: {
    label: "Searchable Dropdown",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faWandSparkles }),
    category: "general",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Search & Select",
      label_placement: "default",
      admin_label: "",
      // === Dropdown Options ===
      placeholder: "Type to search...",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" }
      ],
      default_value: "",
      // === Search Options ===
      min_search_chars: 1,
      search_delay: 300,
      // ms before searching
      search_fields: ["label"],
      // Which fields to search
      fuzzy_search: true,
      // === Data Source ===
      data_source: "local",
      // local, ajax, json
      ajax_url: "",
      ajax_method: "GET",
      ajax_params: {},
      // === Selection ===
      selection_limit: 1,
      // 1 = single select
      allow_new_option: false,
      // Allow typing custom value
      // === Display ===
      show_option_count: true,
      highlight_matches: true,
      group_results: false,
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      dropdown_max_height: 200,
      // === Help & Tools ===
      help_text: "",
      no_results_text: "No results found",
      searching_text: "Searching...",
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
     UPLOAD FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * FILE UPLOAD
   */
  file_upload: {
    label: "File Upload",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUpload }),
    category: "upload",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Upload File",
      label_placement: "default",
      admin_label: "",
      // === Upload Options ===
      button_text: "Choose File",
      upload_interface: "button",
      // button, dropzone
      dropzone_text: "Drag & drop files here or click to browse",
      // === Constraints ===
      max_size: 5,
      // MB
      max_files: 1,
      allowed_types: ".pdf,.doc,.docx,.txt,.xls,.xlsx",
      allowed_extensions: [],
      // Alternative to types
      // === Multiple Files ===
      allow_multiple: false,
      show_file_count: true,
      // === Preview ===
      show_preview: false,
      preview_type: "icon",
      // icon, list, thumbnail
      // === Progress ===
      show_progress: true,
      progress_bar_color: "",
      // === File Actions ===
      allow_delete: true,
      allow_replace: false,
      // === Storage ===
      storage_location: "default",
      // default, custom
      custom_path: "",
      // === Validation ===
      required: false,
      validation_messages: {
        size: "File is too large",
        type: "File type not allowed",
        count: "Too many files"
      },
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      size_limit_text: "Max file size: {max}MB",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      auto_upload: true,
      chunk_upload: false,
      chunk_size: 1e6
      // bytes
    }
  },
  /**
   * IMAGE UPLOAD
   */
  image_upload: {
    label: "Image Upload",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faImage }),
    category: "upload",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Upload Image",
      label_placement: "default",
      admin_label: "",
      // === Upload Options ===
      button_text: "Choose Image",
      upload_interface: "button",
      // button, dropzone, gallery
      dropzone_text: "Drag & drop image here",
      // === Constraints ===
      max_size: 5,
      // MB
      max_files: 5,
      min_width: 0,
      // px
      max_width: 0,
      // 0 = unlimited
      min_height: 0,
      max_height: 0,
      min_aspect_ratio: "",
      max_aspect_ratio: "",
      allowed_types: ".jpg,.jpeg,.png,.gif,.webp,.svg",
      // === Cropping ===
      enable_crop: false,
      crop_type: "ratio",
      // ratio, width, free
      crop_ratio: "1:1",
      // 1:1, 4:3, 16:9, free
      crop_width: 300,
      crop_height: 300,
      force_crop: false,
      // Require cropping before upload
      // === Preview ===
      show_preview: true,
      preview_size: "medium",
      // thumbnail, medium, large
      thumbnail_width: 150,
      thumbnail_height: 150,
      // === Multiple Files ===
      allow_multiple: true,
      gallery_view: true,
      // === Validation ===
      required: false,
      // === Storage ===
      storage_location: "default",
      custom_path: "",
      generate_thumbnails: true,
      thumbnail_sizes: [150, 300, 600],
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
      image_quality: 90,
      // For compression
      auto_upload: true
    }
  },
  /**
   * MULTI-FILE UPLOAD
   */
  multifile_upload: {
    label: "Multi-file Upload",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUpload }),
    category: "upload",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Upload Files",
      label_placement: "default",
      admin_label: "",
      // === Upload Options ===
      button_text: "Choose Files",
      upload_interface: "dropzone",
      dropzone_text: "Drag & drop files here",
      // === Constraints ===
      max_size: 10,
      // MB per file
      max_files: 20,
      max_total_size: 100,
      // Total MB
      allowed_types: ".pdf,.doc,.docx,.jpg,.png,.gif",
      // === Progress ===
      show_progress: true,
      progress_per_file: true,
      progress_bar_color: "#3b82f6",
      // === Queue ===
      simultaneous_uploads: 3,
      auto_start_upload: true,
      // === File List ===
      file_list_position: "below",
      // below, above, inline
      show_file_size: true,
      show_file_type: true,
      // === Actions ===
      allow_delete: true,
      allow_reorder: true,
      // === Validation ===
      required: false,
      // === Storage ===
      storage_location: "default",
      custom_path: "",
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
   * CROPPED IMAGE UPLOAD
   */
  cropped_image_upload: {
    label: "Cropped Image Upload",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCropSimple }),
    category: "upload",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Upload & Crop Image",
      label_placement: "default",
      admin_label: "",
      // === Upload Options ===
      button_text: "Choose Image",
      max_size: 5,
      // MB
      allowed_types: ".jpg,.jpeg,.png,.webp",
      // === Crop Options ===
      crop_width: 300,
      crop_height: 300,
      aspect_ratio: "1:1",
      // 1:1, 4:3, 16:9, free
      lock_aspect_ratio: true,
      force_crop: true,
      // Require cropping
      // === Crop Tool Options ===
      allow_rotate: true,
      allow_flip: false,
      zoom_slider: true,
      crop_box_movable: true,
      crop_box_resizable: true,
      // === Output ===
      output_format: "png",
      // png, jpg, webp
      output_quality: 90,
      generate_thumbnail: false,
      thumbnail_size: 150,
      // === Preview ===
      show_preview: true,
      preview_before_crop: true,
      preview_after_crop: true,
      // === Validation ===
      required: false,
      // === Storage ===
      storage_location: "default",
      custom_path: "",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      crop_instructions: "Drag to adjust the crop area",
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
   * WEBCAM CAPTURE
   */
  webcam_capture: {
    label: "Webcam Capture",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCamera }),
    category: "upload",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Capture Photo",
      label_placement: "default",
      admin_label: "",
      // === Capture Options ===
      capture_width: 640,
      capture_height: 480,
      camera_facing: "user",
      // user, environment
      default_camera: "",
      // Leave empty for system default
      // === Button Options ===
      capture_button_text: "Capture",
      retake_button_text: "Retake",
      upload_fallback_text: "Or upload an image",
      // === Fallback ===
      allow_upload_fallback: true,
      upload_fallback_types: ".jpg,.jpeg,.png",
      // === Preview ===
      show_live_preview: true,
      mirror_preview: true,
      // Mirror for user-facing camera
      mirror_output: false,
      // === Output ===
      output_format: "png",
      output_quality: 90,
      // === Validation ===
      required: false,
      // === Storage ===
      storage_location: "default",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "",
      permission_error: "Camera access denied. Please allow camera access.",
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
   * VOICE RECORDING
   */
  voice_recording: {
    label: "Voice Recording",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMicrophone }),
    category: "upload",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Record Voice",
      label_placement: "default",
      admin_label: "",
      // === Recording Options ===
      max_duration: 60,
      // seconds
      allowed_formats: ["mp3", "wav"],
      // mp3, wav, ogg
      audio_quality: "medium",
      // low, medium, high
      sample_rate: 44100,
      // === Button Options ===
      record_button_text: "Start Recording",
      stop_button_text: "Stop",
      play_button_text: "Play",
      pause_button_text: "Pause",
      retake_button_text: "Record Again",
      // === Visual Feedback ===
      show_waveform: true,
      show_timer: true,
      recording_indicator: true,
      // === Auto Options ===
      auto_start: false,
      auto_stop: false,
      // === Preview ===
      allow_playback: true,
      allow_download: false,
      // === Output ===
      output_format: "mp3",
      output_bitrate: 128,
      // kbps
      // === Validation ===
      required: false,
      min_duration: 0,
      // seconds
      // === Storage ===
      storage_location: "default",
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
      permission_error: "Microphone access denied. Please allow microphone access."
    }
  },
  /* ═════════════════════════════════════════════════════════════════════
     SURVEY & QUIZ FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * MATRIX QUESTION
   */
  matrix_question: {
    label: "Matrix Question",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableList }),
    category: "survey",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Matrix Question",
      label_placement: "default",
      admin_label: "",
      // === Matrix Content ===
      rows: ["Row 1", "Row 2", "Row 3"],
      columns: ["Column 1", "Column 2", "Column 3"],
      // === Input Type ===
      input_type: "radio",
      // radio, checkbox, text, dropdown
      // === Column Options (for radio/checkbox) ===
      column_options: [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
        { label: "Option 3", value: "opt3" }
      ],
      // === Text Input Options (for text type) ===
      placeholder: "Enter response...",
      character_limit: "",
      // === Layout ===
      layout: "standard",
      // standard, condensed, expanded
      show_row_numbers: false,
      transpose: false,
      // Swap rows and columns
      // === Validation ===
      required: false,
      require_all_rows: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      highlight_hover: true,
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
   * CHECKABLE GRID
   * Grid-based selection (PRO in FluentForm)
   */
  checkable_grid: {
    label: "Checkable Grid",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableList }),
    category: "survey",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select Options from Grid",
      label_placement: "default",
      admin_label: "",
      // === Grid Content ===
      rows: ["Row 1", "Row 2", "Row 3"],
      columns: ["Column 1", "Column 2", "Column 3"],
      // === Input Type ===
      input_type: "checkbox",
      // checkbox, radio
      // === Layout ===
      layout: "standard",
      // standard, compact, spacious
      show_row_labels: true,
      show_column_labels: true,
      // === Selection ===
      allow_multiple_per_row: true,
      // For checkbox type
      require_all_rows: false,
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      cell_size: "medium",
      // small, medium, large
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
   * MULTIPLE CHOICE GRID
   */
  multiple_choice_grid: {
    label: "Multiple Choice Grid",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableList }),
    category: "survey",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select One Option Per Row",
      label_placement: "default",
      admin_label: "",
      // === Grid Content ===
      rows: ["Question 1", "Question 2", "Question 3"],
      columns: ["Option 1", "Option 2", "Option 3"],
      // === Layout ===
      layout: "standard",
      show_row_numbers: false,
      // === Validation ===
      required: false,
      require_all_rows: true,
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
   * SEMANTIC DIFFERENTIAL
   */
  semantic_differential: {
    label: "Semantic Differential",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSliders }),
    category: "survey",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Rate the Concept",
      label_placement: "default",
      admin_label: "",
      // === Scale Pairs ===
      pairs: [
        { left: "Bad", right: "Good" },
        { left: "Weak", right: "Strong" },
        { left: "Complex", right: "Simple" },
        { left: "Boring", right: "Interesting" }
      ],
      // === Scale Options ===
      scale_points: 7,
      // Usually 5 or 7
      show_neutral: true,
      // === Layout ===
      layout: "vertical",
      // vertical, horizontal
      show_pair_labels: true,
      // === Validation ===
      required: false,
      require_all_pairs: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      color_scale: false,
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
   * IMAGE COMPARISON
   */
  image_comparison: {
    label: "Image Comparison",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCamera }),
    category: "survey",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Which Do You Prefer?",
      label_placement: "default",
      admin_label: "",
      // === Images ===
      images: [
        { url: "", label: "Option A", alt: "" },
        { url: "", label: "Option B", alt: "" }
      ],
      // === Selection Type ===
      selection_type: "single",
      // single, multiple, ranking
      // === Display ===
      image_width: 300,
      image_height: 300,
      image_fit: "cover",
      layout: "side_by_side",
      // side_by_side, stacked, carousel
      // === Comparison Slider (for single selection) ===
      enable_slider: false,
      slider_start_position: 50,
      slider_color: "#3b82f6",
      // === Hover Effects ===
      hover_effect: true,
      hover_scale: 1.05,
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
   * LABELED SLIDER
   */
  slider_with_labels: {
    label: "Labeled Slider",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSliders }),
    category: "survey",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Rate Your Experience",
      label_placement: "default",
      admin_label: "",
      // === Range Options ===
      min: 0,
      max: 10,
      step: 1,
      default_value: 5,
      // === Labels ===
      min_label: "Poor",
      max_label: "Excellent",
      show_value: true,
      value_position: "above",
      // === Ticks ===
      show_ticks: true,
      tick_interval: 1,
      tick_labels: {},
      // === Appearance ===
      slider_style: "modern",
      fill_track: true,
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
    }
  },
  /**
   * QUIZ SCORE
   */
  quiz_score: {
    label: "Quiz Score",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar }),
    category: "survey",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "",
      admin_label: "Quiz Score",
      // === Scoring ===
      score_type: "points",
      // points, percentage
      passing_score: 70,
      max_score: 100,
      // === Display ===
      show_score: true,
      show_percentage: true,
      show_correct_answers: true,
      show_explanations: false,
      // === Options ===
      randomize_order: false,
      allow_review: true,
      // === Messages ===
      pass_message: "Congratulations! You passed.",
      fail_message: "You did not pass. Please try again.",
      score_message: "Your score: {score}%",
      // Supports {score}, {percentage}, {correct}, {total}
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * RANKING / ORDERING
   */
  ranking: {
    label: "Ranking",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowDownShortWide }),
    category: "survey",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Rank the Following Items",
      label_placement: "default",
      admin_label: "",
      // === Items ===
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      // === Ranking Method ===
      ranking_type: "drag",
      // drag, click, dropdown
      // === Options ===
      allow_ties: false,
      require_all: true,
      shuffle_items: false,
      // === Display ===
      item_layout: "vertical",
      // vertical, horizontal, grid
      show_rank_numbers: true,
      max_rank: "",
      // Limit top N ranks
      // === Labels ===
      rank_label: "Rank #{n}",
      unranked_label: "Unranked",
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
  /* ═════════════════════════════════════════════════════════════════════
     WORDPRESS SPECIFIC FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * USER REGISTRATION
   */
  user_registration: {
    label: "User Registration",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUser }),
    category: "wordpress",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Create Account",
      admin_label: "",
      // === Fields ===
      include_username: true,
      include_email: true,
      include_password: true,
      include_first_name: false,
      include_last_name: false,
      include_website: false,
      include_bio: false,
      // === Field Labels ===
      username_label: "Username",
      email_label: "Email Address",
      password_label: "Password",
      first_name_label: "First Name",
      last_name_label: "Last Name",
      // === User Role ===
      user_role: "subscriber",
      // subscriber, contributor, author, editor, custom
      custom_role: "",
      // === Email Options ===
      email_verification: false,
      // Send verification email
      verification_email_subject: "Verify your email address",
      verification_email_template: "",
      // === Password Options ===
      auto_generate_password: false,
      password_strength_meter: true,
      // === Validation ===
      username_check: true,
      // Check if username exists
      email_check: true,
      // Check if email exists
      // === Redirect ===
      redirect_after_registration: "",
      login_after_registration: false,
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
   * POST SUBMISSION
   */
  post_submission: {
    label: "Post Submission",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileLines }),
    category: "wordpress",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Submit Post",
      admin_label: "",
      // === Post Type ===
      post_type: "post",
      // post, page, or custom post type
      custom_post_type: "",
      // === Fields ===
      include_title: true,
      title_label: "Post Title",
      title_required: true,
      include_content: true,
      content_label: "Post Content",
      content_type: "textarea",
      // textarea, rich_text
      content_required: true,
      include_excerpt: false,
      excerpt_label: "Excerpt",
      excerpt_required: false,
      include_featured_image: false,
      featured_image_label: "Featured Image",
      // === Post Settings ===
      post_status: "pending",
      // draft, pending, publish
      post_author: "current_user",
      // current_user, specific_user
      specific_author_id: "",
      // === Categories & Tags ===
      include_category: false,
      category_label: "Category",
      category_selection: "dropdown",
      // dropdown, checkbox, radio
      default_category: "",
      include_tags: false,
      tags_label: "Tags",
      allow_new_tags: true,
      // === Taxonomies ===
      custom_taxonomies: [],
      // Array of taxonomy settings
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
      require_login: false,
      login_message: "Please log in to submit a post.",
      redirect_after_submission: ""
    }
  },
  /**
   * FEATURED IMAGE UPLOAD
   */
  featured_image: {
    label: "Featured Image",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faImage }),
    category: "wordpress",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Featured Image",
      label_placement: "default",
      admin_label: "",
      // === Upload Options ===
      button_text: "Upload Featured Image",
      max_size: 5,
      // MB
      min_width: 0,
      min_height: 0,
      max_width: 0,
      max_height: 0,
      allowed_types: ".jpg,.jpeg,.png,.webp",
      // === Preview ===
      show_preview: true,
      preview_size: "medium",
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
   * CATEGORY SELECTION
   */
  category_selection: {
    label: "Category Selection",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTags }),
    category: "wordpress",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select Category",
      label_placement: "default",
      admin_label: "",
      // === Taxonomy ===
      taxonomy: "category",
      // WordPress taxonomy
      custom_taxonomy: "",
      // === Selection Type ===
      selection_type: "dropdown",
      // dropdown, checkbox, radio, multiselect
      allow_multiple: false,
      hierarchy: true,
      // Show parent-child relationships
      // === Categories ===
      include_categories: [],
      // Specific categories to include
      exclude_categories: [],
      // Categories to exclude
      show_empty: false,
      // Show empty categories
      hide_empty: true,
      // Hide categories with no posts
      // === Display ===
      show_count: false,
      // Post count
      show_description: false,
      depth: 0,
      // Hierarchy depth (0 = unlimited)
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
   * TAG SELECTION
   */
  tag_selection: {
    label: "Tag Selection",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTags }),
    category: "wordpress",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select Tags",
      label_placement: "default",
      admin_label: "",
      // === Taxonomy ===
      taxonomy: "post_tag",
      // WordPress taxonomy
      custom_taxonomy: "",
      // === Input Type ===
      input_type: "text",
      // text, autocomplete, checkbox, dropdown
      allow_custom: true,
      max_tags: 10,
      // === Tags ===
      popular_tags: [],
      // Show popular tags
      min_popularity: 5,
      // Minimum usage count
      // === Display ===
      show_count: false,
      tag_cloud: false,
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
      tag_separator: ","
    }
  },
  /**
   * USER ROLE SELECTION
   */
  user_role_selection: {
    label: "User Role Selection",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserTag }),
    category: "wordpress",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select User Role",
      label_placement: "default",
      admin_label: "",
      // === Role Options ===
      allowed_roles: ["subscriber", "contributor", "author"],
      default_role: "subscriber",
      custom_roles: [],
      // Additional custom roles
      // === Display ===
      display_type: "dropdown",
      // dropdown, radio, button
      // === Descriptions ===
      show_descriptions: false,
      role_descriptions: {
        subscriber: "Can read and comment",
        contributor: "Can write and manage their own posts",
        author: "Can publish and manage their own posts"
      },
      // === Validation ===
      required: true,
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
  /* ═════════════════════════════════════════════════════════════════════
     DYNAMIC & INTERACTIVE FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * DYNAMIC LIST / TABLE
   * Dynamic table rows (PRO in FluentForm)
   */
  dynamic_list: {
    label: "Dynamic List",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableList }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Add Items",
      admin_label: "",
      // === Columns ===
      columns: [
        { label: "Name", type: "text", width: 50, placeholder: "Enter name" },
        { label: "Quantity", type: "number", width: 25, placeholder: "0" },
        { label: "Price", type: "number", width: 25, placeholder: "0.00" }
      ],
      // === Row Options ===
      min_rows: 1,
      max_rows: 50,
      default_rows: 3,
      allow_reorder: true,
      // === Buttons ===
      add_button_text: "Add Row",
      add_button_icon: "+",
      remove_button_text: "Remove",
      remove_button_icon: "×",
      // === Display ===
      table_style: "striped",
      // striped, bordered, simple
      responsive: true,
      show_row_numbers: true,
      // === Column Types ===
      column_types: {
        text: { placeholder: "Enter text" },
        number: { placeholder: "0", decimal: 2 },
        select: { options: [] },
        date: { format: "Y-m-d" },
        checkbox: { default: false },
        calculation: { formula: "" }
      },
      // === Calculations ===
      enable_totals: false,
      total_row_position: "bottom",
      // bottom, top, both
      total_label: "Total",
      // === Validation ===
      required: false,
      require_min_rows: false,
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
   * EMAIL CONFIRMATION
   */
  email_confirmation: {
    label: "Email Confirmation",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Confirm Email",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Confirm email address",
      default_value: "",
      // === Matching ===
      match_field: "email",
      // Field to match against
      error_message: "Email addresses do not match",
      match_case_sensitive: false,
      // === Validation ===
      required: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "Please re-enter your email address",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      autocomplete_attribute: "email"
    }
  },
  /**
   * PASSWORD CONFIRMATION
   */
  password_confirmation: {
    label: "Password Confirmation",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLock }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Confirm Password",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Confirm password",
      default_value: "",
      // === Matching ===
      match_field: "password",
      // Field to match against
      error_message: "Passwords do not match",
      match_case_sensitive: true,
      // === Validation ===
      required: true,
      // === Visibility ===
      show_toggle: true,
      show_text: "Show",
      hide_text: "Hide",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "Please re-enter your password",
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
   * TOOLTIP FIELD
   */
  tooltip_field: {
    label: "Tooltip Field",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleInfo }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Text Input with Tooltip",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Enter text...",
      default_value: "",
      field_type: "text",
      // text, textarea, number, email, etc.
      // === Tooltip ===
      tooltip_text: "Helpful tooltip text",
      tooltip_position: "top",
      // top, bottom, left, right
      tooltip_icon: "info",
      // info, question, help, custom
      custom_icon: "",
      // === Tooltip Behavior ===
      tooltip_trigger: "hover",
      // hover, click, focus
      tooltip_animation: "fade",
      // fade, slide, grow
      tooltip_theme: "default",
      // default, dark, light, custom
      // === Validation ===
      required: false,
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
   * ADDRESS AUTOCOMPLETE
   */
  address_autocomplete: {
    label: "Address Autocomplete",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMapLocation }),
    category: "general",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Address",
      label_placement: "default",
      admin_label: "",
      // === Input Options ===
      placeholder: "Start typing address...",
      // === Autocomplete ===
      provider: "google",
      // google, mapbox, here
      api_key: "",
      api_region: "us",
      // === Components ===
      include_components: ["street", "city", "state", "zip", "country"],
      component_fields: {
        street: { label: "Street", required: true },
        city: { label: "City", required: true },
        state: { label: "State", required: false },
        zip: { label: "Zip Code", required: false },
        country: { label: "Country", required: false }
      },
      // === Display ===
      separate_components: true,
      // Split into separate fields
      layout: "vertical",
      // === Constraints ===
      country_restriction: "",
      // Limit to country
      bounds: "",
      // Limit to geographic area
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
   * CUSTOM SUBMIT BUTTON
   * (FREE in FluentForm)
   */
  custom_submit_button: {
    label: "Custom Submit Button",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }),
    category: "advanced",
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
  like_dislike: {
    label: "Like / Dislike",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faThumbsUp }),
    category: "general",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Do you like this?",
      label_placement: "default",
      admin_label: "",
      // === Options ===
      allow_neutral: true,
      neutral_label: "Neutral",
      like_label: "Like",
      dislike_label: "Dislike",
      // === Icons ===
      icon_type: "thumbs",
      // thumbs, smiley, star, heart, custom
      custom_icons: {
        like: "",
        dislike: "",
        neutral: ""
      },
      // === Layout ===
      layout: "horizontal",
      // horizontal, vertical
      show_labels: true,
      label_position: "below",
      // below, above, hide
      // === Behavior ===
      allow_change: true,
      // Allow changing selection
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      icon_size: "medium",
      // small, medium, large
      active_color: "",
      inactive_color: "",
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
   * FACEBOOK LIKE
   */
  facebook_like: {
    label: "Facebook Like",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faThumbsUp }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "",
      admin_label: "",
      // === URL ===
      url_type: "current",
      // current, custom
      custom_url: "",
      // === Button Options ===
      layout: "standard",
      // standard, button_count, box_count, button
      width: "",
      share: true,
      show_faces: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      align: "left",
      // left, center, right
      // === Advanced ===
      name_attribute: "",
      kid_directed_site: false,
      referral_code: ""
    }
  },
  /**
   * MARK ON MAP
   */
  mark_on_map: {
    label: "Mark on Map",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMapLocation }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select Location on Map",
      label_placement: "default",
      admin_label: "",
      // === Map Provider ===
      map_provider: "google",
      // google, mapbox, leaflet, openstreetmap
      api_key: "",
      map_style: "roadmap",
      // roadmap, satellite, hybrid, terrain
      // === Default Location ===
      default_location: { lat: 40.7128, lng: -74.006 },
      // NYC
      zoom_level: 10,
      fit_bounds: true,
      // === Interaction ===
      allow_drag: true,
      allow_click: true,
      single_marker: true,
      // === Marker ===
      marker_icon: "",
      marker_color: "#e94560",
      marker_draggable: true,
      // === Display ===
      map_width: "100%",
      map_height: 400,
      map_type_control: true,
      zoom_control: true,
      street_view_control: false,
      fullscreen_control: false,
      // === Geolocation ===
      enable_geolocation: false,
      geolocation_button_text: "Use My Location",
      // === Output ===
      output_format: "lat_lng",
      // lat_lng, address, both
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
   * COLOR SWATCH
   */
  color_swatch: {
    label: "Color Swatch",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPalette }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Choose Color",
      label_placement: "default",
      admin_label: "",
      // === Swatches ===
      swatches: ["#e94560", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
      allow_custom: true,
      // === Display ===
      display_type: "swatches",
      // swatches, picker, both
      swatch_size: "medium",
      // small, medium, large
      swatch_shape: "square",
      // square, circle
      layout: "grid",
      // grid, flex
      // === Picker Options (when custom allowed) ===
      picker_type: "default",
      // default, chrome, sketch, photoshop
      color_format: "hex",
      // hex, rgb, hsl
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
   * DUAL LISTBOX
   */
  dual_listbox: {
    label: "Dual List Box",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faList }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select Items",
      label_placement: "default",
      admin_label: "",
      // === Options ===
      available_items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      selected_items: [],
      // === Layout ===
      list_height: 200,
      list_width: "equal",
      // equal, custom
      left_list_width: "",
      right_list_width: "",
      // === Labels ===
      available_label: "Available",
      selected_label: "Selected",
      // === Buttons ===
      move_all_button: true,
      move_button_style: "icon",
      // icon, text, both
      // === Search ===
      allow_search: true,
      search_placeholder: "Search...",
      // === Filter ===
      allow_filter: false,
      filter_placeholder: "Filter...",
      // === Sorting ===
      sort_items: false,
      sort_selected: false,
      sort_order: "asc",
      // asc, desc
      // === Display ===
      show_item_count: true,
      show_tooltips: true,
      // === Validation ===
      required: false,
      min_selections: 0,
      max_selections: 0,
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
   * CHAINED FIELDS
   */
  chained_fields: {
    label: "Chained Fields",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowDownShortWide }),
    category: "advanced",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Dependent Fields",
      admin_label: "",
      // === Chain Configuration ===
      parent_field: "",
      // Field to watch
      chain_type: "show",
      // show, hide, enable, disable
      chain_rules: [
        { parent_value: "option1", action: "show", target_fields: ["field1", "field2"] },
        { parent_value: "option2", action: "show", target_fields: ["field3"] }
      ],
      // === Display ===
      animation: "fade",
      // fade, slide, none
      animation_duration: 300,
      // === Validation ===
      validate_hidden: false,
      // Validate fields that are hidden
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
  accordion: {
    label: "Accordion",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCompress }),
    category: "layout",
    pro: true,
    defaultProps: {
      label: "Accordion",
      title: "Section Title",
      description: "",
      collapsible: true,
      default_open: false,
      icon_position: "left",
      // left, right, none
      icon: "",
      // === Style ===
      border_style: "solid",
      // solid, dashed, none
      border_width: 1,
      border_color: "",
      // === Animation ===
      animation: "smooth",
      // smooth, instant, none
      animation_duration: 300,
      // === Multiple Open ===
      allow_multiple_open: false,
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
   * TABS CONTAINER
   */
  tabs: {
    label: "Tabs",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableList }),
    category: "layout",
    pro: true,
    defaultProps: {
      label: "",
      tabs: [
        { title: "Tab 1", icon: "", fields: [] },
        { title: "Tab 2", icon: "", fields: [] }
      ],
      // === Position ===
      tab_position: "top",
      // top, left, right, bottom
      // === Style ===
      tab_style: "default",
      // default, pills, underline, card
      tab_size: "medium",
      // small, medium, large
      // === Behavior ===
      remember_selection: false,
      // Remember on page load
      auto_rotate: false,
      rotate_interval: 5e3,
      // ms
      // === Animation ===
      animation: "fade",
      // fade, slide, none
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
   * PROGRESS BAR
   */
  progress_bar: {
    label: "Progress Bar",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBarsProgress }),
    category: "layout",
    pro: true,
    defaultProps: {
      label: "",
      // === Bar Type ===
      bar_type: "percentage",
      // percentage, steps, animated
      bar_color: "#e94560",
      bar_height: 10,
      bar_style: "solid",
      // solid, striped, animated
      // === Display ===
      show_percentage: true,
      show_steps: true,
      show_label: true,
      label_text: "Form Progress",
      // === Steps ===
      steps: [],
      // Array of step labels
      // === Animation ===
      animate_on_load: true,
      animation_duration: 1e3,
      // === Position ===
      position: "top",
      // top, bottom, both
      // === Styling ===
      container_class: "",
      element_class: "",
      background_color: "",
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * COUNTDOWN TIMER
   */
  countdown_timer: {
    label: "Countdown Timer",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHourglassHalf }),
    category: "layout",
    pro: true,
    defaultProps: {
      label: "",
      // === Time ===
      end_date: "",
      end_time: "23:59",
      duration: "",
      // Alternative: duration in minutes
      // === Format ===
      timer_format: "DHMS",
      // D, H, M, S combination
      separator: ":",
      // === Labels ===
      labels: {
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds"
      },
      // === Expiration ===
      message: "Time has expired!",
      redirect_url: "",
      hide_form_on_expire: false,
      disable_submit_on_expire: true,
      // === Display ===
      show_labels: true,
      show_separator: true,
      leading_zeros: true,
      // === Style ===
      style: "default",
      // default, modern, circular, flip
      theme_color: "#e94560",
      // === Animation ===
      tick_animation: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Advanced ===
      name_attribute: "",
      auto_restart: false
    }
  },
  /* ═════════════════════════════════════════════════════════════════════
     PAYMENT FIELDS (PRO in FluentForm)
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * PAYMENT ITEM
   */
  payment_item: {
    label: "Payment Item",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faReceipt }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Item Name",
      admin_label: "",
      // === Item Details ===
      item_type: "single",
      // single, subscription, donation
      description: "",
      // === Pricing ===
      price: 0,
      price_type: "fixed",
      // fixed, user_entered
      min_price: 0,
      max_price: 0,
      // === Quantity ===
      quantity_enabled: true,
      default_quantity: 1,
      min_quantity: 1,
      max_quantity: 100,
      quantity_step: 1,
      // === Tax ===
      taxable: false,
      tax_rate: 0,
      tax_included: false,
      // === Validation ===
      required: true,
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
   * SUBSCRIPTION ITEM
   */
  subscription: {
    label: "Subscription",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotate }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Subscription Plan",
      admin_label: "",
      // === Plans ===
      plans: [
        { label: "Monthly", value: "monthly", price: 10, interval: "month", interval_count: 1 },
        { label: "Yearly", value: "yearly", price: 100, interval: "year", interval_count: 1 }
      ],
      default_plan: "monthly",
      // === Trial ===
      trial_period: 0,
      // days
      trial_amount: 0,
      // === Setup Fee ===
      setup_fee: 0,
      setup_fee_label: "One-time setup fee",
      // === Billing Cycle ===
      billing_cycle_label: "Billed {interval}",
      show_renewal_date: true,
      // === Options ===
      allow_plan_change: true,
      prorate_on_change: false,
      // === Validation ===
      required: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      plan_display: "radio",
      // radio, button, card
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
   * COUPON
   */
  coupon: {
    label: "Coupon Code",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTags }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Coupon Code",
      admin_label: "",
      // === Input ===
      placeholder: "Enter coupon code",
      apply_button_text: "Apply",
      // === Coupons ===
      allowed_coupons: [],
      // Specific allowed codes
      coupon_source: "database",
      // database, manual, api
      // === Display ===
      show_discount_amount: true,
      show_remove_button: true,
      remove_button_text: "Remove",
      // === Messages ===
      success_message: "Coupon applied successfully!",
      invalid_message: "Invalid coupon code",
      expired_message: "Coupon has expired",
      // === Validation ===
      required: false,
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      apply_on_load: false,
      default_coupon: ""
    }
  },
  /**
   * ITEM QUANTITY
   */
  item_quantity: {
    label: "Quantity",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHashtag }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Quantity",
      label_placement: "default",
      admin_label: "",
      // === Quantity Options ===
      min: 1,
      max: 100,
      step: 1,
      default: 1,
      // === Price ===
      price_per_unit: 0,
      calculate_total: true,
      // === Display ===
      show_buttons: true,
      increment_label: "+",
      decrement_label: "-",
      show_total: true,
      total_label: "Total: {amount}",
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
   * PAYMENT SUMMARY
   */
  payment_summary: {
    label: "Payment Summary",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faReceipt }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Order Summary",
      admin_label: "",
      // === Display Options ===
      show_subtotal: true,
      subtotal_label: "Subtotal",
      show_tax: true,
      tax_label: "Tax",
      show_shipping: false,
      shipping_label: "Shipping",
      show_discount: true,
      discount_label: "Discount",
      show_total: true,
      total_label: "Total",
      // === Currency ===
      currency: "USD",
      currency_symbol: "$",
      currency_position: "before",
      decimal_places: 2,
      // === Layout ===
      layout: "list",
      // list, table, compact
      align_right: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      highlight_total: true,
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * CUSTOM PAYMENT AMOUNT
   */
  payment_amount: {
    label: "Custom Amount",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMoneyBill }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Payment Amount",
      label_placement: "default",
      admin_label: "",
      // === Amount Options ===
      placeholder: "Enter amount",
      min: 0,
      max: 1e3,
      default: 10,
      step: 1,
      // === Preset Amounts ===
      show_presets: true,
      preset_amounts: [10, 25, 50, 100],
      preset_layout: "buttons",
      // buttons, dropdown
      allow_custom: true,
      // === Currency ===
      currency: "USD",
      currency_symbol: "$",
      symbol_position: "before",
      // === Validation ===
      required: true,
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
   * PAYMENT METHOD
   */
  payment_method: {
    label: "Payment Method",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCreditCard }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select Payment Method",
      label_placement: "default",
      admin_label: "",
      // === Methods ===
      methods: ["paypal", "stripe", "bank_transfer"],
      available_methods: {
        paypal: { label: "PayPal", icon: "", enabled: true },
        stripe: { label: "Credit Card", icon: "", enabled: true },
        bank_transfer: { label: "Bank Transfer", icon: "", enabled: true }
      },
      default_method: "paypal",
      // === Display ===
      display_type: "radio",
      // radio, button, dropdown
      show_icons: true,
      show_descriptions: false,
      // === Validation ===
      required: true,
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
   * SHIPPING ADDRESS
   */
  shipping_address: {
    label: "Shipping Address",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTruck }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Shipping Address",
      label_placement: "default",
      admin_label: "",
      // === Address Components ===
      include_street1: true,
      include_street2: true,
      include_city: true,
      include_state: true,
      include_zip: true,
      include_country: true,
      // === Copy from Billing ===
      same_as_billing_option: true,
      same_as_billing_label: "Same as billing address",
      default_same_as_billing: false,
      // === Phone ===
      require_phone: false,
      phone_label: "Phone Number",
      // === Validation ===
      required: false,
      required_fields: [],
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
   * DONATION
   */
  donation: {
    label: "Donation",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHeart }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Donation Amount",
      label_placement: "default",
      admin_label: "",
      // === Preset Amounts ===
      preset_amounts: [10, 25, 50, 100],
      allow_custom: true,
      default_amount: 25,
      // === Recurring ===
      recurring_option: false,
      recurring_label: "Make this a monthly donation",
      recurring_intervals: ["monthly"],
      // === Display ===
      preset_layout: "buttons",
      // buttons, grid, dropdown
      highlight_popular: true,
      popular_amount: 50,
      // === Currency ===
      currency: "USD",
      currency_symbol: "$",
      // === Messages ===
      thank_you_message: "Thank you for your donation!",
      // === Validation ===
      required: true,
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
   * PRODUCT VARIATIONS
   */
  product_variations: {
    label: "Product Variations",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faClone }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Select Options",
      label_placement: "default",
      admin_label: "",
      // === Variations ===
      variations: [
        { name: "Size", options: ["Small", "Medium", "Large"], required: true },
        { name: "Color", options: ["Red", "Blue", "Green"], required: true }
      ],
      // === Price Adjustments ===
      price_adjustments: {
        // Format: 'Size-Medium': +5, 'Color-Red': -2
      },
      // === Display ===
      variation_type: "radio",
      // radio, button, dropdown, color_swatch, image
      show_prices: true,
      show_stock: false,
      // === Validation ===
      required: true,
      require_all_variations: true,
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
   * TAX CALCULATION
   */
  tax_calculation: {
    label: "Tax Calculation",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalculator }),
    category: "payment",
    pro: true,
    defaultProps: {
      label: "",
      // === Tax Rate ===
      tax_rate: 0,
      tax_type: "percentage",
      // percentage, fixed
      tax_label: "Tax",
      // === Options ===
      tax_included: false,
      // Price includes tax
      apply_to_shipping: false,
      compound_tax: false,
      // Tax on tax
      // === By Region ===
      regional_tax: false,
      tax_rates: {
        // Format: 'US': 10, 'CA': 5
      },
      // === Display ===
      show_tax_breakdown: false,
      breakdown_label: "Tax Details",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * CREDIT CARD
   */
  credit_card: {
    label: "Credit Card",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCreditCard }),
    category: "payment",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Card Details",
      label_placement: "default",
      admin_label: "",
      // === Card Fields ===
      show_card_number: true,
      card_number_label: "Card Number",
      card_number_placeholder: "1234 5678 9012 3456",
      show_expiry: true,
      expiry_label: "Expiration Date",
      expiry_placeholder: "MM / YY",
      show_cvc: true,
      cvc_label: "CVC",
      cvc_placeholder: "123",
      show_cardholder_name: false,
      cardholder_label: "Cardholder Name",
      // === Card Icons ===
      show_card_icons: true,
      accepted_cards: ["visa", "mastercard", "amex", "discover"],
      // === Validation ===
      required: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      input_style: "modern",
      // modern, classic, minimal
      // === Help & Tools ===
      help_text: "",
      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: "any",
      // any, all
      conditions: [],
      // === Advanced ===
      name_attribute: "",
      postal_code: false,
      postal_label: "Postal Code"
    }
  },
  /* ═════════════════════════════════════════════════════════════════════
     SECURITY FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * HONEYPOT
   */
  honeypot: {
    label: "Honeypot",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faShield }),
    category: "security",
    pro: true,
    defaultProps: {
      label: "",
      field_name: "website_url",
      // Realistic field name
      validation_method: "empty",
      // empty, specific_value
      specific_value: "",
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * RECAPTCHA
   * (FREE in FluentForm - essential security)
   */
  recaptcha: {
    label: "reCAPTCHA",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCheckDouble }),
    category: "security",
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
  },
  /**
   * MATH CAPTCHA
   */
  math_captcha: {
    label: "Math Captcha",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalculator }),
    category: "security",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "",
      admin_label: "",
      // === Question ===
      difficulty: "medium",
      // easy, medium, hard
      operation: "addition",
      // addition, subtraction, multiplication, mixed
      // === Display ===
      question_template: "{num1} {operator} {num2} =",
      placeholder: "Answer",
      // === Options ===
      num1_range: [1, 10],
      // For easy
      num2_range: [1, 10],
      negative_answers: false,
      // === Validation ===
      required: true,
      error_message: "Incorrect answer. Please try again.",
      // === Styling ===
      container_class: "",
      element_class: "",
      // === Help & Tools ===
      help_text: "Solve the math problem to continue",
      // === Advanced ===
      name_attribute: ""
    }
  },
  /**
   * SLIDER CAPTCHA
   */
  slider_captcha: {
    label: "Slider Captcha",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSliders }),
    category: "security",
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: "Slide to verify",
      admin_label: "",
      // === Puzzle Type ===
      puzzle_type: "slide",
      // slide, rotate
      // === Display ===
      slider_text: "Slide right to verify",
      verified_text: "Verified!",
      failed_text: "Please try again",
      // === Options ===
      refresh_button: true,
      retry_limit: 3,
      // === Validation ===
      required: true,
      // === Styling ===
      container_class: "",
      element_class: "",
      theme: "light",
      // light, dark
      // === Advanced ===
      name_attribute: ""
    }
  }
};
function createField(type) {
  const fieldType = FIELD_TYPES[type];
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
  labelPlacement: [
    { value: "top", label: "Above Field" },
    { value: "left", label: "Left of Field" },
    { value: "right", label: "Right of Field" },
    { value: "hidden", label: "Hidden" }
  ]
};
const SECTION_ORDER = [
  "general",
  "validation"
];
const SECTION_TITLES = {
  general: "Field Options",
  validation: "Validation"
};
const UNIVERSAL_OPTIONS = {
  // === Field Options (General) ===
  label: {
    type: "text",
    label: "Field Label",
    section: "general",
    icon: "fa-tag",
    description: "The label displayed above or beside the field"
  },
  label_placement: {
    type: "select",
    label: "Label Placement",
    section: "general",
    description: "Where to position the label relative to the field",
    options: COMMON_OPTION_VALUES.labelPlacement
  },
  placeholder: {
    type: "text",
    label: "Placeholder",
    section: "general",
    placeholder: "Text shown in empty field",
    description: "Helpful hint shown inside the field when empty"
  },
  default_value: {
    type: "text",
    label: "Default Value",
    section: "general",
    placeholder: "Pre-populated value",
    description: "Field is pre-filled with this value"
  },
  character_limit: {
    type: "number",
    label: "Character Limit",
    section: "general",
    min: 0,
    placeholder: "No limit",
    description: "Maximum number of characters allowed. Leave empty for unlimited."
  },
  // === Validation ===
  required: {
    type: "switch",
    label: "Required",
    section: "validation",
    description: "User must fill this field before submitting the form"
  }
};
const TEXTAREA_OPTIONS = {
  rows: {
    type: "number",
    label: "Rows",
    section: "general",
    min: 1,
    max: 50,
    description: "Number of rows for textarea"
  }
};
const FIELD_TYPE_OPTIONS_MAP = {
  // === Text-based fields ===
  text: { ...UNIVERSAL_OPTIONS },
  email: { ...UNIVERSAL_OPTIONS },
  textarea: { ...UNIVERSAL_OPTIONS, ...TEXTAREA_OPTIONS },
  url: { ...UNIVERSAL_OPTIONS },
  phone: { ...UNIVERSAL_OPTIONS },
  hidden: { ...UNIVERSAL_OPTIONS },
  password: { ...UNIVERSAL_OPTIONS },
  // === Number-based fields ===
  number: { ...UNIVERSAL_OPTIONS },
  // === Select-based fields ===
  select: { ...UNIVERSAL_OPTIONS },
  multiselect: { ...UNIVERSAL_OPTIONS },
  radio: { ...UNIVERSAL_OPTIONS },
  checkbox: { ...UNIVERSAL_OPTIONS },
  // === Date/Time fields ===
  date: { ...UNIVERSAL_OPTIONS },
  time: { ...UNIVERSAL_OPTIONS },
  // === Other fields ===
  color_picker: { ...UNIVERSAL_OPTIONS },
  file_upload: { ...UNIVERSAL_OPTIONS }
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
  // === Length Validation ===
  min_length: { type: "number", label: "Min Length", section: "validation", min: 0, description: "Minimum number of characters required" },
  max_length: { type: "number", label: "Max Length", section: "validation", min: 1, description: "Maximum number of characters allowed" },
  // === Size/Dimensions ===
  rows: { type: "number", label: "Rows", section: "general", min: 1, max: 50, description: "Number of visible text lines for textarea" },
  cols: { type: "number", label: "Columns", section: "general", min: 1, max: 100, description: "Width of textarea in average character widths" },
  width: { type: "text", label: "Width", section: "style", placeholder: "e.g., 100%, 300px", description: "Custom width for the element" },
  height: { type: "text", label: "Height", section: "style", placeholder: "e.g., 200px", description: "Custom height for the element" },
  // === CSS Class ===
  css_class: { type: "text", label: "CSS Class", section: "style", placeholder: "Add CSS class", description: "Custom CSS class for styling" },
  // === Textarea Specific ===
  resize: {
    type: "select",
    label: "Resize Handle",
    section: "general",
    description: "Allow users to resize the textarea",
    options: [
      { value: "vertical", label: "Vertical Only" },
      { value: "horizontal", label: "Horizontal Only" },
      { value: "both", label: "Both Directions" },
      { value: "none", label: "None" }
    ]
  },
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
    "rows",
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
    "option_groups",
    "label_placement"
    // In Style Options panel
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
  const optionsBySection = reactExports.useMemo(() => {
    const sections = {};
    const optionDefinitions = getOptionDefinitions(field.type);
    applicableKeys.forEach((key) => {
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
function FieldTemplate({ field: f }) {
  const pad = (v, d) => (v ?? d) + "px";
  const pt = pad(f.padding_top, 10), pr = pad(f.padding_right, 14), pb = pad(f.padding_bottom, 10), pl = pad(f.padding_left, 14);
  const mt = pad(f.margin_top, 0), mr = pad(f.margin_right, 0), mb = pad(f.margin_bottom, 0), ml = pad(f.margin_left, 0);
  const inputStyle = {
    background: f.bg_color || "#fafbfc",
    color: f.text_color || "#94a3b8",
    borderColor: f.border_color || "#e2e8f0",
    borderRadius: (f.border_radius ?? 8) + "px",
    padding: `${pt} ${pr} ${pb} ${pl}`,
    margin: `${mt} ${mr} ${mb} ${ml}`
  };
  const fieldWidthVal = f.field_width === "custom" && f.field_width_custom ? f.field_width_custom + "px" : f.field_width;
  const wrapperStyle = {
    ...fieldWidthVal && fieldWidthVal !== "100%" ? { maxWidth: fieldWidthVal } : {}
  };
  const hasWrapper = Object.keys(wrapperStyle).length > 0;
  const wrapper = hasWrapper ? wrapperStyle : void 0;
  const labelPlacement = f.label_placement || "top";
  const labelWidthVal = f.label_width === "custom" && f.label_width_custom ? f.label_width_custom + "px" : f.label_width;
  const labelStyle = labelPlacement === "left" || labelPlacement === "right" ? { flex: "0 0 auto", width: labelWidthVal && labelWidthVal !== "auto" && labelWidthVal !== "100%" ? labelWidthVal : void 0, whiteSpace: "nowrap", marginBottom: 0 } : labelPlacement === "hidden" ? { display: "none" } : {};
  const label = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-form-field-label", style: labelStyle, children: [
    f.admin_label || f.label || /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#94a3b8", fontStyle: "italic" }, children: [
      f.type,
      " ",
      __("field", "formglut")
    ] }),
    f.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "required", children: "*" }),
    f.help_text && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-help-tip", title: f.help_text, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "10", cy: "10", r: "9", stroke: "currentColor", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 9v5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "10", cy: "6.5", r: "0.75", fill: "currentColor" })
    ] }) })
  ] });
  function renderInput() {
    if (f.type === "textarea") {
      const charLimit2 = f.character_limit ? Number(f.character_limit) : 0;
      const maxLength2 = charLimit2 > 0 ? charLimit2 : void 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-input-group", children: [
        f.prefix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-prefix", dangerouslySetInnerHTML: { __html: f.prefix_label } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "fg-form-field-input", rows: f.rows || 4, placeholder: f.placeholder, defaultValue: f.default_value, maxLength: maxLength2, readOnly: true, style: { resize: "vertical", ...inputStyle } }, `textarea-${f.id}-${f.default_value || ""}-${f.character_limit || ""}`),
        f.suffix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-suffix", dangerouslySetInnerHTML: { __html: f.suffix_label } })
      ] });
    }
    if (f.type === "select") {
      const firstOptionDisabled = f.disable_first_option !== false;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "fg-form-field-input", defaultValue: f.default_value, disabled: true, style: inputStyle, children: [
        f.placeholder && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: firstOptionDisabled, children: f.placeholder }),
        (f.options || []).map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value || opt.label, disabled: firstOptionDisabled && i === 0, children: opt.label || `Option ${i + 1}` }, i))
      ] }, `select-${f.id}-${f.default_value || ""}`);
    }
    if (f.type === "radio") {
      const isInline = f.inline;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: isInline ? "flex" : "block", gap: isInline ? "16px" : "8px" }, children: (f.options || []).map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: f.id, disabled: true, style: { margin: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.label || `Option ${i + 1}` })
      ] }, i)) });
    }
    if (f.type === "checkbox") {
      const isInline = f.inline;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: isInline ? "flex" : "block", gap: isInline ? "16px" : "8px" }, children: (f.options || []).map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", disabled: true, style: { margin: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.label || `Option ${i + 1}` })
      ] }, i)) });
    }
    if (typeof window.formglutProRenderPreview === "function") {
      const proPreview = window.formglutProRenderPreview(f, inputStyle);
      if (proPreview) return proPreview;
    }
    const typeAttr = f.type === "number" ? "number" : f.type === "email" ? "email" : "text";
    const charLimit = f.character_limit ? Number(f.character_limit) : 0;
    const maxLength = charLimit > 0 ? charLimit : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-input-group", children: [
      f.prefix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-prefix", dangerouslySetInnerHTML: { __html: f.prefix_label } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "fg-form-field-input", type: typeAttr, placeholder: f.placeholder, defaultValue: f.default_value, maxLength, readOnly: true, style: inputStyle }, `input-${f.id}-${f.default_value || ""}-${f.character_limit || ""}`),
      f.suffix_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-input-suffix", dangerouslySetInnerHTML: { __html: f.suffix_label } })
    ] });
  }
  if (labelPlacement === "left" || labelPlacement === "right") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, ...wrapper }, children: [
      labelPlacement === "left" ? label : null,
      renderInput(),
      labelPlacement === "right" ? label : null
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: wrapper, children: [
    label,
    renderInput()
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
  function handleProFieldClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (proEnabled) {
      const fieldType = e.currentTarget.dataset.fieldType;
      if (fieldType && addFieldFn) {
        addFieldFn(fieldType);
      }
    } else {
      staticMethods.info(__("This field is available in Pro version.", "formglut"));
    }
  }
  const groupedFields = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const groups = {};
    Object.entries(FIELD_TYPES).forEach(([key, cfg]) => {
      if (query && !cfg.label.toLowerCase().includes(query)) {
        return;
      }
      const category = cfg.category || "general";
      if (!groups[category]) {
        groups[category] = [];
      }
      const isPro = cfg.pro || false;
      const isProEnabledAndActive = isPro && proEnabled;
      groups[category].push({
        key,
        label: cfg.label,
        icon: cfg.icon,
        pro: isPro,
        enabled: !isPro || isProEnabledAndActive
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
              className: "fg-field-btn" + (ft.pro && !ft.enabled ? " fg-field-pro" : ""),
              draggable: ft.enabled,
              "data-field-type": ft.key,
              onDragStart: ft.enabled ? (e) => handleDragStart(e, ft.key) : void 0,
              onClick: ft.enabled ? () => addFieldFn(ft.key) : handleProFieldClick,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-field-btn-icon", children: ft.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-field-btn-label", children: ft.label }),
                ft.pro && !ft.enabled && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fg-pro-badge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCrown }) })
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fg-undo-hint", children: [
            fields.length,
            " ",
            fields.length !== 1 ? __("fields", "formglut") : __("field", "formglut"),
            isDirty ? " — " + __("unsaved", "formglut") : ""
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
