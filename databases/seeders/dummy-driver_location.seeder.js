/**
 * @file databases/seeders/dummy-driver_location.seeder.js
 * @description create driver_location dummy data (Daegu area)
 * 251222 v1.0.0 N init
 */

// 테이블명
const tableName = 'driver_location';

/** @type {import('sequelize-cli').Migration} */
export default {

  async up (queryInterface, Sequelize) {
    const now = new Date();
    // 레코드 정보 (대구 주요 거점 좌표)
    const records = [
      {
        id: 1,
        driver_id: 1,
        lat: 35.8773, // 동대구역 근처
        lng: 128.6281,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        driver_id: 2,
        lat: 35.8661, // 반월당역 근처
        lng: 128.5916,
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        driver_id: 3,
        lat: 35.8904, // 경북대학교 근처
        lng: 128.6113,
        created_at: now,
        updated_at: now,
      },
      {
        id: 4,
        driver_id: 4,
        lat: 35.8759, // 대구역 근처
        lng: 128.5964,
        created_at: now,
        updated_at: now,
      },
      {
        id: 5,
        driver_id: 5,
        lat: 35.8852, // 서대구역 근처
        lng: 128.5418,
        created_at: now,
        updated_at: now,
      },
    ]

    await queryInterface.bulkInsert(tableName, records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
