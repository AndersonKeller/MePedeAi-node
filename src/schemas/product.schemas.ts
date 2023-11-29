import { z } from "zod";
import { returnEstablishSchema } from "./establish.schemas";
import { returnTypeProductSchema } from "./typeProduct.schemas";

export const createProductSchema = z.object({
  name: z.string().max(45),
  description: z.string(),
  typeProduct: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const returnProductSchema = createProductSchema
  .extend({
    id: z.number(),
    type: returnTypeProductSchema.omit({ establish: true }),
    establish: returnEstablishSchema,
  })
  .omit({ typeProduct: true });
export const updateProductSchema = createProductSchema.partial();
