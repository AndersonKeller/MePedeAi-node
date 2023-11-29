import { Router } from "express";
import { createShopController } from "../controllers/shop.controllers";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureShopUrlExistsMiddleware } from "../middleware/ensureShopUrlExists.middleware";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { createShopSchema } from "../schemas/shop/shop.schemas";

export const shopRoutes: Router = Router();

shopRoutes.post(
  "",
  ensureTokenvalidMiddleware,
  ensureDataIsValidMiddleware(createShopSchema),
  ensureShopUrlExistsMiddleware,
  createShopController
);
