import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
const ReactMarkdown = require('react-markdown/with-html')

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
      recipeMeta: {
        name: 'Simple Chicken Quesadillas',
        heroImage: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
        times: {
          total: '40',
          prep: '20',
          cook: '80',
        },
        cost: '$',
        level: 'easy',
      },
      recipeIngredients: [
        { count: 6, name: 'large tortillas' },
        { count: 1, name: 'pound chicken breast' },
        { count: 1, name: 'large onion' },
        { count: 1, name: 'red bell pepper' },
      ],
      recipeInstructions: [
        'Heat 1 tablespoon of olive oil in a skillet over high heat. Sprinkle the chicken with salt, pepper, and taco seasoning.',
        'Add the chicken to the skillet and saute over medium-high heat until done, about 4 minutes per side. Remove from the skillet and dice into cubes. Set aside.',
        'Add the remaining 1 tablespoon of olive oil to the skillet over high heat. Throw in the onions and pepers and cook until the peppers have a few dark brown/black areas, 3 to 4 minutes. Remove and set aside.'
      ],
      recipeTips: [
        { name: 'Storage', tip: `<ul><li>Store in airtight container for up to 4 days</li><li>Store in freezer, wrapped in foil for up to 2 weeks</li></ul>` },
        { name: 'To reheat', tip: `<ul><li>Microwave on high for 1 minute OR heat on a skillet for about 1 minute each side, until golden brown</li><li>Let sit for 30 seconds</li></ul>` }
      ]
    };
  }

  render() {
    return(
      <div>
        <div className="recipe-header">
          <h1>{this.state.recipeMeta.name}</h1>
          <div className="hero-img" style={{ 'background-image': `url(${this.state.recipeMeta.heroImage})`}}>
          </div>
          <div className="meta-sidebar">
            <h2>Meta</h2>
            <p>Total: {this.state.recipeMeta.times.total}</p>
            <p>Prep: {this.state.recipeMeta.times.prep}</p>
            <p>Cook: {this.state.recipeMeta.times.cook}</p>
            <hr/>
            <p>Cost: {this.state.recipeMeta.cost}</p>
            <p>Level: {this.state.recipeMeta.level}</p>

            <div className="btn favorite">♥ Favorite</div>
            <div className="btn calendar">Calendar</div>
          </div>
        </div>
        <br style={{'clear': 'both'}} />
        <div className="recipe ingredients">
          <h2>Ingredients</h2>
          {R.map(renderRecipeIngredients, this.state.recipeIngredients)}

          <div className="ingredients-actions">
            <FontAwesomeIcon icon={faPhone} />
            <a href="https://www.twilio.com">Send ingredients list to phone</a>
          </div>

        </div>

        <div className="recipe instructions">
          <h2>Instructions</h2>
          <form>
            {R.addIndex(R.map)(renderRecipeInstructions, this.state.recipeInstructions)}
          </form>
        </div>
        <div className="recipe tips">
          <h2>Meal Prep Tips</h2>
          {R.map(renderRecipeTips, this.state.recipeTips)}

        </div>
      </div>
    )
  }
}

export default RecipePage;