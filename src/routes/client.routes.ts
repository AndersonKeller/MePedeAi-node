import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createClientSchema } from "../schemas/client/client.schemas";
import { createClientController } from "../controllers/client.controller";
import { ensureClientEmailExistsMiddleware } from "../middleware/ensureClientEmailExists.middleware";

export const clientRoutes: Router = Router();

clientRoutes.post(
  "",
  ensureDataIsValidMiddleware(createClientSchema),
  ensureClientEmailExistsMiddleware,
  createClientController
);
