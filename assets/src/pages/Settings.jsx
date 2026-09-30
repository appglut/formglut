import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Form, Input, InputNumber, Button, Switch, Select, Divider, message, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faEnvelope, faSliders, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';

const { TextArea } = Input;

// Configure message placement
message.config({
  duration: 3,
  maxCount: 3,
  top: 24,
  placement: 'top',
});

export default function Settings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(true);

  // Load settings on mount.
  useEffect(() => {
    const { ajax_url, nonce } = window.formglut_admin || {};

    const params = new URLSearchParams({
      action: 'formglut_get_settings',
      nonce: nonce,
    });

    fetch(`${ajax_url}?${params.toString()}`)
      .then((r) => r.json())
      .then((result) => {
        if (result.success && result.data.settings) {
          const s = result.data.settings;
          form.setFieldsValue({
            ajaxSubmit: s.formglut_ajax_submit === '1' || s.formglut_ajax_submit === true,
            defaultStatus: s.formglut_default_status || 'active',
            storeEntries: s.formglut_store_entries === '1' || s.formglut_store_entries === true,
            adminEmail: s.formglut_admin_email || '',
            senderName: s.formglut_sender_name || 'FormGlut',
            senderEmail: s.formglut_sender_email || '',
            emailSubject: s.formglut_email_subject || 'New form submission: {form_name}',
            recaptchaEnabled: s.formglut_recaptcha_enabled === '1' || s.formglut_recaptcha_enabled === true,
            recaptchaSiteKey: s.formglut_recaptcha_site_key || '',
            recaptchaSecretKey: s.formglut_recaptcha_secret_key || '',
            recaptchaVersion: s.formglut_recaptcha_version || 'v3',
            recaptchaScore: s.formglut_recaptcha_score !== undefined && s.formglut_recaptcha_score !== '' ? Number(s.formglut_recaptcha_score) : 0.5,
            hcaptchaSiteKey: s.formglut_hcaptcha_site_key || '',
            hcaptchaSecretKey: s.formglut_hcaptcha_secret_key || '',
            turnstileSiteKey: s.formglut_turnstile_site_key || '',
            turnstileSecretKey: s.formglut_turnstile_secret_key || '',
            successMessage: s.formglut_success_message || 'Thank you! Your submission has been received.',
            errorMessage: s.formglut_error_message || 'Something went wrong. Please try again.',
            deleteOnUninstall: s.formglut_delete_on_uninstall === '1' || s.formglut_delete_on_uninstall === true,
          });
        }
      })
      .catch(() => message.error(__( 'Failed to load settings.', 'formglut' )))
      .finally(() => setLoading(false));
  }, [form]);

  const onFinish = (values) => {
    const { ajax_url, nonce } = window.formglut_admin || {};

    // Map form field names to option keys.
    const settings = {
      formglut_ajax_submit: values.ajaxSubmit,
      formglut_default_status: values.defaultStatus,
      formglut_store_entries: values.storeEntries,
      formglut_admin_email: values.adminEmail,
      formglut_sender_name: values.senderName,
      formglut_sender_email: values.senderEmail,
      formglut_email_subject: values.emailSubject,
      formglut_honeypot: values.honeypot,
      formglut_recaptcha_enabled: values.recaptchaEnabled,
      formglut_recaptcha_site_key: values.recaptchaSiteKey,
      formglut_recaptcha_secret_key: values.recaptchaSecretKey,
      formglut_recaptcha_version: values.recaptchaVersion,
      formglut_recaptcha_score: values.recaptchaScore,
      formglut_hcaptcha_site_key: values.hcaptchaSiteKey,
      formglut_hcaptcha_secret_key: values.hcaptchaSecretKey,
      formglut_turnstile_site_key: values.turnstileSiteKey,
      formglut_turnstile_secret_key: values.turnstileSecretKey,
      formglut_success_message: values.successMessage,
      formglut_error_message: values.errorMessage,
      formglut_delete_on_uninstall: values.deleteOnUninstall,
    };

    const params = new URLSearchParams({
      action: 'formglut_save_settings',
      nonce: nonce,
      settings: JSON.stringify(settings),
    });

    fetch(ajax_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      credentials: 'same-origin',
    })
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          message.success(__( 'Settings saved!', 'formglut' ));
        } else {
          message.error(result.data?.message || __( 'Failed to save settings.', 'formglut' ));
        }
      })
      .catch(() => message.error(__( 'Network error. Please try again.', 'formglut' )));
  };

  if (loading) {
    return (
      <div>
        <Header activePage={__( 'Settings', 'formglut' )} />
        <div className="fg-content" style={{ textAlign: 'center', paddingTop: 80 }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header activePage={__( 'Settings', 'formglut' )} />
      <div className="fg-content">
        <div className="fg-settings-layout">
          <div className="fg-page-header">
            <div>
              <div className="fg-page-title">{__( 'Settings', 'formglut' )}</div>
              <div className="fg-page-subtitle">{__( 'Manage submissions, email notifications, spam protection and messages', 'formglut' )}</div>
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ajaxSubmit: true,
              adminEmail: '',
              defaultStatus: 'active',
              honeypot: true,
              recaptchaEnabled: false,
              recaptchaSiteKey: '',
              recaptchaSecretKey: '',
              recaptchaVersion: 'v3',
              recaptchaScore: 0.5,
              hcaptchaSiteKey: '',
              hcaptchaSecretKey: '',
              turnstileSiteKey: '',
              turnstileSecretKey: '',
              senderName: 'FormGlut',
              senderEmail: '',
              emailSubject: 'New form submission: {form_name}',
              successMessage: 'Thank you! Your submission has been received.',
              errorMessage: 'Something went wrong. Please try again.',
              storeEntries: true,
              deleteOnUninstall: false,
            }}
          >
            {/* General */}
            <div className="fg-card">
              <div className="fg-card-title">
                <FontAwesomeIcon icon={faSliders} style={{ marginRight: 10, color: '#e94560' }} />
                {__( 'General', 'formglut' )}
              </div>
              <Form.Item label={__( 'AJAX Form Submission', 'formglut' )} name="ajaxSubmit" valuePropName="checked">
                <Switch checkedChildren={__( 'On', 'formglut' )} unCheckedChildren={__( 'Off', 'formglut' )} />
              </Form.Item>
              <Form.Item label={__( 'Default Form Status', 'formglut' )} name="defaultStatus">
                <Select style={{ maxWidth: 280 }}>
                  <Select.Option value="active">{__( 'Active', 'formglut' )}</Select.Option>
                  <Select.Option value="draft">{__( 'Draft', 'formglut' )}</Select.Option>
                  <Select.Option value="closed">{__( 'Closed', 'formglut' )}</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={__( 'Store Form Submissions', 'formglut' )} name="storeEntries" valuePropName="checked">
                <Switch checkedChildren={__( 'On', 'formglut' )} unCheckedChildren={__( 'Off', 'formglut' )} />
              </Form.Item>
            </div>

            {/* Email Notifications */}
            <div className="fg-card">
              <div className="fg-card-title">
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 10, color: '#e94560' }} />
                {__( 'Email Notifications', 'formglut' )}
              </div>
              <Form.Item label={__( 'Admin Notification Email', 'formglut' )} name="adminEmail" rules={[{ type: 'email', message: __( 'Enter a valid email', 'formglut' ) }]}>
                <Input placeholder={__( 'admin@yoursite.com', 'formglut' )} style={{ maxWidth: 360 }} />
              </Form.Item>
              <Form.Item label={__( 'Sender Name', 'formglut' )} name="senderName">
                <Input placeholder={__( 'FormGlut', 'formglut' )} style={{ maxWidth: 280 }} />
              </Form.Item>
              <Form.Item label={__( 'Sender Email', 'formglut' )} name="senderEmail" rules={[{ type: 'email', message: __( 'Enter a valid email', 'formglut' ) }]}>
                <Input placeholder={__( 'noreply@yoursite.com', 'formglut' )} style={{ maxWidth: 360 }} />
              </Form.Item>
              <Form.Item label={__( 'Email Subject Template', 'formglut' )} name="emailSubject">
                <Input placeholder={__( 'New form submission: {form_name}', 'formglut' )} style={{ maxWidth: 480 }} />
              </Form.Item>
            </div>

            {/* Spam Protection */}
            <div className="fg-card">
              <div className="fg-card-title">
                <FontAwesomeIcon icon={faShieldHalved} style={{ marginRight: 10, color: '#e94560' }} />
                {__( 'Spam Protection', 'formglut' )}
              </div>
              <Form.Item label={__( 'Enable Honeypot', 'formglut' )} name="honeypot" valuePropName="checked">
                <Switch checkedChildren={__( 'On', 'formglut' )} unCheckedChildren={__( 'Off', 'formglut' )} />
              </Form.Item>
              <div className="fg-settings-hint">{__( 'Add a reCAPTCHA, hCaptcha or Turnstile field to a form in the editor (Security Fields) to protect it. Enter the keys for the services you use below.', 'formglut' )}</div>

              <Divider orientation="left" orientationMargin={0} style={{ margin: '20px 0 16px' }}>{__( 'Google reCAPTCHA', 'formglut' )}</Divider>
              <Form.Item label={__( 'Version', 'formglut' )} name="recaptchaVersion" extra={__( 'Keys are tied to a version — use keys created for the version you pick.', 'formglut' )}>
                <Select style={{ maxWidth: 480 }} options={[
                  { value: 'v3', label: __( 'reCAPTCHA v3 (invisible, score based)', 'formglut' ) },
                  { value: 'v2', label: __( 'reCAPTCHA v2 ("I\'m not a robot" checkbox)', 'formglut' ) },
                ]} />
              </Form.Item>
              <Form.Item label={__( 'Site Key', 'formglut' )} name="recaptchaSiteKey">
                <Input placeholder={__( 'Enter your site key', 'formglut' )} style={{ maxWidth: 480 }} />
              </Form.Item>
              <Form.Item label={__( 'Secret Key', 'formglut' )} name="recaptchaSecretKey">
                <Input.Password placeholder={__( 'Enter your secret key', 'formglut' )} style={{ maxWidth: 480 }} />
              </Form.Item>
              <Form.Item noStyle shouldUpdate={(a, b) => a.recaptchaVersion !== b.recaptchaVersion}>
                {({ getFieldValue }) => getFieldValue('recaptchaVersion') !== 'v2' && (
                  <>
                    <Form.Item label={__( 'Minimum Score', 'formglut' )} name="recaptchaScore" extra={__( '0.0 (likely bot) to 1.0 (likely human). Submissions below this score are rejected.', 'formglut' )}>
                      <InputNumber min={0} max={1} step={0.1} style={{ width: 120 }} />
                    </Form.Item>
                    <Form.Item label={__( 'Protect Every Form', 'formglut' )} name="recaptchaEnabled" valuePropName="checked" extra={__( 'Run reCAPTCHA v3 on all forms, even those without a reCAPTCHA field.', 'formglut' )}>
                      <Switch checkedChildren={__( 'On', 'formglut' )} unCheckedChildren={__( 'Off', 'formglut' )} />
                    </Form.Item>
                  </>
                )}
              </Form.Item>

              <Divider orientation="left" orientationMargin={0} style={{ margin: '20px 0 16px' }}>{__( 'hCaptcha', 'formglut' )}</Divider>
              <Form.Item label={__( 'Site Key', 'formglut' )} name="hcaptchaSiteKey">
                <Input placeholder={__( 'Enter your site key', 'formglut' )} style={{ maxWidth: 480 }} />
              </Form.Item>
              <Form.Item label={__( 'Secret Key', 'formglut' )} name="hcaptchaSecretKey">
                <Input.Password placeholder={__( 'Enter your secret key', 'formglut' )} style={{ maxWidth: 480 }} />
              </Form.Item>

              <Divider orientation="left" orientationMargin={0} style={{ margin: '20px 0 16px' }}>{__( 'Cloudflare Turnstile', 'formglut' )}</Divider>
              <Form.Item label={__( 'Site Key', 'formglut' )} name="turnstileSiteKey">
                <Input placeholder={__( 'Enter your site key', 'formglut' )} style={{ maxWidth: 480 }} />
              </Form.Item>
              <Form.Item label={__( 'Secret Key', 'formglut' )} name="turnstileSecretKey">
                <Input.Password placeholder={__( 'Enter your secret key', 'formglut' )} style={{ maxWidth: 480 }} />
              </Form.Item>
            </div>

            {/* Messages */}
            <div className="fg-card">
              <div className="fg-card-title">
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 10, color: '#e94560' }} />
                {__( 'User Messages', 'formglut' )}
              </div>
              <Form.Item label={__( 'Success Message', 'formglut' )} name="successMessage">
                <TextArea rows={2} placeholder={__( 'Thank you! Your submission has been received.', 'formglut' )} style={{ maxWidth: 520 }} />
              </Form.Item>
              <Form.Item label={__( 'Error Message', 'formglut' )} name="errorMessage">
                <TextArea rows={2} placeholder={__( 'Something went wrong. Please try again.', 'formglut' )} style={{ maxWidth: 520 }} />
              </Form.Item>
            </div>

            {/* Advanced */}
            <div className="fg-card">
              <div className="fg-card-title">
                <FontAwesomeIcon icon={faSliders} style={{ marginRight: 10, color: '#e94560' }} />
                {__( 'Advanced', 'formglut' )}
              </div>
              <Form.Item label={__( 'Delete Data on Uninstall', 'formglut' )} name="deleteOnUninstall" valuePropName="checked">
                <Switch checkedChildren={__( 'On', 'formglut' )} unCheckedChildren={__( 'Off', 'formglut' )} />
              </Form.Item>
            </div>

            <Form.Item style={{ marginTop: 8, marginBottom: 32 }}>
              <Button type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faFloppyDisk} />} style={{ background: '#e94560', borderColor: '#e94560', height: 42, borderRadius: 8, fontWeight: 600, paddingInline: 28, fontSize: 14 }}>
                {__( 'Save Settings', 'formglut' )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
