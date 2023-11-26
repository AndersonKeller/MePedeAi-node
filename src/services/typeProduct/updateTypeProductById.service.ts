import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TypeProduct } from "../../entities";
import {
  UpdateTypeProduct,
  iTypeProduct,
} from "../../interfaces/typeProduct/typeProduct.interfaces";
import { returnTypeProductSchema } from "../../schemas/typeProduct/typeProduct.schemas";

export const upadteTypeProductByIdService = async (
  typeProductId: number,
  typeProductData: UpdateTypeProduct
): Promise<iTypeProduct> => {
  const typeProductRepository: Repository<TypeProduct> =
    AppDataSource.getRepository(TypeProduct);

  const findTypeProduct: TypeProduct | null =
    await typeProductRepository.findOne({
      where: {
        id: typeProductId,
      },
      relations: {
        establish: true,
      },
    });

  const typeProductSave: TypeProduct = typeProductRepository.create({
    ...findTypeProduct!,
    ...typeProductData,
  });

  await typeProductRepository.save(typeProductSave);
  const resultToReturn = returnTypeProductSchema.parse(typeProductSave);
  return resultToReturn;
};
