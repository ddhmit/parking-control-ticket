import {
  SET_TICKET_DATA,
  REMOVE_TICKET_DATA,
  ITicketData
} from './actionTypes';
import produce from 'immer';
import { AnyAction } from 'redux';

const InitTicket: null | ITicketData = null;
//  测试打印用
/* const InitTicket: null | ITicketData = {
  createdAt: '2020-05-14T08:05:22.070Z',
  ticket: '5ebcfbc25fcbc3310c6dcf2d'
}; */

const ticketDataReducer = produce(
  (draft = InitTicket, action: AnyAction): null | ITicketData => {
    const { ticket, type } = action;
    switch (type) {
      case SET_TICKET_DATA:
        draft = ticket;
        return draft;
      case REMOVE_TICKET_DATA:
        return InitTicket;
      default:
        return draft;
    }
  }
);

export default ticketDataReducer;
