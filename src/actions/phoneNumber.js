import {ADD_PHONE_NUMBER} from './types';

export const setPhoneNumber = (phoneNumber) => {
  return {
    type: ADD_PHONE_NUMBER,
    payload: phoneNumber,
  };
};
