/**
 * @file databases/seeders/dummy-driver_assignments.seeder.js
 * @description create driver_assignments dummy data
 * 251223 v1.0.0 김위민 init
 */

import { faker } from '@faker-js/faker';

// 테이블명
const tableName = 'driver_assignments';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const records = [];
    const now = new Date();

    // 배송 예약 데이터 범위: 1 ~ 40
    // 회원 배송: 1~20
    // 비회원 배송: 21~40
    // 보관 예약(41~80)은 기사 배정 필요 없음

    // 기사 ID 범위 (가정): 1~5 (dummy-drivers.seeder.js에 5명 있다고 가정)
    const driverIds = [1, 2, 3, 4, 5];

    // 1~40번 예약 중 일부에 대해 기사 배정
    for (let reservId = 1; reservId <= 40; reservId++) {
      // 80% 확률로 기사 배정 (결제 대기 등 제외하고 싶은 경우 로직 추가 가능하지만, 
      // 여기서는 단순화를 위해 확률로 처리하거나, dummy-reservations 상태에 맞출 수도 있음)
      // 하지만 시더 간 상태 동기화가 복잡하므로, 일단 대부분 배정된 것으로 가정
      
      // 예약 ID 1, 21은 각 그룹의 'PENDING_PAYMENT'이므로 배정 안 함 (결제 전이니까)
      if (reservId === 1 || reservId === 21) continue;

      const driverId = faker.helpers.arrayElement(driverIds);

      records.push({
        driver_id: driverId,
        reserv_id: reservId,
        assigned_at: faker.date.recent({ days: 1 }),
        unassigned_at: null, // 현재 배정 상태
        state: 'ASSIGNED',
        created_at: now,
        updated_at: now,
      });

      // 가끔 배정 취소 이력(UNASSIGNED)도 추가하고 싶다면?
      // (현실성을 위해)
      if (faker.datatype.boolean(0.2)) { // 20% 확률로 과거 취소 이력 추가
        records.push({
          driver_id: (driverId === 5) ? 1 : driverId + 1, // 다른 기사가 했다가 취소된 척
          reserv_id: reservId,
          assigned_at: faker.date.recent({ days: 2 }),
          unassigned_at: faker.date.recent({ days: 1 }),
          state: 'UNASSIGNED',
          created_at: now,
          updated_at: now,
        });
      }
    }

    await queryInterface.bulkInsert(tableName, records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
