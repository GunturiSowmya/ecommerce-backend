import express from 'express'
import {getCategory, getSubcategories}from '../controllers/categoriesController.js'
import {getProducts, getProduct, getCategoryProducts} from '../controllers/productsController.js'

const router = express.Router()

router.get('/categories',getCategory)
router.get('/categories/subcategories',getSubcategories)
router.get('/products',getProducts)
router.get('/category-products',getCategoryProducts)
router.get('/products/:id',getProduct)

export default router