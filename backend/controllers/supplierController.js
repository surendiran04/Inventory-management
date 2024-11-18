import supplierModel from "../models/SupplierModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import 'dotenv/config' 

let secret = process.env.JWT_SECRET


const loginSupplier = async (req,res) => {
    const {email,password,role} = req.body;
    try {
        const user = await supplierModel.findOne({email})

        if (!user) {
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }

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

const registerSupplier = async (req,res) => {
    const {name,password,email,role} = req.body;
    try {
        const exists = await supplierModel.findOne({email});
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

        const newUser = new supplierModel({
            name:name,
            email:email,
            password:hashedPassword,
            role:role
        })

        const user = await newUser.save()
        const token = createToken(role)
        res.json({success:true,token,user})
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginSupplier,registerSupplier}