/**
 * FormGlut Field Type Registry.
 *
 * Every field type available in the form builder is defined here.
 * Each entry has: label, icon, category, and comprehensive defaultProps.
 *
 * Pro fields are marked with `pro: true` and are unlocked when formglut-pro plugin is active.
 * Fields that are FREE in FluentForm are also FREE here (no pro: true).
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
      // === Label Options ===
      label: 'Text Input',
      label_placement: 'default', // default, top, bottom, left, right, hidden
      admin_label: '', // Admin-only label

      // === Input Options ===
      placeholder: 'Enter text here...',
      default_value: '', // Supports smart codes
      character_limit: '', // Max length (0 = unlimited)

      // === Input Formatting ===
      prefix_label: '', // Text/HTML before input
      suffix_label: '', // Text/HTML after input

      // === Validation ===
      required: false,
      validation_type: 'none', // none, required, email, url, numeric, pattern
      validation_pattern: '', // Regex pattern
      validation_message: 'Please enter a valid value',
      unique_value: false, // Check for duplicates
      unique_error_message: 'This value has already been submitted',

      // === Input Mask ===
      enable_mask: false,
      mask_pattern: '', // e.g., (999) 999-9999
      mask_placeholder: '_', // Character for unfilled mask
      reversible_mask: false, // Allow reverse mask
      clear_on_invalid: false, // Clear if doesn't match

      // === Mobile ===
      keyboard_type: 'default', // default, numeric, decimal, tel, email, url

      // === Styling ===
      container_class: '', // CSS class for wrapper
      element_class: '', // CSS class for input
      input_width: '', // e.g., 100%, 300px

      // === Help & Tools ===
      help_text: '', // Tooltip/help message
      help_text_position: 'below', // below, above, tooltip

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [], // Conditional logic rules

      // === Advanced ===
      name_attribute: '', // Custom name attribute
      autocomplete_attribute: 'text', // HTML autocomplete
      read_only: false,
      disabled: false,
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
      // === Label Options ===
      label: 'Email Address',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'email@example.com',
      default_value: '', // Supports smart codes like {user_email}

      // === Validation ===
      required: true,
      confirm_email: false, // Require confirmation
      confirm_label: 'Confirm Email Address',
      confirm_placeholder: 'Re-enter email',
      confirm_error_message: 'Email addresses do not match',
      unique_value: false, // Check for existing emails
      unique_error_message: 'This email has already been registered',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',
      help_text_position: 'below',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      autocomplete_attribute: 'email',
      read_only: false,
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
      // === Label Options ===
      label: 'Message',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Type your message here...',
      default_value: '',
      rows: 4, // Visible rows
      cols: '', // Visible columns (empty = 100%)
      character_limit: '', // 0 = unlimited
      character_count_display: false, // Show count
      resize: 'vertical', // vertical, horizontal, both, none

      // === Validation ===
      required: false,
      min_length: '',
      max_length: '',
      validation_message: 'Please enter at least {min} characters',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',
      help_text_position: 'below',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      read_only: false,
      enable_rtl: false, // Right-to-left text
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
      // === Label Options ===
      label: 'Dropdown',
      label_placement: 'default',
      admin_label: '',

      // === Dropdown Options ===
      placeholder: 'Choose an option...',
      options: [
        { label: 'Option 1', value: 'option1', image: '', disabled: false, calc_value: '' },
        { label: 'Option 2', value: 'option2', image: '', disabled: false, calc_value: '' },
        { label: 'Option 3', value: 'option3', image: '', disabled: false, calc_value: '' },
      ],
      default_value: '', // Supports smart codes

      // === Option Settings ===
      disable_first_option: true, // First option is placeholder
      shuffle_options: false, // Randomize order
      enable_search: false, // Searchable dropdown
      min_search_chars: 1, // Minimum characters to search

      // === Selection ===
      max_selections: 1, // 1 = single select
      selection_limit_message: 'You can only select {max} options',

      // === Visual Options ===
      show_option_images: false,
      dropdown_style: 'modern', // modern, classic, minimal
      option_direction: 'vertical', // vertical, horizontal

      // === Grouping ===
      group_options: false,
      option_groups: [
        { label: 'Group 1', options: [] },
        { label: 'Group 2', options: [] },
      ],

      // === AJAX/Data Source ===
      ajax_source: false,
      ajax_endpoint: '',
      ajax_method: 'GET',
      ajax_params: {},

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',
      help_text_position: 'below',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
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
      // === Label Options ===
      label: 'Multiple Select',
      label_placement: 'default',
      admin_label: '',

      // === Dropdown Options ===
      placeholder: 'Choose options...',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
      default_value: [],

      // === Selection Settings ===
      max_selections: 0, // 0 = unlimited
      min_selections: 0,
      selection_limit_message: 'Select between {min} and {max} options',

      // === Visual ===
      enable_search: true,
      searchable_threshold: 10, // Enable search after this many options
      select_all_button: true,
      display_format: 'tags', // tags, text, count

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
   * NUMERIC FIELD
   * Number input with formatting options
   */
  number: {
    label: 'Numeric Field',
    icon: <FontAwesomeIcon icon={faHashtag} />,
    category: 'general',
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
  toggle: {
    label: 'Toggle Switch',
    icon: <FontAwesomeIcon icon={faToggleOn} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Enable Feature',
      label_placement: 'default',
      admin_label: '',

      // === Toggle Options ===
      default_checked: false,
      on_label: 'ON',
      off_label: 'OFF',
      on_value: '1',
      off_value: '0',

      // === Appearance ===
      toggle_style: 'modern', // modern, classic, flat, ios
      toggle_size: 'medium', // small, medium, large
      toggle_color: 'success', // primary, success, warning, danger

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
   * RANGE SLIDER
   * Numeric range slider (FREE in FluentForm)
   */
  range_slider: {
    label: 'Range Slider',
    icon: <FontAwesomeIcon icon={faSliders} />,
    category: 'advanced',
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
  rating: {
    label: 'Star Rating',
    icon: <FontAwesomeIcon icon={faStar} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Rating',
      label_placement: 'default',
      admin_label: '',

      // === Rating Options ===
      max_stars: 5,
      default_value: 0,
      allow_half: false, // Half-star ratings

      // === Appearance ===
      icon_type: 'star', // star, heart, thumb, smiley, custom
      custom_icon: '', // SVG or icon class
      inactive_color: '#d1d5db',
      active_color: '#fbbf24',

      // === Labels ===
      show_labels: true,
      labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],

      // === Behavior ===
      hover_effect: true,
      click_to_clear: true,

      // === Validation ===
      required: false,
      required_message: 'Please select a rating',

      // === Styling ===
      container_class: '',
      element_class: '',
      icon_size: 'medium', // small, medium, large, xl

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
   * SIGNATURE
   * Digital signature canvas (PRO in FluentForm)
   */
  signature: {
    label: 'Signature',
    icon: <FontAwesomeIcon icon={faSignature} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Signature',
      label_placement: 'default',
      admin_label: '',

      // === Canvas Options ===
      width: 300,
      height: 150,
      pen_color: '#000000',
      pen_width: 2,
      bg_color: '#ffffff',
      bg_image: '', // Background image URL

      // === Buttons ===
      clear_button: true,
      clear_button_text: 'Clear',
      undo_button: false,
      undo_button_text: 'Undo',

      // === Output ===
      output_format: 'png', // png, svg, jpg
      output_quality: 0.9, // For jpg

      // === Validation ===
      required: false,
      required_message: 'Please sign above',

      // === Styling ===
      container_class: '',
      element_class: '',
      border_style: 'solid', // solid, dashed, dotted
      border_width: 1,

      // === Help & Tools ===
      help_text: 'Sign in the box above',
      placeholder_text: 'Sign here',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      touch_only: false, // Only allow touch input
      smooth_lines: true,
    },
  },

  /**
   * VIDEO EMBED
   */
  video_embed: {
    label: 'Video Embed',
    icon: <FontAwesomeIcon icon={faVideo} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Video',
      admin_label: '',

      // === Video Source ===
      video_type: 'youtube', // youtube, vimeo, self_hosted, embed_code
      video_url: 'https://www.youtube.com/watch?v=...',
      embed_code: '', // Custom embed code
      video_file: '', // Self-hosted file URL

      // === YouTube Options ===
      youtube_autoplay: false,
      youtube_controls: true,
      youtube_rel: false, // Show related videos
      youtube_mute: false,

      // === Vimeo Options ===
      vimeo_autoplay: false,
      vimeo_title: true,
      vimeo_byline: true,
      vimeo_portrait: true,

      // === Size ===
      width: 560,
      height: 315,
      responsive: true,
      max_width: '',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      lazy_load: false,
    },
  },

  /**
   * AUDIO UPLOAD
   */
  audio_upload: {
    label: 'Audio Upload',
    icon: <FontAwesomeIcon icon={faFileAudio} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Upload Audio',
      admin_label: '',

      // === Upload Options ===
      button_text: 'Choose Audio',
      max_size: 10, // MB
      allowed_types: '.mp3,.wav,.ogg,.m4a',
      max_duration: 300, // seconds

      // === Player Options ===
      show_player: true,
      autoplay: false,
      loop: false,

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
   * IMAGE SELECT
   */
  image_select: {
    label: 'Image Select',
    icon: <FontAwesomeIcon icon={faCamera} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select Image',
      label_placement: 'default',
      admin_label: '',

      // === Selection Type ===
      selection_type: 'single', // single, multiple
      min_selections: 0,
      max_selections: 0,

      // === Images ===
      images: [
        { url: '', label: 'Option 1', value: 'opt1' },
        { url: '', label: 'Option 2', value: 'opt2' },
        { url: '', label: 'Option 3', value: 'opt3' },
      ],
      default_value: '',

      // === Display ===
      image_width: 150,
      image_height: 150,
      image_fit: 'cover', // cover, contain, fill
      layout: 'grid', // grid, flex, carousel
      columns: 3,
      gap: 'medium', // small, medium, large

      // === Visual ===
      show_labels: true,
      label_position: 'below', // above, below, overlay, tooltip
    hover_effect: true,
      selected_border: true,
      border_color: '',
      selected_overlay: true,

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
   * FORM STEP
   * Multi-step form break (PRO in FluentForm)
   */
  form_step: {
    label: 'Form Step',
    icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Content ===
      step_title: 'Step 1',
      step_description: 'Enter your information',
      step_number: 1,

      // === Buttons ===
      next_button_text: 'Next',
      next_button_icon: '',
      prev_button_text: 'Previous',
      prev_button_icon: '',

      // === Button Style ===
      button_style: 'primary', // primary, secondary, success
      button_size: 'medium',
      button_alignment: 'right', // left, center, right, space_between

      // === Navigation ===
      enable_previous: true,
      save_progress: false,

      // === Progress ===
      show_progress: true,
      progress_type: 'steps', // steps, percentage, bar

      // === Validation ===
      validate_before_next: true,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Advanced ===
      name_attribute: '',
      allow_navigation: true, // Allow jumping between steps
    },
  },

  /**
   * NET PROMOTER SCORE
   * NPS survey field (PRO in FluentForm)
   */
  nps_score: {
    label: 'Net Promoter Score',
    icon: <FontAwesomeIcon icon={faThumbsUp} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'How likely are you to recommend us?',
      label_placement: 'default',
      admin_label: '',

      // === Scale ===
      scale: 10, // 0-10 or 1-10
      start_from_zero: true, // 0-10 vs 1-10

      // === Labels ===
      low_label: 'Not at all likely',
      mid_label: 'Neutral',
      high_label: 'Extremely likely',
      show_labels: true,

      // === Categories ===
      show_categories: true,
      detractor_label: 'Detractor',
    passive_label: 'Passive',
      promoter_label: 'Promoter',

      // === Appearance ===
      display_style: 'buttons', // buttons, slider, dropdown
      button_layout: 'horizontal', // horizontal, vertical

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      color_scheme: 'default', // default, green, blue, custom

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
   * LIKERT SCALE
   */
  likert_scale: {
    label: 'Likert Scale',
    icon: <FontAwesomeIcon icon={faSliders} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Rate your agreement',
      label_placement: 'default',
      admin_label: '',

      // === Questions ===
      questions: [
        'Statement 1',
        'Statement 2',
        'Statement 3',
      ],

      // === Scale ===
      scale_points: 5, // 3, 5, 7
      min_label: 'Strongly Disagree',
      max_label: 'Strongly Agree',
      center_label: 'Neutral', // For odd scales

      // === Appearance ===
      layout: 'vertical', // vertical, horizontal, matrix
      show_question_numbers: true,
      highlight_extremes: true,

      // === Validation ===
      required: false,
      require_all: false,

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
   * EMOJI RATING
   */
  emoji_rating: {
    label: 'Emoji Rating',
    icon: <FontAwesomeIcon icon={faThumbsUp} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'How was your experience?',
      label_placement: 'default',
      admin_label: '',

      // === Emoji Options ===
      emoji_type: 'standard', // standard, custom
      emojis: ['😞', '😐', '🙂', '😃', '🤩'],
      custom_emojis: [], // Array of custom emoji URLs

      // === Labels ===
      show_labels: true,
      labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
      label_position: 'below', // below, above

      // === Appearance ===
      size: 'medium', // small, medium, large, xl
      layout: 'horizontal', // horizontal, vertical
      animate_on_hover: true,

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
   * CALCULATED FIELD
   */
  calculated_field: {
    label: 'Calculated Field',
    icon: <FontAwesomeIcon icon={faCalculator} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Calculated Result',
      label_placement: 'default',
      admin_label: '',

      // === Formula ===
      formula: '{field1} + {field2}',
      formula_description: '', // Describe the calculation

      // === Number Format ===
      number_format: 'number', // number, currency, percentage
      currency_symbol: '$',
      currency_position: 'before',
      decimal_places: 2,
      thousands_separator: true,

      // === Display ===
      read_only: true,
      show_formula: false, // Show formula to users
      placeholder: '0',

      // === Conditional Calculation ===
      conditional_formula: false,
      formula_conditions: [], // Different formulas based on conditions

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
      live_update: true, // Update as user types
    },
  },

  /**
   * LOOKUP FIELD
   */
  lookup_field: {
    label: 'Lookup Field',
    icon: <FontAwesomeIcon icon={faWandSparkles} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Lookup',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Search...',
      min_search_chars: 2,

      // === Lookup Source ===
      lookup_type: 'posts', // posts, users, taxonomies, custom
      post_type: 'post', // Post type to search
      query_args: {}, // WP_Query args

      // === Search Fields ===
      search_fields: ['post_title'],
      display_field: 'post_title',
      value_field: 'ID',

      // === Selection ===
      allow_multiple: false,
      max_selections: 0,
      selection_format: 'count', // count, list, tags

      // === Filters ===
      filters: [], // Taxonomy filters, date filters, etc.

      // === AJAX ===
      enable_ajax: true,
      cache_results: true,
      cache_duration: 300, // seconds

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
   * RESET BUTTON
   */
  reset_button: {
    label: 'Reset Button',
    icon: <FontAwesomeIcon icon={faRotateRight} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Button Options ===
      label: '',
      button_text: 'Reset Form',
      button_icon: '',

      // === Confirmation ===
      confirm_reset: true,
      confirm_message: 'Are you sure you want to reset the form?',
      confirm_button_text: 'Yes, Reset',
      cancel_button_text: 'Cancel',

      // === Button Style ===
      button_style: 'secondary', // primary, secondary, danger
      button_size: 'medium',
      button_alignment: 'left', // left, center, right

      // === Reset Behavior ===
      reset_hidden_fields: true,
      reset_to_defaults: true, // Or clear all

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
   * SAVE & RESUME
   */
  save_resume: {
    label: 'Save & Resume',
    icon: <FontAwesomeIcon icon={faSave} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Button Options ===
      label: '',
      button_text: 'Save Progress',
      button_position: 'bottom', // top, bottom, both
      button_style: 'secondary',
      button_icon: '',

      // === Save Method ===
      save_method: 'link', // link, email, auto
      save_button_label: 'Save & Continue Later',

      // === Link Method ===
      link_label: 'Your resume link:',
      link_copy_text: 'Copy Link',
      link_copied_text: 'Copied!',

      // === Email Method ===
      email_field: '', // Field containing email
      email_subject: 'Continue your form submission',
      email_template: '',

      // === Auto Method ===
      auto_save: false,
      auto_save_interval: 30, // seconds

      // === Expiration ===
      expiry_days: 30,
      expiry_type: 'days', // days, hours

      // === Storage ===
      storage_location: 'database', // database, transient, cookie
      require_email: false,

      // === Resume ===
      resume_message: 'You have a saved form submission.',
      resume_button_text: 'Resume',
      delete_button_text: 'Delete Saved Data',

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
   * SOCIAL MEDIA PROFILES
   */
  social_profiles: {
    label: 'Social Profiles',
    icon: <FontAwesomeIcon icon={faShareNodes} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Social Media Profiles',
      label_placement: 'default',
      admin_label: '',

      // === Platforms ===
      platforms: [
        { name: 'facebook', label: 'Facebook', icon: '', placeholder: 'Facebook profile URL' },
        { name: 'twitter', label: 'Twitter/X', icon: '', placeholder: 'Twitter username' },
        { name: 'linkedin', label: 'LinkedIn', icon: '', placeholder: 'LinkedIn profile URL' },
        { name: 'instagram', label: 'Instagram', icon: '', placeholder: 'Instagram username' },
      ],

      // === Input Options ===
      allow_multiple: false, // Multiple profiles per platform
      url_validation: true,

      // === Display ===
      show_icons: true,
      icon_size: 'small',
      layout: 'vertical', // vertical, horizontal, grid

      // === Validation ===
      required: false,
      required_platforms: [], // Which platforms are required

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

  /* ═════════════════════════════════════════════════════════════════════
     PRO FIELDS (Additional)
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * CHAINED SELECT
   * Hierarchical dropdowns (PRO in FluentForm)
   */
  chained_select: {
    label: 'Chained Select',
    icon: <FontAwesomeIcon icon={faArrowDownShortWide} />,
    category: 'general',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Chained Dropdown',
      label_placement: 'default',
      admin_label: '',

      // === Chain Levels ===
      levels: [
        {
          label: 'Category',
          options: [
            { label: 'Option 1', value: 'opt1', children: ['opt1_child1', 'opt1_child2'] },
            { label: 'Option 2', value: 'opt2', children: ['opt2_child1', 'opt2_child2'] },
          ],
          placeholder: 'Select category...',
        },
        {
          label: 'Subcategory',
          options: {}, // Will be populated dynamically
          placeholder: 'Select subcategory...',
        },
        {
          label: 'Item',
          options: {},
          placeholder: 'Select item...',
        },
      ],

      // === Chain Data ===
      chain_data: {}, // Full hierarchy data
      data_source: 'manual', // manual, json, ajax
      json_url: '',
      ajax_endpoint: '',

      // === Display ===
      display_type: 'select', // select, radio, button
      enable_search: true,
      searchable_threshold: 10,

      // === Reset Behavior ===
      reset_children: true, // Clear child selects when parent changes

      // === Validation ===
      required: false,
      require_all_levels: false,

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
   * REPEAT FIELD
   * Repeatable field group (PRO in FluentForm)
   */
  repeat_field: {
    label: 'Repeat Field',
    icon: <FontAwesomeIcon icon={faRepeat} />,
    category: 'general',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Repeatable Items',
      admin_label: '',

      // === Child Fields ===
      child_fields: [], // Array of field definitions
      field_template: 'text', // Template for new fields

      // === Repeat Limits ===
      min_repeats: 1,
      max_repeats: 0, // 0 = unlimited
      default_repeats: 1,

      // === Buttons ===
      add_button_text: 'Add More',
      add_button_icon: '+',
      remove_button_text: 'Remove',
      remove_button_icon: '×',
      button_position: 'bottom', // top, bottom, both

      // === Layout ===
      repeat_layout: 'vertical', // vertical, horizontal, grid
      item_spacing: 'medium', // small, medium, large
      show_item_numbers: true,

      // === Collapsible Items ===
    collapsible_items: false,
    default_collapsed: false,

      // === Reordering ===
    allow_reorder: true,
    reorder_handle: 'drag', // drag, button, both

      // === Validation ===
      required: false,
      require_min: false,

      // === Styling ===
      container_class: '',
      element_class: '',
    item_class: '',

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
   * RICH TEXT INPUT
   * WYSIWYG editor (PRO in FluentForm)
   */
  rich_text: {
    label: 'Rich Text',
    icon: <FontAwesomeIcon icon={faAlignLeft} />,
    category: 'general',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Rich Text Content',
      label_placement: 'default',
      admin_label: '',

      // === Editor Options ===
      placeholder: 'Enter formatted text...',
      default_value: '',

      // === Toolbar ===
      toolbar: 'full', // full, simple, minimal, custom
      custom_toolbar: [], // Array of toolbar buttons

      // === Features ===
      allow_media: true, // Image/video uploads
      allow_links: true,
      allow_tables: true,
      allow_lists: true,
      allow_headings: true,
      allow_colors: true,
      allow_fonts: false,
      allow_font_size: false,
      allow_alignments: true,

      // === Media Options ===
      media_upload_url: '',
      max_image_size: 5, // MB

      // === Editor Settings ===
      editor_height: 200,
    editor_theme: 'default', // default, dark, light
      clean_paste: true, // Remove formatting on paste
      auto_link: true, // Auto-detect links

      // === Validation ===
      required: false,
      min_length: '',
      max_length: '',
      word_count: false, // Enable word count

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',
      character_count: false,

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      readonly: false,
    },
  },

  /**
   * TAG INPUT
   */
  tag_input: {
    label: 'Tag Input',
    icon: <FontAwesomeIcon icon={faTags} />,
    category: 'general',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Tags',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Add tags...',
      default_value: [],

      // === Tag Options ===
      allow_custom: true,
      available_tags: [], // Predefined tags
      tag_suggestions: true,
      min_chars_for_suggestions: 1,

      // === Constraints ===
      max_tags: 10,
      min_tags: 0,
      tag_separator: ',', // Comma, space, or enter

      // === Tag Display ===
      tag_color: 'default', // default, primary, success, warning, danger
      tag_size: 'medium', // small, medium, large
      removable: true,

      // === Validation ===
      required: false,
      duplicate_tags: false, // Allow duplicates

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
      tag_transform: 'lowercase', // lowercase, uppercase, preserve
    },
  },

  /**
   * SEARCHABLE DROPDOWN
   */
  searchable_dropdown: {
    label: 'Searchable Dropdown',
    icon: <FontAwesomeIcon icon={faWandSparkles} />,
    category: 'general',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Search & Select',
      label_placement: 'default',
      admin_label: '',

      // === Dropdown Options ===
      placeholder: 'Type to search...',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
      default_value: '',

      // === Search Options ===
      min_search_chars: 1,
      search_delay: 300, // ms before searching
      search_fields: ['label'], // Which fields to search
      fuzzy_search: true,

      // === Data Source ===
      data_source: 'local', // local, ajax, json
      ajax_url: '',
      ajax_method: 'GET',
      ajax_params: {},

      // === Selection ===
      selection_limit: 1, // 1 = single select
      allow_new_option: false, // Allow typing custom value

      // === Display ===
      show_option_count: true,
      highlight_matches: true,
      group_results: false,

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      dropdown_max_height: 200,

      // === Help & Tools ===
      help_text: '',
      no_results_text: 'No results found',
      searching_text: 'Searching...',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
    },
  },

  /* ═════════════════════════════════════════════════════════════════════
     UPLOAD FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * FILE UPLOAD
   */
  file_upload: {
    label: 'File Upload',
    icon: <FontAwesomeIcon icon={faUpload} />,
    category: 'upload',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Upload File',
      label_placement: 'default',
      admin_label: '',

      // === Upload Options ===
      button_text: 'Choose File',
      upload_interface: 'button', // button, dropzone
      dropzone_text: 'Drag & drop files here or click to browse',

      // === Constraints ===
      max_size: 5, // MB
      max_files: 1,
      allowed_types: '.pdf,.doc,.docx,.txt,.xls,.xlsx',
      allowed_extensions: [], // Alternative to types

      // === Multiple Files ===
      allow_multiple: false,
      show_file_count: true,

      // === Preview ===
      show_preview: false,
      preview_type: 'icon', // icon, list, thumbnail

      // === Progress ===
      show_progress: true,
      progress_bar_color: '',

      // === File Actions ===
      allow_delete: true,
      allow_replace: false,

      // === Storage ===
      storage_location: 'default', // default, custom
      custom_path: '',

      // === Validation ===
      required: false,
      validation_messages: {
        size: 'File is too large',
        type: 'File type not allowed',
        count: 'Too many files',
      },

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',
      size_limit_text: 'Max file size: {max}MB',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      auto_upload: true,
      chunk_upload: false,
      chunk_size: 1000000, // bytes
    },
  },

  /**
   * IMAGE UPLOAD
   */
  image_upload: {
    label: 'Image Upload',
    icon: <FontAwesomeIcon icon={faImage} />,
    category: 'upload',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Upload Image',
      label_placement: 'default',
      admin_label: '',

      // === Upload Options ===
      button_text: 'Choose Image',
      upload_interface: 'button', // button, dropzone, gallery
      dropzone_text: 'Drag & drop image here',

      // === Constraints ===
      max_size: 5, // MB
      max_files: 5,
      min_width: 0, // px
      max_width: 0, // 0 = unlimited
      min_height: 0,
      max_height: 0,
      min_aspect_ratio: '',
      max_aspect_ratio: '',
      allowed_types: '.jpg,.jpeg,.png,.gif,.webp,.svg',

      // === Cropping ===
      enable_crop: false,
    crop_type: 'ratio', // ratio, width, free
      crop_ratio: '1:1', // 1:1, 4:3, 16:9, free
      crop_width: 300,
      crop_height: 300,
      force_crop: false, // Require cropping before upload

      // === Preview ===
      show_preview: true,
    preview_size: 'medium', // thumbnail, medium, large
      thumbnail_width: 150,
      thumbnail_height: 150,

      // === Multiple Files ===
      allow_multiple: true,
      gallery_view: true,

      // === Validation ===
      required: false,

      // === Storage ===
      storage_location: 'default',
    custom_path: '',
      generate_thumbnails: true,
      thumbnail_sizes: [150, 300, 600],

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
      image_quality: 90, // For compression
    auto_upload: true,
    },
  },

  /**
   * MULTI-FILE UPLOAD
   */
  multifile_upload: {
    label: 'Multi-file Upload',
    icon: <FontAwesomeIcon icon={faUpload} />,
    category: 'upload',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Upload Files',
      label_placement: 'default',
      admin_label: '',

      // === Upload Options ===
      button_text: 'Choose Files',
      upload_interface: 'dropzone',
      dropzone_text: 'Drag & drop files here',

      // === Constraints ===
      max_size: 10, // MB per file
      max_files: 20,
      max_total_size: 100, // Total MB
      allowed_types: '.pdf,.doc,.docx,.jpg,.png,.gif',

      // === Progress ===
      show_progress: true,
    progress_per_file: true,
      progress_bar_color: '#3b82f6',

      // === Queue ===
      simultaneous_uploads: 3,
      auto_start_upload: true,

      // === File List ===
      file_list_position: 'below', // below, above, inline
      show_file_size: true,
      show_file_type: true,

      // === Actions ===
      allow_delete: true,
      allow_reorder: true,

      // === Validation ===
      required: false,

      // === Storage ===
      storage_location: 'default',
      custom_path: '',

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
   * CROPPED IMAGE UPLOAD
   */
  cropped_image_upload: {
    label: 'Cropped Image Upload',
    icon: <FontAwesomeIcon icon={faCropSimple} />,
    category: 'upload',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Upload & Crop Image',
      label_placement: 'default',
      admin_label: '',

      // === Upload Options ===
      button_text: 'Choose Image',
      max_size: 5, // MB
      allowed_types: '.jpg,.jpeg,.png,.webp',

      // === Crop Options ===
      crop_width: 300,
      crop_height: 300,
      aspect_ratio: '1:1', // 1:1, 4:3, 16:9, free
      lock_aspect_ratio: true,
      force_crop: true, // Require cropping

      // === Crop Tool Options ===
      allow_rotate: true,
      allow_flip: false,
    zoom_slider: true,
      crop_box_movable: true,
      crop_box_resizable: true,

      // === Output ===
      output_format: 'png', // png, jpg, webp
      output_quality: 90,
      generate_thumbnail: false,
    thumbnail_size: 150,

      // === Preview ===
      show_preview: true,
      preview_before_crop: true,
    preview_after_crop: true,

      // === Validation ===
      required: false,

      // === Storage ===
      storage_location: 'default',
    custom_path: '',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',
      crop_instructions: 'Drag to adjust the crop area',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
    },
  },

  /**
   * WEBCAM CAPTURE
   */
  webcam_capture: {
    label: 'Webcam Capture',
    icon: <FontAwesomeIcon icon={faCamera} />,
    category: 'upload',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Capture Photo',
      label_placement: 'default',
      admin_label: '',

      // === Capture Options ===
      capture_width: 640,
      capture_height: 480,
    camera_facing: 'user', // user, environment
    default_camera: '', // Leave empty for system default

      // === Button Options ===
    capture_button_text: 'Capture',
    retake_button_text: 'Retake',
    upload_fallback_text: 'Or upload an image',

      // === Fallback ===
      allow_upload_fallback: true,
      upload_fallback_types: '.jpg,.jpeg,.png',

      // === Preview ===
      show_live_preview: true,
    mirror_preview: true, // Mirror for user-facing camera
      mirror_output: false,

      // === Output ===
      output_format: 'png',
      output_quality: 90,

      // === Validation ===
      required: false,

      // === Storage ===
      storage_location: 'default',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: '',
      permission_error: 'Camera access denied. Please allow camera access.',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
    },
  },

  /**
   * VOICE RECORDING
   */
  voice_recording: {
    label: 'Voice Recording',
    icon: <FontAwesomeIcon icon={faMicrophone} />,
    category: 'upload',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Record Voice',
      label_placement: 'default',
      admin_label: '',

      // === Recording Options ===
      max_duration: 60, // seconds
      allowed_formats: ['mp3', 'wav'], // mp3, wav, ogg
    audio_quality: 'medium', // low, medium, high
    sample_rate: 44100,

      // === Button Options ===
      record_button_text: 'Start Recording',
    stop_button_text: 'Stop',
    play_button_text: 'Play',
    pause_button_text: 'Pause',
    retake_button_text: 'Record Again',

      // === Visual Feedback ===
      show_waveform: true,
      show_timer: true,
    recording_indicator: true,

      // === Auto Options ===
      auto_start: false,
      auto_stop: false,

      // === Preview ===
      allow_playback: true,
      allow_download: false,

      // === Output ===
      output_format: 'mp3',
    output_bitrate: 128, // kbps

      // === Validation ===
      required: false,
    min_duration: 0, // seconds

      // === Storage ===
      storage_location: 'default',

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
    permission_error: 'Microphone access denied. Please allow microphone access.',
    },
  },

  /* ═════════════════════════════════════════════════════════════════════
     SURVEY & QUIZ FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * MATRIX QUESTION
   */
  matrix_question: {
    label: 'Matrix Question',
    icon: <FontAwesomeIcon icon={faTableList} />,
    category: 'survey',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Matrix Question',
      label_placement: 'default',
      admin_label: '',

      // === Matrix Content ===
      rows: ['Row 1', 'Row 2', 'Row 3'],
      columns: ['Column 1', 'Column 2', 'Column 3'],

      // === Input Type ===
      input_type: 'radio', // radio, checkbox, text, dropdown

      // === Column Options (for radio/checkbox) ===
      column_options: [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' },
      ],

      // === Text Input Options (for text type) ===
      placeholder: 'Enter response...',
    character_limit: '',

      // === Layout ===
      layout: 'standard', // standard, condensed, expanded
      show_row_numbers: false,
      transpose: false, // Swap rows and columns

      // === Validation ===
      required: false,
      require_all_rows: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      highlight_hover: true,

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
   * CHECKABLE GRID
   * Grid-based selection (PRO in FluentForm)
   */
  checkable_grid: {
    label: 'Checkable Grid',
    icon: <FontAwesomeIcon icon={faTableList} />,
    category: 'survey',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select Options from Grid',
      label_placement: 'default',
      admin_label: '',

      // === Grid Content ===
      rows: ['Row 1', 'Row 2', 'Row 3'],
      columns: ['Column 1', 'Column 2', 'Column 3'],

      // === Input Type ===
      input_type: 'checkbox', // checkbox, radio

      // === Layout ===
      layout: 'standard', // standard, compact, spacious
      show_row_labels: true,
      show_column_labels: true,

      // === Selection ===
      allow_multiple_per_row: true, // For checkbox type
      require_all_rows: false,

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      cell_size: 'medium', // small, medium, large

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
   * MULTIPLE CHOICE GRID
   */
  multiple_choice_grid: {
    label: 'Multiple Choice Grid',
    icon: <FontAwesomeIcon icon={faTableList} />,
    category: 'survey',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select One Option Per Row',
      label_placement: 'default',
      admin_label: '',

      // === Grid Content ===
      rows: ['Question 1', 'Question 2', 'Question 3'],
      columns: ['Option 1', 'Option 2', 'Option 3'],

      // === Layout ===
      layout: 'standard',
      show_row_numbers: false,

      // === Validation ===
      required: false,
      require_all_rows: true,

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
   * SEMANTIC DIFFERENTIAL
   */
  semantic_differential: {
    label: 'Semantic Differential',
    icon: <FontAwesomeIcon icon={faSliders} />,
    category: 'survey',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Rate the Concept',
      label_placement: 'default',
      admin_label: '',

      // === Scale Pairs ===
      pairs: [
        { left: 'Bad', right: 'Good' },
        { left: 'Weak', right: 'Strong' },
        { left: 'Complex', right: 'Simple' },
        { left: 'Boring', right: 'Interesting' },
      ],

      // === Scale Options ===
      scale_points: 7, // Usually 5 or 7
      show_neutral: true,

      // === Layout ===
      layout: 'vertical', // vertical, horizontal
      show_pair_labels: true,

      // === Validation ===
      required: false,
      require_all_pairs: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      color_scale: false,

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
   * IMAGE COMPARISON
   */
  image_comparison: {
    label: 'Image Comparison',
    icon: <FontAwesomeIcon icon={faCamera} />,
    category: 'survey',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Which Do You Prefer?',
      label_placement: 'default',
      admin_label: '',

      // === Images ===
      images: [
        { url: '', label: 'Option A', alt: '' },
        { url: '', label: 'Option B', alt: '' },
      ],

      // === Selection Type ===
      selection_type: 'single', // single, multiple, ranking

      // === Display ===
      image_width: 300,
      image_height: 300,
      image_fit: 'cover',
      layout: 'side_by_side', // side_by_side, stacked, carousel

      // === Comparison Slider (for single selection) ===
      enable_slider: false,
    slider_start_position: 50,
    slider_color: '#3b82f6',

      // === Hover Effects ===
      hover_effect: true,
    hover_scale: 1.05,

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
   * LABELED SLIDER
   */
  slider_with_labels: {
    label: 'Labeled Slider',
    icon: <FontAwesomeIcon icon={faSliders} />,
    category: 'survey',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Rate Your Experience',
      label_placement: 'default',
      admin_label: '',

      // === Range Options ===
      min: 0,
      max: 10,
      step: 1,
      default_value: 5,

      // === Labels ===
      min_label: 'Poor',
    max_label: 'Excellent',
    show_value: true,
    value_position: 'above',

      // === Ticks ===
      show_ticks: true,
    tick_interval: 1,
    tick_labels: {},

      // === Appearance ===
      slider_style: 'modern',
    fill_track: true,

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
      tooltip: 'always',
    },
  },

  /**
   * QUIZ SCORE
   */
  quiz_score: {
    label: 'Quiz Score',
    icon: <FontAwesomeIcon icon={faStar} />,
    category: 'survey',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: '',
      admin_label: 'Quiz Score',

      // === Scoring ===
      score_type: 'points', // points, percentage
      passing_score: 70,
      max_score: 100,

      // === Display ===
      show_score: true,
      show_percentage: true,
      show_correct_answers: true,
      show_explanations: false,

      // === Options ===
      randomize_order: false,
      allow_review: true,

      // === Messages ===
      pass_message: 'Congratulations! You passed.',
    fail_message: 'You did not pass. Please try again.',
    score_message: 'Your score: {score}%', // Supports {score}, {percentage}, {correct}, {total}

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Advanced ===
      name_attribute: '',
    },
  },

  /**
   * RANKING / ORDERING
   */
  ranking: {
    label: 'Ranking',
    icon: <FontAwesomeIcon icon={faArrowDownShortWide} />,
    category: 'survey',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Rank the Following Items',
      label_placement: 'default',
      admin_label: '',

      // === Items ===
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],

      // === Ranking Method ===
      ranking_type: 'drag', // drag, click, dropdown

      // === Options ===
      allow_ties: false,
      require_all: true,
      shuffle_items: false,

      // === Display ===
      item_layout: 'vertical', // vertical, horizontal, grid
    show_rank_numbers: true,
      max_rank: '', // Limit top N ranks

      // === Labels ===
      rank_label: 'Rank #{n}',
      unranked_label: 'Unranked',

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

  /* ═════════════════════════════════════════════════════════════════════
     WORDPRESS SPECIFIC FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * USER REGISTRATION
   */
  user_registration: {
    label: 'User Registration',
    icon: <FontAwesomeIcon icon={faUser} />,
    category: 'wordpress',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Create Account',
      admin_label: '',

      // === Fields ===
      include_username: true,
      include_email: true,
      include_password: true,
      include_first_name: false,
      include_last_name: false,
      include_website: false,
      include_bio: false,

      // === Field Labels ===
      username_label: 'Username',
      email_label: 'Email Address',
      password_label: 'Password',
      first_name_label: 'First Name',
      last_name_label: 'Last Name',

      // === User Role ===
      user_role: 'subscriber', // subscriber, contributor, author, editor, custom
      custom_role: '',

      // === Email Options ===
      email_verification: false, // Send verification email
    verification_email_subject: 'Verify your email address',
      verification_email_template: '',

      // === Password Options ===
      auto_generate_password: false,
    password_strength_meter: true,

      // === Validation ===
      username_check: true, // Check if username exists
      email_check: true, // Check if email exists

      // === Redirect ===
      redirect_after_registration: '',
      login_after_registration: false,

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
   * POST SUBMISSION
   */
  post_submission: {
    label: 'Post Submission',
    icon: <FontAwesomeIcon icon={faFileLines} />,
    category: 'wordpress',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Submit Post',
      admin_label: '',

      // === Post Type ===
      post_type: 'post', // post, page, or custom post type
      custom_post_type: '',

      // === Fields ===
      include_title: true,
      title_label: 'Post Title',
    title_required: true,

      include_content: true,
      content_label: 'Post Content',
    content_type: 'textarea', // textarea, rich_text
    content_required: true,

      include_excerpt: false,
    excerpt_label: 'Excerpt',
    excerpt_required: false,

      include_featured_image: false,
      featured_image_label: 'Featured Image',

      // === Post Settings ===
      post_status: 'pending', // draft, pending, publish
      post_author: 'current_user', // current_user, specific_user
      specific_author_id: '',

      // === Categories & Tags ===
      include_category: false,
      category_label: 'Category',
    category_selection: 'dropdown', // dropdown, checkbox, radio
    default_category: '',

      include_tags: false,
      tags_label: 'Tags',
    allow_new_tags: true,

      // === Taxonomies ===
      custom_taxonomies: [], // Array of taxonomy settings

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
      require_login: false,
      login_message: 'Please log in to submit a post.',
      redirect_after_submission: '',
    },
  },

  /**
   * FEATURED IMAGE UPLOAD
   */
  featured_image: {
    label: 'Featured Image',
    icon: <FontAwesomeIcon icon={faImage} />,
    category: 'wordpress',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Featured Image',
      label_placement: 'default',
      admin_label: '',

      // === Upload Options ===
      button_text: 'Upload Featured Image',
      max_size: 5, // MB
      min_width: 0,
      min_height: 0,
      max_width: 0,
      max_height: 0,
      allowed_types: '.jpg,.jpeg,.png,.webp',

      // === Preview ===
      show_preview: true,
      preview_size: 'medium',

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
   * CATEGORY SELECTION
   */
  category_selection: {
    label: 'Category Selection',
    icon: <FontAwesomeIcon icon={faTags} />,
    category: 'wordpress',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select Category',
      label_placement: 'default',
      admin_label: '',

      // === Taxonomy ===
      taxonomy: 'category', // WordPress taxonomy
      custom_taxonomy: '',

      // === Selection Type ===
      selection_type: 'dropdown', // dropdown, checkbox, radio, multiselect
      allow_multiple: false,
      hierarchy: true, // Show parent-child relationships

      // === Categories ===
      include_categories: [], // Specific categories to include
      exclude_categories: [], // Categories to exclude
      show_empty: false, // Show empty categories
      hide_empty: true, // Hide categories with no posts

      // === Display ===
      show_count: false, // Post count
      show_description: false,
      depth: 0, // Hierarchy depth (0 = unlimited)

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
   * TAG SELECTION
   */
  tag_selection: {
    label: 'Tag Selection',
    icon: <FontAwesomeIcon icon={faTags} />,
    category: 'wordpress',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select Tags',
      label_placement: 'default',
      admin_label: '',

      // === Taxonomy ===
      taxonomy: 'post_tag', // WordPress taxonomy
      custom_taxonomy: '',

      // === Input Type ===
      input_type: 'text', // text, autocomplete, checkbox, dropdown
      allow_custom: true,
      max_tags: 10,

      // === Tags ===
      popular_tags: [], // Show popular tags
      min_popularity: 5, // Minimum usage count

      // === Display ===
      show_count: false,
      tag_cloud: false,

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
      tag_separator: ',',
    },
  },

  /**
   * USER ROLE SELECTION
   */
  user_role_selection: {
    label: 'User Role Selection',
    icon: <FontAwesomeIcon icon={faUserTag} />,
    category: 'wordpress',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select User Role',
      label_placement: 'default',
      admin_label: '',

      // === Role Options ===
      allowed_roles: ['subscriber', 'contributor', 'author'],
      default_role: 'subscriber',
    custom_roles: [], // Additional custom roles

      // === Display ===
      display_type: 'dropdown', // dropdown, radio, button

      // === Descriptions ===
      show_descriptions: false,
    role_descriptions: {
        subscriber: 'Can read and comment',
        contributor: 'Can write and manage their own posts',
        author: 'Can publish and manage their own posts',
      },

      // === Validation ===
      required: true,

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

  /* ═════════════════════════════════════════════════════════════════════
     DYNAMIC & INTERACTIVE FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * DYNAMIC LIST / TABLE
   * Dynamic table rows (PRO in FluentForm)
   */
  dynamic_list: {
    label: 'Dynamic List',
    icon: <FontAwesomeIcon icon={faTableList} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Add Items',
      admin_label: '',

      // === Columns ===
      columns: [
        { label: 'Name', type: 'text', width: 50, placeholder: 'Enter name' },
        { label: 'Quantity', type: 'number', width: 25, placeholder: '0' },
        { label: 'Price', type: 'number', width: 25, placeholder: '0.00' },
      ],

      // === Row Options ===
      min_rows: 1,
      max_rows: 50,
      default_rows: 3,
      allow_reorder: true,

      // === Buttons ===
      add_button_text: 'Add Row',
    add_button_icon: '+',
    remove_button_text: 'Remove',
    remove_button_icon: '×',

      // === Display ===
      table_style: 'striped', // striped, bordered, simple
    responsive: true,
    show_row_numbers: true,

      // === Column Types ===
      column_types: {
        text: { placeholder: 'Enter text' },
        number: { placeholder: '0', decimal: 2 },
        select: { options: [] },
        date: { format: 'Y-m-d' },
        checkbox: { default: false },
        calculation: { formula: '' },
      },

      // === Calculations ===
    enable_totals: false,
    total_row_position: 'bottom', // bottom, top, both
    total_label: 'Total',

      // === Validation ===
      required: false,
      require_min_rows: false,

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
   * EMAIL CONFIRMATION
   */
  email_confirmation: {
    label: 'Email Confirmation',
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Confirm Email',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Confirm email address',
      default_value: '',

      // === Matching ===
      match_field: 'email', // Field to match against
    error_message: 'Email addresses do not match',
      match_case_sensitive: false,

      // === Validation ===
      required: true,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: 'Please re-enter your email address',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      autocomplete_attribute: 'email',
    },
  },

  /**
   * PASSWORD CONFIRMATION
   */
  password_confirmation: {
    label: 'Password Confirmation',
    icon: <FontAwesomeIcon icon={faLock} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Confirm Password',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Confirm password',
      default_value: '',

      // === Matching ===
      match_field: 'password', // Field to match against
      error_message: 'Passwords do not match',
      match_case_sensitive: true,

      // === Validation ===
      required: true,

      // === Visibility ===
      show_toggle: true,
      show_text: 'Show',
      hide_text: 'Hide',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: 'Please re-enter your password',

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
   * TOOLTIP FIELD
   */
  tooltip_field: {
    label: 'Tooltip Field',
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Text Input with Tooltip',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Enter text...',
      default_value: '',
      field_type: 'text', // text, textarea, number, email, etc.

      // === Tooltip ===
      tooltip_text: 'Helpful tooltip text',
      tooltip_position: 'top', // top, bottom, left, right
      tooltip_icon: 'info', // info, question, help, custom
    custom_icon: '',

      // === Tooltip Behavior ===
      tooltip_trigger: 'hover', // hover, click, focus
      tooltip_animation: 'fade', // fade, slide, grow
      tooltip_theme: 'default', // default, dark, light, custom

      // === Validation ===
      required: false,

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
   * ADDRESS AUTOCOMPLETE
   */
  address_autocomplete: {
    label: 'Address Autocomplete',
    icon: <FontAwesomeIcon icon={faMapLocation} />,
    category: 'general',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Address',
      label_placement: 'default',
      admin_label: '',

      // === Input Options ===
      placeholder: 'Start typing address...',

      // === Autocomplete ===
      provider: 'google', // google, mapbox, here
      api_key: '',
      api_region: 'us',

      // === Components ===
      include_components: ['street', 'city', 'state', 'zip', 'country'],
      component_fields: {
        street: { label: 'Street', required: true },
        city: { label: 'City', required: true },
        state: { label: 'State', required: false },
        zip: { label: 'Zip Code', required: false },
        country: { label: 'Country', required: false },
      },

      // === Display ===
      separate_components: true, // Split into separate fields
      layout: 'vertical',

      // === Constraints ===
      country_restriction: '', // Limit to country
      bounds: '', // Limit to geographic area

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
   * CUSTOM SUBMIT BUTTON
   * (FREE in FluentForm)
   */
  custom_submit_button: {
    label: 'Custom Submit Button',
    icon: <FontAwesomeIcon icon={faPaperPlane} />,
    category: 'advanced',
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
  like_dislike: {
    label: 'Like / Dislike',
    icon: <FontAwesomeIcon icon={faThumbsUp} />,
    category: 'general',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Do you like this?',
      label_placement: 'default',
      admin_label: '',

      // === Options ===
      allow_neutral: true,
      neutral_label: 'Neutral',
      like_label: 'Like',
      dislike_label: 'Dislike',

      // === Icons ===
      icon_type: 'thumbs', // thumbs, smiley, star, heart, custom
      custom_icons: {
        like: '',
        dislike: '',
        neutral: '',
      },

      // === Layout ===
      layout: 'horizontal', // horizontal, vertical
    show_labels: true,
      label_position: 'below', // below, above, hide

      // === Behavior ===
      allow_change: true, // Allow changing selection

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',
      icon_size: 'medium', // small, medium, large
    active_color: '',
    inactive_color: '',

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
   * FACEBOOK LIKE
   */
  facebook_like: {
    label: 'Facebook Like',
    icon: <FontAwesomeIcon icon={faThumbsUp} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: '',
      admin_label: '',

      // === URL ===
      url_type: 'current', // current, custom
      custom_url: '',

      // === Button Options ===
      layout: 'standard', // standard, button_count, box_count, button
      width: '',
      share: true,
      show_faces: true,

      // === Styling ===
      container_class: '',
      element_class: '',
      align: 'left', // left, center, right

      // === Advanced ===
      name_attribute: '',
      kid_directed_site: false,
    referral_code: '',
    },
  },

  /**
   * MARK ON MAP
   */
  mark_on_map: {
    label: 'Mark on Map',
    icon: <FontAwesomeIcon icon={faMapLocation} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select Location on Map',
      label_placement: 'default',
      admin_label: '',

      // === Map Provider ===
      map_provider: 'google', // google, mapbox, leaflet, openstreetmap
      api_key: '',
      map_style: 'roadmap', // roadmap, satellite, hybrid, terrain

      // === Default Location ===
      default_location: { lat: 40.7128, lng: -74.0060 }, // NYC
      zoom_level: 10,
      fit_bounds: true,

      // === Interaction ===
      allow_drag: true,
      allow_click: true,
    single_marker: true,

      // === Marker ===
      marker_icon: '',
    marker_color: '#e94560',
      marker_draggable: true,

      // === Display ===
      map_width: '100%',
      map_height: 400,
      map_type_control: true,
      zoom_control: true,
      street_view_control: false,
      fullscreen_control: false,

      // === Geolocation ===
      enable_geolocation: false,
    geolocation_button_text: 'Use My Location',

      // === Output ===
      output_format: 'lat_lng', // lat_lng, address, both

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
   * COLOR SWATCH
   */
  color_swatch: {
    label: 'Color Swatch',
    icon: <FontAwesomeIcon icon={faPalette} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Choose Color',
      label_placement: 'default',
      admin_label: '',

      // === Swatches ===
      swatches: ['#e94560', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      allow_custom: true,

      // === Display ===
      display_type: 'swatches', // swatches, picker, both
    swatch_size: 'medium', // small, medium, large
      swatch_shape: 'square', // square, circle
      layout: 'grid', // grid, flex

      // === Picker Options (when custom allowed) ===
      picker_type: 'default', // default, chrome, sketch, photoshop
      color_format: 'hex', // hex, rgb, hsl

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
   * DUAL LISTBOX
   */
  dual_listbox: {
    label: 'Dual List Box',
    icon: <FontAwesomeIcon icon={faList} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select Items',
      label_placement: 'default',
      admin_label: '',

      // === Options ===
      available_items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
      selected_items: [],

      // === Layout ===
      list_height: 200,
      list_width: 'equal', // equal, custom
      left_list_width: '',
      right_list_width: '',

      // === Labels ===
      available_label: 'Available',
      selected_label: 'Selected',

      // === Buttons ===
      move_all_button: true,
      move_button_style: 'icon', // icon, text, both

      // === Search ===
      allow_search: true,
      search_placeholder: 'Search...',

      // === Filter ===
      allow_filter: false,
      filter_placeholder: 'Filter...',

      // === Sorting ===
      sort_items: false,
      sort_selected: false,
      sort_order: 'asc', // asc, desc

      // === Display ===
      show_item_count: true,
      show_tooltips: true,

      // === Validation ===
      required: false,
    min_selections: 0,
    max_selections: 0,

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
   * CHAINED FIELDS
   */
  chained_fields: {
    label: 'Chained Fields',
    icon: <FontAwesomeIcon icon={faArrowDownShortWide} />,
    category: 'advanced',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Dependent Fields',
      admin_label: '',

      // === Chain Configuration ===
      parent_field: '', // Field to watch
      chain_type: 'show', // show, hide, enable, disable
      chain_rules: [
        { parent_value: 'option1', action: 'show', target_fields: ['field1', 'field2'] },
        { parent_value: 'option2', action: 'show', target_fields: ['field3'] },
      ],

      // === Display ===
      animation: 'fade', // fade, slide, none
    animation_duration: 300,

      // === Validation ===
      validate_hidden: false, // Validate fields that are hidden

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
  accordion: {
    label: 'Accordion',
    icon: <FontAwesomeIcon icon={faCompress} />,
    category: 'layout',
    pro: true,
    defaultProps: {
      label: 'Accordion',
      title: 'Section Title',
      description: '',
      collapsible: true,
      default_open: false,
      icon_position: 'left', // left, right, none
      icon: '',

      // === Style ===
      border_style: 'solid', // solid, dashed, none
      border_width: 1,
      border_color: '',

      // === Animation ===
      animation: 'smooth', // smooth, instant, none
      animation_duration: 300,

      // === Multiple Open ===
      allow_multiple_open: false,

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
   * TABS CONTAINER
   */
  tabs: {
    label: 'Tabs',
    icon: <FontAwesomeIcon icon={faTableList} />,
    category: 'layout',
    pro: true,
    defaultProps: {
      label: '',
      tabs: [
        { title: 'Tab 1', icon: '', fields: [] },
        { title: 'Tab 2', icon: '', fields: [] },
      ],

      // === Position ===
      tab_position: 'top', // top, left, right, bottom

      // === Style ===
      tab_style: 'default', // default, pills, underline, card
      tab_size: 'medium', // small, medium, large

      // === Behavior ===
      remember_selection: false, // Remember on page load
      auto_rotate: false,
      rotate_interval: 5000, // ms

      // === Animation ===
      animation: 'fade', // fade, slide, none

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
   * PROGRESS BAR
   */
  progress_bar: {
    label: 'Progress Bar',
    icon: <FontAwesomeIcon icon={faBarsProgress} />,
    category: 'layout',
    pro: true,
    defaultProps: {
      label: '',

      // === Bar Type ===
      bar_type: 'percentage', // percentage, steps, animated
      bar_color: '#e94560',
      bar_height: 10,
      bar_style: 'solid', // solid, striped, animated

      // === Display ===
      show_percentage: true,
      show_steps: true,
      show_label: true,
      label_text: 'Form Progress',

      // === Steps ===
      steps: [], // Array of step labels

      // === Animation ===
      animate_on_load: true,
    animation_duration: 1000,

      // === Position ===
      position: 'top', // top, bottom, both

      // === Styling ===
      container_class: '',
      element_class: '',
      background_color: '',

      // === Advanced ===
      name_attribute: '',
    },
  },

  /**
   * COUNTDOWN TIMER
   */
  countdown_timer: {
    label: 'Countdown Timer',
    icon: <FontAwesomeIcon icon={faHourglassHalf} />,
    category: 'layout',
    pro: true,
    defaultProps: {
      label: '',

      // === Time ===
      end_date: '',
      end_time: '23:59',
      duration: '', // Alternative: duration in minutes

      // === Format ===
      timer_format: 'DHMS', // D, H, M, S combination
      separator: ':',

      // === Labels ===
      labels: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },

      // === Expiration ===
      message: 'Time has expired!',
      redirect_url: '',
      hide_form_on_expire: false,
      disable_submit_on_expire: true,

      // === Display ===
      show_labels: true,
      show_separator: true,
      leading_zeros: true,

      // === Style ===
      style: 'default', // default, modern, circular, flip
    theme_color: '#e94560',

      // === Animation ===
      tick_animation: true,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Advanced ===
      name_attribute: '',
      auto_restart: false,
    },
  },

  /* ═════════════════════════════════════════════════════════════════════
     PAYMENT FIELDS (PRO in FluentForm)
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * PAYMENT ITEM
   */
  payment_item: {
    label: 'Payment Item',
    icon: <FontAwesomeIcon icon={faReceipt} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Item Name',
      admin_label: '',

      // === Item Details ===
      item_type: 'single', // single, subscription, donation
      description: '',

      // === Pricing ===
      price: 0,
      price_type: 'fixed', // fixed, user_entered
      min_price: 0,
      max_price: 0,

      // === Quantity ===
      quantity_enabled: true,
      default_quantity: 1,
      min_quantity: 1,
      max_quantity: 100,
      quantity_step: 1,

      // === Tax ===
      taxable: false,
    tax_rate: 0,
    tax_included: false,

      // === Validation ===
      required: true,

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
   * SUBSCRIPTION ITEM
   */
  subscription: {
    label: 'Subscription',
    icon: <FontAwesomeIcon icon={faRotate} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Subscription Plan',
      admin_label: '',

      // === Plans ===
      plans: [
        { label: 'Monthly', value: 'monthly', price: 10, interval: 'month', interval_count: 1 },
        { label: 'Yearly', value: 'yearly', price: 100, interval: 'year', interval_count: 1 },
      ],
      default_plan: 'monthly',

      // === Trial ===
      trial_period: 0, // days
      trial_amount: 0,

      // === Setup Fee ===
      setup_fee: 0,
      setup_fee_label: 'One-time setup fee',

      // === Billing Cycle ===
      billing_cycle_label: 'Billed {interval}',
    show_renewal_date: true,

      // === Options ===
      allow_plan_change: true,
      prorate_on_change: false,

      // === Validation ===
      required: true,

      // === Styling ===
      container_class: '',
      element_class: '',
      plan_display: 'radio', // radio, button, card

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
    },
  },

  /**
   * COUPON
   */
  coupon: {
    label: 'Coupon Code',
    icon: <FontAwesomeIcon icon={faTags} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Coupon Code',
      admin_label: '',

      // === Input ===
      placeholder: 'Enter coupon code',
      apply_button_text: 'Apply',

      // === Coupons ===
      allowed_coupons: [], // Specific allowed codes
      coupon_source: 'database', // database, manual, api

      // === Display ===
      show_discount_amount: true,
    show_remove_button: true,
    remove_button_text: 'Remove',

      // === Messages ===
    success_message: 'Coupon applied successfully!',
    invalid_message: 'Invalid coupon code',
    expired_message: 'Coupon has expired',

      // === Validation ===
      required: false,

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      apply_on_load: false,
    default_coupon: '',
    },
  },

  /**
   * ITEM QUANTITY
   */
  item_quantity: {
    label: 'Quantity',
    icon: <FontAwesomeIcon icon={faHashtag} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Quantity',
      label_placement: 'default',
      admin_label: '',

      // === Quantity Options ===
      min: 1,
      max: 100,
      step: 1,
      default: 1,

      // === Price ===
      price_per_unit: 0,
    calculate_total: true,

      // === Display ===
      show_buttons: true,
    increment_label: '+',
    decrement_label: '-',
    show_total: true,
    total_label: 'Total: {amount}',

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
   * PAYMENT SUMMARY
   */
  payment_summary: {
    label: 'Payment Summary',
    icon: <FontAwesomeIcon icon={faReceipt} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Order Summary',
      admin_label: '',

      // === Display Options ===
      show_subtotal: true,
      subtotal_label: 'Subtotal',
      show_tax: true,
      tax_label: 'Tax',
      show_shipping: false,
      shipping_label: 'Shipping',
      show_discount: true,
    discount_label: 'Discount',
      show_total: true,
    total_label: 'Total',

      // === Currency ===
      currency: 'USD',
    currency_symbol: '$',
    currency_position: 'before',
    decimal_places: 2,

      // === Layout ===
      layout: 'list', // list, table, compact
      align_right: true,

      // === Styling ===
      container_class: '',
      element_class: '',
    highlight_total: true,

      // === Advanced ===
      name_attribute: '',
    },
  },

  /**
   * CUSTOM PAYMENT AMOUNT
   */
  payment_amount: {
    label: 'Custom Amount',
    icon: <FontAwesomeIcon icon={faMoneyBill} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Payment Amount',
      label_placement: 'default',
      admin_label: '',

      // === Amount Options ===
      placeholder: 'Enter amount',
      min: 0,
      max: 1000,
      default: 10,
      step: 1,

      // === Preset Amounts ===
    show_presets: true,
    preset_amounts: [10, 25, 50, 100],
    preset_layout: 'buttons', // buttons, dropdown
    allow_custom: true,

      // === Currency ===
      currency: 'USD',
    currency_symbol: '$',
    symbol_position: 'before',

      // === Validation ===
      required: true,

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
   * PAYMENT METHOD
   */
  payment_method: {
    label: 'Payment Method',
    icon: <FontAwesomeIcon icon={faCreditCard} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select Payment Method',
      label_placement: 'default',
      admin_label: '',

      // === Methods ===
      methods: ['paypal', 'stripe', 'bank_transfer'],
      available_methods: {
        paypal: { label: 'PayPal', icon: '', enabled: true },
        stripe: { label: 'Credit Card', icon: '', enabled: true },
        bank_transfer: { label: 'Bank Transfer', icon: '', enabled: true },
      },
      default_method: 'paypal',

      // === Display ===
      display_type: 'radio', // radio, button, dropdown
      show_icons: true,
      show_descriptions: false,

      // === Validation ===
      required: true,

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
   * SHIPPING ADDRESS
   */
  shipping_address: {
    label: 'Shipping Address',
    icon: <FontAwesomeIcon icon={faTruck} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Shipping Address',
      label_placement: 'default',
      admin_label: '',

      // === Address Components ===
      include_street1: true,
      include_street2: true,
      include_city: true,
      include_state: true,
      include_zip: true,
      include_country: true,

      // === Copy from Billing ===
      same_as_billing_option: true,
      same_as_billing_label: 'Same as billing address',
      default_same_as_billing: false,

      // === Phone ===
      require_phone: false,
    phone_label: 'Phone Number',

      // === Validation ===
      required: false,
    required_fields: [],

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
   * DONATION
   */
  donation: {
    label: 'Donation',
    icon: <FontAwesomeIcon icon={faHeart} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Donation Amount',
      label_placement: 'default',
      admin_label: '',

      // === Preset Amounts ===
      preset_amounts: [10, 25, 50, 100],
      allow_custom: true,
      default_amount: 25,

      // === Recurring ===
      recurring_option: false,
      recurring_label: 'Make this a monthly donation',
      recurring_intervals: ['monthly'],

      // === Display ===
      preset_layout: 'buttons', // buttons, grid, dropdown
    highlight_popular: true,
    popular_amount: 50,

      // === Currency ===
      currency: 'USD',
    currency_symbol: '$',

      // === Messages ===
      thank_you_message: 'Thank you for your donation!',

      // === Validation ===
      required: true,

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
   * PRODUCT VARIATIONS
   */
  product_variations: {
    label: 'Product Variations',
    icon: <FontAwesomeIcon icon={faClone} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Select Options',
      label_placement: 'default',
      admin_label: '',

      // === Variations ===
      variations: [
        { name: 'Size', options: ['Small', 'Medium', 'Large'], required: true },
        { name: 'Color', options: ['Red', 'Blue', 'Green'], required: true },
      ],

      // === Price Adjustments ===
      price_adjustments: {
        // Format: 'Size-Medium': +5, 'Color-Red': -2
      },

      // === Display ===
      variation_type: 'radio', // radio, button, dropdown, color_swatch, image
      show_prices: true,
    show_stock: false,

      // === Validation ===
      required: true,
    require_all_variations: true,

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
   * TAX CALCULATION
   */
  tax_calculation: {
    label: 'Tax Calculation',
    icon: <FontAwesomeIcon icon={faCalculator} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      label: '',

      // === Tax Rate ===
      tax_rate: 0,
      tax_type: 'percentage', // percentage, fixed
      tax_label: 'Tax',

      // === Options ===
      tax_included: false, // Price includes tax
      apply_to_shipping: false,
      compound_tax: false, // Tax on tax

      // === By Region ===
      regional_tax: false,
      tax_rates: {
        // Format: 'US': 10, 'CA': 5
      },

      // === Display ===
      show_tax_breakdown: false,
    breakdown_label: 'Tax Details',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Advanced ===
      name_attribute: '',
    },
  },

  /**
   * CREDIT CARD
   */
  credit_card: {
    label: 'Credit Card',
    icon: <FontAwesomeIcon icon={faCreditCard} />,
    category: 'payment',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Card Details',
      label_placement: 'default',
      admin_label: '',

      // === Card Fields ===
      show_card_number: true,
      card_number_label: 'Card Number',
      card_number_placeholder: '1234 5678 9012 3456',

      show_expiry: true,
      expiry_label: 'Expiration Date',
      expiry_placeholder: 'MM / YY',

      show_cvc: true,
      cvc_label: 'CVC',
      cvc_placeholder: '123',

      show_cardholder_name: false,
      cardholder_label: 'Cardholder Name',

      // === Card Icons ===
      show_card_icons: true,
      accepted_cards: ['visa', 'mastercard', 'amex', 'discover'],

      // === Validation ===
      required: true,

      // === Styling ===
      container_class: '',
      element_class: '',
      input_style: 'modern', // modern, classic, minimal

      // === Help & Tools ===
      help_text: '',

      // === Conditional Logic ===
      conditional_logic: false,
      condition_match: 'any', // any, all
      conditions: [],

      // === Advanced ===
      name_attribute: '',
      postal_code: false,
      postal_label: 'Postal Code',
    },
  },

  /* ═════════════════════════════════════════════════════════════════════
     SECURITY FIELDS
     ═════════════════════════════════════════════════════════════════════ */

  /**
   * HONEYPOT
   */
  honeypot: {
    label: 'Honeypot',
    icon: <FontAwesomeIcon icon={faShield} />,
    category: 'security',
    pro: true,
    defaultProps: {
      label: '',
      field_name: 'website_url', // Realistic field name
      validation_method: 'empty', // empty, specific_value
      specific_value: '',

      // === Advanced ===
      name_attribute: '',
    },
  },

  /**
   * RECAPTCHA
   * (FREE in FluentForm - essential security)
   */
  recaptcha: {
    label: 'reCAPTCHA',
    icon: <FontAwesomeIcon icon={faCheckDouble} />,
    category: 'security',
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
  math_captcha: {
    label: 'Math Captcha',
    icon: <FontAwesomeIcon icon={faCalculator} />,
    category: 'security',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: '',
      admin_label: '',

      // === Question ===
      difficulty: 'medium', // easy, medium, hard
      operation: 'addition', // addition, subtraction, multiplication, mixed

      // === Display ===
      question_template: '{num1} {operator} {num2} =',
      placeholder: 'Answer',

      // === Options ===
      num1_range: [1, 10], // For easy
      num2_range: [1, 10],
      negative_answers: false,

      // === Validation ===
      required: true,
    error_message: 'Incorrect answer. Please try again.',

      // === Styling ===
      container_class: '',
      element_class: '',

      // === Help & Tools ===
      help_text: 'Solve the math problem to continue',

      // === Advanced ===
      name_attribute: '',
    },
  },

  /**
   * SLIDER CAPTCHA
   */
  slider_captcha: {
    label: 'Slider Captcha',
    icon: <FontAwesomeIcon icon={faSliders} />,
    category: 'security',
    pro: true,
    defaultProps: {
      // === Label Options ===
      label: 'Slide to verify',
      admin_label: '',

      // === Puzzle Type ===
      puzzle_type: 'slide', // slide, rotate

      // === Display ===
      slider_text: 'Slide right to verify',
      verified_text: 'Verified!',
    failed_text: 'Please try again',

      // === Options ===
      refresh_button: true,
    retry_limit: 3,

      // === Validation ===
      required: true,

      // === Styling ===
      container_class: '',
      element_class: '',
      theme: 'light', // light, dark

      // === Advanced ===
      name_attribute: '',
    },
  },
};

/**
 * Get pro-enabled field types.
 * When pro plugin is active, pro fields are enabled.
 */
export function getEnabledFieldTypes() {
  const proEnabled = typeof window !== 'undefined' && window.formglut_admin?.pro_enabled;

  return Object.fromEntries(
    Object.entries(FIELD_TYPES).map(([key, field]) => {
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
  const fieldType = FIELD_TYPES[type];
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
