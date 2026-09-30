/**
 * FormGlut Frontend — Stripe card payments (Payment Element, deferred intent).
 */
import { __ } from '@wordpress/i18n';

/** Total shown and charged, in major units (the server works it out again). */
function currentTotal(form, box) {
  if (box.dataset.source === 'calc' && box.dataset.amountField) {
    const calc = form.querySelector(`[name="${CSS.escape(box.dataset.amountField)}"]`) || document.getElementById(box.dataset.amountField);
    const n = parseFloat(String(calc?.value || '').replace(/[^0-9.-]/g, ''));
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  }
  let sum = 0;
  form.querySelectorAll('.formglut-pay-item').forEach((el) => {
    if (el.closest('.formglut-conditional-hidden, .formglut-hidden')) return;
    const n = parseFloat(el.value);
    if (Number.isFinite(n) && n > 0) sum += n;
  });
  return Math.round(sum * 100) / 100;
}

export function initPayments(form) {
  const box = form.querySelector('.formglut-stripe');
  if (!box) return;
  const start = () => {
    if (typeof window.Stripe !== 'function') { setTimeout(start, 200); return; }
    const decimals = Number(box.dataset.decimals || 2);
    const toMinor = (v) => Math.round(v * 10 ** decimals);
    const stripe = window.Stripe(box.dataset.pk);
    // Stripe needs an amount above zero to show payment methods; the real amount is set by the server.
    const elements = stripe.elements({ mode: 'payment', amount: Math.max(toMinor(currentTotal(form, box)), 100), currency: box.dataset.currency, appearance: { theme: 'stripe', variables: { colorPrimary: '#e94560', borderRadius: '8px' } } });
    const payment = elements.create('payment', { layout: 'tabs' });
    payment.mount(box.querySelector('.formglut-stripe-element'));
    const out = box.querySelector('.formglut-stripe-amount');
    const refresh = () => {
      const total = currentTotal(form, box);
      if (out) out.textContent = box.dataset.symbol + total.toFixed(decimals);
      elements.update({ amount: Math.max(toMinor(total), 100) });
      box.classList.toggle('is-free', total <= 0);
    };
    form.addEventListener('input', refresh);
    form.addEventListener('change', refresh);
    refresh();
    form.formglutStripe = { stripe, elements, total: () => currentTotal(form, box) };
  };
  start();
}

/**
 * Run the payment before the final submit.
 * Returns: false (stop, error shown) | { result } (server already answered: nothing to pay) | { id } (PaymentIntent to send).
 */
export async function payBeforeSubmit(form, formData, ajaxUrl, showError) {
  const pay = form.formglutStripe;
  if (!pay || pay.total() <= 0) return {};
  const { error: submitError } = await pay.elements.submit();
  if (submitError) { showError(submitError.message); return false; }

  const intentData = new FormData();
  formData.forEach((v, k) => intentData.append(k, v));
  intentData.set('formglut_pay_step', 'intent');
  const res = await fetch(ajaxUrl, { method: 'POST', body: intentData, credentials: 'same-origin' });
  const result = await res.json();
  if (!result.success || !result.data?.payment) return { result };

  const { error, paymentIntent } = await pay.stripe.confirmPayment({
    elements: pay.elements,
    clientSecret: result.data.payment.client_secret,
    confirmParams: { return_url: window.location.href },
    redirect: 'if_required',
  });
  if (error) { showError(error.message || __( 'The payment was not completed.', 'formglut' )); return false; }
  return { id: paymentIntent.id };
}
