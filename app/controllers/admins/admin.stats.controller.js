/**
 * @file app/controllers/admin.stats.controller.js
 * @description 통계 관련 컨트롤러
 * 251230 v1.0.0 김민현 init
 */
import customResponse from "../../../app/utils/custom.response.util.js";
import { SUCCESS } from "../../../configs/responseCode.config.js";
import adminStatsService from "../../services/admins/admin.stats.service.js";

/**
 * 월별 매출 및 예약 건수 조회
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function getMonthlyStats(req, res, next) {
  try {
    const monthlyStats = await adminStatsService.getMonthlyStats();

    const responseData = {
      stats: monthlyStats,
    };

    return res.status(SUCCESS.status).send(customResponse(SUCCESS, responseData));
  } catch(error) {
    return next(error);
  }
};

export default {
  getMonthlyStats,
}