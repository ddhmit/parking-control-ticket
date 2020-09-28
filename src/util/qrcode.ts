import { Encoder, ErrorCorrectionLevel, Decoder } from '@nuintun/qrcode';

export const QrcodeDecodeErrs = [
  'failed to load image: data:,',
  'failed to decode image'
];

export const createQrcodeImg = (
  content: string,
  size: { moduleSize: number; margin: number } = { moduleSize: 5, margin: 10 }
): string | undefined => {
  if (!content) return;
  const qrcode = new Encoder();

  qrcode.setEncodingHint(true);
  qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.H);

  return qrcode.write(content).make().toDataURL(size.moduleSize, size.margin);
};

export const decodeQrcodeImg = (img: string) => {
  const qrcode = new Decoder();
  return qrcode.scan(img);
};
