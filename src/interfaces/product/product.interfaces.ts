import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  createProductSchema,
  returnProductSchema,
} from "../../schemas/product/product.schemas";

export type CreateProduct = z.infer<typeof createProductSchema>;
export type iProduct = z.infer<typeof returnProductSchema>;
export type UpdateProduct = DeepPartial<CreateProduct>;
