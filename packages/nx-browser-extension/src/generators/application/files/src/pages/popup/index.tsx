import React from 'react';

import { createRoot } from 'react-dom/client';
import './index.css';
import WelcomePage from '../../components/WelcomePage/WelcomePage.tsx__template__';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<WelcomePage />);
}

init();
