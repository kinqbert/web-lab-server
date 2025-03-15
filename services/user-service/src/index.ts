import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import CONFIG from "./config/env";
import HealthCheckController from "./controllers/HealthController";
import UserRoutes from "./routes/userRoutes";

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(morgan("[USER SERVICE] :method :url :status :response-time ms"));

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      CONFIG.MONGODB_CLUSTER_URL || "mongodb://localhost:27017/user-service"
    );
    console.log("[USER SERVICE] Connected to MongoDB (User Service)");
  } catch (error) {
    console.error("[USER SERVICE] MongoDB connection error:", error);
  }

  app.use("/users", UserRoutes);
  app.get("/health", HealthCheckController);

  const PORT = CONFIG.PORT;
  app.listen(PORT, () => {
    console.log(`[USER SERVICE] User Service listening on port ${PORT}`);
  });
};

startServer();
