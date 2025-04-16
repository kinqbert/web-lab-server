import { Request, Response } from "express";
import axios, { AxiosRequestConfig, Method } from "axios";
import ResponseService from "../services/ResponseService";

export async function proxyRequest(
  req: Request,
  res: Response,
  method: Method,
  url: string,
  config: Omit<AxiosRequestConfig, "method" | "url"> = {}
) {
  try {
    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      ...config,
      headers: {
        ...(config.headers || {}),
        "x-user-id": (req as any).userId, // якщо є
      },
    };

    const response = await axios(axiosConfig);
    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error,
      error.response?.status || 500
    );
  }
}
