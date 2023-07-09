import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Client, Establish } from "../entities";
import { AppError } from "../errors";

export async function ensureClientEmailExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);

  const findClient: Client | null = await clientRepository.findOneBy({
    email: req.body.email,
  });
  if (req.body.email) {
    if (findClient) {
      throw new AppError("Email already exists", 409);
    }
  }
  const findEstablish: Establish | null = await establishRepository.findOne({
    where: {
      id: String(req.query.establish!),
    },
  });
  if (!findEstablish) {
    throw new AppError("establsih not found");
  }
  req.body.establish = findEstablish;
  return next();
}
