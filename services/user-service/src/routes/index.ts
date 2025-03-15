import { Router } from "express";

import { ROUTES } from "../config/routes";
import LoginUserController from "../controllers/LoginUserController";
import RegisterUserController from "../controllers/RegisterUserController";

const router = Router();

router.post(ROUTES.USERS.REGISTER, RegisterUserController);
router.post(ROUTES.USERS.LOGIN, LoginUserController);

export default router;
