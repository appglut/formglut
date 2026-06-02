# Shared Options Analysis - Field Types

## Executive Summary

**YES - Most options are shared across fields!** We should implement them once and reuse across all field types.

---

## Universal Options (Available in ALL 41+ Fields)

These options should be implemented once and work for every field type:

| Option | Type | Fields | Priority |
|--------|------|--------|----------|
| `label` | text | ALL | High |
| `placeholder` | text | ALL | High |
| `required` | switch | ALL | High |
| `container_class` | text | ALL | Medium |
| `element_class` | text | ALL | Medium |
| `help_text` | textarea | ALL | Medium |
| `conditional_logic` | switch | ALL | Low |
| `name_attribute` | text | ALL | Low |
| `read_only` | switch | ALL | Low |
| `disabled` | switch | ALL | Low |

**Total Universal Options: 10**

---

## Shared Options (Available in Multiple Field Groups)

These options are shared across related field types:

### Text-Based Fields (12 fields)
- text, email, textarea, url, phone, mask_input, currency, percentage, etc.

| Option | Type | Fields | Priority |
|--------|------|--------|----------|
| `label_placement` | select | ALL | High |
| `admin_label` | text | ALL | Low |
| `default_value` | text | ALL | High |
| `prefix_label` | text | text-like | Medium |
| `suffix_label` | text | text-like | Medium |
| `validation_type` | select | text, email, url, number | High |
| `validation_message` | text | text, email, url, number | High |
| `character_limit` | number | text, textarea | Medium |
| `input_width` | text | ALL | Low |
| `keyboard_type` | select | text, email, url, phone, number | Medium |

**Total Text-Shared Options: 10**

---

## Field-Specific Options (Only in Certain Fields)

### Number-Only Fields (number, currency, percentage, spinner, range_slider)
- `min_value`, `max_value`, `step`, `decimal_places`, `thousands_separator`

### Date/Time Fields (date, time, datetime, date_range)
- `date_format`, `time_format`, `date_type`, `min_date`, `max_date`, `inline_picker`

### Select-Based Fields (select, multiselect, radio, checkbox)
- `options` (array), `layout`, `button_style`, `max_selections`

### Upload Fields (file_upload, image_upload)
- `max_size`, `allowed_types`, `max_files`

### Advanced Fields
- Password: `enable_strength_meter`, `show_toggle`, `min_strength`
- Color Picker: `default_color`, `color_format`, `swatches`
- Rating: `max_stars`, `icon_type`, `labels`

---

## Implementation Strategy

### Option 1: Implement in Shared Location (RECOMMENDED)

Create shared option definitions that work across ALL fields:

**File: `assets/src/fields/SharedOptions.jsx`**

```javascript
// Universal options - work for ALL fields
export const UNIVERSAL_OPTIONS = {
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
  placeholder: { type: 'text', label: 'Placeholder', section: 'general' },
  default_value: { type: 'text', label: 'Default Value', section: 'general' },

  // Validation
  required: { type: 'switch', label: 'Required', section: 'validation' },

  // Styling
  container_class: { type: 'text', label: 'Container Class', section: 'style', placeholder: 'CSS class for wrapper' },
  element_class: { type: 'text', label: 'Element Class', section: 'style', placeholder: 'CSS class for input' },

  // Help
  help_text: { type: 'textarea', label: 'Help Text', section: 'advanced', rows: 3 },
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
  name_attribute: { type: 'text', label: 'Name Attribute', section: 'advanced', placeholder: 'HTML name attribute' },
  read_only: { type: 'switch', label: 'Read Only', section: 'advanced' },
  disabled: { type: 'switch', label: 'Disabled', section: 'advanced' },
};

// Text field specific options
export const TEXT_FIELD_OPTIONS = {
  character_limit: { type: 'number', label: 'Character Limit', section: 'general', min: 0 },
  prefix_label: { type: 'text', label: 'Prefix Label', section: 'general', placeholder: 'Text before input' },
  suffix_label: { type: 'text', label: 'Suffix Label', section: 'general', placeholder: 'Text after input' },
  validation_type: {
    type: 'select',
    label: 'Validation Type',
    section: 'validation',
    options: COMMON_OPTIONS.validationTypes
  },
  validation_pattern: { type: 'text', label: 'Validation Pattern', section: 'validation', placeholder: 'Regex pattern' },
  validation_message: { type: 'text', label: 'Validation Message', section: 'validation' },
  unique_value: { type: 'switch', label: 'Unique Value', section: 'validation' },
  unique_error_message: { type: 'text', label: 'Unique Error Message', section: 'validation' },
  enable_mask: { type: 'switch', label: 'Enable Input Mask', section: 'advanced' },
  mask_pattern: { type: 'text', label: 'Mask Pattern', section: 'advanced', placeholder: '(999) 999-9999' },
  mask_placeholder: { type: 'text', label: 'Mask Placeholder', section: 'advanced' },
  reversible_mask: { type: 'switch', label: 'Reversible Mask', section: 'advanced' },
  clear_on_invalid: { type: 'switch', label: 'Clear on Invalid', section: 'advanced' },
  keyboard_type: {
    type: 'select',
    label: 'Mobile Keyboard',
    section: 'general',
    options: COMMON_OPTIONS.keyboardTypes
  },
  autocomplete_attribute: {
    type: 'select',
    label: 'Autocomplete',
    section: 'advanced',
    options: COMMON_OPTIONS.autocompleteTypes
  },
};
```

---

## Recommended Implementation Approach

### Phase 1: Create Shared Infrastructure (One-time setup)

1. **Create `SharedOptions.jsx`** - Define all shared option configurations
2. **Create `FieldRenderer.jsx`** - Shared frontend rendering logic
3. **Update `DynamicFieldOptions.jsx`** - Use shared definitions

### Phase 2: Implement Universal Options (10 options)

Implement once, works for ALL 41+ fields:

1. ✅ `label` - Already working
2. ⚠️ `label_placement` - Partially working, needs completion
3. ✅ `placeholder` - Already working  
4. ❌ `required` - Need to implement
5. ✅ `container_class` - In Style Options, move to Field Options
6. ✅ `element_class` - In Style Options, move to Field Options
7. ❌ `help_text` - Need to implement
8. ❌ `help_text_position` - Need to implement
9. ❌ `conditional_logic` - Need to implement
10. ❌ `name_attribute` - Need to implement
11. ❌ `read_only` - Need to implement
12. ❌ `disabled` - Need to implement

### Phase 3: Implement Text-Field Options (10 options)

Implement once, works for 12+ text-based fields:

1. ❌ `admin_label`
2. ❌ `default_value` (with smart codes)
3. ❌ `prefix_label` / `suffix_label`
4. ❌ `character_limit`
5. ❌ `validation_type` / `validation_pattern` / `validation_message`
6. ❌ `unique_value` / `unique_error_message`
7. ❌ `input_mask` options (5 options)
8. ❌ `keyboard_type`
9. ❌ `autocomplete_attribute`

### Phase 4: Implement Field-Specific Options

Each field type gets its specific options:
- Number fields: min, max, step, decimal_places
- Date fields: date_format, time_format, etc.
- Select fields: options array, layout
- Upload fields: max_size, allowed_types

---

## Benefits of Shared Implementation

✅ **Code Reuse** - Implement once, use everywhere
✅ **Consistency** - Same behavior across all fields
✅ **Maintenance** - Fix bug once, fixed for all fields
✅ **Faster Development** - Add new field with most options already working
✅ **Smaller Bundle** - Shared code = smaller JS size

---

## Field Type Grouping

By implementing shared options, we cover:

### Group 1: Text-Based (12 fields) - 20+ shared options
- text, email, textarea, url, phone, currency, percentage, hidden, password, mask_input, custom_html, shortcode

### Group 2: Number-Based (5 fields) - 15+ shared options + 5 number options
- number, spinner, currency, percentage, range_slider

### Group 3: Select-Based (4 fields) - 15+ shared options + 5 select options  
- select, multiselect, radio, checkbox

### Group 4: Date/Time (4 fields) - 15+ shared options + 8 date options
- date, time, datetime, date_range

### Group 5: Advanced (10+ fields) - 15+ shared options + specific options
- rating, signature, color_picker, file_upload, image_upload, etc.

---

## Recommendation

**Implement shared options FIRST**. This gives you:

1. **20 options** that work across **41 fields** = 820+ option implementations instantly
2. **Field-specific options** can be added incrementally
3. **New fields** get most options for free

**Time Savings:**
- Universal options: 10 options × 41 fields = **410 implementations** → **10 shared implementations**
- Text options: 10 options × 12 fields = **120 implementations** → **10 shared implementations**

**Total savings: ~520 individual implementations → ~30 shared implementations**

This is a **94% reduction** in implementation effort!
