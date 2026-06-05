import { _ as __ } from "./chunks/default-i18n-Bi0ZJkXv.js";
class InputMask {
  constructor(input, options = {}) {
    this.input = input;
    this.mask = options.mask || "";
    this.placeholder = options.placeholder || "_";
    this.reversible = options.reversible || false;
    this.clearOnInvalid = options.clearOnInvalid || false;
    this.maskPattern = this.compileMask(this.mask);
    this.cursorPosition = 0;
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
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
    this.input.addEventListener("input", this.handleInput);
    this.input.addEventListener("keydown", this.handleKeyDown);
    this.input.addEventListener("focus", this.handleFocus);
    this.input.addEventListener("blur", this.handleBlur);
    if (this.input.value) {
      const masked = this.applyMask(this.input.value);
      this.input.value = masked;
    }
  }
  destroy() {
    this.input.removeEventListener("input", this.handleInput);
    this.input.removeEventListener("keydown", this.handleKeyDown);
    this.input.removeEventListener("focus", this.handleFocus);
    this.input.removeEventListener("blur", this.handleBlur);
  }
  handleFocus(e) {
    const firstPlaceholder = this.findFirstPlaceholderPosition();
    if (firstPlaceholder >= 0) {
      this.setCursorPosition(firstPlaceholder);
    }
  }
  handleBlur(e) {
    if (this.clearOnInvalid && !this.isComplete()) {
      this.input.value = "";
    }
  }
  handleKeyDown(e) {
    if (e.key === "Backspace" && this.reversible) {
      e.preventDefault();
      this.handleBackspace();
    } else if (e.key === "Backspace" && !this.reversible) ;
  }
  handleInput(e) {
    if (e.inputType === "deleteContentBackward" && !this.reversible) ;
    const rawValue = this.input.value;
    const masked = this.applyMask(rawValue);
    this.input.value = masked;
    this.updateCursorPositionAfterInput();
    this.input.dispatchEvent(new CustomEvent("mask:change", {
      detail: { masked, complete: this.isComplete() }
    }));
  }
  /**
   * Apply mask to raw input value
   */
  applyMask(value) {
    if (!value) return "";
    const valueChars = value.split("");
    const result = [];
    let valueIndex = 0;
    for (let i = 0; i < this.maskPattern.length && valueIndex < valueChars.length; i++) {
      const token = this.maskPattern[i];
      const valueChar = valueChars[valueIndex];
      if (token.type === "literal") {
        result.push(token.char);
        if (valueChar === token.char) {
          valueIndex++;
        }
      } else if (token.type === "digit") {
        if (/\d/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        }
      } else if (token.type === "letter") {
        if (/[a-zA-Z]/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        }
      } else if (token.type === "alphanumeric") {
        if (/[a-zA-Z0-9]/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        }
      }
    }
    return result.join("");
  }
  /**
   * Handle backspace with reversible mask
   */
  handleBackspace() {
    const currentValue = this.input.value;
    const cursorPos = this.getCursorPosition();
    let deletePos = -1;
    for (let i = cursorPos - 1; i >= 0; i--) {
      const token = this.maskPattern[i];
      if (token && token.type !== "literal") {
        deletePos = i;
        break;
      }
    }
    if (deletePos >= 0) {
      const chars = currentValue.split("");
      chars[deletePos] = this.placeholder;
      this.input.value = chars.join("");
      this.setCursorPosition(deletePos);
    }
  }
  /**
   * Find the first placeholder position in the mask
   */
  findFirstPlaceholderPosition() {
    const currentValue = this.input.value;
    for (let i = 0; i < this.maskPattern.length; i++) {
      const token = this.maskPattern[i];
      if (token.type !== "literal") {
        if (currentValue[i] === this.placeholder || currentValue[i] === void 0) {
          return i;
        }
      }
    }
    return this.input.value.length;
  }
  /**
   * Update cursor position after input
   */
  updateCursorPositionAfterInput() {
    const firstPlaceholder = this.findFirstPlaceholderPosition();
    if (firstPlaceholder >= 0 && firstPlaceholder <= this.maskPattern.length) {
      this.setCursorPosition(firstPlaceholder);
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
    this.input.setSelectionRange(pos, pos);
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
    const result = [];
    let valueIndex = 0;
    for (let i = 0; i < this.maskPattern.length && valueIndex < value.length; i++) {
      const token = this.maskPattern[i];
      const valueChar = value[valueIndex];
      if (token.type === "literal") {
        if (valueChar === token.char) {
          valueIndex++;
        }
      } else {
        if (token.type === "digit" && /\d/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        } else if (token.type === "letter" && /[a-zA-Z]/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        } else if (token.type === "alphanumeric" && /[a-zA-Z0-9]/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        } else {
          valueIndex++;
        }
      }
    }
    return result.join("");
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
  maskedInputs.forEach((input) => {
    const mask = input.dataset.mask || "";
    const placeholder = input.dataset.maskPlaceholder || "_";
    const reversible = input.dataset.maskReversible === "1";
    const clearOnInvalid = input.dataset.maskClearInvalid === "1";
    new InputMask(input, {
      mask,
      placeholder,
      reversible,
      clearOnInvalid
    });
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initInputMasks);
} else {
  initInputMasks();
}
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
  form.querySelectorAll(".formglut-input").forEach((input) => {
    var _a2;
    const msg = input.dataset.validationMessage || "";
    if (!input.checkValidity()) {
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
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.style.opacity = "0.6";
  if (btnSpinner) btnSpinner.style.display = "inline";
  try {
    const { ajax_url, nonce, recaptcha_enabled, recaptcha_site_key } = window.formglutFrontend || {};
    if (!ajax_url || !nonce) {
      showError(errorEl, __("Configuration error. Please refresh the page.", "formglut"));
      return;
    }
    const formData = new FormData(form);
    formData.set("action", "formglut_submit_form");
    formData.set("nonce", nonce);
    formData.delete("formglut_nonce_field");
    formData.delete("_wp_http_referer");
    if (recaptcha_enabled && recaptcha_site_key && typeof grecaptcha !== "undefined") {
      try {
        const token = await grecaptcha.execute(recaptcha_site_key, { action: "formglut_submit" });
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
          const input = form.querySelector(`[name="${fieldId}"], [name="${fieldId}[]"]`);
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
    if (submitBtn) submitBtn.disabled = false;
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
//# sourceMappingURL=form-frontend.js.map
