import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client, Menu } from "../../entities";
import { iClient } from "../../interfaces/client/client.interfaces";
import { triggerAsyncId } from "async_hooks";
import {
  returnMenuClientSchema,
  returnMenuSchema,
} from "../../schemas/menu/menu.schemas";

export const getMenuClientService = async (
  admin: boolean,
  id: string,
  type: string
): Promise<any> => {
  const menuRepository: Repository<Menu> = AppDataSource.getRepository(Menu);
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const findClient: any | null = await clientRepository.findOne({
    where: {
      id: String(id),
    },
    relations: {
      establish: true,
    },
  });
  const menu: Menu | null | undefined = await menuRepository.findOne({
    where: {
      establish: findClient!.establish,
    },
    relations: {
      product: { type: true },
      establish: true,
    },
  });
  const returnMenu = returnMenuClientSchema.parse(menu);
  return returnMenu;
};
