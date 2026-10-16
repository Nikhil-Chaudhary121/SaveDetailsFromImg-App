import { Request ,Response ,NextFunction } from "express";
import jwt from "jsonwebtoken";


const auth = async(req : Request , res : Response , next : NextFunction) => {
try {
        const headers = req.headers.authorization;
    const secret = process.env.JWT_SECRET;

    
    if(!headers?.startsWith("Bearer ")){
        return res.status(401).json({error : "Header is missing"})
    }
    
    if(!secret){
        throw new Error("JWT_SECRET is not set")
    }

    if(!headers.split(" ")[1]){
        return res.status(401).json({error : "Token is missing "})
    }

    const token = jwt.verify(headers.split(" ")[1] , secret);
    
    
} catch (error) {
    console.log("Error in auth middleware : ", error)
}finally{
    next()
}

} 