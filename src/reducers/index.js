import { combineReducers } from 'redux';
import recipePage from './recipePage';
import personas from './personas';
import surprise from './surprise';

const rootReducer = combineReducers({
  recipePage: recipePage,
  personas: personas,
  surprise: surprise,
});

export default rootReducer;
