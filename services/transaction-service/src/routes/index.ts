import { Router } from "express";

import { ROUTES } from "../config/routes";
import CreateTransactionController from "../controllers/CreateTransactionController";

const router = Router();

// імплементуйте всі оці ендпоінти, заготовку я вам дав
router.post(ROUTES.TRANSACTION.CREATE, CreateTransactionController);
// router.delete(ROUTES.TRANSACTION.DELETE, CreateTransactionController);
// router.patch(ROUTES.TRANSACTION.UPDATE, CreateTransactionController);
// router.get(ROUTES.TRANSACTION.GET, CreateTransactionController);

export default router;
