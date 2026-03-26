import axios from "axios";
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

  async getRates(input: any) {
    try {
      console.log(
        "🚀 [UPS] getRates called with:",
        JSON.stringify(input, null, 2),
      );

      const payload = buildUpsPayload(input);
      console.log("📦 [UPS] Built payload:", JSON.stringify(payload, null, 2));

      const response = await axios.post("YOUR_UPS_URL", payload);

      console.log("📡 [UPS] Raw axios response:", response);
      console.log("📡 [UPS] response?.data:", response?.data);

      if (!response) {
        console.error("❌ [UPS] response is undefined");
        throw new CarrierError("UPS", "No response from UPS");
      }

      if (!response.data) {
        console.error("❌ [UPS] response.data is undefined");
        throw new CarrierError("UPS", "No data in UPS response");
      }

      const data = response.data;

      console.log("✅ [UPS] Parsed data:", JSON.stringify(data, null, 2));

      const rates = parseUpsResponse(data);

      console.log("✅ [UPS] Final parsed rates:", rates);

      return rates;
    } catch (error: any) {
      console.error("🔥 [UPS] ERROR in getRates:", error);
      console.error("🔥 [UPS] ERROR stack:", error?.stack);
      throw new CarrierError("UPS", "UPS rate fetch failed", { error });
    }
  }
}
