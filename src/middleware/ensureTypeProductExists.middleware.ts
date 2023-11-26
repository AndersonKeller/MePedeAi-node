import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TypeProduct } from "../entities";
import { AppError } from "../errors";

export const ensureTypeProductExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const typeProductRepository: Repository<TypeProduct> =
    AppDataSource.getRepository(TypeProduct);

  if (req.body.typeProduct) {
    const findType: TypeProduct | null = await typeProductRepository.findOne({
      where: {
        name: req.body.typeProduct,
        establish: { id: req.user.id },
      },
    });
    // console.log(findType);
    if (!findType) {
      throw new AppError("Type of Product not exists", 404);
    }
  }
  return next();
};
