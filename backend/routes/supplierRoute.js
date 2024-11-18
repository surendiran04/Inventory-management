import express from "express"
import { loginSupplier,registerSupplier } from "../controllers/supplierController.js"

const supplierRouter = express.Router()

supplierRouter.post('/register',registerSupplier)
supplierRouter.post('/login',loginSupplier)

export default supplierRouter;