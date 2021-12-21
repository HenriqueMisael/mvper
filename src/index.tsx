import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';
import { Provider } from 'react-redux';
import { enableMapSet } from 'immer';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';
import './index.scss';

FocusStyleManager.onlyShowFocusOnTabs();
enableMapSet();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
