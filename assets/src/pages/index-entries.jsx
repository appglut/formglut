import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import Entries from './Entries';

createRoot(document.getElementById('formglut-root')).render(<Entries />);
