import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import customEE, { CustomEvents } from '~/util/customEvent';
import { ReloadTime } from '~/util/reload';
import market from '~/config/market';

import './index.less';

interface HomeBackgroundProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HomeBackground: React.FC<HomeBackgroundProps> = props => {
  const { className, children, ...restProps } = props;
  const [time, setTime] = useState(Date.now());
  const timerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        let date = new Date();
        setTime(date.getTime());

        let timeRecord = [
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        ].join();

        if (timeRecord === ReloadTime) {
          customEE.emit(CustomEvents.ReloadApp);
        }
      }, 1000);
    }

    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className={classNames('home-bg', className)} {...restProps}>
      <header className="home-header">
        <img src="/logo512.png" alt="logo 图标" className="logo" />
        <h1 className="title">{market.name}</h1>
      </header>
      <section className="inner-container">{children}</section>
      <footer className="home-footer">
        <span className="phone-num">
          {market.csNumber ? `客服电话: ${market.csNumber}` : ''}
        </span>
        <span className="time">{getFooterTime(time)}</span>
      </footer>
    </div>
  );
};

function getFooterTime(time: number) {
  return moment(time).format('YYYY.MM.DD HH:mm:ss');
}

export default HomeBackground;
