import { Request, RequestHandler, Response } from "express";
import ResponseService from "../services/ResponseService";
import { loginUser } from "../services/UserServices";

const LoginUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    ResponseService.success(res, result);
  } catch (error) {
    const message = (error as Error).message;
    const code = message.includes("credentials") ? 401 : 400;
    ResponseService.error(res, message, code);
  }
};

export default LoginUserController;
