import React, { useState } from 'react';
import { Modal, Input, Select, Switch, Button } from 'antd';
import { __ } from '@wordpress/i18n';
import { COUNTRIES } from './countries.js';

const slug = (t) => t.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

/** Ready-made lists: one choice per line. */
const PRESETS = {
  countries: { label: __( 'Countries', 'formglut' ), lines: () => Object.entries(COUNTRIES).map(([code, name]) => `${name}|${code}`) },
  us_states: { label: __( 'US states', 'formglut' ), lines: () => ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'] },
  months: { label: __( 'Months', 'formglut' ), lines: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
  days: { label: __( 'Days of the week', 'formglut' ), lines: () => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
  numbers: { label: __( 'Numbers 1–10', 'formglut' ), lines: () => Array.from({ length: 10 }, (_, i) => String(i + 1)) },
  yesno: { label: __( 'Yes / No', 'formglut' ), lines: () => [__( 'Yes', 'formglut' ), __( 'No', 'formglut' )] },
  agree: { label: __( 'Agreement scale', 'formglut' ), lines: () => [__( 'Strongly disagree', 'formglut' ), __( 'Disagree', 'formglut' ), __( 'Neutral', 'formglut' ), __( 'Agree', 'formglut' ), __( 'Strongly agree', 'formglut' )] },
  satisfaction: { label: __( 'Satisfaction scale', 'formglut' ), lines: () => [__( 'Very unsatisfied', 'formglut' ), __( 'Unsatisfied', 'formglut' ), __( 'Neutral', 'formglut' ), __( 'Satisfied', 'formglut' ), __( 'Very satisfied', 'formglut' )] },
  age: { label: __( 'Age ranges', 'formglut' ), lines: () => ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'] },
};

/** Turn "Label|value" lines into options. Without "|value" the value is made from the label. */
export function parseChoices(text) {
  return text.split('\n').map((l) => l.trim()).filter(Boolean).map((line) => {
    const i = line.lastIndexOf('|');
    const label = (i > 0 ? line.slice(0, i) : line).trim();
    const value = (i > 0 ? line.slice(i + 1) : '').trim() || slug(label) || label;
    return { label, value };
  });
}

/** "Bulk add" button + dialog for the choice editor. */
export default function BulkChoices({ options = [], onApply }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [replace, setReplace] = useState(true);

  const openDialog = () => {
    setText(options.map((o) => (o.value && o.value !== slug(o.label) ? `${o.label}|${o.value}` : o.label)).join('\n'));
    setReplace(true);
    setOpen(true);
  };
  const apply = () => {
    const parsed = parseChoices(text);
    if (!parsed.length) return;
    onApply(replace ? parsed : [...options, ...parsed]);
    setOpen(false);
  };
  const count = parseChoices(text).length;

  return (
    <>
      <Button size="small" onClick={openDialog} style={{ width: '100%', marginTop: 6 }}>{__( 'Bulk add / presets', 'formglut' )}</Button>
      <Modal
        open={open}
        title={__( 'Bulk add choices', 'formglut' )}
        onCancel={() => setOpen(false)}
        onOk={apply}
        okText={replace ? __( 'Replace choices', 'formglut' ) : __( 'Add choices', 'formglut' )}
        okButtonProps={{ disabled: !count, style: { background: '#e94560', borderColor: '#e94560' } }}
        width={520}
      >
        <p style={{ color: '#64748b', marginTop: 0 }}>{__( 'One choice per line. To save a different value, write Label|value.', 'formglut' )}</p>
        <Select
          placeholder={__( 'Insert a preset list…', 'formglut' )}
          style={{ width: '100%', marginBottom: 10 }}
          value={null}
          options={Object.entries(PRESETS).map(([k, p]) => ({ value: k, label: p.label }))}
          onChange={(k) => setText(PRESETS[k].lines().join('\n'))}
        />
        <Input.TextArea rows={10} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12.5 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ fontSize: 12.5, color: '#64748b' }}>{count} {__( 'choices', 'formglut' )}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <Switch size="small" checked={replace} onChange={setReplace} /> {__( 'Replace existing choices', 'formglut' )}
          </span>
        </div>
      </Modal>
    </>
  );
}
