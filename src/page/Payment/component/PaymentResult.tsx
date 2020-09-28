import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import useCountdown from '~/hook/useCountdown';

import './index.less';
import { PaymentResultStatus } from '~/model/paymentResult/actionTypes';
import { useSelector } from 'react-redux';
import ReduxTypes from '~/types/model';

interface PaymentResultProps {
  type: PaymentResultStatus;
  onBack: () => void;
  countdown?: number;
  errorMsg?: string;
}

const PaymentResult: React.FC<PaymentResultProps> = props => {
  const { type, onBack, countdown = 3, errorMsg = '支付失败' } = props;
  const [count] = useCountdown(countdown);
  const isSuccess =
    type === PaymentResultStatus.SUCCESS ||
    type === PaymentResultStatus.PENDING;
  const isOpenStatus = useSelector((state: ReduxTypes.RootState) => {
    let paymentResult = state.paymentResult;
    // 直接开门
    return (
      paymentResult &&
      paymentResult.status === PaymentResultStatus.SUCCESS &&
      paymentResult.payment === null
    );
  });
  useEffect(() => {
    // 支付成功会自动返回
    // 支付失败需要手动返回
    if (isSuccess && count <= 0) {
      onBack();
    }
  }, [isSuccess, count, onBack]);
  return (
    <section
      className={classNames('payment-result', {
        'result-success': isSuccess,
        'result-fail': !isSuccess
      })}
    >
      <section className="top-area">
        {isSuccess ? (
          <CheckCircleOutlined className="payment-result-icon" />
        ) : (
          <CloseCircleOutlined className="payment-result-icon" />
        )}
        <p className="payment-result-title">
          <span className="title-content">
            {isSuccess ? (isOpenStatus ? '开闸成功' : '支付成功') : errorMsg}
          </span>
        </p>
      </section>
      <div className="bottom-area">
        <p className="payment-result-countdown">{count}</p>
        <Button
          onClick={onBack}
          className="payment-result-back-button"
          type="primary"
        >
          立即返回
        </Button>
      </div>
    </section>
  );
};
export default PaymentResult;
