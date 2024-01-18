import { Request, Response } from "express";
import { Menu } from "../entities";
import { CreateMenu, iMenu } from "../interfaces/menu.interfaces";
import { createMenuService } from "../services/menu/createMenu.service";
import { getMenuByEstablishService } from "../services/menu/getMenuByEstablish.service";

export const createMenuController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const menuData: CreateMenu = req.body;
  const establishId: string = req.user.id;
  const menu: iMenu | iMenu[] = await createMenuService(menuData, establishId);

  return res.status(201).json(menu);
};
export const getMenuByEstablishController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const establishId: string = req.params.id;

  const menu: Menu = await getMenuByEstablishService(establishId);

  return res.status(200).json(menu);
};
