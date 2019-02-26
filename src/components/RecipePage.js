import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as R from 'ramda';
import {} from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
const ReactMarkdown = require('react-markdown/with-html');

const renderRecipeInstructions = (instruction, index) => (
  <div> 
    <h4>Step {index + 1}.</h4>
    <p>{instruction}</p>
  </div>
)

const renderRecipeIngredients = (ingredientObj) => (
  <div>
    <input type="checkbox" value={ingredientObj.name} /> {`${ingredientObj.count} ${ingredientObj.name}`}
  </div>
)

const renderRecipeTips = (recipeTip) => (
  <div>
    <h4>{recipeTip.name}:</h4>
    <ReactMarkdown
      source={recipeTip.tip}
      escapeHtml={false}
    />
  </div>
)

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {recipeMeta, recipeIngredients, recipeInstructions, recipeTips} = this.props.recipePage;
    return(
      <div>
        <div className="recipe-header">
          <h1>{recipeMeta.name}</h1>
          <div className="hero-img" style={{ 'background-image': `url(${recipeMeta.heroImage})`}}>
          </div>
          <div className="meta-sidebar">
            <h2>Meta</h2>
            <p>Total: {recipeMeta.times.total}</p>
            <p>Prep: {recipeMeta.times.prep}</p>
            <p>Cook: {recipeMeta.times.cook}</p>
            <hr/>
            <p>Cost: {recipeMeta.cost}</p>
            <p>Level: {recipeMeta.level}</p>

            <div className="btn favorite">♥ Favorite</div>
            <div className="btn calendar">Calendar</div>
          </div>
        </div>
        <br style={{'clear': 'both'}} />
        <div className="recipe ingredients">
          <h2>Ingredients</h2>
          {R.map(renderRecipeIngredients, recipeIngredients)}

          <div className="ingredients-actions">
            <FontAwesomeIcon icon={faPhone} />
            <a href="https://www.twilio.com">Send ingredients list to phone</a>
          </div>

        </div>

        <div className="recipe instructions">
          <h2>Instructions</h2>
          <form>
            {R.addIndex(R.map)(renderRecipeInstructions, recipeInstructions)}
          </form>
        </div>
        <div className="recipe tips">
          <h2>Meal Prep Tips</h2>
          {R.map(renderRecipeTips, recipeTips)}

        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    recipePage: state.recipePage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(RecipePage);
