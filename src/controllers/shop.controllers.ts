import { Request, Response } from "express";
import { CreateShop, iShop } from "../interfaces/shop/shop.interfaces";
import { createShopService } from "../services/shop/createShop.service";

export const createShopController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const shopData: CreateShop = req.body;
  const establishId: string = req.user.id;
  const shop: iShop = await createShopService(shopData, establishId);
  return res.status(201).json(shop);
};
