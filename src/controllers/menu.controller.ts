import { Request, Response } from "express";
import { Menu } from "../entities";
import { CreateMenu } from "../interfaces/menu/menu.interfaces";
import { createMenuService } from "../services/menu/createMenu.service";
import { getMenuByEstablishService } from "../services/menu/getMenuByEstablish.service";

export const createMenuController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const menuData: CreateMenu = req.body;
  const establishId: string = req.user.id;
  const menu: Menu | Menu[] = await createMenuService(menuData, establishId);

  return res.status(201).json(menu);
};
export const getMenuByEstablishController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("controller");
  const establishId: string = req.params.id;
  console.log(establishId);
  const menu: Menu = await getMenuByEstablishService(establishId);
  console.log(menu);
  return res.status(200).json(menu);
};
