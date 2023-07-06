import { iTypeProduct } from "./../../interfaces/typeProduct/typeProduct.interfaces";
import { Repository } from "typeorm";
import {
  CreateProduct,
  iProduct,
} from "../../interfaces/product/product.interfaces";
import { Product, TypeProduct } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnProductSchema } from "../../schemas/product/product.schemas";

export const createProductService = async (
  productData: CreateProduct
): Promise<Product> => {
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);
  const typeProductRepository: Repository<TypeProduct> =
    AppDataSource.getRepository(TypeProduct);
  const findTypeProduct: TypeProduct | null =
    await typeProductRepository.findOne({
      where: {
        name: productData.typeProduct,
      },
    });

  const product: Product = productRepository.create({
    type: findTypeProduct!,
    name: productData.name,
    description: productData.description,
  });
  await productRepository.save(product);

  return product;
};
