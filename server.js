//F4vMQGnipJWNFPXj
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import imagesRoutes from './routes/images.js'
import cartRoutes from './routes/cart.js'
import wishlistRoutes from './routes/wishlist.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from "path";
dotenv.config()

const app = express()

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))
connectDB()



app.use(express.json())
app.use(cookieParser())
app.use('/auth',authRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api',imagesRoutes)

app.listen(process.env.PORT,()=>{
    console.log('Server Connected');
})