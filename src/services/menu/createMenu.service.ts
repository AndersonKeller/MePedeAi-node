import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Establish, Menu } from "../../entities";
import { CreateMenu, iMenu, returnMenuSchema } from "../../schemas/menu.schemas";


export const createMenuService = async (
  menuData: CreateMenu,
  establishId: string
): Promise<iMenu | iMenu[]> => {
  const menuRepository: Repository<Menu> = AppDataSource.getRepository(Menu);
  const establishRepository: Repository<Establish> =
    AppDataSource.getRepository(Establish);
  const findEstablish: Establish | null = await establishRepository.findOneBy({
    id: establishId,
  });
  const findMenu: Menu | null = await menuRepository.findOne({
    where: {
      establish: {
        id: findEstablish?.id!
      },
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
  const data:any = menuData
  const menu: any = menuRepository.create(data);
  await menuRepository.save(menu);
  const returnMenu = returnMenuSchema.parse(menu);
  return returnMenu;
};
