import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions';
import '../recipesAll.scss'
import ReactGA from 'react-ga';


export const initGA = () => {
    console.log('GA init');
    ReactGA.initialize('UA-137386963-1');
}
export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

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
    this.state = {
      recipenames: [],
      error: '',
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:3333/recipenames`,
      {
        method: 'GET',
      }, 
    ).then(response => response.json())
    .then(data => this.setState({ recipenames: data }))
    .catch(error => this.setState({ error }));
  }

  render() {
    const { recipesMaster } = this.props

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }
    console.log('this.state.recipenames', this.state.recipenames);
    return(
      <div id="container">
        <h1>All Recipes</h1>
        {this.state.recipenames.map(recipe=>(<h2>{recipe.recipe_name}</h2>))}
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