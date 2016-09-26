'use strict';

import _ from 'lodash';

var data = {};

// var dummy = require("json!../../../store/fixtures/dummy.json");

// _.forEach(dummy, (item) => {
//   if (!data[item.model]) data[item.model] = {};
//   var itemData = item.fields;
//   itemData.id = item.pk;
//   data[item.model][item.pk] = itemData;
// });

console.log(data);

const TIMEOUT = 100;

var getCSRFToken = function () {
  return document.querySelector("[name=csrfmiddlewaretoken]").attributes.value.value;
}

export default {
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
    });
    return promise;
  },
  getCategories: () => {
    var promise = new Promise((resolve, reject) => {
      // setTimeout(() => resolve(data['store.productcategory']), TIMEOUT);
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
    });
    return promise;
  },
  getOrders: () => {
    var promise = new Promise((resolve, reject) => {
      // setTimeout(() => resolve(data['store.order']), TIMEOUT);
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
    });
    return promise;
  },
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
