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
    const { year } = req.query;

    // year가 있으면 그걸 쓰고, 없으면 현재 연도를 사용
    const targetYear = year ? year : new Date().getFullYear();

    const monthlyStats = await adminStatsService.getMonthlyStats(targetYear);

    const responseData = {
      year: targetYear,
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