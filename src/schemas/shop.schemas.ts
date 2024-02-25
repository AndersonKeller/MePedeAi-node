import { z } from "zod";
import { returnEstablishSchema } from "./establish.schemas";

export const createShopSchema = z.object({
  url: z.string(),
});
export const returnShopSchema = createShopSchema.extend({
  id: z.string(),
  establish: returnEstablishSchema,
});

export type CreateShop = z.infer<typeof createShopSchema>;
export type iShop = z.infer<typeof returnShopSchema>;