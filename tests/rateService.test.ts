import axios from "axios";
import { RateService } from "../src/services/rateService";
import { UpsCarrier } from "../src/carriers/ups/upsCarrier";
import upsResponse from "./mocks/upsRateResponse.json";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("RateService", () => {
  it("should return normalized rates", async () => {
    mockedAxios.post.mockResolvedValue({
      data: upsResponse,
    });

    const carrier = new UpsCarrier();
    const service = new RateService(carrier);

    const result = await service.getRates({
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

    expect(result[0].carrier).toBe("UPS");
  });
});
