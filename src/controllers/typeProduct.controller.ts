import { CreateTypeProduct } from "./../interfaces/typeProduct/typeProduct.interfaces";
import { Request, Response } from "express";
import { iTypeProduct } from "../interfaces/typeProduct/typeProduct.interfaces";
import { createTypeProductService } from "../services/typeProduct/createTypeProduct.service";
import { getAllTypeProductsService } from "../services/typeProduct/getAllTypeProducts.service";
import { TypeProduct } from "../entities";

export const createTypeProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typeProductData: CreateTypeProduct = req.body;
  const typeProduct: iTypeProduct = await createTypeProductService(
    typeProductData,
    req.user.id
  );

  return res.status(201).json(typeProduct);
};
export const getAllTypeProductsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const establishId: string = req.user.id;
  const typeProducts: TypeProduct[] = await getAllTypeProductsService(
    establishId
  );
  return res.status(200).json(typeProducts);
};
