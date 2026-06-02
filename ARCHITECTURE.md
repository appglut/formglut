# FormGlut Architecture Documentation

This document describes how FormGlut admin pages are structured, styled, and loaded. Use this reference to understand the project setup and debug issues.

## Project Structure

```
formglut/
├── assets/
│   ├── src/              # Source files (React, JSX, CSS)
│   │   ├── admin.css    # Global admin styles
│   │   ├── main.css     # Main styles
│   │   ├── components/  # Reusable React components
│   │   ├── fields/      # Field type definitions and options
│   │   ├── pages/       # Page components
│   │   │   ├── FormEditor.jsx + form-editor.css
│   │   │   ├── index-all-forms.jsx
│   │   │   ├── index-form-editor.jsx
│   │   │   ├── index-settings.jsx
│   │   │   ├── index-single-entry.jsx
│   │   │   └── index-entries.jsx
│   │   └── services/    # API services
│   └── build/           # Built/compiled files
│       ├── all-forms.js
│       ├── form-editor.js
│       ├── settings.js
│       ├── entries.js
│       ├── single-entry.js
│       ├── assets/      # Built CSS files
│       │   ├── form-editor.css
│       │   └── Header.css
│       └── chunks/      # Shared chunks
├── includes/           # PHP backend files
│   └── class-formglut-admin.php
└── global-assets/      # Global images, icons
```

## Page Loading System

### How Pages Load in WordPress

1. **PHP Side** (`includes/class-formglut-admin.php`):
   - Adds menu items using `add_menu_page()` and `add_submenu_page()`
   - Enqueues React build JS/CSS files for each page
   - Renders a `<div id="formglut-root"></div>` container

2. **React Side** (Index files):
   - Each page has an `index-*.jsx` entry point
   - Uses React 18 `createRoot()` to mount the app
   - Imports required CSS and page component

### Page Entry Points (index-*.jsx files)

| Page | Entry File | Component | CSS Files |
|------|-----------|-----------|-----------|
| All Forms | `index-all-forms.jsx` | AllForms | `admin.css` |
| Form Editor | `index-form-editor.jsx` | FormEditor | `admin.css`, `form-editor.css` |
| Settings | `index-settings.jsx` | Settings | `admin.css` |
| Entries | `index-entries.jsx` | Entries | `admin.css` |
| Single Entry | `index-single-entry.jsx` | SingleEntry | `admin.css` |

## CSS Files and Their Usage

### 1. admin.css
**Location**: `assets/src/admin.css`
**Usage**: Loaded on ALL admin pages
**Contains**: Global styles for:
- Header (`.fg-header`, `.fg-header-nav`)
- Layout (`.fg-content`, `.fg-page-header`)
- Tables (`.fg-table-wrap`, `.fg-table-toolbar`)
- Cards (`.fg-card`, `.fg-stat-card`)
- Status dots (`.fg-status-dot`)
- Shortcodes (`.fg-shortcode`)
- Row actions (`.fg-row-actions`)
- Filter tabs (`.fg-filter-tabs`)
- Empty states (`.fg-empty-state`)
- Responsive media queries

### 2. form-editor.css
**Location**: `assets/src/pages/form-editor.css`
**Usage**: Loaded ONLY on Form Editor page (via FormEditor.jsx import)
**Contains**: Editor-specific styles for:
- Editor header (`.fg-editor-header`)
- Sidebar (`.fg-sidebar`, `.fg-field-grid`)
- Canvas (`.fg-canvas`, `.fg-canvas-form`)
- Form fields (`.fg-form-field`, `.fg-form-field-label`)
- Field toolbar (`.fg-field-toolbar`)
- Properties panel (`.fg-prop-section`, `.fg-prop-field`)
- Drop indicators (`.fg-drop-indicator`)
- Device switcher (`.fg-device-switcher`)

### 3. main.css
**Location**: `assets/src/main.css`
**Usage**: General styles (if any)

## Build System

### Build Command
```bash
npm run build
```

### What Gets Built

**JavaScript Files** (in `assets/build/`):
- `all-forms.js` - All Forms page bundle
- `form-editor.js` - Form Editor page bundle
- `settings.js` - Settings page bundle
- `entries.js` - Entries page bundle
- `single-entry.js` - Single Entry page bundle

**CSS Files** (in `assets/build/assets/`):
- `form-editor.css` - Compiled from `assets/src/pages/form-editor.css`
- `Header.css` - Compiled from `assets/src/components/Header.css`

**Shared Chunks** (in `assets/build/chunks/`):
- Common React/antd/FontAwesome code split into shared chunks

### Important: CSS Build Notes

1. **CSS is extracted during build** - CSS imports in JSX files are extracted to separate CSS files
2. **Build must be run after CSS changes** - If you modify `.css` files, run `npm run build`
3. **Do NOT manually delete build CSS files** - They must be regenerated via build
4. **Cache issues** - If styles look wrong, delete `assets/build/assets/*.css` and rebuild

## Component Architecture

### Field Types System
**Location**: `assets/src/fields/fieldTypes.jsx`

Defines all available field types with:
- Type icons
- Default props (options available for each field)
- Category grouping

### Dynamic Field Options
**Location**: `assets/src/fields/DynamicFieldOptions.jsx`

Renders field-specific options in the properties panel:
- Reads field type configuration
- Generates appropriate input controls (text, select, switch, number, etc.)
- Groups options by section (General, Validation, Style, Advanced, Conditional, Calculation)

## Common Issues and Solutions

### Issue: "Skeleton" appearance on pages
**Cause**: CSS files not loading
**Solution**:
1. Check if CSS files exist in `assets/build/assets/`
2. If missing, run `npm run build`
3. Clear browser cache

### Issue: Build fails with "symbol already declared"
**Cause**: Duplicate variable declarations in source files
**Solution**: Check for duplicate exports or variable definitions

### Issue: Styles not updating after CSS changes
**Cause**: Old CSS cached in build directory
**Solution**:
```bash
rm assets/build/assets/*.css
npm run build
```

### Issue: Import errors for components
**Cause**: Wrong import path or component doesn't exist
**Solution**: Verify the file exists and import path is correct relative to the importing file

## Key Import Paths

From `pages/` directory:
```javascript
// Components
import Header from '../components/Header';
import DynamicFieldOptions from '../fields/DynamicFieldOptions';

// Field types
import { FIELD_TYPES, COMMON_OPTIONS } from '../fields/fieldTypes';

// Services
import * as api from '../services/api';

// CSS
import '../admin.css';           // Global admin styles
import './form-editor.css';      // Page-specific styles
```

## WordPress Integration

### Enqueue Points
**File**: `includes/class-formglut-admin.php`

Each page has an enqueue function:
- `enqueue_all_forms_scripts()` - For All Forms page
- `enqueue_form_editor_scripts()` - For Form Editor page
- `enqueue_settings_scripts()` - For Settings page
- `enqueue_entries_scripts()` - For Entries page
- `enqueue_single_entry_scripts()` - For Single Entry page

These functions:
1. Enqueue the built JS file for the page
2. Enqueue the built CSS file (if exists)
3. Set dependencies (React, wp-element)
4. Localize script with data (if needed)

### React Root
All pages render into:
```html
<div id="formglut-root"></div>
```

## Development Workflow

1. **Modify source files** in `assets/src/`
2. **Run build**: `npm run build`
3. **Check output** in `assets/build/`
4. **Test in WordPress** admin

### Quick Build Check
After running `npm run build`, verify:
```bash
# JS files should exist
ls -la assets/build/*.js

# CSS files should exist
ls -la assets/build/assets/*.css

# Check timestamps are recent
ls -la assets/build/
```

## CSS Class Naming Convention

Prefix all FormGlut-specific classes with `fg-`:
- `.fg-header` - Header
- `.fg-content` - Main content area
- `.fg-prop-*` - Properties panel related
- `.fg-form-field` - Form field on canvas
- `.fg-field-*` - Field related
- `.fg-editor-*` - Editor specific
- `.fg-sidebar` - Sidebar panel

This prevents conflicts with WordPress admin and Ant Design classes.
