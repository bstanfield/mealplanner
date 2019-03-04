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

const renderSlide = (slide) => (
    <a className="link-nostyle" href="/recipe-page">
        <div className="img" style={{ 'background-image': `url(${slide.imageURL})`}}>
            <p>  </p>
            {/* <p>{slide.recipeName}</p> */}
            {/* <p>{slide.recipeLink}</p> */}
        </div>
        <p className="recipe-name">{slide.recipeName}</p>
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
        slides: [
          {
            imageURL: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
            recipeName: 'Simple Chicken Quesadillas',
            recipeLink: 'simpleQuesadillas.com'
          },
          {
            imageURL: 'https://sweetpeasandsaffron.com/wp-content/uploads/2018/07/Perfect-Baked-Chicken-Breast-5.jpg',
            recipeName: 'gsdg Quesadillas',
            recipeLink: 'simpleQuesadillas.com'
          },
          {
            imageURL: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
            recipeName: 'asdflkj Quesadillas',
            recipeLink: 'simpleQuesadillas.com'
          },
          {
            imageURL: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
            recipeName: ')!@()(@) Quesadillas',
            recipeLink: 'simpleQuesadillas.com'
          }
        ]
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
    surprise: state.surprise,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(SurpriseCustomize);