import { Request, Response } from "express";
import { createEstablishService } from "../services/establish/createEstablish.service";

import { iEstablish } from "../interfaces/establish/establish.interfaces";
export const createEstablishController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const establishData = req.body;
  const establish: iEstablish = await createEstablishService(establishData);
  return res.status(200).json(establish);
};
