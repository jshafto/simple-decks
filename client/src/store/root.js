import { combineReducers } from 'redux';
import authentication from './authentication';
import entities from './entities';
import ui from './ui';

const rootReducer = combineReducers({
  authentication,
  entities,
  ui
});

export default rootReducer;
