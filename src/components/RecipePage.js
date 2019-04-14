import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as R from 'ramda';
import { SetRecipePage } from '../actions';
import ReactGA from 'react-ga';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
const ReactMarkdown = require('react-markdown/with-html');

export const initGA = () => {
    console.log('GA init');
    ReactGA.initialize('UA-137386963-1');
}
export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

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

  componentDidMount() {
    fetch(
      `http://localhost:3333/master_recipes/${this.props.params.location.state.recipe}`,
      {
        method: 'GET',
      }, 
    ).then(response => response.json())
    .then(recipe => this.props.SetRecipePage(recipe))
    .catch(error => this.setState({ error }));
    // .then(recipe => console.log('response', recipe))
  }


  render() {
    const {recipe_name, preptime, cooktime, cost, instructions, image_url} = this.props.recipePage.recipePage;
    return(
      <div>
        <div className="recipe-header">
          <h1>{recipe_name}</h1>
          <div className="hero-img" style={{ 'background-image': `url(${image_url})`}}>
          </div>
          <div className="meta-sidebar">
            <h2>Meta</h2>
            {/* <p>Total: {recipeMeta.times.total}</p> */}
            <p>Prep: {preptime}</p>
            <p>Cook: {cooktime}</p>
            <hr/>
            <p>Cost: {cost}</p>
            {/* <p>Level: {recipeMeta.level}</p> */}
            {/* Need to do leftjoin in backend query so that we get level instead of levelid */}

            <div className="btn favorite">♥ Favorite</div>
            <div className="btn calendar">Calendar</div>
          </div>
        </div>
        <br style={{'clear': 'both'}} />
        <div className="recipe ingredients">
          <h2>Ingredients</h2>
          <div>Makes <input className="number-input" id="servings" type="number" placeholder="1" /> servings </div>
          {/* {R.map(renderRecipeIngredients, recipeIngredients)} */}

          <div className="ingredients-actions">
            <FontAwesomeIcon icon={faPhone} />
            <a href="https://www.twilio.com">Send ingredients list to phone</a>
          </div>

        </div>

        <div className="recipe instructions">
          <h2>Instructions</h2>
          <form>
            {/* {R.addIndex(R.map)(renderRecipeInstructions, instructions)} */}
          </form>
        </div>
        <div className="recipe tips">
          <h2>Meal Prep Tips</h2>
          {/* {R.map(renderRecipeTips, recipeTips)} */}

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
  return bindActionCreators({ SetRecipePage }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(RecipePage);
