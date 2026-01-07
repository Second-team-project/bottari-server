/**
 * @file databases/seeders/dummy-guide_img.2.seeder.js
 * @description guide_img table dummy data create
 * 251229 v1.0.0 N init
 */

import { fakerKO } from '@faker-js/faker';

const now = new Date();

// 테이블명
const tableName = 'guide_img';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        id: 1,
        type: "BANNER",
        img: '/files/guide/bottari-main-banner.png',
        img_eng: '/files/guide/bottari-main-banner.png',
        active: "T",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        type: "SERVICE",
        img: '/files/guide/bottari-main-service.png',
        img_eng: '/files/guide/bottari-main-service.png',
        active: "T",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        type: "EVENT",
        title: "리뷰 이벤트",
        img: '/files/guide/bottari-event-banner-coffee.PNG',
        img_eng: '/files/guide/bottari-event-banner-coffee.PNG',
        active: "T",
        link: '/service/notice?id=2',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        type: "EVENT",
        title: "스티커 이벤트",
        img: '/files/guide/bottari-event-banner-sticker.PNG',
        img_eng: '/files/guide/bottari-event-banner-sticker.PNG',
        active: "T",
        link: '/service/notice?id=3',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        type: "EVENT",
        img: '/files/guide/bottari-event-banner-open.PNG',
        img_eng: '/files/guide/bottari-event-banner-open.PNG',
        active: "T",
        link: '/service/notice?id=1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        type: "PRICE",
        img: '/files/guide/bottari-price.PNG',
        img_eng: '/files/guide/bottari-price.PNG',
        active: "T",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        type: "USAGE",
        img: '/files/guide/bottari-usage.PNG',
        img_eng: '/files/guide/bottari-usage.PNG',
        active: "T",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert(tableName, records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }

};