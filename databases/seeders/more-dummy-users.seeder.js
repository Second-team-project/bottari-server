/**
 * @file databases/seeders/more-dummy-users.seeder.js
 * @description users table dummy data create (additional 30 users)
 * 20260110 N init
 */
import db from '../../app/models/index.js';
import { fakerKO } from '@faker-js/faker';

const { User } = db;

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const users = [];

    // 30명의 유저 데이터 생성
    for(let i = 0; i < 30; i++) {
      const date = fakerKO.date.between({ from: '2025-01-01', to: Date.now() });
      
      users.push({
        userName: fakerKO.person.fullName(),
        email: fakerKO.internet.email(), // Faker가 알아서 랜덤 이메일 생성 (중복 확률 낮음)
        phone: fakerKO.phone.number('010-####-####'),
        // 필요하다면 추가 컬럼 설정 (예: snsId, provider 등)
        provider: 'KAKAO', 
        status: 'ACTIVE',
        createdAt: date,
        updatedAt: date,
      });
    }

    // DB에 저장 (Bulk Insert)
    if (users.length > 0) {
      await User.bulkCreate(users);
    }
  },

  async down (queryInterface, Sequelize) {
    // 이번에 생성한 30명을 지우기에는 기준이 애매하므로,
    // 전체 삭제를 하거나, 특정 조건(예: provider='LOCAL'이고 최근 생성된)으로 지워야 합니다.
    // 안전을 위해 여기서는 주석 처리하거나, 필요 시 특정 로직을 추가하세요.
    // await queryInterface.bulkDelete('Users', { provider: 'LOCAL' }, {});
  }
};
