import {
  IPaymentResult,
  SET_PAYMENT_RESULT,
  REMOVE_PAYMENT_RESULT
} from './actionTypes';
import produce from 'immer';
import { AnyAction } from 'redux';

const InitPaymentResult: null | IPaymentResult = null;

const paymentResultReducer = produce(
  (draft = InitPaymentResult, action: AnyAction): null | IPaymentResult => {
    const { result, type } = action;
    switch (type) {
      case SET_PAYMENT_RESULT:
        draft = result;
        return draft;
      case REMOVE_PAYMENT_RESULT:
        return InitPaymentResult;
      default:
        return draft;
    }
  }
);

export default paymentResultReducer;
