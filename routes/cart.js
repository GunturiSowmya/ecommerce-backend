import express from 'express'
import {authMiddleware} from '../middleware/auth.js'
import {addToCart,getCartData, removeFromCart} from '../controllers/cartController.js'
const router = express.Router()

router.post('/add', authMiddleware, addToCart);

router.get('/get-data',authMiddleware,getCartData)

router.delete('/remove-from-cart', authMiddleware, removeFromCart)

export default router