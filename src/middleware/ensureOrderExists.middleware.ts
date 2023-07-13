import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { Order } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export async function ensureOrderExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);

  const findOrder: Order | null = await orderRepository.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!findOrder) {
    throw new AppError("Order whit id not found");
  }

  return next();
}
