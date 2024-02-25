import { z } from "zod";
import { returnEstablishSchema } from "./establish.schemas";
import { DeepPartial } from "typeorm";

export const createTypeProductSchema = z.object({
  name: z.string().max(45),
  description: z.string(),
});
export const returnTypeProductSchema = createTypeProductSchema.extend({
  id: z.number(),
  establish: returnEstablishSchema,
});
export const updateTypeProductSchema = createTypeProductSchema.partial();


export type CreateTypeProduct = z.infer<typeof createTypeProductSchema>;
export type iTypeProduct = z.infer<typeof returnTypeProductSchema>;
export type UpdateTypeProduct = DeepPartial<CreateTypeProduct>;