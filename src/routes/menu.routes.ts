import { Router } from "express";
import {
  createMenuController,
  getMenuByEstablishController,
} from "../controllers/menu.controller";
import { createMenuMiddleware } from "../middleware/createMenu.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { createMenuSchema } from "../schemas/menu.schemas";

export const menuRoutes: Router = Router();

menuRoutes.post(
  "",
  ensureTokenvalidMiddleware,
  createMenuMiddleware,
  ensureDataIsValidMiddleware(createMenuSchema),
  createMenuController
);
menuRoutes.get("/:id", getMenuByEstablishController);
