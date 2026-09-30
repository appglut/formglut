/**
 * FormGlut Frontend — rich text editor, star rating words and the reset button.
 */
import { __ } from '@wordpress/i18n';

function syncRichText(area) {
  const box = area.closest('.formglut-richtext');
  const out = box?.querySelector('.formglut-richtext-value');
  if (!out) return;
  const text = area.textContent.trim();
  out.value = text ? area.innerHTML : '';
  const max = Number(area.dataset.maxLength || 0);
  box.classList.toggle('is-empty', !text);
  if (max) out.setCustomValidity(text.length > max ? __( 'This text is too long.', 'formglut' ) : '');
}

export function initExtraFields(form) {
  form.querySelectorAll('.formglut-richtext-area').forEach((area) => {
    syncRichText(area);
    area.addEventListener('input', () => syncRichText(area));
    area.addEventListener('paste', (e) => {
      // Paste as plain text so outside styles do not come along.
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertText', false, text);
    });
  });

  form.addEventListener('click', (e) => {
    const tool = e.target.closest('.formglut-richtext-bar button');
    if (!tool) return;
    e.preventDefault();
    const area = tool.closest('.formglut-richtext').querySelector('.formglut-richtext-area');
    area.focus();
    const cmd = tool.dataset.cmd;
    if (cmd === 'createLink') {
      const url = window.prompt(__( 'Link address (https://…)', 'formglut' ), 'https://');
      if (url && /^(https?:|mailto:)/i.test(url)) document.execCommand('createLink', false, url);
    } else if (cmd === 'formatBlock') {
      document.execCommand('formatBlock', false, 'blockquote');
    } else {
      document.execCommand(cmd, false, null);
    }
    syncRichText(area);
  });

  form.addEventListener('change', (e) => {
    const star = e.target.closest('.formglut-star-input');
    if (!star) return;
    const word = star.closest('.formglut-field')?.querySelector('.formglut-star-word');
    if (word) word.textContent = star.dataset.word || '';
  });

  form.addEventListener('click', (e) => {
    const reset = e.target.closest('.formglut-reset-btn');
    if (reset && reset.dataset.confirm && !window.confirm(reset.dataset.confirm)) e.preventDefault();
  });

  form.addEventListener('reset', () => setTimeout(() => {
    form.querySelectorAll('.formglut-richtext-area').forEach((area) => { area.innerHTML = ''; syncRichText(area); });
    form.querySelectorAll('.formglut-star-word').forEach((w) => { w.textContent = ''; });
    form.querySelectorAll('.formglut-field-error').forEach((el) => el.remove());
    form.querySelectorAll('.formglut-input-error').forEach((el) => el.classList.remove('formglut-input-error'));
    if (form.formglutGoToStep) form.formglutGoToStep(0);
  }, 0));
}
