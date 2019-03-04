import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions';
import '../surprise.scss'


const renderFilter = (filter) => (
    <div>
    <div class="circle">
        <FontAwesomeIcon icon={filter.icon} />
    </div>
    <span class="filter-label">{filter.label}</span>
  </div>
)

const renderSlide = (slide) => (
    <a className="link-nostyle" href="/recipe-page">
    <div className="hero-img" style={{ 'background-image': `url(${slide.imageURL})`}}>
      <p>{slide.recipeName}</p>
      <p>{slide.recipeLink}</p>
    </div>
    </a>
  );

class SurpriseCustomize extends Component {
  constructor(props) {
    super(props);
    this.state = {
        filters: [
            {
                label: 'budget',
                icon: faPhone,
            },
            {
                label: 'other name',
                icon: faPhone,
            },
            {
                label: 'budget',
                icon: faPhone,
            },
            {
                label: 'other name',
                icon: faPhone,
            },
            {
                label: 'budget',
                icon: faPhone,
            },
        ],
        index: 0,
        slides: [
          {
            imageURL: 'https://cdn.apartmenttherapy.info/image/fetch/w_800,c_fit/https://s3.amazonaws.com/pixtruder/original_images/0e56ab38542c762f226df9866314520e2fac6f6a',
            recipeName: 'alkfndj Quesadillas',
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
    // const {imgURL} = this.props.surprise;
    return(
        <div>
            <h1>Recipe for Your Choices</h1>
            <div id="all-filters">
                <div id="edit">edit</div>
                <div class="filter">
                    {R.map(renderFilter, this.state.filters)}
                </div>
            </div>
            
            {/* carousel */}
            <div class="carousel-container">
            <div
            onClick={() => this.goToPrevious()}
            >
            <FontAwesomeIcon icon={faPhone} />
            </div>
            {renderSlide(this.state.slides[this.state.index])}
            <div
            onClick={() => this.goToNext()}
            >
            <FontAwesomeIcon icon={faPhone} />
            </div>
            </div>

            <button><a href="/recipes-all">View All Recipes</a></button>

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