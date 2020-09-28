import React, { memo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TicketBackground from '~/component/TicketBackground';
import TicketCard from './component/TicketCard';
import Countdown from './component/Countdown';
import './index.less';
import ReduxTypes from '~/types/model';
import { HomeSubRoutePage } from '~/types/route';
import { removeTicketData } from '~/model/ticketData/action';

const TicketPage: React.FC<HomeSubRoutePage> = props => {
  const { parentPathName } = props;
  const ticketData = useSelector(
    (state: ReduxTypes.RootState) => state.ticketData
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const onCountdownFin = useCallback(() => {
    dispatch(removeTicketData());
    history.replace(parentPathName);
  }, [parentPathName, dispatch, history]);

  useEffect(() => {
    if (!ticketData) {
      history.replace(parentPathName);
    }
  }, [parentPathName, history, ticketData]);

  return (
    <TicketBackground id="ticket-page">
      <Countdown onFinish={onCountdownFin} className="ticket-page-countdown" />
      {ticketData && <TicketCard ticket={ticketData} />}
    </TicketBackground>
  );
};
export default memo(TicketPage);
