'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import _ from 'lodash';

import { removeFromCart, checkout } from '../actions';
import { datastore } from '../datastore';

import CartItem from '../components/CartItem';

var Cart = React.createClass({
  hasContent: function () {
    if (_.size(this.props.cart) == 0) {
      return (<div className="alert alert-danger" role="alert">Your cart is empty! <Link to="/">Let&apos;s go shopping!</Link></div>);
    }
    else {
      var total = 0;
      _.forEach(this.props.cart, (product) => {
        total += product.orderQuantity * product.price;
      });

      return (<div><hr/><p>TOTAL: {this.getPrice(total)}</p></div>);
    }
  },
  formatMoney: function (n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c, 
      d = d == undefined ? "." : d, 
      t = t == undefined ? "," : t, 
      s = n < 0 ? "-" : "", 
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
      j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  },
  getPrice: function (num) {
    return 'IDR ' + this.formatMoney(num);
  },
  checkout: function () {
    datastore.dispatch(checkout());
  },
  checkoutBtn: function () {
    if (_.size(this.props.cart) > 0) {
      return (<button className="btn btn-primary" onClick={this.checkout}>Checkout</button>);
    }
  },
  render: function () {
    return (
      <div className="Cart">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="well">
              {_.map(this.props.cart, product =>
                <CartItem
                  key={product.id}
                  product={product}
                  onRemoveFromCartClicked={() => this.props.removeFromCart(product)} />
              )}
              {this.hasContent()}
              <hr />
              { this.checkoutBtn() }
            </div>
            <Link to="/orders/">My Past Orders</Link>
          </div>
        </div>
      </div>
    );
  }
})

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(
  mapStateToProps,
  { removeFromCart }
)(Cart)