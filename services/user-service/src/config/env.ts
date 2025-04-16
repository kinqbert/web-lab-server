const CONFIG = {
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  RABBIT_URI: process.env.RABBIT_URI || "amqp://guest:guest@localhost:5672",
  PORT: process.env.PORT || 5051,
  MONGODB_CLUSTER_URL: process.env.MONGODB_CLUSTER_URL || "",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access123",
  JWT_REFRESH_SECRET: process.env.JWT_ACCESS_SECRET || "refresh123",
};

export default CONFIG;
