import React, { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetAllRecipes } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // fetching all recipes here so there are no redundant calls throughout surprise and all recipes page

  componentDidMount() {
    // fetch(
    //   `http://35.236.39.233/recipenames`,
    //   {
    //     method: 'GET',
    //   }, 
    // ).then(response => response.json())
    // .then(recipes => this.props.SetAllRecipes(recipes))
    // .catch(error => this.setState({ error }));
  }
  

  render() {
    return(
      <a className="navigationheader" href="/">
        <div className="nav-container">
          <h3 className="logo">
            {` foodwise`} <span className="headers"><span className="headerhover">personas</span><span className="hspace"></span><span className="headerhover">customize</span><span className="hspace"></span><span className="headerhover">recipes</span></span>
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

export default connect(mapStatetoProps, mapDispatchToProps)(Nav);