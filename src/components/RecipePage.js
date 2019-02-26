import React, { Component } from 'react';
import * as R from 'ramda';

const renderRecipeInstructions = (instruction, index) => (
  <div>
    <p>step {`${index + 1}: ${instruction}`}</p>
  </div>
)

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeInstructions: [
        'cut carrots',
        'boil chicken',
        'serve!'
      ]
    };
  }

  render() {
    return(
      <div>
        <div className="recipe-header">
          <img></img>
        </div>
        <div className="recipe-ingredients">
          HI!!!
        </div>
        <div className="recipe-instructions">
          {R.addIndex(R.map)(renderRecipeInstructions, this.state.recipeInstructions)}
        </div>
        <div className="recipe-tips">

        </div>
      </div>
    )
  }
}

export default RecipePage;