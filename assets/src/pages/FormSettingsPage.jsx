import React, { useEffect, useState } from 'react';
import { Button, Spin, message, Tooltip, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear, faCircleCheck, faEnvelope, faLock, faShieldHalved, faPalette, faChartLine,
  faFloppyDisk, faCode, faEye, faCopy, faCheck, faTags, faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';
import { _pg } from '../components/Header';
import EditorHeader from '../components/EditorHeader';
import * as api from '../services/api';
import { flattenFields } from '../fields/fieldTypes.jsx';
import { DEFAULT_FORM_SETTINGS, mergeFormSettings, buildSchema, FieldInput, getIn, setIn } from './FormSettings.jsx';

message.config({ duration: 3, maxCount: 3, top: 24 });

const SECTION_META = {
  general: { icon: faGear, desc: __( 'How the form is presented on the page.', 'formglut' ) },
  confirmation: { icon: faCircleCheck, desc: __( 'What visitors see after they submit successfully.', 'formglut' ) },
  notifications: { icon: faEnvelope, desc: __( 'Emails sent when someone submits this form.', 'formglut' ) },
  restrictions: { icon: faLock, desc: __( 'Control who can submit, and when.', 'formglut' ) },
  spam: { icon: faShieldHalved, desc: __( 'Keep bots out and decide what data is stored.', 'formglut' ) },
  style: { icon: faPalette, desc: __( 'Size, alignment and custom CSS for this form.', 'formglut' ) },
  entries: { icon: faChartLine, desc: __( 'How this form is counted.', 'formglut' ) },
};

const NON_INPUT = ['html', 'heading', 'section_break', 'shortcode', 'action_hook', 'custom_submit_button', 'recaptcha', 'hcaptcha', 'turnstile'];

function copyText(text, done) {
  const finish = () => message.success(done);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(() => {});
  }
}

/**
 * "{ } Smart tags" button next to a label. Opens a list of tags: click one to insert it into the
 * field, or use the copy icon to copy it.
 * mode: true = all tags, 'plain' = no {all_fields} table, 'url' = no {all_fields}, values are URL-encoded on send.
 */
function TagPopover({ fields, mode, value, onInsert }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState('');

  const general = [
    ['{form_name}', __( 'Form name', 'formglut' )],
    ['{form_id}', __( 'Form ID', 'formglut' )],
    ['{entry_id}', __( 'Entry ID', 'formglut' )],
    ['{site_name}', __( 'Site name', 'formglut' )],
    ['{site_url}', __( 'Site URL', 'formglut' )],
    ['{admin_email}', __( 'Admin email', 'formglut' )],
    ['{date}', __( 'Submission date', 'formglut' )],
    ['{time}', __( 'Submission time', 'formglut' )],
    ['{ip}', __( 'Visitor IP', 'formglut' )],
    ['{user_email}', __( 'Logged-in user email', 'formglut' )],
    ['{user_name}', __( 'Logged-in user name', 'formglut' )],
  ];
  if (mode === true) general.unshift(['{all_fields}', __( 'All fields (table)', 'formglut' )]);
  const perField = fields
    .filter((f) => f.id && !NON_INPUT.includes(f.type))
    .map((f) => ['{field:' + f.id + '}', f.admin_label || f.label || f.type]);

  const copy = (tag) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tag).catch(() => {});
    }
    setCopied(tag);
    setTimeout(() => setCopied(''), 1200);
  };
  const insert = (tag) => {
    const v = value || '';
    onInsert(v && !/\s$/.test(v) && !['url'].includes(mode) ? v + ' ' + tag : v + tag);
    setOpen(false);
    message.success(__( 'Tag added', 'formglut' ));
  };

  const list = (items) => items.map(([tag, label]) => (
    <div key={tag} className="fg-tag-item" role="button" tabIndex={0} onClick={() => insert(tag)} onKeyDown={(e) => { if (e.key === 'Enter') insert(tag); }}>
      <span className="name">{label}</span>
      <code>{tag}</code>
      <button type="button" className={copied === tag ? 'copy done' : 'copy'} title={__( 'Copy', 'formglut' )} onClick={(e) => { e.stopPropagation(); copy(tag); }}>
        <FontAwesomeIcon icon={copied === tag ? faCheck : faCopy} />
      </button>
    </div>
  ));

  const content = (
    <div className="fg-tag-pop">
      <div className="fg-tag-title">{__( 'Insert a value from the form', 'formglut' )}</div>
      <div className="fg-tag-hint">{__( 'These are replaced with the real answer when someone submits the form. Click one to add it to this field, or use the copy icon to copy it.', 'formglut' )}</div>
      <div className="fg-tag-group">{__( 'General', 'formglut' )}</div>
      {list(general)}
      {perField.length > 0 && <div className="fg-tag-group">{__( 'Field values', 'formglut' )}</div>}
      {list(perField)}
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen} trigger="click" placement="bottomLeft" content={content} arrow={false} overlayClassName="fg-tag-popover">
      <button type="button" className="fg-tag-btn" title={__( 'Insert a value from the form, such as the visitor’s name or email', 'formglut' )}>
        <FontAwesomeIcon icon={faTags} />
        <strong>{__( 'Smart tags', 'formglut' )}</strong>
        <FontAwesomeIcon icon={faChevronDown} className="chev" />
      </button>
    </Popover>
  );
}

export default function FormSettingsPage() {
  const formId = parseInt(new URLSearchParams(window.location.search).get('form_id') || '0', 10) || 0;
  const [state, setState] = useState({ loading: !!formId, error: '', title: '', fields: [], status: '' });
  const [settings, setSettings] = useState(DEFAULT_FORM_SETTINGS);
  const [active, setActive] = useState('confirmation');
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!formId) return;
    api.getForm(formId)
      .then((d) => {
        setState({ loading: false, error: '', title: d.form.title, status: d.form.status, fields: Array.isArray(d.form.fields) ? d.form.fields : [] });
        setSettings(mergeFormSettings(d.form.settings));
      })
      .catch((e) => setState((s) => ({ ...s, loading: false, error: e.message || __( 'Form not found.', 'formglut' ) })));
  }, [formId]);

  useEffect(() => {
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const save = async () => {
    setSaving(true);
    try {
      await api.updateForm({ id: formId, settings });
      setDirty(false);
      message.success(__( 'Form settings saved.', 'formglut' ));
    } catch (e) {
      message.error(e.message || __( 'Failed to save form settings.', 'formglut' ));
    } finally { setSaving(false); }
  };

  const update = (path, value) => { setSettings((s) => setIn(s, path, value)); setDirty(true); };

  if (!formId || state.loading || state.error) {
    return (
      <div className="fg-fs-page">
        <EditorHeader formId={formId} title={state.title} active="settings" />
        <div className="fg-fs-body" style={{ textAlign: 'center', paddingTop: 80 }}>
          {state.loading ? <Spin size="large" /> : (
            <div className="fg-fs-empty">
              <div className="fg-fs-empty-title">{state.error || __( 'No form selected', 'formglut' )}</div>
              <p>{__( 'Open a form from the Forms list, then choose Settings.', 'formglut' )}</p>
              <a href={_pg.all_forms}><Button type="primary" style={{ background: '#e94560', borderColor: '#e94560' }}>{__( 'Go to Forms', 'formglut' )}</Button></a>
            </div>
          )}
        </div>
      </div>
    );
  }

  const inputFields = flattenFields(state.fields);
  const emailFields = inputFields.filter((f) => f.type === 'email').map((f) => ({ value: f.id, label: f.admin_label || f.label || f.id }));
  const schema = buildSchema(emailFields);
  const section = schema.find((s) => s.key === active) || schema[0];
  const meta = SECTION_META[section.key] || {};
  const shortcode = `[formglut id="${formId}"]`;
  const rows = section.fields.filter((f) => !f.show || f.show(settings));

  const ghost = { color: '#fff', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)', borderRadius: 8 };

  return (
    <div className="fg-fs-page">
      <EditorHeader formId={formId} title={state.title} active="settings">
        <Button icon={<FontAwesomeIcon icon={faEye} />} style={ghost} onClick={() => window.open(_pg.preview + '&form_id=' + formId, '_blank')}>{__( 'Preview', 'formglut' )}</Button>
        <Tooltip title={shortcode}>
          <Button icon={<FontAwesomeIcon icon={faCode} />} style={ghost} onClick={() => copyText(shortcode, __( 'Shortcode copied', 'formglut' ))}>{__( 'Shortcode', 'formglut' )}</Button>
        </Tooltip>
        <Button icon={<FontAwesomeIcon icon={faFloppyDisk} />} type="primary" loading={saving} disabled={!dirty} onClick={save} style={{ background: dirty ? '#e94560' : undefined, borderColor: dirty ? '#e94560' : undefined, borderRadius: 8, fontWeight: 600 }}>
          {dirty ? __( 'Save Settings *', 'formglut' ) : __( 'Save Settings', 'formglut' )}
        </Button>
      </EditorHeader>

      <div className="fg-fs-body">
        <div className="fg-fs-top">
          <div className="fg-fs-titlebar">
            <div>
              <div className="fg-page-title">{__( 'Form settings', 'formglut' )}</div>
            </div>
          </div>
          <div className="fg-fs-note">{__( 'These settings apply to this form only. Site-wide options are under FormGlut → Global Settings.', 'formglut' )}</div>
        </div>

        <div className="fg-fs-layout">
          <nav className="fg-fs-nav">
            {schema.map((s) => (
              <button key={s.key} type="button" className={s.key === section.key ? 'active' : ''} onClick={() => setActive(s.key)}>
                <span className="ic"><FontAwesomeIcon icon={(SECTION_META[s.key] || {}).icon || faGear} /></span>
                <span>{s.title}</span>
              </button>
            ))}
          </nav>

          <section className="fg-fs-card">
            <div className="fg-fs-card-head">
              <span className="ic"><FontAwesomeIcon icon={meta.icon || faGear} /></span>
              <div>
                <h2>{section.title}</h2>
                <p>{meta.desc}</p>
              </div>
            </div>

            {rows.map((f) => (
              <div key={f.path} className={`fg-fs-row ${f.type === 'switch' ? 'is-switch' : ''} ${f.divider ? 'has-divider' : ''} ${['textarea', 'code'].includes(f.type) ? 'is-wide' : ''}`}>
                <div className="fg-fs-label">
                  <div className="fg-fs-label-line">
                    <label>{f.label}</label>
                    {f.tags && <TagPopover fields={inputFields} mode={f.tags} value={getIn(settings, f.path)} onInsert={(v) => update(f.path, v)} />}
                  </div>
                  {f.tip && <div className="fg-fs-help">{f.tip}</div>}
                </div>
                <div className="fg-fs-control">
                  <FieldInput f={f} value={getIn(settings, f.path)} onChange={(v) => update(f.path, v)} />
                </div>
              </div>
            ))}

          </section>
        </div>
      </div>
    </div>
  );
}
