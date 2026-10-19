import z from "zod";
const numberSchema = z.string().trim().regex(/^[6-9]\d{9}$/, "Invalid phone number")

const shopSchema = z.object({
    name : z.string().max(20).min(2).trim(),
    category : z.string().optional(),
    latitude : z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    photo_url : z.url().optional(),
    phones : z.array(numberSchema).max(5).transform((phones) => [...new Set(phones)]).default([])

})


export default shopSchema

export const updateShopSchema = shopSchema.partial().extend({
    phones: z.array(numberSchema).max(5).optional()
})


export type CreateShopInput = z.infer<typeof shopSchema>

 

