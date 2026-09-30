import React, { useEffect, useState } from 'react';
import { Modal, Button, Spin, Checkbox, message, Tag, Switch, Progress } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faListUl, faCircleCheck, faCircleXmark, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { __, sprintf, _n } from '@wordpress/i18n';
import * as api from '../services/api';

const SUPPORTED = ['WPForms', 'Fluent Forms', 'Ninja Forms', 'Forminator', 'MetForm', 'SureForms', 'Formidable', 'Form Maker', 'Gutena Forms', 'Contact Form 7'];

/**
 * Import forms (and optionally their entries) from other form plugins installed on the site.
 * `inline` renders it as a page section (Data & Logs), otherwise as a modal.
 */
export default function MigratorModal({ open, onClose, onImported, inline }) {
  const [sources, setSources] = useState(null);
  const [picked, setPicked] = useState({});
  const [withEntries, setWithEntries] = useState(true);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(null);

  const load = () => api.getMigrationSources().then((d) => setSources(d.sources || [])).catch((e) => { message.error(e.message); setSources([]); });

  useEffect(() => {
    if (!open && !inline) return;
    setSources(null); setPicked({}); setResults([]); setProgress(null);
    load();
  }, [open, inline]);

  const keyOf = (s, f) => s.key + ':' + f.id;
  const selected = Object.keys(picked).filter((k) => picked[k]);
  const find = (k) => { const [source, id] = k.split(':'); const s = sources.find((x) => x.key === source); return { s, f: s?.forms.find((x) => String(x.id) === id), source, id: Number(id) }; };
  const pickedEntries = sources ? selected.reduce((n, k) => n + (find(k).f?.entries || 0), 0) : 0;
  const totalEntries = (s) => s.forms.reduce((n, f) => n + (f.entries || 0), 0);

  /** Copy all entries of one form, 100 at a time, updating the progress bar. */
  const copyEntries = async (source, id, formId, total, label) => {
    let offset = 0; let copied = 0;
    for (;;) {
      setProgress({ label, done: offset, total });
      const r = await api.migrateEntries(source, id, formId, offset);
      copied += r.copied; offset = r.next;
      if (r.done) break;
    }
    setProgress(null);
    return copied;
  };

  const run = async () => {
    setRunning(true);
    const out = [];
    for (const k of selected) {
      const { f, source, id } = find(k);
      const title = f?.title || k;
      try {
        const r = await api.migrateForm(source, id);
        let copied = null;
        if (withEntries && r.entries_total > 0) {
          try { copied = await copyEntries(source, id, r.form_id, r.entries_total, title); } catch (e) { copied = -1; }
        }
        out.push({ ok: true, title, formId: r.form_id, skipped: r.skipped || [], entries: copied, entriesTotal: r.entries_total });
      } catch (e) {
        out.push({ ok: false, title, error: e.message });
      }
      setResults([...out]);
    }
    setRunning(false); setPicked({}); setProgress(null);
    if (onImported) onImported();
    load();
  };

  /** Copy entries into a form that was imported earlier. */
  const runEntriesOnly = async (s, f) => {
    setRunning(true);
    try {
      const n = await copyEntries(s.key, f.id, f.form_id, f.entries, f.title);
      message.success(sprintf( _n( '%d entry copied.', '%d entries copied.', n, 'formglut' ), n ));
      load();
    } catch (e) { message.error(e.message); setProgress(null); }
    setRunning(false);
  };

  const body = (
    <div className="fg-mig">
      <p className="fg-mig-intro">{__( 'Copies each form’s fields, labels, choices, layout and submit button into a new FormGlut draft. You can also copy the submissions stored in the other plugin. Per-form email and notification settings are not copied.', 'formglut' )}</p>

      {sources === null ? <div style={{ textAlign: 'center', padding: 30 }}><Spin /></div> : sources.length === 0 ? (
        <div className="fg-mig-empty">
          <div className="t">{__( 'No forms from supported plugins were found on this site.', 'formglut' )}</div>
          <div className="s">{__( 'Install and keep one of these plugins active, and its forms will be listed here:', 'formglut' )}</div>
          <div className="chips">{SUPPORTED.map((n) => <span key={n}>{n}</span>)}</div>
        </div>
      ) : (
        <>
          <div className="fg-mig-option">
            <div>
              <div className="t">{__( 'Also copy entries', 'formglut' )}</div>
              <div className="s">
                {withEntries
                  ? (pickedEntries > 0 ? sprintf( _n( '%d entry in the selected forms will be copied with its original date and status.', '%d entries in the selected forms will be copied with their original dates and statuses.', pickedEntries, 'formglut' ), pickedEntries ) : __( 'Entries of the forms you select will be copied with their original dates and statuses.', 'formglut' ))
                  : __( 'Only the forms are imported. Entries stay in the other plugin.', 'formglut' )}
              </div>
            </div>
            <Switch checked={withEntries} onChange={setWithEntries} />
          </div>

          {sources.map((s) => (
            <div key={s.key} className="fg-mig-source">
              <div className="fg-mig-head">
                <div className="name">
                  <strong>{s.name}</strong>
                  <span className="pill"><FontAwesomeIcon icon={faListUl} /> {sprintf( _n( '%d form', '%d forms', s.forms.length, 'formglut' ), s.forms.length )}</span>
                  {totalEntries(s) > 0 && <span className="pill entries"><FontAwesomeIcon icon={faInbox} /> {sprintf( _n( '%d entry', '%d entries', totalEntries(s), 'formglut' ), totalEntries(s))}</span>}
                </div>
                <Checkbox checked={s.forms.length > 0 && s.forms.every((f) => picked[keyOf(s, f)])} onChange={(e) => setPicked((p) => { const n = { ...p }; s.forms.forEach((f) => { n[keyOf(s, f)] = e.target.checked; }); return n; })}>{__( 'Select all', 'formglut' )}</Checkbox>
              </div>
              {s.forms.map((f) => (
                <label key={f.id} className={`fg-mig-row ${picked[keyOf(s, f)] ? 'on' : ''}`}>
                  <Checkbox checked={!!picked[keyOf(s, f)]} onChange={(e) => setPicked((p) => ({ ...p, [keyOf(s, f)]: e.target.checked }))} />
                  <span className="t">{f.title || __( '(no title)', 'formglut' )}</span>
                  {f.fields !== null && f.fields !== undefined && <span className="chip">{sprintf( _n( '%d field', '%d fields', f.fields, 'formglut' ), f.fields )}</span>}
                  <span className={`chip ${f.entries ? 'has' : 'zero'}`}>{sprintf( _n( '%d entry', '%d entries', f.entries || 0, 'formglut' ), f.entries || 0 )}</span>
                  {f.imported && <Tag color="green" style={{ margin: 0 }}>{__( 'Imported', 'formglut' )}</Tag>}
                  {f.imported && f.entries > 0 && (f.entries_copied
                    ? <Tag color="blue" style={{ margin: 0 }}>{__( 'Entries copied', 'formglut' )}</Tag>
                    : <Button size="small" disabled={running} onClick={(e) => { e.preventDefault(); runEntriesOnly(s, f); }}>{__( 'Copy entries', 'formglut' )}</Button>)}
                </label>
              ))}
            </div>
          ))}
        </>
      )}

      {progress && (
        <div className="fg-mig-progress">
          <div>{sprintf( __( 'Copying entries of “%s”…', 'formglut' ), progress.label )}</div>
          <Progress percent={progress.total ? Math.min(99, Math.round(progress.done / progress.total * 100)) : 0} strokeColor="#e94560" size="small" />
        </div>
      )}

      {results.length > 0 && (
        <div className="fg-mig-results">
          {results.map((r, i) => (
            <div key={i} className={r.ok ? 'ok' : 'bad'}>
              <FontAwesomeIcon icon={r.ok ? faCircleCheck : faCircleXmark} />
              <div>
                <strong>{r.title}</strong>
                {r.ok
                  ? <> · <a href={(window.formglut_admin?.pages?.editor || '') + '&form_id=' + r.formId}>{__( 'Open in editor', 'formglut' )} <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: 10 }} /></a></>
                  : <> · {r.error}</>}
                {r.ok && r.entries !== null && (r.entries === -1
                  ? <div className="fg-fs-help">{__( 'The form was imported, but copying entries failed. Use “Copy entries” to retry.', 'formglut' )}</div>
                  : <div className="fg-fs-help">{sprintf( _n( '%d entry copied.', '%d entries copied.', r.entries, 'formglut' ), r.entries )}</div>)}
                {r.ok && r.skipped.length > 0 && <div className="fg-fs-help">{__( 'Not imported (no matching FormGlut field):', 'formglut' )} {r.skipped.join(', ')}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const runBtn = (
    <Button type="primary" size={inline ? 'large' : 'middle'} disabled={!selected.length} loading={running} onClick={run} style={selected.length ? { background: '#e94560', borderColor: '#e94560', borderRadius: 8, fontWeight: 600 } : { borderRadius: 8 }}>
      {selected.length
        ? (withEntries && pickedEntries > 0 ? sprintf( __( 'Import %1$d form(s) + %2$d entries', 'formglut' ), selected.length, pickedEntries ) : sprintf( __( 'Import %d form(s)', 'formglut' ), selected.length ))
        : __( 'Import', 'formglut' )}
    </Button>
  );

  if (inline) return <div>{body}{sources && sources.length > 0 && <div className="fg-mig-actions">{runBtn}</div>}</div>;

  return (
    <Modal open={open} onCancel={onClose} width={720} title={__( 'Import from another form plugin', 'formglut' )}
      footer={[<Button key="close" onClick={onClose}>{__( 'Close', 'formglut' )}</Button>, React.cloneElement(runBtn, { key: 'go' })]}>
      {body}
    </Modal>
  );
}
