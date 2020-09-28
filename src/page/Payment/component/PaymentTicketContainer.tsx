import React, { memo, PropsWithChildren } from 'react';
import './index.less';
const PaymentTicketContainer: React.FC<PropsWithChildren<any>> = props => {
  return (
    <section className="payment-ticket-container">{props.children}</section>
  );
};
export default memo(PaymentTicketContainer);
