import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Establish, Menu } from "../../entities";
import { CreateMenu } from "../../interfaces/menu/menu.interfaces";

export const createMenuService = async (
  menuData: CreateMenu,
  establishId: string
): Promise<Menu | Menu[]> => {
  const menuRepository: Repository<Menu> = AppDataSource.getRepository(Menu);
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);
  const findEstablish: any | null = await establishRepository.findOneBy({
    id: establishId,
  });
  const findMenu: Menu | null = await menuRepository.findOne({
    where: {
      establish: findEstablish!,
    },
    relations: {
      product: true,
      establish: true,
    },
  });
  if (findMenu) {
    const newMenu: any = {
      ...findMenu,
      ...menuData,
    };
    await menuRepository.save(newMenu);
    return newMenu;
  }

  const menu: Menu = menuRepository.create(menuData);
  await menuRepository.save(menu);

  return menu;
};
