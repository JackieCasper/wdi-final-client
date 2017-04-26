import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Router from './router'
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    { Router }
  </Provider>,
  document.getElementById('root')
);
