import { RateQuote } from "../../domain/rateQuote";

export const parseUpsResponse = (responseData: any): RateQuote[] => {
  const shipments = responseData?.RateResponse?.RatedShipment;

  if (!shipments) {
    console.error("❌ No RatedShipment found at RateResponse.RatedShipment");
    return [];
  }

  const normalized = Array.isArray(shipments) ? shipments : [shipments];

  const result = normalized.map((shipment: any, index: number) => {
    const parsed = {
      carrier: "UPS",
      service: shipment.Service?.Code || "UNKNOWN",
      price: parseFloat(shipment.TotalCharges?.MonetaryValue || 0),
      currency: shipment.TotalCharges?.CurrencyCode || "USD",
      estimatedDays: shipment.GuaranteedDelivery?.BusinessDaysInTransit
        ? Number(shipment.GuaranteedDelivery.BusinessDaysInTransit)
        : 0,
    };

    return parsed;
  });

  return result;
};
