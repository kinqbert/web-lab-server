import { Router } from "express";
import axios from "axios";
import CONFIG from "../config/env";
import ResponseService from "../services/ResponseService";

const router = Router();
const GOAL_SERVICE_URL = CONFIG.GOAL_SERVICE_URL;

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${GOAL_SERVICE_URL}/goals`, req.body);
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Goal service error",
      500
    );
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await axios.put(
      `${GOAL_SERVICE_URL}/goals/${req.params.id}`,
      req.body
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Goal service error",
      500
    );
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const response = await axios.get(
      `${GOAL_SERVICE_URL}/goals/${req.params.userId}`
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Goal service error",
      500
    );
  }
});

export default router;
