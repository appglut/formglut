/**
 * FormGlut Frontend — live Calculation fields. Same rules as FormGlut_Calc (PHP), which
 * recalculates on submit; the browser value is only for display.
 */

/** Safe evaluator: numbers, + - * / %, brackets, round/min/max/abs/ceil/floor. Returns null if invalid. */
export function evaluate(expr) {
  const tokens = expr.match(/\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[A-Za-z]+|[()+\-*/%,]/g) || [];
  if (tokens.join('') !== expr.replace(/\s+/g, '')) return null;
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];
  const expect = (t) => { if (next() !== t) throw new Error('expect'); };
  const FN = { round: (a, d = 0) => { const p = 10 ** d; return Math.round(a * p) / p; }, min: Math.min, max: Math.max, abs: Math.abs, ceil: Math.ceil, floor: Math.floor };
  function expression() {
    let v = term();
    while (peek() === '+' || peek() === '-') { const op = next(); const r = term(); v = op === '+' ? v + r : v - r; }
    return v;
  }
  function term() {
    let v = factor();
    while (peek() === '*' || peek() === '/' || peek() === '%') {
      const op = next(); const r = factor();
      if (op === '*') v *= r; else if (r === 0) v = 0; else v = op === '/' ? v / r : v % r;
    }
    return v;
  }
  function factor() {
    const t = next();
    if (t === undefined) throw new Error('end');
    if (/^\d/.test(t)) return parseFloat(t);
    if (t === '-') return -factor();
    if (t === '+') return factor();
    if (t === '(') { const v = expression(); expect(')'); return v; }
    const fn = FN[t.toLowerCase()];
    if (!fn) throw new Error('token');
    expect('(');
    const args = [expression()];
    while (peek() === ',') { next(); args.push(expression()); }
    expect(')');
    return fn(...args);
  }
  try {
    const v = expression();
    return pos === tokens.length && Number.isFinite(v) ? v : null;
  } catch { return null; }
}

function fieldNumber(form, ref) {
  const els = form.querySelectorAll(`[name="${CSS.escape(ref.name)}"], [name="${CSS.escape(ref.name)}[]"]`);
  const values = [];
  els.forEach((el) => {
    if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) return;
    if (el.type === 'hidden' && ref.type === 'toggle') return;
    if (el.tagName === 'SELECT' && el.multiple) { Array.from(el.selectedOptions).forEach((o) => values.push(o.value)); return; }
    if (el.closest('.formglut-conditional-hidden')) return;
    values.push(el.value);
  });
  if (ref.type === 'toggle') return values.includes(ref.on) ? 1 : 0;
  if (ref.map) return values.reduce((sum, v) => sum + (ref.map[v] ?? 0), 0);
  const n = parseFloat(String(values[0] ?? '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export function initCalculations(form) {
  const calcs = Array.from(form.querySelectorAll('input.formglut-calc[data-formula]'));
  if (!calcs.length) return;
  const run = () => calcs.forEach((input) => {
    let refs = {};
    try { refs = JSON.parse(input.dataset.refs || '{}'); } catch { refs = {}; }
    const expr = (input.dataset.formula || '').replace(/\{field:([A-Za-z0-9_-]+)\}/g, (m, id) => {
      const n = refs[id] ? fieldNumber(form, refs[id]) : 0;
      return '(' + (n < 0 ? '0' + n : n) + ')';
    });
    const result = evaluate(expr);
    const d = Number(input.dataset.decimals ?? 2);
    input.value = (input.dataset.prefix || '') + (result === null ? '' : result.toFixed(d)) + (input.dataset.suffix || '');
  });
  form.addEventListener('input', run);
  form.addEventListener('change', run);
  form.addEventListener('reset', () => setTimeout(run, 0));
  run();
}
