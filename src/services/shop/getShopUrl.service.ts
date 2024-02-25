import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Shop } from "../../entities/shop.entities";
import { iShop } from "../../schemas/shop.schemas";
import { returnShopSchema } from "../../schemas/shop.schemas";

export const getShopUrlService = async (shopUrl: string): Promise<iShop> => {
  const shopRepository: Repository<Shop> = AppDataSource.getRepository(Shop);
  const findShop: Shop | null = await shopRepository.findOne({
    where: {
      url: shopUrl,
    },
    relations: {
      establish: true,
    },
  });
  const shop: iShop = returnShopSchema.parse(findShop);
  return shop;
};
