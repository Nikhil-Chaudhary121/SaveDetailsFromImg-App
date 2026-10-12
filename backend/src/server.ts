import express , {Request, Response} from "express";
import { configDotenv } from "dotenv";

import shopRouter from './routes/shops.route.ts'
configDotenv()

const app = express()
const PORT : number = Number(process.env.PORT) || 5000 ;


app.use(express.json())

app.get('/' , (req : Request , res: Response )=> {
  res.send("Hey welcome to the homePage")
})

app.use('/shops' , shopRouter)

app.listen(PORT,()=>{
  console.log("Server is Running on PORT : ",PORT)
})

