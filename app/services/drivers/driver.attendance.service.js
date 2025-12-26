/**
 * @file app/services/drivers/driver.attendance.service.js
 * @description driver attendance Service
 * 251227 v1.0.0 김위민 init
 */

import db from '../../models/index.js';
import customError from '../../errors/custom.error.js';
import { BAD_REQUEST_ERROR } from '../../../configs/responseCode.config.js';
import driverAttendanceLogRepository from '../../repositories/driverAttendanceLog.repository.js';

/**
 * 현재 기사의 근무 상태 조회
 */
async function getAttendanceStatus(driverId) {
  const activeLog = await driverAttendanceLogRepository.findLastActiveLog(null, driverId);
  // 활성화된 출근 로그가 있으면 CLOCKED_IN, 없으면 CLOCKED_OUT 반환
  return { 
    state: activeLog ? 'CLOCKED_IN' : 'CLOCKED_OUT' 
  };
}

/**
 * 출퇴근 토글 로직
 */
async function toggleAttendance(driverId, nextState) {
  return await db.sequelize.transaction(async t => {
    
    // 1. 출근 처리
    if (nextState === 'CLOCKED_IN') {
      const existingLog = await driverAttendanceLogRepository.findLastActiveLog(t, driverId);
      if (existingLog) throw customError('이미 출근 처리된 상태입니다.', BAD_REQUEST_ERROR);

      return await driverAttendanceLogRepository.createLog(t, {
        driverId,
        clockInAt: new Date(),
        state: 'CLOCKED_IN'
      });
    } 
    
    // 2. 퇴근 처리
    else if (nextState === 'CLOCKED_OUT') {
      const activeLog = await driverAttendanceLogRepository.findLastActiveLog(t, driverId);
      if (!activeLog) throw customError('출근 기록을 찾을 수 없습니다.', BAD_REQUEST_ERROR);

      activeLog.clockOutAt = new Date();
      activeLog.state = 'CLOCKED_OUT';
      
      return await driverAttendanceLogRepository.save(t, activeLog);
    }
  });
}

export default { 
  getAttendanceStatus, 
  toggleAttendance 
};