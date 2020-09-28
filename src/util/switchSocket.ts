import verifySocket from '~/service/verifyPayResult';
/* 手动开关 socket */
export const openSocket = function () {
  if (verifySocket.disconnected) {
    verifySocket.open();
  }
};

export const closeSocket = function () {
  if (!verifySocket.disconnected) {
    verifySocket.close();
  }
};
