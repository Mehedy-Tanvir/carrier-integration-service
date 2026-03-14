import { BaseError } from "./BaseError";

export class CarrierError extends BaseError {
  public readonly carrier: string;

  constructor(carrier: string, message: string, details?: any) {
    super(message, "CARRIER_ERROR", details);
    this.carrier = carrier;
  }
}
