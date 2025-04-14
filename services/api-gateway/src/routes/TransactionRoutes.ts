import { Router } from "express";
import axios from "axios";
import CONFIG from "../config/env";
import ResponseService from "../services/ResponseService";

const router = Router();
const TRANSACTION_SERVICE_URL =
  CONFIG.TRANSACTION_SERVICE_URL || "http://localhost:3002";

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${TRANSACTION_SERVICE_URL}/transactions`,
      req.body
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Transaction service error",
      500
    );
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${TRANSACTION_SERVICE_URL}/transactions`,
      {
        params: req.query,
      }
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Transaction service error",
      500
    );
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const response = await axios.delete(
      `${TRANSACTION_SERVICE_URL}/transactions/${req.params.id}`
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Transaction service error",
      500
    );
  }
});

export default router;
