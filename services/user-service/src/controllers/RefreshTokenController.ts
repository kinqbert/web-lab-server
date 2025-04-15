import { Request, RequestHandler, Response } from "express";
import Joi from "joi";

import ResponseService from "../services/ResponseService";
import { signAccess, verifyRefresh } from "../utils/jwt";
import RefreshTokenModel from "../models/RefreshTokenModel";

const RefreshTokenController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      ResponseService.error(res, "No refresh token", 401);
      return;
    }

    try {
      const payload = verifyRefresh(token) as { id: string };
      const saved = await RefreshTokenModel.findOne({ token });
      if (!saved) throw new Error("Not found");

      const newAccess = signAccess({ id: payload.id });
      res.json({ accessToken: newAccess });
    } catch {
      ResponseService.error(res, "Invalid refresh", 401);
    }
  } catch (error) {
    ResponseService.error(res, (error as Error).message, 500);
  }
};

export default RefreshTokenController;
