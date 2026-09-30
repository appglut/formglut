import React, { useState } from 'react';
import { Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faPlus, faInbox, faGear, faStar, faToolbox, faHouse } from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';
import { _pg, _dashboard, _pluginUrl } from './adminData';
import './app-header.css';

/**
 * Three-bar button for the left of every header. Opens a side menu with the main FormGlut pages.
 */
export default function NavMenu() {
  const [open, setOpen] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') || '';
  const hasForm = !!params.get('form_id');

  // Which menu entry is current for this page.
  const current = {
    'formglut-all-forms': 'forms',
    'formglut-editor': hasForm ? 'forms' : 'new',
    'formglut-form-settings': 'forms',
    'formglut-entries': 'entries',
    'formglut-entry-detail': 'entries',
    'formglut-settings': 'settings',
    'formglut-data-logs': 'tools',
    'formglut-pro-features': 'pro',
  }[page] || '';

  const items = [
    { key: 'forms', label: __( 'All Forms', 'formglut' ), icon: faFileLines, href: _pg.all_forms },
    { key: 'new', label: __( 'Add New Form', 'formglut' ), icon: faPlus, href: _pg.editor },
    { key: 'entries', label: __( 'Entries', 'formglut' ), icon: faInbox, href: _pg.entries },
    { key: 'tools', label: __( 'Data & Logs', 'formglut' ), icon: faToolbox, href: _pg.tools },
    { key: 'settings', label: __( 'Global Settings', 'formglut' ), icon: faGear, href: _pg.settings },
    { key: 'pro', label: __( 'Pro Features', 'formglut' ), icon: faStar, href: _pg.pro_features },
  ].filter((i) => i.href);

  return (
    <>
      <button type="button" className="fg-hamburger" aria-label={__( 'Open menu', 'formglut' )} aria-expanded={open} onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        width={280}
        closable
        title={<img src={_pluginUrl + 'global-assets/images/formglut-logo.svg'} alt="FormGlut" className="fg-drawer-logo" />}
        rootClassName="fg-nav-drawer"
        styles={{ body: { padding: '12px 0' }, header: { background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)', borderBottom: 0 } }}
      >
        <nav className="fg-nav-list">
          {items.map((i) => (
            <a key={i.key} href={i.href} className={i.key === current ? 'active' : ''}>
              <span className="ic"><FontAwesomeIcon icon={i.icon} /></span>
              {i.label}
            </a>
          ))}
        </nav>
        <div className="fg-nav-foot">
          <a href={_dashboard}><span className="ic"><FontAwesomeIcon icon={faHouse} /></span>{__( 'WordPress Dashboard', 'formglut' )}</a>
        </div>
      </Drawer>
    </>
  );
}
