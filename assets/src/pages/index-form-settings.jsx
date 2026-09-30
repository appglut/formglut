import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import FormSettingsPage from './FormSettingsPage';

createRoot(document.getElementById('formglut-root')).render(<FormSettingsPage />);
