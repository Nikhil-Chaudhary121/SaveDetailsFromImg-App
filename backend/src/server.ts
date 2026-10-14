import express , {Request, Response} from "express";
import { configDotenv } from "dotenv";
import cors from "cors"

import shopRouter from './routes/shops.route.ts'
import errorHandler from "./middlewares/errorHandler.ts";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
configDotenv()

const app = express()
const PORT : number = Number(process.env.PORT) || 5000 ;




//before middlewares
app.use(helmet()) // adds security headers to every response.
app.use(cors()) // for api call
app.use(rateLimit({windowMs : 15 * 60 * 1000 , limit: 100})) // limit is how many requests one IP can make 
app.use(express.json()) // to make req.body readable



app.get('/' , (req : Request , res: Response )=> {
  res.send("Hey welcome to the homePage")
})

//routes
app.use('/shops' , shopRouter)

app.use(errorHandler)// try catch

app.listen(PORT,()=>{
  console.log("Server is Running on PORT : ",PORT)
})

