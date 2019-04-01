// React Google Analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-137386963-1');

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
