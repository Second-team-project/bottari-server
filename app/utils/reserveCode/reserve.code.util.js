/**
 * @file app/utils/reserveCode/reserve.code.util.js
 * @description reserve code utility
 * 251217 N init
 */

import dayjs from "dayjs";
import { SERVICE_CODE } from "../../../configs/service.type.enum.js";
import { CUSTOMER_CODE }from "../../../configs/customer.type.enum.js";
import { customAlphabet } from "nanoid";

// 1-4. 예약코드 5글자 설정 : O, 0, I, l 등 제외
const customNanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 5);

function createReserveCode(data) {
  // 1-1. 타입 설정 : D/S
  const serviceType = SERVICE_CODE[data.type] || 'N';
  
  // 1-2. 유저 설정 : M/G
  const userType = CUSTOMER_CODE[data.userType] || 'N';

  // 1-3. 날짜 설정 : YYMMDD
  const dayType = dayjs().format('YYMMDD');

  // 1-4. 랜덤 코드
  
  return `${serviceType}${userType}${dayType}${customNanoid()}`;
}

export default {
  createReserveCode,
}