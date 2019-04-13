import React, { Component } from 'react';
import './App.scss';
import Nav from './components/Nav';
import ReactGA from 'react-ga';


ReactGA.initialize('UA-137386963-1');
ReactGA.pageview(window.location.pathname + window.location.search);

console.log('page: ', window.location.pathname + window.location.search);


class App extends Component {
  state = {
    data: null
  };
  
  componentDidMount() {  
    // Callfetch function below once the component mounts
    this.callBackendAPI()
    .then(res => this.setState({ data: res.express }))
    .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="app-content">
          {this.props.content}
          <p>{this.state.data}</p>
        </div>
      </div>
    );
  }
}

export default App;
