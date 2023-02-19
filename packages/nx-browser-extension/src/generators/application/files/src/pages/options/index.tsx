import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import OptionsPage from '../../components/OptionsPage/OptionsPage';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<OptionsPage />);
}

init();
