import React, { memo } from 'react';
import { ReactComponent as CheckIcon } from '~/assets/imgs/circleCheck.svg';
import fakeQrcode from '~/assets/imgs/fakeQrcode.png';

const FakeQrcode: React.FC = (props: any) => {
  return (
    <div className="qrcode-img fake-qrcode">
      <img src={fakeQrcode} alt="已扫码" style={{ width: '100%' }} />
      <div className="fake-qrcode-tip-area">
        <CheckIcon className="tip-icon" />
        <span className="tip-content">扫码成功，请在手机上完成支付</span>
        <span className="tip-content">
          支付失败，请点击右上角按钮返回首页，重新进行支付
        </span>
      </div>
    </div>
  );
};
export default memo(FakeQrcode);
