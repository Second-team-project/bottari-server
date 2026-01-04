/**
 * @file app/repositories/push.repository.js
 * @description push Repository
 * 251224 v1.0.0 N init
 */

import db from '../models/index.js';
const { Push } = db;

async function upsert(t = null, data) {
  return await Push.upsert(
    data, 
    { 
      transaction : t 
    }
  );
}

export default {
  upsert,
}