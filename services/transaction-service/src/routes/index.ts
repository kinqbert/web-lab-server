import { Router } from "express";

import CreateTransactionController from "../controllers/CreateTransactionController";
import DeleteTransactionController from "../controllers/DeleteTransactionController";
import GetTransactionController from "../controllers/GetTransactionController";

const router = Router();

router.post("/", CreateTransactionController);
router.delete("/:id", DeleteTransactionController);
router.get("/", GetTransactionController);

export default router;
