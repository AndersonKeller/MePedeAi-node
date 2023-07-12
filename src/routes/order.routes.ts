import { Router } from "express";
import {
  createOrderController,
  updateOrderController,
} from "../controllers/order.controller";
import { ensureTokenClientIsValidMiddleware } from "../middleware/enusureTokenClientIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../schemas/order/order.schemas";

export const orderRoutes: Router = Router();
orderRoutes.post(
  "",
  ensureTokenClientIsValidMiddleware,
  ensureDataIsValidMiddleware(createOrderSchema),
  createOrderController
);
orderRoutes.patch(
  "/:id",
  ensureTokenClientIsValidMiddleware,
  ensureDataIsValidMiddleware(updateOrderSchema),
  updateOrderController
);
