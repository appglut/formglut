# FormGlut Field Options Reference

This document categorizes all field options into:
- **Universal/Common Options**: Options that apply to ALL field types
- **Category-Specific Options**: Options that apply to specific categories of fields
- **Field-Specific Options**: Options unique to individual field types

---

## Universal/Common Options (Apply to ALL Fields)

These options should be available for every field type regardless of category.

### General Section
```javascript
label: '',              // Field label displayed to users
admin_label: '',        // Admin label for backend identification
placeholder: '',        // Placeholder text (input fields only)
default_value: '',      // Default/saved value
required: false,        // Whether field is required
help_text: '',          // Help/instruction text
prefix_label: '',       // Label before input (input fields only)
suffix_label: '',       // Label after input (input fields only)
```

### Validation Section
```javascript
validation_message: '',  // Custom error message for validation failures
```

### Style Section
```javascript
container_class: '',    // CSS class for field container
element_class: '',      // CSS class for the input element
```

### Advanced Section
```javascript
name_attribute: '',     // Custom name attribute for form submission
hidden: false,          // Whether field is hidden from display
```

### Conditional Logic Section
```javascript
conditional_logic: false,  // Enable conditional visibility
condition_match: 'any',   // 'any' or 'all' conditions must match
conditions: [],           // Array of condition objects
```

---

## Category-Specific Options

### Text Input Fields (text, email, url, password, phone)

**Mobile Keyboard Types:**
```javascript
mobile_keyboard_type: 'default',  // default, numeric, decimal, tel, email, url
```

**Input Mask Options:**
```javascript
enable_mask: false,
mask_pattern: '',
custom_mask: '',
reversible_mask: false,
clear_on_invalid: false,
```

**Character Limits:**
```javascript
character_limit: '',
min_length: '',
max_length: '',
```

**Unique Validation:**
```javascript
validate_unique: false,
unique_error_message: 'This value has already been submitted',
```

### Textarea Fields

**Dimensions:**
```javascript
rows: 4,
cols: '',
resize: 'vertical',  // vertical, horizontal, both, none
```

### Selection Fields (select, multiselect, radio, checkbox)

**Options Management:**
```javascript
options: [
  { label: 'Option 1', value: 'option1', image: '', disabled: false, calc_value: '' }
],
```

**Display Options:**
```javascript
disable_first_option: true,
shuffle_options: false,
enable_search: false,
min_search_chars: 1,
select_all_button: true,
display_format: 'tags',
```

**Layout Options:**
```javascript
layout: 'default',
columns_gap: 'medium',
button_style: 'primary',
inline: false,
```

**Visual Options:**
```javascript
show_option_images: false,
image_size: 'medium',
unselect_option: false,
```

**Selection Limits:**
```javascript
min_selections: 0,
max_selections: 0,
selection_message: 'Select between {min} and {max} options',
```

### Number-Based Fields (number, spinner, currency, percentage)

**Number Formatting:**
```javascript
number_format: 'none',
decimal_places: 2,
thousands_separator: true,
```

**Constraints:**
```javascript
min_value: '',
max_value: '',
step: 1,
min_digits: '',
max_digits: '',
```

**Currency Options:**
```javascript
currency_code: 'USD',
currency_symbol: '$',
symbol_position: 'before',
```

**Percentage Options:**
```javascript
symbol_position: 'after',
min_value: 0,
max_value: 100,
```

**Spinner Options:**
```javascript
show_buttons: true,
increment_label: '+',
decrement_label: '-',
button_position: 'right',
button_style: 'default',
wrap_values: false,
```

**Calculation:**
```javascript
enable_calculation: false,
calculation_formula: '',
read_only: false,
```

### Date/Time Fields

**Date Format:**
```javascript
date_format: 'mm/dd/yyyy',
display_format: 'F j, Y',
picker_format: 'm/d/Y',
date_type: 'date',  // date, time, datetime, date_range
time_format: '12h',
time_increment: 30,
```

**Constraints:**
```javascript
min_date: '',
max_date: '',
disable_dates: [],
disable_weekdays: [],
enable_dates: [],
min_time: '',
max_time: '',
```

**Range Options:**
```javascript
range_separator: ' to ',
start_date_label: 'From',
end_date_label: 'To',
min_duration: '',
max_duration: '',
```

**Display:**
```javascript
theme: 'default',
inline_picker: false,
week_numbers: false,
highlight_today: true,
single_datepicker: true,
```

**Timezone:**
```javascript
enable_timezone: false,
default_timezone: 'UTC',
```

---

## Field-Specific Options

### Email Field
```javascript
confirm_email: false,
confirm_label: 'Confirm Email Address',
confirm_placeholder: 'Re-enter email',
confirm_error_message: 'Email addresses do not match',
```

### Phone Field
```javascript
phone_format: 'international',
custom_format: '',
country_code: 'us',
allow_country_code: true,
validate_phone: true,
validation_type: 'format',
autocomplete_attribute: 'tel',
```

### URL Field
```javascript
url_scheme: 'any',
allow_relative: false,
validate_url: true,
open_in_new_tab: false,
add_nofollow: false,
autocomplete_attribute: 'url',
```

### Address Field
```javascript
// Field Components
include_street1: true,
include_street2: true,
include_city: true,
include_state: true,
include_zip: true,
include_country: false,

// Component Labels
street1_label: 'Street Address',
street2_label: 'Address Line 2',
city_label: 'City',
state_label: 'State/Province',
zip_label: 'Postal/Zip Code',
country_label: 'Country',

// Placeholders
street1_placeholder: 'Street address',
street2_placeholder: 'Apartment, suite, etc.',
city_placeholder: 'City',
state_placeholder: 'State',
zip_placeholder: 'Zip code',

// State/Zip Options
state_dropdown: false,
states_list: 'US',
zip_format: '',

// Layout
address_layout: 'vertical',
grid_columns: 2,

// Required Fields
required_fields: [],
```

### Masked Input Field
```javascript
mask_type: 'custom',
custom_mask: '(999) 999-9999',
auto_format: true,
validate_mask: true,
mask_hint: '',
```

### Password Field
```javascript
// Password Strength
enable_strength_meter: false,
min_strength: 2,
strength_label: 'Password Strength',
requirements_hint: 'Must be at least 8 characters',

// Constraints
min_length: 8,
max_length: '',
require_uppercase: false,
require_lowercase: false,
require_number: false,
require_special: false,
forbidden_chars: '',

// Confirmation
require_confirmation: false,
confirmation_label: 'Confirm Password',
confirmation_placeholder: 'Re-enter password',
confirmation_error: 'Passwords do not match',

// Visibility Toggle
show_toggle: true,
show_text: 'Show',
hide_text: 'Hide',

// Advanced
autocomplete_attribute: 'new-password',
```

### Name Fields
```javascript
name_format: 'first-last',
placeholder: 'John Doe',

// Field Visibility
show_first_name: true,
show_middle_name: false,
show_last_name: true,
require_first_name: true,
require_middle_name: false,
require_last_name: true,

// Field Labels
first_name_label: 'First Name',
middle_name_label: 'Middle Name',
last_name_label: 'Last Name',

// Placeholders
first_name_placeholder: 'First name',
middle_name_placeholder: 'Middle name',
last_name_placeholder: 'Last name',

// Layout
name_layout: 'horizontal',
name_spacing: 'medium',
```

### Country Select
```javascript
country_list: 'all',
included_countries: [],
excluded_countries: [],
top_countries: ['US', 'CA', 'GB'],
display_format: 'name',
flag_type: 'emoji',
enable_search: true,
searchable_threshold: 20,
```

### Heading Field
```javascript
text: 'Section Heading',
heading_level: 'h2',
alignment: 'left',
description: '',
description_position: 'below',
color_scheme: 'default',
custom_color: '',
show_divider: false,
divider_style: 'solid',
divider_color: '',
```

### Section Break
```javascript
title: 'Section Title',
description: 'Optional section description',
alignment: 'left',
show_divider: true,
divider_style: 'solid',
divider_color: '',
divider_thickness: 1,
collapsible: false,
default_collapsed: false,
toggle_text_open: 'Show',
toggle_text_closed: 'Hide',
toggle_position: 'right',
background_color: '',
text_color: '',
```

### Custom HTML
```javascript
html_content: '<p>Custom HTML content here...</p>',
enable_shortcodes: true,
sanitize_html: false,
```

### Terms & Conditions
```javascript
terms_content: '<p>Enter your terms and conditions here...</p>',
display_type: 'checkbox',
link_text: 'View Terms',
link_url: '',
modal_title: 'Terms & Conditions',
modal_width: 600,
scroll_height: 200,
require_scroll: false,
checkbox_position: 'left',
```

### GDPR Agreement
```javascript
policy_text: 'Your privacy is important to us. Please read our privacy policy.',
policy_url: '',
consent_type: 'checkbox',
default_checked: false,
storage_duration_text: 'Your data will be stored for {days} days.',
storage_days: 365,
show_storage_info: true,
show_withdraw_link: true,
withdraw_text: 'You can withdraw your consent at any time.',
withdraw_email: '',
```

### Shortcode
```javascript
shortcode_content: '[your_shortcode]',
run_shortcode: true,
cache_output: false,
cache_duration: 3600,
fallback_content: '',
```

### Action Hook
```javascript
hook_name: 'custom_form_hook',
priority: 10,
arguments: [],
echo_output: true,
fallback_content: '',
```

### Range Slider
```javascript
min: 0,
max: 100,
step: 1,
default_value: 50,
show_value: true,
value_prefix: '',
value_suffix: '',
min_label: '',
max_label: '',
value_position: 'above',
slider_style: 'modern',
show_ticks: false,
tick_interval: 10,
fill_track: true,
track_color: '',
handle_color: '',
tooltip: 'always',
```

### Color Picker
```javascript
default_color: '#e94560',
color_format: 'hex',
picker_type: 'swatches',
swatches: ['#e94560', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'],
allow_custom: true,
allowed_colors: [],
exclude_colors: [],
swatch_size: 'medium',
opacity: false,
```

### Custom Submit Button
```javascript
button_text: 'Submit Form',
button_icon: '',
icon_position: 'left',
button_style: 'primary',
button_size: 'medium',
button_shape: 'rounded',
button_width: 'auto',
button_alignment: 'left',
loading_text: 'Submitting...',
loading_icon: '',
disabled_while_submitting: true,
require_confirmation: false,
confirm_message: 'Are you sure you want to submit?',
confirm_button_text: 'Yes, Submit',
cancel_button_text: 'Cancel',
button_id: '',
tabindex: 0,
custom_css: '',
```

### Column Containers
```javascript
columns: [
  { width: 50, fields: [] }
],
gap: 'medium',
responsive_stack: true,
```

### reCAPTCHA
```javascript
version: 'v3',
v2_type: 'checkbox',
site_key: '',
theme: 'light',
size: 'normal',
language: 'auto',
score_threshold: 0.5,
required: true,
```

### hCaptcha
```javascript
site_key: '',
theme: 'light',
size: 'normal',
sentinel: 'auto',
required: true,
```

### Turnstile
```javascript
site_key: '',
theme: 'auto',
size: 'normal',
appearance: 'always',
required: true,
```

---

## Fields to be Implemented (Coming Soon)

### Survey & Quiz Fields
- Star Rating
- Likert Scale
- Net Promoter Score (NPS)
- Emoji Rating
- Matrix Question
- Checkable Grid
- Semantic Differential
- Image Comparison
- Labeled Slider
- Ranking / Ordering

### Upload Fields
- File Upload
- Image Upload
- Multi-File Upload
- Cropped Image Upload
- Webcam Capture
- Voice Recording

### Pro/Premium Fields
- Chained Select
- Repeat Field
- Rich Text Input (WYSIWYG)
- Tag Input
- Dynamic List / Table

### Payment Fields
- Payment Item
- Subscription Item
- Coupon
- Credit Card
- Donation

### WordPress Specific
- User Registration
- Post Submission
- Featured Image Upload
- Category/Tag Selection

---

## Implementation Notes

1. **All fields should include Universal Options** regardless of their type
2. **Input-only fields** (text, email, number, etc.) should include: `placeholder`, `prefix_label`, `suffix_label`
3. **Content fields** (html, heading, shortcode) may omit `placeholder` and `required`
4. **Container fields** (columns, sections) have simplified options focused on layout
5. **Security fields** (captcha) have minimal options focused on API keys and display

---

*Generated for FormGlut WordPress Plugin*
