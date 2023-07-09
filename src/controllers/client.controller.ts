import { Request, Response } from "express";
import { Client } from "../entities";
import { createClientService } from "../services/client/createClient.service";
import { iClient } from "../interfaces/client/client.interfaces";
import { createClientLoginService } from "../services/client/createClientLogin.service";
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
  const token: string = await createClientLoginService(loginData);
  return res.status(200).json({ access_token: token });
};
