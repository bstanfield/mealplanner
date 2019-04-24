import React, { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetAllRecipes } from '../actions';
import {withRouter, Link} from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return(
      <a className="navigationheader" href="/">
        <div className="nav-container">
          <h3 className="logo">
            {` foodwise`} <span className="headers">
            <Link to={{
              pathname: '/personas',
              state: {backTo: this.props.location}
              }}>personas</Link>
            <Link className="hspace" to={{
              pathname: '/survey',
              state: {backTo: this.props.location}}
            }>customize</Link>
            <Link to={{
              pathname: '/recipes-all',
              state: {backTo: this.props.location}}
            }>Recipes</Link>
            </span>
          </h3>
        </div>
      </a>
    )
    // ...
  }
}

function mapStatetoProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ SetAllRecipes }, dispatch);
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Nav));