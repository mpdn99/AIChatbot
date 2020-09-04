import {DESTROY_SESSION} from './types';

export const destroySession = () => {
  return {
    type: DESTROY_SESSION,
  };
};
