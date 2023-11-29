import { NextFunction, Request, Response } from "express";
import { Not, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Shop } from "../entities/shop.entities";
import { AppError } from "../errors";

export async function ensureShopUrlExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const shopRepository: Repository<Shop> = AppDataSource.getRepository(Shop);
  const urlBody: string = req.body.url
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .join("-");
  const findShopUrl: Shop | null = await shopRepository.findOne({
    where: {
      url: urlBody,
      establish: {
        id: Not(req.user.id),
      },
    },
  });
  if (findShopUrl) {
    throw new AppError(
      "this url shop already exists, please check another url",
      409
    );
  }
  return next();
}
