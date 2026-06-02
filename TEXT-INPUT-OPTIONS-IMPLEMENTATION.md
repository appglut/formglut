# Text Input Field Options - Implementation Plan

## Overview

The Text Input field has **28 options** organized into 8 categories. This document provides a complete implementation plan for each option.

---

## Category 1: Label Options (3 options)

### 1.1 `label` (Text Input)
- **Type**: text
- **Default**: "Text Input"
- **Description**: The label displayed above the field
- **Implementation Status**: ✅ Already works
- **Frontend Render**: 
  ```jsx
  <div className="fg-form-field-label">{field.label}</div>
  ```

### 1.2 `label_placement` (Select)
- **Type**: select
- **Options**: 
  - `default` - Uses global setting
  - `top` - Above field
  - `bottom` - Below field
  - `left` - Left of field (horizontal)
  - `right` - Right of field (horizontal)
  - `hidden` - Hide label
- **Default**: "default"
- **Implementation Status**: ⚠️ Partially implemented (in Style Options)
- **Note**: Currently in Style Options panel, should be moved to Field Options

### 1.3 `admin_label` (Text Input)
- **Type**: text
- **Default**: ""
- **Description**: Admin-only label for identifying field in backend
- **Placeholder**: "For admin area only"
- **Implementation Status**: ❌ Not implemented
- **Use Case**: Displayed in entries table instead of regular label

---

## Category 2: Input Options (3 options)

### 2.1 `placeholder` (Text Input)
- **Type**: text
- **Default**: "Enter text here..."
- **Description**: Placeholder text shown in empty input
- **Implementation Status**: ✅ Already works
- **Frontend Render**: `placeholder={field.placeholder}`

### 2.2 `default_value` (Text Input)
- **Type**: text
- **Default**: ""
- **Description**: Pre-populated field value
- **Placeholder**: "Supports smart codes like {user_email}"
- **Supported Smart Codes**:
  - `{get_param}` - URL parameter value
  - `{admin_email}` - WordPress admin email
  - `{site_url}` - Website URL
  - `{site_title}` - Website title
  - `{ip_address}` - User IP address
  - `{current_date}` - Current date
  - `{current_time}` - Current time
  - `{post_id}` - Current post/page ID
  - `{post_title}` - Current post/page title
  - `{user_id}` - Logged-in user ID
  - `{user_name}` - User display name
  - `{user_email}` - User email
  - `{user_first_name}` - User first name
  - `{user_last_name}` - User last name
  - `{http_referer}` - Referring URL
  - `{random_string}` - Random string
- **Implementation Status**: ❌ Not implemented
- **Required**: Backend smart code replacement

### 2.3 `character_limit` (Number Input)
- **Type**: number
- **Default**: ""
- **Description**: Maximum character count (0 = unlimited)
- **Placeholder**: "No limit"
- **Attributes**: min=0
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: `maxLength={field.character_limit || undefined}`

---

## Category 3: Input Formatting (2 options)

### 3.1 `prefix_label` (Text Input)
- **Type**: text
- **Default**: ""
- **Description**: Text/HTML displayed before the input
- **Placeholder**: "Text before input"
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: `<span>{field.prefix_label}</span> <input ... />`

### 3.2 `suffix_label` (Text Input)
- **Type**: text
- **Default**: ""
- **Description**: Text/HTML displayed after the input
- **Placeholder**: "Text after input"
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: `<input ... /> <span>{field.suffix_label}</span>`

---

## Category 4: Validation (7 options)

### 4.1 `required` (Switch)
- **Type**: switch (boolean)
- **Default**: false
- **Description**: Field must be filled before submission
- **Implementation Status**: ❌ Not implemented
- **Frontend**: Show asterisk (*) next to label
- **Backend Validation**: Check if empty on form submit

### 4.2 `validation_type` (Select)
- **Type**: select
- **Options**:
  - `none` - No validation
  - `required` - Required field
  - `email` - Valid email format
  - `url` - Valid URL format
  - `numeric` - Numeric value only
  - `pattern` - Custom regex pattern
  - `unique` - No duplicates
- **Default**: "none"
- **Implementation Status**: ❌ Not implemented
- **Note**: This determines which validation rules to apply

### 4.3 `validation_pattern` (Text Input)
- **Type**: text
- **Default**: ""
- **Description**: Custom regex pattern for validation
- **Placeholder**: "e.g.,^[A-Z]{2}[0-9]{4}$"
- **Implementation Status**: ❌ Not implemented
- **Show When**: `validation_type === 'pattern'`

### 4.4 `validation_message` (Text Input)
- **Type**: text
- **Default**: "Please enter a valid value"
- **Description**: Custom error message for validation failure
- **Implementation Status**: ❌ Not implemented

### 4.5 `unique_value` (Switch)
- **Type**: switch (boolean)
- **Default**: false
- **Description**: Check for duplicate values in existing entries
- **Implementation Status**: ❌ Not implemented
- **Backend**: Query entries table for duplicates

### 4.6 `unique_error_message` (Text Input)
- **Type**: text
- **Default**: "This value has already been submitted"
- **Description**: Error message when duplicate value detected
- **Implementation Status**: ❌ Not implemented
- **Show When**: `unique_value === true`

---

## Category 5: Input Mask (5 options)

### 5.1 `enable_mask` (Switch)
- **Type**: switch (boolean)
- **Default**: false
- **Description**: Enable input masking for formatted input
- **Implementation Status**: ❌ Not implemented
- **Library**: Inputmask.js or Cleave.js
- **Show When**: Enabled, reveal other mask options

### 5.2 `mask_pattern` (Select/Text)
- **Type**: select with custom option
- **Options**:
  - `phone-us` - (999) 999-9999
  - `phone-uk` - #### ######
  - `date` - 99/99/9999
  - `ssn` - 999-99-9999
  - `credit_card` - 9999 9999 9999 9999
  - `custom` - Custom pattern
- **Text Input Placeholder**: "(999) 999-9999"
- **Default**: ""
- **Implementation Status**: ❌ Not implemented
- **Show When**: `enable_mask === true`

### 5.3 `mask_placeholder` (Text Input)
- **Type**: text
- **Default**: "_"
- **Description**: Character to show for unfilled mask positions
- **Implementation Status**: ❌ Not implemented
- **Show When**: `enable_mask === true`

### 5.4 `reversible_mask` (Switch)
- **Type**: switch (boolean)
- **Default**: false
- **Description**: Allow reverse mask (fill from right to left)
- **Implementation Status**: ❌ Not implemented
- **Show When**: `enable_mask === true`

### 5.5 `clear_on_invalid` (Switch)
- **Type**: switch (boolean)
- **Default**: false
- **Description**: Clear input if value doesn't match mask on blur
- **Implementation Status**: ❌ Not implemented
- **Show When**: `enable_mask === true`

---

## Category 6: Mobile (1 option)

### 6.1 `keyboard_type` (Select)
- **Type**: select
- **Options**:
  - `default` - Standard keyboard
  - `numeric` - Numeric (0-9)
  - `decimal` - Decimal (0-9 with .)
  - `tel` - Telephone keypad
  - `email` - Email keyboard
  - `url` - URL keyboard
- **Default**: "default"
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: `inputMode={field.keyboard_type}`

---

## Category 7: Styling (3 options)

### 7.1 `container_class` (Text Input)
- **Type**: text
- **Default**: ""
- **Description**: CSS class for field wrapper
- **Placeholder**: "Add CSS class for wrapper"
- **Implementation Status**: ✅ Already exists in Style Options
- **Frontend Render**: `className={field.container_class}`

### 7.2 `element_class` (Text Input)
- **Type**: text
- **Default**: ""
- **Description**: CSS class for input element
- **Placeholder**: "Add CSS class for input"
- **Implementation Status**: ✅ Already exists in Style Options
- **Frontend Render**: `<input className={field.element_class} ... />`

### 7.3 `input_width` (Text Input)
- **Type**: text
- **Default**: ""
- **Description**: Custom width for input
- **Placeholder**: "e.g., 100%, 300px"
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: `style={{ width: field.input_width || '100%' }}`

---

## Category 8: Help & Tools (2 options)

### 8.1 `help_text` (Textarea)
- **Type**: textarea
- **Default**: ""
- **Description**: Tooltip/help message shown below field
- **Placeholder**: "Shown below the field"
- **Rows**: 3
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: Show help text with icon

### 8.2 `help_text_position` (Select)
- **Type**: select
- **Options**:
  - `below` - Below field
  - `above` - Above field
  - `tooltip` - As tooltip icon
- **Default**: "below"
- **Implementation Status**: ❌ Not implemented
- **Show When**: `help_text` is not empty

---

## Category 9: Conditional Logic (2 options)

### 9.1 `conditional_logic` (Switch)
- **Type**: switch (boolean)
- **Default**: false
- **Description**: Enable conditional logic for this field
- **Implementation Status**: ❌ Not implemented
- **Show When**: Enabled, reveal conditions editor

### 9.2 `conditions` (Array)
- **Type**: complex (conditional logic builder)
- **Default**: []
- **Description**: Array of conditional rules
- **Structure**:
  ```javascript
  [
    {
      field_id: "field_123",
      operator: "equals|not_equals|contains|not_contains|empty|not_empty|greater_than|less_than",
      value: "some_value",
      logic: "and|or"
    }
  ]
  ```
- **Implementation Status**: ❌ Not implemented
- **Show When**: `conditional_logic === true`

---

## Category 10: Advanced (4 options)

### 10.1 `name_attribute` (Text Input)
- **Type**: text
- **Default**: ""
- **Description**: Custom HTML name attribute (must be unique)
- **Placeholder**: "HTML name attribute (must be unique)"
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: `name={field.name_attribute || field.id}`

### 10.2 `autocomplete_attribute` (Select)
- **Type**: select
- **Options**:
  - `` (default) - Default
  - `name` - Name
  - `email` - Email
  - `tel` - Phone
  - `url` - URL
  - `username` - Username
  - `new-password` - New password
  - `current-password` - Current password
  - `off` - Off
- **Default**: "text"
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: `autoComplete={field.autocomplete_attribute}`

### 10.3 `read_only` (Switch)
- **Type**: switch (boolean)
- **Default**: false
- **Description**: Make field read-only (user cannot edit)
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: `readOnly={field.read_only}`

### 10.4 `disabled` (Switch)
- **Type**: switch (boolean)
- **Default**: false
- **Description**: Disable field (grayed out, not submitted)
- **Implementation Status**: ❌ Not implemented
- **Frontend Render**: `disabled={field.disabled}`

---

## Implementation Priority

### Phase 1: Core Options (High Priority)
1. ✅ `label` - Already works
2. ⚠️ `label_placement` - Move to Field Options
3. ✅ `placeholder` - Already works
4. ❌ `default_value` - Add smart code support
5. ❌ `required` - Basic validation
6. ❌ `character_limit` - maxLength attribute

### Phase 2: Visual Options (Medium Priority)
7. ❌ `prefix_label` / `suffix_label` - Display formatting
8. ❌ `help_text` / `help_text_position` - User guidance
9. ✅ `container_class` / `element_class` - Already in Style Options
10. ❌ `input_width` - Custom width

### Phase 3: Validation (High Priority)
11. ❌ `validation_type` - All validation types
12. ❌ `validation_pattern` - Regex validation
13. ❌ `validation_message` - Custom error messages
14. ❌ `unique_value` / `unique_error_message` - Duplicate check

### Phase 4: Advanced Features (Low Priority)
15. ❌ Input mask options (5 options)
16. ❌ `keyboard_type` - Mobile keyboard
17. ❌ `conditional_logic` / `conditions` - Conditional display
18. ❌ Advanced options (name, autocomplete, read_only, disabled)

### Phase 5: Admin Features
19. ❌ `admin_label` - Backend display

---

## OPTION_DEFINITIONS Update

Add these to `OPTION_DEFINITIONS` in `DynamicFieldOptions.jsx`:

```javascript
// Label Options
label: { type: 'text', label: 'Field Label', section: 'general', icon: 'fa-tag' },
label_placement: {
  type: 'select',
  label: 'Label Placement',
  section: 'general',
  options: COMMON_OPTIONS.labelPlacement
},
admin_label: { type: 'text', label: 'Admin Label', section: 'general', placeholder: 'For admin area only' },

// Input Options
placeholder: { type: 'text', label: 'Placeholder', section: 'general', placeholder: 'Text shown in empty field' },
default_value: { type: 'text', label: 'Default Value', section: 'general', placeholder: 'Pre-populated value' },
character_limit: { type: 'number', label: 'Character Limit', section: 'general', min: 0, placeholder: 'No limit' },

// Input Formatting
prefix_label: { type: 'text', label: 'Prefix Label', section: 'general', placeholder: 'Text before input' },
suffix_label: { type: 'text', label: 'Suffix Label', section: 'general', placeholder: 'Text after input' },

// Validation
required: { type: 'switch', label: 'Required', section: 'validation' },
validation_type: {
  type: 'select',
  label: 'Validation Type',
  section: 'validation',
  options: COMMON_OPTIONS.validationTypes
},
validation_pattern: { type: 'text', label: 'Validation Pattern', section: 'validation', placeholder: 'e.g., ^[A-Z]{2}[0-9]{4}$' },
validation_message: { type: 'text', label: 'Validation Message', section: 'validation', placeholder: 'Please enter a valid value' },
unique_value: { type: 'switch', label: 'Unique Value', section: 'validation' },
unique_error_message: { type: 'text', label: 'Unique Error Message', section: 'validation' },

// Input Mask
enable_mask: { type: 'switch', label: 'Enable Input Mask', section: 'advanced' },
mask_pattern: { type: 'text', label: 'Mask Pattern', section: 'advanced', placeholder: '(999) 999-9999' },
mask_placeholder: { type: 'text', label: 'Mask Placeholder', section: 'advanced', placeholder: '_' },
reversible_mask: { type: 'switch', label: 'Reversible Mask', section: 'advanced' },
clear_on_invalid: { type: 'switch', label: 'Clear on Invalid', section: 'advanced' },

// Mobile
keyboard_type: {
  type: 'select',
  label: 'Mobile Keyboard Type',
  section: 'general',
  options: COMMON_OPTIONS.keyboardTypes
},

// Styling
container_class: { type: 'text', label: 'Container Class', section: 'style', placeholder: 'Add CSS class for wrapper' },
element_class: { type: 'text', label: 'Element Class', section: 'style', placeholder: 'Add CSS class for input' },
input_width: { type: 'text', label: 'Input Width', section: 'style', placeholder: 'e.g., 100%, 300px' },

// Help & Tools
help_text: { type: 'textarea', label: 'Help Text', section: 'advanced', rows: 3, placeholder: 'Shown below the field' },
help_text_position: {
  type: 'select',
  label: 'Help Text Position',
  section: 'advanced',
  options: [
    { value: 'below', label: 'Below Field' },
    { value: 'above', label: 'Above Field' },
    { value: 'tooltip', label: 'Tooltip Icon' }
  ]
},

// Conditional Logic
conditional_logic: { type: 'switch', label: 'Enable Conditional Logic', section: 'conditional' },

// Advanced
name_attribute: { type: 'text', label: 'Name Attribute', section: 'advanced', placeholder: 'HTML name attribute (must be unique)' },
autocomplete_attribute: {
  type: 'select',
  label: 'Autocomplete',
  section: 'advanced',
  options: [
    { value: '', label: 'Default' },
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Phone' },
    { value: 'url', label: 'URL' },
    { value: 'username', label: 'Username' },
    { value: 'new-password', label: 'New Password' },
    { value: 'current-password', label: 'Current Password' },
    { value: 'off', label: 'Off' }
  ]
},
read_only: { type: 'switch', label: 'Read Only', section: 'advanced' },
disabled: { type: 'switch', label: 'Disabled', section: 'advanced' },
```

---

## Summary

**Total Options**: 28
- ✅ Already Working: 3
- ⚠️ Partially Working: 1 (label_placement in wrong panel)
- ❌ Not Implemented: 24

**Estimated Implementation Time**: 
- Phase 1 (Core): 4-6 hours
- Phase 2 (Visual): 2-3 hours  
- Phase 3 (Validation): 6-8 hours
- Phase 4 (Advanced): 8-10 hours
- Phase 5 (Admin): 1-2 hours

**Total**: ~21-29 hours for complete implementation
