import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, "VALIDATION_ERROR", details);
  }
}
