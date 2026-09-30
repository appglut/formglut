import { co as reactExports, cU as useSafeState, a as Button, a5 as convertLegacyProps } from "./api-C3T_2YIP.js";
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
export {
  ActionButton as A
};
//# sourceMappingURL=ActionButton-1FHh5CEq.js.map
