import { Router } from "express";

import CreateTransactionController from "../controllers/CreateTransactionController";
import DeleteTransactionController from "../controllers/DeleteTransactionController";
import GetTransactionController from "../controllers/GetTransactionController";
import GetAnalyticsTimelineController from "../controllers/GetAnalyticsTimelineController";
import GetCategoryExpencesController from "../controllers/GetCategoryExpencesController";
import GetAnalyticsSummaryController from "../controllers/GetAnalyticsSummaryController";

const router = Router();

router.post("/", CreateTransactionController);
router.delete("/:id", DeleteTransactionController);
router.get("/", GetTransactionController);

router.get("/analytics/summary", GetAnalyticsSummaryController);
router.get("/analytics/categories", GetCategoryExpencesController);
router.get("/analytics/timeline", GetAnalyticsTimelineController);

export default router;
