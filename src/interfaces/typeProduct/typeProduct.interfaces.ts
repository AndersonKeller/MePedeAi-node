import { z } from "zod";
import {
  createTypeProductSchema,
  returnTypeProductSchema,
} from "../../schemas/typeProduct/typeProduct.schemas";

export type CreateTypeProduct = z.infer<typeof createTypeProductSchema>;
export type iTypeProduct = z.infer<typeof returnTypeProductSchema>;
