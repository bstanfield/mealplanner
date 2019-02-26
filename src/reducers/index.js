import { combineReducers } from 'redux';
import recipePage from './recipePage';
import personas from './personas';

const rootReducer = combineReducers({
  recipePage: recipePage,
  personas: personas,
});

export default rootReducer;
