import { SET_RELOAD_FLAG } from './actionTypes';

export const setReloadFlag = (flag: boolean) => {
  return {
    flag,
    type: SET_RELOAD_FLAG
  };
};
