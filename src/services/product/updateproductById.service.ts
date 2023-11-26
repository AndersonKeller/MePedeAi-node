import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities";
import { UpdateProduct } from "../../interfaces/product/product.interfaces";

export const updateProductByIdService = async (
  productData: UpdateProduct,
  productId: number
): Promise<any> => {
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  const findProduct: Product | null = await productRepository.findOne({
    where: {
      id: productId,
    },
  });
  return findProduct;
};
