import { RequestHandler } from "express";
import RefreshTokenModel from "../models/RefreshTokenModel";
import ResponseService from "../../../transaction-service/src/services/ResponseService";

export const LogoutUserController: RequestHandler = async (req, res) => {
  const userId = req.headers["x-user-id"] as string;

  if (userId) {
    await RefreshTokenModel.deleteOne({ userId }).catch(() => null);
  }

  ResponseService.success(res, {}, 204);
};

export default LogoutUserController;
