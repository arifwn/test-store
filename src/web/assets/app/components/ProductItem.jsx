'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import marked from 'marked';

var ProductItem = React.createClass({
  getImageSrc: function () {
    if (this.props.product.image) {
      return this.props.product.image
    }
    return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTc2NTk0MDAzNyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NzY1OTQwMDM3Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy40Njg3NSIgeT0iMzYuNSI+NjR4NjQ8L3RleHQ+PC9nPjwvZz48L3N2Zz4=';
  },
  htmlDescription: function () { return {__html: marked(this.props.product.description)}; },
  formatMoney: function (n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c, 
      d = d == undefined ? "." : d, 
      t = t == undefined ? "," : t, 
      s = n < 0 ? "-" : "", 
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
      j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  },
  getPrice: function () {
    return 'IDR ' + this.formatMoney(this.props.product.price);
  },
  addToCartBtn: function () {
    if (this.props.product.quantity > 0) {
      return (<a href="javascript:void(0)" className="btn btn-primary" role="button" onClick={this.props.onAddToCartClicked}><span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Add to Chart</a>);
    }
    else {
      return (<a href="javascript:void(0)" className="btn btn-danger" role="button">Out of Stock</a>);
    }
  },
  isInCart: function () {
    if (this.props.cart[this.props.product.id]) {
      return (<Link to="/cart/" className="btn btn-default btn-sm">in cart: {this.props.cart[this.props.product.id].orderQuantity}</Link>);
    }
  },
  stock: function () {
    if (this.props.product.quantity) {
      return (<span className="badge">stock: {this.props.product.quantity}</span>)
    }
  },
  render: function () {
    var imgStyle = { maxWidth: '200px' };
    return (
      <div className="ProductItem media">
        <div className="media-left">
          <a href="javascript:void(0)"> <img className="media-object" src={this.getImageSrc()} style={imgStyle} /> </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{ this.props.product.name } ({this.getPrice()})</h4>
          { this.stock() }
          <div dangerouslySetInnerHTML={ this.htmlDescription() } />
          <p>
            { this.addToCartBtn() } &nbsp; { this.isInCart() }
          </p>
        </div>
      </div>
    );
  }
})


const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(
  mapStateToProps
)(ProductItem)
