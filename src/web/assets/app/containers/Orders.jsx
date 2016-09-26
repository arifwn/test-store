'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import _ from 'lodash';

import { removeFromCart } from '../actions';

var Cart = React.createClass({
  hasContent: function () {
    if (_.size(this.props.orders) == 0) {
      return (<div className="alert alert-danger" role="alert">No past order found. <Link to="/">Let&apos;s go shopping!</Link></div>);
    }
  },
  getOrderLink: function (order) {
    return "/order/" + order.id + "/";
  },
  render: function () {
    return (
      <div className="Cart">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <ul className="list-group">
              {_.map(this.props.orders, order =>
                <li className="list-group-item"><Link to={this.getOrderLink(order)}>Order #{order.id}; Status: {order.status}</Link></li>
              )}
              {this.hasContent()}
            </ul>

          </div>
        </div>
      </div>
    );
  }
})

const mapStateToProps = state => ({
  orders: state.orders
})

export default connect(
  mapStateToProps,
  { removeFromCart }
)(Cart)