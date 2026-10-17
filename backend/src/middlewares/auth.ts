import { Request ,Response ,NextFunction } from "express";
import jwt from "jsonwebtoken";



const auth = (req : Request , res : Response , next : NextFunction) => {
    const secret = process.env.JWT_SECRET;
    if(!secret){
        throw new Error("JWT_SECRET is not set")
    }
    try {
        const headers = req.headers.authorization;
    
        if(!headers?.startsWith("Bearer ")){
        return res.status(401).json({error : "Header is missing"})
        }

        const token = headers.split(" ")[1]
    
        if(!token){
            return res.status(401).json({error : "Token is missing "})
        }
        const decoded = jwt.verify(token , secret);

        if (typeof decoded === "string" || typeof decoded.id !== "number") {
            return res.status(401).json({ error: "Invalid token payload" })
        }
        req.userId  = decoded.id
            
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" })
    }
    next()
} 

export default auth