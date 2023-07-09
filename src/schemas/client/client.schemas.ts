import { z } from "zod";
import {
  createAddressSchema,
  returnAddressSchema,
} from "../address/address.schemas";
import {
  createEstablishSchema,
  returnEstablishSchema,
} from "../establish/establish.schemas";

export const createClientSchema = z.object({
  name: z.string().max(45, "Name max length is 45 characters"),
  phone: z.string().max(12, "Phone number wrong format"),
  email: z.string().email("Email wrong format"),
  password: z.string().max(120),
  addresses: createAddressSchema,
  establish: returnEstablishSchema,
});
export const returnClientSchema = createClientSchema
  .extend({
    id: z.string().uuid(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    address: returnAddressSchema,
  })
  .omit({ password: true, addresses: true });
