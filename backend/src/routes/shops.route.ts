import express  from "express";
import { getAllShops } from "../controllers/shops.controller.ts";

const router = express.Router()

router.get('/', getAllShops )


export default router