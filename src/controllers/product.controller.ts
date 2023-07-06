import { Request, Response } from "express";
import { Product } from "../entities";
import { createProductService } from "../services/product/createProduct.service";
export const createProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productData = req.body;
  const product: Product = await createProductService(productData);
  return res.status(201).json(product);
};
