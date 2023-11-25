import { Router } from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
} from "../controllers/order.controller";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureOrderExistsMiddleware } from "../middleware/ensureOrderExists.middleware";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { ensureTokenClientIsValidMiddleware } from "../middleware/enusureTokenClientIsValid.middleware";
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
  ensureTokenvalidMiddleware,
  ensureOrderExistsMiddleware,
  ensureDataIsValidMiddleware(updateOrderSchema),
  updateOrderController
);
orderRoutes.get("/", ensureTokenvalidMiddleware, getAllOrdersController);
orderRoutes.get("/:id", ensureTokenvalidMiddleware, getOrderByIdController);
