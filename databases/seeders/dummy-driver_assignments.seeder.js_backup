/**
 * @file databases/seeders/dummy-driver_assignments.seeder.js
 * @description create driver_assignments dummy data
 * 251223 v1.0.0 김위민 init
 */

// 테이블명
const tableName = 'driver_assignments';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        driver_id: 1,
        reserv_id: 1,
        assigned_at: new Date(),
        unassigned_at: null,
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 1,
        reserv_id: 2,
        assigned_at: new Date(),
        unassigned_at: new Date(),
        state: 'UNASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 2,
        reserv_id: 2,
        assigned_at: new Date(),
        unassigned_at: null,
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 1,
        reserv_id: 3,
        assigned_at: new Date(),
        unassigned_at: null,
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 1,
        reserv_id: 4,
        assigned_at: new Date(),
        unassigned_at: null,
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 1,
        reserv_id: 5,
        assigned_at: new Date(),
        unassigned_at: null,
        state: 'CANCELLED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 1,
        reserv_id: 3, // 배송 (회원) - 예약 완료
        assigned_at: new Date(),
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 2,
        reserv_id: 2, // 배송 (비회원) - 예약 완료
        assigned_at: new Date(),
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 3,
        reserv_id: 13, // 배송 (회원) - 결제 대기
        assigned_at: new Date(),
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 4,
        reserv_id: 11, // 보관 (비회원) - 진행 중
        assigned_at: new Date(),
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 3,
        reserv_id: 12, // 배송 (회원) - 결제 대기
        assigned_at: new Date(),
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_id: 4,
        reserv_id: 14, // 보관 (비회원) - 진행 중
        assigned_at: new Date(),
        state: 'ASSIGNED',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert(tableName, records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};