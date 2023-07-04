import { z } from "zod";

export const createEstablishSchema = z.object({
  name: z.string().max(45),
  email: z.string().email(),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  phone: z.string(),
});
export const returnEstablishSchema = createEstablishSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });
