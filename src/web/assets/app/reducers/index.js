'use strict';

import { combineReducers } from 'redux';
import * as types from '../api/ActionTypes';
import _ from 'lodash';

function categoryFilter(state = '', action) {
  switch (action.type) {
    case types.SET_CATEGORY_FILTER:
      return action.categoryId
    default:
      return state
  }
}

function products(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_PRODUCTS_LIST:
      return action.products
    default:
      return state
  }
}

function categories(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_CATEGORIES_LIST:
      return action.categories
    default:
      return state
  }
}

function cart(state = {}, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      var currentCart = _.cloneDeep(state);
      var product = _.cloneDeep(action.product);
      if (currentCart[product.id]) {
        currentCart[product.id].orderQuantity += 1;
      }
      else {
        currentCart[product.id] = product;
        currentCart[product.id].orderQuantity = 1;
      }
      return currentCart;
    case types.REMOVE_FROM_CART:
      var currentCart = _.cloneDeep(state);
      var product = _.cloneDeep(action.product);
      if (currentCart[product.id]) {
        currentCart[product.id].orderQuantity += 1;
        delete currentCart[product.id];
      }
      return currentCart;
    default:
      return state
  }
}

const app = combineReducers({
  categoryFilter,
  products,
  categories,
  cart
});

export default app;

export const getVisibleProducts = (products, categoryFilter) => {
  var visible = {};
  
  _.forEach(products, (product) => {
    if (!categoryFilter) {
      visible[product.id] = product;
    }
    if (product.categories && (product.categories.indexOf(categoryFilter) > -1)) {
      visible[product.id] = product;
    }
  });

  return visible;
};