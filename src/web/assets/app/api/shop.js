'use strict';

import _ from 'lodash';

var data = {};

var dummy = require("json!../../../store/fixtures/dummy.json");

_.forEach(dummy, (item) => {
  if (!data[item.model]) data[item.model] = {};
  var itemData = item.fields;
  itemData.id = item.pk;
  data[item.model][item.pk] = itemData;
});

console.log(data);

const TIMEOUT = 100;

export default {
  getProducts: () => {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(data['store.product']), TIMEOUT);
    });
    return promise;
  },
  getCategories: () => {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(data['store.productcategory']), TIMEOUT);
    });
    return promise;
  },
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
