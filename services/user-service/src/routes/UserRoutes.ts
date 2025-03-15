import { Router } from "express";

import RegisterUserController from "../controllers/RegisterUserController";

const router = Router();

router.post("/register", RegisterUserController);
// напиішть оце, мені лінь
// router.post("/login", loginUser);

export default router;
