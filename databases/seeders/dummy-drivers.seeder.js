/**
 * @file databases/seeders/dummy-drivers.seeder.js
 * @description create drivers dummy data
 * 251223 v1.0.0 김위민 init
 */
import { fakerKO as faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const tableName = 'drivers';

export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        driver_name: '김기사',
        phone: '01011110001',
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
        phone: '01011110002',
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
        phone: '01011110003',
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
        phone: '01011110004',
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
        phone: '01011110005',
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
    const passwordHash = await bcrypt.hash('driver1234', 10);
    const now = new Date();

    for (let i = 0; i < 50; i++) {
      records.push({
        driver_name: faker.person.lastName() + faker.person.firstName(),
        phone: `010${faker.string.numeric(8)}`,
        account_id: `driver${i + 1}`,
        password_hash: passwordHash, // 비밀번호 통일
        email: faker.internet.email(),
        car_number: `${faker.number.int({min:10, max:99})}${faker.helpers.arrayElement(['가','나','다','라','마'])} ${faker.number.int({min:1000, max:9999})}`,
        notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
        created_at: faker.date.past(),
        updated_at: now,
      });
    }


    await queryInterface.bulkInsert(tableName, records, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};