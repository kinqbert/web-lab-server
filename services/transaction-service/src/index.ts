import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import CONFIG from "./config/env";
import HealthCheckController from "./controllers/HealthController";
import TransactionRoutes from "./routes";
import { connectRabbit } from "./rabbit";

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(morgan("tiny"));

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(CONFIG.MONGODB_CLUSTER_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }

  try {
    await connectRabbit();
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }

  app.get("/health", HealthCheckController);

  app.use("/transactions", TransactionRoutes);

  const PORT = CONFIG.PORT;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
