
import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './App';
import FrontPage from './views/FrontPage';
import About from './views/About';
import NotFound from './views/NotFound';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={FrontPage} />
      <Route path="about" component={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('react-app'))
