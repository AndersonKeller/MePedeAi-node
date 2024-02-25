import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Establish } from "../../entities";
import { Shop } from "../../entities/shop.entities";
import { CreateShop, iShop } from "../../schemas/shop.schemas";
import { returnShopSchema } from "../../schemas/shop.schemas";

export const createShopService = async (
  shopData: CreateShop,
  establishId: string
): Promise<iShop> => {
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);
  const shopRepository: Repository<Shop> = AppDataSource.getRepository(Shop);
  const findEstablish: Establish | null = await establishRepository.findOne({
    where: {
      id: establishId,
    },
  });
  shopData.url = shopData.url
    .split("")
    .map((letter) => {
      if (letter == "-") {
        letter = " ";
        console.log(letter);
        return letter;
      }
      return letter;
    })
    .join("");

  shopData.url = shopData.url
    .toLowerCase()
    .normalize("NFD")

    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .join("-");
  const findShop: Shop | null = await shopRepository.findOne({
    where: {
      establish: {
        id: establishId,
      },
    },
  });

  const shop: Shop[] | Shop = findShop
    ? shopRepository.create({
        ...findShop,
        ...shopData,
        establish: findEstablish!,
      })
    : shopRepository.create({
        ...shopData,
        establish: findEstablish!,
      });
  await shopRepository.save(shop);

  const newShop: iShop = returnShopSchema.parse(shop);
  return newShop;
};
