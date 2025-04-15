const CONFIG = {
  PORT: process.env.PORT || 5050,
  SESSION_SECRET: process.env.SESSION_SECRET || "",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://localhost:5051",
  TRANSACTION_SERVICE_URL:
    process.env.TRANSACTION_SERVICE_URL || "http://localhost:5052",
  GOAL_SERVICE_URL: process.env.GOAL_SERVICE_URL || "http://localhost:5053",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access123",
  JWT_REFRESH_SECRET: process.env.JWT_ACCESS_SECRET || "refresh123",
};

export default CONFIG;
