import { Request, Response, NextFunction } from "express";
import { TypeProduct } from "../entities";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { AppError } from "../errors";

export const ensureTypeProductExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const typeProductRepository: Repository<TypeProduct> =
    AppDataSource.getRepository(TypeProduct);

  const findType: TypeProduct | null = await typeProductRepository.findOne({
    where: {
      name: req.body.typeProduct,
    },
  });
  if (!findType) {
    throw new AppError("Type of Product not exists", 404);
  }
  return next();
};
