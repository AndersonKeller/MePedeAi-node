import { z } from "zod";
import { returnTypeProductSchema } from "../typeProduct/typeProduct.schemas";
import { returnEstablishSchema } from "../establish/establish.schemas";

export const createProductSchema = z.object({
  name: z.string().max(45),
  description: z.string(),
  typeProduct: z.string(),
  price: z.number(),
});

export const returnProductSchema = createProductSchema
  .extend({
    id: z.number(),
    type: returnTypeProductSchema.omit({ establish: true }),
    establish: returnEstablishSchema,
  })
  .omit({ typeProduct: true });
