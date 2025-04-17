import { Router } from "express";
import CONFIG from "../config/env";
import { proxyRequest } from "../utils/proxyRequest";

const router = Router();
const BASE = CONFIG.GOAL_SERVICE_URL + "/goals";

router.post("/", (req, res) => {
  proxyRequest(req, res, "post", `${BASE}`, { data: req.body });
});

router.put("/:id", (req, res) => {
  proxyRequest(req, res, "put", `${BASE}/${req.params.id}`, { data: req.body });
});

router.get("/", (req, res) => {
  proxyRequest(req, res, "get", `${BASE}`);
});

export default router;
