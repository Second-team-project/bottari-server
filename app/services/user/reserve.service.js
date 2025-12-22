/**
 * @file app/sevices/user/reserve.service.js
 * @description 예약 Service
 * 251221 N init
 */

import { SERVICE_NAME } from "../../../configs/service.type.enum.js";
import reserveCodeUtil from "../../utils/reserveCode/reserve.code.util.js";
// ===== repository
import reservationRepository from "../../repositories/reservation.repository.js";
import deliveryRepository from "../../repositories/delivery.repository.js";
import storageRepository from "../../repositories/storage.repository.js";

import db from '../../models/index.js';


async function draft(data) {
  return await db.sequelize.transaction(async t => {
    // 1. 예약 코드 생성
    const reserveCode = reserveCodeUtil.createReserveCode(data)
    console.log('reserve.service- reserveCode: ', reserveCode);

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
      
      return {
        reserveCode,
        reserveDeliveryResult,
      }
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
  
      return {
        reserveCode,
        reserveStorageResult,
      }
    }

    // TODO: 두 타입에 해당되지 않을 경우, 처리 -> 유효성 검사로 타입은 모두 해당 될 것.
    // 유효성에 체크되지 않은 극소수 -> 에러 일으켜서 트랜잭션 롤백 되도록 처리.
    // throw new CustomError(INVALID_SERVICE_TYPE);
  })


  
  // 3. 클라이언트로 예약 코드 전송
  

}

export default {
  draft,

}