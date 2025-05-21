import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import morgan from 'morgan';
import Route from './Routes/Route.js'
import cors from 'cors'
import CategoryRoute from './Routes/CategoryRoute.js'
import productRoute from './Routes/productRoute.js'

dotenv.config();
connectDB();

const app=express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use('/api/v1/auth',Route)
app.use('/api/v1/category',CategoryRoute)
app.use('/api/v1/product',productRoute)

app.get('/',(req,res)=>{
    res.send({
        message:"Welcome to Bookworm Shack"
    })
})
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(colors.bgCyan.white(`Server Running on ${PORT}`))
})
