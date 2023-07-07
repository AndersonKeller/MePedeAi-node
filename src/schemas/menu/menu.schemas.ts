import { z } from "zod";
import { returnEstablishSchema } from "../establish/establish.schemas";
import { returnProductSchema } from "../product/product.schemas";

export const createMenuSchema = z.object({
  establish: returnEstablishSchema,
  product: returnProductSchema.array(),
});
export const returnMenuSchema = createMenuSchema.extend({
  id: z.number(),
});
