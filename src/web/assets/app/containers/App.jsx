'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import _ from 'lodash';

import { setCategoryFilter } from '../actions';

import CartIcon from '../components/CartIcon';

var App = React.createClass({
   render: function () {
     return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link to="/" className="navbar-brand" onClick={() => this.props.setCategoryFilter('')}>Belethor&apos;s General Goods</Link>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><Link to="/" activeClassName="active" onlyActiveOnIndex={true} onClick={() => this.props.setCategoryFilter('')}>Home</Link></li>
                  <li className="dropdown">
                    <a href="/category/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Category <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                    <li><a href="javascript:void(0)" onClick={() => this.props.setCategoryFilter('')} >All Items</a></li>
                      {_.map(this.props.categories, category =>
                        <li><Link to="/"
                          key={category.id}
                          category={category}
                          onClick={() => this.props.setCategoryFilter(category.id)} >{category.name}</Link></li>
                      )}
                    </ul>
                  </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/orders/" activeClassName="active" onlyActiveOnIndex={true}>My Orders</Link></li>
                  <li><CartIcon /></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {this.props.children}
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="footer">
            <p>No lolygaging!</p>
            <p><Link to="/about/" activeClassName="active">About</Link></p>
          </div>
        </div>
      </div>
    </div>
     );
   }
});


const mapStateToProps = state => ({
  categories: state.categories
})

export default connect(
  mapStateToProps,
  { setCategoryFilter }
)(App)
