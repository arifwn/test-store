'use strict';

import React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';

var OrderDetail = React.createClass({
  getInitialState: function() {
    var order = this.getOrder();
    return {
      paymentProof: order.payment_proof
    };
  },
  handleChange: function(event) {
    var order = this.getOrder();
    var paymentProof = event.target.value;
    this.setState({paymentProof: paymentProof});
  },
  getOrder: function () {
    if (this.props.orders[this.props.params.orderId]) {
      return this.props.orders[this.props.params.orderId];
    }
    return {};
  },
  submitProof: function () {
    var order = this.getOrder();
    if (!order.id) return;

    var paymentProof = this.state.paymentProof === undefined ? order.payment_proof : this.state.paymentProof;

    console.log(paymentProof);
  },
  renderPaymentProof: function (order) {
    if (order.status == 'PENDING_PAYMENT') {
      return (
        <div>
          <div className="form-group">
            <label>Payment Proof</label>
            <textarea className="form-control" value={this.state.paymentProof} defaultValue={order.payment_proof} onChange={this.handleChange}/>
          </div>
          <button className="btn btn-default" onClick={this.submitProof}>Submit Payment Proof</button>
        </div>
      );
    }
    else {
      return (<div>Payment Proof: {order.payment_proof}</div>);
    }
  },
  render: function(){
    var order = this.getOrder();
    return (
      <div className="Cart">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <ul className="list-group">
              <li className="list-group-item">Order ID: #{ this.props.params.orderId }</li>
              <li className="list-group-item">Status: {order.status}</li>
              <li className="list-group-item">{this.renderPaymentProof(order)}</li>
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
)(OrderDetail)