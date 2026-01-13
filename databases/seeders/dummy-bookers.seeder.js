/**
 * @file databases/seeders/dummy-bookers.seeder.js
 * @description create bookers dummy data (Linked to Reservations 1~80)
 * 251228 v1.0.0 N init
 */

import { fakerKO as faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const tableName = 'bookers';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const records = [];
    const passwordHash = await bcrypt.hash('1234', 10); // 비회원 공통 비밀번호
    const now = new Date();

    // Loop 1 to 80
    for (let i = 1; i <= 80; i++) {
      let isMember = false;

      // 회원 구간 확인 (1~20 OR 41~60)
      if ((i >= 1 && i <= 20) || (i >= 41 && i <= 60)) {
        isMember = true;
      }

      records.push({
        reserv_id: i, // FK
        user_id: isMember ? 1 : null,
        user_name: faker.person.fullName(),
        phone: `010${faker.string.numeric(8)}`,
        email: isMember ? 'user1@test.com' : faker.internet.email(),
        password_hash: isMember ? null : passwordHash,
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
