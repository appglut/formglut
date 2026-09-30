var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var PRECEDENCE, OPENERS, TERMINATORS, PATTERN;
PRECEDENCE = {
  "(": 9,
  "!": 8,
  "*": 7,
  "/": 7,
  "%": 7,
  "+": 6,
  "-": 6,
  "<": 5,
  "<=": 5,
  ">": 5,
  ">=": 5,
  "==": 4,
  "!=": 4,
  "&&": 3,
  "||": 2,
  "?": 1,
  "?:": 1
};
OPENERS = ["(", "?"];
TERMINATORS = {
  ")": ["("],
  ":": ["?", "?:"]
};
PATTERN = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;
function postfix(expression) {
  var terms = [], stack = [], match, operator, term, element;
  while (match = expression.match(PATTERN)) {
    operator = match[0];
    term = expression.substr(0, match.index).trim();
    if (term) {
      terms.push(term);
    }
    while (element = stack.pop()) {
      if (TERMINATORS[operator]) {
        if (TERMINATORS[operator][0] === element) {
          operator = TERMINATORS[operator][1] || operator;
          break;
        }
      } else if (OPENERS.indexOf(element) >= 0 || PRECEDENCE[element] < PRECEDENCE[operator]) {
        stack.push(element);
        break;
      }
      terms.push(element);
    }
    if (!TERMINATORS[operator]) {
      stack.push(operator);
    }
    expression = expression.substr(match.index + operator.length);
  }
  expression = expression.trim();
  if (expression) {
    terms.push(expression);
  }
  return terms.concat(stack.reverse());
}
var OPERATORS = {
  "!": function(a) {
    return !a;
  },
  "*": function(a, b) {
    return a * b;
  },
  "/": function(a, b) {
    return a / b;
  },
  "%": function(a, b) {
    return a % b;
  },
  "+": function(a, b) {
    return a + b;
  },
  "-": function(a, b) {
    return a - b;
  },
  "<": function(a, b) {
    return a < b;
  },
  "<=": function(a, b) {
    return a <= b;
  },
  ">": function(a, b) {
    return a > b;
  },
  ">=": function(a, b) {
    return a >= b;
  },
  "==": function(a, b) {
    return a === b;
  },
  "!=": function(a, b) {
    return a !== b;
  },
  "&&": function(a, b) {
    return a && b;
  },
  "||": function(a, b) {
    return a || b;
  },
  "?:": function(a, b, c) {
    if (a) {
      throw b;
    }
    return c;
  }
};
function evaluate(postfix2, variables) {
  var stack = [], i, j, args, getOperatorResult, term, value;
  for (i = 0; i < postfix2.length; i++) {
    term = postfix2[i];
    getOperatorResult = OPERATORS[term];
    if (getOperatorResult) {
      j = getOperatorResult.length;
      args = Array(j);
      while (j--) {
        args[j] = stack.pop();
      }
      try {
        value = getOperatorResult.apply(null, args);
      } catch (earlyReturn) {
        return earlyReturn;
      }
    } else if (variables.hasOwnProperty(term)) {
      value = variables[term];
    } else {
      value = +term;
    }
    stack.push(value);
  }
  return stack[0];
}
function compile(expression) {
  var terms = postfix(expression);
  return function(variables) {
    return evaluate(terms, variables);
  };
}
function pluralForms(expression) {
  var evaluate2 = compile(expression);
  return function(n) {
    return +evaluate2({ n });
  };
}
var DEFAULT_OPTIONS = {
  contextDelimiter: "",
  onMissingKey: null
};
function getPluralExpression(pf) {
  var parts, i, part;
  parts = pf.split(";");
  for (i = 0; i < parts.length; i++) {
    part = parts[i].trim();
    if (part.indexOf("plural=") === 0) {
      return part.substr(7);
    }
  }
}
function Tannin(data, options) {
  var key;
  this.data = data;
  this.pluralForms = {};
  this.options = {};
  for (key in DEFAULT_OPTIONS) {
    this.options[key] = options !== void 0 && key in options ? options[key] : DEFAULT_OPTIONS[key];
  }
}
Tannin.prototype.getPluralForm = function(domain, n) {
  var getPluralForm = this.pluralForms[domain], config, plural, pf;
  if (!getPluralForm) {
    config = this.data[domain][""];
    pf = config["Plural-Forms"] || config["plural-forms"] || // Ignore reason: As known, there's no way to document the empty
    // string property on a key to guarantee this as metadata.
    // @ts-ignore
    config.plural_forms;
    if (typeof pf !== "function") {
      plural = getPluralExpression(
        config["Plural-Forms"] || config["plural-forms"] || // Ignore reason: As known, there's no way to document the empty
        // string property on a key to guarantee this as metadata.
        // @ts-ignore
        config.plural_forms
      );
      pf = pluralForms(plural);
    }
    getPluralForm = this.pluralForms[domain] = pf;
  }
  return getPluralForm(n);
};
Tannin.prototype.dcnpgettext = function(domain, context, singular, plural, n) {
  var index, key, entry;
  if (n === void 0) {
    index = 0;
  } else {
    index = this.getPluralForm(domain, n);
  }
  key = singular;
  if (context) {
    key = context + this.options.contextDelimiter + singular;
  }
  entry = this.data[domain][key];
  if (entry && entry[index]) {
    return entry[index];
  }
  if (this.options.onMissingKey) {
    this.options.onMissingKey(singular, domain);
  }
  return index === 0 ? singular : plural;
};
var DEFAULT_LOCALE_DATA = {
  "": {
    plural_forms(n) {
      return n === 1 ? 0 : 1;
    }
  }
};
var I18N_HOOK_REGEXP = /^i18n\.(n?gettext|has_translation)(_|$)/;
var createI18n = (initialData, initialDomain, hooks) => {
  const tannin = new Tannin({});
  const listeners = /* @__PURE__ */ new Set();
  const notifyListeners = () => {
    listeners.forEach((listener) => listener());
  };
  const subscribe = (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };
  const getLocaleData = (domain = "default") => tannin.data[domain];
  const doSetLocaleData = (data, domain = "default") => {
    var _a;
    tannin.data[domain] = {
      ...tannin.data[domain],
      ...data
    };
    tannin.data[domain][""] = {
      ...DEFAULT_LOCALE_DATA[""],
      ...(_a = tannin.data[domain]) == null ? void 0 : _a[""]
    };
    delete tannin.pluralForms[domain];
  };
  const setLocaleData = (data, domain) => {
    doSetLocaleData(data, domain);
    notifyListeners();
  };
  const addLocaleData = (data, domain = "default") => {
    var _a;
    tannin.data[domain] = {
      ...tannin.data[domain],
      ...data,
      // Populate default domain configuration (supported locale date which omits
      // a plural forms expression).
      "": {
        ...DEFAULT_LOCALE_DATA[""],
        ...(_a = tannin.data[domain]) == null ? void 0 : _a[""],
        ...data == null ? void 0 : data[""]
      }
    };
    delete tannin.pluralForms[domain];
    notifyListeners();
  };
  const resetLocaleData = (data, domain) => {
    tannin.data = {};
    tannin.pluralForms = {};
    setLocaleData(data, domain);
  };
  const dcnpgettext = (domain = "default", context, single, plural, number) => {
    if (!tannin.data[domain]) {
      doSetLocaleData(void 0, domain);
    }
    return tannin.dcnpgettext(domain, context, single, plural, number);
  };
  const getFilterDomain = (domain) => domain || "default";
  const __2 = (text, domain) => {
    let translation = dcnpgettext(domain, void 0, text);
    if (!hooks) {
      return translation;
    }
    translation = hooks.applyFilters(
      "i18n.gettext",
      translation,
      text,
      domain
    );
    return hooks.applyFilters(
      "i18n.gettext_" + getFilterDomain(domain),
      translation,
      text,
      domain
    );
  };
  const _x = (text, context, domain) => {
    let translation = dcnpgettext(domain, context, text);
    if (!hooks) {
      return translation;
    }
    translation = hooks.applyFilters(
      "i18n.gettext_with_context",
      translation,
      text,
      context,
      domain
    );
    return hooks.applyFilters(
      "i18n.gettext_with_context_" + getFilterDomain(domain),
      translation,
      text,
      context,
      domain
    );
  };
  const _n2 = (single, plural, number, domain) => {
    let translation = dcnpgettext(
      domain,
      void 0,
      single,
      plural,
      number
    );
    if (!hooks) {
      return translation;
    }
    translation = hooks.applyFilters(
      "i18n.ngettext",
      translation,
      single,
      plural,
      number,
      domain
    );
    return hooks.applyFilters(
      "i18n.ngettext_" + getFilterDomain(domain),
      translation,
      single,
      plural,
      number,
      domain
    );
  };
  const _nx = (single, plural, number, context, domain) => {
    let translation = dcnpgettext(
      domain,
      context,
      single,
      plural,
      number
    );
    if (!hooks) {
      return translation;
    }
    translation = hooks.applyFilters(
      "i18n.ngettext_with_context",
      translation,
      single,
      plural,
      number,
      context,
      domain
    );
    return hooks.applyFilters(
      "i18n.ngettext_with_context_" + getFilterDomain(domain),
      translation,
      single,
      plural,
      number,
      context,
      domain
    );
  };
  const isRTL = () => {
    return "rtl" === _x("ltr", "text direction");
  };
  const hasTranslation = (single, context, domain) => {
    var _a, _b;
    const key = context ? context + "" + single : single;
    let result = !!((_b = (_a = tannin.data) == null ? void 0 : _a[domain ?? "default"]) == null ? void 0 : _b[key]);
    if (hooks) {
      result = hooks.applyFilters(
        "i18n.has_translation",
        result,
        single,
        context,
        domain
      );
      result = hooks.applyFilters(
        "i18n.has_translation_" + getFilterDomain(domain),
        result,
        single,
        context,
        domain
      );
    }
    return result;
  };
  if (hooks) {
    const onHookAddedOrRemoved = (hookName) => {
      if (I18N_HOOK_REGEXP.test(hookName)) {
        notifyListeners();
      }
    };
    hooks.addAction("hookAdded", "core/i18n", onHookAddedOrRemoved);
    hooks.addAction("hookRemoved", "core/i18n", onHookAddedOrRemoved);
  }
  return {
    getLocaleData,
    setLocaleData,
    addLocaleData,
    resetLocaleData,
    subscribe,
    __: __2,
    _x,
    _n: _n2,
    _nx,
    isRTL,
    hasTranslation
  };
};
function validateNamespace(namespace) {
  if ("string" !== typeof namespace || "" === namespace) {
    console.error("The namespace must be a non-empty string.");
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(namespace)) {
    console.error(
      "The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."
    );
    return false;
  }
  return true;
}
var validateNamespace_default = validateNamespace;
function validateHookName(hookName) {
  if ("string" !== typeof hookName || "" === hookName) {
    console.error("The hook name must be a non-empty string.");
    return false;
  }
  if (/^__/.test(hookName)) {
    console.error("The hook name cannot begin with `__`.");
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(hookName)) {
    console.error(
      "The hook name can only contain numbers, letters, dashes, periods and underscores."
    );
    return false;
  }
  return true;
}
var validateHookName_default = validateHookName;
function createAddHook(hooks, storeKey) {
  return function addHook(hookName, namespace, callback, priority = 10) {
    const hooksStore = hooks[storeKey];
    if (!validateHookName_default(hookName)) {
      return;
    }
    if (!validateNamespace_default(namespace)) {
      return;
    }
    if ("function" !== typeof callback) {
      console.error("The hook callback must be a function.");
      return;
    }
    if ("number" !== typeof priority) {
      console.error(
        "If specified, the hook priority must be a number."
      );
      return;
    }
    const handler = { callback, priority, namespace };
    if (hooksStore[hookName]) {
      const handlers = hooksStore[hookName].handlers;
      let i;
      for (i = handlers.length; i > 0; i--) {
        if (priority >= handlers[i - 1].priority) {
          break;
        }
      }
      if (i === handlers.length) {
        handlers[i] = handler;
      } else {
        handlers.splice(i, 0, handler);
      }
      hooksStore.__current.forEach((hookInfo) => {
        if (hookInfo.name === hookName && hookInfo.currentIndex >= i) {
          hookInfo.currentIndex++;
        }
      });
    } else {
      hooksStore[hookName] = {
        handlers: [handler],
        runs: 0
      };
    }
    if (hookName !== "hookAdded") {
      hooks.doAction(
        "hookAdded",
        hookName,
        namespace,
        callback,
        priority
      );
    }
  };
}
var createAddHook_default = createAddHook;
function createRemoveHook(hooks, storeKey, removeAll = false) {
  return function removeHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];
    if (!validateHookName_default(hookName)) {
      return;
    }
    if (!removeAll && !validateNamespace_default(namespace)) {
      return;
    }
    if (!hooksStore[hookName]) {
      return 0;
    }
    let handlersRemoved = 0;
    if (removeAll) {
      handlersRemoved = hooksStore[hookName].handlers.length;
      hooksStore[hookName] = {
        runs: hooksStore[hookName].runs,
        handlers: []
      };
    } else {
      const handlers = hooksStore[hookName].handlers;
      for (let i = handlers.length - 1; i >= 0; i--) {
        if (handlers[i].namespace === namespace) {
          handlers.splice(i, 1);
          handlersRemoved++;
          hooksStore.__current.forEach((hookInfo) => {
            if (hookInfo.name === hookName && hookInfo.currentIndex >= i) {
              hookInfo.currentIndex--;
            }
          });
        }
      }
    }
    if (hookName !== "hookRemoved") {
      hooks.doAction("hookRemoved", hookName, namespace);
    }
    return handlersRemoved;
  };
}
var createRemoveHook_default = createRemoveHook;
function createHasHook(hooks, storeKey) {
  return function hasHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];
    if ("undefined" !== typeof namespace) {
      return hookName in hooksStore && hooksStore[hookName].handlers.some(
        (hook) => hook.namespace === namespace
      );
    }
    return hookName in hooksStore;
  };
}
var createHasHook_default = createHasHook;
function createRunHook(hooks, storeKey, returnFirstArg, async) {
  return function runHook(hookName, ...args) {
    const hooksStore = hooks[storeKey];
    if (!hooksStore[hookName]) {
      hooksStore[hookName] = {
        handlers: [],
        runs: 0
      };
    }
    hooksStore[hookName].runs++;
    const handlers = hooksStore[hookName].handlers;
    if (!handlers || !handlers.length) {
      return returnFirstArg ? args[0] : void 0;
    }
    const hookInfo = {
      name: hookName,
      currentIndex: 0
    };
    async function asyncRunner() {
      try {
        hooksStore.__current.add(hookInfo);
        let result = returnFirstArg ? args[0] : void 0;
        while (hookInfo.currentIndex < handlers.length) {
          const handler = handlers[hookInfo.currentIndex];
          result = await handler.callback.apply(null, args);
          if (returnFirstArg) {
            args[0] = result;
          }
          hookInfo.currentIndex++;
        }
        return returnFirstArg ? result : void 0;
      } finally {
        hooksStore.__current.delete(hookInfo);
      }
    }
    function syncRunner() {
      try {
        hooksStore.__current.add(hookInfo);
        let result = returnFirstArg ? args[0] : void 0;
        while (hookInfo.currentIndex < handlers.length) {
          const handler = handlers[hookInfo.currentIndex];
          result = handler.callback.apply(null, args);
          if (returnFirstArg) {
            args[0] = result;
          }
          hookInfo.currentIndex++;
        }
        return returnFirstArg ? result : void 0;
      } finally {
        hooksStore.__current.delete(hookInfo);
      }
    }
    return (async ? asyncRunner : syncRunner)();
  };
}
var createRunHook_default = createRunHook;
function createCurrentHook(hooks, storeKey) {
  return function currentHook() {
    var _a;
    const hooksStore = hooks[storeKey];
    const currentArray = Array.from(hooksStore.__current);
    return ((_a = currentArray.at(-1)) == null ? void 0 : _a.name) ?? null;
  };
}
var createCurrentHook_default = createCurrentHook;
function createDoingHook(hooks, storeKey) {
  return function doingHook(hookName) {
    const hooksStore = hooks[storeKey];
    if ("undefined" === typeof hookName) {
      return hooksStore.__current.size > 0;
    }
    return Array.from(hooksStore.__current).some(
      (hook) => hook.name === hookName
    );
  };
}
var createDoingHook_default = createDoingHook;
function createDidHook(hooks, storeKey) {
  return function didHook(hookName) {
    const hooksStore = hooks[storeKey];
    if (!validateHookName_default(hookName)) {
      return;
    }
    return hooksStore[hookName] && hooksStore[hookName].runs ? hooksStore[hookName].runs : 0;
  };
}
var createDidHook_default = createDidHook;
var _Hooks = class {
  constructor() {
    __publicField(this, "actions");
    __publicField(this, "filters");
    __publicField(this, "addAction");
    __publicField(this, "addFilter");
    __publicField(this, "removeAction");
    __publicField(this, "removeFilter");
    __publicField(this, "hasAction");
    __publicField(this, "hasFilter");
    __publicField(this, "removeAllActions");
    __publicField(this, "removeAllFilters");
    __publicField(this, "doAction");
    __publicField(this, "doActionAsync");
    __publicField(this, "applyFilters");
    __publicField(this, "applyFiltersAsync");
    __publicField(this, "currentAction");
    __publicField(this, "currentFilter");
    __publicField(this, "doingAction");
    __publicField(this, "doingFilter");
    __publicField(this, "didAction");
    __publicField(this, "didFilter");
    this.actions = /* @__PURE__ */ Object.create(null);
    this.actions.__current = /* @__PURE__ */ new Set();
    this.filters = /* @__PURE__ */ Object.create(null);
    this.filters.__current = /* @__PURE__ */ new Set();
    this.addAction = createAddHook_default(this, "actions");
    this.addFilter = createAddHook_default(this, "filters");
    this.removeAction = createRemoveHook_default(this, "actions");
    this.removeFilter = createRemoveHook_default(this, "filters");
    this.hasAction = createHasHook_default(this, "actions");
    this.hasFilter = createHasHook_default(this, "filters");
    this.removeAllActions = createRemoveHook_default(this, "actions", true);
    this.removeAllFilters = createRemoveHook_default(this, "filters", true);
    this.doAction = createRunHook_default(this, "actions", false, false);
    this.doActionAsync = createRunHook_default(this, "actions", false, true);
    this.applyFilters = createRunHook_default(this, "filters", true, false);
    this.applyFiltersAsync = createRunHook_default(this, "filters", true, true);
    this.currentAction = createCurrentHook_default(this, "actions");
    this.currentFilter = createCurrentHook_default(this, "filters");
    this.doingAction = createDoingHook_default(this, "actions");
    this.doingFilter = createDoingHook_default(this, "filters");
    this.didAction = createDidHook_default(this, "actions");
    this.didFilter = createDidHook_default(this, "filters");
  }
};
function createHooks() {
  return new _Hooks();
}
var createHooks_default = createHooks;
var defaultHooks = createHooks_default();
var {
  addAction,
  addFilter,
  removeAction,
  removeFilter,
  hasAction,
  hasFilter,
  removeAllActions,
  removeAllFilters,
  doAction,
  doActionAsync,
  applyFilters,
  applyFiltersAsync,
  currentAction,
  currentFilter,
  doingAction,
  doingFilter,
  didAction,
  didFilter,
  actions,
  filters
} = defaultHooks;
var i18n = createI18n(void 0, void 0, defaultHooks);
i18n.getLocaleData.bind(i18n);
i18n.setLocaleData.bind(i18n);
i18n.resetLocaleData.bind(i18n);
i18n.subscribe.bind(i18n);
var __ = i18n.__.bind(i18n);
i18n._x.bind(i18n);
var _n = i18n._n.bind(i18n);
i18n._nx.bind(i18n);
i18n.isRTL.bind(i18n);
i18n.hasTranslation.bind(i18n);
export {
  __ as _,
  _n as a
};
//# sourceMappingURL=default-i18n-C5tja8m9.js.map
