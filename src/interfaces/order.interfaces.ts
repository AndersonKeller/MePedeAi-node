import { DeepPartial } from "typeorm";
import { z } from "zod";
import { createOrderSchema, returnOrderSchema } from "../schemas/order.schemas";

export type CreateOrder = z.infer<typeof createOrderSchema>;
export type iOrder = z.infer<typeof returnOrderSchema>;
export type UpdateOrder = DeepPartial<CreateOrder>;
