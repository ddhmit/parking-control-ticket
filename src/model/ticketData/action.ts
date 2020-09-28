import {
  SET_TICKET_DATA,
  REMOVE_TICKET_DATA,
  ITicketData
} from './actionTypes';

export const setTicketData = (data: ITicketData) => {
  return {
    type: SET_TICKET_DATA,
    ticket: data
  };
};

export const removeTicketData = () => {
  return {
    type: REMOVE_TICKET_DATA
  };
};
