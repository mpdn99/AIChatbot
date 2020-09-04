import {ADD_CONFIRM} from './types';

export const setConfirm = (confirm) => {
  return {
    type: ADD_CONFIRM,
    payload: confirm,
  };
};
