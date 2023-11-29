import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client, Menu } from "../../entities";
import { iClient } from "../../interfaces/client.interfaces";
import { iMenuClient } from "../../interfaces/menu.interfaces";
import { returnMenuClientSchema } from "../../schemas/menu.schemas";

export const getMenuClientService = async (
  admin: boolean,
  id: string,
  type: string,
  establishId: string
): Promise<iMenuClient> => {
  const menuRepository: Repository<Menu> = AppDataSource.getRepository(Menu);
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const findClient: iClient | null = await clientRepository.findOne({
    where: {
      id: String(id),
    },
    relations: {
      establish: true,
    },
  });
  console.log("establishId");
  console.log(findClient);
  const menu: Menu | null | undefined = await menuRepository.findOne({
    where: {
      establish: {
        id: findClient!.establish.id,
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
