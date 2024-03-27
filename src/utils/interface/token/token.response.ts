export interface TokenRes {
  token: string;
  refreshToken: string; 
}

export interface SmsCodeResV3 {
  token: string;
  session: string;
}