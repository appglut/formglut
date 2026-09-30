import { _ as __ } from "./chunks/default-i18n-Bi0ZJkXv.js";
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
document.addEventListener("DOMContentLoaded", () => {
  initInputMasks();
  document.querySelectorAll(".formglut-form").forEach((form) => {
    form.addEventListener("submit", handleSubmit);
    initCharacterCount(form);
  });
});
function initCharacterCount(form) {
  form.querySelectorAll(".formglut-input[maxlength], .formglut-input[minlength], textarea[maxlength], textarea[minlength]").forEach((input) => {
    const maxLength = parseInt(input.getAttribute("maxlength")) || 0;
    const minLength = parseInt(input.getAttribute("minlength")) || 0;
    if (!maxLength && !minLength) return;
    const field = input.closest(".formglut-field");
    if (!field) return;
    const counterWrapper = document.createElement("div");
    counterWrapper.className = "formglut-char-counter-wrapper";
    counterWrapper.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-top: 4px;";
    const counterEl = document.createElement("span");
    counterEl.className = "formglut-char-counter";
    counterEl.textContent = `Input limit is ${maxLength}`;
    counterEl.style.cssText = "font-size: 12px; color: #64748b;";
    const warningEl = document.createElement("span");
    warningEl.className = "formglut-char-warning";
    warningEl.textContent = "";
    warningEl.style.cssText = "font-size: 12px; color: #dc2626; font-weight: 500;";
    counterWrapper.appendChild(counterEl);
    counterWrapper.appendChild(warningEl);
    const inputGroup = input.closest(".formglut-input-group");
    if (inputGroup && inputGroup.parentElement) {
      inputGroup.parentElement.insertBefore(counterWrapper, inputGroup.nextSibling);
    } else {
      field.appendChild(counterWrapper);
    }
    const updateCount = () => {
      const length = input.value.length;
      let counterText = "";
      if (length > 0) {
        counterText = "Typing";
      } else {
        counterText = "Input";
      }
      if (maxLength && minLength) {
        counterText += ` limit is ${minLength}-${maxLength}`;
      } else if (maxLength) {
        counterText += ` limit is ${maxLength}`;
      } else if (minLength) {
        counterText += ` minimum is ${minLength}`;
      }
      counterEl.textContent = counterText;
      const remaining = maxLength ? maxLength - length : 0;
      const minMet = minLength ? length >= minLength : true;
      if (maxLength && remaining <= 0) {
        counterEl.style.color = "#dc2626";
        counterEl.style.fontWeight = "600";
        warningEl.textContent = `Character limit reached!`;
        input.classList.add("formglut-input-error");
      } else if (minLength && !minMet && length > 0) {
        const needed = minLength - length;
        counterEl.style.color = "#f59e0b";
        counterEl.style.fontWeight = "500";
        warningEl.textContent = `${needed} more character${needed !== 1 ? "s" : ""} needed`;
        input.classList.add("formglut-input-error");
      } else if (maxLength && remaining <= 5 && remaining > 0) {
        counterEl.style.color = "#f59e0b";
        counterEl.style.fontWeight = "500";
        warningEl.textContent = `${remaining} character${remaining !== 1 ? "s" : ""} remaining`;
        input.classList.remove("formglut-input-error");
      } else {
        counterEl.style.color = "#64748b";
        counterEl.style.fontWeight = "400";
        warningEl.textContent = "";
        input.classList.remove("formglut-input-error");
      }
    };
    input.addEventListener("input", updateCount);
    input.addEventListener("blur", updateCount);
    updateCount();
  });
}
async function handleSubmit(e) {
  var _a;
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
  form.querySelectorAll(".formglut-input-error").forEach((el) => el.classList.remove("formglut-input-error"));
  const validationErrors = [];
  form.querySelectorAll('.formglut-input, .formglut-consent-input, .formglut-choice input[type="radio"][required]').forEach((input) => {
    var _a2;
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
    const msg = input.dataset.validationMessage || "";
    if (!input.checkValidity() && !(field == null ? void 0 : field.querySelector(".formglut-field-error"))) {
      const errEl = document.createElement("div");
      errEl.className = "formglut-field-error";
      errEl.textContent = msg || input.validationMessage;
      input.classList.add("formglut-input-error");
      (_a2 = input.closest(".formglut-field")) == null ? void 0 : _a2.appendChild(errEl);
      validationErrors.push(input);
    }
  });
  if (validationErrors.length) {
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
    const response = await fetch(ajax_url, {
      method: "POST",
      body: formData,
      credentials: "same-origin"
    });
    const result = await response.json();
    if (result.success) {
      showSuccess(successEl, ((_a = result.data) == null ? void 0 : _a.message) || __("Thank you for your submission!", "formglut"));
      form.reset();
      const redirectUrl = form.dataset.redirect;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } else {
      const data = result.data || {};
      if (data.errors && typeof data.errors === "object") {
        Object.entries(data.errors).forEach(([fieldId, msg]) => {
          var _a2;
          const input = form.querySelector(`[name="${fieldId}"], [name="${fieldId}[]"]`) || document.getElementById(fieldId);
          if (input) {
            input.classList.add("formglut-input-error");
            const errEl = document.createElement("div");
            errEl.className = "formglut-field-error";
            errEl.textContent = msg;
            (_a2 = input.closest(".formglut-field")) == null ? void 0 : _a2.appendChild(errEl);
          }
        });
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
function showSuccess(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
