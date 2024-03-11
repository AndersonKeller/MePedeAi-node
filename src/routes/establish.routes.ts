import { Router } from "express";
import {
  createEstablishController,
  getAllCLientsEstablishController,
  retriveOwnerController,
} from "../controllers/establish.controller";
import { ensureDataIsValidMiddleware } from "../middleware/ensureDataIsValid.middleware";
import { ensureEmailExistsMiddleware } from "../middleware/ensureEmailExists.middleware";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { createEstablishSchema } from "../schemas/establish.schemas";
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
establishRoutes.get(
  "/clients",
  ensureTokenvalidMiddleware,
  getAllCLientsEstablishController
)