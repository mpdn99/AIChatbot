import {combineReducers} from 'redux';
import phoneNumberReducer from './phoneNumberReducer';
import confirmReducer from './confirmReducer';
import roleReducer from './roleReducer';
import {DESTROY_SESSION} from '../actions/types';
import idReducer from './idReducer';

const appReducer = combineReducers({
  phoneNumberReducer,
  confirmReducer,
  roleReducer,
  idReducer,
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
