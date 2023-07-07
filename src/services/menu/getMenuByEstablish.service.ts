import { Repository } from "typeorm";
import { Menu } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getMenuByEstablishService = async (
  establishId: string
): Promise<Menu> => {
  const menuRepository: Repository<Menu> = AppDataSource.getRepository(Menu);
  const menu: Menu | null = await menuRepository.findOne({
    where: {
      establish: {
        id: establishId,
      },
    },
    relations: {
      product: { type: true },
    },
  });

  return menu!;
};
