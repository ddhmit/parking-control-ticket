import { useEffect } from 'react';
import verifySocket from '~/service/verifyPayResult';
import { VerifySocketResponse } from '~/types/verifySocket';

export default function useVerifyPayResult(
  cb: (data: VerifySocketResponse) => void,
  serilNo: string
) {
  useEffect(() => {
    verifySocket.on(serilNo, cb);

    return () => {
      verifySocket.off(serilNo);
    };
  }, [cb, serilNo]);
}
