/**
 * @file databases/seeders/dummy-reservations.seeder.js
 * @description create reservations dummy data
 * 251228 v1.0.0 N init
 */

import { fakerKO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';

// 테이블명
const tableName = 'reservations';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const records = [];
    let idCounter = 1;

    const commonStates = ['RESERVED', 'PICKING_UP', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    
    // 요청 사항 문구 리스트
    const deliveryRequests = [
      "문 앞에 놔주세요.",
      "도착 전 연락 부탁드립니다.",
      "깨질 수 있으니 주의해주세요.",
      "조심히 다뤄주세요.",
      "짐이 조금 무거워요.",
      "호텔에 맡겨주세요.",
      "배송 완료 후 문자 주세요."
    ];

    // 생성 헬퍼
    const generateGroup = (type, isMember, count) => {
      for (let i = 0; i < count; i++) {
        // 첫 번째는 결제 대기, 나머지는 랜덤 상태
        let state = (i === 0) ? 'PENDING_PAYMENT' : faker.helpers.arrayElement(commonStates);
        
        // 날짜
        const dateObj = faker.date.recent({ days: 60 }); 
        const dateStr = dayjs(dateObj).format('YYMMDD');
        
        // 예약 코드 구성
        const userTypeChar = isMember ? 'M' : 'G';
        const randomSuffix = faker.string.alphanumeric(5).toUpperCase();
        const code = `${type}${userTypeChar}${dateStr}${randomSuffix}`;

        // 결제 정보
        const isPending = state === 'PENDING_PAYMENT';
        const price = faker.number.int({ min: 10, max: 100 }) * 1000;
        
        records.push({
          id: idCounter++, // 1부터 순차 증가
          user_id: isMember ? 1 : null,
          code: code,
          state: state,
          price: price,
          payment_key: isPending ? null : `payment_key_${idCounter}`,
          payment_method: isPending ? null : 'CARD',
          approved_at: isPending ? null : dateObj,
          notes: faker.datatype.boolean(0.7) ? faker.helpers.arrayElement(deliveryRequests) : null,
          created_at: dateObj,
          updated_at: new Date()
        });
      }
    };

    // 순서 중요! (다른 시더 파일들과 약속된 순서)
    // 1. 배송 (회원) [ID: 1 ~ 20]
    generateGroup('D', true, 20);

    // 2. 배송 (비회원) [ID: 21 ~ 40]
    generateGroup('D', false, 20);

    // 3. 보관 (회원) [ID: 41 ~ 60]
    generateGroup('S', true, 20);

    // 4. 보관 (비회원) [ID: 61 ~ 80]
    generateGroup('S', false, 20);

    await queryInterface.bulkInsert(tableName, records, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};