/**
 * Dynamic Field Options Renderer
 *
 * This component dynamically renders field option inputs based on the
 * field type configuration. It uses SharedOptions.jsx for shared option
 * definitions, reducing duplication across 41+ field types.
 *
 * Field-specific options not in SharedOptions can still be defined here.
 */

import React, { useMemo } from 'react';
import { Input, InputNumber, Select, Switch, Button, Tooltip, Collapse, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlus, faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';
import BulkChoices from './BulkChoices';
import { __ } from '@wordpress/i18n';
import { FIELD_TYPES, COMMON_OPTIONS } from './fieldTypes';
import { getOptionsForFieldType, getCommonOptionKeys, COMMON_OPTION_KEYS, FIELD_TYPE_GROUPS, STYLE_GROUPS, getStyleGroups, SECTION_ORDER, SECTION_TITLES } from './SharedOptions';
import ConditionalLogicOptions from './ConditionalLogicOptions';

/**
 * Get option definitions for a specific field type
 *
 * Combines shared options from SharedOptions.jsx with any field-specific
 * options defined in this file.
 *
 * @param {string} fieldType - The field type
 * @returns {Object} Option definitions for this field type
 */
function getOptionDefinitions(fieldType) {
  return getOptionsForFieldType(fieldType);
}

/**
 * Get applicable options for a field type
 *
 * Returns an array of option keys that should be rendered for a given field type,
 * filtering out special keys that shouldn't be edited in the options panel.
 *
 * @param {string} fieldType - The field type
 * @param {Object} field - The field object with current values
 * @returns {Array} Array of option keys to render
 */
function getApplicableOptions(fieldType, field = {}) {
  const fieldTypeConfig = FIELD_TYPES[fieldType];
  if (!fieldTypeConfig) return [];

  // Shared options come from the group registry (SharedOptions.jsx); only options
  // unique to this field type are read from its defaultProps.
  const defaultProps = fieldTypeConfig.defaultProps || {};
  // Types without a group entry (e.g. pro fields) keep the legacy behaviour: every defaultProps key.
  const applicableKeys = FIELD_TYPE_GROUPS[fieldType]
    ? [
        ...getCommonOptionKeys(fieldType),
        ...Object.keys(defaultProps).filter(key => !COMMON_OPTION_KEYS.has(key)),
      ]
    : Object.keys(defaultProps);

  // Filter out special keys that shouldn't be edited in the options panel
  const excludeKeys = [
    'id', 'type', 'options', 'conditions', 'conditional_logic', 'condition_match',
    'columns', 'levels', 'items',
    'images', 'variations', 'plans', 'steps', 'questions', 'pairs',
    'tabs', 'available_items', 'selected_items', 'child_fields',
    'chain_data', 'chain_rules', 'query_args', 'search_fields',
    'filter_fields', 'column_types', 'role_descriptions', 'custom_roles',
    'custom_icons', 'allowed_methods', 'available_methods', 'tax_rates',
    'accepted_cards', 'validation_messages', 'option_groups',
  ];

  return applicableKeys.filter(key => !excludeKeys.includes(key));
}

/**
 * Render label with info icon and tooltip
 *
 * @param {string} label - The option label
 * @param {string} description - The option description for tooltip
 * @param {boolean} inline - Whether this is an inline label (for switch type)
 * @returns {React.ReactNode} The rendered label with tooltip
 */
function renderLabelWithTooltip(label, description, inline = false) {
  if (!description) {
    return inline ? (
      <span className="fg-prop-label" style={{ marginBottom: 0 }}>{label}</span>
    ) : (
      <div className="fg-prop-label">{label}</div>
    );
  }

  const containerStyle = inline ? { marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6 } : { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 };

  return (
    <div style={containerStyle}>
      <span className="fg-prop-label" style={{ marginBottom: 0 }}>{label}</span>
      <Tooltip title={description} placement="top">
        <FontAwesomeIcon
          icon={faCircleInfo}
          style={{
            fontSize: 13,
            color: '#94a3b8',
            cursor: 'help',
            flexShrink: 0,
            marginTop: -1
          }}
        />
      </Tooltip>
    </div>
  );
}

/**
 * Render a single option input
 *
 * @param {string} key - The option key
 * @param {Object} definition - The option definition
 * @param {*} value - The current value
 * @param {Function} onChange - Callback when value changes
 * @returns {React.ReactNode} The rendered input
 */
function renderOptionInput(key, definition, value, onChange) {
  const { type, label, description, options: selectOptions, placeholder, min, max, rows, icon } = definition;

  const inputId = `field-option-${key}`;

  // For select options, use the actual value or the first option's value as fallback
  // This ensures mobile_keyboard_type shows 'default' instead of empty string
  const selectValue = type === 'select' && (value === undefined || value === null)
    ? (selectOptions && selectOptions[0] ? selectOptions[0].value : '')
    : (value ?? '');

  const commonProps = {
    id: inputId,
    value: type === 'select' ? selectValue : (value ?? ''),
    style: { width: '100%' }
  };

  const labelContent = renderLabelWithTooltip(label, description, false);

  // Render different input types
  switch (type) {
    case 'switch':
      return (
        <div key={key} className="fg-prop-field" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          {renderLabelWithTooltip(label, description, true)}
          <Switch checked={!!value} onChange={(v) => onChange(key, v)} />
        </div>
      );

    case 'select':
      return (
        <div key={key} className="fg-prop-field">
          {labelContent}
          <Select
            {...commonProps}
            options={selectOptions || []}
            allowClear={definition.allowClear !== false}
            mode={definition.mode}
            showSearch={!!definition.mode}
            optionFilterProp="label"
            value={definition.mode ? (Array.isArray(value) ? value : []) : commonProps.value}
            onChange={(v) => onChange(key, v)}
          />
        </div>
      );

    case 'number':
      // Handle value display: show number or empty string
      const displayValue = (value !== undefined && value !== '' && !isNaN(Number(value))) ? Number(value) : '';
      return (
        <div key={key} className="fg-prop-field">
          {labelContent}
          <Input
            id={inputId}
            type="number"
            value={displayValue}
            min={min !== undefined ? Number(min) : undefined}
            max={max !== undefined ? Number(max) : undefined}
            placeholder={placeholder}
            autoComplete="off"
            onChange={(e) => {
              const val = e.target.value;
              // Handle empty input
              if (val === '' || val === null || val === undefined) {
                onChange(key, '');
                return;
              }
              // Validate and save number
              const num = Number(val);
              if (isNaN(num)) {
                onChange(key, '');
              } else if (min !== undefined && num < min) {
                onChange(key, min);
              } else if (max !== undefined && num > max) {
                onChange(key, max);
              } else {
                onChange(key, num);
              }
            }}
          />
        </div>
      );

    case 'color':
      return (
        <div key={key} className="fg-prop-field">
          {labelContent}
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(key, e.target.value)}
              style={{ width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 }}
            />
            <Input
              value={value || ''}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder="#000000"
              style={{ flex: 1 }}
            />
          </div>
        </div>
      );

    case 'textarea':
      return (
        <div key={key} className="fg-prop-field">
          {labelContent}
          <Input.TextArea
            {...commonProps}
            onChange={(e) => onChange(key, e.target.value)}
            rows={rows || 3}
            placeholder={placeholder}
          />
        </div>
      );

    default: // 'text'
      return (
        <div key={key} className="fg-prop-field">
          {labelContent}
          <Input {...commonProps} onChange={(e) => onChange(key, e.target.value)} placeholder={placeholder} />
        </div>
      );
  }
}

/**
 * Dynamic Field Options Component
 *
 * Main component that renders the field options panel in the sidebar.
 * Shows different options based on the selected field type.
 *
 * @param {Object} props - Component props
 * @param {Object} props.field - The field object
 * @param {Function} props.onUpdate - Callback when field is updated
 * @param {Array} props.allFields - All form fields (for conditional logic)
 * @returns {React.ReactNode} The rendered component
 */
export default function DynamicFieldOptions({ field, onUpdate, allFields = [], styleOnly = false }) {
  // Keys the Style Options tab already renders itself for this field type (see STYLE_GROUPS).
  const STYLE_TAB_HANDLED_KEYS = getStyleGroups(field.type).flatMap(name => STYLE_GROUPS[name]);
  if (!field) {
    return (
      <div className="fg-prop-no-selection">
        <div className="fg-prop-no-selection-icon">
          <FontAwesomeIcon icon={faCircleInfo} />
        </div>
        <div className="fg-prop-no-selection-text">
          {__('Select a field', 'formglut')}<br/>
          {__('to edit its options', 'formglut')}
        </div>
      </div>
    );
  }

  const up = (key, val) => {
    const update = {};
    update[key] = val;
    onUpdate(field.id, update);
  };

  // Get applicable options for this field type
  const applicableKeys = useMemo(() => {
    return getApplicableOptions(field.type, field);
  }, [field.type]);

  // Mask-related option keys that should only show when enable_mask is true
  const MASK_OPTION_KEYS = [
    'mask_pattern',
    'custom_mask',
    'reversible_mask',
    'clear_on_invalid',
  ];

  // Email confirmation option keys that should only show when confirm_email is true
  const EMAIL_CONFIRMATION_KEYS = [
    'confirm_label',
    'confirm_placeholder',
    'confirm_error_message',
  ];

  // Unique error message option key that should only show when validate_unique is true
  const UNIQUE_ERROR_KEYS = [
    'unique_error_message',
  ];

  // Group options by section
  const optionsBySection = useMemo(() => {
    const sections = {};

    // Get option definitions for this field type
    const optionDefinitions = getOptionDefinitions(field.type);

    applicableKeys.forEach(key => {
      // Skip mask options if enable_mask is not enabled
      if (MASK_OPTION_KEYS.includes(key) && !field.enable_mask && field.type !== 'masked_input') {
        return;
      }

      // Skip email confirmation options if confirm_email is not enabled
      if (EMAIL_CONFIRMATION_KEYS.includes(key) && !field.confirm_email) {
        return;
      }

      // Skip unique error message if validate_unique is not enabled
      if (UNIQUE_ERROR_KEYS.includes(key) && !field.validate_unique) {
        return;
      }

      const definition = optionDefinitions[key] || {
        type: typeof field[key] === 'boolean' ? 'switch' : 'text',
        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        section: 'advanced'
      };

      // Options that only make sense when another switch is on (definition.showWhen = that key).
      if (definition.showWhen && (!field[definition.showWhen] || (definition.showValue && field[definition.showWhen] !== definition.showValue))) {
        return;
      }

      const section = definition.section || 'general';
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push({ key, definition });
    });

    return sections;
  }, [applicableKeys, field, field.type]);

  return (
    <div>
      {/* Type badge */}
      {!styleOnly && (
      <div style={{ marginBottom: 12, padding: '6px 10px', background: '#f8fafc', borderRadius: 6, fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
        {FIELD_TYPES[field.type]?.icon}
        <span style={{ fontWeight: 600 }}>
          {FIELD_TYPES[field.type]?.label || field.type}
        </span>
        {field.id && (
          <Tooltip title={__( 'Copy the tag for this field’s value, for emails and messages', 'formglut' )}>
            <button type="button" className="fg-field-id" onClick={() => {
              const tag = '{field:' + field.id + '}';
              if (navigator.clipboard?.writeText) navigator.clipboard.writeText(tag).then(() => message.success(__( 'Copied', 'formglut' ) + ' ' + tag)).catch(() => {});
            }}>
              {__( 'ID', 'formglut' )} <code>{field.id}</code> <FontAwesomeIcon icon={faCopy} />
            </button>
          </Tooltip>
        )}
      </div>
      )}

      {/* Special: Options array editor for select/radio/checkbox/multiselect */}
      {!styleOnly && ['select', 'radio', 'checkbox', 'multiselect'].includes(field.type) && (
        <div className="fg-prop-section">
          <div className="fg-prop-section-title">
            {__('Choice Options', 'formglut')}
          </div>
          <div className="fg-prop-field">
            <div className="fg-prop-label">{__('Options', 'formglut')}</div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: 8 }}>
              {(field.options || []).map((opt, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#94a3b8', minWidth: 20, textAlign: 'center' }}>{idx + 1}.</span>
                  <Input
                    size="small"
                    value={opt.label || ''}
                    placeholder={__('Label', 'formglut')}
                    onChange={(e) => {
                      const newOpts = [...(field.options || [])];
                      newOpts[idx] = { ...newOpts[idx], label: e.target.value };
                      if (!newOpts[idx].value) newOpts[idx].value = e.target.value.toLowerCase().replace(/\s+/g, '_');
                      up('options', newOpts);
                    }}
                    style={{ flex: 2 }}
                  />
                  <Input
                    size="small"
                    value={opt.value || ''}
                    placeholder={__('Value', 'formglut')}
                    onChange={(e) => {
                      const newOpts = [...(field.options || [])];
                      newOpts[idx] = { ...newOpts[idx], value: e.target.value };
                      up('options', newOpts);
                    }}
                    style={{ flex: 1 }}
                  />
                  {field.show_calc_values && (
                    <Input
                      size="small"
                      value={opt.calc_value ?? ''}
                      placeholder={__('Calc', 'formglut')}
                      title={__('Number used by Calculation fields', 'formglut')}
                      onChange={(e) => {
                        const newOpts = [...(field.options || [])];
                        newOpts[idx] = { ...newOpts[idx], calc_value: e.target.value.replace(/[^0-9.\-]/g, '') };
                        up('options', newOpts);
                      }}
                      style={{ width: 64, flex: 'none' }}
                    />
                  )}
                  <Button
                    size="small"
                    danger
                    type="text"
                    disabled={(field.options || []).length <= 1}
                    onClick={() => {
                      const newOpts = (field.options || []).filter((_, i) => i !== idx);
                      up('options', newOpts);
                    }}
                    style={{ minWidth: 32, padding: '0 8px' }}
                  >×</Button>
                </div>
              ))}
              <Button
                size="small"
                type="dashed"
                onClick={() => {
                  const newOpts = [...(field.options || []), { label: `Option ${(field.options || []).length + 1}`, value: `option${(field.options || []).length + 1}` }];
                  up('options', newOpts);
                }}
                style={{ width: '100%', marginTop: 6 }}
              >+ {__('Add Option', 'formglut')}</Button>
              <BulkChoices options={field.options || []} onApply={(opts) => up('options', opts)} />
              <label className="fg-calc-toggle">
                <Switch size="small" checked={!!field.show_calc_values} onChange={(v) => up('show_calc_values', v)} />
                <span>{__('Calculation values', 'formglut')}</span>
                <Tooltip title={__('Give each choice a number to use in Calculation fields (for example a price).', 'formglut')}><FontAwesomeIcon icon={faCircleInfo} style={{ color: '#94a3b8', fontSize: 12 }} /></Tooltip>
              </label>
            </div>
          </div>

          {/* Select-specific: default selected */}
          {field.type === 'select' && (
            <div className="fg-prop-field">
              <div className="fg-prop-label">{__('Default Selected', 'formglut')}</div>
              <Select
                value={field.default_value || ''}
                onChange={(v) => up('default_value', v)}
                style={{ width: '100%' }}
                allowClear
                options={[
                  { value: '', label: __('None', 'formglut') },
                  ...(field.options || []).map((opt, i) => ({ value: opt.value || opt.label, label: opt.label || `Option ${i + 1}` }))
                ]}
              />
            </div>
          )}

          {/* Multiselect-specific: default selected values */}
          {field.type === 'multiselect' && (
            <div className="fg-prop-field">
              <div className="fg-prop-label">{__('Default Selected', 'formglut')}</div>
              <Select
                mode="multiple"
                value={field.default_value || []}
                onChange={(v) => up('default_value', v)}
                style={{ width: '100%' }}
                allowClear
                placeholder={__('Select default options...', 'formglut')}
                options={(field.options || []).map((opt, i) => ({ value: opt.value || opt.label, label: opt.label || `Option ${i + 1}` }))}
              />
            </div>
          )}
        </div>
      )}

      {/* Render sections */}
      {SECTION_ORDER.filter(section => styleOnly ? section === 'style' : section !== 'style').filter(section => optionsBySection[section] || section === 'conditional').map(section => {
        // Special handling for conditional logic section
        if (section === 'conditional') {
          return (
            <div key={section} className="fg-prop-section">
              <div className="fg-prop-section-title">
                {__(SECTION_TITLES[section] || section, 'formglut')}
              </div>
              <ConditionalLogicOptions
                field={field}
                allFields={allFields}
                onUpdate={onUpdate}
              />
            </div>
          );
        }

        // Regular sections - skip if no options
        if (!optionsBySection[section]) return null;
        if (styleOnly && optionsBySection[section].every(({ key }) => STYLE_TAB_HANDLED_KEYS.includes(key))) return null;

        return (
          <div key={section} className="fg-prop-section">
            <div className="fg-prop-section-title">
              {styleOnly ? __('Additional Style', 'formglut') : __(SECTION_TITLES[section] || section, 'formglut')}
            </div>
            {optionsBySection[section]
              .filter(({ key }) => !(styleOnly && STYLE_TAB_HANDLED_KEYS.includes(key)))
              .map(({ key, definition }) =>
                renderOptionInput(key, definition, field[key], up)
              )}
          </div>
        );
      })}
    </div>
  );
}
