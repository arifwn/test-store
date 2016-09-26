'use strict';

import shop from '../api/shop';
import * as types from '../api/ActionTypes';

export const addToCart = product => (dispatch, getState) => {
  console.log('addToCart', product);

  dispatch({
    type: types.ADD_TO_CART,
    product: product
  })
}

export const removeFromCart = product => (dispatch, getState) => {
  console.log('removeFromCart', product);

  dispatch({
    type: types.REMOVE_FROM_CART,
    product: product
  })
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}

export const getAllProducts = () => (dispatch, getState) => {
  shop.getProducts()
    .then(products => {
      dispatch({
        type: types.UPDATE_PRODUCTS_LIST,
        products: products
      })
    });
}

export const getAllCategories = () => (dispatch, getState) => {
  shop.getCategories()
    .then(categories => {
      dispatch({
        type: types.UPDATE_CATEGORIES_LIST,
        categories: categories
      })
    });
}


export const setCategoryFilter = categoryId => (dispatch, getState) => {
  dispatch({
    type: types.SET_CATEGORY_FILTER,
    categoryId: categoryId
  })
}
