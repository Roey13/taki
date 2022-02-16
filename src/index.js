import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { App } from './App';
import './assets/styles/main.scss';
import { store } from './store/store'
import {HashRouter as Router } from 'react-router-dom'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
