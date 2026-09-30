import React, { useEffect, useState, useCallback } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Button, Switch, Select, Input, InputNumber, Checkbox, Table, Tag, Spin, message, Popconfirm, DatePicker, Upload, Radio, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faFileExport, faFileImport, faClockRotateLeft, faPlug, faEnvelope, faHeartPulse, faBroom, faCircleCheck, faCircleXmark, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import MigratorModal from './MigratorModal';
import * as api from '../services/api';

message.config({ duration: 3, maxCount: 3, top: 24, placement: 'top' });

const pink = { background: '#e94560', borderColor: '#e94560', borderRadius: 8, fontWeight: 600 };

/** One label / control row in the shared settings layout. */
function Row({ label, help, children, wide, sw }) {
  return (
    <div className={`fg-fs-row ${wide ? 'is-wide' : ''} ${sw ? 'is-switch' : ''}`}>
      <div className="fg-fs-label"><div className="fg-fs-label-line"><label>{label}</label></div>{help && <div className="fg-fs-help">{help}</div>}</div>
      <div className="fg-fs-control">{children}</div>
    </div>
  );
}

/* ── Export ─────────────────────────────────────────────────────────── */

function ExportTab() {
  const [forms, setForms] = useState(null);
  const [picked, setPicked] = useState([]);
  const [entries, setEntries] = useState(false);
  useEffect(() => { api.getForms({ per_page: 200 }).then((d) => setForms(d.forms || [])).catch(() => setForms([])); }, []);
  if (forms === null) return <Spin />;
  const all = picked.length === forms.length && forms.length > 0;
  return (
    <>
      <Row label={__( 'Forms to export', 'formglut' )} help={__( 'Fields, layout, styles and every per-form setting are included.', 'formglut' )} wide>
        <div style={{ marginBottom: 8 }}><Checkbox checked={all} indeterminate={picked.length > 0 && !all} onChange={(e) => setPicked(e.target.checked ? forms.map((f) => f.id) : [])}>{__( 'Select all', 'formglut' )}</Checkbox></div>
        <div className="fg-tool-list">
          {forms.map((f) => (
            <label key={f.id}><Checkbox checked={picked.includes(f.id)} onChange={(e) => setPicked((p) => e.target.checked ? [...p, f.id] : p.filter((x) => x !== f.id))} /> <span>{f.title || __( '(no title)', 'formglut' )}</span> <em>#{f.id}</em></label>
          ))}
          {forms.length === 0 && <div className="fg-fs-help">{__( 'No forms yet.', 'formglut' )}</div>}
        </div>
      </Row>
      <Row sw label={__( 'Include entries', 'formglut' )} help={__( 'Also export every submission (including notes and status). The file may contain personal data: keep it safe.', 'formglut' )}>
        <Switch checked={entries} onChange={setEntries} />
      </Row>
      <div style={{ marginTop: 12 }}>
        <Button type="primary" size="large" disabled={!picked.length} icon={<FontAwesomeIcon icon={faFileExport} />} style={picked.length ? pink : undefined}
          onClick={() => { window.location.href = api.toolsExportUrl(all ? 'all' : picked.join(','), entries); }}>
          {sprintf( __( 'Download %d form(s) as JSON', 'formglut' ), picked.length )}
        </Button>
      </div>
    </>
  );
}

/* ── Import ─────────────────────────────────────────────────────────── */

function ImportTab() {
  const [raw, setRaw] = useState('');
  const [name, setName] = useState('');
  const [preview, setPreview] = useState(null);
  const [pick, setPick] = useState([]);
  const [status, setStatus] = useState('draft');
  const [entries, setEntries] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const onFile = (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      setRaw(reader.result); setName(file.name); setDone(null);
      try {
        const d = await api.toolsImportPreview(reader.result);
        setPreview(d.forms); setPick(d.forms.map((f) => f.index));
      } catch (e) { setPreview(null); message.error(e.message); }
    };
    reader.readAsText(file);
    return false;
  };
  const run = async () => {
    setBusy(true);
    try { const r = await api.toolsImport(raw, { pick, status, entries: entries ? 1 : 0 }); setDone(r); message.success(r.message); setPreview(null); setRaw(''); } catch (e) { message.error(e.message); } finally { setBusy(false); }
  };
  const hasEntries = (preview || []).some((f) => f.entries > 0);

  return (
    <>
      <Upload.Dragger accept=".json,application/json" showUploadList={false} beforeUpload={onFile} className="fg-drop">
        <div className="fg-drop-ic"><FontAwesomeIcon icon={faFileImport} /></div>
        <div className="fg-drop-t">{name || __( 'Drop an export file here, or click to choose', 'formglut' )}</div>
        <div className="fg-drop-s">{__( 'A .json file created by Export forms', 'formglut' )}</div>
      </Upload.Dragger>
      {preview && (
        <>
          <Row label={__( 'Forms found', 'formglut' )} wide>
            <div className="fg-tool-list">
              {preview.map((f) => (
                <label key={f.index}><Checkbox checked={pick.includes(f.index)} onChange={(e) => setPick((p) => e.target.checked ? [...p, f.index] : p.filter((x) => x !== f.index))} /> <span>{f.title}</span>
                  <em>{sprintf( __( '%d fields', 'formglut' ), f.fields )}{f.entries ? ' · ' + sprintf( __( '%d entries', 'formglut' ), f.entries ) : ''}</em>
                  {f.exists && <Tag color="orange">{__( 'A form with this name exists', 'formglut' )}</Tag>}
                </label>
              ))}
            </div>
          </Row>
          <Row label={__( 'Status of imported forms', 'formglut' )}>
            <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
              <Radio value="draft">{__( 'Draft', 'formglut' )}</Radio><Radio value="keep">{__( 'Same as file', 'formglut' )}</Radio><Radio value="active">{__( 'Active', 'formglut' )}</Radio>
            </Radio.Group>
          </Row>
          {hasEntries && <Row sw label={__( 'Import entries', 'formglut' )} help={__( 'Adds the submissions stored in the file to the new forms.', 'formglut' )}><Switch checked={entries} onChange={setEntries} /></Row>}
          <div style={{ marginTop: 12 }}><Button type="primary" size="large" loading={busy} disabled={!pick.length} style={pick.length ? pink : undefined} icon={<FontAwesomeIcon icon={faFileImport} />} onClick={run}>{sprintf( __( 'Import %d form(s)', 'formglut' ), pick.length )}</Button></div>
        </>
      )}
      {done && <div className="fg-fs-note" style={{ marginTop: 14 }}>{done.message} <a href={window.formglut_admin?.pages?.all_forms}>{__( 'View forms', 'formglut' )}</a></div>}
    </>
  );
}

/* ── Logs ───────────────────────────────────────────────────────────── */

const STATUS_COLOR = { ok: 'green', success: 'green', sent: 'blue', error: 'red', failed: 'red', spam: 'orange', info: 'default' };

function LogTab({ type }) {
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [f, setF] = useState({ search: '', status: '', event: '', date_from: '', date_to: '', page: 1 });
  const [events, setEvents] = useState([]);
  const [settings, setSettings] = useState(null);
  const [detail, setDetail] = useState(null);
  const [q, setQ] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.getLogs({ type, ...f, per_page: 25 }).then(setData).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, [type, f]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { api.getLogEvents(type).then((d) => setEvents(d.events || [])).catch(() => {}); api.logSettings().then((d) => setSettings(d.settings)); }, [type]);

  const saveSetting = (patch) => { const next = { ...settings, ...patch }; setSettings(next); api.logSettings(next).then((d) => setSettings(d.settings)).catch((e) => message.error(e.message)); };
  const set = (patch) => setF((x) => ({ ...x, page: 1, ...patch }));
  const isApi = type === 'api';

  const columns = [
    { title: __( 'Time', 'formglut' ), dataIndex: 'created_at', width: 160 },
    isApi
      ? { title: __( 'Service', 'formglut' ), dataIndex: 'event', width: 110 }
      : { title: __( 'Event', 'formglut' ), dataIndex: 'event', width: 150, render: (v) => <code>{v}</code> },
    isApi
      ? { title: __( 'Request', 'formglut' ), render: (_, r) => <><Tag>{r.context?.method}</Tag><span className="fg-url">{r.context?.url}</span></> }
      : { title: __( 'What happened', 'formglut' ), dataIndex: 'summary' },
    ...(isApi ? [{ title: __( 'HTTP', 'formglut' ), width: 70, render: (_, r) => r.context?.code || '—' }, { title: __( 'Time', 'formglut' ), dataIndex: 'duration_ms', width: 80, render: (v) => `${v} ms` }] : [{ title: __( 'User', 'formglut' ), dataIndex: 'user', width: 130, render: (v) => v || '—' }]),
    { title: __( 'Status', 'formglut' ), dataIndex: 'status', width: 90, render: (v) => <Tag color={STATUS_COLOR[v] || 'default'}>{v}</Tag> },
  ];

  return (
    <>
      {settings && (
        <div className="fg-log-settings">
          <label><Switch size="small" checked={!!settings[isApi ? 'api' : 'activity']} onChange={(v) => saveSetting({ [isApi ? 'api' : 'activity']: v })} /> {isApi ? __( 'Log API calls', 'formglut' ) : __( 'Record activity', 'formglut' )}</label>
          {isApi && <label><Switch size="small" checked={!!settings.api_wait} onChange={(v) => saveSetting({ api_wait: v })} /> {__( 'Wait for the response to record status codes (slower submits)', 'formglut' )}</label>}
          {isApi && <label><Switch size="small" checked={!!settings.api_bodies} onChange={(v) => saveSetting({ api_bodies: v })} /> {__( 'Store request bodies (may contain personal data)', 'formglut' )}</label>}
          <label>{__( 'Keep for', 'formglut' )} <InputNumber size="small" min={1} max={365} value={settings.keep_days} onChange={(v) => v && saveSetting({ keep_days: v })} /> {__( 'days', 'formglut' )}</label>
        </div>
      )}
      <div className="fg-log-filters">
        <Input allowClear className="fg-log-search" prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search…', 'formglut' )} value={q} onChange={(e) => setQ(e.target.value)} onPressEnter={() => set({ search: q })} onBlur={() => q !== f.search && set({ search: q })} />
        <Select allowClear placeholder={isApi ? __( 'Service', 'formglut' ) : __( 'Event', 'formglut' )} className="fg-log-select" style={{ width: 180 }} value={f.event || undefined} onChange={(v) => set({ event: v || '' })} options={events.map((e) => ({ value: e, label: e }))} />
        <Select allowClear placeholder={__( 'Status', 'formglut' )} className="fg-log-select" style={{ width: 130 }} value={f.status || undefined} onChange={(v) => set({ status: v || '' })} options={(isApi ? ['ok', 'error', 'sent'] : ['ok', 'error', 'spam', 'info']).map((s) => ({ value: s, label: s }))} />
        <DatePicker.RangePicker className="fg-log-range" onChange={(_, s) => set({ date_from: s[0] || '', date_to: s[1] || '' })} />
        <Popconfirm title={__( 'Delete every row of this log?', 'formglut' )} okText={__( 'Delete', 'formglut' )} onConfirm={() => api.clearLogs(type).then((r) => { message.success(r.message); load(); })}>
          <Button danger icon={<FontAwesomeIcon icon={faTrash} />}>{__( 'Clear log', 'formglut' )}</Button>
        </Popconfirm>
      </div>
      <Table size="middle" className="fg-log-table" scroll={{ x: 760 }} rowKey="id" loading={loading} columns={columns} dataSource={data.items}
        onRow={(r) => ({ onClick: () => setDetail(r), style: { cursor: 'pointer' } })}
        pagination={{ current: f.page, pageSize: 25, total: data.total, showSizeChanger: false, onChange: (p) => setF((x) => ({ ...x, page: p })) }} />
      <Modal open={!!detail} onCancel={() => setDetail(null)} footer={null} width={640} title={detail ? detail.event : ''}>
        {detail && <pre className="fg-log-detail">{JSON.stringify(detail, null, 2)}</pre>}
      </Modal>
    </>
  );
}

/* ── Email log ──────────────────────────────────────────────────────── */

function EmailTab() {
  const [items, setItems] = useState(null);
  const [to, setTo] = useState((window.formglut_admin || {}).admin_email || '');
  const [busy, setBusy] = useState(false);
  const load = () => api.getEmailLog().then((d) => setItems(d.items || [])).catch(() => setItems([]));
  useEffect(() => { load(); }, []);
  return (
    <>
      <Row label={__( 'Send a test email', 'formglut' )} help={__( 'Uses the sender name and email from Global Settings. The log records mail only when “Email log” is on there.', 'formglut' )}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Input value={to} onChange={(e) => setTo(e.target.value)} />
          <Button loading={busy} onClick={async () => { setBusy(true); try { const r = await api.sendTestEmail(to); message.success(r.message); load(); } catch (e) { message.error(e.message); } finally { setBusy(false); } }}>{__( 'Send', 'formglut' )}</Button>
        </div>
      </Row>
      <Table size="middle" className="fg-log-table" scroll={{ x: 640 }} rowKey={(r, i) => i} loading={items === null} dataSource={items || []} pagination={{ pageSize: 15, hideOnSinglePage: true }}
        columns={[
          { title: __( 'Time', 'formglut' ), dataIndex: 'date', width: 160 },
          { title: __( 'To', 'formglut' ), dataIndex: 'to', width: 200 },
          { title: __( 'Subject', 'formglut' ), render: (_, r) => <>{r.subject}<div className="fg-fs-help">{r.context}</div></> },
          { title: __( 'Status', 'formglut' ), dataIndex: 'status', width: 90, render: (v) => <Tag color={v === 'sent' ? 'green' : 'red'}>{v}</Tag> },
        ]} />
    </>
  );
}

/* ── System status ──────────────────────────────────────────────────── */

function StatusTab() {
  const [d, setD] = useState(null);
  useEffect(() => { api.getSystemStatus().then(setD).catch((e) => message.error(e.message)); }, []);
  if (!d) return <Spin />;
  const copy = () => {
    const text = Object.entries(d.environment).map(([k, v]) => `${k}: ${v}`).join('\n') + '\n\n' + d.checks.map((c) => `${c.ok ? '[ok]' : '[!!]'} ${c.label}`).join('\n');
    navigator.clipboard?.writeText(text).then(() => message.success(__( 'Copied. Paste it into your support request.', 'formglut' )));
  };
  return (
    <>
      <div className="fg-status-grid">
        {[['forms', __( 'Forms', 'formglut' )], ['entries', __( 'Entries', 'formglut' )], ['spam', __( 'Spam', 'formglut' )], ['trash', __( 'Trash', 'formglut' )], ['activity', __( 'Activity rows', 'formglut' )], ['api', __( 'API rows', 'formglut' )]].map(([k, l]) => (
          <div key={k} className="fg-status-stat"><b>{d.counts[k]}</b><span>{l}</span></div>
        ))}
      </div>
      <h3 className="fg-tool-h">{__( 'Health checks', 'formglut' )}</h3>
      {d.checks.map((c) => (
        <div key={c.label} className="fg-check">
          <FontAwesomeIcon icon={c.ok ? faCircleCheck : faCircleXmark} style={{ color: c.ok ? '#059669' : '#dc2626' }} />
          <span>{c.label}</span>{!c.ok && c.note && <em>{c.note}</em>}
        </div>
      ))}
      <h3 className="fg-tool-h">{__( 'Integrations configured', 'formglut' )}</h3>
      <div className="fg-tool-tags">{d.integrations.map(([n, ok, note]) => <Tag key={n} color={ok ? 'green' : 'default'}>{n}{ok && note ? ` (${note})` : ''}</Tag>)}</div>
      <h3 className="fg-tool-h">{__( 'Environment', 'formglut' )} <Button size="small" onClick={copy}>{__( 'Copy for support', 'formglut' )}</Button></h3>
      <table className="fg-env"><tbody>{Object.entries(d.environment).map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table>
    </>
  );
}

/* ── Maintenance ────────────────────────────────────────────────────── */

const TASKS = [
  { key: 'delete_spam', title: __( 'Delete all spam entries', 'formglut' ), desc: __( 'Permanently removes every entry marked as spam.', 'formglut' ), danger: true },
  { key: 'delete_trash', title: __( 'Empty the entries trash', 'formglut' ), desc: __( 'Permanently removes every trashed entry.', 'formglut' ), danger: true },
  { key: 'run_retention', title: __( 'Run entry retention now', 'formglut' ), desc: __( 'Deletes entries older than each form’s “keep entries for” limit, without waiting for the daily job.', 'formglut' ), danger: true },
  { key: 'prune_logs', title: __( 'Prune old log rows', 'formglut' ), desc: __( 'Removes activity and API log rows older than the keep-days setting.' , 'formglut' ) },
  { key: 'clear_email_log', title: __( 'Clear the email log', 'formglut' ), desc: __( 'Removes the recent-emails list.', 'formglut' ) },
  { key: 'clear_rate_limits', title: __( 'Reset submission rate limits', 'formglut' ), desc: __( 'Lets visitors who hit a form’s hourly limit submit again.', 'formglut' ) },
  { key: 'repair_tables', repair: true, title: __( 'Repair database tables', 'formglut' ), desc: __( 'Re-creates any missing FormGlut table or column. Existing data is kept.', 'formglut' ) },
];

function MaintenanceTab() {
  const [busy, setBusy] = useState('');
  const run = async (key) => { setBusy(key); try { const r = await api.runMaintenance(key); message.success(r.message); } catch (e) { message.error(e.message); } finally { setBusy(''); } };
  const card = (t) => (
    <div key={t.key} className={`fg-task ${t.danger ? 'danger' : ''}`}>
      <div className="fg-task-t">{t.title}</div>
      <div className="fg-task-d">{t.desc}</div>
      <Popconfirm disabled={!t.danger} title={__( 'This cannot be undone. Continue?', 'formglut' )} okText={__( 'Yes, continue', 'formglut' )} onConfirm={() => run(t.key)}>
        <Button danger={t.danger} loading={busy === t.key} onClick={t.danger ? undefined : () => run(t.key)}>{__( 'Run', 'formglut' )}</Button>
      </Popconfirm>
    </div>
  );
  return (
    <>
      <h3 className="fg-tool-h" style={{ marginTop: 20 }}>{__( 'Clean-up', 'formglut' )}</h3>
      <div className="fg-task-grid">{TASKS.filter((t) => !t.repair).map(card)}</div>
      <h3 className="fg-tool-h">{__( 'Repair', 'formglut' )}</h3>
      <div className="fg-task-grid">{TASKS.filter((t) => t.repair).map(card)}</div>
    </>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */

const TABS = [
  { key: 'migration', title: __( 'Migration', 'formglut' ), icon: faRightLeft, desc: __( 'Bring forms over from WPForms, Fluent Forms, Ninja Forms, Forminator, MetForm, SureForms, Formidable, Form Maker, Gutena Forms and Contact Form 7. Imported forms start as drafts.', 'formglut' ), render: () => <MigratorModal inline /> },
  { key: 'export', title: __( 'Export forms', 'formglut' ), icon: faFileExport, desc: __( 'Download forms (and optionally their entries) as a JSON file to back them up or move them to another site.', 'formglut' ), render: () => <ExportTab /> },
  { key: 'import', title: __( 'Import forms', 'formglut' ), icon: faFileImport, desc: __( 'Restore forms from a FormGlut export file.', 'formglut' ), render: () => <ImportTab /> },
  { key: 'activity', title: __( 'Activity log', 'formglut' ), icon: faClockRotateLeft, desc: __( 'Who changed what: forms, entries, settings and submissions. Click a row for details.', 'formglut' ), render: () => <LogTab type="activity" /> },
  { key: 'api', title: __( 'API log', 'formglut' ), icon: faPlug, desc: __( 'Outgoing requests to Webhooks, Slack, Mailchimp, HubSpot, Stripe and captcha services. Secrets are never stored.', 'formglut' ), render: () => <LogTab type="api" /> },
  { key: 'email', title: __( 'Email log', 'formglut' ), icon: faEnvelope, desc: __( 'Recent emails sent by FormGlut and a test-email sender.', 'formglut' ), render: () => <EmailTab /> },
  { key: 'status', title: __( 'System status', 'formglut' ), icon: faHeartPulse, desc: __( 'Health checks and environment details to include when you ask for support.', 'formglut' ), render: () => <StatusTab /> },
  { key: 'maintenance', title: __( 'Maintenance', 'formglut' ), icon: faBroom, desc: __( 'Clean-up and repair tasks.', 'formglut' ), render: () => <MaintenanceTab /> },
];

export default function Tools() {
  const initial = (window.location.hash || '').replace('#', '');
  const [active, setActive] = useState(TABS.some((t) => t.key === initial) ? initial : 'migration');
  const tab = TABS.find((t) => t.key === active);
  const go = (k) => { setActive(k); window.history.replaceState(null, '', '#' + k); };

  return (
    <div className="fg-fs-page">
      <Header activePage={__( 'Data & Logs', 'formglut' )} />
      <div className="fg-fs-body">
        <div className="fg-fs-top">
          <div className="fg-fs-titlebar">
            <div>
              <div className="fg-page-title">{__( 'Data & Logs', 'formglut' )}</div>
              <div className="fg-page-subtitle">{__( 'Migrate, export, import, review logs and keep FormGlut healthy.', 'formglut' )}</div>
            </div>
          </div>
        </div>
        <div className="fg-fs-layout">
          <nav className="fg-fs-nav">
            {TABS.map((t) => (
              <button key={t.key} type="button" className={t.key === active ? 'active' : ''} onClick={() => go(t.key)}>
                <span className="ic"><FontAwesomeIcon icon={t.icon} /></span><span>{t.title}</span>
              </button>
            ))}
          </nav>
          <section className="fg-fs-card fg-tools-card">
            <div className="fg-fs-card-head">
              <span className="ic"><FontAwesomeIcon icon={tab.icon} /></span>
              <div><h2>{tab.title}</h2><p>{tab.desc}</p></div>
            </div>
            {tab.render()}
          </section>
        </div>
      </div>
    </div>
  );
}
