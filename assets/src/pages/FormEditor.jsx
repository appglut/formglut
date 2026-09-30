import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Switch, Input, InputNumber, Select, Tabs, Tooltip, message, Spin, Collapse } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faArrowUp, faArrowDown, faFloppyDisk, faEye, faRotateLeft, faRotateRight,
  faCopy, faTrash, faGear, faPalette, faPlus, faCircleInfo, faCode, faClock, faEyeSlash, faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { _pg } from '../components/Header';
import * as api from '../services/api';
import { FIELD_TYPES, createField, getAllFieldTypes, getEnabledFieldTypes, isContainerField, flattenFields } from '../fields/fieldTypes.jsx';
import DynamicFieldOptions from '../fields/DynamicFieldOptions.jsx';
import { getStyleGroups, STYLE_BLOCKS } from '../fields/SharedOptions.jsx';
import { __ } from '@wordpress/i18n';
import { COUNTRIES } from '../fields/countries.js';
import './form-editor.css';

/**
 * Scope for Pro plugin to extend field types.
 * Pro plugin can inject its fields via:
 * window.formglut_pro_fields = { field_key: { label: '...', icon: '...', category: '...', pro: true, defaultProps: {...} } };
 */

// Configure message duration and placement
message.config({
  duration: 3,
  maxCount: 3,
  top: 24,
  placement: 'top',
});

let uid = 0;
function genId() { uid += 1; return 'f' + Date.now() + '_' + uid; }

/* ── CSS Parser Helper ──────────────────────────────────────────────── */

/**
 * Parse CSS string into style object
 * Handles CSS properties like "color: red; font-size: 14px;"
 */
/* ── Field tree helpers (column containers hold nested fields) ─────── */
const CONTAINER_GAPS = { none: 0, small: 8, medium: 16, large: 24 };

// Apply fn(list, idx) to whichever list (top level or a column) holds `id`. Returns the new tree, or null if not found.
function updateParentList(list, id, fn) {
  const idx = list.findIndex(f => f.id === id);
  if (idx !== -1) return fn(list, idx);
  let found = false;
  const next = list.map(f => {
    if (found || !isContainerField(f)) return f;
    const columns = f.columns.map(col => {
      if (found) return col;
      const r = updateParentList(col.fields || [], id, fn);
      if (!r) return col;
      found = true;
      return { ...col, fields: r };
    });
    return found ? { ...f, columns } : f;
  });
  return found ? next : null;
}

function findFieldInTree(list, id) {
  for (const f of list) {
    if (f.id === id) return f;
    if (isContainerField(f)) {
      for (const col of f.columns) {
        const r = findFieldInTree(col.fields || [], id);
        if (r) return r;
      }
    }
  }
  return null;
}

// Returns { containerId, colIdx, index } describing where `id` lives.
function locateField(list, id, ctx = { containerId: null, colIdx: 0 }) {
  const idx = list.findIndex(f => f.id === id);
  if (idx !== -1) return { ...ctx, index: idx };
  for (const f of list) {
    if (!isContainerField(f)) continue;
    for (let ci = 0; ci < f.columns.length; ci++) {
      const r = locateField(f.columns[ci].fields || [], id, { containerId: f.id, colIdx: ci });
      if (r) return r;
    }
  }
  return null;
}

// Insert `field` at target { containerId, colIdx, index }; containerId null = top level.
function insertIntoTree(list, target, field) {
  const splice = (l) => { const n = [...l]; n.splice(Math.min(target.index ?? n.length, n.length), 0, field); return n; };
  if (!target.containerId) return splice(list);
  return updateParentList(list, target.containerId, (l, i) => l.map((f, j) => j !== i ? f : {
    ...f,
    columns: f.columns.map((col, ci) => ci === target.colIdx ? { ...col, fields: splice(col.fields || []) } : col),
  })) || list;
}

function cloneWithNewIds(field) {
  const copy = JSON.parse(JSON.stringify(field));
  (function reId(f) {
    f.id = genId();
    if (isContainerField(f)) f.columns.forEach(col => (col.fields || []).forEach(reId));
  })(copy);
  return copy;
}

function parseCss(cssString) {
  if (!cssString || typeof cssString !== 'string') return {};
  const styles = {};
  cssString.split(';').forEach(rule => {
    const [property, ...valueParts] = rule.split(':');
    const value = valueParts.join(':').trim();
    const prop = property?.trim();
    if (prop && value) {
      // Convert CSS property to JS style property (e.g., "font-size" -> "fontSize")
      const jsProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      styles[jsProp] = value;
    }
  });
  return styles;
}

/**
 * Get inputmode attribute value for mobile keyboard types
 */
function getInputMode(keyboardType) {
  const modeMap = {
    numeric: 'numeric',
    decimal: 'decimal',
    tel: 'tel',
    email: 'email',
    url: 'url',
  };
  return modeMap[keyboardType] || undefined;
}

/* ── Field Preview (Canvas) ───────────────────────────────────────── */

/**
 * Placeholder Styles Injector Component
 *
 * Injects dynamic styles for placeholder pseudo-elements
 * Since ::placeholder cannot be set via inline styles, we inject a <style> tag
 */
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

    // Add to document head
    document.head.appendChild(styleElement);

    // Cleanup on unmount
    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
    };
  }, [fieldId, placeholderStyle]);

  return null;
}

/**
 * Shuffle array helper
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Apply input mask to a value
 * Basic implementation without external library
 */
function applyInputMask(value, mask) {
  if (!mask || !value) return value;

  const maskChars = mask.split('');
  const valueChars = value.toString().split('');
  let result = '';
  let valueIndex = 0;

  for (let i = 0; i < maskChars.length && valueIndex < valueChars.length; i++) {
    const maskChar = maskChars[i];
    const valueChar = valueChars[valueIndex];

    if (maskChar === '9') {
      // Digit placeholder
      if (/\d/.test(valueChar)) {
        result += valueChar;
        valueIndex++;
      }
    } else if (maskChar === 'a') {
      // Letter placeholder
      if (/[a-zA-Z]/.test(valueChar)) {
        result += valueChar;
        valueIndex++;
      }
    } else if (maskChar === '*') {
      // Alphanumeric placeholder
      if (/[a-zA-Z0-9]/.test(valueChar)) {
        result += valueChar;
        valueIndex++;
      }
    } else {
      // Literal character
      result += maskChar;
      if (valueChar === maskChar) {
        valueIndex++;
      }
    }
  }

  return result;
}

/**
 * Validate input against mask pattern
 */
function validateAgainstMask(value, mask) {
  if (!mask) return true;
  if (!value) return true;

  // Count required digit/letter positions in mask
  const requiredPositions = (mask.match(/[9a*]/g) || []).length;
  const valueLength = value.toString().replace(/[^0-9a-zA-Z]/g, '').length;

  return valueLength >= requiredPositions;
}

// Helper to convert value to px string with fallback
const pad = (val, fallback) => (val != null && val !== '' ? val + 'px' : fallback + 'px');

// Same wording as the live form (class-formglut-shortcode.php selection_hint()).
function getSelectionHint(min, max) {
  min = Number(min) || 0; max = Number(max) || 0;
  if (min && max) return __( 'Select between %1$d and %2$d options', 'formglut' ).replace('%1$d', min).replace('%2$d', max);
  if (min) return __( 'Select at least %d options', 'formglut' ).replace('%d', min);
  if (max) return __( 'Select up to %d options', 'formglut' ).replace('%d', max);
  return '';
}

// Same list/order/format as the live form (class-formglut-shortcode.php country_options()).
function getCountryOptions(f) {
  let codes = Object.keys(COUNTRIES);
  if (f.country_list === 'include' && (f.included_countries || []).length) codes = codes.filter(c => f.included_countries.includes(c));
  else if (f.country_list === 'exclude' && (f.excluded_countries || []).length) codes = codes.filter(c => !f.excluded_countries.includes(c));
  const text = (c) => {
    const name = COUNTRIES[c];
    let t = f.display_format === 'code' ? c : f.display_format === 'both' ? `${name} (${c})` : name;
    if ((f.flag_type || 'emoji') === 'emoji') t = String.fromCodePoint(...[...c].map(ch => 0x1F1E6 + ch.charCodeAt(0) - 65)) + ' ' + t;
    return t;
  };
  const top = (f.top_countries || []).filter(c => codes.includes(c));
  return { top: top.map(c => ({ value: c, label: text(c) })), all: codes.map(c => ({ value: c, label: text(c) })) };
}

function renderCountryOptions(f) {
  const { top, all } = getCountryOptions(f);
  return (
    <>
      {top.map(o => <option key={'t' + o.value} value={o.value}>{o.label}</option>)}
      {top.length > 0 && <option disabled>──────────</option>}
      {all.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </>
  );
}

// Same masks as the live form (class-formglut-shortcode.php phone_mask()).
function getPhoneMask(f) {
  if (f.phone_format === 'custom') return f.custom_format || '';
  return { us: '(999) 999-9999', uk: '9999 999999' }[f.phone_format] || '';
}

// Same sizing/shape/style rules as the live form (class-formglut-shortcode.php submit_button_style()).
export function getSubmitButtonStyle(f) {
  const color = f.button_bg_color || '#e94560';
  const sizes = { small: ['8px 16px', 13], medium: ['12px 24px', 15], large: ['14px 32px', 17] };
  const [padding, fontSize] = sizes[f.button_size] || sizes.medium;
  const radius = { square: 0, rounded: 8, pill: 999 }[f.button_shape] ?? 8;
  const looks = {
    primary: { background: color, color: f.button_text_color || '#fff', borderColor: color },
    outline: { background: 'transparent', color: f.button_text_color || color, borderColor: color },
    secondary: { background: f.button_bg_color || '#f1f5f9', color: f.button_text_color || '#334155', borderColor: f.button_bg_color || '#e2e8f0' },
  };
  return { padding, fontSize, borderRadius: radius, borderWidth: 1, borderStyle: 'solid', fontWeight: 600, cursor: 'pointer', width: f.button_width === 'full' ? '100%' : 'auto', ...(looks[f.button_style] || looks.primary) };
}

const CAPTCHA_NAMES = { recaptcha: 'reCAPTCHA', hcaptcha: 'hCaptcha', turnstile: 'Cloudflare Turnstile' };

function FieldTemplate({ field: f, captcha = {} }) {
  // State for validation errors and multi-select
  const [validationErrors, setValidationErrors] = React.useState({});
  const [multiSelectValues, setMultiSelectValues] = React.useState(f.default_value || []);
  const [pwShown, setPwShown] = React.useState(false);

  // Parse custom style options
  const labelCustomStyle = parseCss(f.label_style);
  const inputCustomStyle = parseCss(f.input_style || f.textarea_style || f.dropdown_style);
  const helpTextCustomStyle = parseCss(f.help_text_style);
  const errorCustomStyle = parseCss(f.error_message_style);
  const containerCustomStyle = parseCss(f.container_style);
  const prefixSuffixCustomStyle = parseCss(f.prefix_suffix_style);

  // Per-field style options are passed as CSS variables; form-editor.css applies them with the same
  // precedence the live form gets from its !important inline styles (see .fg-form-field-input).
  const inputStyle = {
    '--fg-bg': f.bg_color || '#f8fafc',
    '--fg-color': f.text_color || '#1e293b',
    '--fg-border': f.border_color || '#e2e8f0',
    '--fg-radius': (f.border_radius ?? 8) + 'px',
    '--fg-pad': `${pad(f.padding_top, 10)} ${pad(f.padding_right, 14)} ${pad(f.padding_bottom, 10)} ${pad(f.padding_left, 14)}`,
    '--fg-margin': `${pad(f.margin_top, 0)} ${pad(f.margin_right, 0)} ${pad(f.margin_bottom, 0)} ${pad(f.margin_left, 0)}`,
    ...inputCustomStyle,
  };

  const fieldWidthVal = f.field_width === 'custom' && f.field_width_custom ? f.field_width_custom + 'px' : f.field_width;
  const wrapperStyle = {
    ...(fieldWidthVal && fieldWidthVal !== '100%' ? { maxWidth: fieldWidthVal } : {}),
    ...containerCustomStyle,
  };

  const labelPlacement = !f.label_placement || f.label_placement === 'default' ? 'top' : f.label_placement;
  const labelWidthVal = f.label_width === 'custom' && f.label_width_custom ? f.label_width_custom + 'px' : f.label_width;
  const labelStyle = labelPlacement === 'left' || labelPlacement === 'right'
    ? { flex: '0 0 auto', width: labelWidthVal && labelWidthVal !== 'auto' && labelWidthVal !== '100%' ? labelWidthVal : undefined, whiteSpace: 'nowrap', marginBottom: 0, ...labelCustomStyle }
    : labelPlacement === 'hidden' ? { display: 'none', ...labelCustomStyle }
    : labelPlacement === 'bottom' ? { marginTop: 6, marginBottom: 0, ...labelCustomStyle } : { ...labelCustomStyle };

  // Help text handling
  const showHelpTip = f.help_text && f.help_text_position === 'tooltip';
  const showHelpAbove = f.help_text && f.help_text_position === 'above';
  const showHelpBelow = f.help_text && (!f.help_text_position || f.help_text_position === 'below');

  // Get shuffled options if shuffle is enabled
  const getDisplayOptions = () => {
    const opts = f.options || [];
    if (f.shuffle_options) {
      return shuffleArray(opts);
    }
    return opts;
  };

  // Apply input mask to default value
  const getMaskedValue = (value) => {
    if (f.enable_mask && (f.custom_mask || f.mask_pattern)) {
      const mask = f.custom_mask || f.mask_pattern;
      return applyInputMask(value, mask);
    }
    return value;
  };

  // Get placeholder to display (show mask pattern as hint when mask is enabled)
  const getDisplayPlaceholder = () => {
    // If user has set a custom placeholder, use that
    if (f.placeholder && f.placeholder !== 'Enter text here...' && f.placeholder !== 'Type your message here...') {
      return f.placeholder;
    }
    // If mask is enabled, show the mask pattern as a hint
    if (f.enable_mask && (f.custom_mask || f.mask_pattern)) {
      const mask = f.custom_mask || f.mask_pattern;
      // Convert mask to user-friendly placeholder format
      // 9 -> #, a -> ?, * -> ?
      return mask
        .replace(/9/g, '#')
        .replace(/a/g, '?')
        .replace(/\*/g, '?');
    }
    // Otherwise use the default placeholder
    return f.placeholder;
  };

  // Error message display
  const getErrorMessage = () => {
    if (f.required && validationErrors.required) {
      return f.validation_message || 'This field is required';
    }
    if (f.validate_unique && validationErrors.unique) {
      return f.unique_error_message || 'This value already exists';
    }
    if (validationErrors.pattern) {
      return f.validation_message || 'Invalid format';
    }
    if (f.type === 'email' && f.confirm_email && validationErrors.confirm) {
      return f.confirm_error_message || 'Emails do not match';
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  // Display-only fields: same markup as the live form, no label/help wrapper.
  if (f.type === 'html') {
    return <div className={`fg-field-wrapper fg-html-content ${f.container_class || ''} ${f.css_class || ''} ${f.element_class || ''}`} dangerouslySetInnerHTML={{ __html: f.html_content || '' }} />;
  }
  if (f.type === 'heading') {
    const Tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(f.heading_level) ? f.heading_level : 'h2';
    return (
      <div className={`fg-field-wrapper fg-heading ${f.container_class || ''} ${f.css_class || ''}`} style={{ textAlign: f.alignment || 'left' }}>
        <Tag className={`fg-heading-text ${f.element_class || ''}`} style={f.custom_color ? { color: f.custom_color } : undefined}>{f.text || f.label}</Tag>
        {f.description && <p className="fg-heading-desc">{f.description}</p>}
        {f.show_divider && <hr className="fg-heading-divider" style={{ borderTopStyle: f.divider_style || 'solid', ...(f.divider_color ? { borderTopColor: f.divider_color } : {}) }} />}
      </div>
    );
  }
  const wrapCls = (extra) => `fg-field-wrapper ${extra} ${f.container_class || ''} ${f.css_class || ''}`;
  if (f.type === 'section_break') {
    const textStyle = f.text_color ? { color: f.text_color } : undefined;
    return (
      <div className={wrapCls('fg-section-break')} style={{ textAlign: f.alignment || 'left', ...(f.background_color ? { background: f.background_color, padding: '12px 16px', borderRadius: 8 } : {}) }}>
        <div className="fg-section-head">
          <div style={{ flex: 1 }}>
            {f.title && <h3 className={`fg-section-title ${f.element_class || ''}`} style={textStyle}>{f.title}</h3>}
            {f.description && <p className="fg-section-desc" style={textStyle}>{f.description}</p>}
          </div>
          {f.collapsible && <button type="button" className="fg-section-toggle">{f.default_collapsed ? (f.toggle_text_closed || __( 'Show', 'formglut' )) : (f.toggle_text_open || __( 'Hide', 'formglut' ))}</button>}
        </div>
        {f.show_divider && <hr className="fg-section-divider" style={{ borderTopStyle: f.divider_style || 'solid', borderTopWidth: (Number(f.divider_thickness) || 1) + 'px', ...(f.divider_color ? { borderTopColor: f.divider_color } : {}) }} />}
      </div>
    );
  }
  if (f.type === 'hidden') {
    return (
      <div className={wrapCls('fg-placeholder-box')}>
        <FontAwesomeIcon icon={faEyeSlash} /> <strong>{f.label || __( 'Hidden Field', 'formglut' )}</strong>
        <span className="fg-placeholder-meta">{f.param_populate ? `?${f.param_populate}= → ` : ''}{f.default_value ? `"${f.default_value}"` : __( '(empty)', 'formglut' )}</span>
        <span className="fg-placeholder-note">{__( 'Not visible on the form', 'formglut' )}</span>
      </div>
    );
  }
  if (f.type === 'shortcode' || f.type === 'action_hook') {
    const code = f.type === 'shortcode' ? f.shortcode_content : `do_action( '${f.hook_name || ''}' )`;
    return (
      <div className={wrapCls('fg-placeholder-box')}>
        <FontAwesomeIcon icon={faCode} /> <code className={f.element_class || ''}>{code}</code>
        <span className="fg-placeholder-note">{f.type === 'shortcode' && f.run_shortcode === false ? __( 'Shortcode disabled', 'formglut' ) : __( 'Output appears on the live form and in Preview', 'formglut' )}</span>
      </div>
    );
  }
  if (f.type === 'custom_submit_button') {
    return (
      <div className={wrapCls('fg-custom-submit')} style={{ textAlign: f.button_alignment || 'left' }}>
        <button type="button" className={f.element_class || ''} style={getSubmitButtonStyle(f)}>{f.button_text || __( 'Submit', 'formglut' )}</button>
      </div>
    );
  }
  if (CAPTCHA_NAMES[f.type]) {
    const cfg = captcha[f.type] || {};
    const invisible = f.type === 'recaptcha' && cfg.version !== 'v2';
    const turnstileQuiet = f.type === 'turnstile' && f.appearance === 'interaction-only';
    return (
      <div className={wrapCls('fg-captcha-mock')}>
        {cfg.ready === false && (
          <div className="fg-captcha-warning">
            {CAPTCHA_NAMES[f.type]} {__( 'keys are not set — the check will be skipped until you add them in', 'formglut' )} <a href={_pg.settings} target="_blank" rel="noopener noreferrer">{__( 'Settings', 'formglut' )}</a>.
          </div>
        )}
        {turnstileQuiet ? (
          <div className="fg-captcha-box fg-captcha-invisible"><FontAwesomeIcon icon={faShieldHalved} /> {__( 'Turnstile — shown only when Cloudflare needs an interaction', 'formglut' )}</div>
        ) : invisible ? (
          <div className="fg-captcha-box fg-captcha-invisible"><FontAwesomeIcon icon={faShieldHalved} /> {__( 'reCAPTCHA v3 — runs invisibly when the form is submitted', 'formglut' )}</div>
        ) : (
          <div className={`fg-captcha-box fg-captcha-${f.theme === 'dark' ? 'dark' : 'light'} ${f.size === 'compact' ? 'fg-captcha-compact' : ''} ${f.size === 'flexible' ? 'fg-captcha-flexible' : ''}`}>
            <span className="fg-captcha-check" /> {f.type === 'turnstile' ? __( 'Verify you are human', 'formglut' ) : __( "I'm not a robot", 'formglut' )}
            <span className="fg-captcha-brand">{CAPTCHA_NAMES[f.type]}</span>
          </div>
        )}
      </div>
    );
  }
  if (f.type === 'terms_conditions' || f.type === 'gdpr_agreement') {
    const isGdpr = f.type === 'gdpr_agreement';
    const mode = f.display_type === 'checkbox' || !f.display_type ? 'box' : f.display_type;
    const linkText = isGdpr ? (f.policy_url ? __( 'Privacy Policy', 'formglut' ) : '') : ((mode === 'modal' || (mode === 'link' && f.link_url)) ? (f.link_text || __( 'View Terms', 'formglut' )) : '');
    const agree = (
      <label className={`fg-consent ${!isGdpr && f.checkbox_position === 'right' ? 'fg-consent-right' : ''}`}>
        <input type="checkbox" className={f.element_class || ''} disabled checked={isGdpr && !!f.default_checked} readOnly />
        <span>{f.label}{linkText && <> <a href="#" onClick={(e) => e.preventDefault()}>{linkText}</a></>}{f.required && <span className="required"> *</span>}</span>
      </label>
    );
    return (
      <div className={wrapCls('fg-consent-field')}>
        {!isGdpr && mode === 'box' && f.terms_content && <div className="fg-terms-box" style={{ maxHeight: (Number(f.scroll_height) || 200) + 'px' }} dangerouslySetInnerHTML={{ __html: f.terms_content }} />}
        {isGdpr && f.policy_text && <p className="fg-choice-hint">{f.policy_text}</p>}
        {agree}
        {isGdpr && f.show_storage_info !== false && f.storage_duration_text && <p className="fg-choice-hint">{f.storage_duration_text.replace('{days}', f.storage_days ?? 365)}</p>}
        {isGdpr && f.show_withdraw_link && f.withdraw_text && <p className="fg-choice-hint">{f.withdraw_text}{f.withdraw_email && <> <a href="#" onClick={(e) => e.preventDefault()}>{f.withdraw_email}</a></>}</p>}
        {f.help_text && <div className="fg-help-text" style={helpTextCustomStyle}>{f.help_text}</div>}
      </div>
    );
  }

  const label = (
    <div className="fg-form-field-label" style={labelStyle}>
      {f.label || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>{f.type} {__('field', 'formglut')}</span>}
      {f.required && <span className="required">*</span>}
      {showHelpTip && (
        <span className="fg-help-tip" title={f.help_text}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="6.5" r="0.75" fill="currentColor"/>
          </svg>
        </span>
      )}
    </div>
  );

  function renderInput() {
    // Common input attributes
    const fieldName = f.name_attribute || f.id;
    const inputMode = getInputMode(f.mobile_keyboard_type);

    // Character limit (support both character_limit and max_length)
    const charLimit = (f.character_limit || f.max_length) ? Number(f.character_limit || f.max_length) : 0;
    const maxLength = charLimit > 0 ? charLimit : undefined;

    // Get display options (shuffled if enabled)
    const displayOptions = getDisplayOptions();
    const selectionHint = getSelectionHint(f.min_selections, f.max_selections);

    // === TEXTAREA ===
    if (f.type === 'textarea') {
      const resizeValue = f.resize || 'vertical';
      const resizeStyle = resizeValue === 'both' ? {} : { resize: resizeValue };
      const minLength = f.min_length ? Number(f.min_length) : undefined;
      return (
        <div className="fg-input-group">
          {f.prefix_label && <span className="fg-input-prefix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.prefix_label }} />}
          <textarea
            key={`textarea-${f.id}-${f.default_value || ''}-${f.max_length || ''}`}
            className={`fg-form-field-input fg-field-${f.id} ${f.element_class || ''}`}
            name={fieldName}
            rows={f.rows || 4}
            cols={f.cols ? Number(f.cols) : undefined}
            placeholder={getDisplayPlaceholder()}
            defaultValue={f.default_value}
            maxLength={maxLength}
            minLength={minLength}
            readOnly
            dir={f.enable_rtl ? 'rtl' : undefined}
            style={{ ...resizeStyle, ...inputStyle }}
          />
          {f.suffix_label && <span className="fg-input-suffix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.suffix_label }} />}
        </div>
      );
    }

    // === EMAIL (with confirmation support) ===
    if (f.type === 'email') {
      const maskedValue = getMaskedValue(f.default_value);
      return (
        <>
          {f.confirm_email ? (
            <>
              <div className="fg-input-group" style={{ marginBottom: 8 }}>
                {f.prefix_label && <span className="fg-input-prefix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.prefix_label }} />}
                <input
                  key={`email-${f.id}-primary`}
                  className={`fg-form-field-input fg-field-${f.id} ${f.element_class || ''}`}
                  type="email"
                  name={`${fieldName}_primary`}
                  placeholder={getDisplayPlaceholder()}
                  defaultValue={maskedValue}
                  maxLength={maxLength}
                  inputMode={inputMode}
                  readOnly
                  style={inputStyle}
                />
                {f.suffix_label && <span className="fg-input-suffix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.suffix_label }} />}
              </div>
              <div className="fg-input-group">
                <label style={{ fontSize: 12, color: '#64748b', marginBottom: 4, display: 'block' }}>
                  {f.confirm_label || 'Confirm Email Address'}
                </label>
                {f.prefix_label && <span className="fg-input-prefix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.prefix_label }} />}
                <input
                  key={`email-${f.id}-confirm`}
                  className={`fg-form-field-input ${f.element_class || ''}`}
                  type="email"
                  name={`${fieldName}_confirm`}
                  placeholder={f.confirm_placeholder || 'Re-enter email'}
                  defaultValue=""
                  inputMode={inputMode}
                  readOnly
                  style={inputStyle}
                />
                {f.suffix_label && <span className="fg-input-suffix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.suffix_label }} />}
              </div>
              {validationErrors.confirm && (
                <div className="fg-error-message" style={{ color: '#ef4444', fontSize: 12, marginTop: 4, ...errorCustomStyle }}>
                  {f.confirm_error_message || 'Emails do not match'}
                </div>
              )}
            </>
          ) : (
            <div className="fg-input-group">
              {f.prefix_label && <span className="fg-input-prefix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.prefix_label }} />}
              <input
                key={`email-${f.id}`}
                className={`fg-form-field-input fg-field-${f.id} ${f.element_class || ''}`}
                type="email"
                name={fieldName}
                placeholder={getDisplayPlaceholder()}
                defaultValue={maskedValue}
                maxLength={maxLength}
                inputMode={inputMode}
                readOnly
                style={inputStyle}
              />
              {f.suffix_label && <span className="fg-input-suffix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.suffix_label }} />}
            </div>
          )}
        </>
      );
    }

    // === SELECT (Dropdown) ===
    if (f.type === 'select') {
      const firstOptionDisabled = f.disable_first_option !== false;
      return (
        <select
          key={`select-${f.id}-${f.default_value || ''}`}
          className={`fg-form-field-input fg-field-${f.id} ${f.element_class || ''}`}
          name={fieldName}
          defaultValue={f.default_value}
          disabled
          style={inputStyle}
        >
          {f.placeholder && (
            <option value="" disabled={firstOptionDisabled}>{f.placeholder}</option>
          )}
          {displayOptions.map((opt, i) => (
            <option key={i} value={opt.value || opt.label} disabled={!!opt.disabled}>
              {opt.label || `Option ${i + 1}`}
            </option>
          ))}
        </select>
      );
    }

    // === MULTI-SELECT ===
    if (f.type === 'multiselect') {
      const defaults = Array.isArray(f.default_value) ? f.default_value : (f.default_value ? [f.default_value] : []);
      return (
        <div className={`fg-multiselect-wrapper fg-field-${f.id}`}>
          <select
            key={`multiselect-${f.id}-${defaults.join('|')}`}
            className={`fg-form-field-input ${f.element_class || ''}`}
            name={`${fieldName}[]`}
            multiple
            size={Math.min(Math.max(displayOptions.length, 2), 6)}
            defaultValue={defaults}
            disabled
            style={{ ...inputStyle, height: 'auto' }}
          >
            {displayOptions.map((opt, i) => (
              <option key={i} value={opt.value || opt.label}>{opt.label || `Option ${i + 1}`}</option>
            ))}
          </select>
          {f.select_all_button && <button type="button" className="fg-select-all-btn">{__( 'Select All', 'formglut' )}</button>}
          {selectionHint && <div className="fg-choice-hint">{selectionHint}</div>}
        </div>
      );
    }

    // === RADIO / CHECKBOX ===
    if (f.type === 'radio' || f.type === 'checkbox') {
      const isRadio = f.type === 'radio';
      const layout = f.layout || (f.inline ? 'inline' : 'default');
      const defaults = Array.isArray(f.default_value) ? f.default_value : (f.default_value ? [f.default_value] : []);
      return (
        <>
          <div className={`fg-choice-group fg-choice-layout-${layout} ${f.element_class || ''}`}>
            {displayOptions.map((opt, i) => {
              const val = opt.value || opt.label;
              return (
                <label key={i} className="fg-choice">
                  <input type={isRadio ? 'radio' : 'checkbox'} name={fieldName} disabled checked={defaults.includes(val)} readOnly />
                  <span>{opt.label || `Option ${i + 1}`}</span>
                </label>
              );
            })}
          </div>
          {!isRadio && selectionHint && <div className="fg-choice-hint">{selectionHint}</div>}
        </>
      );
    }

    const cls = `fg-form-field-input ${f.element_class || ''}`;
    const sub = (key, subLabel, input) => (
      <div key={key} className={'fg-subfield' + (key === 'street1' || key === 'street2' ? ' fg-subfield-full' : '')}>
        {subLabel && <label className="fg-sublabel">{subLabel}</label>}
        {input}
      </div>
    );

    // === NAME ===
    if (f.type === 'name') {
      const parts = [['first', f.show_first_name !== false], ['middle', !!f.show_middle_name], ['last', f.show_last_name !== false]].filter(p => p[1]);
      return (
        <div className={`fg-subfields fg-subfields-${f.name_layout === 'vertical' ? 1 : parts.length}`}>
          {parts.map(([p]) => sub(p, f[`${p}_name_label`], <input className={cls} type="text" placeholder={f[`${p}_name_placeholder`]} readOnly style={inputStyle} />))}
        </div>
      );
    }

    // === COUNTRY ===
    if (f.type === 'country_select') {
      return (
        <select key={`country-${f.id}-${f.default_value || ''}`} className={cls} defaultValue={f.default_value || ''} disabled style={inputStyle}>
          <option value="">{f.placeholder || __( 'Select a country', 'formglut' )}</option>
          {renderCountryOptions(f)}
        </select>
      );
    }

    // === SPINNER ===
    if (f.type === 'spinner') {
      const pos = f.button_position || 'both';
      const btns = f.show_buttons !== false;
      return (
        <div className={`fg-spinner fg-spinner-${pos}`}>
          {btns && <button type="button" className="fg-spin-btn fg-spin-dec">{f.decrement_label || '-'}</button>}
          <input className={cls} type="number" placeholder={f.placeholder} defaultValue={f.default_value} key={`spin-${f.id}-${f.default_value}`} readOnly style={inputStyle} />
          {btns && <button type="button" className="fg-spin-btn fg-spin-inc">{f.increment_label || '+'}</button>}
        </div>
      );
    }

    // === CURRENCY / PERCENTAGE ===
    if (f.type === 'currency' || f.type === 'percentage') {
      const symbol = f.type === 'currency' ? (f.currency_symbol ?? '$') : '%';
      const before = (f.symbol_position || (f.type === 'currency' ? 'before' : 'after')) === 'before';
      return (
        <div className="fg-input-group">
          {before && symbol && <span className="fg-input-prefix">{symbol}</span>}
          <input className={cls} type="number" placeholder={f.placeholder} defaultValue={f.default_value} key={`num-${f.id}-${f.default_value}`} readOnly style={inputStyle} />
          {!before && symbol && <span className="fg-input-suffix">{symbol}</span>}
        </div>
      );
    }

    // === TIME ===
    if (f.type === 'time') {
      return <input className={cls} type="time" defaultValue={f.default_value} key={`time-${f.id}-${f.default_value}`} readOnly style={inputStyle} />;
    }

    // === DATE RANGE ===
    if (f.type === 'date_range') {
      return (
        <div className="fg-subfields fg-subfields-2">
          {sub('start', f.start_label || __( 'Start Date', 'formglut' ), <input className={cls} type="date" readOnly style={inputStyle} />)}
          {sub('end', f.end_label || __( 'End Date', 'formglut' ), <input className={cls} type="date" readOnly style={inputStyle} />)}
        </div>
      );
    }

    // === ADDRESS ===
    if (f.type === 'address') {
      const cols = f.address_layout === 'vertical' ? 1 : Math.min(Math.max(Number(f.grid_columns) || 2, 1), 3);
      const parts = [
        ['street1', true], ['street2', f.include_street2 !== false], ['city', f.include_city !== false],
        ['state', f.include_state !== false], ['zip', f.include_zip !== false],
      ].filter(p => p[1]);
      return (
        <div className={`fg-subfields fg-subfields-${cols}`}>
          {parts.map(([p]) => sub(p, f[`${p}_label`], <input className={cls} type="text" placeholder={f[`${p}_placeholder`]} readOnly style={inputStyle} />))}
          {f.include_country && sub('country', f.country_label || __( 'Country', 'formglut' ), (
            <select className={cls} disabled style={inputStyle}><option>{__( 'Select a country', 'formglut' )}</option>{renderCountryOptions({})}</select>
          ))}
        </div>
      );
    }

    // === PASSWORD ===
    if (f.type === 'password') {
      const pw = (ph, key) => (
        <div className="fg-password-wrap" key={key}>
          <input className={cls} type={pwShown ? 'text' : 'password'} placeholder={ph} readOnly style={inputStyle} />
          {f.show_toggle !== false && <button type="button" className="fg-password-toggle" onClick={(e) => { e.stopPropagation(); setPwShown(v => !v); }}>{pwShown ? (f.hide_text || __( 'Hide', 'formglut' )) : (f.show_text || __( 'Show', 'formglut' ))}</button>}
        </div>
      );
      return (
        <>
          {pw(f.placeholder, 'main')}
          {f.enable_strength_meter && <div className="fg-strength"><div className="fg-strength-bar" /><span>{__( 'Password strength', 'formglut' )}</span></div>}
          {f.requirements_hint && <div className="fg-choice-hint">{f.requirements_hint}</div>}
          {f.require_confirmation && (
            <div style={{ marginTop: 10 }}>
              <label className="fg-sublabel">{f.confirmation_label || __( 'Confirm Password', 'formglut' )}</label>
              {pw(f.confirmation_placeholder, 'confirm')}
            </div>
          )}
        </>
      );
    }

    // === RANGE SLIDER ===
    if (f.type === 'range_slider') {
      const min = Number(f.min ?? 0), max = Number(f.max ?? 100);
      const val = f.default_value === '' || f.default_value === undefined ? min : Number(f.default_value);
      return (
        <div className="fg-range" style={f.track_color ? { '--fg-range-color': f.track_color } : undefined}>
          {f.show_value !== false && <div className="fg-range-value">{f.value_prefix}{val}{f.value_suffix}</div>}
          <input type="range" min={min} max={max} step={f.step || 1} value={val} readOnly disabled className={f.element_class || ''} />
          <div className="fg-range-ends"><span>{f.min_label || min}</span><span>{f.max_label || max}</span></div>
        </div>
      );
    }

    // === COLOR PICKER ===
    if (f.type === 'color_picker') {
      const type = f.picker_type || 'swatches';
      const swatches = type === 'picker' ? [] : (f.swatches || []);
      return (
        <div className={`fg-color-picker fg-swatch-${f.swatch_size || 'medium'} ${f.element_class || ''}`}>
          {swatches.map((c) => <span key={c} className={'fg-swatch' + (c.toLowerCase() === String(f.default_color || '').toLowerCase() ? ' selected' : '')} style={{ background: c }} />)}
          {type !== 'swatches' && <input type="color" value={f.default_color || '#000000'} readOnly disabled />}
        </div>
      );
    }

    // === MASK INPUT ===
    if (f.type === 'masked_input') {
      const mask = f.custom_mask || '';
      return (
        <>
          <div className="fg-input-group">
            {f.prefix_label && <span className="fg-input-prefix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.prefix_label }} />}
            <input className={cls} type="text" placeholder={f.placeholder || mask.replace(/9/g, '#').replace(/[a*]/g, '?')} defaultValue={f.default_value} key={`mask-${f.id}-${f.default_value}`} readOnly style={inputStyle} />
            {f.suffix_label && <span className="fg-input-suffix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.suffix_label }} />}
          </div>
          {f.mask_hint && <div className="fg-choice-hint">{f.mask_hint}</div>}
        </>
      );
    }

    // Pro fields are rendered by the formglut-pro plugin
    if (typeof window.formglutProRenderPreview === 'function') {
      const proPreview = window.formglutProRenderPreview(f, inputStyle);
      if (proPreview) return proPreview;
    }

    // === DEFAULT INPUT (text, number, etc.) ===
    const typeAttr = { number: 'number', email: 'email', url: 'url', phone: 'tel', date: f.date_type === 'datetime' ? 'datetime-local' : 'date' }[f.type] || 'text';
    const phoneMask = f.type === 'phone' ? getPhoneMask(f) : '';
    const maskedValue = getMaskedValue(f.default_value);
    const placeholder = f.type === 'date' ? undefined : (phoneMask && !f.placeholder ? phoneMask.replace(/9/g, '#') : getDisplayPlaceholder());
    const numAttrs = f.type === 'number' ? { min: f.min_value === '' ? undefined : f.min_value, max: f.max_value === '' ? undefined : f.max_value, step: f.step || undefined } : {};

    return (
      <div className="fg-input-group">
        {f.prefix_label && <span className="fg-input-prefix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.prefix_label }} />}
        <input
          key={`input-${f.id}-${f.default_value || ''}-${f.max_length || ''}`}
          className={`fg-form-field-input fg-field-${f.id} ${f.element_class || ''}`}
          type={typeAttr}
          name={fieldName}
          placeholder={placeholder}
          defaultValue={maskedValue}
          {...numAttrs}
          maxLength={maxLength}
          inputMode={inputMode}
          readOnly
          style={inputStyle}
        />
        {f.suffix_label && <span className="fg-input-suffix" style={prefixSuffixCustomStyle} dangerouslySetInnerHTML={{ __html: f.suffix_label }} />}
      </div>
    );
  }

  // Help text content (non-tooltip)
  const helpTextContent = (showHelpAbove || showHelpBelow) && (
    <div className="fg-help-text" style={helpTextCustomStyle}>
      {f.help_text}
    </div>
  );

  // Container class with field ID for placeholder targeting
  const containerClasses = `fg-field-wrapper ${f.container_class || ''} ${f.css_class || ''}`.trim();

  if (labelPlacement === 'left' || labelPlacement === 'right') {
    return (
      <>
        <PlaceholderStylesInjector fieldId={f.id} placeholderStyle={f.placeholder_style} />
        <div className={containerClasses} style={{ display: 'flex', alignItems: 'center', gap: 8, ...wrapperStyle }}>
          {labelPlacement === 'left' ? label : null}
          <div style={{ flex: 1 }}>
            {showHelpAbove && helpTextContent}
            {renderInput()}
            {showHelpBelow && helpTextContent}
            {errorMessage && (
              <div className="fg-error-message" style={{ color: '#ef4444', fontSize: 12, marginTop: 4, ...errorCustomStyle }}>
                {errorMessage}
              </div>
            )}
          </div>
          {labelPlacement === 'right' ? label : null}
        </div>
      </>
    );
  }

  return (
    <>
      <PlaceholderStylesInjector fieldId={f.id} placeholderStyle={f.placeholder_style} />
      <div className={containerClasses} style={wrapperStyle}>
        {labelPlacement !== 'bottom' && label}
        {showHelpAbove && helpTextContent}
        {renderInput()}
        {showHelpBelow && helpTextContent}
        {labelPlacement === 'bottom' && label}
        {errorMessage && (
          <div className="fg-error-message" style={{ color: '#ef4444', fontSize: 12, marginTop: 4, ...errorCustomStyle }}>
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
}

/* ── Add Fields Tab ────────────────────────────────────────────────── */

function AddFieldsTab({ onAddField: addFieldFn, insertTarget, onCancelTarget }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [proEnabled, setProEnabled] = React.useState(false);

  // Check if FormGlut Pro is enabled
  React.useEffect(() => {
    if (typeof window.formglut_admin !== 'undefined' && window.formglut_admin.pro_enabled) {
      setProEnabled(true);
    }
  }, []);

  function handleDragStart(e, fieldType) {
    e.dataTransfer.setData('fgFieldType', fieldType);
    e.dataTransfer.effectAllowed = 'copy';
  }

  function handleComingSoonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    message.info(__('This field is not implemented yet', 'formglut'));
  }

  // Group fields by category and filter by search
  const groupedFields = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const groups = {};

    // Get all fields (free + pro from Pro plugin if active)
    const allFields = getAllFieldTypes();

    Object.entries(allFields).forEach(([key, cfg]) => {
      // Filter by search query
      if (query && !cfg.label.toLowerCase().includes(query)) {
        return;
      }

      const category = cfg.category || 'general';
      const isPro = cfg.pro || false;

      // Skip pro fields if pro is not enabled
      if (isPro && !proEnabled) {
        return;
      }

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push({
        key,
        label: cfg.label,
        icon: cfg.icon,
        pro: isPro,
        enabled: true,
        coming_soon: cfg.coming_soon || false,
      });
    });

    // Maintain category order
    const categoryOrder = ['general', 'advanced', 'layout', 'payment', 'security', 'upload', 'survey', 'wordpress'];
    const orderedGroups = {};
    categoryOrder.forEach(cat => {
      if (groups[cat]) {
        orderedGroups[cat] = groups[cat];
      }
    });
    // Add any remaining categories not in the order list
    Object.keys(groups).forEach(cat => {
      if (!orderedGroups[cat]) {
        orderedGroups[cat] = groups[cat];
      }
    });

    return orderedGroups;
  }, [searchQuery, proEnabled]);

  return (
    <div style={{ padding: '0 4px' }}>
      {insertTarget && (
        <div className="fg-insert-target-banner">
          <span>{__( 'Adding to column', 'formglut' )} {insertTarget.colIdx + 1}</span>
          <button type="button" onClick={onCancelTarget}>{__( 'Cancel', 'formglut' )}</button>
        </div>
      )}
      {/* Search Input */}
      <Input
        placeholder={__('Search fields...', 'formglut')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        allowClear
        prefix={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>}
        style={{ marginBottom: 16 }}
      />

      {/* Field Accordion */}
      <Collapse
        defaultActiveKey={['general']}
        bordered={false}
        size="small"
        style={{ background: 'transparent' }}
        items={Object.entries(groupedFields).map(([category, fields]) => ({
          key: category,
          label: <span style={{ fontWeight: 600, fontSize: 13 }}>{{
            general: __('General Fields', 'formglut'),
            advanced: __('Advanced Fields', 'formglut'),
            layout: __('Container Layouts', 'formglut'),
            payment: __('Payment Fields', 'formglut'),
            security: __('Security Fields', 'formglut'),
            upload: __('Upload Fields', 'formglut'),
            survey: __('Survey & Quiz', 'formglut'),
            wordpress: __('WordPress', 'formglut'),
          }[category] || category}</span>,
          children: (
            <div className="fg-field-grid">
              {fields.map(ft => (
                <div
                  className={'fg-field-btn' + (ft.coming_soon ? ' fg-field-coming-soon' : '')}
                  key={ft.key}
                  draggable={!ft.coming_soon}
                  data-field-type={ft.key}
                  onDragStart={!ft.coming_soon ? (e) => handleDragStart(e, ft.key) : undefined}
                  onClick={!ft.coming_soon ? () => addFieldFn(ft.key) : handleComingSoonClick}
                >
                  <span className="fg-field-btn-icon">{ft.icon}</span>
                  <span className="fg-field-btn-label">{ft.label}</span>
                  {ft.coming_soon && <span className="fg-pro-badge fg-coming-soon-badge"><FontAwesomeIcon icon={faClock} /></span>}
                  
                </div>
              ))}
            </div>
          ),
        }))}
      />
    </div>
  );
}

/* ── Container Options ─────────────────────────────────────────────── */
function ContainerOptions({ field, onUpdate }) {
  const up = (u) => onUpdate(field.id, u);
  const setWidth = (ci, w) => up({ columns: field.columns.map((c, i) => i === ci ? { ...c, width: Math.max(1, Number(w) || 1) } : c) });
  const equalize = () => {
    const n = field.columns.length;
    const w = Math.floor((100 / n) * 100) / 100;
    up({ columns: field.columns.map((c, i) => ({ ...c, width: i === n - 1 ? Math.round((100 - w * (n - 1)) * 100) / 100 : w })) });
  };
  const total = Math.round(field.columns.reduce((a, c) => a + (Number(c.width) || 0), 0) * 100) / 100;
  return (
    <div>
      <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Columns', 'formglut' )}</div>
        {field.columns.map((col, ci) => (
          <div className="fg-prop-field" key={ci} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="fg-prop-label" style={{ marginBottom: 0, width: 80 }}>{__( 'Column', 'formglut' )} {ci + 1}</span>
            <InputNumber min={1} max={100} value={col.width} onChange={(v) => setWidth(ci, v)} addonAfter="%" style={{ flex: 1 }} />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: total === 100 ? '#94a3b8' : '#f59e0b' }}>
          <span>{__( 'Total', 'formglut' )}: {total}%</span>
          <Button size="small" onClick={equalize}>{__( 'Equal widths', 'formglut' )}</Button>
        </div>
      </div>
      <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Layout', 'formglut' )}</div>
        <div className="fg-prop-field"><div className="fg-prop-label">{__( 'Column Gap', 'formglut' )}</div>
          <Select value={field.gap || 'medium'} onChange={(v) => up({ gap: v })} style={{ width: '100%' }} options={[
            { value: 'none', label: __( 'None', 'formglut' ) },
            { value: 'small', label: __( 'Small (8px)', 'formglut' ) },
            { value: 'medium', label: __( 'Medium (16px)', 'formglut' ) },
            { value: 'large', label: __( 'Large (24px)', 'formglut' ) },
          ]} />
        </div>
        <div className="fg-prop-field" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="fg-prop-label" style={{ marginBottom: 0 }}>{__( 'Stack on mobile', 'formglut' )}</span>
          <Switch size="small" checked={field.responsive_stack !== false} onChange={(v) => up({ responsive_stack: v })} />
        </div>
        <div className="fg-prop-field"><div className="fg-prop-label">{__( 'Container CSS Class', 'formglut' )}</div>
          <Input value={field.container_class || ''} onChange={(e) => up({ container_class: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

/* ── Field Options Tab ─────────────────────────────────────────────── */

function FieldOptionsTab({ field, onUpdate, submitBtn, onSubBtnUpdate, selectedSubmit, allFields = [] }) {
  // Submit button options
  if (selectedSubmit) {
    const updateSub = (key, val) => { const u = {}; u[key] = val; onSubBtnUpdate(u); };

    // Helper to render label with tooltip
    const renderLabel = (label, tooltip) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span className="fg-prop-label" style={{ marginBottom: 0 }}>{label}</span>
        {tooltip && (
          <Tooltip title={tooltip}>
            <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: 13, color: '#94a3b8', cursor: 'help', flexShrink: 0, marginTop: -1 }} />
          </Tooltip>
        )}
      </div>
    );

    return (
      <div>
        <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Button Settings', 'formglut' )}</div>
          <div className="fg-prop-field">{renderLabel(__( 'Button Text', 'formglut' ), __( 'The text displayed on the submit button.', 'formglut' ))}<Input value={submitBtn.text} onChange={(e) => updateSub('text', e.target.value)} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Button Size', 'formglut' ), __( 'The preset size of the button. Small is compact, Large is more prominent.', 'formglut' ))}<Select value={submitBtn.size} onChange={(v) => updateSub('size', v)} style={{ width: '100%' }} options={[{ value: 'small', label: __( 'Small', 'formglut' ) }, { value: 'medium', label: __( 'Medium', 'formglut' ) }, { value: 'large', label: __( 'Large', 'formglut' ) }]} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Button Alignment', 'formglut' ), __( 'How the button is positioned within the form. Full Width stretches to fill the container.', 'formglut' ))}<Select value={submitBtn.alignment} onChange={(v) => updateSub('alignment', v)} style={{ width: '100%' }} options={[{ value: 'left', label: __( 'Left', 'formglut' ) }, { value: 'center', label: __( 'Center', 'formglut' ) }, { value: 'right', label: __( 'Right', 'formglut' ) }, { value: 'full', label: __( 'Full Width', 'formglut' ) }]} /></div>
        </div>
        <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Button Styling', 'formglut' )}</div>
          <div className="fg-prop-field">{renderLabel(__( 'Background Color', 'formglut' ), __( 'The background color of the submit button.', 'formglut' ))}<div style={{ display: 'flex', gap: 8 }}><input type="color" value={submitBtn.bg_color} onChange={(e) => updateSub('bg_color', e.target.value)} style={{ width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 }} /><Input value={submitBtn.bg_color} onChange={(e) => updateSub('bg_color', e.target.value)} style={{ flex: 1 }} /></div></div>
          <div className="fg-prop-field">{renderLabel(__( 'Text Color', 'formglut' ), __( 'The color of the text on the submit button.', 'formglut' ))}<div style={{ display: 'flex', gap: 8 }}><input type="color" value={submitBtn.text_color} onChange={(e) => updateSub('text_color', e.target.value)} style={{ width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 }} /><Input value={submitBtn.text_color} onChange={(e) => updateSub('text_color', e.target.value)} style={{ flex: 1 }} /></div></div>
          <div className="fg-prop-field">{renderLabel(__( 'Border Radius (px)', 'formglut' ), __( 'Round the corners of the button. Higher values create more rounded corners.', 'formglut' ))}<Input type="number" value={submitBtn.border_radius} onChange={(e) => updateSub('border_radius', parseInt(e.target.value) || 0)} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Font Size (px)', 'formglut' ), __( 'The size of the text on the button in pixels.', 'formglut' ))}<Input type="number" value={submitBtn.font_size} onChange={(e) => updateSub('font_size', parseInt(e.target.value) || 14)} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Font Weight', 'formglut' ), __( 'The thickness of the text. Bold makes the text more prominent.', 'formglut' ))}<Select value={submitBtn.font_weight} onChange={(v) => updateSub('font_weight', v)} style={{ width: '100%' }} options={[{ value: 400, label: __( 'Normal (400)', 'formglut' ) }, { value: 500, label: __( 'Medium (500)', 'formglut' ) }, { value: 600, label: __( 'Semi Bold (600)', 'formglut' ) }, { value: 700, label: __( 'Bold (700)', 'formglut' ) }]} /></div>
          <div className="fg-prop-field">{renderLabel(__( 'Height (px)', 'formglut' ), __( 'The height of the button in pixels.', 'formglut' ))}<Input type="number" value={submitBtn.height} onChange={(e) => updateSub('height', parseInt(e.target.value) || 48)} /></div>
        </div>
      </div>
    );
  }

  if (isContainerField(field)) return <ContainerOptions field={field} onUpdate={onUpdate} />;

  // Use dynamic field options renderer
  return <DynamicFieldOptions field={field} onUpdate={onUpdate} allFields={allFields} />;
}

/* ── Style Options Tab ─────────────────────────────────────────────── */

function StyleOptionsTab({ field, onUpdate }) {
  if (isContainerField(field)) {
    return (
      <div className="fg-prop-no-selection">
        <div className="fg-prop-no-selection-icon"><FontAwesomeIcon icon={faPalette} /></div>
        <div className="fg-prop-no-selection-text">{__( 'Containers have no style options.', 'formglut' )}<br/>{__( 'Use Field Options to set column widths and gap.', 'formglut' )}</div>
      </div>
    );
  }
  if (!field) {
    return (
      <div className="fg-prop-no-selection">
        <div className="fg-prop-no-selection-icon"><FontAwesomeIcon icon={faPalette} /></div>
        <div className="fg-prop-no-selection-text">{__( 'Select a field', 'formglut' )}<br/>{__( 'to edit its style', 'formglut' )}</div>
      </div>
    );
  }

  const up = (key, val) => { const u = {}; u[key] = val; onUpdate(field.id, u); };
  const styleGroups = getStyleGroups(field.type);
  const has = (group) => styleGroups.includes(group);

  // Helper to render label with tooltip
  const renderLabel = (label, tooltip) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
      <span className="fg-prop-label" style={{ marginBottom: 0 }}>{label}</span>
      {tooltip && (
        <Tooltip title={tooltip}>
          <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: 13, color: '#94a3b8', cursor: 'help', flexShrink: 0, marginTop: -1 }} />
        </Tooltip>
      )}
    </div>
  );

  const colorSwatchStyle = { width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 };
  const renderStyleControl = (c, i) => {
    const label = renderLabel(__( c.label, 'formglut' ), c.tip && __( c.tip, 'formglut' ));
    if (c.type === 'select') {
      const value = field[c.key] || c.default;
      return (
        <React.Fragment key={c.key}>
          <div className="fg-prop-field">{label}
            <Select value={value} style={{ width: '100%' }}
              onChange={(v) => onUpdate(field.id, { [c.key]: v, ...(c.customKey && v !== 'custom' ? { [c.customKey]: '' } : {}) })}
              options={c.options.map(o => ({ value: o.value, label: __( o.label, 'formglut' ) }))} />
          </div>
          {c.customKey && field[c.key] === 'custom' && (
            <div className="fg-prop-field">{renderLabel(__( c.customLabel, 'formglut' ), __( c.customTip, 'formglut' ))}
              <Input type="number" value={field[c.customKey] || ''} placeholder={__( c.customPlaceholder, 'formglut' )} onChange={(e) => up(c.customKey, e.target.value)} addonAfter="px" />
            </div>
          )}
        </React.Fragment>
      );
    }
    if (c.type === 'quad') {
      return (
        <div className="fg-prop-field" key={c.keys[0]}>{label}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
            {c.keys.map((k, n) => (
              <div key={k}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{__( c.sides[n], 'formglut' )}</div>
                <Input type="number" size="small" value={field[k] ?? c.defaults[n]} onChange={(e) => up(k, parseInt(e.target.value) || 0)} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (c.type === 'number') {
      return <div className="fg-prop-field" key={c.key}>{label}<Input type="number" value={field[c.key] ?? c.default} onChange={(e) => up(c.key, parseInt(e.target.value) || 0)} /></div>;
    }
    if (c.type === 'color') {
      const value = field[c.key] || c.default;
      return (
        <div className="fg-prop-field" key={c.key}>{label}
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="color" value={value} onChange={(e) => up(c.key, e.target.value)} style={colorSwatchStyle} />
            <Input value={value} onChange={(e) => up(c.key, e.target.value)} style={{ flex: 1 }} />
          </div>
        </div>
      );
    }
    return <div className="fg-prop-field" key={c.key || i}>{label}<Input value={field[c.key] || ''} placeholder={c.placeholder ? __( c.placeholder, 'formglut' ) : undefined} onChange={(e) => up(c.key, e.target.value)} /></div>;
  };

  return (
    <div>
      {/* Type badge */}
      <div style={{ marginBottom: 12, padding: '6px 10px', background: '#f8fafc', borderRadius: 6, fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
        {FIELD_TYPES[field.type]?.icon}<span style={{ fontWeight: 600 }}>{FIELD_TYPES[field.type]?.label || field.type}</span>
      </div>

      {STYLE_BLOCKS.filter(block => has(block.group)).map(block => (
        <div className="fg-prop-section" key={block.group}>
          <div className="fg-prop-section-title">{__( block.title, 'formglut' )}</div>
          {block.controls.map((c, i) => renderStyleControl(c, i))}
        </div>
      ))}

      {styleGroups.length === 0 && (
        <div className="fg-prop-no-selection-text" style={{ padding: '8px 0' }}>{__( 'This field has no style options.', 'formglut' )}</div>
      )}

      {/* Field-specific style options (moved from Field Options) */}
      <DynamicFieldOptions field={field} onUpdate={onUpdate} styleOnly />

      {/* CSS Class */}
      {has('css_class') && (
      <div className="fg-prop-section"><div className="fg-prop-section-title">{__( 'Custom CSS', 'formglut' )}</div>
        <div className="fg-prop-field">{renderLabel(__( 'CSS Class', 'formglut' ), __( 'Add a custom CSS class to this field for advanced styling. You can then target this class in your custom CSS.', 'formglut' ))}
          <Input value={field.css_class || ''} placeholder={__( 'my-custom-class', 'formglut' )} onChange={(e) => up('css_class', e.target.value)} />
        </div>
      </div>
      )}

    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function getFormIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('form_id') ? parseInt(params.get('form_id'), 10) : null;
}

// Copy text to clipboard with fallback for non-HTTPS contexts
function copyToClipboard(text) {
  // Try modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => {
      // Fallback if clipboard API fails
      return fallbackCopy(text);
    });
  }
  // Fallback for older browsers or non-secure contexts
  return fallbackCopy(text);
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful ? Promise.resolve() : Promise.reject(new Error('Copy command failed'));
  } catch (err) {
    document.body.removeChild(textArea);
    return Promise.reject(err);
  }
}

const DEFAULT_SUBMIT_BTN = {
  text: __( 'Submit Form', 'formglut' ), size: 'large', alignment: 'full',
  bg_color: '#e94560', text_color: '#ffffff',
  border_radius: 10, font_size: 15, font_weight: 600, height: 48,
};

/* ── Main Editor ──────────────────────────────────────────────────── */

export default function FormEditor() {
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('addFields');
  const dragIdRef = useRef(null);
  const [submitBtn, setSubmitBtn] = useState({ ...DEFAULT_SUBMIT_BTN });
  const [selectedSubmit, setSelectedSubmit] = useState(false);
  const [dropTarget, setDropTarget] = useState(null);
  const [insertTarget, setInsertTarget] = useState(null);
  const [captchaStatus, setCaptchaStatus] = useState({});

  // Captcha key status, so captcha fields can warn when Settings are incomplete.
  useEffect(() => {
    api.getSettings().then((d) => {
      const st = d.settings || {};
      const ready = (p) => !!(st[`formglut_${p}_site_key`] && st[`formglut_${p}_secret_key`]);
      setCaptchaStatus({
        recaptcha: { ready: ready('recaptcha'), version: st.formglut_recaptcha_version || 'v3' },
        hcaptcha: { ready: ready('hcaptcha') },
        turnstile: { ready: ready('turnstile') },
      });
    }).catch(() => {});
  }, []);

  const [formTitle, setFormTitle] = useState(__( 'Untitled Form', 'formglut' ));
  const [formId, setFormId] = useState(getFormIdFromUrl());
  const [deviceWidth, setDeviceWidth] = useState('100%');
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!formId);

  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const initialLoadDone = useRef(false);

  /* ── History ─────────────────────────────────────────────────────── */

  const pushHistory = useCallback((newFields, newSubmitBtn) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, historyIdx + 1);
      trimmed.push({ fields: newFields, submitBtn: { ...(newSubmitBtn || submitBtn) } });
      if (trimmed.length > 50) trimmed.shift();
      setHistoryIdx(trimmed.length - 1);
      return trimmed;
    });
  }, [historyIdx, submitBtn]);

  function undo() {
    if (historyIdx <= 0) return;
    const prev = history[historyIdx - 1];
    setHistoryIdx(historyIdx - 1);
    setFields(prev.fields);
    setSubmitBtn(prev.submitBtn);
    setIsDirty(true);
  }

  function redo() {
    if (historyIdx >= history.length - 1) return;
    const next = history[historyIdx + 1];
    setHistoryIdx(historyIdx + 1);
    setFields(next.fields);
    setSubmitBtn(next.submitBtn);
    setIsDirty(true);
  }

  /* ── Load ─────────────────────────────────────────────────────────── */

  useEffect(() => {
    if (!formId) { setLoading(false); return; }
    api.getForm(formId)
      .then(data => {
        const form = data.form;
        if (form.title) setFormTitle(form.title);
        if (Array.isArray(form.fields)) setFields(form.fields);
        if (form.submit_btn && typeof form.submit_btn === 'object') {
          setSubmitBtn({ ...DEFAULT_SUBMIT_BTN, ...form.submit_btn });
        }
        setLoading(false);
      })
      .catch(err => { message.error(err.message || __( 'Failed to load form.', 'formglut' )); setLoading(false); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!initialLoadDone.current && !loading) {
      setHistory([{ fields, submitBtn }]);
      setHistoryIdx(0);
      initialLoadDone.current = true;
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const h = (e) => { if (isDirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [isDirty]);

  useEffect(() => {
    function onKey(e) {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') { e.preventDefault(); redo(); }
      else if (e.key === 's') { e.preventDefault(); handleSave(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  /* ── Field ops ───────────────────────────────────────────────────── */
  function commit(next) { setFields(next); setIsDirty(true); pushHistory(next); }

  function addField(type) {
    const f = createField(type);
    if (!f) return;
    f.id = genId();
    if (insertTarget && !isContainerField(f) && findFieldInTree(fields, insertTarget.containerId)) {
      commit(insertIntoTree(fields, { ...insertTarget, index: Infinity }, f));
    } else {
      commit([...fields, f]);
    }
    setInsertTarget(null);
  }
  function removeField(id) {
    const next = updateParentList(fields, id, (l, i) => l.filter((_, j) => j !== i));
    if (!next) return;
    if (selectedId === id || (selectedId && !findFieldInTree(next, selectedId))) { setSelectedId(null); setActiveTab('addFields'); }
    if (insertTarget && !findFieldInTree(next, insertTarget.containerId)) setInsertTarget(null);
    commit(next);
  }
  function duplicateField(id) {
    const next = updateParentList(fields, id, (l, i) => {
      const copy = cloneWithNewIds(l[i]);
      if (!isContainerField(copy)) copy.label = (l[i].label || '') + ' (copy)';
      const n = [...l]; n.splice(i + 1, 0, copy); return n;
    });
    if (!next) return;
    commit(next);
    message.success(__( 'Field duplicated', 'formglut' ));
  }
  function moveField(id, dir) {
    const next = updateParentList(fields, id, (l, i) => {
      const ni = i + dir;
      if (ni < 0 || ni >= l.length) return l;
      const n = [...l]; [n[i], n[ni]] = [n[ni], n[i]]; return n;
    });
    if (next) commit(next);
  }
  function updateFieldProp(id, updates) {
    const next = updateParentList(fields, id, (l, i) => l.map((f, j) => j === i ? Object.assign({}, f, updates) : f));
    if (next) commit(next);
  }
  function selectField(id) { setSelectedId(id); setSelectedSubmit(false); setActiveTab('fieldOptions'); }
  function selectSubmitBtn() { setSelectedId(null); setSelectedSubmit(true); setActiveTab('fieldOptions'); }
  function targetColumn(containerId, colIdx) { setInsertTarget({ containerId, colIdx }); setActiveTab('addFields'); }

  /* ── Drag & drop ─────────────────────────────────────────────────── */
  const sameTarget = (a, b) => !!a && !!b && (a.containerId || null) === (b.containerId || null) && (a.colIdx || 0) === (b.colIdx || 0);

  function performDrop(e, target) {
    const type = e.dataTransfer.getData('fgFieldType');
    const dragId = dragIdRef.current;
    dragIdRef.current = null; setDropTarget(null);
    if (!target) target = { containerId: null, colIdx: 0, index: fields.length };

    if (type && FIELD_TYPES[type]) {
      const f = createField(type); if (!f) return;
      f.id = genId();
      if (target.containerId && isContainerField(f)) { message.warning(__( 'Containers cannot be placed inside another container.', 'formglut' )); return; }
      commit(insertIntoTree(fields, target, f));
      return;
    }
    if (!dragId) return;
    const moving = findFieldInTree(fields, dragId);
    if (!moving) return;
    if (target.containerId && isContainerField(moving)) { message.warning(__( 'Containers cannot be placed inside another container.', 'formglut' )); return; }
    const from = locateField(fields, dragId);
    const without = updateParentList(fields, dragId, (l, i) => l.filter((_, j) => j !== i));
    let index = target.index;
    if (sameTarget(from, target) && from.index < index) index -= 1;
    commit(insertIntoTree(without, { ...target, index }, moving));
  }

  function handleCanvasDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = dragIdRef.current ? 'move' : 'copy'; }
  function handleCanvasDrop(e) { e.preventDefault(); performDrop(e, dropTarget); }
  function handleCanvasDragLeave(e) { if (!e.currentTarget.contains(e.relatedTarget)) setDropTarget(null); }
  function handleEmptyDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); setDropTarget(null); }
  function handleEmptyDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
  function handleEmptyDrop(e) {
    e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.remove('drag-over');
    performDrop(e, null);
  }
  function handleFieldDragStart(e, id) { e.stopPropagation(); dragIdRef.current = id; e.dataTransfer.setData('fgReorder', 'true'); e.dataTransfer.effectAllowed = 'move'; }
  function handleFieldDragOver(e, ctx, idx) {
    e.preventDefault(); e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const t = { ...ctx, index: e.clientY < rect.top + rect.height / 2 ? idx : idx + 1 };
    if (!dropTarget || !sameTarget(dropTarget, t) || dropTarget.index !== t.index) setDropTarget(t);
  }
  function handleColumnDragOver(e, ctx, len) {
    e.preventDefault(); e.stopPropagation();
    if (!dropTarget || !sameTarget(dropTarget, ctx) || dropTarget.index !== len) setDropTarget({ ...ctx, index: len });
  }
  function handleFieldDragEnd() { dragIdRef.current = null; setDropTarget(null); }

  /* ── Canvas rendering ────────────────────────────────────────────── */
  const dropIndicator = <div className="fg-drop-indicator visible"><span>{__( 'Drop here', 'formglut' )}</span></div>;
  const showIndicatorAt = (ctx, idx) => !!dropTarget && sameTarget(dropTarget, ctx) && dropTarget.index === idx;

  function renderFieldList(list, ctx) {
    return (
      <>
        {list.map((f, idx) => (
          <React.Fragment key={f.id}>
            {showIndicatorAt(ctx, idx) && dropIndicator}
            {renderFieldNode(f, idx, list.length, ctx)}
          </React.Fragment>
        ))}
        {showIndicatorAt(ctx, list.length) && dropIndicator}
      </>
    );
  }

  function renderFieldNode(f, idx, count, ctx) {
    const container = isContainerField(f);
    return (
      <div
        className={'fg-form-field' + (container ? ' fg-container-field' : '') + (container && f.container_class ? ' ' + f.container_class : '') + (selectedId === f.id ? ' selected' : '')}
        onClick={(e) => { e.stopPropagation(); selectField(f.id); }}
        draggable onDragStart={(e) => handleFieldDragStart(e, f.id)}
        onDragOver={(e) => handleFieldDragOver(e, ctx, idx)} onDragEnd={handleFieldDragEnd}
      >
        <div className="fg-field-toolbar">
          <Tooltip title={__( 'Move up', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); moveField(f.id, -1); }} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.3 : 1 }}><FontAwesomeIcon icon={faArrowUp} /></button></Tooltip>
          <Tooltip title={__( 'Move down', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); moveField(f.id, 1); }} disabled={idx === count - 1} style={{ opacity: idx === count - 1 ? 0.3 : 1 }}><FontAwesomeIcon icon={faArrowDown} /></button></Tooltip>
          <div className="toolbar-sep"></div>
          <Tooltip title={__( 'Settings', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); selectField(f.id); }}><FontAwesomeIcon icon={faGear} /></button></Tooltip>
          {!container && <Tooltip title={__( 'Style', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); setSelectedId(f.id); setActiveTab('styleOptions'); }}><FontAwesomeIcon icon={faPalette} /></button></Tooltip>}
          <div className="toolbar-sep"></div>
          <Tooltip title={__( 'Duplicate', 'formglut' )} mouseEnterDelay={0.4}><button onClick={(e) => { e.stopPropagation(); duplicateField(f.id); }}><FontAwesomeIcon icon={faCopy} /></button></Tooltip>
          <Tooltip title={__( 'Delete', 'formglut' )} mouseEnterDelay={0.4}><button className="danger" onClick={(e) => { e.stopPropagation(); removeField(f.id); }}><FontAwesomeIcon icon={faTrash} /></button></Tooltip>
        </div>
        {container ? (
          <div className="fg-columns" style={{ gap: CONTAINER_GAPS[f.gap || 'medium'] ?? 16 }}>
            {f.columns.map((col, ci) => {
              const colCtx = { containerId: f.id, colIdx: ci };
              const colFields = col.fields || [];
              const targeted = insertTarget && insertTarget.containerId === f.id && insertTarget.colIdx === ci;
              return (
                <div
                  key={ci}
                  className={'fg-column' + (colFields.length ? '' : ' empty') + (targeted ? ' targeted' : '')}
                  style={{ flex: `${Number(col.width) || 1} 1 0%` }}
                  onDragOver={(e) => handleColumnDragOver(e, colCtx, colFields.length)}
                >
                  {renderFieldList(colFields, colCtx)}
                  <div className="fg-column-add" onClick={(e) => { e.stopPropagation(); targetColumn(f.id, ci); }}>
                    <FontAwesomeIcon icon={faPlus} />
                    {!colFields.length && <span>{targeted ? __( 'Pick a field on the left', 'formglut' ) : __( 'Add or drop a field', 'formglut' )}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <FieldTemplate field={f} captcha={captchaStatus} />
        )}
        {!ctx.containerId && (
          <div className="fg-add-between">
            <div className="fg-add-between-btn" onClick={(e) => { e.stopPropagation(); setInsertTarget(null); setActiveTab('addFields'); }}><FontAwesomeIcon icon={faPlus} /></div>
          </div>
        )}
      </div>
    );
  }

  /* ── Save ────────────────────────────────────────────────────────── */

  async function handleSave() {
    if (saving) return;
    const title = formTitle.trim();
    if (!title) { message.warning(__( 'Please enter a form title.', 'formglut' )); return; }
    setSaving(true);
    try {
      const payload = { title, fields, submit_btn: submitBtn, status: 'active' };
      if (formId) {
        payload.id = formId;
        await api.updateForm(payload);
        message.success(__( 'Form saved.', 'formglut' ));
      } else {
        const result = await api.createForm(payload);
        setFormId(result.form_id);
        const url = new URL(window.location.href);
        url.searchParams.set('form_id', result.form_id);
        window.history.replaceState({}, '', url.toString());
        message.success(__( 'Form created.', 'formglut' ));
      }
      setIsDirty(false);
    } catch (err) { message.error(err.message || __( 'Failed to save form.', 'formglut' )); } finally { setSaving(false); }
  }

  const selectedField = selectedId ? findFieldInTree(fields, selectedId) : null;
  const allInputFields = flattenFields(fields);

  if (loading) {
    return (<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}><Spin size="large" tip={__( 'Loading form...', 'formglut' )} /></div>);
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="fg-editor-header">
        <div className="fg-editor-header-left">
          <a className="fg-editor-back" href={_pg.all_forms}><FontAwesomeIcon icon={faArrowLeft} /> {__( 'Back', 'formglut' )}</a>
          <input className="fg-editor-title-input" value={formTitle} onChange={(e) => { setFormTitle(e.target.value); setIsDirty(true); }} placeholder={__( 'Enter form title...', 'formglut' )} />
        </div>
        <div className="fg-editor-header-center">
          <button className="fg-editor-tab active">{__( 'Editor', 'formglut' )}</button>
          <a className="fg-editor-tab" href={_pg.settings}>{__( 'Settings', 'formglut' )}</a>
          <a className="fg-editor-tab" href={_pg.entries}>{__( 'Entries', 'formglut' )}</a>
        </div>
        <div className="fg-editor-header-right">
          <Tooltip title={__( 'Undo', 'formglut' )}><Button icon={<FontAwesomeIcon icon={faRotateLeft} />} size="small" type="text" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={undo} disabled={historyIdx <= 0} /></Tooltip>
          <Tooltip title={__( 'Redo', 'formglut' )}><Button icon={<FontAwesomeIcon icon={faRotateRight} />} size="small" type="text" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={redo} disabled={historyIdx >= history.length - 1} /></Tooltip>
          <Button icon={<FontAwesomeIcon icon={faEye} />} style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)', borderRadius: 8 }} onClick={() => { if (formId) { window.open(_pg.preview + '&form_id=' + formId, '_blank'); } else { message.warning(__( 'Save the form first to preview.', 'formglut' )); } }}>{__( 'Preview', 'formglut' )}</Button>
          <Tooltip title={formId ? `[formglut id="${formId}"]` : __( 'Save the form first to get shortcode.', 'formglut' )}>
            <Button icon={<FontAwesomeIcon icon={faCode} />} style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)', borderRadius: 8 }} disabled={!formId} onClick={() => { const shortcode = `[formglut id="${formId}"]`; copyToClipboard(shortcode).then(() => message.success(__( 'Shortcode copied!', 'formglut' ))).catch(() => message.error(__( 'Failed to copy shortcode.', 'formglut' ))); }}>
              {__( 'Shortcode', 'formglut' )}
            </Button>
          </Tooltip>
          <Button icon={<FontAwesomeIcon icon={faFloppyDisk} />} type="primary" loading={saving} onClick={handleSave} style={{ background: '#e94560', borderColor: '#e94560', borderRadius: 8, fontWeight: 600 }}>
            {isDirty ? __( 'Save Form *', 'formglut' ) : __( 'Save Form', 'formglut' )}
          </Button>
        </div>
      </header>

      <div className="fg-editor-body">
        <div className="fg-sidebar">
          <Tabs activeKey={activeTab} onChange={setActiveTab} centered items={[
            { key: 'addFields', label: __( 'Add Fields', 'formglut' ), children: <AddFieldsTab onAddField={addField} insertTarget={insertTarget} onCancelTarget={() => setInsertTarget(null)} /> },
            { key: 'fieldOptions', label: __( 'Field Options', 'formglut' ), children: <FieldOptionsTab field={selectedField} onUpdate={updateFieldProp} submitBtn={submitBtn} onSubBtnUpdate={(u) => { const next = { ...submitBtn, ...u }; setSubmitBtn(next); setIsDirty(true); pushHistory(fields, next); }} selectedSubmit={selectedSubmit} allFields={allInputFields} /> },
            { key: 'styleOptions', label: __( 'Style Options', 'formglut' ), children: <StyleOptionsTab field={selectedField} onUpdate={updateFieldProp} /> },
          ]} />
        </div>

        <div className="fg-canvas-area">
          <div className="fg-canvas-toolbar">
            <div className="fg-device-switcher">
              <button className={"fg-device-btn" + (deviceWidth === '100%' ? ' active' : '')} onClick={() => setDeviceWidth('100%')} title="Desktop">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </button>
              <button className={"fg-device-btn" + (deviceWidth === '640px' ? ' active' : '')} onClick={() => setDeviceWidth('640px')} title="Tablet">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
              </button>
              <button className={"fg-device-btn" + (deviceWidth === '480px' ? ' active' : '')} onClick={() => setDeviceWidth('480px')} title="Mobile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
              </button>
            </div>
            <div className="fg-undo-hint" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>{fields.length} {fields.length !== 1 ? __( 'fields', 'formglut' ) : __( 'field', 'formglut' )}{isDirty ? ' — ' + __( 'unsaved', 'formglut' ) : ''}</span>
              <button
                onClick={() => window.open(formglut_admin?.pages?.pro_features || 'https://formglut.com/pro', '_blank')}
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1))',
                  border: '1px solid rgba(251, 191, 36, 0.4)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#fbbf24',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(251, 191, 36, 0.15)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.2))';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1))';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(251, 191, 36, 0.15)';
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fbbf24' }}>
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span>{__('Check Pro Fields', 'formglut')}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', color: '#fbbf24' }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="fg-canvas">
            <div className="fg-canvas-form" style={{ maxWidth: deviceWidth === '100%' ? '900px' : deviceWidth, transition: 'max-width 0.3s ease' }} onClick={() => { setSelectedId(null); setSelectedSubmit(false); setInsertTarget(null); }} onDragOver={handleCanvasDragOver} onDrop={handleCanvasDrop} onDragLeave={handleCanvasDragLeave}>
              {fields.length === 0 ? (
                <div className="fg-empty-state" onDragOver={handleEmptyDragOver} onDragLeave={handleEmptyDragLeave} onDrop={handleEmptyDrop}>
                  <span className="fg-empty-state-icon"><FontAwesomeIcon icon={faPlus} /></span>
                  <div className="fg-empty-state-title">{__( 'No fields yet', 'formglut' )}</div>
                  <div className="fg-empty-state-desc">{__( 'Drag fields from the left panel', 'formglut' )}<br/>{__( 'or click a field type to add it', 'formglut' )}</div>
                </div>
              ) : (
                <div>
                  {renderFieldList(fields, { containerId: null, colIdx: 0 })}
                  {!allInputFields.some(x => x.type === 'custom_submit_button') && <div className={"fg-submit-field" + (selectedSubmit ? ' selected' : '')} onClick={(e) => { e.stopPropagation(); selectSubmitBtn(); }}>
                    <div style={submitBtn.alignment !== 'full' ? { textAlign: submitBtn.alignment } : {}}>
                      <Button type="primary" size={submitBtn.size === 'medium' ? 'middle' : submitBtn.size} block={submitBtn.alignment === 'full'} style={{ background: submitBtn.bg_color, borderColor: submitBtn.bg_color, color: submitBtn.text_color, height: submitBtn.height, fontWeight: submitBtn.font_weight, fontSize: submitBtn.font_size, borderRadius: submitBtn.border_radius }}>{submitBtn.text}</Button>
                    </div>
                  </div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
