export interface RateQuote {
  carrier: string; // e.g., 'UPS'
  service: string; // service name from carrier
  price: number;
  currency: string; // e.g., 'USD'
  estimatedDays: number;
}
