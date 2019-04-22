import React, { Component } from 'react';
import * as R from 'ramda';
import { Redirect } from 'react-router-dom';

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
            name: 'cost',
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
            id: 1,
            name: 'cookTime',
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
            name: 'restriction',
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
    <label>
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
    if (!R.isEmpty(this.props.params.location.search)) {
    let parsedQuery = queryString.parse(this.props.params.location.search);
    var filtersClone = {...this.state.filters};
    filtersClone[0].answer = parsedQuery.cost;
    filtersClone[1].answer = parsedQuery.cookTime;
    filtersClone[2].answer = parsedQuery.restriction;
    this.setState({filtersClone});
    console.log('filtersClone', filtersClone);
    // Not exactly the most scalable way to do this...
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
            search: `?source=survey&cost=${cost}&cookTime=${cookTime}&restriction=${restriction}`
          }} />
        );
      }


    return(
        <div>
            <h1>Filters</h1>
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
                <button>
                    <div onClick={() => this.setState({ searchRedirect: true })}>
                    <a>Filter</a>
                    </div>
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
