import { SET_RELOAD_FLAG } from './actionTypes';
import { AnyAction } from 'redux';

const InitReloadFlag: boolean = false;

const reloadFlagReducer = (
  state: boolean = InitReloadFlag,
  action: AnyAction
) => {
  const { flag, type } = action;
  switch (type) {
    case SET_RELOAD_FLAG:
      return flag;
    default:
      return state;
  }
};

export default reloadFlagReducer;
