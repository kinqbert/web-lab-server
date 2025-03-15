import { Request, RequestHandler, Response } from "express";
import Joi from "joi";

import UserModel from "../models/UserModel";
import ResponseService from "../services/ResponseService";

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

    const { error } = RegisterUserSchema.validate({ name, email, password });

    if (error) {
      ResponseService.error(res, error.message, 400);
      return;
    }

    const newUser = new UserModel({
      name,
      email,
      password,
    });

    await newUser.save();
    ResponseService.success(res, { user: newUser }, 201);
  } catch (error) {
    console.error(error);
    ResponseService.error(res, (error as Error).message, 500);
  }
};

export default RegisterUserController;
