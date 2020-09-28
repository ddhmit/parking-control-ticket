import React, { memo, useEffect } from 'react';
import { Result } from 'antd';

import './index.less';
import { useDispatch } from 'react-redux';
import { initAppState } from '~/model/init/action';

const HomePage: React.FC = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAppState());
  }, [dispatch]);
  return (
    <div id="no-match-page">
      <Result status="404" title="404" subTitle="请在地址栏输入正确的链接" />
    </div>
  );
};
export default memo(HomePage);
