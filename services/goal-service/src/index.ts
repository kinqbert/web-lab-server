import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import goalRoutes from "./routes";
import CONFIG from "./config/env";
import { listenTransactions } from "./events";
import { connectRabbit } from "./rabbit";

const startServer = async () => {
  const app = express();
  app.use(express.json());

  await mongoose.connect(CONFIG.MONGODB_CLUSTER_URL);
  console.log("✅ Mongo (Goal Service)");

  await connectRabbit();

  await listenTransactions();

  app.use("/goals", goalRoutes);

  app.listen(CONFIG.PORT, () => console.log("🚀 Goal Service on", CONFIG.PORT));
};

startServer();
