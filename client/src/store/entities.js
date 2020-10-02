import { combineReducers } from 'redux';
import decks from './decks';
import cards from './cards';
import categories from './categories';

const entitiesReducer = combineReducers({
  decks,
  cards,
  categories,
});

export default entitiesReducer;
