/**
 * @file databases/seeders/dummy-faq.seeder.js
 * @description create faq dummy data
 * 251229 v1.0.0 N init
 */

const now = new Date();

// 테이블명
const tableName = 'faqs';

/** @type {import('sequelize-cli').Migration} */
export default {
  // up ↔ down
  //     ↱ 실행용 (ex.생성)
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        id: 1,
        admin_id: "1",
        title: "예약은 어떻게 하나요?",
        content: "홈 화면에서 '예약' 버튼을 눌러 맡기기 또는 옮기기를 선택하시면 됩니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        admin_id: "1",
        title: "결제 취소는 어떻게 하나요?",
        content: "예약 조회에서 해당 예약의 '예약 취소' 버튼을 누르시면 됩니다. 진행 전 상태에서만 취소가 가능합니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        admin_id: "1",
        title: "보관 기간",
        content: "최소 1시간부터 최대 7일까지 보관 가능합니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 4,
        admin_id: "1",
        title: "로그인 어떻게 하나요?",
        content: "카카오 소셜 로그인을 이용할 수 있습니다.",
        created_at: now,
        updated_at: now,
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