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


const renderFilter = (filter) => (
    <div className="filterCombo">
        <div className="circle">
            <FontAwesomeIcon icon={filter.icon} />
        </div>
        <span className="filter-label">{filter.label}</span>
    </div>
)

const renderRecipesMaster = (slide) => (
    <div className="img" style={{ 'background-image': `url(${slide.imageURL})`}}>
        <p> </p>
    </div>
)
    

const renderSlide = (slide) => (
    // this.props.recipesMaster;
    <a className="link-nostyle" href="/recipe-page">
        <div className="img" style={{ 'background-image': `url(${renderRecipesMaster})`}}>
        {/* <div className="img" style={{ 'background-image': `url(${recipesMaster.slide.imageURL})`}}> */}
        {/* <div className="img" style={{ 'background-image': `url(${slide.imageURL})`}}> */}
            <p>  </p>
            {/* <p>{slide.recipeName}</p> */}
            {/* <p>{slide.recipeLink}</p> */}
        </div>
        {/* <p className="recipe-name">{slide.recipeName}</p> */}
        {/* <p className="recipe-name">{recipesMaster.slide.recipeName}</p> */}
    </a>
  );

class SurpriseCustomize extends Component {
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
        // slides: [
        //   {
        //     imageURL: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
        //     recipeName: 'Simple Chicken Quesadillas',
        //     recipeLink: ''
        //   },
        //   {
        //     imageURL: 'https://static01.nyt.com/images/2016/08/15/dining/15COOKING-PASTA/15COOKING-PASTA-threeByTwoMediumAt2X-v2.jpg',
        //     recipeName: 'Sun-Dried Tomato Spaghetti',
        //     recipeLink: ''
        //   },
        //   {
        //     imageURL: 'https://hips.hearstapps.com/del.h-cdn.co/assets/18/11/2048x1024/landscape-1520956952-chicken-tacos-horizontal.jpg?resize=1200:*',
        //     recipeName: 'Chicken Advocado Taco',
        //     recipeLink: ''
        //   },
        //   {
        //     imageURL: 'https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/honey-walnut-shrimp-asian-slaw-su.jpg?itok=EhpdlTZC',
        //     recipeName: 'Honey Walnut Shrimp',
        //     recipeLink: ''
        //   },
        //   {
        //     imageURL: 'https://www.simplyrecipes.com/wp-content/uploads/2016/01/honey-mustard-salmon-horiz-a-1600.jpg',
        //     recipeName: 'Oven-Roasted Salmon',
        //     recipeLink: ''
        //   },
        //   {
        //     imageURL: 'https://images-gmi-pmc.edge-generalmills.com/6059b986-4800-4508-8546-40cb56e3d815.jpg',
        //     recipeName: 'Pork Stuffed Dumplings',
        //     recipeLink: ''
        //   }
        // ]
    };
  }


  goToPrevious() {
    if (this.state.index > 0) {
      this.setState({index: this.state.index-1})
    }
  }

  goToNext() {
    if (this.state.index < this.state.slides.length-1) {
      this.setState({index: this.state.index+1})
    }
  }


  render() {
    
    return(
        <div>
            <h1>Recipe for Your Choices</h1>
            <div id="all-filters">
                <div id="edit">
                    <FontAwesomeIcon icon={faEdit} />
                    <span>edit</span>
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
                    {renderSlide(this.state.slides[this.state.index])} 
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

export default connect(mapStatetoProps, mapDispatchToProps)(SurpriseCustomize);