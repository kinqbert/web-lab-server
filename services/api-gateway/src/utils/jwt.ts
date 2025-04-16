import jwt from "jsonwebtoken";
export const accessSecret = process.env.JWT_ACCESS_SECRET || "access123";
export const refreshSecret = process.env.JWT_REFRESH_SECRET || "refresh123";

export const signAccess = (payload: object) =>
  jwt.sign(payload, accessSecret, { expiresIn: "15s" });
export const signRefresh = (payload: object) =>
  jwt.sign(payload, refreshSecret, { expiresIn: "15s" });
export const verifyAccess = (token: string) => jwt.verify(token, accessSecret);
export const verifyRefresh = (token: string) =>
  jwt.verify(token, refreshSecret);
