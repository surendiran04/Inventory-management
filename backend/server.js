import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config' 
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import supplierRouter from "./routes/supplierRoute.js"

// app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

// api endpoints
app.use("/api/product",productRouter)
app.use("/images",express.static('uploades'))
app.use('/',userRouter)
app.use('/api',supplierRouter);
app.use("/cart",cartRouter)
// app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// 