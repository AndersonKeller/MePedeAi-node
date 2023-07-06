import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createTypeProductSchema } from "../schemas/typeProduct/typeProduct.schemas";
import {
  createTypeProductController,
  getAllTypeProductsController,
} from "../controllers/typeProduct.controller";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";

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
