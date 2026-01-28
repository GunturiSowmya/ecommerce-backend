//F4vMQGnipJWNFPXj
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))
connectDB()

app.use(express.json())

app.use('/auth',authRoutes)

app.listen(process.env.PORT,()=>{
    console.log('Server Connected');
})