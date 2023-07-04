import { Repository } from "typeorm";
import { Establish } from "../../entities";
import {
  CreateEstablish,
  iEstablish,
} from "../../interfaces/establish/establish.interfaces";
import { AppDataSource } from "../../data-source";
import { returnEstablishSchema } from "../../schemas/establish/establish.schemas";

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
