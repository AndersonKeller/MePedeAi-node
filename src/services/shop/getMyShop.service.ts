import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Shop } from "../../entities/shop.entities";

export const getMyShopUrlService = async (
  establishId: string
): Promise<string> => {
  const shopRepository: Repository<Shop> = AppDataSource.getRepository(Shop);
  const findShop: Shop | null = await shopRepository.findOne({
    where: {
      establish: {
        id: establishId,
      },
    },
    relations: {
      establish: true,
    },
  });

  return findShop!.url;
};
