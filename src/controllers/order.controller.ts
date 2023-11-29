import { Request, Response } from "express";
import { iOrder } from "../interfaces/order.interfaces";
import { createOrderService } from "../services/order/createOrder.service";
import { getOrderByIdService } from "../services/order/getOrderById.service";
import { getAllOrdersService } from "./../services/order/getAllOrders.service";
export const createOrderController = async (req: Request, res: Response) => {
  const orderData = req.body;
  const { admin, id, type } = req.user;
  const order: iOrder = await createOrderService(orderData, admin, id, type);
  return res.status(201).json(order);
};

export const getAllOrdersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const orders: iOrder = await getAllOrdersService(req.user.id);
  return res.status(200).json(orders);
};
export const getOrderByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const orderId: number = parseInt(req.params.id);
  const order: iOrder = await getOrderByIdService(orderId);
  return res.status(200).json(order);
};
