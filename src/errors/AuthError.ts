import { BaseError } from "./BaseError";

export class AuthError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, "AUTH_ERROR", details);
  }
}
