import dotenv from "dotenv";
dotenv.config();

export const config = {
  UPS_CLIENT_ID: process.env.UPS_CLIENT_ID || "",
  UPS_CLIENT_SECRET: process.env.UPS_CLIENT_SECRET || "",
  UPS_BASE_URL: process.env.UPS_BASE_URL || "https://onlinetools.ups.com",
  UPS_AUTH_URL:
    process.env.UPS_AUTH_URL ||
    "https://wwwcie.ups.com/security/v1/oauth/token",
  HTTP_TIMEOUT: Number(process.env.HTTP_TIMEOUT) || 5000,
};
