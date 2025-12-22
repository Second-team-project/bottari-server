/**
 * @file databases/seeders/dummy-users.seeder.js
 * @description create users dummy data
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
        itemType: 'CARRIER',
        itemSize: '21',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '9000',
      },
      {
        itemType: 'CARRIER',
        itemSize: '21',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '14000',
      },
      {
        itemType: 'CARRIER',
        itemSize: '21',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '19000',
      },
      {
        itemType: 'CARRIER',
        itemSize: '21',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '29000',
      },
      // 24인치
      {
        itemType: 'CARRIER',
        itemSize: '24',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '14000',
      },
      {
        itemType: 'CARRIER',
        itemSize: '24',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '19000',
      },
      {
        itemType: 'CARRIER',
        itemSize: '24',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '21000',
      },
      {
        itemType: 'CARRIER',
        itemSize: '24',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '29000',
      },
      // 32인치
      {
        itemType: 'CARRIER',
        itemSize: '32',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '19000',
      },
      {
        itemType: 'CARRIER',
        itemSize: '32',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '24000',
      },
      {
        itemType: 'CARRIER',
        itemSize: '32',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '29000',
      },
      {
        itemType: 'CARRIER',
        itemSize: '32',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '32000',
      },
      // 화물 캐리어 (XL)
      {
        itemType: 'CARRIER',
        itemSize: 'OVER',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '29000',
      },
      {
        itemType: 'CARRIER',
        itemSize: 'OVER',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '32000',
      },
      {
        itemType: 'CARRIER',
        itemSize: 'OVER',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '39000',
      },
      {
        itemType: 'CARRIER',
        itemSize: 'OVER',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '49000',
      },
      //====================================================
      // ===== 가방 =====
      // S
      {
        itemType: 'BOX',
        itemSize: 'S',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '9000',
      },
      {
        itemType: 'BAG',
        itemSize: 'S',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '14000',
      },
      {
        itemType: 'BAG',
        itemSize: 'S',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '19000',
      },
      {
        itemType: 'BAG',
        itemSize: 'S',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '29000',
      },
      // M
      {
        itemType: 'BAG',
        itemSize: 'M',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '14000',
      },
      {
        itemType: 'BAG',
        itemSize: 'M',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '19000',
      },
      {
        itemType: 'BAG',
        itemSize: 'M',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '21000',
      },
      {
        itemType: 'BAG',
        itemSize: 'M',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '29000',
      },
      // L
      {
        itemType: 'BAG',
        itemSize: 'L',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '19000',
      },
      {
        itemType: 'BAG',
        itemSize: 'L',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '24000',
      },
      {
        itemType: 'BAG',
        itemSize: 'L',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '29000',
      },
      {
        itemType: 'BAG',
        itemSize: 'L',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '32000',
      },
      // XL
      {
        itemType: 'BAG',
        itemSize: 'XL',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '29000',
      },
      {
        itemType: 'BAG',
        itemSize: 'XL',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '32000',
      },
      {
        itemType: 'BAG',
        itemSize: 'XL',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '39000',
      },
      {
        itemType: 'BAG',
        itemSize: 'XL',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '49000',
      },
      // ===============================================
      // ===== 박스
      // s
      {
        itemType: 'BOX',
        itemSize: 'S',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '9000',
      },
      {
        itemType: 'BOX',
        itemSize: 'S',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '14000',
      },
      {
        itemType: 'BOX',
        itemSize: 'S',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '19000',
      },
      {
        itemType: 'BOX',
        itemSize: 'S',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '29000',
      },
      // M
      {
        itemType: 'BOX',
        itemSize: 'M',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '14000',
      },
      {
        itemType: 'BOX',
        itemSize: 'M',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '19000',
      },
      {
        itemType: 'BOX',
        itemSize: 'M',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '21000',
      },
      {
        itemType: 'BOX',
        itemSize: 'M',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '29000',
      },
      // L
      {
        itemType: 'BOX',
        itemSize: 'L',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '19000',
      },
      {
        itemType: 'BOX',
        itemSize: 'L',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '24000',
      },
      {
        itemType: 'BOX',
        itemSize: 'L',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '29000',
      },
      {
        itemType: 'BOX',
        itemSize: 'L',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '32000',
      },
      // XL
      {
        itemType: 'BOX',
        itemSize: 'XL',
        itemWeight: 'UNDER_10',
        serviceType: 'D',
        basePrice: '29000',
      },
      {
        itemType: 'BOX',
        itemSize: 'XL',
        itemWeight: 'UNDER_20',
        serviceType: 'D',
        basePrice: '32000',
      },
      {
        itemType: 'BOX',
        itemSize: 'XL',
        itemWeight: 'UNDER_30',
        serviceType: 'D',
        basePrice: '39000',
      },
      {
        itemType: 'BOX',
        itemSize: 'XL',
        itemWeight: 'OVER_30',
        serviceType: 'D',
        basePrice: '49000',
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