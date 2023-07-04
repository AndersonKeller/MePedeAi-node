import { Request, Response } from "express";
import { createLoginService } from "../services/login/createLogin.service";
export async function createLoginController(req: Request, res: Response) {
  const loginData = req.body;
  const token: string = await createLoginService(loginData);
  return res.status(200).json({ token: token });
}
