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
        title: "예약 취소 / 결제 취소는 어떻게 하나요?",
        content: "예약 조회에서 해당 예약의 '예약 취소' 버튼을 눌러, 예약을 취소하시면 자동으로 환불 절차가 진행됩니다.\n 배송의 경우 기사가 배정되기 전, 보관의 경우 보관 시작 시간 전에만 취소가 가능합니다.\n \n 취소 가능한 기한 : \n 카드 : 1년 이내\n 계좌이체 : 180일 이내\n 가상계좌 : 1년 이내\n 휴대폰 : 1개월 이내\n 해외결제 (paypal) : 180일 이내\n\n취소 소요 기한 : \n카드 : 영업일 기준 3~4일\n계좌이체 : 실시간\n가상 계좌 : 영업일 기준 2~9일\n휴대폰 : 당일\n해외결제(paypal) : 영업일 기준 5일 (카드 회사에 따라 최대 30일 소요) ",
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
        content: "알림 권한을 허용하면, 서비스와 관련된 알림을 받아볼 수 있습니다. \n 발송되는 알림은 아래와 같습니다. \n\n배송: 기사 배정 알림, 기사 픽업 장소로 출발 시 알림, 픽업 시간 알림, 보따리의 목적지 도착 알림\n보관: 보관 시작 알림, 보관 시간 완료 알림",
        created_at: now,
        updated_at: now,
      },
      {
        id: 8,
        admin_id: "1",
        category: "예약",
        title: "예약을 변경하고 싶어요.",
        content: "예약을 일부만 수정할 수는 없습니다. 기존의 예약을 취소한 뒤 새로 예약 해주세요.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 9,
        admin_id: "1",
        category: "예약",
        title: "짐이 파손되거나 분실됐어요.",
        content: "보따리에서는 혹시라도 발생할수 있는 여행가방의 파손이나 분실등의 사고에 대비하여 최선의 보상특약을 운영하고 있습니다.\n\n이동시 발생할수 있는 가방의 흠집이나 스크래치, 부착된 스티커나 고리등의 부착물등은 보상이 불가합니다.\n특히 고가의 물품이나 귀중품등은 보상이 어려우니 개별 소지 부탁드립니다.",
        created_at: now,
        updated_at: now,
      },
      {
        id: 10,
        admin_id: "1",
        category: "예약",
        title: "보관 기간을 넘겨버렸어요.",
        content: "보관 기간을 초과한 경우, 보따리를 찾아가실 때 차액을 지불하실 수 있습니다.\n최대 한 달까지 초과하여 짐을 보관하며, 한 달이 지난 후 폐기 될 수 있습니다.",
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