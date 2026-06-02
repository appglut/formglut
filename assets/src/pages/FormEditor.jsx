import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Switch, Input, Select, Tabs, Tooltip, message, Spin, Collapse } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faArrowUp, faArrowDown, faFloppyDisk, faEye, faRotateLeft, faRotateRight,
  faCopy, faTrash, faGear, faPalette, faPlus, faCrown, faCircleInfo, faCode,
} from '@fortawesome/free-solid-svg-icons';
import { _pg } from '../components/Header';
import * as api from '../services/api';
import { FIELD_TYPES, createField, getEnabledFieldTypes } from '../fields/fieldTypes.jsx';
import DynamicFieldOptions from '../fields/DynamicFieldOptions.jsx';
import { __ } from '@wordpress/i18n';
import './form-editor.css';

// Configure message duration and placement
message.config({
  duration: 3,
  maxCount: 3,
  top: 24,
  placement: 'top',
});

let uid = 0;
function genId() { uid += 1; return 'f' + Date.now() + '_' + uid; }

/* ── Field Preview (Canvas) ───────────────────────────────────────── */

function FieldTemplate({ field: f }) {
  const pad = (v, d) => (v ?? d) + 'px';
  const pt = pad(f.padding_top, 10), pr = pad(f.padding_right, 14), pb = pad(f.padding_bottom, 10), pl = pad(f.padding_left, 14);
  const mt = pad(f.margin_top, 0), mr = pad(f.margin_right, 0), mb = pad(f.margin_bottom, 0), ml = pad(f.margin_left, 0);

  const inputStyle = {
    background: f.bg_color || '#fafbfc',
    color: f.text_color || '#94a3b8',
    borderColor: f.border_color || '#e2e8f0',
    borderRadius: (f.border_radius ?? 8) + 'px',
    padding: `${pt} ${pr} ${pb} ${pl}`,
    margin: `${mt} ${mr} ${mb} ${ml}`,
  };

  const fieldWidthVal = f.field_width === 'custom' && f.field_width_custom ? f.field_width_custom + 'px' : f.field_width;
  const wrapperStyle = {
    ...(fieldWidthVal && fieldWidthVal !== '100%' ? { maxWidth: fieldWidthVal } : {}),
  };
  const hasWrapper = Object.keys(wrapperStyle).length > 0;
  const wrapper = hasWrapper ? wrapperStyle : undefined;

  const labelPlacement = f.label_placement || 'top';
  const labelWidthVal = f.label_width === 'custom' && f.label_width_custom ? f.label_width_custom + 'px' : f.label_width;
  const labelStyle = labelPlacement === 'left' || labelPlacement === 'right'
    ? { flex: '0 0 auto', width: labelWidthVal && labelWidthVal !== 'auto' && labelWidthVal !== '100%' ? labelWidthVal : undefined, whiteSpace: 'nowrap', marginBottom: 0 }
    : labelPlacement === 'hidden' ? { display: 'none' } : {};

  const label = (
    <div className="fg-form-field-label" style={labelStyle}>
      {f.admin_label || f.label || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>{f.type} {__( 'field', 'formglut' )}</span>}
      {f.required && <span className="required">*</span>}
      {f.help_text && (
        <span className="fg-help-tip" title={f.help_text}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="6.5" r="0.75" fill="currentColor"/>
          </svg>
        </span>
      )}
    </div>
  );

  function renderInput() {
    // Textarea
    if (f.type === 'textarea') {
      const charLimit = f.character_limit ? Number(f.character_limit) : 0;
      const maxLength = charLimit > 0 ? charLimit : undefined;
      return (
        <div className="fg-input-group">
          {f.prefix_label && <span className="fg-input-prefix" dangerouslySetInnerHTML={{ __html: f.prefix_label }} />}
          <textarea key={`textarea-${f.id}-${f.default_value || ''}-${f.character_limit || ''}`} className="fg-form-field-input" rows={f.rows || 4} placeholder={f.placeholder} defaultValue={f.default_value} maxLength={maxLength} readOnly style={{ resize: 'vertical', ...inputStyle }} />
          {f.suffix_label && <span className="fg-input-suffix" dangerouslySetInnerHTML={{ __html: f.suffix_label }} />}
        </div>
      );
    }

    // Select field
    if (f.type === 'select') {
      const firstOptionDisabled = f.disable_first_option !== false;
      return (
        <select key={`select-${f.id}-${f.default_value || ''}`} className="fg-form-field-input" defaultValue={f.default_value} disabled style={inputStyle}>
          {f.placeholder && (
            <option value="" disabled={firstOptionDisabled}>{f.placeholder}</option>
          )}
          {(f.options || []).map((opt, i) => (
            <option key={i} value={opt.value || opt.label} disabled={firstOptionDisabled && i === 0}>
              {opt.label || `Option ${i + 1}`}
            </option>
          ))}
        </select>
      );
    }

    // Radio field
    if (f.type === 'radio') {
      const isInline = f.inline;
      return (
        <div style={{ display: isInline ? 'flex' : 'block', gap: isInline ? '16px' : '8px' }}>
          {(f.options || []).map((opt, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="radio" name={f.id} disabled style={{ margin: 0 }} />
              <span>{opt.label || `Option ${i + 1}`}</span>
            </label>
          ))}
        </div>
      );
    }

    // Checkbox field
    if (f.type === 'checkbox') {
      const isInline = f.inline;
      return (
        <div style={{ display: isInline ? 'flex' : 'block', gap: isInline ? '16px' : '8px' }}>
          {(f.options || []).map((opt, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" disabled style={{ margin: 0 }} />
              <span>{opt.label || `Option ${i + 1}`}</span>
            </label>
          ))}
        </div>
      );
    }

    // Pro fields are rendered by the formglut-pro plugin via window.formglutProRenderPreview
    if (typeof window.formglutProRenderPreview === 'function') {
      const proPreview = window.formglutProRenderPreview(f, inputStyle);
      if (proPreview) return proPreview;
    }

    // Default input
    const typeAttr = f.type === 'number' ? 'number' : f.type === 'email' ? 'email' : 'text';
    const charLimit = f.character_limit ? Number(f.character_limit) : 0;
    const maxLength = charLimit > 0 ? charLimit : undefined;
    return (
      <div className="fg-input-group">
        {f.prefix_label && <span className="fg-input-prefix" dangerouslySetInnerHTML={{ __html: f.prefix_label }} />}
        <input key={`input-${f.id}-${f.default_value || ''}-${f.character_limit || ''}`} className="fg-form-field-input" type={typeAttr} placeholder={f.placeholder} defaultValue={f.default_value} maxLength={maxLength} readOnly style={inputStyle} />
        {f.suffix_label && <span className="fg-input-suffix" dangerouslySetInnerHTML={{ __html: f.suffix_label }} />}
      </div>
    );
  }

  if (labelPlacement === 'left' || labelPlacement === 'right') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...wrapper }}>
        {labelPlacement === 'left' ? label : null}
        {renderInput()}
        {labelPlacement === 'right' ? label : null}
      </div>
    );
  }

  return <div style={wrapper}>{label}{renderInput()}</div>;
}

/* ── Add Fields Tab ────────────────────────────────────────────────── */

function AddFieldsTab({ onAddField: addFieldFn }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [proEnabled, setProEnabled] = React.useState(false);

  // Check if FormGlut Pro is enabled
  React.useEffect(() => {
    if (typeof window.formglut_admin !== 'undefined' && window.formglut_admin.pro_enabled) {
      setProEnabled(true);
    }
  }, []);

  function handleDragStart(e, fieldType) {
    e.dataTransfer.setData('fgFieldType', fieldType);
    e.dataTransfer.effectAllowed = 'copy';
  }

  function handleProFieldClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (proEnabled) {
      // Pro is enabled - allow adding the field
      const fieldType = e.currentTarget.dataset.fieldType;
      if (fieldType && addFieldFn) {
        addFieldFn(fieldType);
      }
    } else {
      message.info(__('This field is available in Pro version.', 'formglut'));
    }
  }

  // Group fields by category and filter by search
  const groupedFields = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const groups = {};

    Object.entries(FIELD_TYPES).forEach(([key, cfg]) => {
      // Filter by search query
      if (query && !cfg.label.toLowerCase().includes(query)) {
        return;
      }

      const category = cfg.category || 'general';
      if (!groups[category]) {
        groups[category] = [];
      }
      const isPro = cfg.pro || false;
      const isProEnabledAndActive = isPro && proEnabled;

      groups[category].push({
        key,
        label: cfg.label,
        icon: cfg.icon,
        pro: isPro,
        enabled: !isPro || isProEnabledAndActive,
      });
    });

    // Maintain category order
    const categoryOrder = ['general', 'advanced', 'layout', 'payment', 'security', 'upload', 'survey', 'wordpress'];
    const orderedGroups = {};
    categoryOrder.forEach(cat => {
      if (groups[cat]) {
        orderedGroups[cat] = groups[cat];
      }
    });
    // Add any remaining categories not in the order list
    Object.keys(groups).forEach(cat => {
      if (!orderedGroups[cat]) {
        orderedGroups[cat] = groups[cat];
      }
    });

    return orderedGroups;
  }, [searchQuery, proEnabled]);

  return (
    <div style={{ padding: '0 4px' }}>
      {/* Search Input */}
      <Input
        placeholder={__('Search fields...', 'formglut')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        allowClear
        prefix={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>}
        style={{ marginBottom: 16 }}
      />

      {/* Field Accordion */}
      <Collapse
        defaultActiveKey={['general']}
        bordered={false}
        size="small"
        style={{ background: 'transparent' }}
        items={Object.entries(groupedFields).map(([category, fields]) => ({
          key: category,
          label: <span style={{ fontWeight: 600, fontSize: 13 }}>{{
            general: __('General Fields', 'formglut'),
            advanced: __('Advanced Fields', 'formglut'),
            layout: __('Container Layouts', 'formglut'),
            payment: __('Payment Fields', 'formglut'),
            security: __('Security Fields', 'formglut'),
            upload: __('Upload Fields', 'formglut'),
            survey: __('Survey & Quiz', 'formglut'),
            wordpress: __('WordPress', 'formglut'),
          }[category] || category}</span>,
          children: (
            <div className="fg-field-grid">
              {fields.map(ft => (
                <div
                  className={'fg-field-btn' + (ft.pro && !ft.enabled ? ' fg-field-pro' : '')}
                  key={ft.key}
                  draggable={ft.enabled}
                  data-field-type={ft.key}
                  onDragStart={ft.enabled ? (e) => handleDragStart(e, ft.key) : undefined}
                  onClick={ft.enabled ? () => addFieldFn(ft.key) : handleProFieldClick}
                >
                  <span className="fg-field-btn-icon">{ft.icon}</span>
                  <span className="fg-field-btn-label">{ft.label}</span>
                  {ft.pro && !ft.enabled && <span className="fg-pro-badge"><FontAwesomeIcon icon={faCrown} /></span>}
                </div>
              ))}
            </div>
          ),
        }))}
      />
    </div>
  );
}

/* ── Field Options Tab ─────────────────────────────────────────────── */

function FieldOptionsTab({ field, onUpdate, submitBtn, onSubBtnUpdate, selectedSubmit, allFields = [] }) {
  // Submit button options
  if (selectedSubmit) {
    const updateSub = (key, val) => { const u = {}; u[key] = val; onSubBtnUpdate(u); };

    // Helper to render label with tooltip
    const renderLabel = (label, tooltip) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span className="fg-prop-label" style={{ marginBottom: 0 }}>{label}</span>
        {tooltip && (
          <Tooltip title={tooltip}>
            <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: 13, color: '#94a3b8', cursor: 'help', flexShrink: 0, marginTop: -1 }} />
          </Tooltip>
        )}
      </div>
    );

    return (
      <div>
        <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Button Settings', 'formglut' )}</div>
          <div className="fg-prop-field">{renderLabel(__( 'Button Text', 'formglut' ), __( 'The text displayed on the submit button.', 'formglut' ))}<Input value={submitBtn.text} onChange={(e) => updateSub('text', e.target.value)} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Button Size', 'formglut' ), __( 'The preset size of the button. Small is compact, Large is more prominent.', 'formglut' ))}<Select value={submitBtn.size} onChange={(v) => updateSub('size', v)} style={{ width: '100%' }} options={[{ value: 'small', label: __( 'Small', 'formglut' ) }, { value: 'medium', label: __( 'Medium', 'formglut' ) }, { value: 'large', label: __( 'Large', 'formglut' ) }]} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Button Alignment', 'formglut' ), __( 'How the button is positioned within the form. Full Width stretches to fill the container.', 'formglut' ))}<Select value={submitBtn.alignment} onChange={(v) => updateSub('alignment', v)} style={{ width: '100%' }} options={[{ value: 'left', label: __( 'Left', 'formglut' ) }, { value: 'center', label: __( 'Center', 'formglut' ) }, { value: 'right', label: __( 'Right', 'formglut' ) }, { value: 'full', label: __( 'Full Width', 'formglut' ) }]} /></div>
        </div>
        <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Button Styling', 'formglut' )}</div>
          <div className="fg-prop-field">{renderLabel(__( 'Background Color', 'formglut' ), __( 'The background color of the submit button.', 'formglut' ))}<div style={{ display: 'flex', gap: 8 }}><input type="color" value={submitBtn.bg_color} onChange={(e) => updateSub('bg_color', e.target.value)} style={{ width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 }} /><Input value={submitBtn.bg_color} onChange={(e) => updateSub('bg_color', e.target.value)} style={{ flex: 1 }} /></div></div>
          <div className="fg-prop-field">{renderLabel(__( 'Text Color', 'formglut' ), __( 'The color of the text on the submit button.', 'formglut' ))}<div style={{ display: 'flex', gap: 8 }}><input type="color" value={submitBtn.text_color} onChange={(e) => updateSub('text_color', e.target.value)} style={{ width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 }} /><Input value={submitBtn.text_color} onChange={(e) => updateSub('text_color', e.target.value)} style={{ flex: 1 }} /></div></div>
          <div className="fg-prop-field">{renderLabel(__( 'Border Radius (px)', 'formglut' ), __( 'Round the corners of the button. Higher values create more rounded corners.', 'formglut' ))}<Input type="number" value={submitBtn.border_radius} onChange={(e) => updateSub('border_radius', parseInt(e.target.value) || 0)} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Font Size (px)', 'formglut' ), __( 'The size of the text on the button in pixels.', 'formglut' ))}<Input type="number" value={submitBtn.font_size} onChange={(e) => updateSub('font_size', parseInt(e.target.value) || 14)} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Font Weight', 'formglut' ), __( 'The thickness of the text. Bold makes the text more prominent.', 'formglut' ))}<Select value={submitBtn.font_weight} onChange={(v) => updateSub('font_weight', v)} style={{ width: '100%' }} options={[{ value: 400, label: __( 'Normal (400)', 'formglut' ) }, { value: 500, label: __( 'Medium (500)', 'formglut' ) }, { value: 600, label: __( 'Semi Bold (600)', 'formglut' ) }, { value: 700, label: __( 'Bold (700)', 'formglut' ) }]} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Height (px)', 'formglut' ), __( 'The height of the button in pixels.', 'formglut' ))}<Input type="number" value={submitBtn.height} onChange={(e) => updateSub('height', parseInt(e.target.value) || 48)} /></div>
        </div>
      </div>
    );
  }

  // Use dynamic field options renderer
  return <DynamicFieldOptions field={field} onUpdate={onUpdate} allFields={allFields} />;
}

/* ── Style Options Tab ─────────────────────────────────────────────── */

function StyleOptionsTab({ field, onUpdate }) {
  if (!field) {
    return (
      <div className="fg-prop-no-selection">
        <div className="fg-prop-no-selection-icon"><FontAwesomeIcon icon={faPalette} /></div>
        <div className="fg-prop-no-selection-text">{__( 'Select a field', 'formglut' )}<br/>{__( 'to edit its style', 'formglut' )}</div>
      </div>
    );
  }

  const up = (key, val) => { const u = {}; u[key] = val; onUpdate(field.id, u); };

  // Helper to render label with tooltip
  const renderLabel = (label, tooltip) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
      <span className="fg-prop-label" style={{ marginBottom: 0 }}>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip}>
          <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: 13, color: '#94a3b8', cursor: 'help', flexShrink: 0, marginTop: -1 }} />
        </Tooltip>
      )}
    </div>
  );

  return (
    <div>
      {/* Type badge */}
      <div style={{ marginBottom: 12, padding: '6px 10px', background: '#f8fafc', borderRadius: 6, fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
        {FIELD_TYPES[field.type]?.icon}<span style={{ fontWeight: 600 }}>{FIELD_TYPES[field.type]?.label || field.type}</span>
      </div>

      {/* Label Style */}
      <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Label Style', 'formglut' )}</div>
        <div className="fg-prop-field">{renderLabel(__( 'Label Placement', 'formglut' ), __( 'Position the label above, below, left, or right of the field input.', 'formglut' ))}
          <Select value={field.label_placement || 'top'} onChange={(v) => up('label_placement', v)} style={{ width: '100%' }} options={[{ value: 'top', label: __( 'Top', 'formglut' ) }, { value: 'left', label: __( 'Left', 'formglut' ) }, { value: 'right', label: __( 'Right', 'formglut' ) }, { value: 'hidden', label: __( 'Hidden', 'formglut' ) }]} />
        </div>
        <div className="fg-prop-field">{renderLabel(__( 'Label Width', 'formglut' ), __( 'Set the width of the label. Use "Auto" to let the label text determine the width.', 'formglut' ))}
          <Select value={field.label_width || 'auto'} onChange={(v) => { up('label_width', v); if (v !== 'custom') up('label_width_custom', ''); }} style={{ width: '100%' }} options={[{ value: 'auto', label: __( 'Auto', 'formglut' ) }, { value: '120px', label: __( 'Small (120px)', 'formglut' ) }, { value: '160px', label: __( 'Medium (160px)', 'formglut' ) }, { value: '200px', label: __( 'Large (200px)', 'formglut' ) }, { value: '100%', label: __( 'Full Width', 'formglut' ) }, { value: 'custom', label: __( 'Custom', 'formglut' ) }]} />
        </div>
        {field.label_width === 'custom' && (
          <div className="fg-prop-field">{renderLabel(__( 'Custom Width (px)', 'formglut' ), __( 'Enter a custom width in pixels for the label.', 'formglut' ))}
            <Input type="number" value={field.label_width_custom || ''} placeholder={__( 'e.g. 180', 'formglut' )} onChange={(e) => up('label_width_custom', e.target.value)} addonAfter="px" />
          </div>
        )}
      </div>

      {/* Field Style */}
      <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Field Style', 'formglut' )}</div>
        <div className="fg-prop-field">{renderLabel(__( 'Field Width', 'formglut' ), __( 'Set the width of the field input area. Half = 50%, Three Quarter = 75%, Full Width = 100%.', 'formglut' ))}
          <Select value={field.field_width || '100%'} onChange={(v) => { up('field_width', v); if (v !== 'custom') up('field_width_custom', ''); }} style={{ width: '100%' }} options={[{ value: '50%', label: __( 'Half', 'formglut' ) }, { value: '75%', label: __( 'Three Quarter', 'formglut' ) }, { value: '100%', label: __( 'Full Width', 'formglut' ) }, { value: 'custom', label: __( 'Custom', 'formglut' ) }]} />
        </div>
        {field.field_width === 'custom' && (
          <div className="fg-prop-field">{renderLabel(__( 'Custom Width (px)', 'formglut' ), __( 'Enter a custom width in pixels for the field input.', 'formglut' ))}
            <Input type="number" value={field.field_width_custom || ''} placeholder={__( 'e.g. 400', 'formglut' )} onChange={(e) => up('field_width_custom', e.target.value)} addonAfter="px" />
          </div>
        )}
        <div className="fg-prop-field">{renderLabel(__( 'Input Padding (px)', 'formglut' ), __( 'Control the spacing inside the field input between the text and the border.', 'formglut' ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
            <div><div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{__( 'Top', 'formglut' )}</div><Input type="number" size="small" value={field.padding_top ?? 10} onChange={(e) => up('padding_top', parseInt(e.target.value) || 0)} /></div>
            <div><div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{__( 'Right', 'formglut' )}</div><Input type="number" size="small" value={field.padding_right ?? 14} onChange={(e) => up('padding_right', parseInt(e.target.value) || 0)} /></div>
            <div><div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{__( 'Bottom', 'formglut' )}</div><Input type="number" size="small" value={field.padding_bottom ?? 10} onChange={(e) => up('padding_bottom', parseInt(e.target.value) || 0)} /></div>
            <div><div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{__( 'Left', 'formglut' )}</div><Input type="number" size="small" value={field.padding_left ?? 14} onChange={(e) => up('padding_left', parseInt(e.target.value) || 0)} /></div>
          </div>
        </div>
        <div className="fg-prop-field">{renderLabel(__( 'Input Margin (px)', 'formglut' ), __( 'Control the spacing outside the field input to separate it from other elements.', 'formglut' ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
            <div><div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{__( 'Top', 'formglut' )}</div><Input type="number" size="small" value={field.margin_top ?? 0} onChange={(e) => up('margin_top', parseInt(e.target.value) || 0)} /></div>
            <div><div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{__( 'Right', 'formglut' )}</div><Input type="number" size="small" value={field.margin_right ?? 0} onChange={(e) => up('margin_right', parseInt(e.target.value) || 0)} /></div>
            <div><div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{__( 'Bottom', 'formglut' )}</div><Input type="number" size="small" value={field.margin_bottom ?? 0} onChange={(e) => up('margin_bottom', parseInt(e.target.value) || 0)} /></div>
            <div><div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{__( 'Left', 'formglut' )}</div><Input type="number" size="small" value={field.margin_left ?? 0} onChange={(e) => up('margin_left', parseInt(e.target.value) || 0)} /></div>
          </div>
        </div>
        <div className="fg-prop-field">{renderLabel(__( 'Border Radius (px)', 'formglut' ), __( 'Round the corners of the field input. Higher values create more rounded corners.', 'formglut' ))}
          <Input type="number" value={field.border_radius ?? 8} onChange={(e) => up('border_radius', parseInt(e.target.value) || 0)} />
        </div>
      </div>

      {/* Colors */}
      <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Colors', 'formglut' )}</div>
        <div className="fg-prop-field">{renderLabel(__( 'Background Color', 'formglut' ), __( 'The background color of the field input area.', 'formglut' ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="color" value={field.bg_color || '#ffffff'} onChange={(e) => up('bg_color', e.target.value)} style={{ width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 }} />
            <Input value={field.bg_color || '#ffffff'} onChange={(e) => up('bg_color', e.target.value)} style={{ flex: 1 }} />
          </div>
        </div>
        <div className="fg-prop-field">{renderLabel(__( 'Border Color', 'formglut' ), __( 'The color of the border around the field input.', 'formglut' ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="color" value={field.border_color || '#e2e8f0'} onChange={(e) => up('border_color', e.target.value)} style={{ width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 }} />
            <Input value={field.border_color || '#e2e8f0'} onChange={(e) => up('border_color', e.target.value)} style={{ flex: 1 }} />
          </div>
        </div>
        <div className="fg-prop-field">{renderLabel(__( 'Text Color', 'formglut' ), __( 'The color of the text entered by users in the field input.', 'formglut' ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="color" value={field.text_color || '#1e293b'} onChange={(e) => up('text_color', e.target.value)} style={{ width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 }} />
            <Input value={field.text_color || '#1e293b'} onChange={(e) => up('text_color', e.target.value)} style={{ flex: 1 }} />
          </div>
        </div>
      </div>

      {/* CSS Class */}
      <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Custom CSS', 'formglut' )}</div>
        <div className="fg-prop-field">{renderLabel(__( 'CSS Class', 'formglut' ), __( 'Add a custom CSS class to this field for advanced styling. You can then target this class in your custom CSS.', 'formglut' ))}
          <Input value={field.css_class || ''} placeholder={__( 'my-custom-class', 'formglut' )} onChange={(e) => up('css_class', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function getFormIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('form_id') ? parseInt(params.get('form_id'), 10) : null;
}

// Copy text to clipboard with fallback for non-HTTPS contexts
function copyToClipboard(text) {
  // Try modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => {
      // Fallback if clipboard API fails
      return fallbackCopy(text);
    });
  }
  // Fallback for older browsers or non-secure contexts
  return fallbackCopy(text);
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful ? Promise.resolve() : Promise.reject(new Error('Copy command failed'));
  } catch (err) {
    document.body.removeChild(textArea);
    return Promise.reject(err);
  }
}

const DEFAULT_SUBMIT_BTN = {
  text: __( 'Submit Form', 'formglut' ), size: 'large', alignment: 'full',
  bg_color: '#e94560', text_color: '#ffffff',
  border_radius: 10, font_size: 15, font_weight: 600, height: 48,
};

/* ── Main Editor ──────────────────────────────────────────────────── */

export default function FormEditor() {
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('addFields');
  const dragIdxRef = useRef(null);
  const [submitBtn, setSubmitBtn] = useState({ ...DEFAULT_SUBMIT_BTN });
  const [selectedSubmit, setSelectedSubmit] = useState(false);
  const [dropIdx, setDropIdx] = useState(null);

  const [formTitle, setFormTitle] = useState(__( 'Untitled Form', 'formglut' ));
  const [formId, setFormId] = useState(getFormIdFromUrl());
  const [deviceWidth, setDeviceWidth] = useState('100%');
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!formId);

  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const initialLoadDone = useRef(false);

  /* ── History ─────────────────────────────────────────────────────── */

  const pushHistory = useCallback((newFields, newSubmitBtn) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, historyIdx + 1);
      trimmed.push({ fields: newFields, submitBtn: { ...(newSubmitBtn || submitBtn) } });
      if (trimmed.length > 50) trimmed.shift();
      setHistoryIdx(trimmed.length - 1);
      return trimmed;
    });
  }, [historyIdx, submitBtn]);

  function undo() {
    if (historyIdx <= 0) return;
    const prev = history[historyIdx - 1];
    setHistoryIdx(historyIdx - 1);
    setFields(prev.fields);
    setSubmitBtn(prev.submitBtn);
    setIsDirty(true);
  }

  function redo() {
    if (historyIdx >= history.length - 1) return;
    const next = history[historyIdx + 1];
    setHistoryIdx(historyIdx + 1);
    setFields(next.fields);
    setSubmitBtn(next.submitBtn);
    setIsDirty(true);
  }

  /* ── Load ─────────────────────────────────────────────────────────── */

  useEffect(() => {
    if (!formId) { setLoading(false); return; }
    api.getForm(formId)
      .then(data => {
        const form = data.form;
        if (form.title) setFormTitle(form.title);
        if (Array.isArray(form.fields)) setFields(form.fields);
        if (form.submit_btn && typeof form.submit_btn === 'object') {
          setSubmitBtn({ ...DEFAULT_SUBMIT_BTN, ...form.submit_btn });
        }
        setLoading(false);
      })
      .catch(err => { message.error(err.message || __( 'Failed to load form.', 'formglut' )); setLoading(false); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!initialLoadDone.current && !loading) {
      setHistory([{ fields, submitBtn }]);
      setHistoryIdx(0);
      initialLoadDone.current = true;
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const h = (e) => { if (isDirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [isDirty]);

  useEffect(() => {
    function onKey(e) {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') { e.preventDefault(); redo(); }
      else if (e.key === 's') { e.preventDefault(); handleSave(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  /* ── Field ops ───────────────────────────────────────────────────── */

  function addField(type) {
    const f = createField(type);
    if (!f) return;
    f.id = genId();
    const next = [...fields, f];
    setFields(next); setIsDirty(true); pushHistory(next);
  }

  function removeField(id) {
    const next = fields.filter(f => f.id !== id);
    setFields(next);
    if (selectedId === id) { setSelectedId(null); setActiveTab('addFields'); }
    setIsDirty(true); pushHistory(next);
  }

  function duplicateField(id) {
    let next;
    setFields(p => {
      const idx = p.findIndex(f => f.id === id);
      if (idx === -1) return p;
      const copy = Object.assign({}, p[idx], { id: genId(), label: p[idx].label + ' (copy)' });
      next = [...p]; next.splice(idx + 1, 0, copy);
      return next;
    });
    message.success(__( 'Field duplicated', 'formglut' )); setIsDirty(true);
    if (next) pushHistory(next);
  }

  function moveField(id, dir) {
    let next;
    setFields(p => {
      const idx = p.findIndex(f => f.id === id);
      if (idx === -1) return p;
      const ni = idx + dir;
      if (ni < 0 || ni >= p.length) return p;
      next = [...p]; [next[idx], next[ni]] = [next[ni], next[idx]];
      return next;
    });
    setIsDirty(true); if (next) pushHistory(next);
  }

  function updateFieldProp(id, updates) {
    let next;
    setFields(p => { next = p.map(f => f.id === id ? Object.assign({}, f, updates) : f); return next; });
    setIsDirty(true); if (next) pushHistory(next);
  }

  function selectField(id) { setSelectedId(id); setSelectedSubmit(false); setActiveTab('fieldOptions'); }
  function selectSubmitBtn() { setSelectedId(null); setSelectedSubmit(true); setActiveTab('fieldOptions'); }

  /* ── Drag & drop ─────────────────────────────────────────────────── */

  function handleCanvasDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }
  function handleCanvasDrop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData('fgFieldType');
    if (type && FIELD_TYPES[type]) {
      const insertAt = dropIdx != null ? dropIdx : fields.length;
      const f = createField(type);
      if (f) { const next = [...fields]; next.splice(insertAt, 0, f); setFields(next); setIsDirty(true); pushHistory(next); }
    }
    dragIdxRef.current = null; setDropIdx(null);
  }
  function handleCanvasDragLeave(e) { if (!e.currentTarget.contains(e.relatedTarget)) setDropIdx(null); }
  function handleEmptyDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); setDropIdx(null); }
  function handleEmptyDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
  function handleEmptyDrop(e) {
    e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.remove('drag-over');
    const type = e.dataTransfer.getData('fgFieldType');
    if (type && FIELD_TYPES[type]) addField(type);
    setDropIdx(null);
  }
  function handleFieldDragStart(e, idx) { dragIdxRef.current = idx; e.dataTransfer.setData('fgReorder', 'true'); e.dataTransfer.effectAllowed = 'move'; }
  function handleFieldDragOver(e, idx) { e.preventDefault(); e.stopPropagation(); const rect = e.currentTarget.getBoundingClientRect(); setDropIdx(e.clientY < rect.top + rect.height / 2 ? idx : idx + 1); }
  function handleFieldDrop(e, targetIdx) {
    e.preventDefault(); e.stopPropagation();
    const type = e.dataTransfer.getData('fgFieldType');
    if (type && FIELD_TYPES[type]) {
      const f = createField(type); if (!f) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ins = e.clientY < rect.top + rect.height / 2 ? targetIdx : targetIdx + 1;
      const next = [...fields]; next.splice(ins, 0, f);
      setFields(next); setIsDirty(true); pushHistory(next); setDropIdx(null); return;
    }
    const fromIdx = dragIdxRef.current;
    if (fromIdx === null || fromIdx === targetIdx) { setDropIdx(null); return; }
    const rect2 = e.currentTarget.getBoundingClientRect();
    const midY = rect2.top + rect2.height / 2;
    const next = [...fields];
    const item = next.splice(fromIdx, 1)[0];
    let adj = fromIdx < targetIdx ? targetIdx - 1 : targetIdx;
    if (e.clientY >= midY) adj += 1;
    next.splice(adj, 0, item);
    setFields(next); setIsDirty(true); pushHistory(next);
    dragIdxRef.current = null; setDropIdx(null);
  }
  function handleFieldDragEnd() { dragIdxRef.current = null; setDropIdx(null); }

  /* ── Save ────────────────────────────────────────────────────────── */

  async function handleSave() {
    if (saving) return;
    const title = formTitle.trim();
    if (!title) { message.warning(__( 'Please enter a form title.', 'formglut' )); return; }
    setSaving(true);
    try {
      const payload = { title, fields, submit_btn: submitBtn, status: 'active' };
      if (formId) {
        payload.id = formId;
        await api.updateForm(payload);
        message.success(__( 'Form saved.', 'formglut' ));
      } else {
        const result = await api.createForm(payload);
        setFormId(result.form_id);
        const url = new URL(window.location.href);
        url.searchParams.set('form_id', result.form_id);
        window.history.replaceState({}, '', url.toString());
        message.success(__( 'Form created.', 'formglut' ));
      }
      setIsDirty(false);
    } catch (err) { message.error(err.message || __( 'Failed to save form.', 'formglut' )); } finally { setSaving(false); }
  }

  const selectedField = fields.find(f => f.id === selectedId) || null;

  if (loading) {
    return (<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}><Spin size="large" tip={__( 'Loading form...', 'formglut' )} /></div>);
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="fg-editor-header">
        <div className="fg-editor-header-left">
          <a className="fg-editor-back" href={_pg.all_forms}><FontAwesomeIcon icon={faArrowLeft} /> {__( 'Back', 'formglut' )}</a>
          <input className="fg-editor-title-input" value={formTitle} onChange={(e) => { setFormTitle(e.target.value); setIsDirty(true); }} placeholder={__( 'Enter form title...', 'formglut' )} />
        </div>
        <div className="fg-editor-header-center">
          <button className="fg-editor-tab active">{__( 'Editor', 'formglut' )}</button>
          <a className="fg-editor-tab" href={_pg.settings}>{__( 'Settings', 'formglut' )}</a>
          <a className="fg-editor-tab" href={_pg.entries}>{__( 'Entries', 'formglut' )}</a>
        </div>
        <div className="fg-editor-header-right">
          <Tooltip title={__( 'Undo', 'formglut' )}><Button icon={<FontAwesomeIcon icon={faRotateLeft} />} size="small" type="text" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={undo} disabled={historyIdx <= 0} /></Tooltip>
          <Tooltip title={__( 'Redo', 'formglut' )}><Button icon={<FontAwesomeIcon icon={faRotateRight} />} size="small" type="text" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={redo} disabled={historyIdx >= history.length - 1} /></Tooltip>
          <Button icon={<FontAwesomeIcon icon={faEye} />} style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)', borderRadius: 8 }} onClick={() => { if (formId) { window.open(_pg.preview + '&form_id=' + formId, '_blank'); } else { message.warning(__( 'Save the form first to preview.', 'formglut' )); } }}>{__( 'Preview', 'formglut' )}</Button>
          <Tooltip title={formId ? `[formglut id="${formId}"]` : __( 'Save the form first to get shortcode.', 'formglut' )}>
            <Button icon={<FontAwesomeIcon icon={faCode} />} style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)', borderRadius: 8 }} disabled={!formId} onClick={() => { const shortcode = `[formglut id="${formId}"]`; copyToClipboard(shortcode).then(() => message.success(__( 'Shortcode copied!', 'formglut' ))).catch(() => message.error(__( 'Failed to copy shortcode.', 'formglut' ))); }}>
              {__( 'Shortcode', 'formglut' )}
            </Button>
          </Tooltip>
          <Button icon={<FontAwesomeIcon icon={faFloppyDisk} />} type="primary" loading={saving} onClick={handleSave} style={{ background: '#e94560', borderColor: '#e94560', borderRadius: 8, fontWeight: 600 }}>
            {isDirty ? __( 'Save Form *', 'formglut' ) : __( 'Save Form', 'formglut' )}
          </Button>
        </div>
      </header>

      <div className="fg-editor-body">
        <div className="fg-sidebar">
          <Tabs activeKey={activeTab} onChange={setActiveTab} centered items={[
            { key: 'addFields', label: __( 'Add Fields', 'formglut' ), children: <AddFieldsTab onAddField={addField} /> },
            { key: 'fieldOptions', label: __( 'Field Options', 'formglut' ), children: <FieldOptionsTab field={selectedField} onUpdate={updateFieldProp} submitBtn={submitBtn} onSubBtnUpdate={(u) => { const next = { ...submitBtn, ...u }; setSubmitBtn(next); setIsDirty(true); pushHistory(fields, next); }} selectedSubmit={selectedSubmit} allFields={fields} /> },
            { key: 'styleOptions', label: __( 'Style Options', 'formglut' ), children: <StyleOptionsTab field={selectedField} onUpdate={updateFieldProp} /> },
          ]} />
        </div>

        <div className="fg-canvas-area">
          <div className="fg-canvas-toolbar">
            <div className="fg-device-switcher">
              <button className={"fg-device-btn" + (deviceWidth === '100%' ? ' active' : '')} onClick={() => setDeviceWidth('100%')} title="Desktop">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </button>
              <button className={"fg-device-btn" + (deviceWidth === '640px' ? ' active' : '')} onClick={() => setDeviceWidth('640px')} title="Tablet">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
              </button>
              <button className={"fg-device-btn" + (deviceWidth === '480px' ? ' active' : '')} onClick={() => setDeviceWidth('480px')} title="Mobile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
              </button>
            </div>
            <div className="fg-undo-hint">{fields.length} {fields.length !== 1 ? __( 'fields', 'formglut' ) : __( 'field', 'formglut' )}{isDirty ? ' — ' + __( 'unsaved', 'formglut' ) : ''}</div>
          </div>
          <div className="fg-canvas">
            <div className="fg-canvas-form" style={{ maxWidth: deviceWidth === '100%' ? '900px' : deviceWidth, transition: 'max-width 0.3s ease' }} onClick={() => { setSelectedId(null); setSelectedSubmit(false); }} onDragOver={handleCanvasDragOver} onDrop={handleCanvasDrop} onDragLeave={handleCanvasDragLeave}>
              {fields.length === 0 ? (
                <div className="fg-empty-state" onDragOver={handleEmptyDragOver} onDragLeave={handleEmptyDragLeave} onDrop={handleEmptyDrop}>
                  <span className="fg-empty-state-icon"><FontAwesomeIcon icon={faPlus} /></span>
                  <div className="fg-empty-state-title">{__( 'No fields yet', 'formglut' )}</div>
                  <div className="fg-empty-state-desc">{__( 'Drag fields from the left panel', 'formglut' )}<br/>{__( 'or click a field type to add it', 'formglut' )}</div>
                </div>
              ) : (
                <div>
                  {fields.map((f, idx) => (
                    <React.Fragment key={f.id}>
                      {dropIdx === idx && <div className="fg-drop-indicator visible"><span>{__( 'Drop here', 'formglut' )}</span></div>}
                      <div
                        className={"fg-form-field" + (selectedId === f.id ? ' selected' : '')}
                        onClick={(e) => { e.stopPropagation(); selectField(f.id); }}
                        draggable onDragStart={(e) => handleFieldDragStart(e, idx)}
                        onDragOver={(e) => handleFieldDragOver(e, idx)} onDragLeave={() => {}}
                        onDrop={(e) => handleFieldDrop(e, idx)} onDragEnd={handleFieldDragEnd}
                      >
                        <div className="fg-field-toolbar">
                          <Tooltip title={__( 'Move up', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); moveField(f.id, -1); }} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.3 : 1 }}><FontAwesomeIcon icon={faArrowUp} /></button></Tooltip>
                          <Tooltip title={__( 'Move down', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); moveField(f.id, 1); }} disabled={idx === fields.length - 1} style={{ opacity: idx === fields.length - 1 ? 0.3 : 1 }}><FontAwesomeIcon icon={faArrowDown} /></button></Tooltip>
                          <div className="toolbar-sep"></div>
                          <Tooltip title={__( 'Settings', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); selectField(f.id); }}><FontAwesomeIcon icon={faGear} /></button></Tooltip>
                          <Tooltip title={__( 'Style', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); setSelectedId(f.id); setActiveTab('styleOptions'); }}><FontAwesomeIcon icon={faPalette} /></button></Tooltip>
                          <div className="toolbar-sep"></div>
                          <Tooltip title={__( 'Duplicate', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); duplicateField(f.id); }}><FontAwesomeIcon icon={faCopy} /></button></Tooltip>
                          <Tooltip title={__( 'Delete', 'formglut' )} mouseEnterDelay={0.4}><button className="danger" onClick={(e) => { e.stopPropagation(); removeField(f.id); }}><FontAwesomeIcon icon={faTrash} /></button></Tooltip>
                        </div>
                        <FieldTemplate field={f} />
                        <div className="fg-add-between">
                          <div className="fg-add-between-btn" onClick={(e) => { e.stopPropagation(); setActiveTab('addFields'); }}><FontAwesomeIcon icon={faPlus} /></div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  {dropIdx === fields.length && <div className="fg-drop-indicator visible"><span>{__( 'Drop here', 'formglut' )}</span></div>}
                  <div className={"fg-submit-field" + (selectedSubmit ? ' selected' : '')} onClick={(e) => { e.stopPropagation(); selectSubmitBtn(); }}>
                    <div style={submitBtn.alignment !== 'full' ? { textAlign: submitBtn.alignment } : {}}>
                      <Button type="primary" size={submitBtn.size === 'medium' ? 'middle' : submitBtn.size} block={submitBtn.alignment === 'full'} style={{ background: submitBtn.bg_color, borderColor: submitBtn.bg_color, color: submitBtn.text_color, height: submitBtn.height, fontWeight: submitBtn.font_weight, fontSize: submitBtn.font_size, borderRadius: submitBtn.border_radius }}>{submitBtn.text}</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
