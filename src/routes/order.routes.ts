import { Router } from "express";
import {
  createOrderController,
  getOrderByIdController,
  updateOrderController,
} from "../controllers/order.controller";
import { ensureTokenClientIsValidMiddleware } from "../middleware/enusureTokenClientIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../schemas/order/order.schemas";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { ensureOrderExistsMiddleware } from "../middleware/ensureOrderExists.middleware";

export const orderRoutes: Router = Router();
orderRoutes.post(
  "",
  ensureTokenClientIsValidMiddleware,
  ensureDataIsValidMiddleware(createOrderSchema),
  createOrderController
);
orderRoutes.patch(
  "/:id",
  ensureTokenvalidMiddleware,
  ensureOrderExistsMiddleware,
  ensureDataIsValidMiddleware(updateOrderSchema),
  updateOrderController
);
orderRoutes.get("/:id", ensureTokenvalidMiddleware, getOrderByIdController);
