import { Request, RequestHandler, Response } from "express";

import ResponseService from "../services/ResponseService";
import { signAccess, verifyRefresh } from "../utils/jwt";
import RefreshTokenModel from "../models/RefreshTokenModel";

const RefreshTokenController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    ResponseService.error(res, "No refresh token", 401);
    return;
  }

  try {
    const payload = verifyRefresh(refreshToken) as { id: string };
    const saved = await RefreshTokenModel.findOne({ token: refreshToken });

    if (!saved) throw new Error("not found");

    const newAccess = signAccess({ id: payload.id });

    ResponseService.success(res, { accessToken: newAccess });
  } catch (e) {
    ResponseService.error(res, "Invalid refresh", 498);
  }
};

export default RefreshTokenController;
