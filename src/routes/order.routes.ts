import { ensureTokenvalidMiddleware } from './../middleware/ensureTokenIsValid.middleware';
import { Router } from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateStatusOrderController,
} from "../controllers/order.controller";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureTokenClientIsValidMiddleware } from "../middleware/enusureTokenClientIsValid.middleware";
import { createOrderSchema } from "../schemas/order.schemas";

export const orderRoutes: Router = Router();
orderRoutes.post(
  "",
  ensureTokenClientIsValidMiddleware,
  ensureDataIsValidMiddleware(createOrderSchema),
  createOrderController
);

orderRoutes.get("/", ensureTokenvalidMiddleware, getAllOrdersController);
orderRoutes.get("/:id", ensureTokenvalidMiddleware, getOrderByIdController);
orderRoutes.patch("/:id/status", ensureTokenvalidMiddleware, updateStatusOrderController )