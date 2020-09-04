import {combineReducers} from 'redux';
import phoneNumberReducer from './phoneNumberReducer';
import confirmReducer from './confirmReducer';
import roleReducer from './roleReducer';
import {DESTROY_SESSION} from '../actions/types';

const appReducer = combineReducers({
  phoneNumberReducer,
  confirmReducer,
  roleReducer,
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
