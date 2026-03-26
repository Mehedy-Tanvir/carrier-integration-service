import { RateRequest } from "../domain/rateRequest";
import { RateQuote } from "../domain/rateQuote";
import { Carrier } from "../carriers/carrier";
import { validateRateRequest } from "../validation/rateRequestSchema";
import { ValidationError } from "../errors/ValidationError";

export class RateService {
  private carrier: Carrier;

  constructor(carrier: Carrier) {
    this.carrier = carrier;
  }

  /**
   * Get shipping rates from the carrier
   * @param request RateRequest object
   * @returns Array of normalized RateQuote
   */
  public async getRates(request: RateRequest): Promise<RateQuote[]> {
    console.log(
      "🚀 [RateService] Incoming request:",
      JSON.stringify(request, null, 2),
    );

    try {
      console.log("🔍 [RateService] Running validation...");

      const validatedData = validateRateRequest(request);

      console.log("✅ [RateService] Validation passed:", validatedData);

      // Call carrier
      console.log("📡 [RateService] Calling carrier.getRates...");
      const quotes = await this.carrier.getRates(validatedData);

      console.log("📦 [RateService] Carrier returned quotes:", quotes);

      return quotes;
    } catch (error: any) {
      console.error("🔥 [RateService] Validation or processing error:", error);

      // Zod error handling
      if (error?.issues) {
        console.error("❌ [RateService] Zod validation issues:", error.issues);

        throw new ValidationError("Invalid rate request", error.issues);
      }

      throw error;
    }
  }
}
