import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route, Switch, Redirect } from 'react-router-dom';

import ReactGA from 'react-ga';
export const initGA = () => {
    console.log('GA init');
    ReactGA.initialize('UA-137386963-1');
}
export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          q: 'How much money would you like to spend on a meal?',
          desc: 'Estimate from your current cooking expenses or enter a price point you want to aim for.',
          answer: '', 
        },
        {
          q: 'How much time do you spend cooking a meal?',
          desc: 'Estimate how long a simple dinner takes to cook, or how much time you have available for cooking a meal in minutes.',
          answer: '', 
        },
        {
          q: 'Do you have any dietary preferences?',
          desc: 'Vegetarian, Vegan, Gluten Free?',
          answer: '', 
        },
      ],
      index: 0,
      isComplete: false,
      error: '',
    };
  }

  updateIndex = () => {
    const newIndex = this.state.index + 1;
    this.setState(
      { index: newIndex }
    )
  }

  handleInputChange = (event) => {
    var questionsClone = {...this.state.questions};
    questionsClone[this.state.index].answer = event.target.value;
    this.setState({questionsClone});
    console.log("questionsClone", questionsClone)
  }

  renderSurveyQuestion = (question) => (
    <div className="questionBox">
      <h3>{this.state.index + 1}/ {question.q}</h3>
        <p>{question.desc}</p>
        <form>
          <input type="text" id={this.state.index} className="survey-text" value={this.state.questions[this.state.index].answer} onChange={ (e) => this.handleInputChange(e) }></input>
        </form>
        {
          (this.state.index + 1) === this.state.questions.length 
          ? ( 
            <div onClick={() => this.setState({ isComplete: true })} className="btn fit-content">
              Submit!
            </div>
            )
          : (
            <div onClick={ this.updateIndex } className="btn fit-content">
              Next question
            </div>
            )
        }

    </div>
  )

  render() {
    const { isComplete } = this.state;

    if (isComplete) {
      let cost = this.state.questions[0].answer
      let cookTime = this.state.questions[1].answer
      let restriction = this.state.questions[2].answer
      return (
        <Redirect to={{
          pathname: '/surprise',
          search: `?source=survey&cost=${cost}&cookTime=${cookTime}&restriction=${restriction}`
        }} />
      );
    }


    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    return(
      <div className="survey-header">
        <h1>Please fill out this survey as best you can</h1>
        <h2>We will recommend a recipe based on the preferences you enter</h2>
        <br/>
        <br/>
        { this.renderSurveyQuestion(this.state.questions[this.state.index]) }
      </div>
    )
  }
}

export default Survey;
