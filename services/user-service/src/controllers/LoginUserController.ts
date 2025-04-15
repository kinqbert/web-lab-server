import { Request, RequestHandler, Response } from "express";
import Joi from "joi";

import UserModel from "../models/UserModel";
import ResponseService from "../services/ResponseService";

const LoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).unknown(true);

const LoginUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const { error } = LoginUserSchema.validate(req.body);

    if (error) {
      ResponseService.error(res, error.message, 400);
      return;
    }

    const user = await UserModel.findOne({ email, password });

    if (!user) {
      ResponseService.error(res, "Invalid credentials", 401);
      return;
    }

    ResponseService.success(res, { id: user._id, name: user.name }, 201);
  } catch (error) {
    ResponseService.error(res, (error as Error).message, 500);
  }
};

export default LoginUserController;
