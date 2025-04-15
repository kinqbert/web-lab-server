import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

import CONFIG from "./config/env";

import userRoutes from "./routes/UserRoutes";
import transactionRoutes from "./routes/TransactionRoutes";
import goalRoutes from "./routes/GoalRoutes";
import { verifyJWT } from "./middlewares/verifyJWT";

const startGateway = async () => {
  const app = express();

  app.use(
    cors({
      origin: CONFIG.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(express.json());

  app.use("/users", userRoutes);

  app.use(verifyJWT);
  app.use("/transactions", transactionRoutes);
  app.use("/goals", goalRoutes);

  app.get("/health", (req: Request, res: Response) => {
    res.json({ message: "API Gateway is running" });
  });

  const PORT = CONFIG.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startGateway();
