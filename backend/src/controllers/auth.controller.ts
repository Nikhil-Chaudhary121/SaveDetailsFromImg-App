import { Request , Response } from "express"
import authSchema from "../schemas/authSchema.ts"
import pool from "../db.ts"
import User from "../types/User.ts"
import bcrypt, { getRounds, getSalt } from "bcryptjs"

const registerUser = async(req : Request, res : Response )=> {
    const pasred = authSchema.safeParse(req.body)
    if(!pasred.success){
        return res.status(400).json({error : "Invalid Inputs"})
    }

    const {name , username , password } = pasred.data;

    const saltRounds = 10 ;

    const password_hash = await bcrypt.hash(password , saltRounds)
    
    const addedUser = (await pool.query<User>(`
      INSERT INTO users (name , username , password_hash) 
      VALUES ($1 , $2 , $3) 
      RETURNING id , name , username ; ` , [name , username , password_hash]
    )).rows[0]

    if(!addedUser){
        return res.status(404).json({error : "Error in Creating user"})
    }
    
    res.status(200).json({msg : "User Registerd" , ...addedUser })

}


const loginUser = async() => {

}

export {registerUser , loginUser}