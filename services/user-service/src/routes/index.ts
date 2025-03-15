import { Router } from "express";

import LoginUserController from "../controllers/loginUserController";
import RegisterUserController from "../controllers/RegisterUserController";

const router = Router();

router.post("/register", RegisterUserController);
router.post("/login", LoginUserController);

export default router;
