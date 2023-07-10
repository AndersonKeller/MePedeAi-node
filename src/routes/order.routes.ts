import { Router } from "express";
import { createOrderController } from "../controllers/order.controller";

export const orderRoutes: Router = Router();
orderRoutes.post("", createOrderController);
