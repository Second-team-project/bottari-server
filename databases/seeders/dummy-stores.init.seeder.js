/**
 * @file databases/seeders/dummy-stores.seeder.js
 * @description create stores dummy data
 * 251222 v1.0.0 N init
 */


// 테이블명
const tableName = 'stores';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        id: 1,
        store_name: "대구역",
        code: "BS001",
        addr: "대구 북구 태평로 161",
        tel: "053-000-0001",
      },
      {
        id: 2,
        store_name: "동대구역",
        code: "BS002",
        addr: "대구 동구 동대구로 550 , 3층",
        tel: "053-000-0002",
      },
      {
        id: 3,
        store_name: "반월당역",
        code: "BS003",
        addr: "대구 중구 덕산동",
        tel: "053-000-0003",
      },
      {
        id: 4,
        store_name: "서대구역",
        code: "BS004",
        addr: "대구 서구 와룡로 527",
        tel: "053-000-0004",
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