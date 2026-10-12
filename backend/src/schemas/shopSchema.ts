import z from "zod";

const shopSchema = z.object({
    name : z.string().max(20).min(2).trim(),
    category : z.string().optional(),
    latitude : z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    photo_url : z.string().optional()
})

export default shopSchema


export type CreateShopInput = z.infer<typeof shopSchema>

 

