
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';


const middleware = [ thunk, createLogger() ];

export const datastore = createStore(
  reducer,
  applyMiddleware(...middleware)
);


