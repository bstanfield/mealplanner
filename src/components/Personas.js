import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetPersonas } from '../actions';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
import '../persona.scss';

class Personas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      error: '',
      selectedPersona:'',
    };
  }

  componentDidMount() {
    fetch(
      `https://api.foodwise.dev/personas`,
      {
        method: 'GET',
        mode: 'cors',
      },
    ).then(response => response.json())
    .then(personas => this.props.SetPersonas(personas))
    .catch(error => this.setState({ error }));
  }

  renderPersonas = (persona) => (
    <a className="link-nostyle">
      <div className="po" onClick={() => this.setRedirect(persona)}>
        <h2 className="po2">{persona.persona}</h2>
        <div className="overlay">
          {R.map(x => <p className="foodpoint">{x}</p>, persona.chars)}
        </div>
      </div>
    </a>
  )

  setRedirect(persona){
    this.setState({ selectedPersona: persona, redirect: true });
  }

  render() {
    const { personas } = this.props;
    const { selectedPersona } = this.state;

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/surprise',
          search: `?source=preset&persona=${selectedPersona.id}&cost=${selectedPersona.cost}&cookTime=${selectedPersona.cookTime}&restriction=${selectedPersona.restriction}`
        }} />
      );
    }


    return(
    <div>
    <Nav />
      <div className="persona-page">
        <h1>choose a foodie type</h1>
        <h2>We will recommend recipes based on the traits of the persona you choose!</h2>
        <div className="persona-container">
          {R.map(this.renderPersonas, personas)}
        </div>
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
