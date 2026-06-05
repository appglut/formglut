# Field Options Implementation - Quick Reference

Quick lookup guide for common implementation patterns in FormGlut.

---

## 🚀 Quick Start: Adding a New Option

### 1. Add Definition (SharedOptions.jsx)

```javascript
option_name: {
  type: 'text',           // text, textarea, select, switch, number, color
  label: 'Option Label',
  section: 'general',     // general, validation, style, advanced
  description: 'Help text shown in tooltip',
},
```

### 2. Add to Field defaultProps (fieldTypes.jsx)

```javascript
defaultProps: {
  option_name: '',
  // ... other options
},
```

### 3. Use in Preview (FormEditor.jsx)

```jsx
<input
  value={f.option_name || ''}
  onChange={(e) => setValue(e.target.value)}
/>
```

---

## 📋 Option Types Quick Reference

| Type | Usage | Example Values |
|------|-------|----------------|
| `text` | Single-line input | Any string |
| `textarea` | Multi-line input | CSS, long text |
| `select` | Dropdown choice | `label_placement`, `resize` |
| `switch` | Boolean toggle | `required`, `enable_rtl` |
| `number` | Numeric value | `rows`, `min_value`, `max_selections` |
| `color` | Color picker | (rarely used) |

---

## 🎯 Section Quick Reference

| Section | Purpose | Example Options |
|---------|---------|----------------|
| `general` | Basic settings | label, placeholder, default_value |
| `validation` | Validation rules | required, validation_type, min_value |
| `style` | CSS styling | label_style, input_style, container_style |
| `advanced` | Advanced settings | name_attribute, container_class, enable_rtl |
| `conditional` | Conditional logic | (handled by ConditionalLogicOptions component) |

---

## 🔧 Common Code Patterns

### Pattern: Parse CSS and Apply to Element

```jsx
// 1. Parse CSS
const customStyle = parseCss(f.style_option);

// 2. Merge with base styles
const finalStyle = {
  backgroundColor: '#fff',
  ...customStyle,
};

// 3. Apply to element
<div style={finalStyle}>...</div>
```

### Pattern: Conditional Rendering Based on Option

```jsx
{/* Show only when option is enabled */}
{f.enable_feature && (
  <div className="special-feature">
    Feature content here
  </div>
)}

{/* Show different content based on option value */}
{f.display_format === 'tags' && <TagsView />}
{f.display_format === 'text' && <TextView />}
{f.display_format === 'count' && <CountView />}
```

### Pattern: Array Options (choices, etc.)

```jsx
{/* Render array of options */}
{(f.options || []).map((opt, idx) => (
  <div key={idx}>
    <input value={opt.label} />
    <button onClick={() => removeOption(idx)}>×</button>
  </div>
))}

{/* Add new option */}
<button onClick={() => {
  const newOpts = [...(f.options || []), { label: 'New', value: '' }];
  onUpdate('options', newOpts);
}}>+ Add</button>
```

### Pattern: Show Option Only When Another is Enabled

```jsx
{/* In DynamicFieldOptions.jsx */}
{field.enable_mask && (
  renderOptionInput('custom_mask', definition, field.custom_mask, up)
)}

{/* Or inline */}
{field.enable_mask && (
  <div className="fg-prop-field">
    <div className="fg-prop-label">Custom Mask</div>
    <Input
      value={field.custom_mask || ''}
      onChange={(e) => up('custom_mask', e.target.value)}
    />
  </div>
)}
```

### Pattern: Boolean Switch with Dependent Options

```javascript
// Definition
enable_advanced: {
  type: 'switch',
  label: 'Enable Advanced',
},
advanced_option_1: { type: 'text', label: 'Option 1' },
advanced_option_2: { type: 'text', label: 'Option 2' },
```

```jsx
// UI
{field.enable_advanced && (
  <>
    {renderOptionInput('advanced_option_1', ..., field.advanced_option_1, up)}
    {renderOptionInput('advanced_option_2', ..., field.advanced_option_2, up)}
  </>
)}
```

---

## 🎨 Style Options Pattern

All style options follow the same pattern:

### 1. Definition
```javascript
element_style: {
  type: 'textarea',
  label: 'Element Style',
  section: 'style',
  description: 'Custom CSS (e.g., color: red; font-size: 14px;)',
  rows: 2,
},
```

### 2. Preview
```jsx
const elementStyle = {
  // Base styles
  padding: '10px',
  border: '1px solid #ccc',
  // Custom parsed CSS
  ...parseCss(f.element_style),
};

<div style={elementStyle}>...</div>
```

### 3. Helper Function
```javascript
function parseCss(cssString) {
  if (!cssString || typeof cssString !== 'string') return {};
  
  const styles = {};
  cssString.split(';').forEach(rule => {
    const [property, ...valueParts] = rule.split(':');
    const value = valueParts.join(':').trim();
    const prop = property?.trim();
    
    if (prop && value) {
      // Convert "font-size" → "fontSize"
      const jsProp = prop.replace(/-([a-z])/g, (_, letter) => 
        letter.toUpperCase()
      );
      styles[jsProp] = value;
    }
  });
  
  return styles;
}
```

---

## 🔗 Element-Style Mapping

| Style Option | Target Element | CSS Selector |
|--------------|----------------|--------------|
| `label_style` | Label element | `.fg-form-field-label` |
| `input_style` | Input element | `.fg-form-field-input` |
| `textarea_style` | Textarea element | `.fg-form-field-input` |
| `dropdown_style` | Select element | `.fg-form-field-input` |
| `placeholder_style` | Placeholder pseudo | `.fg-field-{id}::placeholder` |
| `prefix_suffix_style` | Prefix/Suffix spans | `.fg-input-prefix`, `.fg-input-suffix` |
| `help_text_style` | Help text div | `.fg-help-text` |
| `container_style` | Field wrapper | `.fg-field-wrapper` |
| `error_message_style` | Error message | `.fg-error-message` |

---

## 📝 Field Rendering Template

```jsx
// Complete field template with all common features
function renderField(f) {
  // Parse styles
  const labelStyle = parseCss(f.label_style);
  const inputStyle = {
    background: f.bg_color || '#fafbfc',
    color: f.text_color || '#94a3b8',
    borderColor: f.border_color || '#e2e8f0',
    borderRadius: (f.border_radius ?? 8) + 'px',
    ...parseCss(f.input_style),
  };
  const helpTextStyle = parseCss(f.help_text_style);
  const containerStyle = parseCss(f.container_style);
  const prefixSuffixStyle = parseCss(f.prefix_suffix_style);

  // Field name
  const fieldName = f.name_attribute || f.id;

  // Help text position
  const showHelpTip = f.help_text && f.help_text_position === 'tooltip';
  const showHelpAbove = f.help_text && f.help_text_position === 'above';
  const showHelpBelow = f.help_text && (!f.help_text_position || f.help_text_position === 'below');

  // Label component
  const label = (
    <div className="fg-form-field-label" style={labelStyle}>
      {f.admin_label || f.label || <span>{f.type} field</span>}
      {f.required && <span className="required">*</span>}
      {showHelpTip && (
        <Tooltip title={f.help_text}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </Tooltip>
      )}
    </div>
  );

  // Help text component
  const helpTextContent = (
    <div className="fg-help-text" style={helpTextStyle}>
      {f.help_text}
    </div>
  );

  // Return field
  return (
    <div 
      className={`fg-field-wrapper ${f.container_class || ''}`}
      style={containerStyle}
    >
      {/* Label */}
      {label}

      {/* Help above */}
      {showHelpAbove && helpTextContent}

      {/* Input with prefix/suffix */}
      <div className="fg-input-group">
        {f.prefix_label && (
          <span className="fg-input-prefix" style={prefixSuffixStyle}>
            {f.prefix_label}
          </span>
        )}
        
        <input
          className={`fg-form-field-input fg-field-${f.id} ${f.element_class || ''}`}
          name={fieldName}
          type="text"
          placeholder={f.placeholder}
          defaultValue={f.default_value}
          style={inputStyle}
        />
        
        {f.suffix_label && (
          <span className="fg-input-suffix" style={prefixSuffixStyle}>
            {f.suffix_label}
          </span>
        )}
      </div>

      {/* Help below */}
      {showHelpBelow && helpTextContent}
    </div>
  );
}
```

---

## 🔍 Troubleshooting Quick Guide

| Problem | Solution |
|---------|----------|
| Option not showing | Check definition, section, and field type mapping |
| Value not saving | Verify option key matches exactly in defaultProps |
| Style not applying | Check CSS format, verify parseCss is called |
| Placeholder style broken | Ensure PlaceholderStylesInjector is rendered |
| Conditional not working | Check boolean comparison (use === for strict) |
| Array option issues | Verify options structure: `[{label, value}, ...]` |

---

## 📦 File Locations

| File | Purpose |
|------|---------|
| `assets/src/fields/SharedOptions.jsx` | Option definitions |
| `assets/src/fields/DynamicFieldOptions.jsx` | UI rendering |
| `assets/src/fields/fieldTypes.jsx` | Field type registry |
| `assets/src/pages/FormEditor.jsx` | Preview rendering |
| `includes/class-formglut-shortcode.php` | Frontend rendering |
| `includes/class-formglut-ajax.php` | Backend validation |

---

## ✅ Implementation Checklist

### Adding a New Option
- [ ] Add to `SharedOptions.jsx` with correct type
- [ ] Add to field's `defaultProps` in `fieldTypes.jsx`
- [ ] Add to `FIELD_TYPE_OPTIONS_MAP` if needed
- [ ] Update preview in `FormEditor.jsx`
- [ ] Update frontend rendering in shortcode
- [ ] Add backend validation if needed
- [ ] Test in admin panel
- [ ] Test in preview
- [ ] Test on frontend
- [ ] Document in tracker

### Adding a New Field Type
- [ ] Define in `fieldTypes.jsx` with icon, category, defaultProps
- [ ] Create options object in `SharedOptions.jsx`
- [ ] Add to `FIELD_TYPE_OPTIONS_MAP`
- [ ] Add preview rendering in `FormEditor.jsx`
- [ ] Add frontend rendering
- [ ] Add backend validation
- [ ] Test all options
- [ ] Document in tracker

---

## 🎓 Learning Resources

### Related Files to Study
1. `SharedOptions.jsx` - See how options are defined
2. `DynamicFieldOptions.jsx` - See how options render in UI
3. `FormEditor.jsx` - See how options apply in preview
4. Field-specific implementations:
   - Email: Email confirmation pattern
   - Textarea: Resize and RTL pattern
   - Multi-select: Display format pattern

### Key Functions to Understand
- `parseCss()` - Converts CSS strings to style objects
- `getInputMode()` - Maps keyboard types to HTML attributes
- `shuffleArray()` - Randomizes array order
- `PlaceholderStylesInjector` - Injects placeholder styles

---

*Last Updated: 2026-06-03*
