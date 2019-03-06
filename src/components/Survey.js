import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route, Switch, Redirect } from 'react-router-dom';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          q: 'How many meals do you need to prep every week?',
          desc: 'Estimate how many breakfasts, lunches, and dinners that you currently or would like to replace with prepped food.'
        },
        {
          q: 'How much money would you like to spend on a meal?',
          desc: 'Estimate from your current cooking expenses or enter a price point you want to aim for.'
        },
        {
          q: 'How much time do you spend cooking a meal?',
          desc: 'Estimate how long a simple dinner takes to cook, or how much time you have available for cooking a meal in minutes.'
        },
        {
          q: 'What cuisines do you prefer?',
          desc: 'Choose as many options as you like.'
        },
        {
          q: 'Do you have any dietary preferences?',
          desc: 'Select as many as applicable.'
        },
      ],
      index: 0,
      isComplete: false,
    };
  }

  updateIndex = () => {
    const newIndex = this.state.index + 1;
    this.setState(
      { index: newIndex }
    )
  }

  renderSurveyQuestion = (question) => (
    <div className="questionBox">
      <h3>{this.state.index + 1}/ {question.q}</h3>
        <p>{question.desc}</p>
        <form>
          <input type="text" name="" className="survey-text"></input>
        </form>
        {
          (this.state.index + 1) === this.state.questions.length ?
          (<div onClick={() => this.setState({ isComplete: true })} className="btn fit-content">Submit!</div>) :
          (<div onClick={ this.updateIndex } className="btn fit-content">Next question</div>)
        }

    </div>
  )

  render() {
    const { isComplete } = this.state;

    if (isComplete) {
      return (
        <Redirect exact to="/surprise-customize" />
      )
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
