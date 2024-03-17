import { Request, Response } from "express";
import { getFinancialService } from "../services/financials/getFinancial.service";
import { iFinancial } from "../schemas/financials.schemas";
export const getFinancialController = async (
  req: Request,
  res: Response
): Promise<Response> => {
const financials: iFinancial[] = await getFinancialService() 
  return res.status(200).json(financials);
};
