import express from 'express'
import {authMiddleware} from '../middleware/auth.js'
import {addToWishlist, getWishlist, removeItem} from '../controllers/wishlistController.js'

const router = express.Router()

router.post('/add',authMiddleware, addToWishlist);

router.get('/get',authMiddleware, getWishlist);

router.delete('/remove',authMiddleware,removeItem);

export default router