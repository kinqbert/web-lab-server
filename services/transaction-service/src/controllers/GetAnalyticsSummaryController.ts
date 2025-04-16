import { Request, RequestHandler, Response } from "express";

import ResponseService from "../services/ResponseService";
import { getAnalyticsSummary } from "../services/TransactionServices";

const GetAnalyticsSummaryController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).userId;

  try {
    const response = await getAnalyticsSummary(userId);

    ResponseService.success(res, response, 200);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message);
  }
};

export default GetAnalyticsSummaryController;
