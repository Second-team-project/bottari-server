/**
 * @file databases/seeders/dummy-drivers.seeder.js
 * @description create drivers dummy data
 * 251223 v1.0.0 김위민 init
 */

import bcrypt from 'bcrypt';

// 테이블명
const tableName = 'drivers';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        driver_name: '김기사',
        phone: '010-1111-0001',
        account_id: 'driver01',
        password_hash: await bcrypt.hash('dri12312', 10),
        email: 'driver01@test.com',
        car_number: '12가3456',
        notes: '베테랑 기사',
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_name: '이운전',
        phone: '010-1111-0002',
        account_id: 'driver02',
        password_hash: await bcrypt.hash('dri12312', 10),
        email: 'driver02@test.com',
        car_number: '34나5678',
        notes: null,
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_name: '박배송',
        phone: '010-1111-0003',
        account_id: 'driver03',
        password_hash: await bcrypt.hash('dri12312', 10),
        email: null,
        car_number: '56다9012',
        notes: '신규 기사',
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_name: '최퀵',
        phone: '010-1111-0004',
        account_id: 'driver04',
        password_hash: await bcrypt.hash('dri12312', 10),
        email: 'driver04@test.com',
        car_number: '78라3456',
        notes: '야간 근무 가능',
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        driver_name: '정라이더',
        phone: '010-1111-0005',
        account_id: 'driver05',
        password_hash: await bcrypt.hash('dri12312', 10),
        email: 'driver05@test.com',
        car_number: '90마7890',
        notes: '장거리 운송 가능',
        refresh_token: null,
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