import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as R from 'ramda';
import { SetRecipePage, SetRecipeIngredients, SetUpvotes } from '../actions';
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
    <h4 className="steps"> Step {index + 1}.</h4>
    <p>{instruction}</p>
  </div>
)

const renderRecipeIngredients = (ingredientObj) => (
  <div>
    <input type="checkbox" value={ingredientObj.ingredient} />
    {/* Using parseFloat/toString combination to parse out trailing zeros
    and using || '' as a null coalescing operator */}
    {`${R.isNil(ingredientObj.quantity) ? '' : parseFloat(ingredientObj.quantity.toString())} ${ingredientObj.measurement} ${ingredientObj.technique || '' } ${ingredientObj.ingredient}`}
  </div>
)

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servings: 1,
      phoneNumber:'',
      favorited: false,
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
      `https://api.foodwise.dev/master_recipes/${recipeName}`,
      {
        method: 'GET',
        mode: 'cors',
      },
    ).then(response => response.json())
    .then(recipe => this.props.SetRecipePage(recipe))
    .catch(error => this.setState({ error }));

    // Should build out functionality where if the response array has a length of greater than 1, a different action is called to render the all-recipes page to show all the different results instead of routing to the recipe-page

    // GET RECIPE INSTRUCTIONS INGREDIENTS
    fetch(
      `https://api.foodwise.dev/ingredients/${recipeId}`,
      {
        method: 'GET',
        mode: 'cors',
      },
    ).then(response => response.json())
    .then(ingredients => this.props.SetRecipeIngredients(ingredients))
    .catch(error => this.setState({ error }));

  }

  updateServings(event) {
    this.setState({servings: event.target.value});
  }

  renderRecipeIngredients = (ingredientObj) => (
    // TODO: Add functionality so the quantity takes into account the "number of servings input"
    <div>
      <input type="checkbox" value={ingredientObj.ingredient} /> 
      {/* Using parseFloat/toString combination to parse out trailing zeros
      and using || '' as a null coalescing operator */}
      {
        `${R.isNil(ingredientObj.quantity) ? '' : parseFloat(this.state.servings * ingredientObj.quantity.toString())} ${ingredientObj.measurement} ${ingredientObj.technique || '' } ${ingredientObj.ingredient}`}
    </div>
  )
  
   
  setRedirect(persona){
    this.setState({ selectedPersona: persona.id, redirect: true });
  }

  handlePhoneNumberChange(event) {
    this.setState({phoneNumber: event.target.value})
    console.log('5103236239', this.state.phoneNumber);
  }

  twilio() {
    const {recipe_name, id} = this.props.recipePage.recipePage;
    console.log('this.props.params.location.search', this.props.params.location.search);
    fetch(
      `https://api.foodwise.dev/twilio/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: this.state.phoneNumber,
          recipeName: recipe_name,
          body: `https://stanfield.space/recipe-page/${this.props.params.location.search}`,
        })
      }, 
    ).then(response => response.json())
    .then(something => console.log("something", something))
    .catch(error => this.setState({ error }));
  }

  upvoteDownvote() {
    let recipeId;
    let endpointToHit;
    if (!R.isEmpty(this.props.params.location.search)) {
      let parsedQuery = queryString.parse(this.props.params.location.search);
      recipeId= parsedQuery.id;
    };
    if (!this.state.favorited) {
      this.setState({favorited: true});
      endpointToHit = `upvote`
    } else {
      this.setState({favorited: false});
      endpointToHit = `downvote`
    }

    fetch(
      `https://api.foodwise.dev/${endpointToHit}/${recipeId}`,
      {
        method: 'GET',
        mode: 'cors',
      },
    ).then(response => response.json())
    .then(recipe => this.props.SetUpvotes(recipe.upvotes))
    .catch(error => this.setState({ error }));
} 

  render() {
    const {recipe_name, preptime, cooktime, cost, instructions, level, image_url, upvotes, reheat, storage} = this.props.recipePage.recipePage;
    const { ingredients } = this.props.recipePage;

    return(
      <div id="recipecontainer">
        <div className="recipe-header">
          <h1>{recipe_name}</h1>
        </div>
        <div className="flex">
          <div className="hero-img" style={{ 'background-image': `url(${image_url})`}}>
          </div>
          <div className="meta-sidebar">
            <h2>Meta</h2>
            <p>Total: {R.add(preptime,cooktime)}</p>
            <p>Prep: {preptime}</p>
            <p>Cook: {cooktime}</p>
            
            <p>Cost: {cost}</p>
            <p>Level: {level}</p>

            {/* This section only works if they link their Google Account */}

            <div className="flexbutton">
            <div className="favorite" onClick={()=>this.upvoteDownvote()}>♥ Favorite ({upvotes})</div>
            <div className="divider"></div>
            <div className="calendar">Calendar</div>

          </div>
        </div>
        
        <div className="recipe ingredients">
          <h2>Ingredients</h2>
          <div>Makes <input className="number-input" id="servings" type="number" value={this.state.servings} onChange={(e) => this.updateServings(e)} /> servings </div>
          {R.map(this.renderRecipeIngredients, ingredients)}
          <div className="ingredients-actions">
            <FontAwesomeIcon icon={faPhone} />
            
            <input type="text" onChange={(e)=>this.handlePhoneNumberChange(e)} />
            <div onClick={()=>this.twilio()}>
              <button>Send ingredients list to phone</button>
            </div>
          </div>

          <div className="recipe instructions">
          <h2>Instructions</h2>
          <form>
            {R.addIndex(R.map)(renderRecipeInstructions, instructions)}
          </form>
        </div>

<<<<<<< HEAD
        </div>

        


        {/* Don't think we want this section anymore... Very few tips for the recipes in the database */}
        {/* <div className="recipe tips">
          <h2>Meal Prep Tips</h2>
          {R.map(renderRecipeTips, reheat)}
        </div> */}

=======
>>>>>>> faa31d74657c0f021c81d7c91968c90b5368167f
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
  return bindActionCreators({ SetRecipePage, SetRecipeIngredients, SetUpvotes }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(RecipePage);
