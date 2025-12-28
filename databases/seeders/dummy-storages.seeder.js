/**
 * @file databases/seeders/dummy-storages.seeder.js
 * @description create storages dummy data
 * 251228 v1.0.0 N init
 */

const now = new Date();
const startTime = new Date(now);
const endTime = new Date(now.getTime() + 6 * 60 * 60 * 1000);

// 테이블명
const tableName = 'storages';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      // 6. 보관 (회원)
      {
        id: 1,
        reserv_id: 6,
        started_at: startTime,
        ended_at: endTime,
        store_id: 1, // 대구역
        created_at: now,
        updated_at: now
      },
      // 7. 보관 (비회원)
      {
        id: 2,
        reserv_id: 7,
        started_at: startTime,
        ended_at: endTime,
        store_id: 2, // 동대구역
        created_at: now,
        updated_at: now
      },
      // 8. 보관 (회원)
      {
        id: 3,
        reserv_id: 8,
        started_at: startTime,
        ended_at: endTime,
        store_id: 3, // 반월당역
        created_at: now,
        updated_at: now
      },
      // 9. 보관 (비회원)
      {
        id: 4,
        reserv_id: 9,
        started_at: startTime,
        ended_at: endTime,
        store_id: 4, // 서대구역
        created_at: now,
        updated_at: now
      },
      // 10. 보관 (비회원)
      {
        id: 5,
        reserv_id: 10,
        started_at: startTime,
        ended_at: endTime,
        store_id: 1, // 대구역
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