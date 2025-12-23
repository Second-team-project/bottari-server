/**
 * @file app/sevices/user/reserve.service.js
 * @description 예약 Service
 * 251221 N init
 */

import { SERVICE_TYPE } from "../../../configs/service.type.enum.js";
import reserveCodeUtil from "../../utils/reserveCode/reserve.code.util.js";
// ===== repository
import reservationRepository from "../../repositories/reservation.repository.js";
import deliveryRepository from "../../repositories/delivery.repository.js";
import storageRepository from "../../repositories/storage.repository.js";

import db from '../../models/index.js';


/**
 * 예약 데이터를 받아, 예약 코드를 생성 후, reservation 생성
 * @param {*} t - 트랜잭션
 * @param {*} data - 클라이언트에서 보낸 예약 데이터
 * @returns 
 */
async function reservationDraft(t, data) {

    // 1. 예약 코드 생성
    const reserveCode = reserveCodeUtil.createReserveCode(data)
    console.log('reserve.service- reserveCode: ', reserveCode);

    // 2. 레포지토리 호출 : 예약 상태 데이터 저장
    const reserveStateData = {
      userId: data.userId ? data.userId : null,
      code: reserveCode,
    }

    const reserveStateResult = await reservationRepository.create(t, reserveStateData)
    console.log('reserve.service-reserveResult : ', reserveStateResult)

    // 3. 예약 코드 및 저장 데이터 반환
    return { reserveCode, reserveStateResult }

}

/**
 * reservationDraft 호출해서 reservation 데이터 생성 후, storage 데이터 생성
 * @param {*} data - 클라이언트에서 보낸 예약 데이터
 * @returns 
 */
async function storageDraft(data) {
  return await db.sequelize.transaction(async t => {
    // 1. 예약코드 생성 및 '결제 대기' 예약 데이터 생성
    const { reserveCode, reserveStateResult } = await reservationDraft(t, data);
    
    // 2. 예약 타입별 저장 : storage
    if(data.type === SERVICE_TYPE.STORAGE) {
      // 2-1. 예약 데이터 중 필요한 데이터 정리
      const storageData = {
        reservId: reserveStateResult.id,
        price: parseInt(data.price),
        startedAt: data.startedAt,
        endedAt: data.endedAt,
        storeId: parseInt(data.storeId),
        notes: data.notes,
      }
      // 2-2. storage 데이터 생성
      const reserveStorageResult = await storageRepository.create(t, storageData);
      console.log('reserve.service- storageData: ', reserveStorageResult);
  
      // 예약 코드 및 storage 저장 데이터 반환
      return {
        reserveCode,
        reserveStorageResult,
      }
    }
  })  
}

/**
 * reservationDraft 호출해서 reservation 데이터 생성 후, delivery 데이터 생성
 * @param {*} data - 클라이언트에서 보낸 예약 데이터
 * @returns 
 */
async function deliveryDraft(data) {
  return await db.sequelize.transaction(async t => {
    // 1. 예약코드 생성 및 '결제 대기' 예약 데이터 생성
    const { reserveCode, reserveStateResult } = await reservationDraft(t, data);
    
    // 2. 예약 타입별 저장 : delivery
    if(data.type === SERVICE_TYPE.DELIVERY) {
      // 2-1. 예약 데이터 중 필요한 데이터 정리
      const deliveryData = {
        reservId: reserveStateResult.id,
        price: parseInt(data.price),
        startedAt: data.startedAt,
        startedAddr: data.startedAddr,
        endedAddr: data.endedAddr,
        notes: data.notes,
      }
      // 2-2. delivery 데이터 생성
      const reserveDeliveryResult = await deliveryRepository.create(t, deliveryData);
      console.log('reserve.service- deliveryData: ', reserveDeliveryResult);
      
      // 3. 예약 코드 및 deliveyr 저장 데이터 반환
      return {
        reserveCode,
        reserveDeliveryResult,
      }
    }

  })  
}

export default {
  storageDraft,
  deliveryDraft
}