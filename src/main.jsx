import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Approutes';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <AppRoutes />
  </Router>
);
