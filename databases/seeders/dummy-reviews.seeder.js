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
        reserv_id: 1,
        title:  fakerKO.lorem.text().substring(0, 20),
        content: fakerKO.lorem.text().substring(0, 100),
        img: fakerKO.image.url(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        user_id: 1,
        reserv_id: 3,
        title:  fakerKO.lorem.text().substring(0, 20),
        content: fakerKO.lorem.text().substring(0, 100),
        img: fakerKO.image.url(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        user_id: 1,
        reserv_id: 5,
        title:  fakerKO.lorem.text().substring(0, 20),
        content: fakerKO.lorem.text().substring(0, 100),
        img: fakerKO.image.url(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        user_id: 1,
        reserv_id: 6,
        title:  fakerKO.lorem.text().substring(0, 20),
        content: fakerKO.lorem.text().substring(0, 100),
        img: fakerKO.image.url(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        user_id: 1,
        reserv_id: 8,
        title:  fakerKO.lorem.text().substring(0, 20),
        content: fakerKO.lorem.text().substring(0, 100),
        img: fakerKO.image.url(),
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