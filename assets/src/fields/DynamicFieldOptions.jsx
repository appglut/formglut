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
import { Input, InputNumber, Select, Switch, Button, Tooltip, Collapse } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';
import { FIELD_TYPES, COMMON_OPTIONS } from './fieldTypes';
import { getOptionsForFieldType, SECTION_ORDER, SECTION_TITLES } from './SharedOptions';
import ConditionalLogicOptions from './ConditionalLogicOptions';

/**
 * Field-specific options that aren't in SharedOptions yet
 *
 * These options are unique to specific field types and haven't been
 * moved to SharedOptions.jsx yet. Over time, these should be migrated.
 */
const FIELD_SPECIFIC_OPTIONS = {
  // === Length Validation ===
  min_length: { type: 'number', label: 'Min Length', section: 'validation', min: 0, description: 'Minimum number of characters required' },
  max_length: { type: 'number', label: 'Max Length', section: 'validation', min: 1, description: 'Maximum number of characters allowed' },

  // === Size/Dimensions ===
  rows: { type: 'number', label: 'Rows', section: 'general', min: 1, max: 50, description: 'Number of visible text lines for textarea' },
  cols: { type: 'number', label: 'Columns', section: 'general', min: 1, max: 100, description: 'Width of textarea in average character widths' },
  width: { type: 'text', label: 'Width', section: 'style', placeholder: 'e.g., 100%, 300px', description: 'Custom width for the element' },
  height: { type: 'text', label: 'Height', section: 'style', placeholder: 'e.g., 200px', description: 'Custom height for the element' },

  // === CSS Class ===
  css_class: { type: 'text', label: 'CSS Class', section: 'style', placeholder: 'Add CSS class', description: 'Custom CSS class for styling' },

  // === Textarea Specific ===
  resize: {
    type: 'select',
    label: 'Resize Handle',
    section: 'general',
    description: 'Allow users to resize the textarea',
    options: [
      { value: 'vertical', label: 'Vertical Only' },
      { value: 'horizontal', label: 'Horizontal Only' },
      { value: 'both', label: 'Both Directions' },
      { value: 'none', label: 'None' }
    ]
  },

  // === URL Options ===
  url_scheme: {
    type: 'select',
    label: 'URL Scheme',
    section: 'validation',
    description: 'Require a specific URL protocol (http or https)',
    options: [
      { value: 'any', label: 'Any' },
      { value: 'http', label: 'HTTP Only' },
      { value: 'https', label: 'HTTPS Only' }
    ]
  },
  allow_relative: { type: 'switch', label: 'Allow Relative URLs', section: 'validation', description: 'Allow relative URLs like /path/to/page' },
  validate_url: { type: 'switch', label: 'Validate URL Format', section: 'validation', description: 'Ensure the input is a valid URL format' },

  // === Phone Options ===
  phone_format: {
    type: 'select',
    label: 'Phone Format',
    section: 'general',
    description: 'Expected phone number format for validation',
    options: [
      { value: 'international', label: 'International' },
      { value: 'us', label: 'US (###) ###-####' },
      { value: 'uk', label: 'UK #### ######' },
      { value: 'custom', label: 'Custom Format' }
    ]
  },
  custom_format: { type: 'text', label: 'Custom Format', section: 'general', placeholder: '(999) 999-9999', description: 'Custom phone format mask using 9 for digits' },
};

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
  // Get shared options for this field type
  const sharedOptions = getOptionsForFieldType(fieldType);

  // Merge with field-specific options (field-specific take precedence)
  return { ...sharedOptions, ...FIELD_SPECIFIC_OPTIONS };
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

  const defaultProps = fieldTypeConfig.defaultProps || {};
  const applicableKeys = Object.keys(defaultProps);

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
    'label_placement', // In Style Options panel
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
  const commonProps = {
    id: inputId,
    value: value ?? '',
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
export default function DynamicFieldOptions({ field, onUpdate, allFields = [] }) {
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

  // Group options by section
  const optionsBySection = useMemo(() => {
    const sections = {};

    // Get option definitions for this field type
    const optionDefinitions = getOptionDefinitions(field.type);

    applicableKeys.forEach(key => {
      const definition = optionDefinitions[key] || {
        type: typeof field[key] === 'boolean' ? 'switch' : 'text',
        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        section: 'advanced'
      };

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
      <div style={{ marginBottom: 12, padding: '6px 10px', background: '#f8fafc', borderRadius: 6, fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
        {FIELD_TYPES[field.type]?.icon}
        <span style={{ fontWeight: 600 }}>
          {FIELD_TYPES[field.type]?.label || field.type}
        </span>
      </div>

      {/* Special: Options array editor for select/radio/checkbox/multiselect */}
      {['select', 'radio', 'checkbox', 'multiselect'].includes(field.type) && (
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
      {SECTION_ORDER.filter(section => optionsBySection[section] || section === 'conditional').map(section => {
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

        return (
          <div key={section} className="fg-prop-section">
            <div className="fg-prop-section-title">
              {__(SECTION_TITLES[section] || section, 'formglut')}
            </div>
            {optionsBySection[section].map(({ key, definition }) =>
              renderOptionInput(key, definition, field[key], up)
            )}
          </div>
        );
      })}
    </div>
  );
}
