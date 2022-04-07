import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import thunk from 'redux-thunk';

import ReactDOM from 'react-dom/client';

import App from './App';
import reducers from './reducers/index';

import './index.css';

const container = document.getElementById('root');

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
