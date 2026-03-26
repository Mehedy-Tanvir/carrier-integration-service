import { z } from "zod";
import { AddressSchema } from "./addressSchema";
import { PackageSchema } from "./packageSchema";

export const RateRequestSchema = z.object({
  origin: AddressSchema,
  destination: AddressSchema,
  package: PackageSchema,
  serviceLevel: z.string().optional(),
});

export const validateRateRequest = (data: unknown) => {
  console.log(
    "🔎 [validateRateRequest] Raw input:",
    JSON.stringify(data, null, 2),
  );

  try {
    const parsed = RateRequestSchema.parse(data);

    console.log("✅ [validateRateRequest] Parsed result:", parsed);

    return parsed;
  } catch (error: any) {
    console.error("❌ [validateRateRequest] Validation failed:", error);

    if (error?.issues) {
      console.error("❌ [validateRateRequest] Issues:", error.issues);
    }

    throw error;
  }
};
