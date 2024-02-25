import { z } from "zod";
import { createAddressSchema, returnAddressSchema } from "./address.schemas";
import { returnEstablishSchema } from "./establish.schemas";

export const createClientSchema = z.object({
  name: z.string().max(45, "Name max length is 45 characters"),
  phone: z.string().max(12, "Phone number wrong format"),
  email: z.string().email("Email wrong format"),
  password: z.string().max(120),
  addresses: createAddressSchema,
  establish: returnEstablishSchema.omit({createdAt:true,deletedAt:true,updatedAt:true, admin:true}),
});
export const returnClientSchema = createClientSchema
  .extend({
    id: z.string().uuid(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    address: returnAddressSchema,
  })
  .omit({ password: true });
  export type CreateClient = z.infer<typeof createClientSchema>;
  export type iClient = z.infer<typeof returnClientSchema>;