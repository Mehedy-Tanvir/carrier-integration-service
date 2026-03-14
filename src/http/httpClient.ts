import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseError } from "../errors/BaseError";
import { CarrierError } from "../errors/CarrierError";
import { config } from "../config/env";

// Create axios instance
const instance: AxiosInstance = axios.create({
  baseURL: config.UPS_BASE_URL,
  timeout: config.HTTP_TIMEOUT || 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      // Timeout error
      throw new BaseError("Network timeout", "NETWORK_TIMEOUT");
    }

    if (error.response) {
      // HTTP error from carrier
      throw new CarrierError(
        `Carrier returned ${error.response.status}: ${error.response.data?.message || ""}`,
        error.response.status,
        "UPS",
      );
    }

    // Other errors
    throw new BaseError(error.message, "HTTP_ERROR");
  },
);

export class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = instance;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}
