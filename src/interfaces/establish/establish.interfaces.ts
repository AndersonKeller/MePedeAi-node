import { z } from "zod";
import {
  createEstablishSchema,
  returnEstablishSchema,
} from "../../schemas/establish/establish.schemas";

export type CreateEstablish = z.infer<typeof createEstablishSchema>;
export type iEstablish = z.infer<typeof returnEstablishSchema>;
