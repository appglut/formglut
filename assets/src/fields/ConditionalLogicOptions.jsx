/**
 * Conditional Logic Options Component
 *
 * Renders conditional logic UI similar to Fluent Forms with:
 * - Enable toggle (Yes/No)
 * - Condition Match (Any/All)
 * - Condition rows with Field, Operator, Value selectors
 * - Add/Remove condition buttons
 */

import React, { useState } from 'react';
import { Switch, Select, Input, Button, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'antd';
import { __ } from '@wordpress/i18n';

/**
 * Comparison operators for conditional logic
 */
const CONDITION_OPERATORS = [
  { value: 'is', label: __('Is equal to', 'formglut') },
  { value: 'is_not', label: __('Is not equal to', 'formglut') },
  { value: 'contains', label: __('Contains', 'formglut') },
  { value: 'not_contains', label: __('Does not contain', 'formglut') },
  { value: 'starts_with', label: __('Starts with', 'formglut') },
  { value: 'ends_with', label: __('Ends with', 'formglut') },
  { value: 'greater_than', label: __('Is greater than', 'formglut') },
  { value: 'less_than', label: __('Is less than', 'formglut') },
  { value: 'is_empty', label: __('Is empty', 'formglut') },
  { value: 'is_not_empty', label: __('Is not empty', 'formglut') },
];

/**
 * Conditional Logic Options Component
 *
 * @param {Object} props - Component props
 * @param {Object} props.field - The field object
 * @param {Array} props.allFields - All form fields for reference
 * @param {Function} props.onUpdate - Callback when field is updated
 * @returns {React.ReactNode} The rendered component
 */
export default function ConditionalLogicOptions({ field, allFields = [], onUpdate }) {
  // Get current conditional logic state
  const enabled = field.conditional_logic || false;
  const conditionMatch = field.condition_match || 'any';
  const conditions = field.conditions || [];

  const up = (key, val) => {
    const update = {};
    update[key] = val;
    onUpdate(field.id, update);
  };

  // Get available fields for conditions (exclude current field and non-input fields)
  const availableFields = allFields.filter(f =>
    f.id !== field.id &&
    !['html', 'hidden', 'section_break', 'captcha', 'submit_button'].includes(f.type)
  );

  // Get options for a field (for select/radio/checkbox fields)
  const getFieldOptions = (fieldId) => {
    const f = allFields.find(field => field.id === fieldId);
    if (!f || !['select', 'radio', 'checkbox', 'multiselect'].includes(f.type)) {
      return [];
    }
    return (f.options || []).map(opt => ({
      value: opt.value || opt.label,
      label: opt.label || `Option`
    }));
  };

  // Add a new condition
  const addCondition = () => {
    const newConditions = [
      ...conditions,
      {
        field_id: availableFields[0]?.id || '',
        operator: 'is',
        value: ''
      }
    ];
    up('conditions', newConditions);
  };

  // Remove a condition
  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    up('conditions', newConditions);
  };

  // Update a condition
  const updateCondition = (index, key, value) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [key]: value };
    up('conditions', newConditions);
  };

  return (
    <div className="fg-conditional-logic">
      {/* Enable Conditional Logic Toggle */}
      <div className="fg-prop-field" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="fg-prop-label" style={{ marginBottom: 0 }}>
            {__('Enable Conditional Logic', 'formglut')}
          </span>
          <Tooltip title={__('Show/hide this field based on values of other fields', 'formglut')}>
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{ fontSize: 13, color: '#94a3b8', cursor: 'help' }}
            />
          </Tooltip>
        </div>
        <Switch checked={enabled} onChange={(v) => up('conditional_logic', v)} />
      </div>

      {enabled && (
        <>
          {/* Condition Match */}
          <div className="fg-prop-field" style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span className="fg-prop-label">
                {__('Condition Match', 'formglut')}
              </span>
              <Tooltip title={__('Any: Show field if ANY condition is met. All: Show field if ALL conditions are met.', 'formglut')}>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ fontSize: 13, color: '#94a3b8', cursor: 'help' }}
                />
              </Tooltip>
            </div>
            <Select
              value={conditionMatch}
              onChange={(v) => up('condition_match', v)}
              style={{ width: '100%' }}
              options={[
                { value: 'any', label: __('Any', 'formglut') },
                { value: 'all', label: __('All', 'formglut') },
              ]}
            />
          </div>

          {/* Conditions List */}
          <div className="fg-conditions-list" style={{ marginTop: 12 }}>
            {conditions.length === 0 ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                {__('No conditions added yet. Click "Add Condition" to create one.', 'formglut')}
              </div>
            ) : (
              conditions.map((condition, index) => {
                const selectedField = availableFields.find(f => f.id === condition.field_id);
                const isSelectField = selectedField && ['select', 'radio', 'checkbox', 'multiselect'].includes(selectedField.type);
                const fieldOptions = isSelectField ? getFieldOptions(condition.field_id) : [];

                // For operators that don't need a value
                const noValueNeeded = ['is_empty', 'is_not_empty'].includes(condition.operator);

                return (
                  <div key={index} className="fg-condition-row" style={{
                    marginBottom: 8,
                    padding: '8px',
                    background: '#f8fafc',
                    borderRadius: 6,
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden'
                  }}>
                    {/* First Row: Field and Operator Selectors */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      {/* Field Selector */}
                      <Select
                        size="small"
                        value={condition.field_id}
                        onChange={(v) => updateCondition(index, 'field_id', v)}
                        placeholder={__('Select field', 'formglut')}
                        style={{ flex: 1, minWidth: 0 }}
                        options={availableFields.map(f => ({
                          value: f.id,
                          label: f.admin_label || f.label || f.type
                        }))}
                      />

                      {/* Operator Selector */}
                      <Select
                        size="small"
                        value={condition.operator}
                        onChange={(v) => {
                          updateCondition(index, 'operator', v);
                          // Clear value if switching to no-value operator
                          if (['is_empty', 'is_not_empty'].includes(v)) {
                            updateCondition(index, 'value', '');
                          }
                        }}
                        placeholder={__('Operator', 'formglut')}
                        style={{ flex: 1, minWidth: 0 }}
                        options={CONDITION_OPERATORS}
                      />
                    </div>

                    {/* Second Row: Value Input and Remove Button */}
                    {!noValueNeeded && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {isSelectField ? (
                          <Select
                            size="small"
                            value={condition.value}
                            onChange={(v) => updateCondition(index, 'value', v)}
                            placeholder={__('Select value', 'formglut')}
                            style={{ flex: 1, minWidth: 0 }}
                            options={fieldOptions}
                            allowClear
                          />
                        ) : (
                          <Input
                            size="small"
                            value={condition.value}
                            onChange={(e) => updateCondition(index, 'value', e.target.value)}
                            placeholder={__('Enter value', 'formglut')}
                            style={{ flex: 1, minWidth: 0 }}
                          />
                        )}

                        {/* Remove Button */}
                        <Button
                          size="small"
                          danger
                          type="text"
                          onClick={() => removeCondition(index)}
                          style={{ minWidth: 32, padding: '0 8px', flexShrink: 0 }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    )}

                    {/* Remove button for operators without value */}
                    {noValueNeeded && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          size="small"
                          danger
                          type="text"
                          onClick={() => removeCondition(index)}
                          style={{ minWidth: 32, padding: '0 8px' }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Add Condition Button */}
            {availableFields.length > 0 && (
              <Button
                size="small"
                type="dashed"
                onClick={addCondition}
                style={{ width: '100%', marginTop: 8 }}
                icon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />}
              >
                {__('Add Condition', 'formglut')}
              </Button>
            )}

            {availableFields.length === 0 && (
              <div style={{ padding: '12px', marginTop: 8, background: '#fff7ed', borderRadius: 6, border: '1px solid #fed7aa', fontSize: 12, color: '#c2410c' }}>
                {__('Add other fields to your form first to use conditional logic.', 'formglut')}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
