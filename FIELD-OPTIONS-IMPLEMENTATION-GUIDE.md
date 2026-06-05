# Field Options Implementation Guide

This document details the implementation procedure for each field option type. Use this guide to implement options systematically.

---

## Implementation Overview

Each option requires implementation in **4 layers**:

1. **Definition Layer** (`SharedOptions.jsx`) - Option metadata ✅ DONE
2. **UI Layer** (`DynamicFieldOptions.jsx`) - Render option inputs ⚠️ PARTIAL
3. **Preview Layer** (`FormEditor.jsx`) - Apply styles in preview ❌ TODO
4. **Frontend Layer** (form rendering) - Apply in actual forms ❌ TODO
5. **Backend Layer** (validation/processing) - Server-side handling ❌ TODO

---

## Option Type Implementation Procedures

### 1. Text Input Options (`text`)

#### Layer 1: Definition ✅ DONE
Location: `SharedOptions.jsx` - `TEXT_INPUT_OPTIONS`

#### Layer 2: UI (Inputs in Properties Panel)

| Option | UI Implementation Status | Procedure |
|--------|------------------------|-----------|
| `label` | ✅ Auto-rendered | Standard text input |
| `label_placement` | ✅ Auto-rendered | Select dropdown |
| `admin_label` | ✅ Auto-rendered | Text input |
| `placeholder` | ✅ Auto-rendered | Text input |
| `default_value` | ✅ Auto-rendered | Text input |
| `container_class` | ✅ Auto-rendered | Text input |
| `element_class` | ✅ Auto-rendered | Text input |
| `help_text` | ✅ Auto-rendered | Textarea |
| `help_text_position` | ⚠️ NEEDS CHECK | Select dropdown |
| `name_attribute` | ✅ Auto-rendered | Text input |
| `required` | ✅ Auto-rendered | Switch toggle |
| `validation_message` | ⚠️ NEEDS CHECK | Text input |
| `prefix_label` | ✅ Auto-rendered | Text input |
| `suffix_label` | ✅ Auto-rendered | Text input |

**Procedure for Missing UI:**
1. Add to `FIELD_SPECIFIC_OPTIONS` in `DynamicFieldOptions.jsx` if not auto-rendered
2. Ensure `type` is correct: `'text'`, `'textarea'`, `'select'`, `'switch'`, `'number'`
3. Add `options` array for select types
4. Add `description` for tooltip

#### Layer 3: Preview (Form Editor Canvas)

**Current Implementation in `FormEditor.jsx`:**

| Option | Currently Used | Implementation Needed |
|--------|----------------|----------------------|
| `label` | ✅ Yes (line 63) | None |
| `admin_label` | ✅ Yes (line 63) | None |
| `required` | ✅ Yes (line 64) | None |
| `help_text` | ✅ Yes (lines 65-73) | None |
| `placeholder` | ✅ Yes (line 87) | None |
| `default_value` | ✅ Yes (line 87) | None |
| `prefix_label` | ✅ Yes (line 86) | None |
| `suffix_label` | ✅ Yes (line 88) | None |
| `max_length`/`character_limit` | ⚠️ Partial | Line 81-82, needs binding to `character_limit` |
| `container_class` | ❌ No | Add to wrapper className |
| `element_class` | ❌ No | Add to input className |
| `label_placement` | ✅ Yes (lines 55-59) | None |
| `name_attribute` | ❌ No | Add to input name/id |

**Procedure for Preview Updates:**

1. **Apply Container Class:**
```jsx
// In FieldTemplate wrapper div
<div className={`fg-field-wrapper ${f.container_class || ''}`}>
```

2. **Apply Element Class:**
```jsx
// In input element
<input className={`fg-form-field-input ${f.element_class || ''}`} />
```

3. **Apply Name Attribute:**
```jsx
// In input element
<input name={f.name_attribute || f.id} />
```

4. **Character Limit Binding:**
```jsx
// Already using `max_length` but should also check `character_limit`
const charLimit = f.character_limit || f.max_length;
```

5. **Help Text Position:**
```jsx
// Currently fixed below, need to check `help_text_position`
{f.help_text && f.help_text_position !== 'tooltip' && (
  <div className={`fg-help-text ${f.help_text_position === 'above' ? 'above' : 'below'}`}>
    {f.help_text}
  </div>
)}
```

#### Layer 4: Frontend (Actual Form Rendering)

**File:** Frontend form rendering component (to be created/examined)

**Procedure:**
1. Mirror preview implementation in frontend form renderer
2. Ensure all attributes pass through to DOM elements
3. Add validation classes based on field state

#### Layer 5: Backend (Validation & Processing)

**File:** Backend validation (PHP)

**Options needing backend validation:**

| Option | Validation Type | Backend Implementation |
|--------|----------------|----------------------|
| `required` | Required check | Add to validation rules |
| `validation_type` | Custom patterns | Add pattern matching |
| `validation_pattern` | Regex check | Validate against pattern |
| `validate_unique` | Duplicate check | Query entries table |
| `min_value`/`max_value` | Range check | Numeric validation |
| `character_limit` | Max length | String length check |

**Procedure:**
1. Add validation rule processor in `class-formglut-ajax.php`
2. Handle custom error messages
3. Implement unique value check against existing entries

---

### 2. Email Options (`email`)

#### Layer 1: Definition ✅ DONE

#### Layer 2: UI

Most options auto-render. Email-specific options needing implementation:

| Option | Status | Procedure |
|--------|--------|-----------|
| `confirm_email` | ❌ Missing | Add switch - when true, show second email input |
| `confirm_label` | ❌ Missing | Text input for confirmation label |
| `confirm_placeholder` | ❌ Missing | Text input for confirmation placeholder |
| `confirm_error_message` | ❌ Missing | Text input for mismatch error |

**UI Implementation for Confirmation Fields:**
```jsx
// In DynamicFieldOptions.jsx, add conditional section for email confirmation
{field.type === 'email' && field.confirm_email && (
  <div className="fg-prop-section">
    <div className="fg-prop-section-title">Email Confirmation</div>
    {/* Confirmation field options */}
  </div>
)}
```

#### Layer 3: Preview

**Need to implement:**
1. When `confirm_email` is true, render two email inputs
2. Validate they match on blur
3. Show `confirm_error_message` when mismatch

```jsx
// In FormEditor.jsx FieldTemplate
{f.type === 'email' && f.confirm_email && (
  <>
    {/* First email input */}
    <input type="email" name={`${f.id}_primary`} />
    {/* Second email input */}
    <input type="email" name={`${f.id}_confirm`} placeholder={f.confirm_placeholder} />
  </>
)}
```

#### Layer 4: Frontend

Same as preview - implement dual inputs with client-side matching validation.

#### Layer 5: Backend

**Add to validation:**
```php
// Email confirmation check
if ($field->confirm_email) {
  $primary = $data[$field->id . '_primary'];
  $confirm = $data[$field->id . '_confirm'];
  if ($primary !== $confirm) {
    $errors[] = $field->confirm_error_message ?: 'Emails do not match';
  }
}
```

---

### 3. Text Area Options (`textarea`)

#### Layer 1: Definition ✅ DONE

#### Layer 2: UI

| Option | Status | Procedure |
|--------|--------|-----------|
| `rows` | ✅ Auto-rendered | Number input |
| `cols` | ✅ Auto-rendered | Number input |
| `resize` | ⚠️ Check | Select dropdown - ensure values map correctly |
| `min_length` | ✅ Auto-rendered | Number input |
| `max_length` | ✅ Auto-rendered | Number input |
| `enable_rtl` | ❌ Missing | Switch for right-to-left |

**Procedure for RTL:**
```jsx
// Add to textarea rendering
<textarea dir={f.enable_rtl ? 'rtl' : 'auto'} />
```

#### Layer 3: Preview

**Current Status:** ✅ Most implemented

**Need to add:**
1. Apply `resize` CSS property
2. Apply `enable_rtl` dir attribute
3. Apply `min_length` validation attribute
4. Apply custom classes

```jsx
<textarea
  className={`fg-form-field-input ${f.element_class || ''}`}
  style={{ resize: f.resize || 'vertical', ...inputStyle }}
  dir={f.enable_rtl ? 'rtl' : undefined}
  minLength={f.min_length}
  maxLength={f.max_length}
/>
```

---

### 4. Dropdown Options (`select`)

#### Layer 1: Definition ✅ DONE

#### Layer 2: UI

Options already handled in `DynamicFieldOptions.jsx` lines 371-463.

**Need to add:**
| Option | Status | Procedure |
|--------|--------|-----------|
| `disable_first_option` | ⚠️ Partial | Already in code, ensure UI toggle works |
| `min_search_chars` | ❌ Missing | Number input - show when `enable_search` is true |
| `selection_limit_message` | ❌ Missing | Text input |

**UI Implementation:**
```jsx
// Conditional rendering based on other options
{field.enable_search && (
  <OptionInput key="min_search_chars" ... />
)}
```

#### Layer 3: Preview

**Current:** ✅ Basic select implemented

**Need to add:**
1. Apply custom classes
2. Handle `disable_first_option` correctly (already done at line 95)
3. Add search functionality (requires third-party library or custom implementation)

#### Layer 4: Frontend

**Search functionality requires:**
1. Include a select library (react-select, Select2, etc.)
2. Or implement custom search with text input + filtered list

---

### 5. Multiple Select Options (`multiselect`)

#### Layer 1: Definition ✅ DONE

#### Layer 2: UI

**Need to add:**
| Option | Status | Procedure |
|--------|--------|-----------|
| `min_selections` | ❌ Missing | Number input |
| `select_all_button` | ❌ Missing | Switch toggle |
| `display_format` | ❌ Missing | Select dropdown |

#### Layer 3: Preview

**Current:** Not implemented (only in UI options editor)

**Need to implement:**
1. Render as multi-select (not standard select)
2. Handle `display_format` (tags, text, count)
3. Add select all button when enabled
4. Validate min/max selections

---

## Style Options Implementation (All Fields)

### Style Options Procedure

All style options follow the same pattern:

#### 1. UI Layer (Textarea for CSS input)

**Status:** ✅ Auto-rendered by `DynamicFieldOptions.jsx`

The `textarea` type in option definitions creates a multi-line text input for CSS.

#### 2. Preview Layer (Apply inline styles)

**Current:** ❌ Not implemented

**Procedure:**

For each style option, parse the CSS and apply to the appropriate element:

```jsx
// In FormEditor.jsx FieldTemplate

// Helper to parse CSS string
const parseCss = (cssString) => {
  if (!cssString) return {};
  const styles = {};
  cssString.split(';').forEach(rule => {
    const [property, value] = rule.split(':').map(s => s?.trim());
    if (property && value) {
      styles[property.replace(/-./g, c => c[1].toUpperCase())] = value;
    }
  });
  return styles;
};

// Apply parsed styles
const labelStyles = { ...labelStyle, ...parseCss(f.label_style) };
const inputStyles = { ...inputStyle, ...parseCss(f.input_style) };
```

**Element Mapping:**

| Style Option | Target Element |
|--------------|----------------|
| `label_style` | `.fg-form-field-label` |
| `input_style` / `textarea_style` / `dropdown_style` | Input element |
| `placeholder_style` | `::placeholder` pseudo-element |
| `prefix_suffix_style` | `.fg-input-prefix`, `.fg-input-suffix` |
| `help_text_style` | `.fg-help-text` |
| `container_style` | Field wrapper div |
| `error_message_style` | `.fg-error-message` |

**Implementation:**

```jsx
// In FieldTemplate function
<div
  className={`fg-field-wrapper ${f.container_class || ''}`}
  style={parseCss(f.container_style)}
>
  <label
    className="fg-form-field-label"
    style={{ ...labelStyle, ...parseCss(f.label_style) }}
  >
    {f.admin_label || f.label}
  </label>

  <input
    className={`fg-form-field-input ${f.element_class || ''}`}
    style={{ ...inputStyle, ...parseCss(f.input_style) }}
  />

  {f.help_text && (
    <div
      className="fg-help-text"
      style={parseCss(f.help_text_style)}
    >
      {f.help_text}
    </div>
  )}
</div>
```

#### 3. Frontend Layer

Mirror the preview implementation exactly.

#### 4. Placeholder Style Special Case

Placeholder pseudo-elements require a different approach:

```jsx
// Create a style element dynamically
const styleId = `field-styles-${f.id}`;
useEffect(() => {
  if (f.placeholder_style) {
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .fg-field-${f.id}::placeholder {
        ${f.placeholder_style}
      }
    `;
    document.head.appendChild(style);
  }
  return () => {
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) existingStyle.remove();
  };
}, [f.placeholder_style, f.id]);
```

---

## Input Mask Implementation

### Options: `enable_mask`, `mask_pattern`, `custom_mask`, `mask_placeholder`, `reversible_mask`, `clear_on_invalid`

**Status:** ❌ Not implemented

**Procedure:**

#### Layer 2: UI
✅ Options defined - needs conditional rendering:
- Show `custom_mask` input only when `mask_pattern` is 'custom' or empty
- Show `mask_placeholder` when `enable_mask` is true

#### Layer 3: Preview & Layer 4: Frontend

**Requires library:** Use a masking library like `inputmask-js` or `react-input-mask`

**Implementation:**

```jsx
// Install: npm install inputmask

import Inputmask from 'inputmask';

// In FieldTemplate
useEffect(() => {
  if (f.enable_mask && (f.mask_pattern || f.custom_mask)) {
    const mask = f.custom_mask || f.mask_pattern;
    const im = new Inputmask({
      mask,
      placeholder: f.mask_placeholder || '_',
      reverse: f.reversible_mask,
      clearMaskOnLostFocus: f.clear_on_invalid,
      onincomplete: () => {
        if (f.clear_on_invalid) {
          // Clear the field
        }
      }
    });
    im.mask(document.getElementById(`field-${f.id}`));
  }
}, [f]);
```

---

## Validation Implementation

### Backend Validation Framework

**File:** `includes/class-formglut-ajax.php`

**Current Status:** ⚠️ Partial - basic required validation

**Procedure:**

1. Create validation processor class:

```php
class FormGlut_Field_Validator {

    public function validate($field, $value, $form_data, $entry_id = null) {
        $errors = [];

        // Required validation
        if ($field->required && empty($value)) {
            $errors[] = $field->validation_message ?? 'This field is required';
            return $errors;
        }

        // Type-specific validation
        switch ($field->type) {
            case 'email':
                $errors = array_merge($errors, $this->validateEmail($field, $value));
                break;
            case 'text':
                $errors = array_merge($errors, $this->validateText($field, $value));
                break;
            // ... other types
        }

        return $errors;
    }

    private function validateEmail($field, $value) {
        $errors = [];

        // Email format
        if (!empty($value) && !is_email($value)) {
            $errors[] = 'Please enter a valid email address';
        }

        // Unique validation
        if ($field->validate_unique) {
            $existing = $this->checkDuplicate($field->id, $value);
            if ($existing) {
                $errors[] = $field->unique_error_message ?? 'This email already exists';
            }
        }

        // Confirmation check
        if ($field->confirm_email) {
            $primary = $value;
            $confirm = $_POST[$field->id . '_confirm'] ?? '';
            if ($primary !== $confirm) {
                $errors[] = $field->confirm_error_message ?? 'Emails do not match';
            }
        }

        return $errors;
    }

    private function validateText($field, $value) {
        $errors = [];

        // Character limit
        if ($field->character_limit && strlen($value) > $field->character_limit) {
            $errors[] = sprintf('Maximum %d characters allowed', $field->character_limit);
        }

        // Min/Max value for numeric validation
        if ($field->validation_type === 'numeric') {
            if (!is_numeric($value)) {
                $errors[] = 'Please enter a numeric value';
            } else {
                if ($field->min_value && $value < $field->min_value) {
                    $errors[] = sprintf('Minimum value is %s', $field->min_value);
                }
                if ($field->max_value && $value > $field->max_value) {
                    $errors[] = sprintf('Maximum value is %s', $field->max_value);
                }
            }
        }

        // Pattern validation
        if ($field->validation_pattern) {
            if (!preg_match('/' . $field->validation_pattern . '/', $value)) {
                $errors[] = $field->validation_message ?? 'Invalid format';
            }
        }

        // Unique validation
        if ($field->validate_unique) {
            $existing = $this->checkDuplicate($field->id, $value);
            if ($existing) {
                $errors[] = $field->unique_error_message ?? 'This value already exists';
            }
        }

        return $errors;
    }

    private function checkDuplicate($field_id, $value) {
        global $wpdb;
        $table = $wpdb->prefix . 'formglut_entry_values';
        return $wpdb->get_var($wpdb->prepare(
            "SELECT entry_id FROM $table WHERE field_id = %s AND field_value = %s LIMIT 1",
            $field_id,
            $value
        ));
    }
}
```

---

## Implementation Priority

### Phase 1: Core Functionality (Essential for usability)
1. ✅ Basic option definitions
2. ⚠️ Style options application in preview
3. ⚠️ Class/ID attributes application
4. ❌ Textarea resize option
5. ❌ Help text position

### Phase 2: Validation (Essential for data quality)
1. ❌ Character limit enforcement
2. ❌ Email unique validation
3. ❌ Email confirmation
4. ❌ Custom validation patterns
5. ❌ Validation messages display

### Phase 3: Enhanced Features
1. ❌ Input masking
2. ❌ Dropdown search
3. ❌ Multi-select rendering
4. ❌ Selection limits

### Phase 4: Polish
1. ❌ RTL support
2. ❌ Mobile keyboard types
3. ❌ Placeholder styling
4. ❌ Error message styling

---

## Implementation Checklist

Use this checklist to track implementation progress:

### Text Input (Simple Text)
- [ ] `character_limit` - Bind to maxlength
- [ ] `mobile_keyboard_type` - Set inputmode attribute
- [ ] `enable_mask` - Mask input functionality
- [ ] `custom_mask` - Custom mask patterns
- [ ] `reversible_mask` - Reverse mask toggle
- [ ] `clear_on_invalid` - Clear on invalid
- [ ] `validation_type` - Validation type selector
- [ ] `min_value` / `max_value` - Range validation
- [ ] `validation_pattern` - Custom regex pattern
- [ ] `validate_unique` - Unique value check
- [ ] `unique_error_message` - Duplicate error
- [ ] `container_class` - Apply to wrapper
- [ ] `element_class` - Apply to input
- [ ] `name_attribute` - Set name attribute
- [ ] `help_text_position` - Position toggle
- [ ] `validation_message` - Custom error text
- [ ] All style options - Parse and apply CSS

### Email
- [ ] `confirm_email` - Double input mode
- [ ] `confirm_label` - Confirmation label
- [ ] `confirm_placeholder` - Confirmation placeholder
- [ ] `confirm_error_message` - Mismatch error
- [ ] `validate_unique` - Email uniqueness check
- [ ] `unique_error_message` - Duplicate error
- [ ] All style options - Parse and apply CSS

### Text Area
- [ ] `resize` - CSS resize property
- [ ] `min_length` - Minlength attribute
- [ ] `enable_rtl` - Dir attribute
- [ ] `container_class` - Apply to wrapper
- [ ] `element_class` - Apply to textarea
- [ ] `name_attribute` - Set name attribute
- [ ] `help_text_position` - Position toggle
- [ ] All style options - Parse and apply CSS

### Dropdown
- [ ] `disable_first_option` - Ensure works correctly
- [ ] `min_search_chars` - Search threshold
- [ ] `selection_limit_message` - Limit message
- [ ] `enable_search` - Search functionality
- [ ] `max_selections` - Selection limit (for multi-select mode)
- [ ] `container_class` - Apply to wrapper
- [ ] `element_class` - Apply to select
- [ ] `name_attribute` - Set name attribute
- [ ] `help_text_position` - Position toggle
- [ ] All style options - Parse and apply CSS

### Multiple Select
- [ ] Full field rendering (not just options editor)
- [ ] `min_selections` - Minimum selection check
- [ ] `max_selections` - Maximum selection check
- [ ] `selection_message` - Selection message
- [ ] `select_all_button` - Select all toggle
- [ ] `display_format` - Display format (tags/text/count)
- [ ] `shuffle_options` - Randomize on render
- [ ] All style options - Parse and apply CSS

---

*Last Updated: 2026-06-03*
