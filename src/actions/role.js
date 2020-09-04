import {ADD_ROLE} from './types';

export const setRole = (role) => {
  return {
    type: ADD_ROLE,
    payload: role,
  };
};
