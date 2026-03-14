import axios from "axios";
import { config } from "../config/env";
import { AuthError } from "../errors/AuthError";

interface TokenResponse {
  access_token: string;
  expires_in: number; // in seconds
}

class UpsAuthService {
  private token: string | null = null;
  private expiry: number = 0;

  // Public method to get a valid token
  public async getToken(): Promise<string> {
    const now = Date.now();

    if (this.token && now < this.expiry) {
      return this.token; // reuse cached token
    }

    try {
      const response = await axios.post<TokenResponse>(
        config.UPS_AUTH_URL,
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: config.UPS_CLIENT_ID,
          client_secret: config.UPS_CLIENT_SECRET,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      this.token = response.data.access_token;
      this.expiry = now + response.data.expires_in * 1000 - 5000; // subtract 5s to avoid race conditions
      return this.token;
    } catch (err) {
      throw new AuthError("Failed to acquire UPS token", err);
    }
  }
}

export const upsAuthService = new UpsAuthService();
