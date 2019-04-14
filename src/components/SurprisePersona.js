import React, { Component } from 'react';
import * as R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions';
import '../surprise.scss'

import ReactGA from 'react-ga';
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

const renderSlide = (slide) => (
    <a className="link-nostyle" href="/recipe-page">
        <div className="img" style={{ 'background-image': `url(${slide.imageURL})`}}>
            <p>  </p>
        </div>
        <p className="recipe-name">{slide.recipeName}</p>
    </a>
  );

class SurprisePersona extends Component {
    constructor(props) {
    super(props);
    this.state = {
        filters: [
            {
                label: '$10/meal',
                icon: faDollarSign,
            },
            {
                label: '3hrs/week',
                icon: faClock,
            },
            {
                label: 'Basic Recipes',
                icon: faStar,
            },
            {
                label: 'All Ingredients',
                icon: faUtensils,
            },
            {
                label: 'No Restrictions',
                icon: faFlag,
            },
        ],
        index: 0,
    };
  }


  goToPrevious() {
    if (this.state.index > 0) {
      this.setState({index: this.state.index-1})
    }
  }

  goToNext() {
    const { recipesMaster } = this.props
    if (this.state.index < recipesMaster.length-1) {
      this.setState({index: this.state.index+1})
    }
  }


  render() {
    // eslint-disable no-underscore-dangle
    const { recipesMaster } = this.props
    return(
        <div>
            <h1>Recipe for 'Granolas'</h1>
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
                    {!R.isNil(recipesMaster) ? renderSlide(recipesMaster[this.state.index]) : ''} 
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
  return bindActionCreators({}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(SurprisePersona);