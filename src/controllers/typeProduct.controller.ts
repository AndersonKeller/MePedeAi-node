import { Request, Response } from "express";
import { TypeProduct } from "../entities";
import {
  CreateTypeProduct,
  UpdateTypeProduct,
  iTypeProduct,
} from "../interfaces/typeProduct.interfaces";
import { createTypeProductService } from "../services/typeProduct/createTypeProduct.service";
import { getAllTypeProductsService } from "../services/typeProduct/getAllTypeProducts.service";
import { getTypeProductByIdService } from "../services/typeProduct/getTypeProductById.service";
import { upadteTypeProductByIdService } from "../services/typeProduct/updateTypeProductById.service";

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

export const getTypeProductByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typeProductId: number = parseInt(req.params.id);
  const typeProduct: iTypeProduct = await getTypeProductByIdService(
    typeProductId
  );
  return res.status(200).json(typeProduct);
};

export const updateTypeProductByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typeProductId: number = parseInt(req.params.id);
  const typeProductData: UpdateTypeProduct = req.body;
  const typeProduct: iTypeProduct = await upadteTypeProductByIdService(
    typeProductId,
    typeProductData
  );
  return res.status(200).json(typeProduct);
};
