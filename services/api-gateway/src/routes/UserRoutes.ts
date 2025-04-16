import { Router } from "express";
import CONFIG from "../config/env";
import { proxyRequest } from "../utils/proxyRequest";

const router = Router();
const BASE = CONFIG.USER_SERVICE_URL + "/users";

router.post("/register", (req, res) => {
  proxyRequest(req, res, "post", `${BASE}/register`, {
    data: req.body,
    withCredentials: true,
  });
});

router.post("/login", (req, res) => {
  proxyRequest(req, res, "post", `${BASE}/login`, { data: req.body });
});

router.post("/refresh", (req, res) => {
  proxyRequest(req, res, "post", `${BASE}/refresh`, { data: req.body });
});

export default router;
