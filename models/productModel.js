import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'category',
        required:true
    },
    pdf:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})
export default mongoose.model('products',productSchema)