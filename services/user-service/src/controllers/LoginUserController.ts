import { Request, RequestHandler, Response } from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";

import UserModel from "../models/UserModel";
import ResponseService from "../services/ResponseService";
import { signAccess, signRefresh } from "../utils/jwt";
import RefreshTokenModel from "../models/RefreshTokenModel";

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

    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      ResponseService.error(res, "Invalid credentials", 401);
      return;
    }

    const accessToken = signAccess({ id: user._id });
    const refreshToken = signRefresh({ id: user._id });

    await RefreshTokenModel.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
    });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: false,
      })
      .json({ accessToken, user: { id: user._id, name: user.name } });
  } catch (error) {
    ResponseService.error(res, (error as Error).message, 500);
  }
};

export default LoginUserController;
