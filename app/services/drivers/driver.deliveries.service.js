/**
 * @file app/services/drivers/driver.deliveries.service.js
 * @description driver deliveries Service
 * 251230 v1.0.0 김위민 init
 */

import dayjs from "dayjs";
import driverAssignmentRepository from "../../repositories/driverAssignment.repository.js";

/**
 * 배정 내역 조회 후 프론트엔드용 데이터 가공
 */
async function getAssignedDeliveries(driverId) {
  const assignments = await driverAssignmentRepository.findAllAssignedByDriverId(null, driverId);

  const typeMap = {
    'CARRIER': '캐리어',
    'BAG': '가방',
    'BOX': '상자',
    'GOLF': '골프가방'
  };

  return assignments.map(asgn => {
    const reservation = asgn.driverAssignmentReservation; // 예약 정보 객체
    const delivery = reservation.reservIdDeliveries?.[0] || {};
    const booker = reservation.reservIdBookers?.[0] || {};
    const luggages = reservation.reservIdLuggages || [];

    const luggageList = luggages.map(l => {
      const koreanType = typeMap[l.itemType] || l.itemType;
      return `${koreanType} / ${l.itemWeight} / ${l.itemSize || '기본'} / ${l.count}개`;
    });

    return {
      id: asgn.id,                // 배정 PK (나중에 배정 취소/업데이트 시 사용)
      resId: reservation.id,      // 예약 PK (배송 상태 변경 시 사용)
      deliveryState: reservation.state, // 배송 상태
      startAddr: delivery.startedAddr,
      endAddr: delivery.endedAddr,
      pickupTime: delivery.startedAt ? dayjs(delivery.startedAt).format('HH:mm') : '',
      userName: booker.userName,
      userPhone: booker.phone,
      request: reservation.notes,
      luggageList: luggageList 
    };
  });
}

export default { 
  getAssignedDeliveries 
};