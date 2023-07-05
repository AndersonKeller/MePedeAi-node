import { z } from "zod";

export const createTypeProductSchema = z.object({
  name: z.string().max(45),
  description: z.string(),
});
export const returnTypeProductSchema = createTypeProductSchema.extend({
  id: z.number(),
});
