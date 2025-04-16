import { RequestHandler } from "express";
import { verifyAccess } from "../utils/jwt";
import ResponseService from "../services/ResponseService";

export const verifyJWT: RequestHandler = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    ResponseService.error(res, "No token", 401);
    return;
  }

  try {
    const payload = verifyAccess(token) as { id: string };
    (req as any).userId = payload.id;
    next();
  } catch {
    ResponseService.error(res, "Token invalid/expired", 401);
  }
};
