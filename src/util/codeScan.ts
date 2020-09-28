// import { message } from 'antd';
// 键码对应
/* const codes: { [k: string]: number } = {
  '48': 48,
  '49': 49,
  '50': 50,
  '51': 51,
  '52': 52,
  '53': 53,
  '54': 54,
  '55': 55,
  '56': 56,
  '57': 57,
  '96': 48,
  '97': 49,
  '98': 50,
  '99': 51,
  '100': 52,
  '101': 53,
  '102': 54,
  '103': 55,
  '104': 56,
  '105': 57
}; */

import { isProd } from './env';

// let lastTime: number = 0;
// let code: string;

export function codeKeyDown(e: KeyboardEvent) {
  !isProd() && console.log('key down ', e.key, e.keyCode, e.which);
  // let nextCode: string | number = '';
  // let nextTime: number;
  // nextCode = e.key || e.keyCode || e.which;
  // nextTime = new Date().getTime();
  //字母上方 数字键0-9 对应键码值 48-57; 数字键盘 数字键0-9 对应键码值 96-105
  /* if (
    (parseInt(nextCode as string) >= 48 &&
      parseInt(nextCode as string) <= 57) ||
    (parseInt(nextCode as string) >= 96 && parseInt(nextCode as string) <= 105)
  ) {
    nextCode = codes[nextCode];
    nextTime = new Date().getTime();
  } */
  // 第二次输入延迟两秒，删除之前的数据重新计算
  // if (nextTime && lastTime && nextTime - lastTime > 2000) {
  //   // code = String.fromCharCode(parseInt(nextCode as string));
  //   code = String(nextCode);
  // } else {
  //   // code += String.fromCharCode(parseInt(nextCode as string));
  //   code += String(nextCode);
  // }
  // // 保存数据
  // nextCode = nextCode;
  // lastTime = nextTime;
  // code = code;
  // 键入Enter
  if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
    // 判断 code 长度（这里就获取到条码值了，以下业务自由发挥）
    // code = code.trim();
    // 测试扫码情况
    /* if (code.length) {
      // message.info('二维码扫描结果：' + code);
    } else {
      message.info('请扫描二维码');
    } */
    //键入回车务必清空code值
    // code = '';
    // 结束扫码
    return true;
  }
  // 扫码中
  return false;
}

export default function wrappeCodeKeyDown(
  cb: () => void
): (e: KeyboardEvent) => void {
  return (e: KeyboardEvent) => {
    let res = codeKeyDown(e);
    if (res) {
      cb();
    }
  };
}
