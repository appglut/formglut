/**
 * FormGlut Frontend — Form Submission Handler.
 *
 * Binds to all .formglut-form elements on the page.
 * Handles client-side validation, AJAX submission, reCAPTCHA, and UI feedback.
 */

import { __ } from '@wordpress/i18n';
import './formglut-frontend.css';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.formglut-form').forEach(form => {
    form.addEventListener('submit', handleSubmit);
    initCharacterCount(form);
  });
});

/**
 * Initialize character count for inputs with maxlength.
 */
function initCharacterCount(form) {
  form.querySelectorAll('.formglut-input[maxlength], textarea[maxlength]').forEach(input => {
    const maxLength = parseInt(input.getAttribute('maxlength'));
    if (!maxLength || maxLength <= 0) return;

    const field = input.closest('.formglut-field');
    if (!field) return;

    // Create wrapper for counter and warning
    const counterWrapper = document.createElement('div');
    counterWrapper.className = 'formglut-char-counter-wrapper';
    counterWrapper.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-top: 4px;';

    // Create character count element
    const counterEl = document.createElement('span');
    counterEl.className = 'formglut-char-counter';
    counterEl.textContent = `Typing input limit is ${maxLength}`;
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
      const remaining = maxLength - length;

      // Update counter text based on typing state
      if (length > 0) {
        counterEl.textContent = `Typing input limit is ${maxLength}`;
      } else {
        counterEl.textContent = `Input limit is ${maxLength}`;
      }

      // Update warning based on remaining characters
      if (remaining <= 0) {
        counterEl.style.color = '#dc2626';
        counterEl.style.fontWeight = '600';
        warningEl.textContent = `Character limit reached!`;
        input.classList.add('formglut-input-error');
      } else if (remaining <= 5) {
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
  form.querySelectorAll('.formglut-input').forEach(input => {
    const msg = input.dataset.validationMessage || '';
    if (!input.checkValidity()) {
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

  // Show loading state.
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.style.opacity = '0.6';
  if (btnSpinner) btnSpinner.style.display = 'inline';

  try {
    const { ajax_url, nonce, recaptcha_enabled, recaptcha_site_key } = window.formglutFrontend || {};
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
    if (recaptcha_enabled && recaptcha_site_key && typeof grecaptcha !== 'undefined') {
      try {
        const token = await grecaptcha.execute(recaptcha_site_key, { action: 'formglut_submit' });
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
      showSuccess(successEl, result.data?.message || __( 'Thank you for your submission!', 'formglut' ));
      form.reset();

      // Optionally redirect.
      const redirectUrl = form.dataset.redirect;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } else {
      const data = result.data || {};

      // Show field-level errors if present.
      if (data.errors && typeof data.errors === 'object') {
        Object.entries(data.errors).forEach(([fieldId, msg]) => {
          const input = form.querySelector(`[name="${fieldId}"], [name="${fieldId}[]"]`);
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
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.style.opacity = '1';
    if (btnSpinner) btnSpinner.style.display = 'none';
  }
}

function showSuccess(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
