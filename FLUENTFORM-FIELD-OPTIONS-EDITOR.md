# FluentForm Field Options - Complete Editor Reference

This document lists all customization options for each field type as they appear in the FluentForm form builder sidebar.

---

## Table of Contents

- [General Fields](#general-fields)
- [Advanced Fields](#advanced-fields)
- [Container Fields](#container-fields)
- [Pro Fields](#pro-fields)
- [Payment Fields](#payment-fields)
- [Common Options Reference](#common-options-reference)

---

## Quick Field Index

| # | Field Type | Category | Description |
|---|------------|----------|-------------|
| 1 | Name Fields | General | First, Middle, Last name inputs |
| 2 | Email | General | Email address input |
| 3 | Simple Text | General | Single-line text input |
| 4 | Mask Input | General | Text with format masking |
| 5 | Text Area | General | Multi-line text input |
| 6 | Address Fields | General | Full address component fields |
| 7 | Country List | General | Dropdown country selector |
| 8 | Numeric Field | General | Number input with formatting |
| 9 | Phone Number | General | Phone number with validation |
| 10 | Dropdown | General | Single select dropdown |
| 11 | Radio Field | General | Single choice radio buttons |
| 12 | Checkbox | General | Multi-choice checkboxes |
| 13 | Multiple Choice | General | Multi-select dropdown |
| 14 | Website URL | General | URL input |
| 15 | Time & Date | General | Date/time picker |
| 16 | Image Upload | General | Image file upload |
| 17 | File Upload | General | File upload |
| 18 | Custom HTML | General | Custom HTML content |
| 19 | Hidden Field | Advanced | Hidden input field |
| 20 | Section Break | Advanced | Content divider/heading |
| 21 | Password | Advanced | Password input |
| 22 | Ratings | Advanced (Pro) | Star/icon rating |
| 23 | Terms & Conditions | Advanced | Terms checkbox |
| 24 | GDPR Agreement | Advanced | GDPR consent |
| 25 | Checkable Grid | Advanced (Pro) | Grid-based selection |
| 26 | reCAPTCHA | Advanced | Google reCAPTCHA |
| 27 | hCaptcha | Advanced | hCaptcha verification |
| 28 | Turnstile | Advanced | Cloudflare Turnstile |
| 29 | Shortcode | Advanced | WordPress shortcode |
| 30 | Action Hook | Advanced | Custom action hook |
| 31 | Range Slider | Advanced | Numeric range slider |
| 32 | Color Picker | Advanced | Color selection |
| 33 | Signature | Advanced (Pro) | Digital signature canvas |
| 34 | Form Step | Pro | Multi-step form break |
| 35 | Custom Submit Button | General | Custom submit button |
| 36 | One Column Container | Container | Single column layout |
| 37-42 | Multi-Column Containers | Container | 2-6 column layouts |
| 43 | Chained Select | Pro | Hierarchical dropdowns |
| 44 | Net Promoter Score | Pro | NPS survey scale |
| 45 | Repeat Field | Pro | Repeatable field group |
| 46 | Post/CPT Selection | Pro | Post type selector |
| 47 | Rich Text Input | Pro | WYSIWYG editor |
| 48 | Dynamic List | Pro | Dynamic table rows |
| 49 | Payment Item | Payment (Pro) | Product/line item |
| 50 | Subscription Item | Payment (Pro) | Recurring payment |
| 51 | Coupon | Payment (Pro) | Discount code |
| 52 | Quantity | Payment (Pro) | Item quantity |
| 53 | Payment Summary | Payment (Pro) | Order total |
| 54 | Custom Payment Amount | Payment (Pro) | User-defined amount |
| 55 | Payment Method | Payment (Pro) | Payment gateway selector |
| 56 | Billing Address | Payment (Pro) | Billing address |
| 57 | Shipping Address | Payment (Pro) | Shipping address |

---

---

## General Fields

### 1. Name Fields

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Admin Field Label | Text | Field title for admin area |
| Name Fields | Selector | Configure which name fields to show (First Name, Middle Name, Last Name) |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for field wrapper |
| Name Attribute | Text | HTML name attribute (must be unique) |
| Conditional Logic | Toggle | Enable/disable conditional logic rules |

---

### 2. Email

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Validation Rules | Section | Required, Email format |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Default Value | Text (+SmartCodes) | Pre-populate field value |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Validate as Unique | Yes/No | Check against previous submissions |
| Validation Message for Duplicate | Text | Error message when duplicate found |
| Prefix Label | Text | Text before input |
| Suffix Label | Text | Text after input |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 3. Simple Text

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Mask Input | Select | None, (###) ###-####, (##) ####-####, 23/03/2018, 23:59:59, 23/03/2018 23:59:59, Custom |
| Custom Mask | Text | Custom mask pattern (when Custom selected) |
| Activating a reversible mask | Yes/No | Enable reverse mask behavior |
| Clear if not match | Yes/No | Clear value on invalid input |
| Mobile Keyboard Type | Select | Standard, Numeric (0-9), Decimal (0-9 with .), Telephone |
| Validation Rules | Section | Required, numeric, min, max, digits |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Default Value | Text (+SmartCodes) | Pre-populate field value |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Prefix Label | Text | Text before input |
| Suffix Label | Text | Text after input |
| Name Attribute | Text | HTML name attribute |
| Max text length | Number | Maximum character limit |
| Validate as Unique | Yes/No | Check against previous submissions |
| Validation Message for Duplicate | Text | Error when duplicate found |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 4. Text Area

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Rows | Number | Number of visible rows |
| Columns | Number | Number of visible columns |
| Validation Rules | Section | Required, max length |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Default Value | Text (+SmartCodes) | Pre-populate field value |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for textarea |
| Help Message | Textarea | Tooltip help text |
| Prefix Label | Text | Text before input |
| Suffix Label | Text | Text after input |
| Name Attribute | Text | HTML name attribute |
| Max text length | Number | Maximum character limit |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 5. Address Fields

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Admin Field Label | Text | Field title for admin area |
| Address Fields | Section | Configure which address fields to show and their settings |

**Address Fields Components** (Each has its own settings):
- Address Line 1
- Address Line 2
- City
- State
- Zip Code
- Country

For each component:
- Label Placement (Default, Top, Right, Bottom, Left, Hidden)
- Admin Field Label
- Help Message
- Error Message
- Visibility toggle
- Required (validation)

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Class | Text | CSS class for address container |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 6. Country List

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Enable Searchable Smart Options | Yes/No | Enable select2 searchable dropdown |
| Placeholder | Text | Text shown when no option selected |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for select element |
| Country List | Section | Active List (All/Specific), Visible List, Hidden List |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 7. Numeric Field

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Validation Rules | Section | Required, Min Value, Max Value, Digits |
| Number Format | Select | None, US Style with Decimal, US Style without Decimal, EU Style with Decimal, EU Style without Decimal |
| Mobile Keyboard Type | Select | Numeric (0-9), Decimal (0-9 with .) |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Default Value | Text (+SmartCodes) | Pre-populate field value |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Step | Text | Increment/decrement step value |
| Prefix Label | Text | Text before input |
| Suffix Label | Text | Text after input |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |
| Calculation Field Settings | Section (Pro) | Enable calculation based on other numeric fields |

**SmartCodes for Default Value:**
- Populate by GET Param
- Admin Email
- Site URL
- Site Title
- IP Address
- Date (mm/dd/yyyy)
- Date (dd/mm/yyyy)
- Embedded Post/Page ID
- Embedded Post/Page Title
- Embedded URL
- HTTP Referer URL
- User ID, Display Name, First Name, Last Name, Email, Username
- User Browser Client
- User Operating System
- Random String with Prefix
- Cookie Value

---

### 8. Dropdown

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown when no option selected |
| Options | Section | Add/Edit dropdown options (Label, Value, Calc Value) |
| Shuffle the available options | Yes/No | Randomize option order |
| Enable Searchable Smart Options | Yes/No | Enable select2 searchable dropdown |
| Max Selection | Number | Maximum items selectable |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Dynamic Default Value | Text (+SmartCodes) | Pre-populate dynamically |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for select element |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 9. Radio Field

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Options | Section | Add/Edit radio options (Label, Value, Calc Value, Image) |
| Layout | Select | Default, Inline Layout, Button Type Styles, 2-Column, 3-Column, 4-Column, 5-Column |
| Shuffle the available options | Yes/No | Randomize option order |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Dynamic Default Value | Text (+SmartCodes) | Pre-populate dynamically |
| Container Class | Text | CSS class for wrapper |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 10. Checkbox

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Options | Section | Add/Edit checkbox options (Label, Value, Calc Value, Image) |
| Layout | Select | Default, Inline Layout, Button Type Styles, 2-Column, 3-Column, 4-Column, 5-Column |
| Shuffle the available options | Yes/No | Randomize option order |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Dynamic Default Value | Text (+SmartCodes) | Pre-populate dynamically |
| Container Class | Text | CSS class for wrapper |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 11. Multiple Choice (Multiselect)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown when no option selected |
| Options | Section | Add/Edit options (Label, Value, Calc Value) |
| Shuffle the available options | Yes/No | Randomize option order |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Dynamic Default Value | Text (+SmartCodes) | Pre-populate dynamically |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for select element |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Max Selection | Number | Maximum items selectable |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 12. Website URL

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Validation Rules | Section | Required, URL format |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Default Value | Text (+SmartCodes) | Pre-populate field value |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Prefix Label | Text | Text before input |
| Suffix Label | Text | Text after input |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 13. Time & Date

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Date Format | Select | m/d/Y, d/m/Y, Y-m-d, F j, Y, and more... |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Default Value | Text (+SmartCodes) | Pre-populate field value |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Advanced Date Configuration | Textarea (Pro) | Custom flatpickr config |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 14. Image Upload

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Button Text | Text | Upload button text |
| Upload Button Interface | Radio | Button, Dropzone |
| File Location Type | Radio | As Per Global Settings, Custom |
| Save Uploads in | Radio | Default WordPress, Custom Directory |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Validation Rules | Section | Required, Max File Size, Max File Count, Allowed Image Types |
| Enable crop | Yes/No | Force user to crop before upload |
| Crop Type | Radio | Crop Ratio, Width and Height |
| Crop ratio | Select | Free, 1:1, 4:3, 16:9, 3:4 |
| Width (px) | Number | Required crop width |
| Height (px) | Number | Required crop height |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 15. File Upload

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Button Text | Text | Upload button text |
| Upload Button Interface | Radio | Button, Dropzone |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Validation Rules | Section | Required, Max File Size, Max File Count, Allowed File Types |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| File Location Type | Radio | As Per Global Settings, Custom |
| Save Uploads in | Radio | Default WordPress, Custom Directory |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 16. Custom HTML

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| HTML Code | Textarea | Valid HTML code to display |
| Conditional Logic | Toggle | Enable/disable conditional logic |
| Container Class | Text | CSS class for wrapper |

---

### 17. Mask Input

Same options as Simple Text field.

---

### 18. Phone Number

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Validation Rules | Section | Required, phone format |
| Phone Format | Select | US (###) ###-####, Custom |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Default Value | Text (+SmartCodes) | Pre-populate field value |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Prefix Label | Text | Text before input |
| Suffix Label | Text | Text after input |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

## Advanced Fields

### 18. Hidden Field

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Admin Field Label | Text | Field title for admin area |
| Default Value | Text (+SmartCodes) | Hidden field value |
| Name Attribute | Text | HTML name attribute |

---

### 19. Section Break

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Section heading |
| Description | Textarea | Section description text |
| Content Alignment | Radio | Left, Center, Right |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Class | Text | CSS class for section |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 20. Password

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Default Value | Text (+SmartCodes) | Pre-populate field value |
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Prefix Label | Text | Text before input |
| Suffix Label | Text | Text after input |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 21. Ratings (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Options | Section | Rating items and labels (Nice, Good, Very Good, Awesome, Amazing) |
| Show Text | Select | Yes, No |
| Icon Source | Select | Preset Icons, Custom SVG |
| Preset Icon | Select | Star, Heart, Thumb, Check, Circle |
| Custom SVG Icon | Textarea | Custom SVG code |
| Inactive Color | Color Picker | Color before selection |
| Active Color | Color Picker | Color after selection |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 22. Terms & Conditions

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Admin Field Label | Text | Field title for admin area |
| Validation Rules | Section | Required |
| Terms & Conditions | Textarea | HTML content for terms checkbox |
| Show Checkbox | Checkbox | Enable checkbox option |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for element |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 23. GDPR Agreement

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Admin Field Label | Text | Field title for admin area |
| Description | Textarea | GDPR consent text |
| Required Validation Message | Text | Custom error message |
| Container Class | Text | CSS class for wrapper |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Class | Text | CSS class for element |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 24. Checkable Grid (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Field Type | Radio | Checkbox, Radio |
| Grid Columns | Section | Define column headers |
| Grid Rows | Section | Define row headers |
| Validation Rules | Section | Required (per row option) |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 25. reCAPTCHA

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field label (optional) |
| Label Placement | Radio | Position option |
| Name Attribute | Text | HTML name attribute |
| Validation Rules | Section | Required (automatic) |

*Note: Requires Google reCAPTCHA API keys in global settings*

---

### 26. hCaptcha

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field label (optional) |
| Label Placement | Radio | Position option |
| Name Attribute | Text | HTML name attribute |
| Validation Rules | Section | Required (automatic) |

*Note: Requires hCaptcha API keys in global settings*

---

### 27. Turnstile

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field label (optional) |
| Label Placement | Radio | Position option |
| Name Attribute | Text | HTML name attribute |
| Validation Rules | Section | Required (automatic) |

*Note: Requires Cloudflare Turnstile API keys in global settings*

---

### 28. Shortcode

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Shortcode | Text | WordPress shortcode to execute |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Class | Text | CSS class for element |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 29. Action Hook

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Hook Name | Text | WordPress action hook name |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Class | Text | CSS class for element |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 30. Range Slider

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Min Value | Number | Minimum slider value |
| Max Value | Number | Maximum slider value |
| Default Value | Number | Initial slider position |
| Step Value | Number | Increment step |
| Show Value | Yes/No | Display current value |
| Value Prefix | Text | Text before value |
| Value Suffix | Text | Text after value |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for slider |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 31. Color Picker

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Default Color | Color Picker | Pre-selected color |
| Color Format | Select | Hex, RGB, HSL |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 32. Signature (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Signature Width | Number | Canvas width in pixels |
| Signature Height | Number | Canvas height in pixels |
| Pen Color | Color Picker | Signature stroke color |
| Background Color | Color Picker | Canvas background |
| Button Text | Text | Clear button text |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for canvas |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Output Format | Select | PNG, SVG, JPG |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 33. Form Step (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Previous Button | Section | Type (Default/Image), Text, Image URL |
| Next Button | Section | Type (Default/Image), Text, Image URL |
| Element Class | Text | CSS class for element |

---

### 31. Custom Submit Button

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Button Text | Text | Submit button text |
| Button Text | Section | Configure button appearance |
| Button Style | Select | Theme styles |
| Button Size | Radio | Small, Medium, Large |
| Content Alignment | Radio | Left, Center, Right |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for button |
| Help Message | Textarea | Tooltip help text |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

## Container Fields

### 32. One Column Container

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Conditional Logic | Toggle | Enable/disable conditional logic |
| Column Width % | Number | Container width percentage |

### 33. Two Column Container

Same as One Column with 2 columns (50/50 default).

### 34. Three Column Container

Same as One Column with 3 columns (33.33% each default).

### 35. Four Column Container

Same as One Column with 4 columns (25% each default).

### 36. Five Column Container

Same as One Column with 5 columns (20% each default).

### 37. Six Column Container

Same as One Column with 6 columns (16.67% each default).

---

## Pro Fields

### 38. Chained Select (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown when no option selected |
| Chained Levels | Section | Configure dropdown hierarchy (Level 1, Level 2, etc.) |
| Enable Searchable Smart Options | Yes/No | Enable select2 searchable dropdown |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for select elements |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 39. Net Promoter Score (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| NPS Range | Number | Scale range (0-10 default) |
| Labels | Section | Configure labels for detractors, passives, promoters |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for element |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 40. Repeat Field (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Admin Field Label | Text | Field title for admin area |
| Child Fields | Section | Select fields to include in repeatable group |
| Min Repeat | Number | Minimum number of repeats |
| Max Repeat | Number | Maximum number of repeats (0 = unlimited) |
| Add Button Text | Text | Text for "Add More" button |
| Remove Button Text | Text | Text for remove button |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for repeat container |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 41. Post/CPT Selection (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown when no option selected |
| Post Type | Select | Select post type (Posts, Pages, Custom Post Types) |
| Query Filter | Section | Filter by taxonomy, author, date, etc. |
| Enable Searchable Smart Options | Yes/No | Enable select2 searchable dropdown |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for select element |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 42. Rich Text Input (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Default Value | Textarea | Default rich text content |
| Editor Toolbar | Section | Select available formatting buttons |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for editor |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Media Upload | Yes/No | Allow media uploads in editor |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 43. Dynamic List (Pro)

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field title shown to users |
| Admin Field Label | Text | Field title for admin area |
| List Columns | Section | Define column headers and types |
| Add Button Text | Text | Text for add row button |
| Min Rows | Number | Minimum number of rows |
| Max Rows | Number | Maximum number of rows (0 = unlimited) |
| Validation Rules | Section | Required |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for table |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

## Payment Fields (Pro)

### 44. Payment Item

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Item name shown to users |
| Admin Field Label | Text | Field title for admin area |
| Item Type | Select | Single Product, Subscription, Donation |
| Price | Number | Base price amount |
| Quantity Enabled | Yes/No | Allow quantity selection |
| Default Quantity | Number | Initial quantity value |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for element |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 45. Subscription Item

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Subscription name shown to users |
| Admin Field Label | Text | Field title for admin area |
| Billing Cycle | Select | Daily, Weekly, Monthly, Yearly |
| Trial Period | Number | Trial days (0 = no trial) |
| Setup Fee | Number | One-time setup fee |
| Recurring Amount | Number | Recurring charge amount |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for element |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 46. Coupon

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field label shown to users |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Apply Button Text | Text | Text for apply button |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 47. Quantity

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field label shown to users |
| Admin Field Label | Text | Field title for admin area |
| Default Quantity | Number | Initial quantity value |
| Min Quantity | Number | Minimum allowed quantity |
| Max Quantity | Number | Maximum allowed quantity |
| Step Value | Number | Increment/decrement step |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Prefix Label | Text | Text before input |
| Suffix Label | Text | Text after input |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 48. Payment Summary Total

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Summary label shown to users |
| Admin Field Label | Text | Field title for admin area |
| Summary Type | Select | Subtotal, Total, Deposit |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for element |
| Name Attribute | Text | HTML name attribute |

---

### 49. Custom Payment Amount

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field label shown to users |
| Label Placement | Radio | Default, Top, Right, Bottom, Left, Hidden |
| Admin Field Label | Text | Field title for admin area |
| Placeholder | Text | Text shown in empty field |
| Minimum Amount | Number | Minimum payment amount |
| Maximum Amount | Number | Maximum payment amount |
| Validation Rules | Section | Required, numeric |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for input |
| Help Message | Textarea | Tooltip help text |
| Prefix Label | Text | Currency symbol before input |
| Suffix Label | Text | Text after input |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 50. Payment Method Selector

**General Options**
| Option | Type | Description |
|--------|------|-------------|
| Element Label | Text | Field label shown to users |
| Admin Field Label | Text | Field title for admin area |
| Available Methods | Section | Select payment methods (PayPal, Stripe, etc.) |
| Default Method | Select | Pre-selected payment method |

**Advanced Options**
| Option | Type | Description |
|--------|------|-------------|
| Container Class | Text | CSS class for wrapper |
| Element Class | Text | CSS class for element |
| Name Attribute | Text | HTML name attribute |
| Conditional Logic | Toggle | Enable/disable conditional logic |

---

### 51. Billing Address

Same options as Address Fields with additional payment-specific labels.

---

### 52. Shipping Address

Same options as Address Fields with additional payment-specific labels.

---

## Common Options Reference

### Label Placement Options

| Value | Description |
|-------|-------------|
| `""` (empty) | Default (uses global setting) |
| `top` | Label above field |
| `right` | Label to the right of field |
| `bottom` | Label below field |
| `left` | Label to the left of field |
| `hide_label` | Hide label completely |

### Validation Rules Types

| Rule | Description | Applies To |
|------|-------------|------------|
| `required` | Field must be filled | All fields |
| `email` | Valid email format | Email |
| `url` | Valid URL format | Website URL |
| `numeric` | Must be a number | Numeric |
| `min` | Minimum value | Numeric |
| `max` | Maximum value | Numeric |
| `digits` | Exact digit count | Numeric |
| `max_file_size` | Maximum file size | File uploads |
| `max_file_count` | Maximum file count | File uploads |
| `allowed_file_types` | Allowed file extensions | File uploads |
| `allowed_image_types` | Allowed image types | Image uploads |

### Number Format Options

| Value | Description |
|-------|-------------|
| `None` | No formatting |
| `US Style with Decimal` | 123,456.00 |
| `US Style without Decimal` | 123,456,789 |
| `EU Style with Decimal` | 123.456,00 |
| `EU Style without Decimal` | 123.456.789 |

### Mobile Keyboard Types

| Value | Description |
|-------|-------------|
| `Standard Keyboard` | Full keyboard |
| `Numeric (0-9)` | Numbers only |
| `Decimal (0-9 with .)` | Numbers with decimal |
| `Telephone (0-9, *, #)` | Phone keypad |

### Layout Options (Checkable Fields)

| Value | Description |
|-------|-------------|
| `Default` | Vertical list |
| `Inline Layout` | Horizontal inline |
| `Button Type Styles` | Button-style options |
| `2-Column Layout` | 2-Column grid |
| `3-Column Layout` | 3-Column grid |
| `4-Column Layout` | 4-Column grid |
| `5-Column Layout` | 5-Column grid |

### SmartCodes for Default Value

| SmartCode | Description |
|------------|-------------|
| Populate by GET Param | Get value from URL parameter |
| Admin Email | WordPress admin email |
| Site URL | Website URL |
| Site Title | Website title |
| IP Address | User's IP address |
| Date (mm/dd/yyyy) | Current date (US format) |
| Date (dd/mm/yyyy) | Current date (EU format) |
| Embedded Post/Page ID | Current post/page ID |
| Embedded Post/Page Title | Current post/page title |
| Embedded URL | Current page URL |
| HTTP Referer URL | Referring URL |
| User ID | Logged-in user ID |
| User Display Name | User's display name |
| User First Name | User's first name |
| User Last Name | User's last name |
| User Email | User's email |
| User Username | User's username |
| User Browser Client | Browser information |
| User Operating System | OS information |
| Random String with Prefix | Random string generator |
| Cookie Value | Value from cookie |

---

*This document is generated from FluentForm source files (DefaultElements.php, ElementCustomization.php, ElementSettingsPlacement.php)*
