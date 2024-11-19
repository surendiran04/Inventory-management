import express from  "express"
import { addProduct,listProduct,removeProduct,listById } from "../controllers/productController.js"
import multer from "multer"

const productRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploades",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

productRouter.post("/add",upload.single("image"),addProduct)
productRouter.get("/list",listProduct)
productRouter.get("/:id",listById)
productRouter.post("/remove",removeProduct)

export default productRouter;