/**
 * Shared Field Options Configuration
 *
 * Complete field options and style options for all implemented field types.
 * Organized by:
 * - UNIVERSAL_OPTIONS: Options shared across many field types
 * - TEXT_INPUT_OPTIONS: Options specific to text input fields
 * - EMAIL_OPTIONS: Options specific to email fields
 * - TEXTAREA_OPTIONS: Options specific to textarea fields
 * - SELECT_OPTIONS: Options specific to dropdown/select fields
 * - MULTISELECT_OPTIONS: Options specific to multiple select fields
 *
 * Sections:
 * - general: Field Options (basic settings)
 * - validation: Validation rules and messages
 * - style: Style options (appearance)
 * - advanced: Advanced settings
 */

import { __ } from '@wordpress/i18n';

/**
 * Common option value arrays used across multiple option definitions
 */
export const COMMON_OPTION_VALUES = {
  labelPlacement: [
    { value: 'default', label: 'Default (Global Setting)' },
    { value: 'top', label: 'Above Field' },
    { value: 'bottom', label: 'Below Field' },
    { value: 'left', label: 'Left of Field' },
    { value: 'right', label: 'Right of Field' },
    { value: 'hidden', label: 'Hidden' },
  ],

  keyboardTypes: [
    { value: 'default', label: 'Standard Keyboard' },
    { value: 'numeric', label: 'Numeric (0-9)' },
    { value: 'decimal', label: 'Decimal (0-9 with .)' },
    { value: 'tel', label: 'Telephone Keypad' },
    { value: 'email', label: 'Email Keyboard' },
    { value: 'url', label: 'URL Keyboard' },
  ],

  resize: [
    { value: 'vertical', label: 'Vertical Only' },
    { value: 'horizontal', label: 'Horizontal Only' },
    { value: 'both', label: 'Both Directions' },
    { value: 'none', label: 'None' },
  ],

  maskPatterns: [
    { value: '', label: 'None' },
    { value: '(999) 999-9999', label: 'Phone: (###) ###-####' },
    { value: '999-99-9999', label: 'SSN: ###-##-####' },
    { value: '9999 9999 9999 9999', label: 'Credit Card: #### #### #### ####' },
    { value: '99/99/9999', label: 'Date: ##/##/####' },
    { value: 'aaaaaaaaaa', label: 'Letters Only (10)' },
    { value: '**********', label: 'Alphanumeric (10)' },
  ],
};

/**
 * Section order and titles for organizing options in the properties panel
 */
export const SECTION_ORDER = [
  'general',
  'validation',
  'style',
  'advanced',
  'conditional',
];

export const SECTION_TITLES = {
  general: 'Field Options',
  validation: 'Validation',
  style: 'Style Options',
  advanced: 'Advanced',
  conditional: 'Conditional Logic',
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * UNIVERSAL OPTIONS
 * ═════════════════════════════════════════════════════════════════════
 *
 * These options are shared across many field types.
 */
export const UNIVERSAL_OPTIONS = {
  // === Field Options (General) ===
  // Label and related options
  label: {
    type: 'text',
    label: 'Element Label',
    section: 'general',
    description: 'The label displayed above or beside the field',
  },

  admin_label: {
    type: 'text',
    label: 'Admin Field Label',
    section: 'general',
    description: 'Label shown only in admin entries view (useful for short/technical labels)',
  },

  // Input options
  placeholder: {
    type: 'text',
    label: 'Placeholder',
    section: 'general',
    description: 'Helpful hint shown inside the field when empty',
  },

  default_value: {
    type: 'text',
    label: 'Default Value',
    section: 'general',
    description: 'Field is pre-filled with this value. Supports SmartCodes like {user_email}',
  },

  required: {
    type: 'switch',
    label: 'Required',
    section: 'general',
    description: 'User must fill this field before submitting the form',
  },

  // Help options (grouped together)
  help_text: {
    type: 'textarea',
    label: 'Help Message',
    section: 'general',
    description: 'Additional help text shown below or above the field',
    rows: 2,
  },

  help_text_position: {
    type: 'select',
    label: 'Help Message Position',
    section: 'general',
    description: 'Where to show the help message',
    options: [
      { value: 'tooltip', label: 'Tooltip on Hover' },
      { value: 'below', label: 'Below Field' },
      { value: 'above', label: 'Above Field' },
    ],
  },

  // Prefix/Suffix (grouped together)
  prefix_label: {
    type: 'text',
    label: 'Prefix Label',
    section: 'general',
    description: 'Text or HTML shown before the input (e.g., $, https://)',
  },

  suffix_label: {
    type: 'text',
    label: 'Suffix Label',
    section: 'general',
    description: 'Text or HTML shown after the input (e.g., %, .com)',
  },

  // === Validation ===
  validation_message: {
    type: 'text',
    label: 'Validation Message',
    section: 'validation',
    description: 'Custom error message shown when validation fails',
  },

  // === Style Options ===
  element_class: {
    type: 'text',
    label: 'Element Class',
    section: 'style',
    description: 'CSS class for the input element',
  },

  container_class: {
    type: 'text',
    label: 'Container Class',
    section: 'style',
    description: 'CSS class for the wrapper container',
  },

  name_attribute: {
    type: 'text',
    label: 'Name Attribute',
    section: 'advanced',
    description: 'Custom name attribute for the field (useful for integrations)',
  },
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * TEXT INPUT OPTIONS (Simple Text)
 * ═════════════════════════════════════════════════════════════════════
 */
export const TEXT_INPUT_OPTIONS = {
  ...UNIVERSAL_OPTIONS,

  // === General Options ===
  mobile_keyboard_type: {
    type: 'select',
    label: 'Mobile Keyboard Type',
    section: 'general',
    description: 'Keyboard type shown on mobile devices',
    options: COMMON_OPTION_VALUES.keyboardTypes,
  },

  // === Input Mask ===
  enable_mask: {
    type: 'switch',
    label: 'Enable Mask Input',
    section: 'general',
    description: 'Force input to match a specific pattern (e.g., phone number)',
  },

  mask_pattern: {
    type: 'select',
    label: 'Mask Pattern',
    section: 'general',
    description: 'Predefined mask patterns',
    options: COMMON_OPTION_VALUES.maskPatterns,
  },

  custom_mask: {
    type: 'text',
    label: 'Custom Mask',
    section: 'general',
    description: 'Custom mask pattern: 9=digit, a=letter, *=alphanumeric (e.g., (999) 999-9999)',
  },

  mask_placeholder: {
    type: 'text',
    label: 'Mask Placeholder',
    section: 'general',
    description: 'Character shown for unfilled mask positions (default: _)',
  },

  // === Validation ===
  character_limit: {
    type: 'number',
    label: 'Max Text Length',
    section: 'validation',
    min: 0,
    description: 'Maximum number of characters allowed (0 = unlimited)',
  },

  validate_unique: {
    type: 'switch',
    label: 'Validate as Unique',
    section: 'validation',
    description: 'Check for duplicate values in previous submissions',
  },

  unique_error_message: {
    type: 'text',
    label: 'Duplicate Error Message',
    section: 'validation',
    description: 'Error message shown when value already exists',
  },

  // === Advanced ===
  reversible_mask: {
    type: 'switch',
    label: 'Reversible Mask',
    section: 'advanced',
    description: 'Allow the mask to work in reverse when deleting',
  },

  clear_on_invalid: {
    type: 'switch',
    label: 'Clear if Not Match',
    section: 'advanced',
    description: 'Clear the field if input doesn\'t match the mask',
  },
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * EMAIL OPTIONS
 * ═════════════════════════════════════════════════════════════════════
 */
export const EMAIL_OPTIONS = {
  ...UNIVERSAL_OPTIONS,

  // === Field Options ===
  confirm_email: {
    type: 'switch',
    label: 'Require Email Confirmation',
    section: 'validation',
    description: 'User must enter the same email twice',
  },

  confirm_label: {
    type: 'text',
    label: 'Confirmation Field Label',
    section: 'validation',
    description: 'Label for the confirmation email field',
  },

  confirm_placeholder: {
    type: 'text',
    label: 'Confirmation Placeholder',
    section: 'validation',
    description: 'Placeholder for the confirmation field',
  },

  confirm_error_message: {
    type: 'text',
    label: 'Mismatch Error Message',
    section: 'validation',
    description: 'Error shown when emails don\'t match',
  },

  // === Validation ===
  validate_unique: {
    type: 'switch',
    label: 'Validate as Unique',
    section: 'validation',
    description: 'Check if this email has already been submitted',
  },

  unique_error_message: {
    type: 'text',
    label: 'Validation Message for Duplicate',
    section: 'validation',
    description: 'Error message when email already exists',
  },
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * TEXTAREA OPTIONS
 * ═════════════════════════════════════════════════════════════════════
 */
export const TEXTAREA_OPTIONS = {
  ...UNIVERSAL_OPTIONS,

  // === Field Options ===
  rows: {
    type: 'number',
    label: 'Rows',
    section: 'general',
    min: 1,
    max: 50,
    description: 'Number of visible text lines',
  },

  cols: {
    type: 'number',
    label: 'Columns',
    section: 'general',
    min: 1,
    max: 100,
    description: 'Width in average character widths (leave empty for 100%)',
  },

  resize: {
    type: 'select',
    label: 'Resize Handle',
    section: 'general',
    description: 'Allow users to resize the textarea',
    options: COMMON_OPTION_VALUES.resize,
  },

  max_length: {
    type: 'number',
    label: 'Max Text Length',
    section: 'validation',
    min: 0,
    description: 'Maximum number of characters allowed',
  },

  min_length: {
    type: 'number',
    label: 'Min Length',
    section: 'validation',
    min: 0,
    description: 'Minimum number of characters required',
  },

  enable_rtl: {
    type: 'switch',
    label: 'Enable RTL',
    section: 'advanced',
    description: 'Enable right-to-left text direction',
  },
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * DROPDOWN/SELECT OPTIONS
 * ═════════════════════════════════════════════════════════════════════
 */
export const SELECT_OPTIONS = {
  ...UNIVERSAL_OPTIONS,

  // === Field Options ===
  disable_first_option: {
    type: 'switch',
    label: 'Disable First Option',
    section: 'general',
    description: 'First option (usually placeholder) cannot be selected',
  },

  shuffle_options: {
    type: 'switch',
    label: 'Shuffle Options',
    section: 'general',
    description: 'Randomize option order each time the form loads',
  },

  enable_search: {
    type: 'switch',
    label: 'Enable Search',
    section: 'general',
    description: 'Add search functionality to dropdown (useful for many options)',
  },

  min_search_chars: {
    type: 'number',
    label: 'Min Search Characters',
    section: 'general',
    min: 1,
    description: 'Minimum characters before search starts',
  },
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * MULTISELECT OPTIONS
 * ═════════════════════════════════════════════════════════════════════
 */
export const MULTISELECT_OPTIONS = {
  ...UNIVERSAL_OPTIONS,

  // === Field Options ===
  shuffle_options: {
    type: 'switch',
    label: 'Shuffle Options',
    section: 'general',
    description: 'Randomize option order each time the form loads',
  },

  enable_search: {
    type: 'switch',
    label: 'Enable Search',
    section: 'general',
    description: 'Add search functionality to dropdown (useful for many options)',
  },

  select_all_button: {
    type: 'switch',
    label: 'Show Select All Button',
    section: 'general',
    description: 'Add a button to select all options',
  },

  display_format: {
    type: 'select',
    label: 'Display Format',
    section: 'general',
    description: 'How selected options are displayed',
    options: [
      { value: 'tags', label: 'Tags (Chips)' },
      { value: 'text', label: 'Text (Comma Separated)' },
      { value: 'count', label: 'Count Only (e.g., "3 selected")' },
    ],
  },

  // === Selection Limits ===
  min_selections: {
    type: 'number',
    label: 'Min Selections Required',
    section: 'validation',
    min: 0,
    description: 'Minimum number of options user must select (0 = no minimum)',
  },

  max_selections: {
    type: 'number',
    label: 'Max Selections Allowed',
    section: 'validation',
    min: 1,
    description: 'Maximum number of options user can select',
  },
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * FIELD TYPE TO OPTIONS MAPPING
 * ═════════════════════════════════════════════════════════════════════
 */
const FIELD_TYPE_OPTIONS_MAP = {
  // === Implemented Fields ===
  text: TEXT_INPUT_OPTIONS,
  email: EMAIL_OPTIONS,
  textarea: TEXTAREA_OPTIONS,
  select: SELECT_OPTIONS,
  multiselect: MULTISELECT_OPTIONS,

  // === Future Fields (will have their own option sets) ===
  url: TEXT_INPUT_OPTIONS,        // Reuse text input options for now
  phone: TEXT_INPUT_OPTIONS,      // Reuse text input options for now
  hidden: UNIVERSAL_OPTIONS,      // Minimal options for hidden fields
  password: TEXT_INPUT_OPTIONS,   // Reuse text input options for now
  number: TEXT_INPUT_OPTIONS,     // Reuse text input options for now
  radio: SELECT_OPTIONS,          // Similar to select
  checkbox: SELECT_OPTIONS,       // Similar to select
  date: UNIVERSAL_OPTIONS,
  time: UNIVERSAL_OPTIONS,
  color_picker: UNIVERSAL_OPTIONS,
  file_upload: UNIVERSAL_OPTIONS,
};

/**
 * Get all option definitions for a specific field type
 *
 * @param {string} fieldType - The field type (e.g., 'text', 'email', 'number')
 * @returns {Object} Object containing all option definitions for this field type
 */
export function getOptionsForFieldType(fieldType) {
  return FIELD_TYPE_OPTIONS_MAP[fieldType] || UNIVERSAL_OPTIONS;
}

/**
 * Get applicable option keys for a field type
 *
 * @param {string} fieldType - The field type
 * @returns {Array} Array of option keys that should be rendered
 */
export function getOptionKeysForFieldType(fieldType) {
  const options = getOptionsForFieldType(fieldType);
  return Object.keys(options);
}

/**
 * Check if an option exists for a given field type
 *
 * @param {string} fieldType - The field type
 * @param {string} optionKey - The option key to check
 * @returns {boolean} True if the option exists for this field type
 */
export function hasOption(fieldType, optionKey) {
  const options = getOptionsForFieldType(fieldType);
  return optionKey in options;
}

/**
 * Get option definition for a specific field type
 *
 * @param {string} fieldType - The field type
 * @param {string} optionKey - The option key
 * @returns {Object|undefined} The option definition or undefined if not found
 */
export function getOptionDefinition(fieldType, optionKey) {
  const options = getOptionsForFieldType(fieldType);
  return options[optionKey];
}
