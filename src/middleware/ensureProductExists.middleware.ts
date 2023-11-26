import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entities";
import { AppError } from "../errors";

export async function ensureProductExistMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  const findProduct: Product | null = await productRepository.findOne({
    where: {
      id: parseInt(req.params.id),
      establish: {
        id: req.user.id,
      },
    },
  });
  if (!findProduct) {
    throw new AppError("Product whit id not found", 404);
  }
  return next();
}
