import "dotenv/config";
import express, { Request, Response } from "express";

import CONFIG from "./config/env";
import apiRouter from "./routes/UserServiceRoutes";

const startGateway = async () => {
  const app = express();
  app.use(express.json());

  app.use("/api", apiRouter);

  app.get("/health", (req: Request, res: Response) => {
    res.json({ message: "API Gateway is running" });
  });

  const PORT = CONFIG.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startGateway();
