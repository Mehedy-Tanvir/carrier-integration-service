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
    // Validate request
    const validationErrors = validateRateRequest(request);
    if (validationErrors && Object.keys(validationErrors).length > 0) {
      throw new ValidationError("Invalid rate request", validationErrors);
    }

    // Call carrier
    const quotes = await this.carrier.getRates(request);

    // Return normalized quotes
    return quotes;
  }
}
