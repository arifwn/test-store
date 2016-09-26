'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import _ from 'lodash';

var CartIcon = React.createClass({
  getTotalOrder: function () {
    var total = 0;
    _.forEach(this.props.cart, (product) => {
      total += product.orderQuantity;
    });
    return total;
  },
  totalOrderBadge: function () {
    var total = this.getTotalOrder();
    if (total > 0) {
      return (<span className="badge">{total}</span>);
    }
  },
  render: function () {
    return (
      <Link to="/cart/" activeClassName="active" className="CartIcon"><span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> {this.totalOrderBadge()} </Link>
    );
  }
})

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(
  mapStateToProps
)(CartIcon)