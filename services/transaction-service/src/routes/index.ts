import { Router } from "express";

import { ROUTES } from "../config/routes";
import CreateTransactionController from "../controllers/CreateTransactionController";
import DeleteTransactionController from "../controllers/DeleteTransactionController";
import GetTransactionController from "../controllers/GetTransactionController";

const router = Router();

router.post(ROUTES.TRANSACTION.CREATE, CreateTransactionController);
router.delete(ROUTES.TRANSACTION.DELETE, DeleteTransactionController);
router.get(ROUTES.TRANSACTION.GET, GetTransactionController);

export default router;
