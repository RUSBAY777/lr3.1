const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(required("PORT", "4000")),
  databaseUrl: required("DATABASE_URL"),
  jwtSecret: required("JWT_SECRET", "dev-only-change-in-production"),
  corsOrigin: process.env.CORS_ORIGIN || "*"
};
