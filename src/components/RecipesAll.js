import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions';
import '../recipesAll.scss'


const renderRecipe = (recipe) => (
  <a className="link-nostyle" href="/recipe-page">
    <div className="item" style={{ 'background-image': `url(${recipe.imageURL})`}}>
      <p>  </p>
    </div>
    <p className="recipe-name"> {recipe.recipeName} </p>
  </a>
)

class RecipesAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { recipesMaster } = this.props
    return(
      <div id="container">
        <h1>All Recipes</h1>

        <div id="content-outter">
          {R.map(renderRecipe, recipesMaster)}
        </div>

        <div id="action">
          <div id="backBtn"><a className="link-nostyle" href="/surprise-customize">&lt; Back</a></div>

          <button id="moreBtn"><a href="">More Recipes</a></button>
        </div>
        
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    recipesMaster: state.recipesMaster,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(RecipesAll);