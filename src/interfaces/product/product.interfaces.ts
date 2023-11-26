import { z } from "zod";
import {
  createProductSchema,
  returnProductSchema,
  updateProductSchema,
} from "../../schemas/product/product.schemas";

export type CreateProduct = z.infer<typeof createProductSchema>;
export type iProduct = z.infer<typeof returnProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
