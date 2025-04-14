const CONFIG = {
  PORT: process.env.PORT || 5050,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://localhost:5051",
  TRANSACTION_SERVICE_URL:
    process.env.TRANSACTION_SERVICE_URL || "http://localhost:5052",
  GOAL_SERVICE_URL: process.env.GOAL_SERVICE_URL || "http://localhost:5053",
};

export default CONFIG;
