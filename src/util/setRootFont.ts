const DesignW = 1024; // 改为横屏
const Design1Rem = 32;

const styleEle = document.createElement('style');
document.head.appendChild(styleEle);

export default function setRootFontSize() {
  let docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      styleEle.innerText = `html {font-size: ${
        clientWidth / (DesignW / Design1Rem)
      }px !important}`;
    };

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
}
