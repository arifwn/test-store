import React from 'react';
import { Link } from 'react-router';
import Redux from 'react-redux';
import _ from 'lodash';

module.exports = React.createClass({
   render: function () {
     return (
      <div>
        <div className="header">
          <h1><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link></h1>
          <Link to="/about/" activeClassName="active">About</Link> <br/>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
     );
   }
})