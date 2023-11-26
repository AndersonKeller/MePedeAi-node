import { Router } from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
} from "../controllers/order.controller";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { ensureTokenClientIsValidMiddleware } from "../middleware/enusureTokenClientIsValid.middleware";
import { createOrderSchema } from "../schemas/order/order.schemas";

export const orderRoutes: Router = Router();
orderRoutes.post(
  "",
  ensureTokenClientIsValidMiddleware,
  ensureDataIsValidMiddleware(createOrderSchema),
  createOrderController
);

orderRoutes.get("/", ensureTokenvalidMiddleware, getAllOrdersController);
orderRoutes.get("/:id", ensureTokenvalidMiddleware, getOrderByIdController);
