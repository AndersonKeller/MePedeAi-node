import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Product, TypeProduct } from "../../entities"
import { AppError } from "../../errors"

export const removeTypeProductService=async(typeProductId:number):Promise<void>=>{
    const typeProductRepository:Repository<TypeProduct> = AppDataSource.getRepository(TypeProduct)
    const productRepository:Repository<Product> = AppDataSource.getRepository(Product)
    const findProduct:Product|null =await productRepository.findOne({
        where:{
            type:{
                id:typeProductId
            }
        }
    })
    if(findProduct){
        throw new AppError("Error remove type, after remove products associates whit this type",409)
    }
    const findTypeproduct: TypeProduct| null = await typeProductRepository.findOne({
        where:{
            id:typeProductId
        }
    })
    console.log(findTypeproduct)
    await typeProductRepository.remove(findTypeproduct!)

}