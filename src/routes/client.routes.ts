import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createClientSchema } from "../schemas/client/client.schemas";
import {
  createClientController,
  createClientLoginController,
  getMenuClientController,
} from "../controllers/client.controller";
import { ensureClientEmailExistsMiddleware } from "../middleware/ensureClientEmailExists.middleware";
import { createLoginSchema } from "../schemas/login/login.schemas";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { ensureTokenClientIsValidMiddleware } from "../middleware/enusureTokenClientIsValid.middleware";

export const clientRoutes: Router = Router();

clientRoutes.post(
  "",
  ensureClientEmailExistsMiddleware,
  ensureDataIsValidMiddleware(createClientSchema),
  createClientController
);
clientRoutes.post(
  "/login",
  ensureDataIsValidMiddleware(createLoginSchema),
  createClientLoginController
);
clientRoutes.get(
  "/menu",
  ensureTokenClientIsValidMiddleware,
  getMenuClientController
);
