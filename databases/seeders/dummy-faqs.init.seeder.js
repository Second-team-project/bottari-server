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
        category: "예약",
        title: "예약은 어떻게 하나요?",
        content: "홈 화면에서 '예약' 버튼을 눌러 맡기기 또는 옮기기를 선택하시면 됩니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        admin_id: "1",
        category: "예약",
        title: "예약 조회는 어떻게 하나요?",
        content: "홈 화면에서 '조회' 버튼을 눌러 확인할 수 있습니다. 비회원의 경우, 예약 시 발급받은 예약코드와 예약 시 생성한 비밀번호가 필요합니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        admin_id: "1",
        category: "결제",
        title: "결제 취소는 어떻게 하나요?",
        content: "예약 조회에서 해당 예약의 '예약 취소' 버튼을 누르시면 됩니다. 배송의 경우 기사가 배정되기 전, 보관의 경우 보관 시작 시간 전에만 취소가 가능합니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 4,
        admin_id: "1",
        category: "보관",
        title: "보관 기간",
        content: "최소 30분부터 최대 30일까지 보관 가능합니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 5,
        admin_id: "1",
        category: "로그인",
        title: "로그인 어떻게 하나요?",
        content: "카카오 소셜 로그인을 이용할 수 있습니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 6,
        admin_id: "1",
        category: "로그인",
        title: "로그인 하면 뭐가 좋은가요?",
        content: "예약 코드 없이 예약을 조회할 수 있습니다. \n 이전 내역을 한 번에 확인할 수 있습니다. 예약과 관련된 알림을 받을 수 있습니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 7,
        admin_id: "1",
        category: "알림",
        title: "알림 하면 뭐가 좋은가요?",
        content: "알림 권한을 허용하면, 서비스와 관련된 알림을 받아볼 수 있습니다. \n 발송되는 알림은 아래와 같습니다. \n배송: 기사 배정 알림, 기사 픽업 장소로 출발 시 알림, 픽업 시간 알림, 보따리의 목적지 도착 알림\n보관: 보관 시작 알림, 보관 시간 완료 알림",
        created_at: now,
        updated_at: now,
      },
    ]

    await queryInterface.bulkInsert(tableName, records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
  
};