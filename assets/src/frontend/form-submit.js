/**
 * FormGlut Frontend — Form Submission Handler.
 *
 * Binds to all .formglut-form elements on the page.
 * Handles client-side validation, AJAX submission, reCAPTCHA, and UI feedback.
 */

import { __ } from '@wordpress/i18n';
import './formglut-frontend.css';
import { initInputMasks } from './input-mask.js';
import './conditional-logic.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize input masks for all masked fields
  initInputMasks();

  document.querySelectorAll('.formglut-form').forEach(form => {
    form.addEventListener('submit', handleSubmit);
    initCharacterCount(form);
  });
});

/**
 * Initialize character count for inputs with maxlength/minlength.
 */
function initCharacterCount(form) {
  form.querySelectorAll('.formglut-input[maxlength], .formglut-input[minlength], textarea[maxlength], textarea[minlength]').forEach(input => {
    const maxLength = parseInt(input.getAttribute('maxlength')) || 0;
    const minLength = parseInt(input.getAttribute('minlength')) || 0;

    if (!maxLength && !minLength) return;

    const field = input.closest('.formglut-field');
    if (!field) return;

    // Create wrapper for counter and warning
    const counterWrapper = document.createElement('div');
    counterWrapper.className = 'formglut-char-counter-wrapper';
    counterWrapper.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-top: 4px;';

    // Create character count element
    const counterEl = document.createElement('span');
    counterEl.className = 'formglut-char-counter';
    counterEl.textContent = `Input limit is ${maxLength}`;
    counterEl.style.cssText = 'font-size: 12px; color: #64748b;';

    // Create warning message element
    const warningEl = document.createElement('span');
    warningEl.className = 'formglut-char-warning';
    warningEl.textContent = '';
    warningEl.style.cssText = 'font-size: 12px; color: #dc2626; font-weight: 500;';

    counterWrapper.appendChild(counterEl);
    counterWrapper.appendChild(warningEl);

    // Find input-group and add counter after it
    const inputGroup = input.closest('.formglut-input-group');
    if (inputGroup && inputGroup.parentElement) {
      inputGroup.parentElement.insertBefore(counterWrapper, inputGroup.nextSibling);
    } else {
      field.appendChild(counterWrapper);
    }

    // Update count on input
    const updateCount = () => {
      const length = input.value.length;

      // Build counter text based on min/max length
      let counterText = '';
      if (length > 0) {
        counterText = 'Typing';
      } else {
        counterText = 'Input';
      }

      if (maxLength && minLength) {
        counterText += ` limit is ${minLength}-${maxLength}`;
      } else if (maxLength) {
        counterText += ` limit is ${maxLength}`;
      } else if (minLength) {
        counterText += ` minimum is ${minLength}`;
      }
      counterEl.textContent = counterText;

      // Calculate remaining for max length
      const remaining = maxLength ? maxLength - length : 0;
      const minMet = minLength ? length >= minLength : true;

      // Update warning based on validation state
      if (maxLength && remaining <= 0) {
        counterEl.style.color = '#dc2626';
        counterEl.style.fontWeight = '600';
        warningEl.textContent = `Character limit reached!`;
        input.classList.add('formglut-input-error');
      } else if (minLength && !minMet && length > 0) {
        const needed = minLength - length;
        counterEl.style.color = '#f59e0b';
        counterEl.style.fontWeight = '500';
        warningEl.textContent = `${needed} more character${needed !== 1 ? 's' : ''} needed`;
        input.classList.add('formglut-input-error');
      } else if (maxLength && remaining <= 5 && remaining > 0) {
        counterEl.style.color = '#f59e0b';
        counterEl.style.fontWeight = '500';
        warningEl.textContent = `${remaining} character${remaining !== 1 ? 's' : ''} remaining`;
        input.classList.remove('formglut-input-error');
      } else {
        counterEl.style.color = '#64748b';
        counterEl.style.fontWeight = '400';
        warningEl.textContent = '';
        input.classList.remove('formglut-input-error');
      }
    };

    input.addEventListener('input', updateCount);
    input.addEventListener('blur', updateCount);

    // Initial count
    updateCount();
  });
}

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const wrapper = form.closest('.formglut-form-wrapper');
  if (!wrapper) return;

  const successEl = wrapper.querySelector('.formglut-success');
  const errorEl = wrapper.querySelector('.formglut-error');
  const submitBtn = form.querySelector('.formglut-submit-btn');
  const btnText = submitBtn?.querySelector('.formglut-btn-text');
  const btnSpinner = submitBtn?.querySelector('.formglut-btn-spinner');

  // Clear previous messages.
  if (successEl) { successEl.style.display = 'none'; successEl.textContent = ''; }
  if (errorEl) { errorEl.style.display = 'none'; errorEl.textContent = ''; }

  // Clear previous field errors.
  form.querySelectorAll('.formglut-field-error').forEach(el => el.remove());
  form.querySelectorAll('.formglut-input-error').forEach(el => el.classList.remove('formglut-input-error'));

  // Client-side validation.
  const validationErrors = [];
  form.querySelectorAll('.formglut-input, .formglut-consent-input, .formglut-choice input[type="radio"][required]').forEach(input => {
    // Skip validation for conditionally hidden fields
    const field = input.closest('.formglut-field');
    if (field && (field.classList.contains('formglut-hidden') || field.classList.contains('formglut-conditional-hidden') || field.style.display === 'none')) {
      // Clear any value from hidden fields before submission
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = false;
      } else {
        input.value = '';
      }
      return;
    }

    // Email confirmation must match its primary field.
    if (input.dataset.confirmOf) {
      const primary = document.getElementById(input.dataset.confirmOf);
      input.setCustomValidity(primary && primary.value !== input.value ? (input.dataset.validationMessage || __( 'Email addresses do not match.', 'formglut' )) : '');
    }

    const msg = input.dataset.validationMessage || '';
    if (!input.checkValidity() && !field?.querySelector('.formglut-field-error')) {
      const errEl = document.createElement('div');
      errEl.className = 'formglut-field-error';
      errEl.textContent = msg || input.validationMessage;
      input.classList.add('formglut-input-error');
      input.closest('.formglut-field')?.appendChild(errEl);
      validationErrors.push(input);
    }
  });
  if (validationErrors.length) {
    validationErrors[0].focus();
    showError(errorEl, __( 'Please fix the errors above.', 'formglut' ));
    return;
  }

  // Widget captchas (reCAPTCHA v2, hCaptcha, Turnstile) must be completed first.
  const missingCaptcha = Array.from(form.querySelectorAll('.formglut-captcha:not(.formglut-captcha-invisible)')).find((el) => {
    const token = el.querySelector('[name="g-recaptcha-response"], [name="h-captcha-response"], [name="cf-turnstile-response"]');
    return token && !token.value;
  });
  if (missingCaptcha) {
    const errEl = document.createElement('div');
    errEl.className = 'formglut-field-error';
    errEl.textContent = missingCaptcha.dataset.validationMessage || __( 'Please complete the captcha verification.', 'formglut' );
    missingCaptcha.appendChild(errEl);
    showError(errorEl, __( 'Please fix the errors above.', 'formglut' ));
    return;
  }

  if (submitBtn?.dataset.confirm && !window.confirm(submitBtn.dataset.confirm)) return;

  // Show loading state.
  if (submitBtn) submitBtn.disabled = true;
  if (btnText && submitBtn?.dataset.loadingText) { btnText.dataset.text = btnText.textContent; btnText.textContent = submitBtn.dataset.loadingText; }
  if (btnText) btnText.style.opacity = '0.6';
  if (btnSpinner) btnSpinner.style.display = 'inline';

  try {
    const { ajax_url, nonce, recaptcha_enabled, recaptcha_site_key, recaptcha_version } = window.formglutFrontend || {};
    if (!ajax_url || !nonce) {
      showError(errorEl, __( 'Configuration error. Please refresh the page.', 'formglut' ));
      return;
    }

    const formData = new FormData(form);
    formData.set('action', 'formglut_submit_form');
    formData.set('nonce', nonce);

    // Remove the WordPress nonce field (we use our own via localized data).
    formData.delete('formglut_nonce_field');
    formData.delete('_wp_http_referer');

    // reCAPTCHA v3: execute and attach token.
    const v3Field = form.querySelector('[data-captcha="recaptcha-v3"]');
    const v3Key = v3Field?.dataset.sitekey || recaptcha_site_key;
    if ((v3Field || (recaptcha_enabled && recaptcha_version !== 'v2')) && v3Key && typeof grecaptcha !== 'undefined') {
      try {
        const token = await new Promise((resolve, reject) => grecaptcha.ready(() => grecaptcha.execute(v3Key, { action: 'formglut_submit' }).then(resolve, reject)));
        formData.set('g-recaptcha-response', token);
      } catch {
        // reCAPTCHA failed — continue without token (server may still reject).
      }
    }

    const response = await fetch(ajax_url, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    });

    const result = await response.json();

    if (result.success) {
      // Per-form confirmation settings come from the server.
      const conf = result.data?.confirmation || {};
      const afterSubmit = conf.after_submit || 'reset';
      showSuccess(successEl, result.data?.message || __( 'Thank you for your submission!', 'formglut' ), conf.scroll !== false);
      if (afterSubmit !== 'keep') form.reset();

      // Hide the fields and button, leaving only the confirmation message.
      if (afterSubmit === 'hide') {
        Array.from(form.children).forEach((el) => {
          if (!el.classList.contains('formglut-form-message') && !el.classList.contains('formglut-form-title')) el.style.display = 'none';
        });
      }

      // Auto-hide the message after N seconds.
      if (conf.autoclose > 0) {
        setTimeout(() => { if (successEl) successEl.style.display = 'none'; }, conf.autoclose * 1000);
      }

      // Redirect to the configured URL.
      const redirectUrl = conf.redirect_url || form.dataset.redirect;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } else {
      const data = result.data || {};

      // Show field-level errors if present.
      if (data.errors && typeof data.errors === 'object') {
        Object.entries(data.errors).forEach(([fieldId, msg]) => {
          const input = form.querySelector(`[name="${fieldId}"], [name="${fieldId}[]"]`) || document.getElementById(fieldId);
          if (input) {
            input.classList.add('formglut-input-error');
            const errEl = document.createElement('div');
            errEl.className = 'formglut-field-error';
            errEl.textContent = msg;
            input.closest('.formglut-field')?.appendChild(errEl);
          }
        });
        showError(errorEl, data.message || __( 'Please fix the errors above.', 'formglut' ));
      } else {
        showError(errorEl, data.message || __( 'Submission failed. Please try again.', 'formglut' ));
      }
    }
  } catch (err) {
    showError(errorEl, __( 'Network error. Please check your connection and try again.', 'formglut' ));
  } finally {
    resetCaptchas(form);
    if (submitBtn) submitBtn.disabled = false;
    if (btnText?.dataset.text) btnText.textContent = btnText.dataset.text;
    if (btnText) btnText.style.opacity = '1';
    if (btnSpinner) btnSpinner.style.display = 'none';
  }
}

function showSuccess(el, msg, scroll = true) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  if (scroll) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Spinner +/- buttons.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.formglut-spin-btn');
  if (!btn) return;
  const input = btn.parentElement.querySelector('input[type="number"]');
  if (!input || input.readOnly || input.disabled) return;
  const step = parseFloat(input.step) || 1;
  const min = input.min !== '' ? parseFloat(input.min) : -Infinity;
  const max = input.max !== '' ? parseFloat(input.max) : Infinity;
  const decimals = (String(step).split('.')[1] || '').length;
  let next = (parseFloat(input.value) || 0) + step * Number(btn.dataset.spin);
  if (next > max) next = input.dataset.wrap && isFinite(min) ? min : max;
  if (next < min) next = input.dataset.wrap && isFinite(max) ? max : min;
  input.value = next.toFixed(decimals);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
});

// Multiselect "Select All" button.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.formglut-select-all-btn');
  if (!btn) return;
  const select = btn.parentElement.querySelector('select[multiple]');
  if (!select) return;
  const max = parseInt(select.dataset.maxSelections, 10) || Infinity;
  let n = 0;
  Array.from(select.options).forEach((o) => { if (!o.disabled) o.selected = n++ < max; });
  select.dispatchEvent(new Event('change', { bubbles: true }));
});

// Enforce max selections on checkbox groups and multiselects.
document.addEventListener('change', (e) => {
  const el = e.target;
  const group = el.closest('.formglut-choice-group[data-max-selections]');
  if (group && el.type === 'checkbox') {
    const max = parseInt(group.dataset.maxSelections, 10);
    const boxes = group.querySelectorAll('input[type="checkbox"]');
    const checked = group.querySelectorAll('input[type="checkbox"]:checked').length;
    boxes.forEach((b) => { if (!b.checked && !b.hasAttribute('data-disabled-by-option')) b.disabled = checked >= max; });
    return;
  }
  if (el.matches && el.matches('select[multiple][data-max-selections]')) {
    const max = parseInt(el.dataset.maxSelections, 10);
    const selected = Array.from(el.selectedOptions);
    selected.slice(max).forEach((o) => { o.selected = false; });
  }
});

// Captcha tokens are single-use: reset widgets after every submit attempt.
function resetCaptchas(form) {
  try {
    if (window.grecaptcha?.reset && form.querySelector('.g-recaptcha')) window.grecaptcha.reset();
    if (window.hcaptcha?.reset && form.querySelector('.h-captcha')) window.hcaptcha.reset();
    form.querySelectorAll('.cf-turnstile').forEach((el) => window.turnstile?.reset?.(el));
  } catch { /* widget not ready */ }
}

// Password: show/hide toggle, strength meter.
function passwordScore(v) {
  let score = 0;
  if (v.length >= 8) score++;
  if (v.length >= 12) score++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  return Math.min(score, 4);
}
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.formglut-password-toggle');
  if (toggle) {
    const input = toggle.parentElement.querySelector('input');
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.textContent = show ? toggle.dataset.hide : toggle.dataset.show;
    return;
  }

  // Color swatches.
  const swatch = e.target.closest('.formglut-swatch');
  if (swatch) {
    const picker = swatch.closest('.formglut-color-picker');
    picker.querySelectorAll('.formglut-swatch').forEach((b) => b.classList.toggle('selected', b === swatch));
    picker.querySelector('.formglut-color-value').value = swatch.dataset.color;
    const custom = picker.querySelector('.formglut-color-input');
    if (custom) custom.value = swatch.dataset.color;
    return;
  }

  // Collapsible section breaks: toggle every field up to the next section break.
  const sectionBtn = e.target.closest('.formglut-section-toggle');
  if (sectionBtn) {
    const section = sectionBtn.closest('.formglut-field-section_break');
    const collapsed = !section.classList.contains('formglut-section-collapsed');
    section.classList.toggle('formglut-section-collapsed', collapsed);
    sectionBtn.setAttribute('aria-expanded', String(!collapsed));
    sectionBtn.textContent = collapsed ? sectionBtn.dataset.closed : sectionBtn.dataset.open;
    applySectionState(section);
    return;
  }

  // Terms popup.
  const open = e.target.closest('.formglut-terms-open');
  if (open) {
    e.preventDefault();
    document.getElementById(open.dataset.dialog)?.showModal?.();
    return;
  }
  const close = e.target.closest('.formglut-terms-close');
  if (close) close.closest('dialog')?.close();
});

function applySectionState(section) {
  const collapsed = section.classList.contains('formglut-section-collapsed');
  let el = section.nextElementSibling;
  while (el && !el.classList.contains('formglut-field-section_break') && !el.classList.contains('formglut-form-actions') && el.tagName !== 'INPUT') {
    el.classList.toggle('formglut-section-hidden', collapsed);
    el = el.nextElementSibling;
  }
}

document.addEventListener('input', (e) => {
  const el = e.target;
  if (el.matches?.('input[data-strength-meter]')) {
    const meter = document.querySelector(`.formglut-strength[data-for="${el.id}"]`);
    if (meter) {
      const score = el.value ? passwordScore(el.value) : 0;
      const labels = [__( 'Very weak', 'formglut' ), __( 'Weak', 'formglut' ), __( 'Fair', 'formglut' ), __( 'Good', 'formglut' ), __( 'Strong', 'formglut' )];
      meter.dataset.score = el.value ? String(score) : '';
      meter.querySelector('.formglut-strength-label').textContent = el.value ? labels[score] : __( 'Password strength', 'formglut' );
    }
  }
  if (el.matches?.('.formglut-range input[type="range"]')) {
    const out = el.closest('.formglut-range').querySelector('.formglut-range-value');
    if (out) out.textContent = (out.dataset.prefix || '') + el.value + (out.dataset.suffix || '');
  }
  if (el.matches?.('.formglut-color-input')) {
    const picker = el.closest('.formglut-color-picker');
    picker.querySelector('.formglut-color-value').value = el.value;
    picker.querySelectorAll('.formglut-swatch').forEach((b) => b.classList.toggle('selected', b.dataset.color.toLowerCase() === el.value.toLowerCase()));
  }
});

// Terms box: unlock the checkbox once scrolled to the end.
document.addEventListener('scroll', (e) => {
  const box = e.target;
  if (!box.dataset || !box.dataset.requireScroll) return;
  if (box.scrollTop + box.clientHeight >= box.scrollHeight - 4) {
    const cb = document.getElementById(box.dataset.requireScroll);
    if (cb) cb.disabled = false;
  }
}, true);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.formglut-section-collapsed').forEach(applySectionState);
});
