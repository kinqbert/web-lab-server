import { Router } from "express";
import CreateGoalController from "../controllers/CreateGoalController";
import UpdateGoalController from "../controllers/UpdateGoalController";
import GetGoalsController from "../controllers/GetGoalsController";

const router = Router();

router.post("/", CreateGoalController);
router.put("/:id", UpdateGoalController);
router.get("/", GetGoalsController);

export default router;
