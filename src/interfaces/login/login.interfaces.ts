import { z } from "zod";
import { createLoginSchema } from "../../schemas/login/login.schemas";

export type iLogin = z.infer<typeof createLoginSchema>;
