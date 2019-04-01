import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions';

import ReactGA from 'react-ga';
export const initGA = () => {
    console.log{'GA init'}
    ReactGA.initialize('UA-137386963-1');
}
export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

const renderPersonas = (persona) => (
  <a className="link-nostyle" href="/surprise-persona">
    <div className="persona">
      <h2>{persona.name}</h2>
      <ul>
        {R.map(x => <li>{x}</li>, persona.descriptors)}
      </ul>
    </div>
  </a>
)

class Personas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { personas } = this.props;
    return(
      <div className="persona-page">
        <h1>Choose a foodie type</h1>
        <h2>We will recommend a recipe based on the traits of the persona you choose!</h2>
        <br/>
        <br/>
        <div className="persona-container">
          {R.map(renderPersonas, personas)}
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    personas: state.personas,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(Personas);
