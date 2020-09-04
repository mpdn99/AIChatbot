import {ADD_ROLE} from '../actions/types';

const roleReducer = (state = '', action) => {
  switch (action.type) {
    case ADD_ROLE:
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};

export default roleReducer;
