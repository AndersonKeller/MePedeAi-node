import { Request, Response } from "express";
import { Product } from "../entities";
import { UpdateProduct } from "../interfaces/product.interfaces";
import { createProductService } from "../services/product/createProduct.service";
import { getAllProductsService } from "../services/product/getAllProducts.service";
import { getProductByIdService } from "../services/product/getProductById.servicec";
import { updateProductByIdService } from "../services/product/updateproductById.service";
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
export const getProductByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productId: number = parseInt(req.params.id);
  const establishId: string = req.user.id;
  const product: Product = await getProductByIdService(productId, establishId);
  return res.status(200).json(product);
};
export const updateProductByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productData: UpdateProduct = req.body;
  const establishId: string = req.user.id;
  const product: Product = await updateProductByIdService(
    productData,
    parseInt(req.params.id),
    establishId
  );
  return res.status(201).json(product);
};
