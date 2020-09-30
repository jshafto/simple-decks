import { combineReducers } from 'redux';
import authentication from './authentication';
import decks from './decks';
import cards from './cards'

const rootReducer = combineReducers({
  authentication,
  decks,
  cards,
});

export default rootReducer;
