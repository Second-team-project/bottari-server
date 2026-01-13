/**
 * @file databases/seeders/dummy-deliveries.seeder.js
 * @description create deliveries dummy data (Linked to Reservations 1~40)
 * 251228 v1.0.0 N init
 */

import { fakerKO as faker } from '@faker-js/faker';

const tableName = 'deliveries';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const records = [];
    
    // Reservations 1~40번이 배송(Delivery) 데이터임
    for (let i = 1; i <= 40; i++) {
      const now = new Date();
      // 픽업 시간은 현재보다 약간 뒤로 설정하거나 랜덤하게
      const pickupTime = faker.date.soon({ days: 1 });

      records.push({
        reserv_id: i, // FK
        started_at: pickupTime,
        started_addr: `대구 ${faker.location.streetAddress()}`, // 대구 지역 가상 주소
        ended_addr: `대구 ${faker.location.streetAddress()}`,
        created_at: now,
        updated_at: now
      });
    }

    await queryInterface.bulkInsert(tableName, records, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
