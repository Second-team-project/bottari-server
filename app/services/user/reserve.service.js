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
import storeRepository from "../../repositories/store.repository.js";

import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import axios from "axios";
import customError from "../../errors/custom.error.js";
import { BAD_REQUEST_ERROR } from "../../../configs/responseCode.config.js";


// =================
// ||     결제     ||
// =========================================================================
// ||   공통로직 : 예약코드 생성, 예약 상태 저장, 짐 정보 저장, 예약자 정보 저장   ||
// =========================================================================

/**
 * 예약 데이터를 받아, 예약 코드를 생성 후, reservation & booker & luggage 생성
 * @param {*} t - 트랜잭션
 * @param {*} data - 클라이언트에서 보낸 예약 데이터
 * @returns 
 */
async function reservationDraft(t, data) {

    // 1. 예약 코드 생성
    const reserveCode = reserveCodeUtil.createReserveCode(data)

    // 2. 예약 상태 데이터 저장
    const reserveStateData = {
      userId: data.userId ? data.userId : null,
      code: reserveCode,
      price: parseInt(data.price),
      notes: data.notes,
    }

    const reserveStateResult = await reservationRepository.create(t, reserveStateData)

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

    // 4. 짐 정보 저장
    const luggageData = data.luggageList.map(luggage => ({
      reservId: reserveStateResult.id,
      itemType: luggage.itemType,
      itemWeight: luggage.itemWeight,
      itemSize: luggage.itemSize,
      count: luggage.count,
    }))

    const luggageResult = await luggageRepository.bulkCreate(t, luggageData)

    // 3. 예약 코드 및 저장 데이터 반환
    return { reserveCode, reserveStateResult }

}

// ===========================================
// ||   분리 로직 : delivery / storage 저장   ||
// ===========================================

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
        startedAt: data.startedAt,
        endedAt: data.endedAt,
        storeId: parseInt(data.storeId),
      }
      // 2-2. storage 데이터 생성
      const reserveStorageResult = await storageRepository.create(t, storageData);
  
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
        startedAt: data.startedAt,
        startedAddr: data.startedAddr,
        endedAddr: data.endedAddr,
      }
      // 2-2. delivery 데이터 생성
      const reserveDeliveryResult = await deliveryRepository.create(t, deliveryData);
      
      // 3. 예약 코드 및 deliveyr 저장 데이터 반환
      return {
        reserveCode,
        reserveDeliveryResult,
      }
    }
  })  
}

// ==========================
// ||     결제 승인 요청     ||
// ==========================

/**
 * DB의 결제 대기 데이터와 결제 완료 데이터를 비교한 후, toss로 결제 승인 전송
 * @param {*} data 
 * @returns 
 */
async function confirmTossPayment(data) {
  return await db.sequelize.transaction(async t => {

    // console.log('service-payment-data : ', data)
    
    // 1. 결제 승인 요청
    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    const encryptedSecretKey = "Basic " + Buffer.from(process.env.TOSS_PAYMENTS_WIDGET_SCRET_KEY + ":").toString("base64");

    // 1-1. 결제 금액 체크
    const confirmData = await reservationRepository.findByCode(t, data.orderId)
    // console.log('service-결제금액체크: ', confirmData)

    if (parseInt(confirmData.price) !== parseInt(data.amount)) {
      throw customError('결제 금액 불일치', BAD_REQUEST_ERROR)
    }

    // 1-2. toss 서버에 결제 승인 요청
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

    // console.log('service-tossResponse: ', tossResponse)

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

// =============================
// ||     결제 완료 후 조회     ||
// ========================================================
// ||   분리 로직 : 배송/보관 타입에 따라 조회 후 데이터 담기   ||
// ========================================================

/**
 * 예약코드의 첫글자로 구분 -> 배송/보관(보관소) 테이블 조회 및 데이터 반환
 * @param {*} t 
 * @param {*} code 
 * @param {*} reservId 
 * @returns 
 */
async function getDetailByReservId(t, code, reservId) {
  if(code.startsWith('D')) {
    const data = await deliveryRepository.findByReservId(t, reservId)
    return {
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      endedAddr: data.endedAddr,
    }
  }
  if(code.startsWith('S')) {
    const data = await storageRepository.findByReservId(t, reservId)
    const store = await storeRepository.findByPk(t, data.storeId);
    return {
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      storeName: store.storeName,
    }
  }
}

// ========================================================
// ||   본 로직 : 예약완료 후 예약코드로 정보 보여주기용 조회   ||
// ========================================================

/**
 * 예약 완료 시 정보 조회
 */
async function completePayment(reserveCode) {
  // 단순 조회 -> 트랜잭션 사용x
  // 1. 예약 정보 조회 : reserveCode 사용
  const reservation = await reservationRepository.findByCode(null, reserveCode);
  console.log('service-reservation: ', reservation.id)

  // 2. 예약자 정보 조회 : reservId 사용
  const booker = await bookerRepository.findByReservId(null, reservation.id);

  // 3. 배송/보관 정보 조회 : reservId 사용
  const detail = await getDetailByReservId(null, reserveCode, reservation.id);

  // 4. 짐 정보 조회 : reservId 사용
  const luggage = await luggageRepository.findByReservId(null, reservation.id);
  
  return {
    code: reservation.code,
    notes: reservation.notes,
    ...detail,
    luggageList: luggage,
  }

}

export default {
  storageDraft,
  deliveryDraft,
  confirmTossPayment,
  completePayment,
}