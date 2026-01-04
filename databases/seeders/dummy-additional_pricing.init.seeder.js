/**
 * @file databases/seeders/dummy-pricing.seeder.js
 * @description create pricing dummy data
 * 251222 v1.0.0 N init
 */


// 테이블명
const tableName = 'additional_pricing';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        service_type: 'S',
        min_value: 1,
        max_value: 3,
        rate: '100',
      },
      {
        service_type: 'S',
        min_value: 4,
        max_value: 7,
        rate: '85',
      },
      {
        service_type: 'S',
        min_value: 8,
        max_value: 15,
        rate: '75',
      },
      {
        service_type: 'S',
        min_value: 16,
        max_value: 30,
        rate: '65',
      },
    ];

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