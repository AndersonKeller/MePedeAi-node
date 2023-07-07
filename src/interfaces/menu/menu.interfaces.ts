import { z } from "zod";
import {
  createMenuSchema,
  returnMenuSchema,
} from "../../schemas/menu/menu.schemas";

export type CreateMenu = z.infer<typeof createMenuSchema>;
export type iMenu = z.infer<typeof returnMenuSchema>;
