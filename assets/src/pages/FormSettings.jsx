import React from 'react';
import { Switch, Input, InputNumber, Select } from 'antd';
import { __ } from '@wordpress/i18n';

/**
 * Per-form settings schema and inputs, rendered by FormSettingsPage.jsx.
 *
 * Settings are stored per form ID (forms table, `settings` column). The defaults below mirror
 * FormGlut_Form_Settings::defaults() in PHP; the server sanitizes everything again on save.
 */
export const DEFAULT_FORM_SETTINGS = {
  general: { show_title: false, form_class: '', submit_processing: '' },
  confirmation: { type: 'message', message: '', redirect_url: '', after_submit: 'reset', scroll: true, autoclose: 0, error_message: '' },
  notifications: {
    enabled: true, to: '', cc: '', bcc: '', from_name: '', from_email: '', reply_to: '', subject: '', message: '',
    autoresponder: { enabled: false, email_field: '', subject: '', message: '' },
  },
  restrictions: {
    require_login: false, guest_message: '', entry_limit: 0, limit_message: '',
    schedule_enabled: false, schedule_start: '', schedule_end: '', before_message: '', after_message: '',
    deny_empty: false, one_per_ip: false, duplicate_message: '',
  },
  spam: { honeypot: 'global', akismet: false, keywords: '', keyword_action: 'reject', store_ip: true, store_entries: 'global', retention_days: 0, min_time: 0 },
  style: { form_width: '', form_align: 'left', custom_css: '' },
  entries: { count_views: true },
};

/** Fill in any keys a saved form is missing (older forms have no settings at all). */
export function mergeFormSettings(saved) {
  const merge = (base, over) => {
    const out = { ...base };
    Object.keys(base).forEach((k) => {
      if (over && over[k] !== undefined && over[k] !== null) {
        out[k] = base[k] && typeof base[k] === 'object' && !Array.isArray(base[k]) ? merge(base[k], over[k]) : over[k];
      }
    });
    return out;
  };
  return merge(DEFAULT_FORM_SETTINGS, saved || {});
}

export const TAGS = '{form_name} {form_id} {entry_id} {site_name} {admin_email} {date} {user_email} {all_fields} {field:FIELD_ID}';

/** Schema: one entry per collapsible section, one per control. `emailFields` is injected at render time. */
export function buildSchema(emailFields) {
  const emailOptions = [{ value: '', label: __( '— None —', 'formglut' ) }, ...emailFields];
  return [
    {
      key: 'general', title: __( 'General', 'formglut' ), fields: [
        { path: 'general.show_title', type: 'switch', label: __( 'Show form title', 'formglut' ), tip: __( 'Print the form title above the fields.', 'formglut' ) },
        { path: 'general.form_class', type: 'text', label: __( 'Form CSS class', 'formglut' ), tip: __( 'Extra class(es) added to the form wrapper.', 'formglut' ), placeholder: 'my-form' },
        { path: 'general.submit_processing', type: 'text', label: __( 'Button text while sending', 'formglut' ), tip: __( 'Shown on the submit button while the form is being sent.', 'formglut' ), placeholder: __( 'Sending…', 'formglut' ) },
      ],
    },
    {
      key: 'confirmation', title: __( 'Confirmation', 'formglut' ), fields: [
        { path: 'confirmation.type', type: 'select', label: __( 'After a successful submit', 'formglut' ), options: [{ value: 'message', label: __( 'Show a message', 'formglut' ) }, { value: 'url', label: __( 'Redirect to a URL', 'formglut' ) }] },
        { path: 'confirmation.message', tags: true, type: 'textarea', label: __( 'Success message', 'formglut' ), tip: __( 'Leave empty to use the global success message. Smart tags such as {field:FIELD_ID} work here.', 'formglut' ), show: (s) => s.confirmation.type === 'message' },
        { path: 'confirmation.redirect_url', tags: 'url', type: 'text', label: __( 'Redirect URL', 'formglut' ), tip: __( 'Full URL. You can add values, e.g. https://site.com/thanks?entry={entry_id}.', 'formglut' ), placeholder: 'https://', show: (s) => s.confirmation.type === 'url' },
        { path: 'confirmation.after_submit', type: 'select', label: __( 'Form after submit', 'formglut' ), options: [{ value: 'reset', label: __( 'Clear the fields', 'formglut' ) }, { value: 'hide', label: __( 'Hide the form', 'formglut' ) }, { value: 'keep', label: __( 'Keep the values', 'formglut' ) }], show: (s) => s.confirmation.type === 'message' },
        { path: 'confirmation.scroll', type: 'switch', label: __( 'Scroll to the message', 'formglut' ), show: (s) => s.confirmation.type === 'message' },
        { path: 'confirmation.autoclose', type: 'number', label: __( 'Hide message after (seconds)', 'formglut' ), tip: __( '0 keeps the message on screen.', 'formglut' ), show: (s) => s.confirmation.type === 'message' },
        { path: 'confirmation.error_message', type: 'textarea', label: __( 'Failure message', 'formglut' ), tip: __( 'Leave empty to use the global error message.', 'formglut' ) },
      ],
    },
    {
      key: 'notifications', title: __( 'Notifications', 'formglut' ), fields: [
        { path: 'notifications.enabled', type: 'switch', label: __( 'Send admin notification', 'formglut' ) },
        { path: 'notifications.to', tags: 'plain', type: 'text', label: __( 'Send to', 'formglut' ), tip: __( 'Comma-separated addresses. Empty uses the admin email from Settings.', 'formglut' ), placeholder: '{admin_email}', show: (s) => s.notifications.enabled },
        { path: 'notifications.cc', tags: 'plain', type: 'text', label: __( 'CC', 'formglut' ), show: (s) => s.notifications.enabled },
        { path: 'notifications.bcc', tags: 'plain', type: 'text', label: __( 'BCC', 'formglut' ), show: (s) => s.notifications.enabled },
        { path: 'notifications.from_name', tags: 'plain', type: 'text', label: __( 'From name', 'formglut' ), tip: __( 'Empty uses the sender name from Settings.', 'formglut' ), show: (s) => s.notifications.enabled },
        { path: 'notifications.from_email', type: 'text', label: __( 'From email', 'formglut' ), show: (s) => s.notifications.enabled },
        { path: 'notifications.reply_to', type: 'select', label: __( 'Reply-To', 'formglut' ), tip: __( 'Reply goes to the address the visitor typed in this field.', 'formglut' ), options: emailOptions, show: (s) => s.notifications.enabled },
        { path: 'notifications.subject', tags: 'plain', type: 'text', label: __( 'Subject', 'formglut' ), tip: __( 'Empty uses the subject template from Settings.', 'formglut' ), placeholder: 'New entry: {form_name}', show: (s) => s.notifications.enabled },
        { path: 'notifications.message', tags: true, type: 'textarea', rows: 6, label: __( 'Message', 'formglut' ), tip: __( 'Empty sends a table of all fields. Use {all_fields} to place that table inside your own text.', 'formglut' ), show: (s) => s.notifications.enabled },
        { path: 'notifications.autoresponder.enabled', type: 'switch', label: __( 'Send a confirmation email to the visitor', 'formglut' ), divider: true },
        { path: 'notifications.autoresponder.email_field', type: 'select', label: __( 'Visitor email field', 'formglut' ), options: emailOptions, show: (s) => s.notifications.autoresponder.enabled },
        { path: 'notifications.autoresponder.subject', tags: 'plain', type: 'text', label: __( 'Subject', 'formglut' ), placeholder: 'Thank you for contacting {site_name}', show: (s) => s.notifications.autoresponder.enabled },
        { path: 'notifications.autoresponder.message', tags: true, type: 'textarea', rows: 5, label: __( 'Message', 'formglut' ), show: (s) => s.notifications.autoresponder.enabled },
      ],
    },
    {
      key: 'restrictions', title: __( 'Restrictions', 'formglut' ), fields: [
        { path: 'restrictions.require_login', type: 'switch', label: __( 'Only logged-in users', 'formglut' ) },
        { path: 'restrictions.guest_message', type: 'text', label: __( 'Message for visitors', 'formglut' ), show: (s) => s.restrictions.require_login },
        { path: 'restrictions.entry_limit', type: 'number', label: __( 'Limit total entries', 'formglut' ), tip: __( '0 = unlimited. The form closes when the limit is reached.', 'formglut' ) },
        { path: 'restrictions.limit_message', type: 'text', label: __( 'Message when the limit is reached', 'formglut' ), show: (s) => s.restrictions.entry_limit > 0 },
        { path: 'restrictions.schedule_enabled', type: 'switch', label: __( 'Schedule the form', 'formglut' ) },
        { path: 'restrictions.schedule_start', type: 'datetime', label: __( 'Opens', 'formglut' ), show: (s) => s.restrictions.schedule_enabled },
        { path: 'restrictions.schedule_end', type: 'datetime', label: __( 'Closes', 'formglut' ), show: (s) => s.restrictions.schedule_enabled },
        { path: 'restrictions.before_message', type: 'text', label: __( 'Message before opening', 'formglut' ), show: (s) => s.restrictions.schedule_enabled },
        { path: 'restrictions.after_message', type: 'text', label: __( 'Message after closing', 'formglut' ), show: (s) => s.restrictions.schedule_enabled },
        { path: 'restrictions.deny_empty', type: 'switch', label: __( 'Reject empty submissions', 'formglut' ) },
        { path: 'restrictions.one_per_ip', type: 'switch', label: __( 'One entry per IP address', 'formglut' ), tip: __( 'Needs “Store IP address” to stay on.', 'formglut' ) },
        { path: 'restrictions.duplicate_message', type: 'text', label: __( 'Message for repeat submissions', 'formglut' ), show: (s) => s.restrictions.one_per_ip },
      ],
    },
    {
      key: 'spam', title: __( 'Spam & privacy', 'formglut' ), fields: [
        { path: 'spam.honeypot', type: 'select', label: __( 'Honeypot', 'formglut' ), options: [{ value: 'global', label: __( 'Use global setting', 'formglut' ) }, { value: 'on', label: __( 'On for this form', 'formglut' ) }, { value: 'off', label: __( 'Off for this form', 'formglut' ) }] },
        { path: 'spam.akismet', type: 'switch', label: __( 'Check with Akismet', 'formglut' ), tip: __( 'Needs the Akismet plugin with an API key. Spam is saved in the Spam folder.', 'formglut' ) },
        { path: 'spam.keywords', type: 'textarea', rows: 4, label: __( 'Blocked words', 'formglut' ), tip: __( 'One word or phrase per line.', 'formglut' ) },
        { path: 'spam.keyword_action', type: 'select', label: __( 'When a blocked word is found', 'formglut' ), options: [{ value: 'reject', label: __( 'Reject the submission', 'formglut' ) }, { value: 'spam', label: __( 'Save it as spam', 'formglut' ) }], show: (s) => s.spam.keywords.trim() !== '' },
        { path: 'spam.min_time', type: 'number', label: __( 'Minimum time to fill (seconds)', 'formglut' ), tip: __( '0 = off. Faster submissions are treated as bots.', 'formglut' ) },
        { path: 'spam.store_entries', type: 'select', label: __( 'Save entries', 'formglut' ), options: [{ value: 'global', label: __( 'Use global setting', 'formglut' ) }, { value: 'save', label: __( 'Always save', 'formglut' ) }, { value: 'email_only', label: __( 'Email only, do not save', 'formglut' ) }] },
        { path: 'spam.store_ip', type: 'switch', label: __( 'Store IP address and browser', 'formglut' ) },
        { path: 'spam.retention_days', type: 'number', label: __( 'Delete entries after (days)', 'formglut' ), tip: __( '0 keeps entries forever.', 'formglut' ) },
      ],
    },
    {
      key: 'style', title: __( 'Layout & CSS', 'formglut' ), fields: [
        { path: 'style.form_width', type: 'text', label: __( 'Form width', 'formglut' ), tip: __( 'For example 640px, 100% or 40rem. Empty uses the default.', 'formglut' ), placeholder: '640px' },
        { path: 'style.form_align', type: 'select', label: __( 'Form alignment', 'formglut' ), options: [{ value: 'left', label: __( 'Left', 'formglut' ) }, { value: 'center', label: __( 'Center', 'formglut' ) }, { value: 'right', label: __( 'Right', 'formglut' ) }] },
        { path: 'style.custom_css', type: 'code', rows: 6, label: __( 'Custom CSS', 'formglut' ), tip: __( 'Use {form} for this form’s wrapper, e.g. {form} .formglut-label { color: red; }', 'formglut' ) },
      ],
    },
    {
      key: 'entries', title: __( 'Entries & analytics', 'formglut' ), fields: [
        { path: 'entries.count_views', type: 'switch', label: __( 'Count form views', 'formglut' ) },
      ],
    },
  ];
}

export const getIn = (obj, path) => path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
export const setIn = (obj, path, value) => {
  const keys = path.split('.');
  const next = { ...obj };
  let cur = next;
  keys.slice(0, -1).forEach((k) => { cur[k] = { ...cur[k] }; cur = cur[k]; });
  cur[keys[keys.length - 1]] = value;
  return next;
};

/** The input for one setting, without its label. */
export function FieldInput({ f, value, onChange }) {
  switch (f.type) {
    case 'switch':
      return <Switch checked={!!value} onChange={onChange} />;
    case 'select':
      return <Select value={value} onChange={onChange} options={f.options} style={{ width: '100%' }} />;
    case 'number':
      return <InputNumber min={0} value={value} onChange={(v) => onChange(v || 0)} style={{ width: '100%' }} />;
    case 'textarea':
      return <Input.TextArea rows={f.rows || 3} value={value} onChange={(e) => onChange(e.target.value)} />;
    case 'code':
      return <Input.TextArea rows={f.rows || 6} value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12 }} />;
    case 'datetime':
      return <Input type="datetime-local" value={value} onChange={(e) => onChange(e.target.value)} />;
    default:
      return <Input value={value} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />;
  }
}
