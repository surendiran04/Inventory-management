import fs from 'fs'
import productModel from "../models/productModel.js"


const addProduct = async (req,res) =>  {

    // let image_filename = `${req.file.filename}`;   image:image_filename,
    // console.log(req.body,image_filename)
    console.log(req.body)
    const product = new productModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
       
        stock:req.body.stock
    });
    try {
        await product.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


const listProduct = async (req,res) => {
   try {
        const products = await productModel.find({})
        res.json({success:true,data:products})
   }
   catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
   }
   
}

// const removeFood = async (req,res) => {
//     try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploades/${food.image}`,() =>{})

//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({success:true,message:"food Removed"})
//     }
//     catch (error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

export {addProduct,listProduct}