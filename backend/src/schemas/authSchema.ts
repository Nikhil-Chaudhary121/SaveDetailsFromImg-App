import z from "zod";

const authSchema = z.object({
    name : z.string().max(30).min(2),
    username : z.string().max(16).min(2).toLowerCase().trim(),
    password : z.string().min(8),
})

export default authSchema


export type CreateAuthInput = z.infer<typeof authSchema>

 
