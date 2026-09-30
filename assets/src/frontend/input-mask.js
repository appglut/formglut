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
    this.reversible = options.reversible || false;
    this.clearOnInvalid = options.clearOnInvalid || false;

    console.log('[FormGlut Mask] Constructor called with:', {
      mask: this.mask,
      reversible: this.reversible,
      clearOnInvalid: this.clearOnInvalid
    });

    // Compile the mask pattern
    this.maskPattern = this.compileMask(this.mask);

    console.log('[FormGlut Mask] Compiled mask pattern:', this.maskPattern);

    // Track previous value to detect actual changes
    this.previousValue = '';

    // Bind events
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
    // Store the original value before any processing
    const originalValue = this.input.value;

    console.log('[FormGlut Mask] init() called with original value:', originalValue);

    this.input.addEventListener('input', this.handleInput);
    this.input.addEventListener('keydown', this.handleKeyDown);
    this.input.addEventListener('blur', this.handleBlur);

    // Apply mask to initial value if present
    if (originalValue) {
      const formatted = this.formatValue(originalValue);
      console.log('[FormGlut Mask] formatted value:', formatted);

      // Only apply formatted value if it's not empty and different from original
      // If formatting removes everything (value doesn't match mask), keep original
      if (formatted && formatted !== originalValue) {
        this.input.value = formatted;
      } else if (!formatted) {
        // Keep original value if it doesn't match the mask pattern
        console.log('[FormGlut Mask] value does not match mask, keeping original');
        this.input.value = originalValue;
      }
    }

    this.previousValue = this.input.value;
    console.log('[FormGlut Mask] init() final value:', this.input.value);
  }

  destroy() {
    this.input.removeEventListener('input', this.handleInput);
    this.input.removeEventListener('keydown', this.handleKeyDown);
    this.input.removeEventListener('blur', this.handleBlur);
  }

  /**
   * Handle blur event (when user leaves the field)
   * Clear if not match option is enabled and value doesn't match mask
   */
  handleBlur() {
    if (this.clearOnInvalid && this.input.value) {
      const formatted = this.formatValue(this.input.value);
      // If formatting results in empty string, the value doesn't match mask
      if (!formatted) {
        this.input.value = '';
        this.previousValue = '';
        console.log('[FormGlut Mask] Cleared invalid input on blur');
      }
    }
  }

  handleKeyDown(e) {
    // Handle backspace
    if (e.key === 'Backspace') {
      const cursorPos = this.input.selectionStart;

      if (this.reversible) {
        e.preventDefault();
        this.handleBackspace(cursorPos);
      } else {
        // For non-reversible, check if we're at a literal character
        const token = this.maskPattern[cursorPos - 1];
        if (token && token.type === 'literal') {
          // If before a literal, skip back over it
          let newPos = cursorPos - 1;
          while (newPos >= 0 && this.maskPattern[newPos] && this.maskPattern[newPos].type === 'literal') {
            newPos--;
          }
          if (newPos >= 0 && this.maskPattern[newPos] && this.maskPattern[newPos].type !== 'literal') {
            // Delete the character before the literal
            const value = this.input.value.split('');
            value[newPos] = '';
            this.input.value = value.join('');
            this.setCursorPosition(newPos);
            e.preventDefault();
          }
        }
      }
    }
  }

  handleInput(e) {
    const rawValue = this.input.value;

    // Get the current cursor position
    const cursorPos = this.input.selectionStart;

    // Format the value
    const formatted = this.formatValue(rawValue);

    if (formatted !== rawValue) {
      this.input.value = formatted;

      // Calculate new cursor position
      const newCursorPos = this.calculateNewCursorPosition(rawValue, formatted, cursorPos);
      this.setCursorPosition(Math.min(newCursorPos, formatted.length));
    }

    // Clear if not match option
    // If enabled, clear the field when input doesn't match the mask pattern
    if (this.clearOnInvalid && rawValue && !formatted) {
      this.input.value = '';
      this.previousValue = '';
      return;
    }

    this.previousValue = formatted;

    // Dispatch custom event for validation
    this.input.dispatchEvent(new CustomEvent('mask:change', {
      detail: { masked: formatted, complete: this.isComplete() }
    }));
  }

  /**
   * Format a value according to the mask
   */
  formatValue(value) {
    if (!value) return '';

    // Trim the value to remove whitespace
    value = value.toString().trim();
    if (!value) return '';

    // Filter only characters that match the mask pattern requirements
    const valueChars = value.split('');
    const result = [];
    let maskIndex = 0;

    // First, collect all matching characters
    const matchingChars = [];
    for (const valueChar of valueChars) {
      for (let i = maskIndex; i < this.maskPattern.length; i++) {
        const token = this.maskPattern[i];
        if (token.type === 'literal') {
          // Will add later when we have input
          continue;
        } else if (token.type === 'digit' && /\d/.test(valueChar)) {
          matchingChars.push({ char: valueChar, token });
          maskIndex = i + 1;
          break;
        } else if (token.type === 'letter' && /[a-zA-Z]/.test(valueChar)) {
          matchingChars.push({ char: valueChar, token });
          maskIndex = i + 1;
          break;
        } else if (token.type === 'alphanumeric' && /[a-zA-Z0-9]/.test(valueChar)) {
          matchingChars.push({ char: valueChar, token });
          maskIndex = i + 1;
          break;
        }
      }
    }

    // If no matching characters, return empty
    if (matchingChars.length === 0) return '';

    // Build the result with literals and matching characters
    maskIndex = 0;
    let charIndex = 0;
    for (let i = 0; i < this.maskPattern.length && charIndex < matchingChars.length; i++) {
      const token = this.maskPattern[i];
      if (token.type === 'literal') {
        result.push(token.char);
      } else {
        result.push(matchingChars[charIndex].char);
        charIndex++;
      }
    }

    return result.join('');
  }

  /**
   * Calculate new cursor position after formatting
   */
  calculateNewCursorPosition(oldValue, newValue, oldCursorPos) {
    // If values are the same length, keep cursor at same relative position
    if (oldValue.length === newValue.length) {
      return Math.min(oldCursorPos, newValue.length);
    }

    // Find the position in the new value
    let newPos = 0;
    let oldCharsProcessed = 0;

    for (let i = 0; i < this.maskPattern.length && newPos < newValue.length && oldCharsProcessed < oldCursorPos; i++) {
      const token = this.maskPattern[i];
      if (token.type === 'literal') {
        if (newValue[newPos] === token.char) {
          newPos++;
        }
      } else {
        newPos++;
        oldCharsProcessed++;
      }
    }

    // Move to next editable position
    while (newPos < newValue.length && newPos < this.maskPattern.length) {
      const token = this.maskPattern[newPos];
      if (token && token.type === 'literal') {
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

    // Find the previous editable position
    let deletePos = cursorPos - 1;
    while (deletePos >= 0) {
      const token = this.maskPattern[deletePos];
      if (token && token.type !== 'literal') {
        break;
      }
      deletePos--;
    }

    if (deletePos >= 0) {
      // Remove the character and rebuild
      const chars = currentValue.split('');
      chars[deletePos] = '';
      const newValue = chars.filter(c => c !== '').join('');
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

    // Count required positions in mask
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
    return value.replace(/[^\da-zA-Z]/g, '');
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

  console.log('[FormGlut Mask] Found', maskedInputs.length, 'masked inputs');

  maskedInputs.forEach((input, index) => {
    // Skip if already initialized
    if (input._inputMaskInstance) {
      console.log('[FormGlut Mask] Input', index, 'already initialized');
      return;
    }

    // Skip readOnly inputs (like in FormEditor preview)
    // These don't need masking since they're just for display
    if (input.readOnly) {
      console.log('[FormGlut Mask] Input', index, 'is readOnly, skipping');
      return;
    }

    const mask = input.dataset.mask || '';
    const reversible = input.dataset.maskReversible === '1';
    const clearOnInvalid = input.dataset.maskClearInvalid === '1';

    console.log('[FormGlut Mask] Initializing input', index, {
      mask,
      reversible,
      clearOnInvalid,
      inputId: input.id
    });

    // Initialize the mask handler
    const maskInstance = new InputMask(input, {
      mask,
      reversible,
      clearOnInvalid
    });

    // Store instance to prevent double initialization
    input._inputMaskInstance = maskInstance;

    console.log('[FormGlut Mask] Input', index, 'initialized successfully');
  });
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInputMasks);
} else {
  // Initialize immediately if DOM is already ready
  if (typeof window !== 'undefined' && document.body) {
    initInputMasks();
  }
}

// Also initialize when DOM is fully loaded (for dynamically loaded forms)
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure forms are rendered
  setTimeout(initInputMasks, 50);
});

// Expose to window object for manual initialization
if (typeof window !== 'undefined') {
  window.initInputMasks = initInputMasks;
  window.InputMask = InputMask;
}

// Export for use in other modules
export { InputMask, initInputMasks };
