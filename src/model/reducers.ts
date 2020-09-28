import { combineReducers } from 'redux';
import reduxType from '~/types/model';
import ticketDataReducer from './ticketData/reducer';
import paymentResultReducer from './paymentResult/reducer';
// import reloadFlagReducer from './reloadFlag/reducer';

export default combineReducers<reduxType.RootState>({
  ticketData: ticketDataReducer,
  paymentResult: paymentResultReducer
  // reloadFlag: reloadFlagReducer
});
