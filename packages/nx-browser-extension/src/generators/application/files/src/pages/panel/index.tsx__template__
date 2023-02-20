import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import DeveloperToolsPanel from '../../components/DeveloperToolsPanel/DeveloperToolsPanel';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<DeveloperToolsPanel />);
}

init();
