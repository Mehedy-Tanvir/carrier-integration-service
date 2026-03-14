import { RateRequest } from "../domain/rateRequest";
import { RateQuote } from "../domain/rateQuote";

export interface Carrier {
  /**
   * Fetch shipping rates from the carrier.
   * @param request Internal rate request model
   * @returns Normalized array of RateQuote
   */
  getRates(request: RateRequest): Promise<RateQuote[]>;
}
