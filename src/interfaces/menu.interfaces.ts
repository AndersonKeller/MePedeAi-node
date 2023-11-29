import { z } from "zod";
import {
  createMenuSchema,
  returnMenuClientSchema,
  returnMenuSchema,
} from "../schemas/menu.schemas";

export type CreateMenu = z.infer<typeof createMenuSchema>;
export type iMenu = z.infer<typeof returnMenuSchema>;
export type iMenuClient = z.infer<typeof returnMenuClientSchema>;
