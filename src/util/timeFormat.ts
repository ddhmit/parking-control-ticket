import moment from 'moment';
export const formatTicketCreateTime = (time: string) => {
  return moment(time).format('YYYY年M月DD日 HH:mm');
};
