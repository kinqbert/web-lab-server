import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import CONFIG from "./config/env";
import HealthCheckController from "./controllers/HealthController";
import UserRoutes from "./routes";

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(morgan("tiny"));

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      CONFIG.MONGODB_CLUSTER_URL || "mongodb://localhost:27017/user-service"
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }

  app.get("/health", HealthCheckController);

  app.use("/users", UserRoutes);

  const PORT = CONFIG.PORT;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
