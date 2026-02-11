import express from 'express'
import categoriesController from '../controllers/categoriesController.js'
import {getProducts, getProduct, getCategoryProducts} from '../controllers/productsController.js'

const router = express.Router()

router.get('/categories',categoriesController)
router.get('/products',getProducts)
router.get('/category-products',getCategoryProducts)
router.get('/products/:id',getProduct)

export default router