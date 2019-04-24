import React, { Component } from 'react';
import * as R from 'ramda';
import { Redirect, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import BackButton from './BackButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions';
import '../surprise.scss'
import '../filter.scss'

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
        searchRedirect: false,
        filters: [
          {
            id: 0,
            name: 'Cost',
            options: [
              {
                value: 4,
                label: '$4 or less'
              },
              {
                value: 7,
                label: '$7 or less'
              },
              {
                value: 10,
                label: '$10 or less'
              },
              {
                value: 15,
                label: '$15 or less'
              },
            ],
            answer: '',
          },
          {
            id: 1,
            name: 'Cook Time',
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
            id: 2,
            name: 'Dietary Restrictions',
            options: [
              {
                value: 0,
                label: 'No dietary preferences'
              },
              {
                value: 1,
                label: 'Vegan'
              },
              {
                value: 2,
                label: 'Vegetarian'
              },
              {
                value: 3,
                label: 'Dairy Free'
              },
              {
                value: 4,
                label: 'Nut free'
              },
              {
                value: 5,
                label: 'Gluten Free'
              },
              {
                value: 6,
                label: 'Pescatarian'
              },
            ],
            answer: '',
          },
        ],
    };
  }

  handleInputChange = (event) => {
    var filtersClone = {...this.state.filters};
    filtersClone[event.target.name].answer = event.target.value;
    this.setState({filtersClone});
  }


  shouldIBeChecked(value, index, index2) {
  console.log("radio button value", this.state.filters[index].options[index2].value);
  console.log("this.state.filters[index].answer", parseFloat(this.state.filters[index].answer));
    if (this.state.filters[index].options[index2].value === parseFloat(this.state.filters[index].answer)) {
      return true
    } else {
      return false
    }
  }


  renderOption = (option, index, index2) => (
    <label className="labelfilter">
      <input
        type="radio"
        name={index}
        value={option.value}
        key={index2}
        onChange={(e) => this.handleInputChange(e)}
        checked={this.shouldIBeChecked(option.value, index, index2)}
      />
      {` ${option.label}`}
      <br /><br />
    </label>
  )
  componentDidMount() {
    if (!R.isEmpty(this.props.location.search)) {
    let parsedQuery = queryString.parse(this.props.location.search);
    var filtersClone = {...this.state.filters};
    filtersClone[0].answer = parsedQuery.cost;
    filtersClone[1].answer = parsedQuery.cookTime;
    filtersClone[2].answer = parsedQuery.restriction;
    this.setState({filtersClone});
    console.log('filtersClone', filtersClone);
  }
  }

  render() {
    let filterOptions;

    if (this.state.searchRedirect) {
        let cost = this.state.filters[0].answer
        let cookTime = this.state.filters[1].answer
        let restriction = this.state.filters[2].answer
        return (
          <Redirect to={{
            pathname: '/surprise',
            search: `?source=survey&cost=${cost}&cookTime=${cookTime}&restriction=${restriction}`,
            state: {backTo: this.props.location},
          }} />
        );
      }


    return(
        <div className="filterbox">
        <BackButton name="Back to Recipes" backTo={this.props.location.state.backTo} />
          <div className="filteroverlay">
            <h1 className="filtertitle">Filters</h1>
                {
                  this.state.filters.map((singleFilter, index) => {
                    filterOptions = (
                    <form>
                    <p>{singleFilter.name}</p>
                    {singleFilter.options.map((option, index2) =>
                    this.renderOption(option, index, index2))}
                    </form>
                    )
                  return filterOptions;
                  }
                  )
                }
                <button className="filterbutton">
                    <div onClick={() => this.setState({ searchRedirect: true })}>
                    Filter
                    </div>
                </button>
          </div>
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

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Filter));
