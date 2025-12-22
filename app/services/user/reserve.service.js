/**
 * @file app/sevices/user/reserve.service.js
 * @description 예약 Service
 * 251221 N init
 */

import { SERVICE_NAME } from "../../../configs/service.type.enum.js";
import reserveCodeUtil from "../../utils/reserveCode/reserve.code.util.js";
// ===== repository
import reservationRepository from "../../repositories/reservation.repository.js";
import deliveryRepository from "../../repositories/delivery.repositoy.js";
import storageRepository from "../../repositories/storage.repository.js";

import db from '../../models/index.js';


async function draft(data) {
  return await db.sequelize.transaction(async t => {
    // 1. 예약 코드 생성
    const reserveCode = reserveCodeUtil.createReserveCode(data)
    console.log('reserve.service- reserveCode: ', reserveCode);
    // 1-2. TODO: 예약코드가 'N'으로 시작하는 경우, 에러 처리

    // 2. 레포지토리 호출 : 
    // 2-1. 예약 상태 저장
    const reserveStateData = {
      userId: data.userId !== 'guest' ? parseInt(data.userId) : null,
      code: reserveCode,
    }
    const reserveStateResult = await reservationRepository.create(t, reserveStateData)
    // console.log('reserve.service-reserveResult : ', reserveStateResult)
    
    // 2-2. 예약 타입별 저장
    // 2-2-1. delivery
    if(data.type === SERVICE_NAME.DELIVERY) {
      const deliveryData = {
        reservId: reserveStateResult.id,
        price: parseInt(data.price),
        startedAt: data.startedAt,
        startedAddr: data.startedAddr,
        endedAddr: data.endedAddr,
        notes: data.notes,
      }
      const reserveDeliveryResult = await deliveryRepository.create(t, deliveryData);
      // console.log('reserve.service- deliveryData: ', reserveDeliveryResult);
      
      return reserveDeliveryResult;
    }
    // 2-2-2. storage
    if(data.type === SERVICE_NAME.STORAGE) {
      const storageData = {
        reservId: reserveStateResult.id,
        price: parseInt(data.price),
        startedAt: data.startedAt,
        endedAt: data.endedAt,
        storeId: parseInt(data.storeId),
        notes: data.notes,
      }
      const reserveStorageResult = await storageRepository.create(t, storageData);
      // console.log('reserve.service- storageData: ', reserveStorageResult);
  
      return reserveStorageResult;
    }

  })


  
  // 3. 클라이언트로 예약 코드 전송
  

}

export default {
  draft,

}