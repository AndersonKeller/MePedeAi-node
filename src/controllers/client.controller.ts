import { Request, Response } from "express";
import { iClient } from "../interfaces/client/client.interfaces";
import { iMenuClient } from "../interfaces/menu/menu.interfaces";
import { createClientService } from "../services/client/createClient.service";
import { createClientLoginService } from "../services/client/createClientLogin.service";
import { getMenuClientService } from "../services/client/getMenuClient.service";
export const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientData = req.body;
  const client: iClient = await createClientService(clientData);
  return res.status(201).json(client);
};
export const createClientLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData = req.body;
  const token: string = await createClientLoginService(
    loginData,
    String(req.query.establish!)
  );
  return res.status(200).json({ access_token: token });
};
export const getMenuClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { admin, id, type, establishId } = req.user;
  const menu: iMenuClient = await getMenuClientService(
    admin,
    id,
    type,
    establishId!
  );
  return res.status(200).json(menu);
};
