import React, { useContext } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import classNames from 'classnames';
import { ReactComponent as BackHomeIcon } from '../../assets/imgs/backIcon.svg';

import './index.less';
import { useHistory } from 'react-router-dom';

export const BackHomeContext = React.createContext('/');

const BackHomeButton: React.FC<
  {
    light?: boolean;
    // [s: string]: any;
  } & ButtonProps
> = props => {
  const { light, ...restProps } = props;
  const history = useHistory();
  const homePath = useContext(BackHomeContext);
  return (
    <Button
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        history.replace(homePath);
      }}
      className={classNames('back-home-btn', {
        'back-home-btn--light': light
      })}
      type="primary"
      shape="round"
      {...restProps}
    >
      <BackHomeIcon />
      返回首页
    </Button>
  );
};
export default BackHomeButton;
