import React from 'react';
import { __ } from '@wordpress/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const _pg = (typeof formglut_admin !== 'undefined' && formglut_admin.pages)
  ? formglut_admin.pages
  : { all_forms: 'all-forms.html', editor: 'form-editor.html', entries: 'entries.html', settings: 'settings.html', entry_detail: 'single-entry.html', preview: 'preview.html' };

const _dashboard = (typeof formglut_admin !== 'undefined' && formglut_admin.dashboard_url)
  ? formglut_admin.dashboard_url
  : '/wp-admin/';

export { _pg };

const _pluginUrl = (typeof formglut_admin !== 'undefined' && formglut_admin.plugin_url)
  ? formglut_admin.plugin_url
  : '';

export default function Header({ nav, activePage }) {
  const items = [
    { label: __( 'Forms', 'formglut' ), href: _pg.all_forms },
    { label: __( 'Entries', 'formglut' ), href: _pg.entries },
    { label: __( 'Settings', 'formglut' ), href: _pg.settings },
  ].map((n) => {
    if (n.label === activePage) n.active = true;
    return n;
  }).concat(nav || []);

  return (
    <header className="fg-header">
      <div className="fg-header-left">
        <a href={_dashboard} className="fg-header-back" title={__( 'Back to WordPress Admin', 'formglut' )}>
         <span style={{ marginTop: '0.5px' }}><FontAwesomeIcon icon={faChevronLeft} /></span>
          <FontAwesomeIcon icon={faHouse} />
        </a>
        <img src={_pluginUrl + 'global-assets/images/formglut-logo.svg'} alt="FormGlut" className="fg-logo-img" />
      </div>
      <nav className="fg-header-nav">
        {items.map((n) => (
          <a key={n.label} href={n.href} className={n.active ? 'active' : ''}>{n.label}</a>
        ))}
      </nav>
    </header>
  );
}
