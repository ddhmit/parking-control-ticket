import ReduxTypes from '~/types/model';
import { removeTicketData } from '../ticketData/action';
import { removePaymentResult } from '../paymentResult/action';
export const initAppState = (): ReduxTypes.AppThunk => {
  return dispatch => {
    // 初始化时清除小票数据
    dispatch(removeTicketData());
    // 清除支付结果数据
    dispatch(removePaymentResult());
  };
};
