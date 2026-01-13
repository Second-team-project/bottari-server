/**
 * @file databases/seeders/dummy-storages.seeder.js
 * @description create storages dummy data (Linked to Reservations 41~80)
 * 251228 v1.0.0 N init
 */

import { fakerKO as faker } from '@faker-js/faker';

const tableName = 'storages';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const records = [];

    // Reservations 41~80번이 보관(Storage) 데이터임
    for (let i = 41; i <= 80; i++) {
      const now = new Date();
      const startTime = faker.date.recent({ days: 10 });
      const endTime = faker.date.future({ years: 1, refDate: startTime });

      records.push({
        reserv_id: i, // FK
        store_id: faker.number.int({ min: 1, max: 4 }), // Store ID 1~4 랜덤
        started_at: startTime,
        ended_at: endTime,
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
