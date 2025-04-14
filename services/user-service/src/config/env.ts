const CONFIG = {
  RABBIT_URI: process.env.RABBIT_URI || "amqp://guest:guest@localhost:5672",
  PORT: process.env.PORT || 5051,
  MONGODB_CLUSTER_URL: process.env.MONGODB_CLUSTER_URL || "",
};

export default CONFIG;
