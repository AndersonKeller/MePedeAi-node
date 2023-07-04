import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createEstablishSchema } from "../schemas/establish/establish.schemas";
import { createEstablishController } from "../controllers/establish.controller";
export const establishRoutes: Router = Router();

establishRoutes.post(
  "",
  ensureDataIsValidMiddleware(createEstablishSchema),
  createEstablishController
);
