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
      // ====================== 
      // ||     DELIVERY     || 
      // ===== 캐리어 ===== 
      // 21인치 (S) 
      { item_type: 'CARRIER', item_size: '21', item_weight: '~10kg', service_type: 'D', base_price: '9000' }, 
      { item_type: 'CARRIER', item_size: '21', item_weight: '~20kg', service_type: 'D', base_price: '11000' }, 
      { item_type: 'CARRIER', item_size: '21', item_weight: '~30kg', service_type: 'D', base_price: '14000' }, 
      { item_type: 'CARRIER', item_size: '21', item_weight: 'OVER', service_type: 'D', base_price: '17000' }, 
      // 24인치 (M) 
      { item_type: 'CARRIER', item_size: '24', item_weight: '~10kg', service_type: 'D', base_price: '11000' }, 
      { item_type: 'CARRIER', item_size: '24', item_weight: '~20kg', service_type: 'D', base_price: '13000' }, 
      { item_type: 'CARRIER', item_size: '24', item_weight: '~30kg', service_type: 'D', base_price: '16000' }, 
      { item_type: 'CARRIER', item_size: '24', item_weight: 'OVER', service_type: 'D', base_price: '19000' }, 
      // 32인치 (L) 
      { item_type: 'CARRIER', item_size: '32', item_weight: '~10kg', service_type: 'D', base_price: '13000' }, 
      { item_type: 'CARRIER', item_size: '32', item_weight: '~20kg', service_type: 'D', base_price: '15000' }, 
      { item_type: 'CARRIER', item_size: '32', item_weight: '~30kg', service_type: 'D', base_price: '18000' }, 
      { item_type: 'CARRIER', item_size: '32', item_weight: 'OVER', service_type: 'D', base_price: '21000' }, 
      // 화물 캐리어 (XL) 
      { item_type: 'CARRIER', item_size: 'OVER', item_weight: '~10kg', service_type: 'D', base_price: '15000' }, 
      { item_type: 'CARRIER', item_size: 'OVER', item_weight: '~20kg', service_type: 'D', base_price: '17000' }, 
      { item_type: 'CARRIER', item_size: 'OVER', item_weight: '~30kg', service_type: 'D', base_price: '20000' }, 
      { item_type: 'CARRIER', item_size: 'OVER', item_weight: 'OVER', service_type: 'D', base_price: '24000' }, 

      // ===== 가방 (BAG) ===== 
      // S 
      { item_type: 'BAG', item_size: 'S', item_weight: '~10kg', service_type: 'D', base_price: '9000' }, 
      { item_type: 'BAG', item_size: 'S', item_weight: '~20kg', service_type: 'D', base_price: '11000' }, 
      { item_type: 'BAG', item_size: 'S', item_weight: '~30kg', service_type: 'D', base_price: '14000' }, 
      { item_type: 'BAG', item_size: 'S', item_weight: 'OVER', service_type: 'D', base_price: '17000' }, 
      // M 
      { item_type: 'BAG', item_size: 'M', item_weight: '~10kg', service_type: 'D', base_price: '11000' }, 
      { item_type: 'BAG', item_size: 'M', item_weight: '~20kg', service_type: 'D', base_price: '13000' }, 
      { item_type: 'BAG', item_size: 'M', item_weight: '~30kg', service_type: 'D', base_price: '16000' }, 
      { item_type: 'BAG', item_size: 'M', item_weight: 'OVER', service_type: 'D', base_price: '19000' }, 
      // L 
      { item_type: 'BAG', item_size: 'L', item_weight: '~10kg', service_type: 'D', base_price: '13000' }, 
      { item_type: 'BAG', item_size: 'L', item_weight: '~20kg', service_type: 'D', base_price: '15000' }, 
      { item_type: 'BAG', item_size: 'L', item_weight: '~30kg', service_type: 'D', base_price: '18000' }, 
      { item_type: 'BAG', item_size: 'L', item_weight: 'OVER', service_type: 'D', base_price: '21000' }, 
      // XL 
      { item_type: 'BAG', item_size: 'XL', item_weight: '~10kg', service_type: 'D', base_price: '15000' }, 
      { item_type: 'BAG', item_size: 'XL', item_weight: '~20kg', service_type: 'D', base_price: '17000' }, 
      { item_type: 'BAG', item_size: 'XL', item_weight: '~30kg', service_type: 'D', base_price: '20000' }, 
      { item_type: 'BAG', item_size: 'XL', item_weight: 'OVER', service_type: 'D', base_price: '24000' }, 

      // ===== 박스 (BOX) ===== 
      // S 
      { item_type: 'BOX', item_size: 'S', item_weight: '~10kg', service_type: 'D', base_price: '9000' }, 
      { item_type: 'BOX', item_size: 'S', item_weight: '~20kg', service_type: 'D', base_price: '11000' }, 
      { item_type: 'BOX', item_size: 'S', item_weight: '~30kg', service_type: 'D', base_price: '14000' }, 
      { item_type: 'BOX', item_size: 'S', item_weight: 'OVER', service_type: 'D', base_price: '17000' }, 
      // M 
      { item_type: 'BOX', item_size: 'M', item_weight: '~10kg', service_type: 'D', base_price: '11000' }, 
      { item_type: 'BOX', item_size: 'M', item_weight: '~20kg', service_type: 'D', base_price: '13000' }, 
      { item_type: 'BOX', item_size: 'M', item_weight: '~30kg', service_type: 'D', base_price: '16000' }, 
      { item_type: 'BOX', item_size: 'M', item_weight: 'OVER', service_type: 'D', base_price: '19000' }, 
      // L 
      { item_type: 'BOX', item_size: 'L', item_weight: '~10kg', service_type: 'D', base_price: '13000' }, 
      { item_type: 'BOX', item_size: 'L', item_weight: '~20kg', service_type: 'D', base_price: '15000' }, 
      { item_type: 'BOX', item_size: 'L', item_weight: '~30kg', service_type: 'D', base_price: '18000' }, 
      { item_type: 'BOX', item_size: 'L', item_weight: 'OVER', service_type: 'D', base_price: '21000' }, 
      // XL 
      { item_type: 'BOX', item_size: 'XL', item_weight: '~10kg', service_type: 'D', base_price: '15000' }, 
      { item_type: 'BOX', item_size: 'XL', item_weight: '~20kg', service_type: 'D', base_price: '17000' }, 
      { item_type: 'BOX', item_size: 'XL', item_weight: '~30kg', service_type: 'D', base_price: '20000' }, 
      { item_type: 'BOX', item_size: 'XL', item_weight: 'OVER', service_type: 'D', base_price: '24000' }, 
      
      // ===== 골프 (GOLF) ===== 
      { item_type: 'GOLF', item_size: null, item_weight: 'OVER', service_type: 'D', base_price: '24000' },
      // =====================
      // ||     STORAGE     ||
      // ===== 캐리어 =====
      // 21인치
      {
        item_type: 'CARRIER',
        item_size: '21',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '4000',
      },
      {
        item_type: 'CARRIER',
        item_size: '21',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '5000',
      },
      {
        item_type: 'CARRIER',
        item_size: '21',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '6000',
      },
      {
        item_type: 'CARRIER',
        item_size: '21',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '7000',
      },
      // 24인치
      {
        item_type: 'CARRIER',
        item_size: '24',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '5000',
      },
      {
        item_type: 'CARRIER',
        item_size: '24',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '6000',
      },
      {
        item_type: 'CARRIER',
        item_size: '24',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '7000',
      },
      {
        item_type: 'CARRIER',
        item_size: '24',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '8000',
      },
      // 32인치
      {
        item_type: 'CARRIER',
        item_size: '32',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '6000',
      },
      {
        item_type: 'CARRIER',
        item_size: '32',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '7000',
      },
      {
        item_type: 'CARRIER',
        item_size: '32',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '8000',
      },
      {
        item_type: 'CARRIER',
        item_size: '32',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '9000',
      },
      // 화물 캐리어 (XL)
      {
        item_type: 'CARRIER',
        item_size: 'OVER',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '7000',
      },
      {
        item_type: 'CARRIER',
        item_size: 'OVER',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '8000',
      },
      {
        item_type: 'CARRIER',
        item_size: 'OVER',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '9000',
      },
      {
        item_type: 'CARRIER',
        item_size: 'OVER',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '10000',
      },
      //====================================================
      // ===== 가방 =====
      // S
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '4000',
      },
      {
        item_type: 'BAG',
        item_size: 'S',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '5000',
      },
      {
        item_type: 'BAG',
        item_size: 'S',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '6000',
      },
      {
        item_type: 'BAG',
        item_size: 'S',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '7000',
      },
      // M
      {
        item_type: 'BAG',
        item_size: 'M',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '5000',
      },
      {
        item_type: 'BAG',
        item_size: 'M',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '6000',
      },
      {
        item_type: 'BAG',
        item_size: 'M',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '7000',
      },
      {
        item_type: 'BAG',
        item_size: 'M',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '8000',
      },
      // L
      {
        item_type: 'BAG',
        item_size: 'L',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '6000',
      },
      {
        item_type: 'BAG',
        item_size: 'L',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '7000',
      },
      {
        item_type: 'BAG',
        item_size: 'L',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '8000',
      },
      {
        item_type: 'BAG',
        item_size: 'L',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '9000',
      },
      // XL
      {
        item_type: 'BAG',
        item_size: 'XL',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '7000',
      },
      {
        item_type: 'BAG',
        item_size: 'XL',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '8000',
      },
      {
        item_type: 'BAG',
        item_size: 'XL',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '9000',
      },
      {
        item_type: 'BAG',
        item_size: 'XL',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '10000',
      },
      // ===============================================
      // ===== 박스
      // s
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '4000',
      },
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '5000',
      },
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '6000',
      },
      {
        item_type: 'BOX',
        item_size: 'S',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '7000',
      },
      // M
      {
        item_type: 'BOX',
        item_size: 'M',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '5000',
      },
      {
        item_type: 'BOX',
        item_size: 'M',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '6000',
      },
      {
        item_type: 'BOX',
        item_size: 'M',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '7000',
      },
      {
        item_type: 'BOX',
        item_size: 'M',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '8000',
      },
      // L
      {
        item_type: 'BOX',
        item_size: 'L',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '6000',
      },
      {
        item_type: 'BOX',
        item_size: 'L',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '7000',
      },
      {
        item_type: 'BOX',
        item_size: 'L',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '8000',
      },
      {
        item_type: 'BOX',
        item_size: 'L',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '9000',
      },
      // XL
      {
        item_type: 'BOX',
        item_size: 'XL',
        item_weight: '~10kg',
        service_type: 'S',
        base_price: '7000',
      },
      {
        item_type: 'BOX',
        item_size: 'XL',
        item_weight: '~20kg',
        service_type: 'S',
        base_price: '8000',
      },
      {
        item_type: 'BOX',
        item_size: 'XL',
        item_weight: '~30kg',
        service_type: 'S',
        base_price: '9000',
      },
      {
        item_type: 'BOX',
        item_size: 'XL',
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '10000',
      },
      // ===============================================
      // 골프
      {
        item_type: 'GOLF',
        item_size: null,
        item_weight: 'OVER',
        service_type: 'S',
        base_price: '9000',
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