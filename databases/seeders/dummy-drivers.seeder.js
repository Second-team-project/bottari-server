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
    const records = [];
    const passwordHash = await bcrypt.hash('driver1234', 10);
    const now = new Date();

    for (let i = 0; i < 50; i++) {
      records.push({
        driver_name: faker.person.lastName() + faker.person.firstName(),
        phone: faker.phone.number('010-####-####'),
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