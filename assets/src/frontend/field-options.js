/**
 * FormGlut Frontend — date / time pickers, searchable dropdowns and the live counter.
 */
import { __, sprintf } from '@wordpress/i18n';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

/* ── Date and time pickers (flatpickr) ─────────────────────────────── */

// PHP-style formats from the field options → flatpickr tokens.
const FORMATS = { 'Y-m-d': 'Y-m-d', 'd/m/Y': 'd/m/Y', 'm/d/Y': 'm/d/Y', 'd.m.Y': 'd.m.Y', 'j F Y': 'j F Y', 'F j, Y': 'F j, Y' };

export function initPickers(form) {
  form.querySelectorAll('input[data-picker]').forEach((input) => {
    const d = input.dataset;
    if (d.picker === 'time') {
      const inc = Number(d.minuteStep || 0);
      input.type = 'text';
      flatpickr(input, {
        enableTime: true, noCalendar: true, dateFormat: 'H:i', altInput: true,
        altFormat: d.time24 === '1' ? 'H:i' : 'h:i K', time_24hr: d.time24 === '1',
        minuteIncrement: inc || 5, minTime: input.min || null, maxTime: input.max || null,
        allowInput: false,
      });
      return;
    }
    const withTime = d.time === '1';
    const disabled = (d.disabled || '').split(',').filter(Boolean);
    const rules = [];
    if (d.noWeekends === '1') rules.push((date) => date.getDay() === 0 || date.getDay() === 6);
    if (disabled.length) rules.push(...disabled);
    const display = (FORMATS[d.format] || 'Y-m-d') + (withTime ? (d.time24 === '1' ? ' H:i' : ' h:i K') : '');
    flatpickr(input, {
      dateFormat: withTime ? 'Y-m-d\\TH:i' : 'Y-m-d', // what is submitted
      altInput: true, altFormat: display,                 // what visitors see
      enableTime: withTime, time_24hr: d.time24 === '1',
      minDate: d.min || null, maxDate: d.max || null,
      disable: rules,
      locale: { firstDayOfWeek: Number(d.firstDay ?? 1) },
      allowInput: false,
    });
  });
}

/* ── Searchable dropdown ───────────────────────────────────────────── */

export function initSearchable(form) {
  form.querySelectorAll('select[data-searchable]').forEach((select) => {
    const box = document.createElement('div');
    box.className = 'formglut-search-select';
    const search = document.createElement('input');
    search.type = 'search';
    search.className = 'formglut-search-input';
    search.placeholder = __( 'Type to search…', 'formglut' );
    search.setAttribute('aria-label', __( 'Search the list', 'formglut' ));
    select.parentNode.insertBefore(box, select);
    box.appendChild(search);
    box.appendChild(select);
    const all = Array.from(select.options).map((o) => ({ el: o, text: o.textContent.toLowerCase() }));
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let first = null;
      all.forEach(({ el, text }) => {
        const keep = !q || !el.value || text.includes(q);
        el.hidden = !keep;
        if (keep && el.value && !first) first = el;
      });
      // Pick the first match so Enter / submit use it; visitors can still change it.
      if (q && first && !first.disabled) { select.value = first.value; select.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    form.addEventListener('reset', () => setTimeout(() => { search.value = ''; all.forEach(({ el }) => { el.hidden = false; }); }, 0));
  });
}

/* ── Live character / word counter ─────────────────────────────────── */

const countWords = (v) => (v.trim() ? v.trim().split(/\s+/u).length : 0);

export function initCounters(form) {
  form.querySelectorAll('input[data-counter], textarea[data-counter]').forEach((input) => {
    const maxChars = Number(input.getAttribute('maxlength') || 0);
    const minChars = Number(input.getAttribute('minlength') || 0);
    const maxWords = Number(input.dataset.maxWords || 0);
    if (input.dataset.counter !== '1' || (!maxChars && !maxWords && !minChars)) {
      if (maxWords) input.addEventListener('input', () => input.setCustomValidity(countWords(input.value) > maxWords ? sprintf( __( 'Please use no more than %d words.', 'formglut' ), maxWords ) : ''));
      return;
    }
    const out = document.createElement('div');
    out.className = 'formglut-counter';
    out.setAttribute('aria-live', 'polite');
    const group = input.closest('.formglut-input-group') || input;
    group.parentNode.insertBefore(out, group.nextSibling);
    const update = () => {
      const chars = input.value.length;
      const words = countWords(input.value);
      let text = '';
      let over = false;
      if (maxWords) {
        text = sprintf( __( '%1$d / %2$d words', 'formglut' ), words, maxWords );
        over = words > maxWords;
        input.setCustomValidity(over ? sprintf( __( 'Please use no more than %d words.', 'formglut' ), maxWords ) : '');
      } else if (maxChars) {
        text = sprintf( __( '%1$d / %2$d characters', 'formglut' ), chars, maxChars );
      } else {
        text = sprintf( __( '%d characters', 'formglut' ), chars );
      }
      if (minChars && chars > 0 && chars < minChars) text += ' · ' + sprintf( __( 'at least %d', 'formglut' ), minChars );
      out.textContent = text;
      out.classList.toggle('is-over', over || (maxChars && chars >= maxChars));
    };
    input.addEventListener('input', update);
    form.addEventListener('reset', () => setTimeout(update, 0));
    update();
  });
}
