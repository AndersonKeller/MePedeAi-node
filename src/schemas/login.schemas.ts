import { z } from "zod";

export const createLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const createClientLoginSchema = createLoginSchema.extend({
  establishId: z.string(),
});
export type iLogin = z.infer<typeof createLoginSchema>;
export type iClientLogin = z.infer<typeof createClientLoginSchema>