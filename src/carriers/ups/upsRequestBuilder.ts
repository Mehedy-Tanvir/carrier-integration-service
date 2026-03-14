import { RateRequest } from "../../domain/rateRequest";

export const buildUpsPayload = (request: RateRequest) => {
  return {
    Shipper: {
      Address: {
        StreetLines: [request.origin.street],
        City: request.origin.city,
        StateProvinceCode: request.origin.state,
        PostalCode: request.origin.postalCode,
        CountryCode: request.origin.country,
      },
    },
    ShipTo: {
      Address: {
        StreetLines: [request.destination.street],
        City: request.destination.city,
        StateProvinceCode: request.destination.state,
        PostalCode: request.destination.postalCode,
        CountryCode: request.destination.country,
      },
    },
    Package: {
      Weight: request.package.weight,
      Dimensions: {
        Length: request.package.length,
        Width: request.package.width,
        Height: request.package.height,
      },
    },
    ServiceLevel: request.serviceLevel || "STANDARD",
  };
};
