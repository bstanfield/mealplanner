// React Google Analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-137386963-1');

ReactGA.pageview("/");
ReactGA.pageview("/recipe-page");
ReactGA.pageview("/recipes-all");
ReactGA.pageview("/surprise-customize");
ReactGA.pageview("/surprise-persona");
ReactGA.pageview("/filter");
ReactGA.pageview("/survey");
ReactGA.pageview("/personas");


import React, { Component } from 'react';
import './App.scss';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="app-content">
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default App;
