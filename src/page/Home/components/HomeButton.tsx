import React, { memo } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';

import './HomeButton.less';

interface HomeButtonProps {
  href: string;
  type: 'in' | 'out';
}

const HomeButton: React.FC<HomeButtonProps> = props => {
  const { href, type } = props;
  const isInBtn = type === 'in';
  return (
    // <List.Item>
    <Button
      block
      href={href}
      type="default"
      className={classNames('home-button', {
        'home-button-in': isInBtn,
        'home-button-out': !isInBtn
      })}
    >
      {isInBtn ? '进入' : '离开'}
    </Button>
    // </List.Item>
  );
};

export default memo(HomeButton);
