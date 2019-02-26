import { combineReducers } from 'redux';
import recipePage from './recipePage';

const rootReducer = combineReducers({
  recipePage: recipePage,
});

export default rootReducer;
