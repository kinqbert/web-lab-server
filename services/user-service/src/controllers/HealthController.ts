import { Request, RequestHandler, Response } from "express";

import ResponseService from "../services/ResponseService";

const HealthCheckController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    ResponseService.success(res, { message: "User Service is running" }, 200);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, "Failed to check health", 500);
  }
};

export default HealthCheckController;
