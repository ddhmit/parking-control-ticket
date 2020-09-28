import React, { useCallback, useState } from 'react';
import { Descriptions } from 'antd';

import './index.less';
import { createQrcodeImg } from '~/util/qrcode';
import { useSelector, useDispatch } from 'react-redux';
import ReduxTypes from '~/types/model';
import { formatTicketCreateTime } from '~/util/timeFormat';
import useVerifyPayResult from '~/hook/useVerifyPayResult';
import { setPaymentResult } from '~/model/paymentResult/action';
import { PaymentResultStatus } from '~/model/paymentResult/actionTypes';
import {
  createVehicleID,
  createVehicleParkingDuration,
  createVehicleFee
} from '~/util/createVehicleInfo';

import { VerifyStatus } from '~/types/verifySocket';
import FakeQrCode from '~/page/Payment/component/FakeQrcode';

const PaymentTicket: React.FC<{ deviceID: string }> = ({ deviceID }) => {
  const payment = useSelector(
    (state: ReduxTypes.RootState) => state.paymentResult!.payment
  );

  /* 二维码 */
  const qrcode = createQrcodeImg(payment ? payment.payUrl : '', {
    moduleSize: 8,
    margin: 2
  });

  const [waiting, setWaiting] = useState(false);

  /* 停车时长 */
  const duration = payment ? createVehicleParkingDuration(payment.payInfo) : '';
  /* 识别码 */
  const identifier = payment ? createVehicleID(payment.car) : '';

  /* 开启支付结果监听 */
  const dispatch = useDispatch();
  const listener = useCallback(
    (data: { status: VerifyStatus }) => {
      if (data.status === VerifyStatus.Ok) {
        // 支付成功
        dispatch(setPaymentResult({ status: PaymentResultStatus.SUCCESS }));
      }
      if (data.status === VerifyStatus.Paying) {
        setWaiting(true);
      }
    },
    [dispatch]
  );
  useVerifyPayResult(listener, deviceID);

  return payment ? (
    <section className="payment-ticket">
      <section className="qrcode-area top-area">
        {waiting ? (
          <FakeQrCode />
        ) : (
          <img src={qrcode} alt="支付二维码" className="qrcode-img" />
        )}
        <p className="tip">请使用微信扫码支付</p>
      </section>
      <Descriptions className="info-area bottom-area" title={false} column={1}>
        <Descriptions.Item label="识别码">{identifier}</Descriptions.Item>
        <Descriptions.Item label="进站时间">
          {formatTicketCreateTime(payment.car.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label="停车时长">{duration}</Descriptions.Item>
        <Descriptions.Item label="消费金额" className="fee-item">
          {createVehicleFee(payment)}元
        </Descriptions.Item>
      </Descriptions>
    </section>
  ) : null;
};
export default PaymentTicket;
