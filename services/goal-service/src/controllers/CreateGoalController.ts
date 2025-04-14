import { Request, RequestHandler, Response } from "express";

import { createGoal } from "../services/GoalServices";
import ResponseService from "../services/ResponseService";

const CreateGoalController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await createGoal(req.body);

    ResponseService.success(res, response, 201);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message);
  }
};

export default CreateGoalController;
