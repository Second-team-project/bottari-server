/**
 * @file databases/seeders/dummy-luggages.seeder.js
 * @description create luggages dummy data (Linked to Reservations 1~80)
 * 250113 v1.1.0 Refactored for full coverage
 */

import { fakerKO as faker } from '@faker-js/faker';

const tableName = 'luggages';

const ITEM_TYPES = ['CARRIER', 'BAG', 'BOX', 'GOLF'];
const WEIGHT_OPTIONS = ['~10kg', '~20kg', '~30kg', 'OVER'];
const SIZE_OPTIONS = ['S', 'M', 'L', 'XL'];
const CARRIER_SIZES = ['20', '24', '28', '32'];

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const records = [];
    const now = new Date();

    // 예약 ID 1~80번에 대해 짐 데이터 생성
    for (let reservId = 1; reservId <= 80; reservId++) {
      
      // 한 예약당 짐 종류 개수 (1개 ~ 3개 랜덤)
      const luggagesCount = faker.number.int({ min: 1, max: 3 });

      for (let j = 0; j < luggagesCount; j++) {
        const type = faker.helpers.arrayElement(ITEM_TYPES);
        let size = null;
        let weight = faker.helpers.arrayElement(WEIGHT_OPTIONS);

        // 타입별 사이즈/무게 로직
        if (type === 'GOLF') {
          size = null; // 골프는 사이즈 없음
          weight = faker.helpers.arrayElement(['~10kg', '~20kg', 'OVER']); 
        } else if (type === 'CARRIER') {
          size = faker.helpers.arrayElement(CARRIER_SIZES);
        } else {
          // BAG, BOX
          size = faker.helpers.arrayElement(SIZE_OPTIONS);
        }

        records.push({
          reserv_id: reservId,
          item_type: type,
          item_weight: weight,
          item_size: size, // DB에 NULL로 저장됨
          count: faker.number.int({ min: 1, max: 3 }).toString(), // 수량 1~3개
          notes: faker.datatype.boolean(0.2) ? faker.lorem.words(3) : null, // 20% 확률로 메모 있음
          created_at: now,
          updated_at: now
        });
      }
    }

    await queryInterface.bulkInsert(tableName, records, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
