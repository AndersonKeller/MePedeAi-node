import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Establish, TypeProduct } from "../../entities";
import {
  CreateTypeProduct,
  iTypeProduct,
} from "../../schemas/typeProduct.schemas";
import { returnTypeProductSchema } from "../../schemas/typeProduct.schemas";

export const createTypeProductService = async (
  typeProductData: CreateTypeProduct,
  establishId: string
): Promise<iTypeProduct> => {
  const typeProductRepository: Repository<TypeProduct> =
    AppDataSource.getRepository(TypeProduct);
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);
  const findEstablish: Establish | null = await establishRepository.findOne({
    where: {
      id: establishId,
    },
  });
  const typeProduct: TypeProduct =
    typeProductRepository.create(typeProductData);
  typeProduct.establish = findEstablish!;
  await typeProductRepository.save(typeProduct);

  const newTypeproduct = returnTypeProductSchema.parse(typeProduct);

  return newTypeproduct;
};
