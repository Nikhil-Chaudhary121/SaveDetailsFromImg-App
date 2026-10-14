import express  from "express";
import { createShop, deleteShop, getAllShops, getShopById, updateShop } from "../controllers/shops.controller.ts";

const router = express.Router()

router.get('/', getAllShops )
router.post('/create', createShop )
router.post('/:id', getShopById )
router.put('/:id', updateShop )
router.delete('/:id', deleteShop)


export default router