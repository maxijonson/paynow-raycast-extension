import type { PayNowError } from "@ywwa/paylater/dist/lib/types";
import z from "zod";

export const isPaynowError = (error: unknown): error is PayNowError => {
  return z
    .object({
      status: z.number(),
      code: z.string(),
      message: z.string(),
      trace_id: z.string().nullable().optional(),
      errors: z
        .array(
          z.object({
            code: z.string(),
            message: z.string(),
            path: z.string(),
            validation: z.string(),
          }),
        )
        .nullable()
        .optional(),
    })
    .safeParse(error).success;
};
