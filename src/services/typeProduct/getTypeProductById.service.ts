import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TypeProduct } from "../../entities";
import { iTypeProduct } from "../../interfaces/typeProduct/typeProduct.interfaces";
import { returnTypeProductSchema } from "../../schemas/typeProduct/typeProduct.schemas";

export const getTypeProductByIdService = async (
  typeProductId: number
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
  const resultToReturn = returnTypeProductSchema.parse(findTypeProduct);
  return resultToReturn;
};
