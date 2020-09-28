import React, { memo, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import BackHomeButton from '~/component/BackHomeButton';
import TicketBackground from '~/component/TicketBackground';
import PaymentTicketContainer from './component/PaymentTicketContainer';
import PaymentTicket from './component/PaymentTicket';
import PaymentResult from './component/PaymentResult';
import useCountdown from '~/hook/useCountdown';

import { HomeSubRoutePage } from '~/types/route';
import ReduxTypes from '~/types/model';
import { setPaymentResult } from '~/model/paymentResult/action';
import { PaymentResultStatus } from '~/model/paymentResult/actionTypes';

import './index.less';
import market from '~/config/market';

const Timeout = 240; // 4min 视作该订单超时

const PaymentPage: React.FC<HomeSubRoutePage> = props => {
  const { parentPathName, deviceID } = props;
  const history = useHistory();
  // 倒计时，超过这个时间仍未收到支付结果，直接订单超时
  const [countdown] = useCountdown(Timeout);
  const dispatch = useDispatch();
  const paymentResult = useSelector(
    (state: ReduxTypes.RootState) => state.paymentResult
  );

  const onBack = useCallback(() => {
    history.replace(parentPathName);
  }, [history, parentPathName]);

  useEffect(() => {
    if (!paymentResult) {
      onBack();
    }
  }, [onBack, paymentResult]);

  useEffect(() => {
    if (countdown === 0) {
      dispatch(
        setPaymentResult({
          status: PaymentResultStatus.ERROR,
          errorMsg: '订单超时'
        })
      );
    }
  }, [countdown, dispatch]);

  return (
    <TicketBackground id="payment-page">
      <BackHomeButton light />
      <PaymentTicketContainer>
        {paymentResult &&
          (paymentResult.status !== PaymentResultStatus.PENDING ? (
            <PaymentResult
              type={paymentResult.status}
              onBack={onBack}
              errorMsg={paymentResult.errorMsg}
            />
          ) : (
            <PaymentTicket deviceID={deviceID} />
          ))}
      </PaymentTicketContainer>
      {market.csNumber && (
        <p className="custom-service">客服电话：{market.csNumber}</p>
      )}
    </TicketBackground>
  );
};

export default memo(PaymentPage);
