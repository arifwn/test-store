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

export const checkout = () => (dispatch, getState) => {
  const { user, cart, coupon } = getState()

  shop.createOrder(user.id, coupon, cart)
    .then((order) => {
      dispatch({
        type: types.CHECKOUT_SUCCESS,
        order: order
      })
      dispatch({
        type: types.EMPTY_CART,
      })

      setTimeout(() => {
        alert('Checkout completed. Press OK to proceed to payment confirmation.')
        window.location = '/order/' + order.id + '/'
      }, 0);
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.CHECKOUT_FAILURE, cart })
    })
}

export const submitProof = (order, proof) => (dispatch, getState) => {
  const { user, cart, coupon } = getState()

  shop.submitProof(order, proof)
    .then((order) => {
      setTimeout(() => {
        alert('Your payment proof has been submitted. We will process the order as soon as we confirm the order validity.')
        window.location.reload()
      }, 0);
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


export const getAllOrders = () => (dispatch, getState) => {
  shop.getOrders()
    .then(orders => {
      dispatch({
        type: types.UPDATE_ORDERS_LIST,
        orders: orders
      })
    });
}


export const getCurrentUser = () => (dispatch, getState) => {
  shop.getCurrentUser()
    .then(user => {
      dispatch({
        type: types.UPDATE_CURRENT_USER,
        user: user
      })
    });
}


export const getCoupon = code  => (dispatch, getState) => {
  shop.getCoupon(code)
    .then(coupon => {
      dispatch({
        type: types.UPDATE_COUPON,
        coupon: coupon
      })
    });
}


export const setCategoryFilter = categoryId => (dispatch, getState) => {
  dispatch({
    type: types.SET_CATEGORY_FILTER,
    categoryId: categoryId
  })
}
