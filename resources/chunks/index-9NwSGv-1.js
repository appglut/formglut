import { c1 as reactExports, co as useSafeState, B as Button, ad as convertLegacyProps, a8 as classNames, bB as genStyleHooks, bY as merge, n as Keyframe, ca as unit, d as ConfigContext, bZ as omit, ce as useComponentConfig, bR as initZoomMotion, c2 as resetComponent, bF as getArrowStyle, r as PresetColors, bG as getArrowToken, bE as getArrowOffsetToken, P as Popup, cn as useMergedState, E as Tooltip, bN as getTransitionName, aa as cloneElement, K as KeyCode, by as genCompactItemStyle, R as React, cd as useCompactItemContext, c9 as toArray, c as Compact, v as RefIcon, cl as useLocale, bX as localeValues } from "./Header-Cwf5epXY.js";
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
const Element = (props) => {
  const {
    prefixCls,
    className,
    style,
    size,
    shape
  } = props;
  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === "large",
    [`${prefixCls}-sm`]: size === "small"
  });
  const shapeCls = classNames({
    [`${prefixCls}-circle`]: shape === "circle",
    [`${prefixCls}-square`]: shape === "square",
    [`${prefixCls}-round`]: shape === "round"
  });
  const sizeStyle = reactExports.useMemo(() => typeof size === "number" ? {
    width: size,
    height: size,
    lineHeight: `${size}px`
  } : {}, [size]);
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(prefixCls, sizeCls, shapeCls, className),
    style: Object.assign(Object.assign({}, sizeStyle), style)
  });
};
const skeletonClsLoading = new Keyframe(`ant-skeleton-loading`, {
  "0%": {
    backgroundPosition: "100% 50%"
  },
  "100%": {
    backgroundPosition: "0 50%"
  }
});
const genSkeletonElementCommonSize = (size) => ({
  height: size,
  lineHeight: unit(size)
});
const genSkeletonElementAvatarSize = (size) => Object.assign({
  width: size
}, genSkeletonElementCommonSize(size));
const genSkeletonColor = (token) => ({
  background: token.skeletonLoadingBackground,
  backgroundSize: "400% 100%",
  animationName: skeletonClsLoading,
  animationDuration: token.skeletonLoadingMotionDuration,
  animationTimingFunction: "ease",
  animationIterationCount: "infinite"
});
const genSkeletonElementInputSize = (size, calc) => Object.assign({
  width: calc(size).mul(5).equal(),
  minWidth: calc(size).mul(5).equal()
}, genSkeletonElementCommonSize(size));
const genSkeletonElementAvatar = (token) => {
  const {
    skeletonAvatarCls,
    gradientFromColor,
    controlHeight,
    controlHeightLG,
    controlHeightSM
  } = token;
  return {
    [skeletonAvatarCls]: Object.assign({
      display: "inline-block",
      verticalAlign: "top",
      background: gradientFromColor
    }, genSkeletonElementAvatarSize(controlHeight)),
    [`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: {
      borderRadius: "50%"
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightLG)),
    [`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightSM))
  };
};
const genSkeletonElementInput = (token) => {
  const {
    controlHeight,
    borderRadiusSM,
    skeletonInputCls,
    controlHeightLG,
    controlHeightSM,
    gradientFromColor,
    calc
  } = token;
  return {
    [skeletonInputCls]: Object.assign({
      display: "inline-block",
      verticalAlign: "top",
      background: gradientFromColor,
      borderRadius: borderRadiusSM
    }, genSkeletonElementInputSize(controlHeight, calc)),
    [`${skeletonInputCls}-lg`]: Object.assign({}, genSkeletonElementInputSize(controlHeightLG, calc)),
    [`${skeletonInputCls}-sm`]: Object.assign({}, genSkeletonElementInputSize(controlHeightSM, calc))
  };
};
const genSkeletonElementImageSize = (size) => Object.assign({
  width: size
}, genSkeletonElementCommonSize(size));
const genSkeletonElementImage = (token) => {
  const {
    skeletonImageCls,
    imageSizeBase,
    gradientFromColor,
    borderRadiusSM,
    calc
  } = token;
  return {
    [skeletonImageCls]: Object.assign(Object.assign({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "middle",
      background: gradientFromColor,
      borderRadius: borderRadiusSM
    }, genSkeletonElementImageSize(calc(imageSizeBase).mul(2).equal())), {
      [`${skeletonImageCls}-path`]: {
        fill: "#bfbfbf"
      },
      [`${skeletonImageCls}-svg`]: Object.assign(Object.assign({}, genSkeletonElementImageSize(imageSizeBase)), {
        maxWidth: calc(imageSizeBase).mul(4).equal(),
        maxHeight: calc(imageSizeBase).mul(4).equal()
      }),
      [`${skeletonImageCls}-svg${skeletonImageCls}-svg-circle`]: {
        borderRadius: "50%"
      }
    }),
    [`${skeletonImageCls}${skeletonImageCls}-circle`]: {
      borderRadius: "50%"
    }
  };
};
const genSkeletonElementButtonShape = (token, size, buttonCls) => {
  const {
    skeletonButtonCls
  } = token;
  return {
    [`${buttonCls}${skeletonButtonCls}-circle`]: {
      width: size,
      minWidth: size,
      borderRadius: "50%"
    },
    [`${buttonCls}${skeletonButtonCls}-round`]: {
      borderRadius: size
    }
  };
};
const genSkeletonElementButtonSize = (size, calc) => Object.assign({
  width: calc(size).mul(2).equal(),
  minWidth: calc(size).mul(2).equal()
}, genSkeletonElementCommonSize(size));
const genSkeletonElementButton = (token) => {
  const {
    borderRadiusSM,
    skeletonButtonCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    gradientFromColor,
    calc
  } = token;
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
    [skeletonButtonCls]: Object.assign({
      display: "inline-block",
      verticalAlign: "top",
      background: gradientFromColor,
      borderRadius: borderRadiusSM,
      width: calc(controlHeight).mul(2).equal(),
      minWidth: calc(controlHeight).mul(2).equal()
    }, genSkeletonElementButtonSize(controlHeight, calc))
  }, genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls)), {
    [`${skeletonButtonCls}-lg`]: Object.assign({}, genSkeletonElementButtonSize(controlHeightLG, calc))
  }), genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`)), {
    [`${skeletonButtonCls}-sm`]: Object.assign({}, genSkeletonElementButtonSize(controlHeightSM, calc))
  }), genSkeletonElementButtonShape(token, controlHeightSM, `${skeletonButtonCls}-sm`));
};
const genBaseStyle$2 = (token) => {
  const {
    componentCls,
    skeletonAvatarCls,
    skeletonTitleCls,
    skeletonParagraphCls,
    skeletonButtonCls,
    skeletonInputCls,
    skeletonImageCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    gradientFromColor,
    padding,
    marginSM,
    borderRadius,
    titleHeight,
    blockRadius,
    paragraphLiHeight,
    controlHeightXS,
    paragraphMarginTop
  } = token;
  return {
    [componentCls]: {
      display: "table",
      width: "100%",
      [`${componentCls}-header`]: {
        display: "table-cell",
        paddingInlineEnd: padding,
        verticalAlign: "top",
        // Avatar
        [skeletonAvatarCls]: Object.assign({
          display: "inline-block",
          verticalAlign: "top",
          background: gradientFromColor
        }, genSkeletonElementAvatarSize(controlHeight)),
        [`${skeletonAvatarCls}-circle`]: {
          borderRadius: "50%"
        },
        [`${skeletonAvatarCls}-lg`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightLG)),
        [`${skeletonAvatarCls}-sm`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightSM))
      },
      [`${componentCls}-content`]: {
        display: "table-cell",
        width: "100%",
        verticalAlign: "top",
        // Title
        [skeletonTitleCls]: {
          width: "100%",
          height: titleHeight,
          background: gradientFromColor,
          borderRadius: blockRadius,
          [`+ ${skeletonParagraphCls}`]: {
            marginBlockStart: controlHeightSM
          }
        },
        // paragraph
        [skeletonParagraphCls]: {
          padding: 0,
          "> li": {
            width: "100%",
            height: paragraphLiHeight,
            listStyle: "none",
            background: gradientFromColor,
            borderRadius: blockRadius,
            "+ li": {
              marginBlockStart: controlHeightXS
            }
          }
        },
        [`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: {
          width: "61%"
        }
      },
      [`&-round ${componentCls}-content`]: {
        [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: {
          borderRadius
        }
      }
    },
    [`${componentCls}-with-avatar ${componentCls}-content`]: {
      // Title
      [skeletonTitleCls]: {
        marginBlockStart: marginSM,
        [`+ ${skeletonParagraphCls}`]: {
          marginBlockStart: paragraphMarginTop
        }
      }
    },
    // Skeleton element
    [`${componentCls}${componentCls}-element`]: Object.assign(Object.assign(Object.assign(Object.assign({
      display: "inline-block",
      width: "auto"
    }, genSkeletonElementButton(token)), genSkeletonElementAvatar(token)), genSkeletonElementInput(token)), genSkeletonElementImage(token)),
    // Skeleton Block Button, Input
    [`${componentCls}${componentCls}-block`]: {
      width: "100%",
      [skeletonButtonCls]: {
        width: "100%"
      },
      [skeletonInputCls]: {
        width: "100%"
      }
    },
    // With active animation
    [`${componentCls}${componentCls}-active`]: {
      [`
        ${skeletonTitleCls},
        ${skeletonParagraphCls} > li,
        ${skeletonAvatarCls},
        ${skeletonButtonCls},
        ${skeletonInputCls},
        ${skeletonImageCls}
      `]: Object.assign({}, genSkeletonColor(token))
    }
  };
};
const prepareComponentToken$2 = (token) => {
  const {
    colorFillContent,
    colorFill
  } = token;
  const gradientFromColor = colorFillContent;
  const gradientToColor = colorFill;
  return {
    color: gradientFromColor,
    colorGradientEnd: gradientToColor,
    gradientFromColor,
    gradientToColor,
    titleHeight: token.controlHeight / 2,
    blockRadius: token.borderRadiusSM,
    paragraphMarginTop: token.marginLG + token.marginXXS,
    paragraphLiHeight: token.controlHeight / 2
  };
};
const useStyle$4 = genStyleHooks("Skeleton", (token) => {
  const {
    componentCls,
    calc
  } = token;
  const skeletonToken = merge(token, {
    skeletonAvatarCls: `${componentCls}-avatar`,
    skeletonTitleCls: `${componentCls}-title`,
    skeletonParagraphCls: `${componentCls}-paragraph`,
    skeletonButtonCls: `${componentCls}-button`,
    skeletonInputCls: `${componentCls}-input`,
    skeletonImageCls: `${componentCls}-image`,
    imageSizeBase: calc(token.controlHeight).mul(1.5).equal(),
    borderRadius: 100,
    // Large number to make capsule shape
    skeletonLoadingBackground: `linear-gradient(90deg, ${token.gradientFromColor} 25%, ${token.gradientToColor} 37%, ${token.gradientFromColor} 63%)`,
    skeletonLoadingMotionDuration: "1.4s"
  });
  return genBaseStyle$2(skeletonToken);
}, prepareComponentToken$2, {
  deprecatedTokens: [["color", "gradientFromColor"], ["colorGradientEnd", "gradientToColor"]]
});
const SkeletonAvatar = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    active,
    shape = "circle",
    size = "default"
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls);
  const otherProps = omit(props, ["prefixCls", "className"]);
  const cls = classNames(prefixCls, `${prefixCls}-element`, {
    [`${prefixCls}-active`]: active
  }, className, rootClassName, hashId, cssVarCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className: cls
  }, /* @__PURE__ */ reactExports.createElement(Element, Object.assign({
    prefixCls: `${prefixCls}-avatar`,
    shape,
    size
  }, otherProps))));
};
const SkeletonButton = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    active,
    block = false,
    size = "default"
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls);
  const otherProps = omit(props, ["prefixCls"]);
  const cls = classNames(prefixCls, `${prefixCls}-element`, {
    [`${prefixCls}-active`]: active,
    [`${prefixCls}-block`]: block
  }, className, rootClassName, hashId, cssVarCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className: cls
  }, /* @__PURE__ */ reactExports.createElement(Element, Object.assign({
    prefixCls: `${prefixCls}-button`,
    size
  }, otherProps))));
};
const path = "M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z";
const SkeletonImage = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    active
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls);
  const cls = classNames(prefixCls, `${prefixCls}-element`, {
    [`${prefixCls}-active`]: active
  }, className, rootClassName, hashId, cssVarCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className: cls
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(`${prefixCls}-image`, className),
    style
  }, /* @__PURE__ */ reactExports.createElement("svg", {
    viewBox: "0 0 1098 1024",
    xmlns: "http://www.w3.org/2000/svg",
    className: `${prefixCls}-image-svg`
  }, /* @__PURE__ */ reactExports.createElement("title", null, "Image placeholder"), /* @__PURE__ */ reactExports.createElement("path", {
    d: path,
    className: `${prefixCls}-image-path`
  })))));
};
const SkeletonInput = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    active,
    block,
    size = "default"
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls);
  const otherProps = omit(props, ["prefixCls"]);
  const cls = classNames(prefixCls, `${prefixCls}-element`, {
    [`${prefixCls}-active`]: active,
    [`${prefixCls}-block`]: block
  }, className, rootClassName, hashId, cssVarCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className: cls
  }, /* @__PURE__ */ reactExports.createElement(Element, Object.assign({
    prefixCls: `${prefixCls}-input`,
    size
  }, otherProps))));
};
const SkeletonNode = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    active,
    children
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls);
  const cls = classNames(prefixCls, `${prefixCls}-element`, {
    [`${prefixCls}-active`]: active
  }, hashId, className, rootClassName, cssVarCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className: cls
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(`${prefixCls}-image`, className),
    style
  }, children)));
};
const getWidth = (index, props) => {
  const {
    width,
    rows = 2
  } = props;
  if (Array.isArray(width)) {
    return width[index];
  }
  if (rows - 1 === index) {
    return width;
  }
  return void 0;
};
const Paragraph = (props) => {
  const {
    prefixCls,
    className,
    style,
    rows = 0
  } = props;
  const rowList = Array.from({
    length: rows
  }).map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    /* @__PURE__ */ reactExports.createElement("li", {
      key: index,
      style: {
        width: getWidth(index, props)
      }
    })
  ));
  return /* @__PURE__ */ reactExports.createElement("ul", {
    className: classNames(prefixCls, className),
    style
  }, rowList);
};
const Title = ({
  prefixCls,
  className,
  width,
  style
}) => (
  // biome-ignore lint/a11y/useHeadingContent: HOC here
  /* @__PURE__ */ reactExports.createElement("h3", {
    className: classNames(prefixCls, className),
    style: Object.assign({
      width
    }, style)
  })
);
function getComponentProps(prop) {
  if (prop && typeof prop === "object") {
    return prop;
  }
  return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
  if (hasTitle && !hasParagraph) {
    return {
      size: "large",
      shape: "square"
    };
  }
  return {
    size: "large",
    shape: "circle"
  };
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
  if (!hasAvatar && hasParagraph) {
    return {
      width: "38%"
    };
  }
  if (hasAvatar && hasParagraph) {
    return {
      width: "50%"
    };
  }
  return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
  const basicProps = {};
  if (!hasAvatar || !hasTitle) {
    basicProps.width = "61%";
  }
  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3;
  } else {
    basicProps.rows = 2;
  }
  return basicProps;
}
const Skeleton = (props) => {
  const {
    prefixCls: customizePrefixCls,
    loading,
    className,
    rootClassName,
    style,
    children,
    avatar = false,
    title = true,
    paragraph = true,
    active,
    round
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("skeleton");
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls);
  if (loading || !("loading" in props)) {
    const hasAvatar = !!avatar;
    const hasTitle = !!title;
    const hasParagraph = !!paragraph;
    let avatarNode;
    if (hasAvatar) {
      const avatarProps = Object.assign(Object.assign({
        prefixCls: `${prefixCls}-avatar`
      }, getAvatarBasicProps(hasTitle, hasParagraph)), getComponentProps(avatar));
      avatarNode = /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-header`
      }, /* @__PURE__ */ reactExports.createElement(Element, Object.assign({}, avatarProps)));
    }
    let contentNode;
    if (hasTitle || hasParagraph) {
      let $title;
      if (hasTitle) {
        const titleProps = Object.assign(Object.assign({
          prefixCls: `${prefixCls}-title`
        }, getTitleBasicProps(hasAvatar, hasParagraph)), getComponentProps(title));
        $title = /* @__PURE__ */ reactExports.createElement(Title, Object.assign({}, titleProps));
      }
      let paragraphNode;
      if (hasParagraph) {
        const paragraphProps = Object.assign(Object.assign({
          prefixCls: `${prefixCls}-paragraph`
        }, getParagraphBasicProps(hasAvatar, hasTitle)), getComponentProps(paragraph));
        paragraphNode = /* @__PURE__ */ reactExports.createElement(Paragraph, Object.assign({}, paragraphProps));
      }
      contentNode = /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-content`
      }, $title, paragraphNode);
    }
    const cls = classNames(prefixCls, {
      [`${prefixCls}-with-avatar`]: hasAvatar,
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-rtl`]: direction === "rtl",
      [`${prefixCls}-round`]: round
    }, contextClassName, className, rootClassName, hashId, cssVarCls);
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
      className: cls,
      style: Object.assign(Object.assign({}, contextStyle), style)
    }, avatarNode, contentNode));
  }
  return children !== null && children !== void 0 ? children : null;
};
Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Node = SkeletonNode;
const getRenderPropValue = (propValue) => {
  if (!propValue) {
    return null;
  }
  return typeof propValue === "function" ? propValue() : propValue;
};
const genBaseStyle$1 = (token) => {
  const {
    componentCls,
    popoverColor,
    titleMinWidth,
    fontWeightStrong,
    innerPadding,
    boxShadowSecondary,
    colorTextHeading,
    borderRadiusLG,
    zIndexPopup,
    titleMarginBottom,
    colorBgElevated,
    popoverBg,
    titleBorderBottom,
    innerContentPadding,
    titlePadding
  } = token;
  return [
    {
      [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "absolute",
        top: 0,
        // use `left` to fix https://github.com/ant-design/ant-design/issues/39195
        left: {
          _skip_check_: true,
          value: 0
        },
        zIndex: zIndexPopup,
        fontWeight: "normal",
        whiteSpace: "normal",
        textAlign: "start",
        cursor: "auto",
        userSelect: "text",
        // When use `autoArrow`, origin will follow the arrow position
        "--valid-offset-x": "var(--arrow-offset-horizontal, var(--arrow-x))",
        transformOrigin: [`var(--valid-offset-x, 50%)`, `var(--arrow-y, 50%)`].join(" "),
        "--antd-arrow-background-color": colorBgElevated,
        width: "max-content",
        maxWidth: "100vw",
        "&-rtl": {
          direction: "rtl"
        },
        "&-hidden": {
          display: "none"
        },
        [`${componentCls}-content`]: {
          position: "relative"
        },
        [`${componentCls}-inner`]: {
          backgroundColor: popoverBg,
          backgroundClip: "padding-box",
          borderRadius: borderRadiusLG,
          boxShadow: boxShadowSecondary,
          padding: innerPadding
        },
        [`${componentCls}-title`]: {
          minWidth: titleMinWidth,
          marginBottom: titleMarginBottom,
          color: colorTextHeading,
          fontWeight: fontWeightStrong,
          borderBottom: titleBorderBottom,
          padding: titlePadding
        },
        [`${componentCls}-inner-content`]: {
          color: popoverColor,
          padding: innerContentPadding
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
        margin: token.sizePopupArrow,
        display: "inline-block",
        [`${componentCls}-content`]: {
          display: "inline-block"
        }
      }
    }
  ];
};
const genColorStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: PresetColors.map((colorKey) => {
      const lightColor = token[`${colorKey}6`];
      return {
        [`&${componentCls}-${colorKey}`]: {
          "--antd-arrow-background-color": lightColor,
          [`${componentCls}-inner`]: {
            backgroundColor: lightColor
          },
          [`${componentCls}-arrow`]: {
            background: "transparent"
          }
        }
      };
    })
  };
};
const prepareComponentToken$1 = (token) => {
  const {
    lineWidth,
    controlHeight,
    fontHeight,
    padding,
    wireframe,
    zIndexPopupBase,
    borderRadiusLG,
    marginXS,
    lineType,
    colorSplit,
    paddingSM
  } = token;
  const titlePaddingBlockDist = controlHeight - fontHeight;
  const popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
  const popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
  const popoverPaddingHorizontal = padding;
  return Object.assign(Object.assign(Object.assign({
    titleMinWidth: 177,
    zIndexPopup: zIndexPopupBase + 30
  }, getArrowToken(token)), getArrowOffsetToken({
    contentRadius: borderRadiusLG,
    limitVerticalRadius: true
  })), {
    // internal
    innerPadding: wireframe ? 0 : 12,
    titleMarginBottom: wireframe ? 0 : marginXS,
    titlePadding: wireframe ? `${popoverTitlePaddingBlockTop}px ${popoverPaddingHorizontal}px ${popoverTitlePaddingBlockBottom}px` : 0,
    titleBorderBottom: wireframe ? `${lineWidth}px ${lineType} ${colorSplit}` : "none",
    innerContentPadding: wireframe ? `${paddingSM}px ${popoverPaddingHorizontal}px` : 0
  });
};
const useStyle$3 = genStyleHooks("Popover", (token) => {
  const {
    colorBgElevated,
    colorText
  } = token;
  const popoverToken = merge(token, {
    popoverBg: colorBgElevated,
    popoverColor: colorText
  });
  return [genBaseStyle$1(popoverToken), genColorStyle(popoverToken), initZoomMotion(popoverToken, "zoom-big")];
}, prepareComponentToken$1, {
  resetStyle: false,
  deprecatedTokens: [["width", "titleMinWidth"], ["minWidth", "titleMinWidth"]]
});
var __rest$5 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Overlay$1 = ({
  title,
  content,
  prefixCls
}) => {
  if (!title && !content) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, title && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-title`
  }, title), content && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-inner-content`
  }, content));
};
const RawPurePanel = (props) => {
  const {
    hashId,
    prefixCls,
    className,
    style,
    placement = "top",
    title,
    content,
    children
  } = props;
  const titleNode = getRenderPropValue(title);
  const contentNode = getRenderPropValue(content);
  const cls = classNames(hashId, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: cls,
    style
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-arrow`
  }), /* @__PURE__ */ reactExports.createElement(Popup, Object.assign({}, props, {
    className: hashId,
    prefixCls
  }), children || /* @__PURE__ */ reactExports.createElement(Overlay$1, {
    prefixCls,
    title: titleNode,
    content: contentNode
  })));
};
const PurePanel$1 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className
  } = props, restProps = __rest$5(props, ["prefixCls", "className"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("popover", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$3(prefixCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(RawPurePanel, Object.assign({}, restProps, {
    prefixCls,
    hashId,
    className: classNames(className, cssVarCls)
  })));
};
var __rest$4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalPopover = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    title,
    content,
    overlayClassName,
    placement = "top",
    trigger = "hover",
    children,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    onOpenChange,
    overlayStyle = {},
    styles,
    classNames: popoverClassNames
  } = props, otherProps = __rest$4(props, ["prefixCls", "title", "content", "overlayClassName", "placement", "trigger", "children", "mouseEnterDelay", "mouseLeaveDelay", "onOpenChange", "overlayStyle", "styles", "classNames"]);
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("popover");
  const prefixCls = getPrefixCls("popover", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$3(prefixCls);
  const rootPrefixCls = getPrefixCls();
  const rootClassNames = classNames(overlayClassName, hashId, cssVarCls, contextClassName, contextClassNames.root, popoverClassNames === null || popoverClassNames === void 0 ? void 0 : popoverClassNames.root);
  const bodyClassNames = classNames(contextClassNames.body, popoverClassNames === null || popoverClassNames === void 0 ? void 0 : popoverClassNames.body);
  const [open, setOpen] = useMergedState(false, {
    value: (_a = props.open) !== null && _a !== void 0 ? _a : props.visible,
    defaultValue: (_b = props.defaultOpen) !== null && _b !== void 0 ? _b : props.defaultVisible
  });
  const settingOpen = (value, e) => {
    setOpen(value, true);
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(value, e);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === KeyCode.ESC) {
      settingOpen(false, e);
    }
  };
  const onInternalOpenChange = (value) => {
    settingOpen(value);
  };
  const titleNode = getRenderPropValue(title);
  const contentNode = getRenderPropValue(content);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({
    placement,
    trigger,
    mouseEnterDelay,
    mouseLeaveDelay
  }, otherProps, {
    prefixCls,
    classNames: {
      root: rootClassNames,
      body: bodyClassNames
    },
    styles: {
      root: Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.root), contextStyle), overlayStyle), styles === null || styles === void 0 ? void 0 : styles.root),
      body: Object.assign(Object.assign({}, contextStyles.body), styles === null || styles === void 0 ? void 0 : styles.body)
    },
    ref,
    open,
    onOpenChange: onInternalOpenChange,
    overlay: titleNode || contentNode ? /* @__PURE__ */ reactExports.createElement(Overlay$1, {
      prefixCls,
      title: titleNode,
      content: contentNode
    }) : null,
    transitionName: getTransitionName(rootPrefixCls, "zoom-big", otherProps.transitionName),
    "data-popover-inject": true
  }), cloneElement(children, {
    onKeyDown: (e) => {
      var _a2, _b2;
      if (/* @__PURE__ */ reactExports.isValidElement(children)) {
        (_b2 = children === null || children === void 0 ? void 0 : (_a2 = children.props).onKeyDown) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, e);
      }
      onKeyDown(e);
    }
  })));
});
const Popover = InternalPopover;
Popover._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$1;
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
  Skeleton as S,
  Space as a
};
//# sourceMappingURL=index-9NwSGv-1.js.map
