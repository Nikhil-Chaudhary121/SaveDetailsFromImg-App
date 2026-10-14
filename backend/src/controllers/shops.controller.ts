import {Request , Response} from "express"
import pool from '../db.ts'
import Shop from "../types/Shop.ts"
import shopSchema , {updateShopSchema} from "../schemas/shopSchema.ts"
import { tr } from "zod/locales"

const checkValidNumber = (num : number): boolean => {
     if(!Number.isInteger(num) || (num <= 0 || num > 2147483647)){
          return false  
        }
    return true
}


const getAllShops = async(req : Request , res : Response) => {
        const result = (await pool.query<Shop>("SELECT * FROM public.shops;")).rows 
        // console.log("Current database :", result);
    res.status(200).json(result) 
}

const createShop = async (req: Request, res: Response) => {
    const parsed = shopSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid Inputs" })
    }
    const { name, category, latitude, longitude, photo_url } = parsed.data
    const result = await pool.query<Shop>(
        `INSERT INTO shops (name, category, latitude, longitude, photo_url)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, category ?? null, latitude, longitude, photo_url ?? null]
    )
        res.status(201).json(result.rows[0])
}

const getShopById = async (req : Request , res : Response )=> {
    const id  = Number(req.params.id)
    if(!checkValidNumber(id)){
        return res.status(400).json({error : "Id is not valid"})
    }
    const shopData = await pool.query<Shop>("SELECT * FROM shops WHERE id = $1", [id])
    if(shopData.rows.length === 0 ){
    return res.status(400).json({error : "Shop not found"})
    }
    res.status(200).json(shopData.rows[0])
}

const updateShop = async (req : Request , res: Response) => {
    const id = Number(req.params.id)
    const parsed = updateShopSchema.safeParse(req.body)
    
    if(!checkValidNumber(id)){
        return res.status(400).json({error : "Id is not valid"})}
        
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid Inputs" })}
            
    if(Object.keys(parsed.data).length === 0){
        return res.status(400).json({error : "Give Proper Inputs"})}
         
    const { name, category ,latitude, longitude, photo_url } = parsed.data
    
    const updatedShop = (await pool.query<Shop>("UPDATE shops SET name = COALESCE($1, name) , category = COALESCE($2, category), latitude = COALESCE($3, latitude), longitude = COALESCE($4, longitude), photo_url = COALESCE($5, photo_url)  WHERE id = $6 RETURNING * ",  [name ?? null, category ?? null, latitude ?? null, longitude ?? null, photo_url ?? null , id])).rows[0]
    
    if(!updatedShop){
        return res.status(404).json({error : "Shop not Found"})}
    
    return res.status(200).json({msg : "updated" , updatedShop})
}

const deleteShop = async (req : Request , res : Response) => {
    const id = Number(req.params.id);
    if(!checkValidNumber(id)){
        return res.status(400).json({error : "Id is not valid"})}
    
    const deletedShop = await (await pool.query<Shop>("DELETE FROM shops WHERE id = $1 RETURNING * ; ", [id])).rows[0]
    if(!deletedShop){
        return res.status(404).json({error : "Shop Not Found"})
    }
    res.status(200).json({message : "Shop deleted"}) 
}

export {getAllShops , createShop , getShopById , updateShop , deleteShop}  
