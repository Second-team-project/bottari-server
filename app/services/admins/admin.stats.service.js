/**
 * @file app/services/admin.stats.service.js
 * @description 관리자 통계 관련 service
 * 251230 v1.0.0 김민현 init
 */
import { RESERVATION_STATE } from '../../../configs/reservation.state.enum.js';
import db from '../../models/index.js';
import adminStatsRepository from '../../repositories/stat.repository.js';

/**
 * 월별 매출 및 예약 건수 조회
 */
async function getMonthlyStats(year) {
  return await db.sequelize.transaction(async t => {

    // 조회 기간 설정
    const startDate = `${year}-01-01 00:00:00`;
    const endDate = `${year}-12-31 23:59:59`;

    // 예약 데이터 조회
    const reservations = await adminStatsRepository.findByState(t, startDate, endDate);


    // 월별 데이터를 담을 객체 생성
    const monthlyData = {};

    // 1~12월 미리 세팅
    for(let i=1; i<=12; i++) {
        const monthStr = `${year}-${String(i).padStart(2, '0')}`; // "2025-01" ~ "2025-12"
        monthlyData[monthStr] = {
            month: monthStr,
            totalReservations: 0, // 총 예약 건수
            totalDelivery: 0, // 총 배송 건수
            totalStorage: 0, // 총 보관 건수
            totalRevenue: 0 // 총 매출 합계
        };
    }

    // 루프 돌려서 데이터 가공
    for (const reservation of reservations) {
      const dateStr = reservation.createdAt;
      const yearMonth = dateStr.substring(0, 7);

      // 해당 월 데이터 가져오기
      const target = monthlyData[yearMonth];

      // 월별 총 예약 건수 카운트
      target.totalReservations++;

      // 예약 코드(code)에 따른 배송/보관 카운트
      const code = reservation.code || '';
      
      if (code.startsWith('D')) {
        // 코드가 'D'로 시작하면 배송
        target.totalDelivery++;
      } else if (code.startsWith('S')) {
        // 코드가 'S'로 시작하면 보관
        target.totalStorage++;
      }

      // 예약 상태(state)가 'COMPLETED'인 경우 월별 매출 누적
      if (reservation.state === RESERVATION_STATE.COMPLETED) {
        target.totalRevenue += Number(reservation.price);
      }
    }

    // 결과 반환
    return Object.values(monthlyData);
  })
}

/**
 * 하루 매출 및 예약 건수 조회
 */
async function getDailyStats() {
  return await db.sequelize.transaction(async t => {
    const today = new Date();
    // YYYY-MM-DD 포맷
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    // 조회 기간 설정
    const startDate = `${year}-${month}-${day} 00:00:00`;
    const endDate = `${year}-${month}-${day} 23:59:59`;

    // 예약 데이터 조회
    const reservations = await adminStatsRepository.findByState(t, startDate, endDate);

    // 하루 통계 변수
    let totalReservations = 0;      // 전체 예약 건수 
    let totalRevenue = 0;           // 전체 매출
    let lostRevenue = 0;            // 취소 건 금액
    let totalDelivery = 0;          // 전체 배송 예약 건수
    let totalStorage = 0;           // 전체 보관 예약 건수
    let completedDelivery = 0;      // 배송 완료 건수
    let completedStorage = 0;       // 보관 완료 건수
    let cancelledReservations = 0;  // 예약 취소 건수

    // 루프 돌려서 데이터 가공
    for (const reservation of reservations) {

      // 총 예약 건수 카운트
      totalReservations++;

      // 요금이 없으면 0으로 표시
      const price = reservation.price ? Number(reservation.price) : 0;

      // 예약 코드(code)에 따른 배송/보관 카운트
      const code = reservation.code || '';
      
      if (code.startsWith('D')) {
        // 코드가 'D'로 시작하면 배송
        totalDelivery++;
      } else if (code.startsWith('S')) {
        // 코드가 'S'로 시작하면 보관
        totalStorage++;
      }

      switch (reservation.state) {
        case RESERVATION_STATE.CANCELLED:
          cancelledReservations++;
          lostRevenue += price;
          break;

        case RESERVATION_STATE.COMPLETED:
          // 매출 누적
          totalRevenue += price;
          
          // 완료 카운트
          if(code.startsWith('D')) {
            completedDelivery++;
          } else if(code.startsWith('S')) {
            completedStorage++;
            break;
          }
      }
    }

    // 결과 반환
    return {
      totalReservations,
      totalDelivery,
      totalStorage,
      totalRevenue,
      lostRevenue,
      completedDelivery,
      completedStorage,
      cancelledReservations,
    }
  })
}

export default {
  getMonthlyStats,
  getDailyStats,
}