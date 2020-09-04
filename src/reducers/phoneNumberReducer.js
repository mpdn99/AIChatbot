import {ADD_PHONE_NUMBER} from '../actions/types';

const phoneNumberReducer = (state = '', action) => {
  switch (action.type) {
    case ADD_PHONE_NUMBER:
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};

export default phoneNumberReducer;
