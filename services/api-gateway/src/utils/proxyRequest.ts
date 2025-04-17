import { Request, Response } from "express";
import axios, { AxiosRequestConfig, Method } from "axios";
import ResponseService from "../services/ResponseService";
import { setAuthCookies } from "./setAuthCookies";

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
        "x-user-id": (req as any).userId,
      },
    };

    const response = await axios(axiosConfig);

    const { accessToken, refreshToken } = response.data;
    if (accessToken && refreshToken) {
      setAuthCookies(res, accessToken, refreshToken);
    }

    ResponseService.success(res, response.data, response.status);
  } catch (error: any) {
    ResponseService.error(
      res,
      error.response?.data?.error,
      error.response?.status || 500
    );
  }
}
