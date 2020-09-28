import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { ITicketData } from '~/model/ticketData/actionTypes';
import { IPaymentResult } from '~/model/paymentResult/actionTypes';

namespace ReduxTypes {
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    null,
    Action<string>
  >;

  export interface RootState {
    ticketData: null | ITicketData;
    paymentResult: null | IPaymentResult;
    // reloadFlag: boolean;
  }
}

export default ReduxTypes;
