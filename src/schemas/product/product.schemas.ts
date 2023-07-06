import { z } from "zod";
import { returnTypeProductSchema } from "../typeProduct/typeProduct.schemas";

export const createProductSchema = z.object({
  name: z.string().max(45),
  description: z.string(),
  typeProduct: z.string(),
});

export const returnProductSchema = createProductSchema
  .extend({
    id: z.number(),
    type: returnTypeProductSchema.omit({ establish: true }),
  })
  .omit({ typeProduct: true });
