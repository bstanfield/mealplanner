import React, { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetAllRecipes } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // fetching all recipes here so there are no redundant calls throughout surprise and all recipes page
  
  componentDidMount() {
    fetch(
      `http://localhost:3333/recipenames`,
      {
        method: 'GET',
      }, 
    ).then(response => response.json())
    .then(recipes => this.props.SetAllRecipes(recipes))
    .catch(error => this.setState({ error }));
  }

  render() {
    return(
      <a className="link-nostyle" href="/">
        <div className="nav-container">
          <h3>
            <span className="emoji" role="img" aria-label="broccoli emoji"> 🥗 </span>
            {` Mealplanner`}
          </h3>
        </div>
      </a>
    )
    // ...
  }
}

function mapStatetoProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ SetAllRecipes }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(Nav);