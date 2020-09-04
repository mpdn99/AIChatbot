import {ADD_CONFIRM} from '../actions/types';

const confirmReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CONFIRM:
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};

export default confirmReducer;
