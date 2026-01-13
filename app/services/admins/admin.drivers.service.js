/**
 * @file app/services/admin.drivers.service.js
 * @description 기사 관리 service
 * 251231 v1.0.0 김민현 init
 */
import driverRepository from "../../repositories/driver.repository.js";
import bcrypt from 'bcrypt';
import { Op } from "sequelize";

/**
 * 기사 목록 페이지네이션(검색 추가)
 * @returns
 */
async function pagination(params) {
  const { page, driverName, carNumber, email, accountId, phone } = params;
  // 검색 조건 생성
  const where = {};

  if (driverName) where.driverName = { [Op.like]: `%${driverName}%` };
  if (carNumber) where.carNumber = { [Op.like]: `%${carNumber}%` };
  if (accountId) where.accountId = { [Op.like]: `%${accountId}%` };
  if (phone) where.phone = { [Op.like]: `%${phone}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };

  const limit = 20;
  const offset = limit * (page - 1);
  
  return await driverRepository.pagination(null, { limit, offset, where });
}

/**
 * 기사 상세 조회
 */
async function show(id) {
  return await driverRepository.findByPkWithReserv(null, id);
}

/**
 * 기사 등록
 */
async function create(data) {
  const { driverName, phone, accountId, password, email, carNumber, notes } = data;

  // 중복 체크 (아이디, 전화번호)
  const existsId = await driverRepository.findByAccountId(null, accountId);
  if (existsId) {
    throw new Error('이미 존재하는 아이디입니다.');
  }

  const existsPhone = await driverRepository.findByPhone(null, phone);
  if (existsPhone) {
    throw new Error('이미 존재하는 휴대폰 번호입니다.');
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  const newDriverData = {
    driverName,
    phone,
    accountId,
    passwordHash: hashedPassword,
    email,
    carNumber,
    notes
  };

  return await driverRepository.create(null, newDriverData);
}

/**
 * 기사 정보 수정
 */
async function update(id, data) {
  const { driverName, phone, email, carNumber, notes, password } = data;

  // 존재 여부 확인
  const driver = await driverRepository.findByPk(null, id);
  if (!driver) {
    throw new Error('존재하지 않는 기사입니다.');
  }

  // 데이터 변경 (인스턴스 수정)
  if (driverName) driver.driverName = driverName;
  if (phone) driver.phone = phone;
  if (email) driver.email = email;
  if (carNumber) driver.carNumber = carNumber;
  if (notes) driver.notes = notes;
  
  // 비밀번호 변경 시 암호화
  if (password) {
    driver.passwordHash = await bcrypt.hash(password, 10);
  }

  // Repository의 save 호출 (인스턴스 저장)
  return await driverRepository.save(null, driver);
}

/**
 * 기사 삭제
 */
async function destroy(id) {
  // 존재 여부 확인
  const driver = await driverRepository.findByPk(null, id);
  if (!driver) {
    throw new Error('존재하지 않는 기사입니다.');
  }

  return await driverRepository.destroy(null, id);
}

export default {
  pagination,
  show,
  create,
  update,
  destroy
};