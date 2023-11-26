import { Router } from "express";
import {
  createTypeProductController,
  getAllTypeProductsController,
  updateTypeProductByIdController,
} from "../controllers/typeProduct.controller";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { ensureTypeProductExistsMiddleware } from "../middleware/ensureTypeProductExists.middleware";
import {
  createTypeProductSchema,
  updateTypeProductSchema,
} from "../schemas/typeProduct/typeProduct.schemas";

export const typeProductRoutes: Router = Router();

typeProductRoutes.post(
  "",
  ensureDataIsValidMiddleware(createTypeProductSchema),
  ensureTokenvalidMiddleware,
  createTypeProductController
);
typeProductRoutes.get(
  "",
  ensureTokenvalidMiddleware,
  getAllTypeProductsController
);
typeProductRoutes.patch(
  "/:id",
  ensureTokenvalidMiddleware,
  ensureDataIsValidMiddleware(updateTypeProductSchema),
  ensureTypeProductExistsMiddleware,
  updateTypeProductByIdController
);
