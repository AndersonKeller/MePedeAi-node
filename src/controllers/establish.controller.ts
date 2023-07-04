import { Request, Response } from "express";
import { createEstablishService } from "../services/establish/createEstablish.service";

import { iEstablish } from "../interfaces/establish/establish.interfaces";
import { Establish } from "../entities";
import { retriveOwnerService } from "../services/establish/retrieveOwner.service";
export const createEstablishController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const establishData = req.body;
  const establish: iEstablish = await createEstablishService(establishData);
  return res.status(200).json(establish);
};
export const retriveOwnerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const establishId = req.user.id;
  const establish: Establish | undefined = await retriveOwnerService(
    establishId
  );
  return res.status(200).json(establish);
};
