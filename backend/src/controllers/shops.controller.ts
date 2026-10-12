import {Request , Response} from "express"
import pool from '../db.ts'
import Shop from "../types/Shop.ts"


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

export {getAllShops}