import React, { useEffect, useState } from 'react';
import { Modal, Button, Spin, Checkbox, message, Tag } from 'antd';
import { __, sprintf } from '@wordpress/i18n';
import * as api from '../services/api';

/**
 * Import forms (fields and layout) from other form plugins installed on the site.
 */
export default function MigratorModal({ open, onClose, onImported }) {
  const [sources, setSources] = useState(null);
  const [picked, setPicked] = useState({});
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!open) return;
    setSources(null); setPicked({}); setResults([]);
    api.getMigrationSources().then((d) => setSources(d.sources || [])).catch((e) => { message.error(e.message); setSources([]); });
  }, [open]);

  const keyOf = (s, f) => s.key + ':' + f.id;
  const selected = Object.keys(picked).filter((k) => picked[k]);

  const run = async () => {
    setRunning(true);
    const out = [];
    for (const k of selected) {
      const [source, id] = k.split(':');
      const title = sources.find((s) => s.key === source)?.forms.find((f) => String(f.id) === id)?.title || k;
      try {
        const r = await api.migrateForm(source, Number(id));
        out.push({ ok: true, title, formId: r.form_id, skipped: r.skipped || [] });
      } catch (e) {
        out.push({ ok: false, title, error: e.message });
      }
      setResults([...out]);
    }
    setRunning(false);
    setPicked({});
    onImported();
  };

  return (
    <Modal open={open} onCancel={onClose} width={640} title={__( 'Import from another form plugin', 'formglut' )}
      footer={[
        <Button key="close" onClick={onClose}>{__( 'Close', 'formglut' )}</Button>,
        <Button key="go" type="primary" disabled={!selected.length} loading={running} onClick={run} style={selected.length ? { background: '#e94560', borderColor: '#e94560' } : undefined}>
          {selected.length ? sprintf( __( 'Import %d form(s)', 'formglut' ), selected.length ) : __( 'Import', 'formglut' )}
        </Button>,
      ]}>
      <p style={{ color: '#64748b', marginTop: 0 }}>{__( 'Copies each form’s fields, labels, choices and columns into a new FormGlut draft. Entries stay in the other plugin. Supported: Fluent Forms, Forminator, WPForms, Contact Form 7.', 'formglut' )}</p>
      {sources === null ? <div style={{ textAlign: 'center', padding: 30 }}><Spin /></div> : sources.length === 0 ? (
        <div className="fg-fs-note">{__( 'No forms from supported plugins were found on this site.', 'formglut' )}</div>
      ) : sources.map((s) => (
        <div key={s.key} className="fg-mig-source">
          <div className="fg-mig-head">
            <strong>{s.name}</strong>
            <Checkbox checked={s.forms.length > 0 && s.forms.every((f) => picked[keyOf(s, f)])} onChange={(e) => setPicked((p) => { const n = { ...p }; s.forms.forEach((f) => { n[keyOf(s, f)] = e.target.checked; }); return n; })}>{__( 'Select all', 'formglut' )}</Checkbox>
          </div>
          {s.forms.map((f) => (
            <label key={f.id} className="fg-mig-row">
              <Checkbox checked={!!picked[keyOf(s, f)]} onChange={(e) => setPicked((p) => ({ ...p, [keyOf(s, f)]: e.target.checked }))} />
              <span className="t">{f.title || __( '(no title)', 'formglut' )}</span>
              {f.fields !== null && <span className="m">{sprintf( __( '%d fields', 'formglut' ), f.fields )}</span>}
              {f.imported && <Tag color="green">{__( 'Imported before', 'formglut' )}</Tag>}
            </label>
          ))}
        </div>
      ))}
      {results.length > 0 && (
        <div className="fg-mig-results">
          {results.map((r, i) => (
            <div key={i} className={r.ok ? 'ok' : 'bad'}>
              {r.ok ? '✓' : '✕'} <strong>{r.title}</strong>{' '}
              {r.ok ? <a href={(window.formglut_admin?.pages?.editor || '') + '&form_id=' + r.formId}>{__( 'Open in editor', 'formglut' )}</a> : r.error}
              {r.ok && r.skipped.length > 0 && <div className="fg-fs-help">{__( 'Not imported (no matching FormGlut field):', 'formglut' )} {r.skipped.join(', ')}</div>}
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
