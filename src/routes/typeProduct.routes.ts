import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createTypeProductSchema } from "../schemas/typeProduct/typeProduct.schemas";
import { createTypeProductController } from "../controllers/typeProduct.controller";

export const typeProductRoutes: Router = Router();

typeProductRoutes.post(
  "",
  ensureDataIsValidMiddleware(createTypeProductSchema),
  createTypeProductController
);
