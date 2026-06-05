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
      admin_label: '',
      placeholder: 'Enter text here...',
      default_value: '',
      required: false,
      help_text: '',
      help_text_position: 'below',
      prefix_label: '',
      suffix_label: '',
      mobile_keyboard_type: 'default',
      enable_mask: false,
      mask_pattern: '',
      custom_mask: '',
      mask_placeholder: '_',

      // === Validation Section ===
      validation_message: 'Please enter a valid value',
      character_limit: '',
      validate_unique: false,
      unique_error_message: 'This value has already been submitted',

      // === Style Section ===
      element_class: '',
      container_class: '',

      // === Advanced Section ===
      name_attribute: '',
      reversible_mask: false,
      clear_on_invalid: false,

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any',
      conditions: [],
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
      admin_label: '',
      placeholder: 'email@example.com',
      default_value: '',
      required: true,
      help_text: '',
      help_text_position: 'below',

      // === Validation Section ===
      validation_message: 'Please enter a valid email address',
      confirm_email: false,
      confirm_label: 'Confirm Email Address',
      confirm_placeholder: 'Re-enter email',
      confirm_error_message: 'Email addresses do not match',
      validate_unique: false,
      unique_error_message: 'This email has already been registered',

      // === Style Section ===
      element_class: '',
      container_class: '',

      // === Advanced Section ===
      name_attribute: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any',
      conditions: [],
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
      admin_label: '',
      placeholder: 'Type your message here...',
      default_value: '',
      required: false,
      help_text: '',
      help_text_position: 'below',
      rows: 4,
      cols: '',
      resize: 'vertical',

      // === Validation Section ===
      validation_message: 'Please enter at least {min} characters',
      max_length: '',
      min_length: '',

      // === Style Section ===
      element_class: '',
      container_class: '',

      // === Advanced Section ===
      name_attribute: '',
      enable_rtl: false,

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any',
      conditions: [],
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
      admin_label: '',
      placeholder: 'Choose an option...',
      default_value: '',
      required: false,
      help_text: '',
      help_text_position: 'below',
      disable_first_option: true,
      shuffle_options: false,
      enable_search: false,
      min_search_chars: 1,
      options: [
        { label: 'Option 1', value: 'option1', image: '', disabled: false, calc_value: '' },
        { label: 'Option 2', value: 'option2', image: '', disabled: false, calc_value: '' },
        { label: 'Option 3', value: 'option3', image: '', disabled: false, calc_value: '' },
      ],

      // === Validation Section ===
      validation_message: 'Please select an option',

      // === Style Section ===
      element_class: '',
      container_class: '',

      // === Advanced Section ===
      name_attribute: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any',
      conditions: [],
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
      admin_label: '',
      placeholder: 'Choose options...',
      default_value: [],
      required: false,
      help_text: '',
      help_text_position: 'below',
      shuffle_options: false,
      enable_search: true,
      select_all_button: true,
      display_format: 'tags',
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
      element_class: '',
      container_class: '',

      // === Advanced Section ===
      name_attribute: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any',
      conditions: [],
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Number',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Enter a number...',
      default_value: '',

      // === Number Formatting ===
      number_format: 'none', // none, us_decimal, us_no_decimal, eu_decimal, eu_no_decimal, currency, percentage
      decimal_places: 2, // For formatted numbers
      thousands_separator: true, // 1,234 vs 1234

      // === Prefix/Suffix ===
      prefix_label: '', // e.g., $
      suffix_label: '', // e.g., %

      // === Constraints ===
      min_value: '', // Minimum value
      max_value: '', // Maximum value
      step: 1, // Increment/decrement step

      // === Validation ===
      required: false,
      min_digits: '', // Exact digit count
      max_digits: '',

      // === Mobile ===
      keyboard_type: 'numeric', // numeric, decimal

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Calculation (Pro Feature in FluentForm) ===
      enable_calculation: false, // Enable for calculated fields
      calculation_formula: '', // e.g., {field1} + {field2}

      // === Advanced ===
      name_attribute: '',
      read_only: false,
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Radio Buttons',
      label_placement: 'default',
      admin_label: '',

      // === Radio Options ===
      options: [
        { label: 'Option 1', value: 'option1', image: '', calc_value: '' },
        { label: 'Option 2', value: 'option2', image: '', calc_value: '' },
        { label: 'Option 3', value: 'option3', image: '', calc_value: '' },
      ],
      default_value: '',

      // === Layout ===
      layout: 'default', // default, inline, button, 2_column, 3_column, 4_column, 5_column
      columns_gap: 'medium', // small, medium, large
      button_style: 'primary', // For button layout: primary, secondary, success, danger

      // === Visual Options ===
      show_option_images: false,
      image_size: 'medium', // small, medium, large
      shuffle_options: false,

      // === Validation ===
      required: false,
      unselect_option: false, // Allow deselecting

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Checkbox',
      label_placement: 'default',
      admin_label: '',

      // === Checkbox Options ===
      options: [
        { label: 'Option 1', value: 'option1', image: '', calc_value: '' },
        { label: 'Option 2', value: 'option2', image: '', calc_value: '' },
        { label: 'Option 3', value: 'option3', image: '', calc_value: '' },
      ],
      default_value: [], // Array of selected values

      // === Layout ===
      layout: 'default', // default, inline, button, 2_column, 3_column, 4_column, 5_column
      button_style: 'primary',

      // === Visual Options ===
      show_option_images: false,
      image_size: 'medium',
      shuffle_options: false,

      // === Selection ===
      min_selections: 0, // Minimum selections required
      max_selections: 0, // 0 = unlimited
      selection_message: 'Select between {min} and {max} options',

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Website',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'https://example.com',
      default_value: '', // Supports smart codes

      // === URL Options ===
      url_scheme: 'any', // any, http, https
      allow_relative: false, // Allow URLs without domain
      validate_url: true, // Check if URL is valid

      // === Link Options ===
      open_in_new_tab: false, // Add target="_blank"
      add_nofollow: false, // Add rel="nofollow"

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      prefix_label: '', // e.g., https://
      suffix_label: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      autocomplete_attribute: 'url',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Phone Number',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: '+1 (555) 123-4567',
      default_value: '',

      // === Phone Format ===
      phone_format: 'international', // international, us, uk, custom
      custom_format: '', // Custom mask pattern
      country_code: 'us', // Default country
      allow_country_code: true, // Show country dropdown

      // === Validation ===
      required: false,
      validate_phone: true, // Validate phone format
      validation_type: 'format', // format, length, both

      // === Styling ===
      container_class: '',
      element_class: '',
      prefix_label: '', // e.g., +1
      suffix_label: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      autocomplete_attribute: 'tel',
      keyboard_type: 'tel',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Date',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Select a date...',
      default_value: '', // Supports smart codes: {current_date}

      // === Date Format ===
      date_format: 'mm/dd/yyyy', // mm/dd/yyyy, dd/mm/yyyy, yyyy-mm-dd, etc.
      display_format: 'F j, Y', // Display format: January 1, 2024
      picker_format: 'm/d/Y', // Flatpickr format

      // === Date Type ===
      date_type: 'date', // date, time, datetime, date_range
      time_format: '12h', // 12h, 24h
      time_increment: 30, // Minutes: 1, 5, 10, 15, 30

      // === Constraints ===
      min_date: '', // Earliest selectable date
      max_date: '', // Latest selectable date
      disable_dates: [], // Array of disabled dates
      disable_weekdays: [], // [0, 6] = disable Sunday, Saturday
      enable_dates: [], // Only these dates available

      // === Range Options (for date_range) ===
      range_separator: ' to ',
      start_date_label: 'From',
      end_date_label: 'To',

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      theme: 'default', // default, dark, light

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      enable_timezone: false,
      default_timezone: 'UTC',
      inline_picker: false, // Show inline calendar
      week_numbers: false, // Show week numbers
      highlight_today: true,
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
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: 'HTML Content',
      html_content: '<p>Custom HTML content here...</p>',

      // === Options ===
      enable_shortcodes: true, // Parse WordPress shortcodes
      sanitize_html: false, // Sanitize for security

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Full Name',
      label_placement: 'default',
      admin_label: '',

      // === Name Format ===
      name_format: 'first-last', // first, first-last, first-middle-last, last-first
      placeholder: 'John Doe',

      // === Field Visibility ===
      show_first_name: true,
      show_middle_name: false,
      show_last_name: true,
      require_first_name: true,
      require_middle_name: false,
      require_last_name: true,

      // === Field Labels ===
      first_name_label: 'First Name',
      middle_name_label: 'Middle Name',
      last_name_label: 'Last Name',

      // === Placeholders ===
      first_name_placeholder: 'First name',
      middle_name_placeholder: 'Middle name',
      last_name_placeholder: 'Last name',

      // === Layout ===
      name_layout: 'horizontal', // horizontal, vertical
      name_spacing: 'medium', // small, medium, large

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Content ===
      text: 'Section Heading',
      heading_level: 'h2', // h1, h2, h3, h4, h5, h6

      // === Alignment ===
      alignment: 'left', // left, center, right

      // === Styling ===
      container_class: '',
      element_class: '',
      color_scheme: 'default', // default, primary, secondary, custom
      custom_color: '',

      // === Divider ===
      show_divider: false,
      divider_style: 'solid', // solid, dashed, dotted, double
      divider_color: '',

      // === Description ===
      description: '',
      description_position: 'below', // below, above

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Country',
      label_placement: 'default',
      admin_label: '',

      // === Dropdown Options ===
      placeholder: 'Select country...',
      default_value: '', // e.g., 'US'

      // === Country List ===
      country_list: 'all', // all, specific, exclude
      included_countries: [], // List of country codes
      excluded_countries: [], // List to exclude
      top_countries: ['US', 'CA', 'GB'], // Show at top

      // === Display Format ===
      display_format: 'name', // name, code, both
      flag_type: 'emoji', // emoji, none, image

      // === Search ===
      enable_search: true,
      searchable_threshold: 20,

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Quantity',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: '0',
      default_value: 0,

      // === Constraints ===
      min: 0,
      max: 100,
      step: 1,

      // === Buttons ===
      show_buttons: true,
      increment_label: '+',
      decrement_label: '-',
      button_position: 'right', // left, right, both

      // === Formatting ===
      prefix_label: '',
      suffix_label: '',
      number_format: 'none',
      decimal_places: 0,

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      button_style: 'default', // default, primary, secondary

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      wrap_values: false, // Wrap around when reaching min/max
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Amount',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: '$0.00',
      default_value: '',

      // === Currency Settings ===
      currency_code: 'USD', // ISO currency code
      currency_symbol: '$',
      symbol_position: 'before', // before, after
      decimal_places: 2,
      thousands_separator: true,

      // === Constraints ===
      min_value: '',
      max_value: '',
      step: 0.01,

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      read_only: false,
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Percentage',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: '0%',
      default_value: '',

      // === Percentage Settings ===
      symbol_position: 'after', // before, after, both, none
      decimal_places: 0, // Usually 0 or 2

      // === Constraints ===
      min_value: 0,
      max_value: 100,
      step: 1,

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      read_only: false,
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Time',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Select time...',
      default_value: '', // e.g., '09:00'

      // === Time Format ===
      time_format: '12h', // 12h, 24h
      display_format: 'g:i A', // PHP format

      // === Constraints ===
      min_time: '', // Earliest time: '09:00'
      max_time: '', // Latest time: '17:00'
      time_increment: 30, // Minutes: 1, 5, 10, 15, 30

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      inline_picker: false,
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Date Range',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Select date range...',
      default_value: { start: '', end: '' },

      // === Format ===
      date_format: 'mm/dd/yyyy',
      range_separator: ' - ',

      // === Constraints ===
      min_date: '',
      max_date: '',
      min_duration: '', // Minimum days between
      max_duration: '', // Maximum days between

      // === Labels ===
      start_label: 'Start Date',
      end_label: 'End Date',

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      single_datepicker: true, // Single picker with range
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Address',
      label_placement: 'default',
      admin_label: '',

      // === Field Components ===
      include_street1: true,
      include_street2: true,
      include_city: true,
      include_state: true,
      include_zip: true,
      include_country: false,

      // === Component Labels ===
      street1_label: 'Street Address',
      street2_label: 'Address Line 2',
      city_label: 'City',
      state_label: 'State/Province',
      zip_label: 'Postal/Zip Code',
      country_label: 'Country',

      // === Placeholders ===
      street1_placeholder: 'Street address',
      street2_placeholder: 'Apartment, suite, etc.',
      city_placeholder: 'City',
      state_placeholder: 'State',
      zip_placeholder: 'Zip code',

      // === State/Zip Options ===
      state_dropdown: false, // Dropdown vs text
      states_list: 'US', // Country for states
      zip_format: '', // Validation format

      // === Layout ===
      address_layout: 'vertical', // vertical, horizontal, grid
      grid_columns: 2, // For horizontal layout

      // === Required ===
      required_fields: [], // Which fields are required

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Masked Input',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: '',
      default_value: '',

      // === Mask Options ===
      mask_type: 'custom', // phone-us, phone-uk, date, ssn, credit_card, custom
      custom_mask: '(999) 999-9999', // 9 = digit, a = letter, * = alphanumeric
      mask_placeholder: '_', // Character for empty spots

      // === Behavior ===
      reversible_mask: false,
      clear_on_invalid: false,
      auto_format: true,

      // === Validation ===
      required: false,
      validate_mask: true, // Require complete mask

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',
      mask_hint: '', // Show expected format

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Password',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Enter password...',
      default_value: '',

      // === Password Strength ===
      enable_strength_meter: false,
      min_strength: 2, // 0-4
      strength_label: 'Password Strength',

      // === Constraints ===
      min_length: 8,
      max_length: '',
      require_uppercase: false,
      require_lowercase: false,
      require_number: false,
      require_special: false,
      forbidden_chars: '',

      // === Confirmation ===
      require_confirmation: false,
      confirmation_label: 'Confirm Password',
      confirmation_placeholder: 'Re-enter password',
      confirmation_error: 'Passwords do not match',

      // === Visibility Toggle ===
      show_toggle: true, // Eye icon to show/hide
      show_text: 'Show',
      hide_text: 'Hide',

      // === Validation ===
      required: true,
      validation_message: 'Password does not meet requirements',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',
      requirements_hint: 'Must be at least 8 characters',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Hidden Field',
      admin_label: '',

      // === Value ===
      default_value: '', // Supports smart codes

      // === Advanced ===
      name_attribute: '',
      param_populate: '', // Populate from URL param
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
    coming_soon: true,
    defaultProps: {
      // === Content ===
      title: 'Section Title',
      description: 'Optional section description',

      // === Alignment ===
      alignment: 'left', // left, center, right

      // === Divider ===
      show_divider: true,
      divider_style: 'solid', // solid, dashed, dotted
      divider_color: '',
      divider_thickness: 1, // px

      // === Collapsible ===
      collapsible: false,
      default_collapsed: false,
      toggle_text_open: 'Show',
      toggle_text_closed: 'Hide',
      toggle_position: 'right', // left, right

      // === Styling ===
      container_class: '',
      element_class: '',
      background_color: '',
      text_color: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: 'I agree to the Terms & Conditions',
      terms_content: '<p>Enter your terms and conditions here...</p>',

      // === Display Type ===
      display_type: 'checkbox', // checkbox, link, scroll, modal
      link_text: 'View Terms',
      link_url: '',
      modal_title: 'Terms & Conditions',
      modal_width: 600,

      // === Scroll Box ===
      scroll_height: 200, // For scroll type
      require_scroll: false, // Must scroll to bottom

      // === Validation ===
      required: true,
      required_message: 'You must agree to continue',

      // === Styling ===
      container_class: '',
      element_class: '',
      checkbox_position: 'left', // left, right

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: 'I consent to the processing of my personal data',
      policy_text: 'Your privacy is important to us. Please read our privacy policy.',
      policy_url: '',

      // === Consent Type ===
      consent_type: 'checkbox', // checkbox, opt-in, opt-out
      default_checked: false,

      // === Storage Info ===
      storage_duration_text: 'Your data will be stored for {days} days.',
      storage_days: 365,
      show_storage_info: true,

      // === Additional Info ===
      show_withdraw_link: true,
      withdraw_text: 'You can withdraw your consent at any time.',
      withdraw_email: '', // Email for withdrawal requests

      // === Validation ===
      required: true,
      required_message: 'You must consent to continue',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: '',
      shortcode_content: '[your_shortcode]',

      // === Options ===
      run_shortcode: true,
      cache_output: false,
      cache_duration: 3600, // seconds

      // === Fallback ===
      fallback_content: '', // Show if shortcode fails

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Content ===
      label: '',
      hook_name: 'custom_form_hook',

      // === Hook Options ===
      priority: 10,
      arguments: [], // Array of argument names

      // === Output ===
      echo_output: true,
      fallback_content: '',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Range',
      label_placement: 'default',
      admin_label: '',

      // === Range Options ===
      min: 0,
      max: 100,
      step: 1,
      default_value: 50,

      // === Labels ===
      show_value: true,
      value_prefix: '',
      value_suffix: '',
      min_label: '', // e.g., 'Poor'
      max_label: '', // e.g., 'Excellent'
      value_position: 'above', // above, below

      // === Appearance ===
      slider_style: 'modern', // modern, classic, simple
      show_ticks: false,
      tick_interval: 10,
      fill_track: true, // Fill from min to current value

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      track_color: '',
      handle_color: '',

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      tooltip: 'always', // always, on_hover, none
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: 'Choose Color',
      label_placement: 'default',
      admin_label: '',

      // === Color Options ===
      default_color: '#e94560',
      color_format: 'hex', // hex, rgb, hsl

      // === Display Type ===
      picker_type: 'swatches', // default, swatches, both
      swatches: ['#e94560', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'],
      allow_custom: true,

      // === Constraints ===
      allowed_colors: [], // Restrict to these colors
      exclude_colors: [],

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      swatch_size: 'medium', // small, medium, large

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      opacity: false, // Allow alpha channel
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
    coming_soon: true,
    defaultProps: {
      // === Button Options ===
      label: '',
      button_text: 'Submit Form',
      button_icon: '', // Icon class or SVG
      icon_position: 'left', // left, right

      // === Button Style ===
      button_style: 'primary', // primary, secondary, success, danger, warning
      button_size: 'medium', // small, medium, large
      button_shape: 'rounded', // rounded, square, pill
      button_width: 'auto', // auto, full, custom

      // === Alignment ===
      button_alignment: 'left', // left, center, right

      // === Button States ===
      loading_text: 'Submitting...',
    loading_icon: '', // Spinner icon
      disabled_while_submitting: true,

      // === Confirmation ===
      require_confirmation: false,
      confirm_message: 'Are you sure you want to submit?',
      confirm_button_text: 'Yes, Submit',
      cancel_button_text: 'Cancel',

      // === Styling ===
      container_class: '',
      element_class: '',
      custom_css: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      button_id: '',
      tabindex: 0,
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
    coming_soon: true,
    defaultProps: {
      label: '',
      columns: [{ width: 100, fields: [] }],
      container_class: '',
      conditional_logic: false,
      conditions: [],
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      label: '',
      columns: [
        { width: 50, fields: [] },
        { width: 50, fields: [] },
      ],
      container_class: '',
      gap: 'medium', // small, medium, large
      responsive_stack: true, // Stack on mobile
      conditional_logic: false,
      conditions: [],
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      label: '',
      columns: [
        { width: 33.33, fields: [] },
        { width: 33.33, fields: [] },
        { width: 33.34, fields: [] },
      ],
      container_class: '',
      gap: 'medium',
      responsive_stack: true,
      conditional_logic: false,
      conditions: [],
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      label: '',
      columns: [
        { width: 25, fields: [] },
        { width: 25, fields: [] },
        { width: 25, fields: [] },
        { width: 25, fields: [] },
      ],
      container_class: '',
      gap: 'medium',
      responsive_stack: true,
      conditional_logic: false,
      conditions: [],
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      label: '',
      columns: [
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
      ],
      container_class: '',
      gap: 'medium',
      responsive_stack: true,
      conditional_logic: false,
      conditions: [],
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      label: '',
      columns: [
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.7, fields: [] },
      ],
      container_class: '',
      gap: 'medium',
      responsive_stack: true,
      conditional_logic: false,
      conditions: [],
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: '',
      label_placement: 'default',
      admin_label: '',

      // === Version ===
      version: 'v3', // v2, v3
      v2_type: 'checkbox', // checkbox, invisible

      // === Site Key ===
      site_key: '',

      // === Display ===
      theme: 'light', // light, dark
      size: 'normal', // normal, compact
      language: 'auto', // auto, or specific code

      // === v3 Specific ===
      score_threshold: 0.5,

      // === Validation ===
      required: true,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: '',
      label_placement: 'default',
      admin_label: '',

      // === Site Key ===
      site_key: '',

      // === Display ===
      theme: 'light', // light, dark
      size: 'normal', // normal, compact
      sentinel: 'auto', // auto, specific value

      // === Validation ===
      required: true,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Advanced ===
      name_attribute: '',
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
    coming_soon: true,
    defaultProps: {
      // === Label Options ===
      label: '',
      label_placement: 'default',
      admin_label: '',

      // === Site Key ===
      site_key: '',

      // === Display ===
      theme: 'auto', // auto, light, dark
      size: 'normal', // normal, compact
      appearance: 'always', // always, execute, interaction-only

      // === Validation ===
      required: true,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Advanced ===
      name_attribute: '',
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
    ...JSON.parse(JSON.stringify(fieldType.defaultProps)),
  };
}

// Export as both named and default for compatibility
export { FIELD_TYPES, COMMON_OPTIONS };
export default FIELD_TYPES;
