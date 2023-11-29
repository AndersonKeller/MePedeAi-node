import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Establish } from "../../entities";
import {
  CreateEstablish,
  iEstablish,
} from "../../interfaces/establish.interfaces";
import { returnEstablishSchema } from "../../schemas/establish.schemas";

export const createEstablishService = async (
  establishData: CreateEstablish
): Promise<iEstablish> => {
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);
  const establish: Establish = establishRepository.create(establishData);
  await establishRepository.save(establish);
  const newEstablish = returnEstablishSchema.parse(establish);

  return newEstablish;
};
