import React, { memo, useCallback, useRef, useEffect, useState } from 'react';
import { Button, message } from 'antd';
import BackHomeButton from '~/component/BackHomeButton';
import {
  openCamera,
  formatBase64ToBlob,
  getCurrentFrameDataURLFromVideo
} from '~/util/camera';
import { createTicket } from '~/service/ticket';
import { useHistory } from 'react-router-dom';
import route from '~/config/route';
import { useDispatch } from 'react-redux';
import { setTicketData } from '~/model/ticketData/action';
import { HomeSubRoutePage } from '~/types/route';
import market from '~/config/market';

import './index.less';

const PortraitPage: React.FC<HomeSubRoutePage> = props => {
  const { parentPathName, deviceID } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current!.pause();
    }
  }, []);

  const play = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);
  useEffect(() => {
    let video: HTMLVideoElement | null = null;
    if (videoRef.current) {
      video = videoRef.current;
      openCamera(video!, {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });
    }

    return () => {
      if (
        video &&
        video.srcObject &&
        (video.srcObject as MediaStream).getVideoTracks
      ) {
        (video.srcObject as MediaStream).getVideoTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  // 跳转打印小票页面
  const jumpToTicketPage = useCallback(() => {
    history.replace(`${parentPathName}${route.home.routes.ticket.path}`);
  }, [history, parentPathName]);

  // 获取图片数据并发送服务器获取小票数据
  /* 
    1. 暂停录制
    2. 暂停时的帧数据发送
    3. 无论是否发送成功都重新 play
  */
  const captureImage = useCallback(async () => {
    if (
      videoRef.current &&
      videoRef.current.videoHeight &&
      videoRef.current.videoWidth
    ) {
      let currentFrame = getCurrentFrameDataURLFromVideo(videoRef.current);
      if (currentFrame) {
        let blob = formatBase64ToBlob(currentFrame);
        try {
          setLoading(true);
          let res = await createTicket(blob, deviceID);

          dispatch(setTicketData(res.data));
          setLoading(false);
          jumpToTicketPage();
        } catch (err) {
          message.error((err.message || '小票生成失败') + '，请重新获取');
          setLoading(false);
        } finally {
          play();
        }
      }
    } else {
      message.error('无法拍摄到画面，请检查摄像头是否正常开启');
    }
  }, [jumpToTicketPage, dispatch, play, deviceID]);

  // 获取小票按钮点击回调
  const getTicket = useCallback(() => {
    pause();
    captureImage();
  }, [pause, captureImage]);

  return (
    <div id="portrait-page">
      <BackHomeButton disabled={loading} />
      <section className="shot-area">
        <p className="tip-line">请正脸面对屏幕后点击取票按钮</p>
        <section className="portrait-block">
          <div className="portrait-container">
            <video
              className="video"
              crossOrigin="Anonymous"
              ref={videoRef}
              autoPlay
            ></video>
          </div>
        </section>
      </section>
      <section className="shot-button-area">
        <header className="shot-button-area-header">
          <img src="/logo512.png" alt="logo 图标" className="img" />
          <h1 className="title">{market.name}</h1>
        </header>
        <Button
          className="shot-button-area-button"
          loading={loading}
          onClick={getTicket}
        >
          {loading ? '小票生成中...' : '点击此处获取小票'}
        </Button>

        <footer className="footer">
          <p className="footer-tip-line">信息已加密，仅用于身份验证</p>
          <p className="content">
            {market.csNumber &&
              '如出票失败，请拨打客服电话：' + market.csNumber}
          </p>
        </footer>
      </section>
    </div>
  );
};
export default memo(PortraitPage);
/*   {/* {market.csNumber */
/* ? '如出票失败，请拨打客服电话：' + market.csNumber */
/* : ''} */
