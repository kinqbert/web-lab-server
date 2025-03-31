import { Request, RequestHandler, Response } from "express";

import ResponseService from "../services/ResponseService";
import { createTransaction } from "../services/TransactionServices";

const CreateTransactionController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await createTransaction(req.body);

    ResponseService.success(res, response, 201);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, "Failed to create transaction", 500);
  }
};

export default CreateTransactionController;
