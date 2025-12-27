/**
 * @file databases/seeders/dummy-pricing.seeder.js
 * @description create pricing dummy data
 * 251222 v1.0.0 N init
 */


// 테이블명
const tableName = 'pricing';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      // ===== 캐리어 =====
      // 21인치
      {
        item_type: 'CARRIER',
        item_size: '21',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '9000',
      },
      {
        item_type: 'CARRIER',
        item_size: '21',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '14000',
      },
      {
        item_type: 'CARRIER',
        item_size: '21',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '19000',
      },
      {
        item_type: 'CARRIER',
        item_size: '21',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '29000',
      },
      // 24인치
      {
        item_type: 'CARRIER',
        item_size: '24',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '14000',
      },
      {
        item_type: 'CARRIER',
        item_size: '24',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '19000',
      },
      {
        item_type: 'CARRIER',
        item_size: '24',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '21000',
      },
      {
        item_type: 'CARRIER',
        item_size: '24',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '29000',
      },
      // 32인치
      {
        item_type: 'CARRIER',
        item_size: '32',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '19000',
      },
      {
        item_type: 'CARRIER',
        item_size: '32',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '24000',
      },
      {
        item_type: 'CARRIER',
        item_size: '32',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '29000',
      },
      {
        item_type: 'CARRIER',
        item_size: '32',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '32000',
      },
      // 화물 캐리어 (XL)
      {
        item_type: 'CARRIER',
        item_size: 'OVER',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '29000',
      },
      {
        item_type: 'CARRIER',
        item_size: 'OVER',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '32000',
      },
      {
        item_type: 'CARRIER',
        item_size: 'OVER',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '39000',
      },
      {
        item_type: 'CARRIER',
        item_size: 'OVER',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '49000',
      },
      //====================================================
      // ===== 가방 =====
      // S
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '9000',
      },
      {
        item_type: 'BAG',
        item_size: 'S',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '14000',
      },
      {
        item_type: 'BAG',
        item_size: 'S',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '19000',
      },
      {
        item_type: 'BAG',
        item_size: 'S',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '29000',
      },
      // M
      {
        item_type: 'BAG',
        item_size: 'M',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '14000',
      },
      {
        item_type: 'BAG',
        item_size: 'M',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '19000',
      },
      {
        item_type: 'BAG',
        item_size: 'M',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '21000',
      },
      {
        item_type: 'BAG',
        item_size: 'M',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '29000',
      },
      // L
      {
        item_type: 'BAG',
        item_size: 'L',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '19000',
      },
      {
        item_type: 'BAG',
        item_size: 'L',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '24000',
      },
      {
        item_type: 'BAG',
        item_size: 'L',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '29000',
      },
      {
        item_type: 'BAG',
        item_size: 'L',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '32000',
      },
      // XL
      {
        item_type: 'BAG',
        item_size: 'XL',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '29000',
      },
      {
        item_type: 'BAG',
        item_size: 'XL',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '32000',
      },
      {
        item_type: 'BAG',
        item_size: 'XL',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '39000',
      },
      {
        item_type: 'BAG',
        item_size: 'XL',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '49000',
      },
      // ===============================================
      // ===== 박스
      // s
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '9000',
      },
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '14000',
      },
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '19000',
      },
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '29000',
      },
      // M
      {
        item_type: 'BOX',
        item_size: 'M',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '14000',
      },
      {
        item_type: 'BOX',
        item_size: 'M',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '19000',
      },
      {
        item_type: 'BOX',
        item_size: 'M',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '21000',
      },
      {
        item_type: 'BOX',
        item_size: 'M',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '29000',
      },
      // L
      {
        item_type: 'BOX',
        item_size: 'L',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '19000',
      },
      {
        item_type: 'BOX',
        item_size: 'L',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '24000',
      },
      {
        item_type: 'BOX',
        item_size: 'L',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '29000',
      },
      {
        item_type: 'BOX',
        item_size: 'L',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '32000',
      },
      // XL
      {
        item_type: 'BOX',
        item_size: 'XL',
        item_weight: '~10kg',
        service_type: 'D',
        base_price: '29000',
      },
      {
        item_type: 'BOX',
        item_size: 'XL',
        item_weight: '~20kg',
        service_type: 'D',
        base_price: '32000',
      },
      {
        item_type: 'BOX',
        item_size: 'XL',
        item_weight: '~30kg',
        service_type: 'D',
        base_price: '39000',
      },
      {
        item_type: 'BOX',
        item_size: 'XL',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '49000',
      },
      // ===============================================
      // 골프
      {
        item_type: 'GOLF',
        item_size: 'L',
        item_weight: 'OVER',
        service_type: 'D',
        base_price: '49000',
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