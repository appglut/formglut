# Fluent Forms — Complete Feature List

> Plugin Path: `/fluentform/`
> Source: Directory analysis of installed plugin files

---

## Free Version Features

### Form Builder

- Drag & drop visual form builder
- Undo / redo with full edit history
- AI form builder — generate forms from natural language descriptions
- Gutenberg block integration (Form Styler)
- Column layouts — 1 to 6 columns
- Form scheduling & access restrictions (time-based, user-based)
- Conversational forms — one question at a time for higher completion rates
- Export / import forms for backup and migration
- Reusable form templates
- Role manager — control access by user role
- Form analytics & visual reports (basic)
- REST API for developers
- CLI commands for management
- Lightweight frontend (~30KB)

### Input Fields (25+)

| Field | Description |
|---|---|
| Name Fields | First, Last, Full Name |
| Email | Email address input |
| Simple Text | Single-line text |
| Mask Input | Formatted input (phone, SSN, etc.) |
| Text Area | Multi-line text |
| Address Fields | Street, City, State, ZIP, Country |
| Country List | Dropdown of countries |
| Numeric Field | Numbers only |
| Dropdown | Select from list |
| Radio Field | Single choice from options |
| Checkbox | Multiple choice from options |
| Multiple Choice | Multi-select |
| Website URL | URL input with validation |
| Date Picker | Calendar date selection |
| Time Picker | Time selection |
| Custom HTML | Arbitrary HTML content |
| Hidden Field | Hidden data passing |
| Section Break | Visual section divider |
| reCAPTCHA | Google reCAPTCHA v2/v3 |
| hCaptcha | hCaptcha bot protection |
| Turnstile | Cloudflare Turnstile |
| Terms & Conditions | Agreement checkbox |
| GDPR Agreement | Privacy consent checkbox |
| Password | Password input |
| Custom Submit Button | Customizable submit button |

### Free Templates (18)

- Contact Form
- Support Form
- Event Registration Form
- Vendor Contact Form
- Patient Intake Form
- Volunteer Application Form
- Request for Quote Form
- Conference Proposal Form
- Report a Bug Form
- Polling Form
- Tell A Friend Form
- My Directory Information Form
- Request for Leave Form
- Admissions Form
- Loan Application Form
- Job Listing Form
- Website Feedback Form
- Comment & Rating Form

### Entry Management

- View entry details
- Filter & search entries
- Export entries to CSV, Excel, ODS, JSON
- Form finder — search across forms
- Entry details viewer

### Payment (Limited)

- Stripe integration (with 1.9% transaction fee)
- Basic subscription / recurring payment support
- Payment items and custom amounts
- Item quantity

### Notifications

- Email notifications (admin & user)
- Smart email routing — conditional email sending

### Security

- Honeypot spam protection
- IP restriction / geo-location based access
- Token-based form submission security
- reCAPTCHA / hCaptcha / Turnstile bot protection

### Free Integrations

| Integration | Purpose |
|---|---|
| FluentCRM | Email marketing & CRM |
| FluentSupport | Helpdesk & ticketing |
| FluentSMTP | Email delivery |
| FluentBoards | Project management |
| FluentBooking | Appointment scheduling |
| Ninja Tables | Data tables display |
| WP Social Ninja | Social media integration |
| Fluent Forms PDF Generator | PDF creation from entries |
| MailChimp | Email list management |
| Slack | Team notifications |
| Mautic | Marketing automation |
| MailPoet | Email newsletters |

### Migration Tools

- Import from WPForms
- Import from Contact Form 7
- Import from Gravity Forms
- Import from Ninja Forms
- Import from Caldera Forms

---

## Pro Version Features

### Additional Input Fields (30+ more — 55+ total)

| Field | Description |
|---|---|
| File Upload | Image and file uploads |
| Image Upload | Image-specific upload field |
| Phone / Mobile | Advanced phone number handling |
| Rating | Star rating input |
| Net Promoter Score (NPS) | 0–10 satisfaction score |
| Range Slider | Interactive range selection |
| Checkable Grid | Matrix / grid-style inputs |
| Chained Select | Dependent / cascading dropdowns |
| Color Picker | Color selection widget |
| Rich Text | WYSIWYG editor input |
| Shortcode | Dynamic content via shortcodes |
| Action Hook | Custom integration hook point |
| Repeat Field | Duplicate field groups |
| Container Repeater | Repeating sections |
| Dynamic Fields | Content changes based on conditions |
| Accordion / Tab | Collapsible content sections |
| Quiz Score | Grading and scoring fields |
| Coupon Field | Discount code input |
| Post Title | Create post title from form |
| Post Content | Create post content from form |
| Post Excerpt | Create post excerpt from form |
| Featured Image | Upload featured image for post |
| Post Categories | Category selection for post |
| Post Tags | Tag selection for post |
| Post Formats | Format selection for post |
| Save & Resume | Save progress and return later |

### Pro Templates

- User Registration Form
- Donation Form
- Payment Form
- Subscription Payments Form

### Advanced Form Features

- **Multi-step Forms** — wizard-style forms across multiple pages
- **Numeric Calculations** — BMI, mortgage, tax, and custom calculators
- **Quiz & Survey Module** — create quizzes and surveys with scoring
- **Inventory Management** — track and limit available quantities
- **Landing Pages** — dedicated standalone form pages
- **Save & Resume** — users can save progress and return later
- **Address Autocomplete** — Google Maps powered address suggestions
- **Dynamic Field Population** — pre-fill fields from URL params or queries
- **Double Opt-in** — email verification before submission is finalized
- **Admin Approval Workflow** — manual review before entry is accepted
- **Auto-delete Entries** — scheduled automatic data cleanup
- **SMS Notifications** — text message alerts via ClickSend
- **User Registration** — create WordPress user accounts from form submissions
- **Advanced Post / CPT Creation** — full custom post type creation from forms
- **Conditional Confirmation Messages** — custom responses based on conditions
- **Advanced Form Validation** — complex multi-field validation rules
- **Geo-location Provider** — enhanced location services

### Payment Gateways (No Transaction Fee)

| Gateway | Type |
|---|---|
| Stripe | Credit cards, Apple Pay, Google Pay |
| PayPal | PayPal checkout |
| Razorpay | India-focused payments |
| Paddle | Software / SaaS payments |
| Square | POS and online payments |
| Paystack | Africa-focused payments |
| Mollie | European payments |
| Authorize.net | Enterprise payment processing |

### Pro Integrations (60+)

#### CRM Systems

- ActiveCampaign
- amoCRM
- HubSpot
- Zoho CRM
- Salesforce
- Insightly
- Pipedrive

#### Email Marketing

- Brevo (SendInBlue)
- Campaign Monitor
- Constant Contact
- ConvertKit
- Drip
- GetResponse
- MailerLite
- Mailjet
- Mailster
- iContact
- CleverReach
- MooSend
- SendFox
- Automizy

#### Productivity & Database

- Trello
- Notion
- Airtable
- Google Sheets

#### Communication

- Discord
- Telegram
- ClickSend (SMS)

#### Marketing & Automation

- Gist
- Platformly
- Zapier (connects to 1000+ apps)
- WebHooks

#### AI

- ChatGPT integration

#### E-commerce

- AffiliateWP

### Advanced Reporting & Analytics

- Advanced analytics dashboard
- Submission analytics by country / geography
- Subscription analytics & payment trend analysis
- Partial entry tracking (abandoned forms)
- Import form entries from external sources
- Advanced search filters
- Visual report builder

---

## Technical Features (Both Versions)

- Mobile responsive — works on all devices
- WCAG accessibility compliant
- WPML & Polylang multilingual ready
- REST API for external integration
- CLI commands for server-side management
- Extensive developer hooks and filters
- Lightweight frontend (~30KB footprint)
- Database optimized queries
- Regular security updates
- GDPR compliant data handling

---

## Free vs Pro — Quick Comparison

| Feature | Free | Pro |
|---|:---:|:---:|
| Input field types | 25+ | 55+ |
| Drag & drop builder | Yes | Yes |
| Conditional logic | Yes | Yes |
| Conversational forms | Yes | Yes |
| AI form builder | Yes | Yes |
| Multi-step forms | No | Yes |
| File uploads | No | Yes |
| Quiz & survey | No | Yes |
| Numeric calculations | No | Yes |
| Landing pages | No | Yes |
| Save & resume | No | Yes |
| User registration | No | Yes |
| Post creation | No | Yes |
| Stripe payments | Yes (1.9% fee) | Yes (no fee) |
| Other payment gateways | No | Yes |
| Integrations | ~12 | 60+ |
| SMS notifications | No | Yes |
| Advanced reporting | Basic | Full |
| Templates | 18 | 22+ |
| Migration tools | Yes | Yes |
| Support | Community | Priority |
