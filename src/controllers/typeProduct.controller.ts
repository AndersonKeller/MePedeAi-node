import { Request, Response } from "express";
import { iTypeProduct } from "../interfaces/typeProduct/typeProduct.interfaces";
import { createTypeProductService } from "../services/typeProduct/createTypeProduct.service";

export const createTypeProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typeProductData = req.body;
  const typeProduct: iTypeProduct = await createTypeProductService(
    typeProductData
  );

  return res.status(200).json(typeProduct);
};
