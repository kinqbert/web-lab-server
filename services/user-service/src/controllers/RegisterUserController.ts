import { Request, RequestHandler, Response } from "express";
import Joi from "joi";

import ResponseService from "../services/ResponseService";
import { createUser } from "../services/UserServices";

const RegisterUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const RegisterUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const { error } = RegisterUserSchema.validate(req.body);

    if (error) {
      ResponseService.error(res, error.message, 400);
      return;
    }

    const user = await createUser(name, email, password);

    ResponseService.success(res, { id: user._id, name: user.name }, 201);
  } catch (error) {
    ResponseService.error(res, (error as Error).message, 500);
  }
};

export default RegisterUserController;
