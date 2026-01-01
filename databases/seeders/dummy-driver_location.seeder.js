/**
 * @file databases/seeders/dummy-driver_location.seeder.js
 * @description create driver_location dummy data
 * 251222 v1.0.0 N init
 */


// 테이블명
const tableName = 'driver_location';

/** @type {import('sequelize-cli').Migration} */
export default {

  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        id: 1,
        driver_id: 1,
        lat: 37.56650000,
        lng: 126.97800000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        driver_id: 2,
        lat: 37.49790000,
        lng: 127.02760000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        driver_id: 3,
        lat: 37.55650000,
        lng: 126.92390000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        driver_id: 4,
        lat: 37.51330000,
        lng: 127.10010000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        driver_id: 5,
        lat: 37.52160000,
        lng: 126.92420000,
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