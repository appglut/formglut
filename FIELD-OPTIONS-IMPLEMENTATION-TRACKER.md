# Formglut Field Options Implementation Tracker

This document tracks the implementation status of all field options for each field type.

---

## Shortcode

<div class="fg-shortcode-box" style="background: #f5f5f5; border: 2px dashed #ccc; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
  <p style="margin: 0 0 10px 0; font-weight: 600; color: #555;">Form Shortcode</p>
  <code class="fg-shortcode-code" style="background: #fff; border: 1px solid #ddd; padding: 10px 20px; border-radius: 4px; font-family: monospace; font-size: 14px; display: inline-block; cursor: pointer; user-select: all;" onclick="this.select(); navigator.clipboard.writeText(this.textContent); alert('Shortcode copied!');">[formglut id="{form_id}"]</code>
  <p style="margin: 10px 0 0 0; font-size: 12px; color: #888;">Click to copy shortcode</p>
</div>

**Available Shortcodes:**

| Shortcode | Description | Status |
|-----------|-------------|--------|
| `[formglut id="{form_id}"]` | Embed a specific form | [x] |
| `[formglut_entries]` | Display form entries (admin only) | [ ] |
| `[formglut_submission_count]` | Display total submission count | [ ] |

**Legend:**
- `[x]` = Implemented
- `[ ]` = Not implemented
- `[~]` = Partially implemented

---

## Implementation Summary

**Implemented Fields (5):**

| # | Field | Field Options | Style Options | Total | Status |
|---|-------|---------------|---------------|-------|--------|
| 1 | **Email** | 12/15 | 6/6 | 18/21 | ⚠️ Partial |
| 2 | **Simple Text** (Text Input) | 18/21 | 7/7 | 25/28 | ⚠️ Partial |
| 3 | **Text Area** | 15/15 | 6/6 | 21/21 | ✅ Complete (UI+Preview) |
| 4 | **Dropdown** | 12/15 | 7/7 | 19/22 | ⚠️ Partial |
| 5 | **Multiple Choice** (Multiple Select) | 10/14 | 6/6 | 16/20 | ⚠️ Partial |

**Total Implemented:** 99/112 options (88%)

### Implementation Layers

Each field option is implemented across 5 layers:

| Layer | Status | Notes |
|-------|--------|-------|
| **1. Definition** | ✅ 100% | All options defined in SharedOptions.jsx |
| **2. UI** | ✅ 95% | Admin interface for editing options |
| **3. Preview** | ✅ 85% | Live preview in form builder |
| **4. Frontend** | ⏳ 0% | Frontend form rendering (needs implementation) |
| **5. Backend** | ⏳ 0% | Server-side validation (needs implementation) |

### Implementation Status Legend
- ✅ **Fully Implemented** - Option works in UI, preview, and frontend
- ⚠️ **Partially Implemented** - Option defined and renders in UI, but may not function fully
- ❌ **Not Implemented** - Option not yet added

### Partially Implemented Items (Need Backend Validation)
- Input mask functionality (requires JS library)
- Email confirmation fields (backend validation)
- Unique value validation (backend check)
- Custom validation patterns (backend processing)
- Dropdown search functionality (requires library)
- Multi-select rendering (needs component)

---

## Table of Contents

- [General Fields](#general-fields)
  - [Name Fields](#1-name-fields)
  - [Email](#2-email)
  - [Simple Text](#3-simple-text)
  - [Mask Input](#4-mask-input)
  - [Text Area](#5-text-area)
  - [Address Fields](#6-address-fields)
  - [Country List](#7-country-list)
  - [Numeric Field](#8-numeric-field)
  - [Phone Number](#9-phone-number)
  - [Dropdown](#10-dropdown)
  - [Radio Field](#11-radio-field)
  - [Checkbox](#12-checkbox)
  - [Multiple Choice](#13-multiple-choice)
  - [Website URL](#14-website-url)
  - [Time & Date](#15-time--date)
  - [Image Upload](#16-image-upload)
  - [File Upload](#17-file-upload)
  - [Custom HTML](#18-custom-html)
- [Advanced Fields](#advanced-fields)
  - [Hidden Field](#19-hidden-field)
  - [Section Break](#20-section-break)
  - [Password](#21-password)
  - [Ratings](#22-ratings)
  - [Terms & Conditions](#23-terms--conditions)
  - [GDPR Agreement](#24-gdpr-agreement)
  - [Checkable Grid](#25-checkable-grid)
  - [reCAPTCHA](#26-recaptcha)
  - [hCaptcha](#27-hcaptcha)
  - [Turnstile](#28-turnstile)
  - [Shortcode](#29-shortcode)
  - [Action Hook](#30-action-hook)
  - [Range Slider](#31-range-slider)
  - [Color Picker](#32-color-picker)
  - [Signature](#33-signature)
  - [Form Step](#34-form-step)
  - [Custom Submit Button](#35-custom-submit-button)
- [Container Fields](#container-fields)
  - [Multi-Column Containers](#36-46-multi-column-containers)
- [Pro Fields](#pro-fields)
  - [Chained Select](#37-chained-select)
  - [Net Promoter Score](#38-net-promoter-score)
  - [Repeat Field](#39-repeat-field)
  - [Post/CPT Selection](#40-postcpt-selection)
  - [Rich Text Input](#41-rich-text-input)
  - [Dynamic List](#42-dynamic-list)
- [Payment Fields](#payment-fields)
  - [Payment Item](#43-payment-item)
  - [Subscription Item](#44-subscription-item)
  - [Coupon](#45-coupon)
  - [Quantity](#46-quantity)
  - [Payment Summary](#47-payment-summary)
  - [Custom Payment Amount](#48-custom-payment-amount)
  - [Payment Method](#49-payment-method)
  - [Billing Address](#50-billing-address)
  - [Shipping Address](#51-shipping-address)

---

## General Fields

### 1. Name Fields

#### Field Options
| Option | Status |
|--------|--------|
| Admin Field Label | [ ] |
| Name Fields (First/Middle/Last selector) | [ ] |
| Label Placement | [ ] |
| Container Class | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Input Style | [ ] |
| Container Style | [ ] |
| Required Indicator Style | [ ] |

---

### 2. Email ⚠️ PARTIALLY IMPLEMENTED

#### Field Options
| Option | Status | Notes |
|--------|--------|-------|
| Element Label | [x] | ✅ UI + Preview |
| Label Placement | [x] | ✅ UI + Preview |
| Admin Field Label | [x] | ✅ UI + Preview |
| Placeholder | [x] | ✅ UI + Preview |
| Validation Rules (Required, Email) | [~] | ⚠️ Required works, email format needs backend |
| Default Value (+SmartCodes) | [x] | ✅ UI + Preview |
| Container Class | [x] | ✅ UI + Preview |
| Element Class | [x] | ✅ UI + Preview |
| Help Message | [x] | ✅ UI + Preview |
| Validate as Unique | [~] | ⚠️ UI only, needs backend check |
| Validation Message for Duplicate | [~] | ⚠️ UI only, needs backend |
| Prefix Label | [x] | ✅ UI + Preview |
| Suffix Label | [x] | ✅ UI + Preview |
| Name Attribute | [x] | ✅ UI + Preview |
| Conditional Logic | [x] | ✅ UI + Preview |
| **Email Confirmation** | | **IMPLEMENTED** |
| Confirm Email | [x] | ✅ UI + Preview (dual input rendering) |
| Confirm Label | [x] | ✅ UI + Preview (custom label support) |
| Confirm Placeholder | [x] | ✅ UI + Preview (custom placeholder support) |
| Confirm Error Message | [x] | ✅ UI + Preview (error display when mismatched) |

#### Style Options
| Option | Status | Notes |
|--------|--------|-------|
| Label Style | [x] | ✅ CSS parsing + application |
| Input Style | [x] | ✅ CSS parsing + application |
| Placeholder Style | [x] | ✅ UI + Preview (CSS injection via PlaceholderStylesInjector) |
| Help Message Style | [x] | ✅ CSS parsing + application |
| Container Style | [x] | ✅ CSS parsing + application |
| Error Message Style | [x] | ✅ UI + Preview (error display component) |

---

### 3. Simple Text (Text Input) ⚠️ PARTIALLY IMPLEMENTED

#### Field Options
| Option | Status | Notes |
|--------|--------|-------|
| Element Label | [x] | ✅ UI + Preview |
| Label Placement | [x] | ✅ UI + Preview |
| Admin Field Label | [x] | ✅ UI + Preview |
| Placeholder | [x] | ✅ UI + Preview |
| Mask Input | [~] | ⚠️ UI only, needs JS library |
| Custom Mask | [~] | ⚠️ UI only, needs JS library |
| Activating Reversible Mask | [~] | ⚠️ UI only, needs JS library |
| Clear if Not Match | [~] | ⚠️ UI only, needs JS library |
| Mobile Keyboard Type | [x] | ✅ UI + inputmode attribute |
| Validation Rules (Required, Numeric, Min, Max, Digits) | [~] | ⚠️ UI only, backend validation needed |
| Default Value (+SmartCodes) | [x] | ✅ UI + Preview |
| Container Class | [x] | ✅ UI + Preview |
| Element Class | [x] | ✅ UI + Preview |
| Help Message | [x] | ✅ UI + Preview |
| Prefix Label | [x] | ✅ UI + Preview |
| Suffix Label | [x] | ✅ UI + Preview |
| Name Attribute | [x] | ✅ UI + Preview |
| Max Text Length | [x] | ✅ UI + Preview (maxlength) |
| Validate as Unique | [~] | ⚠️ UI only, needs backend |
| Validation Message for Duplicate | [~] | ⚠️ UI only, needs backend |
| Conditional Logic | [x] | ✅ UI + Preview |

#### Style Options
| Option | Status | Notes |
|--------|--------|-------|
| Label Style | [x] | ✅ CSS parsing + application |
| Input Style | [x] | ✅ CSS parsing + application |
| Placeholder Style | [~] | ⚠️ UI only, needs style element |
| Prefix/Suffix Style | [x] | ✅ CSS parsing + application |
| Help Message Style | [x] | ✅ CSS parsing + application |
| Container Style | [x] | ✅ CSS parsing + application |
| Error Message Style | [~] | ⚠️ UI only, needs error display |

---

### 4. Mask Input

#### Field Options
| Option | Status |
|--------|--------|
| (Same as Simple Text) | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| (Same as Simple Text) | [ ] |

---

### 5. Text Area ✅ FULLY IMPLEMENTED (UI + Preview)

#### Field Options
| Option | Status | Notes |
|--------|--------|-------|
| Element Label | [x] | ✅ UI + Preview |
| Label Placement | [x] | ✅ UI + Preview |
| Admin Field Label | [x] | ✅ UI + Preview |
| Placeholder | [x] | ✅ UI + Preview |
| Rows | [x] | ✅ UI + Preview |
| Columns | [x] | ✅ UI + Preview |
| Validation Rules (Required, Max Length) | [~] | ⚠️ UI only, backend validation needed |
| Default Value (+SmartCodes) | [x] | ✅ UI + Preview |
| Container Class | [x] | ✅ UI + Preview |
| Element Class | [x] | ✅ UI + Preview |
| Help Message | [x] | ✅ UI + Preview |
| Prefix Label | [x] | ✅ UI + Preview |
| Suffix Label | [x] | ✅ UI + Preview |
| Name Attribute | [x] | ✅ UI + Preview |
| Max Text Length | [x] | ✅ UI + Preview (maxlength) |
| Min Length | [x] | ✅ UI + Preview (minlength) |
| Conditional Logic | [x] | ✅ UI + Preview |
| **Resize** | | **IMPLEMENTED** |
| Resize Handle | [x] | ✅ UI + Preview (CSS resize: vertical/horizontal/both/none) |
| **RTL** | | **IMPLEMENTED** |
| Enable RTL | [x] | ✅ UI + Preview (dir="rtl" attribute) |

#### Style Options
| Option | Status | Notes |
|--------|--------|-------|
| Label Style | [x] | ✅ CSS parsing + application |
| Textarea Style | [x] | ✅ CSS parsing + application |
| Placeholder Style | [~] | ⚠️ UI only, needs style element |
| Help Message Style | [x] | ✅ CSS parsing + application |
| Container Style | [x] | ✅ CSS parsing + application |
| Error Message Style | [~] | ⚠️ UI only, needs error display |

---

### 6. Address Fields

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Admin Field Label | [ ] |
| Address Fields Configuration | [ ] |
| Address Line 1 (Label, Placement, Required) | [ ] |
| Address Line 2 (Label, Placement, Required) | [ ] |
| City (Label, Placement, Required) | [ ] |
| State (Label, Placement, Required) | [ ] |
| Zip Code (Label, Placement, Required) | [ ] |
| Country (Label, Placement, Required) | [ ] |
| Element Class | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Input Style | [ ] |
| Container Style | [ ] |
| Field Group Style | [ ] |

---

### 7. Country List

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Enable Searchable Smart Options | [ ] |
| Placeholder | [ ] |
| Validation Rules (Required) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Country List (Active, Visible, Hidden) | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Dropdown Style | [ ] |
| Search Box Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 8. Numeric Field

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Validation Rules (Required, Min, Max, Digits) | [ ] |
| Number Format | [ ] |
| Mobile Keyboard Type | [ ] |
| Default Value (+SmartCodes) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Step | [ ] |
| Prefix Label | [ ] |
| Suffix Label | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |
| Calculation Field Settings (Pro) | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Input Style | [ ] |
| Number Format Style | [ ] |
| Prefix/Suffix Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |
| Error Message Style | [ ] |

---

### 9. Phone Number

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Validation Rules (Required, Phone) | [ ] |
| Phone Format | [ ] |
| Default Value (+SmartCodes) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Prefix Label | [ ] |
| Suffix Label | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Input Style | [ ] |
| Placeholder Style | [ ] |
| Prefix/Suffix Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |
| Error Message Style | [ ] |

---

### 10. Dropdown ⚠️ PARTIALLY IMPLEMENTED

#### Field Options
| Option | Status | Notes |
|--------|--------|-------|
| Element Label | [x] | ✅ UI + Preview |
| Label Placement | [x] | ✅ UI + Preview |
| Admin Field Label | [x] | ✅ UI + Preview |
| Placeholder | [x] | ✅ UI + Preview |
| Options (Label, Value, Calc Value) | [x] | ✅ UI + Preview + Editor |
| Shuffle Options | [x] | ✅ UI only (needs render logic) |
| Enable Searchable Smart Options | [~] | ⚠️ UI only, needs JS library |
| Max Selection | [~] | ⚠️ UI only, multi-select not implemented |
| Validation Rules (Required) | [~] | ⚠️ UI only, backend needed |
| Dynamic Default Value (+SmartCodes) | [x] | ✅ UI + Preview |
| Container Class | [x] | ✅ UI + Preview |
| Element Class | [x] | ✅ UI + Preview |
| Help Message | [x] | ✅ UI + Preview |
| Name Attribute | [x] | ✅ UI + Preview |
| Conditional Logic | [x] | ✅ UI + Preview |
| **Search Options** | | **NEW** |
| Min Search Characters | [~] | ⚠️ UI only, needs search implementation |
| Selection Limit Message | [~] | ⚠️ UI only, needs validation |

#### Style Options
| Option | Status | Notes |
|--------|--------|-------|
| Label Style | [x] | ✅ CSS parsing + application |
| Dropdown Style | [x] | ✅ CSS parsing + application |
| Option Style | [~] | ⚠️ UI only, needs style element |
| Search Box Style | [~] | ⚠️ UI only, needs search |
| Help Message Style | [x] | ✅ CSS parsing + application |
| Container Style | [x] | ✅ CSS parsing + application |
| Error Message Style | [~] | ⚠️ UI only, needs error display |

---

### 11. Radio Field

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Options (Label, Value, Calc Value, Image) | [ ] |
| Layout | [ ] |
| Shuffle Options | [ ] |
| Validation Rules (Required) | [ ] |
| Dynamic Default Value (+SmartCodes) | [ ] |
| Container Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Radio Button Style | [ ] |
| Option Label Style | [ ] |
| Selected Option Style | [ ] |
| Layout Style | [ ] |
| Image Option Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 12. Checkbox

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Options (Label, Value, Calc Value, Image) | [ ] |
| Layout | [ ] |
| Shuffle Options | [ ] |
| Validation Rules (Required) | [ ] |
| Dynamic Default Value (+SmartCodes) | [ ] |
| Container Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Checkbox Style | [ ] |
| Option Label Style | [ ] |
| Selected Option Style | [ ] |
| Layout Style | [ ] |
| Image Option Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 13. Multiple Choice (Multiple Select) ⚠️ PARTIALLY IMPLEMENTED

#### Field Options
| Option | Status | Notes |
|--------|--------|-------|
| Element Label | [x] | ✅ UI + Preview |
| Label Placement | [x] | ✅ UI + Preview |
| Admin Field Label | [x] | ✅ UI + Preview |
| Placeholder | [~] | ⚠️ UI only, preview not rendering |
| Options (Label, Value, Calc Value) | [x] | ✅ UI + Preview + Editor |
| Shuffle Options | [x] | ✅ UI only (needs render logic) |
| Validation Rules (Required) | [~] | ⚠️ UI only, backend needed |
| Dynamic Default Value (+SmartCodes) | [x] | ✅ UI + Preview |
| Container Class | [x] | ✅ UI + Preview |
| Element Class | [x] | ✅ UI + Preview |
| Help Message | [x] | ✅ UI + Preview |
| Name Attribute | [x] | ✅ UI + Preview |
| Max Selection | [~] | ⚠️ UI only, needs validation |
| Conditional Logic | [x] | ✅ UI + Preview |
| **Multi-Select Options** | | **IMPLEMENTED** |
| Min Selections | [x] | ✅ UI + Preview (display message shown) |
| Select All Button | [x] | ✅ UI + Preview (button functional) |
| Display Format | [x] | ✅ UI + Preview (tags/text/count formats) |

#### Style Options
| Option | Status | Notes |
|--------|--------|-------|
| Label Style | [x] | ✅ CSS parsing + application |
| Dropdown Style | [~] | ⚠️ UI only, multi-select not rendered |
| Option Style | [~] | ⚠️ UI only, needs component |
| Selected Option Style | [~] | ⚠️ UI only, needs component |
| Help Message Style | [x] | ✅ CSS parsing + application |
| Container Style | [x] | ✅ CSS parsing + application |

---

### 14. Website URL

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Validation Rules (Required, URL) | [ ] |
| Default Value (+SmartCodes) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Prefix Label | [ ] |
| Suffix Label | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Input Style | [ ] |
| Placeholder Style | [ ] |
| Prefix/Suffix Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |
| Error Message Style | [ ] |

---

### 15. Time & Date

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Date Format | [ ] |
| Validation Rules (Required) | [ ] |
| Default Value (+SmartCodes) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Advanced Date Configuration (Pro) | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Date Picker Style | [ ] |
| Calendar Style | [ ] |
| Selected Date Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 16. Image Upload

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Button Text | [ ] |
| Upload Button Interface | [ ] |
| File Location Type | [ ] |
| Save Uploads in | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Validation Rules (Required, Max Size, Max Count, Types) | [ ] |
| Enable Crop | [ ] |
| Crop Type | [ ] |
| Crop Ratio | [ ] |
| Width (px) | [ ] |
| Height (px) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Button Style | [ ] |
| Dropzone Style | [ ] |
| Preview Style | [ ] |
| Crop Modal Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 17. File Upload

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Button Text | [ ] |
| Upload Button Interface | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Validation Rules (Required, Max Size, Max Count, Types) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| File Location Type | [ ] |
| Save Uploads in | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Button Style | [ ] |
| Dropzone Style | [ ] |
| File List Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 18. Custom HTML

#### Field Options
| Option | Status |
|--------|--------|
| HTML Code | [ ] |
| Conditional Logic | [ ] |
| Container Class | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Container Style | [ ] |

---

## Advanced Fields

### 19. Hidden Field

#### Field Options
| Option | Status |
|--------|--------|
| Admin Field Label | [ ] |
| Default Value (+SmartCodes) | [ ] |
| Name Attribute | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| N/A (Hidden) | N/A |

---

### 20. Section Break

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Description | [ ] |
| Content Alignment | [ ] |
| Element Class | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Heading Style | [ ] |
| Description Style | [ ] |
| Container Style | [ ] |
| Border Style | [ ] |

---

### 21. Password

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Validation Rules (Required) | [ ] |
| Default Value (+SmartCodes) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Prefix Label | [ ] |
| Suffix Label | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Input Style | [ ] |
| Toggle Visibility Button Style | [ ] |
| Prefix/Suffix Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |
| Error Message Style | [ ] |

---

### 22. Ratings

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Options (Rating Items/Labels) | [ ] |
| Show Text | [ ] |
| Icon Source | [ ] |
| Preset Icon | [ ] |
| Custom SVG Icon | [ ] |
| Inactive Color | [ ] |
| Active Color | [ ] |
| Validation Rules (Required) | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Icon Style | [ ] |
| Active Icon Style | [ ] |
| Inactive Icon Style | [ ] |
| Text Label Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 23. Terms & Conditions

#### Field Options
| Option | Status |
|--------|--------|
| Admin Field Label | [ ] |
| Validation Rules (Required) | [ ] |
| Terms & Conditions Content | [ ] |
| Show Checkbox | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Checkbox Style | [ ] |
| Content Style | [ ] |
| Link Style | [ ] |
| Container Style | [ ] |

---

### 24. GDPR Agreement

#### Field Options
| Option | Status |
|--------|--------|
| Admin Field Label | [ ] |
| Description | [ ] |
| Required Validation Message | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Checkbox Style | [ ] |
| Description Style | [ ] |
| Link Style | [ ] |
| Container Style | [ ] |

---

### 25. Checkable Grid

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Field Type (Checkbox/Radio) | [ ] |
| Grid Columns | [ ] |
| Grid Rows | [ ] |
| Validation Rules (Required) | [ ] |
| Container Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Grid Style | [ ] |
| Header Style | [ ] |
| Row Style | [ ] |
| Cell Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 26. reCAPTCHA

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Name Attribute | [ ] |
| Validation Rules (Auto Required) | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Badge Style | [ ] |
| Container Style | [ ] |

---

### 27. hCaptcha

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Name Attribute | [ ] |
| Validation Rules (Auto Required) | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Widget Style | [ ] |
| Container Style | [ ] |

---

### 28. Turnstile

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Name Attribute | [ ] |
| Validation Rules (Auto Required) | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Widget Style | [ ] |
| Container Style | [ ] |

---

### 29. Shortcode

#### Field Options
| Option | Status |
|--------|--------|
| Shortcode | [ ] |
| Element Class | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Container Style | [ ] |

---

### 30. Action Hook

#### Field Options
| Option | Status |
|--------|--------|
| Hook Name | [ ] |
| Element Class | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Container Style | [ ] |

---

### 31. Range Slider

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Min Value | [ ] |
| Max Value | [ ] |
| Default Value | [ ] |
| Step Value | [ ] |
| Show Value | [ ] |
| Value Prefix | [ ] |
| Value Suffix | [ ] |
| Validation Rules (Required) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Slider Track Style | [ ] |
| Slider Thumb Style | [ ] |
| Value Display Style | [ ] |
| Prefix/Suffix Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 32. Color Picker

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Default Color | [ ] |
| Color Format | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Picker Style | [ ] |
| Preview Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 33. Signature

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Signature Width | [ ] |
| Signature Height | [ ] |
| Pen Color | [ ] |
| Background Color | [ ] |
| Button Text (Clear) | [ ] |
| Validation Rules (Required) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Output Format | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Canvas Border Style | [ ] |
| Clear Button Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 34. Form Step

#### Field Options
| Option | Status |
|--------|--------|
| Previous Button (Type, Text, Image) | [ ] |
| Next Button (Type, Text, Image) | [ ] |
| Element Class | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Button Style | [ ] |
| Step Indicator Style | [ ] |
| Container Style | [ ] |

---

### 35. Custom Submit Button

#### Field Options
| Option | Status |
|--------|--------|
| Button Text | [ ] |
| Button Style | [ ] |
| Button Size | [ ] |
| Content Alignment | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Button Style | [ ] |
| Button Hover Style | [ ] |
| Container Style | [ ] |
| Alignment Style | [ ] |

---

## Container Fields

### 36-46. Multi-Column Containers (1-6 Columns)

#### Field Options
| Option | Status |
|--------|--------|
| Container Class | [ ] |
| Conditional Logic | [ ] |
| Column Width % | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Container Style | [ ] |
| Column Gap Style | [ ] |
| Column Style | [ ] |

---

## Pro Fields

### 37. Chained Select

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Chained Levels Configuration | [ ] |
| Enable Searchable Smart Options | [ ] |
| Validation Rules (Required) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Dropdown Style | [ ] |
| Level Label Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 38. Net Promoter Score

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| NPS Range | [ ] |
| Labels (Detractors, Passives, Promoters) | [ ] |
| Validation Rules (Required) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Scale Style | [ ] |
| Button Style | [ ] |
| Region Label Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 39. Repeat Field

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Admin Field Label | [ ] |
| Child Fields Selection | [ ] |
| Min Repeat | [ ] |
| Max Repeat | [ ] |
| Add Button Text | [ ] |
| Remove Button Text | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Repeat Group Style | [ ] |
| Add Button Style | [ ] |
| Remove Button Style | [ ] |
| Container Style | [ ] |

---

### 40. Post/CPT Selection

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Post Type Selection | [ ] |
| Query Filter | [ ] |
| Enable Searchable Smart Options | [ ] |
| Validation Rules (Required) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Dropdown Style | [ ] |
| Option Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 41. Rich Text Input

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Default Value | [ ] |
| Editor Toolbar | [ ] |
| Validation Rules (Required) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Media Upload | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Editor Style | [ ] |
| Toolbar Style | [ ] |
| Content Area Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 42. Dynamic List

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Admin Field Label | [ ] |
| List Columns Configuration | [ ] |
| Add Button Text | [ ] |
| Min Rows | [ ] |
| Max Rows | [ ] |
| Validation Rules (Required) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Table Style | [ ] |
| Header Style | [ ] |
| Row Style | [ ] |
| Add Button Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

## Payment Fields

### 43. Payment Item

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Admin Field Label | [ ] |
| Item Type | [ ] |
| Price | [ ] |
| Quantity Enabled | [ ] |
| Default Quantity | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Price Style | [ ] |
| Quantity Style | [ ] |
| Container Style | [ ] |

---

### 44. Subscription Item

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Admin Field Label | [ ] |
| Billing Cycle | [ ] |
| Trial Period | [ ] |
| Setup Fee | [ ] |
| Recurring Amount | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Price Style | [ ] |
| Cycle Style | [ ] |
| Container Style | [ ] |

---

### 45. Coupon

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Apply Button Text | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Input Style | [ ] |
| Apply Button Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |

---

### 46. Quantity

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Admin Field Label | [ ] |
| Default Quantity | [ ] |
| Min Quantity | [ ] |
| Max Quantity | [ ] |
| Step Value | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Prefix Label | [ ] |
| Suffix Label | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Input Style | [ ] |
| Control Button Style | [ ] |
| Prefix/Suffix Style | [ ] |
| Container Style | [ ] |

---

### 47. Payment Summary

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Admin Field Label | [ ] |
| Summary Type | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Name Attribute | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Amount Style | [ ] |
| Container Style | [ ] |

---

### 48. Custom Payment Amount

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Label Placement | [ ] |
| Admin Field Label | [ ] |
| Placeholder | [ ] |
| Minimum Amount | [ ] |
| Maximum Amount | [ ] |
| Validation Rules (Required, Numeric) | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Help Message | [ ] |
| Prefix Label | [ ] |
| Suffix Label | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Input Style | [ ] |
| Prefix/Suffix Style | [ ] |
| Help Message Style | [ ] |
| Container Style | [ ] |
| Error Message Style | [ ] |

---

### 49. Payment Method

#### Field Options
| Option | Status |
|--------|--------|
| Element Label | [ ] |
| Admin Field Label | [ ] |
| Available Methods | [ ] |
| Default Method | [ ] |
| Container Class | [ ] |
| Element Class | [ ] |
| Name Attribute | [ ] |
| Conditional Logic | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| Label Style | [ ] |
| Method Option Style | [ ] |
| Selected Method Style | [ ] |
| Container Style | [ ] |

---

### 50. Billing Address

#### Field Options
| Option | Status |
|--------|--------|
| (Same as Address Fields) | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| (Same as Address Fields) | [ ] |

---

### 51. Shipping Address

#### Field Options
| Option | Status |
|--------|--------|
| (Same as Address Fields) | [ ] |

#### Style Options
| Option | Status |
|--------|--------|
| (Same as Address Fields) | [ ] |

---

## Common Style Options (Apply to All Fields)

| Option | Status |
|--------|--------|
| Container Margin | [ ] |
| Container Padding | [ ] |
| Container Background | [ ] |
| Container Border | [ ] |
| Container Border Radius | [ ] |
| Container Shadow | [ ] |
| Label Color | [ ] |
| Label Font Size | [ ] |
| Label Font Weight | [ ] |
| Input Background | [ ] |
| Input Border | [ ] |
| Input Border Radius | [ ] |
| Input Padding | [ ] |
| Input Height | [ ] |
| Placeholder Color | [ ] |
| Required Indicator Color | [ ] |
| Help Message Color | [ ] |
| Error Message Color | [ ] |
| Focus State Style | [ ] |

---

## Form Shortcode Options

### Basic Shortcode

| Shortcode | Description | Status |
|-----------|-------------|--------|
| `[formglut id="{form_id}"]` | Embed a form by ID | [x] |

**Shortcode Parameters:**

| Parameter | Type | Description | Status |
|-----------|------|-------------|--------|
| `id` | Integer | Form ID (required) | [x] |
| `title` | String | Custom form title override | [ ] |
| `description` | String | Custom form description | [ ] |
| `class` | String | Additional CSS classes | [ ] |
| `style` | String | Inline CSS styles | [ ] |

### Advanced Shortcode Options

| Parameter | Type | Description | Status |
|-----------|------|-------------|--------|
| `redirect_url` | URL | Custom redirect URL after submission | [ ] |
| `hide_title` | Boolean | Hide form title | [ ] |
| `hide_description` | Boolean | Hide form description | [ ] |
| `ajax_submit` | Boolean | Enable AJAX form submission | [ ] |
| `css_id` | String | Custom CSS ID for form container | [ ] |

### Entry Display Shortcode

| Shortcode | Description | Status |
|-----------|-------------|--------|
| `[formglut_entries id="{form_id}"]` | Display form entries table | [ ] |
| `[formglut_entries id="{form_id}" user="{user_id}"]` | Display entries for specific user | [ ] |

**Entry Display Parameters:**

| Parameter | Type | Description | Status |
|-----------|------|-------------|--------|
| `id` | Integer | Form ID (required) | [ ] |
| `user` | Integer | User ID to filter entries | [ ] |
| `limit` | Integer | Number of entries to display | [ ] |
| `status` | String | Filter by entry status (all/read/unread) | [ ] |
| `columns` | String | Comma-separated field names to display | [ ] |
| `date_format` | String | PHP date format for dates | [ ] |

### Submission Count Shortcode

| Shortcode | Description | Status |
|--------|-------------|--------|
| `[formglut_submission_count id="{form_id}"]` | Display total submission count | [ ] |

**Count Parameters:**

| Parameter | Type | Description | Status |
|-----------|------|-------------|--------|
| `id` | Integer | Form ID (required) | [ ] |
| `status` | String | Filter by entry status | [ ] |
| `label` | String | Custom label before count | [ ] |
| `label_after` | String | Custom label after count | [ ] |

### Field Value Shortcode

| Shortcode | Description | Status |
|-----------|-------------|--------|
| `[formglut_field_value field="{field_name}"]` | Display submitted field value | [ ] |
| `[formglut_field_value field="{field_name}" entry_id="{id}"]` | Display specific entry field value | [ ] |

**Field Value Parameters:**

| Parameter | Type | Description | Status |
|-----------|------|-------------|--------|
| `field` | String | Field name/attribute (required) | [ ] |
| `entry_id` | Integer | Specific entry ID | [ ] |
| `default` | String | Default value if not found | [ ] |
| `format` | String | Output format (html/text/raw) | [ ] |

### Form Summary Shortcode

| Shortcode | Description | Status |
|-----------|-------------|--------|
| `[formglut_summary id="{form_id}"]` | Display form statistics summary | [ ] |

**Summary Parameters:**

| Parameter | Type | Description | Status |
|-----------|------|-------------|--------|
| `id` | Integer | Form ID (required) | [ ] |
| `show_count` | Boolean | Show total submissions | [ ] |
| `show_views` | Boolean | Show form views | [ ] |
| `show_rate` | Boolean | Show conversion rate | [ ] |
| `period` | String | Time period (today/week/month/year/all) | [ ] |

---

*Last Updated: 2026-06-03*
