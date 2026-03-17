import axios from "axios";
import { upsAuthService } from "../src/auth/upsAuthService";

beforeEach(() => {
  (upsAuthService as any).token = null;
  (upsAuthService as any).expiry = 0;
  jest.clearAllMocks();
});

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UpsAuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should acquire a token", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: "test_token",
        expires_in: 3600,
      },
    });

    const token = await upsAuthService.getToken();

    expect(token).toBe("test_token");
  });

  it("should reuse cached token", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: "cached_token",
        expires_in: 3600,
      },
    });

    const token1 = await upsAuthService.getToken();
    const token2 = await upsAuthService.getToken();

    expect(token1).toBe(token2);
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
