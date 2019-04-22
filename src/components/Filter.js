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
import '../filter.scss'


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

const renderFilterLabel = (filter) => (
    <div className="label-div">
        <span className="filter-label">{filter.label}:</span>
        <input type="text" placeholder={filter.value}/>
    </div>
)


class Filter extends Component {
    constructor(props) {
    super(props);
    this.state = {
        filters: [
          {
            q: 'How much money would you like to spend on a meal?',
            desc: 'Estimate from your current cooking expenses or enter a price point you want to aim for.',
            options: [
              {
                value: 0,
                label: '< $5'
              },
              {
                value: 5,
                label: '$5-10'
              },
              {
                value: 10,
                label: '$10-15'
              },
              {
                value: 15,
                label: '> $15'
              },
            ],
            answer: '',
          },
          {
            q: 'How much time do you spend cooking a meal?',
            desc: 'Estimate how long a simple dinner takes to cook, or how much time you have available for cooking a meal in minutes.',
            options: [
              {
                value: 30,
                label: 'Less than 30 minutes'
              },
              {
                value: 60,
                label: '30 minutes to an hour'
              },
              {
                value: 120,
                label: '1 to 2 hours'
              },
              {
                value: 500,
                label: 'Greater than 2 hours'
              },
            ],
            answer: '',
          },
          {
            q: 'Do you have any dietary preferences?',
            desc: 'Vegetarian, Vegan, Gluten Free?',
            options: [
              {
                value: 1,
                label: 'Vegan'
              },
              {
                value: 2,
                label: 'Vegetarian'
              },
              {
                value: 0,
                label: 'No dietary preferences'
              },
            ],
            answer: '',
          },
        ],
    };
  }

  render() {
    return(
        <div>
            <h1>Filters</h1>
              <form>
                {
                  this.state.filters.map((filter)=> {
                  filter.options.map(option => (
                    <div>
                    WHY AM I NOT SHOWING UP ? 
                    <label>
                      <input
                        type="radio"
                        name="Hey"
                        value={option.value}
                        key={option.value}
                        onChange={(e) => this.handleInputChange(e)}
                      />
                      {` ${option.label}`}
                      <br /><br />
                    </label>
                    </div>
                  )
                  );
                  }
                )
                }

              </form>
                <button>
                    <a href="/surprise">Filter</a>
                </button>
        </div>
    )
  }
}

// <div id="filter-container">


function mapStatetoProps(state) {
  return {
    recipesMaster: state.recipesMaster,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(Filter);
