import { z } from "zod";
import {
  createClientLoginSchema,
  createLoginSchema,
} from "../schemas/login.schemas";

export type iLogin = z.infer<typeof createLoginSchema>;
export type iClientLogin = z.infer<typeof createClientLoginSchema>;
