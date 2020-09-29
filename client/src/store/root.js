import { combineReducers } from 'redux';
import authentication from './authentication';
import decks from './decks';

const rootReducer = combineReducers({
  authentication,
  decks,
});

export default rootReducer;
