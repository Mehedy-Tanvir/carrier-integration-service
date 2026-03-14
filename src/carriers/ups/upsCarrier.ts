import { Carrier } from "../carrier";
import { RateRequest } from "../../domain/rateRequest";
import { RateQuote } from "../../domain/rateQuote";
// Update this line to include the Class name
import { upsAuthService } from "../../auth/upsAuthService";
import { httpClient } from "../../http/httpClient";
import { buildUpsPayload } from "./upsRequestBuilder";
import { parseUpsResponse } from "./upsResponseParser";
import { CarrierError } from "../../errors/CarrierError";

export class UpsCarrier implements Carrier {
  private authService: typeof upsAuthService;

  // Now 'UpsAuthService' is recognized as a valid type
  constructor(authService: typeof upsAuthService = upsAuthService) {
    this.authService = authService;
  }

  async getRates(request: RateRequest): Promise<RateQuote[]> {
    try {
      const payload = buildUpsPayload(request);
      const token = await this.authService.getToken();

      const response = await httpClient.post("/rate", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Assert response type to access 'data'
      return parseUpsResponse((response as { data: any }).data);
    } catch (err: any) {
      throw new CarrierError("UPS", err.message || "Unknown UPS error");
    }
  }
}
