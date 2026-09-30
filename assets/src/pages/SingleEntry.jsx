import React, { useState, useEffect, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Space, Tooltip, Popconfirm, message, Skeleton, Result, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPrint, faTrash, faEnvelope, faStar as faStarSolid, faPaperPlane, faNoteSticky, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Header, { _pg } from '../components/Header';
import * as api from '../services/api';
import { flattenFields } from '../fields/fieldTypes.jsx';

// Configure message placement
message.config({
  duration: 3,
  maxCount: 3,
  top: 24,
  placement: 'top',
});

function DetailSkeleton() {
  return (
    <div className="fg-content">
      <Skeleton.Input active style={{ width: 140, height: 18 }} />
      <div className="fg-page-header">
        <div>
          <Skeleton.Input active style={{ width: 180, height: 32 }} />
          <Skeleton.Input active style={{ width: 120, height: 22, marginTop: 4 }} />
        </div>
        <Space>
          <Skeleton.Avatar active size={32} shape="circle" />
          <Skeleton.Avatar active size={32} shape="circle" />
          <Skeleton.Avatar active size={32} shape="circle" />
          <Skeleton.Avatar active size={32} shape="circle" />
        </Space>
      </div>
      <div className="fg-entry-card">
        <div className="fg-entry-card-header">
          <Skeleton.Input active style={{ width: 140, height: 20 }} />
        </div>
        <div style={{ padding: '0 20px' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
              <Skeleton.Input active size="small" style={{ width: 140, height: 16 }} />
              <Skeleton.Input active size="small" style={{ width: 260, height: 16 }} />
            </div>
          ))}
        </div>
      </div>
      <div className="fg-entry-card">
        <div className="fg-entry-card-header">
          <Skeleton.Input active style={{ width: 120, height: 20 }} />
        </div>
        <div className="fg-meta-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="fg-meta-item">
              <Skeleton.Input active size="small" style={{ width: 80, height: 12 }} />
              <Skeleton.Input active size="small" style={{ width: 120, height: 16, marginTop: 4 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SingleEntry() {
  const [entry, setEntry] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const entryId = (window.formglut_admin || {}).entry_id;

  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleAddNote() {
    setSavingNote(true);
    try {
      const res = await api.saveEntryNote(entry.id, noteText);
      setEntry((e) => ({ ...e, notes: res.notes }));
      setNoteText('');
    } catch (err) { message.error(err.message || __( 'Could not save the note.', 'formglut' )); } finally { setSavingNote(false); }
  }

  async function handleDeleteNote(noteId) {
    try {
      const res = await api.deleteEntryNote(entry.id, noteId);
      setEntry((e) => ({ ...e, notes: res.notes }));
    } catch (err) { message.error(err.message || __( 'Could not delete the note.', 'formglut' )); }
  }

  async function handleResend() {
    setResending(true);
    try {
      const res = await api.resendNotification(entry.id);
      message.success(res.message || __( 'Notification sent.', 'formglut' ));
    } catch (err) { message.error(err.message || __( 'Could not send the notification.', 'formglut' )); } finally { setResending(false); }
  }

  const loadEntry = useCallback(async () => {
    if (!entryId) {
      setError(__( 'Missing entry ID.', 'formglut' ));
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const result = await api.getEntry(entryId);
      const e = result.entry;
      setEntry(e);
      // Load form to get field labels.
      if (e.form_id) {
        try {
          const formResult = await api.getForm(e.form_id);
          setForm(formResult.form);
        } catch (_) {}
      }
    } catch (err) {
      setError(err.message || __( 'Failed to load entry.', 'formglut' ));
    } finally {
      setLoading(false);
    }
  }, [entryId]);

  useEffect(() => {
    loadEntry();
  }, [loadEntry]);

  // Auto-mark unread entries as read.
  useEffect(() => {
    if (entry && entry.status === 'unread') {
      const timer = setTimeout(async () => {
        try {
          await api.updateEntryStatus(entry.id, 'read');
          setEntry(prev => (prev ? { ...prev, status: 'read' } : prev));
        } catch (_) {}
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [entry?.id, entry?.status]);

  async function handleToggleStar() {
    if (!entry) return;
    try {
      await api.toggleEntryStar(entry.id);
      setEntry(prev => (prev ? { ...prev, starred: prev.starred ? 0 : 1 } : prev));
    } catch (err) {
      message.error(err.message || __( 'Failed to toggle star.', 'formglut' ));
    }
  }

  async function handleDelete() {
    if (!entry) return;
    try {
      await api.deleteEntry(entry.id);
      message.success(__( 'Entry deleted.', 'formglut' ));
      window.location.href = _pg.entries;
    } catch (err) {
      message.error(err.message || __( 'Failed to delete entry.', 'formglut' ));
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleReply() {
    if (!entry || !entry.fields_data) return;
    const emailField = Object.values(entry.fields_data).find(
      v => typeof v === 'string' && v.includes('@')
    );
    if (emailField) {
      window.location.href = 'mailto:' + emailField;
    } else {
      message.warning(__( 'No email address found in this entry.', 'formglut' ));
    }
  }

  if (loading) {
    return (
      <div>
        <Header activePage={__( 'Entries', 'formglut' )} />
        <DetailSkeleton />
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div>
        <Header activePage={__( 'Entries', 'formglut' )} />
        <div className="fg-content">
          <Result
            status="404"
            title={__( 'Entry Not Found', 'formglut' )}
            subTitle={error || __( 'This entry may have been deleted.', 'formglut' )}
            extra={<Button type="primary" href={_pg.entries} style={{ background: '#e94560', borderColor: '#e94560' }}>{__( 'Back to Entries', 'formglut' )}</Button>}
          />
        </div>
      </div>
    );
  }

  // Build display fields from form field definitions + entry data.
  const nonInputTypes = ['html', 'heading', 'section_break', 'shortcode', 'action_hook', 'custom_submit_button', 'recaptcha', 'hcaptcha', 'turnstile', 'form_step'];
  let displayFields = [];
  if (form && form.fields) {
    displayFields = flattenFields(form.fields)
      .filter(f => !nonInputTypes.includes(f.type))
      .map(f => ({
        label: f.admin_label || f.label || f.id,
        raw: entry.fields_data ? entry.fields_data[f.id] : undefined,
        type: f.type,
        value: entry.fields_data && entry.fields_data[f.id] !== undefined && entry.fields_data[f.id] !== ''
          ? (Array.isArray(entry.fields_data[f.id]) ? entry.fields_data[f.id].join(', ') : String(entry.fields_data[f.id]))
          : '-',
      }));
  } else {
    // Fallback: show raw fields_data keys.
    if (entry.fields_data && typeof entry.fields_data === 'object') {
      displayFields = Object.entries(entry.fields_data).map(([key, val]) => ({
        label: key,
        value: String(val),
      }));
    }
  }

  const statusLabels = { unread: __( 'Unread', 'formglut' ), read: __( 'Read', 'formglut' ), spam: __( 'Spam', 'formglut' ), trash: __( 'Trash', 'formglut' ) };

  return (
    <div>
      <Header activePage={__( 'Entries', 'formglut' )} />
      <div className="fg-content">
        <a className="fg-back-link" href={_pg.entries}>
          <FontAwesomeIcon icon={faArrowLeft} /> {__( 'Back to Entries', 'formglut' )}
        </a>

        <div className="fg-page-header">
          <div>
            <div className="fg-page-title-row">
              <div className="fg-page-title">{__( 'Entry', 'formglut' )} #{entry.id}</div>
              <span className={'fg-status-badge ' + entry.status}>
                {statusLabels[entry.status] || entry.status}
              </span>
            </div>
          </div>
          <Space size={8}>
            <Tooltip title={entry.starred ? __( 'Unstar', 'formglut' ) : __( 'Star', 'formglut' )}>
              <Button
                type="text"
                icon={entry.starred ? <FontAwesomeIcon icon={faStarSolid} style={{ color: '#f59e0b' }} /> : <FontAwesomeIcon icon={faStarRegular} />}
                onClick={handleToggleStar}
              />
            </Tooltip>
            <Tooltip title={__( 'Print', 'formglut' )}>
              <Button type="text" icon={<FontAwesomeIcon icon={faPrint} />} style={{ color: '#64748b' }} onClick={handlePrint} />
            </Tooltip>
            <Tooltip title={__( 'Send the notification email for this entry again', 'formglut' )}>
              <Button type="text" icon={<FontAwesomeIcon icon={faPaperPlane} />} style={{ color: '#64748b' }} loading={resending} onClick={handleResend} />
            </Tooltip>
            <Tooltip title={__( 'Reply by email', 'formglut' )}>
              <Button type="text" icon={<FontAwesomeIcon icon={faEnvelope} />} style={{ color: '#64748b' }} onClick={handleReply} />
            </Tooltip>
            <Popconfirm
              title={__( 'Delete this entry?', 'formglut' )}
              okText={__( 'Confirm', 'formglut' )}
              cancelText={__( 'Cancel', 'formglut' )}
              okButtonProps={{ danger: true }}
              onConfirm={handleDelete}
            >
              <Button type="text" icon={<FontAwesomeIcon icon={faTrash} />} danger />
            </Popconfirm>
          </Space>
        </div>

        <div className="fg-page-subtitle" style={{ marginTop: -20, marginBottom: 24 }}>
          {__( 'Submitted via', 'formglut' )} <strong>{entry.form_title || __( 'Unknown Form', 'formglut' )}</strong> {__( 'on', 'formglut' )} {entry.created_at}
        </div>

        <div className="fg-entry-card">
          <div className="fg-entry-card-header">
            <div className="fg-entry-card-title">{__( 'Submission Data', 'formglut' )}</div>
          </div>
          <div className="fg-entry-card-body">
            {displayFields.map((f, i) => (
              <div className="fg-entry-row" key={i}>
                <div className="fg-entry-label">{f.label}</div>
                <div className="fg-entry-value">
                  {f.type === 'file_upload' && Array.isArray(f.raw) && f.raw.length ? (
                    <div className="fg-entry-files">
                      {f.raw.map((url) => (
                        <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faPaperclip} /> {decodeURIComponent(url.split('/').pop()).replace(/^[A-Za-z0-9]{12}-/, '')}
                        </a>
                      ))}
                    </div>
                  ) : f.value}
                </div>
              </div>
            ))}
            {displayFields.length === 0 && (
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#94a3b8' }}>{__( 'No submission data.', 'formglut' )}</div>
            )}
          </div>
        </div>

        <div className="fg-entry-card">
          <div className="fg-entry-card-header">
            <div className="fg-entry-card-title">{__( 'Entry Metadata', 'formglut' )}</div>
          </div>
          <div className="fg-meta-grid">
            <div className="fg-meta-item">
              <div className="fg-meta-item-label">{__( 'IP Address', 'formglut' )}</div>
              <div className="fg-meta-item-value">{entry.ip_address || '-'}</div>
            </div>
            <div className="fg-meta-item">
              <div className="fg-meta-item-label">{__( 'Browser / OS', 'formglut' )}</div>
              <div className="fg-meta-item-value">{entry.browser || '-'}</div>
            </div>
            <div className="fg-meta-item">
              <div className="fg-meta-item-label">{__( 'Source URL', 'formglut' )}</div>
              <div className="fg-meta-item-value">{entry.source_url || '-'}</div>
            </div>
            <div className="fg-meta-item">
              <div className="fg-meta-item-label">{__( 'Country', 'formglut' )}</div>
              <div className="fg-meta-item-value">{entry.country || '-'}</div>
            </div>
            <div className="fg-meta-item">
              <div className="fg-meta-item-label">{__( 'Submitted', 'formglut' )}</div>
              <div className="fg-meta-item-value">{entry.created_at}</div>
            </div>
            <div className="fg-meta-item">
              <div className="fg-meta-item-label">{__( 'Form', 'formglut' )}</div>
              <div className="fg-meta-item-value">{entry.form_title || '-'}</div>
            </div>
          </div>
        </div>

        {entry.fields_data && entry.fields_data._payment && (
          <div className="fg-entry-card">
            <div className="fg-entry-card-header">
              <div className="fg-entry-card-title">{__( 'Payment', 'formglut' )}</div>
            </div>
            <div className="fg-meta-grid">
              <div className="fg-meta-item"><div className="fg-meta-item-label">{__( 'Amount', 'formglut' )}</div><div className="fg-meta-item-value">{Number(entry.fields_data._payment.amount).toFixed(2)} {entry.fields_data._payment.currency}</div></div>
              <div className="fg-meta-item"><div className="fg-meta-item-label">{__( 'Status', 'formglut' )}</div><div className="fg-meta-item-value">{entry.fields_data._payment.status === 'succeeded' ? __( 'Paid', 'formglut' ) : entry.fields_data._payment.status}{entry.fields_data._payment.mode === 'test' ? ' · ' + __( 'test mode', 'formglut' ) : ''}</div></div>
              <div className="fg-meta-item"><div className="fg-meta-item-label">{__( 'Stripe payment', 'formglut' )}</div><div className="fg-meta-item-value"><a href={`https://dashboard.stripe.com/${entry.fields_data._payment.mode === 'test' ? 'test/' : ''}payments/${entry.fields_data._payment.id}`} target="_blank" rel="noopener noreferrer">{entry.fields_data._payment.id}</a></div></div>
            </div>
          </div>
        )}

        <div className="fg-entry-card fg-notes-card">
          <div className="fg-entry-card-header">
            <div className="fg-entry-card-title"><FontAwesomeIcon icon={faNoteSticky} style={{ marginRight: 8, color: '#94a3b8' }} />{__( 'Notes', 'formglut' )} <span className="fg-notes-hint">{__( 'Private, only visible to admins', 'formglut' )}</span></div>
          </div>
          <div className="fg-entry-card-body">
            {(entry.notes || []).map((n) => (
              <div className="fg-note" key={n.id}>
                <div className="fg-note-head">
                  <strong>{n.author}</strong> <span>{n.date}</span>
                  <Popconfirm title={__( 'Delete this note?', 'formglut' )} okText={__( 'Delete', 'formglut' )} cancelText={__( 'Cancel', 'formglut' )} okButtonProps={{ danger: true }} onConfirm={() => handleDeleteNote(n.id)}>
                    <button type="button" className="fg-note-del" aria-label={__( 'Delete note', 'formglut' )}><FontAwesomeIcon icon={faTrash} /></button>
                  </Popconfirm>
                </div>
                <div className="fg-note-text">{n.text}</div>
              </div>
            ))}
            <div className="fg-note-new">
              <Input.TextArea rows={3} value={noteText} placeholder={__( 'Add a note about this entry…', 'formglut' )} onChange={(e) => setNoteText(e.target.value)} />
              <Button type="primary" disabled={!noteText.trim()} loading={savingNote} onClick={handleAddNote} style={{ marginTop: 8, background: noteText.trim() ? '#e94560' : undefined, borderColor: noteText.trim() ? '#e94560' : undefined }}>{__( 'Add note', 'formglut' )}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
