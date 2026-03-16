// src/index.ts
import dotenv from "dotenv";
dotenv.config();

import { RateService } from "./services/rateService";
import { UpsCarrier } from "./carriers/ups/upsCarrier";

// Optional: you could have a CarrierFactory if multiple carriers
// import { CarrierFactory } from "./carriers/carrierFactory";

// Initialize carrier(s)
const upsCarrier = new UpsCarrier();

// Initialize service
const rateService = new RateService(upsCarrier);

// Export for external usage
export { rateService, RateService, UpsCarrier };

// Optional: simple CLI/demo run
if (require.main === module) {
  (async () => {
    try {
      const demoRequest = {
        origin: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "US",
        },
        destination: {
          street: "456 Market St",
          city: "San Francisco",
          state: "CA",
          postalCode: "94105",
          country: "US",
        },
        package: {
          weight: 2,
          length: 10,
          width: 5,
          height: 5,
        },
        serviceLevel: "standard",
      };

      const rates = await rateService.getRates(demoRequest);
      console.log("Demo rates:", rates);
    } catch (err) {
      console.error("Error fetching rates:", err);
    }
  })();
}
