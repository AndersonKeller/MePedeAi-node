import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Establish } from "../entities";
import { AppError } from "../errors";

export async function ensureEmailExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);

  const findEstablish: Establish | null = await establishRepository.findOneBy({
    email: req.body.email,
  });
  if (req.body.email) {
    if (findEstablish) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
}
