import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetAllRecipes } from '../actions';
import '../recipesAll.scss'
import ReactGA from 'react-ga';
import BackButton from './BackButton';
import Nav from './Nav';


export const initGA = () => {
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
      <div className="item-container" onClick={() => this.setRedirect(recipe)}>
        <div className="item" style={{ 'background-image': `url(${recipe.image_url})`}}>
        </div>
        <p className="recipe-name"> {recipe.recipe_name} </p>
      </div>
    </a>
  )

  propsToSend() {
    if (this.props.location.state.backTo.pathname === '/recipe-page'){
      return this.props.location.state.backTo.state.backTo.state.backTo
    } else {
      return this.props.location.state.backTo
    }
  }

  render() {
    const { recipesMaster } = this.props
    const recipeArr = R.slice(0, this.state.page, recipesMaster.recipes);

    if (this.state.redirect === true) {
      return (
        <Redirect to={{
          pathname: '/recipe-page',
          search: `?recipe=${this.state.selectedRecipe.recipe_name}&id=${this.state.selectedRecipe.id}`,
          state: {backTo: this.props.location},
        }} />
      );
    }

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    return(
    <div>
    <Nav />
      <div id="container">
        <h1 className="centerall">All Recipes</h1>
        {(!R.isNil(this.props.location.state))? <BackButton name="Back to Carousel" backTo={this.propsToSend()} /> : ''}
        <div id="content-outter">
          {(R.isNil(recipesMaster)) ? '' : R.map(this.renderRecipe, recipeArr) }
        </div>

        <div id="action">
          <div id="backBtn"><a className="backBtn" href="/surprise-customize">&lt; Back</a></div>

          <button id="moreBtn" onClick={() => this.setState({page: this.state.page + 9})}>More Recipes</button>

        </div>
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

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(RecipesAll));
