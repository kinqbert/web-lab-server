import { Request, RequestHandler, Response } from "express";

import { getGoals, updateGoal } from "../services/GoalServices";
import ResponseService from "../services/ResponseService";

const GetGoalsController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers["x-user-id"] as string;

  try {
    const response = await getGoals(userId);

    ResponseService.success(res, response, 201);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message);
  }
};

export default GetGoalsController;
