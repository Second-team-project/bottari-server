/**
 * @file databases/seeders/dummy-reservations.seeder.js
 * @description create reservations dummy data
 * 251228 v1.0.0 N init
 */

const now = new Date();

// 테이블명
const tableName = 'reservations';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      // 1. 배송 (회원) - 예약 완료
      {
        id: 1,
        user_id: 1,
        code: 'DM251227A1B2C',
        state: 'RESERVED',
        price: 15000,
        payment_key: 'payment_key_1',
        payment_method: 'CARD',
        approved_at: now,
        notes: '조심히 다뤄주세요.',
        created_at: now,
        updated_at: now
      },
      // 2. 배송 (비회원) - 예약 완료
      {
        id: 2,
        user_id: null,
        code: 'DG251227D3E4F',
        state: 'RESERVED',
        price: 20000,
        payment_key: 'payment_key_2',
        payment_method: 'CARD',
        approved_at: now,
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 3. 배송 (회원) - 결제 대기
      {
        id: 3,
        user_id: 1,
        code: 'DM251227G5H6I',
        state: 'IN_PROGRESS',
        price: 18000,
        payment_key: null,
        payment_method: null,
        approved_at: null,
        notes: '문 앞에 놔주세요',
        created_at: now,
        updated_at: now
      },
      // 4. 배송 (비회원) - 완료
      {
        id: 4,
        user_id: null,
        code: 'DG251227J7K8L',
        state: 'COMPLETED',
        price: 12000,
        payment_key: 'payment_key_4',
        payment_method: 'CARD',
        approved_at: now,
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 5. 배송 (회원) - 취소
      {
        id: 5,
        user_id: 1,
        code: 'DM251227M9N0P',
        state: 'CANCELLED',
        price: 15000,
        payment_key: 'payment_key_5',
        payment_method: 'CARD',
        approved_at: now,
        notes: '일정이 변경되었습니다.',
        created_at: now,
        updated_at: now
      },
      // 6. 보관 (회원) - 예약 완료
      {
        id: 6,
        user_id: 1,
        code: 'SM251227Q1R2S',
        state: 'RESERVED',
        price: 30000,
        payment_key: 'payment_key_6',
        payment_method: 'CARD',
        approved_at: now,
        notes: '귀중품이 있어요.',
        created_at: now,
        updated_at: now
      },
      // 7. 보관 (비회원) - 예약 완료
      {
        id: 7,
        user_id: null,
        code: 'SG251227T3U4V',
        state: 'RESERVED',
        price: 25000,
        payment_key: 'payment_key_7',
        payment_method: 'CARD',
        approved_at: now,
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 8. 보관 (회원) - 결제 대기
      {
        id: 8,
        user_id: 1,
        code: 'SM251227W5X6Y',
        state: 'COMPLETED',
        price: 50000,
        payment_key: null,
        payment_method: null,
        approved_at: null,
        notes: '장기 보관 예정',
        created_at: now,
        updated_at: now
      },
      // 9. 보관 (비회원) - 완료
      {
        id: 9,
        user_id: null,
        code: 'SG251227Z7A8B',
        state: 'COMPLETED',
        price: 10000,
        payment_key: 'payment_key_9',
        payment_method: 'CARD',
        approved_at: now,
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 10. 보관 (비회원) - 진행 중
      {
        id: 10,
        user_id: null,
        code: 'SG251227C9D0E',
        state: 'IN_PROGRESS',
        price: 22000,
        payment_key: 'payment_key_10',
        payment_method: 'CARD',
        approved_at: now,
        notes: '빨리 찾으러 갈게요',
        created_at: now,
        updated_at: now
      },
      {
        id: 11,
        user_id: null,
        code: 'SG251228C9D0E',
        state: 'IN_PROGRESS',
        price: 22000,
        payment_key: 'payment_key_11',
        payment_method: 'CARD',
        approved_at: now,
        notes: '빨리 찾으러 갈게요',
        created_at: now,
        updated_at: now
      },
      {
        id: 12,
        user_id: null,
        code: 'SG251229C9D0E',
        state: 'IN_PROGRESS',
        price: 22000,
        payment_key: 'payment_key_12',
        payment_method: 'CARD',
        approved_at: now,
        notes: '빨리 찾으러 갈게요',
        created_at: now,
        updated_at: now
      },
      {
        id: 13,
        user_id: null,
        code: 'SG251230C9D0E',
        state: 'IN_PROGRESS',
        price: 22000,
        payment_key: 'payment_key_13',
        payment_method: 'CARD',
        approved_at: now,
        notes: '빨리 찾으러 갈게요',
        created_at: now,
        updated_at: now
      },
      {
        id: 14,
        user_id: null,
        code: 'SG251231C9D0E',
        state: 'IN_PROGRESS',
        price: 22000,
        payment_key: 'payment_key_14',
        payment_method: 'CARD',
        approved_at: now,
        notes: '빨리 찾으러 갈게요',
        created_at: now,
        updated_at: now
      },
    ]

    // 데이터 생성 : queryInterface.bulkInsert(tableName, records, options)
    //                    ↱ bulkInsert: 여러 개의 레코드 한 번에 추가
    //                                                   ↱ options : {} | 안 적어도 됨
    await queryInterface.bulkInsert(tableName, records, {})

  },

  //     ↱ 롤백용 (ex.삭제)
  async down (queryInterface, Sequelize) {
    // 데이터 삭제 : queryInterface.bulkInsert(tableName, records, options)
    //                                          ↱ null : 테이블 비움
    await queryInterface.bulkDelete(tableName, null, {});
  }
};