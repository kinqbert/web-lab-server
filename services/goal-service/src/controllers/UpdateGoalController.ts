import { Request, RequestHandler, Response } from "express";

import { updateGoal } from "../services/GoalServices";
import ResponseService from "../services/ResponseService";

const UpdateGoalController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const goalData = req.body;

    const response = await updateGoal(id, goalData);

    ResponseService.success(res, response, 201);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message);
  }
};

export default UpdateGoalController;
