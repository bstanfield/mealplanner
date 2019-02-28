import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipePage from './components/RecipePage';
import Home from './components/Home';
import Survey from './components/Survey';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from './reducers';
import Personas from './components/Personas';
import SurpriseCustomize from './components/SurpriseCustomize';


const store = createStore(rootReducers);


ReactDOM.render(
  (<Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/recipe-page" render={() => (<App content={(<RecipePage />)} />)} />
        <Route exact path="/surprise-customize" render={() => (<App content={(<SurpriseCustomize />)} />)} />
        <Route exact path="/survey" render={() => (<App content={(<Survey />)} />)} />
        <Route exact path="/personas" render={() => (<App content={(<Personas />)} />)} />
        <Route exact path="/" render={() => (<App content={(<Home />)} />)} />
      </Switch>
    </Router>
  </Provider>)
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
