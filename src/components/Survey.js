import React, { Component } from 'react';
import '../survey.scss';
import Nav from './Nav';
import BackButton from './BackButton';
// figure out how to do back on survey

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
          answer: '15',
        },
        {
          q: 'How much time do you spend cooking a meal?',
          desc: 'Estimate how long a simple dinner takes to cook, or how much time you have available for cooking a meal in minutes.',
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
            }
          ],
          answer: '500',
        },
        {
          q: 'Do you have any dietary preferences?',
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
              label: 'Nut Free'
            },
            {
              value: 5,
              label: 'Gluten Free'
            },
            {
              value: 6,
              label: 'Pescatarian'
            }
          ],
          answer: '0',
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

  backIndex = () => {
    const newIndex = this.state.index - 1;
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
    <div className="questionrow">
      <div className="questioncolumn qc">
        <h3>{question.q}</h3>
        <p>{question.desc}</p>
      </div>

      <div className="questioncolumn">
        <form>
         {question.options.map((option) => (
            <label>
            <input
              type="radio"
              name={this.state.index}
              value={option.value}
              key={option.value}
              onChange={(e) => this.handleInputChange(e)}
            />
            {` ${option.label}`}
            <br /><br />
            </label>
            )
          )}
        </form>
        {
          (this.state.index >= 1)
          ? (<div onClick={ this.backIndex } className="btn fit-content">
                Previous
              </div>) : ''
        }
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
          search: `?source=survey&cost=${cost}&cookTime=${cookTime}&restriction=${restriction}`,
          state: {backTo: this.props.location},
        }} />
      );
    }


    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    return(
      <div>
      <Nav />
      <BackButton name="Go Home" />
      <div className="surveycontainer">
       { this.renderSurveyQuestion(this.state.questions[this.state.index]) }
      </div>
      </div>
    )
  }
}

export default Survey;
