import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
    role:{type:String,required:true,default:"customer"}
},{minimize:false})

const userModel =  mongoose.model("user",userSchema);
export default userModel;