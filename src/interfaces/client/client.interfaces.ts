import { z } from "zod";
import {
  createClientSchema,
  returnClientSchema,
} from "../../schemas/client/client.schemas";

export type CreateClient = z.infer<typeof createClientSchema>;
export type iClient = z.infer<typeof returnClientSchema>;
