import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions';
import '../recipesAll.scss'


const renderRecipes = (recipe) => (
  <div>
      <div className="img" style={{ 'background-image': `url(${recipe.imageURL})`}}>
        <p> </p>
      </div>
      <p className="recipe-name">{recipe.recipeName}</p>
  </div>
)

class RecipesAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { recipesMaster } = this.props
    return(
      <div>
        <h1>All Recipes</h1>

        <div id="content">
          {/* {R.map(renderRecipes, this.state.recipesMaster.imageURL)} */}
          {renderRecipes(recipesMaster)}
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