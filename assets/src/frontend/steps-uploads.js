/**
 * FormGlut Frontend — multi-step forms and file uploads.
 */
import { __, sprintf } from '@wordpress/i18n';

/* ── Multi-step ──────────────────────────────────────────────────────── */

/**
 * Turn top-level .formglut-step-break markers into steps with a progress indicator and
 * next / previous buttons. `validate(scope)` returns the invalid inputs inside a step.
 */
export function initSteps(form, validate) {
  const breaks = Array.from(form.children).filter((el) => el.classList.contains('formglut-step-break'));
  if (!breaks.length) return;

  const style = form.dataset.stepProgress || 'steps'; // steps | bar | none
  const firstTitle = form.dataset.firstStep || __( 'Step 1', 'formglut' );
  const checkEachStep = form.dataset.stepValidate !== '0';

  // Everything that belongs to the steps: fields and markers, not hidden inputs, honeypot or messages.
  const fixed = (el) => el.tagName === 'INPUT' || el.classList.contains('formglut-hp') || el.classList.contains('formglut-form-message')
    || el.classList.contains('formglut-form-actions') || el.classList.contains('formglut-form-title') || el.tagName === 'STYLE';

  const steps = [];
  let current = { title: firstTitle, nodes: [], next: '', prev: '' };
  Array.from(form.children).forEach((el) => {
    if (el.classList.contains('formglut-step-break')) {
      current.next = el.dataset.next;
      steps.push(current);
      current = { title: el.dataset.title || sprintf( __( 'Step %d', 'formglut' ), steps.length + 1 ), nodes: [], prev: el.dataset.prev, next: '' };
      el.remove();
      return;
    }
    if (!fixed(el)) current.nodes.push(el);
  });
  steps.push(current);

  const actions = form.querySelector('.formglut-form-actions');
  const anchor = form.querySelector('.formglut-form-message') || null;

  // Progress indicator.
  let progress = null;
  if (style !== 'none') {
    progress = document.createElement('div');
    progress.className = 'formglut-progress formglut-progress-' + style;
    progress.innerHTML = style === 'bar'
      ? '<div class="formglut-progress-head"><span class="formglut-progress-title"></span><span class="formglut-progress-count"></span></div><div class="formglut-progress-track"><span></span></div>'
      : '<ol>' + steps.map((st, i) => `<li><span class="num">${i + 1}</span><span class="txt"></span></li>`).join('') + '</ol>';
    if (style !== 'bar') progress.querySelectorAll('.txt').forEach((t, i) => { t.textContent = steps[i].title; });
    form.insertBefore(progress, form.firstElementChild);
  }

  // Wrap each step.
  const panes = steps.map((st, i) => {
    const pane = document.createElement('div');
    pane.className = 'formglut-step';
    pane.dataset.step = String(i);
    st.nodes.forEach((n) => pane.appendChild(n));
    const nav = document.createElement('div');
    nav.className = 'formglut-step-nav';
    if (i > 0) nav.innerHTML += `<button type="button" class="formglut-step-prev"></button>`;
    if (i < steps.length - 1) nav.innerHTML += `<button type="button" class="formglut-step-next"></button>`;
    const prevBtn = nav.querySelector('.formglut-step-prev');
    const nextBtn = nav.querySelector('.formglut-step-next');
    if (prevBtn) prevBtn.textContent = st.prev || __( 'Previous', 'formglut' );
    if (nextBtn) nextBtn.textContent = st.next || __( 'Next', 'formglut' );
    if (nav.children.length) pane.appendChild(nav);
    form.insertBefore(pane, actions || anchor);
    return pane;
  });

  // On the last step the submit button sits next to "Previous".
  const lastNav = panes[panes.length - 1].querySelector('.formglut-step-nav');
  if (actions && lastNav) { lastNav.appendChild(actions); lastNav.classList.add('has-submit'); }

  const go = (to) => {
    panes.forEach((p, i) => { p.hidden = i !== to; });
    form.dataset.currentStep = String(to);
    if (actions && !lastNav) actions.hidden = to !== panes.length - 1;
    if (progress) {
      if (style === 'bar') {
        progress.querySelector('.formglut-progress-title').textContent = steps[to].title;
        progress.querySelector('.formglut-progress-count').textContent = sprintf( __( 'Step %1$d of %2$d', 'formglut' ), to + 1, steps.length );
        progress.querySelector('.formglut-progress-track span').style.width = ((to + 1) / steps.length * 100) + '%';
      } else {
        progress.querySelectorAll('li').forEach((li, i) => { li.classList.toggle('done', i < to); li.classList.toggle('active', i === to); });
      }
    }
  };

  form.addEventListener('click', (e) => {
    const next = e.target.closest('.formglut-step-next');
    const prev = e.target.closest('.formglut-step-prev');
    if (!next && !prev) return;
    const at = Number(form.dataset.currentStep || 0);
    if (next) {
      form.querySelectorAll('.formglut-step[data-step="' + at + '"] .formglut-field-error').forEach((el) => el.remove());
      if (checkEachStep) {
        const bad = validate(panes[at]);
        if (bad.length) { bad[0].focus(); return; }
      }
      go(Math.min(at + 1, panes.length - 1));
    } else {
      go(Math.max(at - 1, 0));
    }
    (progress || form).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  form.formglutGoToStep = go;
  go(0);
}

/** Show the step that contains `el` (used after validation errors). */
export function showStepOf(form, el) {
  const pane = el?.closest?.('.formglut-step');
  if (pane && form.formglutGoToStep) form.formglutGoToStep(Number(pane.dataset.step));
}

/** Back to the first step after a successful submit. */
export function resetSteps(form) {
  if (form.formglutGoToStep) form.formglutGoToStep(0);
}

/* ── File uploads ────────────────────────────────────────────────────── */

/** Browser-side check of size, type and count. Sets a custom validity message on the input. */
export function checkFiles(input) {
  const files = Array.from(input.files || []);
  const max = Number(input.dataset.maxFiles || 1);
  const maxSize = Number(input.dataset.maxSize || 0);
  const types = (input.dataset.types || '').split(',').filter(Boolean);
  let msg = '';
  if (files.length > max) {
    msg = sprintf( __( 'You can upload up to %d files.', 'formglut' ), max );
  } else {
    for (const f of files) {
      const ext = (f.name.split('.').pop() || '').toLowerCase();
      if (types.length && !types.includes(ext)) { msg = sprintf( __( '%1$s is not an allowed file type. Allowed: %2$s.', 'formglut' ), f.name, types.join(', ').toUpperCase() ); break; }
      if (maxSize && f.size > maxSize) { msg = sprintf( __( '%1$s is larger than %2$s MB.', 'formglut' ), f.name, (maxSize / 1048576).toFixed(1).replace(/\.0$/, '') ); break; }
    }
  }
  input.setCustomValidity(msg);
  return msg;
}

function showNames(input) {
  const box = input.closest('.formglut-upload');
  const out = box?.querySelector('.formglut-upload-names');
  if (!out) return;
  if (!out.dataset.empty) out.dataset.empty = out.textContent;
  const names = Array.from(input.files || []).map((f) => f.name);
  out.textContent = names.length ? names.join(', ') : out.dataset.empty;
  box.classList.toggle('has-files', names.length > 0);
}

export function initUploads(form) {
  form.querySelectorAll('.formglut-file-input').forEach((input) => {
    const box = input.closest('.formglut-upload');
    input.addEventListener('change', () => {
      showNames(input);
      const msg = checkFiles(input);
      const field = input.closest('.formglut-field');
      field?.querySelector('.formglut-field-error')?.remove();
      input.classList.toggle('formglut-input-error', !!msg);
      if (msg && field) {
        const err = document.createElement('div');
        err.className = 'formglut-field-error';
        err.textContent = msg;
        field.appendChild(err);
      }
    });
    if (!box) return;
    ['dragenter', 'dragover'].forEach((ev) => box.addEventListener(ev, (e) => { e.preventDefault(); box.classList.add('is-drag'); }));
    ['dragleave', 'drop'].forEach((ev) => box.addEventListener(ev, (e) => { e.preventDefault(); box.classList.remove('is-drag'); }));
    box.addEventListener('drop', (e) => {
      const dropped = Array.from(e.dataTransfer?.files || []);
      if (!dropped.length) return;
      const dt = new DataTransfer();
      (input.multiple ? dropped : dropped.slice(0, 1)).forEach((f) => dt.items.add(f));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
  form.addEventListener('reset', () => setTimeout(() => form.querySelectorAll('.formglut-file-input').forEach((i) => { i.setCustomValidity(''); showNames(i); }), 0));
}
