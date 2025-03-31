import { Request, RequestHandler, Response } from "express";

import ResponseService from "../services/ResponseService";
import { deleteTransaction } from "../services/TransactionServices";

const DeleteTransactionController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.body.id;

    const response = await deleteTransaction(id);

    ResponseService.success(res, response, 204);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message);
  }
};

export default DeleteTransactionController;
