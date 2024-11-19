import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config' 
import path from 'path';
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import supplierRouter from "./routes/supplierRoute.js"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express()
const port = 4000

app.use(express.json())
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:5173', // Change this to your frontend URL
//   }));
//db connection
connectDB();

// api endpoints
app.use("/api/product",productRouter)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/',userRouter)
app.use('/api',supplierRouter);
app.use("/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// 