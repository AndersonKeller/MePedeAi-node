import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Menu } from "../../entities";
import { iMenuClient } from "../../schemas/menu.schemas";
import { returnMenuClientSchema } from "../../schemas/menu.schemas";

export const getMenuClientService = async (
  id: string,
): Promise<iMenuClient> => {
  const menuRepository: Repository<Menu> = AppDataSource.getRepository(Menu);
  const menu: Menu | null | undefined = await menuRepository.findOne({
    where: {
      establish: {
        id: id,
      },
    },
    relations: {
      product: { type: true },
      establish: true,
    },
  });
  // console.log(menu);
  const returnMenu = returnMenuClientSchema.parse(menu);
  return returnMenu;
};
