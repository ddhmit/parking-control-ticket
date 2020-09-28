import request from './request';
import api from '~/config/api';
import market from '~/config/market';
import { ITicketData } from '~/model/ticketData/actionTypes';
import {
  IPaymentParams,
  IPaymentResult,
  PaymentResultStatus,
  ICreateOrderRes,
  OpenDoorStatus
} from '~/model/paymentResult/actionTypes';

export async function createTicket(blob: Blob, serialno: string) {
  if (blob && serialno && market) {
    let fd = new FormData();
    fd.append('portrait', blob, 'portrait.png');
    // 添加设备序列号
    fd.append('serialno', serialno);
    // 添加市场 id
    fd.append('market', market.id);
    return request.post<ITicketData>(api.CreateTicketUrl, fd);
  } else {
    return Promise.reject(new Error('获取小票的数据不完整'));
  }
}

export async function sendScanTicketID(
  params: Omit<IPaymentParams, 'market'>
): Promise<IPaymentResult> {
  try {
    let res = await request.post<ICreateOrderRes>(api.SendTicketIDUrl, {
      ...params,
      market: market.id
    });
    // 无需付费可直接开门，status === ok
    if (res.data.payInfo.status === OpenDoorStatus.Ok) {
      return { status: PaymentResultStatus.SUCCESS, payment: null };
    }
    return { status: PaymentResultStatus.PENDING, payment: res.data };
  } catch (err) {
    throw err;
  }
}
