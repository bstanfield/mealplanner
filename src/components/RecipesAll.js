import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetAllRecipes } from '../actions';
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

class RecipesAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      redirect: false,
      selectedRecipe: '',
      page: 9
    };
  }

  setRedirect(recipe){
    this.setState({ selectedRecipe: recipe, redirect: true });
  }

  componentDidMount() {
    fetch(
      `https://api.foodwise.dev/recipenames`,
      {
        method: 'GET',
        mode: 'cors',
      },
    ).then(response => response.json())
    .then(recipes => this.props.SetAllRecipes(recipes))
    .catch(error => this.setState({ error }));
  }

  renderRecipe = (recipe) => (
    <a className="link-nostyle">
      <div onClick={() => this.setRedirect(recipe)}>
        <div className="item" style={{ 'background-image': `url(${recipe.image_url})`}}>
        </div>
        <p className="recipe-name"> {recipe.recipe_name} </p>
      </div>
    </a>
  )

  render() {
    const { recipesMaster } = this.props
    console.log('selected recipe', this.state.selectedRecipe);

    const recipeArr = R.slice(0, this.state.page, recipesMaster.recipes);

    if (this.state.redirect === true) {
      return (
        <Redirect to={{
          pathname: '/recipe-page',
          search: `?recipe=${this.state.selectedRecipe.recipe_name}&id=${this.state.selectedRecipe.id}`
        }} />
      );
    }

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }


    return(
      <div id="container">
        <h1>All Recipes</h1>
        <div id="content-outter">
          {(R.isNil(recipesMaster)) ? '' : R.map(this.renderRecipe, recipeArr) }
        </div>

        <div id="action">
          <div id="backBtn"><a className="link-nostyle" href="/surprise-customize">&lt; Back</a></div>

          <button id="moreBtn" onClick={() => this.setState({page: this.state.page + 9})}><a href="">More Recipes</a></button>
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
  return bindActionCreators({ SetAllRecipes }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(RecipesAll);
