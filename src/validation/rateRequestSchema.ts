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
  return RateRequestSchema.parse(data);
};
