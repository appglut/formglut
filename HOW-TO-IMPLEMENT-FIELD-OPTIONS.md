# How to Implement Field Options - Developer Guide

This guide explains **how** field options are implemented in FormGlut with actual code examples, patterns, and step-by-step procedures. Use this to implement new fields or add options to existing fields.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Implementation Layers](#implementation-layers)
3. [How to Add a New Field Type](#how-to-add-a-new-field-type)
4. [How to Add Options to Existing Fields](#how-to-add-options-to-existing-fields)
5. [Common Implementation Patterns](#common-implementation-patterns)
6. [Code Examples](#code-examples)
7. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FIELD OPTIONS SYSTEM                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  LAYER 1: DEFINITION (SharedOptions.jsx)                      │ │
│  │  - Option metadata (type, label, section, description)        │ │
│  │  - Option values (for selects, radio, etc.)                    │ │
│  │  - Field type to options mapping                               │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                   │                                  │
│                                   ▼                                  │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  LAYER 2: UI (DynamicFieldOptions.jsx)                        │ │
│  │  - Renders inputs in admin panel                               │ │
│  │  - Auto-detects option type                                    │ │
│  │  - Handles conditional rendering                               │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                   │                                  │
│                                   ▼                                  │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  LAYER 3: PREVIEW (FormEditor.jsx)                            │ │
│  │  - Renders fields in form builder canvas                       │ │
│  │  - Applies styles and classes                                  │ │
│  │  - Shows field behaviors (mask, RTL, etc.)                     │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                   │                                  │
│                                   ▼                                  │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  LAYER 4: FRONTEND (shortcode output)                          │ │
│  │  - Renders fields in actual forms                              │ │
│  │  - Mirrors preview implementation                              │ │
│  │  - Handles form submission                                     │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                   │                                  │
│                                   ▼                                  │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  LAYER 5: BACKEND (PHP validation)                             │ │
│  │  - Validates submitted data                                    │ │
│  │  - Returns error messages                                      │ │
│  │  - Saves to database                                            │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Layers

### Layer 1: Definition (SharedOptions.jsx)

**Purpose:** Define what options exist for each field type.

**Pattern:**
```javascript
// In SharedOptions.jsx

export const FIELD_TYPE_OPTIONS = {
  label: {
    type: 'text',           // Input type: text, textarea, select, switch, number, color
    label: 'Element Label',  // Display label in admin panel
    section: 'general',     // Section: general, validation, style, advanced, conditional
    description: 'The label displayed above the field', // Tooltip help text
    // Optional properties:
    // options: [...]         // For select types
    // placeholder: '...'    // For text inputs
    // min: 0, max: 100      // For number inputs
    // rows: 3               // For textarea
  },
};
```

**Option Types:**
- `text` - Single-line text input
- `textarea` - Multi-line text input
- `select` - Dropdown selection
- `switch` - Toggle switch (boolean)
- `number` - Number input with min/max
- `color` - Color picker with hex input

**Sections:**
- `general` - Basic field settings
- `validation` - Validation rules and messages
- `style` - CSS styling options
- `advanced` - Advanced settings (name attribute, etc.)
- `conditional` - Conditional logic rules

**Section Order:**
```javascript
export const SECTION_ORDER = [
  'general',      // Shows first
  'validation',   // Shows second
  'style',        // Shows third
  'advanced',     // Shows fourth
  'conditional',  // Shows last
];
```

### Layer 2: UI (DynamicFieldOptions.jsx)

**Purpose:** Render the option inputs in the admin panel.

**Pattern:**
```jsx
// In DynamicFieldOptions.jsx

export default function DynamicFieldOptions({ field, onUpdate }) {
  const up = (key, val) => {
    onUpdate(field.id, { [key]: val });
  };

  // Get applicable options for this field type
  const optionDefinitions = getOptionDefinitions(field.type);

  return (
    <div>
      {/* Render each option based on its type */}
      {optionDefinitions.map(({ key, definition }) => (
        renderOptionInput(key, definition, field[key], up)
      ))}
    </div>
  );
}
```

**Auto-Rendering:**
The `renderOptionInput` function automatically renders the appropriate input based on `definition.type`:

```jsx
function renderOptionInput(key, definition, value, onChange) {
  const { type, label, description, options, placeholder, min, max, rows } = definition;

  switch (type) {
    case 'switch':
      return (
        <div key={key} className="fg-prop-field">
          <span>{label}</span>
          <Switch checked={!!value} onChange={(v) => onChange(key, v)} />
        </div>
      );

    case 'select':
      return (
        <div key={key} className="fg-prop-field">
          <div className="fg-prop-label">{label}</div>
          <Select
            value={value}
            onChange={(v) => onChange(key, v)}
            options={options}
          />
        </div>
      );

    case 'number':
      return (
        <div key={key} className="fg-prop-field">
          <div className="fg-prop-label">{label}</div>
          <Input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(e) => onChange(key, Number(e.target.value))}
          />
        </div>
      );

    case 'textarea':
      return (
        <div key={key} className="fg-prop-field">
          <div className="fg-prop-label">{label}</div>
          <Input.TextArea
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            rows={rows || 3}
          />
        </div>
      );

    default: // 'text'
      return (
        <div key={key} className="fg-prop-field">
          <div className="fg-prop-label">{label}</div>
          <Input
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            placeholder={placeholder}
          />
        </div>
      );
  }
}
```

**Conditional Rendering:**
To show options only when certain conditions are met:

```jsx
{/* Show RTL option only for textarea */}
{field.type === 'textarea' && (
  <div className="fg-prop-section">
    <div className="fg-prop-section-title">Text Direction</div>
    {renderOptionInput('enable_rtl', definition, field.enable_rtl, up)}
  </div>
)}

{/* Show custom mask input only when enable_mask is true */}
{field.enable_mask && (
  renderOptionInput('custom_mask', definition, field.custom_mask, up)
)}
```

### Layer 3: Preview (FormEditor.jsx)

**Purpose:** Render the field in the form builder canvas.

**Pattern:**
```jsx
function FieldTemplate({ field: f }) {
  // Parse custom CSS styles
  const labelCustomStyle = parseCss(f.label_style);
  const inputCustomStyle = parseCss(f.input_style);
  const helpTextCustomStyle = parseCss(f.help_text_style);
  const containerCustomStyle = parseCss(f.container_style);

  // Build input style object
  const inputStyle = {
    background: f.bg_color || '#fafbfc',
    color: f.text_color || '#94a3b8',
    borderColor: f.border_color || '#e2e8f0',
    borderRadius: (f.border_radius ?? 8) + 'px',
    padding: `${f.padding_top ?? 10}px ${f.padding_right ?? 14}px ...`,
    ...inputCustomStyle,  // Merge parsed CSS
  };

  // Get field name (use custom or fallback to ID)
  const fieldName = f.name_attribute || f.id;

  // Render the field
  return (
    <div
      className={`fg-field-wrapper ${f.container_class || ''}`}
      style={containerCustomStyle}
    >
      {/* Label */}
      <label className="fg-form-field-label" style={labelCustomStyle}>
        {f.admin_label || f.label}
        {f.required && <span className="required">*</span>}
      </label>

      {/* Input */}
      <input
        className={`fg-form-field-input ${f.element_class || ''}`}
        name={fieldName}
        type="text"
        placeholder={f.placeholder}
        defaultValue={f.default_value}
        maxLength={f.character_limit}
        inputMode={getInputMode(f.mobile_keyboard_type)}
        style={inputStyle}
      />

      {/* Help Text */}
      {f.help_text && (
        <div className="fg-help-text" style={helpTextCustomStyle}>
          {f.help_text}
        </div>
      )}
    </div>
  );
}
```

**CSS Parser Helper:**
```jsx
/**
 * Parse CSS string into style object
 * Handles: "color: red; font-size: 14px; background: #fff;"
 */
function parseCss(cssString) {
  if (!cssString || typeof cssString !== 'string') return {};
  
  const styles = {};
  cssString.split(';').forEach(rule => {
    const [property, ...valueParts] = rule.split(':');
    const value = valueParts.join(':').trim();
    const prop = property?.trim();
    
    if (prop && value) {
      // Convert CSS property to JS style property
      // "font-size" → "fontSize", "background-color" → "backgroundColor"
      const jsProp = prop.replace(/-([a-z])/g, (_, letter) => 
        letter.toUpperCase()
      );
      styles[jsProp] = value;
    }
  });
  
  return styles;
}
```

**Placeholder Styles (Special Case):**
Since `::placeholder` cannot be set via inline styles, inject a `<style>` tag:

```jsx
function PlaceholderStylesInjector({ fieldId, placeholderStyle }) {
  useEffect(() => {
    if (!placeholderStyle) return;
    
    const styleId = `fg-placeholder-styles-${fieldId}`;
    
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = `
      .fg-field-${fieldId}::placeholder,
      .fg-field-${fieldId} ::placeholder {
        ${placeholderStyle}
      }
    `;
    
    document.head.appendChild(styleElement);
    
    // Cleanup on unmount
    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
    };
  }, [fieldId, placeholderStyle]);

  return null;
}
```

### Layer 4: Frontend (Shortcode Output)

**Purpose:** Render the field in actual forms on the frontend.

**Pattern:** (To be implemented - mirrors preview layer)

```php
<?php
// In class-formglut-shortcode.php

function render_field($field) {
    // Parse CSS styles
    $label_style = $this->parse_css($field['label_style'] ?? '');
    $input_style = $this->parse_css($field['input_style'] ?? '');
    
    // Build input attributes
    $atts = array(
        'name' => $field['name_attribute'] ?? $field['id'],
        'type' => $this->get_input_type($field['type']),
        'placeholder' => $field['placeholder'] ?? '',
        'value' => $field['default_value'] ?? '',
        'class' => 'fg-form-field-input ' . ($field['element_class'] ?? ''),
        'style' => $input_style,
        'maxlength' => $field['character_limit'] ?? '',
        'required' => $field['required'] ? 'required' : '',
    );
    
    // Output HTML
    ob_start();
    ?>
    <div class="fg-field-wrapper <?php echo esc_attr($field['container_class'] ?? ''); ?>">
        <label class="fg-form-field-label" style="<?php echo esc_attr($label_style); ?>">
            <?php echo esc_html($field['admin_label'] ?? $field['label']); ?>
            <?php if ($field['required']): ?>
                <span class="required">*</span>
            <?php endif; ?>
        </label>
        
        <input <?php echo $this->build_attributes($atts); ?> />
        
        <?php if (!empty($field['help_text'])): ?>
            <div class="fg-help-text">
                <?php echo esc_html($field['help_text']); ?>
            </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
```

### Layer 5: Backend (PHP Validation)

**Purpose:** Validate submitted data on the server.

**Pattern:**
```php
<?php
// In class-formglut-ajax.php

public function validate_form_submission($form_id, $data) {
    $form = $this->get_form($form_id);
    $errors = array();
    
    foreach ($form['fields'] as $field) {
        $value = $data[$field['id']] ?? '';
        $field_errors = $this->validate_field($field, $value, $data);
        
        if (!empty($field_errors)) {
            $errors[$field['id']] = $field_errors;
        }
    }
    
    if (!empty($errors)) {
        return new WP_Error('validation_failed', 'Validation failed', $errors);
    }
    
    return true;
}

private function validate_field($field, $value, $form_data) {
    $errors = array();
    
    // Required validation
    if (!empty($field['required']) && empty($value)) {
        $errors[] = $field['validation_message'] ?? 'This field is required';
        return $errors; // Skip other validations if required fails
    }
    
    // Type-specific validation
    switch ($field['type']) {
        case 'email':
            $errors = array_merge($errors, $this->validate_email($field, $value, $form_data));
            break;
        case 'text':
            $errors = array_merge($errors, $this->validate_text($field, $value));
            break;
        case 'textarea':
            $errors = array_merge($errors, $this->validate_textarea($field, $value));
            break;
        // ... other types
    }
    
    return $errors;
}

private function validate_email($field, $value, $form_data) {
    $errors = array();
    
    // Email format
    if (!empty($value) && !is_email($value)) {
        $errors[] = 'Please enter a valid email address';
    }
    
    // Email confirmation
    if (!empty($field['confirm_email'])) {
        $primary = $value;
        $confirm = $form_data[$field['id'] . '_confirm'] ?? '';
        
        if ($primary !== $confirm) {
            $errors[] = $field['confirm_error_message'] ?? 'Emails do not match';
        }
    }
    
    // Unique validation
    if (!empty($field['validate_unique'])) {
        $existing = $this->check_duplicate_value($field['id'], $value);
        if ($existing) {
            $errors[] = $field['unique_error_message'] ?? 'This email already exists';
        }
    }
    
    return $errors;
}

private function validate_text($field, $value) {
    $errors = array();
    
    // Character limit
    $char_limit = !empty($field['character_limit']) ? (int)$field['character_limit'] : 0;
    if ($char_limit > 0 && strlen($value) > $char_limit) {
        $errors[] = sprintf('Maximum %d characters allowed', $char_limit);
    }
    
    // Min/max value validation
    if (!empty($field['validation_type']) && $field['validation_type'] === 'numeric') {
        if (!is_numeric($value)) {
            $errors[] = 'Please enter a numeric value';
        } else {
            if (!empty($field['min_value']) && $value < $field['min_value']) {
                $errors[] = sprintf('Minimum value is %s', $field['min_value']);
            }
            if (!empty($field['max_value']) && $value > $field['max_value']) {
                $errors[] = sprintf('Maximum value is %s', $field['max_value']);
            }
        }
    }
    
    // Pattern validation
    if (!empty($field['validation_pattern'])) {
        if (!preg_match('/' . $field['validation_pattern'] . '/', $value)) {
            $errors[] = $field['validation_message'] ?? 'Invalid format';
        }
    }
    
    // Unique validation
    if (!empty($field['validate_unique'])) {
        $existing = $this->check_duplicate_value($field['id'], $value);
        if ($existing) {
            $errors[] = $field['unique_error_message'] ?? 'This value already exists';
        }
    }
    
    return $errors;
}

private function check_duplicate_value($field_id, $value) {
    global $wpdb;
    $table = $wpdb->prefix . 'formglut_entry_values';
    
    return $wpdb->get_var($wpdb->prepare(
        "SELECT entry_id FROM $table WHERE field_id = %s AND field_value = %s LIMIT 1",
        $field_id,
        $value
    ));
}
```

---

## How to Add a New Field Type

### Step 1: Define Field in fieldTypes.jsx

```javascript
// In fieldTypes.jsx

const FIELD_TYPES = {
  // ... existing fields

  my_new_field: {
    label: 'My New Field',
    icon: <FontAwesomeIcon icon={faIcon} />,
    category: 'general',  // or 'advanced', 'layout', 'payment', 'security'
    coming_soon: false,   // Set to false when ready to use
    defaultProps: {
      // === Label Options ===
      label: 'My Field',
      label_placement: 'top',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Enter value...',
      default_value: '',

      // === Validation ===
      required: false,
      validation_message: 'Please enter a valid value',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help ===
      help_text: '',
      help_text_position: 'below',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any',
      conditions: [],

      // === Custom Options (field-specific) ===
      my_custom_option: 'default_value',
    },
  },
};
```

### Step 2: Define Options in SharedOptions.jsx

```javascript
// In SharedOptions.jsx

export const MY_FIELD_OPTIONS = {
  ...UNIVERSAL_OPTIONS,

  // === Field-Specific Options ===
  my_custom_option: {
    type: 'select',
    label: 'My Custom Option',
    section: 'general',
    description: 'This is a custom option for my field',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },

  // === Style Options ===
  label_style: {
    type: 'textarea',
    label: 'Label Style',
    section: 'style',
    description: 'Custom CSS for the label',
    rows: 2,
  },

  input_style: {
    type: 'textarea',
    label: 'Input Style',
    section: 'style',
    description: 'Custom CSS for the input',
    rows: 3,
  },

  // ... more style options
};

// Add to field type mapping
const FIELD_TYPE_OPTIONS_MAP = {
  // ... existing mappings
  my_new_field: MY_FIELD_OPTIONS,
};
```

### Step 3: Add Preview Rendering in FormEditor.jsx

```javascript
// In FormEditor.jsx, inside FieldTemplate function

function FieldTemplate({ field: f }) {
  // ... existing code

  // === MY CUSTOM FIELD ===
  if (f.type === 'my_new_field') {
    return (
      <div className={`fg-field-wrapper ${f.container_class || ''}`} style={containerCustomStyle}>
        {/* Label */}
        {label}

        {/* Input */}
        <div className="fg-input-group">
          {f.prefix_label && <span className="fg-input-prefix">...</span>}
          
          <input
            className={`fg-form-field-input ${f.element_class || ''}`}
            name={fieldName}
            type="text"
            placeholder={f.placeholder}
            defaultValue={f.default_value}
            style={inputStyle}
          />
          
          {f.suffix_label && <span className="fg-input-suffix">...</span>}
        </div>

        {/* Help Text */}
        {showHelpBelow && helpTextContent}

        {/* Custom behavior based on my_custom_option */}
        {f.my_custom_option === 'option1' && (
          <div className="fg-custom-message">
            Special message for Option 1
          </div>
        )}
      </div>
    );
  }

  // ... rest of function
}
```

### Step 4: Add Frontend Rendering

Implement the field rendering in the shortcode output (similar to preview).

### Step 5: Add Backend Validation

Add validation rules for your field in the PHP backend.

---

## How to Add Options to Existing Fields

### Example: Adding a "Read Only" Option

#### Step 1: Add to SharedOptions.jsx

```javascript
// In UNIVERSAL_OPTIONS or field-specific options

read_only: {
  type: 'switch',
  label: 'Read Only',
  section: 'advanced',
  description: 'Prevent users from editing this field',
},
```

#### Step 2: Add to fieldTypes.jsx defaultProps

```javascript
// In the field's defaultProps

read_only: false,
```

#### Step 3: Update Preview in FormEditor.jsx

```javascript
// In the input element
<input
  // ... other props
  readOnly={f.read_only}
/>
```

#### Step 4: Update Frontend Rendering

Add `readonly` attribute in PHP rendering.

#### Step 5: Backend (if needed)

If read-only affects validation, update the validation logic.

---

## Common Implementation Patterns

### Pattern 1: Boolean Options with Conditional Rendering

Use a boolean switch to show/hide other options:

```jsx
// In DynamicFieldOptions.jsx
{field.enable_mask && (
  <>
    {renderOptionInput('mask_pattern', ..., field.mask_pattern, up)}
    {renderOptionInput('custom_mask', ..., field.custom_mask, up)}
  </>
)}
```

### Pattern 2: Select with Dependent Options

```javascript
// In SharedOptions.jsx
mask_pattern: {
  type: 'select',
  label: 'Mask Pattern',
  options: [
    { value: '', label: 'None' },
    { value: 'phone', label: 'Phone Number' },
    { value: 'custom', label: 'Custom Pattern' },
  ],
},

// In DynamicFieldOptions.jsx
{field.mask_pattern === 'custom' && (
  renderOptionInput('custom_mask', ..., field.custom_mask, up)
)}
```

### Pattern 3: Array Options (like field choices)

For options that have multiple values (dropdown options, checkbox choices):

```jsx
// In DynamicFieldOptions.jsx - Render array editor
<div className="fg-options-editor">
  {(field.options || []).map((opt, idx) => (
    <div key={idx} className="fg-option-row">
      <Input
        value={opt.label}
        onChange={(e) => {
          const newOpts = [...field.options];
          newOpts[idx] = { ...newOpts[idx], label: e.target.value };
          up('options', newOpts);
        }}
      />
      <Button onClick={() => {
        const newOpts = field.options.filter((_, i) => i !== idx);
        up('options', newOpts);
      }}>×</Button>
    </div>
  ))}
  <Button onClick={() => {
    const newOpts = [...(field.options || []), { label: 'New Option', value: '' }];
    up('options', newOpts);
  }}>+ Add Option</Button>
</div>
```

### Pattern 4: Style Options (CSS Input)

All style options use the same pattern:

```javascript
// In SharedOptions.jsx
label_style: {
  type: 'textarea',
  label: 'Label Style',
  section: 'style',
  description: 'Custom CSS (e.g., color: red; font-weight: bold;)',
  rows: 2,
},
```

```jsx
// In FormEditor.jsx
const labelStyle = {
  // ... existing styles
  ...parseCss(f.label_style),
};
```

### Pattern 5: Prefix/Suffix Labels

```jsx
// In FormEditor.jsx
<div className="fg-input-group">
  {f.prefix_label && (
    <span className="fg-input-prefix" style={prefixSuffixStyle}>
      {f.prefix_label}
    </span>
  )}
  
  <input ... />
  
  {f.suffix_label && (
    <span className="fg-input-suffix" style={prefixSuffixStyle}>
      {f.suffix_label}
    </span>
  )}
</div>
```

### Pattern 6: Help Message Positioning

```jsx
// In FormEditor.jsx
const showHelpTip = f.help_text && f.help_text_position === 'tooltip';
const showHelpAbove = f.help_text && f.help_text_position === 'above';
const showHelpBelow = f.help_text && (!f.help_text_position || f.help_text_position === 'below');

// In label
{showHelpTip && (
  <Tooltip title={f.help_text}>
    <FontAwesomeIcon icon={faCircleInfo} />
  </Tooltip>
)}

// Above field
{showHelpAbove && <div className="fg-help-text">{f.help_text}</div>}

// Below field
{showHelpBelow && <div className="fg-help-text">{f.help_text}</div>}
```

---

## Code Examples

### Example 1: Complete Email Field with Confirmation

**Definition (SharedOptions.jsx):**
```javascript
export const EMAIL_OPTIONS = {
  ...UNIVERSAL_OPTIONS,

  // Email Confirmation
  confirm_email: {
    type: 'switch',
    label: 'Require Email Confirmation',
    section: 'validation',
    description: 'User must enter the same email twice',
  },
  confirm_label: {
    type: 'text',
    label: 'Confirmation Field Label',
    section: 'validation',
    description: 'Label for the confirmation email field',
  },
  confirm_placeholder: {
    type: 'text',
    label: 'Confirmation Placeholder',
    section: 'validation',
    description: 'Placeholder for the confirmation field',
  },
  confirm_error_message: {
    type: 'text',
    label: 'Mismatch Error Message',
    section: 'validation',
    description: 'Error shown when emails don\'t match',
  },
};
```

**Preview (FormEditor.jsx):**
```jsx
if (f.type === 'email') {
  return (
    <>
      {f.confirm_email ? (
        <>
          {/* Primary Email */}
          <div className="fg-input-group">
            <label>Primary Email</label>
            <input
              name={`${fieldName}_primary`}
              type="email"
              placeholder={f.placeholder || 'Email Address'}
              defaultValue={f.default_value}
            />
          </div>
          
          {/* Confirmation Email */}
          <div className="fg-input-group">
            <label>{f.confirm_label || 'Confirm Email'}</label>
            <input
              name={`${fieldName}_confirm`}
              type="email"
              placeholder={f.confirm_placeholder || 'Re-enter email'}
            />
          </div>
          
          {/* Error Message */}
          {validationErrors.confirm && (
            <div className="fg-error-message">
              {f.confirm_error_message || 'Emails do not match'}
            </div>
          )}
        </>
      ) : (
        <input name={fieldName} type="email" placeholder={f.placeholder} />
      )}
    </>
  );
}
```

### Example 2: Text Area with Resize and RTL

**Definition (SharedOptions.jsx):**
```javascript
export const TEXTAREA_OPTIONS = {
  ...UNIVERSAL_OPTIONS,

  rows: {
    type: 'number',
    label: 'Rows',
    section: 'general',
    min: 1,
    max: 50,
    description: 'Number of visible text lines',
  },

  resize: {
    type: 'select',
    label: 'Resize Handle',
    section: 'general',
    options: [
      { value: 'vertical', label: 'Vertical Only' },
      { value: 'horizontal', label: 'Horizontal Only' },
      { value: 'both', label: 'Both Directions' },
      { value: 'none', label: 'None' },
    ],
  },

  enable_rtl: {
    type: 'switch',
    label: 'Enable RTL',
    section: 'advanced',
    description: 'Enable right-to-left text direction',
  },
};
```

**Preview (FormEditor.jsx):**
```jsx
if (f.type === 'textarea') {
  const resizeValue = f.resize || 'vertical';
  const resizeStyle = resizeValue === 'both' 
    ? {} 
    : { resize: resizeValue };

  return (
    <textarea
      name={fieldName}
      rows={f.rows || 4}
      placeholder={f.placeholder}
      defaultValue={f.default_value}
      maxLength={f.max_length}
      minLength={f.min_length}
      readOnly
      dir={f.enable_rtl ? 'rtl' : undefined}
      style={{ ...resizeStyle, ...inputStyle }}
    />
  );
}
```

### Example 3: Multi-Select with Display Formats

**Definition (SharedOptions.jsx):**
```javascript
export const MULTISELECT_OPTIONS = {
  ...UNIVERSAL_OPTIONS,

  min_selections: {
    type: 'number',
    label: 'Min Selections',
    section: 'validation',
    min: 0,
    description: 'Minimum number of options required',
  },

  max_selections: {
    type: 'number',
    label: 'Max Selection',
    section: 'validation',
    min: 1,
    description: 'Maximum number of options allowed',
  },

  select_all_button: {
    type: 'switch',
    label: 'Show Select All Button',
    section: 'general',
    description: 'Add a button to select all options',
  },

  display_format: {
    type: 'select',
    label: 'Display Format',
    section: 'general',
    options: [
      { value: 'tags', label: 'Tags (Chips)' },
      { value: 'text', label: 'Text (Comma Separated)' },
      { value: 'count', label: 'Count Only (e.g., "3 selected")' },
    ],
  },
};
```

**Preview (FormEditor.jsx):**
```jsx
if (f.type === 'multiselect') {
  // State for selected values
  const [selectedValues, setSelectedValues] = useState(f.default_value || []);

  const getDisplayContent = () => {
    const selectedOpts = displayOptions.filter(opt =>
      selectedValues.includes(opt.value || opt.label)
    );

    switch (f.display_format) {
      case 'count':
        return selectedValues.length > 0 
          ? `${selectedValues.length} selected` 
          : 'Select options...';
      
      case 'text':
        return selectedOpts.map(opt => opt.label).join(', ') 
          || 'Select options...';
      
      case 'tags':
      default:
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {selectedOpts.map((opt, idx) => (
              <span key={idx} style={{
                background: '#e2e8f0',
                padding: '2px 8px',
                borderRadius: 4,
              }}>
                {opt.label}
              </span>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="fg-multiselect-wrapper">
      {/* Dropdown */}
      <div className="fg-form-field-input">
        {getDisplayContent()}
        <span>▼</span>
      </div>

      {/* Select All Button */}
      {f.select_all_button && (
        <button onClick={() => {
          const allValues = displayOptions.map(opt => opt.value || opt.label);
          setSelectedValues(allValues);
        }}>
          Select All
        </button>
      )}

      {/* Selection Limits */}
      {(f.min_selections > 0 || f.max_selections > 0) && (
        <div>
          {f.min_selections > 0 && `Min: ${f.min_selections}`}
          {f.min_selections > 0 && f.max_selections > 0 && ' | '}
          {f.max_selections > 0 && `Max: ${f.max_selections}`}
        </div>
      )}
    </div>
  );
}
```

---

## Troubleshooting

### Issue: Option not showing in admin panel

**Solution:**
1. Check if option is defined in SharedOptions.jsx
2. Verify field type mapping includes the option
3. Check if `section` is defined and in SECTION_ORDER
4. Verify `type` is one of: text, textarea, select, switch, number, color

### Issue: Option value not saving

**Solution:**
1. Check if option key matches exactly (case-sensitive)
2. Verify `onUpdate` callback is being called correctly
3. Check browser console for errors
4. Verify field's defaultProps includes the option

### Issue: Style not applying in preview

**Solution:**
1. Verify CSS string format: `"property: value;"`
2. Check if parseCss helper is being called
3. Verify style is being merged: `{ ...baseStyle, ...parsedStyle }`
4. Check for CSS syntax errors

### Issue: Placeholder styles not working

**Solution:**
1. Ensure PlaceholderStylesInjector component is rendered
2. Verify fieldId is passed correctly
3. Check that `.fg-field-{id}` class is applied to input
4. Inspect DOM to verify style element is created

### Issue: Conditional options not showing/hiding

**Solution:**
1. Verify the condition is checking the correct property
2. Check property values (boolean vs string)
3. Ensure condition uses correct comparison: `field.enable_mask === true`

### Issue: Multi-select display not updating

**Solution:**
1. Verify useState is being used for selected values
2. Check that setSelectedValues is being called
3. Ensure display format switch has all cases covered
4. Check if options have value and label properties

---

## Quick Reference

### Option Definition Template

```javascript
option_key: {
  type: 'text',              // Required: text, textarea, select, switch, number, color
  label: 'Display Label',    // Required: Shown in admin panel
  section: 'general',        // Required: general, validation, style, advanced, conditional
  description: 'Help text',  // Optional: Tooltip explanation
  options: [...],            // For select: array of {value, label}
  placeholder: '...',         // For text/textarea: placeholder text
  min: 0, max: 100,          // For number: min/max values
  rows: 3,                   // For textarea: number of rows
},
```

### Field Type Definition Template

```javascript
field_type: {
  label: 'Field Display Name',
  icon: <FontAwesomeIcon icon={faIcon} />,
  category: 'general',
  coming_soon: false,
  defaultProps: {
    // Copy from UNIVERSAL_OPTIONS and add field-specific options
    label: 'Default Label',
    type: 'field_type',
    // ... all other options
  },
},
```

### Common Option Mappings

| Option Name | Type | Section | Purpose |
|-------------|------|--------|---------|
| `label` | text | general | Field label text |
| `label_placement` | select | general | Label position (top/left/right/hidden) |
| `admin_label` | text | advanced | Admin-only label |
| `placeholder` | text | general | Placeholder text |
| `default_value` | text | general | Default field value |
| `required` | switch | validation | Make field required |
| `validation_message` | text | validation | Custom error message |
| `container_class` | text | advanced | CSS class for wrapper |
| `element_class` | text | advanced | CSS class for input |
| `help_text` | textarea | general | Help message text |
| `help_text_position` | select | advanced | Help message position |
| `name_attribute` | text | advanced | Custom name attribute |
| `prefix_label` | text | general | Text before input |
| `suffix_label` | text | general | Text after input |

### Style Option Mappings

| Option Name | Target Element |
|-------------|----------------|
| `label_style` | `.fg-form-field-label` |
| `input_style` | Input element |
| `textarea_style` | Textarea element |
| `dropdown_style` | Select element |
| `placeholder_style` | `::placeholder` pseudo-element |
| `prefix_suffix_style` | `.fg-input-prefix`, `.fg-input-suffix` |
| `help_text_style` | `.fg-help-text` |
| `container_style` | Field wrapper div |
| `error_message_style` | `.fg-error-message` |

---

*Last Updated: 2026-06-03*
