/**
 * @file databases/seeders/dummy-users.seeder.js
 * @description create users dummy data
 * 251222 v1.0.0 N init
 */


// 테이블명
const tableName = 'users';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        id: 1,
        user_name: '김단골',
        phone: '01011112222',
        email: 'user1@test.com',
        provider: 'KAKAO', // 또는 사용 중인 provider 명칭
        created_at: new Date(),
        updated_at: new Date()
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