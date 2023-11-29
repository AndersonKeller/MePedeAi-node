import { Router } from "express";
import {
  createShopController,
  getMyShopUrlController,
  getShopUrlController,
} from "../controllers/shop.controllers";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureShopUrlExistsMiddleware } from "../middleware/ensureShopUrlExists.middleware";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { createShopSchema } from "../schemas/shop.schemas";

export const shopRoutes: Router = Router();
shopRoutes.get("/retrieve", ensureTokenvalidMiddleware, getMyShopUrlController);
shopRoutes.get("/:url", getShopUrlController);
shopRoutes.post(
  "",
  ensureTokenvalidMiddleware,
  ensureDataIsValidMiddleware(createShopSchema),
  ensureShopUrlExistsMiddleware,
  createShopController
);
