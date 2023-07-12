import { Request, Response } from "express";
import { Order } from "../entities";
import { createOrderService } from "../services/order/createOrderService";
export const createOrderController = async (req: Request, res: Response) => {
  //   req.body;
  const orderData = req.body;
  const { admin, id, type } = req.user;
  const order: Order = await createOrderService(orderData, admin, id, type);
  return res.status(201).json(order);
};
