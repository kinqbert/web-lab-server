import { Request, RequestHandler, Response } from "express";

import ResponseService from "../services/ResponseService";
import { getTransactions } from "../services/TransactionServices";

const GetTransactionController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await getTransactions(req.body);

    ResponseService.success(res, response, 200);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message);
  }
};

export default GetTransactionController;
