import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductByIdController,
} from "../controllers/product.controller";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureProductExistMiddleware } from "../middleware/ensureProductExists.middleware";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { ensureTypeProductExistsMiddleware } from "../middleware/ensureTypeProductExists.middleware";
import { createProductSchema } from "../schemas/product/product.schemas";

export const productRoutes: Router = Router();

productRoutes.post(
  "",
  ensureDataIsValidMiddleware(createProductSchema),
  ensureTokenvalidMiddleware,
  ensureTypeProductExistsMiddleware,
  createProductController
);
productRoutes.get("", ensureTokenvalidMiddleware, getAllProductsController);
productRoutes.get(
  "/:id",
  ensureTokenvalidMiddleware,
  ensureProductExistMiddleware,
  getProductByIdController
);
productRoutes.patch(
  "/:id",
  ensureTokenvalidMiddleware,
  updateProductByIdController
);
