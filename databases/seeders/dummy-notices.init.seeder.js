/**
 * @file databases/seeders/dummy-notices.2.seeder.js
 * @description notices table dummy data create
 * 251229 v1.0.0 N init
 */

const now = new Date();

// 테이블명
const tableName = 'notices';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        id: 1,
        admin_id: 1,
        title: "보따리 오픈 안내",
        content: "여행가방은 보따리에 맡겨 주시고 편안한 여행을 즐기세요. \n 보따리은 여행자의 가방을 공항에서 숙소까지 배달해드리는 신개념 여행편의서비스입니다.\n\n - 여행가방, 캐리어, 골프백 등  종류에 상관없이 원하는 목적지까지 안전하고 정확하게 배달해 드립니다.\n - 보따리 전담 기사님이 안전하게 배달합니다.\n - 한 개의 보따리라도 목적지까지 안전하고 정확하게 배달해 드립니다.\n",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2, 
        admin_id: 1,
        title: "[EVENT] 보따리 오픈 기념 커피 증정 이벤트",
        content: "보따리 서비스가 시작되며, 이벤트를 진행합니다.\n 후기를 작성해주시는 고객님들 중 추첨을 통하여 '스타벅스 아메리카노' 쿠폰을 보내드립니다!\n\n- 후기 작성을 위해서는 로그인이 필요합니다.\n- 보따리의 간편한 로그인을 체험해보세요.\n\n- 리뷰 작성을 위해서는 서비스 이용을 완료하셔야 합니다.\n\n- 해당 이벤트에 사용되는 개인정보는 이벤트 완료 후 폐기됩니다.\n",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        admin_id: 1,
        title: "[EVENT] 보따리 오픈 기념 보따리 스티커 증정 이벤트",
        content: "보따리 서비스가 시작되며, 이벤트를 진행합니다.\n 보따리를 이용해주시는 모든 고객님께 우리의 '보따리' 스티커를 보내드립니다!\n - 후기 작성을 위해서는 로그인이 필요합니다.\n - 서비스 이용 완료 시 스티커를 증정 해드립니다.\n - 해당 '보따리 스티커'는 추후 판매 예정 상품입니다.\n",
        img: '/files/notice/bottari-notice-sticker.PNG',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert(tableName, records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notices', null, {});
  }

};