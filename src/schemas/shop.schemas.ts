import { z } from "zod";
import { returnEstablishSchema } from "./establish.schemas";

export const createShopSchema = z.object({
  url: z.string(),
});
export const returnShopSchema = createShopSchema.extend({
  id: z.string(),
  establish: returnEstablishSchema,
});
