import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions';
import '../recipesAll.scss'

class RecipesAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const {imgURL} = this.props.surprise;

    return(
      <div>
        <h1>All Recipes</h1>

        <div id="content">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>

        <div id="action">
          <div id="backBtn"><span>&lt; Back</span></div>

          <button id="moreBtn"><a href="">More Recipes</a></button>
        </div>
        
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    recipeall: state.recipeall,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(RecipesAll);