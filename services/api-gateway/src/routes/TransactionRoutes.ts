import { Router } from "express";
import CONFIG from "../config/env";
import { proxyRequest } from "../utils/proxyRequest";

const router = Router();
const BASE = CONFIG.TRANSACTION_SERVICE_URL + "/transactions";

router.post("/", (req, res) => {
  proxyRequest(req, res, "post", `${BASE}`, { data: req.body });
});

router.get("/", (req, res) => {
  proxyRequest(req, res, "get", `${BASE}`, { params: req.query });
});

router.delete("/:id", (req, res) => {
  proxyRequest(req, res, "delete", `${BASE}/${req.params.id}`);
});

router.get("/analytics/summary", (req, res) => {
  proxyRequest(req, res, "get", `${BASE}/analytics/summary`, {
    params: req.query,
  });
});

router.get("/analytics/categories", (req, res) => {
  proxyRequest(req, res, "get", `${BASE}/analytics/categories`, {
    params: req.query,
  });
});

router.get("/analytics/timeline", (req, res) => {
  proxyRequest(req, res, "get", `${BASE}/analytics/timeline`, {
    params: req.query,
  });
});

export default router;
