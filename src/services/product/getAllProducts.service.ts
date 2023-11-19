import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities";

export const getAllProductsService = async (
  establishId: string
): Promise<Product[]> => {
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  const products: Product[] | null = await productRepository.find({
    where: {
      establish: {
        id: establishId,
      },
    },
    relations: {
      type: true,
    },
  });
  return products;
};
