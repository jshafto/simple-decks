import { combineReducers } from 'redux';
import decks from './decks';
import cards from './cards'

const entitiesReducer = combineReducers({
  decks,
  cards,
});

export default entitiesReducer;
