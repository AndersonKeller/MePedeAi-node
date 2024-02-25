import { z } from "zod";

import { returnAddressSchema } from "./address.schemas";
import { returnClientSchema } from "./client.schemas";
import { returnMenuSchema } from "./menu.schemas";
import { returnProductSchema } from "./product.schemas";
import { DeepPartial } from "typeorm";
export enum orderType {
  delivery = "delivery",
  take = "take",
  salloon = "salloon",
}
export enum statusOrder {
  pending = "pending",
  finish = "finish"
}
export const createOrderSchema = z.object({
  address: returnAddressSchema.omit({ id: true }).optional(),
  menu: returnMenuSchema.pick({ id: true }),
  products: returnProductSchema.pick({ id: true, quantity: true }).array(),
  order_type: z.nativeEnum(orderType),
  status: z.nativeEnum(statusOrder).default(statusOrder.pending),
  comments: z.string().nullable().default(null),
});
export const returnOrderSchema = createOrderSchema
  .extend({
    id: z.number(),
    total: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    orderProducts: returnProductSchema.omit({ establish: true }).array(),
    client: returnClientSchema.omit({
      address: true,
    }),
  })
  .omit({ products: true });

export const returnAllOrdersSchema = returnOrderSchema.array();
export const updateOrderSchema = createOrderSchema.partial();
export type CreateOrder = z.infer<typeof createOrderSchema>;
export type iOrder = z.infer<typeof returnOrderSchema>;
export type UpdateOrder = DeepPartial<CreateOrder>;