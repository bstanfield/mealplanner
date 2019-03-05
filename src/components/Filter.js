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
                label: 'Budget',
                icon: faDollarSign,
                value: '$10',
            },
            {
                label: 'Time',
                icon: faClock,
                value: '2hrs',
            },
            {
                label: 'Expertise',
                icon: faStar,
                value: '3 stars',
            },
            {
                label: 'Ingredients',
                icon: faUtensils,
                value: 'Eggs, chicken',
            },
            {
                label: 'Restrictions',
                icon: faFlag,
                value: 'Keto Diet',
            }
        ]
    };
  }


  render() {
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
            
            <div id="filter-container">
                {R.map(renderFilterLabel, this.state.filters)}
                
                <button>
                    <a href="/surprise-customize">Filter</a>
                </button>
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

export default connect(mapStatetoProps, mapDispatchToProps)(Filter);