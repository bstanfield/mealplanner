import React, { Component } from 'react';
import * as R from 'ramda';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faSurprise } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetAllRecipes } from '../actions';
import '../surprise.scss'

import ReactGA from 'react-ga';
const queryString = require('query-string');

export const initGA = () => {
    console.log('GA init');
    ReactGA.initialize('UA-137386963-1');
}
export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

const renderFilter = (filter) => (
    <div className="filterCombo">
        <div className="box">
            <FontAwesomeIcon icon={filter.icon} />
            <p>{filter.val}</p>
        </div>
        <span className="filter-label">{filter.label}</span>
    </div>
)

class Surprise extends Component {
    constructor(props) {
    super(props);
    let parsedQuery = queryString.parse(this.props.params.location.search);
    let pqr = parsedQuery.restriction;

    console.log(parsedQuery.restriction);

    if (pqr == 0) {
      pqr = 'None';
    } else if (pqr == 1) {
      pqr = 'Vegan';
    } else if (pqr == 2) {
      pqr = 'Vegetarian';
    } else if (pqr == 3) {
      pqr = 'Dairy free';
    } else if (pqr == 4) {
      pqr = 'Nut free';
    } else if (pqr == 5) {
      pqr = 'Gluten free';
    } else if (pqr == 6) {
      pqr = 'Pescatarian';
    } else {
      pqr = 'N/A'
    }

    this.state = {
        filters: [
            {
                icon: faDollarSign,
                val: `$${parsedQuery.cost}`
            },
            {
                icon: faClock,
                val: `${parsedQuery.cookTime} min`
            },
            {
                icon: faFlag,
                val: pqr
            },
        ],
        index: 0,
        recipeRedirect: false,
        selectedRecipe: '',
        editRedirect: false,
      };
    }
    



	setRedirect(recipe){
		this.setState({ selectedRecipe: recipe, recipeRedirect: true });
	}

	componentDidMount() {
		let parsedQuery = queryString.parse(this.props.params.location.search);
		let endpointToHit;
		if (parsedQuery.source === 'preset') {
			endpointToHit = `persona_recipes/${parsedQuery.persona}`;
		} else if (parsedQuery.source === 'survey') {
			endpointToHit = `survey_results/${parsedQuery.cost}/${parsedQuery.cookTime}/${parsedQuery.restriction}`;
		}
		console.log('endpointToHit', endpointToHit)
		fetch(
      `https://api.foodwise.dev/${endpointToHit}`,
      {
				method: 'GET',
				mode: 'cors',
				// Not ideal to have all of our requests sent with cross origin request allowed
      },
    ).then(response => response.json())
    .then(recipes => this.props.SetAllRecipes(recipes))
		.catch(error => this.setState({ error }));
	}

  goToPrevious() {
    if (this.state.index > 0) {
      this.setState({index: this.state.index-1})
    }
    else if (this.state.index === 0) {
      this.setState({index: this.props.recipesMaster.recipes.length-1})
    }
  }

  goToNext() {
    const { recipesMaster } = this.props
    if (this.state.index < recipesMaster.recipes.length-1) {
      this.setState({index: this.state.index+1})
    }
    else if (this.state.index === this.props.recipesMaster.recipes.length-1) {
        this.setState({index: 0})
      }
  }

  renderSlide = (slide) => {
    return (
      <a className="link-nostyle">
        <div onClick={() => this.setRedirect(slide)}>
          <div className="img" style={{ 'background-image': `url(${slide.image_url})`}}>
              <p>  </p>
          </div>
          <p className="recipe-name">{slide.recipe_name}</p>
        </div>
      </a>
      );
  }

  render() {
    const { recipesMaster } = this.props

    if (this.state.recipeRedirect) {
      return (
        <Redirect to={{
          pathname: '/recipe-page',
          search: `?recipe=${this.state.selectedRecipe.recipe_name}&id=${this.state.selectedRecipe.id}`
        }} />
      );
    }

    if (this.state.editRedirect) {
        let parsedQuery = queryString.parse(this.props.params.location.search);
        return (
          <Redirect to={{
            pathname: '/filter',
            search: `?cost=${parsedQuery.cost}&cookTime=${parsedQuery.cookTime}&restriction=${parsedQuery.restriction}`
          }} />
        );
      }

    return(
        <div className="surprisecontainer">
        <Nav />
          <div id="header"> 
            <h1>Your Recommended Recipes</h1>
            <div id="all-filters" onClick={() => this.setState({ editRedirect: true })}>
                <div className="filter">
                    {R.map(renderFilter, this.state.filters)}
                </div>
            </div>
          </div>

            {/* carousel */}
            <div id="carousel-container">
                <div className="prevBtn" onClick={() => this.goToPrevious()}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                </div>
                <div className="carousel-img">
                    {this.renderSlide(recipesMaster.recipes[this.state.index])}
                </div>
                <div className="nextBtn" onClick={() => this.goToNext()}>
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                </div>
            </div>

            <button>
                <a href="/recipes-all">View All Recipes</a>
            </button>
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

export default connect(mapStatetoProps, mapDispatchToProps)(Surprise);
