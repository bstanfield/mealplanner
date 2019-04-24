import { combineReducers } from 'redux';
import recipePage from './recipePage';
import personas from './personas';
import recipesMaster from './recipesMaster';

const rootReducer = combineReducers({
  recipePage: recipePage,
  personas: personas,
  recipesMaster: recipesMaster,
});

export default rootReducer;
