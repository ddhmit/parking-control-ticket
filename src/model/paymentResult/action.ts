import {
  IPaymentResult,
  SET_PAYMENT_RESULT,
  REMOVE_PAYMENT_RESULT,
  PaymentResultStatus
} from './actionTypes';
import ReduxTypes from '~/types/model';
import { sendScanTicketID } from '~/service/ticket';

export const setPaymentResult = (data: IPaymentResult) => {
  return {
    type: SET_PAYMENT_RESULT,
    result: data
  };
};

export const removePaymentResult = () => {
  return {
    type: REMOVE_PAYMENT_RESULT
  };
};

export const getPaymentResultAsync = (props: {
  ticket: string;
  serialno: string;
}): ReduxTypes.AppThunk<Promise<IPaymentResult | undefined>> => {
  return async dispatch => {
    try {
      let res: IPaymentResult = await sendScanTicketID(props);
      dispatch(setPaymentResult(res));
      return res;
    } catch (err) {
      dispatch(
        setPaymentResult({
          errorMsg: err.message || '订单生成失败',
          status: PaymentResultStatus.ERROR
        })
      );
    }
  };
};
