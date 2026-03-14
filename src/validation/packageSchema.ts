import { z } from "zod";

export const PackageSchema = z.object({
  weight: z.number().positive("Weight must be greater than zero"),
  length: z.number().positive("Length must be positive"),
  width: z.number().positive("Width must be positive"),
  height: z.number().positive("Height must be positive"),
});

export const validatePackage = (data: unknown) => {
  return PackageSchema.parse(data);
};
