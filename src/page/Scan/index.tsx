// 扫码枪版
import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import HomeBackground from '~/component/HomeBackground';
import BackHomeButton from '~/component/BackHomeButton';
import { HomeSubRoutePage } from '~/types/route';

import './index.less';
import wrappeCodeKeyDown from '~/util/codeScan';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import route from '~/config/route';
import {
  getPaymentResultAsync,
  setPaymentResult
} from '~/model/paymentResult/action';
import { PaymentResultStatus } from '~/model/paymentResult/actionTypes';
import { openSocket } from '~/util/switchSocket';
import { isProd } from '~/util/env';

const ScanPage: React.FC<HomeSubRoutePage> = props => {
  const { parentPathName, deviceID } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [scanResult, setScanResult] = useState<string | undefined>(undefined); // 记录第一次 enter 时的 input value
  const [loading, setLoading] = useState(false);
  /* 打开 socket 连接 */
  useEffect(() => {
    // 该 socket 将会在回到首页后关闭
    openSocket();
  }, []);
  /* 发送扫码结果，生成订单 */
  const sendScanResult = useCallback(
    async (scanResult: string) => {
      if (scanResult) {
        // 存在扫码结果，发送生成订单请求
        try {
          setLoading(true);

          await dispatch(
            getPaymentResultAsync({
              ticket: scanResult,
              serialno: deviceID
            })
          );
        } catch (err) {
          // 订单生成失败
          dispatch(
            setPaymentResult({
              status: PaymentResultStatus.ERROR,
              errorMsg: err.message || '订单生成失败'
            })
          );
        } finally {
          // 重置各种值
          setLoading(false);
          setScanResult(undefined);
          inputRef.current && (inputRef.current.value = '');
          // 请求一旦发起，无论成功与否都会跳到支付结果页面
          history.replace(`${parentPathName}${route.home.routes.payment.path}`);
        }
      }
    },
    [history, parentPathName, dispatch, deviceID]
  );
  /* 开启键盘监听，接受扫码结果 */
  useEffect(() => {
    let inputEle: HTMLInputElement;
    // key === Enter 时触发
    const cb = wrappeCodeKeyDown(() => {
      // 一旦获取到结果不再接受新的扫码结果
      if (!scanResult && inputEle && inputEle.value.trim()) {
        let scanResult = inputEle.value.trim();
        setScanResult(scanResult); // 记录第一次 enter 的扫码结果
        sendScanResult(scanResult);
        message.info('扫描结果：' + scanResult);
        // 获取到空值
      } else if (!scanResult && inputEle && !inputEle.value.trim()) {
        message.error('未获取到扫码结果，请重新扫码');
      }
    });

    if (inputRef.current) {
      inputEle = inputRef.current;
      inputEle.focus();
      inputEle.addEventListener('keydown', cb);
    }

    return () => {
      inputEle && inputEle.removeEventListener('keydown', cb);
    };
  }, [scanResult, sendScanResult]);
  /* 处理隐藏的键盘失去焦点事件 */
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    !isProd() && console.log('失去焦点');
    e.target.focus();
    e.target.value = '';
    setScanResult(undefined);
  };
  return (
    <HomeBackground
      id="scan-page"
      onMouseDown={e => {
        e.preventDefault();
      }}
      onTouchStart={e => {
        e.preventDefault();
      }}
      onTouchEnd={e => {
        e.preventDefault();
      }}
      onTouchMove={e => {
        e.preventDefault();
      }}
    >
      <BackHomeButton
        light
        onMouseDown={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onTouchEnd={e => {
          e.stopPropagation();
        }}
        disabled={loading}
      />
      <div className="scan-page-with-scanner">
        {loading ? '生成订单中' : '等待扫码'}
      </div>
      <p className="scan-tip">请将小票二维码对准仪器进行扫描</p>
      <input
        type="text"
        autoFocus
        className="hidden-input"
        ref={inputRef}
        disabled={loading} // 一旦发送请求，该输入框不可输入
        onBlur={onBlur}
      />
    </HomeBackground>
  );
};
export default memo(ScanPage);
