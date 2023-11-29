import { z } from "zod";
import {
  createAddressSchema,
  returnAddressSchema,
} from "../schemas/address.schemas";

export type CreateAddress = z.infer<typeof createAddressSchema>;
export type iAddress = z.infer<typeof returnAddressSchema>;
