import mongoose from "mongoose";
import colors from 'colors';

const connectDB=async()=>{
    try {
        const conn =await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
        console.log(colors.blue(`Connected to mongodb ${conn.connection.host}`))
    } catch (error) {
        console.log('error in mongodb connection')
    }
}
export default connectDB;