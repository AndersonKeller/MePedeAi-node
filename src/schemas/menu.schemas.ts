import { z } from "zod";
import { returnEstablishSchema } from "./establish.schemas";
import { returnProductSchema } from "./product.schemas";

export const createMenuSchema = z.object({
  establish: returnEstablishSchema,
  product: returnProductSchema.array(),
});
export const returnMenuSchema = createMenuSchema.extend({
  id: z.number(),
});
export const returnMenuClientSchema = z.object({
  id: z.number(),
  product: returnProductSchema.omit({ establish: true }).array(),
  establish: returnEstablishSchema.pick({
    name: true,
    phone: true,
    email: true,
  }),
});
