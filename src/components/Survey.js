import React, { Component } from 'react';
import * as R from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          q: 'Do you have any dietary preferences?',
          desc: 'This is the subtext of the question'
        },
        {
          q: 'What is another question?',
          desc: 'Idk I am tired of making fake content'
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
      <h1>{this.state.index + 1}/ {question.q}</h1>
        <p>{question.desc}</p>
        { 
          (this.state.index + 1) === this.state.questions.length ? 
          (<div className="btn fit-content">Submit!</div>) : 
          (<div onClick={ this.updateIndex }className="btn fit-content">Next question</div>) 
        }
        
    </div>
  )

  render() {
    return(
      <div>
        <h1>Please fill out this survey as best you can.</h1>
        <h2>We will recommend a recipe based on the preferences you enter.</h2>
        <br/>
        <br/>
        { this.renderSurveyQuestion(this.state.questions[this.state.index]) }
      </div>
    )
  }
}

export default Survey;