import express from 'express'
import {authMiddleware} from '../middleware/auth.js'
import {addToCart,getCartData} from '../controllers/cartController.js'
const router = express.Router()

router.post('/add', authMiddleware, addToCart);

router.get('/get-data',authMiddleware,getCartData)

export default router