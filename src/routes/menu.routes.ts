import { Router } from "express";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createMenuSchema } from "../schemas/menu/menu.schemas";
import {
  createMenuController,
  getMenuByEstablishController,
} from "../controllers/menu.controller";
import { createMenuMiddleware } from "../middleware/createMenu.middleware";

export const menuRoutes: Router = Router();

menuRoutes.post(
  "",
  ensureTokenvalidMiddleware,
  createMenuMiddleware,
  ensureDataIsValidMiddleware(createMenuSchema),
  createMenuController
);
menuRoutes.get("/:id", getMenuByEstablishController);
