import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipePage from './components/RecipePage';
import Nav from './components/Nav';


ReactDOM.render(
  (<Router>
    <Switch>
      <Route exact path="/recipe-page" render={() => (<App content={(<RecipePage />)} />)} />
    </Switch>
  </Router>)
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
