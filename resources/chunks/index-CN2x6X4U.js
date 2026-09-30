import { n as PresetColors, m as Keyframe, co as initMotion, A as AggregationColor, cI as reactExports, a4 as classNames, U as _objectWithoutProperties, d9 as useId, Q as _objectSpread2, y as Trigger, M as _extends, c_ as unit, bV as genStyleHooks, cy as merge, cL as resetComponent, a0 as _toConsumableArray, e as ConfigContext, di as useToken, d6 as useComponentConfig, de as useMergedState, g as ContextIsolator, cq as isFragment, dk as useZIndex, ci as getTransitionName, a7 as cloneElement, dp as zIndexContext, ah as devUseWarning } from "./api-CWyUJK1g.js";
function genPresetColor(token, genCss) {
  return PresetColors.reduce((prev, colorKey) => {
    const lightColor = token[`${colorKey}1`];
    const lightBorderColor = token[`${colorKey}3`];
    const darkColor = token[`${colorKey}6`];
    const textColor = token[`${colorKey}7`];
    return Object.assign(Object.assign({}, prev), genCss(colorKey, {
      lightColor,
      lightBorderColor,
      darkColor,
      textColor
    }));
  }, {});
}
const zoomIn = new Keyframe("antZoomIn", {
  "0%": {
    transform: "scale(0.2)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomOut = new Keyframe("antZoomOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.2)",
    opacity: 0
  }
});
const zoomBigIn = new Keyframe("antZoomBigIn", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomBigOut = new Keyframe("antZoomBigOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.8)",
    opacity: 0
  }
});
const zoomUpIn = new Keyframe("antZoomUpIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  }
});
const zoomUpOut = new Keyframe("antZoomUpOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  }
});
const zoomLeftIn = new Keyframe("antZoomLeftIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  }
});
const zoomLeftOut = new Keyframe("antZoomLeftOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  }
});
const zoomRightIn = new Keyframe("antZoomRightIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  }
});
const zoomRightOut = new Keyframe("antZoomRightOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  }
});
const zoomDownIn = new Keyframe("antZoomDownIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  }
});
const zoomDownOut = new Keyframe("antZoomDownOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  }
});
const zoomMotion = {
  zoom: {
    inKeyframes: zoomIn,
    outKeyframes: zoomOut
  },
  "zoom-big": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-big-fast": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-left": {
    inKeyframes: zoomLeftIn,
    outKeyframes: zoomLeftOut
  },
  "zoom-right": {
    inKeyframes: zoomRightIn,
    outKeyframes: zoomRightOut
  },
  "zoom-up": {
    inKeyframes: zoomUpIn,
    outKeyframes: zoomUpOut
  },
  "zoom-down": {
    inKeyframes: zoomDownIn,
    outKeyframes: zoomDownOut
  }
};
const initZoomMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = zoomMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token.motionDurationFast : token.motionDurationMid), {
    [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
      transform: "scale(0)",
      opacity: 0,
      animationTimingFunction: token.motionEaseOutCirc,
      "&-prepare": {
        transform: "none"
      }
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInOutCirc
    }
  }];
};
const generateColor = (color) => {
  if (color instanceof AggregationColor) {
    return color;
  }
  return new AggregationColor(color);
};
function Popup(props) {
  var children = props.children, prefixCls = props.prefixCls, id = props.id, innerStyle = props.overlayInnerStyle, bodyClassName = props.bodyClassName, className = props.className, style = props.style;
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-content"), className),
    style
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-inner"), bodyClassName),
    id,
    role: "tooltip",
    style: innerStyle
  }, typeof children === "function" ? children() : children));
}
var autoAdjustOverflowTopBottom = {
  shiftX: 64,
  adjustY: 1
};
var autoAdjustOverflowLeftRight = {
  adjustX: 1,
  shiftY: true
};
var targetOffset = [0, 0];
var placements = {
  left: {
    points: ["cr", "cl"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [-4, 0],
    targetOffset
  },
  right: {
    points: ["cl", "cr"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [4, 0],
    targetOffset
  },
  top: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, -4],
    targetOffset
  },
  bottom: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, 4],
    targetOffset
  },
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, -4],
    targetOffset
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [-4, 0],
    targetOffset
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, -4],
    targetOffset
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [4, 0],
    targetOffset
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, 4],
    targetOffset
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [4, 0],
    targetOffset
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, 4],
    targetOffset
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [-4, 0],
    targetOffset
  }
};
var _excluded = ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "children", "onVisibleChange", "afterVisibleChange", "transitionName", "animation", "motion", "placement", "align", "destroyTooltipOnHide", "defaultVisible", "getTooltipContainer", "overlayInnerStyle", "arrowContent", "overlay", "id", "showArrow", "classNames", "styles"];
var Tooltip$1 = function Tooltip(props, ref) {
  var overlayClassName = props.overlayClassName, _props$trigger = props.trigger, trigger = _props$trigger === void 0 ? ["hover"] : _props$trigger, _props$mouseEnterDela = props.mouseEnterDelay, mouseEnterDelay = _props$mouseEnterDela === void 0 ? 0 : _props$mouseEnterDela, _props$mouseLeaveDela = props.mouseLeaveDelay, mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? 0.1 : _props$mouseLeaveDela, overlayStyle = props.overlayStyle, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-tooltip" : _props$prefixCls, children = props.children, onVisibleChange = props.onVisibleChange, afterVisibleChange = props.afterVisibleChange, transitionName = props.transitionName, animation = props.animation, motion = props.motion, _props$placement = props.placement, placement = _props$placement === void 0 ? "right" : _props$placement, _props$align = props.align, align = _props$align === void 0 ? {} : _props$align, _props$destroyTooltip = props.destroyTooltipOnHide, destroyTooltipOnHide = _props$destroyTooltip === void 0 ? false : _props$destroyTooltip, defaultVisible = props.defaultVisible, getTooltipContainer = props.getTooltipContainer, overlayInnerStyle = props.overlayInnerStyle;
  props.arrowContent;
  var overlay = props.overlay, id = props.id, _props$showArrow = props.showArrow, showArrow = _props$showArrow === void 0 ? true : _props$showArrow, tooltipClassNames = props.classNames, tooltipStyles = props.styles, restProps = _objectWithoutProperties(props, _excluded);
  var mergedId = useId(id);
  var triggerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, function() {
    return triggerRef.current;
  });
  var extraProps = _objectSpread2({}, restProps);
  if ("visible" in props) {
    extraProps.popupVisible = props.visible;
  }
  var getPopupElement = function getPopupElement2() {
    return /* @__PURE__ */ reactExports.createElement(Popup, {
      key: "content",
      prefixCls,
      id: mergedId,
      bodyClassName: tooltipClassNames === null || tooltipClassNames === void 0 ? void 0 : tooltipClassNames.body,
      overlayInnerStyle: _objectSpread2(_objectSpread2({}, overlayInnerStyle), tooltipStyles === null || tooltipStyles === void 0 ? void 0 : tooltipStyles.body)
    }, overlay);
  };
  var getChildren = function getChildren2() {
    var child = reactExports.Children.only(children);
    var originalProps = (child === null || child === void 0 ? void 0 : child.props) || {};
    var childProps = _objectSpread2(_objectSpread2({}, originalProps), {}, {
      "aria-describedby": overlay ? mergedId : null
    });
    return /* @__PURE__ */ reactExports.cloneElement(children, childProps);
  };
  return /* @__PURE__ */ reactExports.createElement(Trigger, _extends({
    popupClassName: classNames(overlayClassName, tooltipClassNames === null || tooltipClassNames === void 0 ? void 0 : tooltipClassNames.root),
    prefixCls,
    popup: getPopupElement,
    action: trigger,
    builtinPlacements: placements,
    popupPlacement: placement,
    ref: triggerRef,
    popupAlign: align,
    getPopupContainer: getTooltipContainer,
    onPopupVisibleChange: onVisibleChange,
    afterPopupVisibleChange: afterVisibleChange,
    popupTransitionName: transitionName,
    popupAnimation: animation,
    popupMotion: motion,
    defaultPopupVisible: defaultVisible,
    autoDestroy: destroyTooltipOnHide,
    mouseLeaveDelay,
    popupStyle: _objectSpread2(_objectSpread2({}, overlayStyle), tooltipStyles === null || tooltipStyles === void 0 ? void 0 : tooltipStyles.root),
    mouseEnterDelay,
    arrow: showArrow
  }, extraProps), getChildren());
};
const Tooltip$2 = /* @__PURE__ */ reactExports.forwardRef(Tooltip$1);
function getArrowToken(token) {
  const {
    sizePopupArrow,
    borderRadiusXS,
    borderRadiusOuter
  } = token;
  const unitWidth = sizePopupArrow / 2;
  const ax = 0;
  const ay = unitWidth;
  const bx = borderRadiusOuter * 1 / Math.sqrt(2);
  const by = unitWidth - borderRadiusOuter * (1 - 1 / Math.sqrt(2));
  const cx = unitWidth - borderRadiusXS * (1 / Math.sqrt(2));
  const cy = borderRadiusOuter * (Math.sqrt(2) - 1) + borderRadiusXS * (1 / Math.sqrt(2));
  const dx = 2 * unitWidth - cx;
  const dy = cy;
  const ex = 2 * unitWidth - bx;
  const ey = by;
  const fx = 2 * unitWidth - ax;
  const fy = ay;
  const shadowWidth = unitWidth * Math.sqrt(2) + borderRadiusOuter * (Math.sqrt(2) - 2);
  const polygonOffset = borderRadiusOuter * (Math.sqrt(2) - 1);
  const arrowPolygon = `polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${2 * unitWidth - polygonOffset}px 100%, ${polygonOffset}px 100%)`;
  const arrowPath = `path('M ${ax} ${ay} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${borderRadiusXS} ${borderRadiusXS} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${fx} ${fy} Z')`;
  return {
    arrowShadowWidth: shadowWidth,
    arrowPath,
    arrowPolygon
  };
}
const genRoundedArrow = (token, bgColor, boxShadow) => {
  const {
    sizePopupArrow,
    arrowPolygon,
    arrowPath,
    arrowShadowWidth,
    borderRadiusXS,
    calc
  } = token;
  return {
    pointerEvents: "none",
    width: sizePopupArrow,
    height: sizePopupArrow,
    overflow: "hidden",
    "&::before": {
      position: "absolute",
      bottom: 0,
      insetInlineStart: 0,
      width: sizePopupArrow,
      height: calc(sizePopupArrow).div(2).equal(),
      background: bgColor,
      clipPath: {
        _multi_value_: true,
        value: [arrowPolygon, arrowPath]
      },
      content: '""'
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: arrowShadowWidth,
      height: arrowShadowWidth,
      bottom: 0,
      insetInline: 0,
      margin: "auto",
      borderRadius: {
        _skip_check_: true,
        value: `0 0 ${unit(borderRadiusXS)} 0`
      },
      transform: "translateY(50%) rotate(-135deg)",
      boxShadow,
      zIndex: 0,
      background: "transparent"
    }
  };
};
const MAX_VERTICAL_CONTENT_RADIUS = 8;
function getArrowOffsetToken(options) {
  const {
    contentRadius,
    limitVerticalRadius
  } = options;
  const arrowOffset = contentRadius > 12 ? contentRadius + 2 : 12;
  const arrowOffsetVertical = limitVerticalRadius ? MAX_VERTICAL_CONTENT_RADIUS : arrowOffset;
  return {
    arrowOffsetHorizontal: arrowOffset,
    arrowOffsetVertical
  };
}
function isInject(valid, code) {
  if (!valid) {
    return {};
  }
  return code;
}
function getArrowStyle(token, colorBg, options) {
  const {
    componentCls,
    boxShadowPopoverArrow,
    arrowOffsetVertical,
    arrowOffsetHorizontal
  } = token;
  const {
    arrowDistance = 0,
    arrowPlacement = {
      left: true,
      right: true,
      top: true,
      bottom: true
    }
  } = options || {};
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: [Object.assign(Object.assign({
        position: "absolute",
        zIndex: 1,
        display: "block"
      }, genRoundedArrow(token, colorBg, boxShadowPopoverArrow)), {
        "&:before": {
          background: colorBg
        }
      })]
    }, isInject(!!arrowPlacement.top, {
      [[`&-placement-top > ${componentCls}-arrow`, `&-placement-topLeft > ${componentCls}-arrow`, `&-placement-topRight > ${componentCls}-arrow`].join(",")]: {
        bottom: arrowDistance,
        transform: "translateY(100%) rotate(180deg)"
      },
      [`&-placement-top > ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateX(-50%) translateY(100%) rotate(180deg)"
      },
      "&-placement-topLeft": {
        "--arrow-offset-horizontal": arrowOffsetHorizontal,
        [`> ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: arrowOffsetHorizontal
          }
        }
      },
      "&-placement-topRight": {
        "--arrow-offset-horizontal": `calc(100% - ${unit(arrowOffsetHorizontal)})`,
        [`> ${componentCls}-arrow`]: {
          right: {
            _skip_check_: true,
            value: arrowOffsetHorizontal
          }
        }
      }
    })), isInject(!!arrowPlacement.bottom, {
      [[`&-placement-bottom > ${componentCls}-arrow`, `&-placement-bottomLeft > ${componentCls}-arrow`, `&-placement-bottomRight > ${componentCls}-arrow`].join(",")]: {
        top: arrowDistance,
        transform: `translateY(-100%)`
      },
      [`&-placement-bottom > ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: `translateX(-50%) translateY(-100%)`
      },
      "&-placement-bottomLeft": {
        "--arrow-offset-horizontal": arrowOffsetHorizontal,
        [`> ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: arrowOffsetHorizontal
          }
        }
      },
      "&-placement-bottomRight": {
        "--arrow-offset-horizontal": `calc(100% - ${unit(arrowOffsetHorizontal)})`,
        [`> ${componentCls}-arrow`]: {
          right: {
            _skip_check_: true,
            value: arrowOffsetHorizontal
          }
        }
      }
    })), isInject(!!arrowPlacement.left, {
      [[`&-placement-left > ${componentCls}-arrow`, `&-placement-leftTop > ${componentCls}-arrow`, `&-placement-leftBottom > ${componentCls}-arrow`].join(",")]: {
        right: {
          _skip_check_: true,
          value: arrowDistance
        },
        transform: "translateX(100%) rotate(90deg)"
      },
      [`&-placement-left > ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(100%) rotate(90deg)"
      },
      [`&-placement-leftTop > ${componentCls}-arrow`]: {
        top: arrowOffsetVertical
      },
      [`&-placement-leftBottom > ${componentCls}-arrow`]: {
        bottom: arrowOffsetVertical
      }
    })), isInject(!!arrowPlacement.right, {
      [[`&-placement-right > ${componentCls}-arrow`, `&-placement-rightTop > ${componentCls}-arrow`, `&-placement-rightBottom > ${componentCls}-arrow`].join(",")]: {
        left: {
          _skip_check_: true,
          value: arrowDistance
        },
        transform: "translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-right > ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-rightTop > ${componentCls}-arrow`]: {
        top: arrowOffsetVertical
      },
      [`&-placement-rightBottom > ${componentCls}-arrow`]: {
        bottom: arrowOffsetVertical
      }
    }))
  };
}
function getOverflowOptions(placement, arrowOffset, arrowWidth, autoAdjustOverflow) {
  if (autoAdjustOverflow === false) {
    return {
      adjustX: false,
      adjustY: false
    };
  }
  const overflow = autoAdjustOverflow && typeof autoAdjustOverflow === "object" ? autoAdjustOverflow : {};
  const baseOverflow = {};
  switch (placement) {
    case "top":
    case "bottom":
      baseOverflow.shiftX = arrowOffset.arrowOffsetHorizontal * 2 + arrowWidth;
      baseOverflow.shiftY = true;
      baseOverflow.adjustY = true;
      break;
    case "left":
    case "right":
      baseOverflow.shiftY = arrowOffset.arrowOffsetVertical * 2 + arrowWidth;
      baseOverflow.shiftX = true;
      baseOverflow.adjustX = true;
      break;
  }
  const mergedOverflow = Object.assign(Object.assign({}, baseOverflow), overflow);
  if (!mergedOverflow.shiftX) {
    mergedOverflow.adjustX = true;
  }
  if (!mergedOverflow.shiftY) {
    mergedOverflow.adjustY = true;
  }
  return mergedOverflow;
}
const PlacementAlignMap = {
  left: {
    points: ["cr", "cl"]
  },
  right: {
    points: ["cl", "cr"]
  },
  top: {
    points: ["bc", "tc"]
  },
  bottom: {
    points: ["tc", "bc"]
  },
  topLeft: {
    points: ["bl", "tl"]
  },
  leftTop: {
    points: ["tr", "tl"]
  },
  topRight: {
    points: ["br", "tr"]
  },
  rightTop: {
    points: ["tl", "tr"]
  },
  bottomRight: {
    points: ["tr", "br"]
  },
  rightBottom: {
    points: ["bl", "br"]
  },
  bottomLeft: {
    points: ["tl", "bl"]
  },
  leftBottom: {
    points: ["br", "bl"]
  }
};
const ArrowCenterPlacementAlignMap = {
  topLeft: {
    points: ["bl", "tc"]
  },
  leftTop: {
    points: ["tr", "cl"]
  },
  topRight: {
    points: ["br", "tc"]
  },
  rightTop: {
    points: ["tl", "cr"]
  },
  bottomRight: {
    points: ["tr", "bc"]
  },
  rightBottom: {
    points: ["bl", "cr"]
  },
  bottomLeft: {
    points: ["tl", "bc"]
  },
  leftBottom: {
    points: ["br", "cl"]
  }
};
const DisableAutoArrowList = /* @__PURE__ */ new Set(["topLeft", "topRight", "bottomLeft", "bottomRight", "leftTop", "leftBottom", "rightTop", "rightBottom"]);
function getPlacements(config) {
  const {
    arrowWidth,
    autoAdjustOverflow,
    arrowPointAtCenter,
    offset,
    borderRadius,
    visibleFirst
  } = config;
  const halfArrowWidth = arrowWidth / 2;
  const placementMap = {};
  const arrowOffset = getArrowOffsetToken({
    contentRadius: borderRadius,
    limitVerticalRadius: true
  });
  Object.keys(PlacementAlignMap).forEach((key) => {
    const template = arrowPointAtCenter && ArrowCenterPlacementAlignMap[key] || PlacementAlignMap[key];
    const placementInfo = Object.assign(Object.assign({}, template), {
      offset: [0, 0],
      dynamicInset: true
    });
    placementMap[key] = placementInfo;
    if (DisableAutoArrowList.has(key)) {
      placementInfo.autoArrow = false;
    }
    switch (key) {
      case "top":
      case "topLeft":
      case "topRight":
        placementInfo.offset[1] = -halfArrowWidth - offset;
        break;
      case "bottom":
      case "bottomLeft":
      case "bottomRight":
        placementInfo.offset[1] = halfArrowWidth + offset;
        break;
      case "left":
      case "leftTop":
      case "leftBottom":
        placementInfo.offset[0] = -halfArrowWidth - offset;
        break;
      case "right":
      case "rightTop":
      case "rightBottom":
        placementInfo.offset[0] = halfArrowWidth + offset;
        break;
    }
    if (arrowPointAtCenter) {
      switch (key) {
        case "topLeft":
        case "bottomLeft":
          placementInfo.offset[0] = -arrowOffset.arrowOffsetHorizontal - halfArrowWidth;
          break;
        case "topRight":
        case "bottomRight":
          placementInfo.offset[0] = arrowOffset.arrowOffsetHorizontal + halfArrowWidth;
          break;
        case "leftTop":
        case "rightTop":
          placementInfo.offset[1] = -arrowOffset.arrowOffsetHorizontal * 2 + halfArrowWidth;
          break;
        case "leftBottom":
        case "rightBottom":
          placementInfo.offset[1] = arrowOffset.arrowOffsetHorizontal * 2 - halfArrowWidth;
          break;
      }
    }
    placementInfo.overflow = getOverflowOptions(key, arrowOffset, arrowWidth, autoAdjustOverflow);
    if (visibleFirst) {
      placementInfo.htmlRegion = "visibleFirst";
    }
  });
  return placementMap;
}
const genTooltipStyle = (token) => {
  const {
    calc,
    componentCls,
    // ant-tooltip
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipBorderRadius,
    zIndexPopup,
    controlHeight,
    boxShadowSecondary,
    paddingSM,
    paddingXS,
    arrowOffsetHorizontal,
    sizePopupArrow
  } = token;
  const edgeAlignMinWidth = calc(tooltipBorderRadius).add(sizePopupArrow).add(arrowOffsetHorizontal).equal();
  const centerAlignMinWidth = calc(tooltipBorderRadius).mul(2).add(sizePopupArrow).equal();
  return [
    {
      [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
        position: "absolute",
        zIndex: zIndexPopup,
        display: "block",
        width: "max-content",
        maxWidth: tooltipMaxWidth,
        visibility: "visible",
        // When use `autoArrow`, origin will follow the arrow position
        "--valid-offset-x": "var(--arrow-offset-horizontal, var(--arrow-x))",
        transformOrigin: [`var(--valid-offset-x, 50%)`, `var(--arrow-y, 50%)`].join(" "),
        "&-hidden": {
          display: "none"
        },
        "--antd-arrow-background-color": tooltipBg,
        // Wrapper for the tooltip content
        [`${componentCls}-inner`]: {
          minWidth: centerAlignMinWidth,
          minHeight: controlHeight,
          padding: `${unit(token.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,
          color: `var(--ant-tooltip-color, ${tooltipColor})`,
          textAlign: "start",
          textDecoration: "none",
          wordWrap: "break-word",
          backgroundColor: tooltipBg,
          borderRadius: tooltipBorderRadius,
          boxShadow: boxShadowSecondary,
          boxSizing: "border-box"
        },
        // Align placement should have another min width
        [[`&-placement-topLeft`, `&-placement-topRight`, `&-placement-bottomLeft`, `&-placement-bottomRight`].join(",")]: {
          minWidth: edgeAlignMinWidth
        },
        // Limit left and right placement radius
        [[`&-placement-left`, `&-placement-leftTop`, `&-placement-leftBottom`, `&-placement-right`, `&-placement-rightTop`, `&-placement-rightBottom`].join(",")]: {
          [`${componentCls}-inner`]: {
            borderRadius: token.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS)
          }
        },
        [`${componentCls}-content`]: {
          position: "relative"
        }
      }), genPresetColor(token, (colorKey, {
        darkColor
      }) => ({
        [`&${componentCls}-${colorKey}`]: {
          [`${componentCls}-inner`]: {
            backgroundColor: darkColor
          },
          [`${componentCls}-arrow`]: {
            "--antd-arrow-background-color": darkColor
          }
        }
      }))), {
        // RTL
        "&-rtl": {
          direction: "rtl"
        }
      })
    },
    // Arrow Style
    getArrowStyle(token, "var(--antd-arrow-background-color)"),
    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: "relative",
        maxWidth: "none",
        margin: token.sizePopupArrow
      }
    }
  ];
};
const prepareComponentToken = (token) => Object.assign(Object.assign({
  zIndexPopup: token.zIndexPopupBase + 70
}, getArrowOffsetToken({
  contentRadius: token.borderRadius,
  limitVerticalRadius: true
})), getArrowToken(merge(token, {
  borderRadiusOuter: Math.min(token.borderRadiusOuter, 4)
})));
const useStyle = (prefixCls, injectStyle = true) => {
  const useStyle2 = genStyleHooks("Tooltip", (token) => {
    const {
      borderRadius,
      colorTextLightSolid,
      colorBgSpotlight
    } = token;
    const TooltipToken = merge(token, {
      // default variables
      tooltipMaxWidth: 250,
      tooltipColor: colorTextLightSolid,
      tooltipBorderRadius: borderRadius,
      tooltipBg: colorBgSpotlight
    });
    return [genTooltipStyle(TooltipToken), initZoomMotion(token, "zoom-big-fast")];
  }, prepareComponentToken, {
    resetStyle: false,
    // Popover use Tooltip as internal component. We do not need to handle this.
    injectStyle
  });
  return useStyle2(prefixCls);
};
const inverseColors = PresetColors.map((color) => `${color}-inverse`);
const PresetStatusColorTypes = ["success", "processing", "error", "default", "warning"];
function isPresetColor(color, includeInverse = true) {
  if (includeInverse) {
    return [].concat(_toConsumableArray(inverseColors), _toConsumableArray(PresetColors)).includes(color);
  }
  return PresetColors.includes(color);
}
function isPresetStatusColor(color) {
  return PresetStatusColorTypes.includes(color);
}
function parseColor(prefixCls, color) {
  const isInternalColor = isPresetColor(color);
  const className = classNames({
    [`${prefixCls}-${color}`]: color && isInternalColor
  });
  const overlayStyle = {};
  const arrowStyle = {};
  const rgb = generateColor(color).toRgb();
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  const textColor = luminance < 0.5 ? "#FFF" : "#000";
  if (color && !isInternalColor) {
    overlayStyle.background = color;
    overlayStyle["--ant-tooltip-color"] = textColor;
    arrowStyle["--antd-arrow-background-color"] = color;
  }
  return {
    className,
    overlayStyle,
    arrowStyle
  };
}
const PurePanel = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    placement = "top",
    title,
    color,
    overlayInnerStyle
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const colorInfo = parseColor(prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;
  const formattedOverlayInnerStyle = Object.assign(Object.assign({}, overlayInnerStyle), colorInfo.overlayStyle);
  const cls = classNames(hashId, cssVarCls, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className, colorInfo.className);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className: cls,
    style: arrowContentStyle
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-arrow`
  }), /* @__PURE__ */ reactExports.createElement(Popup, Object.assign({}, props, {
    className: hashId,
    prefixCls,
    overlayInnerStyle: formattedOverlayInnerStyle
  }), title)));
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalTooltip = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getTooltipContainer,
    color,
    overlayInnerStyle,
    children,
    afterOpenChange,
    afterVisibleChange,
    destroyTooltipOnHide,
    destroyOnHidden,
    arrow = true,
    title,
    overlay,
    builtinPlacements,
    arrowPointAtCenter = false,
    autoAdjustOverflow = true,
    motion: _motion,
    getPopupContainer,
    placement = "top",
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    overlayStyle,
    rootClassName,
    overlayClassName,
    styles,
    classNames: tooltipClassNames
  } = props, restProps = __rest(props, ["prefixCls", "openClassName", "getTooltipContainer", "color", "overlayInnerStyle", "children", "afterOpenChange", "afterVisibleChange", "destroyTooltipOnHide", "destroyOnHidden", "arrow", "title", "overlay", "builtinPlacements", "arrowPointAtCenter", "autoAdjustOverflow", "motion", "getPopupContainer", "placement", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "rootClassName", "overlayClassName", "styles", "classNames"]);
  const mergedShowArrow = !!arrow;
  const [, token] = useToken();
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("tooltip");
  const warning = devUseWarning();
  const tooltipRef = reactExports.useRef(null);
  const forceAlign = () => {
    var _a2;
    (_a2 = tooltipRef.current) === null || _a2 === void 0 ? void 0 : _a2.forceAlign();
  };
  reactExports.useImperativeHandle(ref, () => {
    var _a2, _b2;
    return {
      forceAlign,
      forcePopupAlign: () => {
        warning.deprecated(false, "forcePopupAlign", "forceAlign");
        forceAlign();
      },
      nativeElement: (_a2 = tooltipRef.current) === null || _a2 === void 0 ? void 0 : _a2.nativeElement,
      popupElement: (_b2 = tooltipRef.current) === null || _b2 === void 0 ? void 0 : _b2.popupElement
    };
  });
  const [open, setOpen] = useMergedState(false, {
    value: (_a = props.open) !== null && _a !== void 0 ? _a : props.visible,
    defaultValue: (_b = props.defaultOpen) !== null && _b !== void 0 ? _b : props.defaultVisible
  });
  const noTitle = !title && !overlay && title !== 0;
  const onOpenChange = (vis) => {
    var _a2, _b2;
    setOpen(noTitle ? false : vis);
    if (!noTitle) {
      (_a2 = props.onOpenChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, vis);
      (_b2 = props.onVisibleChange) === null || _b2 === void 0 ? void 0 : _b2.call(props, vis);
    }
  };
  const tooltipPlacements = reactExports.useMemo(() => {
    var _a2, _b2;
    let mergedArrowPointAtCenter = arrowPointAtCenter;
    if (typeof arrow === "object") {
      mergedArrowPointAtCenter = (_b2 = (_a2 = arrow.pointAtCenter) !== null && _a2 !== void 0 ? _a2 : arrow.arrowPointAtCenter) !== null && _b2 !== void 0 ? _b2 : arrowPointAtCenter;
    }
    return builtinPlacements || getPlacements({
      arrowPointAtCenter: mergedArrowPointAtCenter,
      autoAdjustOverflow,
      arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
      borderRadius: token.borderRadius,
      offset: token.marginXXS,
      visibleFirst: true
    });
  }, [arrowPointAtCenter, arrow, builtinPlacements, token]);
  const memoOverlay = reactExports.useMemo(() => {
    if (title === 0) {
      return title;
    }
    return overlay || title || "";
  }, [overlay, title]);
  const memoOverlayWrapper = /* @__PURE__ */ reactExports.createElement(ContextIsolator, {
    space: true
  }, typeof memoOverlay === "function" ? memoOverlay() : memoOverlay);
  const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const injectFromPopover = props["data-popover-inject"];
  let tempOpen = open;
  if (!("open" in props) && !("visible" in props) && noTitle) {
    tempOpen = false;
  }
  const child = /* @__PURE__ */ reactExports.isValidElement(children) && !isFragment(children) ? children : /* @__PURE__ */ reactExports.createElement("span", null, children);
  const childProps = child.props;
  const childCls = !childProps.className || typeof childProps.className === "string" ? classNames(childProps.className, openClassName || `${prefixCls}-open`) : childProps.className;
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, !injectFromPopover);
  const colorInfo = parseColor(prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;
  const rootClassNames = classNames(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, colorInfo.className, rootClassName, hashId, cssVarCls, contextClassName, contextClassNames.root, tooltipClassNames === null || tooltipClassNames === void 0 ? void 0 : tooltipClassNames.root);
  const bodyClassNames = classNames(contextClassNames.body, tooltipClassNames === null || tooltipClassNames === void 0 ? void 0 : tooltipClassNames.body);
  const [zIndex, contextZIndex] = useZIndex("Tooltip", restProps.zIndex);
  const content = /* @__PURE__ */ reactExports.createElement(Tooltip$2, Object.assign({}, restProps, {
    zIndex,
    showArrow: mergedShowArrow,
    placement,
    mouseEnterDelay,
    mouseLeaveDelay,
    prefixCls,
    classNames: {
      root: rootClassNames,
      body: bodyClassNames
    },
    styles: {
      root: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, arrowContentStyle), contextStyles.root), contextStyle), overlayStyle), styles === null || styles === void 0 ? void 0 : styles.root),
      body: Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.body), overlayInnerStyle), styles === null || styles === void 0 ? void 0 : styles.body), colorInfo.overlayStyle)
    },
    getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
    ref: tooltipRef,
    builtinPlacements: tooltipPlacements,
    overlay: memoOverlayWrapper,
    visible: tempOpen,
    onVisibleChange: onOpenChange,
    afterVisibleChange: afterOpenChange !== null && afterOpenChange !== void 0 ? afterOpenChange : afterVisibleChange,
    arrowContent: /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-arrow-content`
    }),
    motion: {
      motionName: getTransitionName(rootPrefixCls, "zoom-big-fast", props.transitionName),
      motionDeadline: 1e3
    },
    // TODO: In the future, destroyTooltipOnHide in rc-tooltip needs to be upgrade to destroyOnHidden
    destroyTooltipOnHide: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : !!destroyTooltipOnHide
  }), tempOpen ? cloneElement(child, {
    className: childCls
  }) : child);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(zIndexContext.Provider, {
    value: contextZIndex
  }, content));
});
const Tooltip2 = InternalTooltip;
Tooltip2._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
export {
  Popup as P,
  Tooltip2 as T,
  genRoundedArrow as a,
  getArrowOffsetToken as b,
  getArrowStyle as c,
  getArrowToken as d,
  getPlacements as e,
  isPresetColor as f,
  genPresetColor as g,
  isPresetStatusColor as h,
  initZoomMotion as i
};
//# sourceMappingURL=index-CN2x6X4U.js.map
