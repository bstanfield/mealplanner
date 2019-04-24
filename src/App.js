import React, { Component } from 'react';
import './App.scss';
import Nav from './components/Nav';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-137386963-1');
ReactGA.pageview(window.location.pathname + window.location.search);

console.log('page: ', window.location.pathname + window.location.search);


class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="app-content">
          {this.props.content}
        </div>
      </div>
    );
  }
}


export default App;
