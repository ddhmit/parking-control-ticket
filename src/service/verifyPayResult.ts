import io from 'socket.io-client';
import api from '~/config/api';

export const VerifyNS = '/payNotice';
/**
 *  1. 手动开关 socket
 *  2. 在 Scan 页面开启
 *  3. 在 Home 页面关闭
 */
const socket = io(api.BaseUrl + VerifyNS, { autoConnect: false });

export default socket;
