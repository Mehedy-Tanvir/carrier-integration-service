import { RateQuote } from "../../domain/rateQuote";

export const parseUpsResponse = (responseData: any): RateQuote[] => {
  if (!responseData || !responseData.RatedShipment) return [];

  return responseData.RatedShipment.map((shipment: any) => ({
    carrier: "UPS",
    service: shipment.Service?.Code || "UNKNOWN",
    price: shipment.TotalCharges?.MonetaryValue || 0,
    currency: shipment.TotalCharges?.CurrencyCode || "USD",
    estimatedDays: shipment.GuaranteedDaysToDelivery || null,
  }));
};
