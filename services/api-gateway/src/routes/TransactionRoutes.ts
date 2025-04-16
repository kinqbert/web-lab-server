import { Router } from "express";
import axios from "axios";
import CONFIG from "../config/env";
import ResponseService from "../services/ResponseService";

const router = Router();
const TRANSACTION_SERVICE_URL = CONFIG.TRANSACTION_SERVICE_URL;

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${TRANSACTION_SERVICE_URL}/transactions`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Transaction service error",
      error.response?.data?.status
    );
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${TRANSACTION_SERVICE_URL}/transactions`,
      {
        params: req.query,
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Transaction service error",
      error.response?.data?.status
    );
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const response = await axios.delete(
      `${TRANSACTION_SERVICE_URL}/transactions/${req.params.id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Transaction service error",
      error.response?.data?.status
    );
  }
});

router.get("/analytics/summary", async (req, res) => {
  try {
    const response = await axios.get(
      `${TRANSACTION_SERVICE_URL}/transactions/analytics/summary`,
      {
        params: req.query,
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Transaction service error",
      error.response?.data?.status
    );
  }
});

router.get("/analytics/categories", async (req, res) => {
  try {
    const response = await axios.get(
      `${TRANSACTION_SERVICE_URL}/transactions/analytics/categories`,
      {
        params: req.query,
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Transaction service error",
      error.response?.data?.status
    );
  }
});

router.get("/analytics/timeline", async (req, res) => {
  try {
    const response = await axios.get(
      `${TRANSACTION_SERVICE_URL}/transactions/analytics/timeline`,
      {
        params: req.query,
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "Transaction service error",
      error.response?.data?.status
    );
  }
});

export default router;
