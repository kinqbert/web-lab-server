import axios from "axios";
import { Router } from "express";

import CONFIG from "../config/env";
import { ROUTES } from "../config/routes";
import ResponseService from "../services/ResponseService";

const router = Router();

const USER_SERVICE_URL = CONFIG.USER_SERVICE_URL || "http://localhost:5051";

router.post(ROUTES.USERS.REGISTER, async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}${ROUTES.USERS.REGISTER}`,
      req.body
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(res, error.response.data.error, 500);
  }
});

router.post(ROUTES.USERS.LOGIN, async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}${ROUTES.USERS.LOGIN}`,
      req.body
    );
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(res, error.response.data.error, 500);
  }
});

export default router;
