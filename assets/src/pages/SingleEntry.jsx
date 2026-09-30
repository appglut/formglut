import React, { useState, useEffect, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Space, Tooltip, Popconfirm, message, Skeleton, Result } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPrint, faTrash, faEnvelope, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
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
  const nonInputTypes = [];
  let displayFields = [];
  if (form && form.fields) {
    displayFields = flattenFields(form.fields)
      .filter(f => !nonInputTypes.includes(f.type))
      .map(f => ({
        label: f.admin_label || f.label || f.id,
        value: entry.fields_data && entry.fields_data[f.id] !== undefined
          ? String(entry.fields_data[f.id])
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
                <div className="fg-entry-value">{f.value}</div>
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
      </div>
    </div>
  );
}
