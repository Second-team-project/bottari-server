/**
 * @file databases/seeders/dummy-notices.seeder.js
 * @description notices table dummy data create
 * 251224 v1.0.0 김민현 init
 */
import db from '../../app/models/index.js';
import { fakerKO } from '@faker-js/faker';

const { Sequelize, Notice, Admin } = db;

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 관리자 pk 획득
    const admins = await Admin.findAll(
      {
        attributes: ['id']
      }
    );

    // 메모리에 배열 생성
    const notices = [];

    // 관리자별 게시글 데이터 생성
    for (const admin of admins) {
      for(let i = 0; i < 10; i++) {
        const date = fakerKO.date.between({ from: '2025-11-01', to: Date.now()});

        notices.push({
          adminId: admin.id,
          title: fakerKO.lorem.sentence({ min: 3, max: 6 }),
          content: fakerKO.lorem.text().substring(0, 100),
          image: fakerKO.image.url(),
          createdAt: date,
          updatedAt: date,
        });
      }
    }
    // 3. 한 번에 DB에 저장 (Bulk Insert)
    if (notices.length > 0) {
      await Notice.bulkCreate(notices);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notices', null, {});
  }
};