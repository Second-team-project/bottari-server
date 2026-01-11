/**
 * @file databases/seeders/dummy-review.seeder.js
 * @description create review dummy data
 * 251231 v1.0.0 mastercat init
 */

import { fakerKO } from '@faker-js/faker';
import db from '../../app/models/index.js';
const { Sequelize, Review, User } = db;

const tableName = 'reviews';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        id: 1,
        user_id: 1,
        reserv_id: 8,
        title: '안전하게 배송 됐어요.',
        content: '안전하게 배송 됐어요!',
        img: '/files/review/review-test-1.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        user_id: 1,
        reserv_id: 15,
        title: '안전하게 배송 됐어요.',
        content: '안전하게 배송 됐어요!',
        img: '/files/review/review-test-2.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        user_id: 1,
        reserv_id: 16,
        title: '오픈 기념 스티커 받았는데',
        content: '보따리 스티커 받았는데 실물이 더 귀여워요.',
        img: '/files/review/review-test-3.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        user_id: 1,
        reserv_id: 17,
        title: '오픈 기념 스티커 받았는데',
        content: '보따리 스티커 받았는데 실물이 더 귀여워요. 빨리 굿즈로 팔아주세요.',
        img: '/files/review/review-test-4.svg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        user_id: 1,
        reserv_id: 18,
        title: '픽업 할 때 기사님이',
        content: '너무 친절하셨어요.',
        img: '/files/review/review-test-5.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        user_id: 1,
        reserv_id: 19,
        title: '보관 할 때 직원이',
        content: '너무 친절하셨어요.',
        img: '/files/review/review-test-6.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]

    await queryInterface.bulkInsert(tableName, records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};