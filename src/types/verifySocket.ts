export enum VerifyStatus {
  Paying = 'paying',
  Ok = 'ok'
}
export interface VerifySocketResponse {
  status: VerifyStatus;
}
