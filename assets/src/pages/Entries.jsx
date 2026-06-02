import React, { useState, useEffect, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { Table, Button, Input, Space, Select, Tooltip, Popconfirm, message, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faEye, faStar as faStarSolid, faMagnifyingGlass, faRotateRight,
  faEnvelopeOpen, faEnvelope, faFileLines,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Header, { _pg } from '../components/Header';
import * as api from '../services/api';

// Configure message placement
message.config({
  duration: 3,
  maxCount: 3,
  top: 24,
  placement: 'top',
});

function extractDisplayFields(fieldsData) {
  if (!fieldsData || typeof fieldsData !== 'object') return { name: '-', email: '-' };
  const values = Object.values(fieldsData);
  const email = values.find(v => typeof v === 'string' && v.includes('@')) || '-';
  const name = values.find(v => typeof v === 'string' && v.length > 0 && !v.includes('@')) || '-';
  return { name, email };
}

function SkeletonLoader() {
  return (
    <div className="fg-content">
      <div className="fg-page-header">
        <div>
          <Skeleton.Input active style={{ width: 180, height: 32 }} />
          <Skeleton.Input active style={{ width: 240, height: 18, marginTop: 8 }} />
        </div>
      </div>
      <div className="fg-filter-tabs">
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton.Input active key={i} size="small" style={{ width: 90, height: 32 }} />
        ))}
      </div>
      <div className="fg-table-wrap">
        <div className="fg-table-toolbar">
          <div className="fg-table-toolbar-left">
            <Skeleton.Input active style={{ width: 200, height: 32 }} />
            <Skeleton.Input active style={{ width: 240, height: 32 }} />
          </div>
        </div>
        <div style={{ padding: '0 20px' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid #fafafa' }}>
              <Skeleton.Input active size="small" style={{ width: 24, height: 16 }} />
              <div style={{ flex: 1 }}>
                <Skeleton.Input active size="small" style={{ width: 160, height: 16 }} />
                <Skeleton.Input active size="small" style={{ width: 130, height: 12, marginTop: 4 }} />
              </div>
              <Skeleton.Input active size="small" style={{ width: 120, height: 16 }} />
              <Skeleton.Input active size="small" style={{ width: 70, height: 24 }} />
              <Skeleton.Input active size="small" style={{ width: 140, height: 16 }} />
              <div style={{ display: 'flex', gap: 4 }}>
                <Skeleton.Avatar active size={28} shape="circle" />
                <Skeleton.Avatar active size={28} shape="circle" />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 20px' }}>
          <Skeleton.Input active size="small" style={{ width: 200, height: 24 }} />
        </div>
      </div>
    </div>
  );
}

const STATUS_TABS = [
  { key: '', label: __( 'All', 'formglut' ), field: 'all' },
  { key: 'unread', label: __( 'Unread', 'formglut' ), field: 'unread' },
  { key: 'read', label: __( 'Read', 'formglut' ), field: 'read' },
  { key: 'starred', label: __( 'Starred', 'formglut' ), field: 'starred' },
  { key: 'spam', label: __( 'Spam', 'formglut' ), field: 'spam' },
  { key: 'trash', label: __( 'Trash', 'formglut' ), field: 'trash' },
];

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formFilter, setFormFilter] = useState('');
  const [orderby, setOrderby] = useState('created_at');
  const [order, setOrder] = useState('DESC');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [forms, setForms] = useState([]);
  const [counts, setCounts] = useState({ all: 0, unread: 0, read: 0, starred: 0, spam: 0, trash: 0 });

  // Read URL params for initial filters.
  useEffect(() => {
    const admin = window.formglut_admin || {};
    if (admin.filter_form_id) {
      setFormFilter(String(admin.filter_form_id));
    }
  }, []);

  const loadCounts = useCallback(async () => {
    try {
      const params = {};
      if (formFilter) params.form_id = formFilter;
      const result = await api.getEntryCounts(params);
      setCounts(result.counts || {});
    } catch (_) {}
  }, [formFilter]);

  const loadForms = useCallback(async () => {
    try {
      const result = await api.getForms({ per_page: 100 });
      setForms(result.forms || []);
    } catch (_) {}
  }, []);

  const loadEntries = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: perPage,
        search: searchText,
        orderby,
        order,
      };
      if (formFilter) params.form_id = formFilter;
      if (statusFilter === 'starred') {
        params.starred = 1;
      } else if (statusFilter) {
        params.status = statusFilter;
      }
      const result = await api.getEntries(params);
      setEntries(result.entries || []);
      setTotal(result.total || 0);
    } catch (err) {
      message.error(err.message || __( 'Failed to load entries.', 'formglut' ));
    } finally {
      setLoading(false);
    }
  }, [page, perPage, searchText, orderby, order, formFilter, statusFilter]);

  useEffect(() => {
    loadForms();
  }, [loadForms]);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadEntries();
    }, 300);
    return () => clearTimeout(timer);
  }, [loadEntries]);

  // Debounced search.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  async function handleDelete(id) {
    try {
      await api.deleteEntry(id);
      message.success(__( 'Entry deleted.', 'formglut' ));
      loadEntries();
      loadCounts();
    } catch (err) {
      message.error(err.message || __( 'Failed to delete entry.', 'formglut' ));
    }
  }

  async function handleToggleStar(id, currentStarred) {
    try {
      await api.toggleEntryStar(id);
      message.success(currentStarred ? __( 'Star removed.', 'formglut' ) : __( 'Entry starred.', 'formglut' ));
      loadEntries();
      loadCounts();
    } catch (err) {
      message.error(err.message || __( 'Failed to toggle star.', 'formglut' ));
    }
  }

  async function handleMarkStatus(id, status) {
    try {
      await api.updateEntryStatus(id, status);
      message.success(__( 'Status updated.', 'formglut' ));
      loadEntries();
      loadCounts();
    } catch (err) {
      message.error(err.message || __( 'Failed to update status.', 'formglut' ));
    }
  }

  async function handleBulkDelete() {
    if (!selectedRowKeys.length) return;
    try {
      await Promise.all(selectedRowKeys.map(id => api.deleteEntry(id)));
      message.success(__( '%s entry(s) deleted.', 'formglut' ).replace( '%s', selectedRowKeys.length ));
      setSelectedRowKeys([]);
      loadEntries();
      loadCounts();
    } catch (err) {
      message.error(__( 'Failed to delete some entries.', 'formglut' ));
    }
  }

  async function handleBulkStatus(status) {
    if (!selectedRowKeys.length) return;
    try {
      await Promise.all(selectedRowKeys.map(id => api.updateEntryStatus(id, status)));
      message.success(__( '%s entry(s) updated.', 'formglut' ).replace( '%s', selectedRowKeys.length ));
      setSelectedRowKeys([]);
      loadEntries();
      loadCounts();
    } catch (err) {
      message.error(__( 'Failed to update some entries.', 'formglut' ));
    }
  }

  const columns = [
    {
      title: __( 'Name', 'formglut' ),
      dataIndex: 'fields_data',
      render: (fieldsData, r) => {
        const display = extractDisplayFields(fieldsData);
        return (
          <div>
            <div>
              <a
                href={_pg.entry_detail + '&entry_id=' + r.id}
                style={{ fontWeight: r.status === 'unread' ? 700 : 600, color: '#1a1a2e' }}
              >
                {display.name}
              </a>
              {r.starred ? (
                <FontAwesomeIcon icon={faStarSolid} style={{ color: '#f59e0b', fontSize: 12, marginLeft: 6 }} />
              ) : null}
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{display.email}</div>
            <div className="fg-row-actions">
              <a href={_pg.entry_detail + '&entry_id=' + r.id}>{__( 'View', 'formglut' )}</a>
              <span className="fg-action-sep">|</span>
              <a onClick={() => handleMarkStatus(r.id, r.status === 'read' ? 'unread' : 'read')}>
                {r.status === 'read' ? __( 'Mark Unread', 'formglut' ) : __( 'Mark Read', 'formglut' )}
              </a>
              <span className="fg-action-sep">|</span>
              <Popconfirm
                title={__( 'Delete this entry?', 'formglut' )}
                okText={__( 'Delete', 'formglut' )}
                cancelText={__( 'Cancel', 'formglut' )}
                okButtonProps={{ danger: true }}
                onConfirm={() => handleDelete(r.id)}
              >
                <a className="fg-action-delete">{__( 'Delete', 'formglut' )}</a>
              </Popconfirm>
            </div>
          </div>
        );
      },
    },
    {
      title: __( 'Form', 'formglut' ),
      dataIndex: 'form_title',
      width: 180,
      render: (v) => <span style={{ fontSize: 13, color: '#64748b' }}>{v || '-'}</span>,
    },
    {
      title: __( 'Status', 'formglut' ),
      dataIndex: 'status',
      width: 110,
      render: (v) => {
        const labels = { unread: __( 'Unread', 'formglut' ), read: __( 'Read', 'formglut' ), spam: __( 'Spam', 'formglut' ), trash: __( 'Trash', 'formglut' ) };
        return <span className={'fg-status-badge ' + v}>{labels[v] || v}</span>;
      },
    },
    {
      title: __( 'Date', 'formglut' ),
      dataIndex: 'created_at',
      width: 180,
      sorter: true,
      render: (v) => <span style={{ fontSize: 13, color: '#64748b' }}>{v}</span>,
    },
    {
      title: __( 'Action', 'formglut' ),
      dataIndex: 'action',
      width: 140,
      align: 'center',
      render: (_, r) => (
        <Space size={4}>
          <Tooltip title={__( 'View entry', 'formglut' )}>
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faEye} />}
              style={{ color: '#64748b' }}
              href={_pg.entry_detail + '&entry_id=' + r.id}
            />
          </Tooltip>
          <Tooltip title={r.starred ? __( 'Unstar', 'formglut' ) : __( 'Star', 'formglut' )}>
            <Button
              type="text"
              icon={r.starred ? <FontAwesomeIcon icon={faStarSolid} style={{ color: '#f59e0b' }} /> : <FontAwesomeIcon icon={faStarRegular} />}
              onClick={() => handleToggleStar(r.id, r.starred)}
            />
          </Tooltip>
          <Tooltip title={r.status === 'read' ? __( 'Mark unread', 'formglut' ) : __( 'Mark read', 'formglut' )}>
            <Button
              type="text"
              icon={r.status === 'read' ? <FontAwesomeIcon icon={faEnvelope} /> : <FontAwesomeIcon icon={faEnvelopeOpen} />}
              style={{ color: '#64748b' }}
              onClick={() => handleMarkStatus(r.id, r.status === 'read' ? 'unread' : 'read')}
            />
          </Tooltip>
          <Popconfirm
            title={__( 'Delete this entry?', 'formglut' )}
            okText={__( 'Confirm', 'formglut' )}
            cancelText={__( 'Cancel', 'formglut' )}
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(r.id)}
          >
            <Tooltip title={__( 'Delete entry', 'formglut' )}>
              <Button type="text" icon={<FontAwesomeIcon icon={faTrash} />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Header activePage="Entries" />
      {loading && entries.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <div className="fg-content">
          <div className="fg-page-header">
            <div>
              <div className="fg-page-title">{__( 'Entries', 'formglut' )}</div>
              <div className="fg-page-subtitle">{__( 'View all form submissions', 'formglut' )}</div>
            </div>
          </div>

          <div className="fg-filter-tabs">
            {STATUS_TABS.map(tab => (
              <button
                key={tab.key}
                className={'fg-filter-tab' + (statusFilter === tab.key ? ' active' : '')}
                onClick={() => { setStatusFilter(tab.key); setPage(1); }}
              >
                {tab.label} <span className="fg-filter-count">{counts[tab.field] || 0}</span>
              </button>
            ))}
          </div>

          <div className="fg-table-wrap">
            {selectedRowKeys.length > 0 && (
              <div className="fg-bulk-bar">
                <span>{selectedRowKeys.length} {__( 'selected', 'formglut' )}</span>
                <Button size="small" onClick={() => handleBulkStatus('read')}>{__( 'Mark Read', 'formglut' )}</Button>
                <Button size="small" onClick={() => handleBulkStatus('unread')}>{__( 'Mark Unread', 'formglut' )}</Button>
                <Button size="small" onClick={() => handleBulkStatus('spam')}>{__( 'Mark Spam', 'formglut' )}</Button>
                <Popconfirm
                  title={__( 'Delete %s entry(s)?', 'formglut' ).replace( '%s', selectedRowKeys.length )}
                  okText={__( 'Delete', 'formglut' )}
                  cancelText={__( 'Cancel', 'formglut' )}
                  okButtonProps={{ danger: true }}
                  onConfirm={handleBulkDelete}
                >
                  <Button size="small" danger>{__( 'Delete', 'formglut' )}</Button>
                </Popconfirm>
                <Button size="small" type="text" onClick={() => setSelectedRowKeys([])}>{__( 'Clear', 'formglut' )}</Button>
              </div>
            )}
            <div className="fg-table-toolbar">
              <div className="fg-table-toolbar-left">
                <Select
                  placeholder={__( 'All Forms', 'formglut' )}
                  style={{ width: 200 }}
                  allowClear
                  value={formFilter || undefined}
                  onChange={(v) => { setFormFilter(v ? String(v) : ''); setPage(1); }}
                >
                  {forms.map(f => (
                    <Select.Option key={f.id} value={String(f.id)}>{f.title}</Select.Option>
                  ))}
                </Select>
                <Input
                  placeholder={__( 'Search entries...', 'formglut' )}
                  prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                  style={{ width: 240 }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  allowClear
                />
              </div>
              <div className="fg-table-toolbar-right">
                <Tooltip title={__( 'Refresh', 'formglut' )}>
                  <Button
                    type="text"
                    icon={<FontAwesomeIcon icon={faRotateRight} spin={loading} style={{ color: '#64748b' }} />}
                    onClick={loadEntries}
                  />
                </Tooltip>
              </div>
            </div>
            <Table
              dataSource={entries}
              columns={columns}
              rowKey="id"
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
              scroll={{ x: 'max-content' }}
              loading={loading && entries.length > 0}
              onChange={(_pag, _filters, sorter) => {
                if (sorter.field) {
                  setOrderby(sorter.field);
                  setOrder(sorter.order === 'ascend' ? 'ASC' : 'DESC');
                } else {
                  setOrderby('created_at');
                  setOrder('DESC');
                }
              }}
              pagination={{
                current: page,
                pageSize: perPage,
                total,
                showSizeChanger: true,
                showTotal: (t) => `${t} ${__( 'entries total', 'formglut' )}`,
                onChange: (p, ps) => { setPage(p); setPerPage(ps); },
              }}
              locale={{
                emptyText: !searchText && !formFilter ? (
                  <div className="fg-empty-state">
                    <div className="fg-empty-icon"><FontAwesomeIcon icon={faFileLines} /></div>
                    <div className="fg-empty-title">{__( 'No entries yet', 'formglut' )}</div>
                    <div className="fg-empty-desc">{__( 'Entries will appear here when people submit your forms.', 'formglut' )}</div>
                  </div>
                ) : __( 'No entries match your filters.', 'formglut' ),
              }}
              style={{ padding: '0 8px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
