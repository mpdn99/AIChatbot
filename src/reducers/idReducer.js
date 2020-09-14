import {ADD_ID} from '../actions/types';

const idReducer = (state = '', action) => {
  switch (action.type) {
    case ADD_ID:
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};

export default idReducer;
