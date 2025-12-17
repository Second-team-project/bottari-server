/**
 * @file databases/seeders/init-admins.seeder.js
 * @description admins table initial data create
 * 251217 v1.0.0 김민현 init
 */
import bcrypt from 'bcrypt';

// 테이블명
const tableName = 'admins';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        email: 'admin@admin.com',
        password: await bcrypt.hash('administer', 10), // bcrypt: 단방향 암호화 문법. 복호화 안 됨. 비동기 처리라 await 필요.
        nick: '보따리',
        provider: 'NONE',
        role: 'SUPER',
        profile: '',
        created_at: new Date(),
        updated_at: new Date()
      },
    ];

    // 데이터 생성 : queryInterface.bulkInsert(tableName, records, options)
    await queryInterface.bulkInsert(tableName, records, {}); // options 없으면 안 적어주거나 빈 객체 넣어주면 됨
  },

  async down (queryInterface, Sequelize) {
    // 데이터 삭제 : queryInterface.bulkDelete(tableName, records, options)
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
