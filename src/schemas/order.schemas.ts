import { z } from "zod";

import { returnAddressSchema } from "./address.schemas";
import { returnClientSchema } from "./client.schemas";
import { returnMenuSchema } from "./menu.schemas";
import { returnProductSchema } from "./product.schemas";
export enum orderType {
  delivery = "delivery",
  take = "take",
  salloon = "salloon",
}
export const createOrderSchema = z.object({
  address: returnAddressSchema.omit({ id: true }).optional(),
  menu: returnMenuSchema.pick({ id: true }),
  products: returnProductSchema.pick({ id: true, quantity: true }).array(),
  order_type: z.nativeEnum(orderType),
});
export const returnOrderSchema = createOrderSchema
  .extend({
    id: z.number(),
    total: z.number(),
    orderProducts: returnProductSchema.omit({ establish: true }).array(),
    client: returnClientSchema.omit({
      establish: true,
      id: true,
      address: true,
    }),
  })
  .omit({ products: true });

export const returnAllOrdersSchema = returnOrderSchema.array();
export const updateOrderSchema = createOrderSchema.partial();
