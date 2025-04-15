import { RequestHandler } from "express";
import { verifyAccess } from "../utils/jwt";
import ResponseService from "../services/ResponseService";

export const verifyJWT: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    ResponseService.error(res, "No token", 401);
    return;
  }
  try {
    const payload = verifyAccess(auth.split(" ")[1]) as { id: string };
    (req as any).userId = payload.id;
    next();
  } catch {
    ResponseService.error(res, "Token invalid/expired", 401);
  }
};
