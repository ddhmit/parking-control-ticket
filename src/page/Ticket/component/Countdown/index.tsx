import React, { memo, useEffect } from 'react';
import { Badge } from 'antd';
import useCountdown from '~/hook/useCountdown';

interface CountdownProps {
  onFinish: () => void;
  countdownSec?: number;
  className?: string;
}

const Countdown: React.FC<CountdownProps> = props => {
  const { onFinish, className, countdownSec = 5 } = props;
  const [count] = useCountdown(countdownSec);
  useEffect(() => {
    if (count === 0) {
      onFinish();
    }
  }, [onFinish, count]);

  return <Badge className={className} count={count} showZero></Badge>;
};

export default memo(Countdown);
