import React, { useState, useEffect, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { Table, Button, Input, Space, Tooltip, Switch, Popconfirm, message, Modal, Row, Col, Skeleton, Card, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faMagnifyingGlass, faCopy, faPenToSquare, faTrash,
  faFileLines, faStar, faRotateRight, faGear, faEye, faCalendarDays
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck as faBulkActive, faPenToSquare as faBulkDraft, faTrashCan as faBulkTrash, faXmark as faBulkClear } from '@fortawesome/free-solid-svg-icons';
import Header, { _pg } from '../components/Header';
import * as api from '../services/api';

// Configure message placement
message.config({
  duration: 3,
  maxCount: 3,
  top: 24,
  placement: 'top',
});

function CreateFormModal({ open, onClose }) {
  const [creating, setCreating] = useState(false);

  async function handleCreate() {
    setCreating(true);
    try {
      const result = await api.createForm({
        title: __( 'Untitled Form', 'formglut' ),
        fields: [],
        submit_btn: {},
        status: 'draft',
      });
      onClose();
      window.location.href = _pg.editor + '&form_id=' + result.form_id;
    } catch (err) {
      message.error(err.message || __( 'Failed to create form.', 'formglut' ));
    } finally {
      setCreating(false);
    }
  }

  return (
    <Modal
      title={<span style={{ fontSize: 18, fontWeight: 700 }}>{__( 'Create A New Form', 'formglut' )}</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width="64%"
      centered
    >
      <Row gutter={24} style={{ marginTop: 24, marginBottom: 16 }}>
        <Col span={8}>
          <div className="fg-create-card" onClick={creating ? undefined : handleCreate} style={creating ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
            <div className="fg-create-card-icon"><FontAwesomeIcon icon={faPlus} /></div>
            <div className="fg-create-card-title">{__( 'New Blank Form', 'formglut' )}</div>
            <div className="fg-create-card-desc">{__( 'Create a new blank form from scratch.', 'formglut' )}</div>
          </div>
        </Col>
        <Col span={8}>
          <div className="fg-create-card" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            <div className="fg-create-card-icon"><FontAwesomeIcon icon={faFileLines} /></div>
            <div className="fg-create-card-title">{__( 'Choose a Template', 'formglut' )}</div>
            <div className="fg-create-card-desc">{__( 'Choose a pre-made form template and customize it.', 'formglut' )}</div>
          </div>
        </Col>
        <Col span={8}>
          <div className="fg-create-card" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            <div className="fg-create-card-icon"><FontAwesomeIcon icon={faStar} /></div>
            <div className="fg-create-card-title">{__( 'Create Conversational Form', 'formglut' )}</div>
            <div className="fg-create-card-desc">{__( 'Turn your content, surveys into conversations.', 'formglut' )}</div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

function SkeletonLoader() {
  return (
    <>
      {/* Header skeleton */}
      <header className="fg-header">
        <div className="fg-header-left">
          <Skeleton.Button active style={{ width: 80, height: 36 }} />
          <Skeleton.Input active style={{ width: 120, height: 36, marginLeft: 16 }} />
        </div>
        <nav className="fg-header-nav">
          {[1, 2, 3].map((i) => (
            <Skeleton.Button key={i} active style={{ width: 70, height: 32, margin: '0 4px' }} />
          ))}
        </nav>
      </header>
      <div className="fg-content">
        <div className="fg-page-header">
          <div>
            <Skeleton.Input active style={{ width: 180, height: 32 }} />
            <Skeleton.Input active style={{ width: 240, height: 18, marginTop: 8 }} />
          </div>
          <Space>
            <Skeleton.Button active style={{ width: 150 }} />
          </Space>
        </div>

      <div className="fg-stats-row">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="fg-stat-card">
            <Skeleton.Input active size="small" style={{ width: 90, height: 16 }} />
            <Skeleton.Input active style={{ width: 60, height: 32, marginTop: 8 }} />
            <Skeleton.Input active size="small" style={{ width: 120, height: 14, marginTop: 6 }} />
          </div>
        ))}
      </div>

      <div className="fg-table-wrap">
        <div className="fg-table-toolbar">
          <div className="fg-table-toolbar-left">
            <Skeleton.Input active style={{ width: 240, height: 32 }} />
          </div>
        </div>
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
            <Skeleton.Input active size="small" style={{ width: 24, height: 16 }} />
            <Skeleton.Input active size="small" style={{ width: 200, height: 16 }} />
            <Skeleton.Input active size="small" style={{ width: 120, height: 16 }} />
            <Skeleton.Input active size="small" style={{ width: 60, height: 16 }} />
            <Skeleton.Input active size="small" style={{ width: 80, height: 16 }} />
            <Skeleton.Input active size="small" style={{ width: 80, height: 16 }} />
            <Skeleton.Input active size="small" style={{ width: 60, height: 16 }} />
          </div>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid #fafafa' }}>
              <Skeleton.Input active size="small" style={{ width: 24, height: 16 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <Skeleton.Avatar active shape="square" size={36} />
                <div>
                  <Skeleton.Input active size="small" style={{ width: 160, height: 16 }} />
                  <Skeleton.Input active size="small" style={{ width: 130, height: 12, marginTop: 4 }} />
                </div>
              </div>
              <Skeleton.Input active size="small" style={{ width: 130, height: 24 }} />
              <Skeleton.Input active size="small" style={{ width: 40, height: 16 }} />
              <Skeleton.Input active size="small" style={{ width: 50, height: 16 }} />
              <Skeleton.Input active size="small" style={{ width: 40, height: 16 }} />
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
    </>
  );
}

export default function AllForms() {
  const [forms, setForms] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [orderby, setOrderby] = useState('created_at');
  const [order, setOrder] = useState('DESC');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [datePreset, setDatePreset] = useState('');
  const [customRange, setCustomRange] = useState(null);

  // Resolve the date filter to a [from, to] pair of YYYY-MM-DD strings.
  const dateRange = (() => {
    const fmt = (d) => d.format('YYYY-MM-DD');
    const today = dayjs();
    switch (datePreset) {
      case 'today': return [fmt(today), fmt(today)];
      case 'last_week': return [fmt(today.subtract(6, 'day')), fmt(today)];
      case 'this_month': return [fmt(today.startOf('month')), fmt(today)];
      case 'custom': return customRange && customRange[0] && customRange[1] ? [fmt(customRange[0]), fmt(customRange[1])] : ['', ''];
      default: return ['', ''];
    }
  })();
  const [dateFrom, dateTo] = dateRange;

  // Stats from dedicated endpoint.
  const [stats, setStats] = useState({
    totalForms: 0, totalEntries: 0, activeForms: 0, draftForms: 0, closedForms: 0,
  });

  const loadStats = useCallback(async () => {
    try {
      const s = await api.getFormStats();
      setStats({
        totalForms: s.total_forms || 0,
        totalEntries: s.total_entries || 0,
        activeForms: s.active_forms || 0,
        draftForms: s.draft_forms || 0,
        closedForms: s.closed_forms || 0,
      });
    } catch (_) { /* silent */ }
  }, []);

  const loadForms = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getForms({
        page,
        per_page: perPage,
        search: searchText,
        orderby,
        order,
        status: statusFilter,
        date_from: dateFrom,
        date_to: dateTo,
      });
      setForms(result.forms || []);
      setTotal(result.total || 0);
    } catch (err) {
      message.error(err.message || __( 'Failed to load forms.', 'formglut' ));
    } finally {
      setLoading(false);
    }
  }, [page, perPage, searchText, orderby, order, statusFilter, dateFrom, dateTo]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadForms();
    }, 300);
    return () => clearTimeout(timer);
  }, [loadForms]);

  // Debounced search.
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  async function handleDelete(id) {
    try {
      await api.deleteForm(id);
      message.success(__( 'Form deleted.', 'formglut' ));
      loadForms();
    } catch (err) {
      message.error(err.message || __( 'Failed to delete form.', 'formglut' ));
    }
  }

  async function handleDuplicate(id) {
    try {
      await api.duplicateForm(id);
      message.success(__( 'Form duplicated.', 'formglut' ));
      loadForms();
    } catch (err) {
      message.error(err.message || __( 'Failed to duplicate form.', 'formglut' ));
    }
  }

  async function handleStatusChange(id, checked) {
    const status = checked ? 'active' : 'draft';
    try {
      await api.updateFormStatus(id, status);
      message.success(checked ? __( 'Form activated.', 'formglut' ) : __( 'Form set to draft.', 'formglut' ));
      loadForms();
    } catch (err) {
      message.error(err.message || __( 'Failed to update status.', 'formglut' ));
    }
  }

  async function handleBulkDelete() {
    if (!selectedRowKeys.length) return;
    try {
      await Promise.all(selectedRowKeys.map(id => api.deleteForm(id)));
      message.success(__( '%s form(s) deleted.', 'formglut' ).replace( '%s', selectedRowKeys.length ));
      setSelectedRowKeys([]);
      loadForms();
    } catch (err) {
      message.error(__( 'Failed to delete some forms.', 'formglut' ));
    }
  }

  async function handleBulkStatus(status) {
    if (!selectedRowKeys.length) return;
    try {
      await Promise.all(selectedRowKeys.map(id => api.updateFormStatus(id, status)));
      message.success(__( '%s form(s) updated.', 'formglut' ).replace( '%s', selectedRowKeys.length ));
      setSelectedRowKeys([]);
      loadForms();
    } catch (err) {
      message.error(__( 'Failed to update some forms.', 'formglut' ));
    }
  }

  const columns = [
    {
      title: __( 'ID', 'formglut' ),
      dataIndex: 'id',
      width: 70,
      sorter: true,
      render: (v) => <span style={{ fontWeight: 600, color: '#64748b' }}>#{v}</span>,
    },
    {
      title: __( 'Form Name', 'formglut' ),
      dataIndex: 'title',
      width: 380,
      render: (text, r) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                <a href={_pg.editor + '&form_id=' + r.id} style={{ color: '#1a1a2e' }}>{text}</a>
                <span className={'fg-status-dot ' + (r.status === 'active' || r.status === 'published' ? 'active' : r.status === 'closed' ? 'closed' : 'draft')} />
                <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: 12 }}>{r.status === 'published' ? __( 'Active', 'formglut' ) : r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
              </div>
              <div style={{ fontSize: 11, color: '#b0b8c4', marginTop: 1 }}>{r.created}</div>
            </div>
          </div>
          <div className="fg-row-actions">
            <a href={_pg.editor + '&form_id=' + r.id}><FontAwesomeIcon icon={faPenToSquare} /> {__( 'Edit', 'formglut' )}</a>
            <span className="fg-action-sep">|</span>
            <a href={_pg.settings}><FontAwesomeIcon icon={faGear} /> {__( 'Global Settings', 'formglut' )}</a>
            <span className="fg-action-sep">|</span>
            <a href={_pg.preview + '&form_id=' + r.id} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faEye} /> {__( 'Preview', 'formglut' )}</a>
            <span className="fg-action-sep">|</span>
            <Switch
              size="small"
              checked={r.status === 'active' || r.status === 'published'}
              checkedChildren={__( 'Active', 'formglut' )}
              unCheckedChildren={__( 'Draft', 'formglut' )}
              onChange={(checked) => handleStatusChange(r.id, checked)}
            />
          </div>
        </div>
      ),
    },
    {
      title: __( 'Shortcode', 'formglut' ),
      dataIndex: 'shortcode',
      width: 260,
      render: (v) => <span className="fg-shortcode" onClick={() => { const ta = document.createElement('textarea'); ta.value = v; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); message.success(__( 'Copied!', 'formglut' )); }}>{v}</span>,
    },
    {
      title: __( 'Views', 'formglut' ),
      dataIndex: 'views',
      width: 100,
      sorter: true,
      render: (v) => <span style={{ fontWeight: 600, color: '#1a1a2e' }}>{(v || 0).toLocaleString()}</span>,
    },
    {
      title: __( 'Entries', 'formglut' ),
      dataIndex: 'entries',
      width: 100,
      sorter: true,
      render: (v, r) => (
        <div>
          <a href={_pg.entries + '&form_id=' + r.id} style={{ fontWeight: 600, color: '#1a1a2e' }}>{(v || 0).toLocaleString()}</a>
        </div>
      ),
    },
    {
      title: __( 'Conversion', 'formglut' ),
      dataIndex: 'conversion',
      width: 100,
      sorter: true,
      render: (v) => <span style={{ fontWeight: 600, color: v > 60 ? '#10b981' : v > 30 ? '#f59e0b' : '#ef4444' }}>{v}%</span>,
    },
    {
      title: __( 'Action', 'formglut' ),
      dataIndex: 'action',
      width: 100,
      align: 'center',
      render: (_, r) => (
        <Space size={4}>
          <Tooltip title={__( 'Duplicate form', 'formglut' )}>
            <Button type="text" icon={<FontAwesomeIcon icon={faCopy} />} style={{ color: '#64748b' }} onClick={() => handleDuplicate(r.id)} />
          </Tooltip>
          <Popconfirm title={__( 'Are you sure to delete this?', 'formglut' )} okText={__( 'Confirm', 'formglut' )} cancelText={__( 'Cancel', 'formglut' )} okButtonProps={{ danger: true }} onConfirm={() => handleDelete(r.id)}>
            <Tooltip title={__( 'Delete form', 'formglut' )}>
              <Button type="text" icon={<FontAwesomeIcon icon={faTrash} />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {loading && forms.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <>
          <Header activePage="Forms" />
          <div className="fg-content">
          <div className="fg-page-header">
            <div>
              <div className="fg-page-title">{__( 'All Forms', 'formglut' )}</div>
              <div className="fg-page-subtitle">{__( 'Manage and monitor all your forms', 'formglut' )}</div>
            </div>
            <Button type="primary" icon={<FontAwesomeIcon icon={faPlus} />} style={{ background: '#e94560', borderColor: '#e94560' }} onClick={() => { setShowCreateModal(true); }}>
              {__( 'Add New Form', 'formglut' )}
            </Button>
          </div>

          <div className="fg-stats-row">
            <div className="fg-stat-card">
              <div className="fg-stat-label">{__( 'Total Forms', 'formglut' )}</div>
              <div className="fg-stat-value">{stats.totalForms.toLocaleString()}</div>
            </div>
            <div className="fg-stat-card">
              <div className="fg-stat-label">{__( 'Total Entries', 'formglut' )}</div>
              <div className="fg-stat-value">{stats.totalEntries.toLocaleString()}</div>
            </div>
            <div className="fg-stat-card">
              <div className="fg-stat-label">{__( 'Active Forms', 'formglut' )}</div>
              <div className="fg-stat-value">{stats.activeForms}</div>
            </div>
            <div className="fg-stat-card">
              <div className="fg-stat-label">{__( 'Draft Forms', 'formglut' )}</div>
              <div className="fg-stat-value">{stats.draftForms}</div>
            </div>
          </div>

          <div className="fg-filter-tabs">
            {[
              { key: '', label: __( 'All', 'formglut' ), count: stats.totalForms },
              { key: 'active', label: __( 'Active', 'formglut' ), count: stats.activeForms },
              { key: 'draft', label: __( 'Draft', 'formglut' ), count: stats.draftForms },
              { key: 'closed', label: __( 'Closed', 'formglut' ), count: stats.closedForms },
            ].map(tab => (
              <button
                key={tab.key}
                className={'fg-filter-tab' + (statusFilter === tab.key ? ' active' : '')}
                onClick={() => { setStatusFilter(tab.key); setPage(1); }}
              >
                {tab.label} <span className="fg-filter-count">{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="fg-table-wrap">
            {selectedRowKeys.length > 0 && (
              <div className="fg-bulk-bar">
                <span>{selectedRowKeys.length} {__( 'selected', 'formglut' )}</span>
                <Button size="small" className="fg-bulk-btn" icon={<FontAwesomeIcon icon={faBulkActive} />} onClick={() => handleBulkStatus('active')}>{__( 'Set Active', 'formglut' )}</Button>
                <Button size="small" className="fg-bulk-btn" icon={<FontAwesomeIcon icon={faBulkDraft} />} onClick={() => handleBulkStatus('draft')}>{__( 'Set Draft', 'formglut' )}</Button>
                <Popconfirm title={__( 'Delete %s form(s)?', 'formglut' ).replace( '%s', selectedRowKeys.length )} okText={__( 'Delete', 'formglut' )} cancelText={__( 'Cancel', 'formglut' )} okButtonProps={{ danger: true }} onConfirm={handleBulkDelete}>
                  <Button size="small" danger className="fg-bulk-btn" icon={<FontAwesomeIcon icon={faBulkTrash} />}>{__( 'Delete', 'formglut' )}</Button>
                </Popconfirm>
                <Button size="small" type="text" className="fg-bulk-clear" icon={<FontAwesomeIcon icon={faBulkClear} />} onClick={() => setSelectedRowKeys([])}>{__( 'Clear', 'formglut' )}</Button>
              </div>
            )}
            <div className="fg-table-toolbar">
              <div className="fg-table-toolbar-left">
                <Input
                  placeholder={__( 'Search forms...', 'formglut' )}
                  prefix={<FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#94a3b8' }} />}
                  style={{ width: 240 }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  allowClear
                />
              </div>
              <div className="fg-table-toolbar-right">
                <Select
                  value={datePreset}
                  style={{ width: 160 }}
                  suffixIcon={<FontAwesomeIcon icon={faCalendarDays} />}
                  onChange={(v) => { setDatePreset(v); if (v !== 'custom') setCustomRange(null); setPage(1); }}
                  options={[
                    { value: '', label: __( 'All', 'formglut' ) },
                    { value: 'today', label: __( 'Today', 'formglut' ) },
                    { value: 'last_week', label: __( 'Last 7 Days', 'formglut' ) },
                    { value: 'this_month', label: __( 'This Month', 'formglut' ) },
                    { value: 'custom', label: __( 'Custom Range', 'formglut' ) },
                  ]}
                />
                {datePreset === 'custom' && (
                  <DatePicker.RangePicker
                    value={customRange}
                    onChange={(range) => { setCustomRange(range); setPage(1); }}
                    disabledDate={(d) => d && d.isAfter(dayjs(), 'day')}
                    allowClear
                  />
                )}
                <Tooltip title={__( 'Refresh', 'formglut' )}><Button type="text" icon={<FontAwesomeIcon icon={faRotateRight} spin={loading} style={{ color: '#64748b' }} />} onClick={loadForms} /></Tooltip>
              </div>
            </div>
            <Table
              dataSource={forms}
              columns={columns}
              rowKey="id"
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
              scroll={{ x: 'max-content' }}
              loading={loading && forms.length > 0}
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
                showTotal: (t) => `${t} ${__( 'forms total', 'formglut' )}`,
                onChange: (p, ps) => { setPage(p); setPerPage(ps); },
              }}
              locale={{
                emptyText: !searchText && !dateFrom ? (
                  <div className="fg-empty-state">
                    <div className="fg-empty-icon"><FontAwesomeIcon icon={faFileLines} /></div>
                    <div className="fg-empty-title">{__( 'No forms yet', 'formglut' )}</div>
                    <div className="fg-empty-desc">{__( 'Create your first form and start collecting responses.', 'formglut' )}</div>
                    <Button type="primary" icon={<FontAwesomeIcon icon={faPlus} />} style={{ background: '#e94560', borderColor: '#e94560', marginTop: 12 }} onClick={() => setShowCreateModal(true)}>{__( 'Create a Form', 'formglut' )}</Button>
                  </div>
                ) : __( 'No forms match your filters.', 'formglut' ),
              }}
              style={{ padding: '0 8px' }}
            />
          </div>
        </div>
        </>
      )}
      <CreateFormModal open={showCreateModal} onClose={() => { setShowCreateModal(false); }} />
    </div>
  );
}
