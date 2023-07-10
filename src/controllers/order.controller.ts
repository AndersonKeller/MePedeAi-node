import { Request, Response } from "express";
export const createOrderController = async (req: Request, res: Response) => {
  //   req.body;
  return res.status(201).json(req.body);
};
