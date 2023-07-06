import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createProductSchema } from "../schemas/product/product.schemas";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { createProductController } from "../controllers/product.controller";
import { ensureTypeProductExistsMiddleware } from "../middleware/ensureTypeProductExists.middleware";

export const productRoutes: Router = Router();

productRoutes.post(
  "",
  ensureDataIsValidMiddleware(createProductSchema),
  ensureTokenvalidMiddleware,
  ensureTypeProductExistsMiddleware,
  createProductController
);
