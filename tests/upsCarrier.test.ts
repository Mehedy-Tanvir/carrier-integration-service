import axios from "axios";
import { UpsCarrier } from "../src/carriers/ups/upsCarrier";
import upsResponse from "./mocks/upsRateResponse.json";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UpsCarrier", () => {
  it("should build request and parse response", async () => {
    mockedAxios.post.mockResolvedValue({
      data: upsResponse,
    });

    const carrier = new UpsCarrier();

    const rates = await carrier.getRates({
      origin: {
        street: "123 A",
        city: "NY",
        state: "NY",
        postalCode: "10001",
        country: "US",
      },
      destination: {
        street: "456 B",
        city: "LA",
        state: "CA",
        postalCode: "90001",
        country: "US",
      },
      package: {
        weight: 2,
        length: 10,
        width: 10,
        height: 5,
      },
    });

    expect(rates.length).toBe(1);

    expect(rates[0]).toEqual({
      carrier: "UPS",
      service: "03",
      price: 12.45,
      currency: "USD",
      estimatedDays: 3,
    });
  });
});
