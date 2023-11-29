import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Establish } from "../../entities";
import { returnEstablishSchema } from "../../schemas/establish.schemas";

export const retriveOwnerService = async (
  establishId: string
): Promise<Establish> => {
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);

  const establish: Establish | null = await establishRepository.findOne({
    where: { id: establishId },
  });

  const userReturn: any = returnEstablishSchema.parse(establish);
  return userReturn;
};
