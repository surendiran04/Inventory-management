import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Rohith:qwer1234@cluster0.tmrp1ex.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}