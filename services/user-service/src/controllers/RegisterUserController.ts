import { Request, RequestHandler, Response } from "express";
import Joi from "joi";

import ResponseService from "../services/ResponseService";
import { createUser } from "../services/UserServices";
import { signAccess, signRefresh } from "../utils/jwt";
import RefreshTokenModel from "../models/RefreshTokenModel";

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

    const accessToken = signAccess({ id: user._id });
    const refreshToken = signRefresh({ id: user._id });

    await RefreshTokenModel.create({
      userId: user._id,
      token: refreshToken,
    });

    ResponseService.success(res, {
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name },
    });
  } catch (error) {
    ResponseService.error(res, (error as Error).message, 400);
  }
};

export default RegisterUserController;
