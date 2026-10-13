import {Request , Response} from "express"
import pool from '../db.ts'
import Shop from "../types/Shop.ts"
import shopSchema from "../schemas/shopSchema.ts"


const getAllShops = async(req : Request , res : Response) => {
    try {
            const result = (await pool.query<Shop>("SELECT * FROM public.shops;")).rows 
            // console.log("Current database :", result);
        res.status(200).json(result)
    } catch (error) {
        console.log("There is a Error in Fetching Shops Controller",error)
        res.status(500).json({error : "error while fetching data"})
    }
}

const createShop = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        console.log("Error in creating Shop Controller:", error)
        res.status(500).json({ error: "Error in Adding Shop" })
    }
}

const getShopById = async (req : Request , res : Response )=> {
    try {
        const id  = Number(req.params.id)
        if(!Number.isInteger(id) || (id <= 0 || id > 2147483647)){
            return res.status(400).json({error : "Id is not valid"})
        }
        const shopData = await pool.query<Shop>("SELECT * FROM shops WHERE id = $1", [id])
        if(shopData.rows.length === 0 ){
            return res.status(404).json({error : "Shop not found"})
        }
        res.status(200).json(shopData.rows[0])
    } catch (error) {
       console.log("Error in Fetching Single Shop : ", error) 
       res.status(500).json({error : "Error in Fetching Single Shop Data"})
    }
}

const updateShop = async (req : Request , res: Response) => {
    try {
        
    } catch (error) {
        console.log("Error in updating Shop Controller : " , error)
        res
    }
}

export {getAllShops , createShop , getShopById}  
