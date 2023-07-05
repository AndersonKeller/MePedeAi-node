import { Repository } from "typeorm";
import {
  CreateTypeProduct,
  iTypeProduct,
} from "../../interfaces/typeProduct/typeProduct.interfaces";
import { TypeProduct } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnTypeProductSchema } from "../../schemas/typeProduct/typeProduct.schemas";

export const createTypeProductService = async (
  typeProductData: CreateTypeProduct
): Promise<iTypeProduct> => {
  const typeProductRepository: Repository<TypeProduct> =
    AppDataSource.getRepository(TypeProduct);

  const typeProduct: TypeProduct =
    typeProductRepository.create(typeProductData);
  await typeProductRepository.save(typeProduct);
  const newTypeproduct = returnTypeProductSchema.parse(typeProduct);

  return newTypeproduct;
};
