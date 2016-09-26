'use strict';

import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'



import { Provider } from 'react-redux'

import { getAllProducts, getAllCategories, getAllOrders, getCurrentUser } from './actions';

import App from './containers/App';
import FrontPage from './containers/FrontPage';
import About from './containers/About';
import Cart from './containers/Cart';
import Orders from './containers/Orders';
import OrderDetail from './containers/OrderDetail';
import NotFound from './containers/NotFound';

import { datastore } from './datastore';

datastore.dispatch(getAllProducts());
datastore.dispatch(getAllCategories());
datastore.dispatch(getAllOrders());
datastore.dispatch(getCurrentUser());

render((
  <Provider store={datastore}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={FrontPage} />
        <Route path="/cart" component={Cart}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/order/:orderId/" component={OrderDetail}/>
        <Route path="/about" component={About}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('react-app'))
