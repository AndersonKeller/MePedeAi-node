import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Establish, Product, TypeProduct } from "../../entities";
import { CreateProduct } from "../../interfaces/product.interfaces";

export const createProductService = async (
  productData: CreateProduct,
  establishId: string
): Promise<Product> => {
  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);

  const typeProductRepository: Repository<TypeProduct> =
    AppDataSource.getRepository(TypeProduct);
  const findEstablish: any | null = await establishRepository.findOneBy({
    id: establishId,
  });
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
    establish: findEstablish!,
    price: productData.price,
    quantity: productData.quantity,
  });
  await productRepository.save(product);

  return product;
};
