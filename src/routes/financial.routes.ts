import { Router } from "express";
import { ensureTokenvalidMiddleware } from "../middleware/ensureTokenIsValid.middleware";
import { getFinancialController } from "../controllers/financial.controller";

export const financialRoutes: Router = Router()

financialRoutes.get("",ensureTokenvalidMiddleware,getFinancialController)