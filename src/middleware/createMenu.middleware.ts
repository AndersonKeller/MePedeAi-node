import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Establish, Product } from "../entities";

export async function createMenuMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  const findEstablish: any | null = await establishRepository.findOneBy({
    id: req.user.id,
  });
  const products: Product[] | null = await productRepository.find({
    where: {
      establish: findEstablish!,
    },
    relations: {
      establish: true,
      type: true,
    },
  });

  req.body.product = [...products];
  req.body.establish = findEstablish;
  return next();
}
