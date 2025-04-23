import { RequestHandler } from "express";
import RefreshTokenModel from "../models/RefreshTokenModel";
import ResponseService from "../../../transaction-service/src/services/ResponseService";

export const LogoutUserController: RequestHandler = async (req, res) => {
  const refreshToken = req.body.refreshToken as string | undefined;

  if (refreshToken) {
    await RefreshTokenModel.deleteOne({ token: refreshToken }).catch(
      () => null
    );
  }

  ResponseService.success(res, {}, 204);
};

export default LogoutUserController;
