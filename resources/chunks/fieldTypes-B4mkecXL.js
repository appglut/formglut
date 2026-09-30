import { cc as jsxRuntimeExports, h as FontAwesomeIcon, ao as faCertificate, bd as faShield, ar as faCheckDouble, bj as faTableColumns, b2 as faPaperPlane, b1 as faPalette, bf as faSliders, aj as faBarcode, aQ as faHandshake, bo as faUpload, ak as faBarsProgress, aC as faCreditCard, ba as faReceipt, al as faCalculator, bc as faRotateRight, af as faAlignLeft, bi as faStar, bl as faToggleOn, aG as faExpand, aI as faEyeSlash, aX as faLock, a_ as faMask, aZ as faMapLocation, am as faCalendar, ax as faClock, b5 as faPercent, a$ as faMoneyBill, bg as faSpinner, aP as faGlobe, aS as faHeading, bp as faUser, aN as faFont, b6 as faPhone, aU as faLink, bh as faSquareCheck, av as faCircleDot, aR as faHashtag, aV as faList, aL as faFileLines, aD as faEnvelope, b4 as faPenToSquare } from "./api-C3T_2YIP.js";
import "./default-i18n-Bi0ZJkXv.js";
const COUNTRIES = {
  AF: "Afghanistan",
  AX: "Åland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  CV: "Cabo Verde",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo (DRC)",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Côte d'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Curaçao",
  CY: "Cyprus",
  CZ: "Czechia",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  SZ: "Eswatini",
  ET: "Ethiopia",
  FK: "Falkland Islands",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island and McDonald Islands",
  VA: "Holy See",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Laos",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MK: "North Macedonia",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestine",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn Islands",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Réunion",
  RO: "Romania",
  RU: "Russia",
  RW: "Rwanda",
  BL: "Saint Barthélemy",
  SH: "Saint Helena",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and the Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "São Tomé and Príncipe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syria",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Türkiye",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "U.S. Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Vietnam",
  VG: "British Virgin Islands",
  VI: "U.S. Virgin Islands",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe"
};
const COUNTRY_OPTIONS = Object.entries(COUNTRIES).map(([value, name]) => ({ value, label: `${name} (${value})` }));
const COMMON_OPTION_VALUES = {
  // All keyboard types (for text fields)
  keyboardTypes: [
    { value: "default", label: "Standard Keyboard" },
    { value: "numeric", label: "Numeric (0-9)" },
    { value: "decimal", label: "Decimal (0-9 with .)" },
    { value: "tel", label: "Telephone Keypad" },
    { value: "email", label: "Email Keyboard" },
    { value: "url", label: "URL Keyboard" }
  ],
  // Email field keyboard types
  keyboardTypesEmail: [
    { value: "default", label: "Standard Keyboard" },
    { value: "email", label: "Email Keyboard (Recommended)" },
    { value: "url", label: "URL Keyboard" }
  ],
  // URL field keyboard types
  keyboardTypesUrl: [
    { value: "default", label: "Standard Keyboard" },
    { value: "url", label: "URL Keyboard (Recommended)" },
    { value: "email", label: "Email Keyboard" }
  ],
  // Phone field keyboard types
  keyboardTypesPhone: [
    { value: "default", label: "Standard Keyboard" },
    { value: "tel", label: "Telephone Keypad (Recommended)" },
    { value: "numeric", label: "Numeric (0-9)" }
  ],
  // Number field keyboard types
  keyboardTypesNumber: [
    { value: "default", label: "Standard Keyboard" },
    { value: "numeric", label: "Numeric (0-9)" },
    { value: "decimal", label: "Decimal (0-9 with .)" }
  ],
  resize: [
    { value: "vertical", label: "Vertical Only" },
    { value: "horizontal", label: "Horizontal Only" },
    { value: "both", label: "Both Directions" },
    { value: "none", label: "None" }
  ],
  maskPatterns: [
    { value: "", label: "None" },
    { value: "(999) 999-9999", label: "Phone: (###) ###-####" },
    { value: "999-99-9999", label: "SSN: ###-##-####" },
    { value: "9999 9999 9999 9999", label: "Credit Card: #### #### #### ####" },
    { value: "99/99/9999", label: "Date: ##/##/####" },
    { value: "aaaaaaaaaa", label: "Letters Only (10)" },
    { value: "**********", label: "Alphanumeric (10)" }
  ]
};
const SECTION_ORDER = [
  "general",
  "validation",
  "style",
  "advanced",
  "conditional"
];
const SECTION_TITLES = {
  general: "Field Options",
  validation: "Validation",
  style: "Style Options",
  advanced: "Advanced",
  conditional: "Conditional Logic"
};
const UNIVERSAL_OPTIONS = {
  // === Field Options (General) ===
  // Label and related options
  label: {
    type: "text",
    label: "Element Label",
    section: "general",
    description: "The label displayed above or beside the field"
  },
  admin_label: {
    type: "text",
    label: "Admin Field Label",
    section: "general",
    description: "Label shown only in admin entries view (useful for short/technical labels)"
  },
  // Input options
  placeholder: {
    type: "text",
    label: "Placeholder",
    section: "general",
    description: "Helpful hint shown inside the field when empty"
  },
  default_value: {
    type: "text",
    label: "Default Value",
    section: "general",
    description: "Field is pre-filled with this value. Supports SmartCodes like {user_email}"
  },
  required: {
    type: "switch",
    label: "Required",
    section: "general",
    description: "User must fill this field before submitting the form"
  },
  // Help options (grouped together)
  help_text: {
    type: "textarea",
    label: "Help Message",
    section: "general",
    description: "Additional help text shown below or above the field",
    rows: 2
  },
  help_text_position: {
    type: "select",
    label: "Help Message Position",
    section: "general",
    description: "Where to show the help message",
    options: [
      { value: "tooltip", label: "Tooltip on Hover" },
      { value: "below", label: "Below Field" },
      { value: "above", label: "Above Field" }
    ]
  },
  // Prefix/Suffix (grouped together)
  prefix_label: {
    type: "text",
    label: "Prefix Label",
    section: "general",
    description: "Text or HTML shown before the input (e.g., $, https://)"
  },
  suffix_label: {
    type: "text",
    label: "Suffix Label",
    section: "general",
    description: "Text or HTML shown after the input (e.g., %, .com)"
  },
  // === Validation ===
  validation_message: {
    type: "text",
    label: "Validation Message",
    section: "validation",
    description: "Custom error message shown when validation fails"
  },
  // === Style Options ===
  element_class: {
    type: "text",
    label: "Element Class",
    section: "style",
    description: "CSS class for the input element"
  },
  container_class: {
    type: "text",
    label: "Container Class",
    section: "style",
    description: "CSS class for the wrapper container"
  },
  name_attribute: {
    type: "text",
    label: "Name Attribute",
    section: "advanced",
    description: "Custom name attribute for the field (useful for integrations)"
  }
};
const TEXT_INPUT_OPTIONS = {
  // === General Options ===
  mobile_keyboard_type: {
    type: "select",
    label: "Mobile Keyboard Type",
    section: "general",
    description: "Keyboard type shown on mobile devices",
    options: COMMON_OPTION_VALUES.keyboardTypes
  },
  // === Input Mask ===
  enable_mask: {
    type: "switch",
    label: "Enable Mask Input",
    section: "general",
    description: "Force input to match a specific pattern (e.g., phone number)"
  },
  mask_pattern: {
    type: "select",
    label: "Mask Pattern",
    section: "general",
    description: "Predefined mask patterns",
    options: COMMON_OPTION_VALUES.maskPatterns
  },
  custom_mask: {
    type: "text",
    label: "Custom Mask",
    section: "general",
    description: "Custom mask pattern: 9=digit, a=letter, *=alphanumeric (e.g., (999) 999-9999)"
  },
  reversible_mask: {
    type: "switch",
    label: "Reversible Mask",
    section: "general",
    description: "Allow backspace to work smarter with mask patterns"
  },
  clear_on_invalid: {
    type: "switch",
    label: "Clear if Not Match",
    section: "general",
    description: "Clear the field if input doesn't match the mask"
  },
  // === Validation ===
  character_limit: {
    type: "number",
    label: "Max Text Length",
    section: "validation",
    min: 0,
    description: "Maximum number of characters allowed (0 = unlimited)"
  },
  validate_unique: {
    type: "switch",
    label: "Validate as Unique",
    section: "validation",
    description: "Check for duplicate values in previous submissions"
  },
  unique_error_message: {
    type: "text",
    label: "Duplicate Error Message",
    section: "validation",
    description: "Error message shown when value already exists"
  }
  // === Advanced ===
};
const EMAIL_OPTIONS = {
  // === Field Options ===
  mobile_keyboard_type: {
    type: "select",
    label: "Mobile Keyboard Type",
    section: "general",
    description: "Keyboard type shown on mobile devices",
    options: COMMON_OPTION_VALUES.keyboardTypesEmail
  },
  confirm_email: {
    type: "switch",
    label: "Require Email Confirmation",
    section: "validation",
    description: "User must enter the same email twice"
  },
  confirm_label: {
    type: "text",
    label: "Confirmation Field Label",
    section: "validation",
    description: "Label for the confirmation email field"
  },
  confirm_placeholder: {
    type: "text",
    label: "Confirmation Placeholder",
    section: "validation",
    description: "Placeholder for the confirmation field"
  },
  confirm_error_message: {
    type: "text",
    label: "Mismatch Error Message",
    section: "validation",
    description: "Error shown when emails don't match"
  },
  // === Validation ===
  validate_unique: {
    type: "switch",
    label: "Validate as Unique",
    section: "validation",
    description: "Check if this email has already been submitted"
  },
  unique_error_message: {
    type: "text",
    label: "Validation Message for Duplicate",
    section: "validation",
    description: "Error message when email already exists"
  }
};
const TEXTAREA_OPTIONS = {
  // === Field Options ===
  rows: {
    type: "number",
    label: "Rows",
    section: "general",
    min: 1,
    max: 50,
    description: "Number of visible text lines"
  },
  cols: {
    type: "number",
    label: "Columns",
    section: "general",
    min: 1,
    max: 100,
    description: "Width in average character widths (leave empty for 100%)"
  },
  resize: {
    type: "select",
    label: "Resize Handle",
    section: "general",
    description: "Allow users to resize the textarea",
    options: COMMON_OPTION_VALUES.resize
  },
  max_length: {
    type: "number",
    label: "Max Text Length",
    section: "validation",
    min: 0,
    description: "Maximum number of characters allowed"
  },
  min_length: {
    type: "number",
    label: "Min Length",
    section: "validation",
    min: 0,
    description: "Minimum number of characters required"
  },
  enable_rtl: {
    type: "switch",
    label: "Enable RTL",
    section: "advanced",
    description: "Enable right-to-left text direction"
  }
};
const SELECT_OPTIONS = {
  // === Field Options ===
  disable_first_option: {
    type: "switch",
    label: "Disable First Option",
    section: "general",
    description: "First option (usually placeholder) cannot be selected"
  },
  shuffle_options: {
    type: "switch",
    label: "Shuffle Options",
    section: "general",
    description: "Randomize option order each time the form loads"
  },
  enable_search: {
    type: "switch",
    label: "Enable Search",
    section: "general",
    description: "Add search functionality to dropdown (useful for many options)"
  },
  min_search_chars: {
    type: "number",
    label: "Min Search Characters",
    section: "general",
    min: 1,
    description: "Minimum characters before search starts"
  }
};
const MULTISELECT_OPTIONS = {
  // === Field Options ===
  shuffle_options: {
    type: "switch",
    label: "Shuffle Options",
    section: "general",
    description: "Randomize option order each time the form loads"
  },
  enable_search: {
    type: "switch",
    label: "Enable Search",
    section: "general",
    description: "Add search functionality to dropdown (useful for many options)"
  },
  select_all_button: {
    type: "switch",
    label: "Show Select All Button",
    section: "general",
    description: "Add a button to select all options"
  },
  display_format: {
    type: "select",
    label: "Display Format",
    section: "general",
    description: "How selected options are displayed",
    options: [
      { value: "tags", label: "Tags (Chips)" },
      { value: "text", label: "Text (Comma Separated)" },
      { value: "count", label: 'Count Only (e.g., "3 selected")' }
    ]
  },
  // === Selection Limits ===
  min_selections: {
    type: "number",
    label: "Min Selections Required",
    section: "validation",
    min: 0,
    description: "Minimum number of options user must select (0 = no minimum)"
  },
  max_selections: {
    type: "number",
    label: "Max Selections Allowed",
    section: "validation",
    min: 1,
    description: "Maximum number of options user can select"
  }
};
const HIDDEN_OPTION = {
  hidden: { type: "switch", label: "Hide Field", section: "advanced", description: "Hide this field from the form (it is still submitted with its default value)" }
};
const AUTOCOMPLETE_OPTION = {
  autocomplete_attribute: { type: "text", label: "Autocomplete Attribute", section: "advanced", placeholder: "e.g. url, tel, email", description: "Browser autofill hint (HTML autocomplete attribute)" }
};
const PATTERN_OPTIONS = {
  validation_pattern: { type: "select", label: "Custom validation", section: "validation", description: "Check the answer against a rule. Choose a preset or “Custom pattern”.", options: [
    { value: "", label: "None" },
    { value: "letters", label: "Letters and spaces only" },
    { value: "alnum", label: "Letters and numbers only" },
    { value: "digits", label: "Digits only" },
    { value: "postcode", label: "Postcode / ZIP (letters, digits, spaces, dashes)" },
    { value: "custom", label: "Custom pattern (regular expression)" }
  ] },
  validation_regex: { type: "text", label: "Pattern", section: "validation", placeholder: "^[A-Z]{2}[0-9]{4}$", description: "A regular expression the whole answer must match", showWhen: "validation_pattern", showValue: "custom" },
  pattern_message: { type: "text", label: "Message when it does not match", section: "validation", placeholder: "Please use the requested format.", showWhen: "validation_pattern" }
};
const PREFILL_OPTIONS = {
  prefill_source: { type: "select", label: "Fill in automatically from", section: "advanced", description: "Start the field with a value from the page address, the logged-in user, a cookie or the current post", options: [
    { value: "", label: "Nothing (use the default value)" },
    { value: "url", label: "Page address (?name=value)" },
    { value: "user", label: "Logged-in user" },
    { value: "cookie", label: "Cookie" },
    { value: "post_meta", label: "Current post (custom field)" }
  ] },
  prefill_key: { type: "text", label: "Name to read", section: "advanced", placeholder: "utm_source / user_email / first_name", description: "URL parameter, user field (user_email, display_name, first_name, last_name or any user meta key), cookie name or custom field key", showWhen: "prefill_source" }
};
const VISIBILITY_OPTIONS = {
  visibility: { type: "select", label: "Who sees this field", section: "advanced", options: [
    { value: "", label: "Everyone" },
    { value: "logged_in", label: "Only logged-in users" },
    { value: "logged_out", label: "Only visitors who are not logged in" },
    { value: "admins", label: "Only administrators" }
  ] }
};
const WORDS_OPTIONS = {
  max_words: { type: "number", label: "Maximum words", section: "validation", description: "Empty = no limit" },
  show_counter: { type: "switch", label: "Show a live counter", section: "general", description: "Shows characters or words left under the box" }
};
const NUMFMT_OPTIONS = {
  decimals: { type: "select", label: "Decimal places", section: "general", description: "Answers are rounded to this many decimals", options: [{ value: "", label: "Any" }, ...[0, 1, 2, 3, 4].map((n) => ({ value: n, label: String(n) }))] },
  thousand_separator: { type: "select", label: "Thousands separator in emails and entries", section: "general", options: [{ value: "", label: "None (1234567)" }, { value: ",", label: "Comma (1,234,567)" }, { value: ".", label: "Dot (1.234.567)" }, { value: " ", label: "Space (1 234 567)" }] }
};
const SEARCHABLE_OPTIONS = {
  searchable: { type: "switch", label: "Searchable", section: "general", description: "Visitors can type to filter the list" }
};
const COMMON_OPTION_DEFS = {
  ...WORDS_OPTIONS,
  ...NUMFMT_OPTIONS,
  ...SEARCHABLE_OPTIONS,
  ...PREFILL_OPTIONS,
  ...VISIBILITY_OPTIONS,
  ...PATTERN_OPTIONS,
  ...UNIVERSAL_OPTIONS,
  ...HIDDEN_OPTION,
  ...AUTOCOMPLETE_OPTION
};
const NUMBER_OPTIONS = {
  ...TEXT_INPUT_OPTIONS,
  mobile_keyboard_type: { type: "select", label: "Mobile Keyboard", section: "advanced", options: COMMON_OPTION_VALUES.keyboardTypesNumber, description: "Keyboard shown on mobile devices" },
  min_value: { type: "number", label: "Minimum Value", section: "validation", description: "Smallest number allowed (leave empty for no limit)" },
  max_value: { type: "number", label: "Maximum Value", section: "validation", description: "Largest number allowed (leave empty for no limit)" },
  step: { type: "number", label: "Step", section: "general", description: "Allowed increment, e.g. 1 for whole numbers or 0.01 for cents" },
  read_only: { type: "switch", label: "Read Only", section: "advanced", description: "Show the value but prevent editing" }
};
const CHOICE_BASE_OPTIONS = {
  shuffle_options: { type: "switch", label: "Shuffle Options", section: "general", description: "Show options in random order" },
  layout: { type: "select", label: "Layout", section: "general", options: [
    { value: "default", label: "Vertical List" },
    { value: "inline", label: "Horizontal Inline" },
    { value: "button", label: "Button Style" },
    { value: "2_column", label: "2 Column Grid" },
    { value: "3_column", label: "3 Column Grid" },
    { value: "4_column", label: "4 Column Grid" }
  ], description: "How the options are arranged" }
};
const OTHER_CHOICE_OPTIONS = {
  enable_other: { type: "switch", label: "Add an “Other” choice", section: "general", description: "Adds a last choice with a text box for the visitor’s own answer" },
  other_label: { type: "text", label: "“Other” label", section: "general", placeholder: "Other", showWhen: "enable_other" },
  other_placeholder: { type: "text", label: "“Other” box hint", section: "general", placeholder: "Please specify", showWhen: "enable_other" }
};
const RADIO_OPTIONS = { ...CHOICE_BASE_OPTIONS, ...OTHER_CHOICE_OPTIONS };
const CHECKBOX_OPTIONS = {
  ...OTHER_CHOICE_OPTIONS,
  ...CHOICE_BASE_OPTIONS,
  min_selections: { type: "number", label: "Minimum Selections", section: "validation", min: 0, description: "Fewest options the user must tick (0 = no minimum)" },
  max_selections: { type: "number", label: "Maximum Selections", section: "validation", min: 0, description: "Most options the user can tick (0 = no limit)" }
};
const URL_OPTIONS = {
  ...TEXT_INPUT_OPTIONS,
  mobile_keyboard_type: { type: "select", label: "Mobile Keyboard", section: "advanced", options: COMMON_OPTION_VALUES.keyboardTypesUrl, description: "Keyboard shown on mobile devices" },
  url_scheme: { type: "select", label: "URL Scheme", section: "validation", description: "Require a specific URL protocol (http or https)", options: [
    { value: "any", label: "Any" },
    { value: "http", label: "HTTP Only" },
    { value: "https", label: "HTTPS Only" }
  ] },
  allow_relative: { type: "switch", label: "Allow Relative URLs", section: "validation", description: "Allow relative URLs like /path/to/page" },
  validate_url: { type: "switch", label: "Validate URL Format", section: "validation", description: "Ensure the input is a valid URL format" }
};
const PHONE_OPTIONS = {
  show_country_code: { type: "switch", label: "Country code dropdown", section: "general", description: "Visitors pick a country flag and dial code before the number" },
  default_country: { type: "select", label: "Default country", section: "general", options: COUNTRY_OPTIONS, showWhen: "show_country_code" },
  preferred_countries: { type: "select", mode: "multiple", label: "Countries at the top", section: "general", options: COUNTRY_OPTIONS, showWhen: "show_country_code" },
  ...TEXT_INPUT_OPTIONS,
  mobile_keyboard_type: { type: "select", label: "Mobile Keyboard", section: "advanced", options: COMMON_OPTION_VALUES.keyboardTypesPhone, description: "Keyboard shown on mobile devices" },
  validate_phone: { type: "switch", label: "Validate Phone Number", section: "validation", description: "Require 7–15 digits" },
  phone_format: { type: "select", label: "Phone Format", section: "general", description: "Expected phone number format for validation", options: [
    { value: "international", label: "International" },
    { value: "us", label: "US (###) ###-####" },
    { value: "uk", label: "UK #### ######" },
    { value: "custom", label: "Custom Format" }
  ] },
  custom_format: { type: "text", label: "Custom Format", section: "general", placeholder: "(999) 999-9999", description: "Custom phone format mask using 9 for digits" }
};
const DATE_OPTIONS = {
  date_type: { type: "select", label: "Picker Type", section: "general", options: [
    { value: "date", label: "Date" },
    { value: "datetime", label: "Date & Time" }
  ], description: "Pick a date only, or a date and time" },
  min_date: { type: "text", label: "Earliest Date", section: "validation", placeholder: "YYYY-MM-DD", description: "Earliest selectable date (YYYY-MM-DD)" },
  max_date: { type: "text", label: "Latest Date", section: "validation", placeholder: "YYYY-MM-DD", description: "Latest selectable date (YYYY-MM-DD)" },
  use_picker: { type: "switch", label: "Calendar popup", section: "general", description: "Show a calendar instead of the browser’s own date box. Needed for the format and disabled days below." },
  date_format: { type: "select", label: "Date format", section: "general", showWhen: "use_picker", options: [
    { value: "Y-m-d", label: "2026-09-30" },
    { value: "d/m/Y", label: "30/09/2026" },
    { value: "m/d/Y", label: "09/30/2026" },
    { value: "d.m.Y", label: "30.09.2026" },
    { value: "j F Y", label: "30 September 2026" },
    { value: "F j, Y", label: "September 30, 2026" }
  ] },
  first_day: { type: "select", label: "Week starts on", section: "general", showWhen: "use_picker", options: [{ value: 1, label: "Monday" }, { value: 0, label: "Sunday" }, { value: 6, label: "Saturday" }] },
  time_24hr: { type: "switch", label: "24-hour time", section: "general", description: "For “Date & Time”", showWhen: "use_picker" },
  disable_past: { type: "switch", label: "No past dates", section: "validation" },
  disable_future: { type: "switch", label: "No future dates", section: "validation" },
  disable_weekends: { type: "switch", label: "No weekends", section: "validation" },
  disabled_dates: { type: "text", label: "Blocked dates", section: "validation", placeholder: "2026-12-25, 2027-01-01", description: "Comma-separated dates (YYYY-MM-DD) that cannot be chosen" }
};
const sw = (label, description, section = "general") => ({ type: "switch", label, section, description });
const txt = (label, description, section = "general", placeholder) => ({ type: "text", label, section, description, placeholder });
const num = (label, description, section = "general") => ({ type: "number", label, section, description });
const MIN_MAX_VALUE = {
  min_value: num("Minimum Value", "Smallest value allowed (leave empty for no limit)", "validation"),
  max_value: num("Maximum Value", "Largest value allowed (leave empty for no limit)", "validation"),
  step: num("Step", "Allowed increment, e.g. 1 for whole numbers or 0.01 for cents"),
  read_only: sw("Read Only", "Show the value but prevent editing", "advanced")
};
const HTML_OPTIONS = {
  html_content: { type: "textarea", label: "HTML Content", section: "general", rows: 8, description: "HTML to display. Scripts and unsafe tags are removed." },
  enable_shortcodes: sw("Run Shortcodes", "Process WordPress shortcodes inside the content")
};
const HEADING_OPTIONS = {
  text: txt("Heading Text", "The heading shown on the form"),
  heading_level: { type: "select", label: "Heading Level", section: "general", allowClear: false, options: ["h1", "h2", "h3", "h4", "h5", "h6"].map((v) => ({ value: v, label: v.toUpperCase() })), description: "HTML heading tag (H1 is largest)" },
  alignment: { type: "select", label: "Alignment", section: "general", allowClear: false, options: [{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }], description: "Text alignment" },
  description: { type: "textarea", label: "Description", section: "general", rows: 3, description: "Optional text shown below the heading" },
  custom_color: { type: "color", label: "Heading Color", section: "style", description: "Leave empty to use the default color" },
  show_divider: sw("Show Divider", "Draw a line below the heading"),
  divider_style: { type: "select", label: "Divider Style", section: "style", allowClear: false, options: [{ value: "solid", label: "Solid" }, { value: "dashed", label: "Dashed" }, { value: "dotted", label: "Dotted" }], description: "Line style of the divider" },
  divider_color: { type: "color", label: "Divider Color", section: "style", description: "Leave empty to use the default color" }
};
const NAME_OPTIONS = {
  show_first_name: sw("Show First Name", "Include a first name box"),
  show_middle_name: sw("Show Middle Name", "Include a middle name box"),
  show_last_name: sw("Show Last Name", "Include a last name box"),
  require_first_name: sw("First Name Required", "When the field is required, the first name must be filled", "validation"),
  require_middle_name: sw("Middle Name Required", "When the field is required, the middle name must be filled", "validation"),
  require_last_name: sw("Last Name Required", "When the field is required, the last name must be filled", "validation"),
  first_name_label: txt("First Name Label", "Label above the first name box"),
  middle_name_label: txt("Middle Name Label", "Label above the middle name box"),
  last_name_label: txt("Last Name Label", "Label above the last name box"),
  first_name_placeholder: txt("First Name Placeholder", "Hint text inside the first name box"),
  middle_name_placeholder: txt("Middle Name Placeholder", "Hint text inside the middle name box"),
  last_name_placeholder: txt("Last Name Placeholder", "Hint text inside the last name box"),
  show_prefix: sw("Show Title (Mr / Ms …)", "Add a title dropdown before the first name"),
  prefix_options: txt("Title Choices", "Comma-separated", "general", "Mr, Mrs, Ms, Mx, Dr"),
  show_suffix: sw("Show Suffix", "Add a suffix box after the last name (Jr, Sr, III …)"),
  name_layout: { type: "select", label: "Layout", section: "general", allowClear: false, options: [{ value: "horizontal", label: "Side by side" }, { value: "vertical", label: "Stacked" }], description: "Arrange the name boxes side by side or stacked" }
};
const COUNTRY_OPTIONS_DEF = {
  country_list: { type: "select", label: "Countries Shown", section: "general", allowClear: false, options: [{ value: "all", label: "All countries" }, { value: "include", label: "Only selected countries" }, { value: "exclude", label: "All except selected" }], description: "Which countries appear in the list" },
  included_countries: { type: "select", mode: "multiple", label: "Only These Countries", section: "general", options: COUNTRY_OPTIONS, description: 'Used when "Only selected countries" is chosen' },
  excluded_countries: { type: "select", mode: "multiple", label: "Exclude Countries", section: "general", options: COUNTRY_OPTIONS, description: 'Used when "All except selected" is chosen' },
  top_countries: { type: "select", mode: "multiple", label: "Pinned to Top", section: "general", options: COUNTRY_OPTIONS, description: "Countries listed first, above a separator" },
  default_value: { type: "select", label: "Default Country", section: "general", options: COUNTRY_OPTIONS, description: "Pre-selected country" },
  display_format: { type: "select", label: "Display Format", section: "general", allowClear: false, options: [{ value: "name", label: "Name" }, { value: "code", label: "Code" }, { value: "both", label: "Name (Code)" }], description: "How each country is shown" },
  flag_type: { type: "select", label: "Flags", section: "general", allowClear: false, options: [{ value: "emoji", label: "Emoji flags" }, { value: "none", label: "No flags" }], description: "Show a flag beside each country" }
};
const SPINNER_OPTIONS = {
  min: num("Minimum", "Smallest value", "validation"),
  max: num("Maximum", "Largest value", "validation"),
  step: num("Step", "Amount added or removed per click"),
  show_buttons: sw("Show Buttons", "Show the − and + buttons"),
  increment_label: txt("Increase Button Text", "Text on the increase button"),
  decrement_label: txt("Decrease Button Text", "Text on the decrease button"),
  button_position: { type: "select", label: "Button Position", section: "general", allowClear: false, options: [{ value: "both", label: "Both sides" }, { value: "right", label: "Right" }, { value: "left", label: "Left" }], description: "Where the buttons sit around the number" },
  wrap_values: sw("Wrap Around", "Going past the maximum returns to the minimum, and vice versa")
};
const CURRENCY_OPTIONS = {
  ...MIN_MAX_VALUE,
  currency_symbol: txt("Currency Symbol", "Symbol shown beside the amount, e.g. $, €, ৳"),
  symbol_position: { type: "select", label: "Symbol Position", section: "general", allowClear: false, options: [{ value: "before", label: "Before amount" }, { value: "after", label: "After amount" }], description: "Where the symbol appears" }
};
const PERCENTAGE_OPTIONS = {
  ...MIN_MAX_VALUE,
  symbol_position: { type: "select", label: "% Position", section: "general", allowClear: false, options: [{ value: "before", label: "Before number" }, { value: "after", label: "After number" }], description: "Where the % sign appears" }
};
const TIME_OPTIONS = {
  default_value: txt("Default Time", "Pre-filled time (HH:MM, 24-hour)", "general", "09:00"),
  min_time: txt("Earliest Time", "Earliest allowed time (HH:MM, 24-hour)", "validation", "09:00"),
  max_time: txt("Latest Time", "Latest allowed time (HH:MM, 24-hour)", "validation", "17:00"),
  time_increment: num("Minute Step", "Allowed minute increments, e.g. 15 or 30"),
  time_format: { type: "select", label: "Time format", section: "general", description: "How visitors pick the time. The entry always stores 24-hour HH:MM.", options: [{ value: "", label: "Browser default" }, { value: "24", label: "24-hour (14:30)" }, { value: "12", label: "12-hour (2:30 PM)" }] }
};
const DATE_RANGE_OPTIONS = {
  start_label: txt("Start Label", "Label above the start date"),
  end_label: txt("End Label", "Label above the end date"),
  min_date: txt("Earliest Date", "Earliest selectable date (YYYY-MM-DD)", "validation", "YYYY-MM-DD"),
  max_date: txt("Latest Date", "Latest selectable date (YYYY-MM-DD)", "validation", "YYYY-MM-DD"),
  range_separator: txt("Separator in Entries", 'Text between the two dates when saved, e.g. " - " or " to "', "advanced")
};
const ADDRESS_OPTIONS = {
  include_street2: sw("Show Address Line 2", "Include a second street line"),
  include_city: sw("Show City", "Include a city box"),
  include_state: sw("Show State/Province", "Include a state box"),
  include_zip: sw("Show Postal/Zip Code", "Include a zip code box"),
  include_country: sw("Show Country", "Include a country dropdown"),
  street1_label: txt("Street Label", "Label for the street box"),
  street2_label: txt("Line 2 Label", "Label for the second street line"),
  city_label: txt("City Label", "Label for the city box"),
  state_label: txt("State Label", "Label for the state box"),
  zip_label: txt("Zip Label", "Label for the zip box"),
  country_label: txt("Country Label", "Label for the country dropdown"),
  street1_placeholder: txt("Street Placeholder", "Hint text in the street box"),
  street2_placeholder: txt("Line 2 Placeholder", "Hint text in the second street line"),
  city_placeholder: txt("City Placeholder", "Hint text in the city box"),
  state_placeholder: txt("State Placeholder", "Hint text in the state box"),
  zip_placeholder: txt("Zip Placeholder", "Hint text in the zip box"),
  address_layout: { type: "select", label: "Layout", section: "general", allowClear: false, options: [{ value: "vertical", label: "Stacked" }, { value: "grid", label: "Grid" }], description: "Stack every box, or arrange city/state/zip in a grid" },
  grid_columns: { type: "select", label: "Grid Columns", section: "general", allowClear: false, options: [{ value: 2, label: "2" }, { value: 3, label: "3" }], description: "Columns used by the grid layout" }
};
const MASKED_INPUT_OPTIONS = {
  ...TEXT_INPUT_OPTIONS,
  custom_mask: txt("Mask", "9 = digit, a = letter, * = letter or digit. Other characters are typed for the user.", "general", "(999) 999-9999"),
  mask_hint: txt("Mask Hint", 'Helper text shown under the input, e.g. "Format: (555) 123-4567"'),
  validate_mask: sw("Require Complete Mask", "Reject values that do not fill the whole mask", "validation")
};
const sel = (label, description, options, section = "general") => ({ type: "select", label, section, description, allowClear: false, options });
const ALIGN = [{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }];
const LINE = [{ value: "solid", label: "Solid" }, { value: "dashed", label: "Dashed" }, { value: "dotted", label: "Dotted" }];
const PASSWORD_OPTIONS = {
  requirements_hint: txt("Requirements Hint", "Short text under the input describing the rules"),
  min_length: num("Minimum Length", "Fewest characters allowed", "validation"),
  max_length: num("Maximum Length", "Most characters allowed (empty = no limit)", "validation"),
  require_uppercase: sw("Require Uppercase Letter", "At least one A–Z", "validation"),
  require_lowercase: sw("Require Lowercase Letter", "At least one a–z", "validation"),
  require_number: sw("Require Number", "At least one 0–9", "validation"),
  require_special: sw("Require Special Character", "At least one symbol such as ! @ # $", "validation"),
  enable_strength_meter: sw("Show Strength Meter", "Show a bar that rates the password as it is typed"),
  show_toggle: sw("Show/Hide Button", "Let the user reveal what they typed"),
  show_text: txt("Show Button Text", "Text on the reveal button"),
  hide_text: txt("Hide Button Text", "Text on the hide button"),
  require_confirmation: sw("Confirm Password", "Ask the user to type the password twice", "validation"),
  confirmation_label: txt("Confirm Label", "Label above the confirmation box", "validation"),
  confirmation_placeholder: txt("Confirm Placeholder", "Hint text in the confirmation box", "validation"),
  confirmation_error: txt("Mismatch Error", "Shown when the two passwords differ", "validation")
};
const HIDDEN_FIELD_OPTIONS = {
  label: txt("Label (entries only)", "Name shown for this value in entries and emails"),
  default_value: txt("Value", "Value submitted with the form")
};
const TOGGLE_OPTIONS = {
  toggle_text: { type: "text", label: "Text beside the switch", section: "general" },
  default_on: { type: "switch", label: "On by default", section: "general" },
  on_value: { type: "text", label: "Value when on", section: "advanced", description: "Saved in the entry when the switch is on" },
  off_value: { type: "text", label: "Value when off", section: "advanced", description: "Saved in the entry when the switch is off" }
};
const STAR_RATING_OPTIONS = {
  max_stars: { type: "select", label: "Number of stars", section: "general", options: [3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({ value: n, label: String(n) })) },
  show_labels: { type: "switch", label: "Show a word for each rating", section: "general" },
  rating_labels: { type: "text", label: "Rating words", section: "general", placeholder: "Very poor, Poor, Average, Good, Excellent", description: "Comma-separated, one per star", showWhen: "show_labels" },
  star_color: { type: "color", label: "Star colour", section: "style" },
  star_size: { type: "select", label: "Star size", section: "style", options: [{ value: "small", label: "Small" }, { value: "medium", label: "Medium" }, { value: "large", label: "Large" }] }
};
const RICH_TEXT_OPTIONS = {
  toolbar: { type: "select", label: "Toolbar", section: "general", options: [{ value: "basic", label: "Bold, italic, lists" }, { value: "full", label: "Bold, italic, underline, lists, link, quote" }] },
  editor_height: { type: "number", label: "Height (px)", section: "general" },
  max_length: { type: "number", label: "Maximum characters", section: "validation", description: "Counts visible text, not formatting. Empty = no limit." }
};
const UNIQUE_ID_OPTIONS = {
  id_type: { type: "select", label: "ID type", section: "general", description: "Created when the form is submitted", options: [{ value: "sequential", label: "Sequential number (0001, 0002…)" }, { value: "random", label: "Random code (8 characters)" }, { value: "date", label: "Date + number (20260930-001)" }] },
  id_prefix: { type: "text", label: "Prefix", section: "general", placeholder: "REF-" },
  id_suffix: { type: "text", label: "Suffix", section: "general" },
  start_number: { type: "number", label: "Start at", section: "general", description: "First number for sequential IDs" },
  number_length: { type: "number", label: "Minimum digits", section: "general", description: "Pads with zeros, e.g. 5 → 00042" }
};
const RESET_BUTTON_OPTIONS = {
  button_text: { type: "text", label: "Button text", section: "general" },
  button_alignment: { type: "select", label: "Alignment", section: "general", options: [{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }] },
  confirm_reset: { type: "switch", label: "Ask before clearing", section: "general" }
};
const MATH_CAPTCHA_OPTIONS = {
  operation: { type: "select", label: "Question type", section: "general", options: [{ value: "add", label: "Addition (3 + 4)" }, { value: "subtract", label: "Subtraction (9 − 4)" }, { value: "multiply", label: "Multiplication (3 × 4)" }, { value: "mixed", label: "Mixed" }] }
};
const CALCULATION_OPTIONS = {
  formula: { type: "textarea", label: "Formula", section: "general", rows: 3, placeholder: "{field:quantity} * {field:price}", description: "Use {field:ID} for a field’s value (copy the tag from the field’s ID chip), numbers, + − * / %, brackets and round(x, 2), min(), max(), abs(), ceil(), floor(). Choices use their calculation value." },
  decimals: { type: "select", label: "Decimal places", section: "general", options: [0, 1, 2, 3, 4].map((n) => ({ value: n, label: String(n) })) },
  calc_prefix: { type: "text", label: "Text before the number", section: "general", placeholder: "$" },
  calc_suffix: { type: "text", label: "Text after the number", section: "general", placeholder: " USD" },
  hide_on_form: { type: "switch", label: "Hide on the form", section: "general", description: "Still calculated and saved with the entry" }
};
const PAYMENT_ITEM_OPTIONS = {
  item_type: { type: "select", label: "Price", section: "general", options: [{ value: "fixed", label: "Fixed price" }, { value: "custom", label: "Visitor enters the amount (donation, custom amount)" }] },
  amount: { type: "number", label: "Price", section: "general", description: "In the currency set in Global Settings › Payments" },
  min_amount: { type: "number", label: "Minimum amount", section: "validation", description: "For “Visitor enters the amount”" }
};
const STRIPE_CARD_OPTIONS = {
  amount_source: { type: "select", label: "Amount to charge", section: "general", options: [{ value: "items", label: "Total of the Payment Item fields" }, { value: "calc", label: "Result of a Calculation field" }] },
  amount_field: { type: "text", label: "Calculation field ID", section: "general", placeholder: "f123…", description: "Copy the ID from the Calculation field’s ID chip", showWhen: "amount_source", showValue: "calc" },
  show_total: { type: "switch", label: "Show the total above the card", section: "general" },
  payment_description: { type: "text", label: "Description in Stripe", section: "advanced", placeholder: "{form_name} – {field:ID}", description: "What you see in your Stripe Dashboard. Smart tags allowed." }
};
const FORM_STEP_OPTIONS = {
  step_title: { type: "text", label: "Next step title", section: "general", description: "Title of the step that starts here (shown in the progress bar)" },
  next_text: { type: "text", label: "Next button text", section: "general", description: "Button that moves to the next step" },
  prev_text: { type: "text", label: "Previous button text", section: "general", description: "Button that goes back one step" }
};
const FILE_UPLOAD_OPTIONS = {
  button_text: { type: "text", label: "Button text", section: "general", description: "Text on the upload button" },
  multiple: { type: "switch", label: "Allow multiple files", section: "general", description: "Let visitors choose more than one file" },
  max_files: { type: "number", label: "Maximum number of files", section: "validation", description: "How many files one visitor can upload", showWhen: "multiple" },
  images_only: { type: "switch", label: "Images only", section: "validation", description: "Accept only JPG, PNG, GIF and WebP images" },
  allowed_types: { type: "text", label: "Allowed file types", section: "validation", placeholder: "jpg, png, pdf", description: "Comma-separated extensions. WordPress may still block some types for security." },
  max_size: { type: "number", label: "Max file size (MB)", section: "validation", description: "Per file. The server upload limit also applies." }
};
const SECTION_BREAK_OPTIONS = {
  title: txt("Title", "Section heading"),
  description: { type: "textarea", label: "Description", section: "general", rows: 3, description: "Text under the title" },
  alignment: sel("Alignment", "Text alignment", ALIGN),
  show_divider: sw("Show Divider", "Draw a line under the section title"),
  divider_style: sel("Divider Style", "Line style", LINE, "style"),
  divider_color: { type: "color", label: "Divider Color", section: "style", description: "Leave empty for the default" },
  divider_thickness: num("Divider Thickness (px)", "Line thickness", "style"),
  background_color: { type: "color", label: "Background Color", section: "style", description: "Background of the section header" },
  text_color: { type: "color", label: "Text Color", section: "style", description: "Title and description color" },
  collapsible: sw("Collapsible", "Let visitors show/hide the fields below this section (up to the next section break)"),
  default_collapsed: sw("Start Collapsed", "Hide the section fields until the visitor opens them"),
  toggle_text_open: txt("Hide Button Text", "Button text while the section is open"),
  toggle_text_closed: txt("Show Button Text", "Button text while the section is closed")
};
const TERMS_OPTIONS = {
  label: txt("Agreement Text", "Text beside the checkbox"),
  display_type: sel("Show Terms As", "How the terms are presented", [
    { value: "box", label: "Scrollable box above the checkbox" },
    { value: "modal", label: "Link that opens a popup" },
    { value: "link", label: "Link to a page" },
    { value: "none", label: "Checkbox only" }
  ]),
  terms_content: { type: "textarea", label: "Terms Content", section: "general", rows: 8, description: "Shown in the box or popup. Basic HTML allowed." },
  scroll_height: num("Box Height (px)", "Height of the scrollable box"),
  require_scroll: sw("Require Scrolling", "Checkbox stays disabled until the box is scrolled to the end", "validation"),
  link_text: txt("Link Text", "Text of the link that opens the terms"),
  link_url: txt("Terms Page URL", "Page opened by the link (Link to a page)", "general", "https://"),
  modal_title: txt("Popup Title", "Heading of the popup"),
  checkbox_position: sel("Checkbox Position", "Checkbox before or after the text", [{ value: "left", label: "Left" }, { value: "right", label: "Right" }])
};
const GDPR_OPTIONS = {
  label: txt("Consent Text", "Text beside the checkbox"),
  policy_text: { type: "textarea", label: "Policy Text", section: "general", rows: 3, description: "Shown above the checkbox" },
  policy_url: txt("Privacy Policy URL", "Link added after the consent text", "general", "https://"),
  default_checked: sw("Checked by Default", "Note: GDPR generally requires consent to be opt-in"),
  show_storage_info: sw("Show Storage Info", "Say how long data is kept"),
  storage_duration_text: txt("Storage Text", "Use {days} for the number of days"),
  storage_days: num("Storage Days", "Number of days data is kept"),
  show_withdraw_link: sw("Show Withdraw Info", "Explain how to withdraw consent"),
  withdraw_text: txt("Withdraw Text", "How to withdraw consent"),
  withdraw_email: txt("Withdraw Email", "Email address for withdrawal requests")
};
const SHORTCODE_OPTIONS = {
  shortcode_content: txt("Shortcode", 'Any WordPress shortcode, e.g. [gallery ids="1,2"]', "general", "[your_shortcode]"),
  run_shortcode: sw("Run Shortcode", "Turn off to temporarily hide the output"),
  cache_output: sw("Cache Output", "Store the output to speed up page loads", "advanced"),
  cache_duration: num("Cache Duration (seconds)", "How long cached output is kept", "advanced"),
  fallback_content: txt("Fallback Text", "Shown when the shortcode outputs nothing")
};
const ACTION_HOOK_OPTIONS = {
  hook_name: txt("Hook Name", "Runs do_action( hook_name, $form_id, $field ). Developers attach output with add_action().", "general", "custom_form_hook"),
  fallback_content: txt("Fallback Text", "Shown when nothing is attached to the hook")
};
const RANGE_SLIDER_OPTIONS = {
  min: num("Minimum", "Lowest value", "validation"),
  max: num("Maximum", "Highest value", "validation"),
  step: num("Step", "Increment between values"),
  default_value: num("Default Value", "Starting position"),
  show_value: sw("Show Current Value", "Display the selected number above the slider"),
  value_prefix: txt("Value Prefix", "Text before the number, e.g. $"),
  value_suffix: txt("Value Suffix", "Text after the number, e.g. %"),
  min_label: txt("Minimum Label", "Text under the left end (empty = the number)"),
  max_label: txt("Maximum Label", "Text under the right end (empty = the number)"),
  track_color: { type: "color", label: "Slider Color", section: "style", description: "Color of the filled track and handle" }
};
const COLOR_PICKER_OPTIONS = {
  default_color: { type: "color", label: "Default Color", section: "general", description: "Pre-selected color" },
  picker_type: sel("Picker Type", "How colors are chosen", [
    { value: "swatches", label: "Swatches" },
    { value: "picker", label: "Color picker" },
    { value: "both", label: "Swatches + picker" }
  ]),
  swatches: { type: "select", mode: "tags", label: "Swatches", section: "general", options: [], description: "Hex colors to offer, e.g. #e94560 (type and press Enter)" },
  allow_custom: sw("Allow Any Color", "Accept colors outside the swatch list (always on for the picker)", "validation"),
  swatch_size: sel("Swatch Size", "Size of each swatch", [{ value: "small", label: "Small" }, { value: "medium", label: "Medium" }, { value: "large", label: "Large" }], "style")
};
const SUBMIT_BUTTON_OPTIONS = {
  button_text: txt("Button Text", "Text on the button"),
  loading_text: txt("Loading Text", "Shown while the form is submitting"),
  button_style: sel("Style", "Button look", [{ value: "primary", label: "Filled" }, { value: "outline", label: "Outline" }, { value: "secondary", label: "Subtle" }], "style"),
  button_size: sel("Size", "Button size", [{ value: "small", label: "Small" }, { value: "medium", label: "Medium" }, { value: "large", label: "Large" }], "style"),
  button_shape: sel("Shape", "Corner style", [{ value: "square", label: "Square" }, { value: "rounded", label: "Rounded" }, { value: "pill", label: "Pill" }], "style"),
  button_width: sel("Width", "Button width", [{ value: "auto", label: "Fit text" }, { value: "full", label: "Full width" }], "style"),
  button_alignment: sel("Alignment", "Button position", ALIGN, "style"),
  button_bg_color: { type: "color", label: "Button Color", section: "style", description: "Leave empty for the default" },
  button_text_color: { type: "color", label: "Text Color", section: "style", description: "Leave empty for the default" },
  require_confirmation: sw("Ask Before Submitting", "Show a confirmation dialog before sending"),
  confirm_message: txt("Confirmation Message", "Question shown in the dialog")
};
const CAPTCHA_BASE = {
  validation_message: txt("Error Message", "Shown when the check fails or is not completed", "validation")
};
const RECAPTCHA_OPTIONS = {
  ...CAPTCHA_BASE,
  theme: sel("Theme", "Widget color scheme (reCAPTCHA v2 only)", [{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]),
  size: sel("Size", "Widget size (reCAPTCHA v2 only)", [{ value: "normal", label: "Normal" }, { value: "compact", label: "Compact" }])
};
const HCAPTCHA_OPTIONS = {
  ...CAPTCHA_BASE,
  theme: sel("Theme", "Widget color scheme", [{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]),
  size: sel("Size", "Widget size", [{ value: "normal", label: "Normal" }, { value: "compact", label: "Compact" }])
};
const TURNSTILE_OPTIONS = {
  ...CAPTCHA_BASE,
  theme: sel("Theme", "Widget color scheme", [{ value: "auto", label: "Match visitor" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]),
  size: sel("Size", "Widget size", [{ value: "normal", label: "Normal" }, { value: "compact", label: "Compact" }, { value: "flexible", label: "Full width" }]),
  appearance: sel("Appearance", "When the widget is visible", [{ value: "always", label: "Always" }, { value: "interaction-only", label: "Only when a check is needed" }])
};
const OPTION_GROUPS = {
  admin_label: ["admin_label"],
  // Admin-only label shown in entries
  container: ["container_class"],
  // Wrapper CSS class (Style)
  identity: ["label", "name_attribute"],
  // Element label + name attribute
  hidden: ["hidden"],
  // Hide-field switch
  element: ["element_class"],
  // Input CSS class (Style)
  required: ["required"],
  // Required switch
  valmsg: ["validation_message"],
  // Custom validation message
  help: ["help_text", "help_text_position"],
  // Help message + position
  helptext: ["help_text"],
  // Help message only (no position)
  value: ["default_value"],
  // Default value
  placeholder: ["placeholder"],
  // Placeholder
  affix: ["prefix_label", "suffix_label"],
  // Prefix / suffix labels
  keyboard: ["mobile_keyboard_type"],
  // Mobile keyboard type
  autocomplete: ["autocomplete_attribute"],
  // Browser autocomplete hint
  numeric: ["min_value", "max_value", "read_only"],
  // Min / max value + read-only
  step: ["step"],
  // Step increment
  stepper: ["min", "max"],
  // Min / max (spinner, slider)
  symbol: ["symbol_position"],
  // Symbol position
  shuffle: ["shuffle_options"],
  // Shuffle options
  selection_limit: ["min_selections", "max_selections"],
  // Min / max selections
  length_limit: ["min_length", "max_length"],
  // Min / max length
  unique: ["validate_unique", "unique_error_message"],
  // Unique-value validation
  mask: ["custom_mask", "reversible_mask", "clear_on_invalid"],
  // Input-mask extras
  pattern: ["validation_pattern", "validation_regex", "pattern_message"],
  // Custom validation rule
  prefill: ["prefill_source", "prefill_key"],
  // Fill the field from the URL, user, cookie or post
  visibility: ["visibility"],
  // Who sees the field
  words: ["max_words", "show_counter"],
  // Word limit and live counter
  numfmt: ["decimals", "thousand_separator"],
  // Number display
  searchable: ["searchable"],
  // Type-to-search dropdown
  date_limits: ["min_date", "max_date"],
  // Min / max date
  divider: ["alignment", "description", "show_divider", "divider_style", "divider_color"],
  // Alignment, description and divider styling
  fallback: ["fallback_content"],
  // Fallback content
  columns: ["columns"],
  // Column count
  column_spacing: ["gap", "responsive_stack"],
  // Column gap + responsive stacking
  captcha: ["theme", "size"],
  // Captcha theme + size
  conditional: ["conditional_logic", "condition_match", "conditions"]
  // Conditional-logic data (edited in its own section)
};
const FIELD_TYPE_GROUPS = {
  text: ["conditional", "admin_label", "container", "identity", "element", "required", "valmsg", "help", "value", "placeholder", "affix", "keyboard", "unique", "mask", "pattern", "prefill", "visibility", "words"],
  email: ["conditional", "admin_label", "container", "identity", "element", "required", "valmsg", "help", "value", "placeholder", "keyboard", "unique", "prefill", "visibility"],
  textarea: ["conditional", "admin_label", "container", "identity", "element", "required", "valmsg", "help", "value", "placeholder", "length_limit", "pattern", "prefill", "visibility", "words"],
  select: ["conditional", "admin_label", "container", "identity", "element", "required", "valmsg", "help", "value", "placeholder", "shuffle", "prefill", "visibility", "searchable"],
  multiselect: ["conditional", "admin_label", "container", "identity", "element", "required", "valmsg", "help", "value", "placeholder", "shuffle", "selection_limit", "visibility"],
  number: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "placeholder", "affix", "keyboard", "numeric", "step", "prefill", "visibility", "numfmt"],
  radio: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "shuffle", "prefill", "visibility"],
  checkbox: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "shuffle", "selection_limit", "visibility"],
  url: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "placeholder", "affix", "keyboard", "autocomplete", "pattern", "prefill", "visibility"],
  phone: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "placeholder", "affix", "keyboard", "autocomplete", "pattern", "prefill", "visibility"],
  date: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "date_limits", "prefill", "visibility"],
  html: ["conditional", "admin_label", "container", "hidden", "element", "visibility"],
  name: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "visibility"],
  heading: ["conditional", "admin_label", "container", "hidden", "element", "divider", "visibility"],
  country_select: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "placeholder", "prefill", "visibility", "searchable"],
  spinner: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "placeholder", "step", "stepper", "prefill", "visibility", "numfmt"],
  currency: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "placeholder", "numeric", "step", "symbol", "prefill", "visibility", "numfmt"],
  percentage: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "placeholder", "numeric", "step", "symbol", "prefill", "visibility", "numfmt"],
  time: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "prefill", "visibility"],
  date_range: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "date_limits", "visibility"],
  address: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "visibility"],
  masked_input: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "placeholder", "affix", "mask", "prefill", "visibility"],
  password: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "placeholder", "autocomplete", "length_limit", "pattern", "visibility"],
  hidden: ["admin_label", "identity", "value", "prefill"],
  section_break: ["conditional", "admin_label", "container", "hidden", "element", "divider", "visibility"],
  form_step: ["admin_label"],
  payment_item: ["conditional", "admin_label", "container", "identity", "element", "required", "help", "placeholder", "visibility"],
  stripe_card: ["admin_label", "container", "identity", "help"],
  calculation: ["conditional", "admin_label", "container", "identity", "element", "help", "visibility"],
  toggle: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "prefill", "visibility"],
  star_rating: ["conditional", "admin_label", "container", "identity", "hidden", "required", "valmsg", "help", "prefill", "visibility"],
  rich_text: ["conditional", "admin_label", "container", "identity", "hidden", "required", "valmsg", "help", "placeholder", "visibility"],
  unique_id: ["admin_label", "identity"],
  reset_button: ["conditional", "admin_label", "container", "element", "visibility"],
  math_captcha: ["admin_label", "container", "identity", "valmsg", "helptext"],
  file_upload: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "visibility"],
  terms_conditions: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "helptext", "visibility"],
  gdpr_agreement: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "helptext", "visibility"],
  shortcode: ["conditional", "admin_label", "container", "hidden", "element", "fallback", "visibility"],
  action_hook: ["conditional", "admin_label", "container", "hidden", "element", "fallback", "visibility"],
  range_slider: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "value", "step", "stepper", "prefill", "visibility"],
  color_picker: ["conditional", "admin_label", "container", "identity", "hidden", "element", "required", "valmsg", "help", "prefill", "visibility"],
  custom_submit_button: ["conditional", "admin_label", "container", "hidden", "element", "visibility"],
  column_1: ["conditional", "admin_label", "container", "identity", "hidden", "columns"],
  column_2: ["conditional", "admin_label", "container", "identity", "hidden", "columns", "column_spacing"],
  column_3: ["conditional", "admin_label", "container", "identity", "hidden", "columns", "column_spacing"],
  column_4: ["conditional", "admin_label", "container", "identity", "hidden", "columns", "column_spacing"],
  column_5: ["conditional", "admin_label", "container", "identity", "hidden", "columns", "column_spacing"],
  column_6: ["conditional", "admin_label", "container", "identity", "hidden", "columns", "column_spacing"],
  recaptcha: ["admin_label", "container", "valmsg", "captcha"],
  hcaptcha: ["admin_label", "container", "valmsg", "captcha"],
  turnstile: ["admin_label", "container", "valmsg", "captcha"]
};
const COMMON_OPTION_KEYS = new Set(Object.values(OPTION_GROUPS).flat());
function getCommonOptionKeys(fieldType) {
  return (FIELD_TYPE_GROUPS[fieldType] || []).flatMap((name) => OPTION_GROUPS[name] || []);
}
const COMMON_OPTION_DEFAULTS = {
  admin_label: "",
  container_class: "",
  element_class: "",
  name_attribute: "",
  label: "",
  placeholder: "",
  default_value: "",
  prefix_label: "",
  suffix_label: "",
  required: false,
  hidden: false,
  validation_message: "",
  help_text: "",
  help_text_position: "below",
  conditional_logic: false,
  condition_match: "any",
  conditions: []
};
function getCommonDefaults(fieldType) {
  const out = {};
  getCommonOptionKeys(fieldType).forEach((key) => {
    if (key in COMMON_OPTION_DEFAULTS) out[key] = JSON.parse(JSON.stringify(COMMON_OPTION_DEFAULTS[key]));
  });
  return out;
}
const SIDE_LABELS = ["Top", "Right", "Bottom", "Left"];
const STYLE_BLOCKS = [
  {
    group: "label_layout",
    title: "Label Style",
    controls: [
      { key: "label_placement", type: "select", label: "Label Placement", tip: "Position the label above, below, left, or right of the field input.", default: "top", options: [
        { value: "top", label: "Top" },
        { value: "left", label: "Left" },
        { value: "right", label: "Right" },
        { value: "hidden", label: "Hidden" }
      ] },
      { key: "label_width", type: "select", label: "Label Width", tip: 'Set the width of the label. Use "Auto" to let the label text determine the width.', default: "auto", customKey: "label_width_custom", customLabel: "Custom Width (px)", customTip: "Enter a custom width in pixels for the label.", customPlaceholder: "e.g. 180", options: [
        { value: "auto", label: "Auto" },
        { value: "120px", label: "Small (120px)" },
        { value: "160px", label: "Medium (160px)" },
        { value: "200px", label: "Large (200px)" },
        { value: "100%", label: "Full Width" },
        { value: "custom", label: "Custom" }
      ] }
    ]
  },
  {
    group: "field_box",
    title: "Field Style",
    controls: [
      { key: "field_width", type: "select", label: "Field Width", tip: "Set the width of the field input area. Half = 50%, Three Quarter = 75%, Full Width = 100%.", default: "100%", customKey: "field_width_custom", customLabel: "Custom Width (px)", customTip: "Enter a custom width in pixels for the field input.", customPlaceholder: "e.g. 400", options: [
        { value: "50%", label: "Half" },
        { value: "75%", label: "Three Quarter" },
        { value: "100%", label: "Full Width" },
        { value: "custom", label: "Custom" }
      ] },
      { type: "quad", label: "Input Padding (px)", tip: "Control the spacing inside the field input between the text and the border.", keys: ["padding_top", "padding_right", "padding_bottom", "padding_left"], defaults: [10, 14, 10, 14], sides: SIDE_LABELS },
      { type: "quad", label: "Input Margin (px)", tip: "Control the spacing outside the field input to separate it from other elements.", keys: ["margin_top", "margin_right", "margin_bottom", "margin_left"], defaults: [0, 0, 0, 0], sides: SIDE_LABELS },
      { key: "border_radius", type: "number", label: "Border Radius (px)", tip: "Round the corners of the field input. Higher values create more rounded corners.", default: 8 }
    ]
  },
  {
    group: "colors",
    title: "Colors",
    controls: [
      { key: "bg_color", type: "color", label: "Background Color", tip: "The background color of the field input area.", default: "#ffffff" },
      { key: "border_color", type: "color", label: "Border Color", tip: "The color of the border around the field input.", default: "#e2e8f0" },
      { key: "text_color", type: "color", label: "Text Color", tip: "The color of the text entered by users in the field input.", default: "#1e293b" }
    ]
  },
  {
    group: "css_class",
    title: "Custom CSS",
    controls: [
      { key: "css_class", type: "text", label: "CSS Class", tip: "Add a custom CSS class to this field for advanced styling. You can then target this class in your custom CSS.", placeholder: "my-custom-class" }
    ]
  }
];
const STYLE_GROUPS = Object.fromEntries(STYLE_BLOCKS.map((block) => [
  block.group,
  block.controls.flatMap((c) => [...c.keys || [c.key], ...c.customKey ? [c.customKey] : []])
]));
const STANDARD_INPUT_TYPES = [
  "text",
  "email",
  "textarea",
  "select",
  "multiselect",
  "number",
  "radio",
  "checkbox",
  "url",
  "phone",
  "date",
  "name",
  "country_select",
  "spinner",
  "currency",
  "percentage",
  "time",
  "date_range",
  "address",
  "masked_input",
  "password",
  "range_slider",
  "color_picker",
  "file_upload",
  "toggle",
  "star_rating",
  "rich_text",
  "math_captcha",
  "calculation",
  "payment_item",
  "stripe_card"
];
function getStyleGroups(fieldType) {
  if (STANDARD_INPUT_TYPES.includes(fieldType)) return Object.keys(STYLE_GROUPS);
  if (FIELD_TYPE_GROUPS[fieldType]) {
    return ["hidden", "form_step", "unique_id"].includes(fieldType) || /^column_\d+$/.test(fieldType) ? [] : ["css_class"];
  }
  return Object.keys(STYLE_GROUPS);
}
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
  file_upload: FILE_UPLOAD_OPTIONS,
  toggle: TOGGLE_OPTIONS,
  star_rating: STAR_RATING_OPTIONS,
  rich_text: RICH_TEXT_OPTIONS,
  unique_id: UNIQUE_ID_OPTIONS,
  reset_button: RESET_BUTTON_OPTIONS,
  math_captcha: MATH_CAPTCHA_OPTIONS,
  form_step: FORM_STEP_OPTIONS,
  payment_item: PAYMENT_ITEM_OPTIONS,
  stripe_card: STRIPE_CARD_OPTIONS,
  calculation: CALCULATION_OPTIONS,
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
  turnstile: TURNSTILE_OPTIONS
};
function getOptionsForFieldType(fieldType) {
  return { ...COMMON_OPTION_DEFS, ...FIELD_TYPE_OPTIONS_MAP[fieldType] || {} };
}
const FIELD_TYPES = {
  /* ═════════════════════════════════════════════════════════════════════
     GENERAL FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * TEXT INPUT FIELD
   * Single-line text input with comprehensive options
   */
  text: {
    label: "Text Input",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPenToSquare }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Text Input",
      placeholder: "Enter text here...",
      mobile_keyboard_type: "default",
      enable_mask: false,
      mask_pattern: "",
      custom_mask: "",
      // === Validation Section ===
      validation_message: "Please enter a valid value",
      character_limit: "",
      validate_unique: false,
      unique_error_message: "This value has already been submitted",
      // === Style Section ===
      // === Advanced Section ===
      reversible_mask: false,
      clear_on_invalid: false
      // === Conditional Logic ===
    }
  },
  /**
   * EMAIL FIELD
   * Email input with email validation
   */
  email: {
    label: "Email Address",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Email Address",
      placeholder: "email@example.com",
      required: true,
      mobile_keyboard_type: "email",
      // === Validation Section ===
      validation_message: "Please enter a valid email address",
      confirm_email: false,
      confirm_label: "Confirm Email Address",
      confirm_placeholder: "Re-enter email",
      confirm_error_message: "Email addresses do not match",
      validate_unique: false,
      unique_error_message: "This email has already been registered"
      // === Style Section ===
      // === Advanced Section ===
      // === Conditional Logic ===
    }
  },
  /**
   * TEXT AREA FIELD
   * Multi-line text input
   */
  textarea: {
    label: "Text Area",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileLines }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Message",
      placeholder: "Type your message here...",
      rows: 4,
      cols: "",
      resize: "vertical",
      // === Validation Section ===
      validation_message: "Please enter at least {min} characters",
      max_length: "",
      min_length: "",
      // === Style Section ===
      // === Advanced Section ===
      enable_rtl: false
      // === Conditional Logic ===
    }
  },
  /**
   * DROPDOWN / SELECT FIELD
   * Single choice dropdown
   */
  select: {
    label: "Dropdown",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faList }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Dropdown",
      placeholder: "Choose an option...",
      disable_first_option: true,
      shuffle_options: false,
      options: [
        { label: "Option 1", value: "option1", image: "", disabled: false, calc_value: "" },
        { label: "Option 2", value: "option2", image: "", disabled: false, calc_value: "" },
        { label: "Option 3", value: "option3", image: "", disabled: false, calc_value: "" }
      ],
      // === Validation Section ===
      validation_message: "Please select an option"
      // === Style Section ===
      // === Advanced Section ===
      // === Conditional Logic ===
    }
  },
  /**
   * MULTIPLE SELECT FIELD
   * Multiple choice dropdown (FREE in FluentForm)
   */
  multiselect: {
    label: "Multiple Select",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faList }),
    category: "general",
    defaultProps: {
      // === General Section ===
      label: "Multiple Select",
      placeholder: "Choose options...",
      default_value: [],
      shuffle_options: false,
      select_all_button: true,
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" }
      ],
      // === Validation Section ===
      validation_message: "Please select at least one option",
      min_selections: 0,
      max_selections: 0
      // === Style Section ===
      // === Advanced Section ===
      // === Conditional Logic ===
    }
  },
  /**
   * NUMERIC FIELD
   * Number input with formatting options
   */
  number: {
    label: "Numeric Field",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHashtag }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: "Number",
      placeholder: "Enter a number...",
      mobile_keyboard_type: "numeric",
      // === Number Formatting ===
      // === Constraints ===
      min_value: "",
      max_value: "",
      step: 1,
      // === Validation Section ===
      validation_message: "Please enter a valid number",
      // === Style Section ===
      // === Advanced Section ===
      read_only: false
      // === Conditional Logic ===
    }
  },
  /**
   * RADIO FIELD
   * Single choice radio buttons
   */
  radio: {
    label: "Radio Buttons",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleDot }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: "Radio Buttons",
      // === Radio Options ===
      options: [
        { label: "Option 1", value: "option1", image: "", calc_value: "" },
        { label: "Option 2", value: "option2", image: "", calc_value: "" },
        { label: "Option 3", value: "option3", image: "", calc_value: "" }
      ],
      // === Layout ===
      layout: "default",
      // === Visual Options ===
      shuffle_options: false,
      // === Validation Section ===
      validation_message: "Please select an option"
      // === Style Section ===
      // === Advanced Section ===
      // === Conditional Logic ===
    }
  },
  /**
   * CHECKBOX FIELD
   * Multiple choice checkboxes
   */
  checkbox: {
    label: "Checkbox",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSquareCheck }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: "Checkbox",
      default_value: [],
      // === Checkbox Options ===
      options: [
        { label: "Option 1", value: "option1", image: "", calc_value: "" },
        { label: "Option 2", value: "option2", image: "", calc_value: "" },
        { label: "Option 3", value: "option3", image: "", calc_value: "" }
      ],
      // === Layout ===
      layout: "default",
      // === Visual Options ===
      shuffle_options: false,
      // === Selection ===
      min_selections: 0,
      max_selections: 0,
      // === Validation Section ===
      validation_message: "Please select at least one option"
      // === Style Section ===
      // === Advanced Section ===
      // === Conditional Logic ===
    }
  },
  /**
   * URL INPUT FIELD
   * Website URL input (FREE in FluentForm)
   */
  url: {
    label: "Website URL",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLink }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: "Website",
      placeholder: "https://example.com",
      mobile_keyboard_type: "url",
      // === URL Options ===
      url_scheme: "any",
      allow_relative: false,
      validate_url: true,
      // === Validation Section ===
      validation_message: "Please enter a valid URL",
      // === Style Section ===
      // === Advanced Section ===
      autocomplete_attribute: "url"
      // === Conditional Logic ===
    }
  },
  /**
   * PHONE FIELD
   * Phone number input (FREE in FluentForm)
   */
  phone: {
    label: "Phone Number",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPhone }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: "Phone Number",
      placeholder: "+1 (555) 123-4567",
      mobile_keyboard_type: "tel",
      // === Phone Format ===
      phone_format: "international",
      custom_format: "",
      validate_phone: true,
      // === Validation Section ===
      validation_message: "Please enter a valid phone number",
      // === Style Section ===
      // === Advanced Section ===
      autocomplete_attribute: "tel"
      // === Conditional Logic ===
    }
  },
  /**
   * DATE & TIME FIELD
   * Date and/or time picker
   */
  date: {
    label: "Date & Time",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendar }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      // === General Section ===
      label: "Date",
      // === Date Format ===
      date_type: "date",
      // === Constraints ===
      min_date: "",
      max_date: "",
      // === Validation Section ===
      validation_message: "Please select a date"
      // === Style Section ===
      // === Advanced Section ===
      // === Conditional Logic ===
    }
  },
  /**
   * CUSTOM HTML FIELD
   * Display custom HTML content
   */
  html: {
    label: "Custom HTML",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFont }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      html_content: "<p>Custom HTML content here...</p>",
      enable_shortcodes: true
    }
  },
  /**
   * NAME FIELDS
   * Compound name input (First, Middle, Last) (FREE in FluentForm)
   */
  name: {
    label: "Name Fields",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUser }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Full Name",
      show_first_name: true,
      show_middle_name: false,
      show_last_name: true,
      require_first_name: true,
      require_middle_name: false,
      require_last_name: true,
      first_name_label: "First Name",
      middle_name_label: "Middle Name",
      last_name_label: "Last Name",
      first_name_placeholder: "First name",
      middle_name_placeholder: "Middle name",
      last_name_placeholder: "Last name",
      name_layout: "horizontal",
      validation_message: "Please enter your name"
    }
  },
  /**
   * HEADING FIELD
   * Section heading/divider (FREE in FluentForm)
   */
  heading: {
    label: "Heading",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHeading }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      text: "Section Heading",
      heading_level: "h2",
      alignment: "left",
      description: "",
      custom_color: "",
      show_divider: false,
      divider_style: "solid",
      divider_color: ""
    }
  },
  /**
   * COUNTRY SELECT
   * Country dropdown (FREE in FluentForm)
   */
  country_select: {
    label: "Country",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faGlobe }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Country",
      placeholder: "Select country...",
      country_list: "all",
      included_countries: [],
      excluded_countries: [],
      top_countries: ["US", "CA", "GB"],
      display_format: "name",
      flag_type: "emoji",
      validation_message: "Please select a country"
    }
  },
  /**
   * SPINNER FIELD
   * Number with increment/decrement buttons (FREE in FluentForm)
   */
  spinner: {
    label: "Spinner",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSpinner }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Quantity",
      placeholder: "0",
      default_value: 0,
      min: 0,
      max: 100,
      step: 1,
      show_buttons: true,
      increment_label: "+",
      decrement_label: "-",
      button_position: "both",
      wrap_values: false,
      validation_message: "Please enter a valid number"
    }
  },
  /**
   * CURRENCY FIELD
   * Money/currency input (FREE - variant of Numeric)
   */
  currency: {
    label: "Currency",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMoneyBill }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Amount",
      placeholder: "0.00",
      currency_symbol: "$",
      symbol_position: "before",
      min_value: "",
      max_value: "",
      step: 0.01,
      read_only: false,
      validation_message: "Please enter a valid amount"
    }
  },
  /**
   * PERCENTAGE FIELD
   * Percentage input (FREE - variant of Numeric)
   */
  percentage: {
    label: "Percentage",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPercent }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Percentage",
      placeholder: "0",
      symbol_position: "after",
      min_value: 0,
      max_value: 100,
      step: 1,
      read_only: false,
      validation_message: "Please enter a valid percentage"
    }
  },
  /**
   * TIME PICKER
   * Time-only picker (FREE - part of Date field in FluentForm)
   */
  time: {
    label: "Time",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faClock }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Time",
      min_time: "",
      max_time: "",
      time_increment: 30,
      validation_message: "Please select a time"
    }
  },
  /**
   * DATE RANGE FIELD
   * Date range picker (FREE - variant of Date field)
   */
  date_range: {
    label: "Date Range",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendar }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Date Range",
      start_label: "Start Date",
      end_label: "End Date",
      min_date: "",
      max_date: "",
      range_separator: " - ",
      validation_message: "Please select a date range"
    }
  },
  /**
   * ADDRESS FIELDS
   * Compound address input (FREE in FluentForm)
   */
  address: {
    label: "Address",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMapLocation }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Address",
      include_street2: true,
      include_city: true,
      include_state: true,
      include_zip: true,
      include_country: false,
      street1_label: "Street Address",
      street2_label: "Address Line 2",
      city_label: "City",
      state_label: "State/Province",
      zip_label: "Postal/Zip Code",
      country_label: "Country",
      street1_placeholder: "Street address",
      street2_placeholder: "Apartment, suite, etc.",
      city_placeholder: "City",
      state_placeholder: "State",
      zip_placeholder: "Zip code",
      address_layout: "grid",
      grid_columns: 2,
      validation_message: "Please enter your address"
    }
  },
  /**
   * MASK INPUT FIELD
   * Text with input masking (FREE in FluentForm)
   */
  masked_input: {
    label: "Mask Input",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMask }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Masked Input",
      custom_mask: "(999) 999-9999",
      mask_hint: "",
      reversible_mask: false,
      clear_on_invalid: false,
      validate_mask: true,
      validation_message: "Please enter a valid value"
    }
  },
  /* ═════════════════════════════════════════════════════════════════════
     ADVANCED FIELDS
     ═════════════════════════════════════════════════════════════════════ */
  /**
   * PASSWORD FIELD
   */
  password: {
    label: "Password",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLock }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "Password",
      placeholder: "Enter password...",
      required: true,
      requirements_hint: "Must be at least 8 characters",
      min_length: 8,
      max_length: "",
      require_uppercase: false,
      require_lowercase: false,
      require_number: false,
      require_special: false,
      enable_strength_meter: false,
      show_toggle: true,
      show_text: "Show",
      hide_text: "Hide",
      require_confirmation: false,
      confirmation_label: "Confirm Password",
      confirmation_placeholder: "Re-enter password",
      confirmation_error: "Passwords do not match",
      validation_message: "Password does not meet requirements",
      autocomplete_attribute: "new-password"
    }
  },
  /**
   * HIDDEN FIELD
   */
  hidden: {
    label: "Hidden Field",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEyeSlash }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "Hidden Field",
      param_populate: ""
    }
  },
  /**
   * SECTION BREAK
   * Content divider with optional collapsible (FREE in FluentForm)
   */
  section_break: {
    label: "Section Break",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faExpand }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      title: "Section Title",
      description: "Optional section description",
      alignment: "left",
      show_divider: true,
      divider_style: "solid",
      divider_color: "",
      divider_thickness: 1,
      background_color: "",
      text_color: "",
      collapsible: false,
      default_collapsed: false,
      toggle_text_open: "Hide",
      toggle_text_closed: "Show"
    }
  },
  /**
   * TOGGLE SWITCH
   */
  toggle: {
    label: "Toggle",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faToggleOn }),
    category: "general",
    coming_soon: false,
    defaultProps: {
      label: "Subscribe to our newsletter",
      toggle_text: "Yes, send me updates",
      on_value: "Yes",
      off_value: "No",
      default_on: false,
      validation_message: "Please turn this on to continue"
    }
  },
  /**
   * STAR RATING
   */
  star_rating: {
    label: "Star Rating",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "How would you rate us?",
      max_stars: 5,
      star_color: "#f59e0b",
      star_size: "medium",
      show_labels: false,
      rating_labels: "Very poor, Poor, Average, Good, Excellent",
      validation_message: "Please choose a rating"
    }
  },
  /**
   * RICH TEXT
   */
  rich_text: {
    label: "Rich Text",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faAlignLeft }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "Your message",
      placeholder: "Write here…",
      editor_height: 160,
      toolbar: "basic",
      max_length: "",
      validation_message: "Please write something"
    }
  },
  /**
   * UNIQUE ID
   */
  unique_id: {
    label: "Unique ID",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBarcode }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "Reference",
      id_type: "sequential",
      id_prefix: "REF-",
      id_suffix: "",
      start_number: 1,
      number_length: 5
    }
  },
  /**
   * RESET BUTTON
   */
  reset_button: {
    label: "Reset Button",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateRight }),
    category: "layout",
    coming_soon: false,
    defaultProps: {
      button_text: "Clear form",
      button_alignment: "left",
      confirm_reset: true
    }
  },
  /**
   * MATH CAPTCHA
   */
  math_captcha: {
    label: "Math Captcha",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalculator }),
    category: "security",
    coming_soon: false,
    defaultProps: {
      label: "Quick check",
      operation: "add",
      help_text: "Please answer to show you are human.",
      validation_message: "That answer is not right. Please try again."
    }
  },
  /**
   * CALCULATION
   */
  calculation: {
    label: "Calculation",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalculator }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "Total",
      formula: "",
      decimals: 2,
      calc_prefix: "",
      calc_suffix: "",
      hide_on_form: false
    }
  },
  /**
   * PAYMENT ITEM
   */
  payment_item: {
    label: "Payment Item",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faReceipt }),
    category: "payment",
    coming_soon: false,
    defaultProps: {
      label: "Product",
      item_type: "fixed",
      amount: 10,
      min_amount: 1,
      placeholder: "",
      validation_message: ""
    }
  },
  /**
   * CARD PAYMENT (Stripe)
   */
  stripe_card: {
    label: "Card Payment",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCreditCard }),
    category: "payment",
    coming_soon: false,
    defaultProps: {
      label: "Payment details",
      amount_source: "items",
      amount_field: "",
      show_total: true,
      payment_description: "{form_name}"
    }
  },
  /**
   * STEP BREAK
   * Splits the form into steps (multi-step form). Progress style lives in Form Settings › Multi-step.
   */
  form_step: {
    label: "Step Break",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBarsProgress }),
    category: "layout",
    coming_soon: false,
    defaultProps: {
      step_title: "Next step",
      next_text: "Next",
      prev_text: "Previous"
    }
  },
  /**
   * FILE UPLOAD
   * Single or multiple file upload with type, size and count limits.
   */
  file_upload: {
    label: "File Upload",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUpload }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "Upload File",
      button_text: "Choose file",
      allowed_types: "jpg, jpeg, png, gif, webp, pdf, doc, docx, txt",
      max_size: 5,
      multiple: false,
      max_files: 3,
      images_only: false,
      validation_message: "Please upload a file"
    }
  },
  /**
   * TERMS & CONDITIONS
   * Terms agreement checkbox (FREE in FluentForm)
   */
  terms_conditions: {
    label: "Terms & Conditions",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHandshake }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "I agree to the Terms & Conditions",
      required: true,
      display_type: "box",
      terms_content: "<p>Enter your terms and conditions here...</p>",
      scroll_height: 200,
      require_scroll: false,
      link_text: "View Terms",
      link_url: "",
      modal_title: "Terms & Conditions",
      checkbox_position: "left",
      validation_message: "You must agree to continue"
    }
  },
  /**
   * GDPR AGREEMENT
   * GDPR consent checkbox (FREE in FluentForm)
   */
  gdpr_agreement: {
    label: "GDPR Agreement",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faShield }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "I consent to the processing of my personal data",
      required: true,
      policy_text: "Your privacy is important to us. Please read our privacy policy.",
      policy_url: "",
      default_checked: false,
      show_storage_info: true,
      storage_duration_text: "Your data will be stored for {days} days.",
      storage_days: 365,
      show_withdraw_link: true,
      withdraw_text: "You can withdraw your consent at any time.",
      withdraw_email: "",
      validation_message: "You must consent to continue"
    }
  },
  /**
   * SHORTCODE
   * WordPress shortcode output (FREE - WordPress feature)
   */
  shortcode: {
    label: "Shortcode",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBarcode }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      shortcode_content: "[your_shortcode]",
      run_shortcode: true,
      cache_output: false,
      cache_duration: 3600,
      fallback_content: ""
    }
  },
  /**
   * ACTION HOOK
   * Custom WordPress action hook (FREE - developer feature)
   */
  action_hook: {
    label: "Action Hook",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      hook_name: "custom_form_hook",
      fallback_content: ""
    }
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
    label: "Range Slider",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSliders }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "Range",
      min: 0,
      max: 100,
      step: 1,
      default_value: 50,
      show_value: true,
      value_prefix: "",
      value_suffix: "",
      min_label: "",
      max_label: "",
      track_color: "",
      validation_message: "Please select a value"
    }
  },
  /**
   * COLOR PICKER
   * Color selection input (FREE in FluentForm)
   */
  color_picker: {
    label: "Color Picker",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPalette }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      label: "Choose Color",
      default_color: "#e94560",
      picker_type: "swatches",
      swatches: ["#e94560", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1"],
      allow_custom: true,
      swatch_size: "medium",
      validation_message: "Please select a color"
    }
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
    label: "Custom Submit Button",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }),
    category: "advanced",
    coming_soon: false,
    defaultProps: {
      button_text: "Submit Form",
      loading_text: "Submitting...",
      button_style: "primary",
      button_size: "medium",
      button_shape: "rounded",
      button_width: "auto",
      button_alignment: "left",
      button_bg_color: "",
      button_text_color: "",
      require_confirmation: false,
      confirm_message: "Are you sure you want to submit?"
    }
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
    label: "One Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: false,
    defaultProps: {
      columns: [{ width: 100, fields: [] }]
    }
  },
  /**
   * TWO COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_2: {
    label: "Two Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 50, fields: [] },
        { width: 50, fields: [] }
      ],
      gap: "medium",
      responsive_stack: true
    }
  },
  /**
   * THREE COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_3: {
    label: "Three Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 33.33, fields: [] },
        { width: 33.33, fields: [] },
        { width: 33.34, fields: [] }
      ],
      gap: "medium",
      responsive_stack: true
    }
  },
  /**
   * FOUR COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_4: {
    label: "Four Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 25, fields: [] },
        { width: 25, fields: [] },
        { width: 25, fields: [] },
        { width: 25, fields: [] }
      ],
      gap: "medium",
      responsive_stack: true
    }
  },
  /**
   * FIVE COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_5: {
    label: "Five Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] },
        { width: 20, fields: [] }
      ],
      gap: "medium",
      responsive_stack: true
    }
  },
  /**
   * SIX COLUMN CONTAINER
   * (FREE in FluentForm)
   */
  column_6: {
    label: "Six Column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableColumns }),
    category: "layout",
    coming_soon: false,
    defaultProps: {
      columns: [
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.66, fields: [] },
        { width: 16.7, fields: [] }
      ],
      gap: "medium",
      responsive_stack: true
    }
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
    label: "reCAPTCHA",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCheckDouble }),
    category: "security",
    coming_soon: false,
    defaultProps: {
      theme: "light",
      size: "normal",
      validation_message: "Please complete the captcha verification"
    }
  },
  /**
   * HCAPTCHA
   * (FREE in FluentForm)
   */
  hcaptcha: {
    label: "hCaptcha",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faShield }),
    category: "security",
    coming_soon: false,
    defaultProps: {
      theme: "light",
      size: "normal",
      validation_message: "Please complete the captcha verification"
    }
  },
  /**
   * TURNSTILE
   * (FREE in FluentForm)
   */
  turnstile: {
    label: "Turnstile",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCertificate }),
    category: "security",
    coming_soon: false,
    defaultProps: {
      theme: "auto",
      size: "normal",
      appearance: "always",
      validation_message: "Please complete the captcha verification"
    }
  }
  /**
   * MATH CAPTCHA
   */
  /**
   * SLIDER CAPTCHA
   */
};
function getAllFieldTypes() {
  const allFields = { ...FIELD_TYPES };
  if (typeof window !== "undefined" && window.formglut_pro_fields) {
    Object.assign(allFields, window.formglut_pro_fields);
  }
  return allFields;
}
function createField(type) {
  const allFields = getAllFieldTypes();
  const fieldType = allFields[type];
  if (!fieldType) {
    return { id: "", type: "text", label: "", required: false };
  }
  return {
    id: "",
    type,
    ...getCommonDefaults(type),
    ...JSON.parse(JSON.stringify(fieldType.defaultProps))
  };
}
function isContainerField(field) {
  return !!field && /^column_\d+$/.test(field.type || "") && Array.isArray(field.columns);
}
function flattenFields(fields = []) {
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
export {
  COMMON_OPTION_KEYS as C,
  FIELD_TYPES as F,
  SECTION_ORDER as S,
  COUNTRIES as a,
  FIELD_TYPE_GROUPS as b,
  SECTION_TITLES as c,
  STYLE_BLOCKS as d,
  STYLE_GROUPS as e,
  createField as f,
  flattenFields as g,
  getAllFieldTypes as h,
  getCommonOptionKeys as i,
  getOptionsForFieldType as j,
  getStyleGroups as k,
  isContainerField as l
};
//# sourceMappingURL=fieldTypes-B4mkecXL.js.map
