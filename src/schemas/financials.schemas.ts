import {z} from "zod"

export const financialSchema = z.object({
    createdAt: z.string(),
    total: z.number(),
    payment: z.string(),
    orders: z.string()
})

export type iFinancial = z.infer<typeof financialSchema>