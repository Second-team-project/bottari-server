/**
 * @file databases/seeders/dummy-luggages.seeder.js
 * @description create luggages dummy data
 * 251228 v1.0.0 N init
 */

const now = new Date();

// 테이블명
const tableName = 'luggages';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      // 1. 예약 1번 (단일: 캐리어)
      {
        reserv_id: 1,
        item_type: 'CARRIER',
        item_weight: '~20kg',
        item_size: '24',
        count: '1',
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 2. 예약 2번 (다중: 캐리어 + 가방)
      {
        reserv_id: 2,
        item_type: 'CARRIER',
        item_weight: '~30kg',
        item_size: '28',
        count: '1',
        notes: null,
        created_at: now,
        updated_at: now
      },
      {
        reserv_id: 2,
        item_type: 'BAG',
        item_weight: '~10kg',
        item_size: 'M',
        count: '2',
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 3. 예약 3번 (단일: 상자)
      {
        reserv_id: 3,
        item_type: 'BOX',
        item_weight: '~10kg',
        item_size: 'L',
        count: '3',
        notes: '깨지기 쉬움',
        created_at: now,
        updated_at: now
      },
      // 4. 예약 4번 (다중: 골프 + 상자)
      {
        reserv_id: 4,
        item_type: 'GOLF',
        item_weight: 'OVER',
        item_size: 'null',
        count: '1',
        notes: null,
        created_at: now,
        updated_at: now
      },
      {
        reserv_id: 4,
        item_type: 'BOX',
        item_weight: '~20kg',
        item_size: 'XL',
        count: '2',
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 5. 예약 5번 (단일: 가방)
      {
        reserv_id: 5,
        item_type: 'BAG',
        item_weight: '~10kg',
        item_size: 'S',
        count: '1',
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 6. 예약 6번 (다중: 캐리어 + 캐리어)
      {
        reserv_id: 6,
        item_type: 'CARRIER',
        item_weight: '~20kg',
        item_size: '24',
        count: '1',
        notes: null,
        created_at: now,
        updated_at: now
      },
      {
        reserv_id: 6,
        item_type: 'CARRIER',
        item_weight: '~10kg',
        item_size: '20',
        count: '1',
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 7. 예약 7번 (단일: 상자)
      {
        reserv_id: 7,
        item_type: 'BOX',
        item_weight: '~30kg',
        item_size: 'XL',
        count: '5',
        notes: '이사짐',
        created_at: now,
        updated_at: now
      },
      // 8. 예약 8번 (다중: 가방 + 상자 + 캐리어)
      {
        reserv_id: 8,
        item_type: 'BAG',
        item_weight: '~10kg',
        item_size: 'L',
        count: '2',
        notes: null,
        created_at: now,
        updated_at: now
      },
      {
        reserv_id: 8,
        item_type: 'BOX',
        item_weight: '~20kg',
        item_size: 'M',
        count: '3',
        notes: null,
        created_at: now,
        updated_at: now
      },
      {
        reserv_id: 8,
        item_type: 'CARRIER',
        item_weight: 'OVER',
        item_size: '32',
        count: '1',
        notes: '무거움 주의',
        created_at: now,
        updated_at: now
      },
      // 9. 예약 9번 (단일: 골프)
      {
        reserv_id: 9,
        item_type: 'GOLF',
        item_weight: '~30kg',
        item_size: 'null',
        count: '1',
        notes: null,
        created_at: now,
        updated_at: now
      },
      // 10. 예약 10번 (다중: 캐리어 + 가방)
      {
        reserv_id: 10,
        item_type: 'CARRIER',
        item_weight: '~20kg',
        item_size: '24',
        count: '2',
        notes: null,
        created_at: now,
        updated_at: now
      },
      {
        reserv_id: 10,
        item_type: 'BAG',
        item_weight: '~10kg',
        item_size: 'S',
        count: '1',
        notes: '보조가방',
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