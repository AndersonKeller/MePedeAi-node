import { z } from "zod";

export const createLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const createClientLoginSchema = createLoginSchema.extend({
  establishId: z.string(),
});
