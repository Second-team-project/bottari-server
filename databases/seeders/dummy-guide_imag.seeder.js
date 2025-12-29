/**
 * @file databases/seeders/dummy-guide_img.2.seeder.js
 * @description guide_img table dummy data create
 * 251229 v1.0.0 N init
 */

const now = new Date();

// 테이블명
const tableName = 'guide_img';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      // {
      //   admin_id: 1,
      //   title: "BANNER",
      //   content: "여행가방은 트립백에 맡겨 주시고 편안한 여행을 즐기세요. \n 트립백은 여행자의 가방을 공항에서 숙소까지 배달해드리는 신개념 여행편의서비스입니다.\n - 여행가방, 캐리어, 골프백 등  종류에 상관없이 원하는 목적지까지 안전하고 정확하게 배달해 드립니다.\n - 보따리 전담 기사님이 안전하게 배달합니다.\n - 한 개의 보따리라도 목적지까지 안전하고 정확하게 배달해 드립니다.\n",
      //   created_at: new Date(),
      //   updated_at: new Date(),
      // },
    ]

    await queryInterface.bulkInsert(tableName, records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notices', null, {});
  }

};