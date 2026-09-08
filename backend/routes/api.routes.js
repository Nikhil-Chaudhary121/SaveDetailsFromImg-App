import express from 'express'; 
import { getData, getDataFromImg, postData } from '../controllers/api.controller.js';

const router = express.Router();

router.get('/', getData);
router.post('/', postData);
router.get('/image', getDataFromImg);

export default router;