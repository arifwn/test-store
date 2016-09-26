'use strict';

import React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';

import { addToCart } from '../actions';
import shop from '../api/shop';

import { getVisibleProducts } from '../reducers';

import ProductItem from './ProductItem';

var ProductList = React.createClass({
  getTitle: function () {
    var title = this.props.category && this.props.categories[this.props.category] ? this.props.categories[this.props.category].name : 'All items';
    return (<h2>{title}</h2>)
  },
  render: function(){
    return (
      <div className="ProductList">
        {this.getTitle()}
        {_.map(this.props.products, product =>
          <ProductItem
            key={product.id}
            product={product}
            onAddToCartClicked={() => this.props.addToCart(product)} />
        )}
      </div>
    );
  }
})

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products, state.categoryFilter),
  category: state.categoryFilter,
  categories: state.categories
})

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductList)