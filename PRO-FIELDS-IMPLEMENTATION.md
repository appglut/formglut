# FormGlut Pro - Fields Implementation Plan

## Architecture Overview

### Integration Pattern
- **Free Plugin**: Contains all field definitions with `pro: true` flag
- **Pro Plugin**: When activated, unlocks pro fields via filter
- **Communication**: Using WordPress filters and actions

### Filter Hook
```php
apply_filters( 'formglut_is_pro_field_enabled', $field_type, $is_pro );
```

---

## General Fields - Pro Implementation

### 1. Multiple Select
**Type**: `multiselect`
**Frontend**: Select dropdown with multiple selections
**Properties**: options[], placeholder, required
**Storage**: JSON array of selected values
**Validation**: At least one option if required

### 2. Country Select
**Type**: `country_select`
**Frontend**: Dropdown with 250+ countries
**Properties**: placeholder, required, allowed_countries[]
**Storage**: ISO 3166-1 alpha-2 country code
**Data Source**: Built-in country list

### 3. Number Spinner
**Type**: `spinner`
**Frontend**: Input with +/- buttons
**Properties**: min, max, step, default_value
**Storage**: Integer/float value
**Validation**: Range check (min/max)

### 4. Name Field
**Type**: `name`
**Frontend**: Combined first/last name or single input
**Properties**: format (first-last, first-middle-last, single), required
**Storage**: JSON object `{first: "", middle: "", last: ""}` or string
**Variations**:
- `first-last`: Two inputs (First, Last)
- `first-middle-last`: Three inputs
- `single`: One full name input

### 5. Heading
**Type**: `heading`
**Frontend**: Display-only heading (h1-h6)
**Properties**: text, size (h1-h6), alignment
**Storage**: Not stored (display only)
**Render**: `<h{size} class="fg-heading">{text}</h{size}>`

### 6. Mask Input
**Type**: `mask_input`
**Frontend**: Input with automatic formatting
**Properties**: mask, placeholder, required
**Masks**: Phone, SSN, Date, Custom regex
**Library**: Inputmask.js or Cleave.js

### 7. Time Picker
**Type**: `time`
**Frontend**: Time input dropdown
**Properties**: placeholder, min, max, format (12h/24h)
**Storage**: HH:MM string
**Validation**: Valid time format

### 8. Date & Time
**Type**: `datetime`
**Frontend**: Combined date + time picker
**Properties**: placeholder, min, max, format
**Storage**: ISO 8601 datetime string
**Library**: Flatpickr or similar

### 9. Image Upload
**Type**: `image_upload`
**Frontend**: File input with image preview
**Properties**: max_size, allowed_types[], max_width, max_height
**Storage**: Attachment ID or URL
**Validation**: File type, size check
**Processing**: Generate thumbnails

### 10. Toggle Switch
**Type**: `toggle`
**Frontend**: On/off switch button
**Properties**: label, default_checked, required
**Storage**: Boolean (1/0)
**Styling**: iOS-style toggle

### 11. Searchable Dropdown
**Type**: `searchable_dropdown`
**Frontend**: Select with search/filter
**Properties**: options[], placeholder, required
**Storage**: Selected value(s)
**Library**: Select2 or Tom Select

### 12. Tag Input
**Type**: `tag_input`
**Frontend**: Tag input with autocomplete
**Properties**: placeholder, allowed_tags[], max_tags
**Storage**: JSON array of tags
**Features**: Add on Enter, remove on click

### 13. Currency
**Type**: `currency`
**Frontend**: Input with currency formatting
**Properties**: currency_symbol, position (before/after), decimal_places
**Storage**: Float value
**Formatting**: Auto-format on blur

### 14. Percentage
**Type**: `percentage`
**Frontend**: Input with % suffix
**Properties**: min, max, default_value
**Storage**: Float value (0-100)
**Validation**: Range check

### 15. Color Picker
**Type**: `color_picker`
**Frontend**: Color swatch + hex input
**Properties**: default_color, show_palette, allowed_colors[]
**Storage**: Hex color code
**Library**: Spectrum or Pickr

### 16. File Upload (Already Added)
**Type**: `file_upload`
**Frontend**: File input with progress
**Properties**: max_size, allowed_types[], max_files
**Storage**: Array of attachment IDs
**Features**: Drag & drop, progress bar

### 17. Address (Already Added)
**Type**: `address`
**Frontend**: Multi-field address form
**Properties**: show_* flags for each component
**Storage**: JSON object with all address parts
**Components**: Line1, Line2, City, State, ZIP, Country

### 18. Rating (Already Added)
**Type**: `rating`
**Frontend**: Star rating widget
**Properties**: max_stars (3-10)
**Storage**: Integer rating value
**Styling**: Hover effects, half-stars optional

---

## Advanced Fields - Pro Implementation

### 1. Signature
**Type**: `signature`
**Frontend**: Canvas for drawing signature
**Properties**: pen_color, pen_width, background_color
**Storage**: Base64 image or SVG
**Library**: Signature Pad.js
**Features**: Clear, undo, touch support

### 2. Section Break
**Type**: `section_break`
**Frontend**: Visual separator with optional text
**Properties**: label, description, border_style (solid/dashed/dotted)
**Storage**: Not stored (display only)

### 3. Terms & Conditions
**Type**: `terms_conditions`
**Frontend**: Checkbox with scrollable terms box
**Properties**: label, terms_content, required
**Storage**: Boolean (agreed/not agreed)
**Features**: Scroll to bottom requirement

### 4. Video Embed
**Type**: `video_embed`
**Frontend**: Embedded video player
**Properties**: video_url, autoplay, controls
**Support**: YouTube, Vimeo, self-hosted
**Storage**: Not stored (display only)

### 5. Image Select
**Type**: `image_select`
**Frontend**: Radio buttons as images
**Properties**: options[] with image URLs
**Storage**: Selected value
**Features**: Image preview on hover

### 6. Audio Upload
**Type**: `audio_upload`
**Frontend**: Audio file upload with player
**Properties**: max_size, allowed_types[]
**Storage**: Attachment ID or URL
**Features**: Waveform preview optional

### 7. Form Step
**Type**: `form_step`
**Frontend**: Multi-step form pagination
**Properties**: step_title, step_description
**Storage**: Step state in session
**Features**: Progress bar, back/next buttons

### 8. Range Slider
**Type**: `range_slider`
**Frontend**: Slider with min/max handles
**Properties**: min, max, default_value, step
**Storage**: Float value
**Features**: Live value display

### 9. Net Promoter Score
**Type**: `net_promoter`
**Frontend**: 0-10 rating scale
**Properties**: min (0), max (10), labels
**Storage**: Integer 0-10
**Categories**: Detractor (0-6), Passive (7-8), Promoter (9-10)

### 10. Chained Select
**Type**: `chained_select`
**Frontend**: Dependent dropdowns
**Properties**: parent_field, options_map
**Storage**: Selected value
**Logic**: Options load based on parent selection

### 11. Repeat Field
**Type**: `repeat_field`
**Frontend**: Add/remove row functionality
**Properties**: min_rows, max_rows, nested_fields[]
**Storage**: JSON array of row data
**Features**: Drag to reorder rows

### 12. Rich Text Editor
**Type**: `rich_text`
**Frontend**: WYSIWYG editor
**Properties**: toolbar_options, placeholder
**Storage**: HTML content
**Library**: TinyMCE or Quill

### 13. reCAPTCHA
**Type**: `captcha`
**Frontend**: Google reCAPTCHA widget
**Properties**: version (v2/v3), site_key, secret_key
**Validation**: Server-side token verification
**Integration**: Google reCAPTCHA API

### 14. hCaptcha
**Type**: `hcaptcha`
**Frontend**: hCaptcha widget
**Properties**: site_key, secret_key
**Validation**: Server-side token verification

### 15. Turnstile
**Type**: `turnstile`
**Frontend**: Cloudflare Turnstile widget
**Properties**: site_key, secret_key
**Validation**: Server-side token verification

### 16. Emoji Rating
**Type**: `emoji_rating`
**Frontend**: Emoji selection (😠 😐 🙂)
**Properties**: emojis[], labels[]
**Storage**: Selected emoji index/value

### 17. Likert Scale
**Type**: `likert_scale`
**Frontend**: Agreement scale matrix
**Properties**: labels[], questions[]
**Storage**: JSON object of responses
**Format**: 5-7 point scale

### 18. Calculated Field
**Type**: `calculated_field`
**Frontend**: Read-only computed value
**Properties**: formula (e.g., {field1} + {field2})
**Storage**: Calculated result
**Features**: Real-time calculation

### 19. Custom HTML (Already Added)
**Type**: `html`
**Frontend**: Rendered HTML content
**Properties**: html_content
**Storage**: Not stored (display only)
**Security**: Sanitized output

---

## Layout Fields - Pro Implementation

### 1-6. Column Containers
**Type**: `column_1` to `column_6`
**Frontend**: CSS grid/flex columns
**Properties**: column_ratio, responsive_break
**Storage**: Nested fields array
**Responsive**: Stack on mobile

### 7. Accordion Section
**Type**: `accordion`
**Frontend**: Collapsible content section
**Properties**: label, expanded (default state)
**Storage**: Nested fields array
**Features**: Smooth animation

### 8. Tabs Container
**Type**: `tabs`
**Frontend**: Tabbed content
**Properties**: tab_names[]
**Storage**: Nested fields per tab
**Features**: Click to switch tabs

---

## Payment Fields - Pro Implementation

### 1. Payment Method
**Type**: `payment_method`
**Frontend**: Payment method selection
**Properties**: methods[] (stripe, paypal, bank_transfer)
**Storage**: Selected method
**Integration**: Payment gateways

### 2. Payment Item
**Type**: `payment_item`
**Frontend**: Product/line item
**Properties**: item_name, price, quantity
**Storage**: JSON object
**Calculation**: Subtotal for payment summary

### 3. Subscription
**Type**: `subscription`
**Frontend**: Plan selection with intervals
**Properties**: plans[], trial_period
**Storage**: Selected plan ID
**Integration**: Stripe/PayPal subscriptions

### 4. Custom Amount
**Type**: `custom_amount`
**Frontend**: User enters payment amount
**Properties**: min_amount, max_amount, default_amount
**Storage**: Float value
**Validation**: Range check

### 5. Item Quantity
**Type**: `item_quantity`
**Frontend**: Quantity selector for items
**Properties**: min, max, default_value
**Storage**: Integer quantity
**Linked**: To payment_item field

### 6. Coupon
**Type**: `coupon`
**Frontend**: Coupon code input
**Properties**: placeholder
**Storage**: Coupon code
**Validation**: Check against coupon database

### 7. Shipping Address
**Type**: `shipping_address`
**Frontend**: Address form for shipping
**Properties**: Same as address field
**Storage**: JSON address object
**Features**: Copy from billing option

---

## WordPress Fields - Pro Implementation

### 1. Post Submission
**Type**: `post_submission`
**Frontend**: Create post from form
**Properties**: post_type, status, taxonomies
**Storage**: Creates WP post
**Features**: Featured image, categories

### 2. User Registration
**Type**: `user_registration`
**Frontend**: User registration form
**Properties**: user_role, email_user, auto_login
**Storage**: Creates WP user
**Features**: Password generation, email notification

### 3. User Role Selection
**Type**: `user_role`
**Frontend**: Role dropdown (admin only)
**Properties**: allowed_roles[]
**Storage**: Selected role
**Security**: Only admins can set roles

---

## Implementation Priority

### Phase 1 - Core Pro Fields
1. Multiple Select
2. Country Select
3. Number Spinner
4. Name Field
5. Heading
6. Toggle Switch

### Phase 2 - Upload & Media
7. Image Upload
8. File Upload (refine)
9. Signature
10. Video Embed

### Phase 3 - Layout
11-16. Column Containers (1-6)
17. Accordion
18. Tabs

### Phase 4 - Advanced
19. Rich Text Editor
20. Form Step (Multi-step)
21. Repeat Field
22. Calculated Field

### Phase 5 - Payment
23. Payment Method
24. Payment Item
25. Custom Amount
26. Subscription

### Phase 6 - WordPress Integration
27. Post Submission
28. User Registration

---

## Technical Notes

### Frontend Rendering
- Use React components for each field type
- Reusable field wrapper component
- Props-based configuration

### Backend Validation
- Server-side validation for all inputs
- Sanitization before storage
- Type checking

### Security
- All user inputs sanitized
- CAPTCHA tokens verified server-side
- File uploads validated (type, size)
- HTML content sanitized (kses)

### Performance
- Lazy load field type components
- Debounce search/filter inputs
- Optimize file upload handling

---

## Database Schema

No new tables required. Pro fields use existing:
- `formglut_fields` table for field definitions
- `formglut_entries` table for submissions
- `formglut_entry_meta` for complex data (JSON)

---

## Testing Checklist

For each pro field:
- [ ] Field renders correctly in builder
- [ ] Drag and drop works
- [ ] Properties panel shows correct options
- [ ] Frontend form renders field
- [ ] Validation works
- [ ] Data saves correctly
- [ ] Data displays in entry view
- [ ] Export works
