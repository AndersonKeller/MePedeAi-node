import { Router } from "express";
import {
  createClientController,
  createClientLoginController,
  getMenuClientController,
} from "../controllers/client.controller";
import { ensureClientEmailExistsMiddleware } from "../middleware/ensureClientEmailExists.middleware";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureTokenClientIsValidMiddleware } from "../middleware/enusureTokenClientIsValid.middleware";
import { createClientSchema } from "../schemas/client/client.schemas";
import { createLoginSchema } from "../schemas/login/login.schemas";

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
