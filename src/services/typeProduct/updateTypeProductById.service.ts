import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TypeProduct } from "../../entities";
import { UpdateTypeProduct } from "../../interfaces/typeProduct/typeProduct.interfaces";

export const upadteTypeProductByIdService = async (
  typeProductId: number,
  typeProductData: UpdateTypeProduct
): Promise<TypeProduct> => {
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
  return typeProductSave;
};
