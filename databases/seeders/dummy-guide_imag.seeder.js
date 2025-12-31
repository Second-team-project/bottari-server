/**
 * @file databases/seeders/dummy-guide_img.2.seeder.js
 * @description guide_img table dummy data create
 * 251229 v1.0.0 N init
 */

import { fakerKO } from '@faker-js/faker';

const now = new Date();

// 테이블명
const tableName = 'guide_img';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        id: 1,
        title: "BANNER",
        img: fakerKO.image.url(),
        img_eng: fakerKO.image.url(),
        active: "T",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert(tableName, records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notices', null, {});
  }

};