import { Repository } from "typeorm";
import { Establish, TypeProduct } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllTypeProductsService = async (
  establishId: string
): Promise<TypeProduct[]> => {
  const typeProductRepository: Repository<TypeProduct> =
    AppDataSource.getRepository(TypeProduct);
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);
  const findEstablish: any | null = await establishRepository.findOne({
    where: {
      id: establishId,
    },
  });

  const typeProducts: TypeProduct[] | null = await typeProductRepository.find({
    where: {
      establish: findEstablish!,
    },
  });
  return typeProducts!;
};
