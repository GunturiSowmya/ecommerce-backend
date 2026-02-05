import express from 'express'
import categoriesController from '../controllers/categoriesController.js'
import {getProducts, getProduct} from '../controllers/productsController.js'

const router = express.Router()

router.get('/categories',categoriesController)
router.get('/products',getProducts)
router.get('/products/:id',getProduct)

export default router