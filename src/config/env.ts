import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  ups: {
    clientId: string;
    clientSecret: string;
    baseUrl: string;
    authUrl: string;
  };
  http: {
    timeout: number;
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const config: EnvConfig = {
  ups: {
    clientId: requireEnv("UPS_CLIENT_ID"),
    clientSecret: requireEnv("UPS_CLIENT_SECRET"),
    baseUrl: requireEnv("UPS_BASE_URL"),
    authUrl: requireEnv("UPS_AUTH_URL"),
  },
  http: {
    timeout: Number(process.env.HTTP_TIMEOUT || 5000),
  },
};
