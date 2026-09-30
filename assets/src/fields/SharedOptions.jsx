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
import { COUNTRY_OPTIONS } from './countries.js';

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

  // All keyboard types (for text fields)
  keyboardTypes: [
    { value: 'default', label: 'Standard Keyboard' },
    { value: 'numeric', label: 'Numeric (0-9)' },
    { value: 'decimal', label: 'Decimal (0-9 with .)' },
    { value: 'tel', label: 'Telephone Keypad' },
    { value: 'email', label: 'Email Keyboard' },
    { value: 'url', label: 'URL Keyboard' },
  ],

  // Email field keyboard types
  keyboardTypesEmail: [
    { value: 'default', label: 'Standard Keyboard' },
    { value: 'email', label: 'Email Keyboard (Recommended)' },
    { value: 'url', label: 'URL Keyboard' },
  ],

  // URL field keyboard types
  keyboardTypesUrl: [
    { value: 'default', label: 'Standard Keyboard' },
    { value: 'url', label: 'URL Keyboard (Recommended)' },
    { value: 'email', label: 'Email Keyboard' },
  ],

  // Phone field keyboard types
  keyboardTypesPhone: [
    { value: 'default', label: 'Standard Keyboard' },
    { value: 'tel', label: 'Telephone Keypad (Recommended)' },
    { value: 'numeric', label: 'Numeric (0-9)' },
  ],

  // Number field keyboard types
  keyboardTypesNumber: [
    { value: 'default', label: 'Standard Keyboard' },
    { value: 'numeric', label: 'Numeric (0-9)' },
    { value: 'decimal', label: 'Decimal (0-9 with .)' },
  ],

  // Password field keyboard types
  keyboardTypesPassword: [
    { value: 'default', label: 'Standard Keyboard (Recommended)' },
    { value: 'numeric', label: 'Numeric (0-9)' },
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

  reversible_mask: {
    type: 'switch',
    label: 'Reversible Mask',
    section: 'general',
    description: 'Allow backspace to work smarter with mask patterns',
  },

  clear_on_invalid: {
    type: 'switch',
    label: 'Clear if Not Match',
    section: 'general',
    description: 'Clear the field if input doesn\'t match the mask',
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
};


/**
 * ═════════════════════════════════════════════════════════════════════
 * EMAIL OPTIONS
 * ═════════════════════════════════════════════════════════════════════
 */
export const EMAIL_OPTIONS = {

  // === Field Options ===
  mobile_keyboard_type: {
    type: 'select',
    label: 'Mobile Keyboard Type',
    section: 'general',
    description: 'Keyboard type shown on mobile devices',
    options: COMMON_OPTION_VALUES.keyboardTypesEmail,
  },

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
 * NUMBER / CHOICE / URL / PHONE / DATE OPTIONS
 * ═════════════════════════════════════════════════════════════════════
 */
const HIDDEN_OPTION = {
  hidden: { type: 'switch', label: 'Hide Field', section: 'advanced', description: 'Hide this field from the form (it is still submitted with its default value)' },
};

const AUTOCOMPLETE_OPTION = {
  autocomplete_attribute: { type: 'text', label: 'Autocomplete Attribute', section: 'advanced', placeholder: 'e.g. url, tel, email', description: 'Browser autofill hint (HTML autocomplete attribute)' },
};

/**
 * Shared option DEFINITIONS (how each common option renders). Every field type gets these
 * first; a per-type map below only adds or overrides options unique to that type.
 * Which of them a type actually shows is decided by FIELD_TYPE_GROUPS.
 */
const COMMON_OPTION_DEFS = {
  ...UNIVERSAL_OPTIONS,
  ...HIDDEN_OPTION,
  ...AUTOCOMPLETE_OPTION,
};

export const NUMBER_OPTIONS = {
  ...TEXT_INPUT_OPTIONS,
  mobile_keyboard_type: { type: 'select', label: 'Mobile Keyboard', section: 'advanced', options: COMMON_OPTION_VALUES.keyboardTypesNumber, description: 'Keyboard shown on mobile devices' },
  min_value: { type: 'number', label: 'Minimum Value', section: 'validation', description: 'Smallest number allowed (leave empty for no limit)' },
  max_value: { type: 'number', label: 'Maximum Value', section: 'validation', description: 'Largest number allowed (leave empty for no limit)' },
  step: { type: 'number', label: 'Step', section: 'general', description: 'Allowed increment, e.g. 1 for whole numbers or 0.01 for cents' },
  read_only: { type: 'switch', label: 'Read Only', section: 'advanced', description: 'Show the value but prevent editing' },
};

const CHOICE_BASE_OPTIONS = {
  shuffle_options: { type: 'switch', label: 'Shuffle Options', section: 'general', description: 'Show options in random order' },
  layout: { type: 'select', label: 'Layout', section: 'general', options: [
    { value: 'default', label: 'Vertical List' },
    { value: 'inline', label: 'Horizontal Inline' },
    { value: 'button', label: 'Button Style' },
    { value: '2_column', label: '2 Column Grid' },
    { value: '3_column', label: '3 Column Grid' },
    { value: '4_column', label: '4 Column Grid' },
  ], description: 'How the options are arranged' },
};

export const RADIO_OPTIONS = { ...CHOICE_BASE_OPTIONS };

export const CHECKBOX_OPTIONS = {
  ...CHOICE_BASE_OPTIONS,
  min_selections: { type: 'number', label: 'Minimum Selections', section: 'validation', min: 0, description: 'Fewest options the user must tick (0 = no minimum)' },
  max_selections: { type: 'number', label: 'Maximum Selections', section: 'validation', min: 0, description: 'Most options the user can tick (0 = no limit)' },
};

export const URL_OPTIONS = {
  ...TEXT_INPUT_OPTIONS,
  mobile_keyboard_type: { type: 'select', label: 'Mobile Keyboard', section: 'advanced', options: COMMON_OPTION_VALUES.keyboardTypesUrl, description: 'Keyboard shown on mobile devices' },
  url_scheme: { type: 'select', label: 'URL Scheme', section: 'validation', description: 'Require a specific URL protocol (http or https)', options: [
    { value: 'any', label: 'Any' },
    { value: 'http', label: 'HTTP Only' },
    { value: 'https', label: 'HTTPS Only' },
  ] },
  allow_relative: { type: 'switch', label: 'Allow Relative URLs', section: 'validation', description: 'Allow relative URLs like /path/to/page' },
  validate_url: { type: 'switch', label: 'Validate URL Format', section: 'validation', description: 'Ensure the input is a valid URL format' },
};

export const PHONE_OPTIONS = {
  ...TEXT_INPUT_OPTIONS,
  mobile_keyboard_type: { type: 'select', label: 'Mobile Keyboard', section: 'advanced', options: COMMON_OPTION_VALUES.keyboardTypesPhone, description: 'Keyboard shown on mobile devices' },
  validate_phone: { type: 'switch', label: 'Validate Phone Number', section: 'validation', description: 'Require 7–15 digits' },
  phone_format: { type: 'select', label: 'Phone Format', section: 'general', description: 'Expected phone number format for validation', options: [
    { value: 'international', label: 'International' },
    { value: 'us', label: 'US (###) ###-####' },
    { value: 'uk', label: 'UK #### ######' },
    { value: 'custom', label: 'Custom Format' },
  ] },
  custom_format: { type: 'text', label: 'Custom Format', section: 'general', placeholder: '(999) 999-9999', description: 'Custom phone format mask using 9 for digits' },
};

export const DATE_OPTIONS = {
  date_type: { type: 'select', label: 'Picker Type', section: 'general', options: [
    { value: 'date', label: 'Date' },
    { value: 'datetime', label: 'Date & Time' },
  ], description: 'Pick a date only, or a date and time' },
  min_date: { type: 'text', label: 'Earliest Date', section: 'validation', placeholder: 'YYYY-MM-DD', description: 'Earliest selectable date (YYYY-MM-DD)' },
  max_date: { type: 'text', label: 'Latest Date', section: 'validation', placeholder: 'YYYY-MM-DD', description: 'Latest selectable date (YYYY-MM-DD)' },
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * REMAINING GENERAL FIELDS (html, heading, name, country, spinner, …)
 * ═════════════════════════════════════════════════════════════════════
 */
const sw = (label, description, section = 'general') => ({ type: 'switch', label, section, description });
const txt = (label, description, section = 'general', placeholder) => ({ type: 'text', label, section, description, placeholder });
const num = (label, description, section = 'general') => ({ type: 'number', label, section, description });
const MIN_MAX_VALUE = {
  min_value: num('Minimum Value', 'Smallest value allowed (leave empty for no limit)', 'validation'),
  max_value: num('Maximum Value', 'Largest value allowed (leave empty for no limit)', 'validation'),
  step: num('Step', 'Allowed increment, e.g. 1 for whole numbers or 0.01 for cents'),
  read_only: sw('Read Only', 'Show the value but prevent editing', 'advanced'),
};

export const HTML_OPTIONS = {
  html_content: { type: 'textarea', label: 'HTML Content', section: 'general', rows: 8, description: 'HTML to display. Scripts and unsafe tags are removed.' },
  enable_shortcodes: sw('Run Shortcodes', 'Process WordPress shortcodes inside the content'),
};

export const HEADING_OPTIONS = {
  text: txt('Heading Text', 'The heading shown on the form'),
  heading_level: { type: 'select', label: 'Heading Level', section: 'general', allowClear: false, options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(v => ({ value: v, label: v.toUpperCase() })), description: 'HTML heading tag (H1 is largest)' },
  alignment: { type: 'select', label: 'Alignment', section: 'general', allowClear: false, options: [{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }], description: 'Text alignment' },
  description: { type: 'textarea', label: 'Description', section: 'general', rows: 3, description: 'Optional text shown below the heading' },
  custom_color: { type: 'color', label: 'Heading Color', section: 'style', description: 'Leave empty to use the default color' },
  show_divider: sw('Show Divider', 'Draw a line below the heading'),
  divider_style: { type: 'select', label: 'Divider Style', section: 'style', allowClear: false, options: [{ value: 'solid', label: 'Solid' }, { value: 'dashed', label: 'Dashed' }, { value: 'dotted', label: 'Dotted' }], description: 'Line style of the divider' },
  divider_color: { type: 'color', label: 'Divider Color', section: 'style', description: 'Leave empty to use the default color' },
};

export const NAME_OPTIONS = {
  show_first_name: sw('Show First Name', 'Include a first name box'),
  show_middle_name: sw('Show Middle Name', 'Include a middle name box'),
  show_last_name: sw('Show Last Name', 'Include a last name box'),
  require_first_name: sw('First Name Required', 'When the field is required, the first name must be filled', 'validation'),
  require_middle_name: sw('Middle Name Required', 'When the field is required, the middle name must be filled', 'validation'),
  require_last_name: sw('Last Name Required', 'When the field is required, the last name must be filled', 'validation'),
  first_name_label: txt('First Name Label', 'Label above the first name box'),
  middle_name_label: txt('Middle Name Label', 'Label above the middle name box'),
  last_name_label: txt('Last Name Label', 'Label above the last name box'),
  first_name_placeholder: txt('First Name Placeholder', 'Hint text inside the first name box'),
  middle_name_placeholder: txt('Middle Name Placeholder', 'Hint text inside the middle name box'),
  last_name_placeholder: txt('Last Name Placeholder', 'Hint text inside the last name box'),
  name_layout: { type: 'select', label: 'Layout', section: 'general', allowClear: false, options: [{ value: 'horizontal', label: 'Side by side' }, { value: 'vertical', label: 'Stacked' }], description: 'Arrange the name boxes side by side or stacked' },
};

export const COUNTRY_OPTIONS_DEF = {
  country_list: { type: 'select', label: 'Countries Shown', section: 'general', allowClear: false, options: [{ value: 'all', label: 'All countries' }, { value: 'include', label: 'Only selected countries' }, { value: 'exclude', label: 'All except selected' }], description: 'Which countries appear in the list' },
  included_countries: { type: 'select', mode: 'multiple', label: 'Only These Countries', section: 'general', options: COUNTRY_OPTIONS, description: 'Used when "Only selected countries" is chosen' },
  excluded_countries: { type: 'select', mode: 'multiple', label: 'Exclude Countries', section: 'general', options: COUNTRY_OPTIONS, description: 'Used when "All except selected" is chosen' },
  top_countries: { type: 'select', mode: 'multiple', label: 'Pinned to Top', section: 'general', options: COUNTRY_OPTIONS, description: 'Countries listed first, above a separator' },
  default_value: { type: 'select', label: 'Default Country', section: 'general', options: COUNTRY_OPTIONS, description: 'Pre-selected country' },
  display_format: { type: 'select', label: 'Display Format', section: 'general', allowClear: false, options: [{ value: 'name', label: 'Name' }, { value: 'code', label: 'Code' }, { value: 'both', label: 'Name (Code)' }], description: 'How each country is shown' },
  flag_type: { type: 'select', label: 'Flags', section: 'general', allowClear: false, options: [{ value: 'emoji', label: 'Emoji flags' }, { value: 'none', label: 'No flags' }], description: 'Show a flag beside each country' },
};

export const SPINNER_OPTIONS = {
  min: num('Minimum', 'Smallest value', 'validation'),
  max: num('Maximum', 'Largest value', 'validation'),
  step: num('Step', 'Amount added or removed per click'),
  show_buttons: sw('Show Buttons', 'Show the − and + buttons'),
  increment_label: txt('Increase Button Text', 'Text on the increase button'),
  decrement_label: txt('Decrease Button Text', 'Text on the decrease button'),
  button_position: { type: 'select', label: 'Button Position', section: 'general', allowClear: false, options: [{ value: 'both', label: 'Both sides' }, { value: 'right', label: 'Right' }, { value: 'left', label: 'Left' }], description: 'Where the buttons sit around the number' },
  wrap_values: sw('Wrap Around', 'Going past the maximum returns to the minimum, and vice versa'),
};

export const CURRENCY_OPTIONS = {
  ...MIN_MAX_VALUE,
  currency_symbol: txt('Currency Symbol', 'Symbol shown beside the amount, e.g. $, €, ৳'),
  symbol_position: { type: 'select', label: 'Symbol Position', section: 'general', allowClear: false, options: [{ value: 'before', label: 'Before amount' }, { value: 'after', label: 'After amount' }], description: 'Where the symbol appears' },
};

export const PERCENTAGE_OPTIONS = {
  ...MIN_MAX_VALUE,
  symbol_position: { type: 'select', label: '% Position', section: 'general', allowClear: false, options: [{ value: 'before', label: 'Before number' }, { value: 'after', label: 'After number' }], description: 'Where the % sign appears' },
};

export const TIME_OPTIONS = {
  default_value: txt('Default Time', 'Pre-filled time (HH:MM, 24-hour)', 'general', '09:00'),
  min_time: txt('Earliest Time', 'Earliest allowed time (HH:MM, 24-hour)', 'validation', '09:00'),
  max_time: txt('Latest Time', 'Latest allowed time (HH:MM, 24-hour)', 'validation', '17:00'),
  time_increment: num('Minute Step', 'Allowed minute increments, e.g. 15 or 30'),
};

export const DATE_RANGE_OPTIONS = {
  start_label: txt('Start Label', 'Label above the start date'),
  end_label: txt('End Label', 'Label above the end date'),
  min_date: txt('Earliest Date', 'Earliest selectable date (YYYY-MM-DD)', 'validation', 'YYYY-MM-DD'),
  max_date: txt('Latest Date', 'Latest selectable date (YYYY-MM-DD)', 'validation', 'YYYY-MM-DD'),
  range_separator: txt('Separator in Entries', 'Text between the two dates when saved, e.g. " - " or " to "', 'advanced'),
};

export const ADDRESS_OPTIONS = {
  include_street2: sw('Show Address Line 2', 'Include a second street line'),
  include_city: sw('Show City', 'Include a city box'),
  include_state: sw('Show State/Province', 'Include a state box'),
  include_zip: sw('Show Postal/Zip Code', 'Include a zip code box'),
  include_country: sw('Show Country', 'Include a country dropdown'),
  street1_label: txt('Street Label', 'Label for the street box'),
  street2_label: txt('Line 2 Label', 'Label for the second street line'),
  city_label: txt('City Label', 'Label for the city box'),
  state_label: txt('State Label', 'Label for the state box'),
  zip_label: txt('Zip Label', 'Label for the zip box'),
  country_label: txt('Country Label', 'Label for the country dropdown'),
  street1_placeholder: txt('Street Placeholder', 'Hint text in the street box'),
  street2_placeholder: txt('Line 2 Placeholder', 'Hint text in the second street line'),
  city_placeholder: txt('City Placeholder', 'Hint text in the city box'),
  state_placeholder: txt('State Placeholder', 'Hint text in the state box'),
  zip_placeholder: txt('Zip Placeholder', 'Hint text in the zip box'),
  address_layout: { type: 'select', label: 'Layout', section: 'general', allowClear: false, options: [{ value: 'vertical', label: 'Stacked' }, { value: 'grid', label: 'Grid' }], description: 'Stack every box, or arrange city/state/zip in a grid' },
  grid_columns: { type: 'select', label: 'Grid Columns', section: 'general', allowClear: false, options: [{ value: 2, label: '2' }, { value: 3, label: '3' }], description: 'Columns used by the grid layout' },
};

export const MASKED_INPUT_OPTIONS = {
  ...TEXT_INPUT_OPTIONS,
  custom_mask: txt('Mask', '9 = digit, a = letter, * = letter or digit. Other characters are typed for the user.', 'general', '(999) 999-9999'),
  mask_hint: txt('Mask Hint', 'Helper text shown under the input, e.g. "Format: (555) 123-4567"'),
  validate_mask: sw('Require Complete Mask', 'Reject values that do not fill the whole mask', 'validation'),
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * ADVANCED & SECURITY FIELDS
 * ═════════════════════════════════════════════════════════════════════
 */
const sel = (label, description, options, section = 'general') => ({ type: 'select', label, section, description, allowClear: false, options });
const ALIGN = [{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }];
const LINE = [{ value: 'solid', label: 'Solid' }, { value: 'dashed', label: 'Dashed' }, { value: 'dotted', label: 'Dotted' }];

export const PASSWORD_OPTIONS = {
  requirements_hint: txt('Requirements Hint', 'Short text under the input describing the rules'),
  min_length: num('Minimum Length', 'Fewest characters allowed', 'validation'),
  max_length: num('Maximum Length', 'Most characters allowed (empty = no limit)', 'validation'),
  require_uppercase: sw('Require Uppercase Letter', 'At least one A–Z', 'validation'),
  require_lowercase: sw('Require Lowercase Letter', 'At least one a–z', 'validation'),
  require_number: sw('Require Number', 'At least one 0–9', 'validation'),
  require_special: sw('Require Special Character', 'At least one symbol such as ! @ # $', 'validation'),
  enable_strength_meter: sw('Show Strength Meter', 'Show a bar that rates the password as it is typed'),
  show_toggle: sw('Show/Hide Button', 'Let the user reveal what they typed'),
  show_text: txt('Show Button Text', 'Text on the reveal button'),
  hide_text: txt('Hide Button Text', 'Text on the hide button'),
  require_confirmation: sw('Confirm Password', 'Ask the user to type the password twice', 'validation'),
  confirmation_label: txt('Confirm Label', 'Label above the confirmation box', 'validation'),
  confirmation_placeholder: txt('Confirm Placeholder', 'Hint text in the confirmation box', 'validation'),
  confirmation_error: txt('Mismatch Error', 'Shown when the two passwords differ', 'validation'),
};

export const HIDDEN_FIELD_OPTIONS = {
  label: txt('Label (entries only)', 'Name shown for this value in entries and emails'),
  default_value: txt('Value', 'Value submitted with the form'),
  param_populate: txt('Fill From URL Parameter', 'If the page URL has ?name=value, use that value instead, e.g. utm_source', 'general', 'utm_source'),
};

export const SECTION_BREAK_OPTIONS = {
  title: txt('Title', 'Section heading'),
  description: { type: 'textarea', label: 'Description', section: 'general', rows: 3, description: 'Text under the title' },
  alignment: sel('Alignment', 'Text alignment', ALIGN),
  show_divider: sw('Show Divider', 'Draw a line under the section title'),
  divider_style: sel('Divider Style', 'Line style', LINE, 'style'),
  divider_color: { type: 'color', label: 'Divider Color', section: 'style', description: 'Leave empty for the default' },
  divider_thickness: num('Divider Thickness (px)', 'Line thickness', 'style'),
  background_color: { type: 'color', label: 'Background Color', section: 'style', description: 'Background of the section header' },
  text_color: { type: 'color', label: 'Text Color', section: 'style', description: 'Title and description color' },
  collapsible: sw('Collapsible', 'Let visitors show/hide the fields below this section (up to the next section break)'),
  default_collapsed: sw('Start Collapsed', 'Hide the section fields until the visitor opens them'),
  toggle_text_open: txt('Hide Button Text', 'Button text while the section is open'),
  toggle_text_closed: txt('Show Button Text', 'Button text while the section is closed'),
};

export const TERMS_OPTIONS = {
  label: txt('Agreement Text', 'Text beside the checkbox'),
  display_type: sel('Show Terms As', 'How the terms are presented', [
    { value: 'box', label: 'Scrollable box above the checkbox' },
    { value: 'modal', label: 'Link that opens a popup' },
    { value: 'link', label: 'Link to a page' },
    { value: 'none', label: 'Checkbox only' },
  ]),
  terms_content: { type: 'textarea', label: 'Terms Content', section: 'general', rows: 8, description: 'Shown in the box or popup. Basic HTML allowed.' },
  scroll_height: num('Box Height (px)', 'Height of the scrollable box'),
  require_scroll: sw('Require Scrolling', 'Checkbox stays disabled until the box is scrolled to the end', 'validation'),
  link_text: txt('Link Text', 'Text of the link that opens the terms'),
  link_url: txt('Terms Page URL', 'Page opened by the link (Link to a page)', 'general', 'https://'),
  modal_title: txt('Popup Title', 'Heading of the popup'),
  checkbox_position: sel('Checkbox Position', 'Checkbox before or after the text', [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }]),
};

export const GDPR_OPTIONS = {
  label: txt('Consent Text', 'Text beside the checkbox'),
  policy_text: { type: 'textarea', label: 'Policy Text', section: 'general', rows: 3, description: 'Shown above the checkbox' },
  policy_url: txt('Privacy Policy URL', 'Link added after the consent text', 'general', 'https://'),
  default_checked: sw('Checked by Default', 'Note: GDPR generally requires consent to be opt-in'),
  show_storage_info: sw('Show Storage Info', 'Say how long data is kept'),
  storage_duration_text: txt('Storage Text', 'Use {days} for the number of days'),
  storage_days: num('Storage Days', 'Number of days data is kept'),
  show_withdraw_link: sw('Show Withdraw Info', 'Explain how to withdraw consent'),
  withdraw_text: txt('Withdraw Text', 'How to withdraw consent'),
  withdraw_email: txt('Withdraw Email', 'Email address for withdrawal requests'),
};

export const SHORTCODE_OPTIONS = {
  shortcode_content: txt('Shortcode', 'Any WordPress shortcode, e.g. [gallery ids="1,2"]', 'general', '[your_shortcode]'),
  run_shortcode: sw('Run Shortcode', 'Turn off to temporarily hide the output'),
  cache_output: sw('Cache Output', 'Store the output to speed up page loads', 'advanced'),
  cache_duration: num('Cache Duration (seconds)', 'How long cached output is kept', 'advanced'),
  fallback_content: txt('Fallback Text', 'Shown when the shortcode outputs nothing'),
};

export const ACTION_HOOK_OPTIONS = {
  hook_name: txt('Hook Name', 'Runs do_action( hook_name, $form_id, $field ). Developers attach output with add_action().', 'general', 'custom_form_hook'),
  fallback_content: txt('Fallback Text', 'Shown when nothing is attached to the hook'),
};

export const RANGE_SLIDER_OPTIONS = {
  min: num('Minimum', 'Lowest value', 'validation'),
  max: num('Maximum', 'Highest value', 'validation'),
  step: num('Step', 'Increment between values'),
  default_value: num('Default Value', 'Starting position'),
  show_value: sw('Show Current Value', 'Display the selected number above the slider'),
  value_prefix: txt('Value Prefix', 'Text before the number, e.g. $'),
  value_suffix: txt('Value Suffix', 'Text after the number, e.g. %'),
  min_label: txt('Minimum Label', 'Text under the left end (empty = the number)'),
  max_label: txt('Maximum Label', 'Text under the right end (empty = the number)'),
  track_color: { type: 'color', label: 'Slider Color', section: 'style', description: 'Color of the filled track and handle' },
};

export const COLOR_PICKER_OPTIONS = {
  default_color: { type: 'color', label: 'Default Color', section: 'general', description: 'Pre-selected color' },
  picker_type: sel('Picker Type', 'How colors are chosen', [
    { value: 'swatches', label: 'Swatches' },
    { value: 'picker', label: 'Color picker' },
    { value: 'both', label: 'Swatches + picker' },
  ]),
  swatches: { type: 'select', mode: 'tags', label: 'Swatches', section: 'general', options: [], description: 'Hex colors to offer, e.g. #e94560 (type and press Enter)' },
  allow_custom: sw('Allow Any Color', 'Accept colors outside the swatch list (always on for the picker)', 'validation'),
  swatch_size: sel('Swatch Size', 'Size of each swatch', [{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }], 'style'),
};

export const SUBMIT_BUTTON_OPTIONS = {
  button_text: txt('Button Text', 'Text on the button'),
  loading_text: txt('Loading Text', 'Shown while the form is submitting'),
  button_style: sel('Style', 'Button look', [{ value: 'primary', label: 'Filled' }, { value: 'outline', label: 'Outline' }, { value: 'secondary', label: 'Subtle' }], 'style'),
  button_size: sel('Size', 'Button size', [{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }], 'style'),
  button_shape: sel('Shape', 'Corner style', [{ value: 'square', label: 'Square' }, { value: 'rounded', label: 'Rounded' }, { value: 'pill', label: 'Pill' }], 'style'),
  button_width: sel('Width', 'Button width', [{ value: 'auto', label: 'Fit text' }, { value: 'full', label: 'Full width' }], 'style'),
  button_alignment: sel('Alignment', 'Button position', ALIGN, 'style'),
  button_bg_color: { type: 'color', label: 'Button Color', section: 'style', description: 'Leave empty for the default' },
  button_text_color: { type: 'color', label: 'Text Color', section: 'style', description: 'Leave empty for the default' },
  require_confirmation: sw('Ask Before Submitting', 'Show a confirmation dialog before sending'),
  confirm_message: txt('Confirmation Message', 'Question shown in the dialog'),
};

const CAPTCHA_BASE = {
  validation_message: txt('Error Message', 'Shown when the check fails or is not completed', 'validation'),
};
export const RECAPTCHA_OPTIONS = {
  ...CAPTCHA_BASE,
  theme: sel('Theme', 'Widget color scheme (reCAPTCHA v2 only)', [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]),
  size: sel('Size', 'Widget size (reCAPTCHA v2 only)', [{ value: 'normal', label: 'Normal' }, { value: 'compact', label: 'Compact' }]),
};
export const HCAPTCHA_OPTIONS = {
  ...CAPTCHA_BASE,
  theme: sel('Theme', 'Widget color scheme', [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]),
  size: sel('Size', 'Widget size', [{ value: 'normal', label: 'Normal' }, { value: 'compact', label: 'Compact' }]),
};
export const TURNSTILE_OPTIONS = {
  ...CAPTCHA_BASE,
  theme: sel('Theme', 'Widget color scheme', [{ value: 'auto', label: 'Match visitor' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]),
  size: sel('Size', 'Widget size', [{ value: 'normal', label: 'Normal' }, { value: 'compact', label: 'Compact' }, { value: 'flexible', label: 'Full width' }]),
  appearance: sel('Appearance', 'When the widget is visible', [{ value: 'always', label: 'Always' }, { value: 'interaction-only', label: 'Only when a check is needed' }]),
};

/**
 * ═════════════════════════════════════════════════════════════════════
 * COMMON OPTION GROUPS  (single source of truth)
 * ═════════════════════════════════════════════════════════════════════
 *
 * Options shared by several field types are declared ONCE here as named
 * groups, and every field type simply lists the groups it supports in
 * FIELD_TYPE_GROUPS. Options unique to one type stay in that type's
 * defaultProps (see fieldTypes.jsx). To give a new field an existing
 * option, add the group name to its entry; to add a new shared option,
 * add it to a group (and its definition to UNIVERSAL_OPTIONS).
 */
export const OPTION_GROUPS = {
  admin_label: ['admin_label'], // Admin-only label shown in entries
  container: ['container_class'], // Wrapper CSS class (Style)
  identity: ['label', 'name_attribute'], // Element label + name attribute
  hidden: ['hidden'], // Hide-field switch
  element: ['element_class'], // Input CSS class (Style)
  required: ['required'], // Required switch
  valmsg: ['validation_message'], // Custom validation message
  help: ['help_text', 'help_text_position'], // Help message + position
  helptext: ['help_text'], // Help message only (no position)
  value: ['default_value'], // Default value
  placeholder: ['placeholder'], // Placeholder
  affix: ['prefix_label', 'suffix_label'], // Prefix / suffix labels
  keyboard: ['mobile_keyboard_type'], // Mobile keyboard type
  autocomplete: ['autocomplete_attribute'], // Browser autocomplete hint
  numeric: ['min_value', 'max_value', 'read_only'], // Min / max value + read-only
  step: ['step'], // Step increment
  stepper: ['min', 'max'], // Min / max (spinner, slider)
  symbol: ['symbol_position'], // Symbol position
  shuffle: ['shuffle_options'], // Shuffle options
  selection_limit: ['min_selections', 'max_selections'], // Min / max selections
  length_limit: ['min_length', 'max_length'], // Min / max length
  unique: ['validate_unique', 'unique_error_message'], // Unique-value validation
  mask: ['custom_mask', 'reversible_mask', 'clear_on_invalid'], // Input-mask extras
  date_limits: ['min_date', 'max_date'], // Min / max date
  divider: ['alignment', 'description', 'show_divider', 'divider_style', 'divider_color'], // Alignment, description and divider styling
  fallback: ['fallback_content'], // Fallback content
  columns: ['columns'], // Column count
  column_spacing: ['gap', 'responsive_stack'], // Column gap + responsive stacking
  captcha: ['theme', 'size'], // Captcha theme + size
  conditional: ['conditional_logic', 'condition_match', 'conditions'], // Conditional-logic data (edited in its own section)
};

export const FIELD_TYPE_GROUPS = {
  text: ['conditional', 'admin_label', 'container', 'identity', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'affix', 'keyboard', 'unique', 'mask'],
  email: ['conditional', 'admin_label', 'container', 'identity', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'keyboard', 'unique'],
  textarea: ['conditional', 'admin_label', 'container', 'identity', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'length_limit'],
  select: ['conditional', 'admin_label', 'container', 'identity', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'shuffle'],
  multiselect: ['conditional', 'admin_label', 'container', 'identity', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'shuffle', 'selection_limit'],
  number: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'affix', 'keyboard', 'numeric', 'step'],
  radio: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'shuffle'],
  checkbox: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'shuffle', 'selection_limit'],
  url: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'affix', 'keyboard', 'autocomplete'],
  phone: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'affix', 'keyboard', 'autocomplete'],
  date: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'date_limits'],
  html: ['conditional', 'admin_label', 'container', 'hidden', 'element'],
  name: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help'],
  heading: ['conditional', 'admin_label', 'container', 'hidden', 'element', 'divider'],
  country_select: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder'],
  spinner: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'step', 'stepper'],
  currency: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'numeric', 'step', 'symbol'],
  percentage: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'numeric', 'step', 'symbol'],
  time: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value'],
  date_range: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'date_limits'],
  address: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help'],
  masked_input: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'placeholder', 'affix', 'mask'],
  password: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'placeholder', 'autocomplete', 'length_limit'],
  hidden: ['admin_label', 'identity', 'value'],
  section_break: ['conditional', 'admin_label', 'container', 'hidden', 'element', 'divider'],
  terms_conditions: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'helptext'],
  gdpr_agreement: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'helptext'],
  shortcode: ['conditional', 'admin_label', 'container', 'hidden', 'element', 'fallback'],
  action_hook: ['conditional', 'admin_label', 'container', 'hidden', 'element', 'fallback'],
  range_slider: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help', 'value', 'step', 'stepper'],
  color_picker: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'element', 'required', 'valmsg', 'help'],
  custom_submit_button: ['conditional', 'admin_label', 'container', 'hidden', 'element'],
  column_1: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'columns'],
  column_2: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'columns', 'column_spacing'],
  column_3: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'columns', 'column_spacing'],
  column_4: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'columns', 'column_spacing'],
  column_5: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'columns', 'column_spacing'],
  column_6: ['conditional', 'admin_label', 'container', 'identity', 'hidden', 'columns', 'column_spacing'],
  recaptcha: ['admin_label', 'container', 'valmsg', 'captcha'],
  hcaptcha: ['admin_label', 'container', 'valmsg', 'captcha'],
  turnstile: ['admin_label', 'container', 'valmsg', 'captcha'],
};

/** Every option key that belongs to a shared group. */
export const COMMON_OPTION_KEYS = new Set(Object.values(OPTION_GROUPS).flat());

/** Shared option keys supported by a field type, resolved from its groups. */
export function getCommonOptionKeys(fieldType) {
  return (FIELD_TYPE_GROUPS[fieldType] || []).flatMap(name => OPTION_GROUPS[name] || []);
}

/**
 * Default VALUES for the shared options. createField() applies these first, so a field
 * type's defaultProps only needs to list values that differ (its label, placeholder, ...).
 */
export const COMMON_OPTION_DEFAULTS = {
  admin_label: '', container_class: '', element_class: '', name_attribute: '',
  label: '', placeholder: '', default_value: '', prefix_label: '', suffix_label: '',
  required: false, hidden: false, validation_message: '',
  help_text: '', help_text_position: 'below',
  conditional_logic: false, condition_match: 'any', conditions: [],
};

/** Shared default values for a field type, limited to the options its groups include. */
export function getCommonDefaults(fieldType) {
  const out = {};
  getCommonOptionKeys(fieldType).forEach(key => {
    if (key in COMMON_OPTION_DEFAULTS) out[key] = JSON.parse(JSON.stringify(COMMON_OPTION_DEFAULTS[key]));
  });
  return out;
}

/**
 * ═════════════════════════════════════════════════════════════════════
 * STYLE OPTION GROUPS  (drives the Style Options tab)
 * ═════════════════════════════════════════════════════════════════════
 *
 * The Style Options tab renders one block per group. Which blocks a field type
 * gets is decided here, so adding a block or a field type never touches the tab code.
 * Field-specific style settings (heading colour, divider style, ...) are the
 * `section: 'style'` entries in the option definitions above.
 */

/**
 * Declarative controls for each style group. FormEditor's Style Options tab renders these
 * generically, so a control is added or reworded here only.
 *
 * control types: select | number | quad (4 numbers: top/right/bottom/left) | color | text
 * `customKey`: a select whose 'custom' choice reveals a number input stored under that key.
 */
const SIDE_LABELS = ['Top', 'Right', 'Bottom', 'Left'];
export const STYLE_BLOCKS = [
  {
    group: 'label_layout', title: 'Label Style', controls: [
      { key: 'label_placement', type: 'select', label: 'Label Placement', tip: 'Position the label above, below, left, or right of the field input.', default: 'top', options: [
        { value: 'top', label: 'Top' }, { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }, { value: 'hidden', label: 'Hidden' },
      ] },
      { key: 'label_width', type: 'select', label: 'Label Width', tip: 'Set the width of the label. Use "Auto" to let the label text determine the width.', default: 'auto', customKey: 'label_width_custom', customLabel: 'Custom Width (px)', customTip: 'Enter a custom width in pixels for the label.', customPlaceholder: 'e.g. 180', options: [
        { value: 'auto', label: 'Auto' }, { value: '120px', label: 'Small (120px)' }, { value: '160px', label: 'Medium (160px)' }, { value: '200px', label: 'Large (200px)' }, { value: '100%', label: 'Full Width' }, { value: 'custom', label: 'Custom' },
      ] },
    ],
  },
  {
    group: 'field_box', title: 'Field Style', controls: [
      { key: 'field_width', type: 'select', label: 'Field Width', tip: 'Set the width of the field input area. Half = 50%, Three Quarter = 75%, Full Width = 100%.', default: '100%', customKey: 'field_width_custom', customLabel: 'Custom Width (px)', customTip: 'Enter a custom width in pixels for the field input.', customPlaceholder: 'e.g. 400', options: [
        { value: '50%', label: 'Half' }, { value: '75%', label: 'Three Quarter' }, { value: '100%', label: 'Full Width' }, { value: 'custom', label: 'Custom' },
      ] },
      { type: 'quad', label: 'Input Padding (px)', tip: 'Control the spacing inside the field input between the text and the border.', keys: ['padding_top', 'padding_right', 'padding_bottom', 'padding_left'], defaults: [10, 14, 10, 14], sides: SIDE_LABELS },
      { type: 'quad', label: 'Input Margin (px)', tip: 'Control the spacing outside the field input to separate it from other elements.', keys: ['margin_top', 'margin_right', 'margin_bottom', 'margin_left'], defaults: [0, 0, 0, 0], sides: SIDE_LABELS },
      { key: 'border_radius', type: 'number', label: 'Border Radius (px)', tip: 'Round the corners of the field input. Higher values create more rounded corners.', default: 8 },
    ],
  },
  {
    group: 'colors', title: 'Colors', controls: [
      { key: 'bg_color', type: 'color', label: 'Background Color', tip: 'The background color of the field input area.', default: '#ffffff' },
      { key: 'border_color', type: 'color', label: 'Border Color', tip: 'The color of the border around the field input.', default: '#e2e8f0' },
      { key: 'text_color', type: 'color', label: 'Text Color', tip: 'The color of the text entered by users in the field input.', default: '#1e293b' },
    ],
  },
  {
    group: 'css_class', title: 'Custom CSS', controls: [
      { key: 'css_class', type: 'text', label: 'CSS Class', tip: 'Add a custom CSS class to this field for advanced styling. You can then target this class in your custom CSS.', placeholder: 'my-custom-class' },
    ],
  },
];

/** Option keys managed by each style group, derived from STYLE_BLOCKS so the two can't drift. */
export const STYLE_GROUPS = Object.fromEntries(STYLE_BLOCKS.map(block => [
  block.group,
  block.controls.flatMap(c => [...(c.keys || [c.key]), ...(c.customKey ? [c.customKey] : [])]),
]));

// Types rendered by the shared input template on the form (mirrors STANDARD_TYPES in class-formglut-shortcode.php).
const STANDARD_INPUT_TYPES = [
  'text', 'email', 'textarea', 'select', 'multiselect', 'number', 'radio', 'checkbox', 'url', 'phone', 'date',
  'name', 'country_select', 'spinner', 'currency', 'percentage', 'time', 'date_range', 'address', 'masked_input',
  'password', 'range_slider', 'color_picker',
];

/** Style groups shown for a field type. Types this file doesn't know (pro fields) get every group. */
export function getStyleGroups(fieldType) {
  if (STANDARD_INPUT_TYPES.includes(fieldType)) return Object.keys(STYLE_GROUPS);
  if (FIELD_TYPE_GROUPS[fieldType]) {
    // Hidden inputs and column containers have nothing to style; other blocks only take a CSS class.
    return fieldType === 'hidden' || /^column_\d+$/.test(fieldType) ? [] : ['css_class'];
  }
  return Object.keys(STYLE_GROUPS);
}

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
  url: URL_OPTIONS,
  phone: PHONE_OPTIONS,
  number: NUMBER_OPTIONS,
  radio: RADIO_OPTIONS,
  checkbox: CHECKBOX_OPTIONS,
  date: DATE_OPTIONS,
  html: HTML_OPTIONS,
  heading: HEADING_OPTIONS,
  name: NAME_OPTIONS,
  country_select: COUNTRY_OPTIONS_DEF,
  spinner: SPINNER_OPTIONS,
  currency: CURRENCY_OPTIONS,
  percentage: PERCENTAGE_OPTIONS,
  time: TIME_OPTIONS,
  date_range: DATE_RANGE_OPTIONS,
  address: ADDRESS_OPTIONS,
  masked_input: MASKED_INPUT_OPTIONS,
  file_upload: {},
  password: PASSWORD_OPTIONS,
  hidden: HIDDEN_FIELD_OPTIONS,
  section_break: SECTION_BREAK_OPTIONS,
  terms_conditions: TERMS_OPTIONS,
  gdpr_agreement: GDPR_OPTIONS,
  shortcode: SHORTCODE_OPTIONS,
  action_hook: ACTION_HOOK_OPTIONS,
  range_slider: RANGE_SLIDER_OPTIONS,
  color_picker: COLOR_PICKER_OPTIONS,
  custom_submit_button: SUBMIT_BUTTON_OPTIONS,
  recaptcha: RECAPTCHA_OPTIONS,
  hcaptcha: HCAPTCHA_OPTIONS,
  turnstile: TURNSTILE_OPTIONS,
};

/**
 * Get all option definitions for a specific field type
 *
 * @param {string} fieldType - The field type (e.g., 'text', 'email', 'number')
 * @returns {Object} Object containing all option definitions for this field type
 */
export function getOptionsForFieldType(fieldType) {
  return { ...COMMON_OPTION_DEFS, ...(FIELD_TYPE_OPTIONS_MAP[fieldType] || {}) };
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
