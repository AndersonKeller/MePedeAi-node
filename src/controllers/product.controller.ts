import { Request, Response } from "express";
import { Product } from "../entities";
import { createProductService } from "../services/product/createProduct.service";
import { getAllProductsService } from "../services/product/getAllProducts.service";
export const createProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productData = req.body;
  const establishId: string = req.user.id;
  const product: Product = await createProductService(productData, establishId);
  return res.status(201).json(product);
};
export const getAllProductsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const establishId: string = req.user.id;
  const products: Product[] = await getAllProductsService(establishId);
  return res.status(200).json(products);
};
