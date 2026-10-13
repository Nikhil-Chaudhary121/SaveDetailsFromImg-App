import express  from "express";
import { createShop, getAllShops, getShopById } from "../controllers/shops.controller.ts";

const router = express.Router()

router.get('/', getAllShops )
router.post('/create', createShop )
router.post('/:id', getShopById )
router.put('/:id', getShopById )


export default router