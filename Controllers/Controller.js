import userModel from "../models/userModel.js";
import { comparepassword, hashPassword } from "../helpers/Helper.js";
import JWT from 'jsonwebtoken'


export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,answer}=req.body;
        if(!name){
            res.send({message:'Name is required'})
        }
        if(!email){
            res.send({message:'email is required'})
        }
        if(!password){
            res.send({message:'password is required'})
        }
        if(!phone){
            res.send({message:'phone is required'})
        }
        if(!answer){
            res.send({message:'answer is required'})
        }
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(201).send({
                success:false,
                message:'Already Registered Please Login'
            })
        }
        const hasedPassword=await hashPassword(password)
        const user=await new userModel({name,email,password:hasedPassword,phone,answer}).save();
        return res.status(200).send({
            success:true,
            message:'Registered successfully',
            user
        })
    }catch(error){
        console.error('Error during Registration ',error)
        res.status(500).send({
            sucess:false,
            message:'error during registration',
            error
        })
    }
}

export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email){
            return res.status(500).send({
                success:false,
                message:'Invalid email'
            })
        }
        if(!password){
            return res.status(500).send({
                success:false,
                message:'Invalid password'
            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'email is not registered'
            })
        }
        const match=await comparepassword(password,user.password)
        if(!match){
            return res.status(500).send({
                success:false,
                message:'password is incorrect'
            })
        }
        const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET);
        res.status(200).send({
            success:true,
            message:'Login Success',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role,
            },
            token,
        })

    } catch (error) {
        console.error('Error during Login ',error)
        res.status(500).send({
            sucess:false,
            message:'error during Login',
            error
        })
    }
}
export const forgotPasswordController=async(req,res)=>{
    try {
        const {email,newpassword,answer}=req.body
        if(!email){
            res.status(400).send({
                message:'email is required'
            })
        }
        if(!newpassword){
            res.status(400).send({
                message:'email is required'
            })
        }
        if(!answer){
            res.status(400).send({
                message:'answer is required'
            })
        }
        const user=await userModel.findOne({email,answer})
        if(!user){
            return res.status(400).send({
                success:false,
                message:'Wrong email or password'
            })
        }
        const hashed=await hashPassword(newpassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        return res.status(200).send({
            success:true,
            message:'password updatted successfully'
        })
    } catch (error) {
        console.log("Error in updating password",error)
        res.status(500).send({
            sucess:false,
            message:'error during updating password',
            error
        })
    }
}
export const testController=async(req,res)=>{
    try{res.send("Protected Routes")}
    catch(error){
        console.log(error)
    }
}