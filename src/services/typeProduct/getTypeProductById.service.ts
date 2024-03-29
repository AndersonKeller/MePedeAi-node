import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TypeProduct } from "../../entities";
import { iTypeProduct } from "../../schemas/typeProduct.schemas";
import { returnTypeProductSchema } from "../../schemas/typeProduct.schemas";

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
