import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities";

export const getProductByIdService = async (
  productId: number,
  establishId: string
): Promise<Product> => {
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  const findProduct: Product | null = await productRepository.findOne({
    where: {
      id: productId,
      establish: {
        id: establishId,
      },
    },
    relations: {
      type: true,
    },
  });

  return findProduct!;
};
