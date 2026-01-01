/**
 * @file app/services/admin.emps.service.js
 * @description 직원 관리 service
 * 250101 v1.0.0 김민현 init
 */
import db from "../../models/index.js"
import { Op } from "sequelize";
import empRepository from "../../repositories/emp.repository.js";
import bcrypt from 'bcrypt';
const { Admin } = db;

/**
 * 직원 목록 페이지네이션(검색 추가)
 * @returns
 */
async function pagination(params) {
  const { page, adminName, email, accountId, phone, code } = params;
  // 검색 조건 생성
  const where = {};

  if (adminName) where.adminName = { [Op.like]: `%${adminName}%` };
  if (code) where.code = { [Op.like]: `%${code}%` };
  if (accountId) where.accountId = { [Op.like]: `%${accountId}%` };
  if (phone) where.phone = { [Op.like]: `%${phone}%` };

  const limit = 20;
  const offset = limit * (page - 1);
  
  return await empRepository.pagination(null, { limit, offset, where });
}

/**
 * 직원 상세 조회
 */
async function show(id) {
  return await empRepository.findByPk(null, id);
}

/**
 * 직원 등록
 */
async function create(data) {
  const { adminName, phone, accountId, password, email, code } = data;

  // 중복 체크 (아이디, 전화번호)
  const existsId = await empRepository.findByAccountId(null, accountId);
  if (existsId) {
    throw new Error('이미 존재하는 아이디입니다.');
  }

  const existsPhone = await empRepository.findByPhone(null, phone);
  if (existsPhone) {
    throw new Error('이미 존재하는 휴대폰 번호입니다.');
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  const newEmpData = {
    adminName,
    phone,
    accountId,
    password: hashedPassword,
    email,
    code
  };

  return await empRepository.create(null, newEmpData);
}

/**
 * 직원 정보 수정
 */
async function update(id, data) {
  const { adminName, phone, email, code, password } = data;

  // 존재 여부 확인
  const emp = await empRepository.findByPk(null, id);
  if (!emp) {
    throw new Error('존재하지 않는 직원입니다.');
  }

  // 데이터 변경 (인스턴스 수정)
  if (adminName) emp.adminName = adminName;
  if (phone) emp.phone = phone;
  if (email) emp.email = email;
  if (code) emp.code = code;

  // 비밀번호 변경 시 암호화
  if (password) {
    emp.password = await bcrypt.hash(password, 10);
  }

  // Repository의 save 호출 (인스턴스 저장)
  return await empRepository.save(null, emp);
}

/**
 * 직원 정보 삭제
 */
async function destroy(id) {
  // 존재 여부 확인
  const emp = await empRepository.findByPk(null, id);
  if (!emp) {
    throw new Error('존재하지 않는 직원입니다.');
  }

  return await empRepository.destroy(null, id);
}

export default {
  pagination,
  show,
  create,
  update,
  destroy
};