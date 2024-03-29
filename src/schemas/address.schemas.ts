import { z } from "zod";

export enum stateType {
  rs = "RS",
}
export const createAddressSchema = z.object({
  street: z.string().max(64, "max length of field is 64 characters"),
  city: z.string(),
  state: z.nativeEnum(stateType),
  zipcode: z.string().max(9),
  number: z.string().max(25, "max length of field is 25 characters"),
  reference: z.nullable(z.string()),
});
export const returnAddressSchema = createAddressSchema.extend({
  id: z.string().uuid(),
});
export type CreateAddress = z.infer<typeof createAddressSchema>;
export type iAddress = z.infer<typeof returnAddressSchema>;