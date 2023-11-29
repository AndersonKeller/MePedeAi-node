import { z } from "zod";
import { createShopSchema, returnShopSchema } from "../schemas/shop.schemas";

export type CreateShop = z.infer<typeof createShopSchema>;
export type iShop = z.infer<typeof returnShopSchema>;
