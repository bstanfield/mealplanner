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
