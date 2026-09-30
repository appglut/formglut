import { _ as __ } from "./chunks/default-i18n-Bi0ZJkXv.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
class InputMask {
  constructor(input, options = {}) {
    this.input = input;
    this.mask = options.mask || "";
    this.reversible = options.reversible || false;
    this.clearOnInvalid = options.clearOnInvalid || false;
    console.log("[FormGlut Mask] Constructor called with:", {
      mask: this.mask,
      reversible: this.reversible,
      clearOnInvalid: this.clearOnInvalid
    });
    this.maskPattern = this.compileMask(this.mask);
    console.log("[FormGlut Mask] Compiled mask pattern:", this.maskPattern);
    this.previousValue = "";
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.init();
  }
  /**
   * Compile mask pattern into tokens
   * Returns array of { type: 'literal'|'digit'|'letter'|'alphanumeric', char: string }
   */
  compileMask(mask) {
    if (!mask) return [];
    const tokens = [];
    for (let i = 0; i < mask.length; i++) {
      const char = mask[i];
      if (char === "9") {
        tokens.push({ type: "digit", char: "9" });
      } else if (char === "a") {
        tokens.push({ type: "letter", char: "a" });
      } else if (char === "*") {
        tokens.push({ type: "alphanumeric", char: "*" });
      } else {
        tokens.push({ type: "literal", char });
      }
    }
    return tokens;
  }
  init() {
    const originalValue = this.input.value;
    console.log("[FormGlut Mask] init() called with original value:", originalValue);
    this.input.addEventListener("input", this.handleInput);
    this.input.addEventListener("keydown", this.handleKeyDown);
    this.input.addEventListener("blur", this.handleBlur);
    if (originalValue) {
      const formatted = this.formatValue(originalValue);
      console.log("[FormGlut Mask] formatted value:", formatted);
      if (formatted && formatted !== originalValue) {
        this.input.value = formatted;
      } else if (!formatted) {
        console.log("[FormGlut Mask] value does not match mask, keeping original");
        this.input.value = originalValue;
      }
    }
    this.previousValue = this.input.value;
    console.log("[FormGlut Mask] init() final value:", this.input.value);
  }
  destroy() {
    this.input.removeEventListener("input", this.handleInput);
    this.input.removeEventListener("keydown", this.handleKeyDown);
    this.input.removeEventListener("blur", this.handleBlur);
  }
  /**
   * Handle blur event (when user leaves the field)
   * Clear if not match option is enabled and value doesn't match mask
   */
  handleBlur() {
    if (this.clearOnInvalid && this.input.value) {
      const formatted = this.formatValue(this.input.value);
      if (!formatted) {
        this.input.value = "";
        this.previousValue = "";
        console.log("[FormGlut Mask] Cleared invalid input on blur");
      }
    }
  }
  handleKeyDown(e) {
    if (e.key === "Backspace") {
      const cursorPos = this.input.selectionStart;
      if (this.reversible) {
        e.preventDefault();
        this.handleBackspace(cursorPos);
      } else {
        const token = this.maskPattern[cursorPos - 1];
        if (token && token.type === "literal") {
          let newPos = cursorPos - 1;
          while (newPos >= 0 && this.maskPattern[newPos] && this.maskPattern[newPos].type === "literal") {
            newPos--;
          }
          if (newPos >= 0 && this.maskPattern[newPos] && this.maskPattern[newPos].type !== "literal") {
            const value = this.input.value.split("");
            value[newPos] = "";
            this.input.value = value.join("");
            this.setCursorPosition(newPos);
            e.preventDefault();
          }
        }
      }
    }
  }
  handleInput(e) {
    const rawValue = this.input.value;
    const cursorPos = this.input.selectionStart;
    const formatted = this.formatValue(rawValue);
    if (formatted !== rawValue) {
      this.input.value = formatted;
      const newCursorPos = this.calculateNewCursorPosition(rawValue, formatted, cursorPos);
      this.setCursorPosition(Math.min(newCursorPos, formatted.length));
    }
    if (this.clearOnInvalid && rawValue && !formatted) {
      this.input.value = "";
      this.previousValue = "";
      return;
    }
    this.previousValue = formatted;
    this.input.dispatchEvent(new CustomEvent("mask:change", {
      detail: { masked: formatted, complete: this.isComplete() }
    }));
  }
  /**
   * Format a value according to the mask
   */
  formatValue(value) {
    if (!value) return "";
    value = value.toString().trim();
    if (!value) return "";
    const valueChars = value.split("");
    const result = [];
    let maskIndex = 0;
    const matchingChars = [];
    for (const valueChar of valueChars) {
      for (let i = maskIndex; i < this.maskPattern.length; i++) {
        const token = this.maskPattern[i];
        if (token.type === "literal") {
          continue;
        } else if (token.type === "digit" && /\d/.test(valueChar)) {
          matchingChars.push({ char: valueChar, token });
          maskIndex = i + 1;
          break;
        } else if (token.type === "letter" && /[a-zA-Z]/.test(valueChar)) {
          matchingChars.push({ char: valueChar, token });
          maskIndex = i + 1;
          break;
        } else if (token.type === "alphanumeric" && /[a-zA-Z0-9]/.test(valueChar)) {
          matchingChars.push({ char: valueChar, token });
          maskIndex = i + 1;
          break;
        }
      }
    }
    if (matchingChars.length === 0) return "";
    maskIndex = 0;
    let charIndex = 0;
    for (let i = 0; i < this.maskPattern.length && charIndex < matchingChars.length; i++) {
      const token = this.maskPattern[i];
      if (token.type === "literal") {
        result.push(token.char);
      } else {
        result.push(matchingChars[charIndex].char);
        charIndex++;
      }
    }
    return result.join("");
  }
  /**
   * Calculate new cursor position after formatting
   */
  calculateNewCursorPosition(oldValue, newValue, oldCursorPos) {
    if (oldValue.length === newValue.length) {
      return Math.min(oldCursorPos, newValue.length);
    }
    let newPos = 0;
    let oldCharsProcessed = 0;
    for (let i = 0; i < this.maskPattern.length && newPos < newValue.length && oldCharsProcessed < oldCursorPos; i++) {
      const token = this.maskPattern[i];
      if (token.type === "literal") {
        if (newValue[newPos] === token.char) {
          newPos++;
        }
      } else {
        newPos++;
        oldCharsProcessed++;
      }
    }
    while (newPos < newValue.length && newPos < this.maskPattern.length) {
      const token = this.maskPattern[newPos];
      if (token && token.type === "literal") {
        newPos++;
      } else {
        break;
      }
    }
    return newPos;
  }
  /**
   * Handle backspace with reversible mask
   */
  handleBackspace(cursorPos) {
    const currentValue = this.input.value;
    if (!currentValue) return;
    let deletePos = cursorPos - 1;
    while (deletePos >= 0) {
      const token = this.maskPattern[deletePos];
      if (token && token.type !== "literal") {
        break;
      }
      deletePos--;
    }
    if (deletePos >= 0) {
      const chars = currentValue.split("");
      chars[deletePos] = "";
      const newValue = chars.filter((c) => c !== "").join("");
      this.input.value = this.formatValue(newValue);
      this.setCursorPosition(deletePos);
    }
  }
  /**
   * Get current cursor position
   */
  getCursorPosition() {
    return this.input.selectionStart;
  }
  /**
   * Set cursor position
   */
  setCursorPosition(pos) {
    if (pos >= 0 && pos <= this.input.value.length) {
      this.input.setSelectionRange(pos, pos);
    }
  }
  /**
   * Check if the current value is complete (all mask positions filled)
   */
  isComplete() {
    const value = this.input.value;
    if (!value) return false;
    let requiredCount = 0;
    for (const token of this.maskPattern) {
      if (token.type !== "literal") {
        requiredCount++;
      }
    }
    const filledChars = value.replace(/[^\da-zA-Z]/g, "").length;
    return filledChars === requiredCount;
  }
  /**
   * Get unmasked value (for form submission)
   */
  getUnmaskedValue() {
    const value = this.input.value;
    if (!value) return "";
    return value.replace(/[^\da-zA-Z]/g, "");
  }
  /**
   * Validate value against mask pattern
   */
  validate(value) {
    if (!value) return false;
    const requiredCount = this.maskPattern.filter(
      (token) => token.type !== "literal"
    ).length;
    const validChars = value.replace(/[^\da-zA-Z]/g, "").length;
    return validChars >= requiredCount;
  }
}
function initInputMasks() {
  const maskedInputs = document.querySelectorAll("[data-mask]");
  console.log("[FormGlut Mask] Found", maskedInputs.length, "masked inputs");
  maskedInputs.forEach((input, index) => {
    if (input._inputMaskInstance) {
      console.log("[FormGlut Mask] Input", index, "already initialized");
      return;
    }
    if (input.readOnly) {
      console.log("[FormGlut Mask] Input", index, "is readOnly, skipping");
      return;
    }
    const mask = input.dataset.mask || "";
    const reversible = input.dataset.maskReversible === "1";
    const clearOnInvalid = input.dataset.maskClearInvalid === "1";
    console.log("[FormGlut Mask] Initializing input", index, {
      mask,
      reversible,
      clearOnInvalid,
      inputId: input.id
    });
    const maskInstance = new InputMask(input, {
      mask,
      reversible,
      clearOnInvalid
    });
    input._inputMaskInstance = maskInstance;
    console.log("[FormGlut Mask] Input", index, "initialized successfully");
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initInputMasks);
} else {
  if (typeof window !== "undefined" && document.body) {
    initInputMasks();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initInputMasks, 50);
});
if (typeof window !== "undefined") {
  window.initInputMasks = initInputMasks;
  window.InputMask = InputMask;
}
(function() {
  class FormGlutConditionalLogic {
    /**
     * Initialize conditional logic for a form
     * @param {HTMLFormElement} form - The form element
     */
    constructor(form) {
      this.form = form;
      this.fields = [];
      this.dependentsMap = {};
      this.init();
    }
    /**
     * Initialize the conditional logic system
     */
    init() {
      this.findConditionalFields();
      this.buildDependenciesMap();
      this.attachEventListeners();
      this.evaluateAll();
    }
    /**
     * Find all fields that have conditional logic configured
     */
    findConditionalFields() {
      const fieldElements = this.form.querySelectorAll("[data-conditional-logic]");
      fieldElements.forEach((fieldEl) => {
        try {
          const configJson = fieldEl.getAttribute("data-conditional-logic");
          const config = JSON.parse(configJson);
          if (config && config.enabled) {
            this.fields.push({
              element: fieldEl,
              config
            });
          }
        } catch (e) {
          console.warn("[FormGlut Conditional Logic] Invalid config for field:", fieldEl, e);
        }
      });
    }
    /**
     * Build a map of which fields depend on which other fields
     * This allows efficient re-evaluation when a field changes
     */
    buildDependenciesMap() {
      this.fields.forEach((field) => {
        field.config.rules.forEach((rule) => {
          if (!rule.field_id) return;
          if (!this.dependentsMap[rule.field_id]) {
            this.dependentsMap[rule.field_id] = [];
          }
          this.dependentsMap[rule.field_id].push(field);
        });
      });
    }
    /**
     * Attach event listeners to all input fields
     */
    attachEventListeners() {
      const inputs = this.form.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        input.addEventListener("change", (e) => this.handleFieldChange(e));
        input.addEventListener("input", (e) => this.handleFieldChange(e));
      });
    }
    /**
     * Handle field change event
     * @param {Event} e - The change event
     */
    handleFieldChange(e) {
      const target = e.target;
      const fieldId = this.getFieldId(target);
      if (this.dependentsMap[fieldId]) {
        this.dependentsMap[fieldId].forEach((dependentField) => {
          this.evaluateField(dependentField);
        });
      }
    }
    /**
     * Get the field ID from an input element
     * @param {HTMLElement} input - The input element
     * @returns {string} The field ID
     */
    getFieldId(input) {
      if (input.name) {
        return input.name.replace(/\[\]$/, "");
      }
      if (input.id) {
        return input.id;
      }
      const container = input.closest(".formglut-field");
      if (container) {
        const inputs = container.querySelectorAll("input, select, textarea");
        if (inputs.length > 0 && inputs[0].name) {
          return inputs[0].name.replace(/\[\]$/, "");
        }
      }
      return "";
    }
    /**
     * Get the current value of a field
     * @param {string} fieldId - The field ID/name
     * @returns {string|string[]} The field value(s)
     */
    getFieldValue(fieldId) {
      let input = this.form.querySelector(`[name="${fieldId}"]`);
      if (!input) {
        input = this.form.querySelector(`#${fieldId}`);
      }
      if (!input) {
        return "";
      }
      if (input.type === "checkbox" || input.type === "radio") {
        if (input.type === "radio") {
          const checked2 = this.form.querySelector(`[name="${fieldId}"]:checked`);
          return checked2 ? checked2.value : "";
        }
        const checked = this.form.querySelectorAll(`[name="${fieldId}[]"]:checked`);
        return Array.from(checked).map((cb) => cb.value);
      }
      if (input.tagName === "SELECT" && input.multiple) {
        return Array.from(input.selectedOptions).map((opt) => opt.value);
      }
      return input.value;
    }
    /**
     * Evaluate a single field's conditional logic
     * @param {Object} field - The field object with element and config
     */
    evaluateField(field) {
      const config = field.config;
      const matchType = config.match || "any";
      const rules = config.rules || [];
      if (rules.length === 0) {
        this.showField(field.element);
        return;
      }
      let result;
      if (matchType === "all") {
        result = rules.every((rule) => this.evaluateRule(rule));
      } else {
        result = rules.some((rule) => this.evaluateRule(rule));
      }
      if (result) {
        this.showField(field.element);
      } else {
        this.hideField(field.element);
      }
    }
    /**
     * Evaluate a single conditional rule
     * @param {Object} rule - The rule object with field_id, operator, value
     * @returns {boolean} Whether the rule passes
     */
    evaluateRule(rule) {
      const fieldValue = this.getFieldValue(rule.field_id);
      const compareValue = rule.value || "";
      const fieldValues = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
      switch (rule.operator) {
        case "is":
          return fieldValues.some((v) => v === compareValue);
        case "is_not":
          return !fieldValues.some((v) => v === compareValue);
        case "contains":
          return fieldValues.some((v) => v && v.toString().indexOf(compareValue) !== -1);
        case "not_contains":
          return !fieldValues.some((v) => v && v.toString().indexOf(compareValue) !== -1);
        case "starts_with":
          return fieldValues.some((v) => v && v.toString().indexOf(compareValue) === 0);
        case "ends_with":
          return fieldValues.some((v) => {
            const str = v.toString();
            return str.indexOf(compareValue) === str.length - compareValue.length;
          });
        case "greater_than":
          return fieldValues.some((v) => {
            const num = parseFloat(v);
            const compareNum = parseFloat(compareValue);
            return !isNaN(num) && !isNaN(compareNum) && num > compareNum;
          });
        case "less_than":
          return fieldValues.some((v) => {
            const num = parseFloat(v);
            const compareNum = parseFloat(compareValue);
            return !isNaN(num) && !isNaN(compareNum) && num < compareNum;
          });
        case "is_empty":
          return fieldValues.every((v) => !v || v.toString().trim() === "");
        case "is_not_empty":
          return fieldValues.some((v) => v && v.toString().trim() !== "");
        default:
          return false;
      }
    }
    /**
     * Show a field
     * @param {HTMLElement} fieldEl - The field element
     */
    showField(fieldEl) {
      fieldEl.style.display = "";
      const inputs = fieldEl.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        input.removeAttribute("data-conditional-disabled");
      });
      fieldEl.classList.remove("formglut-conditional-hidden");
    }
    /**
     * Hide a field
     * @param {HTMLElement} fieldEl - The field element
     */
    hideField(fieldEl) {
      fieldEl.style.display = "none";
      const inputs = fieldEl.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        input.setAttribute("data-conditional-disabled", "true");
      });
      fieldEl.classList.add("formglut-conditional-hidden");
    }
    /**
     * Evaluate all conditional fields
     */
    evaluateAll() {
      this.fields.forEach((field) => this.evaluateField(field));
    }
    /**
     * Destroy the conditional logic instance
     */
    destroy() {
      const inputs = this.form.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        input.removeEventListener("change", this.handleFieldChange);
        input.removeEventListener("input", this.handleFieldChange);
      });
      this.fields = [];
      this.dependentsMap = {};
    }
  }
  function initConditionalLogic() {
    const forms = document.querySelectorAll(".formglut-form");
    forms.forEach((form) => {
      if (!form.hasAttribute("data-conditional-init")) {
        form.setAttribute("data-conditional-init", "true");
        new FormGlutConditionalLogic(form);
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initConditionalLogic);
  } else {
    initConditionalLogic();
  }
  const observer = new MutationObserver((mutations) => {
    let shouldInit = false;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.classList && node.classList.contains("formglut-form")) {
            shouldInit = true;
          } else if (node.querySelector) {
            const forms = node.querySelectorAll(".formglut-form");
            if (forms.length > 0) {
              shouldInit = true;
            }
          }
        }
      });
    });
    if (shouldInit) {
      initConditionalLogic();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  window.FormGlutConditionalLogic = FormGlutConditionalLogic;
})();
function initSteps(form, validate) {
  const breaks = Array.from(form.children).filter((el) => el.classList.contains("formglut-step-break"));
  if (!breaks.length) return;
  const style = form.dataset.stepProgress || "steps";
  const firstTitle = form.dataset.firstStep || __("Step 1", "formglut");
  const checkEachStep = form.dataset.stepValidate !== "0";
  const fixed = (el) => el.tagName === "INPUT" || el.classList.contains("formglut-hp") || el.classList.contains("formglut-form-message") || el.classList.contains("formglut-form-actions") || el.classList.contains("formglut-form-title") || el.tagName === "STYLE";
  const steps = [];
  let current = { title: firstTitle, nodes: [], next: "", prev: "" };
  Array.from(form.children).forEach((el) => {
    if (el.classList.contains("formglut-step-break")) {
      current.next = el.dataset.next;
      steps.push(current);
      current = { title: el.dataset.title || sprintf(__("Step %d", "formglut"), steps.length + 1), nodes: [], prev: el.dataset.prev, next: "" };
      el.remove();
      return;
    }
    if (!fixed(el)) current.nodes.push(el);
  });
  steps.push(current);
  const actions = form.querySelector(".formglut-form-actions");
  const anchor = form.querySelector(".formglut-form-message") || null;
  let progress = null;
  if (style !== "none") {
    progress = document.createElement("div");
    progress.className = "formglut-progress formglut-progress-" + style;
    progress.innerHTML = style === "bar" ? '<div class="formglut-progress-head"><span class="formglut-progress-title"></span><span class="formglut-progress-count"></span></div><div class="formglut-progress-track"><span></span></div>' : "<ol>" + steps.map((st, i) => `<li><span class="num">${i + 1}</span><span class="txt"></span></li>`).join("") + "</ol>";
    if (style !== "bar") progress.querySelectorAll(".txt").forEach((t, i) => {
      t.textContent = steps[i].title;
    });
    form.insertBefore(progress, form.firstElementChild);
  }
  const panes = steps.map((st, i) => {
    const pane = document.createElement("div");
    pane.className = "formglut-step";
    pane.dataset.step = String(i);
    st.nodes.forEach((n) => pane.appendChild(n));
    const nav = document.createElement("div");
    nav.className = "formglut-step-nav";
    if (i > 0) nav.innerHTML += `<button type="button" class="formglut-step-prev"></button>`;
    if (i < steps.length - 1) nav.innerHTML += `<button type="button" class="formglut-step-next"></button>`;
    const prevBtn = nav.querySelector(".formglut-step-prev");
    const nextBtn = nav.querySelector(".formglut-step-next");
    if (prevBtn) prevBtn.textContent = st.prev || __("Previous", "formglut");
    if (nextBtn) nextBtn.textContent = st.next || __("Next", "formglut");
    if (nav.children.length) pane.appendChild(nav);
    form.insertBefore(pane, actions || anchor);
    return pane;
  });
  const lastNav = panes[panes.length - 1].querySelector(".formglut-step-nav");
  if (actions && lastNav) {
    lastNav.appendChild(actions);
    lastNav.classList.add("has-submit");
  }
  const go = (to) => {
    panes.forEach((p, i) => {
      p.hidden = i !== to;
    });
    form.dataset.currentStep = String(to);
    if (actions && !lastNav) actions.hidden = to !== panes.length - 1;
    if (progress) {
      if (style === "bar") {
        progress.querySelector(".formglut-progress-title").textContent = steps[to].title;
        progress.querySelector(".formglut-progress-count").textContent = sprintf(__("Step %1$d of %2$d", "formglut"), to + 1, steps.length);
        progress.querySelector(".formglut-progress-track span").style.width = (to + 1) / steps.length * 100 + "%";
      } else {
        progress.querySelectorAll("li").forEach((li, i) => {
          li.classList.toggle("done", i < to);
          li.classList.toggle("active", i === to);
        });
      }
    }
  };
  form.addEventListener("click", (e) => {
    const next = e.target.closest(".formglut-step-next");
    const prev = e.target.closest(".formglut-step-prev");
    if (!next && !prev) return;
    const at = Number(form.dataset.currentStep || 0);
    if (next) {
      form.querySelectorAll('.formglut-step[data-step="' + at + '"] .formglut-field-error').forEach((el) => el.remove());
      if (checkEachStep) {
        const bad = validate(panes[at]);
        if (bad.length) {
          bad[0].focus();
          return;
        }
      }
      go(Math.min(at + 1, panes.length - 1));
    } else {
      go(Math.max(at - 1, 0));
    }
    (progress || form).scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  form.formglutGoToStep = go;
  go(0);
}
function showStepOf(form, el) {
  var _a;
  const pane = (_a = el == null ? void 0 : el.closest) == null ? void 0 : _a.call(el, ".formglut-step");
  if (pane && form.formglutGoToStep) form.formglutGoToStep(Number(pane.dataset.step));
}
function resetSteps(form) {
  if (form.formglutGoToStep) form.formglutGoToStep(0);
}
function checkFiles(input) {
  const files = Array.from(input.files || []);
  const max = Number(input.dataset.maxFiles || 1);
  const maxSize = Number(input.dataset.maxSize || 0);
  const types = (input.dataset.types || "").split(",").filter(Boolean);
  let msg = "";
  if (files.length > max) {
    msg = sprintf(__("You can upload up to %d files.", "formglut"), max);
  } else {
    for (const f of files) {
      const ext = (f.name.split(".").pop() || "").toLowerCase();
      if (types.length && !types.includes(ext)) {
        msg = sprintf(__("%1$s is not an allowed file type. Allowed: %2$s.", "formglut"), f.name, types.join(", ").toUpperCase());
        break;
      }
      if (maxSize && f.size > maxSize) {
        msg = sprintf(__("%1$s is larger than %2$s MB.", "formglut"), f.name, (maxSize / 1048576).toFixed(1).replace(/\.0$/, ""));
        break;
      }
    }
  }
  input.setCustomValidity(msg);
  return msg;
}
function showNames(input) {
  const box = input.closest(".formglut-upload");
  const out = box == null ? void 0 : box.querySelector(".formglut-upload-names");
  if (!out) return;
  if (!out.dataset.empty) out.dataset.empty = out.textContent;
  const names = Array.from(input.files || []).map((f) => f.name);
  out.textContent = names.length ? names.join(", ") : out.dataset.empty;
  box.classList.toggle("has-files", names.length > 0);
}
function initUploads(form) {
  form.querySelectorAll(".formglut-file-input").forEach((input) => {
    const box = input.closest(".formglut-upload");
    input.addEventListener("change", () => {
      var _a;
      showNames(input);
      const msg = checkFiles(input);
      const field = input.closest(".formglut-field");
      (_a = field == null ? void 0 : field.querySelector(".formglut-field-error")) == null ? void 0 : _a.remove();
      input.classList.toggle("formglut-input-error", !!msg);
      if (msg && field) {
        const err = document.createElement("div");
        err.className = "formglut-field-error";
        err.textContent = msg;
        field.appendChild(err);
      }
    });
    if (!box) return;
    ["dragenter", "dragover"].forEach((ev) => box.addEventListener(ev, (e) => {
      e.preventDefault();
      box.classList.add("is-drag");
    }));
    ["dragleave", "drop"].forEach((ev) => box.addEventListener(ev, (e) => {
      e.preventDefault();
      box.classList.remove("is-drag");
    }));
    box.addEventListener("drop", (e) => {
      var _a;
      const dropped = Array.from(((_a = e.dataTransfer) == null ? void 0 : _a.files) || []);
      if (!dropped.length) return;
      const dt = new DataTransfer();
      (input.multiple ? dropped : dropped.slice(0, 1)).forEach((f) => dt.items.add(f));
      input.files = dt.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
  form.addEventListener("reset", () => setTimeout(() => form.querySelectorAll(".formglut-file-input").forEach((i) => {
    i.setCustomValidity("");
    showNames(i);
  }), 0));
}
function syncRichText(area) {
  const box = area.closest(".formglut-richtext");
  const out = box == null ? void 0 : box.querySelector(".formglut-richtext-value");
  if (!out) return;
  const text = area.textContent.trim();
  out.value = text ? area.innerHTML : "";
  const max = Number(area.dataset.maxLength || 0);
  box.classList.toggle("is-empty", !text);
  if (max) out.setCustomValidity(text.length > max ? __("This text is too long.", "formglut") : "");
}
function initExtraFields(form) {
  form.querySelectorAll(".formglut-richtext-area").forEach((area) => {
    syncRichText(area);
    area.addEventListener("input", () => syncRichText(area));
    area.addEventListener("paste", (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData("text/plain");
      document.execCommand("insertText", false, text);
    });
  });
  form.addEventListener("click", (e) => {
    const tool = e.target.closest(".formglut-richtext-bar button");
    if (!tool) return;
    e.preventDefault();
    const area = tool.closest(".formglut-richtext").querySelector(".formglut-richtext-area");
    area.focus();
    const cmd = tool.dataset.cmd;
    if (cmd === "createLink") {
      const url = window.prompt(__("Link address (https://…)", "formglut"), "https://");
      if (url && /^(https?:|mailto:)/i.test(url)) document.execCommand("createLink", false, url);
    } else if (cmd === "formatBlock") {
      document.execCommand("formatBlock", false, "blockquote");
    } else {
      document.execCommand(cmd, false, null);
    }
    syncRichText(area);
  });
  form.addEventListener("change", (e) => {
    var _a;
    const star = e.target.closest(".formglut-star-input");
    if (!star) return;
    const word = (_a = star.closest(".formglut-field")) == null ? void 0 : _a.querySelector(".formglut-star-word");
    if (word) word.textContent = star.dataset.word || "";
  });
  form.addEventListener("click", (e) => {
    const reset = e.target.closest(".formglut-reset-btn");
    if (reset && reset.dataset.confirm && !window.confirm(reset.dataset.confirm)) e.preventDefault();
  });
  form.addEventListener("reset", () => setTimeout(() => {
    form.querySelectorAll(".formglut-richtext-area").forEach((area) => {
      area.innerHTML = "";
      syncRichText(area);
    });
    form.querySelectorAll(".formglut-star-word").forEach((w) => {
      w.textContent = "";
    });
    form.querySelectorAll(".formglut-field-error").forEach((el) => el.remove());
    form.querySelectorAll(".formglut-input-error").forEach((el) => el.classList.remove("formglut-input-error"));
    if (form.formglutGoToStep) form.formglutGoToStep(0);
  }, 0));
}
var HOOKS = [
  "onChange",
  "onClose",
  "onDayCreate",
  "onDestroy",
  "onKeyDown",
  "onMonthChange",
  "onOpen",
  "onParseConfig",
  "onReady",
  "onValueUpdate",
  "onYearChange",
  "onPreCalendarPosition"
];
var defaults = {
  _disable: [],
  allowInput: false,
  allowInvalidPreload: false,
  altFormat: "F j, Y",
  altInput: false,
  altInputClass: "form-control input",
  animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
  ariaDateFormat: "F j, Y",
  autoFillDefaultTime: true,
  clickOpens: true,
  closeOnSelect: true,
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultHour: 12,
  defaultMinute: 0,
  defaultSeconds: 0,
  disable: [],
  disableMobile: false,
  enableSeconds: false,
  enableTime: false,
  errorHandler: function(err) {
    return typeof console !== "undefined" && console.warn(err);
  },
  getWeek: function(givenDate) {
    var date = new Date(givenDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
  },
  hourIncrement: 1,
  ignoredFocusElements: [],
  inline: false,
  locale: "default",
  minuteIncrement: 5,
  mode: "single",
  monthSelectorType: "dropdown",
  nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
  noCalendar: false,
  now: /* @__PURE__ */ new Date(),
  onChange: [],
  onClose: [],
  onDayCreate: [],
  onDestroy: [],
  onKeyDown: [],
  onMonthChange: [],
  onOpen: [],
  onParseConfig: [],
  onReady: [],
  onValueUpdate: [],
  onYearChange: [],
  onPreCalendarPosition: [],
  plugins: [],
  position: "auto",
  positionElement: void 0,
  prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
  shorthandCurrentMonth: false,
  showMonths: 1,
  static: false,
  time_24hr: false,
  weekNumbers: false,
  wrap: false
};
var english = {
  weekdays: {
    shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longhand: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  months: {
    shorthand: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    longhand: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  firstDayOfWeek: 0,
  ordinal: function(nth) {
    var s = nth % 100;
    if (s > 3 && s < 21)
      return "th";
    switch (s % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle",
  amPM: ["AM", "PM"],
  yearAriaLabel: "Year",
  monthAriaLabel: "Month",
  hourAriaLabel: "Hour",
  minuteAriaLabel: "Minute",
  time_24hr: false
};
var pad = function(number, length) {
  if (length === void 0) {
    length = 2;
  }
  return ("000" + number).slice(length * -1);
};
var int = function(bool) {
  return bool === true ? 1 : 0;
};
function debounce(fn, wait) {
  var t;
  return function() {
    var _this = this;
    var args = arguments;
    clearTimeout(t);
    t = setTimeout(function() {
      return fn.apply(_this, args);
    }, wait);
  };
}
var arrayify = function(obj) {
  return obj instanceof Array ? obj : [obj];
};
function toggleClass(elem, className, bool) {
  if (bool === true)
    return elem.classList.add(className);
  elem.classList.remove(className);
}
function createElement(tag, className, content) {
  var e = window.document.createElement(tag);
  className = className || "";
  content = content || "";
  e.className = className;
  if (content !== void 0)
    e.textContent = content;
  return e;
}
function clearNode(node) {
  while (node.firstChild)
    node.removeChild(node.firstChild);
}
function findParent(node, condition) {
  if (condition(node))
    return node;
  else if (node.parentNode)
    return findParent(node.parentNode, condition);
  return void 0;
}
function createNumberInput(inputClassName, opts) {
  var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
    numInput.type = "number";
  } else {
    numInput.type = "text";
    numInput.pattern = "\\d*";
  }
  if (opts !== void 0)
    for (var key in opts)
      numInput.setAttribute(key, opts[key]);
  wrapper.appendChild(numInput);
  wrapper.appendChild(arrowUp);
  wrapper.appendChild(arrowDown);
  return wrapper;
}
function getEventTarget(event) {
  try {
    if (typeof event.composedPath === "function") {
      var path = event.composedPath();
      return path[0];
    }
    return event.target;
  } catch (error) {
    return event.target;
  }
}
var doNothing = function() {
  return void 0;
};
var monthToStr = function(monthNumber, shorthand, locale) {
  return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
};
var revFormat = {
  D: doNothing,
  F: function(dateObj, monthName, locale) {
    dateObj.setMonth(locale.months.longhand.indexOf(monthName));
  },
  G: function(dateObj, hour) {
    dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
  },
  H: function(dateObj, hour) {
    dateObj.setHours(parseFloat(hour));
  },
  J: function(dateObj, day) {
    dateObj.setDate(parseFloat(day));
  },
  K: function(dateObj, amPM, locale) {
    dateObj.setHours(dateObj.getHours() % 12 + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
  },
  M: function(dateObj, shortMonth, locale) {
    dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
  },
  S: function(dateObj, seconds) {
    dateObj.setSeconds(parseFloat(seconds));
  },
  U: function(_, unixSeconds) {
    return new Date(parseFloat(unixSeconds) * 1e3);
  },
  W: function(dateObj, weekNum, locale) {
    var weekNumber = parseInt(weekNum);
    var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
    return date;
  },
  Y: function(dateObj, year) {
    dateObj.setFullYear(parseFloat(year));
  },
  Z: function(_, ISODate) {
    return new Date(ISODate);
  },
  d: function(dateObj, day) {
    dateObj.setDate(parseFloat(day));
  },
  h: function(dateObj, hour) {
    dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
  },
  i: function(dateObj, minutes) {
    dateObj.setMinutes(parseFloat(minutes));
  },
  j: function(dateObj, day) {
    dateObj.setDate(parseFloat(day));
  },
  l: doNothing,
  m: function(dateObj, month) {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  n: function(dateObj, month) {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  s: function(dateObj, seconds) {
    dateObj.setSeconds(parseFloat(seconds));
  },
  u: function(_, unixMillSeconds) {
    return new Date(parseFloat(unixMillSeconds));
  },
  w: doNothing,
  y: function(dateObj, year) {
    dateObj.setFullYear(2e3 + parseFloat(year));
  }
};
var tokenRegex = {
  D: "",
  F: "",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "",
  M: "",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})"
};
var formats = {
  Z: function(date) {
    return date.toISOString();
  },
  D: function(date, locale, options) {
    return locale.weekdays.shorthand[formats.w(date, locale, options)];
  },
  F: function(date, locale, options) {
    return monthToStr(formats.n(date, locale, options) - 1, false, locale);
  },
  G: function(date, locale, options) {
    return pad(formats.h(date, locale, options));
  },
  H: function(date) {
    return pad(date.getHours());
  },
  J: function(date, locale) {
    return locale.ordinal !== void 0 ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
  },
  K: function(date, locale) {
    return locale.amPM[int(date.getHours() > 11)];
  },
  M: function(date, locale) {
    return monthToStr(date.getMonth(), true, locale);
  },
  S: function(date) {
    return pad(date.getSeconds());
  },
  U: function(date) {
    return date.getTime() / 1e3;
  },
  W: function(date, _, options) {
    return options.getWeek(date);
  },
  Y: function(date) {
    return pad(date.getFullYear(), 4);
  },
  d: function(date) {
    return pad(date.getDate());
  },
  h: function(date) {
    return date.getHours() % 12 ? date.getHours() % 12 : 12;
  },
  i: function(date) {
    return pad(date.getMinutes());
  },
  j: function(date) {
    return date.getDate();
  },
  l: function(date, locale) {
    return locale.weekdays.longhand[date.getDay()];
  },
  m: function(date) {
    return pad(date.getMonth() + 1);
  },
  n: function(date) {
    return date.getMonth() + 1;
  },
  s: function(date) {
    return date.getSeconds();
  },
  u: function(date) {
    return date.getTime();
  },
  w: function(date) {
    return date.getDay();
  },
  y: function(date) {
    return String(date.getFullYear()).substring(2);
  }
};
var createDateFormatter = function(_a) {
  var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
  return function(dateObj, frmt, overrideLocale) {
    var locale = overrideLocale || l10n;
    if (config.formatDate !== void 0 && !isMobile) {
      return config.formatDate(dateObj, frmt, locale);
    }
    return frmt.split("").map(function(c, i, arr) {
      return formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "";
    }).join("");
  };
};
var createDateParser = function(_a) {
  var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
  return function(date, givenFormat, timeless, customLocale) {
    if (date !== 0 && !date)
      return void 0;
    var locale = customLocale || l10n;
    var parsedDate;
    var dateOrig = date;
    if (date instanceof Date)
      parsedDate = new Date(date.getTime());
    else if (typeof date !== "string" && date.toFixed !== void 0)
      parsedDate = new Date(date);
    else if (typeof date === "string") {
      var format = givenFormat || (config || defaults).dateFormat;
      var datestr = String(date).trim();
      if (datestr === "today") {
        parsedDate = /* @__PURE__ */ new Date();
        timeless = true;
      } else if (config && config.parseDate) {
        parsedDate = config.parseDate(date, format);
      } else if (/Z$/.test(datestr) || /GMT$/.test(datestr)) {
        parsedDate = new Date(date);
      } else {
        var matched = void 0, ops = [];
        for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
          var token = format[i];
          var isBackSlash = token === "\\";
          var escaped = format[i - 1] === "\\" || isBackSlash;
          if (tokenRegex[token] && !escaped) {
            regexStr += tokenRegex[token];
            var match = new RegExp(regexStr).exec(date);
            if (match && (matched = true)) {
              ops[token !== "Y" ? "push" : "unshift"]({
                fn: revFormat[token],
                val: match[++matchIndex]
              });
            }
          } else if (!isBackSlash)
            regexStr += ".";
        }
        parsedDate = !config || !config.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
        ops.forEach(function(_a2) {
          var fn = _a2.fn, val = _a2.val;
          return parsedDate = fn(parsedDate, val, locale) || parsedDate;
        });
        parsedDate = matched ? parsedDate : void 0;
      }
    }
    if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
      config.errorHandler(new Error("Invalid date provided: " + dateOrig));
      return void 0;
    }
    if (timeless === true)
      parsedDate.setHours(0, 0, 0, 0);
    return parsedDate;
  };
};
function compareDates(date1, date2, timeless) {
  if (timeless === void 0) {
    timeless = true;
  }
  if (timeless !== false) {
    return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
  }
  return date1.getTime() - date2.getTime();
}
var isBetween = function(ts, ts1, ts2) {
  return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
var calculateSecondsSinceMidnight = function(hours, minutes, seconds) {
  return hours * 3600 + minutes * 60 + seconds;
};
var parseSeconds = function(secondsSinceMidnight) {
  var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
  return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
};
var duration = {
  DAY: 864e5
};
function getDefaultHours(config) {
  var hours = config.defaultHour;
  var minutes = config.defaultMinute;
  var seconds = config.defaultSeconds;
  if (config.minDate !== void 0) {
    var minHour = config.minDate.getHours();
    var minMinutes = config.minDate.getMinutes();
    var minSeconds = config.minDate.getSeconds();
    if (hours < minHour) {
      hours = minHour;
    }
    if (hours === minHour && minutes < minMinutes) {
      minutes = minMinutes;
    }
    if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
      seconds = config.minDate.getSeconds();
  }
  if (config.maxDate !== void 0) {
    var maxHr = config.maxDate.getHours();
    var maxMinutes = config.maxDate.getMinutes();
    hours = Math.min(hours, maxHr);
    if (hours === maxHr)
      minutes = Math.min(maxMinutes, minutes);
    if (hours === maxHr && minutes === maxMinutes)
      seconds = config.maxDate.getSeconds();
  }
  return { hours, minutes, seconds };
}
if (typeof Object.assign !== "function") {
  Object.assign = function(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (!target) {
      throw TypeError("Cannot convert undefined or null to object");
    }
    var _loop_1 = function(source2) {
      if (source2) {
        Object.keys(source2).forEach(function(key) {
          return target[key] = source2[key];
        });
      }
    };
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
      var source = args_1[_a];
      _loop_1(source);
    }
    return target;
  };
}
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArrays = function() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
};
var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
  var self = {
    config: __assign(__assign({}, defaults), flatpickr.defaultConfig),
    l10n: english
  };
  self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
  self._handlers = [];
  self.pluginElements = [];
  self.loadedPlugins = [];
  self._bind = bind;
  self._setHoursFromDate = setHoursFromDate;
  self._positionCalendar = positionCalendar;
  self.changeMonth = changeMonth;
  self.changeYear = changeYear;
  self.clear = clear;
  self.close = close;
  self.onMouseOver = onMouseOver;
  self._createElement = createElement;
  self.createDay = createDay;
  self.destroy = destroy;
  self.isEnabled = isEnabled;
  self.jumpToDate = jumpToDate;
  self.updateValue = updateValue;
  self.open = open;
  self.redraw = redraw;
  self.set = set;
  self.setDate = setDate;
  self.toggle = toggle;
  function setupHelperFunctions() {
    self.utils = {
      getDaysInMonth: function(month, yr) {
        if (month === void 0) {
          month = self.currentMonth;
        }
        if (yr === void 0) {
          yr = self.currentYear;
        }
        if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0))
          return 29;
        return self.l10n.daysInMonth[month];
      }
    };
  }
  function init() {
    self.element = self.input = element;
    self.isOpen = false;
    parseConfig();
    setupLocale();
    setupInputs();
    setupDates();
    setupHelperFunctions();
    if (!self.isMobile)
      build();
    bindEvents();
    if (self.selectedDates.length || self.config.noCalendar) {
      if (self.config.enableTime) {
        setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : void 0);
      }
      updateValue(false);
    }
    setCalendarWidth();
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!self.isMobile && isSafari) {
      positionCalendar();
    }
    triggerEvent("onReady");
  }
  function getClosestActiveElement() {
    var _a;
    return ((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode()).activeElement || document.activeElement;
  }
  function bindToInstance(fn) {
    return fn.bind(self);
  }
  function setCalendarWidth() {
    var config = self.config;
    if (config.weekNumbers === false && config.showMonths === 1) {
      return;
    } else if (config.noCalendar !== true) {
      window.requestAnimationFrame(function() {
        if (self.calendarContainer !== void 0) {
          self.calendarContainer.style.visibility = "hidden";
          self.calendarContainer.style.display = "block";
        }
        if (self.daysContainer !== void 0) {
          var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
          self.daysContainer.style.width = daysWidth + "px";
          self.calendarContainer.style.width = daysWidth + (self.weekWrapper !== void 0 ? self.weekWrapper.offsetWidth : 0) + "px";
          self.calendarContainer.style.removeProperty("visibility");
          self.calendarContainer.style.removeProperty("display");
        }
      });
    }
  }
  function updateTime(e) {
    if (self.selectedDates.length === 0) {
      var defaultDate = self.config.minDate === void 0 || compareDates(/* @__PURE__ */ new Date(), self.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(self.config.minDate.getTime());
      var defaults2 = getDefaultHours(self.config);
      defaultDate.setHours(defaults2.hours, defaults2.minutes, defaults2.seconds, defaultDate.getMilliseconds());
      self.selectedDates = [defaultDate];
      self.latestSelectedDateObj = defaultDate;
    }
    if (e !== void 0 && e.type !== "blur") {
      timeWrapper(e);
    }
    var prevValue = self._input.value;
    setHoursFromInputs();
    updateValue();
    if (self._input.value !== prevValue) {
      self._debouncedChange();
    }
  }
  function ampm2military(hour, amPM) {
    return hour % 12 + 12 * int(amPM === self.l10n.amPM[1]);
  }
  function military2ampm(hour) {
    switch (hour % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return hour % 12;
    }
  }
  function setHoursFromInputs() {
    if (self.hourElement === void 0 || self.minuteElement === void 0)
      return;
    var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== void 0 ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;
    if (self.amPM !== void 0) {
      hours = ampm2military(hours, self.amPM.textContent);
    }
    var limitMinHours = self.config.minTime !== void 0 || self.config.minDate && self.minDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.minDate, true) === 0;
    var limitMaxHours = self.config.maxTime !== void 0 || self.config.maxDate && self.maxDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.maxDate, true) === 0;
    if (self.config.maxTime !== void 0 && self.config.minTime !== void 0 && self.config.minTime > self.config.maxTime) {
      var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
      var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
      var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
      if (currentTime > maxBound && currentTime < minBound) {
        var result = parseSeconds(minBound);
        hours = result[0];
        minutes = result[1];
        seconds = result[2];
      }
    } else {
      if (limitMaxHours) {
        var maxTime = self.config.maxTime !== void 0 ? self.config.maxTime : self.config.maxDate;
        hours = Math.min(hours, maxTime.getHours());
        if (hours === maxTime.getHours())
          minutes = Math.min(minutes, maxTime.getMinutes());
        if (minutes === maxTime.getMinutes())
          seconds = Math.min(seconds, maxTime.getSeconds());
      }
      if (limitMinHours) {
        var minTime = self.config.minTime !== void 0 ? self.config.minTime : self.config.minDate;
        hours = Math.max(hours, minTime.getHours());
        if (hours === minTime.getHours() && minutes < minTime.getMinutes())
          minutes = minTime.getMinutes();
        if (minutes === minTime.getMinutes())
          seconds = Math.max(seconds, minTime.getSeconds());
      }
    }
    setHours(hours, minutes, seconds);
  }
  function setHoursFromDate(dateObj) {
    var date = dateObj || self.latestSelectedDateObj;
    if (date && date instanceof Date) {
      setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
  }
  function setHours(hours, minutes, seconds) {
    if (self.latestSelectedDateObj !== void 0) {
      self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
    }
    if (!self.hourElement || !self.minuteElement || self.isMobile)
      return;
    self.hourElement.value = pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * int(hours % 12 === 0) : hours);
    self.minuteElement.value = pad(minutes);
    if (self.amPM !== void 0)
      self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
    if (self.secondElement !== void 0)
      self.secondElement.value = pad(seconds);
  }
  function onYearInput(event) {
    var eventTarget = getEventTarget(event);
    var year = parseInt(eventTarget.value) + (event.delta || 0);
    if (year / 1e3 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) {
      changeYear(year);
    }
  }
  function bind(element2, event, handler, options) {
    if (event instanceof Array)
      return event.forEach(function(ev) {
        return bind(element2, ev, handler, options);
      });
    if (element2 instanceof Array)
      return element2.forEach(function(el) {
        return bind(el, event, handler, options);
      });
    element2.addEventListener(event, handler, options);
    self._handlers.push({
      remove: function() {
        return element2.removeEventListener(event, handler, options);
      }
    });
  }
  function triggerChange() {
    triggerEvent("onChange");
  }
  function bindEvents() {
    if (self.config.wrap) {
      ["open", "close", "toggle", "clear"].forEach(function(evt) {
        Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function(el) {
          return bind(el, "click", self[evt]);
        });
      });
    }
    if (self.isMobile) {
      setupMobile();
      return;
    }
    var debouncedResize = debounce(onResize, 50);
    self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
    if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
      bind(self.daysContainer, "mouseover", function(e) {
        if (self.config.mode === "range")
          onMouseOver(getEventTarget(e));
      });
    bind(self._input, "keydown", onKeyDown);
    if (self.calendarContainer !== void 0) {
      bind(self.calendarContainer, "keydown", onKeyDown);
    }
    if (!self.config.inline && !self.config.static)
      bind(window, "resize", debouncedResize);
    if (window.ontouchstart !== void 0)
      bind(window.document, "touchstart", documentClick);
    else
      bind(window.document, "mousedown", documentClick);
    bind(window.document, "focus", documentClick, { capture: true });
    if (self.config.clickOpens === true) {
      bind(self._input, "focus", self.open);
      bind(self._input, "click", self.open);
    }
    if (self.daysContainer !== void 0) {
      bind(self.monthNav, "click", onMonthNavClick);
      bind(self.monthNav, ["keyup", "increment"], onYearInput);
      bind(self.daysContainer, "click", selectDate);
    }
    if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0) {
      var selText = function(e) {
        return getEventTarget(e).select();
      };
      bind(self.timeContainer, ["increment"], updateTime);
      bind(self.timeContainer, "blur", updateTime, { capture: true });
      bind(self.timeContainer, "click", timeIncrement);
      bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
      if (self.secondElement !== void 0)
        bind(self.secondElement, "focus", function() {
          return self.secondElement && self.secondElement.select();
        });
      if (self.amPM !== void 0) {
        bind(self.amPM, "click", function(e) {
          updateTime(e);
        });
      }
    }
    if (self.config.allowInput) {
      bind(self._input, "blur", onBlur);
    }
  }
  function jumpToDate(jumpDate, triggerChange2) {
    var jumpTo = jumpDate !== void 0 ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate && self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);
    var oldYear = self.currentYear;
    var oldMonth = self.currentMonth;
    try {
      if (jumpTo !== void 0) {
        self.currentYear = jumpTo.getFullYear();
        self.currentMonth = jumpTo.getMonth();
      }
    } catch (e) {
      e.message = "Invalid date supplied: " + jumpTo;
      self.config.errorHandler(e);
    }
    if (triggerChange2 && self.currentYear !== oldYear) {
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    if (triggerChange2 && (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
      triggerEvent("onMonthChange");
    }
    self.redraw();
  }
  function timeIncrement(e) {
    var eventTarget = getEventTarget(e);
    if (~eventTarget.className.indexOf("arrow"))
      incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
  }
  function incrementNumInput(e, delta, inputElem) {
    var target = e && getEventTarget(e);
    var input = inputElem || target && target.parentNode && target.parentNode.firstChild;
    var event = createEvent("increment");
    event.delta = delta;
    input && input.dispatchEvent(event);
  }
  function build() {
    var fragment = window.document.createDocumentFragment();
    self.calendarContainer = createElement("div", "flatpickr-calendar");
    self.calendarContainer.tabIndex = -1;
    if (!self.config.noCalendar) {
      fragment.appendChild(buildMonthNav());
      self.innerContainer = createElement("div", "flatpickr-innerContainer");
      if (self.config.weekNumbers) {
        var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
        self.innerContainer.appendChild(weekWrapper);
        self.weekNumbers = weekNumbers;
        self.weekWrapper = weekWrapper;
      }
      self.rContainer = createElement("div", "flatpickr-rContainer");
      self.rContainer.appendChild(buildWeekdays());
      if (!self.daysContainer) {
        self.daysContainer = createElement("div", "flatpickr-days");
        self.daysContainer.tabIndex = -1;
      }
      buildDays();
      self.rContainer.appendChild(self.daysContainer);
      self.innerContainer.appendChild(self.rContainer);
      fragment.appendChild(self.innerContainer);
    }
    if (self.config.enableTime) {
      fragment.appendChild(buildTime());
    }
    toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
    toggleClass(self.calendarContainer, "animate", self.config.animate === true);
    toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
    self.calendarContainer.appendChild(fragment);
    var customAppend = self.config.appendTo !== void 0 && self.config.appendTo.nodeType !== void 0;
    if (self.config.inline || self.config.static) {
      self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
      if (self.config.inline) {
        if (!customAppend && self.element.parentNode)
          self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
        else if (self.config.appendTo !== void 0)
          self.config.appendTo.appendChild(self.calendarContainer);
      }
      if (self.config.static) {
        var wrapper = createElement("div", "flatpickr-wrapper");
        if (self.element.parentNode)
          self.element.parentNode.insertBefore(wrapper, self.element);
        wrapper.appendChild(self.element);
        if (self.altInput)
          wrapper.appendChild(self.altInput);
        wrapper.appendChild(self.calendarContainer);
      }
    }
    if (!self.config.static && !self.config.inline)
      (self.config.appendTo !== void 0 ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
  }
  function createDay(className, date, _dayNumber, i) {
    var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
    dayElement.dateObj = date;
    dayElement.$i = i;
    dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
    if (className.indexOf("hidden") === -1 && compareDates(date, self.now) === 0) {
      self.todayDateElem = dayElement;
      dayElement.classList.add("today");
      dayElement.setAttribute("aria-current", "date");
    }
    if (dateIsEnabled) {
      dayElement.tabIndex = -1;
      if (isDateSelected(date)) {
        dayElement.classList.add("selected");
        self.selectedDateElem = dayElement;
        if (self.config.mode === "range") {
          toggleClass(dayElement, "startRange", self.selectedDates[0] && compareDates(date, self.selectedDates[0], true) === 0);
          toggleClass(dayElement, "endRange", self.selectedDates[1] && compareDates(date, self.selectedDates[1], true) === 0);
          if (className === "nextMonthDay")
            dayElement.classList.add("inRange");
        }
      }
    } else {
      dayElement.classList.add("flatpickr-disabled");
    }
    if (self.config.mode === "range") {
      if (isDateInRange(date) && !isDateSelected(date))
        dayElement.classList.add("inRange");
    }
    if (self.weekNumbers && self.config.showMonths === 1 && className !== "prevMonthDay" && i % 7 === 6) {
      self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
    }
    triggerEvent("onDayCreate", dayElement);
    return dayElement;
  }
  function focusOnDayElem(targetNode) {
    targetNode.focus();
    if (self.config.mode === "range")
      onMouseOver(targetNode);
  }
  function getFirstAvailableDay(delta) {
    var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
    var endMonth = delta > 0 ? self.config.showMonths : -1;
    for (var m = startMonth; m != endMonth; m += delta) {
      var month = self.daysContainer.children[m];
      var startIndex = delta > 0 ? 0 : month.children.length - 1;
      var endIndex = delta > 0 ? month.children.length : -1;
      for (var i = startIndex; i != endIndex; i += delta) {
        var c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
          return c;
      }
    }
    return void 0;
  }
  function getNextAvailableDay(current, delta) {
    var givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self.currentMonth;
    var endMonth = delta > 0 ? self.config.showMonths : -1;
    var loopDelta = delta > 0 ? 1 : -1;
    for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
      var month = self.daysContainer.children[m];
      var startIndex = givenMonth - self.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
      var numMonthDays = month.children.length;
      for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
        var c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta))
          return focusOnDayElem(c);
      }
    }
    self.changeMonth(loopDelta);
    focusOnDay(getFirstAvailableDay(loopDelta), 0);
    return void 0;
  }
  function focusOnDay(current, offset) {
    var activeElement = getClosestActiveElement();
    var dayFocused = isInView(activeElement || document.body);
    var startElem = current !== void 0 ? current : dayFocused ? activeElement : self.selectedDateElem !== void 0 && isInView(self.selectedDateElem) ? self.selectedDateElem : self.todayDateElem !== void 0 && isInView(self.todayDateElem) ? self.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
    if (startElem === void 0) {
      self._input.focus();
    } else if (!dayFocused) {
      focusOnDayElem(startElem);
    } else {
      getNextAvailableDay(startElem, offset);
    }
  }
  function buildMonthDays(year, month) {
    var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
    var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
    var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
    var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
    for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
      days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
    }
    for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
      days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
    }
    for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
      days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
    }
    var dayContainer = createElement("div", "dayContainer");
    dayContainer.appendChild(days);
    return dayContainer;
  }
  function buildDays() {
    if (self.daysContainer === void 0) {
      return;
    }
    clearNode(self.daysContainer);
    if (self.weekNumbers)
      clearNode(self.weekNumbers);
    var frag = document.createDocumentFragment();
    for (var i = 0; i < self.config.showMonths; i++) {
      var d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
    }
    self.daysContainer.appendChild(frag);
    self.days = self.daysContainer.firstChild;
    if (self.config.mode === "range" && self.selectedDates.length === 1) {
      onMouseOver();
    }
  }
  function buildMonthSwitch() {
    if (self.config.showMonths > 1 || self.config.monthSelectorType !== "dropdown")
      return;
    var shouldBuildMonth = function(month2) {
      if (self.config.minDate !== void 0 && self.currentYear === self.config.minDate.getFullYear() && month2 < self.config.minDate.getMonth()) {
        return false;
      }
      return !(self.config.maxDate !== void 0 && self.currentYear === self.config.maxDate.getFullYear() && month2 > self.config.maxDate.getMonth());
    };
    self.monthsDropdownContainer.tabIndex = -1;
    self.monthsDropdownContainer.innerHTML = "";
    for (var i = 0; i < 12; i++) {
      if (!shouldBuildMonth(i))
        continue;
      var month = createElement("option", "flatpickr-monthDropdown-month");
      month.value = new Date(self.currentYear, i).getMonth().toString();
      month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
      month.tabIndex = -1;
      if (self.currentMonth === i) {
        month.selected = true;
      }
      self.monthsDropdownContainer.appendChild(month);
    }
  }
  function buildMonth() {
    var container = createElement("div", "flatpickr-month");
    var monthNavFragment = window.document.createDocumentFragment();
    var monthElement;
    if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
      monthElement = createElement("span", "cur-month");
    } else {
      self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
      self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
      bind(self.monthsDropdownContainer, "change", function(e) {
        var target = getEventTarget(e);
        var selectedMonth = parseInt(target.value, 10);
        self.changeMonth(selectedMonth - self.currentMonth);
        triggerEvent("onMonthChange");
      });
      buildMonthSwitch();
      monthElement = self.monthsDropdownContainer;
    }
    var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
    var yearElement = yearInput.getElementsByTagName("input")[0];
    yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
    if (self.config.minDate) {
      yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
    }
    if (self.config.maxDate) {
      yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
      yearElement.disabled = !!self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
    }
    var currentMonth = createElement("div", "flatpickr-current-month");
    currentMonth.appendChild(monthElement);
    currentMonth.appendChild(yearInput);
    monthNavFragment.appendChild(currentMonth);
    container.appendChild(monthNavFragment);
    return {
      container,
      yearElement,
      monthElement
    };
  }
  function buildMonths() {
    clearNode(self.monthNav);
    self.monthNav.appendChild(self.prevMonthNav);
    if (self.config.showMonths) {
      self.yearElements = [];
      self.monthElements = [];
    }
    for (var m = self.config.showMonths; m--; ) {
      var month = buildMonth();
      self.yearElements.push(month.yearElement);
      self.monthElements.push(month.monthElement);
      self.monthNav.appendChild(month.container);
    }
    self.monthNav.appendChild(self.nextMonthNav);
  }
  function buildMonthNav() {
    self.monthNav = createElement("div", "flatpickr-months");
    self.yearElements = [];
    self.monthElements = [];
    self.prevMonthNav = createElement("span", "flatpickr-prev-month");
    self.prevMonthNav.innerHTML = self.config.prevArrow;
    self.nextMonthNav = createElement("span", "flatpickr-next-month");
    self.nextMonthNav.innerHTML = self.config.nextArrow;
    buildMonths();
    Object.defineProperty(self, "_hidePrevMonthArrow", {
      get: function() {
        return self.__hidePrevMonthArrow;
      },
      set: function(bool) {
        if (self.__hidePrevMonthArrow !== bool) {
          toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
          self.__hidePrevMonthArrow = bool;
        }
      }
    });
    Object.defineProperty(self, "_hideNextMonthArrow", {
      get: function() {
        return self.__hideNextMonthArrow;
      },
      set: function(bool) {
        if (self.__hideNextMonthArrow !== bool) {
          toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
          self.__hideNextMonthArrow = bool;
        }
      }
    });
    self.currentYearElement = self.yearElements[0];
    updateNavigationCurrentMonth();
    return self.monthNav;
  }
  function buildTime() {
    self.calendarContainer.classList.add("hasTime");
    if (self.config.noCalendar)
      self.calendarContainer.classList.add("noCalendar");
    var defaults2 = getDefaultHours(self.config);
    self.timeContainer = createElement("div", "flatpickr-time");
    self.timeContainer.tabIndex = -1;
    var separator = createElement("span", "flatpickr-time-separator", ":");
    var hourInput = createNumberInput("flatpickr-hour", {
      "aria-label": self.l10n.hourAriaLabel
    });
    self.hourElement = hourInput.getElementsByTagName("input")[0];
    var minuteInput = createNumberInput("flatpickr-minute", {
      "aria-label": self.l10n.minuteAriaLabel
    });
    self.minuteElement = minuteInput.getElementsByTagName("input")[0];
    self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
    self.hourElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.time_24hr ? defaults2.hours : military2ampm(defaults2.hours));
    self.minuteElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : defaults2.minutes);
    self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
    self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
    self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
    self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
    self.hourElement.setAttribute("maxlength", "2");
    self.minuteElement.setAttribute("min", "0");
    self.minuteElement.setAttribute("max", "59");
    self.minuteElement.setAttribute("maxlength", "2");
    self.timeContainer.appendChild(hourInput);
    self.timeContainer.appendChild(separator);
    self.timeContainer.appendChild(minuteInput);
    if (self.config.time_24hr)
      self.timeContainer.classList.add("time24hr");
    if (self.config.enableSeconds) {
      self.timeContainer.classList.add("hasSeconds");
      var secondInput = createNumberInput("flatpickr-second");
      self.secondElement = secondInput.getElementsByTagName("input")[0];
      self.secondElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getSeconds() : defaults2.seconds);
      self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
      self.secondElement.setAttribute("min", "0");
      self.secondElement.setAttribute("max", "59");
      self.secondElement.setAttribute("maxlength", "2");
      self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
      self.timeContainer.appendChild(secondInput);
    }
    if (!self.config.time_24hr) {
      self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj ? self.hourElement.value : self.config.defaultHour) > 11)]);
      self.amPM.title = self.l10n.toggleTitle;
      self.amPM.tabIndex = -1;
      self.timeContainer.appendChild(self.amPM);
    }
    return self.timeContainer;
  }
  function buildWeekdays() {
    if (!self.weekdayContainer)
      self.weekdayContainer = createElement("div", "flatpickr-weekdays");
    else
      clearNode(self.weekdayContainer);
    for (var i = self.config.showMonths; i--; ) {
      var container = createElement("div", "flatpickr-weekdaycontainer");
      self.weekdayContainer.appendChild(container);
    }
    updateWeekdays();
    return self.weekdayContainer;
  }
  function updateWeekdays() {
    if (!self.weekdayContainer) {
      return;
    }
    var firstDayOfWeek = self.l10n.firstDayOfWeek;
    var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
    if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
      weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
    }
    for (var i = self.config.showMonths; i--; ) {
      self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
    }
  }
  function buildWeeks() {
    self.calendarContainer.classList.add("hasWeeks");
    var weekWrapper = createElement("div", "flatpickr-weekwrapper");
    weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
    var weekNumbers = createElement("div", "flatpickr-weeks");
    weekWrapper.appendChild(weekNumbers);
    return {
      weekWrapper,
      weekNumbers
    };
  }
  function changeMonth(value, isOffset) {
    if (isOffset === void 0) {
      isOffset = true;
    }
    var delta = isOffset ? value : value - self.currentMonth;
    if (delta < 0 && self._hidePrevMonthArrow === true || delta > 0 && self._hideNextMonthArrow === true)
      return;
    self.currentMonth += delta;
    if (self.currentMonth < 0 || self.currentMonth > 11) {
      self.currentYear += self.currentMonth > 11 ? 1 : -1;
      self.currentMonth = (self.currentMonth + 12) % 12;
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    buildDays();
    triggerEvent("onMonthChange");
    updateNavigationCurrentMonth();
  }
  function clear(triggerChangeEvent, toInitial) {
    if (triggerChangeEvent === void 0) {
      triggerChangeEvent = true;
    }
    if (toInitial === void 0) {
      toInitial = true;
    }
    self.input.value = "";
    if (self.altInput !== void 0)
      self.altInput.value = "";
    if (self.mobileInput !== void 0)
      self.mobileInput.value = "";
    self.selectedDates = [];
    self.latestSelectedDateObj = void 0;
    if (toInitial === true) {
      self.currentYear = self._initialDate.getFullYear();
      self.currentMonth = self._initialDate.getMonth();
    }
    if (self.config.enableTime === true) {
      var _a = getDefaultHours(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
      setHours(hours, minutes, seconds);
    }
    self.redraw();
    if (triggerChangeEvent)
      triggerEvent("onChange");
  }
  function close() {
    self.isOpen = false;
    if (!self.isMobile) {
      if (self.calendarContainer !== void 0) {
        self.calendarContainer.classList.remove("open");
      }
      if (self._input !== void 0) {
        self._input.classList.remove("active");
      }
    }
    triggerEvent("onClose");
  }
  function destroy() {
    if (self.config !== void 0)
      triggerEvent("onDestroy");
    for (var i = self._handlers.length; i--; ) {
      self._handlers[i].remove();
    }
    self._handlers = [];
    if (self.mobileInput) {
      if (self.mobileInput.parentNode)
        self.mobileInput.parentNode.removeChild(self.mobileInput);
      self.mobileInput = void 0;
    } else if (self.calendarContainer && self.calendarContainer.parentNode) {
      if (self.config.static && self.calendarContainer.parentNode) {
        var wrapper = self.calendarContainer.parentNode;
        wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
        if (wrapper.parentNode) {
          while (wrapper.firstChild)
            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
          wrapper.parentNode.removeChild(wrapper);
        }
      } else
        self.calendarContainer.parentNode.removeChild(self.calendarContainer);
    }
    if (self.altInput) {
      self.input.type = "text";
      if (self.altInput.parentNode)
        self.altInput.parentNode.removeChild(self.altInput);
      delete self.altInput;
    }
    if (self.input) {
      self.input.type = self.input._type;
      self.input.classList.remove("flatpickr-input");
      self.input.removeAttribute("readonly");
    }
    [
      "_showTimeInput",
      "latestSelectedDateObj",
      "_hideNextMonthArrow",
      "_hidePrevMonthArrow",
      "__hideNextMonthArrow",
      "__hidePrevMonthArrow",
      "isMobile",
      "isOpen",
      "selectedDateElem",
      "minDateHasTime",
      "maxDateHasTime",
      "days",
      "daysContainer",
      "_input",
      "_positionElement",
      "innerContainer",
      "rContainer",
      "monthNav",
      "todayDateElem",
      "calendarContainer",
      "weekdayContainer",
      "prevMonthNav",
      "nextMonthNav",
      "monthsDropdownContainer",
      "currentMonthElement",
      "currentYearElement",
      "navigationCurrentMonth",
      "selectedDateElem",
      "config"
    ].forEach(function(k) {
      try {
        delete self[k];
      } catch (_) {
      }
    });
  }
  function isCalendarElem(elem) {
    return self.calendarContainer.contains(elem);
  }
  function documentClick(e) {
    if (self.isOpen && !self.config.inline) {
      var eventTarget_1 = getEventTarget(e);
      var isCalendarElement = isCalendarElem(eventTarget_1);
      var isInput = eventTarget_1 === self.input || eventTarget_1 === self.altInput || self.element.contains(eventTarget_1) || e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));
      var lostFocus = !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
      var isIgnored = !self.config.ignoredFocusElements.some(function(elem) {
        return elem.contains(eventTarget_1);
      });
      if (lostFocus && isIgnored) {
        if (self.config.allowInput) {
          self.setDate(self._input.value, false, self.config.altInput ? self.config.altFormat : self.config.dateFormat);
        }
        if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0 && self.input.value !== "" && self.input.value !== void 0) {
          updateTime();
        }
        self.close();
        if (self.config && self.config.mode === "range" && self.selectedDates.length === 1)
          self.clear(false);
      }
    }
  }
  function changeYear(newYear) {
    if (!newYear || self.config.minDate && newYear < self.config.minDate.getFullYear() || self.config.maxDate && newYear > self.config.maxDate.getFullYear())
      return;
    var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
    self.currentYear = newYearNum || self.currentYear;
    if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) {
      self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
    } else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) {
      self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
    }
    if (isNewYear) {
      self.redraw();
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
  }
  function isEnabled(date, timeless) {
    var _a;
    if (timeless === void 0) {
      timeless = true;
    }
    var dateToCheck = self.parseDate(date, void 0, timeless);
    if (self.config.minDate && dateToCheck && compareDates(dateToCheck, self.config.minDate, timeless !== void 0 ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && dateToCheck && compareDates(dateToCheck, self.config.maxDate, timeless !== void 0 ? timeless : !self.maxDateHasTime) > 0)
      return false;
    if (!self.config.enable && self.config.disable.length === 0)
      return true;
    if (dateToCheck === void 0)
      return false;
    var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
    for (var i = 0, d = void 0; i < array.length; i++) {
      d = array[i];
      if (typeof d === "function" && d(dateToCheck))
        return bool;
      else if (d instanceof Date && dateToCheck !== void 0 && d.getTime() === dateToCheck.getTime())
        return bool;
      else if (typeof d === "string") {
        var parsed = self.parseDate(d, void 0, true);
        return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
      } else if (typeof d === "object" && dateToCheck !== void 0 && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime())
        return bool;
    }
    return !bool;
  }
  function isInView(elem) {
    if (self.daysContainer !== void 0)
      return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self.daysContainer.contains(elem);
    return false;
  }
  function onBlur(e) {
    var isInput = e.target === self._input;
    var valueChanged = self._input.value.trimEnd() !== getDateStr();
    if (isInput && valueChanged && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
      self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
    }
  }
  function onKeyDown(e) {
    var eventTarget = getEventTarget(e);
    var isInput = self.config.wrap ? element.contains(eventTarget) : eventTarget === self._input;
    var allowInput = self.config.allowInput;
    var allowKeydown = self.isOpen && (!allowInput || !isInput);
    var allowInlineKeydown = self.config.inline && isInput && !allowInput;
    if (e.keyCode === 13 && isInput) {
      if (allowInput) {
        self.setDate(self._input.value, true, eventTarget === self.altInput ? self.config.altFormat : self.config.dateFormat);
        self.close();
        return eventTarget.blur();
      } else {
        self.open();
      }
    } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
      var isTimeObj = !!self.timeContainer && self.timeContainer.contains(eventTarget);
      switch (e.keyCode) {
        case 13:
          if (isTimeObj) {
            e.preventDefault();
            updateTime();
            focusAndClose();
          } else
            selectDate(e);
          break;
        case 27:
          e.preventDefault();
          focusAndClose();
          break;
        case 8:
        case 46:
          if (isInput && !self.config.allowInput) {
            e.preventDefault();
            self.clear();
          }
          break;
        case 37:
        case 39:
          if (!isTimeObj && !isInput) {
            e.preventDefault();
            var activeElement = getClosestActiveElement();
            if (self.daysContainer !== void 0 && (allowInput === false || activeElement && isInView(activeElement))) {
              var delta_1 = e.keyCode === 39 ? 1 : -1;
              if (!e.ctrlKey)
                focusOnDay(void 0, delta_1);
              else {
                e.stopPropagation();
                changeMonth(delta_1);
                focusOnDay(getFirstAvailableDay(1), 0);
              }
            }
          } else if (self.hourElement)
            self.hourElement.focus();
          break;
        case 38:
        case 40:
          e.preventDefault();
          var delta = e.keyCode === 40 ? 1 : -1;
          if (self.daysContainer && eventTarget.$i !== void 0 || eventTarget === self.input || eventTarget === self.altInput) {
            if (e.ctrlKey) {
              e.stopPropagation();
              changeYear(self.currentYear - delta);
              focusOnDay(getFirstAvailableDay(1), 0);
            } else if (!isTimeObj)
              focusOnDay(void 0, delta * 7);
          } else if (eventTarget === self.currentYearElement) {
            changeYear(self.currentYear - delta);
          } else if (self.config.enableTime) {
            if (!isTimeObj && self.hourElement)
              self.hourElement.focus();
            updateTime(e);
            self._debouncedChange();
          }
          break;
        case 9:
          if (isTimeObj) {
            var elems = [
              self.hourElement,
              self.minuteElement,
              self.secondElement,
              self.amPM
            ].concat(self.pluginElements).filter(function(x) {
              return x;
            });
            var i = elems.indexOf(eventTarget);
            if (i !== -1) {
              var target = elems[i + (e.shiftKey ? -1 : 1)];
              e.preventDefault();
              (target || self._input).focus();
            }
          } else if (!self.config.noCalendar && self.daysContainer && self.daysContainer.contains(eventTarget) && e.shiftKey) {
            e.preventDefault();
            self._input.focus();
          }
          break;
      }
    }
    if (self.amPM !== void 0 && eventTarget === self.amPM) {
      switch (e.key) {
        case self.l10n.amPM[0].charAt(0):
        case self.l10n.amPM[0].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[0];
          setHoursFromInputs();
          updateValue();
          break;
        case self.l10n.amPM[1].charAt(0):
        case self.l10n.amPM[1].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[1];
          setHoursFromInputs();
          updateValue();
          break;
      }
    }
    if (isInput || isCalendarElem(eventTarget)) {
      triggerEvent("onKeyDown", e);
    }
  }
  function onMouseOver(elem, cellClass) {
    if (cellClass === void 0) {
      cellClass = "flatpickr-day";
    }
    if (self.selectedDates.length !== 1 || elem && (!elem.classList.contains(cellClass) || elem.classList.contains("flatpickr-disabled")))
      return;
    var hoverDate = elem ? elem.dateObj.getTime() : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], void 0, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
    var containsDisabled = false;
    var minRange = 0, maxRange = 0;
    for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
      if (!isEnabled(new Date(t), true)) {
        containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
        if (t < initialDate && (!minRange || t > minRange))
          minRange = t;
        else if (t > initialDate && (!maxRange || t < maxRange))
          maxRange = t;
      }
    }
    var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
    hoverableCells.forEach(function(dayElem) {
      var date = dayElem.dateObj;
      var timestamp = date.getTime();
      var outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
      if (outOfRange) {
        dayElem.classList.add("notAllowed");
        ["inRange", "startRange", "endRange"].forEach(function(c) {
          dayElem.classList.remove(c);
        });
        return;
      } else if (containsDisabled && !outOfRange)
        return;
      ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(c) {
        dayElem.classList.remove(c);
      });
      if (elem !== void 0) {
        elem.classList.add(hoverDate <= self.selectedDates[0].getTime() ? "startRange" : "endRange");
        if (initialDate < hoverDate && timestamp === initialDate)
          dayElem.classList.add("startRange");
        else if (initialDate > hoverDate && timestamp === initialDate)
          dayElem.classList.add("endRange");
        if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate))
          dayElem.classList.add("inRange");
      }
    });
  }
  function onResize() {
    if (self.isOpen && !self.config.static && !self.config.inline)
      positionCalendar();
  }
  function open(e, positionElement) {
    if (positionElement === void 0) {
      positionElement = self._positionElement;
    }
    if (self.isMobile === true) {
      if (e) {
        e.preventDefault();
        var eventTarget = getEventTarget(e);
        if (eventTarget) {
          eventTarget.blur();
        }
      }
      if (self.mobileInput !== void 0) {
        self.mobileInput.focus();
        self.mobileInput.click();
      }
      triggerEvent("onOpen");
      return;
    } else if (self._input.disabled || self.config.inline) {
      return;
    }
    var wasOpen = self.isOpen;
    self.isOpen = true;
    if (!wasOpen) {
      self.calendarContainer.classList.add("open");
      self._input.classList.add("active");
      triggerEvent("onOpen");
      positionCalendar(positionElement);
    }
    if (self.config.enableTime === true && self.config.noCalendar === true) {
      if (self.config.allowInput === false && (e === void 0 || !self.timeContainer.contains(e.relatedTarget))) {
        setTimeout(function() {
          return self.hourElement.select();
        }, 50);
      }
    }
  }
  function minMaxDateSetter(type) {
    return function(date) {
      var dateObj = self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat);
      var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
      if (dateObj !== void 0) {
        self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
      }
      if (self.selectedDates) {
        self.selectedDates = self.selectedDates.filter(function(d) {
          return isEnabled(d);
        });
        if (!self.selectedDates.length && type === "min")
          setHoursFromDate(dateObj);
        updateValue();
      }
      if (self.daysContainer) {
        redraw();
        if (dateObj !== void 0)
          self.currentYearElement[type] = dateObj.getFullYear().toString();
        else
          self.currentYearElement.removeAttribute(type);
        self.currentYearElement.disabled = !!inverseDateObj && dateObj !== void 0 && inverseDateObj.getFullYear() === dateObj.getFullYear();
      }
    };
  }
  function parseConfig() {
    var boolOpts = [
      "wrap",
      "weekNumbers",
      "allowInput",
      "allowInvalidPreload",
      "clickOpens",
      "time_24hr",
      "enableTime",
      "noCalendar",
      "altInput",
      "shorthandCurrentMonth",
      "inline",
      "static",
      "enableSeconds",
      "disableMobile"
    ];
    var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
    var formats2 = {};
    self.config.parseDate = userConfig.parseDate;
    self.config.formatDate = userConfig.formatDate;
    Object.defineProperty(self.config, "enable", {
      get: function() {
        return self.config._enable;
      },
      set: function(dates) {
        self.config._enable = parseDateRules(dates);
      }
    });
    Object.defineProperty(self.config, "disable", {
      get: function() {
        return self.config._disable;
      },
      set: function(dates) {
        self.config._disable = parseDateRules(dates);
      }
    });
    var timeMode = userConfig.mode === "time";
    if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
      var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
      formats2.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
    }
    if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
      var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
      formats2.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(self.config, "minDate", {
      get: function() {
        return self.config._minDate;
      },
      set: minMaxDateSetter("min")
    });
    Object.defineProperty(self.config, "maxDate", {
      get: function() {
        return self.config._maxDate;
      },
      set: minMaxDateSetter("max")
    });
    var minMaxTimeSetter = function(type) {
      return function(val) {
        self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
      };
    };
    Object.defineProperty(self.config, "minTime", {
      get: function() {
        return self.config._minTime;
      },
      set: minMaxTimeSetter("min")
    });
    Object.defineProperty(self.config, "maxTime", {
      get: function() {
        return self.config._maxTime;
      },
      set: minMaxTimeSetter("max")
    });
    if (userConfig.mode === "time") {
      self.config.noCalendar = true;
      self.config.enableTime = true;
    }
    Object.assign(self.config, formats2, userConfig);
    for (var i = 0; i < boolOpts.length; i++)
      self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
    HOOKS.filter(function(hook) {
      return self.config[hook] !== void 0;
    }).forEach(function(hook) {
      self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
    });
    self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var i = 0; i < self.config.plugins.length; i++) {
      var pluginConf = self.config.plugins[i](self) || {};
      for (var key in pluginConf) {
        if (HOOKS.indexOf(key) > -1) {
          self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]);
        } else if (typeof userConfig[key] === "undefined")
          self.config[key] = pluginConf[key];
      }
    }
    if (!userConfig.altInputClass) {
      self.config.altInputClass = getInputElem().className + " " + self.config.altInputClass;
    }
    triggerEvent("onParseConfig");
  }
  function getInputElem() {
    return self.config.wrap ? element.querySelector("[data-input]") : element;
  }
  function setupLocale() {
    if (typeof self.config.locale !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined")
      self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
    self.l10n = __assign(__assign({}, flatpickr.l10ns.default), typeof self.config.locale === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] : void 0);
    tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
    tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
    tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
    tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
    tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
    var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
    if (userConfig.time_24hr === void 0 && flatpickr.defaultConfig.time_24hr === void 0) {
      self.config.time_24hr = self.l10n.time_24hr;
    }
    self.formatDate = createDateFormatter(self);
    self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
  }
  function positionCalendar(customPositionElement) {
    if (typeof self.config.position === "function") {
      return void self.config.position(self, customPositionElement);
    }
    if (self.calendarContainer === void 0)
      return;
    triggerEvent("onPreCalendarPosition");
    var positionElement = customPositionElement || self._positionElement;
    var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, function(acc, child) {
      return acc + child.offsetHeight;
    }, 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
    var top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
    toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
    toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
    if (self.config.inline)
      return;
    var left = window.pageXOffset + inputBounds.left;
    var isCenter = false;
    var isRight = false;
    if (configPosHorizontal === "center") {
      left -= (calendarWidth - inputBounds.width) / 2;
      isCenter = true;
    } else if (configPosHorizontal === "right") {
      left -= calendarWidth - inputBounds.width;
      isRight = true;
    }
    toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
    toggleClass(self.calendarContainer, "arrowCenter", isCenter);
    toggleClass(self.calendarContainer, "arrowRight", isRight);
    var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
    var rightMost = left + calendarWidth > window.document.body.offsetWidth;
    var centerMost = right + calendarWidth > window.document.body.offsetWidth;
    toggleClass(self.calendarContainer, "rightMost", rightMost);
    if (self.config.static)
      return;
    self.calendarContainer.style.top = top + "px";
    if (!rightMost) {
      self.calendarContainer.style.left = left + "px";
      self.calendarContainer.style.right = "auto";
    } else if (!centerMost) {
      self.calendarContainer.style.left = "auto";
      self.calendarContainer.style.right = right + "px";
    } else {
      var doc = getDocumentStyleSheet();
      if (doc === void 0)
        return;
      var bodyWidth = window.document.body.offsetWidth;
      var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
      var centerBefore = ".flatpickr-calendar.centerMost:before";
      var centerAfter = ".flatpickr-calendar.centerMost:after";
      var centerIndex = doc.cssRules.length;
      var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
      toggleClass(self.calendarContainer, "rightMost", false);
      toggleClass(self.calendarContainer, "centerMost", true);
      doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
      self.calendarContainer.style.left = centerLeft + "px";
      self.calendarContainer.style.right = "auto";
    }
  }
  function getDocumentStyleSheet() {
    var editableSheet = null;
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheet = document.styleSheets[i];
      if (!sheet.cssRules)
        continue;
      try {
        sheet.cssRules;
      } catch (err) {
        continue;
      }
      editableSheet = sheet;
      break;
    }
    return editableSheet != null ? editableSheet : createStyleSheet();
  }
  function createStyleSheet() {
    var style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
  }
  function redraw() {
    if (self.config.noCalendar || self.isMobile)
      return;
    buildMonthSwitch();
    updateNavigationCurrentMonth();
    buildDays();
  }
  function focusAndClose() {
    self._input.focus();
    if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0) {
      setTimeout(self.close, 0);
    } else {
      self.close();
    }
  }
  function selectDate(e) {
    e.preventDefault();
    e.stopPropagation();
    var isSelectable = function(day) {
      return day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
    };
    var t = findParent(getEventTarget(e), isSelectable);
    if (t === void 0)
      return;
    var target = t;
    var selectedDate = self.latestSelectedDateObj = new Date(target.dateObj.getTime());
    var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth || selectedDate.getMonth() > self.currentMonth + self.config.showMonths - 1) && self.config.mode !== "range";
    self.selectedDateElem = target;
    if (self.config.mode === "single")
      self.selectedDates = [selectedDate];
    else if (self.config.mode === "multiple") {
      var selectedIndex = isDateSelected(selectedDate);
      if (selectedIndex)
        self.selectedDates.splice(parseInt(selectedIndex), 1);
      else
        self.selectedDates.push(selectedDate);
    } else if (self.config.mode === "range") {
      if (self.selectedDates.length === 2) {
        self.clear(false, false);
      }
      self.latestSelectedDateObj = selectedDate;
      self.selectedDates.push(selectedDate);
      if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
        self.selectedDates.sort(function(a, b) {
          return a.getTime() - b.getTime();
        });
    }
    setHoursFromInputs();
    if (shouldChangeMonth) {
      var isNewYear = self.currentYear !== selectedDate.getFullYear();
      self.currentYear = selectedDate.getFullYear();
      self.currentMonth = selectedDate.getMonth();
      if (isNewYear) {
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
      triggerEvent("onMonthChange");
    }
    updateNavigationCurrentMonth();
    buildDays();
    updateValue();
    if (!shouldChangeMonth && self.config.mode !== "range" && self.config.showMonths === 1)
      focusOnDayElem(target);
    else if (self.selectedDateElem !== void 0 && self.hourElement === void 0) {
      self.selectedDateElem && self.selectedDateElem.focus();
    }
    if (self.hourElement !== void 0)
      self.hourElement !== void 0 && self.hourElement.focus();
    if (self.config.closeOnSelect) {
      var single = self.config.mode === "single" && !self.config.enableTime;
      var range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;
      if (single || range) {
        focusAndClose();
      }
    }
    triggerChange();
  }
  var CALLBACKS = {
    locale: [setupLocale, updateWeekdays],
    showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
    minDate: [jumpToDate],
    maxDate: [jumpToDate],
    positionElement: [updatePositionElement],
    clickOpens: [
      function() {
        if (self.config.clickOpens === true) {
          bind(self._input, "focus", self.open);
          bind(self._input, "click", self.open);
        } else {
          self._input.removeEventListener("focus", self.open);
          self._input.removeEventListener("click", self.open);
        }
      }
    ]
  };
  function set(option, value) {
    if (option !== null && typeof option === "object") {
      Object.assign(self.config, option);
      for (var key in option) {
        if (CALLBACKS[key] !== void 0)
          CALLBACKS[key].forEach(function(x) {
            return x();
          });
      }
    } else {
      self.config[option] = value;
      if (CALLBACKS[option] !== void 0)
        CALLBACKS[option].forEach(function(x) {
          return x();
        });
      else if (HOOKS.indexOf(option) > -1)
        self.config[option] = arrayify(value);
    }
    self.redraw();
    updateValue(true);
  }
  function setSelectedDate(inputDate, format) {
    var dates = [];
    if (inputDate instanceof Array)
      dates = inputDate.map(function(d) {
        return self.parseDate(d, format);
      });
    else if (inputDate instanceof Date || typeof inputDate === "number")
      dates = [self.parseDate(inputDate, format)];
    else if (typeof inputDate === "string") {
      switch (self.config.mode) {
        case "single":
        case "time":
          dates = [self.parseDate(inputDate, format)];
          break;
        case "multiple":
          dates = inputDate.split(self.config.conjunction).map(function(date) {
            return self.parseDate(date, format);
          });
          break;
        case "range":
          dates = inputDate.split(self.l10n.rangeSeparator).map(function(date) {
            return self.parseDate(date, format);
          });
          break;
      }
    } else
      self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
    self.selectedDates = self.config.allowInvalidPreload ? dates : dates.filter(function(d) {
      return d instanceof Date && isEnabled(d, false);
    });
    if (self.config.mode === "range")
      self.selectedDates.sort(function(a, b) {
        return a.getTime() - b.getTime();
      });
  }
  function setDate(date, triggerChange2, format) {
    if (triggerChange2 === void 0) {
      triggerChange2 = false;
    }
    if (format === void 0) {
      format = self.config.dateFormat;
    }
    if (date !== 0 && !date || date instanceof Array && date.length === 0)
      return self.clear(triggerChange2);
    setSelectedDate(date, format);
    self.latestSelectedDateObj = self.selectedDates[self.selectedDates.length - 1];
    self.redraw();
    jumpToDate(void 0, triggerChange2);
    setHoursFromDate();
    if (self.selectedDates.length === 0) {
      self.clear(false);
    }
    updateValue(triggerChange2);
    if (triggerChange2)
      triggerEvent("onChange");
  }
  function parseDateRules(arr) {
    return arr.slice().map(function(rule) {
      if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
        return self.parseDate(rule, void 0, true);
      } else if (rule && typeof rule === "object" && rule.from && rule.to)
        return {
          from: self.parseDate(rule.from, void 0),
          to: self.parseDate(rule.to, void 0)
        };
      return rule;
    }).filter(function(x) {
      return x;
    });
  }
  function setupDates() {
    self.selectedDates = [];
    self.now = self.parseDate(self.config.now) || /* @__PURE__ */ new Date();
    var preloadedDate = self.config.defaultDate || ((self.input.nodeName === "INPUT" || self.input.nodeName === "TEXTAREA") && self.input.placeholder && self.input.value === self.input.placeholder ? null : self.input.value);
    if (preloadedDate)
      setSelectedDate(preloadedDate, self.config.dateFormat);
    self._initialDate = self.selectedDates.length > 0 ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now.getTime() ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now.getTime() ? self.config.maxDate : self.now;
    self.currentYear = self._initialDate.getFullYear();
    self.currentMonth = self._initialDate.getMonth();
    if (self.selectedDates.length > 0)
      self.latestSelectedDateObj = self.selectedDates[0];
    if (self.config.minTime !== void 0)
      self.config.minTime = self.parseDate(self.config.minTime, "H:i");
    if (self.config.maxTime !== void 0)
      self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
    self.minDateHasTime = !!self.config.minDate && (self.config.minDate.getHours() > 0 || self.config.minDate.getMinutes() > 0 || self.config.minDate.getSeconds() > 0);
    self.maxDateHasTime = !!self.config.maxDate && (self.config.maxDate.getHours() > 0 || self.config.maxDate.getMinutes() > 0 || self.config.maxDate.getSeconds() > 0);
  }
  function setupInputs() {
    self.input = getInputElem();
    if (!self.input) {
      self.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    self.input._type = self.input.type;
    self.input.type = "text";
    self.input.classList.add("flatpickr-input");
    self._input = self.input;
    if (self.config.altInput) {
      self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
      self._input = self.altInput;
      self.altInput.placeholder = self.input.placeholder;
      self.altInput.disabled = self.input.disabled;
      self.altInput.required = self.input.required;
      self.altInput.tabIndex = self.input.tabIndex;
      self.altInput.type = "text";
      self.input.setAttribute("type", "hidden");
      if (!self.config.static && self.input.parentNode)
        self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
    }
    if (!self.config.allowInput)
      self._input.setAttribute("readonly", "readonly");
    updatePositionElement();
  }
  function updatePositionElement() {
    self._positionElement = self.config.positionElement || self._input;
  }
  function setupMobile() {
    var inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";
    self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
    self.mobileInput.tabIndex = 1;
    self.mobileInput.type = inputType;
    self.mobileInput.disabled = self.input.disabled;
    self.mobileInput.required = self.input.required;
    self.mobileInput.placeholder = self.input.placeholder;
    self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
    if (self.selectedDates.length > 0) {
      self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
    }
    if (self.config.minDate)
      self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
    if (self.config.maxDate)
      self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
    if (self.input.getAttribute("step"))
      self.mobileInput.step = String(self.input.getAttribute("step"));
    self.input.type = "hidden";
    if (self.altInput !== void 0)
      self.altInput.type = "hidden";
    try {
      if (self.input.parentNode)
        self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
    } catch (_a) {
    }
    bind(self.mobileInput, "change", function(e) {
      self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
      triggerEvent("onChange");
      triggerEvent("onClose");
    });
  }
  function toggle(e) {
    if (self.isOpen === true)
      return self.close();
    self.open(e);
  }
  function triggerEvent(event, data) {
    if (self.config === void 0)
      return;
    var hooks = self.config[event];
    if (hooks !== void 0 && hooks.length > 0) {
      for (var i = 0; hooks[i] && i < hooks.length; i++)
        hooks[i](self.selectedDates, self.input.value, self, data);
    }
    if (event === "onChange") {
      self.input.dispatchEvent(createEvent("change"));
      self.input.dispatchEvent(createEvent("input"));
    }
  }
  function createEvent(name) {
    var e = document.createEvent("Event");
    e.initEvent(name, true, true);
    return e;
  }
  function isDateSelected(date) {
    for (var i = 0; i < self.selectedDates.length; i++) {
      var selectedDate = self.selectedDates[i];
      if (selectedDate instanceof Date && compareDates(selectedDate, date) === 0)
        return "" + i;
    }
    return false;
  }
  function isDateInRange(date) {
    if (self.config.mode !== "range" || self.selectedDates.length < 2)
      return false;
    return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
  }
  function updateNavigationCurrentMonth() {
    if (self.config.noCalendar || self.isMobile || !self.monthNav)
      return;
    self.yearElements.forEach(function(yearElement, i) {
      var d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
        self.monthElements[i].textContent = monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
      } else {
        self.monthsDropdownContainer.value = d.getMonth().toString();
      }
      yearElement.value = d.getFullYear().toString();
    });
    self._hidePrevMonthArrow = self.config.minDate !== void 0 && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());
    self._hideNextMonthArrow = self.config.maxDate !== void 0 && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
  }
  function getDateStr(specificFormat) {
    var format = specificFormat || (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
    return self.selectedDates.map(function(dObj) {
      return self.formatDate(dObj, format);
    }).filter(function(d, i, arr) {
      return self.config.mode !== "range" || self.config.enableTime || arr.indexOf(d) === i;
    }).join(self.config.mode !== "range" ? self.config.conjunction : self.l10n.rangeSeparator);
  }
  function updateValue(triggerChange2) {
    if (triggerChange2 === void 0) {
      triggerChange2 = true;
    }
    if (self.mobileInput !== void 0 && self.mobileFormatStr) {
      self.mobileInput.value = self.latestSelectedDateObj !== void 0 ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
    }
    self.input.value = getDateStr(self.config.dateFormat);
    if (self.altInput !== void 0) {
      self.altInput.value = getDateStr(self.config.altFormat);
    }
    if (triggerChange2 !== false)
      triggerEvent("onValueUpdate");
  }
  function onMonthNavClick(e) {
    var eventTarget = getEventTarget(e);
    var isPrevMonth = self.prevMonthNav.contains(eventTarget);
    var isNextMonth = self.nextMonthNav.contains(eventTarget);
    if (isPrevMonth || isNextMonth) {
      changeMonth(isPrevMonth ? -1 : 1);
    } else if (self.yearElements.indexOf(eventTarget) >= 0) {
      eventTarget.select();
    } else if (eventTarget.classList.contains("arrowUp")) {
      self.changeYear(self.currentYear + 1);
    } else if (eventTarget.classList.contains("arrowDown")) {
      self.changeYear(self.currentYear - 1);
    }
  }
  function timeWrapper(e) {
    e.preventDefault();
    var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
    if (self.amPM !== void 0 && eventTarget === self.amPM) {
      self.amPM.textContent = self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
    }
    var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
    var newValue = curValue + step * delta;
    if (typeof input.value !== "undefined" && input.value.length === 2) {
      var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
      if (newValue < min) {
        newValue = max + newValue + int(!isHourElem) + (int(isHourElem) && int(!self.amPM));
        if (isMinuteElem)
          incrementNumInput(void 0, -1, self.hourElement);
      } else if (newValue > max) {
        newValue = input === self.hourElement ? newValue - max - int(!self.amPM) : min;
        if (isMinuteElem)
          incrementNumInput(void 0, 1, self.hourElement);
      }
      if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) {
        self.amPM.textContent = self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
      }
      input.value = pad(newValue);
    }
  }
  init();
  return self;
}
function _flatpickr(nodeList, config) {
  var nodes = Array.prototype.slice.call(nodeList).filter(function(x) {
    return x instanceof HTMLElement;
  });
  var instances = [];
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    try {
      if (node.getAttribute("data-fp-omit") !== null)
        continue;
      if (node._flatpickr !== void 0) {
        node._flatpickr.destroy();
        node._flatpickr = void 0;
      }
      node._flatpickr = FlatpickrInstance(node, config || {});
      instances.push(node._flatpickr);
    } catch (e) {
      console.error(e);
    }
  }
  return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
  HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config) {
    return _flatpickr(this, config);
  };
  HTMLElement.prototype.flatpickr = function(config) {
    return _flatpickr([this], config);
  };
}
var flatpickr = function(selector, config) {
  if (typeof selector === "string") {
    return _flatpickr(window.document.querySelectorAll(selector), config);
  } else if (selector instanceof Node) {
    return _flatpickr([selector], config);
  } else {
    return _flatpickr(selector, config);
  }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
  en: __assign({}, english),
  default: __assign({}, english)
};
flatpickr.localize = function(l10n) {
  flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = function(config) {
  flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
  jQuery.fn.flatpickr = function(config) {
    return _flatpickr(this, config);
  };
}
Date.prototype.fp_incr = function(days) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
  window.flatpickr = flatpickr;
}
const FORMATS = { "Y-m-d": "Y-m-d", "d/m/Y": "d/m/Y", "m/d/Y": "m/d/Y", "d.m.Y": "d.m.Y", "j F Y": "j F Y", "F j, Y": "F j, Y" };
function initPickers(form) {
  form.querySelectorAll("input[data-picker]").forEach((input) => {
    const d = input.dataset;
    if (d.picker === "time") {
      const inc = Number(d.minuteStep || 0);
      input.type = "text";
      flatpickr(input, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        altInput: true,
        altFormat: d.time24 === "1" ? "H:i" : "h:i K",
        time_24hr: d.time24 === "1",
        minuteIncrement: inc || 5,
        minTime: input.min || null,
        maxTime: input.max || null,
        allowInput: false
      });
      return;
    }
    const withTime = d.time === "1";
    const disabled = (d.disabled || "").split(",").filter(Boolean);
    const rules = [];
    if (d.noWeekends === "1") rules.push((date) => date.getDay() === 0 || date.getDay() === 6);
    if (disabled.length) rules.push(...disabled);
    const display = (FORMATS[d.format] || "Y-m-d") + (withTime ? d.time24 === "1" ? " H:i" : " h:i K" : "");
    flatpickr(input, {
      dateFormat: withTime ? "Y-m-d\\TH:i" : "Y-m-d",
      // what is submitted
      altInput: true,
      altFormat: display,
      // what visitors see
      enableTime: withTime,
      time_24hr: d.time24 === "1",
      minDate: d.min || null,
      maxDate: d.max || null,
      disable: rules,
      locale: { firstDayOfWeek: Number(d.firstDay ?? 1) },
      allowInput: false
    });
  });
}
function initSearchable(form) {
  form.querySelectorAll("select[data-searchable]").forEach((select) => {
    const box = document.createElement("div");
    box.className = "formglut-search-select";
    const search = document.createElement("input");
    search.type = "search";
    search.className = "formglut-search-input";
    search.placeholder = __("Type to search…", "formglut");
    search.setAttribute("aria-label", __("Search the list", "formglut"));
    select.parentNode.insertBefore(box, select);
    box.appendChild(search);
    box.appendChild(select);
    const all = Array.from(select.options).map((o) => ({ el: o, text: o.textContent.toLowerCase() }));
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      let first = null;
      all.forEach(({ el, text }) => {
        const keep = !q || !el.value || text.includes(q);
        el.hidden = !keep;
        if (keep && el.value && !first) first = el;
      });
      if (q && first && !first.disabled) {
        select.value = first.value;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    form.addEventListener("reset", () => setTimeout(() => {
      search.value = "";
      all.forEach(({ el }) => {
        el.hidden = false;
      });
    }, 0));
  });
}
const countWords = (v) => v.trim() ? v.trim().split(/\s+/u).length : 0;
function initCounters(form) {
  form.querySelectorAll("input[data-counter], textarea[data-counter]").forEach((input) => {
    const maxChars = Number(input.getAttribute("maxlength") || 0);
    const minChars = Number(input.getAttribute("minlength") || 0);
    const maxWords = Number(input.dataset.maxWords || 0);
    if (input.dataset.counter !== "1" || !maxChars && !maxWords && !minChars) {
      if (maxWords) input.addEventListener("input", () => input.setCustomValidity(countWords(input.value) > maxWords ? sprintf(__("Please use no more than %d words.", "formglut"), maxWords) : ""));
      return;
    }
    const out = document.createElement("div");
    out.className = "formglut-counter";
    out.setAttribute("aria-live", "polite");
    const group = input.closest(".formglut-input-group") || input;
    group.parentNode.insertBefore(out, group.nextSibling);
    const update = () => {
      const chars = input.value.length;
      const words = countWords(input.value);
      let text = "";
      let over = false;
      if (maxWords) {
        text = sprintf(__("%1$d / %2$d words", "formglut"), words, maxWords);
        over = words > maxWords;
        input.setCustomValidity(over ? sprintf(__("Please use no more than %d words.", "formglut"), maxWords) : "");
      } else if (maxChars) {
        text = sprintf(__("%1$d / %2$d characters", "formglut"), chars, maxChars);
      } else {
        text = sprintf(__("%d characters", "formglut"), chars);
      }
      if (minChars && chars > 0 && chars < minChars) text += " · " + sprintf(__("at least %d", "formglut"), minChars);
      out.textContent = text;
      out.classList.toggle("is-over", over || maxChars && chars >= maxChars);
    };
    input.addEventListener("input", update);
    form.addEventListener("reset", () => setTimeout(update, 0));
    update();
  });
}
function evaluate(expr) {
  const tokens = expr.match(/\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[A-Za-z]+|[()+\-*/%,]/g) || [];
  if (tokens.join("") !== expr.replace(/\s+/g, "")) return null;
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];
  const expect = (t) => {
    if (next() !== t) throw new Error("expect");
  };
  const FN = { round: (a, d = 0) => {
    const p = 10 ** d;
    return Math.round(a * p) / p;
  }, min: Math.min, max: Math.max, abs: Math.abs, ceil: Math.ceil, floor: Math.floor };
  function expression() {
    let v = term();
    while (peek() === "+" || peek() === "-") {
      const op = next();
      const r = term();
      v = op === "+" ? v + r : v - r;
    }
    return v;
  }
  function term() {
    let v = factor();
    while (peek() === "*" || peek() === "/" || peek() === "%") {
      const op = next();
      const r = factor();
      if (op === "*") v *= r;
      else if (r === 0) v = 0;
      else v = op === "/" ? v / r : v % r;
    }
    return v;
  }
  function factor() {
    const t = next();
    if (t === void 0) throw new Error("end");
    if (/^\d/.test(t)) return parseFloat(t);
    if (t === "-") return -factor();
    if (t === "+") return factor();
    if (t === "(") {
      const v = expression();
      expect(")");
      return v;
    }
    const fn = FN[t.toLowerCase()];
    if (!fn) throw new Error("token");
    expect("(");
    const args = [expression()];
    while (peek() === ",") {
      next();
      args.push(expression());
    }
    expect(")");
    return fn(...args);
  }
  try {
    const v = expression();
    return pos === tokens.length && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}
function fieldNumber(form, ref) {
  const els = form.querySelectorAll(`[name="${CSS.escape(ref.name)}"], [name="${CSS.escape(ref.name)}[]"]`);
  const values = [];
  els.forEach((el) => {
    if ((el.type === "radio" || el.type === "checkbox") && !el.checked) return;
    if (el.type === "hidden" && ref.type === "toggle") return;
    if (el.tagName === "SELECT" && el.multiple) {
      Array.from(el.selectedOptions).forEach((o) => values.push(o.value));
      return;
    }
    if (el.closest(".formglut-conditional-hidden")) return;
    values.push(el.value);
  });
  if (ref.type === "toggle") return values.includes(ref.on) ? 1 : 0;
  if (ref.map) return values.reduce((sum, v) => sum + (ref.map[v] ?? 0), 0);
  const n = parseFloat(String(values[0] ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
function initCalculations(form) {
  const calcs = Array.from(form.querySelectorAll("input.formglut-calc[data-formula]"));
  if (!calcs.length) return;
  const run = () => calcs.forEach((input) => {
    let refs = {};
    try {
      refs = JSON.parse(input.dataset.refs || "{}");
    } catch {
      refs = {};
    }
    const expr = (input.dataset.formula || "").replace(/\{field:([A-Za-z0-9_-]+)\}/g, (m, id) => {
      const n = refs[id] ? fieldNumber(form, refs[id]) : 0;
      return "(" + (n < 0 ? "0" + n : n) + ")";
    });
    const result = evaluate(expr);
    const d = Number(input.dataset.decimals ?? 2);
    input.value = (input.dataset.prefix || "") + (result === null ? "" : result.toFixed(d)) + (input.dataset.suffix || "");
  });
  form.addEventListener("input", run);
  form.addEventListener("change", run);
  form.addEventListener("reset", () => setTimeout(run, 0));
  run();
}
function currentTotal(form, box) {
  if (box.dataset.source === "calc" && box.dataset.amountField) {
    const calc = form.querySelector(`[name="${CSS.escape(box.dataset.amountField)}"]`) || document.getElementById(box.dataset.amountField);
    const n = parseFloat(String((calc == null ? void 0 : calc.value) || "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  }
  let sum = 0;
  form.querySelectorAll(".formglut-pay-item").forEach((el) => {
    if (el.closest(".formglut-conditional-hidden, .formglut-hidden")) return;
    const n = parseFloat(el.value);
    if (Number.isFinite(n) && n > 0) sum += n;
  });
  return Math.round(sum * 100) / 100;
}
function initPayments(form) {
  const box = form.querySelector(".formglut-stripe");
  if (!box) return;
  const start = () => {
    if (typeof window.Stripe !== "function") {
      setTimeout(start, 200);
      return;
    }
    const decimals = Number(box.dataset.decimals || 2);
    const toMinor = (v) => Math.round(v * 10 ** decimals);
    const stripe = window.Stripe(box.dataset.pk);
    const elements = stripe.elements({ mode: "payment", amount: Math.max(toMinor(currentTotal(form, box)), 100), currency: box.dataset.currency, appearance: { theme: "stripe", variables: { colorPrimary: "#e94560", borderRadius: "8px" } } });
    const payment = elements.create("payment", { layout: "tabs" });
    payment.mount(box.querySelector(".formglut-stripe-element"));
    const out = box.querySelector(".formglut-stripe-amount");
    const refresh = () => {
      const total = currentTotal(form, box);
      if (out) out.textContent = box.dataset.symbol + total.toFixed(decimals);
      elements.update({ amount: Math.max(toMinor(total), 100) });
      box.classList.toggle("is-free", total <= 0);
    };
    form.addEventListener("input", refresh);
    form.addEventListener("change", refresh);
    refresh();
    form.formglutStripe = { stripe, elements, total: () => currentTotal(form, box) };
  };
  start();
}
async function payBeforeSubmit(form, formData, ajaxUrl, showError2) {
  var _a;
  const pay = form.formglutStripe;
  if (!pay || pay.total() <= 0) return {};
  const { error: submitError } = await pay.elements.submit();
  if (submitError) {
    showError2(submitError.message);
    return false;
  }
  const intentData = new FormData();
  formData.forEach((v, k) => intentData.append(k, v));
  intentData.set("formglut_pay_step", "intent");
  const res = await fetch(ajaxUrl, { method: "POST", body: intentData, credentials: "same-origin" });
  const result = await res.json();
  if (!result.success || !((_a = result.data) == null ? void 0 : _a.payment)) return { result };
  const { error, paymentIntent } = await pay.stripe.confirmPayment({
    elements: pay.elements,
    clientSecret: result.data.payment.client_secret,
    confirmParams: { return_url: window.location.href },
    redirect: "if_required"
  });
  if (error) {
    showError2(error.message || __("The payment was not completed.", "formglut"));
    return false;
  }
  return { id: paymentIntent.id };
}
document.addEventListener("DOMContentLoaded", () => {
  initInputMasks();
  document.querySelectorAll(".formglut-form").forEach((form) => {
    form.addEventListener("submit", handleSubmit);
    initCounters(form);
    initPickers(form);
    initSearchable(form);
    initCalculations(form);
    initPayments(form);
    initUploads(form);
    initExtraFields(form);
    initSteps(form, validateScope);
  });
});
function markInvalid(input, message) {
  var _a;
  const field = input.closest(".formglut-field");
  const errEl = document.createElement("div");
  errEl.className = "formglut-field-error";
  errEl.id = (input.id || input.name || "formglut") + "-error";
  errEl.textContent = message;
  input.classList.add("formglut-input-error");
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", errEl.id);
  (_a = field || input.parentElement) == null ? void 0 : _a.appendChild(errEl);
}
function validateScope(scope) {
  const validationErrors = [];
  scope.querySelectorAll('.formglut-input, .formglut-consent-input, .formglut-choice input[type="radio"][required], .formglut-star-input[required]').forEach((input) => {
    var _a, _b;
    const field = input.closest(".formglut-field");
    if (field && (field.classList.contains("formglut-hidden") || field.classList.contains("formglut-conditional-hidden") || field.style.display === "none")) {
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      } else {
        input.value = "";
      }
      return;
    }
    if (input.dataset.confirmOf) {
      const primary = document.getElementById(input.dataset.confirmOf);
      input.setCustomValidity(primary && primary.value !== input.value ? input.dataset.validationMessage || __("Email addresses do not match.", "formglut") : "");
    }
    if (input.type === "file") checkFiles(input);
    const msg = ((_a = input.validity) == null ? void 0 : _a.patternMismatch) && input.dataset.patternMessage || (input.type === "file" && input.validationMessage && ((_b = input.files) == null ? void 0 : _b.length) ? input.validationMessage : "") || input.dataset.validationMessage || "";
    if (!input.checkValidity() && !(field == null ? void 0 : field.querySelector(".formglut-field-error"))) {
      markInvalid(input, msg || input.validationMessage);
      validationErrors.push(input);
    }
  });
  return validationErrors;
}
async function handleSubmit(e) {
  var _a, _b, _c;
  e.preventDefault();
  const form = e.currentTarget;
  const wrapper = form.closest(".formglut-form-wrapper");
  if (!wrapper) return;
  const successEl = wrapper.querySelector(".formglut-success");
  const errorEl = wrapper.querySelector(".formglut-error");
  const submitBtn = form.querySelector(".formglut-submit-btn");
  const btnText = submitBtn == null ? void 0 : submitBtn.querySelector(".formglut-btn-text");
  const btnSpinner = submitBtn == null ? void 0 : submitBtn.querySelector(".formglut-btn-spinner");
  if (successEl) {
    successEl.style.display = "none";
    successEl.textContent = "";
  }
  if (errorEl) {
    errorEl.style.display = "none";
    errorEl.textContent = "";
  }
  form.querySelectorAll(".formglut-field-error").forEach((el) => el.remove());
  form.querySelectorAll(".formglut-input-error").forEach((el) => {
    el.classList.remove("formglut-input-error");
    el.removeAttribute("aria-invalid");
    el.removeAttribute("aria-describedby");
  });
  const validationErrors = validateScope(form);
  if (validationErrors.length) {
    showStepOf(form, validationErrors[0]);
    validationErrors[0].focus();
    showError(errorEl, __("Please fix the errors above.", "formglut"));
    return;
  }
  const missingCaptcha = Array.from(form.querySelectorAll(".formglut-captcha:not(.formglut-captcha-invisible)")).find((el) => {
    const token = el.querySelector('[name="g-recaptcha-response"], [name="h-captcha-response"], [name="cf-turnstile-response"]');
    return token && !token.value;
  });
  if (missingCaptcha) {
    const errEl = document.createElement("div");
    errEl.className = "formglut-field-error";
    errEl.textContent = missingCaptcha.dataset.validationMessage || __("Please complete the captcha verification.", "formglut");
    missingCaptcha.appendChild(errEl);
    showError(errorEl, __("Please fix the errors above.", "formglut"));
    return;
  }
  if ((submitBtn == null ? void 0 : submitBtn.dataset.confirm) && !window.confirm(submitBtn.dataset.confirm)) return;
  if (submitBtn) submitBtn.disabled = true;
  if (btnText && (submitBtn == null ? void 0 : submitBtn.dataset.loadingText)) {
    btnText.dataset.text = btnText.textContent;
    btnText.textContent = submitBtn.dataset.loadingText;
  }
  if (btnText) btnText.style.opacity = "0.6";
  if (btnSpinner) btnSpinner.style.display = "inline";
  try {
    const { ajax_url, nonce, recaptcha_enabled, recaptcha_site_key, recaptcha_version } = window.formglutFrontend || {};
    if (!ajax_url || !nonce) {
      showError(errorEl, __("Configuration error. Please refresh the page.", "formglut"));
      return;
    }
    const formData = new FormData(form);
    formData.set("action", "formglut_submit_form");
    formData.set("nonce", nonce);
    formData.delete("formglut_nonce_field");
    formData.delete("_wp_http_referer");
    const v3Field = form.querySelector('[data-captcha="recaptcha-v3"]');
    const v3Key = (v3Field == null ? void 0 : v3Field.dataset.sitekey) || recaptcha_site_key;
    if ((v3Field || recaptcha_enabled && recaptcha_version !== "v2") && v3Key && typeof grecaptcha !== "undefined") {
      try {
        const token = await new Promise((resolve, reject) => grecaptcha.ready(() => grecaptcha.execute(v3Key, { action: "formglut_submit" }).then(resolve, reject)));
        formData.set("g-recaptcha-response", token);
      } catch {
      }
    }
    const pay = await payBeforeSubmit(form, formData, ajax_url, (msg) => showError(errorEl, msg));
    if (pay === false) return;
    if (pay.id) formData.set("formglut_payment_intent", pay.id);
    const result = pay.result || await (await fetch(ajax_url, {
      method: "POST",
      body: formData,
      credentials: "same-origin"
    })).json();
    if (result.success) {
      const conf = ((_a = result.data) == null ? void 0 : _a.confirmation) || {};
      form.dispatchEvent(new CustomEvent("formglut:submitted", { bubbles: true, detail: { formId: Number(form.dataset.formId), entryId: ((_b = result.data) == null ? void 0 : _b.entry_id) || 0 } }));
      const afterSubmit = conf.after_submit || "reset";
      showSuccess(successEl, ((_c = result.data) == null ? void 0 : _c.message) || __("Thank you for your submission!", "formglut"), conf.scroll !== false);
      if (afterSubmit !== "keep") {
        form.reset();
        resetSteps(form);
      }
      if (afterSubmit === "hide") {
        Array.from(form.children).forEach((el) => {
          if (!el.classList.contains("formglut-form-message") && !el.classList.contains("formglut-form-title")) el.style.display = "none";
        });
      }
      if (conf.autoclose > 0) {
        setTimeout(() => {
          if (successEl) successEl.style.display = "none";
        }, conf.autoclose * 1e3);
      }
      const redirectUrl = conf.redirect_url || form.dataset.redirect;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } else {
      const data = result.data || {};
      if (data.errors && typeof data.errors === "object") {
        Object.entries(data.errors).forEach(([fieldId, msg]) => {
          const input = form.querySelector(`[name="${fieldId}"], [name="${fieldId}[]"]`) || document.getElementById(fieldId);
          if (input) markInvalid(input, msg);
        });
        const firstBad = form.querySelector(".formglut-input-error");
        if (firstBad) showStepOf(form, firstBad);
        showError(errorEl, data.message || __("Please fix the errors above.", "formglut"));
      } else {
        showError(errorEl, data.message || __("Submission failed. Please try again.", "formglut"));
      }
    }
  } catch (err) {
    showError(errorEl, __("Network error. Please check your connection and try again.", "formglut"));
  } finally {
    resetCaptchas(form);
    if (submitBtn) submitBtn.disabled = false;
    if (btnText == null ? void 0 : btnText.dataset.text) btnText.textContent = btnText.dataset.text;
    if (btnText) btnText.style.opacity = "1";
    if (btnSpinner) btnSpinner.style.display = "none";
  }
}
function showSuccess(el, msg, scroll = true) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  if (scroll) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
function showError(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".formglut-spin-btn");
  if (!btn) return;
  const input = btn.parentElement.querySelector('input[type="number"]');
  if (!input || input.readOnly || input.disabled) return;
  const step = parseFloat(input.step) || 1;
  const min = input.min !== "" ? parseFloat(input.min) : -Infinity;
  const max = input.max !== "" ? parseFloat(input.max) : Infinity;
  const decimals = (String(step).split(".")[1] || "").length;
  let next = (parseFloat(input.value) || 0) + step * Number(btn.dataset.spin);
  if (next > max) next = input.dataset.wrap && isFinite(min) ? min : max;
  if (next < min) next = input.dataset.wrap && isFinite(max) ? max : min;
  input.value = next.toFixed(decimals);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".formglut-select-all-btn");
  if (!btn) return;
  const select = btn.parentElement.querySelector("select[multiple]");
  if (!select) return;
  const max = parseInt(select.dataset.maxSelections, 10) || Infinity;
  let n = 0;
  Array.from(select.options).forEach((o) => {
    if (!o.disabled) o.selected = n++ < max;
  });
  select.dispatchEvent(new Event("change", { bubbles: true }));
});
document.addEventListener("change", (e) => {
  const el = e.target;
  const group = el.closest(".formglut-choice-group[data-max-selections]");
  if (group && el.type === "checkbox") {
    const max = parseInt(group.dataset.maxSelections, 10);
    const boxes = group.querySelectorAll('input[type="checkbox"]');
    const checked = group.querySelectorAll('input[type="checkbox"]:checked').length;
    boxes.forEach((b) => {
      if (!b.checked && !b.hasAttribute("data-disabled-by-option")) b.disabled = checked >= max;
    });
    return;
  }
  if (el.matches && el.matches("select[multiple][data-max-selections]")) {
    const max = parseInt(el.dataset.maxSelections, 10);
    const selected = Array.from(el.selectedOptions);
    selected.slice(max).forEach((o) => {
      o.selected = false;
    });
  }
});
function resetCaptchas(form) {
  var _a, _b;
  try {
    if (((_a = window.grecaptcha) == null ? void 0 : _a.reset) && form.querySelector(".g-recaptcha")) window.grecaptcha.reset();
    if (((_b = window.hcaptcha) == null ? void 0 : _b.reset) && form.querySelector(".h-captcha")) window.hcaptcha.reset();
    form.querySelectorAll(".cf-turnstile").forEach((el) => {
      var _a2, _b2;
      return (_b2 = (_a2 = window.turnstile) == null ? void 0 : _a2.reset) == null ? void 0 : _b2.call(_a2, el);
    });
  } catch {
  }
}
function passwordScore(v) {
  let score = 0;
  if (v.length >= 8) score++;
  if (v.length >= 12) score++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  return Math.min(score, 4);
}
document.addEventListener("click", (e) => {
  var _a, _b, _c;
  const toggle = e.target.closest(".formglut-password-toggle");
  if (toggle) {
    const input = toggle.parentElement.querySelector("input");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    toggle.textContent = show ? toggle.dataset.hide : toggle.dataset.show;
    return;
  }
  const swatch = e.target.closest(".formglut-swatch");
  if (swatch) {
    const picker = swatch.closest(".formglut-color-picker");
    picker.querySelectorAll(".formglut-swatch").forEach((b) => b.classList.toggle("selected", b === swatch));
    picker.querySelector(".formglut-color-value").value = swatch.dataset.color;
    const custom = picker.querySelector(".formglut-color-input");
    if (custom) custom.value = swatch.dataset.color;
    return;
  }
  const sectionBtn = e.target.closest(".formglut-section-toggle");
  if (sectionBtn) {
    const section = sectionBtn.closest(".formglut-field-section_break");
    const collapsed = !section.classList.contains("formglut-section-collapsed");
    section.classList.toggle("formglut-section-collapsed", collapsed);
    sectionBtn.setAttribute("aria-expanded", String(!collapsed));
    sectionBtn.textContent = collapsed ? sectionBtn.dataset.closed : sectionBtn.dataset.open;
    applySectionState(section);
    return;
  }
  const open = e.target.closest(".formglut-terms-open");
  if (open) {
    e.preventDefault();
    (_b = (_a = document.getElementById(open.dataset.dialog)) == null ? void 0 : _a.showModal) == null ? void 0 : _b.call(_a);
    return;
  }
  const close = e.target.closest(".formglut-terms-close");
  if (close) (_c = close.closest("dialog")) == null ? void 0 : _c.close();
});
function applySectionState(section) {
  const collapsed = section.classList.contains("formglut-section-collapsed");
  let el = section.nextElementSibling;
  while (el && !el.classList.contains("formglut-field-section_break") && !el.classList.contains("formglut-form-actions") && el.tagName !== "INPUT") {
    el.classList.toggle("formglut-section-hidden", collapsed);
    el = el.nextElementSibling;
  }
}
document.addEventListener("input", (e) => {
  var _a, _b, _c;
  const el = e.target;
  if ((_a = el.matches) == null ? void 0 : _a.call(el, "input[data-strength-meter]")) {
    const meter = document.querySelector(`.formglut-strength[data-for="${el.id}"]`);
    if (meter) {
      const score = el.value ? passwordScore(el.value) : 0;
      const labels = [__("Very weak", "formglut"), __("Weak", "formglut"), __("Fair", "formglut"), __("Good", "formglut"), __("Strong", "formglut")];
      meter.dataset.score = el.value ? String(score) : "";
      meter.querySelector(".formglut-strength-label").textContent = el.value ? labels[score] : __("Password strength", "formglut");
    }
  }
  if ((_b = el.matches) == null ? void 0 : _b.call(el, '.formglut-range input[type="range"]')) {
    const out = el.closest(".formglut-range").querySelector(".formglut-range-value");
    if (out) out.textContent = (out.dataset.prefix || "") + el.value + (out.dataset.suffix || "");
  }
  if ((_c = el.matches) == null ? void 0 : _c.call(el, ".formglut-color-input")) {
    const picker = el.closest(".formglut-color-picker");
    picker.querySelector(".formglut-color-value").value = el.value;
    picker.querySelectorAll(".formglut-swatch").forEach((b) => b.classList.toggle("selected", b.dataset.color.toLowerCase() === el.value.toLowerCase()));
  }
});
document.addEventListener("scroll", (e) => {
  const box = e.target;
  if (!box.dataset || !box.dataset.requireScroll) return;
  if (box.scrollTop + box.clientHeight >= box.scrollHeight - 4) {
    const cb = document.getElementById(box.dataset.requireScroll);
    if (cb) cb.disabled = false;
  }
}, true);
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".formglut-section-collapsed").forEach(applySectionState);
});
//# sourceMappingURL=form-frontend.js.map
