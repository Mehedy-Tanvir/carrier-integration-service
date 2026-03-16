import axios from "axios";
import { UpsCarrier } from "../src/carriers/ups/upsCarrier";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Error Handling", () => {
  it("should throw error for 500 response", async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
        data: { message: "Internal Server Error" },
      },
    });

    const carrier = new UpsCarrier();

    await expect(
      carrier.getRates({
        origin: {} as any,
        destination: {} as any,
        package: {} as any,
      }),
    ).rejects.toThrow();
  });
});
