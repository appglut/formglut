import React from 'react';
import { __ } from '@wordpress/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { _pg, _dashboard, _pluginUrl } from './adminData';
import NavMenu from './NavMenu';

export { _pg };

/**
 * Top bar of the list pages (Forms, Entries, Settings). Same look and menu button as the
 * form editor / form settings header (see EditorHeader).
 */
export default function Header({ nav, activePage }) {
  const items = [
    { label: __( 'Forms', 'formglut' ), href: _pg.all_forms },
    { label: __( 'Entries', 'formglut' ), href: _pg.entries },
    { label: __( 'Global Settings', 'formglut' ), href: _pg.settings },
  ].map((n) => {
    if (n.label === activePage) n.active = true;
    return n;
  }).concat(nav || []);

  return (
    <header className="fg-header">
      <div className="fg-header-left">
        <NavMenu />
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
      <div className="fg-header-right" />
    </header>
  );
}
