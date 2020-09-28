import { isProd } from '~/util/env';
const Timeout = 5000;
let BaseUrl: string = 'https://frp.bgonline.cn';
if (isProd()) {
  // 生产环境
  BaseUrl = 'https://park.ddhmit.com';
}

// 传递照片数据创建小票
const CreateTicketUrl = '/api/ticket/print';

// 发送 ticket id
const SendTicketIDUrl = '/api/ticket/padScan';

export default {
  Timeout,
  BaseUrl,
  CreateTicketUrl,
  SendTicketIDUrl
};
