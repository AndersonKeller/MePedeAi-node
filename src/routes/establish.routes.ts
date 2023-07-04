import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { createEstablishSchema } from "../schemas/establish/establish.schemas";
import {
  createEstablishController,
  retriveOwnerController,
} from "../controllers/establish.controller";
import { ensureEmailExistsMiddleware } from "../middleware/ensureEmailExists.middleware";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
export const establishRoutes: Router = Router();

establishRoutes.post(
  "",
  ensureDataIsValidMiddleware(createEstablishSchema),
  ensureEmailExistsMiddleware,
  createEstablishController
);
establishRoutes.get(
  "/retrieve",
  ensureTokenvalidMiddleware,
  retriveOwnerController
);
