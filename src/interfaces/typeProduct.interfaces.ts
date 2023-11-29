import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  createTypeProductSchema,
  returnTypeProductSchema,
} from "../schemas/typeProduct.schemas";

export type CreateTypeProduct = z.infer<typeof createTypeProductSchema>;
export type iTypeProduct = z.infer<typeof returnTypeProductSchema>;
export type UpdateTypeProduct = DeepPartial<CreateTypeProduct>;
