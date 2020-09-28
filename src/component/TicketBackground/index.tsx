import React from 'react';
import classNames from 'classnames';
import './index.less';
interface TicketBackgroundProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

const TicketBackground: React.FC<TicketBackgroundProps> = props => {
  const { className, children, ...restProps } = props;
  return (
    <div className={classNames('ticket-bg', className)} {...restProps}>
      {children}
    </div>
  );
};
export default TicketBackground;
