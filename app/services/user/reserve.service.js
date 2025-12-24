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
import bookerRepository from "../../repositories/booker.repository.js";
import luggageRepository from "../../repositories/luggage.repository.js";

import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import axios from "axios";

// ===============================================================
// ||     공통 로직                                              ||
// ||   예약코드 생성, 예약 상태 저장, 짐 정보 저장, 예약자 정보 저장   ||
// ===============================================================

/**
 * 예약 데이터를 받아, 예약 코드를 생성 후, reservation & booker & luggage 생성
 * @param {*} t - 트랜잭션
 * @param {*} data - 클라이언트에서 보낸 예약 데이터
 * @returns 
 */
async function reservationDraft(t, data) {

    // 1. 예약 코드 생성
    const reserveCode = reserveCodeUtil.createReserveCode(data)
    console.log('reserve.service- reserveCode: ', reserveCode);

    // 2. 예약 상태 데이터 저장
    const reserveStateData = {
      userId: data.userId ? data.userId : null,
      code: reserveCode,
    }

    const reserveStateResult = await reservationRepository.create(t, reserveStateData)
    console.log('reserve.service-reserveResult : ', reserveStateResult)

    // 3. 예약자 저장
    const bookerData = {
      reservId: reserveStateResult.id,
      userId: data.userId ? data.userId : null,
      userName: data.userName,
      phone: data.phone || null,
      email: data.email,
      passwordHash: data.userId ? null : await bcrypt.hash(data.password, 10),
    }

    const bookerResult = await bookerRepository.create(t, bookerData)
    console.log('reserve.service-bookerResult : ', bookerResult)

    // 4. 짐 정보 저장
    const luggageData = data.luggageList.map(luggage => ({
      reservId: reserveStateResult.id,
      itemType: luggage.itemType,
      itemWeight: luggage.itemWeight,
      itemSize: luggage.itemSize,
      count: luggage.count,
    }))

    const luggageResult = await luggageRepository.bulkCreate(t, luggageData)
    console.log('reserve.service-luggageResult : ', luggageResult)

    // 3. 예약 코드 및 저장 데이터 반환
    return { reserveCode, reserveStateResult }

}

// ================================
// ||     분리 로직                ||
// ||   delivery / storage 저장   ||
// ================================

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

async function confirmTossPayment(data) {
  return await db.sequelize.transaction(async t => {

    console.log('service-payment-data : ', data)
    
    // 1. 결제 승인 요청
    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    const encryptedSecretKey = "Basic " + Buffer.from(process.env.TOSS_PAYMENTS_WIDGET_SCRET_KEY + ":").toString("base64");

    // 1-1. toss 서버에 결제 승인 요청
    // 결제를 승인하면 결제수단에서 금액이 차감돼요.
    const tossResponse = await axios.post(
      process.env.TOSS_PAYMENTS_API_URL_PAY_PERMIT,
      {
        orderId: data.orderId,
        amount: data.amount,
        paymentKey: data.paymentKey,
      },
      {
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
      }
    )

    // 2. 결제 승인 데이터 저장 & 예약 상태 업데이트
    // 2-1. 결제 승인 데이터 담기
    const tossData = tossResponse.data;
    // 2-2. 업데이트 용 데이터 담기
    const updateData = {
      code: data.orderId,
      state: "RESERVED",
      paymentKey: tossData.paymentKey,
      paymentMethod: tossData.method,
      approvedAt: tossData.approvedAt,
    }
    
    // 2-3. 결제 승인 데이터 저장 & 예약 상태 업데이트
    await reservationRepository.update(t, updateData)

    return tossData;
  })
}

export default {
  storageDraft,
  deliveryDraft,
  confirmTossPayment,
}