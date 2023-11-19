import { z } from "zod";
import {
  createClientLoginSchema,
  createLoginSchema,
} from "../../schemas/login/login.schemas";

export type iLogin = z.infer<typeof createLoginSchema>;
export type iClientLogin = z.infer<typeof createClientLoginSchema>;
