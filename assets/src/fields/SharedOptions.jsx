/**
 * Shared Field Options Configuration
 *
 * Simplified version with basic options only.
 *
 * Structure:
 * - UNIVERSAL_OPTIONS: Options that work for ALL field types
 * - TEXTAREA_OPTIONS: Options specific to textarea fields
 */

import { __ } from '@wordpress/i18n';

/**
 * Common option value arrays used across multiple option definitions
 */
export const COMMON_OPTION_VALUES = {
  labelPlacement: [
    { value: 'top', label: 'Above Field' },
    { value: 'left', label: 'Left of Field' },
    { value: 'right', label: 'Right of Field' },
    { value: 'hidden', label: 'Hidden' },
  ],
};

/**
 * Section order and titles for organizing options in the properties panel
 */
export const SECTION_ORDER = [
  'general',
  'validation',
];

export const SECTION_TITLES = {
  general: 'Field Options',
  validation: 'Validation',
};

/**
 * UNIVERSAL OPTIONS
 *
 * These options work for ALL field types.
 */
export const UNIVERSAL_OPTIONS = {
  // === Field Options (General) ===
  label: {
    type: 'text',
    label: 'Field Label',
    section: 'general',
    icon: 'fa-tag',
    description: 'The label displayed above or beside the field',
  },

  label_placement: {
    type: 'select',
    label: 'Label Placement',
    section: 'general',
    description: 'Where to position the label relative to the field',
    options: COMMON_OPTION_VALUES.labelPlacement,
  },

  placeholder: {
    type: 'text',
    label: 'Placeholder',
    section: 'general',
    placeholder: 'Text shown in empty field',
    description: 'Helpful hint shown inside the field when empty',
  },

  default_value: {
    type: 'text',
    label: 'Default Value',
    section: 'general',
    placeholder: 'Pre-populated value',
    description: 'Field is pre-filled with this value',
  },

  character_limit: {
    type: 'number',
    label: 'Character Limit',
    section: 'general',
    min: 0,
    placeholder: 'No limit',
    description: 'Maximum number of characters allowed. Leave empty for unlimited.',
  },

  // === Validation ===
  required: {
    type: 'switch',
    label: 'Required',
    section: 'validation',
    description: 'User must fill this field before submitting the form',
  },
};

/**
 * TEXTAREA OPTIONS
 *
 * Options specific to textarea fields
 */
export const TEXTAREA_OPTIONS = {
  rows: {
    type: 'number',
    label: 'Rows',
    section: 'general',
    min: 1,
    max: 50,
    description: 'Number of rows for textarea',
  },
};

/**
 * Field type to options mapping
 *
 * This maps each field type to the option sets it should use.
 */
const FIELD_TYPE_OPTIONS_MAP = {
  // === Text-based fields ===
  text: { ...UNIVERSAL_OPTIONS },
  email: { ...UNIVERSAL_OPTIONS },
  textarea: { ...UNIVERSAL_OPTIONS, ...TEXTAREA_OPTIONS },
  url: { ...UNIVERSAL_OPTIONS },
  phone: { ...UNIVERSAL_OPTIONS },
  hidden: { ...UNIVERSAL_OPTIONS },
  password: { ...UNIVERSAL_OPTIONS },

  // === Number-based fields ===
  number: { ...UNIVERSAL_OPTIONS },

  // === Select-based fields ===
  select: { ...UNIVERSAL_OPTIONS },
  multiselect: { ...UNIVERSAL_OPTIONS },
  radio: { ...UNIVERSAL_OPTIONS },
  checkbox: { ...UNIVERSAL_OPTIONS },

  // === Date/Time fields ===
  date: { ...UNIVERSAL_OPTIONS },
  time: { ...UNIVERSAL_OPTIONS },

  // === Other fields ===
  color_picker: { ...UNIVERSAL_OPTIONS },
  file_upload: { ...UNIVERSAL_OPTIONS },
};

/**
 * Get all option definitions for a specific field type
 *
 * @param {string} fieldType - The field type (e.g., 'text', 'email', 'number')
 * @returns {Object} Object containing all option definitions for this field type
 */
export function getOptionsForFieldType(fieldType) {
  // Return the mapped options or fall back to universal options
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
