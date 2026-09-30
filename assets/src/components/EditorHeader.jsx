import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';
import { _pg } from './adminData';
import NavMenu from './NavMenu';
import './editor-header.css';

/**
 * Dark top bar shared by the form editor and the form settings page:
 * back link, form title, Editor / Settings / Entries tabs, and page actions on the right.
 */
export default function EditorHeader({ formId, title, onTitleChange, active = 'editor', children }) {
  const withId = (url) => (formId ? `${url}&form_id=${formId}` : url);
  const tab = (key, label, href) => (key === active
    ? <button className="fg-editor-tab active" type="button">{label}</button>
    : <a className="fg-editor-tab" href={href}>{label}</a>);

  return (
    <header className="fg-editor-header">
      <div className="fg-editor-header-left">
        <NavMenu />
        <a className="fg-editor-back" href={_pg.all_forms}><FontAwesomeIcon icon={faArrowLeft} /> {__( 'Back', 'formglut' )}</a>
        <input
          className="fg-editor-title-input"
          value={title}
          readOnly={!onTitleChange}
          onChange={onTitleChange ? (e) => onTitleChange(e.target.value) : undefined}
          placeholder={__( 'Enter form title...', 'formglut' )}
        />
      </div>
      <div className="fg-editor-header-center">
        {tab('editor', __( 'Editor', 'formglut' ), formId ? `${_pg.editor}&form_id=${formId}` : _pg.editor)}
        {tab('settings', __( 'Settings', 'formglut' ), formId ? `${_pg.form_settings}&form_id=${formId}` : _pg.settings)}
        {tab('entries', __( 'Entries', 'formglut' ), withId(_pg.entries))}
      </div>
      <div className="fg-editor-header-right">{children}</div>
    </header>
  );
}
