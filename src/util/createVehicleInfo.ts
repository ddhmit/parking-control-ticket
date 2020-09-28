import {
  ICarInfo,
  CarType,
  ICreateOrderRes,
  IPayOrder
} from '~/model/paymentResult/actionTypes';

/**
 * 根据车辆类型，返回显示的识别码
 *
 * @param {ICarInfo} car
 * @returns {string}
 */
export const createVehicleID = function (car: ICarInfo): string {
  if (!car) return '';
  if (car.type === CarType.Motor) {
    return car.license || '该机动车车牌号未设置';
  } else {
    return car._id;
  }
};

export const createVehicleParkingDuration = function (
  order: IPayOrder
): string {
  return order
    ? `${order.days || 0}天${order.hours || 0}小时${order.minutes || 0}分`
    : '';
};

const decimalRex = /\.(\d+)$/;

export const createVehicleFee = function (payment: ICreateOrderRes): string {
  let price = payment ? String(payment.payInfo.price) : '';
  let match = price.match(decimalRex);
  let fee = '';
  switch (match) {
    case null:
      fee = `${price}.00`;
      break;
    default:
      if (match[1].length === 1) {
        fee = `${price}0`;
      } else {
        fee = price;
      }
  }
  return fee;
};
