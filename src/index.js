import React from 'react';
import App from './App';
import { icons } from './assets/icons';

import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import 'core-js';

React.icons = icons;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
