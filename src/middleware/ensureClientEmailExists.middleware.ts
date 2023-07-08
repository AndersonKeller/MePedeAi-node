import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";
import { AppError } from "../errors";

export async function ensureClientEmailExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const findClient: Client | null = await clientRepository.findOneBy({
    email: req.body.email,
  });
  if (req.body.email) {
    if (findClient) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
}
