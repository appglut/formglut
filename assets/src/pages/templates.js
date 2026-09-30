/**
 * Starter form templates for "Add New Form → Choose a Template".
 * Each field is built from the field type defaults (createField), then adjusted.
 */
import { __ } from '@wordpress/i18n';
import { createField } from '../fields/fieldTypes.jsx';

let n = 0;
const f = (type, props = {}) => ({ ...createField(type), id: 'f' + Date.now().toString(36) + (++n), ...props });
const cols = (children, gap = 'medium') => ({ ...createField('column_2'), id: 'c' + Date.now().toString(36) + (++n), gap, columns: children.map((fields) => ({ width: 50, fields })) });
const choices = (list) => list.map((label) => ({ label, value: label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') }));

export const TEMPLATES = [
  {
    key: 'contact', title: __( 'Contact form', 'formglut' ), desc: __( 'Name, email, subject and message.', 'formglut' ), icon: '✉️',
    build: () => ({
      fields: [
        cols([[f('text', { label: __( 'Your name', 'formglut' ), placeholder: '', required: true })], [f('email', { label: __( 'Email', 'formglut' ) })]]),
        f('text', { label: __( 'Subject', 'formglut' ), placeholder: '' }),
        f('textarea', { label: __( 'Message', 'formglut' ), placeholder: __( 'How can we help?', 'formglut' ), required: true }),
      ],
      settings: { confirmation: { message: __( 'Thanks! We will get back to you soon.', 'formglut' ) } },
    }),
  },
  {
    key: 'feedback', title: __( 'Feedback survey', 'formglut' ), desc: __( 'Star rating, what went well and what to improve.', 'formglut' ), icon: '⭐',
    build: () => ({
      fields: [
        f('star_rating', { label: __( 'How would you rate your experience?', 'formglut' ), required: true, show_labels: true }),
        f('radio', { label: __( 'Would you recommend us?', 'formglut' ), options: choices([__( 'Yes', 'formglut' ), __( 'Maybe', 'formglut' ), __( 'No', 'formglut' )]), layout: 'inline' }),
        f('textarea', { label: __( 'What did you like?', 'formglut' ), placeholder: '' }),
        f('textarea', { label: __( 'What could we do better?', 'formglut' ), placeholder: '' }),
        f('email', { label: __( 'Email (optional)', 'formglut' ), required: false }),
      ],
    }),
  },
  {
    key: 'newsletter', title: __( 'Newsletter sign-up', 'formglut' ), desc: __( 'Email and first name with consent.', 'formglut' ), icon: '📰',
    build: () => ({
      fields: [
        cols([[f('text', { label: __( 'First name', 'formglut' ), placeholder: '' })], [f('email', { label: __( 'Email', 'formglut' ) })]]),
        f('gdpr_agreement', { required: true }),
      ],
      settings: { confirmation: { message: __( 'You are subscribed. Welcome aboard!', 'formglut' ) } },
    }),
  },
  {
    key: 'quote', title: __( 'Request a quote', 'formglut' ), desc: __( 'Contact details, service, budget and details.', 'formglut' ), icon: '💼',
    build: () => ({
      fields: [
        f('name', {}),
        cols([[f('email', { label: __( 'Email', 'formglut' ) })], [f('phone', { label: __( 'Phone', 'formglut' ), required: false })]]),
        f('select', { label: __( 'Service', 'formglut' ), required: true, options: choices([__( 'Design', 'formglut' ), __( 'Development', 'formglut' ), __( 'Marketing', 'formglut' ), __( 'Other', 'formglut' )]) }),
        f('select', { label: __( 'Budget', 'formglut' ), options: choices(['< $1,000', '$1,000 – $5,000', '$5,000 – $10,000', '> $10,000']) }),
        f('textarea', { label: __( 'Project details', 'formglut' ), placeholder: '', required: true }),
        f('file_upload', { label: __( 'Attachments (optional)', 'formglut' ), required: false, multiple: true }),
      ],
    }),
  },
  {
    key: 'event', title: __( 'Event registration', 'formglut' ), desc: __( 'Attendee details, ticket type and dietary needs.', 'formglut' ), icon: '🎟️',
    build: () => ({
      fields: [
        f('name', {}),
        cols([[f('email', { label: __( 'Email', 'formglut' ) })], [f('phone', { label: __( 'Phone', 'formglut' ), required: false })]]),
        f('radio', { label: __( 'Ticket', 'formglut' ), required: true, options: choices([__( 'Standard', 'formglut' ), __( 'VIP', 'formglut' ), __( 'Student', 'formglut' )]) }),
        f('checkbox', { label: __( 'Dietary requirements', 'formglut' ), options: choices([__( 'Vegetarian', 'formglut' ), __( 'Vegan', 'formglut' ), __( 'Gluten free', 'formglut' )]), enable_other: true, layout: 'inline' }),
        f('unique_id', { label: __( 'Booking number', 'formglut' ), id_prefix: 'EV-' }),
      ],
      settings: { confirmation: { message: __( 'You are registered! Your booking number is {field:BOOKING}.', 'formglut' ) } },
    }),
  },
  {
    key: 'job', title: __( 'Job application', 'formglut' ), desc: __( 'Multi-step: details, experience, CV upload.', 'formglut' ), icon: '🧑‍💼',
    build: () => ({
      fields: [
        f('name', {}),
        cols([[f('email', { label: __( 'Email', 'formglut' ) })], [f('phone', { label: __( 'Phone', 'formglut' ) })]]),
        f('form_step', { step_title: __( 'Experience', 'formglut' ) }),
        f('select', { label: __( 'Position', 'formglut' ), required: true, options: choices([__( 'Designer', 'formglut' ), __( 'Developer', 'formglut' ), __( 'Support', 'formglut' )]) }),
        f('url', { label: __( 'Portfolio or LinkedIn', 'formglut' ), required: false }),
        f('textarea', { label: __( 'Why do you want to join us?', 'formglut' ), placeholder: '', max_words: 250, show_counter: true }),
        f('form_step', { step_title: __( 'Documents', 'formglut' ) }),
        f('file_upload', { label: __( 'CV / résumé', 'formglut' ), required: true, allowed_types: 'pdf, doc, docx' }),
        f('terms_conditions', { required: true }),
      ],
      settings: { multistep: { first_title: __( 'Your details', 'formglut' ) }, notifications: { attach_files: true } },
    }),
  },
  {
    key: 'support', title: __( 'Support ticket', 'formglut' ), desc: __( 'Priority, category, description and screenshot.', 'formglut' ), icon: '🛟',
    build: () => ({
      fields: [
        cols([[f('text', { label: __( 'Your name', 'formglut' ), placeholder: '', required: true })], [f('email', { label: __( 'Email', 'formglut' ) })]]),
        cols([[f('select', { label: __( 'Category', 'formglut' ), options: choices([__( 'Billing', 'formglut' ), __( 'Technical', 'formglut' ), __( 'Account', 'formglut' ), __( 'Other', 'formglut' )]) })], [f('radio', { label: __( 'Priority', 'formglut' ), options: choices([__( 'Low', 'formglut' ), __( 'Normal', 'formglut' ), __( 'High', 'formglut' )]), layout: 'inline' })]]),
        f('text', { label: __( 'Subject', 'formglut' ), placeholder: '', required: true }),
        f('rich_text', { label: __( 'Describe the problem', 'formglut' ), required: true }),
        f('file_upload', { label: __( 'Screenshot (optional)', 'formglut' ), required: false, images_only: true }),
        f('unique_id', { label: __( 'Ticket number', 'formglut' ), id_prefix: 'TK-' }),
      ],
    }),
  },
  {
    key: 'appointment', title: __( 'Appointment booking', 'formglut' ), desc: __( 'Date, time and reason — weekdays only.', 'formglut' ), icon: '📅',
    build: () => ({
      fields: [
        f('name', {}),
        cols([[f('email', { label: __( 'Email', 'formglut' ) })], [f('phone', { label: __( 'Phone', 'formglut' ) })]]),
        cols([[f('date', { label: __( 'Preferred date', 'formglut' ), required: true, use_picker: true, disable_past: true, disable_weekends: true })], [f('time', { label: __( 'Preferred time', 'formglut' ), time_format: '12', time_increment: 30, min_time: '09:00', max_time: '17:00' })]]),
        f('textarea', { label: __( 'Reason for the visit', 'formglut' ), placeholder: '' }),
      ],
    }),
  },
];

/** Replace template placeholders that need real field IDs (e.g. {field:BOOKING}). */
export function finalizeTemplate(t) {
  const built = t.build();
  const flat = [];
  const walk = (list) => list.forEach((x) => { if (x.columns) x.columns.forEach((c) => walk(c.fields || [])); else flat.push(x); });
  walk(built.fields);
  const uid = flat.find((x) => x.type === 'unique_id');
  if (uid && built.settings?.confirmation?.message) {
    built.settings.confirmation.message = built.settings.confirmation.message.replace('{field:BOOKING}', '{field:' + uid.id + '}');
  }
  return built;
}
