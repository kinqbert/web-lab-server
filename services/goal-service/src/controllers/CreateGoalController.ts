import { Request, RequestHandler, Response } from "express";

import { createGoal } from "../services/GoalServices";
import ResponseService from "../services/ResponseService";

const CreateGoalController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers["x-user-id"] as string;

  try {
    const response = await createGoal(req.body, userId);

    ResponseService.success(res, response, 201);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message);
  }
};

export default CreateGoalController;
