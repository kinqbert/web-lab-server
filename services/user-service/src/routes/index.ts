import { Router } from "express";

import RefreshTokenController from "../controllers/RefreshTokenController";
import LoginUserController from "../controllers/LoginUserController";
import RegisterUserController from "../controllers/RegisterUserController";

const router = Router();

router.post("/refresh", RefreshTokenController);
router.post("/register", RegisterUserController);
router.post("/login", LoginUserController);

export default router;
