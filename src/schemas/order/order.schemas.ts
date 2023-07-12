import { z } from "zod";

import { returnAddressSchema } from "../address/address.schemas";
import { returnMenuSchema } from "../menu/menu.schemas";
import { returnProductSchema } from "../product/product.schemas";
export enum orderType {
  delivery = "delivery",
  take = "take",
  salloon = "salloon",
}
export const createOrderSchema = z.object({
  address: returnAddressSchema.omit({ id: true }).optional(),
  menu: returnMenuSchema.pick({ id: true }),
  products: returnProductSchema.pick({ id: true }).array(),
  order_type: z.nativeEnum(orderType),
});
export const returnOrderSchema = createOrderSchema
  .extend({
    id: z.number(),
    total: z.number(),
    productsOrder: returnProductSchema.omit({ establish: true }).array(),
  })
  .omit({ products: true });
