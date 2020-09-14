import {ADD_ID} from './types';

export const setUser_id = (user_id) => {
  return {
    type: ADD_ID,
    payload: user_id,
  };
};