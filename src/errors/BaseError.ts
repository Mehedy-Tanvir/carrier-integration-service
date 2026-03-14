export class BaseError extends Error {
  public readonly errorCode: string;
  public readonly details?: any;

  constructor(message: string, errorCode: string, details?: any) {
    super(message);
    this.errorCode = errorCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype); // correct prototype chain
    Error.captureStackTrace(this);
  }
}
