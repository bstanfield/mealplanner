import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as R from 'ramda';
import { SetRecipePage, SetRecipeIngredients } from '../actions';
import ReactGA from 'react-ga';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
const ReactMarkdown = require('react-markdown/with-html');
const queryString = require('query-string');
 
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
  // TODO: Add functionality so the quantity takes into account the "number of servings input"
  <div>
    <input type="checkbox" value={ingredientObj.ingredient} /> 
    {/* Using parseFloat/toString combination to parse out trailing zeros
    and using || '' as a null coalescing operator */}
    {`${R.isNil(ingredientObj.quantity) ? '' : parseFloat(ingredientObj.quantity.toString())} ${ingredientObj.measurement} ${ingredientObj.technique || '' } ${ingredientObj.ingredient}`}
  </div>
)

// const renderRecipeTips = (recipeTip) => (
//   <div>
//     <h4>{recipeTip.name}:</h4>
//     <ReactMarkdown
//       source={recipeTip.tip}
//       escapeHtml={false}
//     />
//   </div>
// )

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
    // Setting a default recipe to load if the recipe-page is accessed directly
    // Could use R.defaultTo
    let recipeName = 'Easy Indian Butter Chicken';
    let recipeId = 1;

    // Parsing URL to find recipe details for fetch request if search parameters exist
    if (!R.isEmpty(this.props.params.location.search)) {
      let parsedQuery = queryString.parse(this.props.params.location.search);
      recipeName = parsedQuery.recipe;
      recipeId= parsedQuery.id;
    };

    // GET RECIPE META
    fetch(
      `http://localhost:3333/master_recipes/${recipeName}`,
      {
        method: 'GET',
      }, 
    ).then(response => response.json())
    .then(recipe => this.props.SetRecipePage(recipe))
    .catch(error => this.setState({ error }));

    // Should build out functionality where if the response array has a length of greater than 1, a different action is called to render the all-recipes page to show all the different results instead of routing to the recipe-page
    
    // GET RECIPE INSTRUCTIONS INGREDIENTS
    fetch(
      `http://localhost:3333/ingredients/${recipeId}`,
      {
        method: 'GET',
      }, 
    ).then(response => response.json())
    .then(ingredients => this.props.SetRecipeIngredients(ingredients))
    .catch(error => this.setState({ error }));

  }

  render() {
    const {recipe_name, preptime, cooktime, cost, instructions, level, image_url, reheat, storage} = this.props.recipePage.recipePage;
    const { ingredients } = this.props.recipePage;
    console.log("this.props.recipePage.recipePage", this.props.recipePage.recipePage);
    return(
      <div>
        <div className="recipe-header">
          <h1>{recipe_name}</h1>
          <div className="hero-img" style={{ 'background-image': `url(${image_url})`}}>
          </div>
          <div className="meta-sidebar">
            <h2>Meta</h2>
            <p>Total: {R.add(preptime,cooktime)}</p>
            <p>Prep: {preptime}</p>
            <p>Cook: {cooktime}</p>
            <hr/>
            <p>Cost: {cost}</p>
            <p>Level: {level}</p>

            {/* This section only works if they link their Google Account */}
            <div className="btn favorite">♥ Favorite</div>
            <div className="btn calendar">Calendar</div>
            
          </div>
        </div>
        <br style={{'clear': 'both'}} />
        <div className="recipe ingredients">
          <h2>Ingredients</h2>
          <div>Makes <input className="number-input" id="servings" type="number" placeholder="1" /> servings </div>
          {R.map(renderRecipeIngredients, ingredients)}
          <div className="ingredients-actions">
            <FontAwesomeIcon icon={faPhone} />
            <a href="https://www.twilio.com">Send ingredients list to phone</a>
          </div>

        </div>

        <div className="recipe instructions">
          <h2>Instructions</h2>
          <form>
            {R.addIndex(R.map)(renderRecipeInstructions, instructions)}
          </form>
        </div>

        {/* Don't think we want this section anymore... Very few tips for the recipes in the database */}
        {/* <div className="recipe tips">
          <h2>Meal Prep Tips</h2>
          {R.map(renderRecipeTips, reheat)}
        </div> */}

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
  return bindActionCreators({ SetRecipePage, SetRecipeIngredients }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(RecipePage);
