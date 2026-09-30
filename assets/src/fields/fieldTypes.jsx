/**
 * FormGlut Field Type Registry.
 *
 * This file contains all FREE field type definitions.
 * Each entry has: label, icon, category, and comprehensive defaultProps.
 *
 * Pro fields are defined separately in proFieldTypes.jsx and are merged
 * into this registry when the formglut-pro plugin is active.
 * Fields that are FREE in FluentForm are also FREE here.
 */

import React from 'react';
import { getCommonDefaults } from './SharedOptions.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare, faEnvelope, faFileLines, faHashtag,
  faList, faCircleDot, faSquareCheck, faCalendar,
  faEyeSlash, faLock, faFont, faCrown,
  faGlobe, faSpinner, faUser, faHeading, faToggleOn,
  faMoneyBill, faPercent, faPalette, faStar,
  faPhone, faLink, faClock, faUpload, faImage,
  faTableColumns, faCreditCard, faReceipt, faShield,
  faSignature, faCheckDouble, faCamera, faMicrophone, faSliders,
  faMapLocation, faMask, faVideo, faFileAudio, faArrowDownShortWide,
  faThumbsUp, faHandshake, faTriangleExclamation, faBarcode,
  faRepeat, faAlignLeft, faBarsProgress, faHourglassHalf, faTableList,
  faCertificate, faTruck, faRotate, faTags, faCalculator, faClone,
  faArrowRightToBracket, faUserTag, faPaperPlane, faRotateRight,
  faExpand, faCompress, faWandSparkles, faSave, faShareNodes, faHeart,
  faCropSimple, faCircleInfo, faEarthAmericas,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Common option definitions shared across field types
 */
const COMMON_OPTIONS = {
  // Label placement options
  labelPlacement: [
    { value: 'default', label: 'Default (Global Setting)' },
    { value: 'top', label: 'Above Field' },
    { value: 'bottom', label: 'Below Field' },
    { value: 'left', label: 'Left of Field' },
    { value: 'right', label: 'Right of Field' },
    { value: 'hidden', label: 'Hidden' },
  ],

  // Validation rule types
  validationTypes: [
    { value: 'required', label: 'Required Field' },
    { value: 'email', label: 'Valid Email Format' },
    { value: 'url', label: 'Valid URL Format' },
    { value: 'numeric', label: 'Numeric Value Only' },
    { value: 'min_length', label: 'Minimum Character Count' },
    { value: 'max_length', label: 'Maximum Character Count' },
    { value: 'pattern', label: 'Custom Pattern Match' },
    { value: 'unique', label: 'Unique Value (No Duplicates)' },
  ],

  // Mobile keyboard types
  keyboardTypes: [
    { value: 'default', label: 'Standard Keyboard' },
    { value: 'numeric', label: 'Numeric (0-9)' },
    { value: 'decimal', label: 'Decimal (0-9 with .)' },
    { value: 'tel', label: 'Telephone Keypad' },
    { value: 'email', label: 'Email Keyboard' },
    { value: 'url', label: 'URL Keyboard' },
  ],

  // Number format options
  numberFormats: [
    { value: 'none', label: 'No Formatting (1234567.89)' },
    { value: 'us_decimal', label: 'US with Decimal (1,234,567.89)' },
    { value: 'us_no_decimal', label: 'US without Decimal (1,234,567)' },
    { value: 'eu_decimal', label: 'EU with Decimal (1.234.567,89)' },
    { value: 'eu_no_decimal', label: 'EU without Decimal (1.234.567)' },
    { value: 'currency', label: 'Currency Format' },
    { value: 'percentage', label: 'Percentage Format' },
  ],

  // Layout options for checkable fields
  layoutOptions: [
    { value: 'default', label: 'Vertical List' },
    { value: 'inline', label: 'Horizontal Inline' },
    { value: 'button', label: 'Button Style' },
    { value: '2_column', label: '2 Column Grid' },
    { value: '3_column', label: '3 Column Grid' },
    { value: '4_column', label: '4 Column Grid' },
    { value: '5_column', label: '5 Column Grid' },
  ],

  // Smart code options for default values
  smartCodes: [
    { value: '{get_param}', label: 'URL Parameter Value' },
    { value: '{admin_email}', label: 'WordPress Admin Email' },
    { value: '{site_url}', label: 'Website URL' },
    { value: '{site_title}', label: 'Website Title' },
    { value: '{ip_address}', label: 'User IP Address' },
    { value: '{current_date}', label: 'Current Date' },
    { value: '{current_time}', label: 'Current Time' },
    { value: '{post_id}', label: 'Current Post/Page ID' },
    { value: '{post_title}', label: 'Current Post/Page Title' },
    { value: '{user_id}', label: 'Logged-in User ID' },
    { value: '{user_name}', label: 'User Display Name' },
    { value: '{user_email}', label: 'User Email' },
    { value: '{user_first_name}', label: 'User First Name' },
    { value: '{user_last_name}', label: 'User Last Name' },
    { value: '{http_referer}', label: 'Referring URL' },
    { value: '{random_string}', label: 'Random String' },
  ],
};

const FIELD_TYPES = {
  /* ═════════════════════════════════════════════════════════════════════
     GENERAL FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * TEXT INPUT FIELD
   * Single-line text input with comprehensive options
   */
  text: {
    label: 'Text Input',
    icon: <FontAwesomeIcon icon={faPenToSquare} />,
    category: 'general',
    defaultProps: {
      // === General Section ===
      label: 'Text Input',
      placeholder: 'Enter text here...',
      mobile_keyboard_type: 'default',
      enable_mask: false,
      mask_pattern: '',
      custom_mask: '',

      // === Validation Section ===
      validation_message: 'Please enter a valid value',
      character_limit: '',
      validate_unique: false,
      unique_error_message: 'This value has already been submitted',

      // === Style Section ===

      // === Advanced Section ===
      reversible_mask: false,
      clear_on_invalid: false,

      // === Conditional Logic ===
    },
  },

  /**
   * EMAIL FIELD
   * Email input with email validation
   */
  email: {
    label: 'Email Address',
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    category: 'general',
    defaultProps: {
      // === General Section ===
      label: 'Email Address',
      placeholder: 'email@example.com',
      required: true,
      mobile_keyboard_type: 'email',

      // === Validation Section ===
      validation_message: 'Please enter a valid email address',
      confirm_email: false,
      confirm_label: 'Confirm Email Address',
      confirm_placeholder: 'Re-enter email',
      confirm_error_message: 'Email addresses do not match',
      validate_unique: false,
      unique_error_message: 'This email has already been registered',

      // === Style Section ===

      // === Advanced Section ===

      // === Conditional Logic ===
    },
  },

  /**
   * TEXT AREA FIELD
   * Multi-line text input
   */
  textarea: {
    label: 'Text Area',
    icon: <FontAwesomeIcon icon={faFileLines} />,
    category: 'general',
    defaultProps: {
      // === General Section ===
      label: 'Message',
      placeholder: 'Type your message here...',
      rows: 4,
      cols: '',
      resize: 'vertical',

      // === Validation Section ===
      validation_message: 'Please enter at least {min} characters',
      max_length: '',
      min_length: '',

      // === Style Section ===

      // === Advanced Section ===
      enable_rtl: false,

      // === Conditional Logic ===
    },
  },

  /**
   * DROPDOWN / SELECT FIELD
   * Single choice dropdown
   */
  select: {
    label: 'Dropdown',
    icon: <FontAwesomeIcon icon={faList} />,
    category: 'general',
    defaultProps: {
      // === General Section ===
      label: 'Dropdown',
      placeholder: 'Choose an option...',
      disable_first_option: true,
      shuffle_options: false,
      options: [
        { label: 'Option 1', value: 'option1', image: '', disabled: false, calc_value: '' },
        { label: 'Option 2', value: 'option2', image: '', disabled: false, calc_value: '' },
        { label: 'Option 3', value: 'option3', image: '', disabled: false, calc_value: '' },
      ],

      // === Validation Section ===
      validation_message: 'Please select an option',

      // === Style Section ===

      // === Advanced Section ===

      // === Conditional Logic ===
    },
  },

  /**
   * MULTIPLE SELECT FIELD
   * Multiple choice dropdown (FREE in FluentForm)
   */
  multiselect: {
    label: 'Multiple Select',
    icon: <FontAwesomeIcon icon={faList} />,
    category: 'general',
    defaultProps: {
      // === General Section ===
      label: 'Multiple Select',
      placeholder: 'Choose options...',
      default_value: [],
      shuffle_options: false,
      select_all_button: true,
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],

      // === Validation Section ===
      validation_message: 'Please select at least one option',
      min_selections: 0,
      max_selections: 0,

      // === Style Section ===

      // === Advanced Section ===

      // === Conditional Logic ===
    },
  },

  /**
   * NUMERIC FIELD
   * Number input with formatting options
   */
  number: {
    label: 'Numeric Field',
    icon: <FontAwesomeIcon icon={faHashtag} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: 'Number',
      placeholder: 'Enter a number...',
      mobile_keyboard_type: 'numeric',

      // === Number Formatting ===

      // === Constraints ===
      min_value: '',
      max_value: '',
      step: 1,

      // === Validation Section ===
      validation_message: 'Please enter a valid number',

      // === Style Section ===

      // === Advanced Section ===
      read_only: false,

      // === Conditional Logic ===
    },
  },

  /**
   * RADIO FIELD
   * Single choice radio buttons
   */
  radio: {
    label: 'Radio Buttons',
    icon: <FontAwesomeIcon icon={faCircleDot} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: 'Radio Buttons',

      // === Radio Options ===
      options: [
        { label: 'Option 1', value: 'option1', image: '', calc_value: '' },
        { label: 'Option 2', value: 'option2', image: '', calc_value: '' },
        { label: 'Option 3', value: 'option3', image: '', calc_value: '' },
      ],

      // === Layout ===
      layout: 'default',

      // === Visual Options ===
      shuffle_options: false,

      // === Validation Section ===
      validation_message: 'Please select an option',

      // === Style Section ===

      // === Advanced Section ===

      // === Conditional Logic ===
    },
  },

  /**
   * CHECKBOX FIELD
   * Multiple choice checkboxes
   */
  checkbox: {
    label: 'Checkbox',
    icon: <FontAwesomeIcon icon={faSquareCheck} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: 'Checkbox',
      default_value: [],

      // === Checkbox Options ===
      options: [
        { label: 'Option 1', value: 'option1', image: '', calc_value: '' },
        { label: 'Option 2', value: 'option2', image: '', calc_value: '' },
        { label: 'Option 3', value: 'option3', image: '', calc_value: '' },
      ],

      // === Layout ===
      layout: 'default',

      // === Visual Options ===
      shuffle_options: false,

      // === Selection ===
      min_selections: 0,
      max_selections: 0,

      // === Validation Section ===
      validation_message: 'Please select at least one option',

      // === Style Section ===

      // === Advanced Section ===

      // === Conditional Logic ===
    },
  },

  /**
   * URL INPUT FIELD
   * Website URL input (FREE in FluentForm)
   */
  url: {
    label: 'Website URL',
    icon: <FontAwesomeIcon icon={faLink} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: 'Website',
      placeholder: 'https://example.com',
      mobile_keyboard_type: 'url',

      // === URL Options ===
      url_scheme: 'any',
      allow_relative: false,
      validate_url: true,

      // === Validation Section ===
      validation_message: 'Please enter a valid URL',

      // === Style Section ===

      // === Advanced Section ===
      autocomplete_attribute: 'url',

      // === Conditional Logic ===
    },
  },

  /**
   * PHONE FIELD
   * Phone number input (FREE in FluentForm)
   */
  phone: {
    label: 'Phone Number',
    icon: <FontAwesomeIcon icon={faPhone} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      mobile_keyboard_type: 'tel',

      // === Phone Format ===
      phone_format: 'international',
      custom_format: '',
      validate_phone: true,

      // === Validation Section ===
      validation_message: 'Please enter a valid phone number',

      // === Style Section ===

      // === Advanced Section ===
      autocomplete_attribute: 'tel',

      // === Conditional Logic ===
    },
  },

  /**
   * DATE & TIME FIELD
   * Date and/or time picker
   */
  date: {
    label: 'Date & Time',
    icon: <FontAwesomeIcon icon={faCalendar} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: 'Date',

      // === Date Format ===
      date_type: 'date',

      // === Constraints ===
      min_date: '',
      max_date: '',

      // === Validation Section ===
      validation_message: 'Please select a date',

      // === Style Section ===

      // === Advanced Section ===

      // === Conditional Logic ===
    },
  },

  /**
   * CUSTOM HTML FIELD
   * Display custom HTML content
   */
  html: {
    label: 'Custom HTML',
    icon: <FontAwesomeIcon icon={faFont} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      html_content: '<p>Custom HTML content here...</p>',
      enable_shortcodes: true,
    },
  },

  /**
   * NAME FIELDS
   * Compound name input (First, Middle, Last) (FREE in FluentForm)
   */
  name: {
    label: 'Name Fields',
    icon: <FontAwesomeIcon icon={faUser} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      label: 'Full Name',
      show_first_name: true,
      show_middle_name: false,
      show_last_name: true,
      require_first_name: true,
      require_middle_name: false,
      require_last_name: true,
      first_name_label: 'First Name',
      middle_name_label: 'Middle Name',
      last_name_label: 'Last Name',
      first_name_placeholder: 'First name',
      middle_name_placeholder: 'Middle name',
      last_name_placeholder: 'Last name',
      name_layout: 'horizontal',
      validation_message: 'Please enter your name',
    },
  },

  /**
   * HEADING FIELD
   * Section heading/divider (FREE in FluentForm)
   */
  heading: {
    label: 'Heading',
    icon: <FontAwesomeIcon icon={faHeading} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      text: 'Section Heading',
      heading_level: 'h2',
      alignment: 'left',
      description: '',
      custom_color: '',
      show_divider: false,
      divider_style: 'solid',
      divider_color: '',
    },
  },

  /**
   * COUNTRY SELECT
   * Country dropdown (FREE in FluentForm)
   */
  country_select: {
    label: 'Country',
    icon: <FontAwesomeIcon icon={faGlobe} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      label: 'Country',
      placeholder: 'Select country...',
      country_list: 'all',
      included_countries: [],
      excluded_countries: [],
      top_countries: ['US', 'CA', 'GB'],
      display_format: 'name',
      flag_type: 'emoji',
      validation_message: 'Please select a country',
    },
  },

  /**
   * SPINNER FIELD
   * Number with increment/decrement buttons (FREE in FluentForm)
   */
  spinner: {
    label: 'Spinner',
    icon: <FontAwesomeIcon icon={faSpinner} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      label: 'Quantity',
      placeholder: '0',
      default_value: 0,
      min: 0,
      max: 100,
      step: 1,
      show_buttons: true,
      increment_label: '+',
      decrement_label: '-',
      button_position: 'both',
      wrap_values: false,
      validation_message: 'Please enter a valid number',
    },
  },

  /**
   * CURRENCY FIELD
   * Money/currency input (FREE - variant of Numeric)
   */
  currency: {
    label: 'Currency',
    icon: <FontAwesomeIcon icon={faMoneyBill} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      label: 'Amount',
      placeholder: '0.00',
      currency_symbol: '$',
      symbol_position: 'before',
      min_value: '',
      max_value: '',
      step: 0.01,
      read_only: false,
      validation_message: 'Please enter a valid amount',
    },
  },

  /**
   * PERCENTAGE FIELD
   * Percentage input (FREE - variant of Numeric)
   */
  percentage: {
    label: 'Percentage',
    icon: <FontAwesomeIcon icon={faPercent} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      label: 'Percentage',
      placeholder: '0',
      symbol_position: 'after',
      min_value: 0,
      max_value: 100,
      step: 1,
      read_only: false,
      validation_message: 'Please enter a valid percentage',
    },
  },

  /**
   * TIME PICKER
   * Time-only picker (FREE - part of Date field in FluentForm)
   */
  time: {
    label: 'Time',
    icon: <FontAwesomeIcon icon={faClock} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      label: 'Time',
      min_time: '',
      max_time: '',
      time_increment: 30,
      validation_message: 'Please select a time',
    },
  },

  /**
   * DATE RANGE FIELD
   * Date range picker (FREE - variant of Date field)
   */
  date_range: {
    label: 'Date Range',
    icon: <FontAwesomeIcon icon={faCalendar} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      label: 'Date Range',
      start_label: 'Start Date',
      end_label: 'End Date',
      min_date: '',
      max_date: '',
      range_separator: ' - ',
      validation_message: 'Please select a date range',
    },
  },

  /**
   * ADDRESS FIELDS
   * Compound address input (FREE in FluentForm)
   */
  address: {
    label: 'Address',
    icon: <FontAwesomeIcon icon={faMapLocation} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      label: 'Address',
      include_street2: true,
      include_city: true,
      include_state: true,
      include_zip: true,
      include_country: false,
      street1_label: 'Street Address',
      street2_label: 'Address Line 2',
      city_label: 'City',
      state_label: 'State/Province',
      zip_label: 'Postal/Zip Code',
      country_label: 'Country',
      street1_placeholder: 'Street address',
      street2_placeholder: 'Apartment, suite, etc.',
      city_placeholder: 'City',
      state_placeholder: 'State',
      zip_placeholder: 'Zip code',
      address_layout: 'grid',
      grid_columns: 2,
      validation_message: 'Please enter your address',
    },
  },

  /**
   * MASK INPUT FIELD
   * Text with input masking (FREE in FluentForm)
   */
  masked_input: {
    label: 'Mask Input',
    icon: <FontAwesomeIcon icon={faMask} />,
    category: 'general',
    coming_soon: false,
    defaultProps: {
      label: 'Masked Input',
      custom_mask: '(999) 999-9999',
      mask_hint: '',
      reversible_mask: false,
      clear_on_invalid: false,
      validate_mask: true,
      validation_message: 'Please enter a valid value',
    },
  },

  /* ═════════════════════════════════════════════════════════════════════
     ADVANCED FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * PASSWORD FIELD
   */
  password: {
    label: 'Password',
    icon: <FontAwesomeIcon icon={faLock} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      label: 'Password',
      placeholder: 'Enter password...',
      required: true,
      requirements_hint: 'Must be at least 8 characters',
      min_length: 8,
      max_length: '',
      require_uppercase: false,
      require_lowercase: false,
      require_number: false,
      require_special: false,
      enable_strength_meter: false,
      show_toggle: true,
      show_text: 'Show',
      hide_text: 'Hide',
      require_confirmation: false,
      confirmation_label: 'Confirm Password',
      confirmation_placeholder: 'Re-enter password',
      confirmation_error: 'Passwords do not match',
      validation_message: 'Password does not meet requirements',
      autocomplete_attribute: 'new-password',
    },
  },

  /**
   * HIDDEN FIELD
   */
  hidden: {
    label: 'Hidden Field',
    icon: <FontAwesomeIcon icon={faEyeSlash} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      label: 'Hidden Field',
      param_populate: '',
    },
  },

  /**
   * SECTION BREAK
   * Content divider with optional collapsible (FREE in FluentForm)
   */
  section_break: {
    label: 'Section Break',
    icon: <FontAwesomeIcon icon={faExpand} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      title: 'Section Title',
      description: 'Optional section description',
      alignment: 'left',
      show_divider: true,
      divider_style: 'solid',
      divider_color: '',
      divider_thickness: 1,
      background_color: '',
      text_color: '',
      collapsible: false,
      default_collapsed: false,
      toggle_text_open: 'Hide',
      toggle_text_closed: 'Show',
    },
  },

  /**
   * TERMS & CONDITIONS
   * Terms agreement checkbox (FREE in FluentForm)
   */
  terms_conditions: {
    label: 'Terms & Conditions',
    icon: <FontAwesomeIcon icon={faHandshake} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      label: 'I agree to the Terms & Conditions',
      required: true,
      display_type: 'box',
      terms_content: '<p>Enter your terms and conditions here...</p>',
      scroll_height: 200,
      require_scroll: false,
      link_text: 'View Terms',
      link_url: '',
      modal_title: 'Terms & Conditions',
      checkbox_position: 'left',
      validation_message: 'You must agree to continue',
    },
  },

  /**
   * GDPR AGREEMENT
   * GDPR consent checkbox (FREE in FluentForm)
   */
  gdpr_agreement: {
    label: 'GDPR Agreement',
    icon: <FontAwesomeIcon icon={faShield} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      label: 'I consent to the processing of my personal data',
      required: true,
      policy_text: 'Your privacy is important to us. Please read our privacy policy.',
      policy_url: '',
      default_checked: false,
      show_storage_info: true,
      storage_duration_text: 'Your data will be stored for {days} days.',
      storage_days: 365,
      show_withdraw_link: true,
      withdraw_text: 'You can withdraw your consent at any time.',
      withdraw_email: '',
      validation_message: 'You must consent to continue',
    },
  },

  /**
   * SHORTCODE
   * WordPress shortcode output (FREE - WordPress feature)
   */
  shortcode: {
    label: 'Shortcode',
    icon: <FontAwesomeIcon icon={faBarcode} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      shortcode_content: '[your_shortcode]',
      run_shortcode: true,
      cache_output: false,
      cache_duration: 3600,
      fallback_content: '',
    },
  },

  /**
   * ACTION HOOK
   * Custom WordPress action hook (FREE - developer feature)
   */
  action_hook: {
    label: 'Action Hook',
    icon: <FontAwesomeIcon icon={faPaperPlane} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      hook_name: 'custom_form_hook',
      fallback_content: '',
    },
  },

  /**
   * TOGGLE SWITCH
   * On/off toggle switch
   */

  /**
   * RANGE SLIDER
   * Numeric range slider (FREE in FluentForm)
   */
  range_slider: {
    label: 'Range Slider',
    icon: <FontAwesomeIcon icon={faSliders} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      label: 'Range',
      min: 0,
      max: 100,
      step: 1,
      default_value: 50,
      show_value: true,
      value_prefix: '',
      value_suffix: '',
      min_label: '',
      max_label: '',
      track_color: '',
      validation_message: 'Please select a value',
    },
  },

  /**
   * COLOR PICKER
   * Color selection input (FREE in FluentForm)
   */
  color_picker: {
    label: 'Color Picker',
    icon: <FontAwesomeIcon icon={faPalette} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      label: 'Choose Color',
      default_color: '#e94560',
      picker_type: 'swatches',
      swatches: ['#e94560', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'],
      allow_custom: true,
      swatch_size: 'medium',
      validation_message: 'Please select a color',
    },
  },

  /**
   * STAR RATING
   * Visual star rating (PRO in FluentForm)
   */

  /**
   * SIGNATURE
   * Digital signature canvas (PRO in FluentForm)
   */

  /**
   * VIDEO EMBED
   */

  /**
   * AUDIO UPLOAD
   */

  /**
   * IMAGE SELECT
   */

  /**
   * FORM STEP
   * Multi-step form break (PRO in FluentForm)
   */

  /**
   * NET PROMOTER SCORE
   * NPS survey field (PRO in FluentForm)
   */

  /**
   * LIKERT SCALE
   */

  /**
   * EMOJI RATING
   */

  /**
   * CALCULATED FIELD
   */

  /**
   * LOOKUP FIELD
   */

  /**
   * RESET BUTTON
   */

  /**
   * SAVE & RESUME
   */

  /**
   * SOCIAL MEDIA PROFILES
   */

  /* ═════════════════════════════════════════════════════════════════════
     PRO FIELDS (Additional)
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * CHAINED SELECT
   * Hierarchical dropdowns (PRO in FluentForm)
   */

  /**
   * REPEAT FIELD
   * Repeatable field group (PRO in FluentForm)
   */

  /**
   * RICH TEXT INPUT
   * WYSIWYG editor (PRO in FluentForm)
   */

  /**
   * TAG INPUT
   */

  /**
   * SEARCHABLE DROPDOWN
   */

  /* ═════════════════════════════════════════════════════════════════════
     UPLOAD FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * FILE UPLOAD
   */

  /**
   * IMAGE UPLOAD
   */

  /**
   * MULTI-FILE UPLOAD
   */

  /**
   * CROPPED IMAGE UPLOAD
   */

  /**
   * WEBCAM CAPTURE
   */

  /**
   * VOICE RECORDING
   */

  /* ═════════════════════════════════════════════════════════════════════
     SURVEY & QUIZ FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * MATRIX QUESTION
   */

  /**
   * CHECKABLE GRID
   * Grid-based selection (PRO in FluentForm)
   */

  /**
   * MULTIPLE CHOICE GRID
   */

  /**
   * SEMANTIC DIFFERENTIAL
   */

  /**
   * IMAGE COMPARISON
   */

  /**
   * LABELED SLIDER
   */

  /**
   * QUIZ SCORE
   */

  /**
   * RANKING / ORDERING
   */

  /* ═════════════════════════════════════════════════════════════════════
     WORDPRESS SPECIFIC FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * USER REGISTRATION
   */

  /**
   * POST SUBMISSION
   */

  /**
   * FEATURED IMAGE UPLOAD
   */

  /**
   * CATEGORY SELECTION
   */

  /**
   * TAG SELECTION
   */

  /**
   * USER ROLE SELECTION
   */

  /* ═════════════════════════════════════════════════════════════════════
     DYNAMIC & INTERACTIVE FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * DYNAMIC LIST / TABLE
   * Dynamic table rows (PRO in FluentForm)
   */

  /**
   * EMAIL CONFIRMATION
   */

  /**
   * PASSWORD CONFIRMATION
   */

  /**
   * TOOLTIP FIELD
   */

  /**
   * ADDRESS AUTOCOMPLETE
   */

  /**
   * CUSTOM SUBMIT BUTTON
   * (FREE in FluentForm)
   */
  custom_submit_button: {
    label: 'Custom Submit Button',
    icon: <FontAwesomeIcon icon={faPaperPlane} />,
    category: 'advanced',
    coming_soon: false,
    defaultProps: {
      button_text: 'Submit Form',
      loading_text: 'Submitting...',
      button_style: 'primary',
      button_size: 'medium',
      button_shape: 'rounded',
      button_width: 'auto',
      button_alignment: 'left',
      button_bg_color: '',
      button_text_color: '',
      require_confirmation: false,
      confirm_message: 'Are you sure you want to submit?',
    },
  },

  /**
   * LIKE / DISLIKE
   */

  /**
   * FACEBOOK LIKE
   */

  /**
   * MARK ON MAP
   */

  /**
   * COLOR SWATCH
   */

  /**
   * DUAL LISTBOX
   */

  /**
   * CHAINED FIELDS
   */

  /* ═════════════════════════════════════════════════════════════════════
     CONTAINER LAYOUTS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * ONE COLUMN CONTAINER
   * (FREE in FluentForm - basic layout)
   */
  column_1: {
    label: 'One Column',
    icon: <FontAwesomeIcon icon={faTableColumns} />,
    category: 'layout',
    coming_soon: false,
    defaultProps: {
      columns: [{ width: 100, fields: [] }],
    },
  },

  /**
   * TWO COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_2: {
    label: 'Two Column',
    icon: <FontAwesomeIcon icon={faTableColumns} />,
    category: 'layout',
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 50, fields: [] },
        { width: 50, fields: [] },
      ],
      gap: 'medium',
      responsive_stack: true,
    },
  },

  /**
   * THREE COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_3: {
    label: 'Three Column',
    icon: <FontAwesomeIcon icon={faTableColumns} />,
    category: 'layout',
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 33.33, fields: [] },
        { width: 33.33, fields: [] },
        { width: 33.34, fields: [] },
      ],
      gap: 'medium',
      responsive_stack: true,
    },
  },

  /**
   * FOUR COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_4: {
    label: 'Four Column',
    icon: <FontAwesomeIcon icon={faTableColumns} />,
    category: 'layout',
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 25, fields: [] },
        { width: 25, fields: [] },
        { width: 25, fields: [] },
        { width: 25, fields: [] },
      ],
      gap: 'medium',
      responsive_stack: true,
    },
  },

  /**
   * FIVE COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_5: {
    label: 'Five Column',
    icon: <FontAwesomeIcon icon={faTableColumns} />,
    category: 'layout',
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
      ],
      gap: 'medium',
      responsive_stack: true,
    },
  },

  /**
   * SIX COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_6: {
    label: 'Six Column',
    icon: <FontAwesomeIcon icon={faTableColumns} />,
    category: 'layout',
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.7, fields: [] },
      ],
      gap: 'medium',
      responsive_stack: true,
    },
  },

  /**
   * ACCORDION SECTION
   */

  /**
   * TABS CONTAINER
   */

  /**
   * PROGRESS BAR
   */

  /**
   * COUNTDOWN TIMER
   */

  /* ═════════════════════════════════════════════════════════════════════
     PAYMENT FIELDS (PRO in FluentForm)
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * PAYMENT ITEM
   */

  /**
   * SUBSCRIPTION ITEM
   */

  /**
   * COUPON
   */

  /**
   * ITEM QUANTITY
   */

  /**
   * PAYMENT SUMMARY
   */

  /**
   * CUSTOM PAYMENT AMOUNT
   */

  /**
   * PAYMENT METHOD
   */

  /**
   * SHIPPING ADDRESS
   */

  /**
   * DONATION
   */

  /**
   * PRODUCT VARIATIONS
   */

  /**
   * TAX CALCULATION
   */

  /**
   * CREDIT CARD
   */

  /* ═════════════════════════════════════════════════════════════════════
     SECURITY FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * HONEYPOT
   */

  /**
   * RECAPTCHA
   * (FREE in FluentForm - essential security)
   */
  recaptcha: {
    label: 'reCAPTCHA',
    icon: <FontAwesomeIcon icon={faCheckDouble} />,
    category: 'security',
    coming_soon: false,
    defaultProps: {
      theme: 'light',
      size: 'normal',
      validation_message: 'Please complete the captcha verification',
    },
  },

  /**
   * HCAPTCHA
   * (FREE in FluentForm)
   */
  hcaptcha: {
    label: 'hCaptcha',
    icon: <FontAwesomeIcon icon={faShield} />,
    category: 'security',
    coming_soon: false,
    defaultProps: {
      theme: 'light',
      size: 'normal',
      validation_message: 'Please complete the captcha verification',
    },
  },

  /**
   * TURNSTILE
   * (FREE in FluentForm)
   */
  turnstile: {
    label: 'Turnstile',
    icon: <FontAwesomeIcon icon={faCertificate} />,
    category: 'security',
    coming_soon: false,
    defaultProps: {
      theme: 'auto',
      size: 'normal',
      appearance: 'always',
      validation_message: 'Please complete the captcha verification',
    },
  },

  /**
   * MATH CAPTCHA
   */

  /**
   * SLIDER CAPTCHA
   */
};

/**
 * Get all field types including pro fields from Pro plugin.
 *
 * Scope for Pro plugin to extend field types:
 * Pro plugin can inject its fields via: window.formglut_pro_fields = { ... }
 */
export function getAllFieldTypes() {
  // Start with free fields
  const allFields = { ...FIELD_TYPES };

  // Merge pro fields if available (from Pro plugin)
  if (typeof window !== 'undefined' && window.formglut_pro_fields) {
    Object.assign(allFields, window.formglut_pro_fields);
  }

  return allFields;
}

/**
 * Get pro-enabled field types.
 * When pro plugin is active, pro fields are enabled.
 */
export function getEnabledFieldTypes() {
  const proEnabled = typeof window !== 'undefined' && window.formglut_admin?.pro_enabled;
  const allFields = getAllFieldTypes();

  return Object.fromEntries(
    Object.entries(allFields).map(([key, field]) => {
      if (field.pro) {
        return [key, { ...field, enabled: !!proEnabled }];
      }
      return [key, field];
    })
  );
}

/**
 * Create a new field with default properties.
 *
 * @param {string} type - Field type.
 * @returns {object} Field object with defaults.
 */
export function createField(type) {
  // Check in both free and pro fields
  const allFields = getAllFieldTypes();
  const fieldType = allFields[type];
  if (!fieldType) {
    return { id: '', type: 'text', label: '', required: false };
  }

  return {
    id: '',
    type,
    ...getCommonDefaults(type),
    ...JSON.parse(JSON.stringify(fieldType.defaultProps)),
  };
}

// Export as both named and default for compatibility
export { FIELD_TYPES, COMMON_OPTIONS };
export default FIELD_TYPES;

/* ── Container helpers ─────────────────────────────────────────────── */

/**
 * Whether a field is a column container (column_1 … column_6).
 */
export function isContainerField(field) {
  return !!field && /^column_\d+$/.test(field.type || '') && Array.isArray(field.columns);
}

/**
 * Flatten a field tree into a list of input fields (containers removed,
 * their column children inlined in order).
 */
export function flattenFields(fields = []) {
  const out = [];
  (fields || []).forEach((f) => {
    if (isContainerField(f)) {
      f.columns.forEach((col) => out.push(...flattenFields(col.fields || [])));
    } else if (f) {
      out.push(f);
    }
  });
  return out;
}
