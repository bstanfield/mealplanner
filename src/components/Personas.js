import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetPersonas } from '../actions';

const renderPersonas = (persona) => (
  <a className="link-nostyle" href="/surprise">
    <div className="persona">
      <h2>{persona.persona}</h2>
      <ul>
        {R.map(x => <li>{x}</li>, persona.chars)}
      </ul>
    </div>
  </a>
)

class Personas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  componentDidMount() {
    fetch(
      `http://35.236.39.233/personas`,
      {
        method: 'GET',
      }, 
    ).then(response => response.json())
    .then(personas => this.props.SetPersonas(personas))
    .catch(error => this.setState({ error }));
    
  }

  render() {
    const { personas } = this.props;

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

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
  return bindActionCreators({ SetPersonas }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(Personas);
