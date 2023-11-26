import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product, TypeProduct } from "../../entities";
import { UpdateProduct } from "../../interfaces/product/product.interfaces";

export const updateProductByIdService = async (
  productData: UpdateProduct,
  productId: number,
  establishId: string
): Promise<Product> => {
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);
  const typeProductRepository: Repository<TypeProduct> =
    AppDataSource.getRepository(TypeProduct);
  const findProduct: Product | null = await productRepository.findOne({
    where: {
      id: productId,
      establish: {
        id: establishId,
      },
    },
    relations: { type: true },
  });
  const findTypeProduct: TypeProduct | null = productData?.typeProduct
    ? await typeProductRepository.findOne({
        where: {
          name: productData.typeProduct,
        },
      })
    : null;
  const product: Product = productRepository.create({
    ...findProduct,
    ...productData,
    type: findTypeProduct ? findTypeProduct : findProduct!.type,
  });

  await productRepository.save(product);
  return product;
};
