'use strict';

import _ from 'lodash';
import moment from 'moment';


const getCSRFToken = () => {
  return document.querySelector("[name=csrfmiddlewaretoken]").attributes.value.value;
}

export default {
  getCurrentUser: () => {
    var promise = new Promise((resolve, reject) => {
      fetch('/api/v1/users/' + USER_ID + '/', {
        credentials: 'same-origin'
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    });
    return promise;
  },
  getCoupon: (code) => {
    var promise = new Promise((resolve, reject) => {
      fetch('/api/v1/coupons/?code=' + code + '/', {
        credentials: 'same-origin'
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    });
    return promise;
  },
  getCurrentUser: () => {
    var promise = new Promise((resolve, reject) => {
      fetch('/api/v1/users/' + USER_ID + '/', {
        credentials: 'same-origin'
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    });
    return promise;
  },
  getProducts: () => {
    var promise = new Promise((resolve, reject) => {
      fetch('/api/v1/products/', {
        credentials: 'same-origin'
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          var data = {};
          _.forEach(response.results, item => {
            data[item.id] = item;
          })
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    });
    return promise;
  },
  getCategories: () => {
    var promise = new Promise((resolve, reject) => {
      fetch('/api/v1/product-categories/', {
        credentials: 'same-origin'
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          var data = {};
          _.forEach(response.results, item => {
            data[item.id] = item;
          })
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    });
    return promise;
  },
  getOrders: () => {
    var promise = new Promise((resolve, reject) => {
      fetch('/api/v1/orders/', {
        credentials: 'same-origin'
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          var data = {};
          _.forEach(response.results, item => {
            data[item.id] = item;
          })
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    });
    return promise;
  },
  createOrder: (userId, coupon, cart) => {
    var promise = new Promise((resolve, reject) => {
      var now = moment().toISOString();

      var request = new Request('/api/v1/orders/', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': getCSRFToken()
        }),
        body: JSON.stringify({
          checkout_date: now,
          user: userId,
        })
      });
      fetch(request)
        .then(response => {
          return response.json();
        })
        .then(response => {
          
          var promises = [Promise.resolve(response)];

          _.forEach(cart, item => {
            var r = new Request('/api/v1/order-items/', {
              method: 'POST', 
              credentials: 'same-origin',
              headers: new Headers({
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': getCSRFToken()
              }),
              body: JSON.stringify({
                product: item.id,
                user: userId,
                quantity: item.orderQuantity,
                order: response.id
              })
            });

            promises.push(fetch(r))
          })
          return Promise.all(promises);
        })
        .then(values => {
          resolve(values[0]);
        })
        .catch(error => {
          reject(error);
        })
    });
    return promise;
  },
  submitProof: (order, proof) => {
    var promise = new Promise((resolve, reject) => {
      var now = moment().toISOString();

      var request = new Request('/api/v1/orders/' + order.id + '/', {
        method: 'PUT', 
        credentials: 'same-origin',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': getCSRFToken()
        }),
        body: JSON.stringify({
          payment_proof: proof,
          checkout_date: order.checkout_date,
          user: order.user,
          coupon: order.coupon,
          status: order.status
        })
      });

      fetch(request)
        .then(response => {
          return response.json();
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error);
        })
    });
    return promise;
  }
}
