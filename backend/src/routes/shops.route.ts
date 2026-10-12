import express  from "express";
import { createShop, getAllShops } from "../controllers/shops.controller.ts";

const router = express.Router()

router.get('/', getAllShops )
router.post('/create', createShop )


export default router