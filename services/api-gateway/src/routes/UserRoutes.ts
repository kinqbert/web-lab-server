import { Router } from "express";
import axios from "axios";
import CONFIG from "../config/env";
import ResponseService from "../services/ResponseService";

const router = Router();
const USER_SERVICE_URL = CONFIG.USER_SERVICE_URL;

router.post("/register", async (req, res) => {
  try {
    const { data, status } = await axios.post(
      `${USER_SERVICE_URL}/users/register`,
      req.body,
      { withCredentials: true }
    );
    const userId = data.id || data.user?.id;

    if (!userId) {
      ResponseService.error(res, "Invalid response from User Service", 500);
      return;
    }

    ResponseService.success(res, data, status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "User service error",
      error.status
    );
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/users/login`,
      req.body
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "User service error",
      error.status
    );
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/users/refresh`,
      req.body
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error || "User service error",
      error.status
    );
  }
});

export default router;
