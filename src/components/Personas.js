import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetPersonas } from '../actions';
import { Redirect } from 'react-router-dom';

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
      `http://api.stanfield.space/personas`,
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
      <div className="persona" onClick={() => this.setRedirect(persona)}>
        <h2>{persona.persona}</h2>
        <ul>
          {R.map(x => <li>{x}</li>, persona.chars)}
        </ul>
      </div>
    </a>
  )
  
  setRedirect(persona){
    this.setState({ selectedPersona: persona.id, redirect: true });
  }

  render() {
    const { personas } = this.props;

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/surprise',
          search: `?source=preset&persona=${this.state.selectedPersona}`
        }} />
      );
    }


    return(
      <div className="persona-page">
        <h1>Choose a foodie type</h1>
        <h2>We will recommend a recipe based on the traits of the persona you choose!</h2>
        <br/>
        <br/>
        <div className="persona-container">
          {R.map(this.renderPersonas, personas)}
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
