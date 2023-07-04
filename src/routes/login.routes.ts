import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createLoginSchema } from "../schemas/login/login.schemas";
import { createLoginController } from "../controllers/login.controllers";
export const loginRoutes: Router = Router();
loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(createLoginSchema),
  createLoginController
);
