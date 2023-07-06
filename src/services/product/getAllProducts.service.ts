import { Repository } from "typeorm";
import { Establish, Product, TypeProduct } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getAllProductsService = async (
  establishId: string
): Promise<Product[]> => {
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  const products: Product[] | null = await productRepository.find({
    relations: {
      type: true,
    },
  });
  return products;
};
