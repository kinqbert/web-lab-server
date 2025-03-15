import { Request, RequestHandler, Response } from "express";

const HealthCheckController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(200).json({ message: "User Service is running" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check health" });
  }
};

export default HealthCheckController;
