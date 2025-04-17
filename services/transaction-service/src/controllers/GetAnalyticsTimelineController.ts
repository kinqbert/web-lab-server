import { Request, RequestHandler, Response } from "express";

import ResponseService from "../services/ResponseService";
import { getAnalyticsTimeline } from "../services/TransactionServices";

const GetAnalyticsTimelineController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers["x-user-id"] as string;

  try {
    const response = await getAnalyticsTimeline(userId);

    ResponseService.success(res, response, 200);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message);
  }
};

export default GetAnalyticsTimelineController;
