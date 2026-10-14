import {Request , Response , NextFunction  } from 'express'

const errorHandler = (err : unknown , req : Request , res : Response , next : NextFunction ) => {
    console.log("Error :", err )
    res.status(500).json({error : "Internal Server Error"})
}

export default errorHandler