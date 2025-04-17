import { Request, RequestHandler, Response } from "express";

import ResponseService from "../services/ResponseService";
import { createTransaction } from "../services/TransactionServices";

const CreateTransactionController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers["x-user-id"] as string;

  try {
    const response = await createTransaction(req.body, userId);

    ResponseService.success(res, response, 201);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message);
  }
};

export default CreateTransactionController;
