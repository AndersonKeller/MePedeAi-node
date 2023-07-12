import { Router } from "express";
import { createOrderController } from "../controllers/order.controller";
import { ensureTokenClientIsValidMiddleware } from "../middleware/enusureTokenClientIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createOrderSchema } from "../schemas/order/order.schemas";

export const orderRoutes: Router = Router();
orderRoutes.post(
  "",
  ensureTokenClientIsValidMiddleware,
  ensureDataIsValidMiddleware(createOrderSchema),
  createOrderController
);
