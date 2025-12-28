/**
 * @file databases/seeders/dummy-bookers.seeder.js
 * @description create bookers dummy data
 * 251228 v1.0.0 N init
 */

import bcrypt from 'bcrypt';
const now = new Date();

// 테이블명
const tableName = 'bookers';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      // 1. 예약 1번 (회원 - 배송)
      {
        id: 1,
        user_id: 1,
        reserv_id: 1,
        user_name: '홍길동',
        phone: '01011112222',
        email: 'user1@test.com',
        password_hash: null, // 회원은 비밀번호 불필요
        created_at: now,
        updated_at: now
      },
      // 2. 예약 2번 (비회원 - 배송)
      {
        id: 2,
        user_id: null,
        reserv_id: 2,
        user_name: '김비회',
        phone: '01022223333',
        email: 'guest2@test.com',
        password_hash: await bcrypt.hash('1234', 10),
        created_at: now,
        updated_at: now
      },
      // 3. 예약 3번 (회원 - 배송)
      {
        id: 3,
        user_id: 1,
        reserv_id: 3,
        user_name: '홍길동',
        phone: '01011112222',
        email: 'user1@test.com',
        password_hash: null,
        created_at: now,
        updated_at: now
      },
      // 4. 예약 4번 (비회원 - 배송)
      {
        id: 4,
        user_id: null,
        reserv_id: 4,
        user_name: '이보따',
        phone: '01044445555',
        email: 'guest4@test.com',
        password_hash: await bcrypt.hash('1234', 10),
        created_at: now,
        updated_at: now
      },
      // 5. 예약 5번 (회원 - 배송)
      {
        id: 5,
        user_id: 1,
        reserv_id: 5,
        user_name: '홍길동',
        phone: '01011112222',
        email: 'user1@test.com',
        password_hash: null,
        created_at: now,
        updated_at: now
      },
      // 6. 예약 6번 (회원 - 보관)
      {
        id: 6,
        user_id: 1,
        reserv_id: 6,
        user_name: '홍길동',
        phone: '01011112222',
        email: 'user1@test.com',
        password_hash: null,
        created_at: now,
        updated_at: now
      },
      // 7. 예약 7번 (비회원 - 보관)
      {
        id: 7,
        user_id: null,
        reserv_id: 7,
        user_name: '박보관',
        phone: '01077778888',
        email: 'guest7@test.com',
        password_hash: await bcrypt.hash('1234', 10),
        created_at: now,
        updated_at: now
      },
      // 8. 예약 8번 (회원 - 보관)
      {
        id: 8,
        user_id: 1,
        reserv_id: 8,
        user_name: '홍길동',
        phone: '01011112222',
        email: 'user1@test.com',
        password_hash: null,
        created_at: now,
        updated_at: now
      },
      // 9. 예약 9번 (비회원 - 보관)
      {
        id: 9,
        user_id: null,
        reserv_id: 9,
        user_name: '최찾기',
        phone: '01099990000',
        email: 'guest9@test.com',
        password_hash: await bcrypt.hash('1234', 10),
        created_at: now,
        updated_at: now
      },
      // 10. 예약 10번 (비회원 - 보관)
      {
        id: 10,
        user_id: null,
        reserv_id: 10,
        user_name: '정진행',
        phone: '01012345678',
        email: 'guest10@test.com',
        password_hash: await bcrypt.hash('1234', 10),
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