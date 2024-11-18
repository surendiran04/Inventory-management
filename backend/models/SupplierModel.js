import mongoose from "mongoose"

const supplierSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"supplier"}
},{minimize:false})

const supplierModel =  mongoose.model("supplier",supplierSchema);
export default supplierModel;