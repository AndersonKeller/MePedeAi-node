import { Request, Response } from "express";
import { createOrderService } from "../services/order/createOrderService";
import { iOrder } from "../interfaces/order/order.interfaces";
import { updateOrderService } from "../services/order/updateOrder.servicec";
import { Order } from "../entities";
import { getOrderByIdService } from "../services/order/getOrderById.service";
export const createOrderController = async (req: Request, res: Response) => {
  const orderData = req.body;
  const { admin, id, type } = req.user;
  const order: iOrder = await createOrderService(orderData, admin, id, type);
  return res.status(201).json(order);
};
export const updateOrderController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const orderData = req.body;
  const orderId: number = parseInt(req.params.id);

  const order: iOrder = await updateOrderService(orderData, orderId);
  return res.status(200).json(order);
};
export const getOrderByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const orderId: number = parseInt(req.params.id);
  const order: iOrder = await getOrderByIdService(orderId);
  return res.status(200).json(order);
};
