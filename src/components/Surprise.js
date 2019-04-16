import React, { Component } from 'react';
import * as R from 'ramda';
import { Redirect } from 'react-router-dom';

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
        <div className="circle">
            <FontAwesomeIcon icon={filter.icon} />
        </div>
        <span className="filter-label">{filter.label}</span>
    </div>
)

class Surprise extends Component {
    constructor(props) {
    super(props);
    this.state = {
        filters: [
            {
                label: 'Budget',
                icon: faDollarSign,
            },
            {
                label: 'Time',
                icon: faClock,
            },
            {
                label: 'Expertise',
                icon: faStar,
            },
            {
                label: 'Ingredients',
                icon: faUtensils,
            },
            {
                label: 'Restrictions',
                icon: faFlag,
            },
        ],
        index: 0,
        redirect: false,
        selectedRecipe: '',
      };
    }
  
	setRedirect(recipe){
		this.setState({ selectedRecipe: recipe, redirect: true });
	}

	componentDidMount() {
		let parsedQuery = queryString.parse(this.props.params.location.search);
		let endpointToHit; 
		if (parsedQuery.source === 'preset') {
			endpointToHit = `persona_recipes/${parsedQuery.persona}`;
			// need to send over persona ID
		} else if (parsedQuery.source === 'survey') {
			endpointToHit = `survey_results/${parsedQuery.cost}/${parsedQuery.cookTime}/${parsedQuery.restriction}`;
		}
		console.log('endpointToHit', endpointToHit)
		fetch(
      `http://35.236.39.233/${endpointToHit}`,
      {
        method: 'GET',
      }, 
    ).then(response => response.json())
    .then(recipes => this.props.SetAllRecipes(recipes))
		.catch(error => this.setState({ error }));
		// There should be an option to not have restrictions
		// .then(recipes => console.log ('recipes', recipes))
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

    if (this.state.redirect === true) {
      return (
        <Redirect to={{
          pathname: '/recipe-page',
          search: `?recipe=${this.state.selectedRecipe.recipe_name}&id=${this.state.selectedRecipe.id}`
        }} />
      );
    }

    return(
        <div>
            <h1>Recipe for Your Choices</h1>
            <div id="all-filters">
                <div id="edit">
                    <FontAwesomeIcon icon={faEdit} />
                    <a className="link-nostyle" href="/filter">edit</a>
                </div>
                <div className="filter">
                    {R.map(renderFilter, this.state.filters)}
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