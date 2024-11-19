import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import 'dotenv/config' 

let secret = process.env.JWT_SECRET

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    console.log(req.body)
    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }
    
         const role="customer"

        const token = createToken(role);
        res.json({success:true,token,user})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken = (role) => {
    return jwt.sign({role:[role]},secret,{  //role based authorization 
        expiresIn: 60 * 15, //session time
      })
}

const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    console.log(name,password,email)
    try {
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }
        
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        await newUser.save()
         const role="customer"
         const user = await userModel.findOne({email});
        const token = createToken(role)
        res.json({success:true,token,user})
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}