export const SET_PAYMENT_RESULT = 'set_payment_result';
export const REMOVE_PAYMENT_RESULT = 'remove_payment_result';

export enum PaymentResultStatus {
  SUCCESS = 'success', // 支付成功
  ERROR = 'error', // 支付失败
  PENDING = 'pending' // 等待支付中
}
export enum CarType {
  Motor = '非三轮车',
  NonMotor = '三轮车'
}

export interface ICarInfo {
  _id: string;
  license?: string;
  type: CarType;
  info: {
    images: {
      portrait: string;
    };
  };
  createdAt: string;
}

export enum OpenDoorStatus {
  Ok = 'ok',
  No = 'no'
}
export interface IPayOrder {
  text: string;
  voice: string;
  price: number;
  status: OpenDoorStatus;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  firstDateWasLater: boolean;
}
export interface ICreateOrderRes {
  car: ICarInfo;
  payUrl: string;
  payInfo: IPayOrder;
}

export interface IPaymentResult {
  errorMsg?: string;
  status: PaymentResultStatus;
  payment?: ICreateOrderRes | null;
}

export interface IPaymentParams {
  // 抓拍机序列号
  serialno: string;
  // 小票ID
  ticket: string;
  // 市场ID
  market: string;
}
