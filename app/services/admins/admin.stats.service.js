/**
 * @file app/services/admin.stats.service.js
 * @description 관리자 통계 관련 service
 * 251230 v1.0.0 김민현 init
 */
import db from '../../models/index.js';
import adminStatsRepository from '../../repositories/stat.repository.js';

/**
 * 월별 매출 및 예약 건수 조회
 */
async function getMonthlyStats() {
  return await db.sequelize.transaction(async t => {
    // 예약 데이터 조회
    const reservations = await adminStatsRepository.findByState();

    // 월별 데이터를 담을 객체 생성
    const monthlyData = {};

    // 통계 변수 초기화
    let totalReservations = 0;    // 총 예약 건수
    let totalDelivery = 0;        // 총 배송 건수
    let totalStorage = 0;         // 총 보관 건수
    let totalRevenue = 0;         // 총 매출 합계

    // 루프 돌려서 데이터 가공
    for (const reservation of reservations) {
      const dateStr = reservation.createdAt;
      const yearMonth = dateStr.substring(0, 7);

      // 해당 월의 객체가 없으면 초기화
      if (!monthlyData[yearMonth]) {
        monthlyData[yearMonth] = {
          month: yearMonth,     // 날짜 형태 '2025-12'
          totalReservations: 0, // 총 예약
          totalDelivery: 0,     // 배송
          totalStorage: 0,      // 보관
          totalRevenue: 0       // 매출
        };
      }

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
      if (reservation.state === 'COMPLETED') {
        target.totalRevenue += Number(reservation.price);
      }
    }

    // 결과 반환
    return Object.values(monthlyData);
  })
}

export default {
  getMonthlyStats,
}