import { message } from 'antd';

/**
 * 打开摄像头
 *
 * @export
 * @param {HTMLVideoElement} video
 */
export function openCamera(
  video: HTMLVideoElement,
  size?: { width?: number; height?: number }
) {
  let videoObj: any = {
    video: {
      facingMode: 'user', // 强制前置摄像头
      ...(size && size)
    },
    audio: false
  };
  let errBack = function (error: any) {
    if (error.message === 'Permission denied') {
      alert('请开启摄像头权限');
    } else {
      alert(`摄像头开启出错: ${error.message}`);
    }
  };
  if (navigator.mediaDevices) {
    navigator.mediaDevices
      .getUserMedia(videoObj)
      .then(function (mediaStream) {
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(errBack);
  } else if (navigator.getUserMedia) {
    // Standard
    navigator.getUserMedia(
      videoObj,
      function (stream) {
        video.srcObject = stream;
        video.play();
      },
      errBack
    );
    // @ts-ignore
  } else if (navigator.webkitGetUserMedia) {
    // WebKit-prefixed
    // @ts-ignore
    navigator.webkitGetUserMedia(
      videoObj,
      function (stream: any) {
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
      },
      errBack
    );

    // @ts-ignore
  } else if (navigator.mozGetUserMedia) {
    // Firefox-prefixed

    // @ts-ignore
    navigator.mozGetUserMedia(
      videoObj,
      function (stream: any) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      },
      errBack
    );
  }
}
/**
 * 把 base64 转为 blob
 *
 * @export
 * @param {string} base64Data
 * @returns {Blob}
 */
export function formatBase64ToBlob(base64Data: string): Blob {
  var byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(base64Data.split(',')[1]);
  else byteString = unescape(base64Data.split(',')[1]);
  var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}
/**
 * 截取 video 标签的当前帧，返回该帧的 dataUrl 字符串
 *
 * @export
 * @param {HTMLVideoElement} video
 * @returns {(string | undefined)}
 */
const canvas = document.createElement('canvas');
export function getCurrentFrameDataURLFromVideo(
  video: HTMLVideoElement
): string | undefined {
  if (!video) return;
  // let canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  } else {
    message.error('Canvas API 不可用 , 请使用 chrome 最新版本浏览器');
  }
}
