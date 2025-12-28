/**
 * @file databases/seeders/dummy-deliveries.seeder.js
 * @description create deliveries dummy data
 * 251228 v1.0.0 N init
 */

const now = new Date();
const pickupTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

// 테이블명
const tableName = 'deliveries';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      // 1. 배송 (회원)
      {
        id: 1,
        reserv_id: 1,
        started_at: pickupTime,
        started_addr: '대구 동구 동대구로 550', // 동대구역
        ended_addr: '대구 중구 중앙대로 412', // 반월당역
        created_at: now,
        updated_at: now
      },
      // 2. 배송 (비회원)
      {
        id: 2,
        reserv_id: 2,
        started_at: pickupTime,
        started_addr: '대구 중구 동성로 1',
        ended_addr: '대구 수성구 달구벌대로 2450',
        created_at: now,
        updated_at: now
      },
      // 3. 배송 (회원)
      {
        id: 3,
        reserv_id: 3,
        started_at: pickupTime,
        started_addr: '대구 북구 대학로 80', // 경북대
        ended_addr: '대구 동구 아양로 200',
        created_at: now,
        updated_at: now
      },
      // 4. 배송 (비회원)
      {
        id: 4,
        reserv_id: 4,
        started_at: pickupTime,
        started_addr: '대구 서구 국채보상로 257',
        ended_addr: '대구 달서구 달구벌대로 1035',
        created_at: now,
        updated_at: now
      },
      // 5. 배송 (회원)
      {
        id: 5,
        reserv_id: 5,
        started_at: pickupTime,
        started_addr: '대구 남구 현충로 170',
        ended_addr: '대구 중구 공평로 10',
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