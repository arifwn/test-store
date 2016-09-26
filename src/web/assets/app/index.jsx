'use strict';

import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux'

import { getAllProducts, getAllCategories } from './actions';

import App from './containers/App';
import FrontPage from './containers/FrontPage';
import About from './containers/About';
import Cart from './containers/Cart';
import NotFound from './containers/NotFound';

const middleware = [ thunk, createLogger() ];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

store.dispatch(getAllProducts());
store.dispatch(getAllCategories());

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={FrontPage} />
        <Route path="cart" component={Cart}/>
        <Route path="about" component={About}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('react-app'))
