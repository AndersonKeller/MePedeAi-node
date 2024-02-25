import { z } from "zod";
import { returnEstablishSchema } from "./establish.schemas";
import { returnProductSchema } from "./product.schemas";

export const createMenuSchema = z.object({
  establish: returnEstablishSchema,
  product: returnProductSchema.omit({ establish: true }).array(),
});
export const returnMenuSchema = createMenuSchema
  .extend({
    id: z.number(),
  })
  .omit({ establish: true });
export const returnMenuClientSchema = z.object({
  id: z.number(),
  product: returnProductSchema.omit({ establish: true }).array(),
  establish: returnEstablishSchema.pick({
    name: true,
    phone: true,
    email: true,
  }),
});
export type CreateMenu = z.infer<typeof createMenuSchema>;
export type iMenu = z.infer<typeof returnMenuSchema>;
export type iMenuClient = z.infer<typeof returnMenuClientSchema>;