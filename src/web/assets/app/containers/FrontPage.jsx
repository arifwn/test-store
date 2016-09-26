'use strict';

import React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';

import ProductList from '../components/ProductList';

var FrontPage = React.createClass({
  render: function(){
    return (
      <ProductList category="this.prop.categoryFilter"></ProductList>
    );
  }
})


const mapStateToProps = state => ({
  categories: state.categories
})

export default connect(
  mapStateToProps
)(FrontPage)