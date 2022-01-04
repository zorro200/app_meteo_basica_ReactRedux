import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store';
import ActualInfo from './components/ActualInfo.jsx';
import FuturePrevision from './components/FuturePrevision.jsx';
import './style.css';

ReactDOM.render(
  <Provider store={store}>
    <ActualInfo />
    <FuturePrevision />
  </Provider>,
  document.getElementById('root')
);
