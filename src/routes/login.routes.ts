import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createLoginSchema } from "../schemas/login.schemas";
export const loginRoutes: Router = Router();
loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(createLoginSchema),
  createLoginController
);
