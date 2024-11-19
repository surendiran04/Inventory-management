import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cartData: [
      {
        itemId: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        name: { type: String }, // Optional field for product name
        price: { type: Number }, // Optional field for product price
      }
    ],
    role: { type: String, default: "customer" },
  });
  

const userModel =  mongoose.model("user",userSchema);
export default userModel;