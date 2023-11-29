import { Request, Response } from "express";
import { CreateShop, iShop } from "../interfaces/shop.interfaces";
import { createShopService } from "../services/shop/createShop.service";
import { getShopUrlService } from "../services/shop/getShopUrl.service";

export const getShopUrlController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const url: string = req.params.url;
  const shop: iShop = await getShopUrlService(url);
  return res.status(200).json(shop);
};

export const createShopController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const shopData: CreateShop = req.body;
  const establishId: string = req.user.id;
  const shop: iShop = await createShopService(shopData, establishId);
  return res.status(201).json(shop);
};
