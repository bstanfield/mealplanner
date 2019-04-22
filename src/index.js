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
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';
import Personas from './components/Personas';
import Surprise from './components/Surprise';
import Filter from './components/Filter';
import RecipesAll from './components/RecipesAll';

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
  );


ReactDOM.render(
  (<Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/recipe-page" render={(params) => (<App content={(<RecipePage params={params} />)} />)} />
        {/* pretty redundant to use location.location */}
        <Route exact path="/recipes-all" render={() => (<App content={(<RecipesAll />)} />)} />
        <Route exact path="/surprise" render={(params) => (<App content={(<Surprise params={params} />)} />)} />
        <Route exact path="/filter" render={(params) => (<App content={(<Filter params={params}/>)} />)} />
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
