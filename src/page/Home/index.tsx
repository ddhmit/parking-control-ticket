import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Modal } from 'antd';
// import { Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { BackHomeContext } from '~/component/BackHomeButton';
import HomeButton from './components/HomeButton';

import customEE, { CustomEvents } from '~/util/customEvent';
import route, { EntryRoutes } from '~/config/route';
import { initAppState } from '~/model/init/action';
import { HomeSubRoutePage } from '~/types/route';
import './index.less';
import parseDeviceID from '~/util/parseDeviceID';
import HomeBackground from '~/component/HomeBackground';
import { appReload } from '~/util/reload';
import { closeSocket } from '~/util/switchSocket';

const HomeRoutes: React.FC = () => {
  const subRoutes = route.home.routes;
  const { url, params } = useRouteMatch<any>();
  const deviceIDs = parseDeviceID(params.deviceID);
  const homePath = url.endsWith('/') ? url.slice(0, -1) : url;

  /* 检查 url 中链接配置是否正确 */
  useEffect(() => {
    const deviceIDs = parseDeviceID(params.deviceID);
    if (!deviceIDs.length) {
      showConfirm(() => {
        window.location.href = '/';
      });
    }
  }, [params.deviceID]);

  /* 进入首页，关闭 socket */
  useEffect(() => {
    closeSocket();
  }, []);

  return (
    <Switch>
      <BackHomeContext.Provider value={homePath}>
        <Route path={url} exact>
          <HomePage parentPathName={homePath} deviceID={params.deviceID} />
        </Route>
        {Object.values(subRoutes).map(route => {
          const Page = route.component as React.NamedExoticComponent<
            HomeSubRoutePage
          >;
          return (
            <Route
              key={route.path}
              exact
              path={homePath + route.path}
              component={() => (
                <Page
                  parentPathName={homePath}
                  deviceID={
                    EntryRoutes.includes(route.path)
                      ? deviceIDs[0]
                      : deviceIDs[1]
                  }
                />
              )}
            />
          );
        })}
      </BackHomeContext.Provider>
    </Switch>
  );
};

const HomePage: React.FC<HomeSubRoutePage> = props => {
  const { parentPathName } = props;
  const prefix = parentPathName;

  const subRoutes = route.home.routes;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAppState());
  }, [dispatch]);

  // 监听刷新
  useEffect(() => {
    customEE.addListener(CustomEvents.ReloadApp, appReload);
    return () => {
      customEE.removeListener(CustomEvents.ReloadApp, appReload);
    };
  }, []);

  return (
    <HomeBackground id="home-page">
      {/* <List className="link-list"> */}
      <HomeButton href={prefix + subRoutes.portrait.path} type="in" />
      <HomeButton href={prefix + subRoutes.scan.path} type="out" />
      {/*   
          <Button block href={prefix + subRoutes.scan.path} type="default">
            扫码页面
          </Button> */}
      {/*   <Button block href={prefix + subRoutes.payment.path} type="default">
        测试支付页面
      </Button> */}
      {/* <Button block href={prefix + subRoutes.ticket.path} type="default">
        测试小票生成页面
      </Button> */}
    </HomeBackground>
  );
};

function showConfirm(cb?: () => void) {
  Modal.confirm({
    title: '设备 id 不正确',
    icon: <ExclamationCircleOutlined />,
    content: '请输入正确的设备 id',
    onOk: cb,
    okText: '确认',
    maskClosable: false,
    onCancel() {},
    cancelButtonProps: { style: { display: 'none' } }
  });
}

export default memo(HomeRoutes);
