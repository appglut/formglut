/**
 * FormGlut Input Mask Handler
 *
 * Provides real-time input masking for form fields.
 * Supports:
 * - Pattern masking (9=digit, a=letter, *=alphanumeric)
 * - Custom placeholder characters
 * - Reversible mask (backspace support)
 * - Clear on invalid option
 */

class InputMask {
  constructor(input, options = {}) {
    this.input = input;
    this.mask = options.mask || '';
    this.placeholder = options.placeholder || '_';
    this.reversible = options.reversible || false;
    this.clearOnInvalid = options.clearOnInvalid || false;

    // Compile the mask pattern
    this.maskPattern = this.compileMask(this.mask);

    // Track cursor position
    this.cursorPosition = 0;

    // Bind events
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
      if (char === '9') {
        tokens.push({ type: 'digit', char: '9' });
      } else if (char === 'a') {
        tokens.push({ type: 'letter', char: 'a' });
      } else if (char === '*') {
        tokens.push({ type: 'alphanumeric', char: '*' });
      } else {
        tokens.push({ type: 'literal', char });
      }
    }
    return tokens;
  }

  init() {
    this.input.addEventListener('input', this.handleInput);
    this.input.addEventListener('keydown', this.handleKeyDown);
    this.input.addEventListener('focus', this.handleFocus);
    this.input.addEventListener('blur', this.handleBlur);

    // Apply mask to initial value if present
    if (this.input.value) {
      const masked = this.applyMask(this.input.value);
      this.input.value = masked;
    }
  }

  destroy() {
    this.input.removeEventListener('input', this.handleInput);
    this.input.removeEventListener('keydown', this.handleKeyDown);
    this.input.removeEventListener('focus', this.handleFocus);
    this.input.removeEventListener('blur', this.handleBlur);
  }

  handleFocus(e) {
    // Move cursor to first placeholder position
    const firstPlaceholder = this.findFirstPlaceholderPosition();
    if (firstPlaceholder >= 0) {
      this.setCursorPosition(firstPlaceholder);
    }
  }

  handleBlur(e) {
    // On blur, if field is incomplete, either clear or leave as-is
    if (this.clearOnInvalid && !this.isComplete()) {
      this.input.value = '';
    }
  }

  handleKeyDown(e) {
    // Handle backspace with reversible mask
    if (e.key === 'Backspace' && this.reversible) {
      e.preventDefault();
      this.handleBackspace();
    } else if (e.key === 'Backspace' && !this.reversible) {
      // Standard backspace - just let browser handle it
      // But we'll re-apply mask after
    }
  }

  handleInput(e) {
    if (e.inputType === 'deleteContentBackward' && !this.reversible) {
      // For non-reversible mask, let backspace work naturally
      // then re-apply
    }

    const rawValue = this.input.value;
    const masked = this.applyMask(rawValue);
    this.input.value = masked;

    // Update cursor position
    this.updateCursorPositionAfterInput();

    // Dispatch custom event for validation
    this.input.dispatchEvent(new CustomEvent('mask:change', {
      detail: { masked: masked, complete: this.isComplete() }
    }));
  }

  /**
   * Apply mask to raw input value
   */
  applyMask(value) {
    if (!value) return '';

    const valueChars = value.split('');
    const result = [];
    let valueIndex = 0;

    for (let i = 0; i < this.maskPattern.length && valueIndex < valueChars.length; i++) {
      const token = this.maskPattern[i];
      const valueChar = valueChars[valueIndex];

      if (token.type === 'literal') {
        result.push(token.char);
        // If user typed this literal, skip it
        if (valueChar === token.char) {
          valueIndex++;
        }
      } else if (token.type === 'digit') {
        if (/\d/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        }
      } else if (token.type === 'letter') {
        if (/[a-zA-Z]/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        }
      } else if (token.type === 'alphanumeric') {
        if (/[a-zA-Z0-9]/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        }
      }
    }

    return result.join('');
  }

  /**
   * Handle backspace with reversible mask
   */
  handleBackspace() {
    const currentValue = this.input.value;
    const cursorPos = this.getCursorPosition();

    // Find the previous filled position
    let deletePos = -1;
    for (let i = cursorPos - 1; i >= 0; i--) {
      const token = this.maskPattern[i];
      if (token && token.type !== 'literal') {
        deletePos = i;
        break;
      }
    }

    if (deletePos >= 0) {
      // Remove the character and rebuild the value
      const chars = currentValue.split('');
      chars[deletePos] = this.placeholder;
      this.input.value = chars.join('');
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
      if (token.type !== 'literal') {
        if (currentValue[i] === this.placeholder || currentValue[i] === undefined) {
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

    // Count required positions
    let requiredCount = 0;
    for (const token of this.maskPattern) {
      if (token.type !== 'literal') {
        requiredCount++;
      }
    }

    // Count filled positions
    const filledChars = value.replace(/[^\da-zA-Z]/g, '').length;

    return filledChars === requiredCount;
  }

  /**
   * Get unmasked value (for form submission)
   */
  getUnmaskedValue() {
    const value = this.input.value;
    if (!value) return '';

    // Extract only the user-entered characters (not literals)
    const result = [];
    let valueIndex = 0;

    for (let i = 0; i < this.maskPattern.length && valueIndex < value.length; i++) {
      const token = this.maskPattern[i];
      const valueChar = value[valueIndex];

      if (token.type === 'literal') {
        if (valueChar === token.char) {
          valueIndex++;
        }
      } else {
        if (token.type === 'digit' && /\d/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        } else if (token.type === 'letter' && /[a-zA-Z]/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        } else if (token.type === 'alphanumeric' && /[a-zA-Z0-9]/.test(valueChar)) {
          result.push(valueChar);
          valueIndex++;
        } else {
          valueIndex++;
        }
      }
    }

    return result.join('');
  }

  /**
   * Validate value against mask pattern
   */
  validate(value) {
    if (!value) return false;

    // Count required positions in mask
    const requiredCount = this.maskPattern.filter(
      token => token.type !== 'literal'
    ).length;

    // Count valid characters in value
    const validChars = value.replace(/[^\da-zA-Z]/g, '').length;

    return validChars >= requiredCount;
  }
}

/**
 * Initialize all masked inputs on the page
 */
function initInputMasks() {
  const maskedInputs = document.querySelectorAll('[data-mask]');

  maskedInputs.forEach(input => {
    const mask = input.dataset.mask || '';
    const placeholder = input.dataset.maskPlaceholder || '_';
    const reversible = input.dataset.maskReversible === '1';
    const clearOnInvalid = input.dataset.maskClearInvalid === '1';

    // Initialize the mask handler
    new InputMask(input, {
      mask,
      placeholder,
      reversible,
      clearOnInvalid
    });
  });
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInputMasks);
} else {
  initInputMasks();
}

// Export for manual initialization
export { InputMask, initInputMasks };
