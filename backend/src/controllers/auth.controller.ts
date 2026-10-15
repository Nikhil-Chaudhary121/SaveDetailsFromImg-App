import { Request , Response } from "express"
import authSchema, { loginSchema } from "../schemas/authSchema.ts"
import pool from "../db.ts"
import User from "../types/User.ts"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
import { json, string } from "zod"

configDotenv()


const registerUser = async(req : Request, res : Response )=> {
    const pasred = authSchema.safeParse(req.body)
    if(!pasred.success){
        return res.status(400).json({error : "Invalid Inputs"})
    }

    const {name , username , password } = pasred.data;

    const checkUser = await pool.query<User>("SELECT id FROM users WHERE username = $1 ", [username])
    if(checkUser){
        return res.status(409).json({error : "Username is Already Used"})
    }


    const saltRounds = 10 ;

    const password_hash = await bcrypt.hash(password , saltRounds)
    
    const addedUser = (await pool.query<User>(`
      INSERT INTO users (name , username , password_hash) 
      VALUES ($1 , $2 , $3) 
      RETURNING id , name , username ; ` , [name , username , password_hash]
    )).rows[0]

    // if(!addedUser){
    //     return res.status(404).json({error : "Error in Creating user"})
    // }
    
    res.status(201).json({msg : "User Registerd" , ...addedUser })

}

const loginUser = async(req : Request , res : Response ) => {
    const parsed = loginSchema.safeParse(req.body)
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not set")
    }

    if(!parsed.success){
        return res.status(400).json({error : "Invalid Inputs"})
    }
    
    const {username , password } = parsed.data;

    const user = (await pool.query<User>("SELECT id , name , username , password_hash FROM users WHERE username = $1 ", [username])).rows[0]
    
    if(!user){
        return res.status(401).json({error : "Invalid username or password"});
    }
    
    const isCorrectPass = await bcrypt.compare(password , user.password_hash);
    

    if(!isCorrectPass){
        return res.status(401).json({error : "Wrong Password"})
    }

    const token =  jwt.sign({id : user.id}, secret , { expiresIn: "1d"})

    res.status(200).json({token , user : {
        id : user.id , 
        username : username ,
        name : user.name , 
    }})

}

export {registerUser , loginUser}